import React, { useRef } from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function ProSearch({ professionals }) {
  const carouselRef = useRef(null);

  const handleNextSlide = () => {
    carouselRef.current.next();
  };

  const handlePrevSlide = () => {
    carouselRef.current.previous();
  };

  if (!professionals || professionals.length === 0) {
    return <h3>No se encontraron profesionales para tu búsqueda.</h3>;
  }

  return (
    <div className="relative">
      <Carousel ref={carouselRef} responsive={responsive}>
        {professionals.map((person) => (
          <div key={person._id} className="carousel-item col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow border-2">
            <div className="flex flex-1 flex-col p-8">
              <img
                className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                src={person.user.profilePicture}
                alt=""
              />
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
                <dd className="text-sm text-gray-500 mt-3">
                  Experto en: {person.expertise}
                </dd>
                <dt className="sr-only">Income</dt>
                <dd className="text-xs text-gray-900 mt-3">
                  Ingreso esperado: ${person.income}
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
      <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-4">
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
