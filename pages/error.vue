<template>
  <div class="has-text-centered has-text-weight-semibold has-text-black">
    <div v-if="errorMessage.message">
      {{ errorMessage.message }}
    </div>
    <div v-else>
      An error occurred due to some technical issue.
    </div>
    <div>
      Please try again later..<nuxt-link class="pl-4" :to="{ name: 'index' }">
        Back to the home page
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  data () {
    return {
      errorMessage: ''
    }
  },
  mounted () {
    if (this.$store.state.brandError) {
      this.errorMessage = this.$store.state.brandError
    } else if (this.$store.state.phoneError) {
      this.errorMessage = this.$store.state.phoneError
    }
  }
}
</script>

<style scoped>

</style>
