<template>
    <div v-if="show" class="mask" @click="close"></div>
</template>
<script>
export default {
    props: ['show'],
    data() {
        return {}
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>
<style lang="scss" scoped>
.mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 98;
}
</style>

