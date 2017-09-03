<template>
    <div class="movie">
        <p>
        Here in MovieItem, FOOB2 our movie has a title: {{ movieItemThingFooBar.Title }}
        </p>
        <div class="movie-col-left">
            <img v-bind:src="movieItemThingFooBar.Poster" alt="">
        </div>
        <div class="movie-col-right">
            <div class="movie-title">
                <h2>{{ movieItemThingFooBar.Title }}</h2>
                <span class="movie-rating">{{ movieItemThingFooBar.Rated }}</span>
                &nbsp; <span class="movie-rating">{{ movieItemThingFooBar.imdbRating }}</span>
            </div>
        </div>
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
