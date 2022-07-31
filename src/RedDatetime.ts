class RedDatetime extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'closed' })

    const datetime = document.createElement('div')
    datetime.textContent = new Date().toLocaleString()

    shadow.append(datetime)

    setInterval(() => {
      datetime.textContent = new Date().toLocaleString()
    }, 500)
  }
}

customElements.define('red-datetime', RedDatetime)
