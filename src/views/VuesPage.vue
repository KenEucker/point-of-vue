<script setup lang="ts">
import VueEditor from '../components/vues/VueEditor.vue'
import VuesProfileCard from '../components/vues/VuesProfileCard.vue'
import { useCreatorState, useVuesState } from '../store/state'
const creatorState = useCreatorState()
const vuesState = useVuesState()

vuesState.fetchVues()

const components = [
  {
    name: 'Import From Facebook',
    category: 'Import',
    vues: 3087682,
    status: 'good',
    icon: 'pull',
    background: 'white',
    publishedAt: new Date('10/22/2022'),
    description: 'Imports all of your facebook data into the POV globe',
  },
  {
    name: 'World News',
    category: 'News',
    vues: 3,
    status: 'good',
    icon: 'planet',
    publishedAt: new Date('10/23/2022'),
    description: 'Displays the mornings meetings for Workplace Zero employees',
  },
]
//   {
//     name: 'Sportsball Feed',
//     category: 'Sports',
//     vues: 634398,
//     status: 'archived',
//     icon: 'baseball',
//     archivedAt: new Date('10/24/2022'),
//     description: 'Displays the mornings meetings for Workplace Zero employees',
//   },
//   {
//     name: 'Agile Mornings',
//     category: 'Workplace',
//     vues: 7,
//     status: 'error',
//     icon: 'hammer',
//     erroredAt: new Date('11/12/2022'),
//     description: 'Displays the mornings meetings for Workplace Zero employees',
//   },
//   {
//     name: 'Shopping List',
//     category: 'Shopping',
//     vues: 360,
//     status: 'good',
//     icon: 'basket',
//     publishedAt: new Date('1/12/2023'),
//     description: 'Displays the mornings meetings for Workplace Zero employees',
//   },
//   {
//     name: 'Visitors This Week',
//     category: 'Stats',
//     vues: 2413,
//     status: 'good',
//     icon: 'analytics',
//     publishedAt: new Date('1/16/2023'),
//     description: 'Displays the mornings meetings for Workplace Zero employees',
//   },
// ]
</script>

<template>
  <main class="border-t border-gray-200 dark:border-gray-700">
    <vues-profile-card
      :creator="creatorState.getCreator"
      :components="[...vuesState.vueComponents, ...components]"
    />
    <vue-editor class="h-1/2" />
  </main>
</template>
