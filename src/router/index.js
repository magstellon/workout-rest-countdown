import Vue from 'vue'
import Router from 'vue-router'
import Countdown from '@/components/Countdown.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/:restTime(\\d+)',
            name: 'Countdown',
            component: Countdown,
            props: (route) => ({ restTime: parseInt(route.params.restTime) })
        },
        {
            path: '*',
            component: Countdown,
            props: { restTime: 3000 }
        }
    ]
})
