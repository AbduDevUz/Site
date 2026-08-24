/* ============================================================
   TINCH SOFT — Mahsulotlar va tariflar bazasi
   ------------------------------------------------------------
   Bu fayl saytdagi BARCHA mahsulot kontentining yagona manbasi.
   HTML fayllarga hech qanday matn yozilmaydi — hammasi shu yerdan.

   YANGI MAHSULOT QO'SHISH:
     1. PRODUCTS massiviga yangi obyekt qo'shing (quyidagi shablon bo'yicha).
     2. Tamom. Bosh sahifa, tariflar, buyurtma sahifasi avtomatik yangilanadi.

   MAHSULOT OBYEKTI:
     id            — URL kaliti: product.html?id=hr
     icon          — js/icons.js dagi ikonka nomi
     image         — kartochka rasmi
     name          — mahsulot nomi { uz, ru }
     tagline       — bitta qatorli tavsif
     short         — kartochka uchun qisqa matn
     intro         — mahsulot sahifasidagi kirish matni
     tags          — kartochkadagi kichik yorliqlar
     highlights    — 4–6 ta asosiy afzallik
     pricingModes  — tarif rejimlari (obuna / bir martalik)
     featureGroups — tariflar taqqoslash matritsasi
     notes         — eslatmalar (integratsiya narxi va h.k.)
   ============================================================ */

window.PRODUCTS = [
  /* ==========================================================
     1. TINCH HR
     ========================================================== */
  {
    id: "hr",
    icon: "users",
    image: { webp: "./images/opt/hr.webp", jpg: "./images/opt/hr.jpg" },
    featured: true,
    name: { uz: "Tinch HR", ru: "Tinch HR" },
    tagline: {
      uz: "Xodimlar bo'limini avtomatlashtirish tizimi",
      ru: "Система автоматизации отдела кадров",
    },
    short: {
      uz: "Xodimlar kartalari, Face ID davomat, ta'til va kasallik varaqalari, ishga yollash (ATS), hujjat aylanishi va vazifalar — bitta tizimda.",
      ru: "Карточки сотрудников, Face ID учёт, отпуска и больничные, подбор персонала (ATS), документооборот и задачи — в одной системе.",
    },
    intro: {
      uz: "Tinch HR — kadrlar bo'limining kundalik ishini to'liq raqamlashtiradigan tizim. Xodim ishga qabul qilinganidan ishdan bo'shatilgunigacha bo'lgan butun yo'l bitta bazada saqlanadi: shaxsiy karta, mehnat tarixi, hujjatlar, davomat, ta'tillar, vazifalar va hisobotlar. Face ID qurilmalari bilan bevosita bog'lanadi va tabel avtomatik shakllanadi.",
      ru: "Tinch HR — система, которая полностью оцифровывает ежедневную работу отдела кадров. Весь путь сотрудника от приёма до увольнения хранится в одной базе: личная карточка, трудовая история, документы, посещаемость, отпуска, задачи и отчёты. Напрямую подключается к устройствам Face ID, табель формируется автоматически.",
    },
    tags: [
      { uz: "Face ID", ru: "Face ID" },
      { uz: "ATS", ru: "ATS" },
      { uz: "E-imzo", ru: "Э-подпись" },
      { uz: "Kanban", ru: "Канбан" },
    ],
    highlights: [
      {
        icon: "id-card",
        title: { uz: "Xodimning elektron kartasi", ru: "Электронная карточка сотрудника" },
        text: {
          uz: "Shaxsiy, ta'lim va oila ma'lumotlari, mehnat tarixi, maosh, hujjatlar arxivi — bitta ekranda.",
          ru: "Личные данные, образование, семья, трудовая история, зарплата, архив документов — на одном экране.",
        },
      },
      {
        icon: "scan-face",
        title: { uz: "Face ID va tabel", ru: "Face ID и табель" },
        text: {
          uz: "Biometrik qurilmalar to'g'ridan-to'g'ri ulanadi. Kelish-ketish avtomatik yoziladi, oylik tabel o'zi shakllanadi.",
          ru: "Биометрические устройства подключаются напрямую. Приход-уход фиксируется автоматически, месячный табель формируется сам.",
        },
      },
      {
        icon: "user-plus",
        title: { uz: "Ishga yollash (ATS)", ru: "Подбор персонала (ATS)" },
        text: {
          uz: "Vakansiya e'loni, onlayn arizalar, nomzodlarni saralash va baholash, bosqichma-bosqich pipeline, oferta va buyruq.",
          ru: "Публикация вакансий, онлайн-заявки, отбор и оценка кандидатов, пошаговый pipeline, оффер и приказ.",
        },
      },
      {
        icon: "file-signature",
        title: { uz: "Hujjat aylanishi", ru: "Документооборот" },
        text: {
          uz: "Elektron imzo, ko'p bosqichli muvofiqlashtirish, maxfiy hujjatlar bo'limi, hujjat tarixi va chat.",
          ru: "Электронная подпись, многоэтапное согласование, раздел конфиденциальных документов, история и чат.",
        },
      },
      {
        icon: "layout-board",
        title: { uz: "Vazifalar va kanban", ru: "Задачи и канбан" },
        text: {
          uz: "Drag-and-drop doska, vazifa a'zolari va muddatlar, izohlar va muhokama.",
          ru: "Drag-and-drop доска, участники и сроки задач, комментарии и обсуждение.",
        },
      },
      {
        icon: "chart",
        title: { uz: "Dashboard va tahlil", ru: "Дашборд и аналитика" },
        text: {
          uz: "Yollash statistikasi, yosh va tajriba kesimi, ishdan ketish sabablari diagrammasi.",
          ru: "Статистика найма, срез по возрасту и стажу, диаграмма причин увольнений.",
        },
      },
    ],

    /* ---------- Tarif rejimlari ---------- */
    pricingModes: [
      {
        id: "subscription",
        label: { uz: "Oylik obuna", ru: "Ежемесячная подписка" },
        description: {
          uz: "Foydalanuvchi soniga qarab oylik to'lov. Yangilanishlar va tizim ishlashi kiritilgan.",
          ru: "Ежемесячная оплата по количеству пользователей. Обновления и работа системы включены.",
        },
        showMatrix: true,
        plans: [
          {
            id: "basic",
            name: { uz: "Tinch HR Basic", ru: "Tinch HR Basic" },
            desc: {
              uz: "Kadrlar hisobi, Face ID davomat va asosiy ishga yollash jarayoni bilan boshlash uchun.",
              ru: "Для старта: кадровый учёт, Face ID посещаемость и базовый процесс найма.",
            },
            price: { amount: 27000, currency: "UZS", period: { uz: "foydalanuvchi / oy", ru: "пользователь / месяц" } },
            highlights: [
              { uz: "Xodimlarning elektron kartalari", ru: "Электронные карточки сотрудников" },
              { uz: "Face ID qurilmalarini ulash", ru: "Подключение устройств Face ID" },
              { uz: "Ishga yollash: e'lon, ariza, saralash", ru: "Найм: вакансия, заявка, отбор" },
              { uz: "Elektron imzo bilan hujjat almashish", ru: "Обмен документами с э-подписью" },
              { uz: "Kanban doskasi va audit jurnali", ru: "Канбан-доска и журнал аудита" },
            ],
          },
          {
            id: "pro",
            name: { uz: "Tinch HR PRO", ru: "Tinch HR PRO" },
            badge: { uz: "Tavsiya etiladi", ru: "Рекомендуем" },
            featured: true,
            desc: {
              uz: "Barcha modullar to'liq ochiq: to'liq tabel, maosh, ko'p bosqichli muvofiqlashtirish, rollar matritsasi.",
              ru: "Все модули открыты полностью: полный табель, зарплата, многоэтапное согласование, матрица ролей.",
            },
            price: { amount: 35000, currency: "UZS", period: { uz: "foydalanuvchi / oy", ru: "пользователь / месяц" } },
            highlights: [
              { uz: "Basic tarifidagi barcha imkoniyatlar", ru: "Все возможности тарифа Basic" },
              { uz: "To'liq oylik tabel va maosh ma'lumotlari", ru: "Полный месячный табель и данные о зарплате" },
              { uz: "Kasallik varag'i va o'z ma'lumotini tahrirlash", ru: "Больничный и редактирование своих данных" },
              { uz: "Ko'p bosqichli muvofiqlashtirish va maxfiy hujjatlar", ru: "Многоэтапное согласование и конфиденциальные документы" },
              { uz: "Rollar matritsasi va kirish jurnali", ru: "Матрица ролей и журнал входов" },
            ],
          },
        ],
        priceTables: [
          {
            title: { uz: "Tinch HR Basic — narxlar jadvali", ru: "Tinch HR Basic — таблица цен" },
            columns: [
              { key: "name", label: { uz: "Nomi", ru: "Название" } },
              { key: "employees", label: { uz: "Xodimlar soni", ru: "Кол-во сотрудников" } },
              { key: "total", label: { uz: "Narxi", ru: "Стоимость" }, strong: true },
              { key: "perEmployee", label: { uz: "Har bir xodim uchun", ru: "За сотрудника" }, quiet: true },
            ],
            rows: [
              { name: "Tinch HR Basic 20", employees: "15", total: "405 000 UZS", perEmployee: "27 000 UZS" },
              { name: "Tinch HR Basic 50", employees: "45", total: "1 035 000 UZS", perEmployee: "25 000 UZS" },
              { name: "Tinch HR Basic 100", employees: "90", total: "2 070 000 UZS", perEmployee: "23 000 UZS" },
            ],
            foot: {
              uz: "<b>Texnik qo'llab-quvvatlash:</b> 5 murojaat — 400 000 UZS / oyiga",
              ru: "<b>Техническая поддержка:</b> 5 обращений — 400 000 UZS / месяц",
            },
          },
          {
            title: { uz: "Tinch HR PRO — narxlar jadvali", ru: "Tinch HR PRO — таблица цен" },
            columns: [
              { key: "name", label: { uz: "Nomi", ru: "Название" } },
              { key: "employees", label: { uz: "Xodimlar soni", ru: "Кол-во сотрудников" } },
              { key: "total", label: { uz: "Narxi", ru: "Стоимость" }, strong: true },
              { key: "perEmployee", label: { uz: "Har bir xodim uchun", ru: "За сотрудника" }, quiet: true },
            ],
            rows: [
              { name: "Tinch HR PRO 20", employees: "15", total: "525 000 UZS", perEmployee: "35 000 UZS" },
              { name: "Tinch HR PRO 50", employees: "45", total: "1 485 000 UZS", perEmployee: "33 000 UZS" },
              { name: "Tinch HR PRO 100", employees: "90", total: "2 700 000 UZS", perEmployee: "30 000 UZS" },
            ],
            foot: {
              uz: "<b>Texnik qo'llab-quvvatlash:</b> 5 murojaat — 400 000 UZS / oyiga",
              ru: "<b>Техническая поддержка:</b> 5 обращений — 400 000 UZS / месяц",
            },
          },
        ],
        notes: [
          {
            type: "info",
            text: {
              uz: "<b>Eslatma:</b> ushbu summa integratsiya summasini o'z ichiga olmaydi. Bitta uskunani integratsiyalash miqdori <b>400 AQSh dollaridan</b> boshlanadi (tanlangan uskunaga qarab).",
              ru: "<b>Примечание:</b> указанная сумма не включает стоимость интеграции. Интеграция одного устройства — <b>от 400 долларов США</b> (в зависимости от выбранного оборудования).",
            },
          },
        ],
      },
      {
        id: "onetime",
        label: { uz: "Bir martalik xarid", ru: "Разовая покупка" },
        badge: { uz: "Tinch HR Sale", ru: "Tinch HR Sale" },
        description: {
          uz: "Tizimni to'liq sotib olish: bir marotaba yoki bo'lib to'lash imkoniyati bilan.",
          ru: "Полная покупка системы: единовременно или в рассрочку.",
        },
        showMatrix: false,
        plans: [],
        priceTables: [
          {
            title: { uz: "Tinch HR Sale — narxlar jadvali", ru: "Tinch HR Sale — таблица цен" },
            columns: [
              { key: "name", label: { uz: "Tarif", ru: "Тариф" } },
              { key: "employees", label: { uz: "Xodimlar soni", ru: "Кол-во сотрудников" } },
              { key: "installment", label: { uz: "Bo'lib to'lash", ru: "Рассрочка" } },
              { key: "onceHtml", label: { uz: "Bir marotaba", ru: "Единовременно" }, strong: true, html: true },
            ],
            rows: [
              { name: "Start", employees: "40", installment: "1 500 USD × 3", onceHtml: '4 050 USD <span class="cell-off">−10%</span>' },
              { name: "Progress", employees: "90", installment: "3 000 USD × 3", onceHtml: '8 000 USD <span class="cell-off">−10%</span>' },
              { name: "Expert", employees: "160", installment: "3 000 USD × 4", onceHtml: '10 800 USD <span class="cell-off">−10%</span>' },
              { name: "Premium", employees: "300+", installment: "3 000 USD × 6", onceHtml: '16 200 USD <span class="cell-off">−10%</span>' },
            ],
            foot: {
              uz: "<b>Izoh:</b> «Bir marotaba» ustunidagi narxlar to'liq oldindan to'lovda 10% chegirma bilan ko'rsatilgan.",
              ru: "<b>Примечание:</b> цены в колонке «Единовременно» указаны со скидкой 10% при полной предоплате.",
            },
          },
        ],
        notes: [
          {
            type: "info",
            text: {
              uz: "<b>Eslatma:</b> ushbu summa integratsiya summasini o'z ichiga olmaydi. <b>500 dan ortiq</b> xodimi bo'lgan kompaniyalarda narxlar alohida kelishiladi.",
              ru: "<b>Примечание:</b> указанная сумма не включает стоимость интеграции. Для компаний с <b>более чем 500</b> сотрудниками цены согласовываются отдельно.",
            },
          },
        ],
      },
    ],

    /* ---------- Tariflar taqqoslash matritsasi ---------- */
    matrixPlans: ["basic", "pro"],
    featureGroups: [
      {
        title: { uz: "Dashboard va statistika", ru: "Дашборд и статистика" },
        items: [
          { label: { uz: "Asosiy dashboard", ru: "Основной дашборд" }, plans: { basic: true, pro: true } },
          { label: { uz: "Asosiy HR hisobotlar", ru: "Базовые HR-отчёты" }, plans: { basic: true, pro: true } },
          { label: { uz: "Statistika va tahlil grafiklari", ru: "Графики статистики и аналитики" }, plans: { basic: true, pro: true } },
          { label: { uz: "Oylik yollash statistikasi", ru: "Ежемесячная статистика найма" }, plans: { basic: false, pro: true } },
          { label: { uz: "Yosh va tajriba guruhlari grafigi", ru: "График по возрасту и стажу" }, plans: { basic: false, pro: true } },
          { label: { uz: "Ishdan ketish sabablari diagrammasi", ru: "Диаграмма причин увольнений" }, plans: { basic: false, pro: true } },
        ],
      },
      {
        title: { uz: "Xodimlar boshqaruvi", ru: "Управление сотрудниками" },
        items: [
          { label: { uz: "Xodimlarning elektron kartalari", ru: "Электронные карточки сотрудников" }, plans: { basic: true, pro: true } },
          { label: { uz: "Shaxsiy, ta'lim va oila ma'lumotlari", ru: "Личные данные, образование, семья" }, plans: { basic: true, pro: true } },
          { label: { uz: "Maosh ma'lumotlari", ru: "Данные о заработной плате" }, plans: { basic: false, pro: true } },
          { label: { uz: "Mehnat tarixi", ru: "Трудовая история" }, plans: { basic: false, pro: true } },
          { label: { uz: "Face ID (biometrik)", ru: "Face ID (биометрия)" }, plans: { basic: true, pro: true } },
          { label: { uz: "Fayllar va hujjatlar arxivi", ru: "Архив файлов и документов" }, plans: { basic: true, pro: true } },
          { label: { uz: "Ishdan bo'shatish moduli", ru: "Модуль увольнения" }, plans: { basic: true, pro: true } },
          { label: { uz: "Sinov muddati boshqaruvi", ru: "Управление испытательным сроком" }, plans: { basic: true, pro: true } },
        ],
      },
      {
        title: { uz: "Xodimning shaxsiy kabineti", ru: "Личный кабинет сотрудника" },
        items: [
          { label: { uz: "O'z ma'lumotlarini ko'rish", ru: "Просмотр своих данных" }, plans: { basic: true, pro: true } },
          { label: { uz: "Ma'lumotlarni tahrirlash", ru: "Редактирование данных" }, plans: { basic: false, pro: true } },
          { label: { uz: "Ta'tilga ariza yuborish", ru: "Заявление на отпуск" }, plans: { basic: true, pro: true } },
          { label: { uz: "Kasallik varag'iga ariza", ru: "Заявление на больничный" }, plans: { basic: false, pro: true } },
          { label: { uz: "Onlayn ma'lumotnoma olish", ru: "Онлайн-получение справок" }, plans: { basic: true, pro: true } },
        ],
      },
      {
        title: { uz: "Face ID qurilmasiga ulanish va API", ru: "Подключение к Face ID и API" },
        items: [
          { label: { uz: "Qurilmalarni integratsiya qilish", ru: "Интеграция оборудования" }, plans: { basic: true, pro: true } },
          { label: { uz: "Ma'lumot almashish", ru: "Обмен данными" }, plans: { basic: true, pro: true } },
          { label: { uz: "To'liq oylik ma'lumot (Tabel)", ru: "Полный месячный отчёт (Табель)" }, plans: { basic: false, pro: true } },
        ],
      },
      {
        title: { uz: "Ishga yollash (ATS)", ru: "Подбор персонала (ATS)" },
        items: [
          { label: { uz: "Vakansiyalarni e'lon qilish", ru: "Публикация вакансий" }, plans: { basic: true, pro: true } },
          { label: { uz: "Onlayn ariza qabul qilish", ru: "Приём онлайн-заявок" }, plans: { basic: true, pro: true } },
          { label: { uz: "Nomzodlarni saralash", ru: "Отбор кандидатов" }, plans: { basic: true, pro: true } },
          { label: { uz: "Nomzodlarni baholash", ru: "Оценка кандидатов" }, plans: { basic: false, pro: true } },
          { label: { uz: "Yollash bosqichlarini boshqarish", ru: "Управление этапами найма" }, plans: { basic: true, pro: true } },
          { label: { uz: "Maosh taklifi (oferta)", ru: "Предложение по зарплате (оффер)" }, plans: { basic: false, pro: true } },
          { label: { uz: "Shartnoma va buyruq hujjatlari", ru: "Договоры и приказы" }, plans: { basic: false, pro: true } },
        ],
      },
      {
        title: { uz: "Hujjat aylanishi", ru: "Документооборот" },
        items: [
          { label: { uz: "Hujjatlarni yuborish va qabul qilish", ru: "Отправка и приём документов" }, plans: { basic: true, pro: true } },
          { label: { uz: "Elektron imzo", ru: "Электронная подпись" }, plans: { basic: true, pro: true } },
          { label: { uz: "Ko'p bosqichli muvofiqlashtirish (approval)", ru: "Многоэтапное согласование (approval)" }, plans: { basic: false, pro: true } },
          { label: { uz: "Hujjat arxivi va ro'yxatga olish", ru: "Архив и регистрация документов" }, plans: { basic: false, pro: true } },
          { label: { uz: "Maxfiy hujjatlar bo'limi", ru: "Раздел конфиденциальных документов" }, plans: { basic: false, pro: true } },
          { label: { uz: "Hujjat tarixi va chat", ru: "История документа и чат" }, plans: { basic: false, pro: true } },
        ],
      },
      {
        title: { uz: "Vazifalar boshqaruvi", ru: "Управление задачами" },
        items: [
          { label: { uz: "Kanban doskasi", ru: "Канбан-доска" }, plans: { basic: true, pro: true } },
          { label: { uz: "Drag-and-drop boshqaruv", ru: "Управление drag-and-drop" }, plans: { basic: false, pro: true } },
          { label: { uz: "Vazifa a'zolari va muddatlar", ru: "Участники задач и сроки" }, plans: { basic: false, pro: true } },
          { label: { uz: "Vazifa izohlari va muhokama", ru: "Комментарии и обсуждение задач" }, plans: { basic: false, pro: true } },
        ],
      },
      {
        title: { uz: "Foydalanuvchi boshqaruvi", ru: "Управление пользователями" },
        items: [
          { label: { uz: "Audit jurnali", ru: "Журнал аудита" }, plans: { basic: true, pro: true } },
          { label: { uz: "Rollar va ruxsatnomalar matritsasi", ru: "Матрица ролей и прав доступа" }, plans: { basic: false, pro: true } },
          { label: { uz: "Kirish jurnali (auth logs)", ru: "Журнал входов (auth logs)" }, plans: { basic: false, pro: true } },
        ],
      },
      {
        title: { uz: "Sozlamalar", ru: "Настройки" },
        items: [
          { label: { uz: "Bo'limlar, lavozimlar, filiallar", ru: "Отделы, должности, филиалы" }, plans: { basic: true, pro: true } },
          { label: { uz: "Ish vaqti jadvali va bayram kunlari", ru: "График работы и праздничные дни" }, plans: { basic: true, pro: true } },
          { label: { uz: "Ko'nikmalar, talablar, manbalar", ru: "Навыки, требования, источники" }, plans: { basic: true, pro: true } },
          { label: { uz: "Valyuta, til, vaqt mintaqasi", ru: "Валюта, язык, часовой пояс" }, plans: { basic: true, pro: true } },
          { label: { uz: "Yollash bosqichlari (pipeline)", ru: "Этапы найма (pipeline)" }, plans: { basic: true, pro: true } },
          { label: { uz: "Davlatlar, viloyatlar, shaharlar", ru: "Страны, регионы, города" }, plans: { basic: false, pro: true } },
        ],
      },
    ],
  },

  /* ==========================================================
     2. ERP
     ========================================================== */
  {
    id: "erp",
    icon: "settings",
    image: { webp: "./images/opt/erp.webp", jpg: "./images/opt/erp.jpg" },
    name: { uz: "Tinch ERP", ru: "Tinch ERP" },
    tagline: {
      uz: "Korxona resurslarini yagona tizimda boshqarish",
      ru: "Управление ресурсами предприятия в единой системе",
    },
    short: {
      uz: "Ombor, ishlab chiqarish, yetkazib berish, buxgalteriya, xodimlar va moliya — barchasi bitta ma'lumotlar bazasida.",
      ru: "Склад, производство, доставка, бухгалтерия, персонал и финансы — всё в одной базе данных.",
    },
    intro: {
      uz: "Tinch ERP — korxonaning barcha bo'limlarini bitta axborot maydoniga birlashtiradigan tizim. Ishlab chiqarish rejasi, xomashyo qoldig'i, buyurtmalar, yetkazib berish va moliyaviy hisobotlar real vaqtda bir-biri bilan bog'lanadi. Bu qaror qabul qilish tezligini oshiradi va bo'limlar orasidagi ma'lumot uzilishini yo'q qiladi.",
      ru: "Tinch ERP объединяет все подразделения предприятия в единое информационное пространство. План производства, остатки сырья, заказы, доставка и финансовая отчётность связаны между собой в реальном времени. Это ускоряет принятие решений и устраняет разрывы данных между отделами.",
    },
    tags: [
      { uz: "Ishlab chiqarish", ru: "Производство" },
      { uz: "Moliya", ru: "Финансы" },
      { uz: "Buxgalteriya", ru: "Бухгалтерия" },
    ],
    highlights: [
      {
        icon: "factory",
        title: { uz: "Ishlab chiqarish", ru: "Производство" },
        text: {
          uz: "Texnologik karta, ishlab chiqarish rejasi, xomashyo sarfi va tayyor mahsulot tannarxi.",
          ru: "Технологическая карта, план производства, расход сырья и себестоимость готовой продукции.",
        },
      },
      {
        icon: "wallet",
        title: { uz: "Moliya va buxgalteriya", ru: "Финансы и бухгалтерия" },
        text: {
          uz: "Kassa, bank, kontragentlar bilan hisob-kitob, qarzdorlik nazorati va boshqaruv hisoboti.",
          ru: "Касса, банк, взаиморасчёты с контрагентами, контроль задолженности и управленческая отчётность.",
        },
      },
      {
        icon: "truck",
        title: { uz: "Yetkazib berish", ru: "Доставка" },
        text: {
          uz: "Marshrutlar, kuryerlar, yetkazib berish holati va mijozga bildirishnomalar.",
          ru: "Маршруты, курьеры, статус доставки и уведомления клиенту.",
        },
      },
      {
        icon: "chart",
        title: { uz: "Boshqaruv paneli", ru: "Панель руководителя" },
        text: {
          uz: "Foyda, aylanma, qoldiq va bo'limlar samaradorligi — real vaqtdagi ko'rsatkichlar.",
          ru: "Прибыль, оборот, остатки и эффективность подразделений — показатели в реальном времени.",
        },
      },
    ],
    pricingModes: [
      {
        id: "project",
        label: { uz: "Loyiha bo'yicha", ru: "По проекту" },
        description: {
          uz: "ERP har bir korxona uchun alohida sozlanadi. Narx modullar tarkibi, foydalanuvchilar soni va integratsiyalarga bog'liq.",
          ru: "ERP настраивается индивидуально под каждое предприятие. Цена зависит от состава модулей, числа пользователей и интеграций.",
        },
        showMatrix: true,
        plans: [
          {
            id: "start",
            name: { uz: "ERP Start", ru: "ERP Start" },
            desc: {
              uz: "Ombor, savdo va asosiy moliyaviy hisob — kichik korxonalar uchun.",
              ru: "Склад, продажи и базовый финансовый учёт — для небольших предприятий.",
            },
            price: null,
            highlights: [
              { uz: "Ombor va savdo hisobi", ru: "Складской и торговый учёт" },
              { uz: "Kontragentlar va shartnomalar", ru: "Контрагенты и договоры" },
              { uz: "Kassa va bank operatsiyalari", ru: "Кассовые и банковские операции" },
              { uz: "Asosiy hisobotlar", ru: "Базовые отчёты" },
            ],
          },
          {
            id: "business",
            name: { uz: "ERP Business", ru: "ERP Business" },
            badge: { uz: "Tavsiya etiladi", ru: "Рекомендуем" },
            featured: true,
            desc: {
              uz: "Ishlab chiqarish, tannarx hisobi va boshqaruv hisoboti qo'shiladi.",
              ru: "Добавляются производство, расчёт себестоимости и управленческая отчётность.",
            },
            price: null,
            highlights: [
              { uz: "Start tarifidagi barcha imkoniyatlar", ru: "Все возможности тарифа Start" },
              { uz: "Ishlab chiqarish va texnologik kartalar", ru: "Производство и технологические карты" },
              { uz: "Tannarx va rentabellik hisobi", ru: "Расчёт себестоимости и рентабельности" },
              { uz: "Yetkazib berish va logistika", ru: "Доставка и логистика" },
            ],
          },
          {
            id: "enterprise",
            name: { uz: "ERP Enterprise", ru: "ERP Enterprise" },
            desc: {
              uz: "Ko'p filialli holding uchun: konsolidatsiya, byudjetlash va maxsus integratsiyalar.",
              ru: "Для многофилиального холдинга: консолидация, бюджетирование и особые интеграции.",
            },
            price: null,
            highlights: [
              { uz: "Business tarifidagi barcha imkoniyatlar", ru: "Все возможности тарифа Business" },
              { uz: "Ko'p filial va konsolidatsiyalangan hisobot", ru: "Мультифилиальность и консолидированная отчётность" },
              { uz: "Byudjetlash va rejalashtirish", ru: "Бюджетирование и планирование" },
              { uz: "Individual integratsiyalar va SLA", ru: "Индивидуальные интеграции и SLA" },
            ],
          },
        ],
        priceTables: [],
        notes: [
          {
            type: "info",
            text: {
              uz: "<b>Eslatma:</b> ERP narxi jarayonlarni tahlil qilgandan so'ng aniqlanadi. Bepul tahlil va taxminiy hisob-kitob uchun so'rov qoldiring.",
              ru: "<b>Примечание:</b> цена ERP определяется после анализа процессов. Оставьте заявку на бесплатный анализ и предварительный расчёт.",
            },
          },
        ],
      },
    ],
    matrixPlans: ["start", "business", "enterprise"],
    featureGroups: [
      {
        title: { uz: "Ombor va savdo", ru: "Склад и продажи" },
        items: [
          { label: { uz: "Tovar qoldiqlari va harakati", ru: "Остатки и движение товара" }, plans: { start: true, business: true, enterprise: true } },
          { label: { uz: "Buyurtmalar va hisob-fakturalar", ru: "Заказы и счета-фактуры" }, plans: { start: true, business: true, enterprise: true } },
          { label: { uz: "Ko'p ombor va manzilli saqlash", ru: "Мультисклад и адресное хранение" }, plans: { start: false, business: true, enterprise: true } },
          { label: { uz: "Markirovka va shtrix-kod", ru: "Маркировка и штрих-код" }, plans: { start: false, business: true, enterprise: true } },
        ],
      },
      {
        title: { uz: "Ishlab chiqarish", ru: "Производство" },
        items: [
          { label: { uz: "Texnologik kartalar", ru: "Технологические карты" }, plans: { start: false, business: true, enterprise: true } },
          { label: { uz: "Ishlab chiqarish rejasi", ru: "План производства" }, plans: { start: false, business: true, enterprise: true } },
          { label: { uz: "Tannarx hisobi", ru: "Расчёт себестоимости" }, plans: { start: false, business: true, enterprise: true } },
          { label: { uz: "Ko'p bosqichli ishlab chiqarish", ru: "Многоэтапное производство" }, plans: { start: false, business: false, enterprise: true } },
        ],
      },
      {
        title: { uz: "Moliya", ru: "Финансы" },
        items: [
          { label: { uz: "Kassa va bank", ru: "Касса и банк" }, plans: { start: true, business: true, enterprise: true } },
          { label: { uz: "Kontragentlar bilan hisob-kitob", ru: "Взаиморасчёты с контрагентами" }, plans: { start: true, business: true, enterprise: true } },
          { label: { uz: "Boshqaruv hisoboti (P&L, Cash Flow)", ru: "Управленческая отчётность (P&L, Cash Flow)" }, plans: { start: false, business: true, enterprise: true } },
          { label: { uz: "Byudjetlash", ru: "Бюджетирование" }, plans: { start: false, business: false, enterprise: true } },
        ],
      },
      {
        title: { uz: "Tizim va integratsiya", ru: "Система и интеграции" },
        items: [
          { label: { uz: "Rollar va ruxsatlar", ru: "Роли и права доступа" }, plans: { start: true, business: true, enterprise: true } },
          { label: { uz: "Audit jurnali", ru: "Журнал аудита" }, plans: { start: true, business: true, enterprise: true } },
          { label: { uz: "1C va tashqi tizimlar bilan integratsiya", ru: "Интеграция с 1C и внешними системами" }, plans: { start: false, business: true, enterprise: true } },
          { label: { uz: "Ochiq API va individual modullar", ru: "Открытый API и индивидуальные модули" }, plans: { start: false, business: false, enterprise: true } },
          { label: { uz: "Ko'p filial va konsolidatsiya", ru: "Мультифилиальность и консолидация" }, plans: { start: false, business: false, enterprise: true } },
        ],
      },
    ],
  },

  /* ==========================================================
     3. CRM
     ========================================================== */
  {
    id: "crm",
    icon: "handshake",
    image: { webp: "./images/opt/crm.webp", jpg: "./images/opt/crm.jpg" },
    name: { uz: "Tinch CRM", ru: "Tinch CRM" },
    tagline: {
      uz: "Mijozlar bazasi va savdo voronkasi",
      ru: "База клиентов и воронка продаж",
    },
    short: {
      uz: "Mijozlar va shartnomalar hisobi, savdo voronkasi, munosabatlar tarixi va takroriy savdolarni rag'batlantirish.",
      ru: "Учёт клиентов и договоров, воронка продаж, история отношений и стимулирование повторных продаж.",
    },
    intro: {
      uz: "Tinch CRM mijoz haqidagi barcha ma'lumotni bitta ekranga jamlaydi: munosabatlar tarixi, chiqarilgan hujjatlar arxivi, joriy qarzdorlik va umumiy savdo hajmi. Savdo voronkasi bosqichlari orqali har bir bitimning holati ko'rinib turadi — hech bir mijoz e'tibordan chetda qolmaydi.",
      ru: "Tinch CRM собирает всю информацию о клиенте на одном экране: историю взаимоотношений, архив выставленных документов, текущую задолженность и суммарные продажи. Этапы воронки продаж показывают статус каждой сделки — ни один клиент не остаётся без внимания.",
    },
    tags: [
      { uz: "Savdo voronkasi", ru: "Воронка продаж" },
      { uz: "Telefoniya", ru: "Телефония" },
      { uz: "Bitimlar", ru: "Сделки" },
    ],
    highlights: [
      {
        icon: "handshake",
        title: { uz: "Mijozlar va bitimlar", ru: "Клиенты и сделки" },
        text: {
          uz: "Kontragentlar va aloqa shaxslari ma'lumotnomasi, foydalanuvchi maydonlari, bitim kartasi.",
          ru: "Справочник контрагентов и контактных лиц, пользовательские поля, карточка сделки.",
        },
      },
      {
        icon: "funnel",
        title: { uz: "Savdo voronkasi", ru: "Воронка продаж" },
        text: {
          uz: "Bosqichlar bo'yicha bitimlar, konversiya, prognoz va menejerlar samaradorligi.",
          ru: "Сделки по этапам, конверсия, прогноз и эффективность менеджеров.",
        },
      },
      {
        icon: "history",
        title: { uz: "Munosabatlar tarixi", ru: "История взаимоотношений" },
        text: {
          uz: "Qo'ng'iroqlar, xatlar, uchrashuvlar va hujjatlar — mijoz kartasida xronologik tartibda.",
          ru: "Звонки, письма, встречи и документы — в карточке клиента в хронологическом порядке.",
        },
      },
      {
        icon: "bell",
        title: { uz: "Vazifa va eslatmalar", ru: "Задачи и напоминания" },
        text: {
          uz: "Menejerga avtomatik vazifalar, muddat eslatmalari va qarzdorlik bo'yicha bildirishnomalar.",
          ru: "Автоматические задачи менеджеру, напоминания о сроках и уведомления о задолженности.",
        },
      },
    ],
    pricingModes: [
      {
        id: "project",
        label: { uz: "Loyiha bo'yicha", ru: "По проекту" },
        description: {
          uz: "Narx foydalanuvchilar soni va kerakli integratsiyalarga qarab hisoblanadi.",
          ru: "Цена рассчитывается исходя из количества пользователей и необходимых интеграций.",
        },
        showMatrix: true,
        plans: [
          {
            id: "start",
            name: { uz: "CRM Start", ru: "CRM Start" },
            desc: {
              uz: "Mijozlar bazasi, bitimlar va asosiy voronka — savdo bo'limini tartibga solish uchun.",
              ru: "База клиентов, сделки и базовая воронка — чтобы навести порядок в отделе продаж.",
            },
            price: null,
            highlights: [
              { uz: "Mijozlar va kontaktlar bazasi", ru: "База клиентов и контактов" },
              { uz: "Bitimlar va savdo voronkasi", ru: "Сделки и воронка продаж" },
              { uz: "Vazifalar va eslatmalar", ru: "Задачи и напоминания" },
              { uz: "Asosiy savdo hisobotlari", ru: "Базовые отчёты по продажам" },
            ],
          },
          {
            id: "pro",
            name: { uz: "CRM PRO", ru: "CRM PRO" },
            badge: { uz: "Tavsiya etiladi", ru: "Рекомендуем" },
            featured: true,
            desc: {
              uz: "Telefoniya, avtomatlashtirish stsenariylari va chuqur tahlil qo'shiladi.",
              ru: "Добавляются телефония, сценарии автоматизации и глубокая аналитика.",
            },
            price: null,
            highlights: [
              { uz: "Start tarifidagi barcha imkoniyatlar", ru: "Все возможности тарифа Start" },
              { uz: "Telefoniya va qo'ng'iroqlar yozuvi", ru: "Телефония и запись звонков" },
              { uz: "Avtomatlashtirish stsenariylari", ru: "Сценарии автоматизации" },
              { uz: "Menejerlar samaradorligi tahlili", ru: "Аналитика эффективности менеджеров" },
            ],
          },
        ],
        priceTables: [],
        notes: [
          {
            type: "info",
            text: {
              uz: "<b>Eslatma:</b> aniq narx uchun savdo jarayoningizni qisqacha tavsiflab so'rov qoldiring — 1 ish kunida hisob-kitob yuboramiz.",
              ru: "<b>Примечание:</b> для точной цены оставьте заявку с кратким описанием процесса продаж — расчёт пришлём за 1 рабочий день.",
            },
          },
        ],
      },
    ],
    matrixPlans: ["start", "pro"],
    featureGroups: [
      {
        title: { uz: "Mijozlar bazasi", ru: "База клиентов" },
        items: [
          { label: { uz: "Kontragentlar va aloqa shaxslari", ru: "Контрагенты и контактные лица" }, plans: { start: true, pro: true } },
          { label: { uz: "Foydalanuvchi maydonlari", ru: "Пользовательские поля" }, plans: { start: true, pro: true } },
          { label: { uz: "Segmentatsiya va teglar", ru: "Сегментация и теги" }, plans: { start: false, pro: true } },
          { label: { uz: "Takroriy mijozlarni aniqlash", ru: "Выявление дублей клиентов" }, plans: { start: false, pro: true } },
        ],
      },
      {
        title: { uz: "Savdo", ru: "Продажи" },
        items: [
          { label: { uz: "Bitimlar va voronka bosqichlari", ru: "Сделки и этапы воронки" }, plans: { start: true, pro: true } },
          { label: { uz: "Hisob-fakturalar va shartnomalar", ru: "Счета и договоры" }, plans: { start: true, pro: true } },
          { label: { uz: "Qarzdorlik nazorati", ru: "Контроль задолженности" }, plans: { start: true, pro: true } },
          { label: { uz: "Savdo prognozi", ru: "Прогноз продаж" }, plans: { start: false, pro: true } },
        ],
      },
      {
        title: { uz: "Aloqa kanallari", ru: "Каналы связи" },
        items: [
          { label: { uz: "Qo'ng'iroqlar tarixi (qo'lda)", ru: "История звонков (вручную)" }, plans: { start: true, pro: true } },
          { label: { uz: "Telefoniya integratsiyasi", ru: "Интеграция телефонии" }, plans: { start: false, pro: true } },
          { label: { uz: "Telegram-bot bilan bog'lanish", ru: "Связь через Telegram-бот" }, plans: { start: false, pro: true } },
          { label: { uz: "Email yuborish va shablonlar", ru: "Email-рассылка и шаблоны" }, plans: { start: false, pro: true } },
        ],
      },
      {
        title: { uz: "Tahlil", ru: "Аналитика" },
        items: [
          { label: { uz: "Asosiy savdo hisobotlari", ru: "Базовые отчёты по продажам" }, plans: { start: true, pro: true } },
          { label: { uz: "Voronka konversiyasi", ru: "Конверсия воронки" }, plans: { start: false, pro: true } },
          { label: { uz: "Menejerlar samaradorligi", ru: "Эффективность менеджеров" }, plans: { start: false, pro: true } },
          { label: { uz: "Individual hisobot konstruktori", ru: "Конструктор отчётов" }, plans: { start: false, pro: true } },
        ],
      },
    ],
  },

  /* ==========================================================
     4. OMBOR
     ========================================================== */
  {
    id: "warehouse",
    icon: "warehouse",
    image: { webp: "./images/opt/warehouse.webp", jpg: "./images/opt/warehouse.jpg" },
    name: { uz: "Tinch Ombor", ru: "Tinch Склад" },
    tagline: {
      uz: "Xarid va ombor hisobini avtomatlashtirish",
      ru: "Автоматизация закупок и складского учёта",
    },
    short: {
      uz: "Qoldiqlar, shtrix-kod, manzilli saqlash, xaridlarni rejalashtirish va markirovka — omborni to'liq nazorat ostida ushlang.",
      ru: "Остатки, штрих-коды, адресное хранение, планирование закупок и маркировка — полный контроль склада.",
    },
    intro: {
      uz: "Tinch Ombor omborga kirgan va chiqqan har bir birlikni hisobga oladi. Faktik qoldiq, zaxira va kutilayotgan tovar alohida ko'rinadi. Sotish statistikasi asosida ta'minotchilarga buyurtma avtomatik shakllanadi, tovar tugayotganda tizim ogohlantiradi.",
      ru: "Tinch Склад учитывает каждую единицу, поступившую на склад и покинувшую его. Фактический остаток, резерв и ожидаемый товар видны отдельно. На основе статистики продаж автоматически формируется заказ поставщикам, а при истощении запаса система предупреждает.",
    },
    tags: [
      { uz: "Shtrix-kod", ru: "Штрих-код" },
      { uz: "Markirovka", ru: "Маркировка" },
      { uz: "Inventarizatsiya", ru: "Инвентаризация" },
    ],
    highlights: [
      {
        icon: "boxes",
        title: { uz: "Qoldiqlar nazorati", ru: "Контроль остатков" },
        text: {
          uz: "Faktik qoldiq, zaxira va kutilayotgan tovar alohida hisoblanadi. Ko'p ombor qo'llab-quvvatlanadi.",
          ru: "Фактический остаток, резерв и ожидаемый товар считаются отдельно. Поддерживается мультисклад.",
        },
      },
      {
        icon: "barcode",
        title: { uz: "Shtrix-kod va markirovka", ru: "Штрих-код и маркировка" },
        text: {
          uz: "Seriya raqamlari, to'plamlar, manzilli saqlash. Kodlarni buyurtma qilish va chop etish.",
          ru: "Серийные номера, комплекты, адресное хранение. Заказ и печать кодов.",
        },
      },
      {
        icon: "cart",
        title: { uz: "Xaridlarni rejalashtirish", ru: "Планирование закупок" },
        text: {
          uz: "Sotish statistikasi asosida ta'minotchilarga buyurtma, kamaymaydigan qoldiqqacha avtomatik to'ldirish.",
          ru: "Заказы поставщикам на основе статистики продаж, автопополнение до неснижаемого остатка.",
        },
      },
      {
        icon: "bell",
        title: { uz: "Bildirishnomalar", ru: "Уведомления" },
        text: {
          uz: "Tovar tugayotgani, to'lanmagan hisoblar va muddati o'tayotgan partiyalar haqida ogohlantirish.",
          ru: "Оповещения об истощении запаса, неоплаченных счетах и истекающих партиях.",
        },
      },
    ],
    pricingModes: [
      {
        id: "project",
        label: { uz: "Loyiha bo'yicha", ru: "По проекту" },
        description: {
          uz: "Narx ombor soni, nomenklatura hajmi va kerakli uskunalarga bog'liq.",
          ru: "Цена зависит от количества складов, объёма номенклатуры и необходимого оборудования.",
        },
        showMatrix: true,
        plans: [
          {
            id: "start",
            name: { uz: "Ombor Start", ru: "Склад Start" },
            desc: {
              uz: "Bitta ombor, qoldiqlar hisobi va kirim-chiqim hujjatlari.",
              ru: "Один склад, учёт остатков и приходно-расходные документы.",
            },
            price: null,
            highlights: [
              { uz: "Qoldiqlar va tovar harakati", ru: "Остатки и движение товара" },
              { uz: "Kirim, chiqim, ko'chirish hujjatlari", ru: "Приход, расход, перемещение" },
              { uz: "Shtrix-kod bilan ishlash", ru: "Работа со штрих-кодом" },
              { uz: "Inventarizatsiya", ru: "Инвентаризация" },
            ],
          },
          {
            id: "pro",
            name: { uz: "Ombor PRO", ru: "Склад PRO" },
            badge: { uz: "Tavsiya etiladi", ru: "Рекомендуем" },
            featured: true,
            desc: {
              uz: "Ko'p ombor, manzilli saqlash, markirovka va xaridlarni avtomatik rejalashtirish.",
              ru: "Мультисклад, адресное хранение, маркировка и автоматическое планирование закупок.",
            },
            price: null,
            highlights: [
              { uz: "Start tarifidagi barcha imkoniyatlar", ru: "Все возможности тарифа Start" },
              { uz: "Ko'p ombor va manzilli saqlash", ru: "Мультисклад и адресное хранение" },
              { uz: "Markirovka va seriya raqamlari", ru: "Маркировка и серийные номера" },
              { uz: "Xaridlarni avtomatik rejalashtirish", ru: "Автоматическое планирование закупок" },
            ],
          },
        ],
        priceTables: [],
        notes: [
          {
            type: "info",
            text: {
              uz: "<b>Eslatma:</b> terminal, skaner va printer kabi uskunalar narxi alohida hisoblanadi.",
              ru: "<b>Примечание:</b> стоимость оборудования (терминалы, сканеры, принтеры) рассчитывается отдельно.",
            },
          },
        ],
      },
    ],
    matrixPlans: ["start", "pro"],
    featureGroups: [
      {
        title: { uz: "Qoldiqlar va hisob", ru: "Остатки и учёт" },
        items: [
          { label: { uz: "Faktik qoldiqlar", ru: "Фактические остатки" }, plans: { start: true, pro: true } },
          { label: { uz: "Zaxira va kutilayotgan tovar", ru: "Резерв и ожидаемый товар" }, plans: { start: true, pro: true } },
          { label: { uz: "Ko'p ombor", ru: "Мультисклад" }, plans: { start: false, pro: true } },
          { label: { uz: "Manzilli saqlash (yacheykalar)", ru: "Адресное хранение (ячейки)" }, plans: { start: false, pro: true } },
        ],
      },
      {
        title: { uz: "Tovar va identifikatsiya", ru: "Товар и идентификация" },
        items: [
          { label: { uz: "Tovar xususiyatlari", ru: "Характеристики товара" }, plans: { start: true, pro: true } },
          { label: { uz: "Shtrix-kod", ru: "Штрих-код" }, plans: { start: true, pro: true } },
          { label: { uz: "Seriya raqamlari va to'plamlar", ru: "Серийные номера и комплекты" }, plans: { start: false, pro: true } },
          { label: { uz: "Markirovka: kod buyurtma va chop etish", ru: "Маркировка: заказ и печать кодов" }, plans: { start: false, pro: true } },
        ],
      },
      {
        title: { uz: "Xarid", ru: "Закупки" },
        items: [
          { label: { uz: "Ta'minotchilarga buyurtma", ru: "Заказы поставщикам" }, plans: { start: true, pro: true } },
          { label: { uz: "Xaridlar tarixi", ru: "История закупок" }, plans: { start: true, pro: true } },
          { label: { uz: "Sotish statistikasi asosida rejalashtirish", ru: "Планирование по статистике продаж" }, plans: { start: false, pro: true } },
          { label: { uz: "Kamaymaydigan qoldiqqacha avtoto'ldirish", ru: "Автопополнение до неснижаемого остатка" }, plans: { start: false, pro: true } },
        ],
      },
      {
        title: { uz: "Nazorat", ru: "Контроль" },
        items: [
          { label: { uz: "Inventarizatsiya", ru: "Инвентаризация" }, plans: { start: true, pro: true } },
          { label: { uz: "Tovar tugashi haqida bildirishnoma", ru: "Уведомление об истощении запаса" }, plans: { start: true, pro: true } },
          { label: { uz: "Yaroqlilik muddati nazorati", ru: "Контроль сроков годности" }, plans: { start: false, pro: true } },
          { label: { uz: "Audit jurnali va rollar", ru: "Журнал аудита и роли" }, plans: { start: false, pro: true } },
        ],
      },
    ],
  },

  /* ==========================================================
     5. SAYTLAR
     ========================================================== */
  {
    id: "websites",
    icon: "globe",
    image: { webp: "./images/opt/websites.webp", jpg: "./images/opt/websites.jpg" },
    name: { uz: "Saytlar va portallar", ru: "Сайты и порталы" },
    tagline: {
      uz: "Vizitkadan korporativ portalgacha",
      ru: "От сайта-визитки до корпоративного портала",
    },
    short: {
      uz: "Zamonaviy dizayn, moslashuvchan maket, ikki tilli kontent va SEO. Loyihalash, ishlab chiqish va qo'llab-quvvatlash.",
      ru: "Современный дизайн, адаптивная вёрстка, двуязычный контент и SEO. Проектирование, разработка и поддержка.",
    },
    intro: {
      uz: "Biz saytni «chiroyli sahifa» sifatida emas, biznes vositasi sifatida quramiz. Ishni maqsad va auditoriyani aniqlashdan boshlaymiz, so'ng struktura, dizayn va texnik bajarilishga o'tamiz. Har bir sayt moslashuvchan, tez yuklanadigan va qidiruv tizimlariga tayyor holda topshiriladi.",
      ru: "Мы делаем сайт не «красивой страницей», а инструментом бизнеса. Начинаем с определения цели и аудитории, затем переходим к структуре, дизайну и технической реализации. Каждый сайт сдаётся адаптивным, быстрым и готовым к поисковым системам.",
    },
    tags: [
      { uz: "Moslashuvchan", ru: "Адаптивный" },
      { uz: "SEO", ru: "SEO" },
      { uz: "2 til", ru: "2 языка" },
    ],
    highlights: [
      {
        icon: "layout",
        title: { uz: "Dizayn va UX", ru: "Дизайн и UX" },
        text: {
          uz: "Brend uslubiga mos individual dizayn, mobil qurilmalarda ham xuddi shunday ishlaydigan interfeys.",
          ru: "Индивидуальный дизайн в стиле бренда, интерфейс, одинаково работающий на мобильных устройствах.",
        },
      },
      {
        icon: "gauge",
        title: { uz: "Tezlik va SEO", ru: "Скорость и SEO" },
        text: {
          uz: "Optimallashtirilgan rasm va kod, to'g'ri meta-teglar, sitemap va structured data.",
          ru: "Оптимизированные изображения и код, корректные мета-теги, sitemap и structured data.",
        },
      },
      {
        icon: "globe",
        title: { uz: "Ko'p tillilik", ru: "Многоязычность" },
        text: {
          uz: "O'zbek va rus tillari standart. Kontentni boshqarish paneli orqali o'zingiz tahrirlaysiz.",
          ru: "Узбекский и русский — стандартно. Контент редактируется через панель управления.",
        },
      },
      {
        icon: "plug",
        title: { uz: "Integratsiya", ru: "Интеграции" },
        text: {
          uz: "CRM, Telegram-bot, to'lov tizimlari va analitika — sayt bilan bog'lanadi.",
          ru: "CRM, Telegram-бот, платёжные системы и аналитика — подключаются к сайту.",
        },
      },
    ],
    pricingModes: [
      {
        id: "project",
        label: { uz: "Loyiha bo'yicha", ru: "По проекту" },
        description: {
          uz: "Narx sahifalar soni, dizayn murakkabligi va integratsiyalarga bog'liq.",
          ru: "Цена зависит от количества страниц, сложности дизайна и интеграций.",
        },
        showMatrix: true,
        plans: [
          {
            id: "landing",
            name: { uz: "Landing", ru: "Landing" },
            desc: {
              uz: "Bitta uzun sahifa: mahsulot yoki xizmatni taqdim etish va so'rov yig'ish.",
              ru: "Одна длинная страница: презентация продукта или услуги и сбор заявок.",
            },
            price: null,
            highlights: [
              { uz: "Individual dizayn", ru: "Индивидуальный дизайн" },
              { uz: "Moslashuvchan maket", ru: "Адаптивная вёрстка" },
              { uz: "So'rov formasi va Telegram xabari", ru: "Форма заявки и уведомление в Telegram" },
              { uz: "Asosiy SEO sozlamalari", ru: "Базовые SEO-настройки" },
            ],
          },
          {
            id: "corporate",
            name: { uz: "Korporativ sayt", ru: "Корпоративный сайт" },
            badge: { uz: "Tavsiya etiladi", ru: "Рекомендуем" },
            featured: true,
            desc: {
              uz: "Ko'p sahifali sayt: mahsulotlar, tariflar, yangiliklar va boshqaruv paneli.",
              ru: "Многостраничный сайт: продукты, тарифы, новости и панель управления.",
            },
            price: null,
            highlights: [
              { uz: "Landing tarifidagi barcha imkoniyatlar", ru: "Все возможности тарифа Landing" },
              { uz: "Kontent boshqaruv paneli", ru: "Панель управления контентом" },
              { uz: "Ikki tilli kontent (uz / ru)", ru: "Двуязычный контент (uz / ru)" },
              { uz: "Blog va yangiliklar bo'limi", ru: "Раздел блога и новостей" },
            ],
          },
          {
            id: "portal",
            name: { uz: "Portal", ru: "Портал" },
            desc: {
              uz: "Foydalanuvchi kabineti, katalog, integratsiyalar va murakkab biznes-mantiq.",
              ru: "Личный кабинет, каталог, интеграции и сложная бизнес-логика.",
            },
            price: null,
            highlights: [
              { uz: "Korporativ tarifdagi barcha imkoniyatlar", ru: "Все возможности корпоративного тарифа" },
              { uz: "Foydalanuvchi kabineti va rollar", ru: "Личный кабинет и роли" },
              { uz: "Katalog va qidiruv/filtrlar", ru: "Каталог с поиском и фильтрами" },
              { uz: "CRM/ERP bilan integratsiya", ru: "Интеграция с CRM/ERP" },
            ],
          },
        ],
        priceTables: [],
        notes: [
          {
            type: "info",
            text: {
              uz: "<b>Eslatma:</b> domen va hosting narxi alohida. Kontent tayyorlash (matn, foto) alohida kelishiladi.",
              ru: "<b>Примечание:</b> домен и хостинг оплачиваются отдельно. Подготовка контента (тексты, фото) согласовывается отдельно.",
            },
          },
        ],
      },
    ],
    matrixPlans: ["landing", "corporate", "portal"],
    featureGroups: [
      {
        title: { uz: "Dizayn va maket", ru: "Дизайн и вёрстка" },
        items: [
          { label: { uz: "Individual dizayn", ru: "Индивидуальный дизайн" }, plans: { landing: true, corporate: true, portal: true } },
          { label: { uz: "Moslashuvchan maket (mobil/planshet)", ru: "Адаптивная вёрстка (моб./планшет)" }, plans: { landing: true, corporate: true, portal: true } },
          { label: { uz: "Animatsiya va interaktiv bloklar", ru: "Анимации и интерактивные блоки" }, plans: { landing: false, corporate: true, portal: true } },
          { label: { uz: "Dizayn tizimi (design system)", ru: "Дизайн-система" }, plans: { landing: false, corporate: false, portal: true } },
        ],
      },
      {
        title: { uz: "Kontent", ru: "Контент" },
        items: [
          { label: { uz: "Statik sahifalar", ru: "Статические страницы" }, plans: { landing: true, corporate: true, portal: true } },
          { label: { uz: "Kontent boshqaruv paneli", ru: "Панель управления контентом" }, plans: { landing: false, corporate: true, portal: true } },
          { label: { uz: "Ikki tilli kontent (uz / ru)", ru: "Двуязычный контент (uz / ru)" }, plans: { landing: false, corporate: true, portal: true } },
          { label: { uz: "Blog va yangiliklar", ru: "Блог и новости" }, plans: { landing: false, corporate: true, portal: true } },
          { label: { uz: "Katalog, qidiruv va filtrlar", ru: "Каталог, поиск и фильтры" }, plans: { landing: false, corporate: false, portal: true } },
        ],
      },
      {
        title: { uz: "Funksional", ru: "Функциональность" },
        items: [
          { label: { uz: "So'rov formasi", ru: "Форма заявки" }, plans: { landing: true, corporate: true, portal: true } },
          { label: { uz: "Telegram-botga xabar yuborish", ru: "Уведомления в Telegram-бот" }, plans: { landing: true, corporate: true, portal: true } },
          { label: { uz: "Foydalanuvchi kabineti va rollar", ru: "Личный кабинет и роли" }, plans: { landing: false, corporate: false, portal: true } },
          { label: { uz: "CRM / ERP integratsiyasi", ru: "Интеграция с CRM / ERP" }, plans: { landing: false, corporate: false, portal: true } },
          { label: { uz: "Onlayn to'lov", ru: "Онлайн-оплата" }, plans: { landing: false, corporate: false, portal: true } },
        ],
      },
      {
        title: { uz: "SEO va analitika", ru: "SEO и аналитика" },
        items: [
          { label: { uz: "Meta-teglar va Open Graph", ru: "Мета-теги и Open Graph" }, plans: { landing: true, corporate: true, portal: true } },
          { label: { uz: "Sitemap va robots.txt", ru: "Sitemap и robots.txt" }, plans: { landing: true, corporate: true, portal: true } },
          { label: { uz: "Structured data (Schema.org)", ru: "Structured data (Schema.org)" }, plans: { landing: false, corporate: true, portal: true } },
          { label: { uz: "Analitika ulash (GA / Yandex)", ru: "Подключение аналитики (GA / Yandex)" }, plans: { landing: false, corporate: true, portal: true } },
        ],
      },
    ],
  },
];
