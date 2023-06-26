<template>
  <div style="height:100vh">
    <h1>
      Playground
    </h1>
    <bar-chart-compare-fault :props_data="x" style="height:40vh"/>
  </div>
</template>

<script setup>
import BarChartCompareFault from '../components/BarChartCompareFault.vue';
const x = {
  machine_name:"test",
  data_1:[['No Order', ],
          ['Wait Quality', 600],
          ['Jig Problem', 600],
          ['Dandory', 450],
          ['No Operation', 320],
          ['No Material', 120],
          ['Trial', 240],
          ['Mesin Rusak', 240],
          ['Others', 980]
        ],
  data_2:[['No Order', 50],
          ['Wait Quality', 50],
          ['Jig Problem', 700],
          ['Dandory', 600],
          ['No Operation', 300],
          ['No Material', 200],
          ['Trial', 100],
          ['Mesin Rusak', 240],
          ['Others', 90]
        ],
}

</script>