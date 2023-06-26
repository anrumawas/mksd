<template>
  <div style="height:100%">
    <a-typography-title style="text-align: center;">Productivity Viewer </a-typography-title>
    <a-typography-title v-if="timeframe === 'Custom'" style="text-align: center;" :level="2"> {{selectedtimeframe[0].format('DD MMMM YYYY')}} to {{selectedtimeframe[1].format('DD MMMM YYYY')}}</a-typography-title>
    <a-typography-title v-else style="text-align: center;" :level="2">{{dayjs().format('DD MMMM YYYY')}}</a-typography-title>

    <a-row justify="space-around" style="text-align: center;">
      <a-col :xs="{ span: 24 }" :lg="{ span: 6 }" />
      <a-col :xs="{ span: 24 }" :lg="{ span: 6 }">
        <a-space direction="vertical" :size="12">
        <a-typography-title :level="3">Group Selection</a-typography-title>
        <a-radio-group @change="pencet1(MachineFrame)" v-model:value="MachineFrame" option-type="button" buttonStyle="solid"
          :options="MachineFrameOption" />
        </a-space>
      </a-col>
      <a-col :xs="{ span: 24 }" :lg="{ span: 6 }">
        <a-space direction="vertical" :size="12">
        <a-typography-title :level="3">Timeframe Selection</a-typography-title>
        <a-radio-group @change="pencet2(timeframe)" v-model:value="timeframe" option-type="button" buttonStyle="solid" :options="TimeFrameOption" />
        <a-range-picker v-if="timeframe === 'Custom' " @change="pencet1()" v-model:value="selectedtimeframe" />
      </a-space>
      </a-col>

      <a-col :xs="{ span: 24 }" :lg="{ span: 6 }"></a-col>
    </a-row>
    <br />
    <br />

    <a-row :gutter="[32, 32]" justify="space-around">
      <template v-for="x in dummy_data">
        <a-col :xs="{ span: 24 }" :lg="{ span: 12 }">
          <line-chart-stroke :props_data="x" style="height:40vh" />
        </a-col>
      </template>
    </a-row>

  </div>
</template>

<script setup>
import LineChartStroke from '../components/LineChartStroke.vue';
import { ref, onMounted, reactive } from 'vue';
import { notification } from 'ant-design-vue';
import dayjs  from 'dayjs';
import axios from 'axios'

const listmachines = reactive([]);
const rawdata = reactive([]);
const TimeFrameOption = ['Custom', 'Monthly', 'Daily'];
const MachineFrameOption = ['Group', 'Individual'];
const timeframe = ref('Monthly');
const MachineFrame = ref('Individual');
const ProductivityData = reactive([]);
const dummy_data = ref([]);
const selectedtimeframe = ref([dayjs(dayjs(), 'YYYY/MM/DD'), dayjs(dayjs(), 'YYYY/MM/DD')]);


let params = {};
params['group'] = MachineFrame.value;
params['timeframe'] = timeframe.value;




const getdatafromserver=()=>{
axios.get('https://103.190.29.168:1880/api/productivity',{params})
  .then(response => {
    listmachines.data = response.data.listmachines;
    rawdata.data = response.data.rawdata;
    notification['success']({
      message: 'Success',
      description:
        'Getting data from server is successful',
    });
    for (let i = 0; i < listmachines.data.length; i++) { // 3 replace with listmachines.data.length
      params['machine'] = listmachines.data[i].machine_name;
      ProductivityData[i] = rawdata.data.filter(rawdata =>  rawdata.machine_name === listmachines.data[i].machine_name, listmachines.data[i].machine_name);
      
      let temp_val = {};
      let temp_stroke = [];
      let temp_std_stroke = [];
      
      for (let o = 0; o < ProductivityData[i].length; o++) {
            temp_stroke[o]=[ProductivityData[i][o].date , ProductivityData[i][o].gsph]            
            temp_std_stroke[o]=ProductivityData[i][o].target_stroke
          }         
          temp_val['stroke'] = temp_stroke;
          temp_val['std_stroke'] = temp_std_stroke;
          temp_val['machine_name'] = listmachines.data[i].machine_name
          dummy_data.value[i]=temp_val;
    }
  })
  .catch(error => {
    notification['error']({
      message: 'Error',
      description:
        'Getting data from server is failed',
    });
    console.log(error);
  });
}
  const pencet1 = (key) => {
    dummy_data.value = {};
    params['group'] = MachineFrame.value;
    params['timeframestart'] = dayjs(selectedtimeframe.value[0]).format('YYYY/MM/DD');
    params['timeframefinal'] = dayjs(selectedtimeframe.value[1]).format('YYYY/MM/DD');
    console.log(params);
    getdatafromserver();
   
  }
  const pencet2 = (key) => {
    dummy_data.value = {};
    params['group'] = MachineFrame.value;
    params['timeframe'] = timeframe.value;
    getdatafromserver();

  }
  getdatafromserver();
</script>