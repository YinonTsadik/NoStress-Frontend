import React from 'react'
import ReactDOM from 'react-dom/client'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import store from './redux'
import App from './app'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://192.168.211.60:4000/graphql',
    // uri: 'http://localhost:4000/graphql',
})

root.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
)

// To run the website, type 'npm start' in the terminal.
