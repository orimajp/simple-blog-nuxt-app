<template>
  <div>
    <the-navbar :description='discription' />
    <b-container>
      <div class='edito-form-block'>
        <edit-form
          :new-article='true'
          :title.sync='title'
          :body.sync='body'
          @cancelEdit='cancelEdit'
          @registerArticle='registerArticle'
        />
      </div>
    </b-container>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, useContext, useRouter } from '@nuxtjs/composition-api'
import TheNavbar from '~/components/TheNavbar.vue'
import EditForm from '~/components/EditForm.vue'

const PAGE_TITLE = '新規作成'

export default defineComponent({
  components: { TheNavbar, EditForm },
  setup() {
    const router = useRouter()
    const { $axios } = useContext()

    const form = reactive({
      title: '',
      body: ''
    })
    const discription = PAGE_TITLE

    const cancelEdit = () => {
      router.push('/')
    }

    const registerArticle = async () => {
      await $axios.post('/api/articles/', form)
      router.push('/')
    }

    return {
      ...toRefs(form),
      discription,
      cancelEdit,
      registerArticle,
    }
  },
  head: {
    title: PAGE_TITLE
  }
})
</script>

<style scoped>
.edito-form-block {
  margin-top: 20px;
}
</style>
