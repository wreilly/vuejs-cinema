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
    /* Interesting.
    Props here arrive from TWO places:
    1) day =    routes.js/props{}/Moment
    2) myBus =  main.js/data{}/index.html/router-view/v-bind:

    */
/* WORKS!
        props: ['day', 'myBusVue'],
*/
// ATTEMPT! # 2
//        props: ['day', 'myBusVueDataProp'], // << NO. FAILED.
        /* Interesting. 'myBusVue' NOT NEEDED (!)
        Discovering (finally) that this passing in of the Object.definedProperty() 'myBusVue' here, as a v-bound prop from index.html/Root-component, down here to child Overview.vue component, is NOT NEEDED!
        I sort of knew that.
        That is, the whole point of defining a property on the Vue object prototype, up in main.js-root-component code, is to AVOID the need to sling it around the Vue app in props.
        We WANT to be able to sort of "globally" reference it from child and grand-child components with ease: this.$mything, and this.$root.$mything. No props called for. Cheers.
        Of course, the passed-in prop can benignly sit here, no biggie.
        You can console.log() it to your heart's (and keyboarding fingers') content.
        */
        props: ['day', 'myBusVue'], // << Yes, works.
//        props: ['day', 'myBusPropertyReference'], // ? nope. sigh.
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

            console.log('Overview... this.myBusVue ', this.myBusVue) // Vue$3. But (child) $myBusVue is undefined. hmmph encore une fois.
            console.log('Overview... this.$myBusVueProperty ', this.$myBusVueProperty) // Same Vue$3. And yeah, (child) $myBusVue is undefined. Maybe that doesn't matter ( ? )
            console.log('Overview... this.myBusVueDataProp ', this.myBusVueDataProp) // Vue$3. But (child) $myBusVueProperty is undefined. hmmph encore une fois.

            // ======== (As also pasted in to MovieItem.vue.)
            console.log('-AOV- this', this) // Vue$3 {_uid:2}
            console.log('-BOV- this.$root', this.$root) // Vue$3 {_uid:1}
            console.log('-COV- this.$root.myBusVue', this.$root.myBusVue) // Vue$3 {_uid:0}
            console.log('-DOV- this.$root.$myBusVue', this.$root.$myBusVue) // undefined
            console.log('-COV02- this.myBusVue', this.myBusVue) // Vue$3 {_uid:0} :o)
            // RIGHT: Update, re: below line. Wrong! Hah! No, the reason why line -COV02- works is that 'myBusVue' is here in Overview.vue as a PASSED-IN PROP my friend! It is LOCAL at this point. Whoa! Cheers. << RIGHT
            // WRONG: (See line just above). >> "Here in Overview.vue, at the level of IMMEDIATE CHILD to Root Vue, you can, as seen in our line -COV02- get away without using .$root. But see MovieItem.vue for example of where you MUST use .$root. Cheers." << WRONG
            console.log('-DOV02- this.$myBusVue', this.$myBusVue) // undefined

            console.log('-EOV- this.$root.myBusVueProperty', this.$root.myBusVueProperty) // undefined
            console.log('-FOV- this.$root.$myBusVueProperty', this.$root.$myBusVueProperty) // Vue$3 {_uid:0}   :o)
            console.log('-GOV- this.$myBusVueProperty', this.$myBusVueProperty) // Vue$3 {_uid:0}   :o)
            // ========


            /* *****  ATTEMPT TO CHANGE # 2 - FAILED - myBusVueDataProp *********** */
//            this.myBusVueDataProp.$on('check-filter-child-event-bus',
//            myUtilRootCheckFilterBusMethod.bind(this))
            /* ***** / myBusVueDataProp *********** */


            /* ***** YES! :o) ATTEMPT TO CHANGE # 1 $myBusVueProperty *********** */
// INITIALLY:
//  Yes:        PROP PASSED IN: myBusVue
// this.myBusVue.$on('check-filter-child-event-bus', myUtilRootCheckFilterBusMethod.bind(this))
            // Yes: PROTOTYPE DEFINED PROPERTY: $myBusVueProperty
            this.$myBusVueProperty.$on('check-filter-child-event-bus', myUtilRootCheckFilterBusMethod.bind(this))
            /* **************** */

/*

            /!* ***** THIS WORKS $myBusVue *********** *!/
            //  Yes:        PROP PASSED IN: myBusVue
// this.myBusVue.$on('check-filter-child-event-bus', myUtilRootCheckFilterBusMethod.bind(this))
            // Yes: PROTOTYPE DEFINED PROPERTY: $myBusVue
            this.$myBusVue.$on('check-filter-child-event-bus', myUtilRootCheckFilterBusMethod.bind(this))
            /!* **************** *!/

*/

            /*
ATTEMPT at renaming the Event Bus ...
//            this.myBusPropertyReference.$on('check-filter-child-event-bus', myUtilRootCheckFilterBusMethod.bind(this))
            this.$myBusPropertyReference.$on('check-filter-child-event-bus', myUtilRootCheckFilterBusMethod.bind(this))
*/


//            console.log('Overview... this ', this) // Vue component myBus: Vue$3
        }
    }
</script>

<style>

</style>