import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
 {
        "question": "¿Qué tipo de profesionales pueden registrarse en la plataforma?",
        "answer": "Nuestra plataforma está abierta a profesionales de diversas industrias, como abogados, médicos, contadores, diseñadores, programadores, consultores, entre otros."
    },
       {
        "question": "¿Cuánto cuesta registrarse y tener acceso a la plataforma?",
        "answer": "La plataforma requiere una suscripción mensual para acceder y utilizar sus funciones. El costo de la suscripción mensual es de 10 dolares por mes"
    },
    {
        "question": "¿Cuáles son los beneficios de ser miembro de la plataforma como profesional?",
        "answer": "Al ser miembro de nuestra plataforma como profesional, plataforma sin anuncions, tendrás prioridad en las busquedas, tu perfil no se eliminara etc."
    },
    {
        "question": "¿Cómo funciona el proceso de contratación a través de la plataforma?",
        "answer": "Nuestra plataforma facilita el proceso de contratación al conectar a los clientes con profesionales adecuados para sus necesidades. Los clientes pueden explorar perfiles de profesionales y contactar al profesional que mas les llame la atención"
    },
    {
        "question": "¿Cómo puedo actualizar mi información de perfil y agregar nuevas habilidades o servicios?",
        "answer": "Puedes actualizar tu información de perfil y agregar nuevas habilidades o servicios en cualquier momento iniciando sesión en tu cuenta profesional"
    },
  // More questions...
]

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Preguntas Frecuentes</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
