<template>
  <div>
    <b-navbar variant='info' type='dark'>
      <b-navbar-brand class='top-link' to='/'>
        Simple Blog
      </b-navbar-brand>
      <div class='pege-description'>
        {{ description }}
      </div>
      <b-navbar-nav class='ml-auto'>
        <b-button v-if='topPage' variant='primary' to='/editor'>新規作成</b-button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    description: {
      type: String,
      required: false,
      default: '',
    },
    topPage: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup() {}
})
</script>

<style scoped>
.top-link {
  cursor: pointer;
}
.pege-description {
  color: white;
}
</style>
