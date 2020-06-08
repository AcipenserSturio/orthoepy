<template>
  <div>
    <div id="interactivearea">
      <div id="answer">
        <div id="previousanswer" class="has-text-centered">
          <span></span>
        </div>

        <hr>

        <div id="question" class="has-text-centered">
          <span></span>
        </div>

        <br>

        <div class="columns has-text-centered">
          <div class="column">
            <b-button id="button0" class="is-large is-fullwidth" @click="check(0)">
              <span></span>
            </b-button>
          </div>

          <div class="column is-narrow">
            <p>или</p>
          </div>

          <div class="column">
            <b-button id="button1" class="is-large is-fullwidth" @click="check(1)">
              <span></span>
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <div id="stats" class="has-text-centered"></div>
  </div>
</template>

<script>
import BButton from 'buefy/src/components/button/Button.vue';
import scripts from '@/js/scripts';

export default {
  name: 'LegacyTrainingView',
  components: { BButton },
  methods: {
    check: (buttonNumber) => {
      scripts.check(buttonNumber);
    },
  },
  mounted() {
    scripts.main();
  },
};
</script>

<style>
#interactivearea, #stats, #question, #answer {
  font-family: Verdana, "Lucida Sans Unicode", sans-serif;
  font-size: 3vw;
  line-height: 4.5vw;
  margin: 0;
}
#interactivearea {
  position: fixed;
  width: 55vw;
  margin-left: 42vw;
  height: calc(65vh + 15vw);
  padding-top: calc(35vh - 15vw);
  border-left: thin solid black;
}
#stats {
  width: 40vw;
  float: left;
  padding-left: 1vw;
}
#question {
  font-weight: bold;
}
#answer {
  margin-left: 2vw;
}

.choicename {
  overflow: hidden;
  white-space: nowrap;
  background-color: #aaaaaa;
}
.choicename:hover {
  background-color: #cccccc;
}
.choiceright {
  overflow: hidden;
  white-space: nowrap;
  background-color: #00ff00;
  float: right;
}
.choicewrong {
  overflow: hidden;
  white-space: nowrap;
  background-color: #ff0000;
  float: left;
}
.choicestats {
  height: 9vw;
  width: 40vw;
  margin: 1vw auto;
}
</style>
