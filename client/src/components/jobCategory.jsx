import { useState } from "react";

const category = [
  {
    name: "Carpintería",
    imageUrl:
      "https://images.unsplash.com/photo-1626081062126-d3b192c1fcb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80",
  },
  {
    name: "Catering",
    imageUrl:
      "https://images.unsplash.com/photo-1623475173140-ad2f0369ca92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
  },
  {
    name: "Contabilidad",
    imageUrl:
      "https://images.unsplash.com/photo-1563212034-a3c52118cce2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Diseño Gráfico",
    imageUrl:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
  },
  {
    name: "Electricista",
    imageUrl:
      "https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Florista",
    imageUrl:
      "https://images.unsplash.com/photo-1527609635833-38e4a5f7c941?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "Fotografía",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  },
  {
    name: "Jardinería",


    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Limpieza",
    imageUrl:
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "Pintura",
    imageUrl:
      "https://images.unsplash.com/photo-1621685682093-3b8016dcb57d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80",
  },
  {
    name: "Plomería",
    imageUrl:
      "https://images.unsplash.com/photo-1543674892-7d64d45df18b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=730&q=80",
  },
  {
    name: "Programación",
    imageUrl:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  },
  // Otras personas...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function JobCategory() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mt-15 mb-20 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
          Explora nuestra amplia variedad de categorías de servicios profesionales
        </h2>
        <ul
          role="list"
          className="mx-auto mt-2 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
        >
          {category.map((category) => (
            <li key={category.name}>
              <img
                className="mx-auto h-24 w-24 rounded-full"
                src={category.imageUrl}
                alt=""
              />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {category.name}
              </h3>
              {/* Otros elementos de cada categoría */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}