import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HideNav from "./Components/Hide/HideFooter";
import Navbar from "./Components/Header/Header/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import HideFooter from "./Components/Hide/HideFooter";
import { RingLoader } from "react-spinners";

// Sử dụng React.lazy để lazy-load các component
const HomePage = lazy(() => import("./Components/Content/HomePage/HomePage"));
const LoginPage = lazy(() => import("./Components/Header/Login/LoginPage"));
const ProductPage = lazy(() =>
  import("./Components/Content/Product/ProductPage")
);
const DiamondPrice = lazy(() =>
  import("./Components/Content/NavPage/DiamondPrice")
);
const DiamonKnow = lazy(() =>
  import("./Components/Content/NavPage/DiamonKnow")
);
const JewelryKnow = lazy(() =>
  import("./Components/Content/NavPage/JewelryKnow")
);
const Intro = lazy(() => import("./Components/Content/NavPage/Intro"));
const ShoppingBag = lazy(() =>
  import("./Components/Content/SellProduct/Process/ShoppingBag")
);
const AllItems = lazy(() =>
  import("./Components/Content/SellProduct/Process/AllItems")
);
const CheckOutPage = lazy(() =>
  import("./Components/Content/SellProduct/Process/CheckOutPage")
);
const ReviewOrder = lazy(() =>
  import("./Components/Content/SellProduct/Process/ReviewOrder")
);
const OrderSuccess = lazy(() =>
  import("./Components/Content/SellProduct/Order/OrderSuccess")
);
const UserProfile = lazy(() => import("./Components/Header/Login/UserProfile"));
const OrderDetails = lazy(() =>
  import("./Components/Content/SellProduct/Order/OrderDetails")
);
const OrderHistory = lazy(() =>
  import("./Components/Content/SellProduct/Order/OrderHistory")
);
const HistoryOrderDetails = lazy(() =>
  import("./Components/Content/SellProduct/Order/HistoryOrderDetails")
);

function App() {
  return (
    <>
      <HideNav>
        <Navbar />
      </HideNav>
      <Suspense
        fallback={
          <div className="w-screen h-[80vh] flex justify-center items-center">
            <RingLoader size={100} color="#54cc26" />
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
              </>
            }
          />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/ProductPage/:id" element={<ProductPage />} />
          <Route path="/DiamonPrice" element={<DiamondPrice />} />
          <Route path="/DiamonKnow" element={<DiamonKnow />} />
          <Route path="/JewelryKnow" element={<JewelryKnow />} />
          <Route path="/Intro" element={<Intro />} />
          <Route path="/AllItems/:category" element={<AllItems />} />
          <Route path="/ShoppingBag" element={<ShoppingBag />} />
          <Route path="/CheckOutPage" element={<CheckOutPage />} />
          <Route path="/ReviewOrder" element={<ReviewOrder />} />
          <Route path="/OrderSuccess" element={<OrderSuccess />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/OrderDetails" element={<OrderDetails />} />
          <Route path="/OrderHistory" element={<OrderHistory />} />
          <Route
            path="/HistoryOrderDetails/:id"
            element={<HistoryOrderDetails />}
          />
        </Routes>
      </Suspense>
      <HideFooter>
        <Footer />
      </HideFooter>
    </>
  );
}

export default App;
