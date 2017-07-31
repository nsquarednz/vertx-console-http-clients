import HttpClientsPage from './HttpClientsPage.vue';

if (!window.vertxConsoleRoutes) window.vertxConsoleRoutes = [];
window.vertxConsoleRoutes.push({
    path: '/httpclients',
    component: HttpClientsPage
});
