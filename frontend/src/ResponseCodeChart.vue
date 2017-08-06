<style lang="scss">
.chart-wrapper {
    border-top: 1px solid #f1f1f1;
    padding-top: 15px;
}
</style>

<template>
    <div class="chart-wrapper" v-if="responses1xx">
        <multi-donut legendPosition="bottom" :data="codeCounts" :centerText="centerText" />
    </div>
    <div v-else />
</template>

<script>
import MultiDonutUtilizationChart from './MultiDonutUtilizationChart.vue';

const SECONDS_IN_5_MIN = 60 * 5;

export default {
    props: {
        getMetric: Function
    },
    components: {
        'multi-donut': MultiDonutUtilizationChart
    },
    computed: {
        responses1xx() {
            return this.getMetric('responses-1xx');
        },
        codeCounts() {
            return {
                columns: ['1xx', '2xx', '3xx', '4xx', '5xx'].map(el => [
                    el,
                    Math.ceil(
                        (el === '1xx' ? this.responses1xx : this.getMetric('responses-' + el))
                            .fiveMinuteRate * SECONDS_IN_5_MIN
                    )
                ])
            };
        },
        centerText() {
            let successes;
            let total = 0;
            for (let [k, v] of this.codeCounts.columns) {
                if (k === '2xx') {
                    successes = v;
                }
                total += v;
            }
            return { big: (total === 0) ? 0 : +(successes * 100 / total).toFixed(1) + '%', small: '\u2714 reqs, last 5m' }
        }
    }
}
</script>