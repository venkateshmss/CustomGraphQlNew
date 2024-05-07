const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date
  type CyclingActivity {
    id: ID!
    date: Date!
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

  input AddActivityCycling {
    date: Date!
    area: String!
    condition: Condition
  }

  type RemoveAcitivityDetail {
    activty: CyclingActivity!
    removed: Boolean
    beforeCount: Int!
    afterCount: Int!
  }

  type Mutation {
    addActivty(input: AddActivityCycling!): CyclingActivity
    removeActivity(id: ID!): RemoveAcitivityDetail!
  }
`;

// const resolvers = {};

const mocks = {
  Date: () => {
    const date = new Date();
    // console.log(date.toLocaleString());
    return date.toLocaleDateString();
  },
};

const server = new ApolloServer({
  typeDefs,
  mocks,
  //   resolvers,
});

server.listen().then(({ url }) => console.log(`Server running in the ${url}`));
// server.listen.then(({ url }) => console.log(`Server running at ${url}`));
