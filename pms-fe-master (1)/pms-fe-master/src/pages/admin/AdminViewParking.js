import { useEffect, useState } from "react";
import { Layout, Spin, Table, Button } from "antd";
import Footer from "../../components/Footer";
import Header from "../../components/admin/Header";
import Sider from "../../components/admin/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/Usercontext";
const { Content } = Layout;

const AdminViewParking = () => {
  const navigate = useNavigate();
  const { email } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const getAllParkings = async () => {
    try {
      setLoading(true);
      const res = await axios.post("https://pms-be.vercel.app/viewparking", { email });
      if (res.status === 200) {
        setData(res?.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllParkings();
  }, [email]); // eslint-disable-line react-hooks/exhaustive-deps
  const handleUpdate = (id) => {
    navigate(`/update-parking/${id}`);
  };
  const handleDelete = async (id) => {
    try {
      const res = axios.delete(`/deleteparking/${id}`);
      if (res.status === 200) {
        toast.success(` parking deleted successfully`);
      }
      navigate(0);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
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
          width: 50
        },
        {
          title: "amount",
          dataIndex: "busamount",
          key: "busamount",
          width: 50
        },
      ],
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      dataIndex: "_id",
      width: 100,
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleUpdate(record._id)}>
            update
          </Button>
          <Button
            onClick={() => handleDelete(record._id)}
            danger
            style={{ marginLeft: "5px" }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider />
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: "100vh",
            }}
          >
            {loading && <Spin className="loader" size="large" />}
            {!loading && (
              <Table
                columns={columns}
                dataSource={data}
                scroll={{
                  x: 1300,
                }}
              />
            )}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminViewParking;
