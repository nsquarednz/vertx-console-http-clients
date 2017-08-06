<style lang="scss">
.http-clients-list {
    padding: 20px 10px;
}
</style>

<template>
    <div class="http-clients-list">
        <http-client v-for="name in clientNames" :key="name" :name="name" :httpClientsMetrics="httpClientsMetrics" />
    </div>
</template>

<script>
import HttpClientCard from './HttpClientCard.vue';

const prefix = 'vertx.http.clients.';
const defaultClientName = prefix.substring(0, prefix.length - 1);

export default {
    name: 'HTTP Clients',
    components: {
        'http-client': HttpClientCard
    },
    data() {
        return {
            httpClientsMetrics: {}
        }
    },
    computed: {
        clientNames() {
            const suffix = '.connections';
            return [defaultClientName].concat(Object.keys(this.httpClientsMetrics)
                .filter(el => el.startsWith(prefix))
                .map(el => el.substring(prefix.length))
                .filter(el => el.endsWith(suffix))
                .map(el => el.substring(0, el.length - suffix.length))
                .map(el => prefix + el));
        }
    },
    beforeMount() {
        const updateData = () => {
            this.$http.get(window.location.pathname + '/httpclients')
                .then(response => response.data)
                .then(data => this.httpClientsMetrics = data);
        };
        updateData();
        this.updateTask = setInterval(updateData, 1000);
    },
    beforeDestroy() {
        clearInterval(this.updateTask);
    }
}
</script>