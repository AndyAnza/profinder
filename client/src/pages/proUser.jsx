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
    <div className="isolate px-6 py-24 sm:py-28 lg:px-8 ">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className=" mt-8 sm:mt-6 bg-white border border-gray-300 rounded-lg px-8 py-6">
        {data ? (
          <p>
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="space-y-12 text-center ">
              <h1 className="text-lg text-gray-900 font-bold">
                Crea tu cuenta de profesional
              </h1>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 border p-6 rounded-md border-gray-900/10 pb-12 md:grid-cols-3 ml-4">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Información personal
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Incluye información relevante sobre tu trabajo.
                    <br />
                    ¡Resalta tus mejores habilidades!
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
                          className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                      className="mt-4 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Soy experto(a) en:
                    </label>
                    <div className="mt-2">
                      <input
                        id="expertise"
                        name="expertise"
                        placeholder="Ej. Restauración de muebles, tallado en madera, etc."
                        type="text"
                        value={formState.expertise}
                        onChange={handleChange}
                        autoComplete="expertise"
                        className="p-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <div className="col-span-full">
                      <label
                        htmlFor="aboutMe"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Acerca de mí: platícanos algo sobre tí para que tus
                        posibles clientes te conozcan.
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="aboutMe"
                          name="aboutMe"
                          placeholder=""
                          rows={3}
                          value={formState.aboutMe}
                          onChange={handleChange}
                          className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <label
                      htmlFor="url"
                      className="mt-4 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Link de evidencias: pega aquí un link con tus mejores
                      trabajos.
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="url"
                        id="url"
                        value={formState.url}
                        onChange={handleChange}
                        autoComplete="url"
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="income"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ¿Cuál es tu ingreso esperado por servicio?
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="income"
                        placeholder="Ej. 200 por hora o cotizar por pieza."
                        id="income"
                        value={formState.income}
                        onChange={handleChange}
                        autoComplete="income"
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
      </div>
    </div>
  );
};

export default AddProfessional;
