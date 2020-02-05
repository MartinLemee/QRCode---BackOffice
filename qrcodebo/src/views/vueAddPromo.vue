<template>
  <div class="home">
    <vueAddPromo msg=""/>
  </div>
</template>

<script>
// @ is an alias to /src
import vueAddPromo from '../components/vueAddPromo.vue'

export default {
  name: 'home',
  components: {
    vueAddPromo
  }
}
</script>