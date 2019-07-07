<template>
  <div class="home">
   <router-link to="/detail/:id">detail</router-link>
   <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  }
}
</script>
