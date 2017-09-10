/**
 * Created by william.reilly on 9/10/17.
 */


/*
Here is how this is being called, from main.js:
WITH BIND()

 this.$myBus.$on(
  'check-filter-child-event-bus',
  myUtilRootCheckFilterBusMethod.bind(this)
 )

Sets ("binds") the 'this' here in the function, to be the passed-in 'this' which came from the root instance.
That way we can, from right here in util ... easily access the [genre] and [time] array data etc. on main. Bon.
 */

function myUtilRootCheckFilterBusMethod(category, title, checked)  {
    console.log('-03- NEW myUtilRootCheckFilterBusMethod!', category, ' | ', title, ' | ', checked )
    // Great. This is getting the data here, directly via the Event Bus (no longer the up-and-down of $emit chain).
    // Time to just non-DRY copy & paste same logic that is found in the "grandFather" method below, to apply/use here. Cheers.
    /* Pseudo-code-ish-spec:
     We have two arrays in data{}: genre[], time[].
     - Passed-in 'category' is a String to indicate which.
     - Passed-in 'title' is a String value to add to the appropriate array.
     - Passed-in 'checked' is a Boolean which tells us, actually, whether it should be added or in fact removed ("unchecked").
     Bon.
     So, we determine whether checked is T/F, etc.
     e.g.
     category | title | checked
     genre | Comedy | true
     */
    if (!checked) {
        // SUBTRACT!
        // We do assume the title is there in the array, but, we have to find out just *where* it is in the array, to remove it!
        var foundPosition = this[category].findIndex((eachTitle) => eachTitle === title)
        this[category].splice(foundPosition, 1)
    } else {
        this[category].push(title)
    }
}

// Unexpected token, expected {
// export myUtilRootCheckFilterBusMethod
export { myUtilRootCheckFilterBusMethod }