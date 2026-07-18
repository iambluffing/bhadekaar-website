import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

export interface VehicleItem {
  id: string;
  name: string;
  category: string;
  capacity: string;
  weightCapacity: string;
  ratePerKm: number;
  baseFare: number;
  description: string;
  suitableFor: string;
  active: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  sub: string;
  badge: string;
  active: boolean;
}

export interface DriverDoc {
  name: string;
  url: string;
  uploadedAt: string;
}

export interface DriverApplication {
  id: string;
  name: string;
  phone: string;
  city: string;
  bankAccount: string;
  vehicleType: string;
  vehicleNumber: string;
  documents: {
    license?: DriverDoc;
    rc?: DriverDoc;
    puc?: DriverDoc;
    aadhaar?: DriverDoc;
  };
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface VendorItem {
  id: string;
  name: string;
  phone: string;
  vehicleType: string;
  location: string;
  active: boolean;
}

interface DataContextType {
  vehicles: VehicleItem[];
  services: ServiceItem[];
  driverApplications: DriverApplication[];
  vendors: VendorItem[];
  toggleVehicle: (id: string) => Promise<void>;
  toggleService: (id: string) => Promise<void>;
  toggleVendor: (id: string) => Promise<void>;
  addDriverApplication: (app: Omit<DriverApplication, 'id' | 'submittedAt' | 'status'>) => Promise<void>;
  updateDriverStatus: (id: string, status: 'pending' | 'approved' | 'rejected') => Promise<void>;
}

const initialVehicles: VehicleItem[] = [
  {
    id: 'tata-ace',
    name: 'Tata Ace',
    category: 'Small Goods Truck',
    capacity: 'Compact Cargo Bed',
    weightCapacity: 'Up to 750 kg',
    ratePerKm: 25,
    baseFare: 200,
    description: 'Ideal for fast intra-city goods transport, small furniture, appliance delivery, and retail stock in Goa.',
    suitableFor: 'Boxes, Appliances, Furniture',
    active: true,
  },
  {
    id: 'pickup',
    name: 'Pickup',
    category: '8ft Flatbed Truck',
    capacity: '8 Feet Open Bed',
    weightCapacity: 'Up to 1.2 Tons',
    ratePerKm: 32,
    baseFare: 300,
    description: 'Versatile open-body pickup for residential shifting, commercial loads, and bulky items.',
    suitableFor: 'House Shifting, Commercial Goods',
    active: true,
  },
  {
    id: 'mini-truck',
    name: 'Mini Truck',
    category: 'Closed Container Truck',
    capacity: 'Enclosed Weatherproof Container',
    weightCapacity: 'Up to 1.5 Tons',
    ratePerKm: 38,
    baseFare: 400,
    description: 'Weatherproof protected transport for sensitive cargo, electronics, and commercial inventory.',
    suitableFor: 'Electronics, E-commerce, FMCG',
    active: true,
  },
  {
    id: 'tempo',
    name: 'Tempo',
    category: 'Medium Goods Vehicle',
    capacity: '10-12 Feet Cargo Space',
    weightCapacity: 'Up to 2.5 Tons',
    ratePerKm: 45,
    baseFare: 550,
    description: 'Reliable medium-duty transport for wholesale distribution, warehouse supply, and hardware.',
    suitableFor: 'Wholesale Stock, Heavy Goods',
    active: true,
  },
  {
    id: '17-feet-truck',
    name: '17 Feet Truck',
    category: 'Heavy Commercial Truck',
    capacity: '17 Feet Container / Open Bed',
    weightCapacity: 'Up to 5 Tons',
    ratePerKm: 65,
    baseFare: 900,
    description: 'Large commercial truck designed for bulk goods, factory machinery, and inter-city logistics in Goa.',
    suitableFor: 'Industrial Goods, Large Shifts',
    active: true,
  },
  {
    id: '19-feet-truck',
    name: '19 Feet Truck',
    category: 'Heavy Commercial Truck',
    capacity: '19 Feet High-Capacity Body',
    weightCapacity: 'Up to 8 Tons',
    ratePerKm: 80,
    baseFare: 1200,
    description: 'High-volume logistics transport for large commercial contracts, heavy machinery, and bulk supplies.',
    suitableFor: 'High Volume Freight, Industrial Supplies',
    active: true,
  },
  {
    id: 'construction-material-vehicle',
    name: 'Construction Material Vehicle',
    category: 'Specialized Dumper & Tipper',
    capacity: 'Heavy-Duty Tipper Bed',
    weightCapacity: 'Up to 10 Tons',
    ratePerKm: 95,
    baseFare: 1500,
    description: 'Specialized vehicle for transporting sand, gravel, cement, stone aggregate, and site construction material.',
    suitableFor: 'Sand, Bricks, Gravel, Cement, Site Supplies',
    active: true,
  },
];

const initialServices: ServiceItem[] = [
  {
    id: 'light-medium',
    title: 'Light & Medium Goods Transport',
    sub: 'Tata Ace, Pickup, Mini Truck, Tempo',
    badge: 'Local Freight',
    active: true,
  },
  {
    id: 'heavy-commercial',
    title: 'Heavy Commercial Logistics',
    sub: '17 Feet & 19 Feet Trucks',
    badge: 'Heavy Freight',
    active: true,
  },
  {
    id: 'construction',
    title: 'Construction Material Transport',
    sub: 'Dumpers, Tippers & Site Trucks',
    badge: 'Construction Logistics',
    active: true,
  },
];

const initialVendors: VendorItem[] = [
  {
    id: 'ven-1',
    name: 'Goa Freight Partners Co.',
    phone: '8806180088',
    vehicleType: 'Tata Ace & Pickups',
    location: 'North Goa Hub',
    active: true,
  },
  {
    id: 'ven-2',
    name: 'South Goa Heavy Logistics Fleet',
    phone: '8806180088',
    vehicleType: '17ft & 19ft Trucks',
    location: 'South Goa Hub',
    active: true,
  },
  {
    id: 'ven-3',
    name: 'Coastal Building Supplies Express',
    phone: '8806180088',
    vehicleType: 'Construction Tippers',
    location: 'Goa Industrial Estate',
    active: true,
  },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<VehicleItem[]>(() => {
    const saved = localStorage.getItem('bhadekaar_vehicles');
    return saved ? JSON.parse(saved) : initialVehicles;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('bhadekaar_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [vendors, setVendors] = useState<VendorItem[]>(() => {
    const saved = localStorage.getItem('bhadekaar_vendors');
    return saved ? JSON.parse(saved) : initialVendors;
  });

  const [driverApplications, setDriverApplications] = useState<DriverApplication[]>(() => {
    const saved = localStorage.getItem('bhadekaar_drivers');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync with Firestore if available, with LocalStorage fallback
  useEffect(() => {
    if (!db) return;

    // Listen to Vehicles collection
    const unsubscribeVehicles = onSnapshot(collection(db, 'vehicles'), (snapshot) => {
      if (!snapshot.empty) {
        const fetched = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() } as VehicleItem));
        setVehicles(fetched);
        localStorage.setItem('bhadekaar_vehicles', JSON.stringify(fetched));
      } else {
        // Populate initial defaults in Firestore
        initialVehicles.forEach((v) => {
          setDoc(doc(db, 'vehicles', v.id), v).catch(() => {});
        });
      }
    }, () => {});

    // Listen to Services collection
    const unsubscribeServices = onSnapshot(collection(db, 'services'), (snapshot) => {
      if (!snapshot.empty) {
        const fetched = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() } as ServiceItem));
        setServices(fetched);
        localStorage.setItem('bhadekaar_services', JSON.stringify(fetched));
      } else {
        initialServices.forEach((s) => {
          setDoc(doc(db, 'services', s.id), s).catch(() => {});
        });
      }
    }, () => {});

    // Listen to Vendors collection
    const unsubscribeVendors = onSnapshot(collection(db, 'vendors'), (snapshot) => {
      if (!snapshot.empty) {
        const fetched = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() } as VendorItem));
        setVendors(fetched);
        localStorage.setItem('bhadekaar_vendors', JSON.stringify(fetched));
      } else {
        initialVendors.forEach((v) => {
          setDoc(doc(db, 'vendors', v.id), v).catch(() => {});
        });
      }
    }, () => {});

    // Listen to Driver Applications
    const unsubscribeDrivers = onSnapshot(collection(db, 'driverApplications'), (snapshot) => {
      if (!snapshot.empty) {
        const fetched = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() } as DriverApplication));
        setDriverApplications(fetched);
        localStorage.setItem('bhadekaar_drivers', JSON.stringify(fetched));
      }
    }, () => {});

    return () => {
      unsubscribeVehicles();
      unsubscribeServices();
      unsubscribeVendors();
      unsubscribeDrivers();
    };
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('bhadekaar_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('bhadekaar_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('bhadekaar_vendors', JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem('bhadekaar_drivers', JSON.stringify(driverApplications));
  }, [driverApplications]);

  const toggleVehicle = async (id: string) => {
    const target = vehicles.find((v) => v.id === id);
    const newActiveState = target ? !target.active : true;

    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, active: newActiveState } : v))
    );

    if (db) {
      try {
        await updateDoc(doc(db, 'vehicles', id), { active: newActiveState });
      } catch {
        // Fallback handled locally
      }
    }
  };

  const toggleService = async (id: string) => {
    const target = services.find((s) => s.id === id);
    const newActiveState = target ? !target.active : true;

    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: newActiveState } : s))
    );

    if (db) {
      try {
        await updateDoc(doc(db, 'services', id), { active: newActiveState });
      } catch {
        // Fallback handled locally
      }
    }
  };

  const toggleVendor = async (id: string) => {
    const target = vendors.find((v) => v.id === id);
    const newActiveState = target ? !target.active : true;

    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, active: newActiveState } : v))
    );

    if (db) {
      try {
        await updateDoc(doc(db, 'vendors', id), { active: newActiveState });
      } catch {
        // Fallback handled locally
      }
    }
  };

  const addDriverApplication = async (appData: Omit<DriverApplication, 'id' | 'submittedAt' | 'status'>) => {
    const id = `DRV-${Date.now().toString().slice(-6)}`;
    const submittedAt = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newApp: DriverApplication = {
      ...appData,
      id,
      submittedAt,
      status: 'pending',
    };

    setDriverApplications((prev) => [newApp, ...prev]);

    if (db) {
      try {
        await setDoc(doc(db, 'driverApplications', id), {
          ...newApp,
          createdAt: serverTimestamp(),
        });
      } catch {
        // Local state fallback preserved
      }
    }
  };

  const updateDriverStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    setDriverApplications((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );

    if (db) {
      try {
        await updateDoc(doc(db, 'driverApplications', id), { status });
      } catch {
        // Fallback handled locally
      }
    }
  };

  return (
    <DataContext.Provider
      value={{
        vehicles,
        services,
        driverApplications,
        vendors,
        toggleVehicle,
        toggleService,
        toggleVendor,
        addDriverApplication,
        updateDriverStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
