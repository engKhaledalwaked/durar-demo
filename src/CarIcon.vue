<script setup>
import { computed } from 'vue'

const props = defineProps({ type: { type: String, required: true } })

// صور جانبية مرسومة يدوياً (الواجهة لليمين) — viewBox 120×50، الأرض عند y=48
const cars = {
  eco: {
    body: 'M20 40V29Q20 25 23 23L31 17Q34 15 38 15H62Q66 15 69 17L79 25L94 28Q100 29 100 34V40H93A9 9 0 0 0 75 40H47A9 9 0 0 0 29 40Z',
    win: ['M25 25L32 19.5Q34 18 37 18H48V25Z', 'M51 18H62Q65 18 67 20L73.5 25H51Z'],
    lights: [[94.5, 29.5, 4.5, 2.5], [20.5, 27, 2.5, 4]],
    wheels: [38, 84], r: 7,
  },
  sedan: {
    body: 'M10 40V31Q10 28 14 27L30 25L42 16Q44 15 47 15H68Q72 15 75 17L86 25L104 28Q111 29 112 34V40H99A9 9 0 0 0 81 40H41A9 9 0 0 0 23 40Z',
    win: ['M34 25L43 18.5Q45 17.5 47 17.5H57V25Z', 'M60 17.5H68Q71 17.5 73 19L81 25H60Z'],
    lights: [[105, 29.2, 5, 2.5], [10.5, 28, 3.5, 2.5]],
    wheels: [32, 90], r: 7,
  },
  suv: {
    body: 'M8 40V18Q8 12 14 11H72Q76 11 79 14L88 23L106 26Q112 27 112 32V40H100A10 10 0 0 0 80 40H40A10 10 0 0 0 20 40Z',
    win: ['M13 15H30V24H13Z', 'M33 15H54V24H33Z', 'M57 15H72Q74 15 76 17L82 24H57Z'],
    rails: 'M18 11V7.5H64V11',
    lights: [[104.5, 27.5, 5.5, 3], [8.5, 19, 2.5, 5]],
    wheels: [30, 90], r: 8,
  },
  lux: {
    body: 'M4 40V32Q4 29 8 28L26 25Q34 17 46 15Q56 13.5 66 14.5Q76 15.5 86 24L106 27Q115 28.5 116 34V40H103.5A9.5 9.5 0 0 0 84.5 40H37.5A9.5 9.5 0 0 0 18.5 40Z',
    win: ['M30 25Q37 19 46 17.5L56 17V25Z', 'M59 17Q72 17 81 25H59Z'],
    trim: 'M39 34H83',
    lights: [[107.5, 29, 6, 2.5], [4.5, 29.5, 4, 2.5]],
    wheels: [28, 94], r: 7.5,
  },
}
const car = computed(() => cars[props.type] ?? cars.sedan)
</script>

<template>
  <svg class="car" viewBox="0 0 120 50" aria-hidden="true">
    <path v-if="car.rails" class="car-line" :d="car.rails" />
    <path class="car-body" :d="car.body" />
    <path v-for="(w, i) in car.win" :key="i" class="car-win" :d="w" />
    <rect v-for="([x, y, w, h], i) in car.lights" :key="'l' + i" :class="i ? 'car-tail' : 'car-head'" :x="x" :y="y" :width="w" :height="h" rx="1" />
    <path v-if="car.trim" class="car-line thin" :d="car.trim" />
    <g v-for="x in car.wheels" :key="x">
      <circle class="car-wheel" :cx="x" cy="40" :r="car.r" />
      <circle class="car-hub" :cx="x" cy="40" :r="car.r * .42" />
    </g>
  </svg>
</template>
