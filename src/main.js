import Vue from 'vue' // COPY to Overview.vue ... << NO! Not needed there
import './style.scss'

import Overview from './components/Overview.vue'
/* Move to Overview.vue: << YES!
import MovieList from './components/MovieList.vue'
import MovieFilter from './components/MovieFilter.vue'
*/

import VueResource from 'vue-resource'
Vue.use(VueResource)

import moment from 'moment-timezone'
moment.tz.setDefault("UTC")
// Server (/api.js) ALSO uses same timezone default: "UTC"
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } })

// ? Move to Overview.vue ( ? ) << YES! Bon.
// import { myUtilRootCheckFilterBusMethod } from './util/mybus'



// ? Move to Overview.vue ( ? ) << NO! Keep this on ROOT.
// just an empty Vue instance, enough to serve as our "bus"
// var myBus = new Vue()
var myBusVue = new Vue()

Object.defineProperty(Vue.prototype, '$myBusPropertyReference', {
    get() {
        // return this.$root.myBus;
        return this.$root.myBusVue
    }
})

console.log('myBusVue IN main? ', myBusVue) // Vue$3 {} // not seen? < till I added 'default' !
// NOPE: console.log('this.$root.myBusVue IN main? ', this.$root.myBusVue) // this << undefined
console.log('myBusVue.$myBusPropertyReference IN main? ', myBusVue.$myBusPropertyReference) // undefined. wa-a-a-ah!
// console.log('myBusVue.myBusPropertyReference IN main? ', myBusVue.myBusPropertyReference) // undefined. wa-a-a-ah!

// export this.myBusPropertyReference
// export default myBusVue.myBusPropertyReference
// export myBusVue; // << ! Needed 'default' !
export default myBusVue;

import VueRouter from 'vue-router'
Vue.use(VueRouter)

console.log('About to import routes') // not seen ?< till I added 'default' !
import myRoutes from './util/routes'
const myRouter = new VueRouter({
    routes: myRoutes,
/*
    routes: [
        { path: '/', component: Overview }
    ]
*/
})

new Vue({
    el: '#app',
    data: {
        // moviesFromAPI: [],
        moment, // << 3rd party object, turned into a custom "defined property"
        // Now do this in refactored routes.js:
        // day: moment(), // "today"
        myBusPropertyReference: myBusVue // another custom "defined property"
    },
    components: {
        'overview': Overview,
    },
    router: myRouter,
    created() {
        console.log('CREATED myBusVue IN main? ', myBusVue) // Vue$3 {_uid:0}
        console.log('CREATED this IN main? ', this) // this Vue$3 {_uid: 1}
        console.log('CREATED this.$root.myBusVue IN main? ', this.$root.myBusVue) // this << undefined
        console.log('CREATED myBusVue.$myBusPropertyReference IN main? ', myBusVue.$myBusPropertyReference) // undefined

        /* Move to Overview.vue ( ? ) << YES!
                this.$http.get('/api')
                    .then((response) => {
                        console.log('Hey! response.data? ', response.data)
                        this.moviesFromAPI = response.data // whamma-jamma
                        console.log('Hey! Where are my moviesFromAPI? ', this.moviesFromAPI)
                    })
        */

/*
// ? Move to Overview.vue ( ? ) << YES!
        myBus.$on('check-filter-child-event-bus', myUtilRootCheckFilterBusMethod.bind(this))
*/
    }
})