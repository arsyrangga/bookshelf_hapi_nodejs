const {
  addBookHandler,
  getBookHandler,
  getBookByHandler,
  editBookByHandler,
  deleteNoteByIdHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getBookHandler,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookByHandler,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editBookByHandler,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
