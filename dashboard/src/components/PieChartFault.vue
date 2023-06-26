<template>
<!-- <div style="border-style: solid ;border-width: 0.5em; border-radius:30px; padding: 10px;  text-align: center; borderColor:rgba(47,47,47,0.1)">
   <a-typography-title :level="3" style="text-align: center" >{{ props.props_data.machine_name }}</a-typography-title>
   <a-row >
    <a-col :xs="{ span: 24 }" :lg="{ span: 6 }"><a-table :columns="columns" :pagination="false" :data-source="table_data" size="small" /></a-col>
    <a-col :xs="{ span: 24 }" :lg="{ span: 18 }"><v-chart class="chart" :option="option"  autoresize/></a-col>
  </a-row>
</div> -->

<v-chart class="chart" :option="option"  autoresize/>
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import _ from 'lodash';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  MarkLineComponent,
  ToolboxComponent,
  DataZoomComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { ref, onMounted } from 'vue';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  MarkLineComponent,
  ToolboxComponent,
  DataZoomComponent
]);
const props = defineProps({
  props_data:Object
});
const chart_value = ref([]);
const chart_std_stroke = ref([]);
const chart_pie_value = ref([]);
const chart_legend = ref([]);
const table_data = ref([]);
onMounted(() =>{
  console.log(props.props_data.stroke);


  props.props_data.stroke.forEach(x => {
  var w;
    switch(x[0]){
      case "no_order":
      w = '#5470c6';
      break;
      case "wait_quality":
      w = '#91cc75';
      break;
      case "dies_jig_problem":
      w = '#fac758';
      break;
      case "dandory":
      w = '#ee6666';
      break;
      case "no_operation":
      w = '#73c0de';
      break;
      case "no_material":
      w = '#3ba272';
      break;
      case "trial_integer":
      w = '#fc8552';
      break;
      case "mesin_rusak":
      w = '#9a60b4';
      break;
      case "waktu_lainnya":
      w = '#ea7ccd';
      break;
    } 
    chart_pie_value.value.push({
      value: x[1],
      name: x[0].replace('_',' ').replace('_',' '),
      itemStyle: {
            color: w
          }
    })
    chart_value.value.push(x);
    chart_std_stroke.value.push([x[0], props.props_data.std_stroke])
  });
  chart_pie_value.value=_.orderBy(chart_pie_value.value,'value','desc');
  for( var e=0;e<5;e++){
    chart_legend.value.push(chart_pie_value.value[e].name);
    table_data.value.push({
      FaultName: chart_pie_value.value[e].name,
      Duration:chart_pie_value.value[e].value
  })
  }
  console.log(chart_pie_value);
});
const option = ref({
  title: {
    text: props.props_data.machine_name,
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  toolbox:{
    feature:{
      saveAsImage: {},
      dataView: {readOnly:true}
    }
  },
  legend: {
    orient: 'horizontal',
    left: 'center',
    bottom: 10,
    data:chart_legend,
  },
  series: [
    {
      name: 'Fault Category',
      
      type: 'pie',
      radius: '50%',
      data: chart_pie_value,
      label: {
        show: true,
        // formatter(param) {
        //   // correct the percentage
        //   return param.name + ' (' + param.value + ' m)';
        // }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})



const columns = [
  { title: 'Fault', dataIndex: 'FaultName' },
  { title: 'Duration (m)', dataIndex: 'Duration' },
];


// const option = ref({
//   title:{
//     text: props.props_data.machine_name,
//     left: 'center'
//   },
//   tooltip:{
//     trigger:'axis'
//   },
//   toolbox:{
//     feature:{
//       dataZoom:{},
//       saveAsImage: {},
//       dataView: {readOnly:true}
//     }
//   },
//   dataZoom:[
//     {
//       type: 'inside',
//       start:0,
//       end: 100,
//     },
//     {
//       start:0,
//       end: 100
//     },
//     {
//       yAxisIndex: 'none'
//     }
//   ],
//   xAxis:{
//     type: 'category',
//     boundaryGap: ['0%', '0%'],
//     name: 'Category'
//     //data: chart_timestamp.value
//   },
//   yAxis:{
//     type: 'value'
//   },
//   legend:{
//     data:['Category', 'Std Occurance'],
//     left: 10
//   },
//   series:[
//     {
//       name: 'Category',
//       data: chart_value,
//       type: 'bar',
//       smooth: true,
//       itemStyle:{
//         color:'#0583D2'
//       },
//     },
//     {
//       name: 'Std Occurance',
//       data:chart_std_stroke,
//       symbol: 'none',
//       type: 'line',
//       itemStyle:{
//         color:'#BF211E'
//       },
//     }
//   ]
// });
</script>

<style scoped>
.chart {
  height: 100%;
}
</style>
