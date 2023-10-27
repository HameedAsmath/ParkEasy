import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Spin } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/Usercontext";

const { Content } = Layout;
const UserHome = () => {
  const {id} = useUserContext()
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      const updateparking = async() => {
        // const res = await axios.put("/update-payment-status",{id})
      }
      updateparking()
      toast.success("Payment successfull")
    }
    if (query.get("canceled")) {
      toast.error("payment failed")
    }
  }, []);
  const navigate = useNavigate()
  // const [location, setLocation] = useState({ lat: null, lng: null });
  const [allParkings, setAllparkings] = useState([]);
  useEffect(() => {
    const getAllParkings = async () => {
      try {
        const res = await axios.get("/getallparkings");
        if (res.status === 200) {
          setAllparkings(res?.data);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    };
    getAllParkings();
  }, []);

  const containerStyle = {
    width: "100%",
    height: "700px",
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const center = {
    lat: 9.9252,
    lng: 78.1198,
  };
  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  return (
    <Layout className="layout">
      <Navbar />
      <Content>
        <div className="site-layout-content">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              {allParkings.length !== 0 && allParkings.map((parking,i)=>(
                <MarkerF key ={i} onLoad={onLoad} position={{lat: parking.lat, lng: parking.lng}} onClick={()=>navigate(`/parkingdetails/${parking._id}`)} />
              ))
              }
            </GoogleMap>
          ) : (
            <>
              <Spin className="loader" size="large"/>
            </>
          )}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default React.memo(UserHome);
