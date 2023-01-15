<script setup lang="ts">
import { onMounted } from 'vue'
const props = defineProps({
  variant: {
    type: String,
    default: 'green',
  },
})

onMounted(() => {
  const cardContainerEl = document.getElementById('cards')
  const cardsEls = Array.from(document.getElementsByClassName('card'))

  if (cardContainerEl) {
    cardContainerEl.onmousemove = (e) => {
      for (const card of cardsEls) {
        const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top

        // @ts-ignore
        card.style.setProperty('--mouse-x', `${x}px`)
        // @ts-ignore
        card.style.setProperty('--mouse-y', `${y}px`)
      }
    }
  }
})
</script>

<template>
  <div id="cards">
    <div class="card">
      <div class="card-content">
        <div class="card-image">
          <i class="fa-duotone fa-apartment"></i>
        </div>
        <div class="card-info-wrapper">
          <div class="card-info">
            <i class="fa-duotone fa-apartment"></i>
            <div class="card-info-title">
              <h3>Apartments</h3>
              <h4>Places to be apart. Wait, what?</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <div class="card-image">
          <i class="fa-duotone fa-unicorn"></i>
        </div>
        <div class="card-info-wrapper">
          <div class="card-info">
            <i class="fa-duotone fa-unicorn"></i>
            <div class="card-info-title">
              <h3>Unicorns</h3>
              <h4>A single corn. Er, I mean horn.</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <div class="card-image">
          <i class="fa-duotone fa-blender-phone"></i>
        </div>
        <div class="card-info-wrapper">
          <div class="card-info">
            <i class="fa-duotone fa-blender-phone"></i>
            <div class="card-info-title">
              <h3>Blender Phones</h3>
              <h4>These absolutely deserve to exist.</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <div class="card-image">
          <i class="fa-duotone fa-person-to-portal"></i>
        </div>
        <div class="card-info-wrapper">
          <div class="card-info">
            <i class="fa-duotone fa-person-to-portal"></i>
            <div class="card-info-title">
              <h3>Adios</h3>
              <h4>See you...</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <div class="card-image">
          <i class="fa-duotone fa-person-from-portal"></i>
        </div>
        <div class="card-info-wrapper">
          <div class="card-info">
            <i class="fa-duotone fa-person-from-portal"></i>
            <div class="card-info-title">
              <h3>I mean hello</h3>
              <h4>...over here.</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <div class="card-image">
          <i class="fa-duotone fa-otter"></i>
        </div>
        <div class="card-info-wrapper">
          <div class="card-info">
            <i class="fa-duotone fa-otter"></i>
            <div class="card-info-title">
              <h3>Otters</h3>
              <h4>Look at me, imma cute lil fella.</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <a id="source-link" class="link" href="https://linear.app/features" target="_blank">
    <i class="fa-solid fa-link"></i>
    <span class="roboto-mono">Source</span>
  </a>

  <a id="youtube-link" class="link" href="https://youtu.be/htGfnF1zN4g" target="_blank">
    <i class="fa-brands fa-youtube"></i>
    <span>5 min Tutorial</span>
  </a>
</template>
<style lang="scss" scoped>
:root {
  --bg-color: rgb(20 20 20);
  --card-color: rgb(23 23 23);
}

#cards {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 916px;
  width: calc(100% - 20px);
}

.card {
  width: 300px;
  height: 260px;
  background-color: rgb(255 255 255 / 10%);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
}

.card::before {
  background: radial-gradient(
    400px circle at var(--mouse-x) var(--mouse-y),
    rgb(255 255 255 / 6%),
    transparent 99%
  );
  z-index: 3;
}

.card::after {
  background: radial-gradient(
    100px circle at var(--mouse-x) var(--mouse-y),
    rgb(255 255 255 / 10%),
    transparent 99%
  );
  z-index: 1;
}

.card::before,
.card::after {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  content: '';
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  transition: opacity 500ms;
}

.card:hover::before {
  opacity: 1;
}

#cards:hover > .card::after {
  opacity: 1;
}

.card > .card-content {
  background-color: var(--card-color);
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  inset: 1px;
  padding: 10px;
  position: absolute;
  z-index: 2;
}

/* -- ↓ ↓ ↓ extra card content styles ↓ ↓ ↓ -- */

h1,
h2,
h3,
h4,
span {
  color: rgb(240 240 240);
  font-family: Rubik, sans-serif;
  font-weight: 400;
  margin: 0;
}

i {
  color: rgb(240 240 240);
}

.card-image {
  align-items: center;
  display: flex;
  height: 140px;
  justify-content: center;
  overflow: hidden;
}

.card-image > i {
  font-size: 6em;
  opacity: 0.25;
}

.card-info-wrapper {
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  padding: 0 20px;
}

.card-info {
  align-items: flex-start;
  display: flex;
  gap: 10px;
}

.card-info > i {
  font-size: 1em;
  height: 20px;
  line-height: 20px;
}

.card-info-title > h3 {
  font-size: 1.1em;
  line-height: 20px;
}

.card-info-title > h4 {
  color: rgb(255 255 255 / 50%);
  font-size: 0.85em;
  margin-top: 8px;
}

/* -- ↓ ↓ ↓ some responsiveness ↓ ↓ ↓ -- */

@media (max-width: 1000px) {
  body {
    align-items: flex-start;
    overflow: auto;
  }

  #cards {
    max-width: 1000px;
    padding: 10px 0;
  }

  .card {
    flex-shrink: 1;
    width: calc(50% - 4px);
  }
}

@media (max-width: 500px) {
  .card {
    height: 180px;
  }

  .card-image {
    height: 80px;
  }

  .card-image > i {
    font-size: 3em;
  }

  .card-info-wrapper {
    padding: 0 10px;
  }

  .card-info > i {
    font-size: 0.8em;
  }

  .card-info-title > h3 {
    font-size: 0.9em;
  }

  .card-info-title > h4 {
    font-size: 0.8em;
    margin-top: 4px;
  }
}

@media (max-width: 320px) {
  .card {
    width: 100%;
  }
}

.link {
  align-items: center;
  backdrop-filter: blur(3px);
  background-color: rgb(255 255 255 / 5%);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 6px;
  box-shadow: 2px 2px 2px rgb(0 0 0 / 10%);
  cursor: pointer;
  display: inline-flex;
  gap: 5px;
  left: 10px;
  padding: 10px 20px;
  position: fixed;
  text-decoration: none;
  z-index: 100;
}

.link > span {
  color: white;
}

.link > i,
.link > span {
  height: 20px;
  line-height: 20px;
}

.link:hover {
  background-color: rgb(255 255 255 / 10%);
  border: 1px solid rgb(255 255 255 / 20%);
}

/* -- ↓ ↓ ↓ YouTube link styles ↓ ↓ ↓ -- */

#source-link {
  bottom: 60px;
}

#source-link > i {
  color: rgb(94 106 210);
}

#youtube-link {
  bottom: 10px;
}

#youtube-link > i {
  color: rgb(239 83 80);
}
</style>
