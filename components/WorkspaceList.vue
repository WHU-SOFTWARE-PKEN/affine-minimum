<script setup lang="ts">
const router = useRouter()

async function handleOpen(workspaceId: string) {
  const pageId = (await initWorkspace(workspaceId)).meta.pageMetas[0].id
  router.push(`space/${workspaceId}/${pageId}`)
}

async function handleDelete(id: string) {
  const provider = createProvider(id, { connect: false })
  if (provider.connected) provider.disconnect()
  await provider.cleanup()
  workspaceIds.value = workspaceIds.value.filter((i) => i !== id)
}

function handleAdd() {
  // eslint-disable-next-line no-alert
  const id = prompt('Workspace ID')
  if (!id) return

  if (workspaceIds.value.includes(id)) {
    // eslint-disable-next-line no-alert
    alert('Workspace ID already exists')
    return
  }
  workspaceIds.value.push(id)
}

async function handleJumpToTestPage()
{
  console.log("可访问的url",router.options.routes);
  router.push(`/notesShow`)
}

async function handleOpenPage(workspaceId: string) {
  try {
    const workspace = await initWorkspace(workspaceId);
    if (!workspace || workspace.meta === null || workspace.meta === undefined|| workspace.meta.pageMetas.length === 0) {
      // 处理工作区初始化失败或页面元数据不存在的情况
      console.error('Workspace initialization failed or no page metas found');
      // 这里可以添加错误处理逻辑，例如显示错误消息或导航到错误页面
      return;
    }
    console.log(workspace.meta);
    const pageId = workspace.meta.pageMetas[0].id;
    router.push(`space/${workspaceId}/${pageId}`);
  } catch (error) {
    // 处理 initWorkspace 函数抛出的异常
    console.error('Error initializing workspace:', error);
    // 这里可以添加错误处理逻辑，例如显示错误消息或导航到错误页面
  }
}
</script>

<template>
  <div flex="~ wrap gap5" p5 justify-start>
    <div
      v-for="id in workspaceIds"
      :key="id"
      class="card"
      @click = "handleOpenPage(id)"
    >
      <span>{{ id }}</span>
      <button @click.stop="handleDelete(id)">delete</button>
    </div>
    <div class="card !justify-center" items-center @click="handleAdd">
      <span font-bold text-lg>Add Workspace</span>
    </div>

    <el-button round @click = "handleJumpToTestPage()">跳转到测试页面</el-button>
  </div>
</template>

<style scoped>
.card {
  --at-apply: 'w-200px h-150px p5 rounded-5 flex flex-col justify-between shadow-md transition-all transition-delay-200 transition-ease-in-out cursor-pointer';
}
</style>
