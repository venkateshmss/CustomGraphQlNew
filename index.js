const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type CyclingActivity {
    id: ID!
    date: String!
    area: String!
    condition: Condition
  }
  enum Condition {
    WET
    DRY
    RAIN
    HOT
  }
  type Query {
    totalDays: Int!
    activity: [CyclingActivity!]!
  }
`;

// const resolvers = {};

const server = new ApolloServer({
  typeDefs,
  mocks: true,
  //   resolvers,
});

server.listen().then(({ url }) => console.log(`Server running in the ${url}`));
// server.listen.then(({ url }) => console.log(`Server running at ${url}`));
