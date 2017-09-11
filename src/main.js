import Vue from 'vue'
import './style.scss'

import MovieList from './components/MovieList.vue'
import MovieFilter from './components/MovieFilter.vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import moment from 'moment-timezone'
moment.tz.setDefault("UTC")
// Server (/api.js) ALSO uses same timezone default: "UTC"
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } })

// LESSON 98 - EVENT BUS
import { myUtilRootCheckFilterBusMethod } from './util/mybus'

console.log('wtf myUtilRootCheckFilterBusMethod ', myUtilRootCheckFilterBusMethod)

var myBus = new Vue() // just an empty Vue instance, enough to serve as our "bus"

Object.defineProperty(Vue.prototype, '$myBus', {
    get() {
        return this.$root.myBus
    }
})

new Vue({
    el: '#app',
    data: {
        // Array 'genre' will contain the "title" (ooffaa - stupid word) of the GENRE .
        genre: [], // sent as props down to movie-list as genresmylist.
        time: [], // e.g. ['Before 6pm']
        moviesFromAPI: [],
        moment, // << 3rd party object, turned into a custom "defined property"
        day: moment(), // "today"
        myBus: myBus // another custom "defined property"
    },
    components: {
        'movie-list': MovieList,
        'movie-filter': MovieFilter,
    },
    methods: {
        // NO LONGER USED (LESSON 98):
        myRootCheckFilterBusMethod(category, title, checked) {
            console.log('-02- NEW myRootCheckFilterBusMethod!', category, ' | ', title, ' | ', checked )
            if (!checked) {
                var foundPosition = this[category].findIndex((eachTitle) => eachTitle === title)
                this[category].splice(foundPosition, 1)
            } else {
                this[category].push(title)
            }
        },

        // NO LONGER USED (LESSON 98)
        checkFilterGrandParentMethod(category, title, checked){
            if (checked) {
                this[category].push(title)
            } else {
                // let index = this[category].indexOf(title) << Instructor code way
                var foundIndex = this[category].findIndex((eachMovieTitle) => title === eachMovieTitle)
                if (foundIndex !== -1) {
                    this[category].splice(foundIndex, 1)
                } else {
                    // "This shouldn't happen"
                }
            }
      }
    },
    created() {
        this.$http.get('/api')
            .then((response) => {
                this.moviesFromAPI = response.data // whamma-jamma
            })

        // NO LONGER USED (LESSON 98)
        // myBus.$on('check-filter-child-event-bus', this.myRootCheckFilterBusMethod)
        myBus.$on('check-filter-child-event-bus', myUtilRootCheckFilterBusMethod.bind(this))
    }
})