import React from "react"
import { render, hydrate } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { loadableReady } from '@loadable/component'
import reducers from '~user/reducers'

import AppUser from '~user/components/app/App'
import AppAdmin from '~admin/components/app/App'

const {externals: {isDev}} = require('./webpack/base.config')
const store = createStore(reducers, { ...window.APP_STATE })

const content = [
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route       path="/admin" component={AppAdmin} />
                <Route       path="/*"     component={AppUser} />
            </Switch>
        </Provider>
    </BrowserRouter>
    ,document.getElementById('app')
]

isDev ? render(...content) : loadableReady(() => hydrate(...content))
