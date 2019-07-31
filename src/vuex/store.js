import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    currScore: 0,
    bestScore: 0,
};

let getters = {
    currScore(state) {
        return state.currScore;
    },
};

let mutations = {
    addScore(state, score) {
        state.currScore += score;
        if(state.currScore > state.bestScore) {
            state.bestScore = state.currScore;
        }
    },
    saveState(state) {
        localStorage.setItem('state', JSON.stringify(state));
    },
    initState(state) {
        let localState = JSON.parse(localStorage.getItem('state'));
        if(localState) {
            let { bestScore } = localState;
            state.bestScore = bestScore;
        }
    },
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
});