<template>
    <div id="interval">
        <svg width="300" height="300">
            <text x="46" y="165" fill="white">{{time}}</text>
            <circle class="countdown-base" cx="150" cy="150" r="140"/>
            <circle class="countdown" cx="150" cy="150" r="140" :stroke-dasharray="`2 ${timeLeftPercent + 2}`"/>
        </svg>

        <icon icon="stop" class="button right" @click="$emit('stop')" />
        <icon icon="pause" class="button left" v-if="timeoutId" @click="pause" />
        <icon icon="play" class="button left" v-else @click="play" />

    </div>
</template>



<script>
export default {
    name: 'Interval',
    data() {
        return {
            duration: 10,
            start: null,
            end: null,
            time: `00:${this.duration}:000`,
            timeLeftPercent: 100,
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
            
            this.timeLeftPercent = parseInt(timeLeft * 100 / new Date(this.end - this.start));

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
            this.start = new Date();
            this.end = new Date(this.start.getTime());
            this.end.setSeconds(this.end.getSeconds() + this.duration);
            
            this.play();
        })
    },
    beforeDestroyed() {
        // Remove timeout loop on component's destroy
        this.pause();
    }

}
</script>

<style scoped>
#interval {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 300px;
}

.countdown {
    fill: none;
    stroke: #F9F871;
    stroke-width: 10px;
}

.countdown-base {
    fill: none;
    stroke: #F2ECFF;
    stroke-width: 10px;
    stroke-dasharray: 2;
}

.left {
    float: left;
}

.right {
    float: right;
}

.button:hover {
    color:#F9F871;
    cursor: pointer;
    transition: color 0.5s ease;
}
</style>
