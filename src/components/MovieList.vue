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
                            <div v-for="movieSession in filteredMovieSessionsByDayByTimeMethod(movie.sessions)" class="session-time-wrapper">
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
                // Need to reconsider the code, refactor ? from todayForList to todayForListData everywhere. Hmm. Not so sure about that...
                todayForListData: this.todayForList, // gonna work? gonna fail? likely latter
//                todayForListData: this.$moment() // declare here too a "DATA" version, for the PROP. Why? So in code below we can change the value. OK on DATA, not OK on PROP. Cheers.
            }
        },
        components: {
            'movie-item': MovieItem,
        },
        methods: {
            daySelectedMethodToCall(myPayloadThing) {
                // TODO
                console.log('daySelectedMethodToCall what got here? myPayloadThing ~= Moment object no? ', myPayloadThing) // Yes. ok.


                /*

                */
                this.todayForListData = myPayloadThing // which is, daySelected (I believe)
                console.log('****** daySelectedMethodToCall() ********************* this.todayForListData now should be same as daySelected: ', this.todayForListData)



                // All right, we'll try it from here in a METHOD. (Goodness.)
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
                var mappedTempMoviesForMovieListData = this.moviesForMovieListData.map((eachMovie) => eachMovie) // just return, unchanged.
                console.log('mappedTempMoviesForMovieListData: ', mappedTempMoviesForMovieListData)
                this.moviesForMovieListData = mappedTempMoviesForMovieListData // ? boh-boh



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

                this.moviesForMovieListData = this.moviesForMovieList // wham the PROP onto the DATA (?)
                console.log('this.moviesForMovieListData DATA (AFTER?) ', this.moviesForMovieListData)





//                return this.moviesForMovieList // << PROP
                return this.moviesForMovieListData // << DATA (from that PROP)
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
            // Nothing here anymore... (what was here?) Maybe this console.log was just a test. Okay.
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

            // LESSON 111
            /*
            The .$emit out to bus from DaySelect.vue like so:
              this.$myBusVueProperty.$emit('daySelectedEvent', this.selectedDay)
             */

            this.$myBusVueProperty.$on('daySelectedEventCallAMethod', this.daySelectedMethodToCall.bind(this))
 /* (I followed this example, from Overview.vue:
            this.myBusVueDataPropNew.$on('check-filter-child-event-bus', myUtilRootCheckFilterBusMethod.bind(this))
*/

            // This "in-line" function was NOT doing it for me. We'll try calling a function (above) instead.
            this.$myBusVueProperty.$on('daySelectedEvent', function(daySelected) {

                console.log('daySelectedEvent, what is this? ', this) // Vue$3 {_uid:0} << People, we are ON THE BUS!
                console.log('daySelectedEvent, what is this.$myBusVueProperty? ', this.$myBusVueProperty) // undefined

                console.log('$ON daySelectedEvent daySelected: ', daySelected)
                // whamma the Moment object received
                // onto our Prop here (its default value had been a Moment object for "today")

                /* Q. Why no Vue Warn re: mutation of PROP 'todayForList' ? (We had warning doing so on moviesForList. hmm.)
*/
//                this.todayForList = daySelected
//                console.log('this.todayForList now should be same as daySelected: ', this.todayForList)
                this.todayForListData = daySelected
                console.log('*************************** this.todayForListData now should be same as daySelected: ', this.todayForListData)

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
                this.$emit('weGotNewTodayForList', this.todayForList)
            })

            this.$myBusVueProperty.$on('weGotNewTodayForList', function() {
                // hmm. am i chasing my tail? sheesh.
                // need to get computed() filteredMovies() to re-run the method
                // sessionPassesTimeFilter(), with the just-updated todayForList
                // Wish us luck
                // Feels like we're in the Wrong Place. (sigh)
                // Looks like the only piece of data filteredMovies() is "watching" would be
                // the Prop (not data{}) 'moviesForMovieList'
                // What if I slightly alter it? Does filteredMovies() wake up and execute??
                console.log('this ? ', this) // Da Bus! (whoa) Vue$3 {_uid:0}
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
