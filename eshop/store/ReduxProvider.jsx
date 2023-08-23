"use client";
import React from 'react'
import { Provider } from 'react-redux'
import store, { persisor } from '../store/store'

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default ReduxProvider;
