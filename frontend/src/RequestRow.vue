<template>
    <tr v-if="requestData">
        <th>{{ type }}</th>
        <th>{{ requestData.oneSecondRate.toFixed(2) }}/s</th>
        <th>{{ requestData.oneMinuteRate.toFixed(2) }}/s</th>
        <th>{{ requestData.fiveMinuteRate.toFixed(2) }}/s</th>
        <th>{{ requestData.fifteenMinuteRate.toFixed(2) }}/s</th>
    </tr>
    <tr v-else/>
</template>

<script>
export default {
    props: {
        type: String,
        getMetric: Function
    },
    computed: {
        requestData() {
            return this.getMetric(this.type.toLowerCase() + '-requests');
        }
    }
}
</script>