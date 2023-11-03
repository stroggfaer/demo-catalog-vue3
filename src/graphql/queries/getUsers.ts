import { gql } from "@apollo/client/core";
import {productsCartFragment} from "@/graphql/fragments/productsCartFragment";
import {addressFragment} from "@/graphql/fragments/addressFragment";

export const USERS_QUERY = gql`
    query getUsers {
        users @rest(type: "Users", path: "/users") {
            id,
            username,
            phone
        }
    }
`;

export const USER_QUERY = gql`
    
    query getUser($id: String!) {
        user (id: $id) @rest(type: "Users", path: "/users/{args.id}") {
            id,
            username,
            phone,
            email,
            ping(id: $id),
            ...address
        },
        
        cards (id: $id) @rest(type: "Cards", path: "/carts/user/{args.id}") {
            id,
            date,
            ...productsCart
           
        },
    },
   ${productsCartFragment}
   ${addressFragment}
`;



