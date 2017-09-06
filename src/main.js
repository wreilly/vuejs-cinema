import Vue from 'vue'
import './style.scss'

// import myFrozenGenres from './util/genres'
import MovieList from './components/MovieList.vue'
import MovieFilter from './components/MovieFilter.vue'

// "http" -
// Once you "use" VueResource in Vue, you can refer to VueResource as 'http'. Cheers.
import VueResource from 'vue-resource'
Vue.use(VueResource)
// E.g. ( ? )
// Vue.http.options.root = 'http://127.0.0.1:8000/' // ?

/* Interesting.
LESSON 90 ~05:59
- moment.js --- 3rd party, not "integrated" with Vue.js (like Vue-Resource is, for example).
- Use this JavaScript property definition business here, to create a referenceable thing/property/whatever, that all our Components can use.
- Thus avoid needing to import moment.js to each component individually (MBU).
- Calling your thing/property "$moment" is naming convention (that leading '$').
- this.$root is (I guess) Vue.js reserved word (or similar) to speak of the Root Component. Okay.
- JavaScript's Object.defineProperty() and that get(){} are how you create this thing.
- You create it on the Vue object's prototype.
Cheers.
 */
import moment from 'moment-timezone'
moment.tz.setDefault("UTC")
// Server (/api.js) ALSO uses same timezone default: "UTC"
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } })

new Vue({
    el: '#app',
    data: {
        // Array 'genre' will contain the "title" (ooffaa - stupid word) of the GENRE .
        // NO. >>the movies that match the CHECKED genres...
        // Our "category" argument carries the hard-coded string value "genre", which matches the name of this data array:
        genre: [], // sent as props down to movie-list as genresmylist.
        time: ['notempty-time'],
        moviesFromAPI: [],
        moment, // << 3rd party object, turned into a data property we can sling around in our app. Who knew.
        day: moment() //.format("YYYY MM DD") // current day, "today"!
    },
    components: {
        'movie-list': MovieList,
        'movie-filter': MovieFilter,
    },
    methods: {
        /* YES. This method belongs here on the Root instance. Bon. */
        checkFilterGrandParentMethod(category, title, checked){
            console.log('checkFilterGrandParentMethod!', category, ' | ', title, ' | ', checked ) // Yep.
            // checkFilterGrandParentMethod! genre  |  Animation  |  true
            /*
            Interesting. (To me.)
            Off the 'this' Object, I can obtain properties by this[]  notation. Either named property in "quotes", or, by a JavaScript variable carrying that String (e.g. our category var).
             */
            console.log('hey what this[category] ', this[category])
            console.log('hey what -03- this["genre"] ', this["genre"])
// Nope. Fails. genre is not a var, kid.
//            console.log('hey what -02- this[genre] ', this[genre])
            if (checked) {
                // Put 'er in!
                this[category].push(title)
                console.log('INSIDE IF hey what this[category] ', this[category])
            } else {
                // Take 'er out!
                // Presumably it IS in there...

                // let index = this[category].indexOf(title) << Instructor code way

                var foundIndex = this[category].findIndex((eachMovieTitle) => title === eachMovieTitle)
                // https://appendto.com/2016/02/vs-javascript-abstract-vs-strict-equality/
                // == vs. ===   != vs. !==
                if (foundIndex !== -1) {
                    // Yes, found it
                    // http://www.tothenew.com/blog/javascript-splice-vs-slice/
                    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
                    this[category].splice(foundIndex, 1)
                } else {
                    // "This shouldn't happen"
                    // FLW
                    // (famous last words)
                }
            }

      }
    },
    created() {
        this.$http.get('/api')
            .then((response) => {
                console.log(response.data)
                this.moviesFromAPI = response.data // whamma-jamma
                /*
                 OUTER filter: eachMovie.title, eachMovie.genre:  Nan the Destroyer - Crime
                 8:87
                 Response {url: "/api", ok: true, status: 200, statusText: "OK", headers: Headers, …}
                 body: Array(9)
                 0: id: "tt0379225"
                 movie: {Title: "The Corporation", Year: "2003", Rated: "PG-13", Released: "04 Jun 2004", Runtime: "145 min", …}
                 sessions: (25) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
                 headers: Headers {map: {…}}
                 ok: true
                 status: 200
                 statusText: "OK"
                 url: "/api"
                 data: (...) // <<<<<<< What We Want
                 __proto__: Object
                 */
            })
    }
})