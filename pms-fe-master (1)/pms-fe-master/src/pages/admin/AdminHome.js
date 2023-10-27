import { Layout } from "antd";
import Footer from "../../components/Footer"
import Header from "../../components/admin/Header"
import Sider from "../../components/admin/Sidebar"
const {  Content } = Layout;

const AdminHome = () => {
  return (
    <Layout>
    <Header/>
      <Layout>
        <Sider/>
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
            Content
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminHome;
