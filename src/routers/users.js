const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  // addBookToUsersList,
  // removeBookFromUsersList,
} = require("../controllers/users.js");

router.get("/", getUsers);
router.get("/:user_id", getUser);
router.post("/", createUser);
router.patch("/:user_id", updateUser);
router.delete("/:user_id", deleteUser);
// router.patch("/:user_id/booklist/:book_id", addBookToUsersList);
// router.delete("/:user_id/booklist/:book_id", removeBookFromUsersList);

module.exports = router;