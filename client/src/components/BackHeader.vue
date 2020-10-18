<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img
          src="../assets/book.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
          loading="lazy"
        />
       <span class="font1">Fiction </span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
         
          <li class="nav-item active">
            <router-link :to="{ name: 'blogs' }">&nbsp;&nbsp;Blogs</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'users' }">&nbsp;&nbsp;Users</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'comments' }">&nbsp;&nbsp;Comments</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'login' }">&nbsp;&nbsp;Login</router-link>
          </li>
          <li class="nav-item" >

               <a href="#" v-on:click.prevent="logout">&nbsp;&nbsp;Logout</a>
          </li>
         
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>
<style scoped>
.bg-light {
  background-color: #ced7d4 !important;
}
</style>