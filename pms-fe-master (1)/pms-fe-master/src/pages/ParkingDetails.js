import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Layout, Table } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button, Typography, Space, Select } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import { useUserContext } from "../context/Usercontext"; 


const { Content } = Layout;
const ParkingDetails = () => {
  const {id: userId} = useUserContext();
  const [vehicle, setVehicle] = useState();
  const [hour, setHour] = useState();
  const [amount, setAmount] = useState(0);
  const [parkingDetail, setParkingDetail] = useState();
  const { id: parkingId } = useParams();

  useEffect(() => {
    const getparkingDetail = async () => {
      try {
        const res = await axios.post(`/getparkingdetail/${parkingId}`);
        setParkingDetail(res?.data);
        console.log(res?.data);
      } catch (error) {
        toast.error("Something went wrong!");
        console.log(error);
      }
    };
    getparkingDetail();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=>{
    if(vehicle === "Two Wheeler"){
      setAmount(hour * parkingDetail.bikeamount)
    }
    if(vehicle === "Four Wheeler"){
      setAmount(hour * parkingDetail.caramount)
    }
    if(vehicle === "Heavy"){
      setAmount(hour * parkingDetail.busamount)
    }
  },[hour, vehicle]) // eslint-disable-line react-hooks/exhaustive-deps

  const columns = [
    {
      title: "State",
      width: 50,
      dataIndex: "state",
      key: "state",
      fixed: "left",
    },
    {
      title: "Area",
      width: 50,
      dataIndex: "area",
      key: "area",
      fixed: "left",
    },
    {
      title: "lattitude",
      width: 50,
      dataIndex: "lat",
      key: "lat",
    },
    {
      title: "longitude",
      width: 50,
      dataIndex: "lng",
      key: "lng",
    },
    {
      title: "Two Wheeler",
      width: 100,
      key: "Two Wheeler",
      children: [
        {
          title: "slots",
          dataIndex: "bikelot",
          key: "bikelot",
          width: 50,
        },
        {
          title: "amount",
          dataIndex: "bikeamount",
          key: "bikeamount",
          width: 50,
        },
      ],
    },
    {
      title: "Four Wheeler",
      width: 100,
      key: "Four Wheeler",
      children: [
        {
          title: "slots",
          dataIndex: "carlot",
          key: "carlot",
          width: 50,
        },
        {
          title: "amount",
          dataIndex: "caramount",
          key: "caramount",
          width: 50,
        },
      ],
    },
    {
      title: "Heavy",
      width: 100,
      key: "Heavy",
      children: [
        {
          title: "slots",
          dataIndex: "buslot",
          key: "buslot",
          width: 50,
        },
        {
          title: "amount",
          dataIndex: "busamount",
          key: "busamount",
          width: 50,
        },
      ],
    },
  ];
  const dateObject = new Date();
  const handleVehicleChange = (value) => {
    setVehicle(value);
  };
  const handleHourChange = (value) => {
    setHour(value);
    dateObject.setHours(dateObject.getHours() + value)
  };

  const makePayment = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY); 
    const body = { hour,amount,vehicle,parkingId,userId }; 
    const headers = { 
      "Content-Type": "application/json", 
    }; 
 
    const response = await fetch( 
      "http://localhost:4000/create-checkout-session", 
      { 
        method: "POST", 
        headers: headers, 
        body: JSON.stringify(body), 
      } 
    ); 
    toast.loading("loading...")
    const session = await response.json(); 
    const result = stripe.redirectToCheckout({ 
      sessionId: session.id, 
    });
    if(result.error) { 
      console.log(result.error); 
      toast.error("Payment Failed")
    } 
  }; 

  return (
    <Layout className="layout">
      <Navbar />
      <Content>
        <div className="site-layout-content parking-detail-table">
          <Typography.Title className="text-center">
            Parking Details
          </Typography.Title>
          <Table
            columns={columns}
            dataSource={[parkingDetail]}
            className="table-center"
            pagination={false}
          />
          <Typography.Text className="text-center mt-4">          
            Total: {amount}<br></br>
            Time: {dateObject.getDate()}-
            {dateObject.getMonth()}-
            {dateObject.getFullYear()}&nbsp;
            {dateObject.getHours()}:
            {dateObject.getMinutes()}
          </Typography.Text>
          <Space wrap className="mt-5">
            <Select
              placeholder="Select Vehicle"
              style={{
                width: 220,
              }}
              onChange={handleVehicleChange}
              options={[
                {
                  value: "Two Wheeler",
                  label: "Two Wheeler",
                },
                {
                  value: "Four Wheeler",
                  label: "Four Wheeler",
                },
                {
                  value: "Heavy",
                  label: "Heavy",
                },
              ]}
            />
            <Select
              onChange={handleHourChange}
              placeholder="Select hour"
              style={{
                width: 220,
              }}
              options={[
                {
                  value: "1",
                  label: "1 hour",
                },
                {
                  value: "2",
                  label: "2 hour",
                },
                {
                  value: "3",
                  label: "3 hour",
                },
                {
                  value: "4",
                  label: "4 hour",
                },
                {
                  value: "5",
                  label: "5 hour",
                },
                {
                  value: "6",
                  label: "6 hours",
                },
                {
                  value: "12",
                  label: "12 hours",
                },
                {
                  value: "24",
                  label: "1 day",
                },
                {
                  value: "72",
                  label: "3 days",
                },
              ]}
            />
            <Button type="primary" onClick={makePayment}>Book Slot</Button>
          </Space>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default ParkingDetails;
