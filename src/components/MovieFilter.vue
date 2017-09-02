<template>
    <div id="movie-filter">
        <h2>Filter results</h2>
        <div class="filter-group">
            <check-filter
                    v-for="(dataGenre, gkey, indexWhyNot) in dataGenres"
                    v-bind:theValueInEachGenre="dataGenre"
                    v-bind:thatKey="gkey"
                    v-bind:thatIndex="indexWhyNot"
                    v-bind:key="gkey"
                    v-on:check-filter-child-event="checkFilterParentMethod">
            </check-filter>
        </div>
    </div>
</template>

<script>
    import myFrozenGenres from '../util/genres'
    import CheckFilter from './CheckFilter.vue'

    export default {
        data: function () {
            return {
                dataGenres: myFrozenGenres
            }
        },
        methods: {
            checkFilterParentMethod(category, title, checked)
            {
                console.log('checkFilterParentMethod!', category, ' | ', title, ' | ', checked)
                this.$emit('check-filter-parent-event', category, title, checked) // pass it on up...
            }
        },
        components: {
            // SUB-COMPONENT!
//            CheckFilter: 'check-filter' // << Nope! Dumkoppff!
            'check-filter': CheckFilter
        }
    }
</script>
