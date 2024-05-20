<!-- 注意这个文件是替换了原本的index.vue，原本的index.vue现在世exam_index.vue -->
<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { ref, onMounted, watchEffect } from 'vue'
import { assertExists } from '@blocksuite/store'


const route = useRoute();
const router = useRouter()
// 定义 ref
const editorContainer = ref<HTMLDivElement>()
// 使用 useEditor 函数
const spaceId = route.params.spaceId as string;
const pid = ref(route.params.pid);
const editor = useEditor(spaceId, pid, 'page')
const visible = ref(false)
const { workspace, pages } = useWorkspace(spaceId)
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
    <div>
        <el-container>
            <!-- 标题栏部分 -->
            <el-header>
                <Header />
            </el-header>

            
            <el-container>
                <!-- 侧边栏部分 -->
                <Aside/>
                <el-main>
                    <Editor :workspace-id="spaceId" :page-id="pid as string" />
                    
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>

.menu-item-id {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

</style>