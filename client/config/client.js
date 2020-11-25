import React from "react"
import { render, hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { loadableReady } from '@loadable/component'
import reducers from '~user/reducers'

import App from '~user/components/app/App'

const {externals: {isDev}} = require('./webpack/base.config')
const store = createStore(reducers, { ...window.APP_STATE })

const content = [
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
    ,document.getElementById('app')
]

isDev ? render(...content) : loadableReady(() => hydrate(...content))
