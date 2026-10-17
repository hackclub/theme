import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { toCSS } from '@hackclub/tokens'

rmSync('./dist', { recursive: true, force: true })
mkdirSync('./dist', { recursive: true })

const read = (file: string) => readFileSync(`./src/${file}`, 'utf8')
const tokens = toCSS()
const fonts = read('fonts.css')
const base = read('base.css')
const prose = read('prose.css')

writeFileSync('./dist/fonts.css', fonts)
writeFileSync('./dist/base.css', base)
writeFileSync('./dist/prose.css', prose)
// Everything in one file: tokens, fonts, element defaults and prose
writeFileSync('./dist/index.css', [tokens, fonts, base, prose].join('\n'))

cpSync('./fonts', './dist/fonts', { recursive: true })
