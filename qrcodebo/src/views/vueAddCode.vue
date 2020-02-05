<template>
  <div class="home">
    <vueAddCode msg=""/>
  </div>
</template>

<script>
// @ is an alias to /src
import vueAddCode from '../components/vueAddCode.vue'

export default {
  name: 'home',
  components: {
    vueAddCode
  }
}
</script>
