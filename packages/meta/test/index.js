import { render, cleanup } from '@testing-library/react'
import Meta from '../src'

afterEach(cleanup)

test('Meta renders', () => {
  render(<Meta />)
  expect(document.title).toBe('Hack Club')
  expect(
    document.head.querySelector('[property="og:title"][content="Hack Club"]')
  ).toBeTruthy()
  expect(
    document.head.querySelector('[name="twitter:title"][content="Hack Club"]')
  ).toBeTruthy()
})

test('Meta renders custom title', () => {
  const title = 'Custom Title – Hack Club'
  render(<Meta title="Custom Title" />)
  expect(document.title).toBe(title)
  expect(
    document.head.querySelector(`[property="og:title"][content="${title}"]`)
  ).toBeTruthy()
  expect(
    document.head.querySelector(`[name="twitter:title"][content="${title}"]`)
  ).toBeTruthy()
})

test('Meta renders image', () => {
  const url = 'https://hackclub.com/cards/bank.jpg'
  render(<Meta image={url} />)
  expect(
    document.head.querySelector(
      'meta[name="twitter:card"][content="summary_large_image"]'
    )
  ).toBeTruthy()
  expect(document.head.querySelectorAll(`[content="${url}"]`)).toHaveLength(2)
})

test('Meta renders custom color', () => {
  const color = '#0069ff'
  render(<Meta color={color} />)
  expect(
    document.head.querySelector(`meta[name="theme-color"][content="${color}"]`)
  ).toBeTruthy()
})

test('Meta renders description', () => {
  const desc = 'A cool site'
  render(<Meta description={desc} />)
  expect(
    document.head.querySelector(`meta[name="description"][content="${desc}"]`)
  ).toBeTruthy()
  expect(
    document.head.querySelector(
      `meta[property="og:description"][content="${desc}"]`
    )
  ).toBeTruthy()
})
