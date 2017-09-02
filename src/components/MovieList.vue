<template>
    <div id="movie-list">
        <div v-for="movie in filteredMovies" class="movie">Filtered Movie! {{ movie.movie.Title }}</div>
        <div>
            <p>Hey Checked Genres Why Not</p>
            <div v-for="genre in genresmylist">Checked Genre Title: {{genre}}</div>
        </div>
    </div>
</template>

<script>
    import myFrozenGenres from '../util/genres'

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
        computed: {
            filteredMovies() {
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
        }
    }
</script>
