import bind from './bind'
import bindChildren from './bindChildren'
import { update } from './current'

const observe = () => {
  const observer = new window.MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && Object.keys(mutation.target.dataset).join(',').indexOf('redact') > -1) {
        bind(mutation.target)
      }

      if (mutation.type === 'childList') {
        bindChildren(mutation.target)
        update(mutation.target)
      }
    })
  })

  observer.observe(
    document.querySelector('body'),
    { attributes: true, childList: true, subtree: true }
  )
}

export default observe
