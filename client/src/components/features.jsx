import { ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Seguridad en la nube',
    description:'En nuestra plataforma, implementamos un sólido sistema de seguridad diseñado para proteger tu información personal. Utilizamos tecnología avanzada en la nube para garantizar la confidencialidad y la integridad de tus datos. Nuestro sistema está respaldado por medidas de seguridad rigurosas que protegen tus datos de accesos no autorizados, ataques cibernéticos y cualquier amenaza potencial.',
    href: '#',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Profesionistas verificados:',
    description:
      'Descubre perfiles de profesionistas verificados y detallados que te brindan una visión completa de sus habilidades, experiencia y especialidades. Toma decisiones informadas al seleccionar al profesional ideal que se adapte a tus necesidades. Confía en nuestra comunidad de expertos verificados para obtener resultados excepcionales en tus proyectos.',
    href: '#',
    icon: LockClosedIcon,
  },
  {
    name: 'Filtro avanzado de busquedas',
    description:
      'Descubre tu profesional ideal en segundos con nuestro sistema de búsqueda y filtro avanzados. Filtra por categoría, ubicación, disponibilidad y más para obtener resultados precisos al instante. Ahorra tiempo y disfruta de una experiencia de búsqueda excepcional. ¡Encuentra al experto perfecto para tu proyecto en un abrir y cerrar de ojos!.',
    href: '#',
    icon: ArrowPathIcon,
  },
]

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600"></h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Conectando talento y confianza en un solo lugar
          </p>
          <p className="mt-8 text-lg leading-8 text-gray-600">
          Encuentra a los mejores profesionales para tus proyectos, sin complicaciones
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    {/* <a href={feature.href} className="text-sm font-semibold leading-6 text-indigo-600">
                      Learn more <span aria-hidden="true">→</span>
                    </a> */}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
