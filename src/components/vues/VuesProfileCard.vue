<script setup lang="ts">
import PovCreator from '../creator/PovCreator.vue'
import { PovComponent } from '../../utilities'
import PovVueCard from './PovVueCard.vue'
import { usePageState, useGithubState } from '../../store/state'

const pageState = usePageState()
const githubState = useGithubState()

const props = defineProps({
  creator: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  components: {
    type: Array<PovComponent>,
    default: () => [],
    required: true,
  },
  imageOnly: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'small',
  },
})

const emit = defineEmits(['edit', 'view', 'archive', 'delete', 'logs'])

const developerStats = [
  {
    icon: 'messages',
    count: 4600,
    text: 'Comments',
  },
  {
    icon: 'cards',
    count: 6,
    text: 'Vues',
  },
  {
    icon: 'target',
    count: 120340,
    text: 'Vue Shares',
  },
]
</script>

<template>
  <div>
    <div
      class="relative flex-row m-5 border rounded-lg border-gray-200/80 light:bg-white p- md:p-6"
    >
      <div
        class="flex items-center clear-both mb-0 leading-5 break-words md:mb-0 md:block text-slate-400"
        style="content: ''"
      ></div>
      <div
        class="flex items-center clear-both mb-0 leading-5 break-words md:mb-0 md:block text-slate-400"
        style="content: ''"
      >
        <div
          class="relative flex-shrink-0 inline-block w-1/6 mr-0 break-words md:mr-0 md:w-full"
          style="z-index: 4"
        >
          <img
            :src="githubState.getAccount?.avatar"
            alt="github account avatar"
            width="150"
            height="150"
            class="rounded-xl"
          />
        </div>

        <div class="py-4 break-words" data-original-top="0px" style="position: sticky">
          <h1 class="m-0 text-3xl font-semibold leading-none">
            <span class="block overflow-hidden text-2xl leading-tight" itemprop="name">
              {{ githubState.getAccount?.name }}
            </span>
            <span
              class="block text-xl not-italic font-light leading-6 text-slate-500"
              itemprop="additionalName"
            >
              {{ githubState.getAccount?.name }}
            </span>
          </h1>
        </div>
        <div class="flex flex-col leading-5 break-words md:block text-slate-400">
          <div
            class="mb-4 overflow-hidden text-sm leading-6 md:text-base"
            :data-bio-text="githubState.getAccount?.bio"
          >
            <div class="text-base text-slate-400">
              {{ githubState.getAccount?.bio }}
            </div>
          </div>

          <div class="order-1 mt-0 break-words md:mt-0">
            <div class="mb-4 text-slate-400">
              <a
                class="bg-transparent cursor-pointer whitespace-nowrap text-slate-500"
                :href="`https://github.com/${githubState.getAccount?.name}?tab=followers`"
                style="text-decoration: none"
              >
                <svg
                  text="muted"
                  aria-hidden="true"
                  height="16"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  data-view-component="true"
                  class="inline-block overflow-visible align-text-bottom"
                  style="fill: currentcolor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"
                    class=""
                  ></path>
                </svg>
                <span class="text-bold color-fg-default">{{
                  githubState.getAccount?.followers
                }}</span>
                followers
              </a>
              ·
              <a
                class="bg-transparent cursor-pointer whitespace-nowrap text-slate-500"
                href="https://github.com/KenEucker?tab=following"
                style="text-decoration: none"
              >
                <span class="text-bold color-fg-default">{{
                  githubState.getAccount?.following
                }}</span>
                following
              </a>
            </div>
          </div>

          <ul class="pl-0 my-0 break-words" style="list-style: none">
            <li
              class="pt-1 pl-6 text-sm text-left sm:hidden"
              itemprop="homeLocation"
              show_title="false"
              aria-label="Home location: Gerlach, Nevada, USA"
              style="list-style: outside none none"
            >
              <svg
                class="inline-block float-left w-4 mt-1 -ml-6 overflow-visible text-center align-text-bottom text-slate-500"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true"
                style="fill: currentcolor; list-style: outside none none"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"
                  class=""
                  style="list-style: outside none none"
                ></path>
              </svg>
              <span class="text-slate-400" style="list-style: outside none none">{{
                githubState.getAccount?.email
              }}</span>
            </li>

            <li
              itemprop="email"
              :aria-label="`Email: ${githubState.getAccount?.email}`"
              class="pt-1 pl-6 text-sm text-left"
              style="list-style: outside none none"
            >
              <svg
                class="inline-block float-left w-4 mt-1 -ml-6 overflow-visible text-center align-text-bottom text-slate-500"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true"
                style="fill: currentcolor; list-style: outside none none"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"
                  class=""
                  style="list-style: outside none none"
                ></path>
              </svg>
              <a
                class="bg-transparent cursor-pointer"
                :href="`mailto:${githubState.getAccount?.email}`"
                style="text-decoration: none; list-style: outside none none"
                >{{ githubState.getAccount?.email }}</a
              >
            </li>
            <li
              itemprop="url"
              data-test-selector="profile-website-url"
              class="pt-1 pl-6 text-sm text-left"
              style="list-style: outside none none"
            >
              <svg
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                data-view-component="true"
                class="inline-block float-left w-4 mt-1 -ml-6 overflow-visible text-center align-text-bottom text-slate-500"
                style="fill: currentcolor; list-style: outside none none"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                  class=""
                  style="list-style: outside none none"
                ></path>
              </svg>
              <a
                rel="nofollow me"
                class="bg-transparent cursor-pointer"
                :href="githubState.getAccount?.website"
                style="text-decoration: none; list-style: outside none none"
                >{{ githubState.getAccount?.website }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="flex items-start mb-8 overflow-x-scroll scrolling-touch flex-nowrap">
      <pov-vue-card
        v-for="component in props.components"
        :key="`component-${component.name}`"
        class="flex-none w-2/3 mr-8 border rounded-lg md:w-1/3 md:pb-4"
        variant="info"
        :component="component"
        @edit="(i) => emit('edit', i)"
        @logs="(i) => emit('logs', i)"
        @archive="(i) => emit('archive', i)"
        @delete="(i) => emit('delete', i)"
        @view="(i) => emit('view', i)"
      ></pov-vue-card>
    </div>
  </div>
</template>
