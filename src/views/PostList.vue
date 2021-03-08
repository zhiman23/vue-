<template>
  <div>
    <el-pagination
      @current-change="currentChange"
      @size-change="sizeChange"
      :page-size="pageSize"
      layout="total,sizes,prev,pager,next,jumper"
      :page-sizes="[2, 5, 10]"
      :total="total"
    ></el-pagination>
    <el-table :data="postList">
      <el-table-column prop="id" label="ID" width="100"> </el-table-column>
      <el-table-column prop="title" label="标题" width="100"> </el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="100">
      </el-table-column>
      <el-table-column label="缩略图" width="200">
        <template slot-scope="scope">
          <img
            v-if="scope.row.cover.length > 0"
            class="thumbanail"
            :src="scope.row.cover[0].url | fixImgUrl"
            alt=""
          />
          <img v-else class="thumbanail" src="@/assets/logo.png" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/editpost?id=' + scope.row.id)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 2,
      postList: [],
      total: 0,
    };
  },
  created() {
    this.loadPost();
  },
  methods: {
    currentChange(newPageIndex) {
      this.pageIndex = newPageIndex;
      this.loadPost();
    },
    sizeChange(newsizeChange) {
      this.sizeChange = newsizeChange;
      this.loadPost();
    },
    loadPost() {
      this.$axios({
        url: "post",
        params: {
          pageIndex: this.pageIndex,
        },
      }).then((res) => {
        this.postList = res.data.data;
        this.total = res.data.total;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.thumbanail {
  width: 100%;
  height: 120px;
  object-fit: cover;
}
</style>