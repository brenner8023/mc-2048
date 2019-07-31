<template>
<div class="container">
    <div class="square-wrap">
        <div v-for="item in [0, 1, 2, 3]" :key="item">
            <div class="square" v-for="item2 in [0, 1, 2, 3]" :key="item2">
                <EachNum :num="numArr[item2][item]" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import EachNum from '@/components/EachNum';

export default {
    name: 'GameContainer',
    components: {
        EachNum,
    },
    data() {
        return {
            numArr: [],
            isMoved: false, // 方块矩阵是否有移动
            keyCodeMap: {
                38: 0, // Up
                39: 1, // Right
                40: 2, // Down
                37: 3, // Left
                87: 0, // W
                68: 1, // D
                83: 2, // S
                65: 3 // A
            }
        };
    },
    /**
     * 使用for循环生成4*4的矩阵, 元素初始值都是null
     * 然后随机在x个位置生成数字, x取值小于等于4
     */
    created() {
        this.initNumArr();
    },
    /**
     * 键盘按键抬起时触发move函数
     */
    mounted() {
        document.addEventListener('keyup', (e) => {
            var keyCode = this.keyCodeMap[e.which];
            this.move(keyCode);
        });
    },
    beforeUpdate() {
        this.generateNewNum();
        this.isMoved = false;
    },
    methods: {
        /**
         * 初始化numArr
         */
        initNumArr() {
            let positionX = 0;
            let positionY = 0;
            
            for(let i = 0; i < 4; i++) {
                this.numArr[i] = [];
                for(let j = 0; j < 4; j++) {
                    this.numArr[i][j] = null;
                }
            }
            for(let i = 0; i < 4; i++) {
                positionX = Math.floor(4 * Math.random());
                positionY = Math.floor(4 * Math.random());
                this.numArr[positionX][positionY] = 2 + 2 * Math.round(Math.random()); 
            }
        },
        /**
         * 根据按键进行方块的移动
         */
        move(keyCode) {
            let newNumArr = [];
            let newSonArr = []; // 存放每个合并后的新数组

            switch(keyCode) {
                case 0: // 向上移动
                    {
                        for(let j = 0; j < 4; j++) {
                            let son = [];

                            for(let i = 0; i < 4; i++) {
                                son.push(this.numArr[i][j]);
                            }
                            newSonArr.push(this.moveAndMerged(son, false));
                        }

                        for(let j = 0; j < 4; j++) {
                            let son = [];
                            
                            for(let i = 0; i < 4; i++) {
                                son.push(newSonArr[i][j]);
                            }
                            newNumArr.push(son);
                        }
                        break;
                    }

                case 1: // 向右移动
                    for(let i = 0; i < 4; i++) {
                        newNumArr.push(this.moveAndMerged(this.numArr[i], true));
                    }
                    break;

                case 2: // 向下移动
                    for(let j = 0; j < 4; j++) {
                        let son = [];

                        for(let i = 0; i < 4; i++) {
                            son.push(this.numArr[i][j]);
                        }
                        newSonArr.push(this.moveAndMerged(son, true));
                    }

                    for(let j = 0; j < 4; j++) {
                        let son = [];
                        
                        for(let i = 0; i < 4; i++) {
                            son.push(newSonArr[i][j]);
                        }
                        newNumArr.push(son);
                    }
                    break;

                case 3: // 向左移动
                    for(let i = 0; i < 4; i++) {
                        newNumArr.push(this.moveAndMerged(this.numArr[i], false));
                    }
                    break;
            }
            // 使用for循环遍历检测方块矩阵是否变化了
            for(let i = 0; i < 4; i++) {
                for(let j = 0; j < 4; j++) {
                    if(newNumArr[i][j] !== this.numArr[i][j]) {
                        this.isMoved = true;
                        break;
                    }
                }
            }
            if(this.isMoved) {
                this.numArr = newNumArr;
                newNumArr = [];
                this.isMoved = false;
            } else {
                // 检测游戏是否结束
                newNumArr = [];
                this.isGameOver();
            }
        },
        /**
         * 数字的移动消除合并
         */
        moveAndMerged(arr, reverseDirection) {
            let length = 4;
            let arrIndex = reverseDirection ? length - 1 : 0;
            let newArr = new Array(4).fill(null); // 生成元素只有null的数组
            let isMerged = false; // 布尔值, 表示数组元素是否合并过
            let flag = false; // 判断矩阵是否有发生变化

            if(!reverseDirection) {
                for(let i = 0; i < length; i++) {
                    if(arr[i] !== null) {
                        if(arr[i] === newArr[arrIndex-1] && !isMerged) {
                            newArr[arrIndex-1] *= 2;
                            this.$store.commit('addScore', newArr[arrIndex-1]);
                            isMerged = true; // 合并过一次了, 后面就无需再合并
                        } else {
                            newArr[arrIndex] = arr[i];
                            arrIndex++;
                        }
                    }
                }
            } else { // 移动方向反方向的情况
                for(let i = length - 1; i >= 0; i--) {
                    if(arr[i] !== null) {
                        if(arr[i] === newArr[arrIndex+1] && !isMerged) {
                            newArr[arrIndex+1] *= 2;
                            this.$store.commit('addScore', newArr[arrIndex+1]);
                            isMerged = true;
                        } else {
                            newArr[arrIndex] = arr[i];
                            arrIndex--;
                        }
                    }
                }
            }
            return newArr;
        },
        /**
         * 移动合并之后生成新的数字
         */
        generateNewNum() {
            let flag = false; // 判断是否还有空间生成新数字
            let positionX = 0;
            let positionY = 0;

            for(let i = 0; i < this.numArr.length; i++) {
                flag = this.numArr[i].some(item => item === null);
                if(flag === true) break;
            }

            if(flag === true) {
                do {
                    positionX = Math.floor(4 * Math.random());
                    positionY = Math.floor(4 * Math.random());
                } while(this.numArr[positionX][positionY] !== null);

                this.numArr[positionX][positionY] = 2 + 2 * Math.round(Math.random());
            } else {
                this.isGameOver();
            }
        },
        /**
         * 判断游戏是否结束
         */
        isGameOver() {
            let gameover = true;

            for(let i = 0; i < this.numArr.length; i++) {
                gameover = !this.numArr[i].some(item => item === null);
                if(gameover === false) return 0;
            }

            // 检测矩阵每一行是否可以合并
            for(let i = 0; i < 4; i++) {
                this.numArr[i].some(function(item, index, arr) {
                    if(item === arr[index-1]) {
                        gameover = false;
                        return true;
                    }
                });
            }

            if(gameover === false) { return 0; }

            // 检测矩阵每一列是否可以合并
            for(let i = 0; i < 4; i++) {
                for(let j = 1; j < 4; j++) {
                    if(this.numArr[i][j] === this.numArr[i][j-1]) {
                        gameover = false;
                    }
                }
            }

            if(gameover) {
                window.alert('游戏结束');
                this.initNumArr();
            }
        }
    },
}
</script>

<style scoped>
.container {
    position: relative;
}

.square-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 540px;
}

.square {
    box-sizing: border-box;
    width: 120px;
    height: 120px;
    background: rgba(238, 228, 218, 0.6);
    border-radius: 10px;
    margin: 10px 6px;
}
</style>
