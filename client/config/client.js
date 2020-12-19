import React from "react"
import { render, hydrate } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { loadableReady } from '@loadable/component'

import AppUser from '~user/components/app/App'
import AppAdmin from '~admin/components/app/App'

const {externals: {isDev}} = require('./webpack/base.config')

const content = [
    <BrowserRouter>
        <Switch>
            <Route       path="/admin" component={AppAdmin} />
            <Route       path="/*"     component={AppUser} />
        </Switch>
    </BrowserRouter>
    ,document.getElementById('app')
]

isDev ? render(...content) : loadableReady(() => hydrate(...content))
