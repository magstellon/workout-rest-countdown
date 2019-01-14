<template>
    <div id="interval">
        <p>{{time}}</p>
        <a class="button" @click="$emit('stop')">Stop</a>

        <a class="button" v-if="timeoutId" @click="pause">Pause</a>
        <a class="button" v-else @click="play">Play</a>
    </div>
</template>



<script>
export default {
    name: 'Interval',
    data() {
        return {
            duration: 90,
            end: null,
            time: `00:${this.duration}:000`,
            timeoutId: null
        }
    },
    methods: {
        computeInterval() {
            let now = new Date(),
                timeLeft = new Date(this.end - now),
                msec = timeLeft.getMilliseconds(),
                sec = timeLeft.getSeconds(),
                min = timeLeft.getMinutes();
            
            if(timeLeft <= 0) {
                this.time = '00:00:000';
            } else {
                // Format number to always have N digits
                msec = ('000' + msec).substr(-3);
                sec = ('0' + sec).substr(-2);
                min = ('0' + min).substr(-2);

                this.time = `${min}:${sec}:${msec}`;
                this.timeoutId = setTimeout(this.computeInterval, 10);
            }
        },
        pause() {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        },
        play() {
            this.computeInterval();
        }
    },
    mounted() {
        this.$nextTick(function () {
            // Code that will run only after the entire view has been rendered
            this.end = new Date();
            this.end.setSeconds(this.end.getSeconds() + this.duration);
            
            this.play();
        })
    },
    beforeDestroyed() {
        // Remove timeout loop on component's destroy
        pause();
    }

}
</script>

<style scoped>
#interval {

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}
</style>
