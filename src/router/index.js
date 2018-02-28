import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../pages/IndexPage'
import DetailPage from '../pages/detailPage.vue'
import DetailAnaPage from '../pages/detail/analysis.vue'
import OrderListPage from '../pages/orderList.vue'

Vue.use(Router)

export default new Router({
	mode:'history',
  	routes: [
    	{
    		path:'/',
    		component:IndexPage
    	},
    	{
    		path:'/detail',
    		component:DetailPage,
    		redirect:'/detail/analysis',
    		children:[
    			{
    				path:'analysis',
    				component:DetailAnaPage
    			}
    		]
    	},
    	{
    		path:'/orderList',
    		component:OrderListPage
    	}
  ]
})
