<template>
  <a-layout style="height:auto">
    <a-layout-sider v-model:collapsed="collapsed" :collapsedWidth=0 :trigger="null" collapsible>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <template #icon>
            <router-link to="/">
              <field-time-outlined />
            </router-link>
          </template>
          <router-link to="/">
            <span>Realtime</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <template #icon>
            <router-link to="/productivity">
              <rise-outlined />
            </router-link>
          </template>
          <router-link to="/productivity">
            <span>Productivity</span>
          </router-link>
        </a-menu-item>
        <!-- <a-menu-item key="3">
          <template #icon>
            <router-link to="/kpi">
              <bar-chart-outlined />
            </router-link>
          </template>
          <router-link to="/kpi">
            <span>KPI</span>
          </router-link>
        </a-menu-item> -->
        <a-menu-item key="4">
          <template #icon>
            <router-link to="/problem">
              <WarningOutlined />
            </router-link>
          </template>
          <router-link to="/problem">
            <span>Fault</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <setting-outlined />
              Settings
            </span>
          </template>
          <a-menu-item key="5">
            <template #icon>
              <CodeOutlined />
            </template>
            <router-link to="/machinesettings">
              <span>Machines</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="6">
            <template #icon>
              <DeploymentUnitOutlined />
            </template>
            <router-link to="/productssettings">
              <span>Products</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>

        <a-menu-item key="99">
          <template #icon>
            <a href="https://103.190.29.168:1880/api/authenticate">
              <setting-outlined />
            </a>
          </template>
          <a href="https://103.190.29.168:1880/api/authenticate">
            <span>Authenticate Server</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding-left: 20px; font-size: x-large;">

        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view />
      </a-layout-content>
      <a-layout-footer style="text-align: center; padding-top:0;">
        Sedulous x JMJ Studio &copy;2023
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import {
  FieldTimeOutlined,
  RiseOutlined,
  FallOutlined,
  BarChartOutlined,
  WarningOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  CodeOutlined,
  DeploymentUnitOutlined
} from '@ant-design/icons-vue';
import { ref } from 'vue';
import router from './router';
const selectedKeys = ref(['1']);
const collapsed = ref(false);
</script>

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>