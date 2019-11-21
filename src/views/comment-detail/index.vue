<template>
  <!--
          测试文章id：1196354762019176448
  -->
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-table
      :data="commentForm"
      style="width: 100%">
      <el-table-column
        label="头像"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="评论内容"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="点赞">
      </el-table-column>
      <el-table-column
        prop="like_count"
        label="点赞数量">
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="评论日期">
        <template slot-scope="scope">
          <!-- 全局注册设置了默认参数 可传参以传的格式为准
             {{ scope.row.pubdate | dateFormat('YYYY-MM-DD') }} -->

          <!-- 不传参的时候 以默认参数格式为准 -->
          {{ scope.row.pubdate | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column
        label="是否推荐">
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
// import moment from 'moment'
export default {
  data () {
    return {
      commentForm: []
    }
  },
  components: {
  },
  props: {
    commentId: {
      type: String,
      required: true
    }
  },
  // filters: {
  //   dateFormat (value) {
  //     return moment(value).format('YYYY-MM-DD HH:mm:ss')
  //   }
  // },
  methods: {
    loadComment () {
      this.$axios({
        method: 'GET',
        url: '/comments',
        params: {
          type: 'a',
          source: this.commentId
        }
      }).then(res => {
        const commentForm = res.data.data.results

        // commentForm.forEach(item => {
        //   item.pubdate = moment(item.pubdate).format('YYYY-MM-DD HH:mm:ss')
        // })

        this.commentForm = commentForm
      })
    }
  },
  created () {
    this.loadComment()
  }
}
</script>

<style>

</style>
