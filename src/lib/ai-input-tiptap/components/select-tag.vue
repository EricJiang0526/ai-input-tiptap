<template>
  <node-view-wrapper
    as="span"
    select-tag
    :class="['select-tag', selected ? 'is-selected' : '', node.textContent ? 'has-content' : '']"
    :style="{ minWidth }"
  >
    <node-view-content as="span" select-tag-text class="select-tag-text"> </node-view-content>
    <div v-if="!node.textContent" contenteditable="false" class="select-tag-placeholder">
      {{ node.attrs.placeholder }}
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { ref, watch, onUnmounted, inject } from 'vue'
import { SelectTheTag } from '../types'

const props = defineProps(nodeViewProps)

const selectTheTag: SelectTheTag = inject('selectTheTag', () => {})

const minWidth = ref('')
const selected = ref(false)

const calcEmptyMinWidth = () => {
  const div = document.createElement('div')
  div.innerText = props.node.attrs.placeholder
  div.style.position = 'absolute'
  div.style.visibility = 'hidden'
  document.body.appendChild(div)
  const mw = `${div.offsetWidth + 12}px`
  document.body.removeChild(div)
  return mw
}

watch(
  () => props.node,
  (node) => {
    if (!node.textContent) {
      minWidth.value = calcEmptyMinWidth()
    } else {
      minWidth.value = 'auto'
    }
  },
  {
    immediate: true,
  },
)

const onSelectionUpdate = () => {
  const { from, to } = props.editor.state.selection
  const pos = props.getPos()

  if (from > pos && to < pos + props.node.nodeSize) {
    if (!selected.value) {
      selected.value = true
      selectTheTag({
        node: props.node,
        isSelected: true,
      })
    }
  } else {
    if (selected.value) {
      selected.value = false
      selectTheTag({
        node: props.node,
        isSelected: false,
      })
    }
  }
}

props.editor.on('selectionUpdate', onSelectionUpdate)

onUnmounted(() => {
  props.editor.off('selectionUpdate', onSelectionUpdate)
})
</script>

<style lang="less" scoped>
.select-tag {
  margin: 0 4px;
  padding: 2px 4px;
  display: inline-block;
  position: relative;
  color: lightgrey;
  background-color: #f5f6f8;
  line-height: 20px;
  border-radius: 4px;
  box-sizing: border-box;
  .select-tag-placeholder {
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translate(0, -50%);
    pointer-events: none;
  }
  .select-tag-text {
    color: rgb(22, 93, 255);
    :deep(p) {
      margin: 0;
    }
  }
  &.is-selected {
    background-color: rgb(232, 243, 255);
    .select-tag-placeholder {
      color: rgba(22, 93, 255, 0.4);
    }
  }
  &.has-content {
    background-color: rgb(232, 243, 255);
  }
}
</style>
