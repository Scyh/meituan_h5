<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p v-cloak>{{ location }}</p>
    <router-link to="/">home</router-link>
  </div>
</template>
<script>
export default {
    data() {
        return {
            location: null
        }
    },
    created() {
        this.getLocation()
    },
    methods: {
        async getLocation() {
            let res1 = await this.$apis.location.getIp();
            /(\d+.\d+.\d+.\d+)/.test(res1);
            let res2 = await this.$apis.location.getLocation(RegExp.$1);
            this.location = res2.content.address_detail.city
        }
    }
}
</script>
<style scoped>

</style>
