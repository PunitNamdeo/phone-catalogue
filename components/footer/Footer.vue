<template>
  <div class="footer">
    <div class="columns">
      <div>
        <img class="pl-2 pt-4" src="~/static/Telia_logo_footer.png">
      </div>
      <div class="column has-text-right has-text-weight-semibold has-text-white">
        <p>Phone Catalogue | Made with ❤</p>
        <p>Copyright © 2021 Telia Company, inc. All rights reserved..</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VmFooter'
}
</script>

<style lang="scss" scoped>
 .footer {
   background: #290040;
   color: black;
   padding: 3rem 1.5rem 2rem;

   img {
     max-width: 50%;
   }
 }
</style>
