<template>
  <div class="section">
    <h3 class="title">
      {{ pageTitle }}
    </h3>
    <div v-if="productsInWishlist.length > 0" class="columns is-centered is-multiline">
      <div v-for="product in productsInWishlist" :key="product.id" class="card column is-one-quarter">
        <div class="card-image">
          <figure class="image">
            <img v-if="product.imgUrl" :src="product.imgUrl" alt="Brand specific phone image">
            <img v-if="product.displayImageUrl" :src="product.displayImageUrl" alt="Brand image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">
                {{ product.displayName }}
              </p>
            </div>
            <div>
              <button v-if="product.isFavourite" class="button is-small" :title="removeFromFavouriteLabel" @click="removeFromFavourite(product)">
                <span class="icon is-small">
                  <i class="fa fa-heart" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div class="content is-clearfix">
          <p>A smartphone is an addictive device which traps a soul into a lifeless planet full of lives</p>
          <div class="is-pulled-left">
            <i v-if="product.ratings === 1" class="fa fa-star" />
            <i v-if="product.ratings === 2" class="fa fa-star" />
            <i v-if="product.ratings === 2" class="fa fa-star" />
            <i v-if="product.ratings === 3" class="fa fa-star" />
            <i v-if="product.ratings === 3" class="fa fa-star" />
            <i v-if="product.ratings === 3" class="fa fa-star" />
            <i v-if="product.ratings === 4" class="fa fa-star" />
            <i v-if="product.ratings === 4" class="fa fa-star" />
            <i v-if="product.ratings === 4" class="fa fa-star" />
            <i v-if="product.ratings === 4" class="fa fa-star" />
            <i v-if="product.ratings === 5" class="fa fa-star" />
            <i v-if="product.ratings === 5" class="fa fa-star" />
            <i v-if="product.ratings === 5" class="fa fa-star" />
            <i v-if="product.ratings === 5" class="fa fa-star" />
            <i v-if="product.ratings === 5" class="fa fa-star" />
            <p>{{ product.reviews > 0 ? `${product.reviews} Reviews` : 'No reviews' }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="columns is-centered section is-half">
      <p>{{ noProductLabel }}</p>
    </div>
  </div>
</template>

<script>
import { getByTitle } from '@/assets/filters'

export default {
  name: 'UserWishlist',

  data () {
    return {
      pageTitle: 'Your Wishlist',
      noProductLabel: 'Your wishlist is empty',
      addToFavouriteLabel: 'Add to favourite',
      removeFromFavouriteLabel: 'Remove from favourite'
    }
  },

  computed: {
    productsInWishlist () {
      let wishListResult = []
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle()
      } else if (this.$store.getters.productsAddedToFavourite && !this.$store.getters.addFavPhone) {
        wishListResult = this.$store.getters.productsAddedToFavourite
      } else if (this.$store.getters.addFavPhone && !this.$store.getters.productsAddedToFavourite) {
        wishListResult = this.$store.getters.addFavPhone
      } else if (this.$store.getters.addFavPhone && this.$store.getters.productsAddedToFavourite) {
        wishListResult = [...this.$store.getters.productsAddedToFavourite, ...this.$store.getters.addFavPhone]
      }
      return wishListResult
    }
  },

  methods: {
    getProductByTitle () {
      const combinedListOfProducts = [...this.$store.getters.productsAddedToFavourite, ...this.$store.getters.addFavPhone]
      const listOfProducts = combinedListOfProducts
      const titleSearched = this.$store.state.userInfo.productTitleSearched

      // eslint-disable-next-line no-return-assign
      return this.productsFiltered = getByTitle(listOfProducts, titleSearched)
    },
    saveToFavorite (id) {
      const isUserLogged = this.$store.state.userInfo.isLoggedIn

      if (isUserLogged) {
        this.$store.commit('addToFavouritePhone', id)
      } else {
        this.$store.commit('showLoginModal', true)
      }
    },
    removeFromFavourite (product) {
      if (product.contentKey) {
        this.$store.commit('removeFromFavouritePhone', product.contentKey)
      } else {
        this.$store.commit('removeFromFavourite', product.id)
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
