import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql';

const LocationType = new GraphQLObjectType({
  name: 'LocationType',
  fields: () => ({
    id: { type: GraphQLID },
    lat: { type: GraphQLString },
    lng: { type: GraphQLString },
    time: { type: GraphQLString }
  })
});

export default LocationType;
