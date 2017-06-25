import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql';
import UserType from './user_type';
import MemberType from './member_type';


const GroupType = new GraphQLObjectType({
  name: 'GroupType',
  fields: () => ({
    id: { type: GraphQLID },
    members: { type: new GraphQLList(MemberType) },
    creator: { type: UserType },
    createdTime: { type: GraphQLString },

  })
});

export default GroupType;
