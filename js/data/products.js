/* ============================================================
   Tinch — Mahsulotlar va tariflar bazasi
   ------------------------------------------------------------
   Bu fayl saytdagi BARCHA mahsulot kontentining yagona manbasi.
   HTML fayllarga hech qanday matn yozilmaydi — hammasi shu yerdan.

   YANGI MAHSULOT QO'SHISH:
     1. PRODUCTS massiviga yangi obyekt qo'shing (quyidagi shablon bo'yicha).
     2. Tamom. Bosh sahifa, tariflar, buyurtma sahifasi avtomatik yangilanadi.

   TARTIB: saytdagi ko'rinish tartibi = shu massivdagi tartib.
     Ishga tushgan mahsulotlar oldinda, `soon: true` bo'lganlari oxirida.

   MAHSULOT OBYEKTI:
     id            — URL kaliti: product.html?id=hr
     soon          — true bo'lsa: mahsulot hali ishga tushmagan.
                     Kartochkada, mahsulot sahifasida, tariflar tabida va
                     buyurtma formasida avtomatik "Tez orada" yorlig'i chiqadi.
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
     1. TINCH OMBOR
     ========================================================== */
  {
    id: "warehouse",
    icon: "warehouse",
    image: { webp: "./images/opt/warehouse.webp", jpg: "./images/opt/warehouse.jpg" },
    name: { uz: "Tinch Ombor", ru: "Tinch Ombor" },
    tagline: {
      uz: "Ombor, distribyutsiya va qarz nazorati tizimi",
      ru: "Система склада, дистрибуции и контроля задолженности",
    },
    short: {
      uz: "Partiya va yaroqlilik muddati bo'yicha hisob, FEFO, magazin va agentlar qarzi, kassa va hisobotlar — hujjatlar bilan to'liq kuzatiladigan ombor.",
      ru: "Учёт по партиям и срокам годности, FEFO, задолженность магазинов и агентов, касса и отчёты — склад, где каждая цифра прослеживается до документа.",
    },
    intro: {
      uz: "Tinch Ombor — oziq-ovqat va tez buziladigan mahsulot bilan ishlaydigan distribyutorlar uchun qurilgan tizim. Ombordagi har bir dona mol faqat hujjat orqali kiradi va chiqadi, har bir kirim qatori o'z tannarxi va muddati bilan alohida partiya ochadi, chiqimda esa tizim muddati eng yaqin partiyadan boshlab yechadi (FEFO). Magazinlar va yetkazib beruvchilar qarzi qo'lda yozilmaydi — u hujjatlardan avtomatik yig'iladi. Hech narsa o'chirilmaydi: xato hujjat bekor qilinadi va tarixda dalil bo'lib qoladi.",
      ru: "Tinch Ombor — система для дистрибьюторов, работающих со скоропортящимся товаром. Каждая единица попадает на склад и покидает его только через документ, каждая строка прихода открывает отдельную партию со своей себестоимостью и сроком годности, а при расходе система списывает с партии, у которой срок истекает раньше (FEFO). Задолженность магазинов и поставщиков не вводится вручную — она собирается из документов. Ничего не удаляется: ошибочный документ отменяется и остаётся в истории как доказательство.",
    },
    tags: [
      { uz: "Partiya · FEFO", ru: "Партии · FEFO" },
      { uz: "Qarz nazorati", ru: "Контроль долга" },
      { uz: "Shtrix-kod", ru: "Штрих-код" },
      { uz: "Telegram-bot", ru: "Telegram-бот" },
    ],
    highlights: [
      {
        icon: "boxes",
        title: { uz: "Partiya va FEFO", ru: "Партии и FEFO" },
        text: {
          uz: "Har bir kirim qatori o'z tannarxi va muddati bilan partiya ochadi. Chiqimda tizim muddati eng yaqin partiyadan boshlab yechadi — mol omborda qolib buzilmaydi.",
          ru: "Каждая строка прихода открывает партию со своей себестоимостью и сроком. При расходе система списывает с партии, срок которой истекает раньше — товар не портится на складе.",
        },
      },
      {
        icon: "wallet",
        title: { uz: "Qarz qo'lda yozilmaydi", ru: "Долг не вводится вручную" },
        text: {
          uz: "Berilgan mol − qaytarilgan mol − olingan to'lovlar. Kontragent sahifasida javob emas, uchta raqamli hisob ko'rinadi — qog'oz daftar bilan qator-ma-qator solishtiriladi.",
          ru: "Отгружено − возвращено − оплачено. На странице контрагента виден не итог, а расчёт из трёх чисел — его можно сверить с бумажной тетрадью строка в строку.",
        },
      },
      {
        icon: "shield",
        title: { uz: "Hech narsa o'chirilmaydi", ru: "Ничего не удаляется" },
        text: {
          uz: "Qoralama → Tasdiqlangan → Bekor qilingan. Xato hujjat bekor qilinadi, tizim teskari yozuvlarni o'zi yozadi, hujjat esa raqami bilan tarixda qoladi.",
          ru: "Черновик → Проведён → Отменён. Ошибочный документ отменяется, система сама пишет обратные проводки, а документ остаётся в истории со своим номером.",
        },
      },
      {
        icon: "barcode",
        title: { uz: "Quti ↔ dona konvertatsiyasi", ru: "Конвертация коробка ↔ штука" },
        text: {
          uz: "Mol karobka bilan keladi, dona bilan sotiladi. Tizim ikkalasini biladi va tasdiqlashdan oldin «5 quti = 60 dona» deb ko'rsatib turadi.",
          ru: "Товар приходит коробками, продаётся штуками. Система знает оба и до проведения показывает «5 коробок = 60 штук».",
        },
      },
      {
        icon: "telegram",
        title: { uz: "Telegram orqali buyurtma", ru: "Заказы через Telegram" },
        text: {
          uz: "Agent va magazin buyurtmani bevosita botdan yuboradi. Magazin buyurtmasi omborda ham, o'sha magazinning agentida ham ko'rinadi — qo'ng'iroq va qog'oz kerak emas.",
          ru: "Агент и магазин отправляют заказ прямо из бота. Заказ магазина виден и на складе, и у агента этого магазина — без звонков и бумаг.",
        },
      },
      {
        icon: "chart",
        title: { uz: "Har bir raqam manbaga olib boradi", ru: "Каждая цифра ведёт к источнику" },
        text: {
          uz: "Bosh sahifadagi kartani bosing — o'sha raqamni chiqargan ro'yxat ochiladi. Qoldiq shubhali bo'lsa, «Harakatlar» tabida uni o'zgartirgan har bir hujjat sanasi va ismi bilan turadi.",
          ru: "Нажмите карточку на главной — откроется список, из которого получена цифра. Если остаток вызывает сомнения, во вкладке «Движения» стоит каждый документ с датой и именем.",
        },
      },
    ],

    /* ---------- Tarif rejimlari ---------- */
    pricingModes: [
      {
        id: "subscription",
        label: { uz: "Oylik obuna", ru: "Ежемесячная подписка" },
        description: {
          uz: "Foydalanuvchi soniga qarab oylik to'lov. Yangilanishlar, har kechalik zaxira nusxa va tizim ishlashi kiritilgan.",
          ru: "Ежемесячная оплата по количеству пользователей. Обновления, ночное резервное копирование и работа системы включены.",
        },
        showMatrix: true,
        plans: [
          {
            id: "basic",
            name: { uz: "Tinch Ombor Basic", ru: "Tinch Ombor Basic" },
            desc: {
              uz: "Bitta ombor: kirim, chiqim, partiya, muddat va qarz hisobi. Qog'oz daftardan tizimga o'tish uchun.",
              ru: "Один склад: приход, расход, партии, сроки и учёт долга. Для перехода с бумажной тетради в систему.",
            },
            price: { amount: 42000, currency: "UZS", period: { uz: "foydalanuvchi / oy", ru: "пользователь / месяц" } },
            highlights: [
              { uz: "Kirim, chiqim, qaytarish, hisobdan chiqarish", ru: "Приход, расход, возврат, списание" },
              { uz: "Partiya, tannarx va yaroqlilik muddati", ru: "Партии, себестоимость и сроки годности" },
              { uz: "FEFO — muddati yaqinini birinchi chiqarish", ru: "FEFO — сначала уходит ближайший по сроку" },
              { uz: "Kontragent qarzi va hisob-kitob varaqasi", ru: "Долг контрагента и акт сверки" },
              { uz: "Shtrix-kod, kassa va Excel hisobotlar", ru: "Штрих-код, касса и отчёты в Excel" },
            ],
          },
          {
            id: "pro",
            name: { uz: "Tinch Ombor PRO", ru: "Tinch Ombor PRO" },
            badge: { uz: "Tavsiya etiladi", ru: "Рекомендуем" },
            featured: true,
            desc: {
              uz: "Distribyutsiya uchun: bir necha ombor, agentlar, kredit limiti, qarzdorlik yoshi, foyda va Telegram-bot.",
              ru: "Для дистрибуции: несколько складов, агенты, кредитный лимит, возраст задолженности, прибыль и Telegram-бот.",
            },
            price: { amount: 60000, currency: "UZS", period: { uz: "foydalanuvchi / oy", ru: "пользователь / месяц" } },
            highlights: [
              { uz: "Basic tarifidagi barcha imkoniyatlar", ru: "Все возможности тарифа Basic" },
              { uz: "Bir necha ombor va agentlar boshqaruvi", ru: "Несколько складов и управление агентами" },
              { uz: "Kredit limiti va qarzdorlik yoshi (90+)", ru: "Кредитный лимит и возраст долга (90+)" },
              { uz: "Foyda, tannarx va marja hisoboti", ru: "Отчёт по прибыли, себестоимости и марже" },
              { uz: "Telegram-bot orqali buyurtma qabul qilish", ru: "Приём заказов через Telegram-бот" },
            ],
          },
        ],
        priceTables: [
          {
            title: { uz: "Tinch Ombor Basic — narxlar jadvali", ru: "Tinch Ombor Basic — таблица цен" },
            columns: [
              { key: "name", label: { uz: "Nomi", ru: "Название" } },
              { key: "users", label: { uz: "Foydalanuvchilar", ru: "Пользователей" } },
              { key: "total", label: { uz: "Oylik narxi", ru: "Цена в месяц" }, strong: true },
              { key: "perUser", label: { uz: "Har bir foydalanuvchi", ru: "За пользователя" }, quiet: true },
            ],
            rows: [
              { name: "Tinch Ombor Basic 10", users: "10", total: "420 000 UZS", perUser: "42 000 UZS" },
              { name: "Tinch Ombor Basic 20", users: "20", total: "760 000 UZS", perUser: "38 000 UZS" },
              { name: "Tinch Ombor Basic 40", users: "40", total: "1 400 000 UZS", perUser: "35 000 UZS" },
            ],
            foot: {
              uz: "<b>Texnik qo'llab-quvvatlash:</b> 5 murojaat — 400 000 UZS / oyiga",
              ru: "<b>Техническая поддержка:</b> 5 обращений — 400 000 UZS / месяц",
            },
          },
          {
            title: { uz: "Tinch Ombor PRO — narxlar jadvali", ru: "Tinch Ombor PRO — таблица цен" },
            columns: [
              { key: "name", label: { uz: "Nomi", ru: "Название" } },
              { key: "users", label: { uz: "Foydalanuvchilar", ru: "Пользователей" } },
              { key: "total", label: { uz: "Oylik narxi", ru: "Цена в месяц" }, strong: true },
              { key: "perUser", label: { uz: "Har bir foydalanuvchi", ru: "За пользователя" }, quiet: true },
            ],
            rows: [
              { name: "Tinch Ombor PRO 10", users: "10", total: "600 000 UZS", perUser: "60 000 UZS" },
              { name: "Tinch Ombor PRO 20", users: "20", total: "1 100 000 UZS", perUser: "55 000 UZS" },
              { name: "Tinch Ombor PRO 40", users: "40", total: "2 000 000 UZS", perUser: "50 000 UZS" },
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
              uz: "<b>Tizimga o'tish bepul.</b> Mavjud ombor qoldig'ini (muddatlari bilan) va kontragentlarning qog'ozdagi qarzini ko'chirish barcha tariflarga kiritilgan. Ma'lumotlarni Excel'dan ommaviy yuklash mumkin — tizim avval sinov qilib, qaysi qatorda nima xato ekanini ko'rsatadi.",
              ru: "<b>Переход на систему — бесплатно.</b> Перенос текущих остатков (со сроками) и бумажной задолженности контрагентов входит во все тарифы. Данные можно загрузить массово из Excel — система сначала прогонит проверку и покажет, в какой строке что не так.",
            },
          },
          {
            type: "warn",
            text: {
              uz: "<b>Uskunalar narxi kiritilmagan.</b> Shtrix-kod skaneri, TSD terminali va chek printeri alohida hisoblanadi — bitta ish o'rnini jihozlash <b>150 AQSh dollaridan</b> boshlanadi. 40 dan ortiq foydalanuvchi yoki 4 dan ortiq ombor bo'lsa, narx alohida kelishiladi.",
              ru: "<b>Стоимость оборудования не включена.</b> Сканер штрих-кодов, ТСД и чековый принтер считаются отдельно — оснащение одного рабочего места <b>от 150 долларов США</b>. При более чем 40 пользователях или 4 складах цена согласовывается отдельно.",
            },
          },
        ],
      },
      {
        id: "onetime",
        label: { uz: "Bir martalik xarid", ru: "Разовая покупка" },
        badge: { uz: "Tinch Ombor Sale", ru: "Tinch Ombor Sale" },
        description: {
          uz: "Tizimni to'liq sotib olish: o'z serveringizda ishlatish, bir marotaba yoki bo'lib to'lash imkoniyati bilan.",
          ru: "Полная покупка системы: работа на вашем сервере, единовременно или в рассрочку.",
        },
        showMatrix: false,
        plans: [],
        priceTables: [
          {
            title: { uz: "Tinch Ombor Sale — narxlar jadvali", ru: "Tinch Ombor Sale — таблица цен" },
            columns: [
              { key: "name", label: { uz: "Tarif", ru: "Тариф" } },
              { key: "scope", label: { uz: "Hajmi", ru: "Объём" } },
              { key: "installment", label: { uz: "Bo'lib to'lash", ru: "Рассрочка" } },
              { key: "onceHtml", label: { uz: "Bir marotaba", ru: "Единовременно" }, strong: true, html: true },
            ],
            rows: [
              {
                name: "Start",
                scope: { uz: "1 ombor · 5 foydalanuvchi", ru: "1 склад · 5 пользователей" },
                full: 3000, installment: "1 000 USD × 3",
                onceHtml: '2 700 USD <span class="cell-off">−10%</span>',
              },
              {
                name: "Progress",
                scope: { uz: "2 ombor · 10 foydalanuvchi", ru: "2 склада · 10 пользователей" },
                full: 4500, installment: "1 500 USD × 3",
                onceHtml: '4 050 USD <span class="cell-off">−10%</span>',
              },
              {
                name: "Expert",
                scope: { uz: "4 ombor · 20 foydalanuvchi", ru: "4 склада · 20 пользователей" },
                full: 8000, installment: "2 000 USD × 4",
                onceHtml: '7 200 USD <span class="cell-off">−10%</span>',
              },
              {
                name: "Premium",
                scope: { uz: "Cheksiz · 40+ foydalanuvchi", ru: "Без ограничений · 40+ пользователей" },
                full: 15000, installment: "2 500 USD × 6",
                onceHtml: '13 500 USD <span class="cell-off">−10%</span>',
              },
            ],
            foot: {
              uz: "<b>Izoh:</b> «Bir marotaba» ustunidagi narxlar to'liq oldindan to'lovda 10% chegirma bilan ko'rsatilgan. Barcha paketlar PRO funksionalini o'z ichiga oladi.",
              ru: "<b>Примечание:</b> цены в колонке «Единовременно» указаны со скидкой 10% при полной предоплате. Все пакеты включают функционал PRO.",
            },
          },
        ],
        notes: [
          {
            type: "info",
            text: {
              uz: "<b>Eslatma:</b> summa uskunalar va server narxini o'z ichiga olmaydi. Birinchi yil yangilanishlari bepul, keyingi yillarda yangilanish va qo'llab-quvvatlash yillik <b>xarid narxining 20%</b> miqdorida.",
              ru: "<b>Примечание:</b> сумма не включает оборудование и сервер. Обновления первого года бесплатны, далее обновления и поддержка — <b>20% от стоимости покупки</b> в год.",
            },
          },
        ],
      },
    ],

    /* ---------- Tariflar taqqoslash matritsasi ---------- */
    matrixPlans: ["basic", "pro"],
    featureGroups: [
      {
        title: { uz: "Hujjatlar va ish oqimi", ru: "Документы и рабочий процесс" },
        items: [
          { label: { uz: "Kirim — mol qabul qilish (KIR-)", ru: "Приход — приёмка товара (KIR-)" }, plans: { basic: true, pro: true } },
          { label: { uz: "Chiqim — magazinga jo'natish (CHQ-)", ru: "Расход — отгрузка в магазин (CHQ-)" }, plans: { basic: true, pro: true } },
          { label: { uz: "Qaytarish — magazindan va yetkazib beruvchiga", ru: "Возврат — от магазина и поставщику" }, plans: { basic: true, pro: true } },
          { label: { uz: "Hisobdan chiqarish — buzilgan, shikastlangan, yo'qolgan", ru: "Списание — просрочка, брак, утеря" }, plans: { basic: true, pro: true } },
          { label: { uz: "To'lov hujjatlari (TLV-)", ru: "Платёжные документы (TLV-)" }, plans: { basic: true, pro: true } },
          { label: { uz: "Boshlang'ich qoldiq — tizimga o'tish (BOSH-)", ru: "Начальные остатки — переход в систему (BOSH-)" }, plans: { basic: true, pro: true } },
          { label: { uz: "Qoralama → Tasdiqlangan → Bekor qilingan oqimi", ru: "Черновик → Проведён → Отменён" }, plans: { basic: true, pro: true } },
          { label: { uz: "Qoralamani har 5 soniyada avtomatik saqlash", ru: "Автосохранение черновика каждые 5 секунд" }, plans: { basic: true, pro: true } },
          { label: { uz: "Tuzatish — inventarizatsiya farqi (TUZATISH-)", ru: "Корректировка — расхождение инвентаризации (TUZATISH-)" }, plans: { basic: false, pro: true } },
        ],
      },
      {
        title: { uz: "Ombor, partiya va muddat", ru: "Склад, партии и сроки" },
        items: [
          { label: { uz: "Real vaqtdagi qoldiqlar", ru: "Остатки в реальном времени" }, plans: { basic: true, pro: true } },
          { label: { uz: "Partiya hisobi: o'z tannarxi va muddati bilan", ru: "Учёт по партиям: своя себестоимость и срок" }, plans: { basic: true, pro: true } },
          { label: { uz: "FEFO — muddati oldin tugaydigan oldin chiqadi", ru: "FEFO — первым уходит ближайший по сроку" }, plans: { basic: true, pro: true } },
          { label: { uz: "Muddat bo'yicha 5 daraja: kritik, ogohlantirish, kuzatuv", ru: "5 уровней по сроку: критично, предупреждение, наблюдение" }, plans: { basic: true, pro: true } },
          { label: { uz: "Allokatsiya — chiqim qaysi partiyadan qancha olgani", ru: "Аллокация — из какой партии сколько ушло" }, plans: { basic: true, pro: true } },
          { label: { uz: "Minimal qoldiq va «kam qolgan» ogohlantirishi", ru: "Минимальный остаток и оповещение «заканчивается»" }, plans: { basic: true, pro: true } },
          { label: { uz: "Harakatlar tarixi — qoldiqni o'zgartirgan har bir hujjat", ru: "История движений — каждый документ, менявший остаток" }, plans: { basic: true, pro: true } },
          { label: { uz: "Bir necha ombor (multi-sklad)", ru: "Несколько складов (мультисклад)" }, plans: { basic: false, pro: true } },
          { label: { uz: "Ortiqcha zaxira nazorati — omborda qotib qolgan pul", ru: "Контроль избыточного запаса — замороженные деньги" }, plans: { basic: false, pro: true } },
        ],
      },
      {
        title: { uz: "Mahsulot va birliklar", ru: "Товар и единицы измерения" },
        items: [
          { label: { uz: "Mahsulot kartochkasi, artikul (SKU), kategoriya", ru: "Карточка товара, артикул (SKU), категория" }, plans: { basic: true, pro: true } },
          { label: { uz: "Shtrix-kod va skaner bilan ishlash", ru: "Работа со штрих-кодом и сканером" }, plans: { basic: true, pro: true } },
          { label: { uz: "Qadoq konvertatsiyasi: quti ↔ dona", ru: "Конвертация упаковки: коробка ↔ штука" }, plans: { basic: true, pro: true } },
          { label: { uz: "Bir nechta qadoq turi: quti, blok, karobka", ru: "Несколько видов упаковки: коробка, блок, ящик" }, plans: { basic: false, pro: true } },
          { label: { uz: "Excel'dan ommaviy import (sinov rejimi bilan)", ru: "Массовый импорт из Excel (с проверкой)" }, plans: { basic: false, pro: true } },
          { label: { uz: "Chet valyutadagi kirim va kurs ma'lumotnomasi", ru: "Приход в валюте и справочник курсов" }, plans: { basic: false, pro: true } },
        ],
      },
      {
        title: { uz: "Kontragentlar va qarz", ru: "Контрагенты и задолженность" },
        items: [
          { label: { uz: "Yetkazib beruvchilar va magazinlar", ru: "Поставщики и магазины" }, plans: { basic: true, pro: true } },
          { label: { uz: "Qarzning avtomatik hisobi: berilgan − qaytgan − to'langan", ru: "Автоматический расчёт долга: отгружено − возвращено − оплачено" }, plans: { basic: true, pro: true } },
          { label: { uz: "Hisob-kitob varaqasi — chop etish va Excel", ru: "Акт сверки — печать и Excel" }, plans: { basic: true, pro: true } },
          { label: { uz: "Qaytarish chegarasi — berilganidan ko'p qaytarib bo'lmaydi", ru: "Лимит возврата — нельзя вернуть больше отгруженного" }, plans: { basic: true, pro: true } },
          { label: { uz: "Agentlar va ularni magazinlarga biriktirish", ru: "Агенты и их закрепление за магазинами" }, plans: { basic: false, pro: true } },
          { label: { uz: "Kredit limiti — limitdan oshsa chiqim to'siladi", ru: "Кредитный лимит — расход блокируется при превышении" }, plans: { basic: false, pro: true } },
          { label: { uz: "Qarzdorlik yoshi: 1–30 / 31–60 / 61–90 / 90+ kun", ru: "Возраст задолженности: 1–30 / 31–60 / 61–90 / 90+ дней" }, plans: { basic: false, pro: true } },
        ],
      },
      {
        title: { uz: "Kassa va to'lovlar", ru: "Касса и платежи" },
        items: [
          { label: { uz: "Magazindan to'lov qabul qilish", ru: "Приём оплаты от магазина" }, plans: { basic: true, pro: true } },
          { label: { uz: "Yetkazib beruvchiga to'lov", ru: "Оплата поставщику" }, plans: { basic: true, pro: true } },
          { label: { uz: "To'lov turlari: naqd, karta, o'tkazma", ru: "Виды оплаты: наличные, карта, перечисление" }, plans: { basic: true, pro: true } },
          { label: { uz: "Kunlik kassa yakuni — turlar bo'yicha ajratilgan", ru: "Итог кассы за день — в разрезе видов оплаты" }, plans: { basic: true, pro: true } },
          { label: { uz: "Agent kesimida yig'ilgan pul hisoboti", ru: "Отчёт по собранным деньгам в разрезе агента" }, plans: { basic: false, pro: true } },
        ],
      },
      {
        title: { uz: "Telegram-bot orqali buyurtma", ru: "Заказы через Telegram-бот" },
        items: [
          { label: { uz: "Agent bevosita omborga buyurtma yuboradi", ru: "Агент отправляет заказ прямо на склад" }, plans: { basic: false, pro: true } },
          { label: { uz: "Magazin o'zi buyurtma yuboradi", ru: "Магазин отправляет заказ самостоятельно" }, plans: { basic: false, pro: true } },
          { label: { uz: "Magazin buyurtmasi o'sha magazin agentida ham ko'rinadi", ru: "Заказ магазина виден и у агента этого магазина" }, plans: { basic: false, pro: true } },
          { label: { uz: "Botda qoldiq va narxni ko'rish", ru: "Просмотр остатков и цен в боте" }, plans: { basic: false, pro: true } },
          { label: { uz: "Buyurtmadan bir bosishda chiqim yaratish", ru: "Создание расхода из заказа одним нажатием" }, plans: { basic: false, pro: true } },
          { label: { uz: "Buyurtma holati haqida bildirishnoma", ru: "Уведомление о статусе заказа" }, plans: { basic: false, pro: true } },
        ],
      },
      {
        title: { uz: "Hisobotlar", ru: "Отчёты" },
        items: [
          { label: { uz: "Ombor qiymati — omborda qancha pul yotibdi", ru: "Стоимость склада — сколько денег лежит на складе" }, plans: { basic: true, pro: true } },
          { label: { uz: "Yaroqlilik muddati — nima buzilish arafasida", ru: "Сроки годности — что на грани порчи" }, plans: { basic: true, pro: true } },
          { label: { uz: "Savdo hisoboti — mahsulot, magazin, oy bo'yicha", ru: "Отчёт по продажам — товар, магазин, месяц" }, plans: { basic: true, pro: true } },
          { label: { uz: "Excel'ga chiqarish — davr va vaqt yozuvi bilan", ru: "Выгрузка в Excel — с периодом и отметкой времени" }, plans: { basic: true, pro: true } },
          { label: { uz: "Yetkazib beruvchilarga qarz — kimga qancha to'lash kerak", ru: "Долг поставщикам — кому сколько платить" }, plans: { basic: false, pro: true } },
          { label: { uz: "Qarzdorlik yoshi hisoboti", ru: "Отчёт по возрасту задолженности" }, plans: { basic: false, pro: true } },
          { label: { uz: "Agent kesimidagi savdo", ru: "Продажи в разрезе агента" }, plans: { basic: false, pro: true } },
          { label: { uz: "Foyda: tushum − tannarx = foyda va marja", ru: "Прибыль: выручка − себестоимость = прибыль и маржа" }, plans: { basic: false, pro: true } },
        ],
      },
      {
        title: { uz: "Bosh sahifa va nazorat", ru: "Главная страница и контроль" },
        items: [
          { label: { uz: "Ombor qiymati, qarzlar va sof pozitsiya kartalari", ru: "Карточки стоимости склада, долгов и чистой позиции" }, plans: { basic: true, pro: true } },
          { label: { uz: "Yaroqlilik muddati kartasi — kunning birinchi ekrani", ru: "Карточка сроков годности — первый экран дня" }, plans: { basic: true, pro: true } },
          { label: { uz: "Kam qolgan mahsulotlar kartasi", ru: "Карточка заканчивающихся товаров" }, plans: { basic: true, pro: true } },
          { label: { uz: "Har bir raqamdan uni chiqargan ro'yxatga o'tish", ru: "Переход от любой цифры к списку, из которого она получена" }, plans: { basic: true, pro: true } },
          { label: { uz: "Davr filtri: bugun, 7 kun, 30 kun, chorak, yil", ru: "Фильтр периода: сегодня, 7 дней, 30 дней, квартал, год" }, plans: { basic: true, pro: true } },
          { label: { uz: "Kirim/chiqim dinamikasi grafigi", ru: "График динамики прихода и расхода" }, plans: { basic: false, pro: true } },
          { label: { uz: "Foyda kartasi — faqat direktorga", ru: "Карточка прибыли — только директору" }, plans: { basic: false, pro: true } },
        ],
      },
      {
        title: { uz: "Rollar, xavfsizlik va texnik xizmat", ru: "Роли, безопасность и обслуживание" },
        items: [
          { label: { uz: "Rollar: direktor, menejer, omborchi", ru: "Роли: директор, менеджер, кладовщик" }, plans: { basic: true, pro: true } },
          { label: { uz: "Har kecha avtomatik zaxira nusxa (01:30, 14 kun saqlanadi)", ru: "Ночное резервное копирование (01:30, хранится 14 дней)" }, plans: { basic: true, pro: true } },
          { label: { uz: "Tungi muddat tekshiruvi (02:10)", ru: "Ночная проверка сроков (02:10)" }, plans: { basic: true, pro: true } },
          { label: { uz: "Tungi hisob tekshiruvi: harakatlar yig'indisi = qoldiq (02:40)", ru: "Ночная сверка: сумма движений = остаток (02:40)" }, plans: { basic: true, pro: true } },
          { label: { uz: "Hisobchi va kuzatuvchi rollari", ru: "Роли бухгалтера и наблюдателя" }, plans: { basic: false, pro: true } },
          { label: { uz: "Audit jurnali — maydonma-maydon, ism va vaqt bilan", ru: "Журнал аудита — по полям, с именем и временем" }, plans: { basic: false, pro: true } },
          { label: { uz: "Sessiyalar nazorati — yo'qolgan qurilmani uzish", ru: "Контроль сессий — отключение утерянного устройства" }, plans: { basic: false, pro: true } },
          { label: { uz: "Chegaralarni sabab bilan chetlab o'tish (direktor)", ru: "Обход ограничений с указанием причины (директор)" }, plans: { basic: false, pro: true } },
        ],
      },
    ],
  },

  /* ==========================================================
     2. TINCH HR
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
              { name: "Tinch HR Basic 15", employees: "15", total: "405 000 UZS", perEmployee: "27 000 UZS" },
              { name: "Tinch HR Basic 45", employees: "45", total: "1 035 000 UZS", perEmployee: "25 000 UZS" },
              { name: "Tinch HR Basic 90", employees: "90", total: "2 070 000 UZS", perEmployee: "23 000 UZS" },
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
              { name: "Tinch HR PRO 15", employees: "15", total: "525 000 UZS", perEmployee: "35 000 UZS" },
              { name: "Tinch HR PRO 45", employees: "45", total: "1 485 000 UZS", perEmployee: "33 000 UZS" },
              { name: "Tinch HR PRO 90", employees: "90", total: "2 700 000 UZS", perEmployee: "30 000 UZS" },
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
              { name: "Start", employees: "40", full: 4500, installment: "1 500 USD × 3", onceHtml: '4 050 USD <span class="cell-off">−10%</span>' },
              { name: "Progress", employees: "90", full: 9000, installment: "3 000 USD × 3", onceHtml: '8 000 USD <span class="cell-off">−10%</span>' },
              { name: "Expert", employees: "160", full: 12000, installment: "3 000 USD × 4", onceHtml: '10 800 USD <span class="cell-off">−10%</span>' },
              { name: "Premium", employees: "300+", full: 18000, installment: "3 000 USD × 6", onceHtml: '16 200 USD <span class="cell-off">−10%</span>' },
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
     3. TINCH UYLAR (ko'chmas mulk savdosi)
     ========================================================== */
  {
    id: "uylar",
    icon: "building",
    image: { webp: "./images/opt/uylar.webp", jpg: "./images/opt/uylar.jpg" },
    name: { uz: "Tinch Uylar", ru: "Tinch Uylar" },
    tagline: {
      uz: "Ko'chmas mulk savdosini avtomatlashtirish",
      ru: "Автоматизация продаж недвижимости",
    },
    short: {
      uz: "Shaxmatka, bron va savdo, bo'lib to'lashni avtomatik hisoblash, shartnoma shakllantirish, onlayn kassa, SMS eslatmalar va menejerlar ko'rsatkichlari.",
      ru: "Шахматка, бронь и продажа, автоматический расчёт рассрочки, формирование договоров, онлайн-касса, SMS-напоминания и показатели менеджеров.",
    },
    intro: {
      uz: "Tinch Uylar — quruvchi kompaniyalar va savdo bo'limlari uchun tizim. Turar-joy majmuasidagi har bir xonadon, ofis, savdo maydoni va parking joyi o'z kartasiga ega bo'ladi. Sotuvchi shaxmatkadan bo'sh birlikni tanlaydi, bron qo'yadi yoki savdoni rasmiylashtiradi; bo'lib to'lash jadvali darhol hisoblanadi, shartnoma shablondan yig'iladi, to'lov sanasi yaqinlashganda mijozga SMS o'zi ketadi. Rahbar esa qaysi uy qanday sotilayotganini va qaysi menejer rejani bajarayotganini real vaqtda ko'rib turadi.",
      ru: "Tinch Uylar — система для застройщиков и отделов продаж. Каждая квартира, офис, торговое помещение и машиноместо в жилом комплексе получает собственную карточку. Продавец выбирает свободную единицу в шахматке, ставит бронь или оформляет продажу; график рассрочки считается сразу, договор собирается из шаблона, а при приближении даты платежа клиенту автоматически уходит SMS. Руководитель в реальном времени видит, как продаётся каждый дом и кто из менеджеров выполняет план.",
    },
    tags: [
      { uz: "Shaxmatka", ru: "Шахматка" },
      { uz: "Bo'lib to'lash", ru: "Рассрочка" },
      { uz: "Shartnoma", ru: "Договоры" },
      { uz: "SMS", ru: "SMS" },
    ],
    highlights: [
      {
        icon: "grid",
        title: { uz: "Shaxmatka va interaktiv fasad", ru: "Шахматка и интерактивный фасад" },
        text: {
          uz: "Bo'sh, bron qilingan va sotilgan birliklar bitta ekranda rang bilan ajratiladi. Qavat rejasi, bino fasadi va planirovka — mijozga shu yerdan ko'rsatasiz.",
          ru: "Свободные, забронированные и проданные единицы разделены цветом на одном экране. План этажа, фасад здания и планировку показываете клиенту здесь же.",
        },
      },
      {
        icon: "percent",
        title: { uz: "Bo'lib to'lash o'zi hisoblanadi", ru: "Рассрочка считается сама" },
        text: {
          uz: "Boshlang'ich to'lov, muddat va foizni kiriting — tizim oylik to'lov jadvalini, umumiy summani va ustamani darhol chiqaradi.",
          ru: "Введите первоначальный взнос, срок и ставку — система сразу выдаёт график ежемесячных платежей, итоговую сумму и переплату.",
        },
      },
      {
        icon: "file-signature",
        title: { uz: "Shartnoma shablondan yig'iladi", ru: "Договор собирается из шаблона" },
        text: {
          uz: "Mijoz ma'lumotini kiritish kifoya — tizim savdo shartlarini hisobga olib tayyor shartnomani beradi. Boshqa mijozga o'tkazish va qo'shimcha kelishuv ham shu yerda.",
          ru: "Достаточно ввести данные клиента — система выдаёт готовый договор с учётом условий сделки. Переоформление на другого клиента и допсоглашение — там же.",
        },
      },
      {
        icon: "message-square",
        title: { uz: "Mijozga SMS o'zi ketadi", ru: "SMS клиенту уходит сама" },
        text: {
          uz: "To'lov sanasi yaqinlashganda, muddat o'tib ketganda, tug'ilgan kun va bayramlarda. Matn va vaqtni siz belgilaysiz — qolganini tizim qiladi.",
          ru: "При приближении даты платежа, при просрочке, в день рождения и в праздники. Текст и время задаёте вы — остальное делает система.",
        },
      },
      {
        icon: "wallet",
        title: { uz: "Onlayn kassa va ko'p valyuta", ru: "Онлайн-касса и мультивалютность" },
        text: {
          uz: "Bir vaqtda bir necha kompaniya hisobi, bo'lib to'lash bo'yicha tushum, pul aylanmasi va bugungi qarzdorliklar — bitta bo'limda.",
          ru: "Несколько счетов компании одновременно, поступления по рассрочке, денежный оборот и задолженности на сегодня — в одном разделе.",
        },
      },
      {
        icon: "chart",
        title: { uz: "Rahbar uchun ko'rsatkichlar", ru: "Показатели для руководителя" },
        text: {
          uz: "Savdo rejasi, menejerlar KPI si, obyekt kesimidagi hisobot va narx tahlili. Har bir raqamni bosib, uni chiqargan ro'yxatga tushasiz.",
          ru: "План продаж, KPI менеджеров, отчёт в разрезе объектов и ценовая аналитика. Нажав на любую цифру, попадаете в список, из которого она получена.",
        },
      },
    ],

    /* ---------- Tarif rejimlari ---------- */
    pricingModes: [
      {
        id: "subscription",
        label: { uz: "Oylik obuna", ru: "Ежемесячная подписка" },
        description: {
          uz: "Bulutda ishlaydi, o'rnatish va server kerak emas. Minimal to'lov muddati — 3 oy, 12 oyga oldindan to'lasangiz 25% chegirma.",
          ru: "Работает в облаке, установка и сервер не нужны. Минимальный срок оплаты — 3 месяца, при оплате за 12 месяцев скидка 25%.",
        },
        showMatrix: true,
        matrixPlans: ["start", "standard"],
        plans: [
          {
            id: "start",
            name: { uz: "Uylar Start", ru: "Uylar Start" },
            desc: {
              uz: "Bitta majmuani sotishni boshlash uchun: shaxmatka, bron, standart savdo va kassa.",
              ru: "Чтобы начать продавать один комплекс: шахматка, бронь, стандартная продажа и касса.",
            },
            price: { amount: 900000, currency: "UZS", period: { uz: "oy", ru: "месяц" } },
            highlights: [
              { uz: "2 foydalanuvchi · 200 birlik · cheksiz obyekt", ru: "2 пользователя · 200 единиц · объектов без ограничений" },
              { uz: "Shaxmatka, genplan, plitka va ro'yxat ko'rinishi", ru: "Шахматка, генплан, плитка и список" },
              { uz: "Bron va standart savdo, mijozlar bazasi", ru: "Бронь и стандартная продажа, база клиентов" },
              { uz: "Onlayn kassa, ko'p valyuta, pul aylanmasi", ru: "Онлайн-касса, мультивалютность, денежный оборот" },
              { uz: "Harakatlar jurnali va Excel eksport", ru: "Журнал действий и выгрузка в Excel" },
            ],
          },
          {
            id: "standard",
            name: { uz: "Uylar Standard", ru: "Uylar Standard" },
            badge: { uz: "Tavsiya etiladi", ru: "Рекомендуем" },
            featured: true,
            desc: {
              uz: "Barcha modullar ochiq: bo'lib to'lash, shartnoma generatsiyasi, SMS, KPI va to'liq hisobotlar.",
              ru: "Все модули открыты: рассрочка, генерация договоров, SMS, KPI и полная отчётность.",
            },
            price: { amount: 1800000, currency: "UZS", period: { uz: "oy", ru: "месяц" } },
            highlights: [
              { uz: "Start tarifidagi barcha imkoniyatlar", ru: "Все возможности тарифа Start" },
              { uz: "Bo'lib to'lash va uni avtomatik hisoblash", ru: "Рассрочка и её автоматический расчёт" },
              { uz: "Shartnoma va qo'shimcha kelishuv generatsiyasi", ru: "Генерация договоров и допсоглашений" },
              { uz: "Avtomatik SMS va push bildirishnomalar", ru: "Автоматические SMS и push-уведомления" },
              { uz: "KPI, savdo rejasi va obyektlar hisoboti", ru: "KPI, план продаж и отчёты по объектам" },
            ],
          },
        ],
        priceTables: [
          {
            title: { uz: "Oylik obuna — narxlar jadvali", ru: "Ежемесячная подписка — таблица цен" },
            columns: [
              { key: "name", label: { uz: "Tarif", ru: "Тариф" } },
              { key: "users", label: { uz: "Foydalanuvchi", ru: "Пользователей" } },
              { key: "units", label: { uz: "Birlik (xonadon)", ru: "Единиц (квартир)" } },
              { key: "monthly", label: { uz: "Oyiga", ru: "В месяц" }, strong: true },
              { key: "yearlyHtml", label: { uz: "Yiliga", ru: "В год" }, html: true },
            ],
            rows: [
              {
                name: "Uylar Start",
                users: "2",
                units: "200",
                monthly: "900 000 UZS",
                yearlyHtml: '8 100 000 UZS <span class="cell-off">−25%</span>',
              },
              {
                name: "Uylar Standard",
                users: "2",
                units: "200",
                monthly: "1 800 000 UZS",
                yearlyHtml: '16 200 000 UZS <span class="cell-off">−25%</span>',
              },
            ],
            foot: {
              uz: "<b>Obyekt va uylar soni cheklanmagan.</b> Minimal to'lov muddati — 3 oy. Yillik narx 12 oyga oldindan to'langanda amal qiladi.",
              ru: "<b>Количество объектов и домов не ограничено.</b> Минимальный срок оплаты — 3 месяца. Годовая цена действует при предоплате за 12 месяцев.",
            },
          },
          {
            title: { uz: "Limitni kengaytirish", ru: "Расширение лимитов" },
            columns: [
              { key: "name", label: { uz: "Nimasi", ru: "Что" } },
              { key: "price", label: { uz: "Qo'shimcha narx", ru: "Доплата" }, strong: true },
            ],
            rows: [
              {
                name: { uz: "Har bir qo'shimcha foydalanuvchi", ru: "Каждый дополнительный пользователь" },
                price: "150 000 UZS / oy",
              },
              {
                name: { uz: "Har qo'shimcha 100 birlik", ru: "Каждые дополнительные 100 единиц" },
                price: "600 000 UZS / oy",
              },
              {
                name: { uz: "Texnik qo'llab-quvvatlash: har 5 murojaat", ru: "Техподдержка: каждые 5 обращений" },
                price: "400 000 UZS / oy",
              },
            ],
            foot: {
              uz: "<b>Fayl xotirasi:</b> tarifga 100 MB kiritilgan (planirovka, foto, hujjat). Kengaytirish alohida kelishiladi.",
              ru: "<b>Файловое хранилище:</b> в тариф входит 100 МБ (планировки, фото, документы). Расширение согласовывается отдельно.",
            },
          },
        ],
        notes: [
          {
            type: "info",
            text: {
              uz: "<b>Qo'shimcha xizmatlar:</b> kompaniya sayti bilan integratsiya (obyektlar, bo'sh birliklar va arizalar sinxronizatsiyasi), IP-telefoniya va SMS-shlyuz ulanishi — alohida kelishiladi.",
              ru: "<b>Дополнительные услуги:</b> интеграция с сайтом компании (синхронизация объектов, свободных единиц и заявок), IP-телефония и подключение SMS-шлюза — согласовываются отдельно.",
            },
          },
          {
            type: "warn",
            text: {
              uz: "<b>SMS xabarlar narxi kiritilmagan.</b> Yuborilgan har bir xabar uchun to'lov aloqa operatori tarifi bo'yicha alohida hisoblanadi.",
              ru: "<b>Стоимость SMS не включена.</b> Оплата за каждое отправленное сообщение считается отдельно по тарифу оператора связи.",
            },
          },
        ],
      },
      {
        id: "onetime",
        label: { uz: "Bir martalik xarid", ru: "Разовая покупка" },
        badge: { uz: "Uylar Sale", ru: "Uylar Sale" },
        description: {
          uz: "Tizimni to'liq sotib olish: o'z serveringizda ishlaydi, foydalanuvchilar va birliklar limiti paketga qarab beriladi.",
          ru: "Полная покупка системы: работает на вашем сервере, лимит пользователей и единиц зависит от пакета.",
        },
        showMatrix: true,
        matrixPlans: ["progress", "expert", "premium"],
        plans: [
          {
            id: "progress",
            name: { uz: "Progress", ru: "Progress" },
            desc: {
              uz: "1 obyekt · 4 uy · 200 birlikkacha · 5 xodim. Bitta majmuani sotayotgan kompaniya uchun.",
              ru: "1 объект · 4 дома · до 200 единиц · 5 сотрудников. Для компании, продающей один комплекс.",
            },
            promoFull: 9000,
            price: { amount: 8100, currency: "USD", period: { uz: "bir marotaba", ru: "единовременно" } },
            highlights: [
              { uz: "Yoki bo'lib to'lash: 3 000 USD × 3 oy", ru: "Или в рассрочку: 3 000 USD × 3 месяца" },
              { uz: "Shaxmatka, bron, standart savdo", ru: "Шахматка, бронь, стандартная продажа" },
              { uz: "Onlayn kassa va ko'p valyuta", ru: "Онлайн-касса и мультивалютность" },
              { uz: "Mijozlar bazasi va arizalar", ru: "База клиентов и заявки" },
            ],
          },
          {
            id: "expert",
            name: { uz: "Expert", ru: "Expert" },
            badge: { uz: "Tavsiya etiladi", ru: "Рекомендуем" },
            featured: true,
            desc: {
              uz: "2 obyekt · 20 uy · 1 000 birlikkacha · 10 xodim. Bo'lib to'lash va SMS ochiladi.",
              ru: "2 объекта · 20 домов · до 1 000 единиц · 10 сотрудников. Открываются рассрочка и SMS.",
            },
            promoFull: 12000,
            price: { amount: 10800, currency: "USD", period: { uz: "bir marotaba", ru: "единовременно" } },
            highlights: [
              { uz: "Yoki bo'lib to'lash: 3 000 USD × 4 oy", ru: "Или в рассрочку: 3 000 USD × 4 месяца" },
              { uz: "Progress paketidagi barcha imkoniyatlar", ru: "Все возможности пакета Progress" },
              { uz: "Bo'lib to'lash va uni avtomatik hisoblash", ru: "Рассрочка и её автоматический расчёт" },
              { uz: "Qavat rejasi, interaktiv fasad va plitka", ru: "План этажа, интерактивный фасад и плитка" },
              { uz: "Avtomatik SMS va push bildirishnomalar", ru: "Автоматические SMS и push-уведомления" },
            ],
          },
          {
            id: "premium",
            name: { uz: "Premium", ru: "Premium" },
            desc: {
              uz: "4 obyekt · 30 uy · 3 000 birlikkacha · 30 xodim. Barcha modullar, cheklovsiz.",
              ru: "4 объекта · 30 домов · до 3 000 единиц · 30 сотрудников. Все модули без ограничений.",
            },
            promoFull: 15000,
            price: { amount: 13500, currency: "USD", period: { uz: "bir marotaba", ru: "единовременно" } },
            highlights: [
              { uz: "Yoki bo'lib to'lash: 3 000 USD × 5 oy", ru: "Или в рассрочку: 3 000 USD × 5 месяцев" },
              { uz: "Expert paketidagi barcha imkoniyatlar", ru: "Все возможности пакета Expert" },
              { uz: "Shartnoma va qo'shimcha kelishuv generatsiyasi", ru: "Генерация договоров и допсоглашений" },
              { uz: "KPI, savdo bo'limi ko'rsatkichlari", ru: "KPI и показатели отдела продаж" },
              { uz: "Obyektlar kesimidagi hisobotlar", ru: "Отчёты в разрезе объектов" },
            ],
          },
        ],
        priceTables: [
          {
            title: { uz: "Bir martalik xarid — narxlar jadvali", ru: "Разовая покупка — таблица цен" },
            columns: [
              { key: "name", label: { uz: "Paket", ru: "Пакет" } },
              { key: "staff", label: { uz: "Xodimlar", ru: "Сотрудников" } },
              { key: "scope", label: { uz: "Obyekt · uy · birlik", ru: "Объектов · домов · единиц" } },
              { key: "installment", label: { uz: "Bo'lib to'lash", ru: "Рассрочка" } },
              { key: "onceHtml", label: { uz: "Bir marotaba", ru: "Единовременно" }, strong: true, html: true },
            ],
            rows: [
              {
                name: "Progress",
                staff: "5",
                scope: "1 · 4 · 200",
                full: 9000, installment: "3 000 USD × 3",
                onceHtml: '8 100 USD <span class="cell-off">−10%</span>',
              },
              {
                name: "Expert",
                staff: "10",
                scope: "2 · 20 · 1 000",
                full: 12000, installment: "3 000 USD × 4",
                onceHtml: '10 800 USD <span class="cell-off">−10%</span>',
              },
              {
                name: "Premium",
                staff: "30",
                scope: "4 · 30 · 3 000",
                full: 15000, installment: "3 000 USD × 5",
                onceHtml: '13 500 USD <span class="cell-off">−10%</span>',
              },
            ],
            foot: {
              uz: "<b>Izoh:</b> «Bir marotaba» ustunidagi narxlar to'liq oldindan to'lovda 10% chegirma bilan ko'rsatilgan. Birinchi yil yangilanishlari bepul.",
              ru: "<b>Примечание:</b> цены в колонке «Единовременно» указаны со скидкой 10% при полной предоплате. Обновления первого года бесплатны.",
            },
          },
        ],
        notes: [
          {
            type: "info",
            text: {
              uz: "<b>Qo'shimcha xizmatlar:</b> sayt bilan integratsiya, IP-telefoniya va SMS-shlyuz ulanishi paketga kirmaydi — alohida kelishiladi. Server va SMS xabarlar narxi ham alohida.",
              ru: "<b>Дополнительные услуги:</b> интеграция с сайтом, IP-телефония и подключение SMS-шлюза в пакет не входят — согласовываются отдельно. Сервер и стоимость SMS также оплачиваются отдельно.",
            },
          },
        ],
      },
    ],

    /* ---------- Tariflar taqqoslash matritsasi ----------
       plans kalitlari: start / standard (obuna) va
       progress / expert / premium (bir martalik xarid).
       Har bir rejim o'z ustunlarini matrixPlans orqali tanlaydi. */
    matrixPlans: ["start", "standard"],
    featureGroups: [
      {
        title: { uz: "Obyektlar va birliklar", ru: "Объекты и единицы" },
        items: [
          {
            label: { uz: "Xonadon, ofis, savdo maydoni va parking", ru: "Квартиры, офисы, торговые помещения и машиноместа" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Genplan, ro'yxat va plitka ko'rinishlari", ru: "Генплан, список и плиточный вид" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Shaxmatka — bo'sh va band birliklar jadvali", ru: "Шахматка — таблица свободных и занятых единиц" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Filtrlar: xona soni, maydon, narx, holat", ru: "Фильтры: комнатность, площадь, цена, статус" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Planirovkalar va xonadon galereyasi", ru: "Планировки и галерея помещений" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Qavat rejasi va unda belgilash", ru: "План этажа с возможностью разметки" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
          {
            label: { uz: "Interaktiv fasad", ru: "Интерактивный фасад" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
          {
            label: { uz: "Interaktiv plitka va 3D katalog", ru: "Интерактивная плитка и 3D-каталог" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
        ],
      },
      {
        title: { uz: "Bron va savdo", ru: "Бронь и продажа" },
        items: [
          {
            label: { uz: "Uch qadamda bron yoki savdo rasmiylashtirish", ru: "Оформление брони или продажи в три шага" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Standart savdo shartlari", ru: "Стандартные условия продажи" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Mijozga taqdimot va tijorat taklifini chop etish", ru: "Презентация клиенту и печать коммерческого предложения" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Moslashuvchan savdo — individual shartlar", ru: "Гибкая продажа — индивидуальные условия" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
          {
            label: { uz: "Bo'lib to'lashga sotish", ru: "Продажа в рассрочку" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
          {
            label: { uz: "Bo'lib to'lash jadvalini avtomatik hisoblash", ru: "Автоматический расчёт графика рассрочки" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
          {
            label: { uz: "Shartnomani boshqa mijozga o'tkazish", ru: "Переоформление договора на другого клиента" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
          {
            label: { uz: "Kadastr qaroridan keyin qo'shimcha kelishuv", ru: "Допсоглашение после решения кадастра" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
        ],
      },
      {
        title: { uz: "Hujjatlar", ru: "Документы" },
        items: [
          {
            label: { uz: "Kompaniya hujjat aylanishi", ru: "Документооборот компании" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Shartnomani shablondan avtomatik shakllantirish", ru: "Автоматическое формирование договора из шаблона" },
            plans: { start: false, standard: true, progress: false, expert: false, premium: true },
          },
          {
            label: { uz: "Qo'shimcha kelishuv uchun alohida kassa", ru: "Отдельная касса для допсоглашений" },
            plans: { start: false, standard: true, progress: false, expert: false, premium: true },
          },
        ],
      },
      {
        title: { uz: "Moliya va kassa", ru: "Финансы и касса" },
        items: [
          {
            label: { uz: "Onlayn kassa va savdo hisobi", ru: "Онлайн-касса и учёт продаж" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Bir vaqtda bir necha kompaniya hisobi", ru: "Несколько счетов компании одновременно" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Ko'p valyutali rejim", ru: "Мультивалютный режим" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Pul aylanmasi nazorati", ru: "Контроль денежного оборота" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Muddati o'tgan to'lovlar ro'yxati", ru: "Список просроченных платежей" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Bo'lib to'lash bo'yicha to'lov qabul qilish", ru: "Приём оплаты по рассрочке" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
          {
            label: { uz: "Kutilayotgan to'lovlar", ru: "Ожидаемые платежи" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
          {
            label: { uz: "Bugungi qarzdorliklar", ru: "Задолженности на сегодня" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
        ],
      },
      {
        title: { uz: "Mijozlar va arizalar", ru: "Клиенты и заявки" },
        items: [
          {
            label: { uz: "Mijozlar bazasi va aloqa tarixi", ru: "База клиентов и история взаимодействий" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Arizalar: saytdan, qo'ng'iroqdan, vaqtinchalik bron", ru: "Заявки: с сайта, по звонку, на временную бронь" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Mijoz oqimi manbalari", ru: "Источники потока клиентов" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Sotuvdan keyingi ish (post-savdo)", ru: "Работа после продажи (пост-продажа)" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
        ],
      },
      {
        title: { uz: "Bildirishnomalar", ru: "Уведомления" },
        items: [
          {
            label: { uz: "To'lov sanasi yaqinlashgani haqida SMS", ru: "SMS о приближении даты платежа" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
          {
            label: { uz: "Muddati o'tgan to'lov haqida SMS", ru: "SMS о просроченном платеже" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
          {
            label: { uz: "Tug'ilgan kun va bayram tabriklari", ru: "Поздравления с днём рождения и праздниками" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
          {
            label: { uz: "Tizim ichidagi push bildirishnomalar", ru: "Push-уведомления внутри системы" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
        ],
      },
      {
        title: { uz: "Hisobot va tahlil", ru: "Отчёты и аналитика" },
        items: [
          {
            label: { uz: "Interaktiv dashboard", ru: "Интерактивный дашборд" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Oylik tushum va pul aylanmasi", ru: "Ежемесячный доход и денежный оборот" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Savdo bosqichlari bo'yicha hisobot", ru: "Отчёт по этапам продаж" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Sotilgan va sotilmagan birliklar ro'yxati", ru: "Список проданных и непроданных единиц" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Bo'lib to'lash to'lovlari hisoboti", ru: "Отчёт по платежам рассрочки" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
          {
            label: { uz: "Narx tahlili", ru: "Ценовая аналитика" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
          {
            label: { uz: "Yangi savdo rejasini tuzish", ru: "Создание нового плана продаж" },
            plans: { start: false, standard: true, progress: false, expert: true, premium: true },
          },
          {
            label: { uz: "Savdo bo'limi ko'rsatkichlari", ru: "Показатели отдела продаж" },
            plans: { start: false, standard: true, progress: false, expert: false, premium: true },
          },
          {
            label: { uz: "Xodimlar KPI si", ru: "KPI сотрудников" },
            plans: { start: false, standard: true, progress: false, expert: false, premium: true },
          },
          {
            label: { uz: "Obyektlar kesimidagi hisobot", ru: "Отчёты в разрезе объектов" },
            plans: { start: false, standard: true, progress: false, expert: false, premium: true },
          },
        ],
      },
      {
        title: { uz: "Xodimlar va nazorat", ru: "Сотрудники и контроль" },
        items: [
          {
            label: { uz: "Rollar bo'yicha ruxsatlarni taqsimlash", ru: "Распределение прав по ролям" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Xodimning shaxsiy kabineti", ru: "Личный кабинет сотрудника" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Harakatlar jurnali: kim, qachon, nima, IP manzil", ru: "Журнал действий: кто, когда, что, IP-адрес" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
          {
            label: { uz: "Jurnal va hisobotlarni Excel'ga chiqarish", ru: "Выгрузка журнала и отчётов в Excel" },
            plans: { start: true, standard: true, progress: true, expert: true, premium: true },
          },
        ],
      },
    ],
  },

  /* ==========================================================
     4. SAYTLAR VA PORTALLAR
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

  /* ==========================================================
     5. TINCH CRM  —  tez orada
     ========================================================== */
  {
    id: "crm",
    icon: "handshake",
    image: { webp: "./images/opt/crm.webp", jpg: "./images/opt/crm.jpg" },
    soon: true,
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
     6. TINCH ERP  —  tez orada
     ========================================================== */
  {
    id: "erp",
    icon: "settings",
    image: { webp: "./images/opt/erp.webp", jpg: "./images/opt/erp.jpg" },
    soon: true,
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
];
