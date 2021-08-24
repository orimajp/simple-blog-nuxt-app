<template>
  <div>
    <the-navbar :description='discription' :top-page='true' />
    <b-container>
      <div class='article-list'>
        <div v-if='loading'>
          Loading...
        </div>
        <div v-else>
          <b-alert
            :show='!existsList'
            variant='info'
          >
            まだ記事が書かれていません。
          </b-alert>
          <b-list-group v-if='articleList'>
            <b-list-group-item
              v-for='(article, i) in articleList'
              :key='i'
              :to='articleLink(article.id)'
              class='article-list-item'
            >
              {{ article.title }}
            </b-list-group-item>
          </b-list-group>
        </div>
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
  useContext
} from '@nuxtjs/composition-api'
import TheNavbar from '~/components/TheNavbar.vue'
import { ArticleListResponse } from '~/model/ArticleResponse'

interface ArticleListItem {
  id: number
  title: string
}

const PAGE_TITLE = '一覧'

export default defineComponent({
  components: { TheNavbar },
  setup() {
    const { $axios } = useContext()

    const list = reactive({
      articleList: [] as Array<ArticleListItem>
    })
    const existsList = computed(() => list.articleList.length !== 0)
    const loading = ref(true)
    const discription = PAGE_TITLE

    useAsync(async () => {
      list.articleList = await $axios.get<ArticleListResponse>('/api/articles')
        .then(res => {
          return res.data.articles.map(article => {
            return {
              id: article.id,
              title: article.title
            }
          })
        })
      loading.value = false
    })

    const articleLink = (id: string) => {
      return `/articles/${id}`
    }

    return {
      ...toRefs(list),
      existsList,
      loading,
      discription,
      articleLink,
    }
  },
  head: {
    title: PAGE_TITLE
  }
})
</script>

<style scoped>
.article-list {
  margin-top: 50px;
  margin-bottom: 50px;
}
.article-list-item {
  cursor: pointer;
}
</style>
