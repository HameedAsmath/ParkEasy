import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {Layout, Table, Typography, Tag} from "antd"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUserContext } from '../context/Usercontext';
import moment from 'moment';

const { Content } = Layout;
const Bookings = () => {
    const {id} = useUserContext()
    const[bookeddata,setBookingdata] = useState([])
    useEffect(()=>{
        if(id){
            const getbookingDetail = async () => {
                try {
                  const res = await axios.post(`/getbookedparking/`,{id});
                  setBookingdata(res?.data);
                } catch (error) {
                  toast.error("Something went wrong!");
                  console.log(error);
                }
              };
              getbookingDetail();
        }
    },[id])
    useEffect(()=>{
        console.log(bookeddata)
    },[bookeddata])
        const columns = [
        {
            title: "State",
            width: 50,
            dataIndex: "bookedParking",
            render: (bookedParking) => <Typography.Text>{bookedParking?.state}</Typography.Text>,
            key: "vehicle",
          },
          {
            title: "Area",
            width: 50,
            dataIndex: "bookedParking",
            render: (bookedParking) => <Typography.Text>{bookedParking?.area}</Typography.Text>,
            key: "hour",
          },
          {
            title: "Vehicle",
            width: 50,
            dataIndex: "vehicle",
            key: "hour",
          },
          {
            title: "Hour",
            width: 50,
            dataIndex: "hour",
            key: "hour",
          },
          {
            title: "Amount",
            width: 50,
            dataIndex: "amount",
            key: "amount",
          },
          {
            title: "Date/Time",
            width: 50,
            dataIndex: "createdAt",
            render:(createdAt) => <Typography.Text>{moment(createdAt).format("YYYY-MM-DD HH:mm")}</Typography.Text> ,
            key: "createdAt",
          },
          {
            title: "Payment status",
            width: 50,
            dataIndex: "isPaid",
            render:(isPaid) => <Typography.Text>{isPaid ?  <Tag color="orange">pending</Tag> :  <Tag color="green">success</Tag>}</Typography.Text> ,
            key: "isPaid",
          },
    ]

  return (
    <Layout className="layout">
      <Navbar />
      <Content>
        <div className="site-layout-content">
        <Table
            columns={columns}
            dataSource={bookeddata}
            className="table-center"
            pagination={false}
          />
        </div>
      </Content>
      <Footer />
    </Layout>
  )
}

export default Bookings