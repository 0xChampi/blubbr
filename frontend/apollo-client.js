import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core'

const httpLink = new HttpLink({ uri: 'https://api-mumbai.lens.dev' })

// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    // if your using node etc you have to handle your auth different
    const token = localStorage.getItem('auth_token')
    // console.log('token: ' + token)

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
        headers: {
            'x-access-token': token ? `Bearer ${token}` : '',
        },
    })

    // Call the next link in the middleware chain.
    return forward(operation)
})

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

export default apolloClient
