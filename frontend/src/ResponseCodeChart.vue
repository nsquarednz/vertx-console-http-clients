<template>
    <div v-if="responses1xx">
        <div>{{ codeCounts }}</div>
        <multi-donut legendPosition="bottom" :data="codeCounts" />
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
        }
    }
}
</script>