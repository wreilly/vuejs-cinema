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
            // Automatically gives you "ProperCase - to - kebab-case" transmogrification. Cain't beat it.
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
                   wtf is in this.genresmylist  (3) ["Horror", "Fantasy", "Documentary", __ob__: Observer]
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


                          Yes Men...
                           thisMoviesArrayOfGenres :   "Genre": "Documentary, Comedy",
               eachCheckedGenre: Comedy
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
            moviePassesOneGenreMatches(movieGenreToTest) {
              console.log('whoa 55 movieGenreToTest: ', movieGenreToTest)
              console.log('whoa 44 this.genresmylist: ', this.genresmylist)
              if (this.genresmylist.includes(movieGenreToTest)) {
                  console.log('Yu-huh!')
                  return true
              }
//              return this.genresmylist.includes(movieGenreToTest)
          }
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
        } // /computed()
    }
</script>
