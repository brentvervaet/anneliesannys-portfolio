<template>
  <div class="about">
    <section class="about-content">
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
      </div>

      <div class="timeline-section">
        <h2 class="timeline-title">Expositions</h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-year">2025</div>
            <div class="timeline-events">
              <div class="timeline-event">POP-UP Shop ChopinChopin, Belgium</div>
              <div class="timeline-event">KASK fashion show, Belgium</div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">2024</div>
            <div class="timeline-events">
              <div class="timeline-event">POP-UP Shop Shelter, Belgium</div>
              <div class="timeline-event">Show Window Ida, Belgium</div>
              <div class="timeline-event">Show Window Vi-Drie-Ne, Galerie Drie, Belgium</div>
              <div class="timeline-event">KASK fashion show, Belgium</div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">2023</div>
            <div class="timeline-events">
              <div class="timeline-event">KASK fashion show, Belgium</div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">2022</div>
            <div class="timeline-events">
              <div class="timeline-event">
                Making, Healing, Connecting (Soft Connection Lab), Museum Dr. Guislain, Belgium
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.about-content {
  display: flex;
  gap: 60px;
  padding: 60px 54px;
  align-items: flex-start;
  position: relative;
}

.about-text {
  color: black;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
  flex: 1;
}

.timeline-section {
  flex: 1;
}

.timeline-title {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 40px;
  color: black;
}

.timeline {
  border-left: 2px solid #d9d9d9;
  padding-left: 20px;
  margin-left: 20px;
}

.timeline-item {
  margin-bottom: 30px;
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -26px;
  top: 6px;
  width: 8px;
  height: 8px;
  background: black;
  border-radius: 50%;
}

.timeline-year {
  font-size: 18px;
  font-weight: 500;
  color: black;
  margin-bottom: 8px;
}

.timeline-events {
  margin-left: 0;
}

.timeline-event {
  font-size: 16px;
  font-weight: 300;
  color: black;
  margin-bottom: 4px;
  line-height: 1.4;
}
</style>
