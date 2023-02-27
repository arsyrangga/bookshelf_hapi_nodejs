const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (req, res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  if (!name) {
    const response = res.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = res.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    insertedAt,
    updatedAt,
    finished,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = res.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
};

const getBookHandler = (req) => {
  const { name, reading, finished } = req.query;
  if (books.length < 1) {
    return {
      status: "success",
      data: {
        books: [],
      },
    };
  }
  if (name) {
    return {
      status: "success",
      data: {
        books: books
          .filter((data) =>
            data.name.toLowerCase().includes(name.toLowerCase())
          )
          .map((item) => ({
            id: item.id,
            name: item.name,
            publisher: item.publisher,
          })),
      },
    };
  }
  if (reading) {
    return {
      status: "success",
      data: {
        books: books
          .filter((data) => data.reading === (reading == 1))
          .map((item) => ({
            id: item.id,
            name: item.name,
            publisher: item.publisher,
          })),
      },
    };
  }
  if (finished) {
    return {
      status: "success",
      data: {
        books: books
          .filter((data) => data.finished === (finished == 1))
          .map((item) => ({
            id: item.id,
            name: item.name,
            publisher: item.publisher,
          })),
      },
    };
  }
  return {
    status: "success",
    data: {
      books: books.map((item) => ({
        id: item.id,
        name: item.name,
        publisher: item.publisher,
      })),
    },
  };
};

const getBookByHandler = (req, res) => {
  const { id } = req.params;
  const book = books.find((item) => item.id === id);

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = res.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });

  response.code(404);
  return response;
};

const editBookByHandler = (req, res) => {
  const { id } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  const updatedAt = new Date().toISOString();

  if (!name) {
    const response = res.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = res.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
      finished: readPage === pageCount,
    };
    const response = res.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  const response = res.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });

  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((item) => item.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = res.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = res.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });

  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getBookHandler,
  getBookByHandler,
  editBookByHandler,
  deleteNoteByIdHandler,
};
