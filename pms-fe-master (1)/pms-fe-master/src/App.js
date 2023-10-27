 import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import UserHome from "./pages/UserHome";
import Login from "./components/Login";
import Register from "./components/Register";
// import AdminHome from "./pages/admin/AdminHome";
import AdminCreateParking from "./pages/admin/AdminCreateParking"
import AdminViewParking from "./pages/admin/AdminViewParking";
import UpdateParking from "./pages/admin/UpdateParking";
import { useUserContext } from "./context/Usercontext";
import axios from "axios";
import ParkingDetails from "./pages/ParkingDetails";
import Bookings from "./pages/Bookings";

function App() {
  const {setIsAdmin, setEmail, setFirstName, setId} = useUserContext()
  const isLoggedin = localStorage.getItem("isLoggedin")
  const isLocalAdmin = localStorage.getItem("isLocalAdmin")
  const token = localStorage.getItem("token")
  useEffect(()=>{
    const getUserDetails = async()=>{
      const res = await axios.post("https://pms-be.vercel.app/userdetails",{token})
      setEmail(res?.data?.email)
      setFirstName(res?.data?.firstname)
      setIsAdmin(res?.data?.isAdmin)
      setId(res?.data?._id)
    }
    if(isLoggedin){
      getUserDetails()
    }
  },[]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <Routes>
        <Route index element={isLoggedin ? <UserHome/> : <Login />} />
        <Route exact path="/home" element={isLoggedin ? <UserHome/> : <Login/>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/parkingdetails/:id" element={isLoggedin ? <ParkingDetails/> : <Login/>} />
        <Route path="/bookings" element={isLoggedin ? <Bookings/> : <Login/>}/>
        {/* Admin */}
        <Route exact path="/admin-home" element={isLoggedin && isLocalAdmin ? <AdminViewParking/> : <Login/>} />
        <Route exact path="/create-parking" element={isLoggedin && isLocalAdmin ? <AdminCreateParking/> : <Login/>} />     
        <Route exact path="/view-parking" element={isLoggedin && isLocalAdmin ? <AdminViewParking/> : <Login/>} /> 
        <Route path="/update-parking/:id" element={isLoggedin && isLocalAdmin ? <UpdateParking/> : <Login/>} />
      </Routes>
    </div>
  );
}

export default App;
