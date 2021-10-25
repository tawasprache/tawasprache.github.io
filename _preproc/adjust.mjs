#!/usr/bin/env node

import jsdom from "jsdom";
import fs from "fs";
import fsPromise from "fs/promises";

const args = process.argv.slice(2)
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
    doku.querySelectorAll("aside").forEach((elm) => {
        elm.innerHTML = sidebar + elm.innerHTML
    })

    await fsPromise.writeFile(arg, dom.serialize())
}))
