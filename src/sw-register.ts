export function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      type: 'module'
    }).then(registration => {
      console.log('SW registered:', registration)
    })
  }
}