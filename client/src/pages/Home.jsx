import LandingBannner from "../components/landingBanner";
import JobCategory from "../components/jobCategory";
import Stats from "../components/stats.jsx";
import Review from "../components/review.jsx";
import Pricing from "../components/pricing.jsx";
import Testimonials from "../components/testimonials.jsx";
import Team from "../components/team.jsx";

export default function Home() {
  return (
    <main>
      <LandingBannner />
      <JobCategory />
      <Stats />
      <Review />
      <Pricing />
      <Testimonials />
      <Team />
    </main>
  );
}
