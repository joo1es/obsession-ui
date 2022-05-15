<template>
    <o-table ref="table" :columns="columns" :data="data" border></o-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { TableColumn } from '..'

const table = ref(null)
const columns = ref<TableColumn[]>([
    {label:'信息', prop:'date', children: [
        {label:'日期', prop:'date', width:120},
        {label:'姓名', prop:'name', align:'center'}
    ]},
    {label:'Ellipsis文本省略', prop:'Ellipsis', ellipsis: { tooltip: { dark: false } }},
])
const data = ref([{
    date: '2016-05-02',
    name: '王小虎6',
    address: '6上海市普陀区金沙江路 1518 弄45789',
    status:1,
    Ellipsis:'很长的文字，阿斯顿咖啡上课就好阿四节课打瞌睡的贺卡上但很快就阿四大卡司打卡方式可哈萨克大发快三大卡司等哈就开始的贺卡阿斯顿咖啡上课就好阿四节课打瞌睡的贺卡上但很快就阿四大卡司打卡方式可哈萨克大发快三大卡司等哈就开始的贺卡===='
}, {
    date: '2016-05-04',
    name: '王小虎3',
    address: '3上海市普陀区金沙江路 1517 弄245',
    status:2,
    Ellipsis:'asdasd',
}, {
    date: '2016-05-01',
    name: '王小虎9',
    address: '9上海市普陀区金沙江路 1519 弄45787a',
    status:3,
    Ellipsis:'asdasd',
}, {
    date: '2016-05-03',
    name: '王小虎1',
    address: '1上海市普陀区金沙江路 1516 弄7897',
    status:4,
    Ellipsis:'asdasd',
}])
</script>