<style lang="scss">
.http-client {
    padding: 0;

    .donut-title-small-pf {
        width: 40px;
    }

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
        overflow-y: auto;
        width: 100%;
    }

    .connections {
        padding: 15px;
        border-bottom: 1px solid #e1e1e1;
        height: 305px;
        overflow-y: auto;
    }

    .connections-title {
        font-size: 14px;
        font-weight: 300;
        border-bottom: 1px solid #f1f1f1;
        padding-bottom: 4px;
    }

    .connection-row {
        &:nth-child(2) {
            margin-top: 4px;
        }

        .host,
        .open {
            display: inline-block;
        }

        .open {
            float: right;
            text-transform: uppercase;
            font-weight: bold;
        }
    }

    .other {
        height: 70px;
        overflow: auto;
        padding: 15px;

        .key {
            display: inline-block;
        }

        .value {
            float: right;
            font-weight: bold;
        }

        .counter-row {
            &.websockets .value {
                color: #007a87;
            }

            &.exceptions .value {
                color: #ec7a08;
            }
        }
    }
}
</style>

<template>
    <div class="col-md-6">
        <div class="http-client card-pf">
            <div class="card-pf-body">
                <div class="client-name">{{ name }}</div>
                <div class="time-period">{{ abbreviate(getMetric('requests').count, 1) }} Total Reqs</div>
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
                        <div class="connections">
                            <div class="connections-title">Connections by Host</div>
                            <div class="connection-row" v-for="[host, open] in hostnameConnections" :key="host">
                                <div class="host">{{ host }}</div>
                                <div class="open">{{ abbreviate(open, 1) }} open</div>
                            </div>
                        </div>
                        <div class="other">
                            <div class="counter-row websockets">
                                <div class="key">WebSockets</div>
                                <div class="value">{{ abbreviate(getMetric('open-websockets').count, 2) }}
                                    <i class="fa fa-exchange" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="counter-row exceptions">
                                <div class="key">Exceptions</div>
                                <div class="value">{{ abbreviate(getMetric('exceptions').count, 2) }}
                                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import abbreviate from 'number-abbreviate';
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
    beforeMount() {
        this.abbreviate = abbreviate;
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
        hostnameConnections() {
            const hostnamePrefix = this.name + '.open-connections.';
            return Object.entries(this.httpClientsMetrics)
                .filter(el => el[0].startsWith(hostnamePrefix))
                .map(el => [el[0].substring(hostnamePrefix.length), el[1].count]);
        }
    }
}
</script>