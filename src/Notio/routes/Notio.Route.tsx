import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Products from "../components/Products";
import Subscription from "../components/Subscription";
import My_Chatbox from "../components/My_Chatbox";
import Signup from "../components/Sign_up";

const HomeRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/my_chatbox" element={<My_Chatbox />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default HomeRoute;
