<template>
    <div id="movie-list">
        <div>
            <div v-if="false" class="no-results">
                <p>Loading yer films...!</p>
            </div>

            <div v-if="moviesForMovieList.length === 0" class="no-results">
                <p>Loading yer films...!</p>
            </div>

            <div v-else>
                <div v-if="filteredMovies.length === 0" class="no-results">
                    <p>Too stringent, my friend! Let up, let the movies IN to your life!</p>
                    <p>Computed property 'noResults' about what you're insisting on: {{ noResults }}</p>
<!--
                    <ul>
                        <li v-for="genremylist in genresmylist">{{ genremylist }}</li>
                    </ul>
                    <ul>
                        <li v-for="timemylist in timesmylist">{{ timemylist }}</li>
                    </ul>
-->
                </div>
                <div v-else>
                    <!-- WAS:  MovieItem did its own Sessions processing.

                    <movie-item
                            v-for="movie in filteredMovies"
                            v-bind:movie-item-thing-foo-bar="movie.movie"
                    v-bind:movie-sessions="movie.sessions"
                            v-bind:timesmylist-for-item="timesmylist"
                    v-bind:today-for-item="todayForList">
-->

                    <!-- NOW IS: (LESSON 107 - Slots)  Sessions processing now up on parent MovieList -->
                    <movie-item
                            v-for="movie in filteredMovies"
                            v-bind:movie-item-thing-foo-bar="movie.movie">

                    <!--
                    - 'movie-item' used to "close" right here.
                    -- Note that it used to have *NO* child element markup - Only attributes. fwiw.
                    - Now with SLOT (on Child MovieItem), this component 'movie-item' does have child element markup
                    -- And it therefore closes further down, below that newly-introduced movie-sessions markup (for the slot)
                    </movie-item>
                    -->

<!--  LESSON 107 ** now SLOTS!  from (Child) MovieItem.vue -->

                        <div class="movie-sessions">

<!-- Was Like This, down in child MovieItem:
('movieSessions' was name I gave to 'movie.sessions', as passed-in prop)
MovieList had: v-bind:movie-sessions="movie.sessions"

                            <div v-for="movieSession in filteredMovieSessionsByDayByTimeMethod(movieSessions)" class="session-time-wrapper">
-->

<!--  Now Like This, here in parent MovieList:
 (retain the 'movie.sessions', simply. Cheers.)
 -->
                            <!-- LESSON 115 Tooltip Custom Directive: 'v-mytooltip' re: seats.
 "sessions": [
      {
        "time": "2017-01-29T13:00:00.000Z",
        "seats": 177
      },
                            -->

<!--  This is the DIV  that is 'el' in our v-tooltip DIRECTIVE: class="session-time-wrapper tooltip-wrapper" -->
                            <div
                                    v-for="movieSession in filteredMovieSessionsByDayByTimeMethod(movie.sessions)"
                                    class="session-time-wrapper tooltip-wrapper"
                            v-tooltip="{ seats: movieSession.seats }">
                                <!-- First one, let's Comment more: -->

                                <!-- same little change: movie.sessions  *****
                                <div v-if="movieSession.time === movieSessions[0].time" class="session-time">
-->
                                <div v-if="movieSession.time === movie.sessions[0].time" class="session-time">

                                    <!-- Just quick way to "turn off" logic for checking first one (First session).
                                    <div v-if="false" class="session-time"> -->
                                    {{ gimmeMovieSessionTimeCommented(movieSession) }}
                                </div>
                                <div v-else class="session-time">
                                        {{ gimmeMovieSessionTime(movieSession) }}
                                </div>

 <!-- No Longer Needed, here in template. :o)
 Now comes from MAIN.JS directive code.

                                <span class="tooltip tooltip-show">HardCodeTemplated: Seats available {{ movieSession.seats }}</span>
-->
                            </div>
                        </div>
                        <!-- /End of slot markup -->

                    </movie-item>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import myFrozenGenres from '../util/genres'
    import MovieItem from './MovieItem.vue'
    import myFrozenTimes from '../util/times'
    // *Plural* "times" : util list of possible times ('Before 6pm') to choose from
    // *Singular* "time" : name of array in main.js data: {}, that holds values like 'Before 6pm', 'After 6pm')

    import { daySelectedMethodUtilBusToCall } from '../util/mybus'
    // Interesting. Refer to this imported method WITHOUT using 'this.' Okay.
    // To reference a method on this component's own methods: {} object, you DO use 'this.' Okay.

    export default {
    props: ['genresmylist', 'timesmylist', 'moviesForMovieList', 'todayForList' ],
        data: function() {
            return {
                // Not working (?) Can I not put a just-received PROP onto a DATA property? hmm.
//                moviesForMovieListData: this.moviesForMovieList
                moviesForMovieListData: [], // just declare it... ? Seems better
                // Hah. Above (list of movies) we are NOT *really* changing.
                // We just need "a change" to occur so that reactive computed() filteredMovies() will re-run fer chrissakes.
                // But below (today for list moment thing) DOES actually change. Hmm.
                // Need to reconsider the code, refactor ? from todayForList to todayForListData everywhere. Hmm. Not so sure about that... Yes, did need to refactor, a smidge.
                todayForListData: this.todayForList, // gonna work? gonna fail? likely latter
                // Hey, above seems to have WORKED. :o)

//                todayForListData: this.$moment() // declare here too a "DATA" version, for the PROP. Why? So in code below we can change the value. OK on DATA, not OK on PROP. Cheers.
            }
        },
        components: {
            'movie-item': MovieItem,
        },
        methods: {
        /* fwiw : This method here is the "SECOND WAY". daySelectedMethodToCall
        (The "THIRD WAY" is method over in /UTIL/MYBUS.JS)
        (The "FIRST WAY" is anonymous function, here in MovieList.vue created() .$on ....)
        */
            daySelectedMethodToCall(myPayloadThing) {

                console.log('daySelectedMethodToCall what got here? myPayloadThing ~= Moment object no? ', myPayloadThing) // Yes. ok.


                /*
WORKS! 'Ta-da'. :o)
                */
                this.todayForListData = myPayloadThing // which is, daySelected (I believe) YEP.
                console.log('*** GOOD (method call) *** daySelectedMethodToCall() ********************* this.todayForListData now should be same as daySelected: ', this.todayForListData) // YEP


// TURNS OUT: No need to "refresh/mutate" the *list of movies*.
                // Instead, we just change the day and that's enough to trigger re-running of computed() filteredMovies(), here in MovieList.vue
                // It appears that the day variable now being made into not just a Prop (passed-in), but also as DATA property, then, Vue.js does the Whole Reactive Thing for you.
//                Yummy.

                // OLD NEWS: All right, we'll try it from here in a METHOD. (Goodness.)
                // no                var tempMoviesForMovieList = this.moviesForMovieList // ? boh
// no                this.moviesForMovieList = tempMoviesForMovieList // ? boh


/*   NO. SEE VUE WARN BELOW. ("Don't do it on a PROP. Do it on a DATA.")
                var mappedTempMoviesForMovieList = this.moviesForMovieList.map((eachMovie) => eachMovie) // just return, unchanged.
                console.log('mappedTempMoviesForMovieList: ', mappedTempMoviesForMovieList)
                this.moviesForMovieList = mappedTempMoviesForMovieList // ? boh-boh
*/
// Q. does any of the above trigger change on data/props such that computed() filteredMovies() re-runs? (With new selected day?) O la.
                // A. Yah!

                /* But: Interesting!
                "vue.common.js?e881:481 [Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "moviesForMovieList""
                 */
                /*
                Okay, next up, let's try this instead:
                 */
// All right. Interesting. NO NEED (!) to "change" the movies list:   Just the change on the day selected, is your trigger, for computed() filteredMovies() to re-execute.
//                I THINK
/* Not needed apparently:
                var mappedTempMoviesForMovieListData = this.moviesForMovieListData.map((eachMovie) => eachMovie) // just return, unchanged.
                console.log('mappedTempMoviesForMovieListData: ', mappedTempMoviesForMovieListData)
                this.moviesForMovieListData = mappedTempMoviesForMovieListData // ? boh-boh
*/



            },
          /* ******************************** */
          moviePassesGenreFilter(movie) {
          /* ******************************* */
              /*
               Throw (checked-off) e.g. 'Fantasy' against the Array of genres for this movie, using "indexOf()"... see if found or not:
               */
              if (this.genresmylist.length == 0) {
                  // No genres checked, no movies "match", so we just send back ALL the movies
                  return true
              } else {
                  // Input is String:     "Genre": "Documentary, History",
                  // Use String.split() to turn into Array: ['Documentary', 'History' ]
                  var thisMoviesArrayOfGenres = movie.movie.Genre.split(', ')

                  let matched = true

                  this.genresmylist.forEach((eachCheckedGenre) => {
                      if (thisMoviesArrayOfGenres.indexOf(eachCheckedGenre) === -1) {
                          matched = false // if the genre is NOT Found on this movie, set to false
                      } else {
                          // Else if the genre IS Found on this movie, leave 'matched' unchanged (still true)
                      }
                  })
                  return matched
              }
          },

            /* ******************************* */
            // LESSON 107 SLOTS
            // - refactoring from MovieItem (child)
            // up here to MovieList (parent)

            filteredMovieSessionsByDayByTimeMethod(movieSessionsMyThing) {
           /* ******************************* */
           /* Just to note it, you can Rename The Hell Out Of It, if you feel like it:
                // (movie.sessions) sent down (has to be correct)
                // but then here, I can Rename it to (movieSessionsMyThing) if'n I feel like it. Sheers.
                */
                return movieSessionsMyThing
                    .filter(this.sessionPassesTimeFilter)
            },


            // Just for some de-bugging:
            gimmeMovieSessionTimeCommented(movieSession) {
                console.log('WR__ -01- this ', this) // Vue$3 {_uid:14}
                console.log('WR__ -02- this.$root ', this.$root) // Vue$3 {_uid:1}
                // Note: In contrast to -C- and -D- below, here, -03- and -04- both work because ...
                // ...My "definedProperty" simply has the SAME NAME, albeit with a dollar sign, ('$moment') as the actual property: ('moment')
                // Whereas below (-C-, -D-) I gave the definedProperty a DIFFERENT NAME ('myBusVueProperty') (--on purpose, to test this out) Cheers.
                console.log('WR__ -03- this.$root.moment ', this.$root.moment) // ƒ hooks () { return hookCallback.apply(null, arguments);
                console.log('WR__ -04- this.$root.$moment ', this.$root.$moment) // ƒ hooks () { return hookCallback.apply(null, arguments);
                console.log('WR__ -05- this.$moment ', this.$moment) // ƒ hooks () { return hookCallback.apply(null, arguments);
                console.log('WR__ -06- this.moment ', this.moment) // undefined. Okay.

                // ======== (As seen on Overview.vue; just checkin' here too.)
                console.log('-A- this', this) // Vue$3 {_uid:13}
                console.log('-B- this.$root', this.$root) // Vue$3 {_uid:1}
                console.log('-C- this.$root.myBusVue', this.$root.myBusVue) // Vue$3 {_uid:0}
                console.log('-D- this.$root.$myBusVue', this.$root.$myBusVue) // undefined
                console.log('-C02- this.myBusVue', this.myBusVue) // undefined (NEED THAT .$root !
                console.log('-D02- this.$myBusVue', this.$myBusVue) // undefined
                console.log('-E- this.$root.myBusVueProperty', this.$root.myBusVueProperty) // undefined
                console.log('-F- this.$root.$myBusVueProperty', this.$root.$myBusVueProperty) // Vue$3 {_uid:0}   :o)
                console.log('-G- this.$myBusVueProperty', this.$myBusVueProperty) // Vue$3 {_uid:0}   :o)
                // ========
                return this.$moment(movieSession.time).format("h:mm A")
            },
            gimmeMovieSessionTime(movieSession) {
                console.log('WR__ -99- movieSession.time, plain y not: ', movieSession.time) // 2017-09-12T17:30:00.000Z
                return this.$moment(movieSession.time).format("h:mm A")
            },



            /* ******************************* */
            sessionPassesTimeFilter(session) {
            /* ******************************* */

                /* *********
                 ROUTER-VIEW VIZ. CERTAIN PROPERTIES ...
                 Quite interesting. (LESSON 101)
                 When NOT in the vue-router, <router-view>, the below line DID WORK, with simply myBus:
                 !this.todayForList.isSame()...
                 Then, when IN the vue-router and <router-view>, todayForList was undefined; needed to use:
                 !this.$moment().isSame()...

                 (See also Overview.vue re: myBus)
                 */

// YES works
// if (!this.$moment().isSame(session.time, 'day')) {
                // Yes: (also)
                console.log('sessionPassesTimeFilter() (top). this.todayForList is: ', this.todayForList)
                console.log('sessionPassesTimeFilter() (top). this.todayForListData is: ', this.todayForListData)
/* PROP:
                if (!this.todayForList.isSame(session.time, 'day')) {
*/
/* DATA: */
                if (!this.todayForListData.isSame(session.time, 'day')) {
                    console.log('NOT TODAY, OR, NOT SELECTED DAY, KID')
                    return false
                }
                /*
                 Okay, now we have Sessions only for today. Good.
                 Next up, check if the "By Time" checkboxes are either 1) both empty or 2) both checked.
                 Interestingly, either of those means, "Pass through ALL movies". Cheers:
                 */
                else if (this.timesmylist.length === 0 || this.timesmylist.length === 2) {
                    return true
                }
                /*
                Okay, now finally time to see, if one (and only one) time checkbox filter is checked, which it is: (before, or after, 6pm):
                */
                else if (this.timesmylist[0] === myFrozenTimes.BEFORE_6PM) {
                    if (this.$moment(session.time).hour() < 18) {
                            console.log('SAME AS TODAY BABY *AND* PASSES BEFORE 6pm :o) ')
                            return true
                    }
                }
                else if (this.timesmylist[0] === myFrozenTimes.AFTER_6PM)
                {
                    if (this.$moment(session.time).hour() >= 18)
                    {
                        console.log('SAME AS TODAY BABY *AND* PASSES AFTER 6pm :o) ')
                        return true
                    }
                } else { // Should Not Get Here
                    console.log('SOMETHING WHACK ?')
                    return false
                }
            }
        },
        computed: {
            /* ******************************* */
            filteredMovies() {
            /* ******************************* */
                console.log('Here we are in the computed() filteredMovies(). La. ')
                console.log('this.moviesForMovieList PROP ', this.moviesForMovieList)
                console.log('this.moviesForMovieListData DATA (BEFORE?) ', this.moviesForMovieListData) // << ** INITIAL TIME - this *IS* Empty. okay
                // (Subsequent runs (after day select clicks), it is not empty, it contains what it had from earlier fill-up, namely, yeah, all the movies. cheers.)

/* Not needed, apparently:
                this.moviesForMovieListData = this.moviesForMovieList // wham the PROP onto the DATA (?)
                console.log('this.moviesForMovieListData DATA (AFTER?) ', this.moviesForMovieListData)
*/





                return this.moviesForMovieList // << PROP
//                return this.moviesForMovieListData // << DATA (from that PROP)
                // 1st spin:
                    .filter(this.moviePassesGenreFilter)
                    // 2nd spin:
                    // For each movie, iterate its sessions.
                    .filter((movie) => {
                        return movie.sessions.find(this.sessionPassesTimeFilter)
                        })
            },
            noResults() {
                    /*
                    Inputs: timesmylist, genresmylist
                    e.g.
                    [ "After 6pm" ]
                    [ "Animation", "Crime", "Drama" ]

                    Desired Output:
                    Whatever is in those Arrays, as one well-behaved Strings (viz. commas, etc.):
                     After 6pm, Animation, Crime, Drama
                    */

                    // WR__ CODE-MODE: ;o) Works.

                    var myTextListTimesGenres = ''
                    this.timesmylist.forEach((timeText) => myTextListTimesGenres += timeText + ', ')
                    this.genresmylist.forEach((genreText) => myTextListTimesGenres += genreText + ', ')
                    myTextListTimesGenres = myTextListTimesGenres.substring(0, myTextListTimesGenres.length-2)
                      return myTextListTimesGenres



                    // INSTRUCTOR CODE:
                    // ARRAY "joins the elements of an array into a string, and returns the string"
                    let instructorTimesString = this.timesmylist.join(', ')
                    let instructorGenresString = this.genresmylist.join(', ')

                    // Ye Olde ternary expression
                    // To put or not to put that comma after any (if any) "times" listing. Cheers.
                // YEP!
                // return `No results (sez Instructor) for ${instructorTimesString}${instructorTimesString.length === 0 ? '' : ', '}${instructorGenresString}`
                } // /noResults()
        }, // /computed()
        created() {
            // No Longer The Case! --> Nothing here anymore... (what was here?) Maybe this console.log was just a test. Okay.
            console.log('Moment object, from Root Component, seen here in Child Component MovieList.vue (without importing Moment.js) ', this.$moment)
            /*
              ƒ hooks () {
             return hookCallback.apply(null, arguments);
             }
             */

            // LESSON 105
/* "ATTEMPT 'A.'" (Failed)
 // We never get in here, never "hear" that event:
            this.$myBusVueProperty.$on('overviewCreatedMoviesFromAPI', function(allThoseMovies) {
*/

/* "ATTEMPT 'B.'" (This WORKED (!), Here Anyway - (not on Detail.vue))
* Note: Here in MovieList, this is just sort of a test. We do not USE this data, here. */
            this.$myBusVueProperty.$on('overviewCreatedMoviesFromAPIPostGet', function(allThoseMovies) {

                /* Hmm - YES, here in MOVIELIST we DO SEE this: (cf. DETAIL.VUE, where it is not seen)
                 I guess, since this MOVIELIST components gets "created()" ?at same time as? its parent OVERVIEW, the "created()" Event from Overview gets triggered in time such that this listener is here in time to get the event being Emitted.
                 Bon.
                 I guess.

                 Further Info:
                 Not a bad guess.
                 - In Console I see:
                 -- Main.js first
                 -- Main.js (with its imported routes.js) knows what Component to put in <router-view>
                 -- e.g. for '/' we get Overview.vue next
                 -- Overview.vue does its thing, including bringing in child Components (e.g. MovieList.vue)
                 -- MovieList.vue created() next
                 ---  That of course means these .$on listeners are set up, right then. Good.
                 -- Back to main.js for the Asycn API Call (our "# 2" Main.js API call)
                 -- That event of the Main.js API Call is "heard" on our MovieList.vue listener. very good.
                 -- We get the data onto MovieList. great.
                 */
                console.log('MOVIELIST?? $on hmm allThoseMovies ? ', allThoseMovies)
//       n/a here:         this.moviesHereInDetail = allThoseMovies // whamma-jamma
            })

            /* "ATTEMPT 'B99.'" Get movies from MAIN.JS API call via Event Bus
             20170915-0649
>>       YES. Here on MovieList, this IS SEEN. (Note: We don't USE this, here. Just looking at it.)
>>       (But, as above on ATTEMPT 'B.', on Detail.vue it is NOT SEEN.)
             */
            this.$myBusVueProperty.$on('mainCreatedMoviesFromAPIPostGet', function(allThoseMovies) {
                console.log('MOVIELIST $on hmm allThoseMovies FROM MAIN 2nd API CALL as EVENT BUS ? ', allThoseMovies) //
                //
// n/a here in MovieList >> this.moviesHereInDetail = allThoseMovies // whamma-jamma

            })

            // LESSON 112
            /* Okay! A *THIRD* WAY to do this .$on listener stuff!
            All we are doing is following the Instructor code ~04:26:
            We re-factor our called method for this out to the /UTIL/MYBUS.JS file.
            Should work like a charm ;o)
            */
// $$$  -03- $$$ CALL A METHOD (/UTIL/MYBUS.JS)  $$$$$$$$$$$$$$$
            console.log('SECOND WAY (note) (NEEDS this. It is a METHOD on this component. okay.) this.daySelectedMethodToCall from HERE in MovieList.vue ', this.daySelectedMethodToCall)
            console.log('THIRD WAY (NO this. It is a method on an IMPORTED .JS): daySelectedMethodUtilBusToCall from /util/mybus ', daySelectedMethodUtilBusToCall)
// Nope:    this.$myBusVueProperty.$on('daySelectedEventCallAMethodUtilBus', this.daySelectedMethodUtilBusToCall.bind(this)) // << No!  If you put a 'this.' here in front of the (imported) method name, it BREAKS!
            this.$myBusVueProperty.$on('daySelectedEventCallAMethodUtilBus', daySelectedMethodUtilBusToCall.bind(this))

            // LESSON 111
            /*
            The .$emit out to the bus comes from DaySelect.vue like so:
              this.$myBusVueProperty.$emit('daySelectedEvent', this.selectedDay)
             */
            /* ******* YES WE *ARE* USING THIS: method() ************ */
// $$$  -02- $$$ CALL A METHOD (HERE)  $$$$$$$$$$$$$$$
            console.log('SECOND WAY this.daySelectedMethodToCall from HERE in MovieList.vue ', this.daySelectedMethodToCall)
// Nope!    this.$myBusVueProperty.$on('daySelectedEventCallAMethod', daySelectedMethodToCall.bind(this)) // << If you FAIL to put a 'this.' in front of the method (that belongs to this component's methods: {}), it BREAKS!
            this.$myBusVueProperty.$on('daySelectedEventCallAMethod', this.daySelectedMethodToCall.bind(this))
 /* I followed this example, from Overview.vue: esp. re: use of .bind(this)

            this.myBusVueDataPropNew.$on('check-filter-child-event-bus', myUtilRootCheckFilterBusMethod.bind(this))
*/

            // This "in-line" function was NOT doing it for me. We'll try calling a function (above) instead.
            /* ******* Wrong, son. >> NO - WE ARE *NOT* USING THIS: in-line funct ************ */
            // ******* NEWS FLASH. You *can* use this.
            // Anonymous function (not "in-line")
            // function() {}.bind(this)   // << who knew. put the damned .bind() right off the closing curly brace. hot damn. works.
// $$$  -01- $$$ ANONYMOUS FUNCT $$$$$$$$$$$$$$$
            this.$myBusVueProperty.$on('daySelectedEvent', function(daySelected) {

                console.log('daySelectedEvent, what is this? ', this) // Vue$3 {_uid:0} << People, we are ON THE BUS!
                console.log('daySelectedEvent, what is this.$myBusVueProperty? ', this.$myBusVueProperty) // undefined

                console.log('$ON daySelectedEvent daySelected: ', daySelected) // << YEP. Moment object, for the day the user clicked on. Bon.
                // whamma the Moment object received
                // onto our Prop here (its default value had been a Moment object for "today")

                /* Q. Why no Vue Warn re: mutation of PROP 'todayForList' ? (We had warning doing so on moviesForList. hmm.)
*/
//                this.todayForList = daySelected
//                console.log('this.todayForList now should be same as daySelected: ', this.todayForList)
                // Now, whamma onto a DATA property instead of a PROP:
                this.todayForListData = daySelected

                console.log('**** BAD (no method call) *********************** this.todayForListData now should be same as daySelected: YES, IT IS ', this.todayForListData) // << YEP. TRUE. YES. (double-checked) at least on CONSOLE.LOG!
                /* 2017-09-18-0749:
                BUT - in Vue inspector, the Component MOVIELIST.vue
                still has UNCHANGED:
                 todayForListData:"2017-09-18T11:41:16.865Z"
                 Why?
                 Don't know.
                 ---- (interlude) ---
                 Ah, damn. Once again, it is all about "this."
                 sigh.
                 My 'this' right here is the BUS. Vue$3 {_uid:0}
                 OK, "broke the code" (once again. sigh.)
                 Vue inspector:
                 <Root> | data | myBusVueDataName | Object | todayForListData
                 Sheesh.
                 I thought I was updating/modifying the MOVIELIST "todayForListData", but I WAS WRONG about that!!!
                 I was simply sticking an object onto my BUS.
                 And Vue.js nor JavaScript nor server nor browser was complaining about any of that.
                 oh bother.

                 So, can I get from the "this" being the BUS, to be able to reference the "this" that is the component I am on? (MovieList.vue)
                 Hmm.

                 It is looking to me like the answer is:
                 Hey. Once you get on the BUS (.$emit, .$on), your 'this' has become the BUS, which is Vue$3 {_uid}, and that bad boy has NO "$root" or "$parents" etc etc. that I can see. It is a sort of orphan unconnected Vue instance floating there in space.
                  You can NOT expect to (directly (?)) reference the other Vue instances (like Root, MovieList etc) from this damned BUS.
                  So what do you do?
                  Well, like I did, you, from inside your .$on listener, you CALL OUT to Methods, and you use .bind(this) to GET STUFF TO WORK.
                  By god & golly.
                */

                /* Problem:
                Above is working viz. correct Moment object does get here, but no reactive data anything. Nothing changes. Hmm.

                Maybe ... seems that... just whamma a new value on a Prop... doesn't trigger reactive etc. ... inside of a computed() (i.e. our "filteredMovies()")... when the Prop is not actually (lexically) inside that computed(), but is instead further buried in a method called by/from that computed(). Hmm. Hmm.

                I need for the new value in 'todayForList' (which is now the user-selected day, e.g. Tue 09/19) to get re-run through the second filter 'sessionPassesTimeFilter. How to do? I thought it would/might happen automatgically, thanks to reactive Vue, computed() property, and all that jazz. Hmm.
                */
                /* Q. Do I have to goose/(re)-call/invoke the computed() property filteredMovies() myself? seems odd
                 A. No!: "vue.common.js?e881:568 TypeError: this.filteredMovies is not a function"
                this.filteredMovies() // << ??

                 "vue.common.js?e881:481 [Vue warn]: Error in event handler for "daySelectedEvent": "TypeError: this.filteredMovies is not a function""
               this.filteredMovies // << ??

                 Q.2. Howzabout I here in code explicitly run a method to do the same? (as filteredMovies()) ? Hmm.
                A.2. ?? (provisional) ?? - That is not sounding right.
                Something like: re-paste in (non-D.R.Y.) code like:
                (But, how would this work? where are we sending the results? on to our computed() property "filteredMovies" ? Seems v. unlikely ...
                ------------
                 return this.moviesForMovieList
                 // 1st spin:
                 .filter(this.moviePassesGenreFilter)
                 // 2nd spin:
                 // For each movie, iterate its sessions.
                 .filter((movie) => {
                 return movie.sessions.find(this.sessionPassesTimeFilter)
                 })
                 ------------

                Q.3. How about I .$emit another, subsequent event. To be listened to by this same component (MovieList), which hopefully will trigger re-running filteredMovies() ?
                A.3. provisional - worth a try.
                A.3. Well, I am unable here inside of an event handler function, to access that (durned) bus, it seems. this.$myBusVueProperty and this.$root.$myBusVueProperty don't work. hmm.

                */
                // Hmm, does slinging the payload around of a Prop really work? Dunno.
                // "vue.common.js?e881:568 TypeError: Cannot read property '$emit' of undefined"
         // Nope:       this.$myBusVueProperty.$emit('weGotNewTodayForList', this.todayForList)
         // Nope:      this.$root.$myBusVueProperty.$emit('weGotNewTodayForList', this.todayForList)
                // People, we are ON THE BUS, so, just call .$emit already!
                // Not Working For Me: This experiment in $EMITTING off the 1st $ON, to listen for it on a 2nd $ON. Quite the cwazy pattern. yeesh.)
                // NEWS FLASH: Hey! Got this to work.
                // function() {}.bind(this)   // << who knew. put the damned .bind() right off the closing curly brace. hot damn. works.

                // btw - this god damned tail-chase of $emit from inside a $on to a 2nd $on - I ain't even using this stuff any more. See Ya.
                // I don't believe ANY of that console.logging below gets run and so forth. Don't know. At this point, don't care much neither. (whew)
                this.$emit('weGotNewTodayForList', this.todayForList)
            }.bind(this))

            this.$myBusVueProperty.$on('weGotNewTodayForList', function() {
                // hmm. am i chasing my tail? sheesh.
                // need to get computed() filteredMovies() to re-run the method
                // sessionPassesTimeFilter(), with the just-updated todayForList
                // Wish us luck
                // Feels like we're in the Wrong Place. (sigh)
                // Looks like the only piece of data filteredMovies() is "watching" would be
                // the Prop (not data{}) 'moviesForMovieList'
                // What if I slightly alter it? Does filteredMovies() wake up and execute??
                console.log('weGotNewTodayForList (2nd .$on listening to .$emit  here in 1st .$on) > this ? ', this) // Da Bus! (whoa) Vue$3 {_uid:0}
                console.log('this.moviesForMovieList: ', this.moviesForMovieList) // undefined. hmm
// no                var tempMoviesForMovieList = this.moviesForMovieList // ? boh
// no                this.moviesForMovieList = tempMoviesForMovieList // ? boh

                // Because it is UNDEFINED (yeesh), .map() don't work none:
//                var mappedTempMoviesForMovieList = this.moviesForMovieList.map((eachMovie) => eachMovie) // just return, unchanged.
//                console.log('mappedTempMoviesForMovieList: ', mappedTempMoviesForMovieList)
//                this.moviesForMovieList = mappedTempMoviesForMovieList // ? boh-boh
            })

        }
    }
</script>
