<template>
  <div>
    <main-header navsel="front"></main-header>
    <div class="clearfix"></div>
    <div class="blog-header">
      <h1>เเบ่งปันเรื่องราว</h1>
      <div>
        <form class="form-inline form-search">
          <div class="create-write">
            <button
              class="btn btn-success btn-sm"
              v-on:click="navigateTo('/write/create')"
            >
              เพิ่มเรื่องราว
            </button>
          </div>
          &nbsp;&nbsp;
          <div class="form-group">
            <div class="input-group">
              <input
                type="text"
                v-model="search"
                class="form-control"
                id="exampleInputAmount"
                placeholder="Search"
              />
              <div class="input-group-addon"><i class="fas fasearch"></i></div>
            </div>
          </div>
        </form>
      </div>
      <ul class="categories">
        <li v-for="cate in category" v-bind:key="cate.index">
          <a v-on: click.prevent="setCategory(cate)" href="#">{{ cate }}</a>
        </li>
        <li class="clear">
          <a v-on:click.prevent="setCategory(' ')" href="#">Clear</a>
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>
    <div v-for="blog in blogs" v-bind:key="blog.id" class="blog-list">
      <div class="blog-pic" v-if="blog.status == 'user'">
        <div
          class="thumbnail-pic"
          v-if="blog.thumbnail != 'null' && blog.status == 'user'"
        >
          <img
            v-if="blog.status == 'user'"
            :src="BASE_URL + blog.thumbnail"
            alt="thumbnail"
          />
        </div>
      </div>
      <h3 v-if="blog.status == 'user'">{{ blog.title }}</h3>
      <div
        v-if="blog.status == 'user'"
        v-html="blog.content.slice(0, 200) + '...'"
      ></div>
      <div v-if="blog.status == 'user'" class="blog-info">
        <p v-if="blog.status == 'user'">
          <strong>Category:</strong> {{ blog.category }}
        </p>
        <p v-if="blog.status == 'user'">
          <strong>Create:</strong> {{ blog.createdAt }}
        </p>
        <p v-if="blog.status == 'user'">
          <button
            v-if="blog.status == 'user'"
            class="btn btn-sm btn-info"
            v-on:click="navigateTo('/front/read/' + blog.id)"
          >
            <i v-if="blog.status == 'user'" class="fab fa-readme"></i> View Blog
          </button>
        </p>
      </div>
      <div v-if="blog.status == 'user'" class="clearfix"></div>
    </div>
  </div>
</template>
<script>
import BlogsService from "@/services/BlogsService";
import _ from "lodash";
import ScrollMonitor from "scrollMonitor";
let LOAD_NUM = 3;
let pageWatcher;
export default {
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: "writes",
      };
      if (this.search !== "") {
        route.query = {
          search: this.search,
        };
      }
      console.log("search: " + this.search);
      this.$router.push(route);
    }, 700),
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.blogs = [];
        this.results = [];
        this.loading = true;
        this.results = (await BlogsService.index(value)).data;
        this.appendResults();
        this.results.forEach((blog) => {
          if (this.category.length > 0) {
            // console.log(this.category.indexOf(blog.category))
            if (this.category.indexOf(blog.category) === -1) {
              this.category.push(blog.category);
            }
          } else {
            this.category.push(blog.category);
          }
        });
        this.loading = false;
        this.search = value;
        // console.log(this.category)
      },
    },
  },
  data() {
    return {
      blogs: [],
      BASE_URL: "http://localhost:8081/assets/uploads/",
      search: "",
      results: [],
      category: [],
      loading: false,
    };
  },
  // async created () {
  // this.blogs = (await BlogsService.index()).data
  // },
  methods: {
    appendResults: function () {
      if (this.blogs.length < this.results.length) {
        let toAppend = this.results.slice(
          this.blogs.length,
          LOAD_NUM + this.blogs.length
        );
        this.blogs = this.blogs.concat(toAppend);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(blog) {
      try {
        await BlogsService.delete(blog);
        this.refreshData();
      } catch (err) {
        console.log(err);
      }
    },
    async refreshData() {
      this.blogs = (await BlogsService.index()).data;
    },
    setCategory(keyword) {
      if (keyword === " ") {
        this.search = "";
        console.log("null");
      } else {
        this.search = keyword;
      }
    },
  },
  updated() {
    let sens = document.querySelector("#blog-list-bottom");
    pageWatcher = ScrollMonitor.create(sens);
    pageWatcher.enterViewport(this.appendResults);
  },
  beforeUpdated() {
    if (pageWatcher) {
      pageWatcher.destroy();
      pageWatcher = null;
    }
  },
};
</script>
<style scoped>
.component-wrapper {
  padding-left: 5px;
  padding-right: 5px;
}
.logo {
  padding-right: 20px;
}
.empty-blog {
  width: 100%;
  text-align: center;
  padding: 10px;
  background: darksalmon;
  color: white;
}
/* thumbnail */
.thumbnail-pic img {
  width: 200px;
  padding: 5px 5px 5px 5px;
  border: solid 1px #ccc;
  margin: 10px 10px 0px 0px;
}
.blog-info {
  float: left;
}
.blog-pic {
  float: left;
}
.clearfix {
  clear: both;
}
.blog-list {
  border: solid 1px #dfdfdf;
  margin-bottom: 10px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.blog-header {
  margin-top: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
#blog-list-bottom {
  padding-top: 4px;
}
.blog-load-finished {
  padding: 4px;
  text-align: center;
  background: seagreen;
  color: white;
}
.categories {
  margin-top: 20px;
  padding: 0;
  list-style: none;
  float: left;
}
.categories li {
  float: left;
  padding: 2px;
}
.categories li a {
  padding: 5px 10px 5px 10px;
  background: rgba(90, 40, 20, 0.384);
  color: black;
  text-decoration: none;
}
.categories li.clear a {
  background: tomato;
  color: white;
}
.create-blog {
  margin-top: 10px;
}
@media (max-width: 768px) {
  .logo {
    width: 120px;
  }
}
</style>
