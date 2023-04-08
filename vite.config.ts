import { defineConfig, } from 'vite'
import fs from 'fs'

// Find TS files and create links to them on index
const tsFiles = await fs.readdirSync('./src');
const sandboxes = tsFiles.filter(ts => ts.includes('.ts'))
  .filter(ts => !ts.includes('.d.ts'))
  .filter(ts => !ts.includes('index'));

const servingFiles = sandboxes.length ?
  sandboxes.map(ts => {
    const link = ts.replace('.ts', '');
    return `<a href="/${link}">${link}</a>`;
  })
  : `<p>No sandboxes yet. Checkout the <b>readme</b> to get started!</p>`

const injectScenePlugin = () => {
  return {
    name: 'inject-scene',
    transformIndexHtml(html, ctx) {
      const { originalUrl } = ctx;
      if (originalUrl !== '/') {
        return html.replace(
          /<script id="injectTarget"(.*?)<\/script>/,
          `<script id="injectOutput" type="module" src="/src${originalUrl}.ts"></script>`,
        )
      } else {
        const uglyInjectedHTML = `
<style>
  dialog {
    max-height: 90dvh;
    overflow: auto;
  }

  dialog::backdrop {
    background-color: hsla(0, 1%, 1%, 0.7);
    backdrop-filter: blur(6px);
  }

  dialog p {
    margin-block: 0.2rem;
  }

  dialog a {
    display: block;
    text-decoration: underline;
    color: darkblue;
  }
</style>
<dialog id="dialog">
  <p>Links to sandboxes</p>
  <nav>${servingFiles}</nav>
</dialog>
<script>dialog.showModal();</script>
`
        return html.replace(
          '<!-- injectNavigation here -->',
          uglyInjectedHTML
        )
      }
    },
  }
}





export default defineConfig({
  plugins: [
    injectScenePlugin(),
  ],
})