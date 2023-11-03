import { gql } from "@apollo/client/core";
import {objectBankFragment} from "@/graphql/fragments/addressFragment";
//
export const CREATE_USER_POST = gql`
    mutation AddUser($body: any, $input: string!) {
        result(body: $body, input: $input) @rest(
            type: "Post"
            path: "/users/{args.input}"
            method: "POST"
            bodyKey: "body"
        ) {
            id
        }
    }
`;

// По фрагменту;
export const CREATE_USER_FRAG_POST = gql`
    mutation AddUser($body: any, $id: string!) {
        result(body: $body, id: $id) @rest(
            type: "Post"
            path: "/users/{args.id}"
            method: "POST"
            bodyKey: "body"
        ) 
    }
`;

