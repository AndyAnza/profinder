import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PROFESSIONALS } from "../utils/queries";

// Components
import ProSearch from "../components/proSearch";
import SearchDropdown from "../components/searchDropdown";

export default function results() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const { loading, data } = useQuery(QUERY_PROFESSIONALS, {
    variables: {
      location: selectedCity,
      category: selectedCategory,
    },
  });

  return (
    <div className="my-2 ">
      <SearchDropdown
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
      <div className="bg-white pt-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
            Resultados:
          </h2>
          <div className="mt-12">
            {loading ? (
              <p> Loading...</p>
            ) : (
              <ProSearch {...data?.professionals} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
