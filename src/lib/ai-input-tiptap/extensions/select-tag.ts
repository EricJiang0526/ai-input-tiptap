import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { AddCommandsReturn } from '../types'

import SelectTagComponent from '../components/select-tag.vue'

const SelectTag = Node.create({
  name: 'selectTag',

  inline: true,

  group: 'inline',

  content: 'block+',

  addCommands() {
    return {
      updateSelectTagByKey:
        (tagKey: string, content: string, notFoundContent?: string) =>
        ({ editor, chain, commands }: AddCommandsReturn) => {
          let found = false
          editor.state.doc.descendants((node, pos) => {
            if (node.type.name === 'selectTag' && node.attrs.tagKey === tagKey) {
              found = true
              chain()
                .insertContentAt({ from: pos, to: pos + node.nodeSize }, content)
                .focus(pos + 2)
                .run()
            }
          })
          if (!found && notFoundContent) {
            chain().focus().insertContent(notFoundContent).run()
          }
        },

      updateSelectTagListByKey:
        (
          tagKey: string,
          content: string,
          checkFound: (node: ProseMirrorNode) => boolean,
          notFoundContent: string,
        ) =>
        ({ editor, chain, commands }: AddCommandsReturn) => {
          const list: Array<{ node: ProseMirrorNode; pos: number }> = []
          editor.state.doc.descendants((node, pos) => {
            if (node.type.name === 'selectTag' && node.attrs.tagKey === tagKey) {
              list.push({ node, pos })
            }
          })

          if (!list.length && notFoundContent) {
            chain().focus().insertContent(notFoundContent).run()
            return
          }

          const foundNode = list.find(({ node }) => checkFound(node))
          if (foundNode) {
            const { node, pos } = foundNode
            commands?.deleteRange({ from: pos, to: pos + node.nodeSize })
          } else {
            const last = list[list.length - 1]
            const newPos = last.pos + last.node.nodeSize
            chain().focus().insertContentAt(newPos, content).run()
          }
        },
    }
  },

  renderHTML({ HTMLAttributes, node }) {
    return ['select-tag', mergeAttributes(HTMLAttributes), 0]
  },

  // 解析 HTML
  parseHTML() {
    return [
      {
        tag: 'select-tag',
      },
    ]
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      placeholder: {
        default: '',
        parseHTML: (element) => element.getAttribute('placeholder'),
      },
      tagKey: {
        default: '',
        parseHTML: (element) => element.getAttribute('tagKey'),
      },
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(SelectTagComponent)
  },
})

export default SelectTag
