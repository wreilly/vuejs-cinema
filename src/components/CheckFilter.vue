<template>
    <div v-bind:class=" {
'check-filter': true,
active: checked  } "
         v-on:click="checkFilterChildMethod">

        <span class="checkbox"></span>

        <span class="check-filter-title">
{{ thatIndex }}. {{ thatKey }} : <strong>
{{ title }}
        </strong></span>
    </div>
</template>

<script>
    export default {
        props: [ 'theValueInEachGenre', 'thatKey', 'thatIndex', 'title', 'category'],
        data: function() {
            return {
                checked: false
            }
        },
        methods: {
            checkFilterChildMethod() {
                this.checked = !this.checked
/* INITIAL -01-  EMIT CHAIN:
                this.$emit('check-filter-child-event', this.category, this.title, this.checked)
*/

/* NEW -02- LESSON 98 EVENT BUS:  */
          //      console.log('method... this ', this) // Vue component $myBus undefined
/*
                this.$myBus.$emit('check-filter-child-event-bus', this.category, this.title, this.checked)
*/


                // ATTEMPT! FAILED: PROTOTYPE DEFINED PROPERTY: $myBusVueProperty
//                console.log('this', this) // Vue$3 {_uid:13}
//                console.log('this.$root', this.$root) // Vue$3 {_uid:1}
//                console.log('this.$root.$myBusVueProperty', this.$root.$myBusVueProperty) // undefined
               // this.$root.$myBusVueProperty.$emit('check-filter-child-event-bus', this.category, this.title, this.checked)


                // ** *WORKS!  $myBusVue ***
                // Yes: PROTOTYPE DEFINED PROPERTY: $myBusVue
                console.log('this', this) // Vue$3 {_uid:13}
                console.log('this.$root', this.$root) // Vue$3 {_uid:1}
                console.log('this.$root.myBusVue', this.$root.myBusVue) // Vue$3 {_uid:0}
                console.log('this.$root.$myBusVue', this.$root.$myBusVue) // undefined
//                this.$root.myBusVue.$emit('check-filter-child-event-bus', this.category, this.title, this.checked)


                // **  ***
                // ATTEMPT # 3 PROTOTYPE DEFINED PROPERTY: $myBusVueDataPropNew
                // No! >> // Invoke the defined property on the Vue __proto__ (no '.$root')
                /* For this CheckFilter component, even though we are doing "ATTEMPT # 3" with "DataProp" etc., it is NOT USED here. It does NOT change how this component just uses the defined Property (not any "passed-in prop"). Only Overview.vue is using that passed-in prob biz.)
                */
                console.log('AAGGHH - this.$myBusVueDataPropNew ', this.$myBusVueDataPropNew) // undefined (which is correct - there is no defined property '$myBusVueDataPropNew') OK
                console.log('AAGGHH-02 - this.myBusVueDataPropNew ', this.myBusVueDataPropNew) // undefined (which is also correct - there is no passed-in prop 'myBusVueDataPropNew') OK
//                this.$myBusVueDataPropNew.$emit('check-filter-child-event-bus', this.category, this.title, this.checked)
                // YES!!! :o)
                this.$myBusVueProperty.$emit('check-filter-child-event-bus', this.category, this.title, this.checked)




                /*
                this.$myBusPropertyReference.$emit('check-filter-child-event-bus', this.category, this.title, this.checked)
*/
            }
        }
    }
</script>