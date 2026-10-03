import { ref, computed, watchEffect } from 'vue'

const saved = (() => { try { return localStorage.getItem('dr-lang') } catch { return null } })()
export const lang = ref(saved === 'en' ? 'en' : 'ar')
watchEffect(() => {
  document.documentElement.lang = lang.value
  document.documentElement.dir = lang.value === 'ar' ? 'rtl' : 'ltr'
  try { localStorage.setItem('dr-lang', lang.value) } catch {}
})
export const toggleLang = () => { lang.value = lang.value === 'ar' ? 'en' : 'ar' }
export const tr = (o) => (o && typeof o === 'object' ? o[lang.value] ?? o.ar : o)
export const img = (p) => `/img/${p}`

// من خرائط Google (فرع السليمانية) ومن لافتة الفرع (هاتف 011)
export const site = {
  whatsapp: '966558472117',
  phone: { tel: '+966558472117', label: '055 847 2117' },
  rating: '4.2', reviews: '101',
  maps: 'https://www.google.com/maps/search/?api=1&query=24.7000079,46.7142271',
  mapEmbed: 'https://www.google.com/maps?q=24.7000079,46.7142271&z=17&output=embed',
}
export const wa = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`

// فئات عامة (بدون أسعار — السعر يُرسل عبر واتساب)
export const classes = [
  { id: 'eco', seats: 5, bags: 2, t: { ar: 'اقتصادية', en: 'Economy' }, d: { ar: 'مثالية للمشاوير اليومية داخل المدينة', en: 'Ideal for daily city trips' } },
  { id: 'sedan', seats: 5, bags: 3, t: { ar: 'سيدان عائلية', en: 'Family sedan' }, d: { ar: 'راحة ومساحة للعائلة والسفر', en: 'Comfort and space for family trips' } },
  { id: 'suv', seats: 7, bags: 4, t: { ar: 'دفع رباعي SUV', en: 'SUV' }, d: { ar: 'للبر والسفر والعائلات الكبيرة', en: 'For desert trips, travel and big families' } },
  { id: 'lux', seats: 5, bags: 3, t: { ar: 'فاخرة', en: 'Luxury' }, d: { ar: 'للمناسبات ورجال الأعمال', en: 'For occasions and business' } },
]
export const periods = [
  { id: 'day', t: { ar: 'يومي', en: 'Daily' } },
  { id: 'week', t: { ar: 'أسبوعي', en: 'Weekly' } },
  { id: 'month', t: { ar: 'شهري', en: 'Monthly' } },
]

const dict = {
  ar: {
    ribbon: 'نسخة عرض تجريبية — مُعدّة لشركة درر الوطنية',
    brand: 'شركة درر الوطنية', brandSub: 'لتأجير السيارات', brandEn: 'DORAR AL WATANIYA RENT A CAR',
    nav: { book: 'احجز سيارة', classes: 'الفئات', why: 'لماذا درر', reviews: 'آراء العملاء', visit: 'الفرع' },
    hero: {
      t1: 'سيارتك جاهزة', t2: 'وأنت بعدك في الطريق.',
      lead: 'تأجير يومي وأسبوعي وشهري في الرياض — سيارات نظيفة ومصانة، وحجز سريع عبر واتساب.',
      cta: 'احجز الآن', call: 'اتصل',
    },
    form: {
      title: 'احجز خلال دقيقة', class: 'فئة السيارة', period: 'نوع الإيجار', from: 'تاريخ الاستلام', to: 'تاريخ التسليم', name: 'الاسم', phone: 'الجوال',
      extras: 'إضافات', delivery: 'توصيل السيارة لموقعي', insurance: 'تأمين شامل', child: 'كرسي أطفال',
      send: 'اطلب السعر عبر واتساب', note: 'السعر يصلك على واتساب حسب الفئة والمدة.', required: 'الرجاء كتابة الاسم والجوال.',
      days: 'يوم', seats: 'ركاب', bags: 'حقائب',
      msg: { hello: 'السلام عليكم، أرغب باستئجار سيارة', class: 'الفئة', period: 'نوع الإيجار', from: 'من', to: 'إلى', days: 'المدة', name: 'الاسم', phone: 'الجوال', extras: 'إضافات' },
    },
    classes: { kicker: 'الفئات', title: 'اختر الفئة اللي تناسبك', choose: 'اختر' },
    why: {
      kicker: 'لماذا درر', title: 'بسيطة… وواضحة',
      items: [
        { t: 'سيارات نظيفة ومصانة', d: 'نتابع نظافة وصيانة كل سيارة قبل التسليم.' },
        { t: 'رد سريع على واتساب', d: 'أسرع طريقة للحجز أو لأي استفسار أثناء الإيجار.' },
        { t: 'أسعار معقولة', d: 'خيارات يومية وأسبوعية وشهرية تناسب ميزانيتك.' },
        { t: 'دوام طويل', d: 'من ١٠ صباحاً حتى ١٠ مساءً، طوال أيام الأسبوع.' },
      ],
    },
    reviews: { kicker: 'آراء العملاء', title: 'من مراجعات Google', count: 'تقييم', note: 'مقتطفات من مراجعات الفرع على خرائط Google (باللغة الأصلية).' },
    visit: {
      kicker: 'الفرع', title: 'فرع السليمانية',
      addr: 'شارع الأمير مساعد بن عبدالعزيز، حي السليمانية، الرياض 12233',
      hours: [{ d: 'السبت – الخميس', h: '١٠:٠٠ ص – ١٠:٠٠ م' }, { d: 'الجمعة', h: '١٠:٣٠ ص – ١٠:٠٠ م' }],
      docs: 'المستندات المطلوبة: الهوية أو الإقامة + رخصة قيادة سارية.',
      dir: 'الاتجاهات', call: 'اتصال',
    },
    footer: { rights: 'جميع الحقوق محفوظة', demo: 'نسخة عرض تجريبية', llc: 'شركة ذات مسؤولية محدودة' },
    sticky: { call: 'اتصال', book: 'احجز عبر واتساب' },
  },
  en: {
    ribbon: 'Demo preview — prepared for Dorar Al Wataniya',
    brand: 'Dorar Al Wataniya', brandSub: 'Rent a Car', brandEn: 'شركة درر الوطنية لتأجير السيارات',
    nav: { book: 'Book a car', classes: 'Classes', why: 'Why Dorar', reviews: 'Reviews', visit: 'Branch' },
    hero: {
      t1: 'Your car is ready', t2: 'before you arrive.',
      lead: 'Daily, weekly and monthly rentals in Riyadh — clean, well-maintained cars and fast booking on WhatsApp.',
      cta: 'Book now', call: 'Call',
    },
    form: {
      title: 'Book in a minute', class: 'Car class', period: 'Rental type', from: 'Pick-up date', to: 'Return date', name: 'Name', phone: 'Mobile',
      extras: 'Extras', delivery: 'Deliver the car to me', insurance: 'Full insurance', child: 'Child seat',
      send: 'Get the price on WhatsApp', note: 'We’ll send the price on WhatsApp based on class and duration.', required: 'Please enter your name and mobile.',
      days: 'days', seats: 'seats', bags: 'bags',
      msg: { hello: 'Hello, I would like to rent a car', class: 'Class', period: 'Rental type', from: 'From', to: 'To', days: 'Duration', name: 'Name', phone: 'Mobile', extras: 'Extras' },
    },
    classes: { kicker: 'Classes', title: 'Pick the class that fits you', choose: 'Choose' },
    why: {
      kicker: 'Why Dorar', title: 'Simple and clear',
      items: [
        { t: 'Clean, maintained cars', d: 'Every car is cleaned and checked before handover.' },
        { t: 'Fast WhatsApp replies', d: 'The quickest way to book or ask anything during your rental.' },
        { t: 'Reasonable prices', d: 'Daily, weekly and monthly options for every budget.' },
        { t: 'Long opening hours', d: '10 AM to 10 PM, every day of the week.' },
      ],
    },
    reviews: { kicker: 'Reviews', title: 'From Google reviews', count: 'reviews', note: 'Excerpts from the branch’s Google Maps reviews.' },
    visit: {
      kicker: 'Branch', title: 'Al Sulimaniyah branch',
      addr: 'Prince Musaed bin Abdulaziz St., Al Sulimaniyah, Riyadh 12233',
      hours: [{ d: 'Saturday – Thursday', h: '10:00 AM – 10:00 PM' }, { d: 'Friday', h: '10:30 AM – 10:00 PM' }],
      docs: 'Required: national ID or iqama + a valid driving licence.',
      dir: 'Directions', call: 'Call',
    },
    footer: { rights: 'All rights reserved', demo: 'Demo preview', llc: 'Limited Liability Company' },
    sticky: { call: 'Call', book: 'Book on WhatsApp' },
  },
}
export const t = computed(() => dict[lang.value])

export const reviews = [
  { n: 'Jeremiah', q: 'This car rental shop is amazing! The cars are always clean, reliable, and well-maintained. What really stands out is their customer service — they’re super responsive on WhatsApp and always ready to help.' },
  { n: 'Asif Farhan', q: 'Masha Allah, it’s a good service to rent any cars, and all the prices are reasonable.' },
]
