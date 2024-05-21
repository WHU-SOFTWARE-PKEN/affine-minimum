<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { assertExists } from '@blocksuite/store'
import {
    Notebook, Menu as IconMenu, CirclePlus, Setting, House, Delete, Plus, Star, StarFilled,
    ArrowLeft, MoreFilled, Notification,Fold,Expand
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const spaceId = route.params.spaceId as string;
const pid = ref(route.params.pid);
const visible = ref(false)
const { workspace, pages } = useWorkspace(spaceId)

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

const show =ref(true)
</script>

<template>

    <el-icon v-show="!show" @click="show = !show" class="expand">
        <Expand />
    </el-icon>
    <div class="sidebar-resizer" @mousedown="startResize" :style="{ left: `${sidebarWidth}px` }"></div>
    <transition name="el-zoom-in-left">
        <el-aside :style="{ width: sidebarWidth + 'px' }" v-show="show">
            <el-scrollbar max-height="800px">
                <el-menu :default-openeds="['2']">
                    <el-icon @click="show = !show" class="hoverStyle">
                        <Fold />
                    </el-icon>
                    <el-menu-item index="1" @click="() => { router.push(`/workspace`) }">
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
                                <el-popover :visible="popoverVisible[page.id]" placement="top" :width="160">
                                    <p>Are you sure to delete this?</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="small" text
                                            @click="popoverVisible[page.id] = false">cancel</el-button>
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
                            <nuxt-link to="/settings/commonSettings/language">
                                <el-menu-item index="4-2-1">语言</el-menu-item>
                            </nuxt-link>
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
    </transition>
</template>

<style scoped>
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

.expand{
  position: fixed;
  top: 60px; /* 距离页面底部 10px */
  left: 8px; /* 距离页面右侧 10px */
  /* 其他样式，如大小、背景、边框等 */
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 5px;
  /* 鼠标悬停时的样式 */
  &:hover {
    background-color: #3ebde8;
  }
}
.hoverStyle{
    cursor: pointer;
    padding: 5px 5px;
    &:hover {
    background-color: #3ebde8;
  }
}
</style>