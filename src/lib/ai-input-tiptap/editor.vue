<template>
  <div class="editor-container">
    <EditorContent :editor="editor"></EditorContent>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import TextStyle from '@tiptap/extension-text-style'
import History from '@tiptap/extension-history'
import SelectTag from './extensions/select-tag'
import { OnSelectTag, OnSelectTagParams, OnEditTagParams } from './types'

const emits = defineEmits<{
  selectTag: [OnSelectTagParams]
  editTag: [OnEditTagParams]
}>()

const editor = useEditor({
  content: '',
  extensions: [Document, Paragraph, Text, TextStyle, History, SelectTag],
})

const addParagraph = (content: string): void => {
  editor.value?.chain().insertContent(content).focus().run()
}

const getText = () => editor.value?.state.doc.textContent

const onSelectTag: OnSelectTag = (params) => {
  emits('selectTag', params)
}
const onEditTag = (params: OnEditTagParams) => {
  emits('editTag', params)
}

provide('onSelectTag', onSelectTag)
provide('onEditTag', onEditTag)

defineExpose({ addParagraph, getText, editor })
</script>

<style lang="less" scoped>
.editor-container {
  padding: 0 16px;
  border: 1px solid black;
  border-radius: 8px;
  :deep(.tiptap) {
    outline: none;
    line-height: 24px;
  }
}
</style>
