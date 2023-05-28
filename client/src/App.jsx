import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "tailwindcss/tailwind.css";

// Components
import Hero from "./components/hero.jsx";
import Login from "./pages/login.jsx";
import CustomerUser from "./pages/customerUser.jsx";
import ProUser from "./pages/proUser.jsx";
import Review from "./pages/review.jsx";
import ProSearch from "./components/proSearch.jsx";
import JobCategory from "./pages/jobCategory.jsx";
import Pricing from "./components/pricing.jsx";
import Footer from "./components/footer.jsx";
import ErrorPage from "./pages/errorPage.jsx";
import Team from "./components/team.jsx";
import Stats from "./components/stats.jsx";
import Testimonials from "./components/testimonials.jsx";
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
        <>
          <Hero />
          <Login />
          <CustomerUser />
          <ProUser />
          <Profile />
          <Review />
          <ProSearch />
          <JobCategory />
          <Pricing />
          <Stats />
          <Testimonials />
          <Team />
          <Footer />
          {/* <ErrorPage /> */}
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
