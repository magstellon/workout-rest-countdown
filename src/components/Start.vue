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


<style lang="scss" scoped>
#start {
    .button {
        width: 280px;
        height: 280px;

        border-radius: 280px;
        border: 10px solid #F2ECFF;

        text-align: center;
        line-height: 280px;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        cursor: pointer;

        transition: background 0.5s ease;
    }

    .button:hover {
        background-color: #551A4F;
    }
}



</style>
