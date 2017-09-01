import Vue from 'vue'
import './style.scss'

import myFrozenGenres from './util/genres'

new Vue({
    el: '#app',

    data: {
        // msg: 'Hello world'
        // Array will contain the CHECKED movies...
        // Our "category" argument carries the hard-coded string value "genre", which matches the name of this data array.
        // Bit odd in my estimation but, there you go.
        // Also, why name an ARRAY of Values (plural) with a variable name SINGULAR? Hmmph.
        // E.g. ['COMEDY', 'DRAMA' ... ]
        genre: [], //['Crime'], //['notempty-genre'], // props down to movie-list as genresmylist. >> Nope: genresForList << Nope
        time: ['notempty-time']
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
    components: {
        'movie-list': {
            template: `<div id="movie-list">
<div v-for="movie in filteredMovies" class="movie">Filtered Movie! {{ movie.title }}</div>
<div>
<p>Hey Checked Genres Why Not</p>
<!-- -01- Whoa. who knew.
"- avoid using JavaScript keyword as property name: "for" in expression v-for="genre in genres-for-list"

Of note: "In JavaScript objects a kebab-case identifier is not valid, ... wrap your kebab-case identifier [in] single quotes"

fwiw

<div v-for="genre in genres-for-list">Checked Genre Title: {{genre}}</div>
-->
<!--  -02- This appeared to (?) have processed: 1) genres, 2) my 3) list. wtf? oh well:
<div v-for="genre in genres-my-list">Checked Genre Title: {{genre}}</div>
-->
<!-- -03- Hah! This takes the STRING and does v-for on each letter! Hah!
<div v-for="genre in 'genres-my-list'">Checked Genre Title: {{genre}}</div>
-->
<!-- -04- Fourth time's the charm: -->
<div v-for="genre in genresmylist">Checked Genre Title: {{genre}}</div>
</div>
</div>`,
            // props: [ 'genres-my-list' ],
            props: [ 'genresmylist' ],
            data: function() {
                return {
                    movies: [
                        { title: 'Hannah and Her Sisters', genre: myFrozenGenres.DRAMA },
                        { title: 'Pulp Fiction', genre: myFrozenGenres.CRIME },
                        { title: 'Nan the Destroyer', genre: myFrozenGenres.CRIME },
                    ]
                }
            },
            computed: {
                filteredMovies() {
                    // 01. (easier) genresmylist has 1 entry e.g. 'DRAMA'
/*
                    var theGenre = this.genresmylist[1]
                    console.log('theGenre is ', theGenre)
                    return this.movies.filter((eachMovie) => {
                        console.log('eachMovie.title ', eachMovie.title)
                        return eachMovie.genre === theGenre
                    })
*/

                    // 02. Time to Deal With It:
                    // One array (Genres) driving the processing of a second array (Movies). Cheers.
                    // My Googs: "javascript nesting maps"
                    // https://stackoverflow.com/questions/35325767/map-an-array-of-arrays

                    /* "Interesting."
                    My OUTER array is of GENRES.
                    My INNER array is of MOVIES.
                    I want a result that is of MOVIES, not Genres.
                    So, having a MAP of the OUTER array, returns an array that is fundamentally of GENRES (not what I want).
                    Huh.
                    (Light bulb li'l moment.)
                    Why not flip it over?
                    OUTER array of the MOVIES.
                    INNER, process the GENRES.
                    Return: "MOVIES". Hmm.
                     */

                    // let theAnswer = [] // << bit kludgey, non-'map/filtery' way but hey

/*
                    return this.genresmylist.map((eachGenre) => {
                        console.log('OUTER map: eachGenre: ', eachGenre)
                        return this.movies.filter((eachMovie) => {
                            console.log('INNER filter: eachMovie.title, eachMovie.genre: ', eachMovie.title + ' - ' + eachMovie.genre)
                            return eachMovie.genre === eachGenre
*/
/*
                            if (eachMovie.genre === eachGenre) {
                                theAnswer.push(eachMovie)
                            }
*/
/*
                        })
                    })
*/
                    // return theAnswer
                    // It Worked! :o)

                    // 03. Flip It!
                   // return // well, THAT killed it. Sheesh.
                   /* if (this.genresmylist.length === 0) {
                        console.log('Are we here? is it empty?')
                        return // it was empty to start!
                    } */
                    return this.movies.filter((eachMovie) => {
                        console.log('OUTER filter: eachMovie.title, eachMovie.genre: ', eachMovie.title + ' - ' + eachMovie.genre)
                        // Yo! SOME()! Whoa.
                        // Don't FILTER FILTER
                        // Instead FILTER SOME
                        // Whew
                        // https://stackoverflow.com/questions/38039311/javascript-nested-filters-in-array-of-arrays
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
                        return this.genresmylist.some((eachGenre) => {
/*
                            return this.genresmylist.filter((eachGenre) => { // << Nope. ALL movies were going in every time. sigh.
*/
                            //console.log('INNER filter: eachGenre AND my eachMovie.genre! : ', eachGenre + ' - ' + eachMovie.genre)

                            if (eachGenre === eachMovie.genre) {
                                console.log('Well yeah! -02- INNER filter: eachGenre AND my eachMovie.genre! : ', eachGenre + ' - ' + eachMovie.genre)
                            }
                            return eachGenre === eachMovie.genre

                            // return 'CRIME' === eachMovie.genre
                        })

                    })
                }
            }
        },
        'movie-filter': {
            data: function() {
                return {
                    dataGenres: myFrozenGenres
                }
            },
            template:         `<div id="movie-filter">
<h2>Filter results</h2>
<div class="filter-group">
<div>
<!--
<span>#</span> <span>KEY</span> <span><strong>Genre Value</strong></span>
-->
</div>
<!-- Hey! Looks like this worked okay:
- v-for with an Object, iterating its properties
- using the 2nd param for getting the *key* off each property in the Object (the "name" in "name-value" pair)
- then using that freshly got key/name thing as the *key* for Vue's v-bind:key="" to supply to the v-for "each node's identity"
Bueno.
https://vuejs.org/v2/guide/list.html#v-for-with-an-Object
https://vuejs.org/guide/list.html#key
-->
<check-filter 
v-for="(dataGenre, gkey, indexWhyNot) in dataGenres" 
v-bind:theValueInEachGenre="dataGenre"
v-bind:thatKey="gkey"
v-bind:thatIndex="indexWhyNot"
v-bind:key="gkey"
v-on:check-filter-child-event="checkFilterParentMethod">
</check-filter>
</div>
</div>`,
            methods: {
/*
                NO. This doesn't go here. Goes on the Root instance!
                checkFilterGrandParentMethod(myLoad){
                    console.log('checkFilterGrandParentMethod: myLoad: ', myLoad)
                },
*/
                checkFilterParentMethod(category, title, checked) {
//                    checkFilterParentMethod(myLoad) {
                  // Yes. "myLoad" does get the "theValueInEachGenre"
                    // Above is true when we passed a single argument/
                    // But no longer true that we're passing 3 of them.

                    // payload is an Array < Yeah, but that array does NOT automagically make your 3 passed-in args into the 3 elements in the array. Nope.
                    // First element is hard-coded filter type: "genre"
                    // Second element is the title/name/value of the genre (e.g. "Comedy")
                  console.log('checkFilterParentMethod!', category, ' | ', title, ' | ', checked )
                  this.$emit('check-filter-parent-event', category, title, checked) // pass it on up...
              }
            },
            components: {
                // SUB-COMPONENT!
                'check-filter': {
                    props: [ 'theValueInEachGenre', 'thatKey', 'thatIndex'],
                    data: function() {
                      return {
                          checked: false
                      }
                    },
                    // single-quotes needed around hyphenated CSS key ... 'check-filter'
                    // v-on:click="checked = !checked"> << Moved out of attribute, to the method
                    template: `<div v-bind:class=" { 
'check-filter': true, 
active: checked  } " 
v-on:click="checkFilterChildMethod">
<!-- This "checkbox" is a sort of custom designed CSS ginned-up HTML Form Checkbox looking thing... -->
<span class="checkbox"></span>

<span class="check-filter-title"> 
<!--{{ theValueInEachGenre }}</span>-->
{{ thatIndex }}. {{ thatKey }} : <strong>
{{ theValueInEachGenre }} </strong></span>
</div>`,
                     methods: {
                        checkFilterChildMethod() {
                            this.checked = !this.checked
                           // console.log('this.dataGenre', this.dataGenre) // Nope. undefined
                            console.log('this.theValueInEachGenre', this.theValueInEachGenre) // Yep! Crime
                            // Per Instructor code, we'll insert a first parameter here to "hard-code" the "type" of filter: "genre" Lecture 77 ~03:55:
                            /* With custom event, we get some "payload" handling of arguments:

                             payload:Array[3]
                             0:"genre"
                             1:"Animation"
                             2:true

                             But I think I cannot access that 'payload' variable in my code. Hmm. Okay.
                             I need to deal with the 3 arguments on their own, not as elements in an Array. All righty.
                             */
                            this.$emit('check-filter-child-event', 'genre', this.theValueInEachGenre, this.checked) // Yes
                        }
                    }
                }
            }
        }
    }
})