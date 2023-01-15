<script setup lang="ts">
const props = defineProps({
  media: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
})
</script>

<template>
  <div
    v-if="props.media.length > 0"
    class="grid w-full gap-2 my-4 overflow-hidden images h-70 bg-ll-neutral dark:bg-ld-neutral rounded-xl"
    :class="props.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'"
  >
    <div class="h-full">
      <img :src="`${props.media[0]}`" class="object-cover w-full h-70" alt="" />
    </div>
    <div
      v-if="props.media.length > 1"
      class="`h-70 grid gap-2"
      :class="`${props.media.length == 2 ? 'grid-cols-1 grid-rows-1' : ''} 
             ${props.media.length == 3 ? 'grid-cols-1 grid-rows-2' : ''} 
            ${props.media.length == 4 ? 'grid-cols-2 grid-rows-2' : ''}`"
    >
      <img
        v-if="props.media.length > 1"
        :src="`${props.media[1]}`"
        class="object-cover w-full h-full"
        :class="props.media.length == 3 && 'row-span-1 col-span-1 h-full'"
        :alt="props.media[1]"
      />
      <img
        v-if="props.media.length > 2"
        :src="`${props.media[2]}`"
        class="`w-full h-full object-cover"
        :class="props.media.length == 3 && 'row-span-2 col-span-1'"
        :alt="props.media[2]"
      />
      <img
        v-if="props.media.length > 3"
        :src="`${props.media[3]}`"
        class="`w-full h-full object-cover"
        :class="props.media.length == 4 && 'col-span-2'"
        :alt="props.media[3]"
      />
      <img
        v-if="props.media.length > 4"
        :src="`${props.media[4]}`"
        class="`w-full h-2/4 object-cover"
        :class="props.media.length == 5 && 'col-span-3 row-span-1'"
        :alt="props.media[4]"
      />
    </div>
  </div>
</template>
