<template>
    <div id="start">
        <a class="button" @click="$emit('start')">START</a>
    </div>
</template>

<script>
export default {
    name: 'Start',
    props: {
        started: Boolean
    }
}
</script>


<style scoped>
#start .button {
    width: 300px;
    height: 300px;

    border-radius: 300px;
    border: 10px solid #AAAAAA;

    text-align: center;
    line-height: 300px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    cursor: pointer;

    transition: background 0.5s ease;
}

#start .button:hover {
    background-color: #551A4F;
}

</style>
