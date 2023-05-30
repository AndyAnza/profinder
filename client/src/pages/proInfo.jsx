import { PaperClipIcon, StarIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROFILE, QUERY_ME } from "../utils/queries";
import { REMOVE_USER } from "../utils/mutations";
import Auth from "../utils/auth";
const reviews = [
  {
    id: 1,
    title: "Can't say enough good things",
    rating: 5,
    content: `
      <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
      <p>The product quality is amazing, it looks and feels even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
    `,
    author: "Risako M",
    date: "May 16, 2021",
    datetime: "2021-01-06",
  },
  // More reviews...
];

export default function ProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [removeUser] = useMutation(REMOVE_USER);

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(userId ? GET_PROFILE : QUERY_ME, {
    variables: { userId: userId },
  });

  // Check if data is returning from the `QUERY_ME` query, then the `GET_PROFILE` query
  const profile = data?.me || data?.profile || {};
  console.log(profile);

  // SET STATE of fields that can be updated by the user.
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(profile?.user?.name || "");
  const [lastname, setLastname] = useState(profile?.user?.lastname || "");
  const [phone, setPhone] = useState(profile?.user?.phone || "");
  const [email, setEmail] = useState(profile?.user?.email || "");
  const [aboutMe, setAboutMe] = useState(profile?.aboutMe || "");
  const [expertise, setExpertise] = useState(profile?.expertise || "");
  const [yearsOfExperience, setYearsOfExperience] = useState(
    profile?.yearsOfExperience || ""
  );
  const [income, setIncome] = useState(profile?.income || "");

  if (loading) {
    return <div className="mt-32 text-center">Cargando datos...</div>;
  }

  const handleRemoveUser = async (userId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await removeUser({
        variables: { userId },
      });
      if (!data) {
        throw new Error("Something went wrong!");
      }

      // Check if the user was deleted
      if (data) {
        // Perform logout
        Auth.logout();

        // Redirect to the home page
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleAboutMeChange = (e) => {
    setAboutMe(e.target.value);
  };
  const handleExpertiseChange = (e) => {
    setExpertise(e.target.value);
  };
  const handleYearsOfExperienceChange = (e) => {
    setYearsOfExperience(e.target.value);
  };
  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };

  return (
    <div className="overflow-hidden ">
      <div className="mx-auto max-w-7xl px-6 pt-20 lg:px-8 lg:pt-24">
        <div className=" mx-auto max-w-2xl gap-x-14 lg:mx-0  lg:max-w-none lg:items-center">
          <div className=" px-4 py-6 sm:px-6 mx-2">
            <figcaption className="mt-6 flex items-center gap-x-4">
              <img
                className="h-20 w-20 rounded-full bg-gray-50"
                src={profile.user.profilePicture}
                alt=""
              />
              <div className="mt-4 ">
                <div className="gap-2 flex">
                  <div className="">
                    {!editMode ? (
                      <h2 className="text-3xl lg:text-4xl font-semibold leading-7 text-gray-900">
                        {profile.user.name} {profile.user.lastname}
                      </h2>
                    ) : (
                      <input
                        type="text"
                        className="mt-1 text-3xl leading-6 text-gray-900 sm:col-span-2 sm:mt-0 bg-transparent border rounded px-2 py-1 border-indigo-300 focus:outline-none"
                        value={profile.user.name}
                        onChange={handleNameChange}
                      />
                    )}
                  </div>
                  <div className="">
                    {!editMode ? (
                      <button
                        type="submit"
                        className="rounded-md ring-1 ring-indigo-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleEditProfile}
                      >
                        Editar Perfil
                      </button>
                    ) : (
                      <div className="flex items-center gap-x-2">
                        <input
                          type="text"
                          className="mt-1 text-3xl leading-6 text-gray-900 sm:col-span-2 sm:mt-0 bg-transparent border rounded px-2 py-1 border-indigo-300 focus:outline-none"
                          value={profile.user.lastname}
                          onChange={handleLastnameChange}
                        />
                      </div>
                    )}
                  </div>
                </div>{" "}
                <dt className="sr-only">Category</dt>
                <dd className="mt-4 flex">
                  <p className="mr-6 max-w-2xl text-md leading-6 text-indigo-600">
                    {profile.user.username}
                  </p>
                  <span className=" items-center rounded-full bg-green-50 px-4 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {profile.category}
                  </span>
                </dd>{" "}
              </div>
            </figcaption>
          </div>
          {/* Datos de usuario */}
          <div className="mx-auto grid max-w-lg grid-cols-1 gap-6 sm:mt-8 lg:max-w-4xl lg:grid-cols-1">
            <div className="flex rounded-3xl p-8 ring-2 ring-gray-900/10 sm:p-10">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Ubicación
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {profile.user.location}
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Teléfono
                  </dt>
                  {!editMode ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {profile.user.phone}
                    </dd>
                  ) : (
                    <input
                      type="text"
                      className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 bg-transparent border rounded px-2 py-1 border-indigo-300 focus:outline-none"
                      value={profile.user.phone}
                      onChange={handlePhoneChange}
                    />
                  )}
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Correo electrónico
                  </dt>
                  {!editMode ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {profile.user.email}
                    </dd>
                  ) : (
                    <input
                      type="text"
                      className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 bg-transparent border rounded px-2 py-1 border-indigo-300 focus:outline-none"
                      value={profile.user.email}
                      onChange={handleEmailChange}
                    />
                  )}
                </div>
              </dl>
            </div>

            {/* Datos de Profesional */}
            <div className="flex ring-2 ring-indigo-500 rounded-3xl p-8 sm:p-10">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Acerca de mi
                  </dt>
                  {!editMode ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {profile.aboutMe}
                    </dd>
                  ) : (
                    <input
                      type="text"
                      className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 bg-transparent border rounded px-2 py-1 border-indigo-300 focus:outline-none"
                      value={profile.aboutMe}
                      onChange={handleAboutMeChange}
                    />
                  )}
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Categoría
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {profile.category}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Soy experto en
                  </dt>
                  {!editMode ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {profile.expertise}{" "}
                    </dd>
                  ) : (
                    <input
                      type="text"
                      className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 bg-transparent border rounded px-2 py-1 border-indigo-300 focus:outline-none"
                      value={profile.expertise}
                      onChange={handleExpertiseChange}
                    />
                  )}
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Años de experiencia
                  </dt>
                  {!editMode ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {profile.yearsOfExperience}
                    </dd>
                  ) : (
                    <input
                      type="text"
                      className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 bg-transparent border rounded px-2 py-1 border-indigo-300 focus:outline-none"
                      value={profile.yearsOfExperience}
                      onChange={handleYearsOfExperienceChange}
                    />
                  )}
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Precio por servicio
                  </dt>
                  {!editMode ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {profile.income}
                    </dd>
                  ) : (
                    <input
                      type="text"
                      className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 bg-transparent border rounded px-2 py-1 border-indigo-300 focus:outline-none"
                      value={profile.income}
                      onChange={handleIncomeChange}
                    />
                  )}
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Aquí puedes ver algunos ejemplos de mi trabajo
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <ul
                      role="list"
                      className="divide-y divide-gray-100 rounded-md border border-gray-200"
                    >
                      <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">
                              <a
                                href={profile.url}
                                className="text-indigo-600 hover:text-indigo-500"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Link Personal
                              </a>
                            </span>
                            <span className="flex-shrink-0 text-gray-400">
                              2.4mb
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">
                              <a
                                href="https://example.com/cartadepresentacion_desarrollador_backend"
                                className="text-indigo-600 hover:text-indigo-500"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Link Personal
                              </a>
                            </span>
                            <span className="flex-shrink-0 text-gray-400">
                              4.5mb
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
            {/* Seccion Reseñas */}
            <div className="bg-white">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-lg font-medium text-gray-900">
                  Reseñas de mis clientes
                </h2>
                <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
                  {profile.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
                    >
                      <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                        <div className="flex items-center xl:col-span-1">
                          {/* <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={classNames(
                                  review.rating > rating
                                    ? "text-yellow-400"
                                    : "text-gray-200",
                                  "h-5 w-5 flex-shrink-0"
                                )}
                                aria-hidden="true"
                              />
                            ))}
                          </div> */}
                          <p className="ml-3 text-sm text-gray-700">
                            {review.rating}
                            <span className="sr-only"> out of 5 stars</span>
                          </p>
                        </div>

                        <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                          <h3 className="text-sm font-medium text-gray-900">
                            {review.comment}
                          </h3>

                          {/* <div
                            className="mt-3 space-y-6 text-sm text-gray-500"
                            dangerouslySetInnerHTML={{ __html: review.content }}
                          /> */}
                        </div>
                      </div>

                      <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                        <p className="font-medium text-gray-900">
                          {review.user.name}
                        </p>
                        <time
                          dateTime={review.createdAt}
                          className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                        >
                          {review.createdAt}
                        </time>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button
                type="submit"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => handleRemoveUser(profile.user._id)}
              >
                Eliminar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
