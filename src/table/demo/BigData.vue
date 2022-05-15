<template>
    <o-table :columns="columns" :data="data" stripe height="600px" virtual scroll-width="3000px" fixed row-key="index"></o-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TableColumn } from '..'

const columns = ref<TableColumn[]>([
    {type: 'index', width: 55, fixed: 'left', align: 'center'},
    {type: 'selection', width: 55, fixed: 'left', align: 'center'},
    {type: 'radio', width: 55, fixed: 'left', align: 'center'},
    {label:'日期', prop:'date'},
    {label:'姓名', prop:'name'},
    {label:'性别', prop:'gender.name', fixed: 'right'},
    {label:'地址', prop:'address', fixed: 'right', width: 300},
])
const data = ref(
    new Array(20000).fill(0).map((_, i) => ({
        index: i + 1,
        date: '2016-05-02',
        name: '王小虎',
        gender: {
            name: '男'
        },
        address: '上海市普陀区金沙江路 1518 弄'
    }))
)
</script>