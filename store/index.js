export const state = () => ({
  brands: {},
  phoneList: [],
  phonesPerBrand: [],
  brandError: {},
  phoneError: {},
  addFavPhone: [],
  addToCartPhones: [],
  userInfo: {
    isLoggedIn: false,
    isSignedUp: false,
    hasSearched: false,
    name: '',
    productTitleSearched: ''
  },
  systemInfo: {
    openLoginModal: false,
    openSignupModal: false,
    openCheckoutModal: false
  }
})

export const getters = {
  brands: state => state.brands,
  phoneList: state => state.phoneList,
  phonesPerBrand: state => state.phonesPerBrand,
  brandError: state => state.brandError,
  phoneError: state => state.phoneError,
  addToCartPhones: (state) => {
    if (state.addToCartPhones.length > 0) {
      return state.addToCartPhones.filter((el) => {
        return el.isAddedToCart
      })
    }
  },
  productsAddedToFavourite: (state) => {
    if (state.brands.options !== undefined) {
      return state.brands.options.filter((el) => {
        return el.isFavourite
      })
    }
  },
  addFavPhone: (state) => {
    if (state.addFavPhone.length > 0) {
      return state.addFavPhone.filter((el) => {
        return el.isFavourite
      })
    }
  },
  isUserLoggedIn: (state) => {
    return state.userInfo.isLoggedIn
  },
  isUserSignedUp: (state) => {
    return state.userInfo.isSignedUp
  },
  getUserName: (state) => {
    return state.userInfo.name
  },
  isLoginModalOpen: (state) => {
    return state.systemInfo.openLoginModal
  },
  isSignupModalOpen: (state) => {
    return state.systemInfo.openSignupModal
  },
  isCheckoutModalOpen: (state) => {
    return state.systemInfo.openCheckoutModal
  },
  quantity: (state) => {
    state.phonesPerBrand.forEach((phoneDetail, index) => {
      return state.phonesPerBrand[index].quantity
    })
  }
}

export const mutations = {
  saveBrands: (state, brands) => {
    state.brands = brands
  },
  savePhoneList: (state, phoneList) => {
    state.phoneList = phoneList
  },
  savePhonesPerBrand: (state, id) => {
    state.phonesPerBrand = []
    state.phoneList.forEach((product) => {
      if (product.brand === id) {
        state.phonesPerBrand.push(product)
      }
    })
  },
  brandsApiError: (state, brandError) => {
    state.brandError = brandError
  },
  phonesApiError: (state, phoneError) => {
    state.phoneError = phoneError
  },
  addToCart: (state, id) => {
    state.phonesPerBrand.forEach((el) => {
      if (id === el.contentKey) {
        state.addToCartPhones.push(el)
        el.isAddedToCart = true
      }
    })
  },
  setAddedBtn: (state, data) => {
    state.phoneList.forEach((el) => {
      if (data.id === el.contentKey) {
        el.isAddedBtn = data.status
      }
    })
  },
  removeFromCart: (state, id) => {
    state.phoneList.forEach((el) => {
      if (id === el.contentKey) {
        el.isAddedToCart = false
      }
    })
    if (state.addToCartPhones.length > 0) {
      state.addToCartPhones.forEach((el, index) => {
        if (state.addToCartPhones[index].contentKey === id) {
          state.addToCartPhones.splice(index, 1)
        }
      })
    }
  },
  isUserLoggedIn: (state, isUserLoggedIn) => {
    state.userInfo.isLoggedIn = isUserLoggedIn
  },
  isUserSignedUp: (state, isSignedUp) => {
    state.userInfo.isSignedUp = isSignedUp
  },
  setHasUserSearched: (state, hasSearched) => {
    state.userInfo.hasSearched = hasSearched
  },
  setUserName: (state, name) => {
    state.userInfo.name = name
  },
  setProductTitleSearched: (state, titleSearched) => {
    state.userInfo.productTitleSearched = titleSearched
  },
  showLoginModal: (state, show) => {
    state.systemInfo.openLoginModal = show
  },
  showSignupModal: (state, show) => {
    state.systemInfo.openSignupModal = show
  },
  showCheckoutModal: (state, show) => {
    state.systemInfo.openCheckoutModal = show
  },
  addToFavourite: (state, id) => {
    state.brands.options.forEach((el) => {
      if (id === el.id) {
        el.isFavourite = true
      }
    })
  },
  addToFavouritePhone: (state, id) => {
    state.phonesPerBrand.forEach((el) => {
      if (id === el.contentKey) {
        state.addFavPhone.push(el)
        el.isFavourite = true
      }
    })
  },
  removeFromFavourite: (state, id) => {
    state.brands.options.forEach((el) => {
      if (id === el.id) {
        el.isFavourite = false
      }
    })
  },
  removeFromFavouritePhone: (state, id) => {
    state.phoneList.forEach((el) => {
      if (id === el.contentKey) {
        el.isFavourite = false
      }
    })
    if (state.addFavPhone.length > 0) {
      state.addFavPhone.forEach((el, index) => {
        if (state.addFavPhone[index].contentKey === id) {
          state.addFavPhone.splice(index, 1)
        }
      })
    }
  },
  quantity: (state, data) => {
    state.phonesPerBrand.forEach((el) => {
      if (data.id === el.contentKey) {
        el.quantity = data.quantity
      }
    })
  }
}
export const actions = {
  async getPhoneBrand ({ commit }) {
    try {
      const phoneBrand = await this.$axios.$get('brands.json')
      phoneBrand.options.forEach((brandObj) => {
        brandObj.isFavourite = false
        brandObj.ratings = Math.floor(Math.random() * (5 - 1) + 1)
        brandObj.reviews = Math.floor(Math.random() * (20 - 1) + 1)
      })
      commit('saveBrands', phoneBrand)
    } catch (error) {
      commit('brandsApiError', error)
      await this.$router.push('/error')
    }
  },

  async getPhonesBasedOnBrand ({ commit }) {
    try {
      const getPhones = await this.$axios.$get('phones.json')
      getPhones.forEach((phoneObj) => {
        phoneObj.quantity = 1
        phoneObj.isFavourite = false
        phoneObj.isAddedToCart = false
        phoneObj.isAddedBtn = false
        phoneObj.ratings = Math.floor(Math.random() * (5 - 1) + 1)
        phoneObj.reviews = Math.floor(Math.random() * (10 - 1) + 1)
      })
      commit('savePhoneList', getPhones)
    } catch (error) {
      commit('phonesApiError', error)
      await this.$router.push('/error')
    }
  }
}
