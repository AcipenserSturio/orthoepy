<template>
  <div>
    <v-navbar
      title="Тренажер"
      has-home-button
    />
    <section class="section">
      <div class="columns">
        <div class="column is-half container">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">
                Dummy Title
              </div>
            </div>
            <div class="card-content">
              <div class="content">
                Dummy Content
              </div>
            </div>
            <div class="card-footer">
              <a class="card-footer-item">
                Dummy Footer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VNavbar from '@/components/VNavbar.vue';

export default {
  name: 'TrainingView',
  components: {
    VNavbar,
  },
};
</script>

<style scoped>
</style>
