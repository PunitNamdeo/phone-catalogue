<template>
  <div :class="[ openModal ? 'is-active' : '', 'modal' ]">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ modalTitle }}
        </p>
        <button class="delete" aria-label="close" @click="closeModal(false)" />
      </header>
      <section class="modal-card-body">
        <div v-if="!isCheckoutSection">
          <div v-for="product in products" :key="product.id" class="box">
            <button class="is-pulled-right button is-info is-inverted" @click="removeFromCart(product.contentKey)">
              {{ removeLabel }}
            </button>
            <p>{{ product.displayName }}  {{ product.quantity > 0 ? ` - Quantity: ${product.quantity}` : '' }}</p>
            <p>{{ product.price }} &euro;</p>
          </div>
          <div v-if="products === 0">
            <p>{{ cartEmptyLabel }}</p>
          </div>
        </div>
        <div v-if="isCheckoutSection">
          <p>You bought it :-)</p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button v-if="products.length > 0 && !isCheckoutSection" class="button is-success" @click="onNextBtn">
          {{ buyLabel }}
        </button>
        <button v-if="isCheckoutSection" class="button is-success" @click="closeModal(true)">
          {{ closeLabel }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',

  data () {
    return {
      modalTitle: 'Checkout',
      removeLabel: 'Remove from cart',
      cartEmptyLabel: 'Your cart is empty',
      closeLabel: 'Close',
      isCheckoutSection: false
    }
  },

  computed: {
    products () {
      if (this.$store.getters.addToCartPhones) {
        return this.$store.getters.addToCartPhones
      }
      return 0
    },
    openModal () {
      if (this.$store.getters.isCheckoutModalOpen) {
        return true
      } else {
        return false
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    buyLabel () {
      if (this.$store.getters.addToCartPhones) {
        const totalProducts = this.products.length
        const productsAdded = this.$store.getters.addToCartPhones
        const pricesArray = []
        let productLabel = ''
        let finalPrice = ''
        let quantity = 1

        productsAdded.forEach((product) => {
          if (product.quantity >= 1) {
            quantity = product.quantity
          }

          pricesArray.push((product.price * quantity)) // get the price of every product added and multiply quantity
        })

        finalPrice = pricesArray.reduce((a, b) => a + b, 0) // sum the prices

        if (totalProducts > 1) { // set plural or singular
          productLabel = 'products'
        } else {
          productLabel = 'product'
        }
        return `Buy ${totalProducts} ${productLabel} at ${finalPrice}€`
      }
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    }
  },

  methods: {
    closeModal (reloadPage) {
      this.$store.commit('showCheckoutModal', false)

      if (reloadPage) {
        this.products.forEach((product) => {
          this.removeFromCart(product.contentKey)
        })
        window.location.reload()
      }
    },
    removeFromCart (id) {
      const data = {
        id,
        status: false
      }
      this.$store.commit('removeFromCart', id)
      this.$store.commit('setAddedBtn', data)
    },
    onNextBtn () {
      if (this.isUserLoggedIn) {
        this.isCheckoutSection = true
      } else {
        this.$store.commit('showCheckoutModal', false)
        this.$store.commit('showLoginModal', true)
      }
    },
    onPrevBtn () {
      this.isCheckoutSection = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
