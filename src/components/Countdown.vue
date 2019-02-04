<template>
    <div id="countdown">
        <svg width="300" height="300">
            <template v-if="editable">
                <polyline class="selector" points="62 110 72 100 82 110" @click="update(selectors.second.add)"/>
                <polyline class="selector" points="127 110 137 100 147 110" @click="update(selectors.millisecond.add)"/>
            </template>

            <text class="time" x="46" y="165" fill="white">{{time()}}</text>

            <template v-if="editable">
                <polyline class="selector" points="62 185 72 195 82 185" @click="update(selectors.second.remove)"/>
                <polyline class="selector" points="127 185 137 195 147 185" @click="update(selectors.millisecond.remove)"/>
            </template>

            <circle class="countdown-base" cx="150" cy="150" r="140"/>
            <circle class="countdown" cx="150" cy="150" r="140" transform="rotate(270, 150, 150)" :stroke-dasharray="`2 ${Math.max((timeLeft * 100 / duration) + 2, 2)}`"/>
        </svg>

        <icon icon="play" class="button left" v-if="!isRunning && !finish" @click="play" />
        <icon icon="pause" class="button left" v-if="isRunning && !editable" @click="pause" />
        
        <icon icon="undo" class="button right refresh" v-if="duration != timeLeft" @click="refresh" />
    </div>
</template>

<script>
export default {
    name: 'Countdown',
    props: ['restTime'],
    data() {
        return {
            start: null,
            end: null,
            timeLeft: null,
            duration: null,
            isRunning: false,
            editable: true,
            selectors: {
                second: {
                    add: 60 * 1000,
                    remove: -1 * 60 * 1000
                },
                millisecond: {
                    add: 1000,
                    remove: -1 * 1000
                }
            }
        }
    },
    methods: {
        run() {
            if (this.timeLeft > 0 && this.isRunning) {
                this.runID = setTimeout(() => {

                    this.timeLeft = new Date(this.end - new Date()).getTime();
                    if (this.timeLeft <= 0) this.isRunning = false;

                    this.run();
                }, 10);
            }
        },
        play() {
            this.isRunning = true;
            this.editable = false;
            this.computeCountdown();
            this.run();
        },
        pause() {
            this.isRunning = false;
            this.runID && clearTimeout(this.runID);
        },
        computeCountdown() {
            this.start = new Date();
            this.end = new Date(this.start.getTime());
            this.end.setMilliseconds(this.end.getMilliseconds() + this.timeLeft);
        },
        refresh() {
            this.pause();
            this.timeLeft = this.duration;
            this.editable = true;
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

                time = `${min}:${sec}:${msec}`;
            }

            return time;
        },
        update(ms) {
            if(ms > 0) {
                // Max time is 59 min 59 sec ~ 354 0000 ms + 59000 ms
                this.duration = Math.min( this.duration + ms, 3540000 + 59000);
            } else {
                // Remove second only when duration is greater than 1 second
                if (ms == this.selectors.second.remove) {
                    if (this.duration > 60 * 1000) this.duration = this.duration + ms;
                } else {
                    // Min time is 1 sec ~ 1000 ms
                    this.duration = Math.max( this.duration + ms, 1000);
                }
            }

            this.timeLeft = this.duration;
            this.$router.push(`/${this.duration}`);
        }
    },
    computed: {
        finish() {
            return this.timeLeft <= 0;
        }
    },
    created() {
        this.timeLeft = this.duration = this.restTime;
    },
    beforeDestroyed() {
        // Remove timeout loop on component's destroy
        this.pause();
    },
    beforeRouteUpdate (to, from, next) {
        let restTime = parseInt(to.params.restTime);
        
        this.timeLeft = this.duration = restTime;
        next();
    }
}
</script>

<style lang="scss" scoped>

@mixin transition($property) {
    transition: $property 0.5s ease;
}

#countdown {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 300px;

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

    .time {
        /* Prevent from text to be selectable */
        user-select: none;
        -webkit-tap-highlight-color: radial-gradient(circle, #051937, #061534, #080f30, #0a082d, #0c0029);
    }

    .button {
        @include transition(color);

        &:hover {
            color: #F9F871;
            cursor: pointer;
            @include transition(color);
        }
    }

    .selector {
        stroke: #00456A;
        stroke-width: 5;
        stroke-linecap: round;
        fill: none;
        stroke-linejoin: round;
        cursor: pointer;
        @include transition(stroke);

        &:hover {
            stroke: #006D8C;
            @include transition(stroke);
        }
    }
}
</style>
