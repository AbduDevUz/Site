/* ============================================================
   Tinch — Sayt darajasidagi kontent (uz / ru)
   ------------------------------------------------------------
   QOIDA: har bir tarjima qilinadigan qiymat { uz, ru } obyekti.
   Yangi til qo'shish uchun shu obyektlarga kalit qo'shiladi
   va i18n.js dagi SUPPORTED_LANGS ro'yxati yangilanadi.
   ============================================================ */

window.SITE = {
  /* ---------- Kompaniya rekvizitlari (tarjimasiz) ---------- */
  company: {
    name: "Tinch",
    legalName: "Tinch",

    /* Asosiy shior. Ikki ma'noli: «xotirjam ishlang» va «Tinch bilan
       ishlang». Sarlavha ostida, brend lentasida va footerda chiqadi. */
    slogan: { uz: "Tinch ishlang.", ru: "Работайте спокойно." },
    url: "https://tinch.uz",
    logo: "./images/logo2.png",
    phone: "+998 (94) 834-95-55",
    phoneHref: "tel:+998948349555",
    email: "info@tinch.uz",

    /* Ommaviy Telegram — saytdagi «Telegram orqali yozish» tugmasi,
       ijtimoiy tarmoq ikonkasi va SEO tavsiflarida ishlatiladi. */
    telegram: "https://t.me/AbduDevUz",
    telegramHandle: "@AbduDevUz",

    /* So'rovlar tushadigan Telegram — buyurtma formasi shu yerga yuboradi.
       Hozir ommaviysi bilan bir xil. Keyinchalik alohida kanal ochsangiz,
       yuqoridagini o'zgartirib, bu yerni o'z holicha qoldirasiz. */
    telegramDirect: "https://t.me/AbduDevUz",
    telegramDirectHandle: "@AbduDevUz",

    socials: [
      { id: "telegram", href: "https://t.me/AbduDevUz", label: "Telegram" },
      { id: "instagram", href: "https://www.instagram.com/tinchsoft", label: "Instagram" },
      { id: "facebook", href: "https://www.facebook.com/tinchsoft", label: "Facebook" },
      { id: "youtube", href: "https://www.youtube.com/@tinchsoft", label: "YouTube" },
    ],
  },

  /* ------------------------------------------------------------
     DOLLAR KURSI
     ------------------------------------------------------------
     Dollarda ko'rsatilgan narxlar yoniga taxminiy so'm miqdori
     yoziladi (masalan: 350 USD  ~ 4 550 000 so'm).

     Kurs o'zgarganda FAQAT SHU RAQAMNI almashtirasiz — barcha
     sahifalarda so'm o'zi qayta hisoblanadi.

     0 qo'ysangiz so'm umuman ko'rsatilmaydi (faqat dollar qoladi).
     Noto'g'ri kurs ko'rsatgandan ko'ra hech narsa ko'rsatmagan
     yaxshiroq, shuning uchun shunday qilingan.
     ------------------------------------------------------------ */
  usdRate: 11850,

  /* ------------------------------------------------------------
     Forma yuborish sozlamasi
     ------------------------------------------------------------
     endpoint — POST qabul qiladigan manzil. To'ldirilsa, forma
     ma'lumotlari JSON ko'rinishida to'g'ridan-to'g'ri shu yerga
     ketadi va foydalanuvchi saytdan chiqmaydi. Masalan:
       endpoint: "https://formspree.io/f/XXXXXXX"
       endpoint: "https://api.tinch.uz/lead"

     endpoint bo'sh bo'lsa — zaxira rejim ishlaydi:
       fallback: "telegram" → to'ldirilgan xabar bilan Telegram ochiladi
       fallback: "email"    → to'ldirilgan xat bilan pochta ochiladi

     DIQQAT: Telegram bot tokenini bu yerga (umuman frontend kodiga)
     yozmang — u brauzerda ochiq ko'rinadi. Bot orqali avtomatik
     yuborish kerak bo'lsa, tokenni server tomonda saqlang va shu
     serverning manzilini endpoint ga qo'ying.
     ------------------------------------------------------------ */
  forms: {
    endpoint: "",
    fallback: "telegram",
    fallbackEmail: "info@tinch.uz",
  },

  /* ------------------------------------------------------------
     AKSIYA — vaqtinchalik chegirma
     ------------------------------------------------------------
     O'CHIRISH: `active` ni false qiling — tamom. Banner yo'qoladi,
     narxlar jadvallari odatdagi −10% ga qaytadi, tarif kartochkalari
     ham eski narxni ko'rsatadi. Boshqa hech qayerga tegish shart emas.

     percent — bir martalik to'lovdagi chegirma foizi. Odatdagi holat
     10%, aksiya davrida 35%. Narxlar `products.js` dagi `full`
     qiymatidan avtomatik hisoblanadi, qo'lda yozilmaydi.
     ------------------------------------------------------------ */
  promo: {
    active: true,
    percent: 35,
    until: "2026-09-30",
    untilLabel: { uz: "30-sentyabr", ru: "30 сентября" },

    badge: { uz: "−35%", ru: "−35%" },
    title: {
      uz: "Bir martalik xaridda 35% chegirma",
      ru: "Скидка 35% при разовой покупке",
    },
    text: {
      uz: "Tizimni butunlay sotib olsangiz — narxdan 35% chegirma va ustiga 1 yillik server xizmati bepul. Keyin tizim butunlay sizniki bo'ladi, oylik to'lov yo'q.",
      ru: "При полной покупке системы — скидка 35% и вдобавок 1 год серверного обслуживания бесплатно. Дальше система полностью ваша, ежемесячных платежей нет.",
    },
    deadline: {
      uz: "Chegirma 30-sentyabrgacha amal qiladi",
      ru: "Скидка действует до 30 сентября",
    },
    serverNote: {
      uz: "<b>1 yillik server xizmati bepul.</b> Birinchi yil hosting, zaxira nusxa va yangilanishlar biz tomondan. Ikkinchi yildan qo'llab-quvvatlash shartnomasi alohida rasmiylashtiriladi.",
      ru: "<b>1 год серверного обслуживания бесплатно.</b> Хостинг, резервные копии и обновления в первый год — за наш счёт. Со второго года договор поддержки оформляется отдельно.",
    },
    cta: { uz: "Chegirmadan foydalanish", ru: "Воспользоваться скидкой" },
  },

  /* ---------- Umumiy UI matnlari ---------- */
  ui: {
    skipLink: { uz: "Asosiy kontentga o'tish", ru: "Перейти к основному содержимому" },
    address: { uz: "Toshkent, O'zbekiston", ru: "Ташкент, Узбекистан" },
    phoneLabel: { uz: "Telefon", ru: "Телефон" },
    addressLabel: { uz: "Manzil", ru: "Адрес" },
    hoursLabel: { uz: "Ish vaqti", ru: "Часы работы" },
    hoursWeekdays: { uz: "Du – Ju: 9:00 – 18:00", ru: "Пн – Пт: 9:00 – 18:00" },
    hoursWeekends: { uz: "Sha – Yak: 10:00 – 16:00", ru: "Сб – Вс: 10:00 – 16:00" },
    orderCta: { uz: "Buyurtma berish", ru: "Оставить заявку" },
    orderShort: { uz: "Buyurtma", ru: "Заказать" },
    demoCta: { uz: "Demo ko'rish", ru: "Смотреть демо" },
    detailsCta: { uz: "Batafsil", ru: "Подробнее" },
    tariffsCta: { uz: "Tariflarni ko'rish", ru: "Смотреть тарифы" },
    consultCta: { uz: "Bepul konsultatsiya", ru: "Бесплатная консультация" },
    contactCta: { uz: "Bog'lanish", ru: "Связаться" },
    writeTelegram: { uz: "Telegram orqali yozish", ru: "Написать в Telegram" },
    priceOnRequest: { uz: "Narx so'rov bo'yicha", ru: "Цена по запросу" },
    /* {n} — narx. O'zbekchada qo'shimcha narxdan keyin, ruschada oldin */
    from: { uz: "{n} dan", ru: "от {n}" },
    sum: { uz: "so'm", ru: "сум" },
    rateNote: {
      uz: "So'mdagi miqdor joriy kurs bo'yicha taxminiy",
      ru: "Сумма в сумах — ориентировочно по текущему курсу",
    },
    perUserMonth: { uz: "foydalanuvchi / oy", ru: "пользователь / месяц" },
    included: { uz: "Tarifga kiritilgan", ru: "Входит в тариф" },
    notIncluded: { uz: "Ushbu tarifda mavjud emas", ru: "Недоступно в этом тарифе" },
    soon: { uz: "Tez orada", ru: "Скоро" },
    soonHint: {
      uz: "Ishlab chiqilmoqda — tarifga kiritilgan, ishga tushgach avtomatik ochiladi",
      ru: "В разработке — входит в тариф, откроется автоматически после запуска",
    },
    soonNote: {
      uz: "Bu mahsulot hozir ishlab chiqilmoqda. Ariza qoldiring — ishga tushishi bilan birinchilardan bo'lib xabar beramiz.",
      ru: "Этот продукт сейчас в разработке. Оставьте заявку — сообщим о запуске одними из первых.",
    },
    notifyCta: { uz: "Ishga tushganda xabar berish", ru: "Сообщить о запуске" },
    allFeatures: { uz: "Barcha imkoniyatlar", ru: "Все возможности" },
    featureCompare: { uz: "Tariflarni taqqoslash", ru: "Сравнение тарифов" },
    priceTable: { uz: "Narxlar jadvali", ru: "Таблица цен" },
    modules: { uz: "Modullar", ru: "Модули" },
    note: { uz: "Izoh", ru: "Примечание" },
    backHome: { uz: "Bosh sahifaga", ru: "На главную" },
    products: { uz: "Mahsulotlar", ru: "Продукты" },
    loading: { uz: "Yuklanmoqda…", ru: "Загрузка…" },
    notFound: {
      uz: "Bunday mahsulot topilmadi.",
      ru: "Такой продукт не найден.",
    },
    selectPlan: { uz: "Tarifni tanlang", ru: "Выберите тариф" },
    selectProduct: { uz: "Mahsulotni tanlang", ru: "Выберите продукт" },
  },

  /* ---------- Navigatsiya ---------- */
  nav: [
    { href: "index.html", label: { uz: "Bosh sahifa", ru: "Главная" } },
    { href: "index.html#products", label: { uz: "Mahsulotlar", ru: "Продукты" } },
    { href: "pricing.html", label: { uz: "Tariflar", ru: "Тарифы" } },
    { href: "index.html#why", label: { uz: "Nega biz", ru: "Почему мы" } },
    { href: "contacts.html", label: { uz: "Aloqa", ru: "Контакты" } },
  ],

  /* ---------- Bosh sahifa ---------- */
  home: {
    meta: {
      title: {
        uz: "Tinch — biznesni avtomatlashtirish: HR, ERP, CRM, ombor va saytlar",
        ru: "Tinch — автоматизация бизнеса: HR, ERP, CRM, склад и сайты",
      },
      description: {
        uz: "Tinch — biznesni avtomatlashtirish: Tinch Ombor, Tinch HR va Tinch Savdo, shuningdek Tinch Uylar va korporativ saytlar. Ochiq tariflar va narxlar.",
        ru: "Tinch — автоматизация бизнеса в Ташкенте: Tinch Ombor, Tinch HR и Tinch Savdo, а также Tinch Uylar и корпоративные сайты. Открытые тарифы и цены.",
      },
    },
    hero: {
      eyebrow: { uz: "Tinch ishlang", ru: "Работайте спокойно" },
      titleLead: { uz: "Korxonangizni", ru: "Переведите бизнес" },
      titleAccent: { uz: "raqamli", ru: "в цифровое" },
      titleTail: { uz: "boshqaruvga o'tkazing", ru: "управление" },
      text: {
        uz: "Xodimlar, ombor, savdo va hujjatlar — bitta tizimda. Biz O'zbekiston korxonalari uchun HR, ERP, CRM va ombor tizimlarini joriy qilamiz: aniq tariflar, ochiq narxlar, integratsiya va qo'llab-quvvatlash bilan.",
        ru: "Персонал, склад, продажи и документы — в одной системе. Мы внедряем HR, ERP, CRM и складские решения для компаний Узбекистана: понятные тарифы, открытые цены, интеграция и поддержка.",
      },
      stats: [
        { value: "5", label: { uz: "tayyor mahsulot", ru: "готовых продукта" } },
        { value: "2", label: { uz: "til: uz / ru", ru: "языка: uz / ru" } },
        { value: "24/7", label: { uz: "tizim ishlashi", ru: "работа системы" } },
      ],
    },
    /* Nom ma'nosini tushuntiradigan qisqa blok — hero bilan
       mahsulotlar orasida turadi. Ruscha matnda so'zning tarjimasi
       ham beriladi, aks holda o'yin tushunarsiz qoladi. */
    brandStrip: {
      title: { uz: "Nega «Tinch»?", ru: "Почему «Tinch»?" },
      text: {
        uz: "Chunki tizim o'rnatilgandan keyin korxonada shovqin tugaydi. Qarz qo'lda hisoblanmaydi, hujjat yo'qolmaydi, hisobot kutilmaydi, qoldiq bahsga aylanmaydi. Ish o'z-o'zidan yuradi — siz esa nihoyat tinchlanasiz.",
        ru: "«Tinch» по-узбекски — «спокойный». После внедрения системы на предприятии заканчивается шум: долг не считают вручную, документы не теряются, отчёта не ждут, остаток не становится предметом спора. Работа идёт сама — а вы наконец спокойны.",
      },
    },

    productsSection: {
      eyebrow: { uz: "Mahsulotlar", ru: "Продукты" },
      title: {
        uz: "Har bir bo'lim uchun alohida yechim",
        ru: "Отдельное решение для каждого отдела",
      },
      text: {
        uz: "Modullar alohida ham, birgalikda ham ishlaydi. Kerakligidan boshlang — keyin kengaytiring.",
        ru: "Модули работают как по отдельности, так и вместе. Начните с нужного — расширяйте позже.",
      },
      /* Ikki guruh: `main: true` mahsulotlar va qolganlari (products.js) */
      mainTitle: { uz: "Faol mahsulotlar", ru: "Активные продукты" },
      moreTitle: { uz: "Boshqa yechimlar", ru: "Другие решения" },
    },
    whySection: {
      eyebrow: { uz: "Nega Tinch", ru: "Почему Tinch" },
      title: {
        uz: "Dastur emas — ishlaydigan jarayon topshiramiz",
        ru: "Мы сдаём не программу, а работающий процесс",
      },
      items: [
        {
          icon: "shield",
          title: { uz: "Ma'lumot sizniki", ru: "Данные принадлежат вам" },
          text: {
            uz: "Tizim sizning serveringizda yoki bizning himoyalangan bulutimizda ishlaydi. Rollar, ruxsatlar va audit jurnali — barchasi nazorat ostida.",
            ru: "Система работает на вашем сервере или в нашем защищённом облаке. Роли, права и журнал аудита — всё под контролем.",
          },
        },
        {
          icon: "plug",
          title: { uz: "Integratsiya", ru: "Интеграции" },
          text: {
            uz: "Face ID qurilmalari, 1C, telefoniya, Telegram-bot va to'lov tizimlari bilan bog'laymiz. API ochiq.",
            ru: "Подключаем Face ID устройства, 1C, телефонию, Telegram-бот и платёжные системы. API открыт.",
          },
        },
        {
          icon: "gauge",
          title: { uz: "Tez ishga tushirish", ru: "Быстрый запуск" },
          text: {
            uz: "Standart konfiguratsiya 2–4 hafta ichida ishga tushadi. Ma'lumotlarni ko'chirish va xodimlarni o'qitish kiradi.",
            ru: "Стандартная конфигурация запускается за 2–4 недели. Перенос данных и обучение сотрудников включены.",
          },
        },
        {
          icon: "headset",
          title: { uz: "Qo'llab-quvvatlash", ru: "Поддержка" },
          text: {
            uz: "Texnik qo'llab-quvvatlash paketlari, yangilanishlar va SLA. Muammo — bitta murojaat masofasida.",
            ru: "Пакеты технической поддержки, обновления и SLA. Проблема — в одном обращении.",
          },
        },
        {
          icon: "globe",
          title: { uz: "Ikki tilda", ru: "На двух языках" },
          text: {
            uz: "Interfeys o'zbek va rus tillarida. Hujjat shakllari mahalliy qonunchilikka moslashtirilgan.",
            ru: "Интерфейс на узбекском и русском. Формы документов адаптированы под местное законодательство.",
          },
        },
        {
          icon: "chart",
          title: { uz: "Ochiq narxlar", ru: "Открытые цены" },
          text: {
            uz: "Tariflar saytda ko'rsatilgan. Yashirin to'lovlar yo'q — integratsiya va qo'llab-quvvatlash alohida, aniq narxda.",
            ru: "Тарифы указаны на сайте. Скрытых платежей нет — интеграция и поддержка отдельно, по чёткой цене.",
          },
        },
      ],
    },
    processSection: {
      eyebrow: { uz: "Qanday ishlaymiz", ru: "Как мы работаем" },
      title: { uz: "To'rt qadamda ishga tushiramiz", ru: "Запускаем за четыре шага" },
      steps: [
        {
          title: { uz: "Tahlil", ru: "Анализ" },
          text: {
            uz: "Jarayonlaringizni o'rganamiz, kerakli modullar va tarifni aniqlaymiz. Bepul.",
            ru: "Изучаем ваши процессы, определяем нужные модули и тариф. Бесплатно.",
          },
        },
        {
          title: { uz: "Sozlash", ru: "Настройка" },
          text: {
            uz: "Bo'limlar, lavozimlar, rollar va hujjat shakllarini korxonangizga moslaymiz.",
            ru: "Настраиваем отделы, должности, роли и формы документов под ваше предприятие.",
          },
        },
        {
          title: { uz: "Ko'chirish va integratsiya", ru: "Перенос и интеграция" },
          text: {
            uz: "Mavjud ma'lumotlarni ko'chiramiz, Face ID va boshqa qurilmalarni ulaymiz.",
            ru: "Переносим существующие данные, подключаем Face ID и другое оборудование.",
          },
        },
        {
          title: { uz: "O'qitish va qo'llab-quvvatlash", ru: "Обучение и поддержка" },
          text: {
            uz: "Xodimlarni o'qitamiz, qo'llanma beramiz va doimiy texnik yordam ko'rsatamiz.",
            ru: "Обучаем сотрудников, передаём инструкции и обеспечиваем постоянную техподдержку.",
          },
        },
      ],
    },
    ctaSection: {
      title: {
        uz: "Qaysi tarif sizga mos — 15 daqiqada aniqlaymiz",
        ru: "Определим подходящий тариф за 15 минут",
      },
      text: {
        uz: "Xodimlar sonini va kerakli modullarni ayting — biz aniq hisob-kitob va joriy etish rejasini yuboramiz.",
        ru: "Скажите количество сотрудников и нужные модули — пришлём точный расчёт и план внедрения.",
      },
    },
  },

  /* ---------- Mahsulot sahifasi ---------- */
  product: {
    navFeatures: { uz: "Imkoniyatlar", ru: "Возможности" },
    navModules: { uz: "Modullar", ru: "Модули" },
    navPricing: { uz: "Tariflar", ru: "Тарифы" },
    featuresEyebrow: { uz: "Imkoniyatlar", ru: "Возможности" },
    featuresTitle: { uz: "Qaysi vazifalarni hal qiladi", ru: "Какие задачи решает" },
    modulesEyebrow: { uz: "Tizim tarkibi", ru: "Состав системы" },
    modulesTitle: { uz: "Modullar va bo'limlar", ru: "Модули и разделы" },
    modulesText: {
      uz: "Quyidagi modullar tizim tarkibiga kiradi. Qaysi biri qaysi tarifda ochilishini «Tariflar» bo'limidagi taqqoslash jadvalidan ko'rishingiz mumkin.",
      ru: "Перечисленные модули входят в состав системы. Какой из них открыт в каком тарифе — смотрите в таблице сравнения в разделе «Тарифы».",
    },
    pricingEyebrow: { uz: "Tariflar va narxlar", ru: "Тарифы и цены" },
    pricingTitle: { uz: "O'zingizga mos tarifni tanlang", ru: "Выберите подходящий тариф" },
    otherProducts: { uz: "Boshqa mahsulotlar", ru: "Другие продукты" },
    ctaTitle: {
      uz: "Demo ko'rsatamiz va aniq hisob-kitob tayyorlaymiz",
      ru: "Покажем демо и подготовим точный расчёт",
    },
    ctaText: {
      uz: "Xodimlar sonini ayting — qaysi tarif mos kelishini va joriy etish muddatini aytamiz.",
      ru: "Назовите количество сотрудников — скажем, какой тариф подойдёт и в какой срок внедрим.",
    },
  },

  /* ---------- Tariflar sahifasi ---------- */
  pricing: {
    meta: {
      title: {
        uz: "Tariflar va narxlar — Tinch",
        ru: "Тарифы и цены — Tinch",
      },
      description: {
        uz: "Tinch mahsulotlarining tariflari va narxlari: Tinch Ombor, Tinch HR va Tinch Uylar uchun Basic, PRO va bir martalik Sale paketlari. Har bir tarifga nimalar kirishi batafsil.",
        ru: "Тарифы и цены продуктов Tinch: Tinch Ombor, Tinch HR и Tinch Uylar — Basic, PRO и разовые пакеты Sale. Подробно о том, что входит в каждый тариф.",
      },
    },
    eyebrow: { uz: "Tariflar va narxlar", ru: "Тарифы и цены" },
    title: { uz: "Ochiq narxlar, yashirin to'lovsiz", ru: "Открытые цены, без скрытых платежей" },
    text: {
      uz: "Mahsulotni tanlang — tariflar, ularga kiradigan imkoniyatlar va xodimlar soniga qarab narxlar jadvalini ko'rasiz.",
      ru: "Выберите продукт — увидите тарифы, входящие в них возможности и таблицу цен по количеству сотрудников.",
    },
  },

  /* ---------- Aloqa sahifasi ---------- */
  contacts: {
    meta: {
      title: {
        uz: "Aloqa: telefon, Telegram va manzil — Tinch",
        ru: "Контакты: телефон, Telegram и адрес — Tinch",
      },
      description: {
        uz: "Tinch bilan bog'laning: Toshkent, +998 (94) 834-95-55, info@tinch.uz, Telegram @AbduDevUz.",
        ru: "Свяжитесь с Tinch: Ташкент, +998 (94) 834-95-55, info@tinch.uz, Telegram @AbduDevUz.",
      },
    },
    eyebrow: { uz: "Aloqa", ru: "Контакты" },
    title: { uz: "Loyihangizni muhokama qilamiz", ru: "Обсудим ваш проект" },
    text: {
      uz: "Savolingiz bormi yoki hisob-kitob kerakmi — yozing. Ish kunlari davomida javob beramiz.",
      ru: "Есть вопрос или нужен расчёт — напишите. Отвечаем в течение рабочего дня.",
    },
  },

  /* ---------- Buyurtma sahifasi ---------- */
  order: {
    meta: {
      title: { uz: "Buyurtma berish — Tinch", ru: "Оставить заявку — Tinch" },
      description: {
        uz: "Tinch mahsulotlariga buyurtma va bepul konsultatsiya so'rovi.",
        ru: "Заявка на продукты Tinch и запрос бесплатной консультации.",
      },
    },
    eyebrow: { uz: "Buyurtma", ru: "Заявка" },
    title: { uz: "So'rov qoldiring", ru: "Оставьте заявку" },
    text: {
      uz: "Formani to'ldiring — mutaxassisimiz 1 ish kuni ichida bog'lanadi va aniq taklif tayyorlaydi.",
      ru: "Заполните форму — специалист свяжется в течение 1 рабочего дня и подготовит точное предложение.",
    },
    fields: {
      name: { uz: "Ismingiz", ru: "Ваше имя" },
      namePh: { uz: "Masalan: Aziz Karimov", ru: "Например: Азиз Каримов" },
      company: { uz: "Korxona nomi", ru: "Название компании" },
      companyPh: { uz: "Masalan: Tinch Group MChJ", ru: "Например: ООО Tinch Group" },
      phone: { uz: "Telefon", ru: "Телефон" },
      phonePh: { uz: "Masalan: +998 90 123 45 67", ru: "Например: +998 90 123 45 67" },
      email: { uz: "Email", ru: "Email" },
      emailPh: { uz: "sizning@email.uz", ru: "ваш@email.uz" },
      product: { uz: "Mahsulot", ru: "Продукт" },
      plan: { uz: "Tarif", ru: "Тариф" },
      /* Soni maydoni mahsulotga qarab: products.js → orderCount */
      employees: { uz: "Xodimlar soni", ru: "Количество сотрудников" },
      employeesPh: { uz: "Masalan: 45", ru: "Например: 45" },
      users: { uz: "Foydalanuvchilar soni", ru: "Количество пользователей" },
      usersPh: { uz: "Masalan: 10", ru: "Например: 10" },
      message: { uz: "Xabar", ru: "Сообщение" },
      messagePh: {
        uz: "Qaysi jarayonlarni avtomatlashtirmoqchisiz?",
        ru: "Какие процессы хотите автоматизировать?",
      },
      submit: { uz: "So'rovni yuborish", ru: "Отправить заявку" },
      sending: { uz: "Yuborilmoqda…", ru: "Отправка…" },
      any: { uz: "Aniq emas / maslahat kerak", ru: "Не определился / нужен совет" },
    },
    validation: {
      required: { uz: "Bu maydon to'ldirilishi shart", ru: "Это поле обязательно" },
      phone: { uz: "Telefon raqamini to'liq kiriting", ru: "Введите номер телефона полностью" },
      email: { uz: "Email manzil noto'g'ri", ru: "Некорректный email" },
    },
    success: {
      uz: "Rahmat! So'rovingiz qabul qilindi — tez orada bog'lanamiz.",
      ru: "Спасибо! Заявка принята — свяжемся с вами в ближайшее время.",
    },
    sentTelegram: {
      uz: "Telegram ochildi va xabar tayyor — «Yuborish» tugmasini bosing.",
      ru: "Telegram открыт, сообщение готово — нажмите «Отправить».",
    },
    sentEmail: {
      uz: "Pochta ochildi va xat tayyor — «Yuborish» tugmasini bosing.",
      ru: "Почта открыта, письмо готово — нажмите «Отправить».",
    },
    /* Zaxira rejimda Telegram/pochta ochilmasa — ikki yo'l */
    notOpened: { uz: "Telegram ochilmadimi?", ru: "Telegram не открылся?" },
    notOpenedEmail: { uz: "Pochta ochilmadimi?", ru: "Почта не открылась?" },
    copyCta: { uz: "Xabarni nusxalash", ru: "Скопировать сообщение" },
    copied: { uz: "Nusxalandi — @AbduDevUz ga yuboring", ru: "Скопировано — отправьте @AbduDevUz" },
    viaEmail: { uz: "Email orqali yuborish", ru: "Отправить по email" },
    /* Forma ostidagi rozilik yozuvi. Matnni yurist ko'rib chiqishi kerak. */
    consent: {
      uz: "«So'rovni yuborish» tugmasini bosib, siz kiritgan ma'lumotlarni so'rovingizga javob berish uchun qayta ishlashimizga rozilik bildirasiz. Batafsil: <a href=\"maxfiylik.html\">Maxfiylik siyosati</a>.",
      ru: "Нажимая «Отправить заявку», вы соглашаетесь на обработку введённых данных для ответа на вашу заявку. Подробнее: <a href=\"maxfiylik.html\">Политика конфиденциальности</a>.",
    },
    error: {
      uz: "Yuborishda xatolik. Iltimos, Telegram yoki telefon orqali bog'laning.",
      ru: "Ошибка при отправке. Пожалуйста, свяжитесь через Telegram или по телефону.",
    },
  },

  /* ---------- Maxfiylik siyosati (maxfiylik.html) ----------
     DIQQAT: bu matnni saytga qo'yishdan oldin yurist ko'rib chiqsin.
     Ayniqsa: ma'lumot Telegram (xorijiy xizmat) orqali o'tishi va
     O'zbekistonda shaxsga doir ma'lumotlarni saqlash talablari. */
  privacy: {
    meta: {
      title: { uz: "Maxfiylik siyosati — Tinch", ru: "Политика конфиденциальности — Tinch" },
      description: {
        uz: "Tinch saytidagi formalar orqali qanday ma'lumot yig'iladi, nima uchun ishlatiladi va uni qanday o'chirish mumkin.",
        ru: "Какие данные собираются через формы на сайте Tinch, для чего используются и как их удалить.",
      },
    },
    eyebrow: { uz: "Hujjatlar", ru: "Документы" },
    title: { uz: "Maxfiylik siyosati", ru: "Политика конфиденциальности" },
    updated: { uz: "Oxirgi yangilanish: 17-sentyabr 2026", ru: "Последнее обновление: 17 сентября 2026" },
    body: {
      uz:
        "<h2>Kim ma'lumotlarni qayta ishlaydi</h2>" +
        "<p>Tinch (tinch.uz) — Toshkentdagi dasturiy ta'minot kompaniyasi. Savollar bo'yicha: <a href=\"mailto:info@tinch.uz\">info@tinch.uz</a>, <a href=\"tel:+998948349555\">+998 (94) 834-95-55</a>.</p>" +
        "<h2>Qanday ma'lumotlar yig'iladi</h2>" +
        "<p>Buyurtma yoki aloqa formasiga o'zingiz kiritgan ma'lumotlar: ism, korxona nomi, telefon, email, tanlangan mahsulot va tarif, xodimlar yoki foydalanuvchilar soni, xabar matni. Shuningdek, so'rov qaysi sahifadan va qaysi tilda yuborilgani.</p>" +
        "<h2>Nima uchun</h2>" +
        "<p>Faqat so'rovingizga javob berish uchun: siz bilan bog'lanish, tarif tanlashda maslahat berish va narx taklifini tayyorlash. Ma'lumotlaringiz sotilmaydi va reklama uchun uchinchi shaxslarga berilmaydi.</p>" +
        "<h2>Ma'lumot qanday yetib keladi</h2>" +
        "<p>«So'rovni yuborish» tugmasini bosganingizda to'ldirilgan xabar Telegram ilovasida yoki pochta dasturingizda ochiladi va uni o'zingiz yuborasiz. Bunda xabar Telegram yoki pochta xizmati orqali o'tadi va ularning qoidalari ham amal qiladi.</p>" +
        "<h2>Qancha saqlanadi</h2>" +
        "<p>So'rovingiz bo'yicha ish davom etayotgan vaqtda. Keyin, agar hamkorlik boshlanmagan bo'lsa, so'rashingiz bilan o'chiriladi.</p>" +
        "<h2>Brauzerda saqlanadigan ma'lumot</h2>" +
        "<p>Sayt tanlagan tilingizni brauzeringizda eslab qoladi — bu ma'lumot bizga yuborilmaydi. Saytga tashriflar statistikasi xizmatlari (Yandex Metrika, Google Analytics) ulangan bo'lsa, ular cookie-fayllar orqali anonim statistika yig'adi.</p>" +
        "<h2>Sizning huquqlaringiz</h2>" +
        "<p>Siz haqingizda qanday ma'lumot borligini bilish, uni tuzatish yoki o'chirishni so'rash va roziligingizni qaytarib olish huquqiga egasiz. Buning uchun <a href=\"mailto:info@tinch.uz\">info@tinch.uz</a> ga yozing yoki qo'ng'iroq qiling.</p>" +
        "<h2>Qonunchilik</h2>" +
        "<p>Ushbu siyosat O'zbekiston Respublikasining «Shaxsga doir ma'lumotlar to'g'risida»gi qonuni asosida tuzilgan.</p>",
      ru:
        "<h2>Кто обрабатывает данные</h2>" +
        "<p>Tinch (tinch.uz) — компания по разработке программного обеспечения в Ташкенте. По вопросам: <a href=\"mailto:info@tinch.uz\">info@tinch.uz</a>, <a href=\"tel:+998948349555\">+998 (94) 834-95-55</a>.</p>" +
        "<h2>Какие данные собираются</h2>" +
        "<p>Данные, которые вы сами вводите в форму заявки или обратной связи: имя, название компании, телефон, email, выбранный продукт и тариф, количество сотрудников или пользователей, текст сообщения. А также с какой страницы и на каком языке отправлена заявка.</p>" +
        "<h2>Для чего</h2>" +
        "<p>Только чтобы ответить на вашу заявку: связаться с вами, помочь выбрать тариф и подготовить ценовое предложение. Ваши данные не продаются и не передаются третьим лицам для рекламы.</p>" +
        "<h2>Как данные до нас доходят</h2>" +
        "<p>При нажатии «Отправить заявку» заполненное сообщение открывается в Telegram или в вашей почтовой программе, и отправляете его вы сами. В этом случае сообщение проходит через Telegram или почтовый сервис, и действуют также их правила.</p>" +
        "<h2>Сколько хранятся</h2>" +
        "<p>Пока идёт работа по вашей заявке. Если сотрудничество не началось — удаляются по вашему запросу.</p>" +
        "<h2>Что хранится в браузере</h2>" +
        "<p>Сайт запоминает выбранный язык в вашем браузере — эти данные нам не передаются. Если к сайту подключены сервисы статистики посещений (Яндекс Метрика, Google Analytics), они собирают анонимную статистику с помощью cookie-файлов.</p>" +
        "<h2>Ваши права</h2>" +
        "<p>Вы вправе узнать, какие данные о вас есть, попросить исправить или удалить их и отозвать согласие. Для этого напишите на <a href=\"mailto:info@tinch.uz\">info@tinch.uz</a> или позвоните.</p>" +
        "<h2>Законодательство</h2>" +
        "<p>Настоящая политика составлена на основе Закона Республики Узбекистан «О персональных данных».</p>",
    },
  },

  /* ---------- 404 sahifasi ---------- */
  notFound: {
    meta: {
      title: { uz: "Sahifa topilmadi — Tinch", ru: "Страница не найдена — Tinch" },
      description: {
        uz: "So'ralgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan. Bosh sahifaga qayting yoki mahsulotlar ro'yxatidan kerakligini tanlang.",
        ru: "Запрошенная страница не существует или была перемещена. Вернитесь на главную или выберите нужный продукт из списка.",
      },
    },
    text: {
      uz: "Bunday sahifa yo'q — manzil noto'g'ri yozilgan yoki sahifa ko'chirilgan bo'lishi mumkin. Quyidagi mahsulotlardan birini tanlang yoki bosh sahifaga qayting.",
      ru: "Такой страницы нет — возможно, адрес указан неверно или страница была перемещена. Выберите один из продуктов ниже или вернитесь на главную.",
    },
  },

  /* ---------- Footer ---------- */
  footer: {
    about: {
      uz: "Tinch — Toshkentdagi dasturiy ta'minot kompaniyasi. 2019-yildan beri O'zbekiston korxonalari uchun HR, ERP, CRM va ombor tizimlarini ishlab chiqamiz va joriy qilamiz.",
      ru: "Tinch — компания по разработке ПО в Ташкенте. С 2019 года разрабатываем и внедряем HR, ERP, CRM и складские системы для предприятий Узбекистана.",
    },
    colProducts: { uz: "Mahsulotlar", ru: "Продукты" },
    colCompany: { uz: "Kompaniya", ru: "Компания" },
    colContacts: { uz: "Aloqa", ru: "Контакты" },
    companyLinks: [
      { href: "index.html#why", label: { uz: "Nega biz", ru: "Почему мы" } },
      { href: "pricing.html", label: { uz: "Tariflar", ru: "Тарифы" } },
      { href: "contacts.html", label: { uz: "Aloqa", ru: "Контакты" } },
      { href: "order.html", label: { uz: "Buyurtma berish", ru: "Оставить заявку" } },
      { href: "maxfiylik.html", label: { uz: "Maxfiylik siyosati", ru: "Политика конфиденциальности" } },
    ],
    rights: {
      uz: "Barcha huquqlar himoyalangan.",
      ru: "Все права защищены.",
    },
  },
};
