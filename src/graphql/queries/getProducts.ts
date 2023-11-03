import { gql } from "@apollo/client/core";

export const PRODUCTS_QUERY = gql`
    query getProducts($params: ParamsModel!) {
        products (params: $params) @rest(type: "Products", path: "/products?{args.params}") {
            id,
            image,
            title
            rating {
                rate,
                count
            }
        }
    }
`;
