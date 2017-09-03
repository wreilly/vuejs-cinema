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
         Cheers.
         -->
        <movie-item v-for="movie in filteredMovies" class="movie" v-bind:movie-item-thing-foo-bar="movie"></movie-item>
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
        computed: {
            filteredMovies() {
                // -----------
                // SEE "INSTRUCTOR CODE" at BOTTOM. Gracias.
                // -----------
                if (this.genresmylist.length == 0) {
                    return this.moviesForMovieList
                } else {
//                    console.log('wtf this.genresmylist or bust: ', this.genresmylist)
//                    console.log('wtf this.moviesForMovieList or bust: ', this.moviesForMovieList)
                    return this.moviesForMovieList.filter((eachMovie) => {
                        console.log('OUTER 99 filter: eachMovie.movie.Title, eachMovie.genre: ', eachMovie.movie.Title + ' - ' + eachMovie.genre)
                        return this.genresmylist.some((eachGenre) => {
                            eachGenre === eachMovie.genre;
                        })
                    })
                }
            }
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
        }
    }
</script>
