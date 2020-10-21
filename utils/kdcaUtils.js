const cheerio = require('cheerio')
const { v4: uuid } = require('uuid')
const { get } = require('superagent')
const path = require('path').resolve()
const html2img = require('node-html-to-image')
const { existsSync } = require('fs')
const { mkdirSync } = require('fs')

if (!existsSync(path + '/tables')) mkdirSync(path + '/tables')

/* eslint-disable standard/no-callback-literal */
/**
 * @param {crawlData} cb
 */
function kdcaRSS (cb) {
  let prevId = Infinity
  let prevTitle = ''

  setInterval(async () => {
    const res = await get('https://www.cdc.go.kr/board/board.es?bid=0015').set('User-Agent', 'kdcaRSS (pmhstudio.pmh@gmail.com)')
    if (!res.text) return

    const $ = cheerio.load(res.text)
    const id = $('li')[5].children[0].data
    const url = $('li')[6].children[1].attribs.href
    const title = $('li')[6].children[1].attribs.title
    const author = $('li')[7].children[0].data

    if (prevId >= id || prevTitle === title) { prevId = id; prevTitle = title; return }
    prevId = id; prevTitle = title

    const res2 = await get('https://www.cdc.go.kr' + url).set('User-Agent', 'kdcaRSS (pmhstudio.pmh@gmail.com)')
    if (!res2.text) return

    const $$ = cheerio.load(res2.text)
    const contentDiv = $$('.tb_contents')[0]
    const content = contentDiv.children.filter((elem) => elem.tagName === 'p' && typeof elem.children[0].data === 'string').reduce((acc, curr) => acc + curr.children[0].data, '')
    const tables = []

    for (const table of $$('table').toArray()) {
      const output = path + '/tables/' + uuid() + '.png'
      await html2img({
        puppeteerArgs: { defaultViewport: { width: 770, height: 100 }, executablePath: '/snap/bin/chromium' },
        html: cheerio.html(table),
        output
      })
      tables.push(output)
    }

    cb({ id, url, title, author, tables, content })
  }, 1000)
}

module.exports = { kdcaRSS }

/**
 * @callback crawlData
 * @param {data} data
 */

/**
 * @typedef {{
 *  id: number,
 *  url: string,
 *  title: string,
 *  author: string,
 *  tables: string[],
 *  content: string
 * }} data
 */
