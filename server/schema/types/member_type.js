import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';
import UserType from './user_type';

const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: UserType },
    inivtedBy: { type: UserType },
    invitedAt: { type: GraphQLString },
    accepted: { type: GraphQLBoolean },
    expires: { type: GraphQLString }
  })
});

export default MemberType;
