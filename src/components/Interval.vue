<template>
    <div id="interval">
        <svg width="300" height="300">
            <text x="46" y="165" fill="white">{{time()}}</text>
            <circle class="countdown-base" cx="150" cy="150" r="140"/>
            <circle class="countdown" cx="150" cy="150" r="140" transform="rotate(270, 150, 150)" :stroke-dasharray="`2 ${Math.max(timeLeft * 100 / duration, 2)}`"/>
        </svg>

        <icon icon="stop" class="button right" @click="$emit('stop')" />
        <icon icon="pause" class="button left" v-if="isRunning" @click="pause" />
        <icon icon="play" class="button left" v-if="!isRunning && !finish" @click="play" />
        <icon icon="undo" class="button right" v-if="!isRunning" @click="refresh" />
    </div>
</template>

<script>
export default {
    name: 'Interval',
    data() {
        return {
            start: null,
            end: null,
            duration: 10000,
            timeLeft: 10000,
            isRunning: true,
        }
    },
    methods: {
        run() {
            if (this.timeLeft > 0 && this.isRunning) {
                setTimeout(() => {

                    this.timeLeft = new Date(this.end - new Date()).getTime();
                    if (this.timeLeft <= 0) this.isRunning = false;

                    this.run();
                }, 10);
            }
        },
        play() {
            this.isRunning = true;
            this.computeInterval();
            this.run();
        },
        pause() {
            this.isRunning = false;
        },
        computeInterval() {
            this.start = new Date();
            this.end = new Date(this.start.getTime());
            this.end.setMilliseconds(this.end.getMilliseconds() + this.timeLeft);
        },
        refresh() {
            this.timeLeft = this.duration;
        },
        time() {
            let timeLeft = new Date(this.timeLeft),
                msec = timeLeft.getMilliseconds(),
                sec = timeLeft.getSeconds(),
                min = timeLeft.getMinutes(),
                time = '00:00:000';

            if (this.timeLeft > 0) {
                // Format number to always have N digits
                msec = ('000' + msec).substr(-3);
                sec = ('0' + sec).substr(-2);
                min = ('0' + min).substr(-2);

                return `${min}:${sec}:${msec}`;
            }

            return time;
        }
    },
    computed: {
        finish() {
            return this.timeLeft <= 0;
        }
    },
    created() {
        this.computeInterval();
    },
    mounted() {
        this.$nextTick(function () {
            // Code that will run only after the entire view has been rendered
            this.run();
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
