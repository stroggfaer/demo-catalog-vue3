import {gql} from "@apollo/client/core";
export const addressFragment = gql`
    fragment address on Users {
        address {
            city,
            street,
            number,
            zipcode,
            geolocation {
                lat,
                long
            }
        },
    }
`;

export const userFragment = gql`
    fragment users on UsersTestType {
        users @type(name: "Users") {
            id,
            lastName,
            maidenName,
            username,
            ageName: age #Псевдонимы
            domain,
            image,
            bank @type(name: "Bank") {
                cardNumber
            },
            birthDate,
            bloodGroup,
            domain,
            ein,
            hair @type(name: "Hair") {
                color
            },
            height
        }
    }
`;
export const objectBankFragment = gql`
    fragment objectBank on UsersTestType {
        bank @type(name: "BankType") {
            cardExpire,
            cardNumber,
            cardType,
            currency,
            iban
        }
    }
`;

export const companyFragment = gql`
    fragment company on UsersTestType {
        company @type(name: "CompanyType") {
            department
            name
            title
            address {
                address
                city
            }
        }
    }
`;

export const userViewFragment = gql`
    fragment usersView on UsersTestType {
        id
        lastName
        maidenName
        username
        ageName: age #Псевдонимы
        domain
        image
        ... on UsersTestType {
            ...company
            ...objectBank
        }
        birthDate
        bloodGroup
        ein
        hair @type(name: "Hair") {
            color
        },
        height
    }
    ${objectBankFragment}
    ${companyFragment}
`;



