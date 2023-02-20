import { Rate } from "antd";
const FiterRate = ({ value }) => (
  <Rate
    disabled
    defaultValue={value}
    style={{
      cursor: "pointer",
      paddingLeft: "20px",
    }}
  />
);
export default FiterRate;
