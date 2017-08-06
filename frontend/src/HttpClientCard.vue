<style lang="scss">
.http-client {
    padding: 0;

    .client-name,
    .time-period,
    table {
        margin: 0 15px;
    }

    .client-name {
        font-size: 16px;
        font-weight: 300;
        display: inline-block;
    }

    .time-period {
        float: right;
        text-transform: uppercase;
        font-weight: bold;
        line-height: 26.5px;
    }

    .card-pf-body {
        margin-top: 15px;
        padding-bottom: 0;
    }

    .card-pf-body .pf-card-separator {
        height: 1px;
        background: #e1e1e1;
        margin-top: 15px;
    }

    tr:first-child {
        border-bottom: 1px solid #f1f1f1;
        th {
            font-weight: 300;
            font-size: 14px;
            padding-bottom: 4px;
        }
    }

    tr:nth-child(2) {
        th {
            padding-top: 4px;
        }
    }

    tr:nth-last-child(2) {
        th {
            padding-bottom: 5px;
        }
    }

    th {
        font-weight: normal;
        padding-right: 20px;

        &.bold {
            font-weight: bold;
            border-right: 1px solid #f1f1f1;
        }

        &.type {
            color: #4d5258;
            padding-right: 10px;
            min-width: 65px;
        }

        &.rate {
            color: #00659c;
            padding-left: 10px;
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

    .stats {
        display: flex;
    }

    .left {
        border-right: 1px solid #e1e1e1;
        padding: 15px 0 0;
    }

    .right {
        height: 375px;
        overflow-y: auto;
    }
}
</style>

<template>
    <div class="col-md-6">
        <div class="http-client card-pf">
            <div class="card-pf-body">
                <div class="client-name">{{ name }}</div>
                <div class="time-period">Last 5m</div>
                <div class="pf-card-separator" />
                <div class="stats">
                    <div class="left">
                        <table>
                            <tr>
                                <th class="type">Request</th>
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
                            <tr>
                                <td colspan="5">
                                    <response-code-chart :getMetric="getMetric" />
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="right">
                        {{ httpClientsMetrics }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RequestRow from './RequestRow.vue';
import ResponseCodeChart from './ResponseCodeChart.vue';

export default {
    components: {
        'request-row': RequestRow,
        'response-code-chart': ResponseCodeChart
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
        },
        c3Wrapper() {
            return Vue.component('c3-wrapper');
        }

    }
}
</script>