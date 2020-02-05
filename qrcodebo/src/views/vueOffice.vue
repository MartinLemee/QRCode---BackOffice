<template>
  <div class="home">
      <vueOffice msg="Office"/>
  </div>
</template>

<script>
// @ is an alias to /src
import vueOffice from '../components/vueOffice.vue'

export default {
  name: 'home',
  components: {
    vueOffice
  }
}
</script>
