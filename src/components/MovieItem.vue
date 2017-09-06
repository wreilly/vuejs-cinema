<template>
    <div class="movie">
        <p>
        Here in MovieItem, FOOB2 our movie has a title: {{ movieItemThingFooBar.Title }}
        </p>
        <div class="movie-col-left">
            <img v-bind:src="movieItemThingFooBar.Poster" alt="">
        </div>
        <div class="movie-col-right">
            <div class="movie-title">
                <h2>{{ movieItemThingFooBar.Title }}</h2>
                <span class="movie-rating">{{ movieItemThingFooBar.Rated }}</span>
                &nbsp; <span class="movie-rating">{{ movieItemThingFooBar.imdbRating }}</span>
                <div class="movie-sessions">
                    <div v-for="movieSession in filteredMovieSessionsByDayComputed" class="session-time-wrapper">
<!--  ALSO WORKS:
                        <div v-for="movieSession in filteredMovieSessionsByDayMethod(movieSessions)" class="session-time-wrapper">
-->
                        <div class="session-time">
                        {{ gimmeMovieSessionTime(movieSession) }}</div>
                    </div>
                </div>
<!-- No Longer Needed:
                <ul>
                    <li v-for="movieSession in movieSessions">{{ movieSession.time }}</li>
                </ul>
-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
/*
     Vue Magic:
        1) You use kebab-case over in SENDING Component's template/markup/HTML.
    2) Vue "magically" gives you camelCase of SAME THING, HERE in receiving Component's props: ['camelCase'].
    Cheers.
        https://vuejs.org/v2/guide/components.html#camelCase-vs-kebab-case
*/
        props: ['movieItemThingFooBar', 'movieSessions', 'todayForItem'], // all we got on that movie ...
        methods: {
            gimmeMovieSessionTime(movieSession) {
              //  console.log('do we get here gimme ', movieSession.time) // yep
                // console.log(this.$moment) // yep
                return this.$moment(movieSession.time).format("h:mm A")
            },
            /* ********************* */

            filteredMovieSessionsByDayMethod(movieSessions)  {

                console.log('$$$$ **** this ? METHOD ', this)
                var tryingOutThisMovieSessions = this.movieSessions
                console.log('tryingOutThisMovieSessions ', tryingOutThisMovieSessions)

                /* ***********************************
                     ==========
                     ---  01  ----
                     methods: {
                     myMethodES6Style: (someParamMaybe) => {
                     console.log('someParamMaybe ', someParamMaybe)
                     /!* the current VueComponent! *!/
                     console.log('this ', this)
                     /!* undefined *!/ // << bummer! ES6 gotcha
                     }
                     }
                     ---  02 -------
                     methods: {
                     mymethodES5Style01: function (someParamMaybe) {
                     console.log('someParamMaybe ', someParamMaybe)
                     /!* ALSO the current VueComponent! *!/
                     console.log('this ', this)
                     /!* ALSO the current VueComponent! *!/ // << You really don't need that param thing
                     }
                     }
                     ---  03 -------
                     methods: {
                     mymethodsES5Style02: function () {
                     console.log('someParamMaybe ', someParamMaybe)
                     /!* undefined (of course) *!/
                     console.log('this ', this)
                     /!* The current VueComponent! *!/
                     }
                     ---  04 -------
                     methods: {
                     mymethodsES5Style03() {
                     console.log('someParamMaybe ', someParamMaybe)
                     /!* undefined (of course) *!/
                     console.log('this ', this)
                     /!* The current VueComponent! *!/
                     }
                     }
                     ==============
                     ******************************************************
                     */

                    /*
                     This block of code (ES5) uses simply 'this' to refer to the current VueComponent.
                     Below block of code (ES6) uses 'wholeDamnedThing' to do so.
                     */
                var todaysMovieSessions = this.movieSessions.filter((eachMovieSession) => {
                    var todayForItemYyyyMmDd = this.$root.moment(this.todayForItem).format('YYYY MM DD')
                    var eachYyyyMmDd = this.$root.moment(eachMovieSession.time).format('YYYY MM DD')
                    console.log('eachYyyyMmDd: ', eachYyyyMmDd)
                    console.log('todayForItemYyyyMmDd : ', todayForItemYyyyMmDd)


                        // Both ROOT and NON-ROOT return same object: Good.
                    console.log('ROOT^^^^ this.$root.moment(eachMovieSession.time) ', this.$root.moment(eachMovieSession.time))
                    console.log('NON-ROOT^^^^ this.$moment(eachMovieSession.time) ', this.$moment(eachMovieSession.time))

                    console.log('#### this.$root.moment(this.todayForItem) ', this.$root.moment(this.todayForItem))

                        // https://momentjs.com/docs/#/query/is-same/

                    /* CONCLUDING:
                    Hmm.
                    Do not put moment.isSame() inside of an if () statement.
                    Even when moment.isSame() returns false, when it (your moment.isSame() test) is inside that if () statement,
                    - we DO go into the { },
                    - we DO "pass",
                    - we (I guess) DO have a "truthy" result from moment.isSame(), at least so far as the if () regards it.
                    Hmm.
                    I guess, since the whole point of moment.isSame() is to serve as a sort of if () statement test in its own right, you ought not ever need to say if ( moment.isSame() )
                    But, I wanted to, just to see, to test, using an if () statement, what was happening. But if () was not helping me with the correct answer with this particular scenario.
                    Hmm.
                    Maybe what moment.isSame() is really "returning", in the context of being inside of an if (), is some sort of signal that, "yeah, I completed execution, my test is done."
                    Rather than moment.isSame() "returning" something more like, "Here is the result of my test: true or false."
                    By contrast: When you run moment.isSame() and *assign* its *result* to a variable, then yes you do get true or false.
                     Interesting.
                     What is going on inside an if () parentheses expression test, anyway?
                     Hmm.
                    */

                    var trueOrFalseOrWhat01 = this.$root.moment(eachMovieSession.time).isSame(this.todayForItem, 'day')
                    console.log('01 Veddy interesting. trueOrFalseOrWhat01 is: ', trueOrFalseOrWhat01) // yep. true or false


/*
                    if (this.$root.moment(eachMovieSession.time).isSame(this.todayForItem), 'day') {
*/
                    if (trueOrFalseOrWhat01) {
                            // This IF check is NOT WORKING
                            // ALL items are passing. Not right.
                            // Hmm, are you Not Supposed To Put Moment.isSame() Inside An IF() ??
                        console.log('YEAH - METHOD')
                        var trueOrFalseOrWhat02 = this.$root.moment(eachMovieSession.time).isSame(this.todayForItem, 'day')
                        console.log('02 Veddy interesting. trueOrFalseOrWhat02 is: ', trueOrFalseOrWhat02) // yep. true or false

                        // FINALLY, THE ACTUAL TEST:
                        return this.$root.moment(eachMovieSession.time).isSame(this.todayForItem, 'day')
                    } else {
                        console.log('NOPE - METHOD')
                    }
                })
                return todaysMovieSessions
            }
        /* ************************
        */
        },
        computed: {


/* O LA! ES6 kills me again.
'this', like so, is undefined!
And so I use the "wholeDamnedThing" as my goofily named object that is passed to or otherwise made available to reference herein.
The "wholeDamnedThing" is the current Vue Component: MovieItem.vue. DAMN
                // ES6:
                filteredMovieSessionsByDayComputed: (wholeDamnedThing) => {
*/
                    // wholeDamnedThing means: MovieItem VueComponent!

/* BUT Good Old ES5 function ...
NO >> 'this' is the Vue root instance for the whole app. phew << Nope, you're wrong, William
YES >> 'this' is STILL the current Vue Component. Not the root etc. Okay.
 */
/*
            // ES5 - 01
            filteredMovieSessionsByDayComputed: function(wholeDamnedThing)  {
*/
                // ES5 - 02
                filteredMovieSessionsByDayComputed: function()  {

        // Hard-coded for now to "today"
                console.log('$$$$ **** this ? COMPUTED ', this) // undefined (!)
//                console.log('typeof ', typeof wholeDamnedThing) // Vue Component (this one, MovieItem.vue)
//                console.log('**** wholeDamnedThing ? ', wholeDamnedThing)
                /*
                $root: Vue$3
                gimmeMovieSessionTime: f boundFn(a)
                movieItemThingFooBar: (...) Object { ... Title: "Sintel" }
                movieSessions: (...) Array(15) [{...time : "2017-09-05T13:00:00.000Z" } ...]
                todayForItem: (...)  "2017 09 05"
                 */

                    // YEAH! 'this' working as expected. Bon.
                    // We'll use that with ES5 in lieu of that ES6 craziness I was doing.
/*
                    var tryingOutThisMovieSessions = this.movieSessions
                    console.log('tryingOutThisMovieSessions ', tryingOutThisMovieSessions)
*/
                    /*
                     tryingOutThisMovieSessions  (25) [{…}, ...] << Session times for one movie item. Good.
                     */

/* ***********************************
                    ==========
                        ---  01  ---- <<< Don't Do
                    computed: {
                        myComputedVariableES6Style: (someParamMaybe) => {
                            console.log('someParamMaybe ', someParamMaybe)
                            /!* the current VueComponent! *!/
                            console.log('this ', this)
                            /!* undefined *!/ // << bummer! ES6 gotcha
                        }
                    }
                    ---  02 ------- <<< Don't Do
                    computed: {
                        myComputedVariableES5Style01: function (someParamMaybe) {
                            console.log('someParamMaybe ', someParamMaybe)
                            /!* ALSO the current VueComponent! *!/
                            console.log('this ', this)
                            /!* ALSO the current VueComponent! *!/ // << You really don't need that param thing
                        }
                    }
                    ---  03 ------- <<< YEAH! DO!
                        computed: {
                        myComputedVariableES5Style02: function () {
                            console.log('someParamMaybe ', someParamMaybe)
                            /!* undefined (of course) *!/
                            console.log('this ', this)
                            /!* The current VueComponent! *!/
                        }
                    }
                    ==============
  ******************************************************
*/

/*
 This block of code (ES5) uses simply 'this' to refer to the current VueComponent.
 Below block of code (ES6) uses 'wholeDamnedThing' to do so.
*/
                        var todaysMovieSessions = this.movieSessions.filter((eachMovieSession) => {
                    var todayForItemYyyyMmDd = this.$root.moment(this.todayForItem).format('YYYY MM DD')
                    var eachYyyyMmDd = this.$root.moment(eachMovieSession.time).format('YYYY MM DD')
                    console.log('eachYyyyMmDd: ', eachYyyyMmDd)
                    console.log('todayForItemYyyyMmDd : ', todayForItemYyyyMmDd)



/*
One more topic: MOMENT Object
Here in a Child Component, we can refer to the 'moment' object here in the app one of two ways:
1) this.$root.moment
  -- 'this' is current Child Vue Component
  -- '$root' is root Vue instance of app
2) this.$moment
  -- 'this' is current Child Vue Component
  -- '$moment' is a defined property we set up in main.js, to be used by any Vue Component, to "get" that moment object off the (root) Vue prototype
*/
                            // Both ROOT and NON-ROOT return same object: Good.
                            console.log('ROOT^^^^ this.$root.moment(eachMovieSession.time) ', this.$root.moment(eachMovieSession.time))
                            console.log('NON-ROOT^^^^ this.$moment(eachMovieSession.time) ', this.$moment(eachMovieSession.time))
                            /*
                             ROOT^^^^ this.$root.moment...
                             NON-ROOT^^^^ this.$moment(eachMovieSession.time)
                             Moment {
                             _isAMomentObject: true,
                             _i: "2017-09-11T17:30:00.000Z",
                             _f: "YYYY-MM-DDTHH:mm:ss.SSSSZ",
                             _tzm: 0,
                             _isUTC: true, …}
                             _a: (7) [2017, 8, 11, 17, 30, 0, 0]
                             _d: Mon Sep 11 2017 13:30:00 GMT-0400 (EDT) {}
                             _f: "YYYY-MM-DDTHH:mm:ss.SSSSZ"
                             _i: "2017-09-11T17:30:00.000Z"
                             _isAMomentObject: true
                             _isUTC: true
                             _isValid: true

                             */

                    console.log('#### this.$root.moment(this.todayForItem) ', this.$root.moment(this.todayForItem))

                            // https://momentjs.com/docs/#/query/is-same/
                    if (this.$root.moment(eachMovieSession.time).isSame(this.todayForItem), 'day') {
                        // This IF check is NOT WORKING
                        // ALL items are passing. Not right.
                        // Hmm, are you Not Supposed To Put Moment.isSame() Inside An IF() ??
                        console.log('YEAH - COMPUTED')

                        return this.$root.moment(eachMovieSession.time).isSame(this.todayForItem, 'day')
//                        return true
                    }
/* WR__ INITIAL APPROACH
IN LIEU OF MOMENT.ISSAME()
I WAS COMPARING MY OWN CONTROLLED (STRING) FORMAT.

                    if (eachYyyyMmDd === todayForItemYyyyMmDd ) {
                        return true; //  eachYyyyMmDd === this.todayForItem
                                           }
*/
                })
/* NOT USED (ES6 reasons ...)

This block of code (ES6 arrow) uses 'wholeDamnedThing' to refer to the current VueComponent.
Above block of code (ES5 function) uses simply 'this' to do so.

                    var todaysMovieSessions = wholeDamnedThing.movieSessions.filter((eachMovieSession) => {
                        var todayForItemYyyyMmDd = wholeDamnedThing.$root.moment(wholeDamnedThing.todayForItem).format('YYYY MM DD')
                        var eachYyyyMmDd = wholeDamnedThing.$root.moment(eachMovieSession.time).format('YYYY MM DD')
                        console.log('eachYyyyMmDd: ', eachYyyyMmDd)
                        console.log('todayForItemYyyyMmDd : ', todayForItemYyyyMmDd)
                        // https://momentjs.com/docs/#/query/is-same/
                        console.log('^^^^ wholeDamnedThing.$root.moment(eachMovieSession.time) ', wholeDamnedThing.$root.moment(eachMovieSession.time))
                        console.log('#### wholeDamnedThing.$root.moment(wholeDamnedThing.todayForItem) ', wholeDamnedThing.$root.moment(wholeDamnedThing.todayForItem))
                        if (wholeDamnedThing.$root.moment(eachMovieSession.time).isSame(wholeDamnedThing.todayForItem), "day") {
                            console.log('YEAH')
                            return true
                        }
                        if (eachYyyyMmDd === todayForItemYyyyMmDd ) {
                            return true; //  eachYyyyMmDd === wholeDamnedThing.todayForItem
                        }
                    })
*/
                return todaysMovieSessions
            }
        }
    }
</script>
