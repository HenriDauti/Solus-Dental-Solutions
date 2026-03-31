import Hero from "../components/home/Hero"
import ServicesOverview from "../components/home/ServicesOverview"
import WhyChooseUs from "../components/home/WhyChooseUs"
import Testimonials from "../components/home/Testimonials"
import GoogleReviews from "../components/home/GoogleReviews"

export default function Home() {
  return (
    <div>
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <GoogleReviews />
      <Testimonials />
    </div>
  )
}
