<script setup lang="ts">
import { reactive } from 'vue'
import { getRange } from '../../utilities'
import { UseOffsetPagination } from '@vueuse/components'

const inProps = defineProps({
  pageSize: { type: Number, default: 1 },
  total: { type: Number, default: 1 },
  max: { type: Number, default: 10 },
  debug: { type: Boolean, default: false },
  modelValue: { type: Number, default: 1 },
  showEmpty: { type: Boolean, default: true },
})

const props = reactive({ ...inProps })

function getPageRange(
  currentPage: number,
  maxPageRange: number,
  pageCount: number
): { start: number; end: number } {
  let start = currentPage - Math.floor(maxPageRange / 2)
  let end = currentPage + Math.floor(maxPageRange / 2)
  if (start < 1) {
    start = 1
  }
  if (end > pageCount) {
    end = pageCount
  }
  if (end - start + 1 < maxPageRange) {
    if (end === pageCount) {
      start = end - maxPageRange + 1
    } else {
      end = start + maxPageRange - 1
    }
  }
  if (pageCount < maxPageRange) {
    end = pageCount
  }
  return { start, end }
}

const emit = defineEmits(['pageChange', 'pageSizeChange', 'prev', 'next', 'update:modelValue'])
const onPageChange = () => emit('pageChange')
const onPageSizeChange = () => emit('pageSizeChange')

function gotoPage(i: number) {
  emit('update:modelValue', i)
}
function prevPage(prev: () => void) {
  props.modelValue--
  emit('update:modelValue', props.modelValue)
  emit('prev', props.modelValue)
  prev()
}
function nextPage(next: () => void) {
  props.modelValue++
  emit('update:modelValue', props.modelValue)
  emit('next', props.modelValue)
  next()
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <UseOffsetPagination
      v-slot="{ currentPage, currentPageSize, next, prev, pageCount, isFirstPage, isLastPage }"
      :page="props.modelValue"
      :page-size="props.pageSize"
      :total="props.total"
      @page-change="onPageChange"
      @page-size-change="onPageSizeChange"
    >
      <div v-if="debug" class="inline-grid items-center m-5">
        <legend class="border-2 rounded-xl">
          <label opacity="50">modelValue:</label>
          <p>{{ props.modelValue }}</p>
          <label opacity="50">total:</label>
          <p>{{ props.total }}</p>
          <label opacity="50">pageCount:</label>
          <p>{{ pageCount }}</p>
          <label opacity="50">currentPageSize:</label>
          <p>{{ currentPageSize }}</p>
          <label opacity="50">currentPage:</label>
          <p>{{ currentPage }}</p>
          <label opacity="50">isFirstPage:</label>
          <p>{{ isFirstPage }}</p>
          <label opacity="50">isLastPage:</label>
          <p>{{ isLastPage }}</p>
        </legend>
      </div>
      <div v-show="props.showEmpty">
        <button
          :disabled="isFirstPage"
          class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="() => prevPage(prev)"
        >
          prev
        </button>
        <div v-if="total > 0" class="inline">
          <button
            v-for="i in getRange(getPageRange(currentPage, props.max, pageCount))"
            :key="`page-${i}`"
            :aria-active="i === currentPage"
            :disabled="i === currentPage"
            class="px-3 py-2 text-gray-500 bg-white border border-gray-300 cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            :class="
              i === currentPage ? 'dark:border-gray-700 dark:bg-gray-700 dark:text-white ' : ''
            "
            @click="gotoPage(i)"
          >
            {{ i }}
          </button>
        </div>
        <div v-else class="inline">
          <button
            class="px-3 py-2 text-gray-100 bg-white border border-gray-300 cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            :disabled="true"
          >
            0
          </button>
        </div>
        <button
          :disabled="isLastPage"
          class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="() => nextPage(next)"
        >
          next
        </button>
      </div>
    </UseOffsetPagination>
  </div>
</template>
