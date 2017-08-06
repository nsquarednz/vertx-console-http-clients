<style lang="scss">
.http-client {
    margin: 0 15px 15px;

    th {
        min-width: 60px;
    }
}
</style>

<template>
    <div class="http-client card-pf">
        <div class="requests-section">
            <h2>{{ name }}</h2>
            <table>
                <tr>
                    <th>Request</th>
                    <th>1s rate</th>
                    <th>1m rate</th>
                    <th>5m rate</th>
                    <th>15m rate</th>
                </tr>
                <request-row type="GET" :getMetric="getMetric" />
                <request-row type="POST" :getMetric="getMetric" />
                <request-row type="DELETE" :getMetric="getMetric" />
    
            </table>
        </div>
    </div>
</template>

<script>
import RequestRow from './RequestRow.vue';

export default {
    components: {
        'request-row': RequestRow
    },
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
        },
        getRequests() {
            return this.getMetric('get-requests');
        },
        postRequests() {
            return this.getMetric('post-requests');
        },
        deleteRequests() {
            return this.getMetric('delete-requests');
        }

    }
}
</script>