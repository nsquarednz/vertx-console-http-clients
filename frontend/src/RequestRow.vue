<template>
    <tr v-if="requestData">
        <th class="type bold">{{ type }}</th>
        <th class="rate">{{ abbreviate(requestData.oneSecondRate.toFixed(2), 2) }}/s</th>
        <th class="m-1">{{ abbreviate(requestData.oneMinuteRate.toFixed(2), 2) }}/s</th>
        <th class="m-5">{{ abbreviate(requestData.fiveMinuteRate.toFixed(2), 2) }}/s</th>
        <th class="m-15">{{ abbreviate(requestData.fifteenMinuteRate.toFixed(2), 2) }}/s</th>
    </tr>
    <tr v-else/>
</template>

<script>
import abbreviate from 'number-abbreviate';

export default {
    props: {
        type: String,
        getMetric: Function,
        keyName: String
    },
    beforeMount() {
        this.abbreviate = abbreviate;
    },
    computed: {
        requestData() {
            return this.getMetric(this.keyName || (this.type.toLowerCase() + '-requests'));
        }
    }
}
</script>