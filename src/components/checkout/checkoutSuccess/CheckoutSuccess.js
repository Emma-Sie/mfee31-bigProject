import { Button, Result } from "antd";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";


const App = () => (
  <Result
    status="success"
    title="訂單已成立"
    subTitle={`Order number: 202301160221332 Cloud server configuration takes 1-5 minutes, please wait.`}
    extra={[
      <Button
        type="primary"
        style={{
          backgroundColor: "#FB570B",
        }}
      >
        返回首頁
      </Button>,
    ]}
  />
);

function CheckoutSuccess() {
  return (
    <>
      <Header />
      <App />
      <Footer />
    </>
  )
}

export default CheckoutSuccess;
