const router = require("express").Router();
const pool = require("../utils/db");

router.get("/:id", async (req, res) => {
  let [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [
    req.params.id,
  ]);
  let [seller] = await pool.execute(
    "SELECT * FROM sellers WHERE sellers_number = ?",
    [req.params.id]
  );
  res.status(200).json({
    message: "success",
    user,
    seller,
  });
});

router.post("/:id", async (req, res) => {
  const { user_name, email, address, phone } = req.body;
  try {
    if (req.files.thumbnail) {
      let thumbnail = req.files.thumbnail;
      console.log(thumbnail);
      thumbnail.mv("./uploads/" + thumbnail.name);
      thumbnail = "/uploads/" + thumbnail.name;
      let [user] = await pool.execute(
        "UPDATE users SET name = ?, email = ?, address = ?, phone = ?, thumbnail = ? WHERE id = ?",
        [user_name, email, address, phone, thumbnail, req.params.id]
      );
    } else {
      let [user] = await pool.execute(
        "UPDATE users SET name = ?, email = ?, address = ?, phone = ? WHERE id = ?",
        [user_name, email, address, phone, req.params.id]
      );
    }

    res.status(200).json({
      message: "success",
      data: {
        user_name,
        email,
        phone,
        address,
        file_name: avatar.name,
        file_mimetype: avatar.mimetype,
        file_size: avatar.size,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 驗證成賣家
router.post("/:id/verifySeller", async (req, res) => {
  // const { error } = verifyValidation(req.body);
  // if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    let result = await pool.execute(
      "INSERT INTO `sellers`(`sellers_number`, `company_name`, `tax_id`, `description`,`valid`) VALUES (?, ?, ?, ?, ?)",
      [
        req.body.user_id,
        req.body.store_name,
        req.body.taxID,
        req.body.storeIntro,
        1,
      ]
    );
    res.status(200).json({
      message: "success",
      member_id: result[0].insertId,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Seller not verified." });
  }
});

router.get("/:id/collect", async (req, res) => {
  try {
    let [data] = await pool.execute(
      `SELECT pl.id,
              ul.user_id,
              pl.product_name, 
              pl.price, 
              pl.rate, 
              pl.images 
        FROM product_list pl
        JOIN user_like ul
        ON pl.id = ul.id
        WHERE ul.user_id = ?
      `,
      [req.params.id]
    );
    res.status(200).json({
      message: "success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
});

router.delete("/:id/collect", async (req, res) => {
  try {
    let [data] = await pool.execute(
      `DELETE FROM user_like WHERE user_id = ? AND product_id = ?`,
      [req.params.id, req.query.productId]
    );
    res.status(200).json({
      message: success,
      data
    })
  } catch (err) {
    res.status(404).json({
      message: err
    })
  }

});

module.exports = router;
