const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const moment = require("moment");
const e = require("express");

// cart2購物車成立訂單建立訂單
router.post("/api/createOrder", async (req, res) => {
  const payment_method = { "ATM轉帳": 1, "貨到付款": 2, "LinePay": 3, "信用卡(綠界科技)": 4 };
  const delivery_way = { "7-11取貨付款": 1, "7-11取貨不付款": 2, "離島郵寄(須先付款，澎湖/金門/馬祖/蘭嶼/綠島/琉球各離島地區)": 3, "本島宅配到府(須先付款)": 4, "海外速運": 5 };
  let result = await pool.query(
    "INSERT INTO order_list (`sellers_id`, `payment_price`, `delivery_fee`, `user_id`, `recip_name`, `recip_email`, `recip_phone`, `recip_address`, `payment_method`,`date`, `delivery_status`, `delivery_way`, `order_list_status`) VALUES(?,?,?,?,?,?,?,?,?,Now(),?,?,?) ",
    [
      17,
      req.body.finalCartTotal,
      100,
      req.body.currentUser.member.id,
      req.body.recip_name,
      req.body.currentUser.member.email,
      req.body.recip_phone,
      req.body.recip_address,
      payment_method[req.body.payment_method],
      1,
      delivery_way[req.body.delivery_way],
      2,
    ],
  );
  let values = [[
    result[0].insertId,
    req.body.cart[0].id,
    req.body.cart[0].name,
    req.body.cart[0].price,
    req.body.cart[0].amount,
    new Date(),
  ],
    // [result[0].insertId,
    // req.body.cart[1].id,
    // req.body.cart[1].name,
    // req.body.cart[1].price,
    // req.body.cart[1].amount,
    // new Date(),
    // ]
  ]
  let reaultDetail = await pool.query(
    "INSERT INTO order_list_detail ( `order_list_id`, `product_id`, `product_name`, `price`, `amount`, `created_at`) VALUES ? ",
    [values]
  );
  // console.log(req.body)
  console.log(req.body.ShippingWays )
  try {
    res.status(200).json({
      message: "success",
      orderId: result[0].insertId,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "not saved." });
  }
});

// 取得最後一筆(最新)訂單資料
router.get("/api/createOrder", async (req, res) => {
  let data = await pool.query(
    `SELECT order_list.*, order_list_detail.*, users.name, users.phone, payment_type.type_name,delivery_way.delivery_way_name, delivery_status.status, order_list_status.status
    FROM order_list 
    JOIN order_list_detail ON order_list.id = order_list_detail.order_list_id 
    JOIN users ON order_list.user_id = users.id
    JOIN payment_type ON order_list.payment_method = payment_type.id
    JOIN delivery_status ON order_list.delivery_status = delivery_status.id
    JOIN delivery_way ON order_list.delivery_way = delivery_way.id
    JOIN order_list_status ON order_list.order_list_status = order_list_status.id
    ORDER BY order_list.id DESC LIMIT 0 , 1`,
  );
  // console.log(data)
  res.json(
    data,
  );
});

// 購物車轉帳成功畫面上傳
router.post('/upload-transfer', async (req, res) => {
  const {content}=req.body
  // console.log(req.files)
  if (!req.files) {
    res.json({
      message: "No file uploaded",
    });
  } else {
    let img_url = [];
    try {
      if (req.files.photos.length > 1) {
        _.forEach(_.keysIn(req.files.photos), (key) => {
          let photo = req.files.photos[key];
          photo.mv("./uploads/" + photo.name);
          img_url.push("./uploads/" + photo.name);
        });
        let [data] = await pool.execute(
          "UPDATE order_list SET order_transfer_img = ? WHERE id = ?", [img_url[0], content.id ]
        );
      } else {
        let { photos } = req.files;
        photos.mv("./uploads/" + photos.name);
        photos = "/uploads/" + photos.name;
        let [data] = await pool.execute(
          "UPDATE order_list SET order_transfer_img = ? WHERE id = ?",
          [photos,content.id]
        );
      }
      res.status(200).json({
        message: "success",
      });
    } catch (err) {
      res.status(200).json({
        message: err,
      });
    }
  }
});

// 買家前台顯示的訂單 (買家所買的所有訂單)
router.post("/api/:id/orders", async (req, res, next) => {
  const page = req.query.page || 1;
  let [results] = await pool.execute(
    `SELECT COUNT(*) AS total FROM order_list
    JOIN delivery_status ON order_list.delivery_status = delivery_status.id
    WHERE order_list.user_id = ?
    AND
    (CASE WHEN ? != "全部訂單" THEN delivery_status.status = ? ELSE 1 = 1 END) 
    AND 
    (CASE WHEN ? != '' THEN order_list.id = ? ELSE order_list.id IS NOT NULL END)`,
    [
      req.params.id,
      req.body.statusFilter,
      req.body.statusFilter,
      req.body.searchWord,
      req.body.searchWord,
    ]
  );
  const total = results[0].total;
  const perPage = 5;
  const totalPage = Math.ceil(total / perPage);

  const limit = perPage;
  const offset = perPage * (page - 1);

  console.log(req.body);
  let [data] = await pool.query(
    `SELECT ol.id,
            ol.date, 
            ol.user_id, 
            ol.payment_price, 
            ol.payment_method, 
            ol.order_list_status, 
            pt.*, 
            ds.*,
            ol.id AS orId,
            ds.status AS deliStatus
    FROM order_list ol
    JOIN payment_type pt 
    ON ol.payment_method = pt.id
    JOIN delivery_status ds 
    ON ol.delivery_status = ds.id
    WHERE ol.user_id = ? AND (CASE WHEN ? != "全部訂單" THEN ds.status = ? ELSE 1 = 1 END) 
    AND 
    (CASE WHEN ? != '' THEN ol.id = ? ELSE ol.id IS NOT NULL END)
    LIMIT ? 
    OFFSET ?`,
    [
      req.params.id,
      req.body.statusFilter,
      req.body.statusFilter,
      req.body.searchWord,
      req.body.searchWord,
      limit,
      offset,
    ]
  );
  res.json({
    pagination: {
      total,
      perPage,
      totalPage,
      page,
    },
    data,
  });
});

// 買家點進去所可以得到的訂單資料
router.get("/api/:user_id/orders/:orId", async (req, res, next) => {
  let [data] = await pool.query(
    `SELECT ol.*,
            old.order_list_id,
            old.product_id,
            old.product_name, 
            old.price, old.amount, 
            ols.*, 
            s.id, 
            s.sellers_number, 
            s.company_name, 
            u.id, 
            u.name, 
            u.phone, 
            ds.*, 
            dw.*, 
            pt.*,
            ol.id AS orId, 
            ols.status AS orderStatus, 
            ds.status AS dStatus, 
            dw.delivery_way_name AS deliWay
      FROM order_list ol
      JOIN order_list_detail old 
      ON ol.id = old.order_list_id
      JOIN order_list_status ols 
      ON ol.order_list_status = ols.id
      JOIN sellers s 
      ON ol.sellers_id = s.sellers_number
      JOIN users u 
      ON ol.user_id = u.id
      JOIN delivery_status ds 
      ON ol.delivery_status = ds.id
      JOIN delivery_way dw 
      ON ol.delivery_way = dw.id
      JOIN payment_type pt 
      ON ol.payment_method = pt.id
      WHERE ol.user_id = ? 
      AND ol.id = ?`,
    [req.params.user_id, req.params.orId]
  );

  res.json(
    data.map((v) => {
      v.date = moment(v.date).utc().format("YYYY-MM-DD");
      return v;
    })
  );
});
module.exports = router;