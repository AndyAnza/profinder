import React from "react";
import ProSearch from "../components/proSearch";
import SearchDropdown from "../components/searchDropdown";
export default function results() {
  //   const [query, setQuery] = useState("");
  //   const [selectedCategory, setSelectedCategory] = useState(null);
  //   const filteredCategory =
  //     query === ""
  //       ? category
  //       : category.filter((category) => {
  //           return category.name.toLowerCase().includes(query.toLowerCase());
  //         });
  return (
    <div className="my-2 ">
      <SearchDropdown />
      <div className="bg-white pt-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
            Resultados:
          </h2>
          <div className="mt-12">
            <ProSearch />
          </div>
        </div>
      </div>
    </div>
  );
}
