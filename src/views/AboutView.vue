<template>
  <div class="about">
    <section class="about-content">
      <div class="about-text">
        <div class="profile-image">
          <img src="/images/anneliesannys.webp" alt="Annelies Annys" />
        </div>
        <p>
          I’m Annelies Annys, a fashion designer and student at KASK & Conservatorium in Ghent. My
          work focuses on blurring the boundaries between memory, emotion, and materiality. Through
          collage, text, and clothing, I translate personal experiences into tangible forms.
        </p>
        <p>
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
        <div class="timeline">
          <!--<div class="timeline-item">
            <div class="timeline-year">2026</div>
            <div class="timeline-events">
              <div class="timeline-event">
                Internship @ Jeffrey Charles Loverboy <span class="highlight">Costume Design</span>, London
              </div>
            </div>
          </div>-->

          <div class="timeline-item">
            <div class="timeline-year">2025</div>
            <div class="timeline-events">
              <div class="timeline-event">
                Sneeuw (Iman Boot), <span class="highlight">Costume Design</span>, Belgium
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
  padding: 3.5rem 1.5rem 1.5rem;
}

.profile-image {
  float: left;
  margin-right: 20px;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.profile-image img {
  width: 200px;
  height: auto;
  object-fit: cover;
  transition:
    transform 0.3s ease,
    filter 0.3s ease;
}

.about-text {
  padding-top: 2.5rem;
  color: black;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  flex: 1;
}

.about-text p {
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

/* ===== TIMELINE ===== */

.timeline {
  border-left: 2px solid #d9d9d9;
  padding-left: 1rem;
}

.timeline-item {
  margin-bottom: 1.5rem;
  position: relative;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.timeline-year {
  font-size: 1.2rem;
  font-weight: 500;
  color: black;
  margin-bottom: 0.5rem;
}

.timeline-event {
  font-size: 1rem;
  font-weight: 300;
  color: black;
  margin-bottom: 0.25rem;
  line-height: 1.5;
}

.highlight {
  color: rgba(255, 182, 193);
  font-weight: 400;
  transition: color 0.2s ease;
}

/* ===== ANIMATIONS ===== */
.about-text p:nth-child(2) {
  animation-delay: 0.1s;
}
.about-text p:nth-child(3) {
  animation-delay: 0.2s;
}
.about-text p:nth-child(4) {
  animation-delay: 0.3s;
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

/* ===== MEDIA QUERIES ===== */

/* tablet */
@media (min-width: 768px) {
  .about-content {
    padding: 5rem 4rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .profile-image {
    margin-right: 30px;
  }

  .profile-image img {
    width: 250px;
  }

  .about-text {
    font-size: 1.1rem;
    line-height: 1.5;
  }

  .about-text p {
    margin-bottom: 2rem;
  }

  .timeline {
    padding-left: 1.5rem;
    margin-top: 3rem;
  }

  .timeline-year {
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
  }

  .timeline-event {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    line-height: 1.7;
  }

  .timeline-item {
    margin-bottom: 2rem;
  }
}

/* desktop */
@media (min-width: 1024px) {
  .about-content {
    padding: 6rem 6rem 3rem;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  .profile-image {
    margin-right: 35px;
    margin-bottom: 20px;
  }

  .profile-image img {
    width: 280px;
  }

  .about-text p {
    margin-bottom: 2.5rem;
  }

  .timeline-section {
    position: sticky;
    top: 120px;
  }

  .timeline {
    padding-left: 2rem;
    margin-top: 0;
  }

  .highlight:hover {
    color: rgba(255, 150, 200, 1);
  }
}
</style>
