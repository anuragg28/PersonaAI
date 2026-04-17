import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";

import BusinessDetails from "./pages/Inputpage";
import Report from "./pages/Report";
import QueriesPage from "./pages/QueriesPage";
import Landingpage from "./pages/Landingpage";
import AppLayout from "./AppLayout";
import Product from "./pages/Product";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      {/* Home Route */}
      <Route index element={<Landingpage />} />

      <Route path="/persona">
        <Route path="details" element={<BusinessDetails />} />
        <Route path="report">
          <Route index element={<Report />} />
          <Route path="concerns" element={<QueriesPage />} />
        </Route>
      </Route>

      <Route path="/product" element={<Product />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />


      {/* InputPage Route */}
    </Route>
  )
);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <h2 className='text-xl'>Persona AI</h2> */}

      <RouterProvider router={router} />
    </>
  );
}

export default App;
