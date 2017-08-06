<script>
import C3Wrapper from './C3Wrapper.vue';

export default {
    props: {
        legendPosition: String
    },
    extends: C3Wrapper,
    methods: {
        getDefaults(chartDefaults) {
            let chartData = chartDefaults().getDefaultDonutConfig('');
            chartData.transition = { duration: 0 };
            chartData.tooltip = { show: true };
            if (this.legendPosition) {
                chartData.legend = {
                    show: true,
                    position: this.legendPosition
                };
            }
            chartData.color.pattern = ['#f0f', "#ff0", '#f8a', '#0f0'];
            return chartData;
        },
        getC3Data() {
            return {
                columns: [
                    ['Dogs', 2],
                    ['Cats', 2],
                    ['Fish', 3],
                    ['Hamsters', 1]
                ],
                type: 'donut'
            };
        }
    }
}
</script>