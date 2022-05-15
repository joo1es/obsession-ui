<template>
    <o-table :columns="columns" :data="data" stripe border dark scroll-width="2000px"></o-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { TableColumn } from '..'

const columns = ref<TableColumn[]>([
    {type: 'index', width: 55, fixed: 'left', align: 'center'},
    {type: 'selection', width: 55, fixed: 'left', align: 'center'},
    {label:'日期', prop:'date'},
    {label:'姓名', prop:'name'},
    {label:'地址', prop:'address'},
])
const data = ref([{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
}, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
}, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
}, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
}])
</script>