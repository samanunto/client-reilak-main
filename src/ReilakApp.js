import React from 'react'
import { Provider } from 'react-redux'
import { SocketProvider } from './context/SocketContext';
import { AppRouter } from './routers/AppRouter'
import { store } from "./store/store";

export const ReilakApp = () => {
    return (
     
        <Provider store={store}>
            <SocketProvider>
            <AppRouter />
            </SocketProvider>
        </Provider>

        
    )
}
