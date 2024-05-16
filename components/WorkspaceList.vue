<script setup lang="ts">
import drag from './DragBase.vue'
import {Delete} from '@element-plus/icons-vue'
import { ref } from "vue";
const one = ref(true); //当one为true时执行轮播。以此来控制每次轮播图切换的张数为1
const swiper = ref(null);
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

function goWheel(event) {
  // 当鼠标滚轮向下滚动时，其返回值大于零，向上滚动时其返回值小于零
  if (event.deltaY > 0 && one.value) {
    swiper.value.next();
    one.value = false;
    setTimeout(() => {
      one.value = true;
    }, 200);
  }
  if (event.deltaY < 0 && one.value) {
    swiper.value.prev();
    one.value = false;
    setTimeout(() => {
      one.value = true;
    }, 200);
  }
}
</script>

<template>
  <div class="background">
    <drag style="cursor:pointer" @click="handleAdd"></drag>
    <div @wheel="goWheel" >
      <el-carousel
          ref="swiper"
          width="100vh"
          height="100vh"
          direction="vertical"
          type="card"
          :autoplay="false"
          trigger="click"
          indicator-position="none"
      >
        <el-carousel-item
            v-for="id in workspaceIds"
            :key="id"
            class="workspaceCard"
            @click="handleOpen(id)"
        >
          <h3 text="2xl" justify="center">{{ id }}</h3>
          <el-button type="danger" :icon="Delete" plain circle @click.stop="handleDelete(id)"></el-button>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<style scoped>
.background {
  position: relative; /* 添加 position: relative; 让子元素定位相对于此 */
  width: 100%;
  height: 100vh;
  background-color: transparent;
  background-image: url("./background_notepad.jpg");
  background-size: cover; /* 使用 cover 保持图片比例并覆盖整个容器 */
  background-position: center;
  background-repeat: no-repeat;
}

.background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px); 
}
.workspaceCard {
  width: 60%;
  height: 50%;
  border-radius: 50px; 
  transition: transform 0.3s, box-shadow 0.3s; 
  text-align: center;
  left:20%;
  border-style: solid
}
.workspaceCard:hover{
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.5); 
}
.el-carousel__item h3 {
  color: black;
  font-style: italic;
  line-height: 200px;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color:blanchedalmond;
}
.el-carousel__item:nth-child(2n+1) {
  background-color:burlywood;
}
</style>