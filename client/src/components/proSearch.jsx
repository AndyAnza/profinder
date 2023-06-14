import React, { useRef, Fragment, useState } from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function ProSearch({ professionals }) {
  let [isOpen, setIsOpen] = useState(false);
  const carouselRef = useRef(null);
  const handleNextSlide = () => {
    carouselRef.current.next();
  };
  const handlePrevSlide = () => {
    carouselRef.current.previous();
  };

  const [activePerson, setActivePerson] = useState(null);
  const closeModal = () => {
    setActivePerson(null);
    setIsOpen(false);
  };

  const openModal = (person) => {
    setActivePerson(person);
    setIsOpen(true);
  };

  if (!professionals || professionals.length === 0) {
    return <h3>No se encontraron profesionales para tu búsqueda.</h3>;
  }

  return (
    <div className="relative" activePerson={activePerson}>
      <Carousel ref={carouselRef} responsive={responsive}>
        {professionals.map((person) => (
          <div
            key={person._id}
            className="mr-4 carousel-item col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow border-2"
          >
            <div className="flex flex-1 flex-col p-6 max-h-124">
              <img
                className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                src={person.user.profilePicture}
                alt="profile picture"
                onClick={() => openModal(person)}
              />
              {/* Modal */}
              <Transition
                appear
                show={isOpen && person === activePerson}
                as={Fragment}
              >
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <Dialog.Panel className=" max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                          <img
                            className="mx-auto h-28 w-28 flex-shrink-0 rounded-full mb-4"
                            src={person.user.profilePicture}
                            alt="profile picture"
                          />
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900 align-center px-4 pt-2 sm:px-0"
                          >
                            {person.user.name} {person.user.lastname}
                            <span className="justify-center items-center rounded-full bg-green-50 ml-4 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              {person.category}
                            </span>
                          </Dialog.Title>

                          <div className="mt-1">
                            <dl className="divide-y divide-gray-100">
                              <div className="px-4 pt-4 grid grid-cols-2 sm:grid-cols-3 sm:gap-1 sm:px-0 text-start mx-8">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  Ubicación
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  {person.user.location}
                                </dd>
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  Email
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  {person.user.email}
                                </dd>
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  Celular
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  {person.user.phone}
                                </dd>
                              </div>
                            </dl>
                            <dl className="mt-6 border-t border-gray-100">
                              <div className="px-4 py-6 grid grid-cols-1 sm:grid-cols-2 sm:gap-1 sm:px-0 text-start mx-8">
                                <dt className="text-sm font-medium leading-6 text-gray-900 ">
                                  Sobre mí
                                </dt>
                                <dd className=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  {person.aboutMe}
                                </dd>
                                <dt className="text-sm font-medium leading-6 text-gray-900 mt-3">
                                  Años de experiencia
                                </dt>
                                <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-3">
                                  {person.yearsOfExperience}
                                </dd>
                                <dt className="text-sm font-medium leading-6 text-gray-900 mt-3">
                                  Soy experto en
                                </dt>
                                <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-3">
                                  {person.expertise}
                                </dd>
                                <dt className="text-sm font-medium leading-6 text-gray-900 mt-3">
                                  Ingreso esperado
                                </dt>
                                <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-3">
                                  {person.income}
                                </dd>
                              </div>
                            </dl>
                          </div>
                          <div className="mt-4 space-x-6">
                            <a
                              href={person.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                              Links de mi trabajo
                            </a>
                            <a
                              href={`https://wa.me/${person.user.phone}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                              Contáctame!
                            </a>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
              {/* Modal ends */}

              <h3 className="mt-6 text-sm font-medium text-gray-900">
                {person.user.name} {person.user.lastname}
              </h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Category</dt>
                <dd className="mt-3">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {person.category}
                  </span>
                </dd>
                <dt className="sr-only">Expertise</dt>
                <dd className="text-xs text-gray-500 h-28 overflow-y-scroll text-left my-4">
                  Experto en: {person.expertise}
                  <dt className="sr-only">Income</dt>
                  <dd className="text-xs text-gray-900 mt-3">
                    Ingreso esperado: ${person.income}
                  </dd>
                </dd>
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    href={`mailto:${person.user.email}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <EnvelopeIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Email
                  </a>
                </div>
                <div className="-ml-px justify-center flex w-0 flex-1">
                  <a
                    href={`https://wa.me/${person.user.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-50 hover:bg-green-100 relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border  py-4 text-sm font-semibold text-gray-900"
                  >
                    <PhoneIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      <div className="absolute top-1/2 -left-8 -right-8 transform -translate-y-1/2 flex justify-between px-4">
        <button
          className="bg-gray-200 rounded-md p-2"
          onClick={handlePrevSlide}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="bg-gray-200 rounded-md p-2"
          onClick={handleNextSlide}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
