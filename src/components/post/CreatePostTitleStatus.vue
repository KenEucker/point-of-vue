<script setup lang="ts">
import { reactive, computed } from 'vue'
import EmojiPicker from 'vue3-emoji-picker'
import { useNow, useDateFormat } from '@vueuse/core'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:status', 'update:title'])

const firstTitle = useDateFormat(useNow(), 'MMMM DD, YYYY').value
const title = computed({
  get: () => props.title,
  set: (v) => emit('update:title', v),
})
const status = computed({
  get: () => props.status,
  set: (v) => emit('update:status', v),
})

const showEmojiPicker = reactive({
  show: false,
  emoji: null,
})

const onSelectEmoji = (emoji: any) => {
  showEmojiPicker.show = false
  showEmojiPicker.emoji = emoji
  status.value = emoji.i
}
</script>

<template>
  <div class="flex">
    <emoji-picker
      v-show="showEmojiPicker.show"
      :input="true"
      class="absolute z-2000"
      :native="true"
      @select="onSelectEmoji"
    />
    <input
      :value="status"
      type="text"
      class="w-20 p-2 mb-2 text-lg text-center rounded-md outline-none bg-ll-base dark:bg-ld-base"
      placeholder="status"
      resize="none"
      @focus="showEmojiPicker.show = true"
    />
    <input
      :value="title"
      type="text"
      class="w-3/4 p-2 mx-auto mb-2 text-lg rounded-md outline-none bg-ll-base dark:bg-ld-base"
      :placeholder="firstTitle"
      resize="none"
      @input="(e:any) => (title = e.target.value)"
    />
  </div>
</template>
