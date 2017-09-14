import Overview from '../components/Overview.vue'
import Detail from '../components/Detail.vue'

// https://router.vuejs.org/en/essentials/passing-props.html

// https://github.com/vuejs/vue-router/blob/dev/examples/route-props/app.js << Example

// console.log ('routes this? ', this) // undefined

// Was not working to access it from main.js
// E.g. this this.$root this.$moment this.$root.$moment   sigh
import moment from 'moment-timezone'

// NOt trying to do this anymore ..
// import myBusVue from '../main' // no
// import { myBusVue } from '../main' // no
// console.log('myBusVue from main? ', myBusVue) // undefined. hmmph.

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
           // No. Handle myBus stuff up on root/main.js/index.html<router-view>
            // myBus: myBusVue, // << No! undefined. unhappy. :o(
            day: moment() // << Yes
            // "2017-09-12T10:51:51.512Z"
        }
    },
    {
        // path: '/movie',
        path: '/movie/:id',
        name: 'movieNamedRoute',
        component: Detail,
        // https://router.vuejs.org/en/essentials/passing-props.html
        // "When props is set to true, the route.params will be set as the component props."
        props: true
        /* Okay - with "props: true" here,
        you cannot also have (as in Overview above)
        a "props:" that passes in a value right here
        (like: day: moment()) << nope
        Your "props" (I guess) must all come from route.params.
         */
    },
    {
        // WITH HISTORY MODE
        // https://router.vuejs.org/en/essentials/history-mode.html
        path: '*', // Ye Olde "catch-all fallback" 404 killer
        component: Overview,
        props: {
            day: moment() // << Yes
            // "2017-09-12T10:51:51.512Z"
        }
    }
]
