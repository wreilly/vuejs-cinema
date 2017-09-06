<template>
    <div id="movie-filter">
        <h2>Filter results</h2>
        <h3>By time of day:</h3>
        <div class="filter-group">
<!--
            // N.B. Lesson 93. We genericize this sub-component to accept both Genres and Times, by calling the string value for each simply 'title' - not, 'theValueInEachGenre' and 'theValueInEachTime'
-->

            <check-filter
                    v-for="(dataTime, tkey, indexWhyNot02) in dataTimes"
                    v-bind:theValueInEachTime="dataTime"
                    v-bind:thatTKey="tkey"
                    v-bind:thatIndex01="indexWhyNot02"

                    v-bind:key="tkey"


 v-bind:title="dataTime"
                    category="time"

                    v-on:check-filter-child-event="checkFilterParentMethod">
            </check-filter>
        </div>
        <h3>By genre:</h3>
        <div class="filter-group">
            <check-filter
                    v-for="(dataGenre, gkey, indexWhyNot) in dataGenres"
                    v-bind:theValueInEachGenre="dataGenre"
                    v-bind:thatKey="gkey"
                    v-bind:thatIndex="indexWhyNot"

                    v-bind:key="gkey"

 v-bind:title="dataGenre"
                    category="genre"

                    v-on:check-filter-child-event="checkFilterParentMethod">
            </check-filter>
        </div>
    </div>
</template>

<script>
    import myFrozenGenres from '../util/genres'
    import myFrozenTimes from '../util/times'

    import CheckFilter from './CheckFilter.vue'

    export default {
        data: function () {
            return {
                dataGenres: myFrozenGenres,
                dataTimes: myFrozenTimes
            }
        },
        methods: {
            /*
             - category is type of category: 'genre' or 'time'
             - title is name of a category value: 'Comedy' or 'Crime', or 'After 6 pm'
             - checked is Boolean: true or false
             */
            checkFilterParentMethod(category, title, checked)
            {
                console.log('checkFilterParentMethod!', category, ' | ', title, ' | ', checked)
                this.$emit('check-filter-parent-event', category, title, checked) // pass it on up...
            }
        },
        components: {
            // SUB-COMPONENT!
            // We use for 2 purposes: 1) Genres, 2) Times
//            CheckFilter: 'check-filter' // << Nope! Dumkoppff!
            'check-filter': CheckFilter
        }
    }
</script>
