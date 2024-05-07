const { ApolloServer, gql, MockList } = require("apollo-server");

const typeDefs = gql`
  scalar Date
  """
  The CyclingActivity contains the characteristics of a regular cycling day
  """
  type CyclingActivity {
    "Unique Id of the acitivty"
    id: ID!
    "Date of the cycling activity"
    date: Date!
    "Area the cycle ride was on"
    area: String!
    "Condition of the cycling day either wet or dry or etc"
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
    allActivity: [CyclingActivity!]!
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

  type Subscription {
    activity: CyclingActivity!
  }
`;

// const resolvers = {};

const mocks = {
  Date: () => {
    const date = new Date();
    // console.log(date.toLocaleString());
    return date.toLocaleDateString();
  },
  Query: () => ({
    totalDays: () => new MockList(5),
  }),
  String: () => "Venkatesh Data",
};

const server = new ApolloServer({
  typeDefs,
  mocks,
  //   resolvers,
});

server.listen().then(({ url }) => console.log(`Server running in the ${url}`));
// server.listen.then(({ url }) => console.log(`Server running at ${url}`));
