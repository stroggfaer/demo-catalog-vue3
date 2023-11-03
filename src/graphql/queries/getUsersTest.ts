import { gql } from "@apollo/client/core";
import {addressFragment, userFragment, userViewFragment, objectBankFragment} from "@/graphql/fragments/addressFragment";
import {productsCartFragment} from "@/graphql/fragments/productsCartFragment";
export const USER_TEST_QUERY = gql`
    
    query getUsersTest($params: ParamsModel!, $id: Int! = 4) {
        usersTest(
            params: $params, 
            id: $id
        ) @rest(type: "UsersTestType", path: "/users?{args.params}") {
            limit,
            skip,
            total,
            ...users
        },
        
    },
    ${userFragment}
`;

export const USER_TEST_QUERY_VIEW = gql`

    query getUsersTestView($id: String!) {
        user(id: $id) @rest(type: "UsersTestType", path: "/users/{args.id}") {
            ...usersView
        }
    },
    ${userViewFragment}
`;
