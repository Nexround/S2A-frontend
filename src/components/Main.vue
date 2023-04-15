<template>
  <n-card title="Selfie2Anime">
    <template #footer>
      <n-divider />
      <n-p depth="3">
        Tip: 上传正方形照片以获得最佳效果
      </n-p>
    </template>
    <n-grid cols="1 m:2 l:2 xl:2 2xl:2" responsive="screen" x-gap="30" style="margin-bottom: 12px;">
      <n-gi>
        <n-upload action="/upload" :max="1" accept="image/png, image/jpeg" name="image" @finish="onFinish"
          list-type="image">
          <n-upload-dragger id="upload">
            <Icon size="60" color="gray" style="margin-bottom: 12px">
              <ArchiveOutline />
            </Icon>
            <n-p depth="3" style="font-size: 16px;margin: 8px 0 0 0">
              点击或者拖动文件到该区域来上传
            </n-p>
          </n-upload-dragger>
        </n-upload>
      </n-gi>
      <n-gi>
        <n-image v-if="imageUrl" :src="imageUrl" />
        <div v-else id="placeholder">
          <Icon size="60" color="gray" style="margin-bottom: 12px">
            <FlowerOutline />
          </Icon>
          <n-p depth="3" style="font-size: 16px;margin: 8px 0 0 0">
            预览区域
          </n-p>
        </div>

      </n-gi>

    </n-grid>
    <div class="full-width">
      <n-button v-if='imageUrl' type="info" @click="download">
        <Icon size="20" style="margin-right: 5px">
          <CloudDownloadOutline />
        </Icon>
        下载
      </n-button>
      <n-button v-else disabled type="info">
        <Icon size="20" style="margin-right: 5px">
          <CloudDownloadOutline />
        </Icon>
        下载
      </n-button>
    </div>
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ArchiveOutline, FlowerOutline, CloudDownloadOutline } from '@vicons/ionicons5'
import { Icon } from '@vicons/utils'
import axios from 'axios'
import type { UploadFileInfo } from 'naive-ui'

export default defineComponent({
  components: {
    ArchiveOutline,
    FlowerOutline,
    Icon,
    CloudDownloadOutline
  },
  data() {
    return {
      imageUrl: null as string | null,
      fileName: null as string | null,
    };
  },
  methods: {
    onFinish({
      file,
      event
    }: {
      file: UploadFileInfo
      event?: ProgressEvent
    }) {
      this.fileName = file.name;
      axios.get('/result/' + file.name, { responseType: 'blob' }).then(response => {
        this.imageUrl = URL.createObjectURL(response.data);
      });

    },
    download() {
      if (this.imageUrl) {
        const link = document.createElement('a');
        link.href = this.imageUrl;
        link.setAttribute('download', 'result.jpg');
        link.click();
      }
    },
  },
});
</script>
<style scoped>
.n-image {
  border-radius: 3px;
}

.n-button {}

.n-card {
  box-shadow: 10px 10px 120px rgba(201, 201, 201, 0.63);
}

#upload {
  width: 256px;
  height: 256px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.full-width {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

#placeholder {
  width: 256px;
  height: 256px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed #dadada;
  background-color: #fafafc;
  border-radius: 3px;
}
</style>
