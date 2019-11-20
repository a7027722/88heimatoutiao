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
      <img height="180" :src="item.url" class="image">
      <div style="padding: 14px;" class="item-icon">
          <i
            @click="onCollect(item)"
           :class="{
            'el-icon-star-off':!item.is_collected,
            'el-icon-star-on':item.is_collected,
          }"></i>
          <i
            @click="onDelete(item)"
            :class="{'el-icon-delete-solid': true}"
          ></i>
      </div>
    </el-card>
  </el-col>
</el-row>
</el-card>
  </div>
</template>

<script>
const token = window.localStorage.getItem('user-token')
export default {
  data () {
    return {
      images: [],
      is_all: '全部',
      updateHeaders: {
        Authorization: `Bearer ${token}`
      }
    }
  },
  methods: {
    loadImages (is_collecte = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: is_collecte
        }
      }).then(res => {
        // console.log(res.data.data)
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
      }).then(res => {
        this.loadImages(this.is_all !== '全部')
        item.is_collected = !item.is_collected
      })
    },
    onCheckAll () {
      this.loadImages(this.is_all !== '全部')
    },
    onDelete (item) {
      this.$axios({
        method: 'DELETE',
        url: `/user/images/${item.id}`
      }).then(res => {
        this.loadImages(this.is_all !== '全部')
      })
    }
  },
  created () {
    this.loadImages()
  }
}
</script>

<style lang="less" scoped>
  .item-icon {
    display: flex;
    justify-content: center;
    i {
      font-size: 24px;
      margin-right: 14%;
      margin-left: 14%
    }
  }
</style>
