<template>
  <div>
    <div class='form-block'>
      <div class='form-block-item'>
        <b-form-input v-model='editTitle' placeholder='タイトルを入力してください'></b-form-input>
      </div>
      <div class='form-block-item'>
        <b-tabs>
          <b-tab title='本文'>
            <b-form-textarea v-model='editBody' class='edit-block' placeholder='本文を入力してください' rows='20'></b-form-textarea>
          </b-tab>
          <b-tab title='プレビュー'>
            <div class='preview-block markdown-body' v-html='$md.render(editBody)'></div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
    <div class='button-block'>
      <b-row>
        <b-col>
          <b-button v-if='!newArticle' variant='danger' @click='executeDelete'>削除</b-button>
        </b-col>
        <b-col>
          <div style='text-align: right'>
            <b-button variant='secondary' @click='executeCancel'>キャンセル</b-button>
            <b-button v-if='newArticle' variant='primary' @click='executeRegister'>登録</b-button>
            <b-button v-else variant='primary' @click='executeUpdate'>更新</b-button>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    newArticle: {
      type: Boolean,
      required: false,
      default: false,
    },
    title : {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    }
  },
  setup(prop, { emit }) {
    // https://waino.hateblo.jp/entry/2018/10/22/115853
    const editTitle = computed({
      get: () => prop.title,
      set: (value: string) => emit('update:title', value)
    })

    const editBody = computed({
      get: () => prop.body,
      set: (value: string) => emit ('update:body', value)
    })

    const executeRegister = () => {
      emit('registerArticle')
    }

    const executeUpdate = () => {
      emit('updateArticle')
    }

    const executeDelete = () => {
      emit('deleteArticle')
    }

    const executeCancel = () => {
      emit('cancelEdit')
    }

    return {
      editTitle,
      editBody,
      executeRegister,
      executeUpdate,
      executeDelete,
      executeCancel,
    }
  }
})
</script>

<style scoped>
.form-block {
  /*margin-bottom: 10px;*/
}
.form-block-item {
  margin-bottom: 10px;
}
.edit-block {
  margin-top: 10px;
}
.preview-block {
  margin-top: 10px;
  min-height: 500px;
}
.button-block {
  margin-bottom: 50px;
}
</style>
