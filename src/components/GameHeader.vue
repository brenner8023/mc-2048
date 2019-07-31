<template>
<div class="container">
    <h1 class="row-left"><span>2048</span></h1>
    <div class="row-right">
        <span>当前分数:</span>
        <span>{{ currScore }}</span>
        <span>最高分:</span>
        <span>{{ bestScore }}</span>
    </div>
</div>
</template>

<script>
export default {
    name: 'GameHeader',
    data () {
        return {}
    },
    computed: {
        currScore() {
            return this.$store.state.currScore;
        },
        bestScore() {
            return this.$store.state.bestScore;
        }
    },
}
</script>

<style scoped lang="scss">
.container {
    width: 540px;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: space-between;

    h1.row-left {
        font-size: 48px;
        color: #ff0066;
    }

    .row-right {
        color: white;
        padding: 2px 4px;

        span:nth-of-type(2n-1) {
            font-size: 16px;
        }
        span:nth-of-type(2n) {
            font-size: 32px;
            color: #8B0000;
        }
    }
}
</style>
