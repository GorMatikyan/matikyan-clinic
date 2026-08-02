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
  "/services/dental-cleaning-check-up": {
    hy: { title: "Մասնագիտական բերանի հիգիենա | Matikyan Dental Clinic", description: "Ամրագրեք մասնագիտական բերանի հիգիենա Matikyan Dental Clinic-ում՝ ուլտրաձայնային մաքրման, AirFlow-ի և կանխարգելիչ խնամքի համար։" },
    ru: { title: "Профессиональная гигиена полости рта | Matikyan Dental Clinic", description: "Запишитесь на профессиональную гигиену полости рта в Matikyan Dental Clinic для ультразвуковой чистки, AirFlow и профилактического ухода." },
  },
  "/services/teeth-whitening": {
    hy: { title: "Ատամների սպիտակեցում | Matikyan Dental Clinic", description: "Պայծառացրեք ժպիտը Matikyan Dental Clinic-ում՝ կապպային կամ լուսային սպիտակեցման տարբերակներով՝ ըստ ձեր կլինիկական կարիքի։" },
    ru: { title: "Отбеливание зубов | Matikyan Dental Clinic", description: "Осветлите улыбку в Matikyan Dental Clinic с помощью каппового или светового отбеливания, подобранного по показаниям." },
  },
  "/services/veneers": {
    hy: { title: "Վինիրներ և էսթետիկ վերականգնումներ | Matikyan Dental Clinic", description: "Ծանոթացեք վինիրներին, կոմպոզիտ վերականգնումներին և կուլտի վերականգնմանը Matikyan Dental Clinic-ում՝ ժպիտի գեղագիտության և ատամի կառուցվածքի վերականգնման համար։" },
    ru: { title: "Виниры и эстетические реставрации | Matikyan Dental Clinic", description: "Узнайте о винирах, композитных реставрациях и build-up в Matikyan Dental Clinic для эстетики улыбки и восстановления структуры зуба." },
  },
  "/services/dental-implants": {
    hy: { title: "Ատամնային իմպլանտներ | Matikyan Dental Clinic", description: "Վերականգնեք բացակայող ատամները Matikyan Dental Clinic-ում ատամնային իմպլանտների միջոցով՝ ճշգրիտ պլանավորմամբ և երկարաժամկետ վերականգնողական լուծմամբ։" },
    ru: { title: "Зубные импланты | Matikyan Dental Clinic", description: "Восстановите отсутствующие зубы с помощью имплантов в Matikyan Dental Clinic благодаря точному планированию и долговременному восстановительному решению." },
  },
  "/services/prosthetics-crowns": {
    hy: { title: "Պրոթեզավորում և պսակներ | Matikyan Dental Clinic", description: "Վերականգնեք ծամելու ֆունկցիան և ժպիտի գեղագիտությունը Matikyan Dental Clinic-ում՝ պսակներով, շարժական պրոթեզներով և թվային օրթոպեդիկ պլանավորմամբ։" },
    ru: { title: "Протезирование и коронки | Matikyan Dental Clinic", description: "Восстановите жевательную функцию и эстетику улыбки в Matikyan Dental Clinic с помощью коронок, съемного протезирования и цифрового планирования." },
  },
  "/services/root-canal-treatment": {
    hy: { title: "Էնդոդոնտիկ բուժում | Matikyan Dental Clinic", description: "Բուժեք պուլպիտը և արմատախողովակային վարակները Matikyan Dental Clinic-ում՝ ժամանակակից էնդոդոնտիկ մոտեցմամբ և մանրակրկիտ մշակումով։" },
    ru: { title: "Эндодонтическое лечение | Matikyan Dental Clinic", description: "Лечите пульпит и инфекции корневых каналов в Matikyan Dental Clinic с современным эндодонтическим подходом и точной обработкой каналов." },
  },
  "/services/orthodontics": {
    hy: { title: "Օրթոդոնտիա | Matikyan Dental Clinic", description: "Ծանոթացեք օրթոդոնտիկ բուժմանը Matikyan Dental Clinic-ում՝ թափանցիկ կապաններ և բրեկետներ ատամների դասավորության ու կծվածքի շտկման համար։" },
    ru: { title: "Ортодонтия | Matikyan Dental Clinic", description: "Узнайте об ортодонтическом лечении в Matikyan Dental Clinic: прозрачные элайнеры и брекеты для коррекции положения зубов и прикуса." },
  },
  "/services/periodontal-treatment": {
    hy: { title: "Պերիոդոնտալ բուժում | Matikyan Dental Clinic", description: "Վերահսկեք լնդերի հիվանդությունները Matikyan Dental Clinic-ում իրականացվող պերիոդոնտալ բուժմամբ՝ խորը մաքրումով, մասնագիտական խնամքով և հսկողությամբ։" },
    ru: { title: "Пародонтологическое лечение | Matikyan Dental Clinic", description: "Контролируйте заболевания десен с помощью пародонтологического лечения в Matikyan Dental Clinic, включая глубокую чистку, специализированный уход и наблюдение." },
  },
  "/services/oral-surgery": {
    hy: { title: "Բերանի խոռոչի վիրաբուժություն | Matikyan Dental Clinic", description: "Ծանոթացեք բերանի խոռոչի վիրաբուժական ծառայություններին Matikyan Dental Clinic-ում՝ հեռացումներ, ապիկոէկտոմիա, սինուս-լիֆտ և ոսկրային պլաստիկա։" },
    ru: { title: "Хирургическая стоматология | Matikyan Dental Clinic", description: "Узнайте о хирургических услугах Matikyan Dental Clinic: удаление зубов, апикоэктомия, синус-лифтинг и костная пластика." },
  },
  "/services/digital-diagnostics": {
    hy: { title: "Ախտորոշում և թվային ստոմատոլոգիա | Matikyan Dental Clinic", description: "Ամրագրեք թվային ախտորոշում Matikyan Dental Clinic-ում՝ RVG, պանորամային նկար, 3D CT, խորհրդատվություն և բուժման պլանավորում։" },
    ru: { title: "Диагностика и цифровая стоматология | Matikyan Dental Clinic", description: "Запишитесь на цифровую диагностику в Matikyan Dental Clinic: RVG, панорамный снимок, 3D КТ, консультация и планирование лечения." },
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
      hy: "Matikyan Dental Clinic-ը առաջարկում է կանխարգելիչ, էսթետիկ, վերականգնողական, օրթոդոնտիկ և վիրաբուժական ստոմատոլոգիական խնամք՝ բուժառուակենտրոն մոտեցմամբ։",
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
      hy: "Ծանոթացեք Matikyan Dental Clinic-ի պատմությանը, բուժական փիլիսոփայությանը, փորձառու թիմին և բուժառուակենտրոն մոտեցմանը։",
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
  "/services": createSeoEntry(
    "/services",
    {
      hy: "Ստոմատոլոգիական ծառայություններ | Matikyan Dental Clinic",
      en: "Dental Services | Matikyan Dental Clinic",
      ru: "Стоматологические услуги | Matikyan Dental Clinic",
    },
    {
      hy: "Դիտարկեք Matikyan Dental Clinic-ի ծառայությունները՝ ներառյալ հիգիենա, սպիտակեցում, վինիրներ, իմպլանտներ, էնդոդոնտիա, օրթոդոնտիա և թվային ախտորոշում։",
      en: "Explore dental services at Matikyan Dental Clinic including hygiene, whitening, veneers, implants, endodontics, orthodontics, and digital diagnostics.",
      ru: "Ознакомьтесь с услугами Matikyan Dental Clinic: гигиена, отбеливание, виниры, имплантация, эндодонтия, ортодонтия и цифровая диагностика.",
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
      hy: "Ստացեք պատասխաններ խորհրդատվությունների, բուժումների, Invisalign-ի, գների, վճարման և բուժառուի խնամքի վերաբերյալ ամենատարածված հարցերին։",
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
  "/warranty": createSeoEntry(
    "/warranty",
    {
      hy: "Երաշխիքային քաղաքականություն | Matikyan Dental Clinic",
      en: "Warranty Policy | Matikyan Dental Clinic",
      ru: "Гарантийная политика | Matikyan Dental Clinic",
    },
    {
      hy: "Ծանոթացեք Matikyan Dental Clinic-ի երաշխիքային քաղաքականությանը, երաշխիքային ժամկետներին և պայմաններին տարբեր ստոմատոլոգիական աշխատանքների համար։",
      en: "Review the Matikyan Dental Clinic warranty policy, warranty periods, and conditions for different dental treatments.",
      ru: "Ознакомьтесь с гарантийной политикой Matikyan Dental Clinic, сроками гарантии и условиями для разных стоматологических работ.",
    },
  ),
  "/dental-tourism": createSeoEntry(
    "/dental-tourism",
    {
      hy: "Ստոմատոլոգիական տուրիզմ Հայաստանում | Matikyan Dental Clinic",
      en: "Dental Tourism in Armenia | Matikyan Dental Clinic",
      ru: "Стомтуризм в Армении | Matikyan Dental Clinic",
    },
    {
      hy: "Matikyan Dental Clinic-ը օգնում է արտերկրից ժամանող բուժառուներին համադրել ստոմատոլոգիական բուժումը Հայաստանում հանգստի և ուղևորության կազմակերպման հետ։",
      en: "Matikyan Dental Clinic helps international patients combine dental treatment in Armenia with travel support, translation, and sightseeing.",
      ru: "Matikyan Dental Clinic помогает иностранным пациентам совместить стоматологическое лечение в Армении с трансфером, переводом и экскурсиями.",
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
