import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Star from "./Star";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { useAuth } from "../../utils/useAuth";

const MySwal = withReactContent(Swal);
function LikeProduct({
  id,
  product_name,
  price,
  rate,
  images,
  data,
  deleteLike,
}) {
  const { currentUser } = useAuth();
  
  return (
    <>
      <div className="cards">
        <div>
          <Card className="cardOutside mt-5">
            <Card.Img src={images} />
            <Card.Body>
              <Card.Title className="cardTitle">
                {product_name}
              </Card.Title>
            </Card.Body>
            <Card.Body className="d-flex justify-content-around">
              <div className="d-flex align-items-center">
                <Button
                  variant="warning"
                  className="btn1"
                  onClick={() => {
                    let cart = [];
                    if (localStorage.getItem("cart")) {
                      cart = JSON.parse(
                        localStorage.getItem("cart")
                      );
                    }

                    let item = {
                      id: id,
                      // eslint-disable-next-line no-restricted-globals
                      name: name,
                      price: price,
                      amount: 1,
                    };

                    let isExist = false;
                    for (let i = 0; i < cart.length; i++) {
                      if (cart[i].id === id) {
                        isExist = true;
                        break;
                      }
                    }

                    if (!isExist) {
                      cart.push(item);
                      MySwal.fire({
                        icon: "success",
                        title: "加入成功",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    } else {
                      MySwal.fire({
                        icon: "warning",
                        title: "已加入購物車",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }

                    localStorage.setItem(
                      "cart",
                      JSON.stringify(cart)
                    );
                  }}
                >
                  加入購物車
                </Button>
              </div>
              <div>
                <Star rate={rate} />
                <h6>${price}</h6>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="pt-1 d-flex gap-1 btn-group mt-3">
          <Button
            className="btn2 me-2 btn btn-danger"
            onClick={() => {
              deleteLike(id, data);
            }}
          >
            刪除
          </Button>

          <Link
            to="/product"
            className="btn3 btn btn-primary"
          >
            前往商品頁
          </Link>
        </div>
      </div>
    </>
  );
}

export default LikeProduct;
