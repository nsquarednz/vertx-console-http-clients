<template>
    <div class="http-client">
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