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
                <el-row type="flex" justify="start" align="middle">
                    <el-col :span="4">
                        <!-- 头像 -->
                        <div>
                            <el-avatar
                                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                            <span style="margin-left: 1px; position: relative;top: -10px; left:5px">登录者的昵称</span>
                        </div>
                    </el-col>
                    <!-- 笔记软件的名称和图标 -->
                    <el-col :span="18" style="align-items: center; display: flex;
                    gap: 24px; height: 100%; width: 100%;">
                        <el-tooltip class="box-item" effect="light" content="Workspace" placement="bottom">
                            <div style="height:31px;">
                                <el-icon style="position: relative;top: 4px;">
                                    <Notification />
                                </el-icon>
                                {{ spaceId }}
                            </div>
                        </el-tooltip>
                        <div style="gap :3px">
                            <div v-if="!editing" @click="toggleEditing" style="height:31px;width: 80px">{{ pid }}</div>
                            <el-input v-else v-model="pid" style="width: 80px" autosize type="textarea"
                                @blur="toggleEditing" placeholder="Please input" />
                        </div>
                        <div>
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">
                                    <el-icon class="el-icon right">
                                        <MoreFilled />
                                    </el-icon>
                                </span>

                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item command="a">重命名</el-dropdown-item>
                                        <el-dropdown-item command="b">加入收藏</el-dropdown-item>
                                        <el-dropdown-item command="c" divided>复制</el-dropdown-item>
                                        <el-dropdown-item command="d">导入</el-dropdown-item>
                                        <el-dropdown-item command="e" divided>导出</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                        <div>
                            <el-tooltip class="box-item" effect="dark" content="收藏" placement="bottom">
                                <el-icon>
                                    <Star />
                                </el-icon>
                            </el-tooltip>
                        </div>
                        <nuxt-link to="/workspace">
                            <el-button type="primary" plain>回到主页</el-button>
                        </nuxt-link>

                    </el-col>
                    <el-col :span="2">
                        <el-menu mode="horizontal">
                            <el-menu-item index="1">
                                <span slot="title">关于我们</span>
                            </el-menu-item>
                            <el-menu-item index="2">
                                <span slot="title">分享笔记</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-header>

            <!-- 侧边栏部分 -->
            <el-container>
                <div class="sidebar-resizer" @mousedown="startResize" :style="{ left: `${sidebarWidth}px` }"></div>
                <el-aside :style="{ width: sidebarWidth + 'px' }">
                    <el-scrollbar max-height="800px">
                        <el-menu :default-openeds="['2']">
                            <el-menu-item index="1" @click="()=>{router.push(`/workspace`)}">
                                <template #title>
                                    <el-icon>
                                        <ArrowLeft />
                                    </el-icon>退出当前工作区
                                </template>
                            </el-menu-item>
                            <el-sub-menu index="2">
                                <template #title>
                                    <el-icon>
                                        <Notebook />
                                    </el-icon>我的笔记
                                </template>
                                <el-menu-item-group class="menu-item-id" v-for="page in pages!" :key="page.id">
                                    <!-- page.title是page页面自己填入的title部分，会同时反应在左边的目录上 -->
                                    <el-menu-item @click="goToNote(spaceId, page.id)">
                                        <el-icon v-if="!isStarred(page.id)" @click="toggleStar(page.id)" round>
                                            <star />
                                        </el-icon>
                                        <el-icon v-else @click="toggleStar(page.id)" round>
                                            <StarFilled />
                                        </el-icon>
                                        {{ shortenId(page.id) }}
                                        <el-popover :visible="popoverVisible[page.id]"  placement="top" :width="160">
                                            <p>Are you sure to delete this?</p>
                                            <div style="text-align: right; margin: 0">
                                                <el-button size="small" text @click="popoverVisible[page.id] = false">cancel</el-button>
                                                <el-button size="small" type="primary"
                                                    @click="popoverVisible[page.id] = false; handleDelete(page.id)">
                                                    confirm
                                                </el-button>
                                            </div>
                                            <template #reference>
                                                <el-icon v-if="pages!.length > 1" @click="popoverVisible[page.id] = true"
                                                    style="right: -15px; margin-right: 0;" round>
                                                    <delete />
                                                </el-icon>
                                            </template>
                                        </el-popover>

                                    </el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item>
                                    <el-button plain @click="open">
                                        <el-icon>
                                            <CirclePlus />
                                        </el-icon>
                                        新建笔记
                                    </el-button>
                                </el-menu-item>
                            </el-sub-menu>
                            <el-sub-menu index="3">
                                <template #title>
                                    <el-icon><el-icon-star /></el-icon>我的收藏
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="2-1">Option 1</el-menu-item>
                                    <el-menu-item index="2-2">Option 2</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item index="2-3">Option 3</el-menu-item>
                                <el-sub-menu index="2-4">
                                    <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                                </el-sub-menu>
                            </el-sub-menu>
                            <el-sub-menu index="4">
                                <template #title>
                                    <el-icon>
                                        <setting />
                                    </el-icon>我的设置
                                </template>
                                <el-sub-menu index="4-1">
                                    <template #title>账户设置</template>
                                    <el-menu-item index="4-1-1">用户信息</el-menu-item>
                                    <el-menu-item index="4-1-2">登录和密码</el-menu-item>
                                    <el-menu-item index="4-1-3">账户同步</el-menu-item>
                                </el-sub-menu>
                                <el-sub-menu index="4-2">
                                    <template #title>通用设置</template>
                                    <el-menu-item index="4-2-1">语言</el-menu-item>
                                    <el-menu-item index="4-2-2">主题</el-menu-item>
                                    <el-menu-item index="4-2-3">字体</el-menu-item>
                                    <el-menu-item index="4-2-4">导航</el-menu-item>
                                </el-sub-menu>
                                <el-sub-menu index="4-3">
                                    <template #title>笔记设置</template>
                                    <el-menu-item-group>
                                        <el-menu-item index="4-3-1">默认笔记本</el-menu-item>
                                        <el-menu-item index="4-3-2">自动保存</el-menu-item>
                                        <el-menu-item index="4-3-3">格式设置</el-menu-item>
                                        <el-menu-item index="4-3-4">模版管理</el-menu-item>
                                    </el-menu-item-group>
                                </el-sub-menu>
                                <el-sub-menu index="4-4">
                                    <template #title>隐私和安全</template>
                                    <el-menu-item-group>
                                        <el-menu-item index="4-4-1">数据加密</el-menu-item>
                                        <el-menu-item index="4-4-2">两步验证</el-menu-item>
                                        <el-menu-item index="4-4-3">隐私设置</el-menu-item>
                                    </el-menu-item-group>
                                </el-sub-menu>
                                <el-sub-menu index="4-5">
                                    <template #title>通知和提醒</template>
                                    <el-menu-item-group>
                                        <el-menu-item index="4-5-1">通知设置</el-menu-item>
                                        <el-menu-item index="4-5-2">提醒和闹钟</el-menu-item>
                                    </el-menu-item-group>
                                </el-sub-menu>
                                <el-sub-menu index="4-6">
                                    <template #title>备份和同步</template>
                                    <el-menu-item-group>
                                        <el-menu-item index="4-6-1">备份笔记</el-menu-item>
                                        <el-menu-item index="4-6-2">同步设置</el-menu-item>
                                    </el-menu-item-group>
                                </el-sub-menu>
                                <el-sub-menu index="4-7">
                                    <template #title>高级设置</template>
                                    <el-menu-item-group>
                                        <el-menu-item index="4-7-1">实验性功能</el-menu-item>
                                        <el-menu-item index="4-7-2">自定义CSS</el-menu-item>
                                        <el-menu-item index="4-7-3">API访问</el-menu-item>
                                    </el-menu-item-group>
                                </el-sub-menu>
                                <el-sub-menu index="4-8">
                                    <template #title>帮助和支持</template>
                                    <el-menu-item index="4-22">用户手册</el-menu-item>
                                    <el-menu-item index="4-23">联系我们</el-menu-item>
                                    <el-menu-item index="4-24">关于软件</el-menu-item>
                                </el-sub-menu>
                            </el-sub-menu>
                        </el-menu>
                    </el-scrollbar>
                </el-aside>

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