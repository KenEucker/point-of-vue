<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import ImageModal from '../components/images/ImageModal.vue'
import ImageCard from '../components/images/ImageCard.vue'
import PaginationButtons from '../components/atomic/PaginationButtons.vue'
import { getRange } from '../utilities'
import { useImagesState } from '../store/state'
import SpinnerWithError from '../components/atomic/SpinnerWithError.vue'

const imagesState = useImagesState()
const loadedImageState = reactive<any>({
  images: [],
  albums: [...imagesState.getAlbums],
  selectedAlbum: null,
  loading: true,
})

watch(imagesState, () => {
  if (loadedImageState.albums.length !== imagesState.getAlbums?.length) {
    loadedImageState.albums = imagesState.getAlbums
  }
  loadedImageState.loading = true
  if (
    loadedImageState.selectedAlbum &&
    imagesState.checkFetchAlbumImages(loadedImageState.selectedAlbum)
  ) {
    // console.log('new images loaded for selected album', loadedImageState.selectedAlbum)
    loadedImageState.images = imagesState.getImagesMap.get(loadedImageState.selectedAlbum)
  }
  loadedImageState.loading = false
})

if (!imagesState.albumsHaveBeenFetched) {
  imagesState.fetchAlbums()
  loadedImageState.loading = true
} else {
  loadedImageState.loading = false
}

const imagesPerPage = 6
const currentPage = ref(1)
const imageToShow = ref()

const selectAlbum = async (selectedAlbum: any) => {
  loadedImageState.selectedAlbum = selectedAlbum
  if (imagesState.checkFetchAlbumImages(loadedImageState.selectedAlbum)) {
    // console.log('images already loaded for selected album', loadedImageState.selectedAlbum)
    loadedImageState.images = imagesState.getImagesMap.get(loadedImageState.selectedAlbum)
  }
}

const getFromTo = () => {
  const from = currentPage.value > 1 ? currentPage.value * imagesPerPage - 1 : 0
  const to =
    from + imagesPerPage > loadedImageState.images.length
      ? loadedImageState.images.length - 1
      : from + imagesPerPage - 1
  return getRange({ start: from, end: to })
}
const fromTo = computed(getFromTo)
</script>

<template>
  <div class="relative p-10">
    <image-modal :image="imageToShow" />
    <div v-show="loadedImageState.loading" class="w-full">
      <spinner-with-error type="images" :loading="loadedImageState.loading" />
    </div>
    <div v-show="!loadedImageState.loading">
      <div
        v-show="loadedImageState.albums.length"
        class="flex flex-no-wrap items-start mb-8 overflow-x-scroll scrolling-touch"
      >
        <image-card
          v-for="album in loadedImageState.albums"
          :key="`image-${album.id}`"
          class="w-62"
          variant="mini"
          :title="album.title ?? ''"
          :alt="album.title ?? ''"
          :description="album.description ?? ''"
          :img="album.cover ?? ''"
          @click="selectAlbum(album.id)"
        />
      </div>
      <div v-show="!loadedImageState.albums.length" class="w-full text-center">
        No Albums To Display
      </div>
    </div>
    <div class="flex flex-row">
      <pagination-buttons
        v-model="currentPage"
        class="w-full py-10 text-center"
        :max="5"
        :total="loadedImageState.images.length"
        :page-size="imagesPerPage"
      />
    </div>
    <div
      v-show="loadedImageState.images.length"
      class="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-8"
    >
      <image-card
        v-for="index in fromTo"
        :key="`image-${loadedImageState.images[index].id}`"
        :title="loadedImageState.images[index].title ?? ''"
        :alt="loadedImageState.images[index].title ?? ''"
        :description="loadedImageState.images[index].description ?? ''"
        :img="loadedImageState.images[index].link ?? ''"
        src="Imgur"
        :index="index"
        @click="imageToShow = loadedImageState.images[index].id"
      />
      <div v-show="!loadedImageState.images.length" class="w-full text-center">
        select an album to display photos
      </div>
    </div>
  </div>
</template>
