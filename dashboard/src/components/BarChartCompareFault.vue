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
import { onMounted, ref } from 'vue';

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
const labelOption = {
  show: true,
  rotate: 90,
  align: 'left',
  verticalAlign: 'middle',
  position: 'insideBottom',
  distance: 15,
  formatter: '{name|{a}}',
  fontSize: 16,
  rich: {
    name: {}
  }
};
const props = defineProps({
  props_data:Object
});
const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  title:{
    text: props.props_data.machine_name,
    left: 'center'
  },
  tooltip:{
    trigger:'axis'
  },
  toolbox:{
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature:{
      dataZoom:{},
      mark: { show: true },
      saveAsImage: {},
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar', 'stack'] },
      
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
    data:['Data 1', 'Data 2'],
    left: 10
  },
  series:[
    {
      name: 'January',
      data: props.props_data.data_1,
      type: 'bar',
      barGap: 0,
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      // itemStyle:{
      //   color:'#0583D2'
      // },
    },
    {
      name: 'February',
      data: props.props_data.data_2,
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      // itemStyle:{
      //   color:'#BF211E'
      // },
    }
  ]
});
</script>

<style scoped>
.chart {
  height: 100%;
}
</style>
