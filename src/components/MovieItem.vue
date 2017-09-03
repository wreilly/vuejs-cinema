<template>
    <div>
        Here in MovieItem, FOOB our movie has a title: {{ movieItemThingFooBar.movie.Title }}
    </div>
</template>

<script>
    export default {
/*
     Vue Magic:
        1) You use kebab-case over in SENDING Component's template/markup/HTML.
    2) Vue "magically" gives you camelCase of SAME THING, HERE in receiving Component's props: ['camelCase'].
    Cheers.
        https://vuejs.org/v2/guide/components.html#camelCase-vs-kebab-case
*/
    props: ['movieItemThingFooBar'] // all we got on that movie ...
    }
</script>
