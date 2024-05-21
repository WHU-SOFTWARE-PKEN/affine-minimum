<script setup lang="ts">
import {
    Star,MoreFilled, Notification
} from '@element-plus/icons-vue'

</script>
<template>
    <el-row type="flex" justify="start" align="middle">
        <el-col :span="4">
            <!-- 头像 -->
            <nuxt-link to="/user/information" class="custom-link">
                <div>
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <span style="margin-left: 1px; position: relative;top: -10px; left:5px">登录者的昵称</span>
                </div>
            </nuxt-link>
        </el-col>
        <!-- 笔记软件的名称和图标 -->
        <el-col :span="18" style="align-items: center; display: flex;
                    gap: 24px; height: 100%; width: 100%;">
            <el-tooltip class="box-item" effect="light" content="Workspace" placement="bottom">
                <div style="height:31px;">
                    <el-icon style="position: relative;top: 4px;">
                        <Notification />
                    </el-icon>
                    设置
                </div>
            </el-tooltip>

            <div>
                <el-dropdown>
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

<style>
.custom-link {
  text-decoration: none;
  color: inherit; /* 或者你想要的颜色，比如 #333 */
}

.custom-link:hover {
  color: #666; /* 或者你想要的颜色 */
}
</style>