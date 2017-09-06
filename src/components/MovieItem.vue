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
                    <div v-for="movieSession in filteredMovieSessionsByDay" class="session-time-wrapper">
                        <div class="session-time">
                        {{ gimmeMovieSessionTime(movieSession) }}</div>
                    </div>
                </div>
                <ul>
                    <li v-for="movieSession in movieSessions">{{ movieSession.time }}</li>
                </ul>
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
            }
        },
        computed: {


/* O LA! ES6 kills me again.
'this', like so, is undefined!
And so I use the "wholeDamnedThing" as my goofily named object that is passed to or otherwise made available to reference herein.
The "wholeDamnedThing" is the current Vue Component: MovieItem.vue. DAMN
                // ES6:
                filteredMovieSessionsByDay: (wholeDamnedThing) => {
*/
                    // wholeDamnedThing means: MovieItem VueComponent!

/* BUT Good Old ES5 function ...
NO >> 'this' is the Vue root instance for the whole app. phew << Nope, you're wrong, William
YES >> 'this' is STILL the current Vue Component. Not the root etc. Okay.
 */
/*
            // ES5 - 01
            filteredMovieSessionsByDay: function(wholeDamnedThing)  {
*/
                // ES5 - 02
                filteredMovieSessionsByDay: function()  {

        // Hard-coded for now to "today"
                console.log('$$$$ **** this ? ', this) // undefined (!)
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

                        var todaysMovieSessions = this.movieSessions.filter((eachMovieSession) => {
                    var todayForItemYyyyMmDd = this.$root.moment(this.todayForItem).format('YYYY MM DD')
                    var eachYyyyMmDd = this.$root.moment(eachMovieSession.time).format('YYYY MM DD')
                    console.log('eachYyyyMmDd: ', eachYyyyMmDd)
                    console.log('todayForItemYyyyMmDd : ', todayForItemYyyyMmDd)

                    // https://momentjs.com/docs/#/query/is-same/
                    console.log('^^^^ this.$root.moment(eachMovieSession.time) ', this.$root.moment(eachMovieSession.time))

                    console.log('#### this.$root.moment(this.todayForItem) ', this.$root.moment(this.todayForItem))

                    if (this.$root.moment(eachMovieSession.time).isSame(this.todayForItem), "day") {
                        console.log('YEAH')
                        return true
                    }
                    if (eachYyyyMmDd === todayForItemYyyyMmDd ) {
                        return true; //  eachYyyyMmDd === this.todayForItem
                                           }
                })
/* NOT USED (ES6 reasons ...)
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
