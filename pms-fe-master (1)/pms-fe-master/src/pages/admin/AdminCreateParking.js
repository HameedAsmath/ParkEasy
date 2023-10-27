import { useState } from "react";
import { Button, Form, Input, Layout, Typography, Row, Col } from "antd";
import Footer from "../../components/Footer";
import Header from "../../components/admin/Header";
import Sider from "../../components/admin/Sidebar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useUserContext } from "../../context/Usercontext";

const { Content } = Layout;
const AdminCreateParking = () => {
  // const [location, setLocation] = useState({ lat: null, lng: null });

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setLocation({ lat: latitude, lng: longitude });
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }, []);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const {email,id} = useUserContext()
  const onFinish = async(values) => {
    try {
    setLoading(true)
    const res = await axios.post("/createparking",{...values,email,refid: id })
    if(res.status===201){
      toast.success("New parking created")
      form.resetFields()
    }
    setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
      setLoading(false)
    }
  };
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
            <div className="admin-form-container">
              <Form
                form={form}
                layout="vertical"
                name="normal_login"
                className="admin-parking-form"
                onFinish={onFinish}
              >
                <Typography.Title className="text-center">
                  Create Parking Lot
                </Typography.Title>
                {/* Area */}
                <Form.Item
                  label="Area"
                  name="area"
                  rules={[
                    {
                      required: true,
                      message: "Area is required!",
                    },
                  ]}
                >
                <Input placeholder="State" />
                </Form.Item>
                {/* State */}
                <Form.Item
                  label="State"
                  name="state"
                  rules={[
                    {
                      required: true,
                      message: "State is required!",
                    },
                  ]}
                >
                  <Input placeholder="Area" />
                </Form.Item>
                {/* Coordinates */}
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item
                      label="Lattitude"
                      name="lat"
                      rules={[
                        {
                          required: true,
                          message: "Lattitude is required!",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Lattitude" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Longitude"
                      name="lng"
                      rules={[
                        {
                          required: true,
                          message: "Longitude is required!",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Longitude"/>
                    </Form.Item>
                  </Col>
                </Row>
                {/* Bike */}
                <Typography.Text className="vehicle-text">Two Wheeler</Typography.Text>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item
                      label="Slots"
                      name="bikelot"
                      rules={[
                        {
                          required: true,
                          message: "Number of slots is required!",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="No:of:slots" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Amount"
                      name="bikeamount"
                      rules={[
                        {
                          required: true,
                          message: "Amount is required!",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="rupee/hr" />
                    </Form.Item>
                  </Col>
                </Row>
                {/* Car */}
                <Typography.Text className="vehicle-text">Four Wheeler</Typography.Text>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item
                      label="Slots"
                      name="carlot"
                      rules={[
                        {
                          required: true,
                          message: "Number of slots is required!",
                        },
                      ]}>
                      <Input type="number" placeholder="No:of:slots" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Amount"
                      name="caramount"
                      rules={[
                        {
                          required: true,
                          message: "Amount is required!",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="rupee/hr" />
                    </Form.Item>
                  </Col>
                </Row>
                {/* Bus/Truck */}
                <Typography.Text className="vehicle-text">Heavy</Typography.Text>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item
                      label="Slots"
                      name="buslot"
                      rules={[
                        {
                          required: true,
                          message: "Number of slots is required!",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="No:of:slots" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Amount"
                      name="busamount"
                      rules={[
                        {
                          required: true,
                          message: "Amount is required!",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="rupee/hr" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  {!loading && (<Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button">
                    Create
                  </Button>)}
                  {loading && (
                    <Button
                    disabled
                    type="primary"
                    htmlType="submit"
                    className="login-form-button">
                    loading...
                  </Button>
                  )}
                  
                </Form.Item>
              </Form>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminCreateParking;
