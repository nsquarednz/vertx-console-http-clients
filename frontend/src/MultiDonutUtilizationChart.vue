<script>
import C3Wrapper from './C3Wrapper.vue';

export default {
    props: {
        legendPosition: String
    },
    extends: C3Wrapper,
    methods: {
        getDefaults(chartDefaults) {
            let chartData = chartDefaults().getDefaultDonutConfig();
            chartData.transition = { duration: 0 };
            chartData.tooltip = { show: true };
            if (this.legendPosition) {
                chartData.legend = {
                    show: true,
                    position: this.legendPosition
                };
            }
            chartData.color.pattern = ['#0088ce', "#3f9c35", '#ec7a08', '#a30000'];
            return chartData;
        },
        getC3Data() {
            return {
                columns: this.data.columns,
                type: 'donut'
            };
        },
        onDataUpdated() {
            if (!document.hidden) {
                console.log(this.chartData.data)
                this.chart.load(this.chartData.data);
            }
        }
    }
}
</script>