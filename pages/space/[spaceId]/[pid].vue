<!-- 注意这个文件是替换了原本的index.vue，原本的index.vue现在世exam_index.vue -->
<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { ref, onMounted, watchEffect } from 'vue'
import { assertExists } from '@blocksuite/store'
import {
    Notebook, Menu as IconMenu, CirclePlus, Setting, House, Delete, Plus, Star,StarFilled,
    ArrowLeft,MoreFilled,Notification
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

const handleCommand = (command: string | number | object) => {
  ElMessage(`click on item ${command}`)
}

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

function goToNote(nspaceId: string, npid: string) {
    router.push(`/space/${nspaceId}/${npid}`);
}

function handleAdd(id:string | null) {
    assertExists(workspace.value)
    assertExists(pages.value)

    // eslint-disable-next-line no-alert
    //const id = prompt('请为新建笔记命名：')
    if (!id) return

    if (pages.value.some((p) => p.id === id)) {
        // eslint-disable-next-line no-alert
        alert('Page already exists')
        return
    }

    const page = workspace.value.createPage({ id })
    initPage(page)
}

async function handleDelete(id: string) {
    assertExists(workspace.value)
    assertExists(pages.value)

    if (pid.value === id) {
        pid.value = pages.value.find((p) => p.id !== id)!.id
        await until(pid).not.toBe(id)
    }

    workspace.value.removePage(id)
}
const starfil = ref(true);
async function handleStar() {
  starfil.value = !starfil.value;
}

const open = () => {
  ElMessageBox.prompt('请为新建笔记命名', '创建新笔记', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: /^.{0,18}$/,
    inputErrorMessage: '输入长度不能超过18个字符',
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `创建笔记${value}成功`,
      })
      handleAdd(value)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '新建取消',
      })
    })
}

function shortenId(id:string) {
    const maxLength = 10; 
    if (id.length > maxLength) {
      return id.substring(0, maxLength) + '...';
    }
    return id;
  }

const sidebarWidth = ref(200); // 初始宽度
const minWidth = 200; // 最小宽度
const maxWidth = 400; // 最大宽度
const isResizing = ref(false);
const startWidth = ref(0);
const startX = ref(0);

function startResize(event) {
  isResizing.value = true;
  startX.value = event.clientX;
  startWidth.value = sidebarWidth.value;
  document.addEventListener('mousemove', resize);
  document.addEventListener('mouseup', stopResize);
}

function resize(event) {
  if (!isResizing.value) return;
  const delta = event.clientX - startX.value;
  let newWidth = startWidth.value + delta;
  newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
  sidebarWidth.value = newWidth;
}

function stopResize() {
  isResizing.value = false;
  document.removeEventListener('mousemove', resize);
  document.removeEventListener('mouseup', stopResize);
}

const editing = ref(false); // 定义一个控制编辑状态的响应式引用

function toggleEditing() {
  editing.value = !editing.value; // 切换编辑状态
}

// 用于存储每个页面的标星状态
const starred = ref({});
// 用于控制每个popover的可见性
const popoverVisible = ref({});
// 标星逻辑
function toggleStar(pageId) {
  starred.value[pageId] = !starred.value[pageId];
}
// 检查页面是否标星
function isStarred(pageId) {
  return starred.value[pageId];
}

</script>

<template>
    <div>
        <el-container>
            <!-- 标题栏部分 -->
            <el-header>
                <Header />
            </el-header>

            
            <el-container>
                <div class="sidebar-resizer" @mousedown="startResize" :style="{ left: `${sidebarWidth}px` }"></div>
                <!-- 侧边栏部分 -->
                <Aside/>

                <el-main>
                    <!-- <div ref="editorContainer"  style="text-align: left;"></div> -->
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

.sidebar-resizer {
  position: relative;
  top: 0;
  bottom: 0;
  width: 5px;
  cursor: ew-resize;
  z-index: 1000;
}

.el-aside {
  position: relative;
  top: 0;
  bottom: 0;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

</style>