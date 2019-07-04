<template>
  <div>
    <div id="interactivearea">
      <h1 class="hide-if-doesnt-fit">ТРЕНАЖЁР</h1>
      <div id="answer">
        <div id="previousanswer"><span></span></div>
        <div id="question"><span></span></div>
        <div class="button" id="button0" @click="check(0)"><span></span></div>
        <div id="or">или</div>
        <div class="button" id="button1" @click="check(1)"><span></span></div>
      </div>
    </div>
    <div id="stats"></div>
  </div>
</template>

<script>
import scripts from '@/js/scripts';

window.addEventListener('load', () => {
  scripts.main();
});

export default {
  name: 'Training',
  methods: {
    check: (buttonNumber) => {
      scripts.check(buttonNumber);
    },
  },
};
</script>
