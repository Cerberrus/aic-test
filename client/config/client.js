import React from "react"
import { render, hydrate } from "react-dom"
import { BrowserRouter }   from "react-router-dom"
import { loadableReady }   from "@loadable/component"

// Import components
import App from "~src/App"

// Import global properties
const {externals: {isDev}} = require("./webpack/base.config")

const content = [
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    ,document.getElementById("app")
]

// For build (ssr) and dev mode
isDev ? render(...content) : loadableReady(() => hydrate(...content))
