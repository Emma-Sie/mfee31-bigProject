import Form from "react-bootstrap/Form";

function FiterBrand() {
  return (
    <Form>
      <div
        className="brand"
        style={{
          marginTop: "3px",
          paddingLeft: "20px",
        }}
      >
        品牌
      </div>
      {["ASUS-ROG", "Razer", "logitech"].map((brand) => (
        <div
          key={`default-${brand}`}
          className="mb-3 d-flex"
          style={{
            marginTop: "15px",
            marginLeft: "20px",
          }}
        >
          <Form.Check
            type="checkbox"
            id={`default-${brand}`}
            label={`${brand}`}
            style={{
              cursor: "pointer",
            }}
          />
        </div>
      ))}
    </Form>
  );
}

export default FiterBrand;
