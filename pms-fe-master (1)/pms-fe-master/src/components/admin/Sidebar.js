import React from 'react'
import {  Menu,  Layout } from "antd";
import { Link } from 'react-router-dom';

const {Sider} = Layout
const Sidebar = () => {
  return (
    <>
        <Sider width={200}>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              margin: "20px 0",
              height: "100%",
              borderRight: 0,
            }}
          >
            <Menu.Item><Link to="/create-parking">Create Parking</Link></Menu.Item>
            <Menu.Item><Link to="/view-parking">View Parking</Link></Menu.Item>
          </Menu>
        </Sider>
    </>
  )
}

export default Sidebar