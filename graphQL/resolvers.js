export const bookList = [
  {
    id: "101",
    title: "Harry Potter and the Philosopher's Stone",
    publishedYear: 1997,
    authorId: "1",
  },
  {
    id: "201",
    title: "A Game of Thrones",
    publishedYear: 1996,
    authorId: "2",
  },
  {
    id: "301",
    title: "The Fellowship of the Ring",
    publishedYear: 1954,
    authorId: "3",
  },
];

export const authorList = [
  {
    id: "1",
    name: "J.K. Rowling",
    bookId: ["101", "201"],
  },
  {
    id: "2",
    name: "George R. R. Martin",
    bookId: ["201"],
  },
  {
    id: "3",
    name: "J. R. R. Tolkien",
    bookId: ["301"],
  },
];

export const resolvers = {
  Author: {
    book: (parent, arg, context, info) => {
      return bookList.filter((book) => parent.bookId.includes(book.id));
    },
  },

  Book: {
    author: (parent, arg, context, info) => {
      return authorList.find((author) => author.id === parent.authorId);
    },
  },
  Query: {
    books: (parent, arg, context, info) => {
      return bookList;
    },

    authors: (parent, arg, context, info) => {
      return authorList;
    },
  },

  Mutation: {
    addBook: (parent, arg, context, info) => {
      const newBook = { ...arg, id: bookList.length + 1 };
      bookList.push(newBook);
      return newBook;
    },
  },
};
