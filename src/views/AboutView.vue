<template>
  <div class="about">
    <section class="about-hero">
      <h1 class="about-title">Annelies Annys</h1>
    </section>

    <section class="about-content">
      <div class="about-image"></div>
      <div class="about-text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <p>
          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et
          commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
          Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.
          Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros
          est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.
          Donec fermentum. Pellentesque malesuada nulla a mi.
        </p>
        <p>
          Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit
          ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras
          mollis scelerisque nunc. Nulla nec massa. Sed sit amet diam. Proin magna. In hac habitasse
          platea dictumst. Praesent nec nisl a purus blandit viverra. Praesent ac massa at ligula
          laoreet iaculis.
        </p>
        <p>
          Morbi ac felis. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at
          malesuada velit leo quis pede. Donec interdum, metus et hendrerit aliquet, dolor diam
          sagittis ligula, eget egestas libero turpis vel mi. Mauris sollicitudin fermentum libero.
          Praesent nonummy mi in odio. Nunc interdum lacus sit amet orci.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.about-content {
  display: flex;
  gap: 60px;
  padding: 60px 54px 0 54px;
  align-items: flex-start;
  position: relative;
}

.about-image {
  min-width: 320px;
  height: 400px;
  background: #d9d9d9;
  border-radius: 8px;
}

.about-text {
  color: #000;
  font-size: 24px;
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 400;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .about-content {
    flex-direction: column;
    gap: 30px;
  }

  .about-image {
    width: 100%;
    height: 240px;
  }
}
</style>
