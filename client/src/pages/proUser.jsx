import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PROFESSIONAL } from "../utils/mutations";
import Auth from "../utils/auth";

const AddProfessional = () => {
  const [formState, setFormState] = useState({
    user: Auth.getProfile().data._id,
    aboutMe: "",
    category: "",
    yearsOfExperience: "",
    expertise: "",
    income: "",
    url: "",
  });

  const [addProfessional, { data, error }] = useMutation(ADD_PROFESSIONAL);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Parse yearsOfExperience as a number
    const parsedValue =
      name === "yearsOfExperience" ? parseInt(value, 10) : value;

    setFormState({
      ...formState,
      [name]: parsedValue,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    console.log(typeof formState.yearsOfExperience);
    console.log(Number(formState.yearsOfExperience));

    try {
      const { data } = await addProfessional({
        variables: { ...formState },
      });
      window.location.href = "/";
      // Auth.login(data.addProfessional.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {data ? (
        <p>
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3 ml-4">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2"></div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3 ml-4">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Información personal
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Utiliza una dirección permanente donde puedas recibir correo.
                </p>
              </div>

              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                <div className="sm:col-span-3">
                  <div className="col-span-full">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Categoria
                    </label>
                    <div className="mt-2">
                      <select
                        id="category"
                        name="category"
                        value={formState.category}
                        onChange={handleChange}
                        autoComplete="category"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>Elige una categoria</option>
                        <option value="Enfermería">Enfermería</option>
                        <option value="Carpintería">Carpintería</option>
                        <option value="Electricista">Electricista</option>
                        <option value="Construcción">Construcción</option>
                      </select>
                    </div>
                  </div>

                  <label
                    htmlFor="expertise"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Especialidad:
                  </label>
                  <div className="mt-2">
                    <input
                      id="expertise"
                      name="expertise"
                      type="text"
                      value={formState.expertise}
                      onChange={handleChange}
                      autoComplete="expertise"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="yearsOfExperience"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Años de experiencia laboral
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="yearsOfExperience"
                      id="yearsOfExperience"
                      value={formState.yearsOfExperience}
                      onChange={handleChange}
                      autoComplete="yearsOfExperience"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <div className="col-span-full">
                    <label
                      htmlFor="aboutMe"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Acerca de mí
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="aboutMe"
                        name="aboutMe"
                        rows={3}
                        value={formState.aboutMe}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Escribe algunas frases sobre ti.
                    </p>
                  </div>

                  <label
                    htmlFor="url"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    URL
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="url"
                      id="url"
                      value={formState.url}
                      onChange={handleChange}
                      autoComplete="url"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="income"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Income
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="income"
                      id="income"
                      value={formState.income}
                      onChange={handleChange}
                      autoComplete="income"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleFormSubmit}
            >
              Guardar
            </button>
          </div>
        </form>
      )}

      {error && (
        <div className="my-3 p-3 bg-danger text-black">{error.message}</div>
      )}
    </>
  );
};

export default AddProfessional;
