import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ProductListModal({
  show,
  handleClose,
  id,
  productName,
  productStorage,
  productPrice,
  setProductName,
  setProductPrice,
  setProductStorage,
  updateProduct,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>修改產品</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>產品名稱</Form.Label>
              <Form.Control
                type="text"
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>價格</Form.Label>
              <Form.Control
                type="number"
                value={productPrice}
                onChange={(e) => {
                  setProductPrice(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>庫存</Form.Label>
              <Form.Control
                type="number"
                value={productStorage}
                onChange={(e) => {
                  setProductStorage(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateProduct(
                id,
                productName,
                productPrice,
                productStorage
              );
              console.log(
                id,
                productName,
                productPrice,
                productStorage
              );
              handleClose();
            }}
          >
            保存
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductListModal;
