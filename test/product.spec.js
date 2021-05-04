import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VmProduct from '../components/Products'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Products.vue - To display the brand', () => {
  let store, state, mutations, actions
  const data = {
    displayImageUrl: 'https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/brands/alcatel_front_270x540.png',
    displayName: 'Alcatel',
    id: 'Alcatel',
    isFavourite: false,
    ratings: 3,
    reviews: 16
  }

  beforeEach(() => {
    store = new Vuex.Store({
      actions,
      mutations: {
        addToFavourite: jest.fn(),
        showLoginModal: jest.fn(),
        removeFromFavourite: jest.fn()
      },
      state: {
        userInfo: {
          isLoggedIn: false
        }
      }
    })
  })

  const factory = () => {
    return shallowMount(VmProduct, {
      localVue,
      propsData: { product: data },
      stubs: {
        NuxtLink: true
      },
      store
    })
  }
  test('mounts properly', () => {
    const wrapper = factory()
    expect(wrapper).toBeTruthy()
  })

  test('user should logged in and title of button element should be - Add to favourite', () => {
    const wrapper = factory()
    wrapper.vm.$store.state.userInfo.isLoggedIn = true
    wrapper.vm.saveToFavorite(wrapper.props().product.id)
    expect(wrapper.find({ ref: 'addFav' }).element.title).toEqual('Add to favourite')
  })

  test('if user not logged in then get the login modal', () => {
    const wrapper = factory()
    wrapper.vm.saveToFavorite(wrapper.props().product.id)
    expect(wrapper.vm.$store.commit('showLoginModal'))
  })

  test('user should logged in and title of button element should be - Remove from favourite', () => {
    const data = {
      displayImageUrl: 'https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/brands/alcatel_front_270x540.png',
      displayName: 'Alcatel',
      id: 'Alcatel',
      isFavourite: true,
      ratings: 3,
      reviews: 16
    }
    const factory = () => {
      return shallowMount(VmProduct, {
        localVue,
        propsData: { product: data },
        stubs: {
          NuxtLink: true
        },
        store
      })
    }
    const wrapper = factory()
    wrapper.vm.$store.state.userInfo.isLoggedIn = true
    wrapper.vm.removeFromFavourite(wrapper.props().product.id)
    expect(wrapper.find({ ref: 'removeFav' }).element.title).toEqual('Remove from favourite')
  })
})
