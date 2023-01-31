import { BsFillCartFill } from "react-icons/bs";
import { Button, Result } from "antd";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";

const App = () => (
  <Result
    style={{
      fontWeight: "bold",
    }}
    icon={
      <BsFillCartFill
        style={{
          width: "20rem",
          height: "20rem",
          color: "#FB570B",
        }}
      />
    }
    title="你的購物車是空的"
    extra={[
      [
        <Button
          type="primary"
          style={{
            background: "red",
            borderColor: "yellow",
            width: "15rem",
            fontWeight: "bold",
          }}
        >
          繼續購物
        </Button>,
        <br />,
        <br />,
        <Button
          style={{
            color: "#FB570B",
            borderColor: "#FB570B",
            width: "15rem",
            fontWeight: "bold",
          }}
        >
          我的訂單
        </Button>,
      ],
    ]}
  />
);

function CartNull() {
  return <>
    <Header />
    <App />
    <Footer />
  </>;
}

export default CartNull;
