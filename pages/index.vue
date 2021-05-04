<template>
  <div>
    <VmHero />
    <VmProductsList />
  </div>
</template>

<script>
import VmProductsList from '~/components/products_list/ProductsListContainer'
import VmHero from '~/components/hero/Hero'

export default {
  name: 'Index',
  components: {
    VmProductsList,
    VmHero
  }
}
</script>
