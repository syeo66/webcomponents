// TODO add change event
// TODO make it work with form
// TODO add outside click
// TODO add escape key
// TODO explore styling options from the outside
class RedDropdown extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    const current = shadow.querySelector('#current')

    current?.addEventListener('click', () => this.toggle())
    ;[...this.children].forEach((child) => {
      child.addEventListener('click', () => this.select(child))
    })

    const firstHTML = this.children[0]?.innerHTML

    const options = shadow.querySelector('#options')
    options?.append(...this.children)

    if (current) {
      // eslint-disable-next-line no-console
      const selected = shadow.querySelector('red-option[selected]')
      // eslint-disable-next-line no-console
      current.innerHTML = selected?.innerHTML || firstHTML
    }
  }

  toggle() {
    this.shadowRoot?.querySelector('#options')?.classList.toggle('active')
  }

  close() {
    this.shadowRoot?.querySelector('#options')?.classList.remove('active')
  }

  select(e: Element) {
    this.shadowRoot?.querySelectorAll('red-option')?.forEach((elm) => elm.removeAttribute('selected'))
    e.setAttribute('selected', '')

    const current = this.shadowRoot?.querySelector('#current')

    if (current) {
      current.innerHTML = e.innerHTML
    }

    this.close()
  }
}

const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 0.25em;
  position: relative;
}

red-option, #current {
  display: block;
  padding: 0.25em 0.5em;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
}

#options {
  background-color: #fff;
  border-radius: 0.25em;
  border: 1px solid #ccc;
  box-sizing: border-box;
  position: absolute;
  transform-origin: top;
  transform: scaleY(0);
  transition: transform 0.2s ease-in-out;
  z-index: 2;
}

#options.active {
  transform: scaleY(1);
}

red-option:hover {
  background-color: #eee;
}

red-option[selected] {
  background-color: #ddd;
}

red-option:not(:last-child) {
  border-bottom: 1px solid #ccc;
}
</style>
<div id="current">Click</div>
<div id="options"></div>
`

class RedOption extends HTMLElement {}

customElements.define('red-dropdown', RedDropdown)
customElements.define('red-option', RedOption)
