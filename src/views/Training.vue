<template>
  <div>
    <div id="interactivearea">
      <h1 class="hide-if-doesnt-fit">ТРЕНАЖЁР</h1>
      <div id="answer">
        <div id="previousanswer"><span></span></div>
        <div id="question"><span></span></div>
        <div class="button" id="button0" onclick="check(0)"><span></span></div>
        <div id="or">или</div>
        <div class="button" id="button1" onclick="check(1)"><span></span></div>
      </div>
    </div>
    <div id="stats"></div>
  </div>
</template>

<script>
export default {
  name: 'Training',
};
</script>
