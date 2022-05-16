<template>
    <o-table row-key="id" :columns="columns" :data="data" border stripe fixed foot-fixed height="350px" :total-line="{ date: '日期' }"></o-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TableColumn } from '..'

const columns = ref<TableColumn[]>([
    {label:'日期', prop:'date', indent: true, sortable: true, filter: [{ value: '2016-05-01' }, { value: '2016-05-02' }, { value: '2016-05-03' }, { value: '2016-05-04' }]},
    {label:'姓名', prop:'name', filter: [{ value: '王小虎' }, { value: '王二虎' }, { value: '其他' }], filterBy: 'or'},
    {label:'地址', prop:'address'},
])
const data = ref([{
    id: 1,
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    children: [{
        id: 5,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
    }, {
        id: 6,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
    }]
}, {
    id: 2,
    date: '2016-05-04',
    name: '王二虎',
    address: '上海市普陀区金沙江路 1517 弄'
}, {
    id: 3,
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
}, {
    id: 4,
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
}])
</script>