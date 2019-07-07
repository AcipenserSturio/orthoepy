<template>
  <div>
    <span class="task-number">{{ number }}.</span>
    <div class="is-inline-flex">
      <b-field :label="`${text}`">
        <div class="block">
          <b-radio
            v-for="option in options"
            :key="option"
            v-model="input_answer"
            :native-value="option"
            @input="onAnswerChanged">
            {{ option }}
          </b-radio>
        </div>
      </b-field>
    </div>
  </div>
</template>

<script>
import BRadio from 'buefy/src/components/radio/Radio.vue';
import BField from 'buefy/src/components/field/Field.vue';

export default {
  name: 'TestTrainingTask',
  components: { BField, BRadio },
  props: {
    number: Number,
    id: String,
    text: String,
    options: Array,
    answer: String,
  },
  data() {
    return {
      input_answer: null,
    };
  },
  methods: {
    onAnswerChanged() {
      this.$emit('newAnswer', this.id, this.input_answer);
    },
  },
};
</script>

<style lang="scss" scoped>
.task-number {
  margin-right: 15px;
  font-weight: bold;
}
</style>
