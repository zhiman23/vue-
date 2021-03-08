<template>
  <div>
    <el-form ref="form" label-width="80px">
      <!-- 标题 -->
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <!-- 内容，富文本 -->
      <el-form-item label="内容" class="content">
        <VueEditor v-model="form.content" :editorToolbar="customBar" />
      </el-form-item>
      <!-- 栏目 -->
      <el-form-item label="分类">
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="item in categoryList"
            :key="item.id"
            :label="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <!-- 封面 -->
      <el-form-item label="封面">
        <el-upload
          :file-list="form.cover"
          :action="$axios.defaults.baseURL + '/upload'"
          :headers="{
            Authorization: token,
          }"
          :on-success="coverSuccess"
          :on-remove="coverRemove"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <!-- 类型 -->
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 发布按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>

    <!-- {{ checkList }} -->

    <!-- {{ content }} -->
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  created() {
    this.$axios({
      url: "/category",
    }).then((res) => {
      res.data.data.splice(0, 2);
      this.categoryList = res.data.data;
    });

    if (this.$route.query.id) {
      this.$axios({
        url: "/post/" + this.$route.query.id,
      }).then((res) => {
        res.data.data.content = res.data.data.content.replace(/div/g, "p");
        this.checkList = res.data.data.categories.map((item) => {
          return item.id;
        });
        res.data.data.cover.map((img) => {
          if (img.url.indexOf("http") == -1) {
            img.url = this.$axios.defaults.baseURL + img.url;
          }
          img.uid = img.id;

          return img;
        });
        console.log(res.data.data.content);
        this.form = res.data.data;
      });
    }
  },
  watch: {
    checkList() {
      this.form.categories = this.checkList.map((num) => {
        return {
          id: num,
        };
      });
    },
  },
  data() {
    return {
      categoryList: [],
      checkList: [],
      token: localStorage.getItem("token"),
      content: "",
      customBar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"],
      ],
      form: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1,
      },
    };
  },
  methods: {
    coverSuccess(res, file, fileList) {
      // console.log("上传成功");
      // console.log(res.data.id);
      file.id = res.data.id;
      this.form.cover.push(file);
    },
    coverRemove(file, fileList) {
      console.log("删除成功");
    },
    onSubmit() {
      console.log(this.form);
      this.$axios({
        method: "post",
        url: "/post",
        data: this.form,
      }).then((res) => {
        console.log(res.data);
        this.$router.push("/postlist");
      });
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  /deep/ .el-form-item_content {
    line-height: 1;
  }
}
</style>