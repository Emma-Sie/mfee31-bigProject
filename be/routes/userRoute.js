const moment = require("moment");
const router = require("express").Router();
const pool = require("../utils/db");

router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  try {
    let [result] = await pool.query("select count(*) as total from users");
    const total = result[0].total;
    const perPage = 10;
    const totalPage = Math.ceil(total / perPage);
    const limit = perPage;
    const offset = perPage * (page - 1);
    let [user] = await pool.execute(
      "SELECT id, name, email, address, created_at, valid FROM users limit ? offset ?",
      [limit, offset]
    );
    user.map((v, i) => {
      v.created_at = moment(v.created_at).utcOffset(8).format("YYYY-MM-DD");
    });
    res.status(200).json({
      message: "success",
      pagination: {
        total,
        perPage,
        totalPage,
        page,
      },
      user,
    });
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let [result] = await pool.execute(
      `UPDATE users SET valid = ? WHERE id = ?`,
      [0, id]
    );
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let [result] = await pool.execute(
      `UPDATE users SET valid = ? WHERE id = ?`,
      [1, id]
    );
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
});

module.exports = router;
