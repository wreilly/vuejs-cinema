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
                        <!-- First one, let's Comment more: -->
                        <div v-if="movieSession.time === movieSessions[0].time" class="session-time">
                        <!--<div v-if="false" class="session-time">-->
                            {{ gimmeMovieSessionTimeCommented(movieSession) }}
                        </div>
                        <div v-else class="session-time">
                            {{ gimmeMovieSessionTime(movieSession) }}
                        </div>
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
            // Just for some de-bugging:
            gimmeMovieSessionTimeCommented(movieSession) {
                console.log('WR__ -01- this ', this) // Vue$3 {_uid:14}
                console.log('WR__ -02- this.$root ', this.$root) // Vue$3 {_uid:1}
                // Note: In contrast to -C- and -D- below, here, -03- and -04- both work because ...
                // ...My "definedProperty" simply has the SAME NAME, albeit with a dollar sign, ('$moment') as the actual property: ('moment')
                // Whereas below (-C-, -D-) I gave the definedProperty a DIFFERENT NAME ('myBusVueProperty') (--on purpose, to test this out) Cheers.
                console.log('WR__ -03- this.$root.moment ', this.$root.moment) // ƒ hooks () { return hookCallback.apply(null, arguments);
                console.log('WR__ -04- this.$root.$moment ', this.$root.$moment) // ƒ hooks () { return hookCallback.apply(null, arguments);
                console.log('WR__ -05- this.$moment ', this.$moment) // ƒ hooks () { return hookCallback.apply(null, arguments);
                console.log('WR__ -06- this.moment ', this.moment) // undefined. Okay.

                // ======== (As seen on Overview.vue; just checkin' here too.)
                console.log('-A- this', this) // Vue$3 {_uid:13}
                console.log('-B- this.$root', this.$root) // Vue$3 {_uid:1}
                console.log('-C- this.$root.myBusVue', this.$root.myBusVue) // Vue$3 {_uid:0}
                console.log('-D- this.$root.$myBusVue', this.$root.$myBusVue) // undefined
                console.log('-C02- this.myBusVue', this.myBusVue) // undefined (NEED THAT .$root !
                console.log('-D02- this.$myBusVue', this.$myBusVue) // undefined
                console.log('-E- this.$root.myBusVueProperty', this.$root.myBusVueProperty) // undefined
                console.log('-F- this.$root.$myBusVueProperty', this.$root.$myBusVueProperty) // Vue$3 {_uid:0}   :o)
                console.log('-G- this.$myBusVueProperty', this.$myBusVueProperty) // Vue$3 {_uid:0}   :o)
                // ========
                return this.$moment(movieSession.time).format("h:mm A")
            },
            gimmeMovieSessionTime(movieSession) {
               console.log('WR__ -99- movieSession.time, plain y not: ', movieSession.time) // 2017-09-12T17:30:00.000Z
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
