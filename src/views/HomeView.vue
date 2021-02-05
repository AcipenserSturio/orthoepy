<template>
  <div>
    <VNavbar
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
          <router-link :to="{ name: 'ege05-home' }" class="list-item">
            ЕГЭ. Задание 5. Употребление паронимов
          </router-link>
        </div>
        <div class="list is-hoverable">
          <router-link :to="{ name: 'ege10-home' }" class="list-item">
            ЕГЭ. Задание 10. Правописание приставок
          </router-link>
          <router-link :to="{ name: 'ege11-home' }" class="list-item">
            ЕГЭ. Задание 11. Правописание суффиксов (кроме -Н-/-НН-)
          </router-link>
          <router-link :to="{ name: 'ege12-home' }" class="list-item">
            ЕГЭ. Задание 12. Правописание личных окончаний глаголов и суффиксов причастий
          </router-link>
        </div>
        <div class="list is-hoverable">
          <router-link :to="{ name: 'ege15-home' }" class="list-item">
            ЕГЭ. Задание 15. Пра­во­пи­са­ние -Н- и -НН- в суффиксах
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

    <section class="section">
      <div class="container">
        <p class="title is-5">
          Об авторах
        </p>
        <div class="content">
          <p>
            Тренажер был создан творческой группой учащихся
            11 А класса МАОУ "Гимназии №2" в 2020 году.
          </p>
          <p>
            <em>Участники творческой группы:</em>
          </p>
          <ul>
            <li>Гашков Кирилл</li>
            <li>Давыдов Михаил</li>
            <li>Лукьяненко Денис</li>
            <li>Педаев Михаил</li>
            <li>Семчук Екатерина</li>
            <li>Смертин Роман</li>
            <li>Сугак-Романова Анастасия</li>
            <li>Шестаков Максим</li>
          </ul>
          <p>
            <em>Куратор работы:</em>
          </p>
          <ul>
            <li>Юсупова Оксана Николаевна</li>
          </ul>
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

<style scoped>
</style>
