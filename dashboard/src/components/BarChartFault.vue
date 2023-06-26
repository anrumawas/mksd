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
import { ref, onMounted } from 'vue';

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
onMounted(() =>{
  props.props_data.stroke.forEach(x => {
    chart_value.value.push(x);
    chart_std_stroke.value.push([x[0], props.props_data.std_stroke])
  });

});
const labelOption = {
  show: true,
  rotate: 90,
  align: 'left',
  verticalAlign: 'middle',
  position: 'insideBottom',
  distance: 15,
  formatter: '{c} {name|{a}}',
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
  dataZoom:[
    {
      type: 'inside',
      start:0,
      end: 100,
    },
    {
      start:0,
      end: 100
    },
    {
      yAxisIndex: 'none'
    }
  ],
  xAxis:{
    type: 'category',
    boundaryGap: ['0%', '0%'],
    name: 'Category'
    //data: chart_timestamp.value
  },
  yAxis:{
    type: 'value'
  },
  legend:{
    data:['Category', 'Std Occurance'],
    left: 10
  },
  series:[
    {
      name: 'Category',
      data: chart_value,
      label: labelOption,
      type: 'bar',
      smooth: true,
      itemStyle:{
        color:'#0583D2'
      },
    },
    {
      name: 'Std Occurance',
      data:chart_std_stroke,
      label: labelOption,
      symbol: 'none',
      type: 'line',
      itemStyle:{
        color:'#BF211E'
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
