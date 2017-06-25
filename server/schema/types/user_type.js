import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql';
import LocationType from './location_type';
import GroupType from './group_type';

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    photo: { type: GraphQLString },
    location: { type: new GraphQLList(LocationType) },
    friends: { type: new GraphQLList(UserType) },
    groups: { type: new GraphQLList(GroupType) }
  })
});

export default UserType;
