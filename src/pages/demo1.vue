<template>
  <div>
    <button @click="addParagraph">新增一段话</button>
    <button @click="getText">获取纯文本</button>
    <button @click="demoChangeName('张三')">名字变成张三</button>
    <button @click="demoChangeName('')">名字自定义</button>
  </div>
  <div>
    <button @click="demoAddSymtom('头疼')">头疼</button>
    <button @click="demoAddSymtom('眼花')">眼花</button>
    <button @click="demoAddSymtom('心脏病')">心脏病</button>
    <button @click="demoAddSymtom('nc')">nc</button>
  </div>
  <div style="width: 300px; height: 200px; margin: 40px">
    <AiInputEditor ref="editorRef" @select-tag="onSelectTag" @edit-tag="onEditTag"></AiInputEditor>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AiInputEditor, { createSelectTag } from '../lib/ai-input-tiptap'

const editorRef = ref<InstanceType<typeof AiInputEditor> | null>(null)

const addParagraph = () => {
  const nameTag = createSelectTag({ tagKey: 'name', placeholder: '[患者姓名]', content: '王六' })
  const symptomTag = createSelectTag({
    tagKey: 'symptom',
    placeholder: '[症状]',
    content: '头疼',
  })
  const content = `帮我为${nameTag}这位患者生成一份健康报告，患者的标签特征有${symptomTag}，报告内容包括基本信息、健康史、健康状况评估、健康建议、注意事项等。`
  editorRef.value?.addParagraph(content)
}

const getText = () => {
  const text = editorRef.value?.getText()
  console.log(text)
}

const demoChangeName = (content: string) => {
  const nameTag = createSelectTag({ tagKey: 'name', placeholder: '[患者姓名]', content })
  const nameTagNotFound = `，患者的标签特征有${nameTag}`
  editorRef.value?.editor?.commands.updateSelectTagByKey('name', nameTag, nameTagNotFound)
}

const demoAddSymtom = (content: string) => {
  const symptomTag = createSelectTag({ tagKey: 'symptom', placeholder: '[症状]', content })
  const symptomTagNotFound = `患者的标签特征有${symptomTag}`
  const checkFound = (node) => node.textContent === content
  editorRef.value?.editor?.commands.updateSelectTagListByKey(
    'symptom',
    `、${symptomTag}`,
    checkFound,
    symptomTagNotFound,
  )
}

const onSelectTag = (...args: any) => {
  console.log(...args)
}

const onEditTag = (...args: any) => {
  console.log(...args)
}
</script>
