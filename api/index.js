import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.baseURL,
})

function fetchProducts() {
  const ret = instance.get(`/products`)

  console.log(ret)

  return ret
}

function fetchProductsById(id) {
  const ret = instance.get(`/products/${id}`)

  console.log(ret)

  return ret
}

function fetchProductsByKeyword(keyword) {
  return instance.get(`/products`, {
    params: {
      name_like: keyword,
    },
  })
}

export { fetchProducts, fetchProductsById, fetchProductsByKeyword }
