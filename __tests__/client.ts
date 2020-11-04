import Axios from 'axios'

const client = Axios.create({
  baseURL: 'http://127.0.0.1:3000',
  headers: { 'Content-Type': 'application/json' },
  validateStatus: status => status >= 200 && status <= 503,
})

export default client
