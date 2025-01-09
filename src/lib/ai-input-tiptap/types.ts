import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { Editor, ChainedCommands, SingleCommands } from '@tiptap/vue-3'

export interface SelectTheTagParams {
  node: ProseMirrorNode
  isSelected: boolean
}

export interface SelectTheTag {
  (params: SelectTheTagParams): void
}

export interface AddCommandsReturn {
  editor: Editor
  chain: () => ChainedCommands
  commands?: SingleCommands
}
