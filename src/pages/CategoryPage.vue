<template>
    
  </template>
  
  <script>
  export default {
    computed: {
      mainCategory() {
        return this.$route.params.mainCategory;
      },
      subCategory() {
        return this.$route.params.subCategory;
      },
    },
  };
  </script>