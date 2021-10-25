#!/usr/bin/env node

import jsdom from "jsdom";
import fs from "fs";
import fsPromise from "fs/promises";

const args = process.argv.slice(2)
const stylesheet = `* {
    font-family: sans-serif;
}

pre>code {
    font-family: monospace;
}
pre {
    padding: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow-x: scroll;
}

.wrapper {
    display: flex;
    justify-content: center;
}

.wrapper main {
    width: 65ch;
}

.wrapper aside {
    width: 20ch;
}

@media (max-width: 600px) {
    a {
        display: inline-block;
        padding: 8px 0px;
        margin: 4px 0px;
    }
    .wrapper {
        flex-direction: column;
        max-width: 100%;
    }
    .wrapper main {
        width: unset;
        max-width: 100%;
    }
    .wrapper aside {
        width: unset;
        max-width: 100%;
    }
}`
const sidebar = `<h4><a href="./index.html">Tawa</a></h4>

<h5>Über</h5>


<a href="./warum.html">Warum?</a> <br>
<a href="./lernen.html">Tawa lernen</a> <br>
<a href="https://github.com/tawasprache/kompilierer/releases/download/continuous/Tawa">Tawa für Linux herunterladen</a> <br>
<a href="https://github.com/tawasprache">GitHub</a> <br>

<h5>Paketen</h5>

<a href="./Tawa:Debuggen.html">Tawa/Debuggen</a> <br>
<a href="./Tawa:Eingebaut.html">Tawa/Eingebaut</a> <br>
<a href="./Tawa:Folge.html">Tawa/Folge</a> <br>
<a href="./Tawa:Liste.html">Tawa/Liste</a> <br>
<a href="./Tawa:Vielleicht.html">Tawa/Vielleicht</a> <br>
`

Promise.all(args.map(async (arg) => {
    const data = await fsPromise.readFile(arg)
    const dom = new jsdom.JSDOM(data)

    const doku = dom.window.document
    const elm = doku.createElement("meta")
    elm.setAttribute("name", "description")
    elm.setAttribute("content", "Einfache funktionale Programmiersprache.")
    doku.querySelector("head").appendChild(elm)
    doku.querySelector("style").innerHTML = stylesheet
    doku.querySelectorAll("aside").forEach((elm) => {
        elm.innerHTML = sidebar + elm.innerHTML
    })

    await fsPromise.writeFile(arg, dom.serialize())
}))
