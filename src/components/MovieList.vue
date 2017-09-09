<template>
    <div id="movie-list">
<!--  WR__ FIRST GO:

(REVERTED FILE: 2017-09-05
https://github.com/wreilly/vuejs-cinema/blob/master/src/components/MovieList.vue )

        <div v-for="movie in filteredMovies" class="movie">
            <p>
                Filtered Movie! {{ movie.movie.Title }}
            </p>
&lt;!&ndash; Vue Magic:
1) You use kebab-case HERE in template/markup/HTML.
2) Vue "magically" gives you camelCase of SAME THING over in receiving Component's props: ['camelCase'].
Cheers.
            https://vuejs.org/v2/guide/components.html#camelCase-vs-kebab-case
&ndash;&gt;
            <movie-item v-bind:movie-item-thing-foo-bar="movie"></movie-item>
        </div>
-->


        <!-- WR__ SECOND GO (per INSTRUCTOR APPROACH. Va bene.
         Basically, drop the div wrapper, make it directly the child component movie-item that you put the v-for directive on, the prop, etc.
         (btw: move the class="movie" from here down to the MovieItem.vue. Bon.)
         Cheers.
         -->

        <div>
            <div v-if="moviesForMovieList.length === 0" class="no-results">
                <p>Loading yer films...!</p>
            </div>
            <div v-else>
                <div v-if="filteredMovies.length === 0" class="no-results">
                    <p>Too stringent, my friend! Let up, let the movies IN to your life!</p>
                    <p>You're insisting on:</p>
                    <ul>
                        <li v-for="genremylist in genresmylist">{{ genremylist }}</li>
                    </ul>
                </div>
                <div v-else>
                    <div>Today! {{ todayForList }}</div>
                    <movie-item
                            v-for="movie in filteredMovies"
                            v-bind:movie-item-thing-foo-bar="movie.movie"
                    v-bind:movie-sessions="movie.sessions"
                            v-bind:timesmylist-for-item="timesmylist"
                    v-bind:today-for-item="todayForList"></movie-item>
                </div>
            </div>
        </div>
<!-- INSTRUCTOR CODE MODE:  uses v-if-else   very groovy

           <div v-if="filteredMovies.length">
              <movie-item v-for="movie in filteredMovies" v-bind:movie-item-thing-foo-bar="movie.movie"></movie-item>
           </div>
           <div v-else-if="moviesForMovieList.length">
           // << tiny bit counterintuitive, that your movies array is not empty but we are telling them "No results!"  Here's why:
           // If 1) filtered is empty, but 2) movies is NOT empty, then
           //   3) it is time to tell user "No results" on your wild & crazy user filtering:
             <p>No results!</p>
           </div>
           <div v-else>
           // filtered is empty AND movies itself is empty, so: Loading!
              <p>Loading...</p>
           </div>
-->

        <div>
            <p>Hey Checked Genres Why Not</p>
            <div v-for="genre in genresmylist">Checked Genre Title: {{genre}}</div>
        </div>
    </div>
</template>

<script>
    import myFrozenGenres from '../util/genres'
    import MovieItem from './MovieItem.vue'
    import myFrozenTimes from '../util/times' // << plural. (cf. time singular, array in main.js data: {})

    export default {
        /* Ah. Problem. (again)
        "vue.common.js?e881:487 [Vue tip]: Prop "moviesformovielist" is passed to component <MovieList>, but the declared prop name is "moviesForMovieList". Note that HTML attributes are case-insensitive and camelCased props need to use their kebab-case equivalents when using in-DOM templates. You should probably use "movies-for-movie-list" instead of "moviesForMovieList"."
        OY!
        The ABOVE coulda-shoulda read:
        "You should probably use "movies-for-movie-list" instead of "moviesForMovieList" >>IN THE COMPONENT THAT IS PASSING THE PROP.<< BUT NOTE THAT HERE, WHERE THE PROP IS DECLARED/RECEIVED, YOU CAN/SHOULD >>CONTINUE TO USE<< "MovieForMovieList". DON'T CHANGE IT, HERE. JUST, THERE. *ONE* CHANGE, NOT *TWO* CHANGES.
        JESUS H. CHRIST.
        */

/*
        What (The Hell) is "genre" (and "genresmylist"), please:
    (STUPID NAME)
 // Array 'genre' will contain the "title" (ooffaa - stupid word) of the GENRE .
 // NO. >>the movies that match the CHECKED genres...

    // Our "category" argument carries the hard-coded string value "genre", which matches the name of this data array:
    genre: [], // sent as props down to movie-list as genresmylist.

 LESSON 94. Time to add the time[] array to props passing here (e.g. ['Before 6 pm']   Following odd naming convention of mine, calling it timesmylist. Cheers.

 */

    props: ['genresmylist', 'timesmylist', 'moviesForMovieList', 'todayForList' ],
        data: function() {
            return {
                /* Super-Duper-Seded by 'movies-for-movie-list'
No: >> 'moviesForMovieList'
which comes as props from Root instance where it is known as 'moviesFromAPI'. Cheers.

                movies: [
                    { title: 'Hannah and Her Sisters', genre: myFrozenGenres.DRAMA },
                    { title: 'Pulp Fiction', genre: myFrozenGenres.CRIME },
                    { title: 'Nan the Destroyer', genre: myFrozenGenres.CRIME },
                ]
*/
            }
        },
        components: {
            'movie-item': MovieItem,
            // NOPE: >> MovieItem: 'movie-item'
            /* Yeah, yeah. INSTRUCTOR CODE:
            // ES6:
            MovieItem
            //  ES6. Hmmph. Works great. Sheesh.

            // More "Vue Magic"
            // Automatically gives you "ProperCase - to - kebab-case" transmogrification. Cain't beat it.
            */
        },
        methods: {
          /* **************************************** */
          moviePassesGenreFilter(movie) {
          /* **************************************** */
              if (this.genresmylist.length == 0) {
                  // No genres checked, no movies "match", so we just send back ALL the movies

                  /*
                  Huh. Little update.
                  We may well need to take a look at the other dimension now: session times!
                  If time [] array is ALSO empty, okay, send 'em all. But if it isn't .... TODO
                  if (this.timesmylist.length === 0) {
                    // No "By time" checked, so let 'em ALL through...
                    return true //....
                  }
                  */

                  return true // this.moviesForMovieList
              } else {
                  console.log('wtf -01- is in this.genresmylist ', this.genresmylist)
                  console.log('wtf -02- is in this.timesmylist ', this.timesmylist)
                  /*
                   wtf is in this.genresmylist  (3) ["Horror", "Fantasy", "Documentary", __ob__: Observer]
                   wtf -01- is in this.genresmylist  ["Comedy", "Animation", __ob__: Observer]
                   wtf -02- is in this.timesmylist  ["After 6pm", "Before 6pm", __ob__: Observer]
                   */
                  console.log('NEW 77 genresmylist, movie.movie.Genre: ', this.genresmylist + ' - ' + movie.movie.Genre + ' - ' + movie.movie.Title)

                  var thisMoviesArrayOfGenres = movie.movie.Genre.split(', ')

                  let matched = true

                  console.log('NEW 66 genresmylist, thisMoviesArrayOfGenres: ', this.genresmylist + ' - ' + thisMoviesArrayOfGenres)

                  this.genresmylist.forEach((eachCheckedGenre) => {
                      console.log('NEW 66A eachCheckedGenre: ', eachCheckedGenre  + ' - ' + thisMoviesArrayOfGenres)

                      if (thisMoviesArrayOfGenres.indexOf(eachCheckedGenre) === -1) {
                          /*
                          ===============
                          BROKE THE CODE (SHEESH)
                          Sita Sings The Blues
                          thisMoviesArrayOfGenres: ['Animation', 'Comedy', 'Fantasy']
                          eachCheckedGenre: 'Fantasy'

                          So - you throw 'Fantasy' against that Array, viz. "indexOf()" and YES, it is found. Cheers.
====================
                          */
                          console.log('33A -1 NOT FOUND?! eachCheckedGenre, thisMoviesArrayOfGenres ', eachCheckedGenre, thisMoviesArrayOfGenres )


                          /* Incorrect WR__ interpretation ?? ? << YAH! INCORRECT! (Yeesh)
                          You were reading it the OTHER WAY ROUND.
                          BAD:
                           ? >> ... Here, ONE of the movie's short list of tagged genres does NOT appear in the list of CHECKED Genres.
                          Hmm. But that on its own ought not knock the movie out... Only if ALL the movie's own genre tags fail to meet ANY of the checked Genres. THEN we would expect this movie to be filtered out, not included.
                           Hmm.

                           e.g.
                           The Corporation
                           genres: Documentary, History
                           Checked: Horror
So should not be included
But if Checked is History, should be included

                           */
                          matched = false
                      } else {
                          console.log('22A NOT-1 IS ?? FOUND?! eachCheckedGenre, thisMoviesArrayOfGenres ', eachCheckedGenre, thisMoviesArrayOfGenres )

                      }
                  })
                  return matched

/* Hmm. Nah. WR__ approach ... Hmm.
                  return thisMoviesArrayOfGenres.find(this.moviePassesOneGenreMatches)
*/

              }
          }, // /moviePassesGenreFilter()

/* Hmm. Nah. WR__ approach ... Hmm. */
/* NOT USED:
            moviePassesOneGenreMatches(movieGenreToTest) {
              console.log('whoa 55 movieGenreToTest: ', movieGenreToTest)
              console.log('whoa 44 this.genresmylist: ', this.genresmylist)
              if (this.genresmylist.includes(movieGenreToTest)) {
                  console.log('Yu-huh!')
                  return true
              }

//              return this.genresmylist.includes(movieGenreToTest)
          }
*/


            /* **************************************** */
            sessionPassesTimeFilter(session) {
            /* **************************************** */
                // Invoked by find(), on movie.sessions Array; passes one session at a time
                // console.log('!! session is ', session)
                /*
                 !! session is  {__ob__: Observer}
                   id: "tt1172203_0"
                   seats: 185
                   time: "2017-09-06T13:00:00.000Z"
                 */

                // initial testing:
                // (short circuit other testing)
               // return true

                console.log('wtf -02-SESSIONSFILTER- is in this.timesmylist ', this.timesmylist)

                /*  LESSON 94 ~08:52
                $$$$   INSTRUCTOR CODE (!) $$$$$$$$$$$$$$$$

                if (!this.day.isSame(this.$moment(session.time), 'day')) {
                    return false;
                } else if (this.time.length === 0 || this.time.length === 2) {
                    return true
                } else if (this.time[0] === times.AFTER_6PM) {
                    return this.$moment(session.time).hour() >= 18
                } else {
                    return this.$moment(session.time).hour() < 18
                }
                $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
     */

                /* Bit o' ~pseudocode~spec~ sorta: 01
                0) movie.sessions contains lots of sessions, over many days
                1) for this filter, we want first off, only movies from TODAY
                  1.A.) Hmm, we have already done that once ... in the MovieItem.vue method/computed:
- filteredMovieSessionsByDayMethod(movieSessions)                   - filteredMovieSessionsByDayComputed()
              But here, I guess, we are already in the middle of a find() iteration over the array, so the logic to "filter" will just be an if() statement.
              So we'll test using Moment's "day"  ??? ... ?
              Because we know (!?) we cannot expect to use Moment's .isSame() test, inside of an if(), right? ?? ?? ?
              Hmm.

              What the hey?
              This if() statement DID work, with moment.isSame(). Huh?
              MOVIEITEM.VUE:
                 if (this.$root.moment(eachMovieSession.time).isSame(this.todayForItem), 'day') {
                 // This IF check is NOT WORKING
                 // ALL items are passing. Not right.

              MOVIELIST.VUE: (here)
                 if (this.$moment().isSame(session.time, 'day')) {
                 // YES - WORKS! (?) << Hmm, maybe not ... I re-started npm run start the server; that generated new session times (based on today etc); getting different results
                 console.log('SAME AS TODAY BABY') ...

*/

                /* New Insight. Whoa.
                This if() test is NOT to do the 'return' from.
                This if() test is just to see: "Should this movie be filtered in? Selected? Sent for further processing to MovieItem.vue?"
                That is, for starters, does this movie have ANY sessions that simply fall into TODAY?
                If yes (even just one), then YES it IS filtered in, it IS Selected, it IT sent for further processing to MovieItem.

                Next up will be further test: "Does this movie have ANY sessions that fall into the requested timeframe, whichever that is: of either "Before 6 pm" OR "After 6 pm"?
                As before, if yes (even just one), then again YES it IS filtered in... sent to MovieItem.
                Recall: MovieItem will do its own processing.
                First off, MovieItem will ONLY show session times for TODAY. (Recall, right now, we are only offering the user an implied, hard-coded, "Today". We don't yet have, "see movies for tomorrow, next day, etc.)
                Then, for that "Today" selection of movie session times, in fact, MovieItem will DISPLAY *ALL* the session times for today, EVEN IF the user clicked on "Before 6 pm". It will DISPLAY times, for today, for that movie even AFTER 6 pm.
                The point is, the movie in question DOES have at least one session "Before" 6 pm and THAT is why it is being filtered in, being selected, being displayed as a movie item.
                But once that movie item is being displayed, it is going to display all its information about sessions.
                (It is NOT going to show you only the sessions for the timeframe you indicated. Not going to show you only the "Before 6 pm" sessions, for example. Bon.)
                */


                /* "todayForList"
                (and, over in MovieItem.vue - "todayForItem")
                These are Moment objects.
                So you can use here directly to "test for today"
                How we got here:
                - main.js: day: moment() // << TODAY! :o)
                - Passed as props through index.html to <movie-list> as today-for-list,
                - hence from MovieList.vue to <movie-item> as today-for-item
                */

// YES works    if (!this.$moment().isSame(session.time, 'day')) {
                if (!this.todayForList.isSame(session.time, 'day')) {
// YAH. SAME:   if (!this.$root.moment().isSame(session.time, 'day')) {
                    console.log('NOT TODAY KID')
                    console.log('session.time: (just as String) ', session.time)
                    return false
                    /*
                     console.log('session.time: ', session.time)
                     // 2017-09-08T15:15:00.000Z (String merely)
                     console.log('this.$moment(session.time): ', this.$moment(session.time))
                     // Moment object. okay. What you need.
                     */


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
                    console.log('Made it this far: -01- BEFORE Test')
                    // WR__ mode: Is *NOT* Working. (good grief - BAD assumption of how this would work)
                    //  if (this.$moment(session.time).isBefore(this.$moment().hour(18))) {

                    // Better: Instructor code:
                    if (this.$moment(session.time).hour() < 18) {
                            console.log('SAME AS TODAY BABY *AND* PASSES BEFORE 6pm :o) ')
                            return true // session is before 6pm :o)
                        }
                }

                /*  Here is the AFTER 6pm test.
                    (Coulda been just an else {})
                */
                else if (this.timesmylist[0] === myFrozenTimes.AFTER_6PM)
                {
                    console.log('Made it this far: -02- AFTER test')
                    // Instructor Code: (let's use it)
                    if (this.$moment(session.time).hour() >= 18)
                    // WR__ mode: Is *NOT* Working. (good grief - BAD assumption of how this would work)
//                    console.log('WR__ mode this.$moment().hour(18) What Does That Yield/Return/Give? ', this.$moment().hour(18)) // << Seems to just give the moment() of NOW Moment object. Nothing to do with setting any "hour 18" as far as I can tell.
//                    if (this.$moment(session.time).isSameOrAfter(this.$moment().hour(18)))

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
            /* **************************************** */
            filteredMovies() {
            /* **************************************** */
                // -----------
                // SEE "INSTRUCTOR CODE" at BOTTOM. Gracias.
                // -----------
/* Move this "empty array" check to method moviePassesGenreFilter()

                if (this.genresmylist.length == 0) {
                    return this.moviesForMovieList
                } else {
*/
//                    console.log('wtf this.genresmylist or bust: ', this.genresmylist)
//                    console.log('wtf this.moviesForMovieList or bust: ', this.moviesForMovieList)
                return this.moviesForMovieList
                // 1st spin:
                    .filter(this.moviePassesGenreFilter)
                    // 2nd spin:
                    // For each movie, iterate its sessions. find() returns truthy.
                    .filter((movie) => {
                            console.log('Hey 2nd filter, and movie.movie.Title is: ', movie.movie.Title)
                        // Hey 2nd filter, and movie.movie.Title is:  The Corporation
                           // console.log('Hey 2nd filter, and movie.sessions is: ', movie.sessions)
                        /*
                         MovieList.vue?b766:285
                         Hey 2nd filter, and movie.sessions is:
                         (25) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, __ob__: Observer]
                         0:
                         id: "tt0379225_0"
                         seats: 175
                         time: "2017-09-07T15:15:00.000Z"
                         */

                        /* Another (fine) insight:
                        Q. Okay, why do we use find() here?
                        A. Because, our filter is SATISFIED as soon as it finds the FIRST that passes.
                        We do not need really need to process ALL the array elements.
                        (I had been struggling, seeing that the code was only processing the first session... But that's what we expect, turns out.)

                        That is - Once we determine that this movie DOES have at least ONE session that passes our "TimeFilter", that movie IS to be included in the List of Movies sent on to the MovieItem.vue component.
                        (And recall, that MovieItem component then does its own processing on those sessions (to show *all* the sessions *for today* - regardless of the TimeFilter ('Before 6pm' etc.) that a user may have applied.))
                        */

                        return movie.sessions.find(this.sessionPassesTimeFilter)
                        }
                        ) // << our callback


 /* ====  REFACTORING  ==================================== */
/*
                return this.moviesForMovieList.filter((eachMovie) => {
                        console.log('OUTER 99 filter: eachMovie.movie.Title, eachMovie.movie.Genre: ', eachMovie.movie.Title + ' - ' + eachMovie.movie.Genre)
                        return this.genresmylist.some((eachGenre) => {
                            console.log('INNER 98 some: eachGenre, eachMovie.movie.Genre: ', eachGenre + ' - ' + eachMovie.movie.Genre)

                            // LESSON 88 MULTI-Genres now, kids. A String, comma-separated:
                            // E.g. "Genre": "Documentary, History"
                            // Insignificant Celluloid
                            //  Drama - Comedy, Drama

                            var myArrayOfGenres = eachMovie.movie.Genre.split(',')
                            console.log(myArrayOfGenres) // yep

                            return myArrayOfGenres.includes(eachGenre)

/!*
                            return myArrayOfGenres.some((thisMoviesGenreThisTime) => {
                                console.log('INNER 97 some: eachGenre: ', eachGenre + ' - ' + thisMoviesGenreThisTime)
                                return eachGenre === thisMoviesGenreThisTime
                            })
*!/

                            // Hey! Don't forget to use RETURN!
                            // Yes, EVEN on this ".some()" Array method.
                            // True enough, .some() does return true or false, but,
                            // apparently, YOU must say "return". Okay? Okay.
//                            return eachGenre === eachMovie.movie.Genre;

                        })
                    })
*/
   /* =====  /REFACTORING =================================== */

            } // /filteredMovies()
                /*
                INSTRUCTOR CODE
                for computed() filteredMovies()

                Essentially:
                1) OUTER is Movies; uses .FILTER()
                2) "INNER" is another method, on GENRES; uses .FIND()

                ------------
                 &&&&&&&&&&&&&
                 LESSON 80
                 CREATING LOGIC FOR GENRE FILTER


                 Instructor Code:
                 https://github.com/vuejsdevelopers/vuejs-cinema/blob/lecture/080/src/main.js
                 ------------
                 methods: {
                 moviePassesGenreFilter(movie) {
                 if (!this.genre.length) {
                 return true;
                 } else {
                 return this.genre.find(genre => movie.genre === genre);
                 }
                 }
                 },
                 computed: {
                 filteredMovies() {
                 return this.movies.filter(this.moviePassesGenreFilter);
                 }
                 }
                 },
                 ------------
                ------------
                 */
        }, // /computed()
        created() {
            // console.log('Moment object, from Root Component, seen here in Child Component MovieList.vue (without importing Moment.js) ', this.$moment)
            /*
             Moment object, from Root Component, seen here in Child Component MovieList.vue (without importing Moment.js)  ƒ hooks () {
             return hookCallback.apply(null, arguments);
             }
             */
        }
    }
</script>
