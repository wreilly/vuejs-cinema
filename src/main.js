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
v-bind:key="gkey"></check-filter>
</div>
</div>`,
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
                    template: `<div v-bind:class=" { 
'check-filter': true, 
active: checked  } " 
v-on:click="checked = !checked">
<!-- This "checkbox" is a sort of custom designed CSS ginned-up HTML Form Checkbox looking thing... -->
<span class="checkbox"></span>

<span class="check-filter-title"> 
<!--{{ theValueInEachGenre }}</span>-->
{{ thatIndex }}. {{ thatKey }} : <strong>
{{ theValueInEachGenre }} </strong></span>
</div>`
                }
            }
        }
    }
})