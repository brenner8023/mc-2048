import Vue from 'vue';
import Router from 'vue-router';
import GameContainer from '@/components/GameContainer';
import MonteCarlo from '@/components/MonteCarlo';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GameContainer',
      component: GameContainer
    },
    {
      path: '/montecarlo',
      name: 'MonteCarlo',
      component: MonteCarlo
    }
  ]
})
