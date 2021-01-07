<template>
  <div id="app">
    <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="list-group list-group-flush">
          <router-link class="list-group-item list-group-item-action bg-light" to="/" exact>
            <b-icon icon="house"></b-icon>
          </router-link>
          <router-link class="list-group-item list-group-item-action bg-light" to="/list-client">
            <b-icon icon="people"></b-icon>
          </router-link>
        </div>
      </div>
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div class="container" id="page-content-wrapper">
        <div class="row">
          <div class="col-12">
            <router-view />
          </div>
        </div>
      </div>
      <!-- /#Page Content -->
    </div>
  </div>
</template>

<style lang="scss">
  @import './assets/css/custom.css';

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>