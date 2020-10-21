<template>
  <div>
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
          <span class="font1">Fiction</span>
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
            <li class="nav-item" v-if="isUserLoggedIn" role="presentation">
           
              <router-link :to="{ name: 'blogs' }"><span style="color: #000000">Blogs</span></router-link>
            </li>
            <li class="nav-item active" role="presentation">
           
              <router-link :to="{ name: 'users' }"><span style="color: #000000">&nbsp;&nbsp;&nbsp; Users</span></router-link>
            </li>
            <li class="nav-item" v-if="!isUserLoggedIn" role="presentation">
              <li class="nav-item active" role="presentation">
           
              <router-link :to="{ name: 'comments' }"><span style="color: #000000">&nbsp;&nbsp;&nbsp; Comments</span></router-link>
            </li>
             <li class="nav-item active" v-if="!isUserLoggedIn" role="presentation">
              <a href="#" v-on:click="navigateTo('/Login')">&nbsp;&nbsp;&nbsp;<span style="color: #000000">&nbsp;&nbsp;&nbsp; Login</span></a>
            </li>
        
            <li class="nav-item" v-if="isUserLoggedIn" role="presentation">
             
              <a href="#" v-on:click.prevent="logout">&nbsp;&nbsp;&nbsp;<span style="color: #000000">&nbsp;&nbsp;&nbsp;Logout</span></a>
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
  </div>
</template>
<script>
import { mapState } from "vuex";
import AuthenService from "@/services/AuthenService";
import UsersService from "@/services/UsersService";

export default {
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "users",
      });
    },
    navigateTo (route) {           this.$router.push(route)
        },
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
};
</script>
<style scoped>
.bg-light {
  background-color: #ced7d4 !important;
}
</style>