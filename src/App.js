import HomePage from "./components/HomePage"
import { Route, Routes } from "react-router-dom";
import TestPage from "./components/TestPage";
import TestResult from "./components/TestResult";
import Header from "./components/Header";
import ConditionPage from "./components/ConditionPage";
import Dashboard from "./components/Dashboard";
import LeaderBoard from "./components/LeaderBoard";
import Login from "./components/Login";
import Timer from "./components/Timer";
import SignupForm from "./components/SignupForm";
import Signup from "./components/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./components/ForgotPassword";
import  Auth from "./components/auth";
import { useState } from "react";
import AddTest from "./components/admin/AddTest";
import LiveTestPage from "./components/admin/LiveTestPage";
import LiveTestCurrentPage from "./components/LiveTest/LiveTestCurrentPage";
import LiveTestResult from "./components/LiveTest/LiveTestResult";
import LiveConditionPage from "./components/LiveTest/LiveConditionPage";
import LiveTestLeaderBoard from "./components/LiveTest/LiveTestLeaderBoard";

export default function App() {
  const [hideHeader, setHideHeader] = useState(false);
  return (
    <div className="w-full h-screen">
    <div>
      {
        hideHeader ? (<></>) : ( <Header/>)
      }
    </div>
     
      <Routes>
          <Route path="/" element={<HomePage setHideHeader={setHideHeader}/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/timer" element={<Timer/>}/>
          <Route path="/test" element={<TestPage setHideHeader={setHideHeader}/>}/>
          <Route path="/livetest" element={<LiveTestCurrentPage setHideHeader={setHideHeader}/>}/>
          <Route path="/testresult" element={<TestResult/>}/>
          <Route path="/testcondition" element={<ConditionPage setHideHeader={setHideHeader}/>}/>
          <Route path="/livetestcondition" element={<LiveConditionPage setHideHeader={setHideHeader}/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/leaderboard" element={<LeaderBoard/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/admin/addtest" element={<AddTest/>}/>
          <Route path="/admin/livetest" element={<LiveTestPage/>}/>
          <Route path="/livetestresult" element={<LiveTestResult/>}/>
          <Route path="/livetestleaderboard" element={<LiveTestLeaderBoard/>}/>
          <Route path="/auth" element={<Auth/>}/>
      </Routes>
      <ToastContainer/>
    </div>
  )
}