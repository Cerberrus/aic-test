import express from "express"
import path from "path"
import minifier from "string-minify"
import React from "react"
import Helmet from "react-helmet"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router"
import { ChunkExtractor } from "@loadable/server"

const app = express()/*require('../../backend/src/connectModules')*/

import App from "~src/App"

app.use(express.static(path.join(__dirname, "../dist")))

app.get("*", async (req, res) => {
    let   statsFile = path.resolve("dist/modern-scripts.json")
    const modernExtractor = new ChunkExtractor({ statsFile, entrypoints: ["client"] })

    const context = {}

    const appMarkup = renderToString(
        <StaticRouter location={req.url} context={context} >
            {modernExtractor.collectChunks(<App />)}
        </StaticRouter>
    )

    const helmet = Helmet.renderStatic();

    //For legacy scripts
    statsFile = path.resolve("dist/legacy-scripts.json")
    const legacyExtractor = new ChunkExtractor({ statsFile, entrypoints: ["client"] })

    renderToString(
        <StaticRouter location={req.url} context={context} >
            {legacyExtractor.collectChunks(<App />)}
        </StaticRouter>
    )

    const buildScripts = (jsonScripts) => {
        let result = ""
        let i = 0

        jsonScripts.map((item, index) =>  {
            const { props } = item

            if(props.src){
                result +=
                    `var script${index} = document.createElement('script');`+
                    `script${index}.setAttribute('async', ${props.async});`+
                    `script${index}.setAttribute('data-chunk', '${props['data-chunk']}');`+
                    `script${index}.src='${props.src}';`+
                    `document.body.appendChild(script${index});`
            } else if(i < 2) {
                result +=
                    `var script${index} = document.createElement('script');`+
                    `script${index}.id='${item.key}';`+
                    `script${index}.type='${props.type}';`+
                    `script${index}.innerHTML='${props.dangerouslySetInnerHTML.__html}';`+
                    `document.body.appendChild(script${index});`
            }

            i++
        })
        return result
    }

    res.send(minifier(`
        <!DOCTYPE html>
        <html lang="ru">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${modernExtractor.getStyleTags()}
            </head>
            <body>
                <div id="app">${appMarkup}</div>
                    
                <script type="module">
                    ${buildScripts(modernExtractor.getScriptElements())}
                </script>
                
                <script noModule>
                     ${buildScripts(legacyExtractor.getScriptElements())}
                </script>
            </body>
        </html>             
    `))
})

app.listen(3001, () => console.log('Listening on http://localhost:3001'))
