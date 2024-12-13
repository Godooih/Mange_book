<template>
  <div id="app">

    <router-view />
  </div>
</template>

<script>
  import Header from '../src/components/Home/Header.vue';
  import Sidebar from '../src/components/Home/Sidebar.vue';
  import BookList from '../src/components/Home/BookList.vue';

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    BookList
  },
};
</script>
