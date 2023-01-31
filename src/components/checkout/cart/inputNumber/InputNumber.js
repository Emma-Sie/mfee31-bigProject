import { InputNumber } from "antd";

const onChange = (value) => {
  console.log("changed", value);
};
const InputNum = () => (
  <InputNumber
    min={1}
    defaultValue={1}
    onChange={onChange}
  />
);
export default InputNum;
