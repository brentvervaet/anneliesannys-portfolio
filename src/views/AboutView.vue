<template>
  <div class="about">
    <section class="about-content">
      <div class="about-text">
        <div class="profile-image">
          <img src="/images/anneliesannys.webp" alt="Annelies Annys" />
        </div>
        <p class="pb-4">
          I’m Annelies Annys, a fashion designer and student at KASK & Conservatorium in Ghent. My
          work focuses on blurring the boundaries between memory, emotion, and materiality. Through
          collage, text, and clothing, I translate personal experiences into tangible forms.
        </p>
        <p class="pb-4">
          My process often begins with an inner narrative, a dream, a diary fragment, or a fleeting
          feeling, which gradually develops through experimentation with layers, textures, and form.
          By using collage as the first step in my design process, I explore composition,
          proportion, and the relationship between body and form. This method allows me to
          experiment freely, creating intuitive connections between image, texture, and silhouette
          before translating them into garments.
        </p>
        <p>
          Fashion is a language of reflection and connection: a way to communicate between what is
          hidden and what is revealed, between my own world and that of others. Each project is an
          attempt to hold onto what might otherwise be lost, while allowing it to transform into
          something new.
        </p>
      </div>

      <div class="timeline-section">
        <!-- TODO: welk titel? -->
        <!-- <h2 class="timeline-title">Projects</h2> -->
        <div class="timeline">
          <!-- 2025 -->
          <div class="timeline-item">
            <div class="timeline-year">2025</div>
            <div class="timeline-events">
              <div class="timeline-event">
                Iman Boot, <span class="highlight">Costume Design</span>, Belgium
              </div>
              <div class="timeline-event">
                Stadsduif (Rube Vandebril), <span class="highlight">Costume Design</span>, Belgium
              </div>
              <div class="timeline-event">
                <span class="highlight">POP-UP</span> Shop ChopinChopin, Belgium
              </div>
              <div class="timeline-event">
                KASK <span class="highlight"> fashion show</span>, Belgium
              </div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">2024</div>
            <div class="timeline-events">
              <div class="timeline-event">
                <span class="highlight">POP-UP</span> Shop Shelter, Belgium
              </div>
              <div class="timeline-event">
                Show window Ida, <span class="highlight">Exhibition</span> , Belgium
              </div>
              <div class="timeline-event">
                Show window Vi-drie-ne, <span class="highlight">Exhibition</span> , Galerie Drie,
                Belgium
              </div>
              <div class="timeline-event">
                KASK <span class="highlight"> fashion show</span>, Belgium
              </div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">2023</div>
            <div class="timeline-events">
              <div class="timeline-event">
                KASK <span class="highlight"> fashion show</span>, Belgium
              </div>
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

.profile-image {
  float: left;
  margin-right: 20px;
}

.profile-image img {
  width: 200px;
  height: auto;
  object-fit: cover;
  transition:
    transform 0.3s ease,
    filter 0.3s ease;
}

.profile-image img:hover {
  transform: scale(1.02);
  filter: brightness(1.05);
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
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.timeline-item:nth-child(1) {
  animation-delay: 0.1s;
}
.timeline-item:nth-child(2) {
  animation-delay: 0.2s;
}
.timeline-item:nth-child(3) {
  animation-delay: 0.3s;
}
.timeline-item:nth-child(4) {
  animation-delay: 0.4s;
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

.highlight {
  color: rgba(255, 182, 193);
  font-weight: 400;
  transition: color 0.2s ease;
}

.highlight:hover {
  color: rgba(255, 150, 200, 1);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-text p {
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.about-text p:nth-child(2) {
  animation-delay: 0.1s;
}
.about-text p:nth-child(3) {
  animation-delay: 0.2s;
}
.about-text p:nth-child(4) {
  animation-delay: 0.3s;
}

.profile-image {
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
    gap: 40px;
    padding: 40px 20px;
  }

  .about-text {
    order: 1;
  }

  .timeline-section {
    order: 2;
  }

  .profile-image {
    text-align: center;
  }

  .profile-image img {
    width: 170px;
    min-width: 150px;
  }

  .timeline {
    margin-left: 15px;
    padding-left: 15px;
  }

  .timeline-item::before {
    left: -21px;
  }
}

@media (max-width: 480px) {
  .about-content {
    padding: 30px 15px;
    gap: 30px;
  }

  .about-text {
    font-size: 14px;
  }

  .profile-image img {
    width: 140px;
    min-width: 120px;
  }

  .timeline-year {
    font-size: 16px;
  }

  .timeline-event {
    font-size: 14px;
  }

  .timeline {
    margin-left: 10px;
    padding-left: 10px;
  }

  .timeline-item::before {
    left: -16px;
    width: 6px;
    height: 6px;
  }
}
</style>
