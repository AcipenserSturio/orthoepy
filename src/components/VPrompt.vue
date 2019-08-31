<template>
  <div>
    <VPromptCheckbox
      :checkboxes="prompt.checkboxes"
      v-if="prompt.type === 'checkbox'"
    />
    <VPromptRadio
      :radios="prompt.radios"
      v-else-if="prompt.type === 'radio'"
    />
    <VPromptText
      :placeholder="prompt.placeholder"
      v-else-if="prompt.type === 'text'"
    />
    <p
      class="is-italic"
      v-else
    >
      Не удалось отобразить поле ввода ответа.
    </p>
  </div>
</template>

<script>
import VPromptCheckbox from '@/components/VPromptCheckbox.vue';
import VPromptRadio from '@/components/VPromptRadio.vue';
import VPromptText from '@/components/VPromptText.vue';
import { Prompt } from '@/models';

export default {
  name: 'VPrompt',
  components: {
    VPromptCheckbox,
    VPromptRadio,
    VPromptText,
  },
  props: {
    prompt: Prompt,
  },
};
</script>

<style scoped>
</style>
