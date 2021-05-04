<template>
  <div class="has-background-link-light">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link :to="{ name: 'index' }" class="navbar-item">
          <h1 class="title is-3 is-flex-mobile" />
        </nuxt-link>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" @click="isMenuOpen = !isMenuOpen">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <div class="navbar-item field">
            <VmSearch />
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <a href="#" class="icon" :title="facebookTooltip">
              <i class="fa fa-facebook " />
            </a>
            <a href="#" class="icon" :title="twitterTooltip">
              <i class="fa fa-twitter " />
            </a>
            <a href="#" class="icon" :title="instagramTooltip">
              <i class="fa fa-instagram " />
            </a>
            <a href="#" class="icon" :title="linkedinTooltip">
              <i class="fa fa-linkedin " />
            </a>
          </div>
          <div class="navbar-item shopping-cart" @click="showCheckoutModal">
            <span class="icon">
              <i class="fa fa-shopping-cart" />
            </span>
            <span :class="[numProductsAdded > 0 ? 'tag is-info' : '']">{{ numProductsAdded }}</span>
          </div>
        </div>
      </div>

      <!-- For mobile and tablet -->
      <div v-if="isMenuOpen" class="navbar-end">
        <VmMenu />
      </div>

      <!-- For desktop -->
      <div class="navbar-end is-hidden-mobile">
        <VmMenu />
      </div>
    </nav>
  </div>
</template>

<script>
import VmMenu from '../menu/Menu'
import VmSearch from '../search/Search'

export default {
  name: 'VmHeader',

  components: {
    VmSearch,
    VmMenu
  },

  data () {
    return {
      linkedinTooltip: 'Follow us on Linkedin',
      facebookTooltip: 'Follow us on Facebook',
      twitterTooltip: 'Follow us on Twitter',
      instagramTooltip: 'Follow us on Instagram',
      isCheckoutActive: false,
      isMenuOpen: false
    }
  },

  computed: {
    numProductsAdded () {
      if (this.$store.getters.addToCartPhones !== undefined) {
        return this.$store.getters.addToCartPhones.length
      }
      return 0
    }
  },

  methods: {
    showCheckoutModal () {
      this.$store.commit('showCheckoutModal', true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    background: url('../../static/telia-logo.png') no-repeat 50% 50%;
    background-size: 165px;
    width: 175px;
    height: 70px;
  }
  .shopping-cart {
    cursor: pointer;
  }
  a {
    color: grey;
  }

  .fa-facebook {
    color: #4267b2;
  }

  .fa-twitter {
    color: #00acee;
  }

  .fa-instagram {
    color: #cd486b;
  }

  .fa-linkedin {
    color: #0077b5;
  }

  .fa-shopping-cart {
    color: #00a4ef;
  }
</style>
