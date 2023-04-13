<template>
  <n-card title="Selfie2Anime">
    <n-grid cols="2" x-gap="30">
      <n-grid-item>
        <n-upload action="http://localhost:5000/upload" :max="1">
          <n-upload-dragger>
            <div style="margin-bottom: 12px">
              <n-icon size="48" :depth="3">
                <archive-icon />
              </n-icon>
            </div>
            <n-text style="font-size: 16px">
              点击或者拖动文件到该区域来上传
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
              请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
            </n-p>
          </n-upload-dragger>
        </n-upload>
      </n-grid-item>
      <n-grid-item>
        <n-image v-if="imageUrl" width="256px" height="256px"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
        <div v-else id="placeholder">
          <Icon size="60" color="gray">
            <FlowerOutline />
          </Icon>
        </div>

      </n-grid-item>
    </n-grid>
    <div class="full-width">
      <n-button type="info">
      下载
    </n-button>
    </div>
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ArchiveOutline as ArchiveIcon, FlowerOutline } from '@vicons/ionicons5'
import { Icon } from '@vicons/utils'
import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://localhost:5000',
});
export default defineComponent({
  components: {
    ArchiveIcon,
    FlowerOutline,
    Icon
  },
  data() {
    return {
      selectedFile: null as File | null,
      imageUrl: null as string | null,
    };
  },
  methods: {
    onFileSelected(event: InputEvent) {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        this.selectedFile = files[0];
        this.imageUrl = URL.createObjectURL(this.selectedFile);
      }
    },
    async upload() {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        try {
          const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
          });
          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
});
</script>
<style scoped>
.n-upload-dragger {
  width: 256px;
  height: 256px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
}
.full-width {
  width: 100%;
}
#placeholder {
  width: 256px;
  height: 256px;
  display: flex;
  align-items: center;
  border: 1px dashed #d9d9d9;
  background-color: #e6e6e4;
  border-radius: 5px;
}
</style>
