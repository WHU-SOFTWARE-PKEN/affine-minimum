<!-- 注意这个文件是替换了原本的index.vue，原本的index.vue现在世exam_index.vue -->
<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { ref, onMounted, watchEffect } from 'vue'
const route = useRoute();
// 定义 ref
const editorContainer = ref<HTMLDivElement>()

// 使用 useEditor 函数
const editor = useEditor(route.params.spaceId, route.params.pid, 'page')

// 等待编辑器初始化
onMounted(async () => {
    await until(editor).toBeTruthy()
})

// 使用 watchEffect 处理编辑器的挂载和移除
watchEffect((onCleanup) => {
    if (!editor.value || !editorContainer.value) return
    const _editor = editor.value
    editorContainer.value.appendChild(_editor)

    onCleanup(() => {
        _editor.remove()
    })
})
definePageMeta({
    name: 'WorkspacePage',
})

</script>

<template>
    <div class="common-layout">
        <el-container>
            <!-- 标题栏部分 -->
            <el-header>
                <el-row type="flex" justify="start" align="middle">
                    <el-col :span="4">
                        <!-- 头像 -->
                        <div>
                            <el-avatar src="登录者的头像URL"></el-avatar>
                        <span style="margin-left: 1px; position: relative;top: -10px; left:5px">登录者的昵称</span>
                        </div>
                        
                    </el-col>
                    <!-- 笔记软件的名称和图标 -->
                    <el-col :span="8" style="text-align: center; font-size: 30px;">
                        珞珈PK笔记
                    </el-col>
                    <el-col :span="12">
                        <el-menu mode="horizontal">
                            <el-menu-item index="1">
                                <i class="el-icon-notebook-1"></i>
                                <span slot="title">其他设置</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                    
                </el-row>
            </el-header>

            <!-- 侧边栏部分 -->
            <el-container>
                <el-aside width="200px">
                    <el-scrollbar>
                        <el-menu :default-openeds="['1', '3']">
                            <el-sub-menu index="1">
                                <template #title>
                                    <el-icon>
                                        <message />
                                    </el-icon>我的笔记
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="1-1">Option 1</el-menu-item>
                                    <el-menu-item index="1-2">Option 2</el-menu-item>
                                    <el-menu-item index="1-3">Option 3</el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                            <el-sub-menu index="2">
                                <template #title>
                                    <el-icon><el-icon-star /></el-icon>我的收藏
                                </template>
                                <el-menu-item-group>
                                    <template #title>Group 1</template>
                                    <el-menu-item index="2-1">Option 1</el-menu-item>
                                    <el-menu-item index="2-2">Option 2</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group title="Group 2">
                                    <el-menu-item index="2-3">Option 3</el-menu-item>
                                </el-menu-item-group>
                                <el-sub-menu index="2-4">
                                    <template #title>Option 4</template>
                                    <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                                </el-sub-menu>
                            </el-sub-menu>
                            <el-sub-menu index="3">
                                <template #title>
                                    <el-icon>
                                        <setting />
                                    </el-icon>我的设置
                                </template>
                                <el-menu-item-group>
                                    <template #title>Group 1</template>
                                    <el-menu-item index="3-1">Option 1</el-menu-item>
                                    <el-menu-item index="3-2">Option 2</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group title="Group 2">
                                    <el-menu-item index="3-3">Option 3</el-menu-item>
                                </el-menu-item-group>
                                <el-sub-menu index="3-4">
                                    <template #title>Option 4</template>
                                    <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
                                </el-sub-menu>
                            </el-sub-menu>
                        </el-menu>
                    </el-scrollbar>
                </el-aside>

                <el-main>
                    <div ref="editorContainer" class="editor-container"></div>
                    <!-- <div>
                        Space ID: {{ route.params.spaceId }}
                        PID: {{ route.params.pid }}
                    </div> -->
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
