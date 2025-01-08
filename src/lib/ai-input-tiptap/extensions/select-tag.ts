import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import SelectTagComponent from '../components/select-tag.vue'

const SelectTag = Node.create({
  name: 'selectTag',

  inline: true,

  group: 'inline',

  content: 'block+',

  addCommands() {
    return {
      updateSelectTagByKey:
        (tagKey: string, content: string) =>
        ({ editor, chain, commands }) => {
          editor.state.doc.descendants((node, pos) => {
            if (node.type.name === 'selectTag' && node.attrs.tagKey === tagKey) {
              chain()
                .insertContentAt({ from: pos, to: pos + node.nodeSize }, content)
                .focus(pos + 2)
                .run()
            }
          })
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
