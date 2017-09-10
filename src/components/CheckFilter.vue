<template>
    <div v-bind:class=" {
'check-filter': true,
active: checked  } "
         v-on:click="checkFilterChildMethod">
        <span class="checkbox"></span>

        <span class="check-filter-title">
{{ thatIndex }}. {{ thatKey }} : <strong>
<!--{{ theValueInEachGenre }}-->
{{ title }}
        </strong></span>
    </div>
</template>

<script>
    export default {
        // N.B. Lesson 93. We genericize this sub-component to accept both Genres and Times, by calling the string value for each simply 'title' - not, 'theValueInEachGenre' and 'theValueInEachTime'
        // Tres bien.
        props: [ 'theValueInEachGenre', 'thatKey', 'thatIndex', 'title', 'category'],
        data: function() {
            return {
                checked: false
            }
        },
        methods: {
            checkFilterChildMethod() {
                this.checked = !this.checked
               // console.log('this.theValueInEachGenre', this.theValueInEachGenre)
                // Yep! Crime
                // Now, generalize to 'title' (to handle both 'genre' and 'time'
                console.log('this.title', this.title)
                /*
                 this.theValueInEachGenre Comedy
                 CheckFilter.vue?2eb4:32 this.title Comedy
                 MovieFilter.vue?6219:59 checkFilterParentMethod! genre  |  Comedy  |  true
                 main.js?3479:50 checkFilterGrandParentMethod! genre  |  Comedy  |  true
                 */
/*
 this.theValueInEachGenre undefined
 CheckFilter.vue?7e16:32 this.title After 6pm
 MovieFilter.vue?6219:59 checkFilterParentMethod! time  |  After 6pm  |  true
 main.js?3479:50 checkFilterGrandParentMethod! time  |  After 6pm  |  true
*/


                // Per Instructor code, we'll insert a first parameter here to "hard-code" the "type" of filter: "genre" Lecture 77 ~03:55:
                // Lesson 93 ~03:42 no more hard-coding of category:
                // Also, now note that we put in *title*, no longer "theValueInEachGenre"
                /* Further learning: the $emit signature must match the v-on signature - gotta get those arguments and parameters to all line up. Only makes sense. I believe that is basic JavaScript, certainly not a Vue.js thing. Cheers
                (That final 'this.theValueInEachGenre' I left on (at the end) for the hell of it, just gets dropped on the floor, over in the called v-on method. Cheers encore.)
                */
                /*
                 - category is type of category: 'genre' or 'time'
                 - title is name of a category value: 'Comedy' or 'Crime', or 'After 6 pm'
                 - checked is Boolean: true or false
                 */

/* INITIAL -01-  EMIT CHAIN:
                this.$emit('check-filter-child-event', this.category, this.title, this.checked, this.theValueInEachGenre) // N.B. Last param here is "dropped on the floor" = not used by the called method. Okay, no biggie.
*/

/* NEW -02- LESSON 98 EVENT BUS:  */
                this.$myBus.$emit('check-filter-child-event-bus', this.category, this.title, this.checked, this.theValueInEachGenre)

            }
        }
    }
</script>