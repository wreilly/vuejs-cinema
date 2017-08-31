import Vue from 'vue'
import './style.scss'

import myFrozenGenres from './util/genres'

new Vue({
    el: '#app',
/*
    data: {
        msg: 'Hello world'
    }
*/
    methods: {
/* YES. This belongs here on the Root instance. Bon. */
      checkFilterGrandParentMethod(category, title, checked){
          console.log('checkFilterGrandParentMethod!', category, ' | ', title, ' | ', checked )
      }
    },
    components: {
        'movie-list': {
            template: `<div id="movie-list">
<div v-for="movie in movies" class="movie">{{ movie.title }}</div>
</div>`,
            data: function() {
                return {
                    movies: [
                        { title: 'Hannah and Her Sisters' },
                        { title: 'Pulp Fiction' },
                        { title: 'Nan the Destroyer' },
                    ]
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