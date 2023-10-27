import { Typography, Layout } from "antd"

const Footer = () => {
  return (
    <div>
        <Layout.Footer
        style={{
          textAlign: "center",
        }}
      >
        <Typography.Text>
          Parking Management System ©2023 All rights are reserved
        </Typography.Text>
      </Layout.Footer>
    </div>
  )
}

export default Footer