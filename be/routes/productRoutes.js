const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const _ = require("lodash");

// 全部狀態
// router.post("/", async (req, res, next) => {
//   const page = req.query.page || 1;
//   let [results] = await pool.execute(`SELECT COUNT(*) AS total FROM product_list JOIN category ON product_list.category_id = category.id
//   WHERE
//   (CASE WHEN ? != "全部商品" THEN category.category_name = ? ELSE 1 = 1 END) 
//   AND 
//   (CASE WHEN ? != '' THEN product_list.product_name = ? ELSE product_list.product_name IS NOT NULL END)`,  [
//     req.body.statusFilter,
//     req.body.statusFilter,
//     req.body.searchWord,
//     req.body.searchWord,
//   ])
//   const  total = results[0].total
//   const perPage = 25
//   const totalPage = Math.ceil(total / perPage)

//   const limit = perPage
//   const offset = perPage * (page - 1)

//   console.log(req.body);
//   let [data] = await pool.query(`SELECT product_list.*, category.* FROM product_list JOIN category ON product_list.category_id = category.id
//   WHERE
//   (CASE WHEN ? != "全部商品" THEN category.category_name = ? ELSE 1 = 1 END) 
//   AND 
//   (CASE WHEN ? != '' THEN product_list.product_name = ? ELSE product_list.product_name IS NOT NULL END) LIMIT ? OFFSET ?`, [
//     req.body.statusFilter,
//     req.body.statusFilter,
//     req.body.searchWord,
//     req.body.searchWord,
//     limit,
//     offset,
//   ])
//   res.json({
//     pagination: {
//       total,
//       perPage,
//       totalPage,
//       page,
//     },
//     data,
//   });

// })

router.get("/", async (req, res, next) => {
  const page = req.query.page || 1;
  try {
    let [result] = await pool.query(
      "select count(*) as total from product_list"
    );
    const total = result[0].total;
    const perPage = 25;
    const totalPage = Math.ceil(total / perPage);
    const limit = perPage;
    const offset = perPage * (page - 1);

    let [data] = await pool.query(
      "select id, product_name, images, price, storage, rate, favorites from product_list where valid = 1 limit ? offset ?",
      [limit, offset]
    );
    res.status(200).json({
      pagination: {
        total,
        perPage,
        totalPage,
        page,
      },
      data,
    });
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
});
// 賣家的賣場
// router.post("/seller/", async (req, res, next) => {
//   const page = req.query.page || 1;
//   let [results] = await pool.execute(`SELECT COUNT(*) AS total FROM product_list JOIN category ON product_list.category_id = category.id
//   JOIN selling_product ON product_list.id = selling_product.product_id
//   WHERE selling_product.sellers_id = 17
//   AND
//   (CASE WHEN ? != "全部商品" THEN category.category_name = ? ELSE 1 = 1 END) 
//   AND 
//   (CASE WHEN ? != '' THEN product_list.product_name = ? ELSE product_list.product_name IS NOT NULL END)`,  [
//     req.body.statusFilter,
//     req.body.statusFilter,
//     req.body.searchWord,
//     req.body.searchWord,
//   ])
//   const  total = results[0].total
//   const perPage = 8
//   const totalPage = Math.ceil(total / perPage)

//   const limit = perPage
//   const offset = perPage * (page - 1)

//   console.log(req.body);
//   let [data] = await pool.query(`SELECT product_list.*, category.*, selling_product.*
//   FROM product_list 
//   JOIN category ON product_list.category_id = category.id
//   JOIN selling_product ON product_list.id = selling_product.product_id
//   WHERE selling_product.sellers_id = 17
//   AND
//   (CASE WHEN ? != "全部商品" THEN category.category_name = ? ELSE 1 = 1 END) 
//   AND 
//   (CASE WHEN ? != '' THEN product_list.product_name = ? ELSE product_list.product_name IS NOT NULL END) LIMIT ? OFFSET ?`, [
//     req.body.statusFilter,
//     req.body.statusFilter,
//     req.body.searchWord,
//     req.body.searchWord,
//     limit,
//     offset,
//   ])
//   res.json({
//     pagination: {
//       total,
//       perPage,
//       totalPage,
//       page,
//     },
//     data,
//   });

// })

// router.get("/", async (req, res, next) => {
//   const page = req.query.page || 1;
//   const category = req.query.category || true;
//   try {
//     let [result] = await pool.query(
//       "select count(*) as total from product_list"
//     );
//     const total = result[0].total;
//     const perPage = 25;
//     const totalPage = Math.ceil(total / perPage);
//     const limit = perPage;
//     const offset = perPage * (page - 1);

//     let [data] = await pool.query(
//       `select id, 
//               brand, 
//               category_id, 
//               product_name, 
//               images, price, 
//               storage, rate, 
//               favorites 
//               from product_list 
//               where valid = 1 
//               and category_id = ?
//               limit ? 
//               offset ?`,
//       [category, limit, offset]
//     );
//     res.status(200).json({
//       pagination: {
//         total,
//         perPage,
//         totalPage,
//         page,
//       },
//       data,
//     });
//   } catch (err) {
//     res.status(404).json({
//       message: err,
//     });
//   }
// });

router.get("/admin", async (req, res, next) => {
  const page = req.query.page || 1;
  try {
    let [result] = await pool.query(
      "select count(*) as total from product_list"
    );
    const total = result[0].total;
    const perPage = 10;
    const totalPage = Math.ceil(total / perPage);
    const limit = perPage;
    const offset = perPage * (page - 1);

    let [data] = await pool.query(
      "select id, product_name, images, price, storage, rate, favorites from product_list where valid = 1 limit ? offset ?",
      [limit, offset]
    );
    res.status(200).json({
      pagination: {
        total,
        perPage,
        totalPage,
        page,
      },
      data,
    });
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
});

router.get("/:productID", async (req, res, next) => {
  try {
    let [data] = await pool.query(
      "select id, product_name, images, price, storage, rate, favorites from product_list where id = ?",
      [req.params.productID]
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
});

router.patch("/admin/:productID", async (req, res, next) => {
  try {
    const { productName, productPrice, productStorage } = req.body;
    let [data] = await pool.execute(
      "UPDATE product_list SET product_name = ?, price = ?, storage = ? where id = ?",
      [productName, productPrice, productStorage, req.params.productID]
    );
    res.status(200).json({ message: "success", data });
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
});

router.delete("/admin/:productID", async (req, res, next) => {
  try {
    let [data] = await pool.execute(
      "UPDATE product_list SET valid = ? where id = ?",
      [0, req.params.productID]
    );
    res.status(200).json({ message: "success", data });
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
});

router.post("/admin", async (req, res) => {
  const { brand_name, category_id, product_name, price, storage } = req.body;
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
          "INSERT INTO product_list(brand, category_id, product_name, images, images2, price, storage, status_id, valid, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
          [
            brand_name,
            category_id,
            product_name,
            img_url[0],
            img_url[1],
            price,
            storage,
            1,
            1,
          ]
        );
      } else {
        let { photos } = req.files;
        photos.mv("./uploads/" + photos.name);
        photos = "./uploads/" + photos.name;
        let [data] = await pool.execute(
          "INSERT INTO product_list(brand_name, category_id, product_name, images, price, storage, status_id, valid, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())",
          [brand_name, category_id, product_name, photos, price, storage, 1, 1]
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

router.get("/:productID/detail", async (req, res) => {
  try {
    let [data] = await pool.execute(
      "SELECT product_name, images, images2, price, introduce FROM product_list WHERE id = ?",
      [req.params.productID]
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

router.post("/price", async (req, res) => {
  const { minPrice, maxPrice } = req.body;
  try {
    let [data] = await pool.execute(`SELECT product_name, images, images2, price, introduce FROM product_list WHERE price BETWEEN ? AND ?`, [minPrice, maxPrice]);
    res.status(200).json({
      message: "success",
      data
    })
  } catch (err) {
    res.status(404).json({
      message: err
    })
  }
})

module.exports = router;