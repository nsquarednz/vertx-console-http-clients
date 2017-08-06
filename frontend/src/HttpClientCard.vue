<style lang="scss" scoped>
.http-client {
    margin: 15px;
}
</style>

<template>
    <div class="http-client card-pf">
        <div class="requests-section">
            <h2>{{ name }}</h2>
            <pre>{{ JSON.stringify(requests, null, 4) }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        httpClientsMetrics: Object
    },
    methods: {
        getMetric(metricName) {
            return this.httpClientsMetrics[this.name + '.' + metricName];
        }
    },
    computed: {
        requests() {
            return this.getMetric('requests');
        }
    }
}
</script>