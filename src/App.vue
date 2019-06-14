<template lang="pug">
  .wrapper
    header
      .navbar
        .container
          .navbar-content
            router-link.header-logo(
              to="/"
            ) Marveli-ZA
            .button-burger(
              @click="menuShow = !menuShow"
              :class="{ active: menuShow}"
            )
              span.line.line-1
              span.line.line-2
              span.line.line-3
            .navbar-list__wrapper(
              :class="{ active: menuShow}"
            )
              ul.navbar-list
                li.navbar-item(
                  v-for="link in linkMenu"
                  :key="link.tittle"
                  @click="menuShow = false"
                )
                  router-link.navbar-link(
                    :to="`${link.url}`"
                  ) {{link.tittle}}
    router-view
</template>

<script>
export default {
  data () {
    return {
      menuShow: false,
      linkMenu: [
        {tittle: 'Home', url: '/'},
        {tittle: 'Tasks', url: '/task'},
        {tittle: 'Login', url: '/login'},
        {tittle: 'Registration', url: '/registration'}
      ]
    }
  }
}
</script>

<style lang="stylus">
@import './assets/stylus/main.styl'
</style>
