import {  Menu, Typography, Layout } from "antd";
import { useUserContext } from "../../context/Usercontext";
import { useNavigate, Link } from "react-router-dom";

const { Header } = Layout;
const HeaderComponent = () => {
    const { navigate } = useNavigate();
  const { setIsAdmin, setFirstName, setEmail, setId } = useUserContext();
  const handleLogout = () => {
    localStorage.clear();
    setIsAdmin(false);
    setEmail("");
    setFirstName("");
    setId("")
    navigate("/login", { replace: true });
  };
  return (
    <>
    <Header className="header">
        <div className="logo">
          <Link to="/admin-home">
          <img
            src="https://w7.pngwing.com/pngs/258/471/png-transparent-car-park-parking-escalator-blue-electronics-text-thumbnail.png"
            alt="logo"
            className="nav-logo"
            height={40}
          />
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          className="space-around">
          <Typography.Text className="nav-title">
            Parking Management System
          </Typography.Text>
          <Menu.Item key="1">
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </Menu.Item>
        </Menu>
      </Header></>
  )
}

export default  HeaderComponent