<template>
  <p class="control has-icons-left">
    <input
      v-model="value"
      class="input is-rounded"
      type="text"
      :placeholder="placeholder"
      @keyup="search(value)"
    >
    <span class="icon is-small is-left">
      <i class="fa fa-search" />
    </span>
  </p>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      value: ''
    }
  },

  computed: {
    placeholder () {
      if (this.$route.path === '/user/wishlist') {
        return 'Search in wishlist...'
      } else {
        return 'Search...'
      }
    }
  },

  methods: {
    search (value) {
      if (value.length > 0) {
        this.$store.commit('setHasUserSearched', true)
        this.$store.commit('setProductTitleSearched', value)
      } else {
        this.$store.commit('setHasUserSearched', false)
        this.$store.commit('setProductTitleSearched', '')
      }
    }
  }
}
</script>
