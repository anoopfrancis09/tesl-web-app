const querystring = require('querystring')

const nativeFetch = window.fetch

export const fetch = async (url, options) => {
  options.headers = {
    ...options.headers,
  }
  const response = await nativeFetch(url, options)

  return response
}

window.fetch = fetch

const get = ({ url, data }) =>
  fetch(`${url}?${querystring.stringify(data)}`, {
    method: 'GET',
  })
const post = ({ url, data = {} }) =>
  fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

const network = {
  get,
  post
}
export default network
