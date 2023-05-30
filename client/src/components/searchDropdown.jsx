import { useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";

const cities = ["CDMX", "Monterrey"];
const categories = [
  "Carpintería",
  "Construcción",
  "Electricista",
  "Enfermería",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SearchDropdown({
  selectedCategory,
  setSelectedCategory,
  selectedCity,
  setSelectedCity,
}) {
  const handleSubmit = () => {
    console.log("Selected Category:", selectedCategory);
    console.log("Selected City:", selectedCity);
    setSelectedCategory(selectedCategory);
    setSelectedCity(selectedCity);
  };

  return (
    <div className="bg-white p-8 sm:p-12">
      <div className="mx-auto max-w-lg">
        <h2 className="mt-4 mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Encuentra a tu experto.
        </h2>
        <p className="mt-4 text-lg leading-6 text-gray-600">
          Solo selecciona tu ubicación y la categoría que se acople mejor a tus necesidades, y en cuestión de segundos encontrarás a un experto que solucione tu problema.
        </p>
        <div className="mt-8">
          <Combobox
            as="div"
            value={selectedCategory}
            onChange={setSelectedCategory}
          >
            <Combobox.Label className="block text-xl font-medium leading-6 text-gray-900">
              Elige tu categoría:
            </Combobox.Label>
            <div className="relative mt-2">
              <Combobox.Input
                className="w-full rounded-md border-0 bg-white py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm"
                onChange={(event) => setSelectedCategory(event.target.value)}
                displayValue={(category) => category}
                placeholder="ej. Carpintería"
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>

              {categories.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {categories.map((category) => (
                    <Combobox.Option
                      key={category}
                      value={category}
                      className={({ active }) =>
                        classNames(
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                          active ? "bg-gray-400 text-white" : "text-gray-900"
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            className={classNames(
                              "truncate",
                              selected && "font-semibold"
                            )}
                          >
                            {category}
                          </span>
                          {selected && (
                            <span
                              className={classNames(
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                active ? "text-white" : "text-indigo-600"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
<br></br>
          <Combobox
            as="div"
            value={selectedCity}
            onChange={setSelectedCity}
          >
            <Combobox.Label className="block text-xl font-medium leading-6 text-gray-800">
              Elige tu ubicación:
            </Combobox.Label>
            <div className="relative mt-2">
              <Combobox.Input
                className="w-full rounded-md border-0 bg-white py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm"
                onChange={(event) => setSelectedCity(event.target.value)}
                displayValue={(city) => city}
                placeholder="ej. CDMX"
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>

              {cities.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {cities.map((city) => (
                    <Combobox.Option
                      key={city}
                      value={city}
                      className={({ active }) =>
                        classNames(
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                          active ? "bg-gray-400 text-white" : "text-gray-900"
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            className={classNames(
                              "truncate",
                              selected && "font-semibold"
                            )}
                          >
                            {city}
                          </span>
                          {selected && (
                            <span
                              className={classNames(
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                active ? "text-white" : "text-indigo-600"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
          {/* <button
            type="button"
            className="mt-4 w-full rounded-md bg-indigo-500 px-4 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={handleSubmit}
          >
            Buscar
          </button> */}
        </div>
      </div>
    </div>
  );
}
