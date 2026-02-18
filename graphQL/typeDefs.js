export const typeDefs = `
    type Book {
        title: String
        id: ID
        publishedYear: Int
        author: Author
    }

    type Author {
        name: String
        id: ID
        book: [Book]
    }

    type Query {
        books: [Book],
        authors: [Author]
    }

    type Mutation {
        addBook(title: String!, publishedYear: Int!, authorId: ID!): Book!
    }

`;
