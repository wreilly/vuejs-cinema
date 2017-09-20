/*
Here is how the function below is being called, from main.js (or now from Overview.vue), using BIND():
 this.$myBus.$on(
  'check-filter-child-event-bus',
  myUtilRootCheckFilterBusMethod.bind(this)
 )
 */

function myUtilRootCheckFilterBusMethod(category, title, checked)  {
    console.log('-03- NEW myUtilRootCheckFilterBusMethod!', category, ' | ', title, ' | ', checked )
    /* Pseudo-code-ish-spec:
     We have two arrays in data{}: genre[], time[].
     - Passed-in 'category' is a String to indicate which (genre, or time).
     - Passed-in 'title' is a String value to add to the appropriate array (e.g. Comedy, or Before 6pm).
     - Passed-in 'checked' is a Boolean which tells us whether it should be added or in fact removed ("unchecked").
     e.g.
     category | title | checked
     genre | Comedy | true
     time | After 6pm | false
     */
    if (!checked) {
        var foundPosition = this[category].findIndex((eachTitle) => eachTitle === title)
        this[category].splice(foundPosition, 1)
    } else {
        this[category].push(title)
    }
}

/* How called, from MovieList.vue:
this.$on(
   'daySelectedEventCallAMethodUtilBus',
   daySelectedMethodUtilBusToCall)
    .bind(this)
    )
    // N.B. Payload is implicit. Whatever that .$emit sent, that's what you get in here. Cheers.
 */
function daySelectedMethodUtilBusToCall(dayPayload) {
    // Owing to, thanks to, .bind(), 'this' here continues to refer to ... MovieList.vue component (99% sure)
    // In any event, it is correctly referring to whatever the hell it is that it needs to refer to. :)

    console.log('??????? daySelectedMethodUtilBusToCall -- dayPayload._d thing ~= Moment object no? ', dayPayload._d) //


    /*
?     WORKS! 'Ta-da'. :o)
     */


    // We just whamma-jamma this 'day' (I've called it dayPayload, for fun) value (a Moment object) onto our MovieList.vue's PROP which gets called 'todayForList'.
    // THAT in turn (immediately!?) updates (reactive, Vue.js magic) the MovieList.vue DATA property I called 'todayForListData'. (I know, crazy.)
    this.todayForListData = dayPayload // whamma. oughta work. methinks.

    console.log('daySelected etc. THIS is ? ', this) // << Vue$3 MovieList.vue, kids. Okay. Good.

    console.log('*** GOOD the THIRD (method ON DA BUS to call) *** daySelectedMethodUtilBusToCall() ********************* this.todayForListData._d now should be same as daySelected: ', this.todayForListData._d) // YEP

}

export { myUtilRootCheckFilterBusMethod, daySelectedMethodUtilBusToCall }
