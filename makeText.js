/** Command-line tool to generate Markov text. */

const fs = require('fs')
const markov = require('./markov')
const axios = require('axios')
const process = require('process')

function autogenerateText(text) {
    let mm = new markov.MarkovMachine(text)
    console.log(mm.makeText())
}

function makeText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Cannot read: ${path}`, err)
            process.exit(1)
        } else {
            autogenerateText(data)
        }
    })
}

async function makeTextFromURL(url) {
    let res
    try {
        res = await axios.get(url)
    } catch (err) {
        console.error(`Cannot read: ${url}`, err)
        process.exit(1)
    }
    autogenerateText(res.data)
}

if (process.argv[2] === 'file') {
    makeText(process.argv[3])
} else if (process.argv[2] === 'url') {
    makeTextFromURL(process.argv[3])
} else {
    console.error(`Unknown Command: ${process.argv[2]}`)
    process.exit(1)
}
