<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { ref, onMounted, watchEffect } from 'vue'
import { assertExists } from '@blocksuite/store'
import {
    Notebook, Menu as IconMenu, CirclePlus, Setting, House, Delete, Plus, Star, StarFilled,
    ArrowLeft, MoreFilled, Notification
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

const route = useRoute()
const spaceId = route.params.spaceId as string;
const pid = ref(route.params.pid);

const editing = ref(false); // 定义一个控制编辑状态的响应式引用

function toggleEditing() {
  editing.value = !editing.value; // 切换编辑状态
}
</script>
<template>
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
</template>