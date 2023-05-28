import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "tailwindcss/tailwind.css";

// Components and Pages
import Header from "./components/header";
import Home from "./pages/Home";
import Login from "./pages/login.jsx";
import CustomerUser from "./pages/customerUser.jsx";
import ProUser from "./pages/proUser.jsx";
import Review from "./pages/review.jsx";
import ProSearch from "./components/proSearch.jsx";
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
        <div className="bg-white">
          <div className="py-2 my-4">
            <Header />
              <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Login />
                <CustomerUser />
                <ProUser />
                <Profile />
                <Review />
                <ProSearch />
                <Pricing />
                <Stats />
                <Testimonials />
                <Team />
            </Routes>
              </div>
            <Footer />
            {/* <ErrorPage /> */}
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
