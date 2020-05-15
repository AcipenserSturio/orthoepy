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
          <router-link :to="{ name: 'ege-t11' }" class="list-item">
            ЕГЭ. Задание 11
          </router-link>
          <router-link :to="{ name: 'ege-t12' }" class="list-item">
            ЕГЭ. Задание 12
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
          <router-link :to="{ name: 'orthoepy-home' }" class="list-item">
            Орфоэпия
          </router-link>
          <router-link :to="{ name: 'nn-home' }" class="list-item">
            Н/НН
          </router-link>
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
