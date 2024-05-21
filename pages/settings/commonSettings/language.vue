<script setup lang="ts">
</script>

<template>
    <!-- 组件Header和Aside都是需要重写的，因为在访问笔记页面的地方用到了spaceId和pageId这两个路由参数 -->
    <!-- 但是侧边栏是必须要渲染的，所以不能没有spaceId，设置是否应该针对不同的工作区进行设置？2024-05-21 20:29:39 -->
    <div>
        <el-container>
            <!-- 标题栏部分 -->
            <el-header>
                <SettingHeader />
            </el-header>

            <el-container>
                <!-- 侧边栏部分 -->
                    <!-- <Aside /> -->
                <el-main>
                    language Page!
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