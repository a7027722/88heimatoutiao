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
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select placeholder="请选择活动区域" v-model="filterForm.channel_id">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-time-picker
          v-model="rangeDate"
          style="width:480px"
          is-range
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form>
    </el-card>
    <!-- 筛选部分结束 -->
    <!-- 文章列表-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到59806条符合条件的内容</span>
      </div>
      <el-table
      :data="articles"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="封面"
        width="180">
        <template slot-scope="scope">
          <img :src='scope.row.cover.images[0]' width="50">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-tag :type="articlesStatus[ scope.row.status].type">
            {{ articlesStatus[scope.row.status].label }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布日期">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template>
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
    <!-- 文章列表结束-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterForm: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      articles: [],
      rangeDate: '',
      articlesStatus: [
        { type: 'info', label: '草稿' },
        { type: '', label: '待审核' },
        { type: 'success', label: '审核通过' },
        { type: 'warning', label: '审核失败' },
        { type: 'danger', label: '已删除' }
      ]
    }
  },
  methods: {
    loadArticles () {
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.articles = res.data.data.results
      })
    }
  },
  created () {
    this.loadArticles()
  }
}
</script>

<style>
</style>
