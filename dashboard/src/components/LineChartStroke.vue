<template>
  
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, BarChart } from 'echarts/charts';
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
import { ref, onMounted, reactive } from 'vue';

use([
  CanvasRenderer,
  LineChart,
  BarChart,
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
const chart_timestamp = ref([]);
const temp =  ref({
  value: 200,
  itemStyle:{
    color: '#a90000'
  }
});


for ( var i = 0; i < props.props_data.stroke.length;i++){
   temp.value= props.props_data.stroke[i][1];
  if ( temp.value > props.props_data.std_stroke[i]){
    chart_value.value[i]={ value:temp.value,
                    itemStyle:{color: '#3ba272'}}
     
    } 
    else{
      chart_value.value[i]={ value:temp.value,
                    itemStyle:{color: '#ee6666'}}
    }

  chart_timestamp.value[i]=(props.props_data.stroke[i][0]);  
  chart_std_stroke.value=props.props_data.std_stroke

}

  for (var i = chart_timestamp.value.length;i<=10;i++){
    chart_timestamp.value.push("")
    console.log(chart_timestamp)
    
  }

  


// onMounted(() =>{  
//   props.props_data.stroke.forEach(x => {
//     temp.value = x[1];
    
//     // if ( x[1] > props.props_data.std_stroke){
//     //   temp.itemStyle.color = "#4F7952"
//     // } 
//     // else{
//     //   temp.itemStyle.color = "#a90000"
//     // }
//     chart_value.value.push(temp);
    
//     chart_timestamp.value.push(x[0]);   
    
//   });
  
// });

const labelOption = {
  show: true,
  rotate: 90,
  align: 'left',
  verticalAlign: 'middle',
  position: 'insideBottom',
  distance: 15,
  formatter: '{c}',
  fontSize: 16,
  rich: {
    name: {}
  }
};

const option = ref({
  title:{
    text: props.props_data.machine_name,
    left: 'center'
  },
  tooltip:{
    trigger:'axis'
  },
  toolbox:{
    feature:{
      dataZoom:{},
      saveAsImage: {},
      dataView: {readOnly:true}
    }
  },
  // dataZoom:[
  //   {
  //     type: 'inside',
  //     start:0,
  //     end: 100,
  //   },
  //   {
  //     start:0,
  //     end: 100
  //   },
  //   {
  //     yAxisIndex: 'none'
  //   }
  // ],
  xAxis:{
    type: 'category',
    boundaryGap: ['0%', '0%'],
    name: 'Day',
    axisLabel: { interval: 0, rotate: 30 },
    data: chart_timestamp.value
  },
  yAxis:{
    type: 'value'
  },
  legend:{
    data:['Stroke', 'Std Stroke'],
    left: 10
  },
  series:[
    {
      name: 'Stroke',
      data: chart_value,
      type: 'bar',
      label: labelOption,
      smooth: false,
      itemStyle:{
        color:'#0583D2'
      },
    },
    {
      name: 'Std Stroke',
      data:chart_std_stroke,
      type: 'line',
      itemStyle:{
        color:'#0000FF'
      },
    }
  ]
});
</script>

<style scoped>
.chart {
  height: 100%;
}
</style>
