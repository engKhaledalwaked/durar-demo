<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { t, tr, lang, toggleLang, img, site, wa, classes, periods, reviews } from './data'
import CarIcon from './CarIcon.vue'

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 30 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const iso = (d) => d.toISOString().slice(0, 10)
const today = new Date()
const f = reactive({ cls: 'sedan', period: 'day', from: iso(today), to: iso(new Date(today.getTime() + 2 * 864e5)), name: '', phone: '', delivery: false, insurance: false, child: false })
const days = computed(() => Math.max(1, Math.round((new Date(f.to) - new Date(f.from)) / 864e5)))
const err = ref('')
const pick = (id) => { f.cls = id; document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }) }
const send = () => {
  if (!f.name.trim() || !f.phone.trim()) { err.value = t.value.form.required; return }
  err.value = ''
  const m = t.value.form.msg, F = t.value.form
  const ex = [f.delivery && F.delivery, f.insurance && F.insurance, f.child && F.child].filter(Boolean)
  const lines = [m.hello, `${m.class}: ${tr(classes.find((c) => c.id === f.cls).t)}`, `${m.period}: ${tr(periods.find((p) => p.id === f.period).t)}`, `${m.from}: ${f.from}`, `${m.to}: ${f.to}`, `${m.days}: ${days.value} ${F.days}`, ex.length ? `${m.extras}: ${ex.join('، ')}` : null, `${m.name}: ${f.name.trim()}`, `${m.phone}: ${f.phone.trim()}`].filter(Boolean)
  window.open(wa(lines.join('\n')), '_blank', 'noopener')
}
const year = new Date().getFullYear()
</script>

<template>
  <!-- نسخة عرض: احذف هذا الشريط عند الإطلاق الرسمي -->
  <div class="demo-ribbon">{{ t.ribbon }}</div>

  <header class="nav" :class="{ scrolled }">
    <div class="container nav-in">
      <a href="#top" class="sign">
        <b>{{ t.brand }}</b>
        <span>{{ t.brandSub }}</span>
      </a>
      <nav class="links"><a href="#classes">{{ t.nav.classes }}</a><a href="#why">{{ t.nav.why }}</a><a href="#reviews">{{ t.nav.reviews }}</a><a href="#visit">{{ t.nav.visit }}</a></nav>
      <div class="acts">
        <button type="button" class="lang" @click="toggleLang">{{ lang === 'ar' ? 'EN' : 'ع' }}</button>
        <a :href="`tel:${site.phone.tel}`" class="call hide-sm" dir="ltr">{{ site.phone.label }}</a>
      </div>
    </div>
  </header>

  <main>
    <section class="hero" id="top">
      <div class="stripes" aria-hidden="true"></div>
      <div class="container hero-in">
        <div class="hero-copy">
          <p class="en-name">{{ t.brandEn }}</p>
          <h1><span>{{ t.hero.t1 }}</span><span class="red">{{ t.hero.t2 }}</span></h1>
          <p class="lead">{{ t.hero.lead }}</p>
          <div class="hero-photo"><img :src="img('lexus-branch.jpg')" alt="" fetchpriority="high" /><span class="rate">★ {{ site.rating }} · {{ site.reviews }}</span></div>
        </div>

        <form class="booker" id="book" novalidate @submit.prevent="send">
          <h2>{{ t.form.title }}</h2>
          <div class="lbl"><span>{{ t.form.class }}</span>
            <div class="cls">
              <button v-for="c in classes" :key="c.id" type="button" :class="{ on: f.cls === c.id }" @click="f.cls = c.id">
                <CarIcon :type="c.id" />
                {{ tr(c.t) }}
              </button>
            </div>
          </div>
          <div class="lbl"><span>{{ t.form.period }}</span>
            <div class="seg"><button v-for="p in periods" :key="p.id" type="button" :class="{ on: f.period === p.id }" @click="f.period = p.id">{{ tr(p.t) }}</button></div>
          </div>
          <div class="row">
            <label><span>{{ t.form.from }}</span><input v-model="f.from" type="date" :min="iso(today)" /></label>
            <label><span>{{ t.form.to }}</span><input v-model="f.to" type="date" :min="f.from" /></label>
          </div>
          <p class="days"><b>{{ days }}</b> {{ t.form.days }}</p>
          <div class="lbl"><span>{{ t.form.extras }}</span>
            <div class="checks">
              <label><input type="checkbox" v-model="f.delivery" /><span>{{ t.form.delivery }}</span></label>
              <label><input type="checkbox" v-model="f.insurance" /><span>{{ t.form.insurance }}</span></label>
              <label><input type="checkbox" v-model="f.child" /><span>{{ t.form.child }}</span></label>
            </div>
          </div>
          <div class="row">
            <label><span>{{ t.form.name }}</span><input v-model="f.name" autocomplete="name" /></label>
            <label><span>{{ t.form.phone }}</span><input v-model="f.phone" type="tel" dir="ltr" autocomplete="tel" /></label>
          </div>
          <p v-if="err" class="err" role="alert">{{ err }}</p>
          <button class="btn btn-red block" type="submit">{{ t.form.send }}</button>
          <p class="fine">{{ t.form.note }}</p>
        </form>
      </div>
    </section>

    <section class="section classes" id="classes">
      <div class="container">
        <div class="head" v-reveal><p class="kicker">{{ t.classes.kicker }}</p><h2>{{ t.classes.title }}</h2></div>
        <div class="cl-grid">
          <article v-for="c in classes" :key="c.id" class="cl" v-reveal>
            <CarIcon :type="c.id" />
            <h3>{{ tr(c.t) }}</h3>
            <p>{{ tr(c.d) }}</p>
            <ul><li>👤 {{ c.seats }} {{ t.form.seats }}</li><li>🧳 {{ c.bags }} {{ t.form.bags }}</li></ul>
            <button type="button" class="btn btn-blue" @click="pick(c.id)">{{ t.classes.choose }}</button>
          </article>
        </div>
      </div>
    </section>

    <section class="section why" id="why">
      <div class="container why-in">
        <div class="why-pics" v-reveal>
          <img :src="img('branch-showroom.jpg')" alt="" loading="lazy" />
          <img :src="img('interior.jpg')" alt="" loading="lazy" />
        </div>
        <div>
          <div class="head" v-reveal><p class="kicker">{{ t.why.kicker }}</p><h2>{{ t.why.title }}</h2></div>
          <ol class="why-list">
            <li v-for="(w, i) in t.why.items" :key="w.t" v-reveal><span>{{ i + 1 }}</span><div><h3>{{ w.t }}</h3><p>{{ w.d }}</p></div></li>
          </ol>
        </div>
      </div>
    </section>

    <section class="section reviews" id="reviews">
      <div class="container">
        <div class="rv-head" v-reveal><div><p class="kicker">{{ t.reviews.kicker }}</p><h2>{{ t.reviews.title }}</h2></div><div class="score"><b>{{ site.rating }}</b><small>★★★★☆ · {{ site.reviews }} {{ t.reviews.count }}</small></div></div>
        <div class="rv-grid">
          <blockquote v-for="r in reviews" :key="r.n" class="rv" dir="ltr" v-reveal><p>“{{ r.q }}”</p><footer>— {{ r.n }}</footer></blockquote>
        </div>
        <p class="note">{{ t.reviews.note }}</p>
      </div>
    </section>

    <section class="section visit" id="visit">
      <div class="container vs-in">
        <div class="vs-photo" v-reveal><img :src="img('branch-sulimaniyah.jpg')" alt="" loading="lazy" /></div>
        <div class="vs-card" v-reveal>
          <p class="kicker">{{ t.visit.kicker }}</p>
          <h2>{{ t.visit.title }}</h2>
          <p class="addr">{{ t.visit.addr }}</p>
          <dl><div v-for="h in t.visit.hours" :key="h.d"><dt>{{ h.d }}</dt><dd>{{ h.h }}</dd></div></dl>
          <p class="docs">📄 {{ t.visit.docs }}</p>
          <div class="ctas">
            <a class="btn btn-blue" :href="site.maps" target="_blank" rel="noopener">{{ t.visit.dir }}</a>
            <a class="btn btn-line" :href="`tel:${site.phone.tel}`">{{ t.visit.call }} <span dir="ltr">{{ site.phone.label }}</span></a>
          </div>
        </div>
        <div class="map" v-reveal><iframe :src="site.mapEmbed" title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container foot">
      <div class="sign big"><b>{{ t.brand }}</b><span>{{ t.brandSub }}</span></div>
      <small class="llc">{{ t.footer.llc }}</small>
      <small>© {{ year }} {{ t.footer.rights }} · <em>{{ t.footer.demo }}</em></small>
    </div>
  </footer>
  <div class="sticky">
    <a :href="`tel:${site.phone.tel}`">{{ t.sticky.call }}</a>
    <a href="#book" class="main">{{ t.sticky.book }}</a>
  </div>
</template>
