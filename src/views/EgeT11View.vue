<template>
  <div>
    <page-header
      title="Задание 11 (ЕГЭ)"
      has-home-button
    />

    <section class="section">
      <div class="container">
        <p class="title is-5">
          Списки слов для закрепления
        </p>
        <div class="list is-hoverable">
          <router-link :to="{ name: 'training-card', params: { 'topic': 'ege-t11-suffices-ik-ek' } }" class="list-item">
            Существительные. Суффиксы ИК/ЕК
          </router-link>
          <router-link :to="{ name: 'training-card', params: { 'topic': 'ege-t11-suffices-ic-ec' } }" class="list-item">
            Существительные. Суффиксы ИЦ/ЕЦ
          </router-link>
          <router-link :to="{ name: 'training-card', params: { 'topic': 'ege-t11-suffices-ichk-echk' } }" class="list-item">
            Существительные. Суффиксы ИЧК/ЕЧК
          </router-link>
        </div>
      </div>
    </section>
</div>
</template>

<script>
  import PageHeader from "../components/PageHeader";
  export default {
    name: "EgeT11View",
    components: {PageHeader},
  }
</script>

<style scoped>

</style>