import { Layout, Menu } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../context/Usercontext";

const { Header } = Layout;
const Navbar = () => {
  const { setIsAdmin, setFirstName, setEmail, setId } = useUserContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setIsAdmin(false);
    setEmail("");
    setFirstName("");
    setId("");
    navigate("/login", { replace: true });
  };
  return (
    <div>
      <Header>
        <div className="logo">
          <Link to="/home">
            <img
              src="https://w7.pngwing.com/pngs/258/471/png-transparent-car-park-parking-escalator-blue-electronics-text-thumbnail.png"
              alt="logo"
              className="nav-logo"
              height={40}
            />
          </Link>
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Link to="/home">
          <Menu.Item key="1">Home</Menu.Item>
        </Link>
        <Link to="/bookings">
          <Menu.Item key="2">Bookings</Menu.Item>
        </Link>
          <Menu.Item className="float-right" key="4">
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </Menu.Item>
        </Menu>
      </Header>
    </div>
  );
};

export default Navbar;
