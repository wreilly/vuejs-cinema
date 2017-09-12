<template>
    <div id="overview">
        <div id="main">
            <movie-list
                    v-bind:genresmylist="genre"
                    v-bind:timesmylist="time"
                    v-bind:movies-for-movie-list="moviesFromAPI"
                    v-bind:today-for-list="day"></movie-list>
            <!-- No Longer Used: Now with EVENT BUS we can skip listening on "middle-man" component MovieFilter:
                <movie-filter v-on:check-filter-parent-event="checkFilterGrandParentMethod"></movie-filter>
-->
            <movie-filter></movie-filter>
        </div>
    </div>
</template>

<script>
//    import Vue from 'vue' // ? << NO!  Just on "parent" Root main.js, not here
/*
    import moment from 'moment-timezone' << NO! Keep on Root
    moment.tz.setDefault("UTC")
    // Server (/api.js) ALSO uses same timezone default: "UTC"
    Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } })
*/

//var myBus = new Vue() // << NO! Keep on Root

//Object.defineProperty(Vue.prototype, '$myBus', {  // << NO! Keep on Root
//    get() {
//        return this.$root.myBus
//    }
//})


import { myUtilRootCheckFilterBusMethod } from '../util/mybus' // << YES! Needed here

import MovieList from './MovieList.vue'
import MovieFilter from './MovieFilter.vue'

    export default {
//        props: ['day', 'myBus'], // << YES! myBus as prop
        props: ['day', 'myBusPropertyReference'], // ?
        data: function() {
            return {
                genre: [], // sent as props down to movie-list as genresmylist.
                time: [], // e.g. ['Before 6pm']
                moviesFromAPI: [],
//                myBus: myBus // another custom "defined property" // << NO! Up on Root
                 /*
                 moment, // << 3rd party object, turned into a custom "defined property"
                 day: moment(), // "today"

                 */
            }
        },
        components: {
            'movie-list': MovieList,
            'movie-filter': MovieFilter,
        },
        methods: {
            // NO LONGER USED (LESSON 98):
/*
            myRootCheckFilterBusMethod(category, title, checked) {
                console.log('-02- NEW myRootCheckFilterBusMethod!', category, ' | ', title, ' | ', checked)
                if (!checked) {
                    var foundPosition = this[category].findIndex((eachTitle) => eachTitle === title)
                    this[category].splice(foundPosition, 1)
                } else {
                    this[category].push(title)
                }
            },
*/

            // NO LONGER USED (LESSON 98)
/*
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
*/
        },
        created() {
            this.$http.get('/api')
                .then((response) => {
//                    console.log('Hey! response.data? ', response.data)
                    this.moviesFromAPI = response.data // whamma-jamma
//                    console.log('Hey! Where are my moviesFromAPI? ', this.moviesFromAPI)
                })


            // ? Move from Overview.vue ( ? ) << YES!

            /* *********
            ROUTER-VIEW VIZ. CERTAIN PROPERTIES ...
            Quite interesting. (LESSON 101)
            When NOT in the vue-router, <router-view>, this next line DID WORK, with simply myBus:
            this.myBus.$on...
            Then, when IN the vue-router and <router-view>, myBus was undefined; needed to use:
            this.$myBus.$on...

            (See also MovieList.vue re: todayForList)
             */

            console.log('Overview... this.myBus ', this.myBus) // undefined. hmmph encore une fois.

// INITIALLY:
//            this.myBusPropertyReference.$on('check-filter-child-event-bus', myUtilRootCheckFilterBusMethod.bind(this))
            this.$myBusPropertyReference.$on('check-filter-child-event-bus', myUtilRootCheckFilterBusMethod.bind(this))


//            console.log('Overview... this ', this) // Vue component myBus: Vue$3
        }
    }
</script>

<style>

</style>