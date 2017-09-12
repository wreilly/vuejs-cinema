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
                    <movie-item
                            v-for="movie in filteredMovies"
                            v-bind:movie-item-thing-foo-bar="movie.movie"
                    v-bind:movie-sessions="movie.sessions"
                            v-bind:timesmylist-for-item="timesmylist"
                    v-bind:today-for-item="todayForList"></movie-item>
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
            }
        },
        components: {
            'movie-item': MovieItem,
        },
        methods: {
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
            sessionPassesTimeFilter(session) {
            /* ******************************* */

                /* *********
                 ROUTER-VIEW VIZ. CERTAIN PROPERTIES ...
                 Quite interesting. (LESSON 101)
                 When NOT in the vue-router, <router-view>, the below line DID WORK, with simply myBus:
                 !this.todayForList.iSame()...
                 Then, when IN the vue-router and <router-view>, todayForList was undefined; needed to use:
                 !this.$moment().isSame()...

                 (See also Overview.vue re: myBus)
                 */

// YES works
// if (!this.$moment().isSame(session.time, 'day')) {
                // Yes: (also)
                if (!this.todayForList.isSame(session.time, 'day')) {
                    console.log('NOT TODAY KID')
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
                return this.moviesForMovieList
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
            // console.log('Moment object, from Root Component, seen here in Child Component MovieList.vue (without importing Moment.js) ', this.$moment)
            /*
              ƒ hooks () {
             return hookCallback.apply(null, arguments);
             }
             */
        }
    }
</script>
