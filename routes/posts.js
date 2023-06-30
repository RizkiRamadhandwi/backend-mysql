const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const connection = require("../config/database");

// INDEX POSTS

router.get("/", function (req, res) {
  //query
  connection.query("SELECT * FROM posts ORDER BY id desc", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "List Data Posts",
        data: rows,
      });
    }
  });
});

// STORE POSTS

router.post(
  "/store",
  [body("title").notEmpty(), body("content").notEmpty()],
  (req, res) => {
    // Validate Data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: errors.array(),
      });
    }

    // define formdata
    let formData = {
      title: req.body.title,
      content: req.body.content,
    };

    // insert query
    connection.query("INSERT INTO posts SET ?", formData, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Data Posts Stored",
          data: rows[0],
        });
      }
    });
  }
);

// SHOW POST

router.get("/(:id)", (req, res) => {
  // define id
  let id = req.params.id;
  // select query
  connection.query(`SELECT * FROM posts WHERE id = ${id}`, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }

    // if post not found
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: "Post Not Found",
      });
    } else {
      //if post found
      return res.status(200).json({
        status: true,
        message: "Post Found",
        data: rows[0],
      });
    }
  });
});

// UPDATE POST

router.patch(
  "/update/:id",
  [body("title").notEmpty(), body("content").notEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: errors.array(),
      });
    }

    let id = req.params.id;

    let formData = {
      title: req.body.title,
      content: req.body.content,
    };

    connection.query(
      `UPDATE posts SET ? WHERE id = ${id}`,
      formData,
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Update Data Posts Stored",
          });
        }
      }
    );
  }
);

//DELETE POST

router.delete("/delete/(:id)", (req, res) => {
  let id = req.params.id;

  connection.query(`DELETE FROM posts WHERE id = ${id}`, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Delete Data Posts",
      });
    }
  });
});

module.exports = router;
