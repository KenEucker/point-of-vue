<script setup lang="ts">
import * as Vue from 'vue'
import { onMounted, ref, toRefs, watch, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import Split from 'split.js'
import { StorageName, useDarkGlobal } from '../../utilities'
import MonacoEditor from './MonacoEditor.vue'
import EditorTabs from './EditorTabs.vue'
import { useMagicKeys } from '@vueuse/core'
import VueComponent from './VueComponent.vue'
import { usePageState, useGithubState } from '../../store/state'
import MultiForm from '../atomic/MultiForm.vue'
import Popper from 'vue3-popper'

// import Sass from 'sass.js/dist/sass.sync.js'

const tabs = {
  vue: 'json',
  query: 'graphql',
  script: 'javascript',
  template: 'html',
  //style: 'css', // Feature blocked - let users take advantage of the already present tailwindcss classes
}

const props = defineProps({
  component: {
    type: Object,
    default: () => ({}),
  },
  id: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['publish', 'save'])

const githubState = useGithubState()
const pageState = usePageState()
/// TODO: clear the storage on log out
const currentTab = useStorage(StorageName.ACTIVE_TAB, 'vue')
const componentRef = ref()
const editorRef = ref()
const showPublish = ref(false)
const refProps: any = toRefs(props)
const component = ref({ ...props.component })

if (component.value.id) {
  githubState.setCodeState({
    id: component.value.id,
    json: component.value.vue,
    html: component.value.template,
    javascript: component.value.script,
    graphql: component.value.query,
  })
}

watch(refProps.component, (c: any) => {
  console.info('view editor component changed', c)
  component.value = c
  // unmount previously mounted component
  componentRef.value.unmountComponentApp(c)

  if (component.value.id) {
    githubState.setCodeState({
      id: component.value.id,
      json: component.value.vue ?? '',
      html: component.value.template ?? '',
      javascript: component.value.script ?? '',
      graphql: component.value.query ?? '',
    })

    console.info('code state set by loaded component', githubState.getCodeState)
    editorRef.value.updateEditorValue(githubState.getCodeState)
  }
})

useMagicKeys({
  passive: false,
  onEventFired(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 's' && e.type === 'keydown') {
      e.preventDefault()
      Vue.nextTick(onSave)
    }
  },
})
const isDark = useDarkGlobal()

const onChange = (payload: any) => {
  // console
}

const onPlay = () => {
  const c = githubState.getComponentFromCodeState
  console.info('onPlay event setting component and calling render', c)
  component.value = c
  componentRef.value.renderComponent(c)
  return c
}

const onSave = async () => {
  const c = onPlay()

  return githubState.saveEditingVueComponent().then((errors: any) => {
    if (errors?.length > 0) {
      const message = 'Error saving Vue'
      console.error(message, errors)
      pageState.setNotification(`${message} - ${errors.join(' - ')}`, { type: 'alert' })
    } else {
      emit('save', c)
    }
  })
}

const onPublish = async () => {
  const c = onPlay()

  return githubState.saveEditingVueComponent().then((errors: any) => {
    if (errors?.length > 0) {
      console.error('errors saving component', errors)
    } else {
      return githubState.publishEditingVueComponent().then((errors: any) => {
        emit('publish', c)
      })
    }
  })
}

onMounted(() => {
  if (pageState.width > 700) {
    Split(['#editor', '#component'])
  }
  /// Don't auto compile
  // onPlay()
})

const code = computed({
  get: () => githubState.getCodeState,
  set: (v) => githubState.setCodeState(v),
})
</script>

<template>
  <div class="flex h-full">
    <popper
      :show="showPublish"
      placement="bottom"
      class="fixed z-50 -translate-x-1/2 -translate-y-1/2 border-slate-900 top-1/2 left-1/2 w-96"
    >
      <template #default></template>
      <template #content>
        <multi-form
          class="max-w-md m-auto w-96"
          title="Submit Vue For Publishing"
          :fields="[
            [
              {
                name: 'title',
                label: 'Vue Title',
                type: 'text',
                value: component.title,
              },
              {
                name: 'description',
                label: 'Description',
                type: 'text',
                value: component.description,
              },
              {
                name: 'tags',
                label: 'Tags',
                type: 'list',
                value: component.tags,
              },
            ],
            [
              {
                name: 'description',
                label: 'Description',
                type: 'text',
                value: component.description,
              },
              {
                name: 'tags',
                label: 'Tags',
                type: 'list',
                value: component.tags,
              },
            ],
          ]"
          @submit="onPublish"
        />
      </template>
    </popper>
    <div id="editor" class="w-full">
      <editor-tabs
        v-model="currentTab"
        :tabs="tabs"
        @play="onPlay"
        @save="onSave"
        @publish="showPublish = true"
      />
      <monaco-editor ref="editorRef" v-model="code" :active-tab="currentTab" class="h-full" />
    </div>
    <div id="component" class="w-full h-full">
      <vue-component ref="componentRef" :component="component" :skip-first-render="true" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gutter {
  @apply dark:bg-gray-900 bg-no-repeat;

  background-position: 50%;
}

.gutter.gutter-horizontal {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
  cursor: col-resize;
}
</style>
