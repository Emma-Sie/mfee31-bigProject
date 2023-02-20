const express = require("express");
const router = express.Router();
const pool = require("../utils/db");

// 優惠券
router.get("/api/coupon", async (req, res, next) => {
  const page = req.query.page || 1;
  let [results] = await pool.execute(`SELECT COUNT(*) AS total FROM coupon WHERE coupon.end_time >= NOW()`)
  const total = results[0].total;
  const perPage = 3;
  const totalPage = Math.ceil(total / perPage);
  const limit = perPage;
  const offset = perPage * (page - 1);
  let [data] = await pool.query(`SELECT * FROM coupon WHERE coupon.end_time >= NOW() LIMIT ? OFFSET ?`, [limit, offset]);
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