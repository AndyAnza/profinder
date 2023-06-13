import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "tailwindcss/tailwind.css";

// Components and Pages
import Header from "./components/header.jsx";
import Home from "./pages/Home";
import Login from "./pages/login.jsx";
import CustomerUser from "./pages/customerUser.jsx";
import ProUser from "./pages/proUser.jsx";
import Results from "./pages/results.jsx";
import ProInfo from "./pages/proInfo.jsx";
import Footer from "./components/footer.jsx";
import Us from "./pages/us.jsx";
import Faq from "./pages/faq.jsx";
// import ErrorPage from "./pages/errorPage.jsx";
// import ErrorPage from "./components/footer.jsx";

// Construct our main GraphQL API endpoint
// const httpLink = createHttpLink({
//   uri: "http://localhost:3001/graphql",
// });

const httpLink = createHttpLink({
  uri: "https://profinder-dev.herokuapp.com/graphql", // Replace with your deployed server URL
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="bg-white">
          <div className="py-2 my-4">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-in" element={<CustomerUser />} />
              <Route path="/create-professional" element={<ProUser />} />
              <Route path="/profile/:userId" element={<ProInfo />} />
              <Route path="/results" element={<Results />} />
              <Route path="/us" element={<Us />} />
              <Route path="/faq" element={<Faq />} />
            </Routes>
            <Footer />
            {/* <ErrorPage /> */}
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
