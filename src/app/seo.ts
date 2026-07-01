import logoImg from "../imports/matikyan-clinic-logo-am.png";
import type { AppLanguage } from "./routing";
import { serviceDetails } from "./serviceData";

const BASE_URL = "https://matikyan.am";
const DEFAULT_OG_IMAGE = absoluteUrl(logoImg);

export type SeoMetadata = {
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
};

type LocalizedText = Record<AppLanguage, string>;

type LocalizedSeoEntry = {
  canonicalPath: string;
  title: LocalizedText;
  description: LocalizedText;
  ogTitle?: LocalizedText;
  ogDescription?: LocalizedText;
  ogType?: "website" | "article";
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
};

const defaultMetadata: Record<AppLanguage, SeoMetadata> = {
  hy: {
    title: "Matikyan Dental Clinic",
    description:
      "Matikyan Dental Clinic-ը մատուցում է ժամանակակից ստոմատոլոգիական խնամք, ժպիտի վերականգնում և կանխարգելիչ բուժում հարմարավետ միջավայրում։",
    canonicalPath: "/",
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
    twitterCard: "summary",
  },
  en: {
    title: "Matikyan Dental Clinic",
    description:
      "Matikyan Dental Clinic provides modern dentistry, smile restoration, preventive care, and specialist consultations in a comfortable clinical setting.",
    canonicalPath: "/",
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
    twitterCard: "summary",
  },
  ru: {
    title: "Matikyan Dental Clinic",
    description:
      "Matikyan Dental Clinic предлагает современную стоматологию, восстановление улыбки, профилактику и консультации специалистов в комфортной клинической среде.",
    canonicalPath: "/",
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
    twitterCard: "summary",
  },
};

const notFoundMetadata: Record<AppLanguage, SeoMetadata> = {
  hy: {
    ...defaultMetadata.hy,
    title: "Matikyan Dental Clinic | Էջը չի գտնվել",
    description:
      "Պահանջված էջը Matikyan Dental Clinic կայքում չի գտնվել։ Վերադարձեք գլխավոր էջ և շարունակեք դիտարկումը։",
  },
  en: {
    ...defaultMetadata.en,
    title: "Matikyan Dental Clinic | Page Not Found",
    description:
      "The requested page could not be found at Matikyan Dental Clinic. Return to the homepage to continue browsing the site.",
  },
  ru: {
    ...defaultMetadata.ru,
    title: "Matikyan Dental Clinic | Страница не найдена",
    description:
      "Запрашиваемая страница на сайте Matikyan Dental Clinic не найдена. Вернитесь на главную страницу, чтобы продолжить просмотр.",
  },
};

const serviceSeoCopy: Record<
  string,
  {
    hy: { title: string; description: string };
    ru: { title: string; description: string };
  }
> = {
  "/dental-cleaning-check-up": {
    hy: {
      title: "Մասնագիտական մաքրում և ստուգում | Matikyan Dental Clinic",
      description:
        "Ամրագրեք մասնագիտական ատամնային մաքրում և ստուգում Matikyan Dental Clinic-ում՝ կանխարգելիչ խնամքի, զննման և խնդրի վաղ հայտնաբերման համար։",
    },
    ru: {
      title: "Профессиональная чистка и осмотр | Matikyan Dental Clinic",
      description:
        "Запишитесь на профессиональную чистку зубов и осмотр в Matikyan Dental Clinic для профилактики, диагностики и раннего выявления стоматологических проблем.",
    },
  },
  "/teeth-whitening": {
    hy: {
      title: "Ատամների մասնագիտական սպիտակեցում | Matikyan Dental Clinic",
      description:
        "Պայծառացրեք ժպիտը Matikyan Dental Clinic-ում կատարվող մասնագիտական սպիտակեցմամբ՝ անվտանգ, արդյունավետ և ձեր նպատակներին հարմարեցված մոտեցմամբ։",
    },
    ru: {
      title: "Профессиональное отбеливание зубов | Matikyan Dental Clinic",
      description:
        "Осветлите улыбку с профессиональным отбеливанием в Matikyan Dental Clinic с безопасным клиническим подходом и учетом ваших эстетических целей.",
    },
  },
  "/veneers": {
    hy: {
      title: "Պորցելյան վինիրներ | Matikyan Dental Clinic",
      description:
        "Ծանոթացեք պորցելյան վինիրներին Matikyan Dental Clinic-ում՝ ժպիտի դիզայնի, ձևի շտկման և բնական տեսքով էսթետիկ վերափոխման համար։",
    },
    ru: {
      title: "Фарфоровые виниры | Matikyan Dental Clinic",
      description:
        "Узнайте о фарфоровых винирах в Matikyan Dental Clinic для гармоничного дизайна улыбки, коррекции формы зубов и естественного эстетического результата.",
    },
  },
  "/composite-bonding": {
    hy: {
      title: "Կոմպոզիտ բոնդինգ | Matikyan Dental Clinic",
      description:
        "Բարելավեք ատամների ձևը, փոքր ճաքերն ու բացվածքները կոմպոզիտ բոնդինգի միջոցով Matikyan Dental Clinic-ում՝ պահպանողական և մեկ այցով բուժմամբ։",
    },
    ru: {
      title: "Композитный бондинг | Matikyan Dental Clinic",
      description:
        "Скорректируйте форму зубов, сколы и промежутки с помощью композитного бондинга в Matikyan Dental Clinic в рамках бережного лечения за одно посещение.",
    },
  },
  "/dental-implants": {
    hy: {
      title: "Ատամնային իմպլանտներ | Matikyan Dental Clinic",
      description:
        "Վերականգնեք բացակայող ատամները Matikyan Dental Clinic-ում ատամնային իմպլանտների միջոցով՝ ճշգրիտ պլանավորմամբ և երկարաժամկետ վերականգնողական լուծմամբ։",
    },
    ru: {
      title: "Зубные импланты | Matikyan Dental Clinic",
      description:
        "Восстановите отсутствующие зубы с помощью имплантов в Matikyan Dental Clinic благодаря точному планированию и долговременному восстановительному решению.",
    },
  },
  "/same-day-crowns": {
    hy: {
      title: "Մեկօրյա պսակներ | Matikyan Dental Clinic",
      description:
        "Ստացեք մեկօրյա կերամիկական պսակ Matikyan Dental Clinic-ում՝ թվային սկանավորմամբ և կլինիկայում կատարվող ճշգրիտ պատրաստմամբ։",
    },
    ru: {
      title: "Коронки за один день | Matikyan Dental Clinic",
      description:
        "Получите керамическую коронку за одно посещение в Matikyan Dental Clinic с цифровым сканированием и точным изготовлением на месте.",
    },
  },
  "/root-canal-treatment": {
    hy: {
      title: "Արմատախողովակային բուժում | Matikyan Dental Clinic",
      description:
        "Փրկեք վարակված կամ ցավող ատամը Matikyan Dental Clinic-ում իրականացվող արմատախողովակային բուժմամբ՝ ժամանակակից էնդոդոնտիկ մոտեցմամբ։",
    },
    ru: {
      title: "Лечение корневых каналов | Matikyan Dental Clinic",
      description:
        "Сохраните инфицированный или болезненный зуб с помощью лечения корневых каналов в Matikyan Dental Clinic с современным эндодонтическим подходом.",
    },
  },
  "/invisalign": {
    hy: {
      title: "Invisalign թափանցիկ կապաններ | Matikyan Dental Clinic",
      description:
        "Ուղղեք ատամները Invisalign թափանցիկ կապաններով Matikyan Dental Clinic-ում՝ թվային պլանավորմամբ և աչքի չընկնող օրթոդոնտիկ բուժմամբ։",
    },
    ru: {
      title: "Прозрачные элайнеры Invisalign | Matikyan Dental Clinic",
      description:
        "Выравнивайте зубы с помощью прозрачных элайнеров Invisalign в Matikyan Dental Clinic с цифровым планированием и деликатным ортодонтическим лечением.",
    },
  },
  "/ceramic-braces": {
    hy: {
      title: "Կերամիկական բրեկետներ | Matikyan Dental Clinic",
      description:
        "Շտկեք կծվածքն ու ատամների շարքը Matikyan Dental Clinic-ում կերամիկական բրեկետների միջոցով՝ արդյունավետ և ավելի նուրբ տեսքով օրթոդոնտիկ բուժմամբ։",
    },
    ru: {
      title: "Керамические брекеты | Matikyan Dental Clinic",
      description:
        "Исправьте прикус и положение зубов с помощью керамических брекетов в Matikyan Dental Clinic для эффективного и более деликатного ортодонтического лечения.",
    },
  },
  "/periodontal-treatment": {
    hy: {
      title: "Պերիոդոնտալ բուժում | Matikyan Dental Clinic",
      description:
        "Վերահսկեք լնդերի հիվանդությունները Matikyan Dental Clinic-ում իրականացվող պերիոդոնտալ բուժմամբ՝ խորը մաքրումով, մասնագիտական խնամքով և հսկողությամբ։",
    },
    ru: {
      title: "Пародонтологическое лечение | Matikyan Dental Clinic",
      description:
        "Контролируйте заболевания десен с помощью пародонтологического лечения в Matikyan Dental Clinic, включая глубокую чистку, специализированный уход и наблюдение.",
    },
  },
  "/wisdom-tooth-extraction": {
    hy: {
      title: "Իմաստության ատամի հեռացում | Matikyan Dental Clinic",
      description:
        "Ամրագրեք իմաստության ատամի հեռացում Matikyan Dental Clinic-ում՝ ցավ պատճառող կամ ներսում մնացած ատամների համար՝ մանրակրկիտ պլանավորմամբ և հետվիրահատական ուղեցույցով։",
    },
    ru: {
      title: "Удаление зуба мудрости | Matikyan Dental Clinic",
      description:
        "Запишитесь на удаление зуба мудрости в Matikyan Dental Clinic при боли, ретенции или воспалении с тщательным планированием и поддержкой после процедуры.",
    },
  },
  "/pediatric-dentistry": {
    hy: {
      title: "Մանկական ստոմատոլոգիա | Matikyan Dental Clinic",
      description:
        "Բացահայտեք մանկական ստոմատոլոգիան Matikyan Dental Clinic-ում՝ նուրբ կանխարգելիչ խնամքով, մաքրումներով, ֆտորով և երեխաների ժպիտի վաղ վերահսկմամբ։",
    },
    ru: {
      title: "Детская стоматология | Matikyan Dental Clinic",
      description:
        "Познакомьтесь с детской стоматологией в Matikyan Dental Clinic: бережная профилактика, чистка, фторирование и раннее наблюдение за развитием улыбки ребенка.",
    },
  },
};

const routeSeo: Record<string, LocalizedSeoEntry> = {
  "/": createSeoEntry(
    "/",
    {
      hy: "Matikyan Dental Clinic | Ժամանակակից ստոմատոլոգիա Հայաստանում",
      en: "Matikyan Dental Clinic | Advanced Dental Care in Armenia",
      ru: "Matikyan Dental Clinic | Современная стоматология в Армении",
    },
    {
      hy: "Matikyan Dental Clinic-ը առաջարկում է կանխարգելիչ, էսթետիկ, վերականգնողական, օրթոդոնտիկ և վիրաբուժական ստոմատոլոգիական խնամք՝ պացիենտակենտրոն մոտեցմամբ։",
      en: "Matikyan Dental Clinic offers preventive, cosmetic, restorative, orthodontic, and surgical dental care with a modern patient-focused approach.",
      ru: "Matikyan Dental Clinic предлагает профилактическое, эстетическое, восстановительное, ортодонтическое и хирургическое стоматологическое лечение с вниманием к каждому пациенту.",
    },
    {
      hy: "Matikyan Dental Clinic | Ժամանակակից ստոմատոլոգիա Հայաստանում",
      en: "Matikyan Dental Clinic | Advanced Dental Care in Armenia",
      ru: "Matikyan Dental Clinic | Современная стоматология в Армении",
    },
    {
      hy: "Բացահայտեք ժամանակակից ստոմատոլոգիա, փորձառու մասնագետներ և հարմարավետ բուժում Matikyan Dental Clinic-ում։",
      en: "Explore modern dental care, experienced clinicians, and patient-focused treatment at Matikyan Dental Clinic.",
      ru: "Познакомьтесь с современной стоматологией, опытными специалистами и комфортным лечением в Matikyan Dental Clinic.",
    },
  ),
  "/about": createSeoEntry(
    "/about",
    {
      hy: "Matikyan Dental Clinic-ի մասին | Մեր թիմն ու մոտեցումը",
      en: "About Matikyan Dental Clinic | Our Team and Approach",
      ru: "О Matikyan Dental Clinic | Команда и подход",
    },
    {
      hy: "Ծանոթացեք Matikyan Dental Clinic-ի պատմությանը, բուժական փիլիսոփայությանը, փորձառու թիմին և պացիենտակենտրոն մոտեցմանը։",
      en: "Learn about Matikyan Dental Clinic, our clinical philosophy, experienced team, and commitment to precise, patient-centered dental care.",
      ru: "Узнайте больше о Matikyan Dental Clinic, нашей клинической философии, опытной команде и внимательном подходе к лечению.",
    },
  ),
  "/doctors": createSeoEntry(
    "/doctors",
    {
      hy: "Բժիշկներ և մասնագետներ | Matikyan Dental Clinic",
      en: "Dentists and Specialists | Matikyan Dental Clinic",
      ru: "Врачи и специалисты | Matikyan Dental Clinic",
    },
    {
      hy: "Ծանոթացեք Matikyan Dental Clinic-ի բժիշկներին և մասնագետներին՝ իմպլանտոլոգիայի, օրթոդոնտիայի, էսթետիկ, մանկական և վերականգնողական ստոմատոլոգիայի ուղղություններով։",
      en: "Meet the dentists and specialists at Matikyan Dental Clinic, including implantology, orthodontics, cosmetic, pediatric, and restorative care experts.",
      ru: "Познакомьтесь с врачами и специалистами Matikyan Dental Clinic в области имплантологии, ортодонтии, эстетической, детской и восстановительной стоматологии.",
    },
  ),
  "/reviews": createSeoEntry(
    "/reviews",
    {
      hy: "Պացիենտների կարծիքներ | Matikyan Dental Clinic",
      en: "Patient Reviews | Matikyan Dental Clinic",
      ru: "Отзывы пациентов | Matikyan Dental Clinic",
    },
    {
      hy: "Կարդացեք պացիենտների կարծիքներն ու բուժման փորձը էսթետիկ ստոմատոլոգիայի, իմպլանտների, օրթոդոնտիայի, մանկական և ընդհանուր ստոմատոլոգիական ծառայությունների մասին։",
      en: "Read patient reviews and treatment feedback for cosmetic dentistry, implants, orthodontics, pediatric care, and general dental services at Matikyan Dental Clinic.",
      ru: "Прочитайте отзывы пациентов о лечении, имплантации, ортодонтии, детской и общей стоматологии в Matikyan Dental Clinic.",
    },
  ),
  "/services": createSeoEntry(
    "/services",
    {
      hy: "Ստոմատոլոգիական ծառայություններ | Matikyan Dental Clinic",
      en: "Dental Services | Matikyan Dental Clinic",
      ru: "Стоматологические услуги | Matikyan Dental Clinic",
    },
    {
      hy: "Դիտարկեք Matikyan Dental Clinic-ի ծառայությունները՝ ներառյալ իմպլանտներ, սպիտակեցում, վինիրներ, արմատախողովակային բուժում, օրթոդոնտիա և մանկական ստոմատոլոգիա։",
      en: "Explore dental services at Matikyan Dental Clinic including implants, whitening, veneers, root canal treatment, orthodontics, and pediatric dentistry.",
      ru: "Ознакомьтесь с услугами Matikyan Dental Clinic: имплантация, отбеливание, виниры, лечение каналов, ортодонтия и детская стоматология.",
    },
  ),
  "/faq": createSeoEntry(
    "/faq",
    {
      hy: "Հաճախ տրվող հարցեր | Matikyan Dental Clinic",
      en: "Dental FAQ | Matikyan Dental Clinic",
      ru: "Часто задаваемые вопросы | Matikyan Dental Clinic",
    },
    {
      hy: "Ստացեք պատասխաններ խորհրդատվությունների, բուժումների, Invisalign-ի, գների, վճարման և պացիենտական խնամքի վերաբերյալ ամենատարածված հարցերին։",
      en: "Find answers to common questions about consultations, dental treatments, Invisalign, pricing, insurance, and patient care at Matikyan Dental Clinic.",
      ru: "Найдите ответы на частые вопросы о консультациях, лечении, Invisalign, стоимости, оплате и заботе о пациентах в Matikyan Dental Clinic.",
    },
  ),
  "/blog": createSeoEntry(
    "/blog",
    {
      hy: "Ստոմատոլոգիական բլոգ | Matikyan Dental Clinic",
      en: "Dental Blog | Matikyan Dental Clinic",
      ru: "Стоматологический блог | Matikyan Dental Clinic",
    },
    {
      hy: "Կարդացեք Matikyan Dental Clinic-ի խորհուրդներն ու նորությունները բերանի խոռոչի առողջության, էսթետիկ ստոմատոլոգիայի, օրթոդոնտիայի և բուժման տեխնոլոգիաների մասին։",
      en: "Read practical dental advice and clinic updates from Matikyan Dental Clinic on oral health, cosmetic dentistry, orthodontics, and treatment technology.",
      ru: "Читайте практические советы и новости Matikyan Dental Clinic о здоровье полости рта, эстетической стоматологии, ортодонтии и технологиях лечения.",
    },
  ),
  "/contact": createSeoEntry(
    "/contact",
    {
      hy: "Կապ Matikyan Dental Clinic-ի հետ | Ամրագրեք խորհրդատվություն",
      en: "Contact Matikyan Dental Clinic | Book a Consultation",
      ru: "Контакты Matikyan Dental Clinic | Запись на консультацию",
    },
    {
      hy: "Կապվեք Matikyan Dental Clinic-ի հետ՝ խորհրդատվություն ամրագրելու, բուժումների մասին հարցեր տալու և կլինիկայի կոնտակտային տվյալները տեսնելու համար։",
      en: "Contact Matikyan Dental Clinic to book a consultation, ask about treatments, and find clinic details including phone, email, and opening hours.",
      ru: "Свяжитесь с Matikyan Dental Clinic, чтобы записаться на консультацию, задать вопросы о лечении и посмотреть контакты клиники.",
    },
  ),
  ...Object.fromEntries(
    serviceDetails.map((service) => [
      service.slug,
      createSeoEntry(
        service.slug,
        {
          hy: serviceSeoCopy[service.slug].hy.title,
          en: service.metaTitle,
          ru: serviceSeoCopy[service.slug].ru.title,
        },
        {
          hy: serviceSeoCopy[service.slug].hy.description,
          en: service.metaDescription,
          ru: serviceSeoCopy[service.slug].ru.description,
        },
      ),
    ]),
  ),
};

export function getSeoMetadata(pathname: string, language: AppLanguage): SeoMetadata | null {
  const entry = routeSeo[pathname];

  if (!entry) {
    return null;
  }

  return {
    title: entry.title[language],
    description: entry.description[language],
    canonicalPath: entry.canonicalPath,
    ogTitle: entry.ogTitle?.[language] ?? entry.title[language],
    ogDescription: entry.ogDescription?.[language] ?? entry.description[language],
    ogType: entry.ogType ?? "website",
    ogImage: entry.ogImage ?? DEFAULT_OG_IMAGE,
    twitterCard: entry.twitterCard ?? "summary",
  };
}

export function getNotFoundSeoMetadata(language: AppLanguage): SeoMetadata {
  return notFoundMetadata[language];
}

export function buildCanonicalUrl(pathname: string) {
  return absoluteUrl(pathname);
}

function createSeoEntry(
  canonicalPath: string,
  title: LocalizedText,
  description: LocalizedText,
  ogTitle?: LocalizedText,
  ogDescription?: LocalizedText,
): LocalizedSeoEntry {
  return {
    canonicalPath,
    title,
    description,
    ogTitle,
    ogDescription,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
    twitterCard: "summary",
  };
}

function absoluteUrl(path: string) {
  return new URL(path, `${BASE_URL}/`).toString();
}
