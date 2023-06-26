import { createWebHashHistory, createRouter } from 'vue-router';
import RealtimeRoute from '../route/RealtimeRoute.vue';
import ProductivityRoute from '../route/ProductivityRoute.vue';
import KpiRoute from '../route/KpiRoute.vue';
import ProblemRoute from '../route/ProblemRoute.vue';
import MachineSettingsRoute from '../route/MachineSettingsRoute.vue';
import ProductsSettingsRoute from '../route/ProductsSettingsRoute.vue';
import NotFoundRoute from '../route/NotFoundRoute.vue';
import PlaygroundRoute from '../route/PlaygroundRoute.vue';

const routes = [
    {
        path:'/',
        component:RealtimeRoute
    },
    {
        path:'/productivity',
        component: ProductivityRoute
    },
    {
        path:'/kpi',
        component: KpiRoute
    },
    {
        path:'/problem',
        component: ProblemRoute
    },
    {
        path:'/machinesettings',
        component: MachineSettingsRoute
    },
    {
        path:'/productssettings',
        component: ProductsSettingsRoute
    },
    {
        path:'/playground',
        component: PlaygroundRoute
    },
    {
        path:'/:pathMatch(.*)*',
        component: NotFoundRoute
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;