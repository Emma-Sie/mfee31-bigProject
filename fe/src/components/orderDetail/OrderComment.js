import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

function OrderComment({
  company_name,
  content,
  orId,
  user_id,
  product_id,
  sellers_id,
}) {
  const [sellerStar, setSellerStar] = useState(2);
  const [sellerComment, setSellerComment] = useState("");
  const [sellerCommentCheck, setSellerCommentCheck] =
    useState("");
  const [productStar, setProductStar] = useState(2);
  const [productComment, setProductComment] = useState("");
  const [productCommentCheck, setProductCommentCheck] =
    useState("");

  // 點擊評論送出鍵
  const handleSubmit = async (e) => {
    e.preventDefault();
    let sellerIsComment =
      sellerComment.trim() !== "" ? 1 : 0;
    let productIsComment =
      productComment.trim() !== "" ? 1 : 0;
    const response = await axios.post(
      `http://localhost:8080/api/${user_id}/orders/${orId}/comment`,
      {
        sellerStar,
        sellerComment,
        productStar,
        productComment,
        orId,
        user_id,
        product_id,
        sellers_id,
        sellerIsComment,
        productIsComment,
      }
    );
    console.log(response.data);
    Swal.fire("評論新增成功!");
    setSellerCommentCheck(true);
    setProductCommentCheck(true);
  };

  useEffect(() => {
    async function getComment(e) {
      const commentResponse = await axios.get(
        `http://localhost:8080/api/${user_id}/orders/${orId}/comment`
      );
      setSellerCommentCheck(
        commentResponse.data[0].seller_is_comment
      );
      setProductCommentCheck(
        commentResponse.data[0].is_comment
      );
      setSellerComment(
        commentResponse.data[0].sellers_comment
      );
      setProductComment(commentResponse.data[0].comment);
    }
    getComment();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* 賣家 */}
        {!!sellerCommentCheck ? (
          <>
            <h3 className="commentsTitle">
              給{company_name}評價
            </h3>
            <div className="commentsStar">
              <div className="stars d-flex align-items-center">
                <Box
                  component="fieldset"
                  borderColor="transparent"
                >
                  <Rating
                    name="simple-controlled"
                    value={sellerStar}
                    readOnly
                  />
                </Box>
              </div>
              <div className="commentsRateSecond">
                {" "}
                {sellerStar} / 5 分
              </div>
            </div>
            <div className="textFieldFinish">
              <h5>
                您想告訴賣家之內容&nbsp;&nbsp;:&nbsp;&nbsp;
                {sellerComment}
              </h5>
            </div>
          </>
        ) : (
          <>
            <div>
              <h3 className="commentsTitle">
                給{company_name}評價
              </h3>
              <div className="commentsStars">
                <div className="commentsLeft">
                  <div className="stars">
                    <Box
                      component="fieldset"
                      borderColor="transparent"
                      autoComplete="off"
                    >
                      <Rating
                        name="simple-controlled"
                        value={sellerStar}
                        onChange={(e) => {
                          setSellerStar(e.target.value);
                        }}
                      />
                    </Box>
                  </div>
                  <div className="commentsRate">
                    {" "}
                    {sellerStar} / 5 分
                  </div>
                </div>
                <div className="btnGroup d-flex justify-content-end">
                  <ButtonGroup size="sm" className="tag">
                    <Button
                      className="good bg-gray"
                      onClick={(e) => {
                        e.preventDefault();
                        setSellerComment("超棒");
                      }}
                    >
                      超棒
                    </Button>
                    <Button
                      className="good w-20 bg-gray"
                      onClick={(e) => {
                        e.preventDefault();
                        setSellerComment("不錯");
                      }}
                    >
                      不錯
                    </Button>
                    <Button
                      className="good w-20 bg-gray"
                      onClick={(e) => {
                        e.preventDefault();
                        setSellerComment("普通");
                      }}
                    >
                      普通
                    </Button>
                    <Button
                      className="good w-20 bg-gray"
                      onClick={(e) => {
                        e.preventDefault();
                        setSellerComment("差");
                      }}
                    >
                      差
                    </Button>
                    <Button
                      className="good w-20 bg-gray"
                      onClick={(e) => {
                        e.preventDefault();
                        setSellerComment("很差");
                      }}
                    >
                      很差
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
            <div className="textField">
              <TextField
                id="outlined-basic"
                label="有什麼想告訴賣家嗎?"
                variant="outlined"
                fullWidth
                value={sellerComment}
                onChange={(e) => {
                  setSellerComment(e.target.value);
                }}
              />
            </div>
          </>
        )}

        {/* 商品 */}
        {!!productCommentCheck ? (
          <>
            {content.map((v, i) => {
              return (
                <>
                  <h3 className="commentsTitle">
                    給 商品{v.product_name} 評價
                  </h3>
                  <div
                    className="commentsStar"
                    key={v.product_id}
                  >
                    <div className="stars d-flex align-items-center">
                      <Box
                        component="fieldset"
                        borderColor="transparent"
                      >
                        <Rating
                          name="simple-controlled"
                          value={productStar}
                          readOnly
                        />
                      </Box>
                    </div>
                    <div className="commentsRateSecond">
                      {" "}
                      {productStar} / 5 分
                    </div>
                  </div>
                  <div className="textFieldFinish">
                    <h5>
                      您對此商品的購物體驗&nbsp;&nbsp;:&nbsp;&nbsp;
                      {productComment}
                    </h5>
                  </div>
                </>
              );
            })}
          </>
        ) : (
          <>
            {content.map((v, i) => {
              return (
                <>
                  <div key={v.product_id}>
                    <h3 className="commentsTitle">
                      給 商品{v.product_name} 評價
                    </h3>
                    <div className="commentsStars">
                      <div className="commentsLeft">
                        <div className="stars">
                          <Box
                            component="fieldset"
                            borderColor="transparent"
                            autoComplete="off"
                          >
                            <Rating
                              name="simple-controlled"
                              value={productStar}
                              onChange={(e) => {
                                setProductStar(
                                  e.target.value
                                );
                              }}
                            />
                          </Box>
                        </div>
                        <div className="commentsRate">
                          {" "}
                          {productStar} / 5 分
                        </div>
                      </div>
                      <div className="btnGroup d-flex justify-content-end">
                        <ButtonGroup
                          size="sm"
                          className="tag"
                        >
                          <Button
                            className="good w-20 bg-gray"
                            onClick={(e) => {
                              e.preventDefault();
                              setProductComment("超棒");
                            }}
                          >
                            超棒
                          </Button>
                          <Button
                            className="good w-20 bg-gray"
                            onClick={(e) => {
                              e.preventDefault();
                              setProductComment("不錯");
                            }}
                          >
                            不錯
                          </Button>
                          <Button
                            className="good w-20 bg-gray"
                            onClick={(e) => {
                              e.preventDefault();
                              setProductComment("普通");
                            }}
                          >
                            普通
                          </Button>
                          <Button
                            className="good w-20 bg-gray"
                            onClick={(e) => {
                              e.preventDefault();
                              setProductComment("差");
                            }}
                          >
                            差
                          </Button>
                          <Button
                            className="good w-20 bg-gray"
                            onClick={(e) => {
                              e.preventDefault();
                              setProductComment("很差");
                            }}
                          >
                            很差
                          </Button>
                        </ButtonGroup>
                      </div>
                    </div>
                  </div>
                  <div className="textField">
                    <TextField
                      id="outlined-basic"
                      label="分享您對此商品的購物體驗"
                      variant="outlined"
                      fullWidth
                      value={productComment}
                      onChange={(e) => {
                        setProductComment(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pt-3 ps-3">
                    <Button
                      className="btnSubmit"
                      type="submit"
                    >
                      送出
                    </Button>
                  </div>
                </>
              );
            })}
          </>
        )}
      </form>
    </>
  );
}
export default OrderComment;
