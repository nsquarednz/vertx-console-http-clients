<template>
    <div class="httpClients">
        {{ httpClientsMetrics }}
    </div>
</template>

<script>
export default {
    name: 'HTTP Clients',
    data() {
        return {
            httpClientsMetrics: {}
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