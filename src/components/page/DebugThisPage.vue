<script setup lang="ts">
import { usePageState, useCreatorState, usePovState } from '../../store/state'
const about: any = {
  title: 'Debug This Page',
}
const pageState = usePageState()
const povState = usePovState()
const creatorState = useCreatorState()
</script>
<template>
  <ul class="w-full bg-ll-neutral dark:bg-ld-neutral p-5 rounded-md mb-5">
    <li
      class="dark:text-gray-200 text-gray-700 text-lg border-b pb-3 border-ll-border dark:border-ld-border"
    >
      <p>{{ about?.title }}</p>
    </li>
    <li class="">
      <strong>Page</strong>
      <span v-if="pageState.isFramed">*({{ pageState.getPageFrameUrlShortened }})</span>
      <pre>
name: {{ pageState.pageName }}
meta: {{ pageState.metaData }}
width: {{ pageState.width }}
height: {{ pageState.height }}
leftMenuOpen: {{ pageState.isLeftMenuOpen }}
rightMenuOpen: {{ pageState.isRightMenuOpen }}
bottomMenuOpen: {{ pageState.isBottomMenuOpen }}
      </pre>
    </li>
    <li class="">
      <strong
        >Creator{{
          !creatorState.isCreatorSignedUp ? '?' : creatorState.isLoggedIn ? '!' : ''
        }}</strong
      >
      <pre>
loggedIn: {{ creatorState.isLoggedIn }}
SignedUp: {{ creatorState.isCreatorSignedUp }}
creator: {{
          `${creatorState.getCreator.handle ? '@' : ''}${
            creatorState.getCreator.handle ?? creatorState.getCreator.name
          }`
        }}
connections: {{
          Object.keys(creatorState.getCreatorCredentials).filter(
            (s) => s !== 'creatorToken' && (creatorState.getCreatorCredentials as any)[s]?.length
          )
        }}
      </pre>
    </li>
    <li class="">
      <strong>Globe</strong>
      <pre>
isReady: {{ povState.isReady }}
isHealthy: {{ povState.isHealthy }}
isProduction: {{ povState.isProduction }}
      </pre>
    </li>
    <li class="">
      <strong>Console</strong>
      <pre class="p-0 -mt-5">
        <span v-for="(log, i) in pageState.getLogsHistory" :key="`log-${i}`" class="flex">
<span v-if="log.type ==='error'" class="inline-flex">{{i}}: {{ log.log }}</span>
<span v-if="log.type ==='info'" class="inline-flex">{{i}}: {{ log.log }}</span>
        </span>
      </pre>
    </li>
  </ul>
</template>
