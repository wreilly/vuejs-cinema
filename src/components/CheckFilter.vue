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
        props: [ 'theValueInEachGenre', 'thatKey', 'thatIndex', 'title'],
        data: function() {
            return {
                checked: false
            }
        },
        methods: {
            checkFilterChildMethod() {
                this.checked = !this.checked
                console.log('this.theValueInEachGenre', this.theValueInEachGenre) // Yep! Crime
                // Per Instructor code, we'll insert a first parameter here to "hard-code" the "type" of filter: "genre" Lecture 77 ~03:55:
                this.$emit('check-filter-child-event', 'genre', this.theValueInEachGenre, this.checked) // Yes
            }
        }
    }
</script>