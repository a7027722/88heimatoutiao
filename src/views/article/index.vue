<template>
  <div>
    <!-- 筛选部分 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>筛选</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="文章类型">
          <el-radio-group v-model="filterForm.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章类别">
          <el-select placeholder="请选择频道" v-model="filterForm.channel_id">
            <el-option label="所有频道" :value="null"></el-option>
            <el-option v-for="item in channels" :value="item.id" :label="item.name" :key=item.id>{{ item.name }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
        <el-date-picker
          v-model="rangeDate"
          style="width:480px"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选部分结束 -->
    <!-- 文章列表-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{ totalCount }}条符合条件的内容</span>
      </div>
      <el-table :data="articles" style="width: 100%" v-loading="loading">
        <el-table-column prop="date" label="封面" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" width="50" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="articlesStatus[ scope.row.status].type"
            >{{ articlesStatus[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini" @click="onDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      background layout="prev, pager, next"
      :total="totalCount"
      @current-change='onPageChange'
      :disabled='loading'
      ></el-pagination>
    </el-card>
    <!-- 文章列表结束-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterForm: {
        status: null,
        channel_id: null,
        begin_pubdate: '',
        end_pubdate: ''
      },
      articles: [],
      rangeDate: [],
      articlesStatus: [
        { type: 'info', label: '草稿' },
        { type: '', label: '待审核' },
        { type: 'success', label: '审核通过' },
        { type: 'warning', label: '审核失败' },
        { type: 'danger', label: '已删除' }
      ],
      totalCount: 0,
      loading: true,
      channels: [],
      page: 0
    }
  },
  methods: {
    loadArticles (page = 1) {
      // const token = window.localStorage.getItem('user-token')
      this.loading = true
      this.$axios({
        method: 'GET',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
        params: {
          page,
          per_page: 10,
          status: this.filterForm.status,
          channel_id: this.filterForm.channel_id,
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null
        }
      }).then(res => {
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
      }).catch(() => {

      }).finally(() => {
        this.loading = false
      })
    },
    // 组件的方法 可以获取当前的页数
    onPageChange (page) {
      // console.log(page)
      this.page = page
      this.loadArticles(page)
    },
    loadchannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(() => {
      })
    },
    onDelete (id) {
      this.$axios({
        method: 'DELETE',
        url: `/articles/${id}`
      }).then(res => {
        this.loadArticles(this.page)
      }).catch(() => {
      })
    }
  },
  created () {
    this.loadArticles(1)
    this.loadchannels()
  }
}
</script>

<style>
</style>
