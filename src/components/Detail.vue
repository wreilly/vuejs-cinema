<template>
    <div>
        <p>Hi. Detail is in the house.</p>
        <!--These 3 all work. tt0379225  :o)-->
<!--
        <div>id? prop? {{ id }}</div>
        <div>id? params? {{ this.$route.params.id }}</div>
        <div>id? params? {{ $route.params.id }}</div>
-->
        <!--No. doesn't know what 'params' is. Sheesh
        <div>id? params? {{ params.id }}</div>-->

        <!--<div>day! {{ day }}</div> &lt;!&ndash; undefined. hmm. &ndash;&gt;-->

        <!--<movie-item></movie-item>-->
        <!--Never Happens: <div>moviesHereInDetail y not: {{ moviesHereInDetail }}</div>-->
        <div id="detail" v-if="thisDetailMovie">
<!--
            <p>YES. :o) moviesFromApiMainToDetail y not: </p>
            <div> {{ moviesFromApiMainToDetail }} </div>
-->
            <!-- just [] for movie-sessions placeholder, for now -->
            <movie-item
                    v-bind:movie-item-thing-foo-bar="thisDetailMovie"
                    v-bind:movie-sessions="[]"></movie-item>
            <p>at end of movie-item</p>
        </div>
    </div>
</template>

<script>
    import MovieItem from './MovieItem.vue'

    export default {
        /* re: props: [] below ...:
Yes:        'id' from $route.params (from the URL)
No!:        'day' passed as v-bind: prop from <router-view>
(see routes.js re: why not)
         */
//        props: ['id', 'day'],
        // Now LESSON 105 we are also running the API call for movies, from 2 places: 1) in Overview (like before) and 2) new: in MAIN.JS, passed as prop here to Detail.vue from INDEX.HTML. bon.
        props: ['id', 'moviesFromApiMainToDetail'],
        // Non dimenticare!
        // vue.common.js?e881:481 [Vue warn]: The "data" option should be a function that returns a per-instance value in component definitions.
        data: function() {
            return {
                // Did NOT work. "Too late" "Never seen"
                moviesHereInDetail: [] // to be filled from $on event listener, getting movies from API call (the one on Overview)
            }
        },
        computed: {
          thisDetailMovie() {
              let foundMovie = this.moviesFromApiMainToDetail.find((eachMovie) => eachMovie.movie.imdbID === this.id) // this.$route.params.id << I just happened to make that VueRouter route.param into a prop

              // one level deeper (.movie) is what we want...
              // Defend against 'undefined' ! Return null (safer) instead.
              return foundMovie ? foundMovie.movie : null

          }
        },
        components: {
//            MovieItem // Yes
//            MovieItem: MovieItem // Yes
            'movie-item': MovieItem // Yes
//            movie-item: MovieItem // No!
        },
        created() {
            console.log('Detail, created()! PROPS this.id, this.day ', this.id, this.day) // this.day undefined << Ok, expected; see routes.js why
            //  tt1352852 undefined << Yep

            console.log('Detail, created()! PARAMS this.$route.params.id ', this.$route.params.id)
            //  tt1352852 << Yep

            /* ** LESSON 105 This did NOT work ** */
            this.$myBusVueProperty.$on('overviewCreatedMoviesFromAPIPostGet', function(allThoseMovies) {
                /* Hmm - NEVER SEE this:
                 I guess, by the time this DETAIL components gets "created()", the Event was triggered earlier, over on Overview.
                 Such that this listener sits here, for an event that ain't comin'.

                 (I tried same $on listener over in MOVIELIST, where the console.log DOES get seen.)
                 */
                console.log('DETAIL $on hmm allThoseMovies ? ', allThoseMovies) // Not Seen
                // Never happens:
                this.moviesHereInDetail = allThoseMovies // whamma-jamma
            })
        }
    }
</script>
