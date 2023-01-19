<script setup lang="ts">
import { ref, computed } from 'vue'
import ImageModal from '../components/images/ImageModal.vue'
import ImageCard from '../components/images/ImageCard.vue'
import PaginationButtons from '../components/atomic/PaginationButtons.vue'
import { getRange } from '../utilities'

const images = ref([
  {
    img: 'https://picsum.photos/id/1/300/300',
    full: 'https://picsum.photos/id/1/200/300',
    title: 'Beautiful sunset',
    description: 'A stunning photo of a sunset over the ocean',
    alt: 'Orange and pink sunset over the ocean',
    id: 1,
  },
  {
    img: 'https://picsum.photos/id/10/300/200',
    full: 'https://picsum.photos/id/10/300/300',
    title: 'Cute puppy',
    description: 'An adorable golden retriever puppy playing in a field of flowers',
    alt: 'Golden retriever puppy with a flower in its mouth',
    id: 2,
  },
  {
    img: 'https://picsum.photos/id/100/300/300',
    full: 'https://picsum.photos/id/100/100/100',
    title: 'Majestic mountain',
    description: 'A majestic snowy mountain peak in the distance',
    alt: 'Snowy mountain with blue sky and clouds',
    id: 3,
  },
  {
    img: 'https://picsum.photos/id/1000/300/300',
    full: 'https://picsum.photos/id/1000/300/300',
    title: 'Tropical paradise',
    description: 'A tropical beach with crystal clear water and palm trees',
    alt: 'White sandy beach with palm trees and turquoise water',
    id: 4,
  },
  {
    img: 'https://picsum.photos/id/1001/300/300',
    full: 'https://picsum.photos/id/1001/300/300',
    title: 'Colorful city',
    description: 'A bustling city street with colorful buildings and street art',
    alt: 'Brightly colored buildings and graffiti art',
    id: 5,
  },
  {
    img: 'https://picsum.photos/id/1002/300/300',
    full: 'https://picsum.photos/id/1002/500/500',
    title: 'Waterfall wonder',
    description: 'A breathtaking waterfall cascading into a lush green pool',
    alt: 'Waterfall in a lush green forest',
    id: 6,
  },
  {
    img: 'https://picsum.photos/id/1003/300/300',
    full: 'https://picsum.photos/id/1003/300/300',
    title: 'Autumn leaves',
    description: 'A path lined with colorful autumn leaves',
    alt: 'Orange, yellow, and red autumn leaves on a path',
    id: 7,
  },
  {
    img: 'https://picsum.photos/id/1004/300/300',
    full: 'https://picsum.photos/id/1004/300/300',
    title: 'Wildlife wonder',
    description: 'A herd of wild elephants wandering through the savannah',
    alt: 'Wild elephants on the savannah',
    id: 8,
  },
  {
    img: 'https://picsum.photos/id/1005/300/300',
    full: 'https://picsum.photos/id/1005/300/300',
    title: 'Elegant building',
    description: 'An elegant historic building with intricate architectural details',
    alt: 'Old building with columns and a dome',
    id: 9,
  },
  {
    img: 'https://picsum.photos/id/1006/300/300',
    full: 'https://picsum.photos/id/1006/300/300',
    title: 'Lonely tree',
    description: 'A tree standing alone on a hilltop with a beautiful sunset in the background',
    alt: 'A tree standing alone on a hilltop',
    id: 10,
  },
  {
    img: 'https://picsum.photos/id/102/300/300',
    full: 'https://picsum.photos/id/102/300/300',
    title: 'Rainy day',
    description: 'A city street on a rainy day, with reflections on the pavement',
    alt: 'A city street with reflections on the pavement',
    id: 11,
  },
  {
    img: 'https://picsum.photos/id/1008/300/300',
    full: 'https://picsum.photos/id/1008/300/300',
    title: 'Flower garden',
    description: 'A vibrant flower garden in full bloom',
    alt: 'A garden full of colorful flowers',
    id: 12,
  },
  {
    img: 'https://picsum.photos/id/1/300/300',
    full: 'https://picsum.photos/id/1/200/300',
    title: 'Beautiful sunset',
    description: 'A stunning photo of a sunset over the ocean',
    alt: 'Orange and pink sunset over the ocean',
    id: 1,
  },
  {
    img: 'https://picsum.photos/id/10/300/200',
    full: 'https://picsum.photos/id/10/300/300',
    title: 'Cute puppy',
    description: 'An adorable golden retriever puppy playing in a field of flowers',
    alt: 'Golden retriever puppy with a flower in its mouth',
    id: 2,
  },
  {
    img: 'https://picsum.photos/id/100/300/300',
    full: 'https://picsum.photos/id/100/100/100',
    title: 'Majestic mountain',
    description: 'A majestic snowy mountain peak in the distance',
    alt: 'Snowy mountain with blue sky and clouds',
    id: 3,
  },
  {
    img: 'https://picsum.photos/id/1000/300/300',
    full: 'https://picsum.photos/id/1000/300/300',
    title: 'Tropical paradise',
    description: 'A tropical beach with crystal clear water and palm trees',
    alt: 'White sandy beach with palm trees and turquoise water',
    id: 4,
  },
  {
    img: 'https://picsum.photos/id/1001/300/300',
    full: 'https://picsum.photos/id/1001/300/300',
    title: 'Colorful city',
    description: 'A bustling city street with colorful buildings and street art',
    alt: 'Brightly colored buildings and graffiti art',
    id: 5,
  },
  {
    img: 'https://picsum.photos/id/1002/300/300',
    full: 'https://picsum.photos/id/1002/500/500',
    title: 'Waterfall wonder',
    description: 'A breathtaking waterfall cascading into a lush green pool',
    alt: 'Waterfall in a lush green forest',
    id: 6,
  },
  {
    img: 'https://picsum.photos/id/1003/300/300',
    full: 'https://picsum.photos/id/1003/300/300',
    title: 'Autumn leaves',
    description: 'A path lined with colorful autumn leaves',
    alt: 'Orange, yellow, and red autumn leaves on a path',
    id: 7,
  },
  {
    img: 'https://picsum.photos/id/1004/300/300',
    full: 'https://picsum.photos/id/1004/300/300',
    title: 'Wildlife wonder',
    description: 'A herd of wild elephants wandering through the savannah',
    alt: 'Wild elephants on the savannah',
    id: 8,
  },
  {
    img: 'https://picsum.photos/id/1005/300/300',
    full: 'https://picsum.photos/id/1005/300/300',
    title: 'Elegant building',
    description: 'An elegant historic building with intricate architectural details',
    alt: 'Old building with columns and a dome',
    id: 9,
  },
  {
    img: 'https://picsum.photos/id/1006/300/300',
    full: 'https://picsum.photos/id/1006/300/300',
    title: 'Lonely tree',
    description: 'A tree standing alone on a hilltop with a beautiful sunset in the background',
    alt: 'A tree standing alone on a hilltop',
    id: 10,
  },
  {
    img: 'https://picsum.photos/id/102/300/300',
    full: 'https://picsum.photos/id/102/300/300',
    title: 'Rainy day',
    description: 'A city street on a rainy day, with reflections on the pavement',
    alt: 'A city street with reflections on the pavement',
    id: 11,
  },
  {
    img: 'https://picsum.photos/id/1008/300/300',
    full: 'https://picsum.photos/id/1008/300/300',
    title: 'Flower garden',
    description: 'A vibrant flower garden in full bloom',
    alt: 'A garden full of colorful flowers',
    id: 12,
  },
  {
    img: 'https://picsum.photos/id/1/300/300',
    full: 'https://picsum.photos/id/1/200/300',
    title: 'Beautiful sunset',
    description: 'A stunning photo of a sunset over the ocean',
    alt: 'Orange and pink sunset over the ocean',
    id: 1,
  },
  {
    img: 'https://picsum.photos/id/10/300/200',
    full: 'https://picsum.photos/id/10/300/300',
    title: 'Cute puppy',
    description: 'An adorable golden retriever puppy playing in a field of flowers',
    alt: 'Golden retriever puppy with a flower in its mouth',
    id: 2,
  },
  {
    img: 'https://picsum.photos/id/100/300/300',
    full: 'https://picsum.photos/id/100/100/100',
    title: 'Majestic mountain',
    description: 'A majestic snowy mountain peak in the distance',
    alt: 'Snowy mountain with blue sky and clouds',
    id: 3,
  },
  {
    img: 'https://picsum.photos/id/1000/300/300',
    full: 'https://picsum.photos/id/1000/300/300',
    title: 'Tropical paradise',
    description: 'A tropical beach with crystal clear water and palm trees',
    alt: 'White sandy beach with palm trees and turquoise water',
    id: 4,
  },
  {
    img: 'https://picsum.photos/id/1001/300/300',
    full: 'https://picsum.photos/id/1001/300/300',
    title: 'Colorful city',
    description: 'A bustling city street with colorful buildings and street art',
    alt: 'Brightly colored buildings and graffiti art',
    id: 5,
  },
  {
    img: 'https://picsum.photos/id/1002/300/300',
    full: 'https://picsum.photos/id/1002/500/500',
    title: 'Waterfall wonder',
    description: 'A breathtaking waterfall cascading into a lush green pool',
    alt: 'Waterfall in a lush green forest',
    id: 6,
  },
  {
    img: 'https://picsum.photos/id/1003/300/300',
    full: 'https://picsum.photos/id/1003/300/300',
    title: 'Autumn leaves',
    description: 'A path lined with colorful autumn leaves',
    alt: 'Orange, yellow, and red autumn leaves on a path',
    id: 7,
  },
  {
    img: 'https://picsum.photos/id/1004/300/300',
    full: 'https://picsum.photos/id/1004/300/300',
    title: 'Wildlife wonder',
    description: 'A herd of wild elephants wandering through the savannah',
    alt: 'Wild elephants on the savannah',
    id: 8,
  },
  {
    img: 'https://picsum.photos/id/1005/300/300',
    full: 'https://picsum.photos/id/1005/300/300',
    title: 'Elegant building',
    description: 'An elegant historic building with intricate architectural details',
    alt: 'Old building with columns and a dome',
    id: 9,
  },
  {
    img: 'https://picsum.photos/id/1006/300/300',
    full: 'https://picsum.photos/id/1006/300/300',
    title: 'Lonely tree',
    description: 'A tree standing alone on a hilltop with a beautiful sunset in the background',
    alt: 'A tree standing alone on a hilltop',
    id: 10,
  },
  {
    img: 'https://picsum.photos/id/102/300/300',
    full: 'https://picsum.photos/id/102/300/300',
    title: 'Rainy day',
    description: 'A city street on a rainy day, with reflections on the pavement',
    alt: 'A city street with reflections on the pavement',
    id: 11,
  },
  {
    img: 'https://picsum.photos/id/1008/300/300',
    full: 'https://picsum.photos/id/1008/300/300',
    title: 'Flower garden',
    description: 'A vibrant flower garden in full bloom',
    alt: 'A garden full of colorful flowers',
    id: 12,
  },
])

const totalImages = images.value.length
const imagesPerPage = 6
const currentPage = ref(3)
const imageToShow = ref()

const getFromTo = () => {
  const from = currentPage.value > 1 ? currentPage.value * imagesPerPage - 1 : 0
  const to = from + imagesPerPage > totalImages ? totalImages - 1 : from + imagesPerPage - 1
  const result = getRange({ start: from, end: to })
  return result
}
const fromTo = computed(getFromTo)

// watch(currentPage, (c: number) => {
//   console.log({ currentPageChange: currentPage.value, c })
//   fromTo.value = getFromTo()
// })

const totalPages = computed(() => {
  return Math.ceil(images.value.length / imagesPerPage)
})

// function nextPage() {
//   if (currentPage.value < totalPages.value) {
//     // currentPage.value++
//   }
// }

// function previousPage() {
//   if (currentPage.value > 1) {
//     // currentPage.value--
//   }
// }
// function goToPage(index: number) {
//   if (index > 0 && index < images.value.length / imagesPerPage + 1) {
//     console.log({ index })
//     currentPage.value = index
//   }
// }

function openAlbum(albumId: string) {
  console.log('open', albumId)
}
</script>

<template>
  <div class="p-10">
    <image-modal :image="imageToShow" />
    <div class="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8">
      <image-card
        v-for="album in images"
        :key="`image-${album.id}`"
        class="w-62"
        variant="mini"
        :full="album.full ?? album.img"
        :title="album.title"
        :alt="album.alt"
        :description="album.description"
        :img="album.img"
        @click="imageToShow = album.id"
      />
    </div>
    <pagination-buttons
      v-model="currentPage"
      class="text-center w-full py-10"
      :max="5"
      :total="images.length"
      :page-size="imagesPerPage"
    />
    <div
      class="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-8"
    >
      <image-card
        v-for="index in fromTo"
        :key="`image-${images[index].id}`"
        :full="images[index].full ?? images[index].img"
        :title="images[index].title"
        :alt="images[index].alt"
        :description="images[index].description"
        :img="images[index].img"
        src="Imgur"
        :index="index"
        @click="imageToShow = images[index].id"
      />
    </div>
  </div>
</template>
