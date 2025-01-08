export interface SelectTagOptions {
  placeholder?: string
  tagKey?: string
  content?: string
  [propName: string]: any
}

export const createSelectTag = (options: SelectTagOptions) => {
  const { content } = options

  const optionKeys = Object.keys(options)

  const buildAttr = (attr: string): string => (options[attr] ? `${attr}=${options[attr]}` : '')

  let tagStr = ''
  if (content) {
    tagStr = `<select-tag ${optionKeys.map((k) => buildAttr(k)).join(' ')}>${content}</select-tag>`
  } else {
    tagStr = `<select-tag ${optionKeys.map((k) => buildAttr(k)).join(' ')}><p></p></select-tag>`
  }

  return tagStr
}
