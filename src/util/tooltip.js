/**
 * Created by william.reilly on 10/10/17.
 * Lesson 119 Plugins
 */




export default {
    install(Vue) {
        Vue.directive('tooltip', {
            // LESSON 119 PLUGINS - Moved here to /util/tooltip.js from /main.js
            // LESSON 115 Custom Directives
            // Used in MovieList.vue
            //    <!--  This is the DIV  that is 'el' in our v-tooltip DIRECTIVE: class="session-time-wrapper tooltip-wrapper" -->

            /*

             Q. What is that "[0]" bit?
             A. getElementsByTagName returns an Array, even when there's just one item in it (the case here)

             let mouseoverDiv = el.getElementsByTagName('div')[0] // first session lozenge ?

             'SPLANATION:
             Okay - (below) we put the v-tooltip on that 2nd level DIV ("session-time-wrapper")
             That element (that DIV) is our 'el'.
             In that way, the "[0]th" child div to that, our 'el', (it's the only child div) is that 3rd level DIV ("session-time") that is the exact element to which we want to apply the tooltip-on/off class.
             That's why the perhaps not immediately intuitive "[0]" works. All righty.

             <div class="movie-sessions>
             <div class="session-time-wrapper tooltip-wrapper"
             v-tooltip="{ seats: movieSession.seats }">
             <div class="session-time">
             e.g. 1:00 PM
             </div>
             </div>
             <div class="session-time-wrapper tooltip-wrapper"
             v-tooltip="{ seats: movieSession.seats }">
             <div class="session-time">
             e.g. 2:00 PM
             </div>
             </div>
             </div>
             */


//          https://vuejs.org/v2/guide/custom-directive.html#Directive-Hook-Arguments
// fwiw, documentation calls it 'binding'
// and our Instructor has opted to call it 'bindings'
// no matter

            bind(el, bindings) {
                console.log('DIRECTIVE el ', el)
                /*
                 DIRECTIVE el
                 <div class="session-time-wrapper tooltip-wrapper"> // << 'el'
                 <div class="session-time"> ... // << What we want the mouseover on
                 4:15 PM
                 </div></div>
                 */
                console.log('DIRECTIVE bindings ? ', bindings)
                console.log('DIRECTIVE bindings.value.seats ? ', bindings.value.seats)
                /*
                 DIRECTIVE bindings ?

                 https://vuejs.org/v2/guide/custom-directive.html#Directive-Hook-Arguments
                 binding

                 {name: "tooltip", rawName: "v-tooltip", value: {…}, expression: "{ seats: movieSession.seats }", modifiers: {…}, …}

                 def: {bind: ƒ}
                 expression: "{ seats: movieSession.seats }"
                 modifiers: {}
                 name: "tooltip"
                 rawName: "v-tooltip"
                 value: {seats: 190}
                 __proto__: Object
                 */

                /*

                 // ==== TEST : OK =========
                 // https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
                 // Create a new paragraph element, and append it to the end of the document body
                 var p = document.createElement("p");
                 console.log('wth is p pls? ', p)
                 // <p></p>
                 document.body.appendChild(p); // Yes, worked.
                 var bitOfText = document.createTextNode('Bit of testing text..')
                 p.appendChild(bitOfText) // ? Yes that worked. Huh.
                 // =======================

                 */

                // Instructor Code. What is this ['SPAN'] thing ?
                // Good grief. Either I viewed it wrong (maybe),
                // OR the Instructor actually HAD it wrong, putting [] there instead of (). Waste o' time!
                // var spanInstructor = document.createElement['SPAN'] // ? WAS WRONG!!
                var spanInstructor = document.createElement('SPAN') // Yah.
                console.log('wth is spanInstructor pls? ', spanInstructor)
                // WAS []: undefined
                // Now ():  should work, with () vs. [] // << <span></span>

                var spanWR = document.createElement('span')
                console.log('wth is spanWR pls? ', spanWR)
                // <span></span>

                console.log('helpers.js stuff. -01- spanWR.classList (who knew?) ', spanWR.classList)

                /*
                 Instructor uses his /util/helpers.js methods for this.
                 addClass()....
                 I just used Element.setAttribute()
                 */
                // spanWR.setAttribute('class', 'tooltip tooltip-show') // << William, you don't want them ALL to "show"! See next line. (well, for testing, maybe...)
                spanWR.setAttribute('class', 'tooltip')

                console.log('helpers.js stuff. -02- spanWR.classList (who knew?) ', spanWR.classList)

                /*
                 wth is spanWR pls?
                 <span></span>

                 (but then, Console renders it as when it is fully populated subsequently!)
                 <span class=​"tooltip tooltip-show">​ . . . ​</span>​


                 // weird
                 // <U+200B>
                 // "Zero Width Space"
                 // http://www.fileformat.info/info/unicode/char/200B/index.htm
                 // "invisible word separation and for line break control; it has no width" 'ZWSP'



                 helpers.js stuff. -01- spanWR.classList (who knew?)  [value: ""]

                 helpers.js stuff. -02- spanWR.classList (who knew?)  (2) ["tooltip", "tooltip-show", value: "tooltip tooltip-show"]
                 length: 2value: "tooltip tooltip-show"0: "tooltip"1: "tooltip-show"
                 */



                var text = document.createTextNode('HardCodeMAIN.JS Seats BEING available ...' + bindings.value.seats)
                var text = document.createTextNode('Seats available: ' + bindings.value.seats)

                // ""TypeError: Cannot read property 'appendChild' of undefined""
                // spanInstructor.appendChild(text) // undefined

                // Also my spanWR undefined. sheesh.
                // Huh. now it works ?
                spanWR.appendChild(text)

                // This line just makes us the "hardCodedMAIN.JS" version of the span:
                el.appendChild(spanWR)

                /* Make It An Event!
                 <div class="session-time-wrapper tooltip-wrapper"> // << 'el'
                 <div class="session-time"> ... // << What we want the mouseover on
                 */
                let mouseoverDiv = el.getElementsByTagName('div')[0] // re: that "[0]", see above "'SPLANATION" ;o)
                console.log('mouseOverDiv what are you? ', mouseoverDiv)

                mouseoverDiv.addEventListener('mouseover', mouseOverHandler)
                mouseoverDiv.addEventListener('mouseout', mouseOutHandler)
                // MOBILE!
                mouseoverDiv.addEventListener('touchstart', mouseOverHandler)
                mouseoverDiv.addEventListener('touchend', mouseOutHandler)
            },
            unbind(el) {
                /*
                 Because these get REMOVED from the DOM, you must REMOVE Listeners!
                 That is, when user filters by day, the movie session times lozenges things will get removed and added.
                 The listeners attached really need to be explicitly removed when they go.
                 Otherwise, wasting CPU, memory, & ETc.
                 */
                let mouseoverDiv = el.getElementsByTagName('div')[0] // re: that "[0]", see above "'SPLANATION" ;o)
                console.log('*** UNBIND *** whoa we got here *** ') // Yep.
                mouseoverDiv.removeEventListener('mouseover', mouseOverHandler)
                mouseoverDiv.removeEventListener('mouseout', mouseOutHandler)
                // MOBILE!
                mouseoverDiv.removeEventListener('touchstart', mouseOverHandler)
                mouseoverDiv.removeEventListener('touchend', mouseOutHandler)
            }
        })
    }
}




let mouseOutHandler = function(event) {
    console.log('we got mouseOUT')
    console.log(event.target) // << <div class="session-time">7:30 PM</div>
    let foundSpan = event.target.parentNode.getElementsByTagName('SPAN')[0]
    /* remove did remove it, but...
     we need to put back the 'tooltip' class.
     Why?
     Because it carries the necessary 'display:none;'. Hah!
     So actually, if I just do ".setAttribute" again, that essentially whacks the entire class="" attribute, and will put in 'tooltip'. Done.
     (If I needed a more fine-grained method, to just *add* an attribute to an existing set, well, I'd need to fuss more.)
     */
    // foundSpan.removeAttribute('class', 'tooltip-show')
    foundSpan.setAttribute('class', 'tooltip')
    console.log('foundSpan is ', foundSpan)
}
let mouseOverHandler = function(event) {
    console.log('we got mouse over mouseover')
    console.log(event.target) // << <div class="session-time">7:30 PM</div>
    let foundSpan = event.target.parentNode.getElementsByTagName('SPAN')[0]
    console.log('foundSpan is ', foundSpan)
    foundSpan.setAttribute('class', 'tooltip-show')
}
