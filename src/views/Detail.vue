<template>
    <div>
        {{id}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            id : this.$route.param.id
        }
    },

    mounted() {
        
    },
}
</script>
<style lang="stylus" scoped>

</style>
