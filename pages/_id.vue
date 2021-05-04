<template>
  <div>
    <div v-if="products.length > 0">
      <div v-for="product in products" :key="product.id">
        <div class="section">
          <div class="card is-clearfix columns">
            <figure class="card-image column ">
              <img :src="product.imgUrl" alt="Placeholder image">
            </figure>
            <div class="card-content column is-two-thirds">
              <div class="card-content__title">
                <h2 class="title is-4">
                  {{ product.displayName }}
                  <button v-if="product.isFavourite" class="button is-small is-pulled-right" :title="removeFromFavouriteLabel" @click="removeFromFavourite(product.contentKey)">
                    <span class="icon is-small">
                      <i class="fa fa-heart" />
                    </span>
                  </button>
                  <button v-else class="button is-small is-pulled-right" :title="addToFavouriteLabel" @click="saveToFavorite(product.contentKey)">
                    <span class="icon is-small">
                      <i class="fa fa-heart-o" />
                    </span>
                  </button>
                </h2>
              </div>
              <div class="card-content__text">
                <p>
                  Try a better life with better phones. The best revolutionary device at the best and affordable price.
                  You can't feel alone as long as you have a cellphone in your hand. Believe in better things, better sound, and good research
                </p>
              </div>
              <div class="pt-4 has-text-centered">
                <span v-for="colorOptions in product.colorOptions" :key="colorOptions.id" class="p-2">
                  <span class="circle" :style="{ background: colorOptions.hex}" :title="colorOptions.name" />
                </span>
              </div>
              <div v-if="product.ratings === 1" class="card-content__ratings">
                <i class="fa fa-star" />
              </div>
              <div v-else-if="product.ratings === 2" class="card-content__ratings">
                <i class="fa fa-star" />
                <i class="fa fa-star" />
              </div>
              <div v-else-if="product.ratings === 3" class="card-content__ratings">
                <i class="fa fa-star" />
                <i class="fa fa-star" />
                <i class="fa fa-star" />
              </div>
              <div v-else-if="product.ratings === 4" class="card-content__ratings">
                <i class="fa fa-star" />
                <i class="fa fa-star" />
                <i class="fa fa-star" />
                <i class="fa fa-star" />
              </div>
              <div v-else-if="product.ratings === 5" class="card-content__ratings">
                <i class="fa fa-star" />
                <i class="fa fa-star" />
                <i class="fa fa-star" />
                <i class="fa fa-star" />
                <i class="fa fa-star" />
              </div>
              <div class="card-content__reviews">
                <div class="is-pulled-left">
                  <p><strong>{{ product.reviews > 0 ? `${product.reviews} Reviews` : 'No reviews' }}</strong></p>
                </div>
              </div>
              <div class="card-content__price is-pulled-right">
                <span class="title is-3"><strong>{{ product.price }}&euro;</strong></span>
              </div>
              <div class="card-content__more-info-link mt-2">
                <a :href="product.link" target="_blank" class="card-content__more-info-link has-text-centered">click here to get more information</a>
              </div>
              <div class="card-content__selection mt-4">
                <div class="select is-rounded is-pulled-left mt-6">
                  <select :value="product.quantity" @change="onSelectQuantity(product.contentKey, $event)">
                    <option v-for="quantity in quantityArray" :key="quantity" :value="quantity">
                      {{ quantity }}
                    </option>
                  </select>
                </div>
                <div class="card-content__btn is-pulled-right mt-6">
                  <button v-if="!product.isAddedBtn" class="button is-primary" @click="addToCart(product.contentKey)">
                    {{ addToCartLabel }}
                  </button>
                  <button v-else class="button is-info is-inverted" @click="removeFromCart(product.contentKey)">
                    {{ removeFromCartLabel }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="columns is-centered is-multiline">
      {{ noProductLabel }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getByTitle } from '~/assets/filters'

export default {
  name: 'Brands',

  data () {
    return {
      addToCartLabel: 'Add to cart',
      removeFromCartLabel: 'Remove from cart',
      addToFavouriteLabel: 'Add to favourite',
      removeFromFavouriteLabel: 'Remove from favourite',
      noProductLabel: 'No product found',
      productsFiltered: [],
      selected: 1,
      quantityArray: []
    }
  },

  computed: {
    ...mapState(['phoneList', 'phonesPerBrand']),
    products () {
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle()
      }
      this.$store.commit('savePhonesPerBrand', this.$route.params.id)
      return this.$store.state.phonesPerBrand
    }
  },

  mounted () {
    if (this.$store.state.phonesPerBrand.length === 0) {
      this.getPhonesBasedOnBrand()
    }

    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i)
    }
  },

  methods: {
    ...mapActions(['getPhonesBasedOnBrand']),
    addToCart (id) {
      const data = {
        id,
        status: true
      }
      const isUserLogged = this.$store.state.userInfo.isLoggedIn
      if (isUserLogged) {
        this.$store.commit('addToCart', id)
        this.$store.commit('setAddedBtn', data)
      } else {
        this.$store.commit('showLoginModal', true)
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
    onSelectQuantity (id, event) {
      const data = {
        id,
        quantity: event.target.value
      }
      this.$store.commit('quantity', data)
    },
    saveToFavorite (id) {
      const isUserLogged = this.$store.state.userInfo.isLoggedIn

      if (isUserLogged) {
        this.$store.commit('addToFavouritePhone', id)
      } else {
        this.$store.commit('showLoginModal', true)
      }
    },
    removeFromFavourite (id) {
      this.$store.commit('removeFromFavouritePhone', id)
    },
    getProductByTitle () {
      if (this.$store.state.phonesPerBrand) {
        const listOfProducts = this.$store.state.phonesPerBrand
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
    padding-bottom: 20px;
    background: #f2f2f2;

    .card-image {
      text-align: center;
    }

    .card-content {
      padding: 20px 30px;

      &__text {
        margin: 15px 0;
      }

      &__reviews {
        display: inline-block;
      }
      &__ratings {
        margin-top: 2rem;
      }
      &__price {
        position: relative;
        bottom: 20px;
      }
      &__selection {
        border-bottom: 1px solid #dbdbdb;
      }
      &__more-info-link {
      display: inline-block;
      width: 100%;
    }
      .circle {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        display: inline-block;
      }
      .is-small {
        background: #f2f2f2;
      }
      .is-primary {
        background-color: #990ae3;
        border-color: #990ae3;
      }
      .is-inverted {
        background: #f2f2f2;
      }
    }
  }
</style>
