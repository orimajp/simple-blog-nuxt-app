<template>
  <div>
    <the-navbar :description='pageTitle' />
    <b-container>
      <b-alert
        class='alert-block'
        :show='showMessage'
        variant="warning">
        {{ message }} <nuxt-link to='/' class='alert-link'>トップへ戻る</nuxt-link>
      </b-alert>
      <div v-if='!showMessage && !loading'>
        <div class='content-block'>
          <div class='content-title'>{{ pageTitle }}</div>
          <div class='content-body markdown-body' v-html='$md.render(pageBody)' />
        </div>
        <div class='button-block'>
          <b-button variant='primary' :to='editorLink'>編集</b-button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, ref, useAsync, useContext, useMeta } from '@nuxtjs/composition-api'
import TheNavbar from '~/components/TheNavbar.vue'
import { ArticleResponse } from '~/model/ArticleResponse'

export default defineComponent({
  components: { TheNavbar },
  setup() {
    const { title } = useMeta()
    const { params, $axios } = useContext()

    const pageTitle = ref('')
    const pageBody = ref('')
    const message = ref<string | null>(null)
    const loading = ref(true)
    const showMessage = computed(() => message.value !== null)
    const editorLink = computed(() => `/editor/${params.value.articleId}`)

    useAsync(async () => {
      if (params.value.articleId) {
        await $axios.get<ArticleResponse>(`/api/articles/${params.value.articleId}`)
          .then(res => {
            pageTitle.value = res.data.title
            pageBody.value = res.data.body
            title.value = res.data.title
          }).catch(err => {
            console.log(err)
            message.value = '記事データ取得エラー'
          })
      } else {
        message.value = '記事IDが指定されていません'
      }
      loading.value = false
    })

    return {
      pageTitle,
      pageBody,
      message,
      showMessage,
      loading,
      editorLink,
    }
  },
  head: {} // for useMeta()
})
</script>

<style scoped>
.alert-block, .content-block {
  margin-top: 50px;
  margin-bottom: 50px;
}
.content-title {
  font-size: 200%;
  margin-bottom: 20px;
}
.content-body {
  margin-bottom: 20px;
}
.button-block {
  text-align: right;
  margin-bottom: 50px;
}
</style>
