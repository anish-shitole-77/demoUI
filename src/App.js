import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Productlisting from "./pages/Product_listing/Productlisting";
import Productdetail from "./pages/Product_detail/Productdetail";
import Checkout from "./pages/Checkout/Checkout";
import UserLogReg from "./pages/Login_register/UserLogReg";
import Admin from "./pages/Admin/Admin";
import UserLogin from "./pages/Login_register/UserLogin";
import UserDataActions from "./pages/Login_register/UserDataActions ";
import Admin_Header from "./pages/Admin/Admin_Header";
import AdminInfo from "./pages/Admin/AdminInfo";
import UserProfile from "./pages/users/UserProfile";
import UserList from "./pages/Admin/UserList";
import ShippingPolicy from "./pages/Shipping-Policy/ShippingPolicy";
import PrivacyPolicy from "./pages/Privacy-Policy/PrivacyPolicy";
import TermsCondition from "./pages/Terms-Condition/TermsCondition";
import Upload_products from "./pages/Upload_files/Upload_products";
import Upload_Advertise from "./pages/Upload_files/Upload_Advertise";

function App() {
  return (
    <Routes>
      {/* Admin Files */}
      <Route path="/admin_header" element={<Admin_Header />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/admin_info" element={<AdminInfo />} />
      {/*  */}

      {/* Upload Poducts */}
      <Route path="/uploadProducts/:p_category" element={<Upload_products />} />
      <Route path="/uplodeAdvertise" element={<Upload_Advertise />} />
      {/*  */}

      {/* Show User's List */}
      <Route path="/userList" element={<UserList />} />
      {/*  */}

      {/* All login & Register Pages */}
      <Route path="/login_register" element={<UserLogReg />} />
      <Route path="/UserLogin" element={<UserLogin />} />
      <Route path="/UserProfile" element={<UserProfile />} />
      {/*  */}

      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/product_listing/:id" element={<Productlisting />} />
      <Route path="/product_detail/:p_id/:category" element={<Productdetail />} />

      {/*  */}
      {/* <Route path="/sadi" element={<SareeListing />} /> */}
      {/*  */}

      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/shipping_policy" element={<ShippingPolicy />} />
      <Route path="/privacy_policy" element={<PrivacyPolicy />} />
      <Route path="/terms_condition" element={<TermsCondition />} />

      <Route path="/user_data" element={<UserDataActions />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
