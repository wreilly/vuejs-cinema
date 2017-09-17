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


            <!-- (LESSON 107. Just note re: below)
There is a slot over in MovieItem.vue
 It will be used by the scenario:
 - MovieList.vue uses MovieItem.vue (wants Sessions info)

 But not by the scenario: (ignored effectively)
 - Detail.vue uses MovieItem.vue (no need for Sessions info)
 Therefore as we see above, here in Detail.vue there is NO child element markup in this <movie-item> use. Nothing is sent to be used in that <slot>. Ok.

 Also, we here remove the dummy placeholder not-needed
 v-bind:movie-sessions="[]"   Bon.
-->
<!-- WAS:
            <movie-item
                    v-bind:movie-item-thing-foo-bar="thisDetailMovie"
                    v-bind:movie-sessions="[]"></movie-item>
-->
            <movie-item
                    v-bind:movie-item-thing-foo-bar="thisDetailMovie">
                Ship ahoy we're INSIDE movie-item
                <div class="movie-details">
                    <p class="movie-genre">{{ thisDetailMovie.Genre }}</p>
                    <p class="movie-plot">{{ thisDetailMovie.Plot }}</p>
                    <table>
                        <tr>
                            <td>Released date: </td>
                            <td>{{ thisDetailMovie.Released  }}</td>
                        </tr>
                        <tr>
                            <td>Running Time: </td>
                            <td>{{ thisDetailMovie.Runtime  }}</td>
                        </tr>
                        <tr>
                            <td>Director: </td>
                            <td>{{ thisDetailMovie.Director  }}</td>
                        </tr>
                        <tr>
                            <td>Cast: </td>
                            <td>{{ thisDetailMovie.Actors  }}</td>
                        </tr>
                    </table>
                </div>
                <!-- (outside movie-item, actually.)
                <router-link to="/">Back to results</router-link>-->
            </movie-item>
            <div class="home">
                <router-link v-bind:to="{ name: 'home' }">Back to Home Page</router-link> N.B. It does NOT return you to your Search/Filter Results. Solly!
<!--
https://router.vuejs.org/en/api/router-link.html

                <router-link v-bind:to="{
                name: 'home',
                  params: {
                  genre: ['Comedy']
                  }
}">Back to Home Page</router-link> Bootless shot at passing a hard-coded "parameter" to retain the Search/Filter. (Hah! Laughable!)
                Weird. Doesn't work (of course), but no error/warning/anything, either oh well.
-->
            </div>
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
              // >> N.B. We send back the SUB-PROPERTY '.movie' <<
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
/* "ATTEMPT 'A.'" (Failed)
            this.$myBusVueProperty.$on('overviewCreatedMoviesFromAPI', function(allThoseMovies) {
*/
/* "ATTEMPT 'B.'" (Also Failed, Here Anyway) (but worked okay on MovieList.vue) */
            this.$myBusVueProperty.$on('overviewCreatedMoviesFromAPIPostGet', function(allThoseMovies) {
                /* Hmm - NEVER SEE this:
                 I guess, by the time this DETAIL components gets "created()", the Event was triggered earlier, over on Overview.
                 Such that this listener sits here, for an event that ain't comin'.

                 (I tried same $on listener over in MOVIELIST, where the console.log DOES get seen.)
                 */
                console.log('DETAIL "ATTEMPT B."$on hmm allThoseMovies ? ', allThoseMovies) // Not Seen
                // Never happens:
                this.moviesHereInDetail = allThoseMovies // whamma-jamma
            })


            /* "ATTEMPT 'B99.'" Get movies from MAIN.JS API call via Event Bus
20170915-0649
>>       NO. Here on Detail.vue, this IS *NOT* SEEN.
                (Just like ATTEMPT 'B.' above.) (sigh)
>>       (But, as above on ATTEMPT 'B.', over on MovieList.vue this IS SEEN.)

So - same conclusion:
An Event fired on "created()" of a higher-level component, happens TOO EARLY (and doesn't repeat) for a lower-level component like this Detail.vue

             -------------
             FOR NORMAL PATH BY USER: (click on title link on MovieList/MovieItem screen)
             = As before (on "ATTEMPT B."), also here in "ATTEMPT B99." the $emit event from Main.js, for its API call, is NOT seen/"heard" by this $on listener, down in Detail.vue.

             NOTE THAT - IF USER DOES FUNNY BUSINESS:
             1) PASTES INTO BROWSER THE DETAIL URL DIRECTLY... (
             2) or when on this page does Browser Page Refresh,
             3) or on MovieList/MovieItem screen, do Right-Click "Open in New Tab/Window"
             = then they *DO* get the $emit event, from Main.js, for its API call. Cheers.
             -------------
             */
            this.$myBusVueProperty.$on('mainCreatedMoviesFromAPIPostGet', function(allThoseMovies) {
                console.log('DETAIL "ATTEMPT B99." $on hmm allThoseMovies FROM MAIN 2nd API CALL as EVENT BUS ? ', allThoseMovies) //
                //
                this.moviesHereInDetail = allThoseMovies // whamma-jamma

            })
        }
    }


    /*


     === 00 - HIGH LEVEL ======
     MAIN.JS
     (ROUTES.JS)
     INDEX.HTML
     OVERVIEW.VUE
     MOVIELIST.VUE
     MOVIEITEM.VUE
     DETAIL.VUE
     MOVIEITEM.VUE
     =========================


     === 01 - WORKING NOW; GIT COMMIT dc418a46; NOT YET CLEANED UP ===========
     MAIN.JS
     data: { moviesFromApiMain: [] },
     created() { 2ND, NEW API CALL: return moviesFromApiMain }

     ROUTES.JS
     { path: '/',          component: Overview }
     { path: '/movie/:id', component: Detail, props: true }

     INDEX.HTML
     // N.B.: v-bind attribute used only by Detail, not by Overview
     <router-view v-bind:movies-from-api-main-to-detail="moviesFromApiMain">

     OVERVIEW.VUE
     <movie-list v-bind:movies-for-movie-list="moviesFromAPI">
     data: { moviesFromAPI: [] },
     created() { 1ST, ORIGINAL API CALL: return moviesFromAPI }

     MOVIELIST.VUE
     <movie-item
     v-for="movie in filteredMovies"
     v-bind:movie-item-thing-foo-bar="movie.movie">
     props: ['moviesForMovieList' ... ]
     computed: { filteredMovies( moviesForMovieList ) }

     MOVIEITEM.VUE
     <p>{{ movieItemThingFooBar.Title }}</p>
     props: ['movieItemThingFooBar' ... ],

     DETAIL.VUE
     <movie-item v-bind:movie-item-thing-foo-bar="thisDetailMovie">
     props: ['id', 'moviesFromApiMainToDetail'],
     computed: { thisDetailMovie() { ... this.moviesFromApiMainToDetail.find(id) }

     MOVIEITEM.VUE
     (SAME AS ABOVE = RE-USE)
     <p>{{ movieItemThingFooBar.Title }}</p>
     props: ['movieItemThingFooBar' ... ],
     =========================


     === 02 - BIT OF (RECENT) HISTORY: "LESSON 105" ATTEMPT(S) USING *1ST* API results for $EMIT/$ON (FAILED) ==========
     MAIN.JS
     Object.defineProperty(Vue.prototype, 'myBusVueProperty', ...)
     data: { moviesFromApiMain: [] },
     created() { 2ND, NEW API CALL: return moviesFromApiMain }
     // "ATTEMPT 'B99.'" $EMIT from MAIN.JS (intended for Detail.vue; does NOT work oh well)
     this.$myBusVueProperty.$emit('mainCreatedMoviesFromAPIPostGet', this.moviesFromApiMain)

     ROUTES.JS
     { path: '/',          component: Overview }
     { path: '/movie/:id', component: Detail, props: true }

     INDEX.HTML
     // N.B.: v-bind attribute used only by Detail, not by Overview
     <router-view v-bind:movies-from-api-main-to-detail="moviesFromApiMain">

     OVERVIEW.VUE
     <movie-list v-bind:movies-for-movie-list="moviesFromAPI">
     data: { moviesFromAPI: [] },
     created() { 1ST, ORIGINAL API CALL: return moviesFromAPI }
     ************************************************************
     // LESSON 105 NEW: $EMIT to Event Bus from here
     // Attempt 'A.' (Failed)
     // Inside created(), but AFTER asynch API/GET (not good idea! :o(
     this.$myBusVueProperty.$emit('overviewCreatedMoviesFromAPI', this.moviesFromAPI) // << NOPE. TOO EARLY

     // Attept 'B.' (Worked, partly)
     // Inside created(), but INSIDE of asynch API/GET (that's more like it! :o)
     this.$myBusVueProperty.$emit('overviewCreatedMoviesFromAPIPostGet', this.moviesFromAPI) // << YES, INSIDE ASYNCH CALL
     ************************************************************

     MOVIELIST.VUE
     <movie-item
     v-for="movie in filteredMovies"
     v-bind:movie-item-thing-foo-bar="movie.movie">
     props: ['moviesForMovieList' ... ]
     computed: { filteredMovies( moviesForMovieList ) }
     ************************************************************
     // LESSON 105 NEW: $ON listen on Event Bus, here
     // Attempt 'A.' (Failed)
     created() { this.$myBusVueProperty.$on('overviewCreatedMoviesFromAPI') }
     // Attempt 'B.' (Worked, here in MovieList.vue, but not on Detail.vue)
     created() { this.$myBusVueProperty.$on('overviewCreatedMoviesFromAPIPostGet') }
     ************************************************************

     MOVIEITEM.VUE
     <p>{{ movieItemThingFooBar.Title }}</p>
     props: ['movieItemThingFooBar' ... ],

     DETAIL.VUE
     <movie-item v-bind:movie-item-thing-foo-bar="thisDetailMovie">
     props: ['id', 'moviesFromApiMainToDetail'],
     computed: { thisDetailMovie() { ... this.moviesFromApiMainToDetail.find(id) }
     ************************************************************
     // LESSON 105: $ON listen on Event Bus
     // Attempt 'A.' (Failed)
     created() { this.$myBusVueProperty.$on('overviewCreatedMoviesFromAPI') }
     // Attempt 'B.' (Failed too, here on Detail.vue) (But worked in MovieList.vue)
     created() { this.$myBusVueProperty.$on('overviewCreatedMoviesFromAPIPostGet') }
     // ATTEMPT 'B99.'  (Failed too, here on Detail.vue) (But worked in MovieList.vue)
     created() { this.$myBusVueProperty.$on('mainCreatedMoviesFromAPIPostGet', function(allThoseMovies) }
     ************************************************************

     MOVIEITEM.VUE
     (SAME AS ABOVE = RE-USE)
     <p>{{ movieItemThingFooBar.Title }}</p>
     props: ['movieItemThingFooBar' ... ],
     =========================







     Interesting.
     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

     1)
     Go (as usual) to home page first,
     http://127.0.0.1:8000/#/
     Then follow link to DETAIL URL:
     http://127.0.0.1:8000/#/movie/tt0379225

     All you get is:
     ^^^^ DEV CONSOLE: ^^^^^^^^^^^^^^^^^^^^
     Detail.vue?b898:68 Detail, created()! PROPS this.id, this.day  tt0379225 undefined
     Detail.vue?b898:71 Detail, created()! PARAMS this.$route.params.id  tt0379225
     ^^^^^^^^^^^^^^^^^^^^^^^^

     That is, you do NOT get: (because the listenen-for event does NOT occur)
     console.log('DETAIL "ATTEMPT B99." $on hmm allThoseMovies FROM MAIN 2nd API CALL as EVENT BUS ? ', allThoseMovies)


     2)
     Go *DIRECT* to DETAIL URL: (paste into browser location bar)
     http://127.0.0.1:8000/#/movie/tt0379225

     You DO get the Event from created() on MAIN :o)
     ^^^^ DEV CONSOLE: ^^^^^^^^^^^^^^^^^^^^
     myBusVue IN main?  Vue$3
     Detail.vue?b898:68 Detail, created()! PROPS this.id, this.day  tt0379225 undefined
     Detail.vue?b898:71 Detail, created()! PARAMS this.$route.params.id  tt0379225
     main.js?3479:161 Hey! MAIN.JS response.data?  Array(9)
     main.js?3479:164 Hey! Where are my moviesFromApiMain ?  Array(9)
     main.js?3479:170 MAIN.js 2ND API CALL. Inside GET, and Just before $EMIT
     Detail.vue?b898:101 DETAIL "ATTEMPT B99." $on hmm allThoseMovies FROM MAIN 2nd API CALL as EVENT BUS ?  Array(9)0: {__ob__: Observer}1: {__ob__: Observer}2: {__ob__: Observer}3: {__ob__: Observer}4: {__ob__: Observer}5: {__ob__: Observer}6: {__ob__: Observer}7: {__ob__: Observer}8: {__ob__: Observer}length: 9__ob__: Observer {value: Array(9), dep: Dep, vmCount: 0}__proto__: Array
     ^^^^^^^^^^^^^^^^^^^^^^

     3)
     Go (as usual) to home page first,
     http://127.0.0.1:8000/#/
     Then follow link to DETAIL URL:
     http://127.0.0.1:8000/#/movie/tt0379225
     You get as above in # 1)
     ^^^^ DEV CONSOLE: ^^^^^^^^^^^^^^^^^^^^ ...
     BUT
     Then hit browser *PAGE REFRESH*...
     And you DO get all as seen above in #2)
     ^^^^ DEV CONSOLE: ^^^^^^^^^^^^^^^^^^^^ ...
     Tres bien.
     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


     */

</script>
