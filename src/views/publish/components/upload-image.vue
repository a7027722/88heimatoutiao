<template>
  <div>
    <div class="item-photo" @click="onCoverChoice">
      <!--  父组件传过来的value 就是图片地址  -->
      <img height="230" width="200" v-if="value" :src="value">
      <i v-else class="el-icon-plus item-plus"></i>
    </div>
    <el-dialog
      title="请选择图片"
      :visible.sync="coverChoice"
      width="50%"
      center>
      <el-tabs v-model="activeName">
        <!-- 组件支持 选谁 activeName就会得到谁的name(first或second)  -->
        <el-tab-pane label="素材库" name="first">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-radio-group v-model="activeCollect" @change="loadImages">
                <el-radio-button label="all">全部</el-radio-button>
                <el-radio-button label="collect">收藏</el-radio-button>
              </el-radio-group>
            </div>
            <el-row :gutter="20">
              <el-col
                :span="6"
                v-for="(item, index) in image"
                :key="item.id"
                :class="{ 'image-item': activeIndex===index}"
                @click.native="activeIndex=index"
              >
              <!-- 在循环内点击谁 把谁的代表身份的唯一信息保存下来 这里保存索引
                   当点击事件触发时 让索引与此属性相等 同时这个相等的条件也是触发被选中
                   高亮样式的选中条件 保存后的索引也是传参的必要条件-->
                <img height="100" :src="item.url" class="image">
              </el-col>
            </el-row>
          </el-card>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="imagesCount"
            @current-change="onChagePage"
          >
          </el-pagination>
        </el-tab-pane>
        <!-- 组件支持 选谁 activeName就会得到谁的name(first或second)  -->
        <el-tab-pane label="上传图片" name="second">
          <!-- 上传图片时 组件必须点击图片上的➕号 才算选中 才会在预览中显示 不然等于没选上 -->
          <div>
            <!-- 此组件需要写完整路径 请求头 name 默认POST请求且不能改方式 -->
            <el-upload
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              :headers='uploadHeader'
              name='image'
              list-type="picture-card"
              :on-preview="onUploadPic">
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="coverChoice=false">取 消</el-button>
        <el-button type="primary" @click="onUploadImages">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const token = window.localStorage.getItem('user-token')
export default {
  name: 'uploadImage',
  // 父组件v-model 子组件用 value属性接收
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      coverChoice: false,
      activeName: 'first',
      activeCollect: 'all',
      image: [],
      activeIndex: null,
      page: 1,
      imagesCount: 1,
      // 组件upload 需要设置请求头
      uploadHeader: {
        Authorization: `Bearer ${token}`
      },
      previewImage: ''
    }
  },
  methods: {
    loadImages () {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: this.activeCollect === 'collect',
          page: this.page,
          per_page: 8
        }
      }).then(res => {
        // console.log(res.data.data)
        this.image = res.data.data.results
        this.imagesCount = res.data.data.total_count
      })
    },
    onCoverChoice () {
      this.loadImages()
      this.coverChoice = true
    },
    onUploadImages () {
      if (this.activeName === 'first') {
        // activeIndex在点击选中图片的时候 保存了被选中的图片索引 通过此索引 可以获取被点击图片
        const image = this.image[this.activeIndex]
        if (image) {
          // v-model 默认注册自定义input事件 将选中的图片地址传给父组件
          this.$emit('input', image.url)
        }
      } else if (this.activeName === 'second') {
        const previewImage = this.previewImage
        if (previewImage) {
          this.$emit('input', previewImage)
        }
      }
      this.coverChoice = false
    },
    onChagePage (page) {
      this.page = page
      this.loadImages()
    },
    onUploadPic (file) {
      this.previewImage = file.response.data.url
      console.log(file)
    }
  }
}
</script>

<style lang="less" scoped>
  .item-photo {
    border: 1px dashed #ccc;
    border-radius: 6px;
    width: 200px;
    height: 230px;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 28px;
    }
  }
  .image-item {
    box-sizing: border-box;
    border: 1px solid #0f0;
  }
</style>
