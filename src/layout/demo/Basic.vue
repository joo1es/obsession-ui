<template>
    <div style="height: 400px">
        <o-layout>
            <o-layout-aside padding="10px 0" style="border-bottom: 1px solid #eee">
                <o-space align="center" :wrap="false">
                    <div class="block" :class="{ collapse }" />
                    <o-button @click="collapse = !collapse">
                        {{ collapse ? '展开' : '收起' }}
                    </o-button>
                    <o-breadcrumb :list="[
                        {
                            index: '1',
                            title: h('a', {
                                href: '/'
                            }, '首页')
                        },
                        {
                            index: '2',
                            title: '关于我们'
                        }
                    ]" />
                </o-space>
            </o-layout-aside>
            <o-layout row>
                <o-layout-aside style="border-right: 1px solid #eee">
                    <o-menu model-value="2" :collapse="collapse" :list="[
                        {
                            title: '首页',
                            index: '1'
                        },
                        {
                            title: '关于我们',
                            index: '2'
                        },
                    ]" vertical width="200px"/>
                </o-layout-aside>
                <o-layout-content class="content-block" padding="10px">
                    <p>轻轻的我走了，</p>
                    <p>正如我轻轻的来；</p>
                    <p>我轻轻的招手，</p>
                    <p>作别西天的云彩。</p>
                    <br>
                    <p>那河畔的金柳，</p>
                    <p>是夕阳中的新娘；</p>
                    <p>波光里的艳影，</p>
                    <p>在我的心头荡漾。</p>
                    <br>
                    <p>软泥上的青荇，</p>
                    <p>油油的在水底招摇；</p>
                    <p>在康河的柔波里，</p>
                    <p>我甘心做一条水草！</p>
                    <br>
                    <p>那榆荫下的一潭，</p>
                    <p>不是清泉，</p>
                    <p>是天上虹；</p>
                    <p>揉碎在浮藻间，</p>
                    <p>沉淀着彩虹似的梦。</p>
                    <br>
                    <p>寻梦？撑一支长篙，</p>
                    <p>向青草更青处漫溯；</p>
                    <p>满载一船星辉，</p>
                    <p>在星辉斑斓里放歌。</p>
                    <br>
                    <p>但我不能放歌，</p>
                    <p>悄悄是别离的笙箫；</p>
                    <p>夏虫也为我沉默，</p>
                    <p>沉默是今晚的康桥！</p>
                    <br>
                    <p>悄悄的我走了，</p>
                    <p>正如我悄悄的来；</p>
                    <p>我挥一挥衣袖，</p>
                    <p>不带走一片云彩。</p>
                </o-layout-content>
            </o-layout>
        </o-layout>
    </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'

const collapse = ref(false)
</script>

<style scoped>
.block {
    background-color: #f5f5f5;
    height: 40px;
    width: 200px;
    transition: .2s;
}
.block.collapse {
    width: 45px;
}
.content-block {
    background-color: #f5f5f5;
}
.content-block p {
    margin: 0;
}
</style>