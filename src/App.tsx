import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import WhatsAppFAB from "./components/layout/WhatsAppFAB"
import Home from "./pages/Home"
import Services from "./pages/Services"
import Team from "./pages/Team"
import Gallery from "./pages/Gallery"
import Contact from "./pages/Contact"
import FAQ from "./pages/FAQ"
import PageTransition from "./components/layout/PageTransition"

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<Team />} />
              <Route path="/team" element={<Team />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
            </PageTransition>
          </main>
          <Footer />
          <WhatsAppFAB />
        </div>
      </Router>
    </LanguageProvider>
  )
}