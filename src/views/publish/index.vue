<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发布文章</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="pubArticles.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor v-model="pubArticles.content"
          ref="myQuillEditor"
          :options="editorOption">
          </quill-editor>
        </el-form-item>
        <el-form-item label="频道">
          <el-select placeholder="请选择频道" v-model="pubArticles.channel_id">
            <el-option
              v-for="item in channels"
              :value="item.id"
              :label="item.name"
              :key="item.id"
            >{{ item.name }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发布</el-button>
          <el-button  @click="onSubmit(true)">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入富文本样式文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      pubArticles: {
        channel_id: '',
        content: '', // 文章内容
        title: '', // 文章标题
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] //  图片，无图就是空数组即可
        }
      },
      channels: []
    }
  },
  methods: {
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(() => {
      })
    },
    onSubmit (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        params: {
          draft
        },
        data: this.pubArticles
      }).then(() => {
      }).catch(() => {
      })
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style scoped>
</style>
