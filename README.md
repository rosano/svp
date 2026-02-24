# svp (SvelteKit Proof)

Basic implementations of layers used in my app stack.

https://svp.github.rosano.ca

## Architecture

| layer | description |
| - | - |
| [SvelteKit](https://svelte.dev/docs/kit) | framework, UI components, routing, redirects, navigation without HTTP requests, `vite`-fast builds, `service-worker.js` automatic registration, file organization |
| + [adapter-static](https://svelte.dev/docs/kit/adapter-static) | build as static site |
| + [mdsvex](https://mdsvex.pngwn.io/docs) | markdown content in `.md` files |
| + [svelte-pathfinder](https://github.com/sveltetools/svelte-pathfinder) | hash based routing on top of Svelte's file-based router |
| [Vitest](https://vitest.dev) | logic or unit tests in `tests.js` files |
| [Playwright](https://playwright.dev) | interface tests in `tests-ui.js` files |

## Development

Install [Node.js and npm](https://nodejs.org/en/download/), then install the dependencies:

```sh
npm i
```

### Run

Start a development server:

```sh
npm run dev
```

Type `o` + `Enter` or visit http://localhost:5173 in your browser.

### Test

Run logic tests:

```sh
npm run test:unit
```

Run interface tests:

```sh
npm run test:e2e
```

Run all tests:

```sh
npm run test
```

### Deploy

Build a production version:

```sh
npm run build
```

This will produce a static-site in `/build` that can be deployed to GitHub Pages and other places.
