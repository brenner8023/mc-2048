<template>
    <div :style="numStyle">
        {{ num ? num : '' }}
    </div>
</template>

<script>
export default {
    name: 'EachNum',
    data() {
        return {
            bgColorObj: {
                2: "#eee4da",
                4: "#F4A460",
                8: "#FF7F50",
                16: '#FF6347',
                32: '#FF4500',
                64: '#f65e3b',
                128: '#edcf72',
                256: '#edcc61',
                512: '#edc850',
                1024: '#edc53f',
                2048: '#edc22e',
                4096: '#3c3a32',
                8192: '#3c3a32',
            }
        }
    },
    props: {
        num: null,
    },
    computed: {
        numStyle() {
            return {
                backgroundColor: this.bgColorObj[this.num],
                color: this.num > 4 ? 'f9f6f2' : '#333',
                fontSize: this.num > 1000 ? '36px' : '48px'
            }
        },
    }
}
</script>

<style scoped>
div {
    box-sizing: border-box;
    width: 120px;
    height: 120px;
    border-radius: 10px;
    line-height: 120px;
}
</style>
