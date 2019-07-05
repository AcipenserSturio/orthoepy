<template>
  <div align="center">
    <h1>ОРФОЭПИЯ</h1>
    <div class="text">
      <p>Добро пожаловать в тренажёр для закрепления орфоэпических норм.</p>
      <p>Данный тренажёр предлагает в случайном порядке проблемные слова из одного из нижеприведённых списков, ваша цель - правильно назвать у слов ударение.</p>
      <p>После того, как вы один раз ответили на каждое слово в списке, тренажёр будет предлагать слова вновь, в этот раз приоритизируя те, в которых у вас были ошибки.</p>
      <p>Если вы хотите проверить произношение некоторого слова, не дожидаясь вопроса, вы можете навести курсор на это слово в столбце слева, и правильное произношение будет вам показано.</p>
      <p>Тренажёр заканчивает предлагать вопросы, если последний ваш ответ на каждое слово был правильным.</p>
      <p>Выберите список слов, которые вы будете закреплять:</p>
    </div>
    <div class="button"><router-link to="/training?q=0">Версия-прототип: всего 4 слова</router-link></div>
    <div class="button"><router-link to="/training?q=1">Имена существительные</router-link></div>
    <div class="button"><router-link to="/training?q=2">Имена прилагательные</router-link></div>
    <div class="button"><router-link to="/training?q=3">Глаголы</router-link></div>
    <div class="button"><router-link to="/training?q=4">Причастия</router-link></div>
    <div class="button"><router-link to="/training?q=5">Деепричастия</router-link></div>
    <div class="button"><router-link to="/training?q=6">Наречия</router-link></div>
    <div class="button"><router-link to="/training?q=7">Все части речи</router-link></div>
    <div class="text">
      <p>Если вы не уверены в своих знаниях, вы можете почитать теоретическую часть:</p>
    </div>
    <div class="button"><router-link to="/orthoepy/article">Статья по орфоэпии</router-link></div>
    <div class="text">
      <p>Вернуться к темам:</p>
    </div>
    <div class="button"><a @click="$router.go(-1)">Обратно</a></div>
  </div>
</template>

<script>
export default {
  name: 'Orthoepy',
};
</script>
