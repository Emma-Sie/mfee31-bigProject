const express = require("express");
const router = express.Router();
const pool = require("../utils/db");

// 前台訂單評價(評價各商品及賣家)
router.post("/api/:user_id/orders/:orId/comment", async (req, res) => {
    console.log(req.body)
    let result = await pool.query(
        "INSERT INTO comment (`order_list_id`, `order_list_detail_id`, `rate`, `comment`,`is_comment`, `user_id`, `sellers_id`, `sellers_rate`, `sellers_comment`, `seller_is_comment`) VALUES (?,?, ?, ?, ?,?,?,?, ?, ?)",
        [
            req.body.orId,
            req.body.product_id,
            req.body.productStar,
            req.body.productComment,
            req.body.productIsComment,
            req.body.user_id,
            req.body.sellers_id,
            req.body.sellerStar,
            req.body.sellerComment,
            req.body.sellerIsComment,
        ]
    );
    try {
        res.status(200).json({
            message: "success",
            orderId: result[0].orderId,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "comment not saved." });
    }
});

router.get("/api/:user_id/orders/:orId/comment", async (req, res, next) => {
    let [data] = await pool.query(
      `SELECT * FROM comment WHERE comment.user_id = ? AND comment.order_list_id = ?`,
      [req.params.user_id, req.params.orId]
    );
    res.json(data) 
});

module.exports = router;