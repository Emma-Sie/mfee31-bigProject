import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ProductListAddModal({
  show1,
  handleClose,
  productType,
  setProductType,
  productBrand,
  setProductBrand,
  productName,
  productStorage,
  productPrice,
  setProductName,
  setProductPrice,
  setProductStorage,
  insertProduct,
  changeHandler,
  uploadRef,
}) {
  return (
    <>
      <Modal show={show1} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>新增產品</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>品牌</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={productBrand}
                onChange={(e) => {
                  setProductBrand(e.target.value);
                }}
              >
                <option>選擇品牌</option>
                <option value="AsusRog">ASUS-ROG</option>
                <option value="Razer">Razer</option>
                <option value="Logitech">Logitech</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>種類</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={productType}
                onChange={(e) => {
                  setProductType(e.target.value);
                }}
              >
                <option>選擇種類</option>
                <option value="1">背包</option>
                <option value="2">耳機</option>
                <option value="3">散熱器</option>
                <option value="4">鍵盤</option>
                <option value="5">滑鼠</option>
                <option value="6">滑鼠墊</option>
                <option value="7">周邊商品</option>
                <option value="8">視訊工具</option>
              </Form.Select>
            </Form.Group>
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
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>上傳圖片</Form.Label>
              <Form.Control
                ref={uploadRef}
                type="file"
                multiple
                onChange={changeHandler}
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
              insertProduct(
                productBrand,
                productType,
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

export default ProductListAddModal;
