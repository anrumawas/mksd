<template>
  <div style="height:100%">

    <a-typography-title style="text-align: center;">Fault Viewer</a-typography-title>

    <a-typography-title v-if="timeframe === 'Custom'" style="text-align: center;" :level="2"> {{selectedtimeframe[0].format('DD MMMM YYYY')}} to {{selectedtimeframe[1].format('DD MMMM YYYY')}}</a-typography-title>
    <a-typography-title v-else style="text-align: center;" :level="2">{{dayjs().format('DD MMMM YYYY')}}</a-typography-title>
    

    <a-row justify="space-around" style="text-align: center;">
      <a-col :xs="{ span: 24 }" :lg="{ span: 6 }" />
      <a-col :xs="{ span: 24 }" :lg="{ span: 6 }">
        <a-typography-title :level="3">Group Selection</a-typography-title>
       
        <a-radio-group @change="pencet1()" v-model:value="MachineFrame" option-type="button"
          buttonStyle="solid" :options="MachineFrameOption" />

          

      </a-col>
      <a-col :xs="{ span: 24 }" :lg="{ span: 6 }">
        <a-typography-title :level="3">Timeframe Selection</a-typography-title>
        <a-space direction="vertical" :size="12">
        <a-radio-group @change="pencet1(timeframe)" v-model:value="timeframe" option-type="button" buttonStyle="solid"
          :options="TimeFrameOption" />

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
          <pie-chart-fault :props_data="x" style="height:40vh" />
        </a-col>
      </template>
    </a-row>

  </div>
</template>

<script setup>
import PieChartFault from '../components/PieChartFault.vue';
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios'
import { notification } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';

const dateFormat = 'YYYY/MM/DD';
const rawdata = reactive([]);
const TimeFrameOption = ['Custom', 'Monthly', 'Dialy'];
const MachineFrameOption = ['Group', 'Individual'];
const timeframe = ref('Dialy');
const MachineFrame = ref('Individual');
const selectedtimeframe = ref([dayjs(dayjs(), 'YYYY/MM/DD'), dayjs(dayjs(), 'YYYY/MM/DD')]);

const dummy_data = ref([]);
let params = {};
params['group'] = MachineFrame.value;
params['timeframe'] = timeframe.value;




const getdatafromserver = () => {
  axios.get('https://103.190.29.168:1880/api/faultlist', { params })
    .then(response => {
      rawdata.data = response.data.rawdata;
      
      notification['success']({
        message: 'Success',
        description:
          'Getting data from server is successful',
      });

      for (let i = 0; i < rawdata.data.length; i++) { 
        params['machine'] = rawdata.data[i].machine_name;

        let temp_val = {};
        let temp_stroke = [];
        let temp_stroke_unfiltered = [];
        let temp_std_stroke = 404
        var objkeys = Object.keys(rawdata.data[i]);
        temp_stroke_unfiltered = [ [objkeys[2], rawdata.data[i].no_order],
                        [objkeys[3], rawdata.data[i].wait_quality],
                        [objkeys[4], rawdata.data[i].dies_jig_problem],
                        [objkeys[5], rawdata.data[i].dandory],
                        [objkeys[6], rawdata.data[i].no_operation],
                        [objkeys[7], rawdata.data[i].no_material],
                        [objkeys[8], rawdata.data[i].trial_integer],
                        [objkeys[9], rawdata.data[i].mesin_rusak],
                        [objkeys[10], rawdata.data[i].waktu_lainnya],
        ]
         
        for (var o=0;o<temp_stroke_unfiltered.length;o++){
           if (temp_stroke_unfiltered[o][1] > 0){
            temp_stroke.push(temp_stroke_unfiltered[o])
           }
        }
        temp_stroke.sort(function(a, b) {
              return a.name > b.name;
            });


        


        temp_val['stroke'] = temp_stroke;
        temp_val['std_stroke'] = temp_std_stroke;
        temp_val['machine_name'] =  rawdata.data[i].machine_name
        dummy_data.value[i] = temp_val;
      }
      console.log(dummy_data.value)
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
  params['timeframe'] = timeframe.value;
  params['timeframestart'] = dayjs(selectedtimeframe.value[0]).format('YYYY/MM/DD');
  params['timeframefinal'] = dayjs(selectedtimeframe.value[1]).format('YYYY/MM/DD');

  getdatafromserver();
  console.log(selectedtimeframe.value)
}
// const pencet2 = (key) => {
//   dummy_data.value = {};
//   params['group'] = MachineFrame.value;
//   params['timeframe'] = timeframe.value;
//   params['selectedtimeframe'] = selectedtimeframe.value.y;
//   getdatafromserver();
//   console.log(selectedtimeframe)
// }
// getdatafromserver();
</script>