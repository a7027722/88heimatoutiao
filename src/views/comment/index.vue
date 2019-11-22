<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
      <span>评论列表</span>
    </div>
    <el-table
      v-loading="loading"
      :data="comments"
      style="width: 100%">
      <!-- 组件添加v-loading="布尔值" 实现加载效果 -->
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数据">
      </el-table-column>
      <el-table-column
        label="评论状态">
        <template slot-scope="scope">
          <el-switch
          v-model="scope.row.comment_status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="onChangeStatus(scope.row)"
          >
        </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        >
        <template slot-scope="scope">
        <!--  点击后跳转路由 并携带id 之前在路由设置参数commentId -->
        <el-button
          @click="$router.push('/comment/'+scope.row.id)"
          type="primary"
        >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <el-pagination
        @current-change="onChangePage"
        background
        layout="prev, pager, next"
        :total="commentsCount"
        :disabled='loading'>
        <!-- :disabled='布尔值' 实现加载时分页器禁用的效果 -->
      </el-pagination>
    </template>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [],
      page: 1,
      commentsCount: 0,
      loading: true
    }
  },
  methods: {
    loadComment (page = 1) {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment',
          page,
          per_page: 10
        }
      }).then(res => {
        this.commentsCount = res.data.data.total_count
        this.comments = res.data.data.results
      }).catch(() => {
        this.$message.error('加载失败!')
      }).finally(() => {
        this.loading = false
      })
    },
    onChangeStatus (article) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: article.id.toString()
          // 这里的ID在axios的响应时转变为JSONbig 要转成字符串或拼接成字符串
        },
        data: {
          allow_comment: article.comment_status
        }
      }).then((res) => {
        this.$message({
          type: 'success',
          message: `${article.comment_status ? '启用' : '关闭'}成功`
        })
      }).catch(() => {
        this.$message.error('操作失败!')
      })
    },
    onChangePage (page) {
      this.page = page
      this.loadComment(page)
    }
  },
  created () {
    this.loadComment(1)
  }
}
</script>

<style>

</style>
