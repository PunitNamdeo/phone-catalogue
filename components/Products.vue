<template>
  <div>
    <div class="card-image">
      <figure class="image">
        <img :src="product.displayImageUrl" alt="Placeholder image">
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
          <button v-if="product.isFavourite" ref="removeFav" class="button is-small" :title="removeFromFavouriteLabel" @click="removeFromFavourite(product.id)">
            <span class="icon is-small">
              <i class="fa fa-heart" />
            </span>
          </button>
          <button v-else ref="addFav" class="button is-small" :title="addToFavouriteLabel" @click="saveToFavorite(product.id)">
            <span class="icon is-small">
              <i class="fa fa-heart-o" />
            </span>
          </button>
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
    <nuxt-link
      class="details"
      :to="{
        name: 'id',
        params: {
          id: product.id,
          title: product.displayName,
          price: product.price,
          rating: product.ratings,
          reviews: product.reviews,
          isAddedBtn: product.isAddedBtn
        }
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'Products',
  props: ['product'],

  data () {
    return {
      viewDetailsLabel: 'Details',
      addToFavouriteLabel: 'Add to favourite',
      removeFromFavouriteLabel: 'Remove from favourite',
      selected: 1
    }
  },

  methods: {
    saveToFavorite (id) {
      const isUserLogged = this.$store.state.userInfo.isLoggedIn

      if (isUserLogged) {
        this.$store.commit('addToFavourite', id)
      } else {
        this.$store.commit('showLoginModal', true)
      }
    },
    removeFromFavourite (id) {
      this.$store.commit('removeFromFavourite', id)
    }
  }
}
</script>

<style lang="scss" scoped>
 .details {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    &:hover {
      border: 1px solid #51bafc;
    }
 }
 .button {
   z-index: 2;
 }
 .card-content {
   padding: 10px 20px 0 20px;
 }
</style>
