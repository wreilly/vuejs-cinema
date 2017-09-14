<template>
    <div>
        <p>Hi. Detail is in the house.</p>
        <!--These 3 all work. tt0379225  :o)-->
        <div>id? prop? {{ id }}</div>
        <div>id? params? {{ this.$route.params.id }}</div>
        <div>id? params? {{ $route.params.id }}</div>
        <!--No. doesn't know what 'params' is. Sheesh
        <div>id? params? {{ params.id }}</div>-->

        <!--<div>day! {{ day }}</div> &lt;!&ndash; undefined. hmm. &ndash;&gt;-->
    </div>
</template>

<script>
    export default {
        /*
Yes:        'id' from $route.params (from the URL)
No!:        'day' passed as v-bind: prop from <router-view>
(see routes.js re: why not)
         */
//        props: ['id', 'day'],
        props: ['id'],
        created() {
            console.log('Detail, created()! PROPS this.id, this.day ', this.id, this.day) // this.day undefined << Ok, expected; see routes.js why
            //  tt1352852 undefined << Yep

            console.log('Detail, created()! PARAMS this.$route.params.id ', this.$route.params.id)
            //  tt1352852 << Yep
        }
    }
</script>