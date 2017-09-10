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
- Once in place, any component can access it ...
Cheers.
 */
import moment from 'moment-timezone'
moment.tz.setDefault("UTC")
// Server (/api.js) ALSO uses same timezone default: "UTC"
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } })

// LESSON 98 - EVENT BUS
var myBus = new Vue() // just an empty Vue instance, enough to serve as our "bus"

Object.defineProperty(Vue.prototype, '$myBus', {
    get() {
        return this.$root.myBus
    }
})

// Nah!
/*
myBus.methods = {
    // Seems to be: NOPE << Correct-a-mundo. T'ain't this. Cheers.
    myBusCheckFilterBusMethod(category, title, checked) {
        console.log('-02- NEW myBusCheckFilterBusMethod!', category, ' | ', title, ' | ', checked )
    }
}
*/

new Vue({
    el: '#app',
    data: {
        // Array 'genre' will contain the "title" (ooffaa - stupid word) of the GENRE .
        // NO. >>the movies that match the CHECKED genres...
        // Our "category" argument carries the hard-coded string value "genre", which matches the name of this data array:
        genre: [], // sent as props down to movie-list as genresmylist.
        time: [], // e.g. ['Before 6pm'] // ['notempty-time'],
        moviesFromAPI: [],
        moment, // << 3rd party object, turned into a data property we can sling around in our app. Who knew.
        day: moment(), //.format("YYYY MM DD") // current day, "today"!
        myBus: myBus // like moment above, another custom "defined property" added to the Vue prototype instance here.
    },
    components: {
        'movie-list': MovieList,
        'movie-filter': MovieFilter,
    },
    methods: {
        // Yes! :o) (Not that "myBusCheckFilter..." Okay.
        myRootCheckFilterBusMethod(category, title, checked) {
            console.log('-02- NEW myRootCheckFilterBusMethod!', category, ' | ', title, ' | ', checked )
            // Great. This is getting the data here, directly via the Event Bus (no longer the up-and-down of $emit chain).
            // Time to just non-DRY copy & paste same logic that is found in the "grandFather" method below, to apply/use here. Cheers.
            /* Pseudo-code-ish-spec:
            We have two arrays in data{}: genre[], time[].
            - Passed-in 'category' is a String to indicate which.
            - Passed-in 'title' is a String value to add to the appropriate array.
            - Passed-in 'checked' is a Boolean which tells us, actually, whether it should be added or in fact removed ("unchecked").
            Bon.
            So, we determine whether checked is T/F, etc.
            e.g.
            category | title | checked
            genre | Comedy | true
             */
            if (!checked) {
                // SUBTRACT!
                // We do assume the title is there in the array, but, we have to find out just *where* it is in the array, to remove it!
                var foundPosition = this[category].findIndex((eachTitle) => eachTitle === title)
                this[category].splice(foundPosition, 1)
            } else {
                this[category].push(title)
            }
        },

        /* YES. This method belongs here on the Root instance. Bon. */
        /*
        - category is type of category: 'genre' or 'time'
        - title is name of a category value: 'Comedy' or 'Crime', or 'After 6 pm'
        - checked is Boolean: true or false
         */
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
            console.log('hey what -04- this["time"] ', this["time"])
            if (checked) {
                // Put 'er in!
                // Nice: already generalized. Works for both 'genre' and 'time'. Tres bien.
                this[category].push(title)
                console.log('INSIDE IF CHECKED :o) hey what this[category] ', category + ' - ' + this[category])
            } else {
                // Take 'er out!
                // Presumably it IS in there...

                // This is working for both genre and time. See Vue Chrome Extension :o)

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

        // Interesting: Seems to have worked WITHOUT 'this.' in front of 'myBus'. Hmm.
        // WORKS:
        // myBus.$on('check-filter-child-event-bus', this.myRootCheckFilterBusMethod)
        this.$myBus.$on('check-filter-child-event-bus', this.myRootCheckFilterBusMethod)
        // Just takes and passes that payload, baby.
        // (Methinks.)
        // Yes, that's right. We pass 3 params and all 3 get there. Good.

    }
})