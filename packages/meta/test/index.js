import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Meta from '../src'

afterEach(cleanup)

test('Meta renders', () => {
  const { container, getByText } = render(<Meta />)
  expect(getByText('Hack Club')).toBeTruthy()
  expect(
    container.querySelector('[property="og:title"][content="Hack Club"]')
  ).toBeTruthy()
  expect(
    container.querySelector('[name="twitter:title"][content="Hack Club"]')
  ).toBeTruthy()
  expect(container).toMatchSnapshot()
})

test('Meta renders custom title', () => {
  const title = 'Custom Title – Hack Club'
  const { container, getByText } = render(<Meta title="Custom Title" />)
  expect(getByText(title)).toBeTruthy()
  expect(
    container.querySelector(`[property="og:title"][content="${title}"]`)
  ).toBeTruthy()
  expect(
    container.querySelector(`[name="twitter:title"][content="${title}"]`)
  ).toBeTruthy()
  expect(container).toMatchSnapshot()
})

test('Meta renders image', () => {
  const url = 'https://hackclub.com/cards/bank.jpg'
  const { container } = render(<Meta image={url} />)
  expect(
    container.querySelector(
      'meta[name="twitter:card"][content="summary_large_image"]'
    )
  ).toBeTruthy()
  expect(container.querySelectorAll(`[content="${url}"]`)).toHaveLength(2)
  expect(container).toMatchSnapshot()
})

test('Meta renders custom color', () => {
  const color = '#0069ff'
  const { container } = render(<Meta color={color} />)
  expect(
    container.querySelector(`meta[name="theme-color"][content="${color}"]`)
  ).toBeTruthy()
  expect(container).toMatchSnapshot()
})

test('Meta renders children', () => {
  const { container } = render(
    <Meta>
      <meta name="children" content="present" />
    </Meta>
  )
  expect(
    container.querySelector('meta[name="children"][content="present"]')
  ).toBeTruthy()
  expect(container).toMatchSnapshot()
})
