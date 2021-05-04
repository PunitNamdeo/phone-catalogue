<template>
  <div>
    <div v-if="products.length > 0" class="columns is-centered is-multiline">
      <div v-for="product in products" :key="product.id" class="card column is-one-quarter">
        <VmProducts :product="product" />
      </div>
    </div>
    <div class="columns is-centered is-multiline">
      <div v-if="products === 0" class="section">
        <p>{{ noProductLabel }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getByTitle } from '@/assets/filters'
import { mapActions, mapState } from 'vuex'
import VmProducts from '../Products'

export default {
  name: 'ProductsList',

  components: { VmProducts },

  data () {
    return {
      id: '',
      noProductLabel: 'No product found',
      productsFiltered: []
    }
  },

  computed: {
    ...mapState(['brands']),
    products () {
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle()
      } else if (this.$store.state.brands.options !== undefined) {
        return this.$store.state.brands.options
      }
      return 0
    }
  },

  mounted () {
    if (this.$store.state.brands.options === undefined) {
      this.getPhoneBrand()
    }
  },

  methods: {
    ...mapActions(['getPhoneBrand']),
    getProductByTitle () {
      if (this.$store.state.brands.options !== undefined) {
        const listOfProducts = this.$store.state.brands.options
        const titleSearched = this.$store.state.userInfo.productTitleSearched

        // eslint-disable-next-line no-return-assign
        return this.productsFiltered = getByTitle(listOfProducts, titleSearched)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
  }
</style>
