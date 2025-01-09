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

  const tagStr = `<select-tag ${optionKeys.map((k) => buildAttr(k)).join(' ')}><p>${content}</p></select-tag>`

  return tagStr
}
