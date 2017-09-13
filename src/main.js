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

Object.defineProperty(Vue.prototype, '$myBusVueProperty', { // ATTEMPT # 1 I think?
// Object.defineProperty(Vue.prototype, '$myBusVue', { // << YES.
    get() {
        // return this.$root.myBus;
/* YES WORKS
        return this.$root.myBusVue
*/
// ATTEMPT # 3 (!?)
        // ? seems not intuitive... And yet, that is IT! whoa.
        // This 'myBusVueDataPropNew is on the LEFT-SIDE of the data: {} below
        // The RIGHT-SIDE is 'myBusVue' - the actual Event Bus Vue instance. There you go.
        // But here, we need to invoke the LEFT-SIDE
        // (which, in turn, gets us what is on the RIGHT-SIDE. very good.)
        // ATTEMPT # 3:
        // return this.$root.myBusVueDataPropNew
        // ATTEMTP # 3AA
        return this.$root.myBusVueDataName // Yes! :o)
    }
})
/*
Object.defineProperty(Vue.prototype, '$myBusPropertyReference', {
    get() {
        // return this.$root.myBus;
        return this.$root.myBusVue
    }
})
*/

console.log('myBusVue IN main? ', myBusVue) // Vue$3 {_uid:0} // >> OLD: // not seen? < till I added 'default' !
// NOPE: console.log('this.$root.myBusVue IN main? ', this.$root.myBusVue) // this << undefined
// console.log('myBusVue.$myBusPropertyReference IN main? ', myBusVue.$myBusPropertyReference) // undefined. wa-a-a-ah!
// console.log('myBusVue.myBusPropertyReference IN main? ', myBusVue.myBusPropertyReference) // undefined. wa-a-a-ah!

// export this.myBusPropertyReference
// export default myBusVue.myBusPropertyReference
// export myBusVue; // << ! Needed 'default' !
// export default myBusVue;

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// console.log('About to import routes') // not seen ?< till I added 'default' !
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

        /* Interesting. Was trying to get distinct names for "myBus" in:
        1) The new Vue() instance = myBusVue
        2) The named defined property on Vue prototype = myBusPropertyReference
        2.A) Hmm - I *tried* that "reference" name, but, in the end, it appears you don't want "yet another name" here for the defined property.
        OR, can we ? Sheesh.

        That meant here in the data: {} property, it would be:
        RIGHT-SIDE (myBusVue) is the actual Vue instance object, we're using simply for an Event Bus
        LEFT-SIDE  ?? is the name of the Object.definedProperty, which we here make available on the root Vue instance as reactive data: {}
          Hmm. Question. Since we put this on the prototype, it's already directly accessible via that '$' reference... Maybe don't need to put it into data: {} here? Maybe don't need to pass it down as props: [] ? Hmm.
         // myBusPropertyReference: myBusVue // another custom "defined property"
         */

/* WORKS! */
        // another custom "defined property"
// >> YES:        //
        // myBusVue: myBusVue // << could this differ, on LEFT-SIDE? Hmm.
        // Q. AND, where exactly do I *use* that LEFT-SIDE 'myBusVue' in code? Hmm.
        // A. 1) Index.html router-view v-bind, on the RIGHT-SIDE!
        // A. 2) Overview.vue props:['myBusVue']
        // A. 3) HAH! (entirely unexpected) It ALSO gets used in the GETTER() for the Object.defineProperty for $myBusVueProperty. Who knew? whoa.

// ATTEMPT! # 2 FAILED:
//         myBusVueDataProp: myBusVue // another custom "defined property"
// ATTEMPT! # 3: SUCCESS
        // RIGHT-SIDE is the actual Event Bus Vue instance
        // LEFT-SIDE is the property name, known to this Vue app
        // We use the LEFT-SIDE in these 3 places:
           // A. 1) Index.html router-view v-bind, on the RIGHT-SIDE!
           // A. 2) Overview.vue props:['myBusVueDataPropNew']
           // A. 3) HAH! (entirely unexpected) It ALSO gets used in the GETTER() here in MAIN.JS for the Object.defineProperty for $myBusVueProperty. Who knew? whoa.

        // myBusVueDataPropNew: myBusVue // Another shot at this... # 3
        myBusVueDataName: myBusVue // Another shot at this... # 3AA Works! :o)

    },
    components: {
        'overview': Overview,
    },
    router: myRouter,
    created() {
        // console.log('CREATED myBusVue IN main? ', myBusVue) // Vue$3 {_uid:0}
        // console.log('CREATED this IN main? ', this) // this Vue$3 {_uid: 1}
        // console.log('CREATED this.$root.myBusVue IN main? ', this.$root.myBusVue) // this << undefined
        // console.log('CREATED myBusVue.$myBusPropertyReference IN main? ', myBusVue.$myBusPropertyReference) // undefined

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