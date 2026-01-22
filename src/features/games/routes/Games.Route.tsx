import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupForm from "../components/Sign_up";
import DashBoard from "../components/DashBoard";
import Forget_Password from "../components/Forget_Password";
import Games from "../components/Games";
import Users from "../components/user";

const GamesRoute = () => {
  return (
 <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/forgot_password" element={<Forget_Password />} />
          <Route path="/games/:id" element={<Games />} />
          <Route path="/user" element={<Users />} />
        </Routes>
      </BrowserRouter>  )
}

export default GamesRoute