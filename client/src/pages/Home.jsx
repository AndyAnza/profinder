//React
import React from "react";


// Components
import LandingBannner from "../components/landingBanner";
import SearchDropdown from "../components/searchDropdown";
import JobCategory from "../components/jobCategory";
import Stats from "../components/stats.jsx";
import Cloud from "../components/cloud.jsx";
import Pricing from "../components/pricing.jsx";
import Testimonials from "../components/testimonials.jsx";
import Team from "../components/team.jsx";
import UserInfo from "../components/userInfo";

export default function Home() {
  
  return (
    <main>
      <LandingBannner />
      <Cloud />
      <UserInfo />
      <SearchDropdown />
      <JobCategory />
      <Stats />
      <Pricing />
      <Testimonials />
      <Team />
    </main>
  );
}
