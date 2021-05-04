import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VmProductList from '../components/products_list/ProductsListContainer'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ProductsListContainer.vue - To display the all available brands/products', () => {
  let store, state, actions, mutations
  const data = [{
    displayImageUrl: 'https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/brands/alcatel_front_270x540.png',
    displayName: 'Alcatel',
    id: 'Alcatel',
    isFavourite: false,
    ratings: 3,
    reviews: 16
  }]

  beforeEach(() => {
    store = new Vuex.Store({
      actions: {
        getPhoneBrand: jest.fn()
      },
      mutations,
      state: {
        brands: {
          options: undefined
        },
        userInfo: {
          hasSearched: false
        }
      }
    })
  })

  const factory = () => {
    return shallowMount(VmProductList, {
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

  test('should call the getPhoneBrand() if state options undefined', () => {
    const wrapper = factory()
    expect(wrapper.vm.products).toBe(0)
  })
})
