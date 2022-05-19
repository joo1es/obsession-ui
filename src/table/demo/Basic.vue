<template>
    <o-table :columns="columns" :data="data">
        <template #expand="scope">
            <pre style="margin: 0">{{ JSON.stringify(scope, null, 4) }}</pre>
        </template>
    </o-table>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import { TableColumn } from '..'

const columns = ref<TableColumn[]>([
    {type: 'selection', width:55, align: 'center'},
    {type: 'expand', width:55, align: 'center'},
    {label: '日期', prop: 'date', width: 120, sortable: true},
    {label: '姓名', prop: 'name', align: 'center'},
    {label: '地址', prop: 'address'},
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
}, {
    date: '2016-05-03',
    name: 0,
    address: '上海市普陀区金沙江路 1516 弄'
}])
</script>