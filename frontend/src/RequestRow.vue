<template>
    <tr v-if="requestData">
        <th class="type bold">{{ type }}</th>
        <th class="rate">{{ requestData.oneSecondRate.toFixed(2) }}/s</th>
        <th class="m-1">{{ requestData.oneMinuteRate.toFixed(2) }}/s</th>
        <th class="m-5">{{ requestData.fiveMinuteRate.toFixed(2) }}/s</th>
        <th class="m-15">{{ requestData.fifteenMinuteRate.toFixed(2) }}/s</th>
    </tr>
    <tr v-else/>
</template>

<script>
export default {
    props: {
        type: String,
        getMetric: Function,
        keyName: String
    },
    computed: {
        requestData() {
            return this.getMetric(this.keyName || (this.type.toLowerCase() + '-requests'));
        }
    }
}
</script>