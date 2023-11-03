import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { RestLink } from "apollo-link-rest";
import {useAuth} from "@/stores/auth";
import {storeToRefs} from "pinia";
const cache = new InMemoryCache()
//VITE_BASE_API
// import.meta.env.VITE_BASE_API
// import.meta.env.VIRE_BASE_GRAPHQL_API
const customFetch = (uri: RequestInfo, options: RequestInit | any) => {
    const store = useAuth();
    const { isToken, getToken } = storeToRefs(store)
    console.log('uri',uri);
    console.log('options',options);
    //TODO: Можно сюда присвоит Authorization; другой способ https://www.apollographql.com/docs/react/api/link/apollo-link-rest#example
    if (isToken.value) {
        options.headers.set('Authorization',`Bearer ${getToken.value}`);
    }

    return fetch(`${uri}`, options);
};
/*
const httpLink = createHttpLink({
    uri: import.meta.env.VITE_BASE_API,
    fetch: customFetch
})
*/

const restLink = new RestLink({
    uri: import.meta.env.VITE_BASE_TEST_API, // VITE_BASE_TEST_API //   uri: import.meta.env.VITE_BASE_API,
    customFetch
});



const apolloClient = new ApolloClient({
    cache,
   // link: httpLink
    link: restLink,
    queryDeduplication: false,
    // defaultOptions: {
    //     watchQuery: {
    //         fetchPolicy: 'no-cache',
    //     },
    // },
})

export default apolloClient
