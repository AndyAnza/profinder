import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Auth from "../utils/auth";

const navigation = [
  { name: "¿Quiénes somos?", href: "/us" },
  { name: "Servicio al cliente", href: "https://wa.me/8119084023" },
  { name: "Preguntas Frecuentes", href: "/faq" },
  // { name: "Mi Perfil", href: "/perfil" },
  <br>
    <br></br>
  </br>,
];

const accountOptions = [
  { label: "Registrarse como usuario", value: "/sign-in" },
  { label: "Registrarse como profesional", value: "/create-professional" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.href = "/";
  };
  const [loginOpen, setLoginOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setDropdownOpen(false);
    window.location.href = option.value;
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 ">
      <nav
        className="mx-auto py-4 flex max-w-7xl items-center justify-between lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">ProFinder Logo</span>
            <img
              className="h-16 w-auto"
              src="/proFinder_Logo.png"
              alt="ProFinder-Logo"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú principal</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:justify-start space-x-4">
          {Auth.loggedIn() ? (
            <>
              <span className="text-cyan-500 font-bold">
               {Auth.getProfile().data.email}
              </span>
              <a
                href={`/profile/${Auth.getProfile().data._id}`}
                className="rounded-md bg-indigo-600 px-2 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Mi perfil
              </a>
              <button
                onClick={logout}
                className="rounded-md bg-indigo-600 px-2 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <div className="relative">
                <button
                  onClick={handleDropdownToggle}
                  className="rounded-md bg-white-600 px-2 py-1.5 text-xs font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Registrarse
                </button>
                {dropdownOpen && (
                  <div className="absolute mt-2 bg-white rounded-md shadow-lg z-10">
                    {accountOptions.map((option) => (
                      <button
                        key={option.label}
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <a
                href="/login"
                className="rounded-md bg-indigo-600 px-2 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar sesión
              </a>
            </>
          )}
        </div>
      </nav>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Tu Compañía</span>
              <img className="h-8 w-auto" src="../public/favicon.png" alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Cerrar menú</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className="py-6">
                {Auth.loggedIn() ? (
                  <>
                    <a
                      href={`/profile/${Auth.getProfile().data._id}`}
                      className="rounded-md bg-indigo-600 px-2 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Mi perfil
                    </a>
                    <button
                      onClick={logout}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Iniciar sesión
                    </a>
                    <a
                      href="/sign-in"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Registrarse
                    </a>
                    <a
                      href="/create-professional"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Registrarse como profesional
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      <Dialog
        as="div"
        className="fixed inset-0 z-50"
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="flex items-center justify-center h-screen">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-semibold mb-4">Inicio de sesión</h2>
          </div>
        </div>
      </Dialog>
    </header>
  );
}
