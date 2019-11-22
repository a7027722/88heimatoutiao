<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>素材管理</span>
      </div>
      <div>
        <el-radio-group v-model="is_all" @change="onCheckAll">
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="收藏">收藏</el-radio-button>
        </el-radio-group>
        <el-upload
          class="upload-demo"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="updateHeaders"
          name="image"
          :on-success="onUpdateImages"
          :show-file-list="false"
          style="float:right"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="6" v-for="item in images" :key="item.id">
          <el-card :body-style="{ padding: '0px' }">
            <img height="180" :src="item.url" class="image" />
            <div style="padding: 14px;" class="item-icon">
              <i
                @click="onCollect(item)"
                :class="{
            'el-icon-star-off':!item.is_collected,
            'el-icon-star-on':item.is_collected,
          }"
              ></i>
              <i @click="onDelete(item)" :class="{'el-icon-delete-solid': true}"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="collectCount"
        @current-change="onChangePage"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
const token = window.localStorage.getItem('user-token')
export default {
  name: 'materials',
  data () {
    return {
      images: [],
      is_all: '全部',
      page: 1,
      updateHeaders: {
        Authorization: `Bearer ${token}`
      },
      collectCount: 1
    }
  },
  methods: {
    loadImages () {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: this.is_all === '收藏',
          page: this.page,
          per_page: 8
        }
      }).then(res => {
        this.collectCount = res.data.data.total_count
        this.images = res.data.data.results
      })
    },
    onUpdateImages () {
      this.loadImages()
    },
    onCollect (item) {
      this.$axios({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
        // 点击后 获取此项的is_collected的相反值
      }).then(res => {
        this.loadImages()
        // 将此项的is_collected的值改为相反值 数据驱动视图 改变选中状态(是否选中)
        item.is_collected = !item.is_collected
      })
    },
    onCheckAll () {
      this.loadImages()
    },
    onDelete (item) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'DELETE',
          url: `/user/images/${item.id}`
        }).then(res => {
          this.loadImages()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    onChangePage (page) {
      this.page = page
      this.loadImages()
    }
  },
  created () {
    this.loadImages()
  }
}
</script>

<style lang='less' scoped>
.item-icon {
  display: flex;
  justify-content: center;
  i {
    font-size: 24px;
    margin-right: 14%;
    margin-left: 14%;
  }
}
</style>
