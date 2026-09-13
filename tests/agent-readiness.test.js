import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const read = path => readFile(path, 'utf8')

test('homepage exposes meaningful no-script content', async () => {
  const html = await read('index.html')
  const start = html.indexOf('<noscript>')
  const end = html.indexOf('</noscript>')
  assert.ok(start >= 0)
  assert.ok(end > start)
  const fallback = html.slice(start, end)
  assert.ok(fallback.length >= 500)
  assert.ok(fallback.includes('<h1>'))
  assert.ok(fallback.includes('<h2>'))
  assert.ok(fallback.includes('WhereWePraying'))
  assert.ok(fallback.includes('mosque'))
  assert.ok(fallback.includes('Qur'))
  assert.ok(fallback.includes('journal'))
  assert.ok(fallback.includes('Dua'))
})

test('homepage heading levels are sequential', async () => {
  const html = await read('index.html')
  const h1 = html.indexOf('<h1>')
  const firstH2 = html.indexOf('<h2>')
  assert.ok(h1 >= 0)
  assert.ok(firstH2 > h1)
  assert.equal(html.includes('<h3>'), false)
})

test('OpenAPI document contains machine-readable permission scopes', async () => {
  const document = JSON.parse(await read('public/openapi.json'))
  assert.equal(document.openapi, '3.1.1')
  assert.ok(document.paths['/'])
  const oauth = document.components.securitySchemes.whereweprayingOAuth2
  assert.equal(oauth.type, 'oauth2')
  assert.ok(oauth.flows.clientCredentials.scopes['mosques:read'])
  assert.ok(oauth.flows.clientCredentials.scopes['prayer-times:read'])
  assert.ok(oauth.flows.clientCredentials.scopes['content:read'])
})
