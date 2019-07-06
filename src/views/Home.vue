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
          <router-link :to="{ name: 'orthoepy' }" class="list-item">
            Орфоэпия
          </router-link>
          <router-link :to="{ name: 'single-or-double-n' }" class="list-item">
            Н/НН
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'home',
};
</script>
