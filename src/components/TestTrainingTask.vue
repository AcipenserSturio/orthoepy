<template>
  <div class="task-container">
    <span class="task-number is-inline-flex">{{ number }}.</span>
    <div class="is-inline-flex">
      <b-field :label="`${text}`">
        <div class="block">
          <b-radio
            v-for="option in options"
            :key="option"
            :type="radioType(option)"
            :disabled="checking"
            v-model="selectedValue"
            :native-value="option">
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
    text: String,
    input: Object,
    answer: String,
    checking: Boolean,
    selected: String,
  },
  data() {
    return {};
  },
  methods: {
    radioType(option) {
      if (this.checking && option === this.answer) return 'is-success';
      if (this.checking && option !== this.answer) return 'is-danger';
      return '';
    },
  },
  computed: {
    selectedValue: {
      get() {
        return this.selected;
      },
      set(value) {
        this.$emit('update:selected', value);
      },
    },
    options() {
      return this.input.elements;
    },
  },
};
</script>

<style lang="scss" scoped>
.task-number {
  margin-right: 15px;
  font-weight: bold;
}

.task-container {
  white-space: nowrap;
}
</style>
