//React
import React from "react";
// import { useState } from "react";
// import { useQuery } from "@apollo/client";
// import { QUERY_PROFESSIONALS } from "../utils/queries";

// Components
import LandingBannner from "../components/landingBanner";
import SearchDropdown from "../components/searchDropdown";
import JobCategory from "../components/jobCategory";
import Stats from "../components/stats.jsx";
import Cloud from "../components/cloud.jsx";
import Pricing from "../components/pricing.jsx";
import Testimonials from "../components/testimonials.jsx";
import Features from "../components/features";
import Team from "../components/team.jsx";
import ProInfo from "./proInfo";
import UserInfo from "../components/userInfo";

export default function Home() {
  // const [selectedCategory, setSelectedCategory] = useState("Carpintería");
  // const [selectedCity, setSelectedCity] = useState("CDMX");

  // const { loading, data } = useQuery(QUERY_PROFESSIONALS, {
  //   variables: {
  //     location: selectedCity,
  //     category: selectedCategory,
  //   },
  // });
  return (
    <main>
      <LandingBannner />
      <Cloud />
      {/* <UserInfo /> */}

      {/* <SearchDropdown
      // selectedCategory={selectedCategory}
      // setSelectedCategory={setSelectedCategory}
      // selectedCity={selectedCity}
      // setSelectedCity={setSelectedCity}

      /> */}
      {/* <JobCategory /> */}
      <Features />
      <Stats />
      <Pricing />
      <Testimonials />
      {/* <Team /> */}
    </main>
  );
}
