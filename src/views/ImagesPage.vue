<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import ImageCard from '../components/images/ImageCard.vue'
import PaginationButtons from '../components/atomic/PaginationButtons.vue'
import { getImgurImageSized, getRange } from '../utilities'
import { useImagesState } from '../store/state'
import SpinnerWithError from '../components/atomic/SpinnerWithError.vue'
import AddIcon from 'vue-ionicons/dist/md-add-circle-outline.vue'

const imagesState = useImagesState()
const loadedImageState = reactive<any>({
  images: [],
  albums: [...imagesState.getAlbums],
  selectedAlbum: null,
  loading: true,
})

const mapImageToGalleryImageSrc = (i: any) => i

const loadAlbumImages = () => {
  const imagesToLoad = imagesState.getImagesMap.get(loadedImageState.selectedAlbum) ?? []
  loadedImageState.images = imagesToLoad.map(mapImageToGalleryImageSrc)
  console.log(loadedImageState.images)
  loadedImageState.loading = false
  showLb.value = true
}

const selectAlbum = async (selectedAlbum: any) => {
  loadedImageState.selectedAlbum = selectedAlbum
  if (imagesState.checkFetchAlbumImages(loadedImageState.selectedAlbum)) {
    loadAlbumImages()
  }
}

watch(imagesState, async () => {
  loadedImageState.loading = true
  if (loadedImageState.albums.length !== imagesState.getAlbums?.length) {
    loadedImageState.loading = false
    loadedImageState.albums = imagesState.getAlbums
    currentAlbumsPage.value = 1
  }
  if (
    loadedImageState.selectedAlbum &&
    imagesState.checkFetchAlbumImages(loadedImageState.selectedAlbum)
  ) {
    loadAlbumImages()
  }
})

if (!imagesState.albumsHaveBeenFetched) {
  imagesState.fetchAlbums()
  loadedImageState.loading = true
} else {
  loadedImageState.loading = false
}

const albumsPerPage = 4
const imagesPerPage = 12
const currentAlbumsPage = ref(1)
const currentImagesPage = ref(1)
const imageToShow = ref(0)
const showLb = ref(false)

const totalAlbums = computed(() => loadedImageState.albums.length)
const totalImages = computed(() => loadedImageState.images.length)
const fromTo = (current: number, perPage: number, total: number) => {
  const from = current > 1 ? current * perPage - 1 : 0
  const to = from + perPage > total ? total - 1 : from + perPage - 1
  console.log({ start: from, end: to })
  return getRange({ start: from, end: to })
}

const fromToAlbums = computed(() =>
  fromTo(currentAlbumsPage.value, albumsPerPage, totalAlbums.value)
)
const fromToImages = computed(() =>
  fromTo(currentImagesPage.value, imagesPerPage, totalImages.value)
)

const createNewAlbum = () => {
  // imagesState.createNewAlbum()
}
</script>

<template>
  <div class="relative px-20 py-10">
    <div v-show="loadedImageState.loading" class="w-full">
      <spinner-with-error type="images" :loading="loadedImageState.loading" />
    </div>
    <div v-show="!loadedImageState.loading">
      <image-card
        title="add new album"
        description="click here to add a new album"
        img="/img/add-imgur-album.svg"
        alt="add new album"
        class="w-62 inline-flex"
        variant="mini"
        source="Imgur"
        @click.prevent="createNewAlbum"
      />
      <div
        v-show="loadedImageState.albums.length"
        class="flex flex-nowrap items-start mb-8 scrolling-touch inline-flex"
      >
        <image-card
          v-for="index in fromToAlbums"
          :key="`album-${loadedImageState.albums[index].id}`"
          :title="loadedImageState.albums[index].title ?? ''"
          :alt="loadedImageState.albums[index].title ?? ''"
          :description="loadedImageState.albums[index].description ?? ''"
          :img="loadedImageState.albums[index].cover ?? ''"
          class="w-62"
          variant="mini"
          source="Imgur"
          @click.prevent="selectAlbum(loadedImageState.albums[index].id)"
        />
      </div>
      <div v-show="!loadedImageState.albums.length" class="w-full text-center">
        No Albums To Display
      </div>
      <div class="flex flex-row">
        <pagination-buttons
          v-if="totalAlbums > 1"
          v-model="currentAlbumsPage"
          class="w-full py-10 text-center"
          :max="5"
          :total="totalAlbums"
          :page-size="albumsPerPage"
        />
      </div>
    </div>
    <div
      v-if="loadedImageState.images.length"
      class="container px-5 py-2 mx-auto lg:pt-24 lg:px-32"
    >
      <div class="flex flex-wrap -m-1 md:-m-2">
        <div class="flex flex-wrap w-1/2">
          <image-card
            v-for="index in fromToImages"
            :key="`image-${loadedImageState.images[index].id}`"
            class="w-1/2 p-1 md:p-2"
            :title="loadedImageState.images[index].title ?? ''"
            :alt="loadedImageState.images[index].title ?? ''"
            :description="loadedImageState.images[index].description ?? ''"
            :img="loadedImageState.images[index].link ?? ''"
            src="Imgur"
            :index="index"
            @click="imageToShow = index"
          />
          <vue-easy-lightbox
            :visible="showLb"
            :imgs="loadedImageState.images"
            :index="imageToShow"
            @hide="showLb = false"
          ></vue-easy-lightbox>
        </div>
        <div v-show="!loadedImageState.images.length" class="w-full text-center h-20">
          select an album to display photos
        </div>
      </div>
    </div>
  </div>
</template>
