<template>
	<div class="order-wrap">
		<h3>您的产品</h3>
		<div class="order-list-choose">
			<div class="order-list-option">
				选择产品:
				<v-selection :selections="products" @on-change="productChange($event)"></v-selection>
			</div>
			<div class="order-list-option">
				开始日期:
				<v-date-picker :date="startTime" :option="datePickerOption" :limit="limit"></v-date-picker>
			</div>
			<div class="order-list-option">
				结束日期:
				<v-date-picker :date="startTime" :option="datePickerOption" :limit="limit"></v-date-picker>
			</div>
			<div class="order-list-option">
				关键词:
				<input type="text" class="order-query" v-model.lazy="query">
			</div>
		</div>
		<div class="order-list-table">
			<table>
				<tr>
					<th v-for="head in tableHeads" :class="{active:head.active}" @click="changeOrderType(head)">{{head.label}}</th>
				</tr>
				<tr v-for="item in tableData" :key="item.period">
					<td v-for="head in tableHeads">{{item[head.key]}}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import VSelection from '../components/base/selection.vue'
import VDatePicker from 'vue-datepicker/vue-datepicker-es6'
import _ from 'lodash'

export default{
	components:{
		VSelection,
		VDatePicker
	},
	data(){
		return{
		  query: '',
	      productId: 0,
	      startDate: '',
	      endDate: '',
	      products: [
	        {
	          label: '数据统计',
	          value: 0
	        },
	        {
	          label: '数据预测',
	          value: 1
	        },
	        {
	          label: '流量分析',
	          value: 2
	        },
	        {
	          label: '广告发布',
	          value: 3
	        }
	      ],
	      tableHeads: [
	        {
	          label: '订单号',
	          key: 'orderId'
	        },
	        {
	          label: '购买产品',
	          key: 'product'
	        },
	        {
	          label: '版本类型',
	          key: 'version'
	        },
	        {
	          label: '有效时间',
	          key: 'period'
	        },
	        {
	          label: '购买日期',
	          key: 'date'
	        },
	        {
	          label: '数量',
	          key: 'buyNum'
	        },
	        {
	          label: '总价',
	          key: 'amount'
	        }
	      ],
	      currentOrder: 'asc',
	      tableData: [],
	      startTime:{
	      	time:''
	      },
	      datePickerOption: {
	        type: 'day',
	        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
	        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	        format: 'YYYY-MM-DD',
	        placeholder: '请选择日期',
	        inputStyle: {
	          'display': 'inline-block',
	          'padding': '4px',
	          'line-height': '17px',
	          'font-size': '14px',
	          'border': '1px solid #fff',
	          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
	          'border-radius': '2px',
	          'color': '#5F5F5F'
	        },
	        color: {
	          header: '#ccc',
	          headerText: '#f00'
	        },
	        buttons: {
	          ok: '确定',
	          cancel: '取消'
	        },
	        overlayOpacity: 0.5, // 0.5 as default
	        dismissible: true // as true as default
	      },
	      limit: [{
	        type: 'weekday',
	        available: [1, 2, 3, 4, 5]
	      },
	      {
	        type: 'fromto',
	        from: '2017-04-01',
	        to: '2017-12-20'
	      }]
		}
	},
	methods:{
		productChange(obj){
			this.productId = obj.value
			console.log(obj)
		},
		getList(){
			let reqParams = {
				query:this.query,
				productId:this.productId,
				startDate:this.startDate,
				endDate:this.endDate
			}
			this.$http.get('/api/getOrderList')
			.then((res) => {
				this.tableData = res.data.list
			},(err) => {})
		},
		changeOrderType(headItem){
			this.tableHeads.map((item) => {
				item.active = false
				return item
			})
			headItem.active = true
			if(this.currentOrder === 'asc'){
				this.currentOrder = 'desc'
			}else if(this.currentOrder === 'desc'){
				this.currentOrder = 'asc'
			}
			this.tableData = _.orderBy(this.tableData,headItem.key,this.currentOrder)
		}
	},
	watch:{
		startTime:{
			handler:function(newValue){
				console.log(newValue)
			},
			deep:true
		}
	},
	mounted(){
		this.getList()
	}
}
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
</style>