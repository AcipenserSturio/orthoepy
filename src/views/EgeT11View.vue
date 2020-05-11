<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Задание 11 (ЕГЭ)
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="title is-5">
          Списки слов для закрепления
        </p>
        <div class="list is-hoverable">
          <router-link :to="{ name: 'training-card', params: { 'topic': 'ege-t11-suffices-ik-ek' } }" class="list-item">
            Существительные. Суффиксы ИК/ЕК
          </router-link>
        </div>
      </div>
    </section>
</div>
</template>

<script>
  export default {
    name: "EgeT11View",
  }
</script>

<style scoped>

</style>