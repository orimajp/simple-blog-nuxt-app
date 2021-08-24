<template>
  <div>
    <the-navbar :description='pageTitle' />
    <b-container>
      <div class='edito-form-block'>
        <b-alert
          class='alert-block'
          :show='showMessage'
          variant="warning">
          {{ message }} <nuxt-link to='/' class='alert-link'>トップへ戻る</nuxt-link>
        </b-alert>
        <edit-form
          v-if='!showMessage'
          :title.sync='title'
          :body.sync='body'
          @cancelEdit='cancelEdit'
          @updateArticle='updateArticle'
          @deleteArticle='deleteArticle'
        />
      </div>
    </b-container>
  </div>
</template>

<script lang='ts'>
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs,
  useAsync,
  useContext,
  useMeta,
  useRouter,
  watch
} from '@nuxtjs/composition-api'
import TheNavbar from '~/components/TheNavbar.vue'
import EditForm from '~/components/EditForm.vue'
import { ArticleResponse } from '~/model/ArticleResponse'

export default defineComponent({
  components: { TheNavbar, EditForm },
  setup() {
    const router = useRouter()
    const { title } = useMeta()
    const { params, $axios } = useContext()

    const form = reactive({
      title: '',
      body: ''
    })
    const message = ref<string | null>(null)
    const showMessage = computed(() => message.value !== null)
    const pageTitle = computed(() => `[編集] ${form.title}`)

    useAsync(async () => {
      if (params.value.articleId) {
        await $axios.get<ArticleResponse>(`/api/articles/${params.value.articleId}`)
          .then((res) => {
            form.title = res.data.title
            form.body = res.data.body
          }).catch(err => {
            console.log(err)
            message.value = '記事データ取得エラー'
          })
      } else {
        message.value = '記事IDが指定されていません'
      }
    })

    watch(
      () => pageTitle,
      (newVal) => {
        title.value = newVal.value
      }
    )

    const cancelEdit = () => {
      router.push(`/articles/${params.value.articleId}`)
    }

    const updateArticle = async () => {
      await $axios.put(`/api/articles/${params.value.articleId}`, form)
      router.push('/')
    }

    const deleteArticle = async () => {
      await $axios.delete(`/api/articles/${params.value.articleId}`)
      router.push('/')
    }

    return {
      pageTitle,
      ...toRefs(form),
      message,
      showMessage,
      cancelEdit,
      updateArticle,
      deleteArticle,
    }
  },
  head: {}
})
</script>

<style scoped>
.edito-form-block {
  margin-top: 20px;
}
</style>
