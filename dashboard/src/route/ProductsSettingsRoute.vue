<script setup>
import { defineComponent, reactive, ref } from 'vue';
import axios from 'axios'
import { notification } from 'ant-design-vue';

const JsonRealTime = reactive([]);
axios.get('https://103.190.29.168:1880/api/productssettings')
  .then(response => {
    JsonRealTime.data = response.data;
    notification['success']({
      message: 'Success',
      description:
        'Getting data from server is successful',
    });
  })
  .catch(error => {
    notification['error']({
      message: 'Error',
      description:
        'Getting data from server is failed',
    });
    console.log(error);
  });


const editableData = reactive({});

const columnsList = [
  {
    title: 'Number',
    dataIndex: 'id',
    width: '10%',
  },
  {
    title: 'Products Name',
    dataIndex: 'products_list',
    width: '10%',
  },
  {
    title: 'Operation',
    dataIndex: 'operation',
    width: '10%',
  },
];

const edit = (key) => {
  editableData[key] = JsonRealTime.data.filter(JsonRealTime => JsonRealTime.id === key)[0];
};
const cancel = (key) => {
  delete editableData[key];
};

const save = (key) => {
  Object.assign(JsonRealTime.data.filter(JsonRealTime => JsonRealTime.id === key)[0], editableData[key]);
  axios.post("https://45.32.124.26:1880/api/productssettings", editableData[key])
    .then(response => {
      notification['success']({
        message: 'Success',
        description:
          'Data edit is successful.',
      });

    })
    .catch(error => {
      notification['error']({
        message: 'Error',
        description:
          'Data edit is unsuccessful.',
      });
      console.log(error);
    });
  delete editableData[key];
};

</script>

<template>
  <div style="height:100vh;">

        <a-typography-title :level="3" style="text-align: left;">Products Setting Table</a-typography-title>
        <a-table :columns="columnsList" :data-source="JsonRealTime.data" bordered>
          <template #bodyCell="{ column, text, record }">
            <template v-if="['products_list'].includes(column.dataIndex)">
              <div>
                <a-input v-if="editableData[record.id]" v-model:value="editableData[record.id][column.dataIndex]"
                  style="margin: -5px 0" />
                <template v-else>
                  {{ text }}
                </template>
              </div>
            </template>

            <template v-else-if="column.dataIndex === 'operation'">
              <span v-if="editableData[record.id]">
                <a-space :size=10>
                  <a @click="save(record.id)">Save</a>
                  <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.id)">
                    <a>Cancel</a>
                  </a-popconfirm>
                </a-space>
              </span>
              <span v-else>
                <a @click="edit(record.id)">Edit</a>
              </span>
            </template>
          </template>
        </a-table>









  </div>
</template>
<style>
@media (min-width: 1024px) {
  .SettingsView {
    min-height: 20vh;
    display: flex;
    align-items: center;
  }
}
</style>