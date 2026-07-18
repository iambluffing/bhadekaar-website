import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { RegisterDriver } from './pages/RegisterDriver';
import { RegisterCustomer } from './pages/RegisterCustomer';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-m3-surface text-m3-on-surface dark:bg-m3-surface-dark dark:text-m3-on-surface-dark transition-colors duration-300 font-sans relative">
            {/* Sticky Header */}
            <Header />

            {/* Main Content View */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/register-driver" element={<RegisterDriver />} />
                <Route path="/register-customer" element={<RegisterCustomer />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>

            {/* Floating WhatsApp Action Button */}
            <WhatsAppButton />

            {/* Footer */}
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
