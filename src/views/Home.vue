<template>
  <div align="center">
    <h1>ТРЕНАЖЁР ПРАВИЛ РУССКОГО ЯЗЫКА</h1>
    <div class="text">
      <p>Добро пожаловать в тренажёр для закрепления правил русского языка.</p>
      <p>Выберите тему, которую вы будете закреплять:</p>
    </div>
    <div class="button"><router-link to="/orthoepy">Орфоэпия</router-link></div>
    <div class="button"><router-link to="/nn">Н/НН</router-link></div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
};
</script>
