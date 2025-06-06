import { ApolloClient, InMemoryCache } from "@apollo/client/core"

const shopApi = new ApolloClient({
    uri: "http://localhost:3000/shop-api",
    cache: new InMemoryCache(),
    connectToDevTools: true,
    defaultOptions: {
        mutate: {
            errorPolicy: "all",
        },
        query: {
            errorPolicy: "all",
        },
        watchQuery: {
            errorPolicy: "all",
        },
    },
})
export default shopApi
