<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$route.params.articleId ? '编辑' : '发布' }}文章</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor v-model="articleForm.content"
          ref="myQuillEditor"
          style="height:300px"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item label="频道" style="margin-top:120px">
          <!-- <el-select placeholder="请选择频道" v-model="articleForm.channel_id">
            <el-option
              v-for="item in channels"
              :value="item.id"
              :label="item.name"
              :key="item.id"
            >{{ item.name }}</el-option>
          </el-select> -->
          <!-- 封装成组件 引入 v-model 相当于 :value 和 @input两个自定义事件的合体
              通过父子组件的通信 props down    event up 实现父子组件的数据联动
              在父组件里自定义一个属性include-all 设置布尔值为false 并在子组件内接受此属性 定义
              默认为true >>> channel-select -->
          <channel-select
          v-model="articleForm.channel_id"
          :include-all="false"
          ></channel-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发布文章</el-button>
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
import channelSelect from '@/components/channel-select'
export default {
  components: {
    quillEditor,
    channelSelect
  },
  data () {
    return {
      articleForm: {
        channel_id: '',
        content: '', // 文章内容
        title: '', // 文章标题
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] //  图片，无图就是空数组即可
        }
      }
      // channels: []
    }
  },
  methods: {
    // loadChannels () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   }).then(res => {
    //     this.channels = res.data.data.channels
    //   }).catch(() => {
    //   })
    // },

    onSubmit (draft) {
      // 发布和编辑用一个组件 进行判断 而且同组件跳转默认不会重新渲染 需要入口 共有容器设置key
      if (this.$route.params.articleId) {
        this.updateArticle(draft)
      } else {
        this.addArticle(draft)
      }
    },
    addArticle (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        params: {
          draft
        },
        data: this.articleForm
      }).then(() => {
      }).catch(() => {
      })
    },
    // 在编辑进入此组件时 根据路由传过来的id 进行渲染内容
    loadArticle () {
      this.$axios({
        method: 'GET',
        url: `/articles/${this.$route.params.articleId}`
      }).then((res) => {
        this.articleForm = res.data.data
      }).catch(() => {
      })
    },
    updateArticle (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.articleId}`,
        params: {
          draft
        },
        data: this.articleForm
      }).then((res) => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      }).catch(() => {
        this.$message.error('更新失败')
      })
    }
  },
  created () {
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  }
}
</script>

<style scoped>
</style>
