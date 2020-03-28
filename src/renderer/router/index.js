import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/',
            name: 'landing-page',
            component: require('@/components/LandingPage').default
        },
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/main',
            name: 'main',
            redirect: '/home',
            component: () => import('@/views/main.vue'),
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/views/home.vue')
                }
            ]
        }
    ]
});