<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Тренажер правил русского языка
          </h1>
          <h2 class="subtitle">
            Добро пожаловать в тренажер для закрепления правил русского языка.
          </h2>
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
          <router-link :to="{ name: 'ege-t12' }" class="list-item">
            ЕГЭ. Задание 12
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>
