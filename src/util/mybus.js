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

export { myUtilRootCheckFilterBusMethod }
