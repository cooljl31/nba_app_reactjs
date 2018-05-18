const FULL_YEAR = (new Date()).getFullYear()
let URL = ''
if (window.location.origin+window.location.pathname === 'http://localhost:3000/') {
  URL = "http://localhost:3001"
} else {
  URL = 'http://192.168.0.9:3001'
}
export {
  FULL_YEAR,
  URL
}
console.log();
