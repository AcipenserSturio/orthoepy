<template>
  <div>
    <v-navbar
      title="Тренажер правил русского языка"
    />

    <section class="section">
      <div class="container">
        <p class="title is-5">
          Выберите задание ЕГЭ, которое будете закреплять:
        </p>
        <div class="list is-hoverable">
          <router-link :to="{ name: 'ege04-home' }" class="list-item">
            ЕГЭ. Задание 4. Постановка ударения
          </router-link>
        </div>
        <div class="list is-hoverable">
          <router-link :to="{ name: 'ege11-home' }" class="list-item">
            ЕГЭ. Задание 11. Правописание суффиксов (кроме -Н-/-НН-)
          </router-link>
          <router-link :to="{ name: 'ege12-home' }" class="list-item">
            ЕГЭ. Задание 12. Правописание личных окончаний глаголов и суффиксов причастий
          </router-link>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="title is-5">
          Выберите тему, которую будете закреплять:
        </p>
        <div class="list is-hoverable">
          <router-link :to="{ name: 'not-home' }" class="list-item">
            Слитное и раздельное правописание НЕ
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VNavbar from '../components/VNavbar.vue';

export default {
  name: 'HomeView',
  components: { VNavbar },
};
</script>
