import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { Editor, ChainedCommands, SingleCommands } from '@tiptap/vue-3'

export interface OnSelectTagParams {
  node: ProseMirrorNode
  isSelected: boolean
}

export interface OnSelectTag {
  (params: OnSelectTagParams): void
}

export interface OnEditTagParams {
  node: ProseMirrorNode
}

export interface OnEditTag {
  (params: OnEditTagParams): void
}

export interface AddCommandsReturn {
  editor: Editor
  chain: () => ChainedCommands
  commands?: SingleCommands
}
