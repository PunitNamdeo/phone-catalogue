<template>
  <div>
    <div class="navbar-item pt-4">
      <div class="field is-grouped">
        <p class="control">
          <a v-if="!isUserLoggedIn" class="button" @click="showSignupModal">
            <span class="icon">
              <i class="fa fa-user-plus" />
            </span>
            <span>{{ signupLabel }}</span>
          </a>
        </p>
        <p class="control">
          <a v-if="!isUserLoggedIn" class="button" @click="showLoginModal">
            <span class="icon">
              <i class="fa fa-user" />
            </span>
            <span>{{ loginLabel }}</span>
          </a>
        </p>
      </div>
    </div>
    <div v-if="isUserLoggedIn" class="navbar-item has-dropdown is-hoverable pt-2 has-text-weight-semibold">
      <a class="navbar-link">
        Welcome {{ getUserName }}
      </a>
      <div class="navbar-dropdown is-boxed">
        <nuxt-link class="navbar-item" :to="{ name: 'user-wishlist' }">
          {{ wishlistLabel }}
        </nuxt-link>
        <hr class="navbar-divider">
        <a class="navbar-item" @click="logout">
          {{ logoutLabel }}
        </a>
        <hr class="navbar-divider">
        <nuxt-link v-if="$route.name !== 'index'" class="navbar-item" :to="{ name: 'index' }">
          {{ goToHomePageLabel }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VmMenu',
  data () {
    return {
      wishlistLabel: 'Wishlist',
      logoutLabel: 'Log out',
      loginLabel: 'Log in',
      signupLabel: 'Sign up',
      goToHomePageLabel: 'Home'
    }
  },

  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    getUserName () {
      const name = this.$store.getters.getUserName

      if (name === '') {
        return 'user'
      } else {
        return name
      }
    }
  },

  methods: {
    logout () {
      this.$store.commit('isUserLoggedIn', false)
      this.$store.commit('isUserSignedUp', false)
      this.$store.commit('removeFromFavouritePhone')
      this.$store.commit('removeFromFavourite')
      this.$store.commit('removeFromCart')

      // redirect to homepage
      this.$router.push({ name: 'index' })
    },
    showLoginModal () {
      this.$store.commit('showLoginModal', true)
    },
    showSignupModal () {
      this.$store.commit('showSignupModal', true)
    }
  }
}
</script>
