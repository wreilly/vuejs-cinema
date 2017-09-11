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
import { myUtilRootCheckFilterBusMethod } from './util/mybus'



// ? Move to Overview.vue ( ? ) << NO! Keep this on ROOT.
var myBus = new Vue() // just an empty Vue instance, enough to serve as our "bus"

Object.defineProperty(Vue.prototype, '$myBus', {
    get() {
        return this.$root.myBus
    }
})

new Vue({
    el: '#app',
    data: {
        // moviesFromAPI: [],
        moment, // << 3rd party object, turned into a custom "defined property"
        day: moment(), // "today"
        myBus: myBus // another custom "defined property"
    },
    components: {
        'overview': Overview,
    },
    created() {
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