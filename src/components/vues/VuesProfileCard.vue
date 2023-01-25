<script setup lang="ts">
import PovCreator from '../creator/PovCreator.vue'
import { PovComponent } from '../../utilities'
import PovVueCard from './PovVueCard.vue'
import { usePageState } from '../../store/state'

const pageState = usePageState()

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
          <pov-creator
            :creator="creator"
            :size="props.size"
            :image-only="true"
            class="order-1"
            :class="pageState.width < 600 ? 'flex-row' : 'flex-infinite'"
          />
        </div>

        <div class="py-4 break-words" data-original-top="0px" style="position: sticky">
          <h1 class="m-0 text-3xl font-semibold leading-none">
            <span class="block overflow-hidden text-2xl leading-tight" itemprop="name">
              Ken Eucker
            </span>
            <span
              class="block text-xl not-italic font-light leading-6 text-slate-500"
              itemprop="additionalName"
            >
              KenEucker
            </span>
          </h1>
        </div>
        <div class="flex flex-col leading-5 break-words md:block text-slate-400">
          <div
            class="mb-4 overflow-hidden text-sm leading-6 md:text-base"
            data-bio-text="Full Stack Engineer with a decade+ of experience in NodeJs, collaborating on multiple open-source projects. Author/Maintainer of imgur and biketag-api on npm."
          >
            <div class="text-base text-slate-400">
              Full Stack Engineer with a decade+ of experience in NodeJs, collaborating on multiple
              open-source projects. Author/Maintainer of imgur and biketag-api on npm.
            </div>
          </div>

          <div class="order-1 mt-0 break-words md:mt-0">
            <div class="mb-4 text-slate-400">
              <a
                class="bg-transparent cursor-pointer whitespace-nowrap text-slate-500"
                href="https://github.com/KenEucker?tab=followers"
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
                <span class="text-bold color-fg-default">52</span>
                followers
              </a>
              ·
              <a
                class="bg-transparent cursor-pointer whitespace-nowrap text-slate-500"
                href="https://github.com/KenEucker?tab=following"
                style="text-decoration: none"
              >
                <span class="text-bold color-fg-default">131</span>
                following
              </a>
            </div>
            <div
              class="table clear-both pt-4 mt-4 leading-5 break-words border-t border-solid border-zinc-700 text-slate-400 sm:hidden"
              style="content: ''"
            >
              <h2
                class="flex items-start mt-0 mb-2 text-base font-semibold leading-6 text-slate-400"
              >
                Sponsors
              </h2>

              <div class="flex flex-wrap break-words">
                <div class="flex mb-1 mr-1 text-slate-400">
                  <a
                    class="inline-block text-blue-400 bg-transparent cursor-pointer"
                    data-hovercard-type="user"
                    data-hovercard-url="/users/brainkim/hovercard"
                    data-octo-click="hovercard-link-click"
                    data-octo-dimensions="link_type:self"
                    href="/brainkim"
                    style="text-decoration: none"
                    ><img
                      class="inline-block overflow-hidden flex-shrink-0 leading-none align-middle bg-gray-50 border-none bg-opacity-[0.1]"
                      src="https://avatars.githubusercontent.com/u/2996754?s=70&amp;v=4"
                      width="35"
                      height="35"
                      alt="@brainkim"
                      style="border-radius: 50%; box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
                  /></a>
                </div>
              </div>
            </div>
            <div
              class="table clear-both pt-4 mt-4 leading-5 break-words border-t border-solid border-zinc-700 text-slate-400 sm:hidden"
              style="content: ''"
            >
              <div class="flex items-center justify-between break-words">
                <h2 class="flex items-start mt-0 mb-2 text-base font-semibold leading-6">
                  Sponsoring
                </h2>
              </div>

              <div class="flex flex-wrap break-words">
                <div class="flex mb-1 mr-1 text-slate-400">
                  <a
                    class="inline-block text-blue-400 bg-transparent cursor-pointer"
                    data-hovercard-type="organization"
                    data-hovercard-url="/orgs/directus/hovercard"
                    data-octo-click="hovercard-link-click"
                    data-octo-dimensions="link_type:self"
                    href="/directus"
                    style="text-decoration: none"
                    ><img
                      class="inline-block overflow-hidden flex-shrink-0 leading-none align-middle bg-gray-50 rounded-md border-none bg-opacity-[0.1]"
                      src="https://avatars.githubusercontent.com/u/15967950?s=70&amp;v=4"
                      width="35"
                      height="35"
                      alt="@directus"
                      style="box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
                  /></a>
                </div>

                <div class="flex mb-1 mr-1 text-slate-400">
                  <a
                    class="inline-block text-blue-400 bg-transparent cursor-pointer"
                    data-hovercard-type="user"
                    data-hovercard-url="/users/johnsoncodehk/hovercard"
                    data-octo-click="hovercard-link-click"
                    data-octo-dimensions="link_type:self"
                    href="/johnsoncodehk"
                    style="text-decoration: none"
                    ><img
                      class="inline-block overflow-hidden flex-shrink-0 leading-none align-middle bg-gray-50 border-none bg-opacity-[0.1]"
                      src="https://avatars.githubusercontent.com/u/16279759?s=70&amp;v=4"
                      width="35"
                      height="35"
                      alt="@johnsoncodehk"
                      style="border-radius: 50%; box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
                  /></a>
                </div>
              </div>
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
              <span class="text-slate-400" style="list-style: outside none none"
                >Gerlach, Nevada, USA</span
              >
            </li>

            <li
              itemprop="email"
              aria-label="Email: keneucker@gmail.com"
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
                href="mailto:keneucker@gmail.com"
                style="text-decoration: none; list-style: outside none none"
                >keneucker@gmail.com</a
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
                href="https://www.keneucker.com"
                style="text-decoration: none; list-style: outside none none"
                >https://www.keneucker.com</a
              >
            </li>
          </ul>
        </div>
        <div
          class="hidden pt-4 mt-4 leading-5 break-words border-t border-solid md:block border-zinc-700 text-slate-400"
        >
          <h2 class="mt-0 mb-2 text-base font-semibold leading-6 text-slate-400">
            <a
              href="/KenEucker?tab=achievements"
              class="mb-2 break-words bg-transparent cursor-pointer"
              style="text-decoration: none"
              >Achievements</a
            >
          </h2>
          <div class="flex flex-wrap break-words">
            <a
              href="/KenEucker?achievement=yolo&amp;tab=achievements"
              class="relative text-blue-400 bg-transparent cursor-pointer"
              style="text-decoration: none"
              ><img
                src="https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png"
                data-hovercard-type="achievement"
                data-hovercard-url="/users/KenEucker/achievements/yolo/detail?hovercard=1"
                width="64"
                alt="Achievement: YOLO"
                data-view-component="true"
                class="border-none"
                style="filter: drop-shadow(rgb(28, 33, 40) 0px 8px 24px)" /></a
            ><a
              href="/KenEucker?achievement=quickdraw&amp;tab=achievements"
              class="relative text-blue-400 bg-transparent cursor-pointer"
              style="text-decoration: none"
              ><img
                src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png"
                data-hovercard-type="achievement"
                data-hovercard-url="/users/KenEucker/achievements/quickdraw/detail?hovercard=1"
                width="64"
                alt="Achievement: Quickdraw"
                data-view-component="true"
                class="border-none"
                style="filter: drop-shadow(rgb(28, 33, 40) 0px 8px 24px)" /></a
            ><a
              href="/KenEucker?achievement=public-sponsor&amp;tab=achievements"
              class="relative text-blue-400 bg-transparent cursor-pointer"
              style="text-decoration: none"
              ><img
                src="https://github.githubassets.com/images/modules/profile/achievements/public-sponsor-default.png"
                data-hovercard-type="achievement"
                data-hovercard-url="/users/KenEucker/achievements/public-sponsor/detail?hovercard=1"
                width="64"
                alt="Achievement: Public Sponsor"
                data-view-component="true"
                class="border-none"
                style="filter: drop-shadow(rgb(28, 33, 40) 0px 8px 24px)" /></a
            ><a
              href="/KenEucker?achievement=pull-shark&amp;tab=achievements"
              class="relative text-blue-400 bg-transparent cursor-pointer"
              style="text-decoration: none"
              ><img
                src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png"
                data-hovercard-type="achievement"
                data-hovercard-url="/users/KenEucker/achievements/pull-shark/detail?hovercard=1"
                width="64"
                alt="Achievement: Pull Shark"
                data-view-component="true"
                class="border-none"
                style="filter: drop-shadow(rgb(28, 33, 40) 0px 8px 24px)"
              /><span
                data-view-component="true"
                class="absolute bottom-0 right-0 inline-block px-2 py-0 mb-1 text-xs font-semibold leading-4 border border-solid whitespace-nowrap border-zinc-200 bg-zinc-200 text-zinc-800"
                style="box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px; border-radius: 32px"
                >x3</span
              ></a
            ><a
              href="/KenEucker?achievement=starstruck&amp;tab=achievements"
              class="relative text-blue-400 bg-transparent cursor-pointer"
              style="text-decoration: none"
              ><img
                src="https://github.githubassets.com/images/modules/profile/achievements/starstruck-default.png"
                data-hovercard-type="achievement"
                data-hovercard-url="/users/KenEucker/achievements/starstruck/detail?hovercard=1"
                width="64"
                alt="Achievement: Starstruck"
                data-view-component="true"
                class="border-none"
                style="filter: drop-shadow(rgb(28, 33, 40) 0px 8px 24px)" /></a
            ><a
              href="/KenEucker?achievement=arctic-code-vault-contributor&amp;tab=achievements"
              class="relative text-blue-400 bg-transparent cursor-pointer"
              style="text-decoration: none"
              ><img
                src="https://github.githubassets.com/images/modules/profile/achievements/arctic-code-vault-contributor-default.png"
                data-hovercard-type="achievement"
                data-hovercard-url="/users/KenEucker/achievements/arctic-code-vault-contributor/detail?hovercard=1"
                width="64"
                alt="Achievement: Arctic Code Vault Contributor"
                data-view-component="true"
                class="border-none"
                style="filter: drop-shadow(rgb(28, 33, 40) 0px 8px 24px)"
            /></a>
          </div>
        </div>
        <div
          class="hidden pt-4 mt-4 leading-5 break-words border-t border-solid md:block border-zinc-700 text-slate-400"
        >
          <h2 class="mt-0 mb-2 text-base font-semibold leading-6 text-slate-400">Highlights</h2>
          <ul class="pl-0 my-0 break-words" style="list-style: none">
            <li class="mt-2 text-left" style="list-style: outside none none">
              <svg
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                data-view-component="true"
                class="inline-block overflow-visible align-text-bottom text-slate-500"
                style="fill: currentcolor; list-style: outside none none"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                  class=""
                  style="list-style: outside none none"
                ></path>
              </svg>
              <span
                title="Label: Pro"
                data-view-component="true"
                class="inline-block px-2 py-0 text-xs font-medium leading-4 uppercase border border-solid text-violet-500 whitespace-nowrap border-violet-500"
                style="border-radius: 32px; list-style: outside none none"
              >
                Pro
              </span>
            </li>
          </ul>
        </div>
        <div
          class="table clear-both pt-4 mt-4 leading-5 break-words border-t border-solid border-zinc-700 text-slate-400 sm:hidden"
          style="content: ''"
        >
          <h2 class="mt-0 mb-2 text-base font-semibold leading-6 text-slate-400">Organizations</h2>

          <a
            aria-label="unhosted"
            itemprop="follows"
            class="inline-block mb-1 text-blue-400 bg-transparent cursor-pointer"
            data-hovercard-type="organization"
            data-hovercard-url="/orgs/unhosted/hovercard"
            data-octo-click="hovercard-link-click"
            data-octo-dimensions="link_type:self"
            data-hydro-click='{"event_type":"user_profile.click","payload":{"profile_user_id":1720267,"target":"MEMBER_ORGANIZATION_AVATAR","user_id":1720267,"originating_url":"https://github.com/KenEucker"}}'
            data-hydro-click-hmac="e32644915a02099b2a63691ce97104e9e8cd208dfdf98f1cefc270c3e534b7b7"
            href="/unhosted"
            style="text-decoration: none"
          >
            <img
              src="https://avatars.githubusercontent.com/u/472210?s=64&amp;v=4"
              alt="@unhosted"
              size="32"
              height="32"
              width="32"
              data-view-component="true"
              class="inline-block overflow-hidden flex-shrink-0 leading-none align-middle bg-gray-50 rounded-md border-none bg-opacity-[0.1]"
              style="box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
            />
          </a>
          <a
            aria-label="remotestorage"
            itemprop="follows"
            class="inline-block mb-1 text-blue-400 bg-transparent cursor-pointer"
            data-hovercard-type="organization"
            data-hovercard-url="/orgs/remotestorage/hovercard"
            data-octo-click="hovercard-link-click"
            data-octo-dimensions="link_type:self"
            data-hydro-click='{"event_type":"user_profile.click","payload":{"profile_user_id":1720267,"target":"MEMBER_ORGANIZATION_AVATAR","user_id":1720267,"originating_url":"https://github.com/KenEucker"}}'
            data-hydro-click-hmac="e32644915a02099b2a63691ce97104e9e8cd208dfdf98f1cefc270c3e534b7b7"
            href="/remotestorage"
            style="text-decoration: none"
          >
            <img
              src="https://avatars.githubusercontent.com/u/2323242?s=64&amp;v=4"
              alt="@remotestorage"
              size="32"
              height="32"
              width="32"
              data-view-component="true"
              class="inline-block overflow-hidden flex-shrink-0 leading-none align-middle bg-gray-50 rounded-md border-none bg-opacity-[0.1]"
              style="box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
            />
          </a>
          <a
            aria-label="ey-ctp"
            itemprop="follows"
            class="inline-block mb-1 text-blue-400 bg-transparent cursor-pointer"
            data-hovercard-type="organization"
            data-hovercard-url="/orgs/ey-ctp/hovercard"
            data-octo-click="hovercard-link-click"
            data-octo-dimensions="link_type:self"
            data-hydro-click='{"event_type":"user_profile.click","payload":{"profile_user_id":1720267,"target":"MEMBER_ORGANIZATION_AVATAR","user_id":1720267,"originating_url":"https://github.com/KenEucker"}}'
            data-hydro-click-hmac="e32644915a02099b2a63691ce97104e9e8cd208dfdf98f1cefc270c3e534b7b7"
            href="/ey-ctp"
            style="text-decoration: none"
          >
            <img
              src="https://avatars.githubusercontent.com/u/61974647?s=64&amp;v=4"
              alt="@ey-ctp"
              size="32"
              height="32"
              width="32"
              data-view-component="true"
              class="inline-block overflow-hidden flex-shrink-0 leading-none align-middle bg-gray-50 rounded-md border-none bg-opacity-[0.1]"
              style="box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
            />
          </a>
          <a
            aria-label="biketagorg"
            itemprop="follows"
            class="inline-block mb-1 text-blue-400 bg-transparent cursor-pointer"
            data-hovercard-type="organization"
            data-hovercard-url="/orgs/biketagorg/hovercard"
            data-octo-click="hovercard-link-click"
            data-octo-dimensions="link_type:self"
            data-hydro-click='{"event_type":"user_profile.click","payload":{"profile_user_id":1720267,"target":"MEMBER_ORGANIZATION_AVATAR","user_id":1720267,"originating_url":"https://github.com/KenEucker"}}'
            data-hydro-click-hmac="e32644915a02099b2a63691ce97104e9e8cd208dfdf98f1cefc270c3e534b7b7"
            href="/biketagorg"
            style="text-decoration: none"
          >
            <img
              src="https://avatars.githubusercontent.com/u/75806140?s=64&amp;v=4"
              alt="@biketagorg"
              size="32"
              height="32"
              width="32"
              data-view-component="true"
              class="inline-block overflow-hidden flex-shrink-0 leading-none align-middle bg-gray-50 rounded-md border-none bg-opacity-[0.1]"
              style="box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
            />
          </a>
        </div>
      </div>

      <!-- <div class="flex flex-col items-end justify-start flex-grow md:w-100">
        <div class="flex flex-row space-x-3">
          <button
            class="flex px-1 py-2 text-white transition-all duration-150 ease-in-out bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <more-icon w="24" h="24" class="text-gray-500" />
          </button>
        </div>
      </div> -->
    </div>
    <div class="flex items-start mb-8 overflow-x-scroll scrolling-touch flex-nowrap">
      <pov-vue-card
        v-for="component in props.components"
        :key="`component-${component.name}`"
        class="flex-none w-2/3 mr-8 border rounded-lg md:w-1/3 md:pb-4"
        variant="info"
        :component="component"
      ></pov-vue-card>
    </div>
  </div>
</template>
