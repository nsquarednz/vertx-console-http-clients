<style lang="scss" scoped>
.http-client {
    margin: 15px;
}
</style>

<template>
    <div class="http-client card-pf">
        <h2>{{ name }}</h2>
        {{ httpClientsMetrics }}
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        httpClientsMetrics: Object
    }
}
</script>