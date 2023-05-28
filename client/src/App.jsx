import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "tailwindcss/tailwind.css";

// Components and Pages
import Header from "./components/header.jsx";
import Home from "./pages/Home";
import Login from "./pages/login.jsx";
import CustomerUser from "./pages/customerUser.jsx";
import ProUser from "./pages/proUser.jsx";
import Results from "./pages/results.jsx";
import Footer from "./components/footer.jsx";
// import ErrorPage from "./pages/errorPage.jsx";

import Profile from "./pages/profile.jsx";
// import ErrorPage from "./components/footer.jsx";

const client = new ApolloClient({
  uri: "/graphql",
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
              <Route path="/profile" element={<Profile />} />
              <Route path="/results" element={<Results />} />
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
