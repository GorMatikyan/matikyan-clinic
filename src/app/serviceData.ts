import type { SanityService } from "../lib/sanityTypes";
import i18n from "../i18n";
import serviceDentalImplants from "../../images/services/service-dental-implants.jpg";
import serviceDigitalDiagnostics from "../../images/services/service-digital-diagnostics.jpg";
import serviceEndodonticTreatment from "../../images/services/service-endodontic-treatment.jpg";
import serviceOralSurgery from "../../images/services/service-oral-surgery.jpg";
import serviceOrthodontics from "../../images/services/service-orthodontics.jpg";
import servicePeriodontalTreatment from "../../images/services/service-periodontal-treatment.jpg";
import serviceProfessionalOralHygiene from "../../images/services/service-professional-oral-hygiene.jpg";
import serviceProstheticsCrowns from "../../images/services/service-prosthetics-crowns.jpg";
import serviceTeethWhitening from "../../images/services/service-teeth-whitening.jpg";
import serviceVeneersRestorations from "../../images/services/service-veneers-restorations.jpg";

export type ServiceDetail = SanityService & {
  slug: string;
  intro: string;
  h2Title: string;
  h2Description: string;
  processTitle: string;
  process: string[];
  candidatesTitle: string;
  candidates: string[];
  treatmentOptions?: string[];
  technology?: string[];
  faqs?: string[];
  metaTitle: string;
  metaDescription: string;
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "/services/dental-cleaning-check-up",
    category: "Therapy",
    title: "Professional Oral Hygiene",
    tagline: "Ultrasonic scaling, AirFlow, and preventive care",
    desc: "Professional oral hygiene helps remove plaque, tartar, and surface stains using ultrasonic cleaning and AirFlow, while supporting healthier gums and cleaner teeth.",
    price: "From $80",
    duration: "60 min",
    rating: 4.9,
    image: serviceProfessionalOralHygiene,
    benefits: [
      "Ultrasonic tartar removal",
      "AirFlow polishing",
      "Cleaner tooth surfaces",
      "Prevention-focused care"
    ],
    intro: "Professional hygiene is one of the core therapeutic services at the clinic. It combines deposit removal, polishing, and preventive assessment to reduce inflammation and maintain oral health.",
    h2Title: "What this service includes",
    h2Description: "The visit is designed to remove hard and soft deposits, improve hygiene access, and reduce factors that contribute to gum irritation and unpleasant breath.",
    processTitle: "Typical hygiene appointment",
    process: [
      "Assessment of plaque, tartar, staining, and gum condition.",
      "Ultrasonic removal of calculus and professional cleaning of tooth surfaces.",
      "AirFlow polishing and hygiene recommendations based on your needs."
    ],
    candidatesTitle: "Often recommended for",
    candidates: [
      "Patients with tartar buildup, staining, or bleeding gums.",
      "Adults and teens due for professional oral hygiene.",
      "Anyone preparing for restorative, orthodontic, or whitening treatment."
    ],
    metaTitle: "Professional Oral Hygiene | Matikyan Dental Clinic",
    metaDescription: "Book professional oral hygiene at Matikyan Dental Clinic for ultrasonic scaling, AirFlow cleaning, and preventive gum and tooth care."
  },
  {
    slug: "/services/teeth-whitening",
    category: "Therapy",
    title: "Teeth Whitening",
    tagline: "Tray-based and light whitening options",
    desc: "Clinical whitening helps brighten teeth after shade assessment, using dentist-guided tray-based or light-activated methods depending on the case.",
    price: "From $350",
    duration: "90 min",
    rating: 5,
    image: serviceTeethWhitening,
    benefits: [
      "Visible brightening",
      "In-clinic supervision",
      "Tray whitening option",
      "Light whitening option"
    ],
    intro: "Whitening is offered after checking enamel condition, gum health, and the type of discoloration. The goal is safer, more even brightening with an approach suited to the patient.",
    h2Title: "How whitening is selected",
    h2Description: "Whitening planning starts with an examination and shade review so the method matches the condition of the teeth and the expected result.",
    processTitle: "Whitening options may include",
    process: [
      "Clinical shade assessment and suitability evaluation.",
      "Tray-based whitening or light-activated whitening depending on indication.",
      "Post-treatment advice to help maintain a brighter result."
    ],
    candidatesTitle: "Often suitable for",
    candidates: [
      "Patients with external discoloration or age-related darkening.",
      "Adults seeking a non-invasive aesthetic improvement.",
      "Cases where existing restorations do not limit color matching."
    ],
    metaTitle: "Teeth Whitening | Matikyan Dental Clinic",
    metaDescription: "Brighten your smile with teeth whitening at Matikyan Dental Clinic using tray-based or light whitening options selected for your case."
  },
  {
    slug: "/services/veneers",
    category: "Orthopedics",
    title: "Dental Veneers & Aesthetic Restorations",
    tagline: "Veneers, composite restorations, and tooth build-up",
    desc: "Aesthetic dentistry improves visible tooth shape, color, and structure with veneers, composite restorations, and build-up when a tooth needs support before a crown.",
    price: "From $900/tooth",
    duration: "2 appointments",
    rating: 5,
    image: serviceVeneersRestorations,
    benefits: [
      "E.max and ceramic veneers",
      "Composite veneers and bonding",
      "Aesthetic tooth-colored restorations",
      "Tooth build-up under crowns"
    ],
    intro: "This service combines dental veneers with aesthetic restorations and tooth build-up. It is used when visible teeth need shape or color improvement, when damaged tooth structure must be restored, or when a tooth requires a stable base before prosthetic treatment.",
    h2Title: "Veneers, restorations, and build-up planning",
    h2Description: "The treatment plan depends on enamel condition, remaining tooth structure, bite load, aesthetic goals, and whether a ceramic or composite solution is more appropriate.",
    processTitle: "Treatment planning may include",
    process: [
      "Aesthetic consultation, shade review, and assessment of tooth structure.",
      "Selection of ceramic veneers, composite veneers, tooth-colored restorations, or build-up.",
      "Try-in, restoration, bonding, or preparation for the next prosthetic stage when needed."
    ],
    candidatesTitle: "Frequently chosen for",
    candidates: [
      "Visible chips, spacing, discoloration, worn edges, or uneven contours.",
      "Caries, fractures, old filling loss, or damaged tooth surfaces requiring aesthetic restoration.",
      "Teeth that need build-up before a crown or broader prosthetic plan."
    ],
    metaTitle: "Dental Veneers & Aesthetic Restorations | Matikyan Dental Clinic",
    metaDescription: "Explore veneers, composite bonding, aesthetic restorations, and tooth build-up at Matikyan Dental Clinic for smile aesthetics and tooth structure restoration.",
    treatmentOptions: [
      "E.max, ceramic, and composite veneers for front-tooth aesthetics.",
      "Composite bonding and tooth-colored restorations for selected defects.",
      "Core build-up when a tooth needs support before a crown."
    ],
    technology: [
      "Digital records or impressions support smile and restoration planning.",
      "Adhesive restorative materials support conservative reconstruction when clinically possible.",
      "Material selection considers bite, tooth structure, aesthetics, and future prosthetic needs."
    ],
    faqs: [
      "When are veneers or aesthetic restorations recommended?::They are considered for visible discoloration, chips, spacing, worn edges, caries damage, or tooth structure loss.",
      "Are ceramic veneers and composite restorations the same?::No. They differ in material, preparation, repair options, aesthetics, and long-term maintenance.",
      "What is tooth build-up before a crown?::Build-up restores missing tooth structure so a future crown can have better support when the tooth is suitable for restoration."
    ]
  },
  {
    slug: "/services/dental-implants",
    category: "Surgery",
    title: "Dental Implants",
    tagline: "Implant placement with bone support options",
    desc: "Implant treatment restores missing teeth with surgical planning, implant placement, and supportive procedures such as bone grafting when indicated.",
    price: "From $2,400",
    duration: "3–6 months",
    rating: 4.9,
    image: serviceDentalImplants,
    benefits: [
      "Implant placement",
      "Mini-implant options",
      "Bone support planning",
      "Long-term tooth replacement"
    ],
    intro: "Implantology is part of the clinic’s surgical services. Treatment planning focuses on bone volume, implant position, soft tissues, and the future prosthetic restoration.",
    h2Title: "What implant treatment may involve",
    h2Description: "Successful implant treatment depends on diagnostics, surgical planning, healing conditions, and the quality of the final restoration.",
    processTitle: "Typical treatment stages",
    process: [
      "Clinical evaluation and imaging to assess bone and implant feasibility.",
      "Placement of a dental implant or mini-implant when indicated.",
      "Restorative phase after healing, with additional support procedures if needed."
    ],
    candidatesTitle: "Often considered for",
    candidates: [
      "Patients missing one or more teeth.",
      "Patients seeking a fixed alternative to removable prosthetics.",
      "Cases that may also require bone augmentation before restoration."
    ],
    metaTitle: "Dental Implants | Matikyan Dental Clinic",
    metaDescription: "Restore missing teeth with dental implants at Matikyan Dental Clinic using precise planning and long-term restorative treatment."
  },
  {
    slug: "/services/prosthetics-crowns",
    category: "Orthopedics",
    title: "Prosthetics & Crowns",
    tagline: "Fixed, removable, and digitally planned restorations",
    desc: "Orthopedic treatment includes crowns, removable prosthetics, and digitally planned restorative options for rebuilding chewing function and smile aesthetics.",
    price: "From $1,100",
    duration: "2 hours",
    rating: 4.9,
    image: serviceProstheticsCrowns,
    benefits: [
      "Removable prosthetics",
      "Metal-ceramic crowns",
      "Zirconia and E.max options",
      "Digital scanning and CAD/CAM"
    ],
    intro: "Orthopedic care covers both removable and fixed prosthetic solutions, from partial dentures to ceramic crowns and digitally planned restorations.",
    h2Title: "What orthopedic treatment includes",
    h2Description: "The choice of restoration depends on the number of missing teeth, the condition of supporting teeth, bite requirements, and the desired material.",
    processTitle: "Available treatment directions",
    process: [
      "Removable prosthetics including rigid, soft, partial, non-acrylic, or clasp-based options.",
      "Fixed restorations such as metal-ceramic, zirconia, zirconia-ceramic, and E.max crowns.",
      "Digital orthopedics with 3Shape scanning and CAD/CAM-based planning."
    ],
    candidatesTitle: "Often recommended for",
    candidates: [
      "Patients who need crowns, prosthetic rehabilitation, or material replacement.",
      "Cases requiring removable or fixed restorative planning.",
      "Patients who benefit from digital scanning and prosthetic design."
    ],
    metaTitle: "Prosthetics & Crowns | Matikyan Dental Clinic",
    metaDescription: "Restore chewing function and smile aesthetics with crowns, removable prosthetics, and digitally planned orthopedic treatment at Matikyan Dental Clinic."
  },
  {
    slug: "/services/root-canal-treatment",
    category: "Therapy",
    title: "Endodontic Treatment",
    tagline: "Root canal treatment under magnification",
    desc: "Endodontic treatment is used to manage pulpitis, infected canals, and internal tooth damage with cleaning, shaping, filling, and microscope-assisted precision when indicated.",
    price: "From $700",
    duration: "60–90 min",
    rating: 4.9,
    image: serviceEndodonticTreatment,
    benefits: [
      "Pulpitis management",
      "Canal filling",
      "Microscope-assisted treatment",
      "Tooth preservation"
    ],
    intro: "This service covers endodontic diagnosis and treatment of root canal systems when inflammation or infection has reached the inner tissues of the tooth.",
    h2Title: "What endodontic treatment covers",
    h2Description: "The aim is to disinfect and fill the canals thoroughly while preserving the tooth whenever a predictable restorative result is possible.",
    processTitle: "Treatment may include",
    process: [
      "Diagnosis of pulpitis or canal infection with imaging and clinical testing.",
      "Mechanical and chemical cleaning of the root canal system.",
      "Filling and sealing of the canals, including treatment under a microscope when indicated."
    ],
    candidatesTitle: "Common indications",
    candidates: [
      "Deep caries, pulpitis, or previously treated canals needing retreatment.",
      "Pain, lingering sensitivity, or infection around the tooth root.",
      "Teeth that need canal treatment before restoration or prosthetics."
    ],
    metaTitle: "Endodontic Treatment | Matikyan Dental Clinic",
    metaDescription: "Manage pulpitis, infected canals, and internal tooth damage with endodontic treatment at Matikyan Dental Clinic."
  },
  {
    slug: "/services/orthodontics",
    category: "Orthodontics",
    title: "Orthodontics",
    tagline: "Clear aligners and braces for guided tooth movement",
    desc: "Orthodontic treatment helps correct tooth alignment, spacing, crowding, and selected bite problems using clear aligners or fixed braces depending on the case.",
    price: "Consultation required",
    duration: "Varies by case",
    rating: 5,
    image: serviceOrthodontics,
    benefits: [
      "Clear aligner options",
      "Braces systems",
      "Digital orthodontic planning",
      "Guided tooth movement"
    ],
    intro: "Orthodontics combines diagnosis, planning, and staged tooth movement to improve alignment and bite function. The treatment approach may involve removable clear aligners or fixed braces depending on the clinical situation.",
    h2Title: "Orthodontic treatment options",
    h2Description: "The choice between aligners and braces depends on crowding, spacing, bite correction needs, oral hygiene, and the level of movement control required.",
    processTitle: "Orthodontic planning process",
    process: [
      "Clinical assessment and digital records to define alignment and bite goals.",
      "Selection of clear aligners or braces based on the complexity and required control.",
      "Regular progress checks and refinements or adjustments during active treatment."
    ],
    candidatesTitle: "Often recommended for",
    candidates: [
      "Adults and teens with crowding, spacing, or tooth-position concerns.",
      "Patients comparing clear aligners with fixed braces.",
      "Cases where bite correction and long-term stability need orthodontic planning."
    ],
    metaTitle: "Orthodontics | Matikyan Dental Clinic",
    metaDescription: "Explore orthodontic treatment at Matikyan Dental Clinic, including clear aligners and braces systems for tooth alignment and bite correction.",
    treatmentOptions: [
      "Clear aligners for selected crowding, spacing, and low-visibility treatment needs.",
      "Braces systems for fixed orthodontic control and more complex movement.",
      "Regular monitoring, refinements, or adjustments during active treatment."
    ],
    technology: [
      "Digital scanning supports orthodontic records and planning.",
      "Staged planning helps define the sequence of tooth movement.",
      "Progress visits help evaluate fit, wear compliance, bracket adjustments, and treatment response."
    ],
    faqs: [
      "Are clear aligners or braces better?::The better option depends on bite, crowding, spacing, treatment complexity, and how much fixed control is needed.",
      "Are aligners suitable for every case?::No. Some cases need braces or a different orthodontic plan for predictable movement.",
      "Does orthodontic treatment require special hygiene?::Yes. Both aligners and braces require careful home care, and professional hygiene helps reduce plaque during treatment."
    ]
  },
  {
    slug: "/services/periodontal-treatment",
    category: "Periodontology",
    title: "Periodontal Treatment",
    tagline: "Gingivitis and periodontitis management",
    desc: "Periodontal care focuses on diagnosing and treating gum inflammation and supporting structures, from non-surgical therapy to periodontal surgery when required.",
    price: "From $450",
    duration: "Varies by stage",
    rating: 4.9,
    image: servicePeriodontalTreatment,
    benefits: [
      "Gingivitis treatment",
      "Closed and open curettage",
      "Splinting and surgical care",
      "Supportive follow-up"
    ],
    intro: "This department treats gingivitis, periodontitis, and the consequences of periodontal inflammation using both conservative and surgical approaches based on the case.",
    h2Title: "What periodontal treatment may include",
    h2Description: "Management depends on the stage of inflammation, pocket depth, tooth mobility, and the response of surrounding tissues to treatment.",
    processTitle: "Care options may include",
    process: [
      "Assessment of gum inflammation, periodontal pockets, and tooth stability.",
      "Closed or open curettage, splinting, and supportive periodontal therapy.",
      "Periodontal surgical procedures and adjunctive care such as plasma therapy when indicated."
    ],
    candidatesTitle: "Often indicated for",
    candidates: [
      "Bleeding gums, swelling, bad breath, or gum recession.",
      "Diagnosed gingivitis or periodontitis.",
      "Teeth with mobility or supporting tissue loss that require specialist care."
    ],
    metaTitle: "Periodontal Treatment | Matikyan Dental Clinic",
    metaDescription: "Manage gum disease with periodontal treatment at Matikyan Dental Clinic including deep cleaning, specialist care, and ongoing maintenance."
  },
  {
    slug: "/services/oral-surgery",
    category: "Surgery",
    title: "Oral Surgery",
    tagline: "Extractions, apicoectomy, sinus lift, and bone grafting",
    desc: "Oral surgical care includes tooth extractions, root-end surgery, sinus lift procedures, and bone grafting based on the patient’s clinical needs.",
    price: "From $300/tooth",
    duration: "45–90 min",
    rating: 4.8,
    image: serviceOralSurgery,
    benefits: [
      "Tooth extractions",
      "Apicoectomy",
      "Sinus lift",
      "Bone grafting"
    ],
    intro: "Surgical treatment is planned according to the tooth position, bone condition, infection status, and the future restorative goal, including implant preparation when needed.",
    h2Title: "What oral surgery may include",
    h2Description: "The surgical plan depends on whether the case involves extraction, apical surgery, sinus augmentation, or reconstruction of bone volume before restoration.",
    processTitle: "Common surgical directions",
    process: [
      "Simple or complex tooth extraction based on tooth position and anatomy.",
      "Apicoectomy for selected endodontic cases involving the root apex.",
      "Sinus lift and bone grafting when additional bone support is needed."
    ],
    candidatesTitle: "Common indications",
    candidates: [
      "Teeth that cannot be predictably preserved.",
      "Surgical endodontic cases or chronic apical pathology.",
      "Implant cases requiring sinus augmentation or bone reconstruction."
    ],
    metaTitle: "Oral Surgery | Matikyan Dental Clinic",
    metaDescription: "Explore oral surgery at Matikyan Dental Clinic including extractions, apicoectomy, sinus lift, and bone grafting."
  },
  {
    slug: "/services/digital-diagnostics",
    category: "Diagnostics",
    title: "Diagnostics & Digital Dentistry",
    tagline: "RVG, panoramic imaging, 3D CT, and digital treatment planning",
    desc: "Digital diagnostics support precise dental treatment planning with targeted imaging and consultation, including RVG, panoramic imaging, and 3D CT when indicated.",
    price: "Consultation required",
    duration: "Varies by case",
    rating: 5,
    image: serviceDigitalDiagnostics,
    benefits: [
      "Clinical consultation",
      "RVG imaging",
      "Panoramic imaging",
      "3D CT diagnostics"
    ],
    intro: "Diagnostics help define the condition of teeth, roots, bone, and surrounding structures before therapy, surgery, orthodontics, implants, or prosthetic work begins.",
    h2Title: "How diagnostic planning works",
    h2Description: "The choice of imaging depends on the clinical question. The goal is to gather the information needed for a precise and safer treatment plan.",
    processTitle: "Diagnostic services may include",
    process: [
      "Clinical consultation and review of complaints, history, and treatment goals.",
      "RVG imaging or panoramic radiography depending on the indication.",
      "3D CT imaging for complex endodontic, surgical, implant, orthodontic, or prosthetic planning."
    ],
    candidatesTitle: "Often useful for",
    candidates: [
      "Patients starting new treatment or comparing treatment options.",
      "Cases that need image-based evaluation before surgery, orthodontics, or implants.",
      "Situations where detailed tooth, root, or bone assessment is important."
    ],
    metaTitle: "Diagnostics & Digital Dentistry | Matikyan Dental Clinic",
    metaDescription: "Book digital dental diagnostics at Matikyan Dental Clinic with RVG, panoramic imaging, 3D CT, consultation, and treatment planning.",
    treatmentOptions: [
      "Clinical consultation and treatment planning.",
      "RVG or panoramic imaging when indicated.",
      "3D CT diagnostics for complex surgical, implant, endodontic, orthodontic, or prosthetic planning."
    ],
    technology: [
      "RVG imaging provides targeted dental information with focused imaging.",
      "Panoramic imaging helps review the broader dental and jaw situation.",
      "3D CT can support more complex planning when two-dimensional imaging is not enough."
    ],
    faqs: [
      "When is digital diagnostics needed?::It is used when clinical examination alone does not provide enough information for treatment planning.",
      "Is every patient sent for 3D CT?::No. CT is used only when the clinical question requires three-dimensional information.",
      "How does consultation help before treatment?::Consultation helps clarify diagnosis, compare treatment options, and plan the next step safely."
    ]
  }
];

export const fallbackServices: SanityService[] = serviceDetails.map(({ slug, intro, h2Title, h2Description, processTitle, process, candidatesTitle, candidates, metaTitle, metaDescription, ...service }) => service);

const serviceByTitle = new Map(serviceDetails.map((service) => [service.title, service]));
const retiredServiceTitleAliases = new Map<string, string>([
  ["Dental Veneers", "/services/veneers"],
  ["Aesthetic Restorations", "/services/veneers"],
  ["Aesthetic Restorations & Build-Up", "/services/veneers"],
  ["Clear Aligners", "/services/orthodontics"],
  ["Braces Systems", "/services/orthodontics"],
  ["Diagnostics & Consultation", "/services/digital-diagnostics"],
]);
const serviceIdBySlug = new Map<string, string>([
  ["/services/dental-cleaning-check-up", "dentalCleaningCheckup"],
  ["/services/teeth-whitening", "teethWhitening"],
  ["/services/veneers", "veneers"],
  ["/services/dental-implants", "dentalImplants"],
  ["/services/prosthetics-crowns", "prostheticsCrowns"],
  ["/services/root-canal-treatment", "rootCanalTreatment"],
  ["/services/orthodontics", "orthodontics"],
  ["/services/periodontal-treatment", "periodontalTreatment"],
  ["/services/oral-surgery", "oralSurgery"],
  ["/services/digital-diagnostics", "digitalDiagnostics"],
]);
const serviceCategoryBySlug = new Map<string, string>([
  ["/services/dental-cleaning-check-up", "therapy"],
  ["/services/teeth-whitening", "therapy"],
  ["/services/veneers", "orthopedics"],
  ["/services/dental-implants", "surgery"],
  ["/services/prosthetics-crowns", "orthopedics"],
  ["/services/root-canal-treatment", "therapy"],
  ["/services/orthodontics", "orthodontics"],
  ["/services/periodontal-treatment", "periodontology"],
  ["/services/oral-surgery", "surgery"],
  ["/services/digital-diagnostics", "diagnostics"],
]);
const relatedServiceSlugsBySlug = new Map<string, string[]>([
  ["/services/dental-cleaning-check-up", ["/services/periodontal-treatment", "/services/teeth-whitening", "/services/dental-implants", "/services/digital-diagnostics"]],
  ["/services/teeth-whitening", ["/services/veneers", "/services/dental-cleaning-check-up"]],
  ["/services/veneers", ["/services/teeth-whitening", "/services/prosthetics-crowns", "/services/digital-diagnostics"]],
  ["/services/dental-implants", ["/services/oral-surgery", "/services/prosthetics-crowns", "/services/digital-diagnostics", "/services/dental-cleaning-check-up"]],
  ["/services/prosthetics-crowns", ["/services/dental-implants", "/services/root-canal-treatment", "/services/veneers", "/services/digital-diagnostics"]],
  ["/services/root-canal-treatment", ["/services/oral-surgery", "/services/prosthetics-crowns", "/services/veneers", "/services/digital-diagnostics"]],
  ["/services/orthodontics", ["/services/digital-diagnostics", "/services/dental-cleaning-check-up"]],
  ["/services/periodontal-treatment", ["/services/dental-cleaning-check-up", "/services/dental-implants", "/services/digital-diagnostics", "/services/oral-surgery"]],
  ["/services/oral-surgery", ["/services/dental-implants", "/services/root-canal-treatment", "/services/digital-diagnostics", "/services/periodontal-treatment"]],
  ["/services/digital-diagnostics", ["/services/dental-implants", "/services/orthodontics", "/services/root-canal-treatment", "/services/oral-surgery"]],
]);

type LocalizedServiceCopy = Pick<
  ServiceDetail,
  | "title"
  | "tagline"
  | "desc"
  | "price"
  | "duration"
  | "benefits"
  | "intro"
  | "h2Title"
  | "h2Description"
  | "processTitle"
  | "process"
  | "candidatesTitle"
  | "candidates"
  | "treatmentOptions"
  | "technology"
  | "faqs"
>;

function getLocalizedServiceCopy(slug: string) {
  const serviceId = serviceIdBySlug.get(slug);

  if (!serviceId) {
    return null;
  }

  const translated = i18n.t(`serviceCatalog.services.${serviceId}`, { returnObjects: true });
  return translated && typeof translated === "object" ? translated as LocalizedServiceCopy : null;
}

function localizeServiceDetail(service: ServiceDetail): ServiceDetail {
  const localizedCopy = getLocalizedServiceCopy(service.slug);
  const categoryKey = serviceCategoryBySlug.get(service.slug);

  if (!localizedCopy || !categoryKey) {
    return service;
  }

  return {
    ...service,
    ...localizedCopy,
    category: i18n.t(`serviceCatalog.categories.${categoryKey}`),
  };
}

export function localizeServiceListItem(service: SanityService): SanityService {
  const matchingService = serviceByTitle.get(service.title);

  if (!matchingService) {
    return service;
  }

  const localizedDetail = localizeServiceDetail(matchingService);

  return {
    ...service,
    category: localizedDetail.category,
    title: localizedDetail.title,
    tagline: localizedDetail.tagline,
    desc: localizedDetail.desc,
    price: localizedDetail.price,
    duration: localizedDetail.duration,
    benefits: localizedDetail.benefits,
  };
}

export function getServiceDetailBySlug(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}

export function getLocalizedServiceDetailBySlug(slug: string) {
  const service = getServiceDetailBySlug(slug);
  return service ? localizeServiceDetail(service) : undefined;
}

export function getLocalizedRelatedServicesBySlug(slug: string) {
  const relatedSlugs = relatedServiceSlugsBySlug.get(slug) ?? [];
  return relatedSlugs
    .map((relatedSlug) => getLocalizedServiceDetailBySlug(relatedSlug))
    .filter((service): service is ServiceDetail => Boolean(service));
}

export function getLocalizedFallbackServices() {
  return fallbackServices.map(localizeServiceListItem);
}

export function getServiceSlugByTitle(title: string) {
  const directMatch = serviceByTitle.get(title);

  if (directMatch) {
    return directMatch.slug;
  }

  const retiredAlias = retiredServiceTitleAliases.get(title);

  if (retiredAlias) {
    return retiredAlias;
  }

  const localizedMatch = serviceDetails.find((service) => {
    const localizedService = localizeServiceDetail(service);
    return localizedService.title === title;
  });

  return localizedMatch?.slug ?? "/services";
}
