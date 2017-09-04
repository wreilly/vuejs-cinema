<template>
    <div id="movie-list">
<!--  WR__ FIRST GO:

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
        <movie-item v-for="movie in filteredMovies" v-bind:movie-item-thing-foo-bar="movie.movie"></movie-item>
         <div>

            <p>Hey Checked Genres Why Not</p>
            <div v-for="genre in genresmylist">Checked Genre Title: {{genre}}</div>
        </div>
    </div>
</template>

<script>
    import myFrozenGenres from '../util/genres'
    import MovieItem from './MovieItem.vue'

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
*/

    props: ['genresmylist', 'moviesForMovieList' ],
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
            // Automatgically gives you "ProperCase - to - kebab-case" transmogrification. Cain't beat it.
            */
        },
        methods: {
          moviePassesGenreFilter(movie) {
              if (this.genresmylist.length == 0) {
                  // No genres checked, no movies "match", so we just send back ALL the movies
                  return true // this.moviesForMovieList
              } else {
                  console.log('wtf is in this.genresmylist ', this.genresmylist)
                  /*
                Q.   wtf is in this.genresmylist?
                A. (3) ["Horror", "Fantasy", "Documentary", __ob__: Observer]
                  */
                  console.log('NEW 77 genresmylist, movie.movie.Genre: ', this.genresmylist + ' - ' + movie.movie.Genre + ' - ' + movie.movie.Title)

                  var thisMoviesArrayOfGenres = movie.movie.Genre.split(', ')

/* NEW WR__ APPROACH
                  let matched = true
*/

                  console.log('NEW 66 genresmylist, thisMoviesArrayOfGenres: ', this.genresmylist + ' - ' + thisMoviesArrayOfGenres)

/* NEW WR__ APPROACH
                  this.genresmylist.forEach((eachCheckedGenre) => {
*/
                  // Hmm, I *think* we "return" the results from this .map() << Hmm don't think so
                  // We want to have the parent method filter say true or false for each movie ...
                  /* I am sort of vaingloriously using a .map() here,
                   where all I really want to do is run some simple logic on each element,
                    to tell me Yes or No, Passes or Fails,
                    and return that answer to the parent filter() function.
                    Hmm.
                    How can I use .map() to accomplish that?
                    .map() wants to return another array. Which I guess I can ignore?
                    Hmm.
                    Instructor Code uses humble .forEach(). Does not return a damned thing directly from the .forEach. Instead calculates a "matched" var/flag and returns that when it is good and ready (AFTER the .forEach() biz).
                    Hmm.

                  */

                  /* [ Note to Self ] 2017-09-04-0754
                  I think I am going to give up.
                  Doing this Array processing an Array processing an Array ...
                  ... I am not finding it friendly to try to use .map() in the middle.
                  Heck with it.
                  Leave for "another day."
                  See you then.
                  */
                  // return // << Let's knock the return off of this, hey? << No
                  // How about a var? Nah. This var, from the .map(), just gets one element, the LAST one (e.g. false, or true)

                  // Also not working right. ALL movies getting returned ... sigh.
                  return this.genresmylist.map((eachCheckedGenre) => {
//                  this.genresmylist.map((eachCheckedGenre) => {
//                  var genresmylistmapped = this.genresmylist.map((eachCheckedGenre) => {

                      console.log('NEW 66AB eachCheckedGenre: ', eachCheckedGenre + ' - ' + thisMoviesArrayOfGenres)
                      /* Bit Further w. Arrays... 2017-09-04-0538
                      Hmm. Instead of Instructor Code .FOREACH() { .INDEXOF() }
                      How about I try NEWER ES6-y STUFF: .MAP() { FINDINDEX() }

                       http://2ality.com/2013/12/array-prototype-find.html
                       https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex

                       -------------
                       We have:
                       1) ARRAY of MOVIES
                       2) ARRAY of CHECKED GENRES
                       3) ARRAY, on each MOVIE, of GENRES that MOVIE has

                       Note: Re: #3 - We had to use String ".split(',')" to create that 3rd array. No biggie.

                       So we need to spin through:
                       1) OUTER ARRAY of MOVIES using .filter() << pass to a method that returns Boolean, and that contains logic for steps 2 and 3:
                       2) INNER ARRAY using .map() << predicate (function) as arg
                       3) NEXT INNER ARRAY using .findIndex() << predicate (function) as arg; take action on finding -1 or not, to get true or false to return

                       I guess you could invert # 2 and # 3 if you wanted to ...
                       (Heck, you could do these invert # 1 and # 2, then do # 3)


                       Instructor Code Approach: ... spin through:
                       1) (SAME) OUTER ARRAY of MOVIES using .filter() << pass to a method that returns Boolean, and that contains logic for steps 2 and 3:
                       2.A.) Set a "Return" var / flag: e.g. matched = true
                       2.B.) INNER ARRAY using .FOREACH() << just run logic inside what is effectively a LOOP
                       3) NEXT INNER ARRAY using .INDEXOF() << Actual Expected Array Element Value as arg (e.g. 'Fantasy'); take action on finding -1 or not; then manually update your "matched" flag to true or false
                       4) Return your "matched" flag (t or f)

                       -------------

                      */

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
                      /* NEW WR__ APPROACH
                      if (thisMoviesArrayOfGenres.indexOf(eachCheckedGenre) === -1) {
*/
                      var foundPosition = thisMoviesArrayOfGenres.findIndex( (eachThisMoviesArrayOfGenres) => {
                          console.log('eachThisMoviesArrayOfGenres ?', eachThisMoviesArrayOfGenres)
                          console.log('eachCheckedGenre ', eachCheckedGenre)
                          console.log('eachThisMoviesArrayOfGenres === eachCheckedGenre T/F ? ', eachThisMoviesArrayOfGenres === eachCheckedGenre)
                          // JESUS H. CHRISTAMIGHTY
                          // Can you puhleease remember to *"RETURN"* !!??!!??
                          return eachThisMoviesArrayOfGenres === eachCheckedGenre
                      })
                      console.log('foundPosition! ', foundPosition)
                      if (foundPosition === -1) {
                          // NO. This particular "checked genre" is not found in our list of genres this movie has.
                          // IMPORTANT NOTE: And THAT my friends is enough to KILL THE DEAL.
                          // All you need is ONE checked genre that is NOT found on the movie, and that movie is O-U-T.
                          //   (I think I was overly focussed (don't ask me why) on ensuring I processed ALL the genres in the list of checked genres, against each given movie's "list of genres".
                          //   But that is not needed. Soon as you see that one of the checked genres is not on that movie's list, you are done. That movie FAILS the filtering test.)
                    // NAH!       console.log('33AB -1 NOT FOUND?! eachCheckedGenre, eachThisMoviesArrayOfGenres ', eachCheckedGenre, eachThisMoviesArrayOfGenres )
                          console.log('33ABC -1 NOT FOUND?! eachCheckedGenre, thisMoviesArrayOfGenres ', eachCheckedGenre, thisMoviesArrayOfGenres )

                          return false // NOPE, not this movie
                      } else {
                          // YES. Found it. So far at least, for this particular checked genre, this movie SO FAR does pass the filter
                          // Keep going, make sure it passes ALL the checked genres...
                   // NAH!       console.log('22AB NOT-1 IS ?? FOUND?! eachCheckedGenre, eachThisMoviesArrayOfGenres ', eachCheckedGenre, eachThisMoviesArrayOfGenres )
                          console.log('22ABC NOT-1 IS ?? FOUND?! eachCheckedGenre, thisMoviesArrayOfGenres ', eachCheckedGenre, thisMoviesArrayOfGenres )

                          return true // <<<< ????? hmm would this work? Well, don't think so. Hmm.
                      }


                      /*
                          ===============
                          BROKE THE CODE (SHEESH)
                          Sita Sings The Blues
                          thisMoviesArrayOfGenres: ['Animation', 'Comedy', 'Fantasy']
                          eachCheckedGenre: 'Fantasy'

                          So - you throw 'Fantasy' against that Array, viz. "indexOf()" and YES, it ('Fantasy') is found. Cheers.

                          And - if your user checked BOTH 'Fantasy' AND 'Comedy', then when you likewise, on another iteration, throw 'Comedy' against that same Array, viz. "indexOf()" again YES 'Comedy' will be found. This movie gets to stay in, pass the filter, be on the resulting movie list. Okay.

                          O.K., but, just making sure here: the NEGATIVE case:
                          So if/when you throw a checked genre like "Drama" at it, since that is NOT found, then this movie ("Sita") will NOT pass the filter, will not be in the resulting movie list.
                          O.K.
====================


                          Yes Men...
                           thisMoviesArrayOfGenres :   "Genre": "Documentary, Comedy",
               eachCheckedGenre: Comedy
                          */
                      /* NEW WR__ APPROACH
                          console.log('33A -1 NOT FOUND?! eachCheckedGenre, thisMoviesArrayOfGenres ', eachCheckedGenre, thisMoviesArrayOfGenres )
*/
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
                      /* NEW WR__ APPROACH
                          matched = false
*/
                      /* NEW WR__ APPROACH
                                            } else {
                          console.log('22A NOT-1 IS ?? FOUND?! eachCheckedGenre, thisMoviesArrayOfGenres ', eachCheckedGenre, thisMoviesArrayOfGenres )

                      }
                  })
*/
                      /* NEW WR__ APPROACH
                  return matched
*/
                      /* Hmm. Nah. WR__ approach ... Hmm.
                  return thisMoviesArrayOfGenres.find(this.moviePassesOneGenreMatches)
*/
                      /* NEW WR__ APPROACH }
             */

                  }) // /genresmylist.map()
                  // Nah. This var, from the .map(), just gets one element, the LAST one (e.g. false, or true)
                  console.log('=========================')
                  console.log('genresmylistmapped: ? ', genresmylistmapped)
                  console.log('=========================')
              }
          } // /moviePassesGenreFilter()
        },
        computed: {
            filteredMovies() {
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
                return this.moviesForMovieList.filter(this.moviePassesGenreFilter)


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

N.B.
LESSON 88 is for MULTI-GENRE movies
LESSON 80 is for ONE-ONLY Genre movies

                 Essentially: Lesson 88
                 1) OUTER is Movies; uses .FILTER()
                 2) "INNER" is (inside another method, actually), on GENRES; uses .FOREACH()
                 3) NEXT INNER is the GENRES each MOVIE has; uses INDEXOF()

                 - matched starts as true
                 - gonna say YES to this movie, UNLESS it turns out that ...
                  -- ... the checked genre being inspected does NOT exist in the movie's own list of genres
                 - then in that case: false = do NOT include this movie

                &&&&&&&&&&&&&
                LESSON 88

                 methods: {
                  moviePassesGenreFilter(movie) {
                   if (!this.genre.length) {
                    return true;
                   } else {
                    let movieGenres = movie.movie.Genre.split(", ");
                    let matched = true;
                    this.genre.forEach(genre => {
                      if (movieGenres.indexOf(genre) === -1) {
                        matched = false;
                      }
                    });
                 return matched;
                   }
                  }
                 },

                 computed: {
                   filteredMovies() {
                     return this.movies.filter(this.moviePassesGenreFilter);
                   }
                 },





                Essentially: Lesson 80
                1) OUTER is Movies; uses .FILTER()
                2) "INNER" is (inside another method, actually), on GENRES; uses .FIND()

                ------------
                 &&&&&&&&&&&&&
                 LESSON 80
                 CREATING LOGIC FOR GENRE FILTER

// N.B. This is BEFORE the multi-value Genres on a movie.

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
        } // /computed()
    }
</script>
