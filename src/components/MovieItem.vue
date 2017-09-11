<template>
    <div class="movie">
        <p>
        {{ movieItemThingFooBar.Title }}
        </p>
        <div class="movie-col-left">
            <img v-bind:src="movieItemThingFooBar.Poster" alt="">
        </div>
        <div class="movie-col-right">
            <div class="movie-title">
                <h2>{{ movieItemThingFooBar.Title }}</h2>
                <span class="movie-rating">{{ movieItemThingFooBar.Rated }}</span>
                &nbsp; <span class="movie-rating">{{ movieItemThingFooBar.imdbRating }}</span>
                <div class="movie-sessions">
                        <div v-for="movieSession in filteredMovieSessionsByDayByTimeMethod(movieSessions)" class="session-time-wrapper">
                        <div class="session-time">
                            {{ gimmeMovieSessionTime(movieSession) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import myFrozenTimes from '../util/times'

    export default {
        props: ['movieItemThingFooBar', 'movieSessions', 'timesmylistForItem', 'todayForItem'],
        // movieItemThingFooBar = all we got on that movie ...
        // movieSessions = a property actually on the movie object, but separated out for ease of processing
        // timesmylistForItem = user-checked boxes re: "After 6pm" etc.
        // todayForItem = passed down object that was created somewhere above (main.js!), capturing moment() to get "today"

        methods: {
            gimmeMovieSessionTime(movieSession) {
                return this.$moment(movieSession.time).format("h:mm A")
            },
            /* ********************* */
            filteredMovieSessionsByDayByTimeMethod(movieSessions)  {
                return movieSessions
                    .filter(this.sessionPassesTimeFilter)
            },
            sessionPassesTimeFilter(eachMovieSession) {
                if (!this.$moment(eachMovieSession.time).isSame(this.todayForItem, 'day')) {
                    // Not "today"? Fuhgeddaboudid
                    return false
                } else if (this.timesmylistForItem.length === 2 || this.timesmylistForItem.length === 0) {
                    // Next up: with just 2 choices, clicking BOTH, or NEITHER, these both yield: "true" / pass / include
                    // Choice 1: "Before 6pm"; Choice 2: "After 6pm"
                    // - NEITHER checked = No preference, bring 'em ALL on, all are good.
                    // - BOTH checked = (bit odd but what the hey) We Boolean "OR" them together to create the set of ALL possibilities are good.
                    return true
                } else if ( this.timesmylistForItem[0] === myFrozenTimes.BEFORE_6PM) {
                    /* Finally, the real testing conditions.
                    Our user has clicked one (and only one) of our 2 choices.
                    Is it "Before 6pm"? ...
                    See the array at its [0] position!
                    */
                    return this.$moment(eachMovieSession.time).hour() < 18
                } else if (this.timesmylistForItem[0] === myFrozenTimes.AFTER_6PM) {
                    return this.$moment(eachMovieSession.time).hour() >= 18
                } else {
                    console.log('You Really Should Never Get Here (MovieItem.vue sessionPassesTimeFilter(eachMovieSession)): ', eachMovieSession)
                }
            }
        }
    }
</script>
