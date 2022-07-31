class RedHeading extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'closed' })

    const heading = document.createElement('h1')
    heading.textContent = 'Some webcomponents'

    shadow.append(heading)
  }
}

customElements.define('red-heading', RedHeading)
