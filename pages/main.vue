<template>
  <div>
    <p>메인 페이지입니다.</p>
    <div>
      {{ products }}
    </div>
  </div>
</template>

<script>
import { fetchProducts } from '@/api/index'

export default {
  async asyncData() {
    const response = await fetchProducts()
    console.log(response)
    const products = response.data
    return { products }
  },

  // async created() {
  //   const response = await axios.get('http://localhost:3000/products');
  //   console.log(response);
  //   this.products = response.data;
  // },
}
</script>

<style></style>
