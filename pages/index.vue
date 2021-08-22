<template>
  <div class="app">
    <main>
      <div>
        <!-- <search-input
          :search-keyword="searchKeyword"
          @input="updateSearchKeyword"
        ></search-input> -->
        <search-input
          v-model="searchKeyword"
          @search="searchProducts"
        ></search-input>
      </div>
      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          class="item flex"
          @click="moveToDetailPage(item.id)"
        >
          <img class="product-image" :src="item.imageUrl" alt="" />
          <p>{{ item.name }}</p>
          <span>{{ item.price }}</span>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { fetchProducts, fetchProductsByKeyword } from '@/api/index'
import SearchInput from '@/components/SearchInput.vue'

export default {
  components: { SearchInput },

  async asyncData() {
    try {
      const { data } = await fetchProducts()
      const items = data.map((item) => ({
        ...item,
        imageUrl: `${item.imageUrl}?random=${Math.random()}`,
      }))
      return { items }
    } catch (error) {
      console.log(`product fetch error: ${error}`)
      const items = []
      return { items }
    }
  },

  data() {
    return {
      searchKeyword: '',
    }
  },

  methods: {
    moveToDetailPage(id) {
      console.log(id)
      this.$router.push(`detail/${id}`)
    },
    async searchProducts() {
      const response = await fetchProductsByKeyword(this.searchKeyword)

      this.items = response.data.map((item) => ({
        ...item,
        imageUrl: `${item.imageUrl}?random=${Math.random()}`,
      }))
    },
  },
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}
.item {
  display: inline-block;
  width: 400px;
  height: 300px;
  text-align: center;
  margin: 0 0.5rem;
  cursor: pointer;
}
.product-image {
  width: 400px;
  height: 250px;
}
.app {
  position: relative;
}
.cart-wrapper {
  position: sticky;
  float: right;
  bottom: 50px;
  right: 50px;
}
.cart-wrapper .btn {
  display: inline-block;
  height: 40px;
  font-size: 1rem;
  font-weight: 500;
}
</style>
