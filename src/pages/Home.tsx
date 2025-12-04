import Hero from "../components/home/Hero"
import ServicesOverview from "../components/home/ServicesOverview"
import WhyChooseUs from "../components/home/WhyChooseUs"
import Testimonials from "../components/home/Testimonials"

export default function Home() {
  return (
    <div>
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <Testimonials />
    </div>
  )
}
