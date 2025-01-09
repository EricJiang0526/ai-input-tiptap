import { Node as ProseMirrorNode } from '@tiptap/pm/model'

export interface SelectTheTagParams {
  node: ProseMirrorNode
  isSelected: boolean
}

export interface SelectTheTag {
  (params: SelectTheTagParams): void
}
