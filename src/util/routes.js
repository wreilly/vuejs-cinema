import Overview from '../components/Overview.vue'

// https://router.vuejs.org/en/essentials/passing-props.html

// https://github.com/vuejs/vue-router/blob/dev/examples/route-props/app.js << Example

console.log ('routes this? ', this) // undefined

// Was not working to access it from main.js
// E.g. this this.$root this.$moment this.$root.$moment   sigh
import moment from 'moment-timezone'

import myBusVue from '../main' // no
// import { myBusVue } from '../main' // no

console.log('myBusVue from main? ', myBusVue) // undefined. hmmph.

export default [
/*
    {
        path: '/',
        component: Overview
    }
*/

/*
    {
        path: '/',
        component: Overview,
        props: true
    }
*/

    {
        path: '/',
        component: Overview,
        props: {
            myBus: myBusVue, // << No! undefined. unhappy. :o(
            day: moment() // << Yes
            // "2017-09-12T10:51:51.512Z"
        }
    }
]
