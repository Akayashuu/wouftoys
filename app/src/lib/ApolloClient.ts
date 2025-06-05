import { ApolloClient, InMemoryCache } from "@apollo/client/core"

const shopApi = new ApolloClient({
    uri: "http://localhost:3000/shop-api",
    cache: new InMemoryCache(),
    connectToDevTools: true,
})
export default shopApi
