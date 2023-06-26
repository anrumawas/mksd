
<template>
    <a-typography-title :level="1" style="text-align: center;">Realtime Monitoring Board<br/>{{DateTime.value}}</a-typography-title>
  <a-row justify="space-around" style="text-align: center;">
    <a-col :xs="{ span: 24 }" :lg="{ span: 6 }" />
    <a-col :xs="{ span: 24 }" :lg="{ span: 6 }">
      <a-typography-title :level="3" style="">Display Selection</a-typography-title>
      <a-radio-group v-model:value="MachineDisplay" option-type="button" buttonStyle="solid"
        :options="MachineDisplayOption" />
    </a-col>
    <a-col :xs="{ span: 24 }" :lg="{ span: 6 }">
      <a-typography-title :level="3">Group Selection</a-typography-title>
      <a-radio-group  v-if="MachineDisplay === 'Group'" v-model:value="MachineGroup"
        option-type="button" buttonStyle="solid" :options="MachingGroupOptions" />
      <a-radio-group v-else v-model:value="MachineGroup" option-type="button" buttonStyle="solid"
        :options="MachingGroupOptions" disabled />
    </a-col>

    <a-col :xs="{ span: 24 }" :lg="{ span: 6 }"></a-col>
  </a-row>
  <br />
  <a-row :gutter="[24, 24]" justify="space-around">
    <template v-for="entryID in JsonRealTime.data">
      <a-col :xs="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 8 }"  :xl="{ span: 6 }">
        <RealtimeViewCard :props_data="entryID" />
      </a-col>
    </template>
  </a-row>
  <a-back-top />
</template>
<script setup>

// import { object } from 'prop-types';
import RealtimeViewCard from '../components/RealtimeViewCard.vue';
import { ref, reactive, onMounted } from 'vue';
import { onBeforeRouteLeave } from "vue-router";
import { notification } from 'ant-design-vue';
import dayjs  from 'dayjs';

const MachingGroupOptions = ['A', 'B', 'C', 'D', 'E'];
const MachineDisplayOption = ['Group', 'Individual'];
const MachineGroup = ref('');
const MachineDisplay = ref('Individual');
const JsonRealTime = reactive([]);
const DateTime = reactive([]);
const socket = new WebSocket('wss://103.190.29.168:1880/ws/realtimemonitoring');


onMounted(() =>{
   setInterval(() => {
    
    DateTime.value = dayjs().format('dddd, DD MM YYYY HH:mm:ss')
  
  },1000);
  
});

// beforeMount(() => {
//   setInterval(() => {
//   // DateTime = reactive(dayjs().format('dddd, DD MM YYYY HH:mm:ss'));
//   console.log('a')
//   }, 1000);
//   })


socket.onopen = () => {
  notification['success']({
        message: 'Connected',
        description:
          'Connection to server is established',
      });
  setInterval(() => {
    if (MachineDisplay.value === 'Group' && MachineGroup.value !== '') {
      socket.send(MachineGroup.value)
    }
    else {
      socket.send("All")
    }
  }, 1000);
}
onBeforeRouteLeave((to, from, next) => {
  socket.close();
  next()
})
socket.onmessage = (event) => {
  JsonRealTime.data = JSON.parse(event.data);
  // console.log(JsonRealTime.data);
  for (var i = 0; i < JsonRealTime.data.length; i++) {
    if (JsonRealTime.data[i].machine_status === 1) {
      // msg="#3f8600"
      JsonRealTime.data[i].colour = "rgb(63,134,0)"
      JsonRealTime.data[i].background = "rgba(63,134,0,0.1)"
    }
    else {
      // msg = "#D21404"
      JsonRealTime.data[i].colour = 'rgb(210,20,4)'
      JsonRealTime.data[i].background = "rgba(210,20,4,0.1)"
      //=====Uncomment this section for machine of notification======
      // notification['warning']({
      //   message: 'Warning',
      //   description:'Machine '+JsonRealTime.data[i].MachineName +' Stop',
      // });
    }

  }
};


</script>

<style scoped>
@media (min-width: 1024px) {
  .body {
    justify-content: center;
    text-align: center;
    background: transparent;
  }

  .header {
    font-size: 1.5em;
  }
}
</style>

