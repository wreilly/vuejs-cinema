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
                <!--
                Update: Using METHOD now. (L95)
                Why?
                We'll Clean Up the Method
                (Leave the Computed all a Mess/Comment-a-loopa)
// NOT USING THE "filtered...METHOD"
// USING INSTEAD (equivalent) "filtered...COMPUTED" below
                -->

                <div class="movie-sessions">
                    <!-- Also works
                   <div v-for="movieSession in filteredMovieSessionsByDayComputed" class="session-time-wrapper">
                    -->
<!--  ALSO WORKS: -->
                    <div v-for="movieSession in filteredMovieSessionsByDayMethod(movieSessions)" class="session-time-wrapper">
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
//            Update: Using METHOD now. (L95)
//            Why?
//                We'll Clean Up the Method
//                (Leave the Computed all a Mess/Comment-a-loopa)
    // NOT USING THIS "filtered...METHOD"
// USING INSTEAD (equivalent) "filtered...COMPUTED" below

            filteredMovieSessionsByDayMethod(movieSessions)  {
                    return this.movieSessions
                        .filter((eachMovieSession) => {
                        return this.$moment(eachMovieSession.time).isSame(this.todayForItem, 'day')
                            
                })
            }
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
//            Update: Using METHOD now. (L95)
//            Why?
//                We'll Clean Up the Method
//                (Leave the Computed all a Mess/Comment-a-loopa)
// NOT USING THE "filtered...METHOD" (above)
// USING INSTEAD this (equivalent) "filtered...COMPUTED" here:
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
//                    var todayForItemYyyyMmDd = this.$root.moment(this.todayForItem).format('YYYY MM DD')
//                    var eachYyyyMmDd = this.$root.moment(eachMovieSession.time).format('YYYY MM DD')
//                    console.log('eachYyyyMmDd: ', eachYyyyMmDd)
//                    console.log('todayForItemYyyyMmDd : ', todayForItemYyyyMmDd)



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
//                            console.log('ROOT^^^^ this.$root.moment(eachMovieSession.time) ', this.$root.moment(eachMovieSession.time))
                            console.log('NON-ROOT ABC ^^^^ this.$moment(eachMovieSession.time) ', this.$moment(eachMovieSession.time))
                            console.log('this.todayForItem (Moment object hey?) JSON.parse(JSON.stringify(this.todayForItem))): ', JSON.parse(JSON.stringify(this.todayForItem)))
                            /*
                             this.todayForItem (Moment object hey?) JSON.parse(JSON.stringify(this.todayForItem))):  2017-09-07T17:21:26.208Z
                            */
                            console.log('NON-ROOT XYZ ^^^^ this.$moment(this.todayForItem) ', this.$moment(this.todayForItem))
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

//                    console.log('#### this.$root.moment(this.todayForItem) ', this.$root.moment(this.todayForItem))

                            // https://momentjs.com/docs/#/query/is-same/
//                            https://stackoverflow.com/questions/25734743/moment-js-return-the-current-timestamp
                            // Just use default .moment() to get "today"
                           // (faintly) "h'rrah!" (faintly) Works. bit of phew
//                  // YES:          if (this.$moment(eachMovieSession.time).isSame(this.$moment(), 'day')) {
                   // YES:         // Flip it! (bit more elegant) Also works
                            if (this.$moment().isSame(eachMovieSession.time, 'day')) {
                  // NO:          if (this.$moment(eachMovieSession.time).isSame(this.todayForItem), 'day') {
                        // This IF check is NOT WORKING
                        // ALL items are passing. Not right.
                        // Hmm, are you Not Supposed To Put Moment.isSame() Inside An IF() ??
                        console.log('YEAH - COMPUTED')

//                                return this.$root.moment(eachMovieSession.time).isSame(this.todayForItem, 'day')
                       // YES:        return this.$moment(eachMovieSession.time).isSame(this.$moment(), 'day')
                                // Flip it!
//                                return this.$moment().isSame(eachMovieSession.time, 'day')
                                // Since we did the test above in the if() statement, here we can just return true:
                        return true
                    } else {
                        console.log('*******************************')
                        console.log('huh, we NEVER see this line')
                        console.log('*******************************')
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
