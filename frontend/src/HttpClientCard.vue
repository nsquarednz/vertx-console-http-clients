<style lang="scss">
.http-client {
    margin: 0 15px 15px;
    padding: 0;

    .client-name, table {
        margin: 0 15px;
    }

    .client-name {
        font-size: 14px;
        font-weight: 300;
    }

    .card-pf-body {
        margin-top: 15px;
    }

    .card-pf-body .pf-card-separator {
        height: 1px;
        background: #e1e1e1;
        margin: 15px 0;
    }

    tr:first-child th {
        font-weight: normal;
    }

    th {
        padding-right: 20px;

        &.type {
            color: #4d5258;
        }

        &.rate {
            color: #00659c;
        }

        &.m-1 {
            color: #0088ce;
        }

        &.m-5 {
            color: #39a5dc;
        }

        &.m-15 {
            color: #3f9c35;
        }
    }
}
</style>

<template>
    <div class="http-client card-pf">
        <div class="card-pf-body">
            <div class="client-name">{{ name }}</div>
            <div class="pf-card-separator" />
            <table>
                <tr>
                    <th>Request</th>
                    <th class="rate">Rate</th>
                    <th class="m-1">1m</th>
                    <th class="m-5">5m</th>
                    <th class="m-15">15m</th>
                </tr>
                <request-row type="GET" :getMetric="getMetric" />
                <request-row type="POST" :getMetric="getMetric" />
                <request-row type="PUT" :getMetric="getMetric" />
                <request-row type="DELETE" :getMetric="getMetric" />
                <request-row type="PATCH" :getMetric="getMetric" />
                <request-row type="All types" keyName="requests" :getMetric="getMetric" />
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