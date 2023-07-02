# figma-rest

Node and browser client for [Figma REST API](https://www.figma.com/developers/api)

## Install

```bash
npm i figma-rest
```

```bash
yarn add figma-rest
```

```bash
pnpm i figma-rest
```

## Usage

```typescript
import { FigmaClient } from 'figma-api'

const figma = new FigmaClient({
  personalAccessToken: 'fig123',
})

const file = await figma.files.get('file_key')
```

### Pagination

Some of Figma's endpoints that contain long lists are paginated.

The client provides an `AsyncIterableIterator` that you can `for await...of` each item in the list:

```typescript
let reactions: Reaction[] = []
for await (let reaction of client.comments.reactions('123', '456')) {
  reactions.push(reaction)
}
```
