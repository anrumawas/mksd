<script setup>
import { defineComponent, reactive, ref } from 'vue';
import axios from 'axios'
import { notification } from 'ant-design-vue';
import { UserOutlined, DownOutlined } from '@ant-design/icons-vue';

const JsonRealTime = reactive([]);
const JsonProductsList = reactive({});
const Productlist = reactive([]);
axios.get('https://103.190.29.168:1880/api/machinessettings')
  .then(response => {
    JsonRealTime.data = response.data.machinessettings;
    JsonProductsList.data = response.data.productslist
    for (var i = 0; i < JsonProductsList.data.length; i++) {
      Productlist.push({
        value: JsonProductsList.data[i].products_list,
        label: JsonProductsList.data[i].products_list
      });
    }
    console.log(JsonProductsList.data[1].products_list)
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
  });

const editableData = reactive({});
const columnsList = [
  {
    title: 'Machine Name',
    dataIndex: 'machine_name',
    width: '10%',
  },
  {
    title: 'Group',
    dataIndex: 'machine_group',
    width: '10%',
  },
  {
    title: 'Target Stroke',
    dataIndex: 'target_stroke',
    width: '10%',
  },
  {
    title: 'Products Type',
    dataIndex: 'products_type',
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
  axios.post("https://45.32.124.26:1880/api/machinessettings", editableData[key])
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
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
</script>

<template>
  <div style="height:100vh;">
    <a-typography-title :level="3" style="text-align: left;">Machine Setting Table</a-typography-title>
    <a-table :columns="columnsList" :data-source="JsonRealTime.data" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="['machine_name', 'machine_group', 'target_stroke'].includes(column.dataIndex)">
          <div>
            <a-input v-if="editableData[record.id]" v-model:value="editableData[record.id][column.dataIndex]"
              style="margin: -5px 0" />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'products_type'">
          <span v-if="editableData[record.id]">
            <a-space>
              <a-select ref="select" v-model:value="editableData[record.id][column.dataIndex]" style="width: 120px"
                :options="Productlist" @focus="focus" @change="handleChange">
              </a-select>
            </a-space>
          </span>
          <span v-else>
            {{ text }}
          </span>
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