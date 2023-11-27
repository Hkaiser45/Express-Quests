const database = require("../../database");
const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then((result) => {
      const users = result[0];

      res.json(users);
      res.sendStatus(200);
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
module.exports = {
  getUsers,
  getUserById,
};
