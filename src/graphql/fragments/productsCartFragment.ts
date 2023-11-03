import {gql} from "@apollo/client/core";
/*--- Создаем  фрагмент для разбивка полей нужно ставвить выше --- */
export const productsCartFragment = gql`
    fragment productsCart on Cards {
        products {
            productId,
            quantity
        },
        avatar(size: LARGE)
    }
`;
