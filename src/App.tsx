import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './lib/theme';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import ScrollToTop from './lib/ScrollToTop';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Brands from './pages/Brands';
import About from './pages/About';
import History from './pages/History';
import MissionVision from './pages/MissionVision';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import FAQ from './pages/FAQ';
import Testimonials from './pages/Testimonials';
import Certifications from './pages/Certifications';
import Warranties from './pages/Warranties';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import TireCalculator from './pages/TireCalculator';
import Comparator from './pages/Comparator';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/producto/:slug" element={<ProductDetail />} />
              <Route path="/marcas" element={<Brands />} />
              <Route path="/quienes-somos" element={<About />} />
              <Route path="/historia" element={<History />} />
              <Route path="/mision-vision" element={<MissionVision />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/testimonios" element={<Testimonials />} />
              <Route path="/certificaciones" element={<Certifications />} />
              <Route path="/garantias" element={<Warranties />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/cotizacion" element={<Quote />} />
              <Route path="/calculadora" element={<TireCalculator />} />
              <Route path="/comparador" element={<Comparator />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
