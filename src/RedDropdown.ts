// TODO make it work similarely to a select
// TODO explore styling options from the outside
class RedDropdown extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(optionTemplate.content.cloneNode(true))

    const current = shadow.querySelector('#current')
    if (current) {
      current.innerHTML = this.children[0].innerHTML
    }
    current?.addEventListener('click', () => this.toggle())
    ;[...this.children].forEach((child) => {
      child.addEventListener('click', () => this.select(child))
    })
    shadow.querySelector('#options')?.append(...this.children)
  }

  toggle() {
    this.shadowRoot?.querySelector('#options')?.classList.toggle('active')
  }

  select(e: Element) {
    const current = this.shadowRoot?.querySelector('#current')
    if (current) {
      current.innerHTML = e.innerHTML
    }
    this.toggle()
  }
}

const optionTemplate = document.createElement('template')
optionTemplate.innerHTML = `
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
  position: absolute;
  border-radius: 0.25em;
  border: 1px solid #ccc;
  transform-origin: top;
  transition: transform 0.2s ease-in-out;
  transform: scaleY(0);
  box-sizing: border-box;
}

#options.active {
  transform: scaleY(1);
}

red-option:hover {
  background-color: #eee;
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
