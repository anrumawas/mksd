<script setup>
import { ShoppingCartOutlined, GoldOutlined, InteractionTwoTone, TeamOutlined, SyncOutlined, PauseCircleTwoTone, TrophyTwoTone, DashboardTwoTone } from '@ant-design/icons-vue';
defineProps({
  props_data: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="body"
    style="border-style: solid ;border-width: 0.5em; border-radius:30px; padding: 10px; min-height: 19.5em; text-align: center;"
    :style="{ borderColor: props_data.colour, backgroundColor: props_data.background }">

    <a-divider>
      <a-typography-title :level="3">{{ props_data.machine_group }}--{{ props_data.machine_name }}</a-typography-title>
    </a-divider>
    <a-row :gutter="5" justify="center">
      <a-col :xs="{ span: 24 }" :sm="{ span: 8 }" :md="{ span: 12 }" :lg="{ span: 8 }">

        <a-tooltip>
          <template #title> Target {{ props_data.target_stroke }}</template>
          <a-statistic :value=props_data.actual_stroke>
            <template #title>
              <InteractionTwoTone two-tone-color="#1520A6" /> Gross Stoke
            </template>
          </a-statistic>
        </a-tooltip>
      </a-col>
      <a-col :xs="{ span: 24 }" :sm="{ span: 8 }" :md="{ span: 12 }" :lg="{ span: 8 }">
        <a-statistic :value=props_data.target_stroke-props_data.actual_stroke>
          <template #title>
            <DashboardTwoTone :style="{ color: '#234F1E' }" /> Balance
          </template>
        </a-statistic>
      </a-col>
    <a-col :xs="{ span: 24 }" :sm="{ span: 8 }" :md="{ span: 12 }" :lg="{ span: 8 }">
      <a-statistic :value=props_data.product_type>
        <template #title>
          <GoldOutlined :style="{ color: '#051094' }" /> Product Type
        </template>
      </a-statistic>
    </a-col>
  </a-row>
  <a-row>
    <!-- <a-col :xs="{ span: 24 }" :sm="{ span: 8 }" :md="{ span: 12 }" :lg="{ span: 8 }">
        <a-statistic :value=props_data.MachineGroup>
          <template #title>
            <ShoppingCartOutlined :style="{ color: '#234F1E' }" /> Group
          </template>
        </a-statistic>
      </a-col> -->
      <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }" :lg="{ span: 12 }">
        <a-statistic :value=props_data.operator_name>
          <template #title>
            <TeamOutlined /> Operator
          </template>
        </a-statistic>
      </a-col>
      <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }" :lg="{ span: 12 }">
        <a-tooltip v-if="props_data.machine_status === 1">
          <template #title> Running</template>
        <a-statistic  :value-style="{ color: '#3f8600' }" value=" ">
          <template #title>
            <TrophyTwoTone /> Status
          </template>
          <template #suffix>
            <SyncOutlined spin />
          </template>
        </a-statistic>
      </a-tooltip>
      <a-tooltip v-else>
        <template #title> Stop</template>
        <a-statistic :value-style="{ color: '#D21404' }" value=" ">
          <template #title>
            <TrophyTwoTone /> Status
          </template>
          <template #suffix>
            <PauseCircleTwoTone two-tone-color="#D21404" />
          </template>
        </a-statistic>
      </a-tooltip>
      </a-col>
    </a-row>
  </div>
</template>

