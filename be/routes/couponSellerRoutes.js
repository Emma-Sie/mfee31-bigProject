const express = require("express");
const router = express.Router();
const pool = require("../utils/db");

// 優惠券後台新增畫面
router.post("/api/sellerCoupon", async (req, res) => {
  const { inputCoupon, inputLimit, inputPrice, inputStart, inputEnd } =
    req.body;
  let results = await pool.query(
    "INSERT INTO coupon (`coupon_code`, `limited`, `price`, `start_time`, `end_time`) VALUES (?, ?, ?, ?, ?)",
    [inputCoupon, inputLimit, inputPrice, inputStart, inputEnd]
  );
  res.json(results);
});

// 優惠券後台修改
router.post("/api/couponChange/:id", async (req, res) => {
  const { inputPrice, inputLimit, inputEnd, id } = req.body;
  await pool.query(
    `UPDATE coupon 
    SET price = IF(? != '', ?, price), 
        limited = IF(? != '', ?, limited), 
        end_time = IF(? != '', ?, end_time)
    WHERE id = ?`,
    [inputPrice, inputPrice, inputLimit, inputLimit, inputEnd, inputEnd, id]
  );
  res.json({});
});

// 優惠券後台刪除
router.post("/api/couponDelete/:id", async(req, res) => {
  await pool.query(`DELETE FROM coupon WHERE id = ?`, [req.body.id])
  res.json({});
})

// 優惠券後台顯示畫面
router.get("/api/couponSeller", async (req, res, next) => {
  const page = req.query.page || 1;
  let [results] = await pool.execute("SELECT COUNT(*) AS total FROM coupon");
  const total = results[0].total;
  const perPage = 5;
  const totalPage = Math.ceil(total / perPage);
  const limit = perPage;
  const offset = perPage * (page - 1);
  let [data] = await pool.query(
    `SELECT coupon.*, coupon.id AS couponId FROM coupon
    ORDER BY coupon.id DESC LIMIT ? OFFSET ? `,
    [limit, offset]
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

module.exports = router;
