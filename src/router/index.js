import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage')
const signonList = r => require.ensure([], () => r(require('@/page/signon/signonList')), 'signonList')
const buildSignon = r => require.ensure([], () => r(require('@/page/signon/buildSignon')), 'buildSignon')
const buildScene = r => require.ensure([], () => r(require('@/page/signon/buildScene')), 'buildScene')
const sceneList = r => require.ensure([], () => r(require('@/page/signon/sceneList')), 'sceneList')
const prizeList = r => require.ensure([], () => r(require('@/page/signon/prizeList')), 'prizeList')
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/manage',
      component: manage,
      name: '',
      children: [{
        path: '/signonList',
        component: signonList,
        meta: []
      }, {
        path: '/buildSignon',
        component: buildSignon,
        meta: []
      },
      {
        path: '/buildScene',
        component: buildScene,
        meta: []
      },
      {
        path: '/sceneList',
        component: sceneList,
        meta: []
      },
      {
        path: '/prizeList',
        component: prizeList,
        meta: []
      }]
    }
  ]
})
