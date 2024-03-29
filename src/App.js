import HomePage from "./components/HomePage"
import { Route, Routes } from "react-router-dom";
import TestPage from "./components/TestPage";
import TestResult from "./components/TestResult";
import Header from "./components/Header";
import ConditionPage from "./components/ConditionPage";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Timer from "./components/Timer";
import SignupForm from "./components/SignupForm";
import Signup from "./components/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./components/ForgotPassword";
import  Auth from "./components/auth";

export default function App() {

  return (
    <div className="w-full h-screen">
      <Header/>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/timer" element={<Timer/>}/>
          <Route path="/test" element={<TestPage/>}/>
          <Route path="/testresult" element={<TestResult/>}/>
          <Route path="/testcondition" element={<ConditionPage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>

          <Route path="/auth" element={<Auth/>}/>
      </Routes>
      <ToastContainer/>
    </div>
  )
}