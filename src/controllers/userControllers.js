const database = require("../../database");
const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then((result) => {
      const users = result[0];

      res.status(200).json(users);
     
    })
    .catch((err) => {
      console.error(err);
    });
};
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database

    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",

      [firstname, lastname, email, city, language]
    )

    .then(([result]) => {
      return res.status(201).send({ id: result.insertId });
    })

    .catch((err) => {
      console.error(err);

      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
};
