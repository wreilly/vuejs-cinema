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
                this.$myBusPropertyReference.$emit('check-filter-child-event-bus', this.category, this.title, this.checked)
            }
        }
    }
</script>