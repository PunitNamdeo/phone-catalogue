<template>
  <div class="flex-wrapper">
    <client-only>
      <VmHeader />
      <main>
        <nuxt />
        <VmLoginModal />
        <VmRegistrationModal />
        <VmCheckoutModal />
      </main>
      <VmFooter />
    </client-only>
  </div>
</template>

<script>
import VmHeader from '@/components/header/Header'
import VmFooter from '@/components/footer/Footer'
import VmLoginModal from '@/components/modal/Login'
import VmRegistrationModal from '@/components/modal/Registration'
import VmCheckoutModal from '@/components/modal/Checkout'

export default {
  components: {
    VmHeader,
    VmFooter,
    VmLoginModal,
    VmRegistrationModal,
    VmCheckoutModal
  }
}
</script>

<style>
  .flex-wrapper {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
