import type { SanityService } from "../lib/sanityTypes";
import i18n from "../i18n";

export type ServiceDetail = SanityService & {
  slug: string;
  intro: string;
  h2Title: string;
  h2Description: string;
  processTitle: string;
  process: string[];
  candidatesTitle: string;
  candidates: string[];
  metaTitle: string;
  metaDescription: string;
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "/dental-cleaning-check-up",
    category: "Therapy",
    title: "Professional Oral Hygiene",
    tagline: "Ultrasonic scaling, AirFlow, and preventive care",
    desc: "Professional oral hygiene helps remove plaque, tartar, and surface stains using ultrasonic cleaning and AirFlow, while supporting healthier gums and cleaner teeth.",
    price: "From $80",
    duration: "60 min",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1588776814546-1ffbb172601e?w=600&h=400&fit=crop&auto=format",
    benefits: ["Ultrasonic tartar removal", "AirFlow polishing", "Cleaner tooth surfaces", "Prevention-focused care"],
    intro: "Professional hygiene is one of the core therapeutic services at the clinic. It combines deposit removal, polishing, and preventive assessment to reduce inflammation and maintain oral health.",
    h2Title: "What this service includes",
    h2Description: "The visit is designed to remove hard and soft deposits, improve hygiene access, and reduce factors that contribute to gum irritation and unpleasant breath.",
    processTitle: "Typical hygiene appointment",
    process: [
      "Assessment of plaque, tartar, staining, and gum condition.",
      "Ultrasonic removal of calculus and professional cleaning of tooth surfaces.",
      "AirFlow polishing and hygiene recommendations based on your needs.",
    ],
    candidatesTitle: "Often recommended for",
    candidates: [
      "Patients with tartar buildup, staining, or bleeding gums.",
      "Adults and teens due for professional oral hygiene.",
      "Anyone preparing for restorative, orthodontic, or whitening treatment.",
    ],
    metaTitle: "Professional Oral Hygiene | Matikyan Dental Clinic",
    metaDescription: "Book professional oral hygiene at Matikyan Dental Clinic for ultrasonic scaling, AirFlow cleaning, and preventive gum and tooth care.",
  },
  {
    slug: "/teeth-whitening",
    category: "Therapy",
    title: "Teeth Whitening",
    tagline: "Tray-based and light whitening options",
    desc: "Clinical whitening helps brighten teeth after shade assessment, using dentist-guided tray-based or light-activated methods depending on the case.",
    price: "From $350",
    duration: "90 min",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&h=400&fit=crop&auto=format",
    benefits: ["Visible brightening", "In-clinic supervision", "Tray whitening option", "Light whitening option"],
    intro: "Whitening is offered after checking enamel condition, gum health, and the type of discoloration. The goal is safer, more even brightening with an approach suited to the patient.",
    h2Title: "How whitening is selected",
    h2Description: "Whitening planning starts with an examination and shade review so the method matches the condition of the teeth and the expected result.",
    processTitle: "Whitening options may include",
    process: [
      "Clinical shade assessment and suitability evaluation.",
      "Tray-based whitening or light-activated whitening depending on indication.",
      "Post-treatment advice to help maintain a brighter result.",
    ],
    candidatesTitle: "Often suitable for",
    candidates: [
      "Patients with external discoloration or age-related darkening.",
      "Adults seeking a non-invasive aesthetic improvement.",
      "Cases where existing restorations do not limit color matching.",
    ],
    metaTitle: "Teeth Whitening | Matikyan Dental Clinic",
    metaDescription: "Brighten your smile with teeth whitening at Matikyan Dental Clinic using tray-based or light whitening options selected for your case.",
  },
  {
    slug: "/veneers",
    category: "Orthopedics",
    title: "Dental Veneers",
    tagline: "E.max, ceramic, and composite veneer options",
    desc: "Veneers are used to improve the color, shape, and symmetry of visible teeth with ceramic or composite restorative solutions.",
    price: "From $900/tooth",
    duration: "2 appointments",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=400&fit=crop&auto=format",
    benefits: ["E.max veneers", "Ceramic veneers", "Composite veneers", "Smile design improvement"],
    intro: "Veneers are part of the clinic’s orthopedic and aesthetic treatment options. They are selected when the patient needs a controlled change in shape, color, or front-tooth appearance.",
    h2Title: "When veneers are considered",
    h2Description: "They are commonly used when front teeth need aesthetic correction for shape, discoloration, minor irregularity, or visible wear.",
    processTitle: "Treatment planning may include",
    process: [
      "Aesthetic consultation and shade or shape planning.",
      "Digital records or impressions depending on the chosen veneer type.",
      "Try-in and final bonding of the selected restoration.",
    ],
    candidatesTitle: "Frequently chosen for",
    candidates: [
      "Visible chips, spacing, uneven contours, or discoloration.",
      "Patients comparing ceramic and composite aesthetic options.",
      "Cases where smile symmetry and front-tooth appearance are priorities.",
    ],
    metaTitle: "Dental Veneers | Matikyan Dental Clinic",
    metaDescription: "Explore dental veneers at Matikyan Dental Clinic including E.max, ceramic, and composite options for smile design and shape correction.",
  },
  {
    slug: "/composite-bonding",
    category: "Therapy",
    title: "Aesthetic Restorations & Build-Up",
    tagline: "Caries treatment, restorations, and core build-up",
    desc: "Therapeutic restorations are used to treat decay, rebuild damaged tooth structure, and restore function and appearance with modern filling materials.",
    price: "From $250/tooth",
    duration: "60–90 min",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop&auto=format",
    benefits: ["Caries treatment", "Tooth-colored restorations", "Core build-up under crowns", "Functional reconstruction"],
    intro: "This therapeutic group includes caries treatment, pulp-related restorative stages, aesthetic restorations, and build-up of the tooth stump when a crown is planned.",
    h2Title: "What this therapeutic service covers",
    h2Description: "The aim is to remove diseased tissue, restore shape and function, and create a stable base for further restorative or prosthetic treatment when needed.",
    processTitle: "Treatment may include",
    process: [
      "Removal of caries and preparation of the cavity or damaged tooth area.",
      "Aesthetic restoration with tooth-colored filling materials.",
      "Build-up of the tooth core when support is needed under a future crown.",
    ],
    candidatesTitle: "Common indications",
    candidates: [
      "Caries, fractures, worn edges, or lost filling material.",
      "Teeth that need aesthetic reconstruction after treatment.",
      "Teeth that require stump build-up before orthopedic restoration.",
    ],
    metaTitle: "Aesthetic Restorations & Build-Up | Matikyan Dental Clinic",
    metaDescription: "Treat caries, rebuild tooth structure, and restore function with aesthetic restorations and core build-up at Matikyan Dental Clinic.",
  },
  {
    slug: "/dental-implants",
    category: "Surgery",
    title: "Dental Implants",
    tagline: "Implant placement with bone support options",
    desc: "Implant treatment restores missing teeth with surgical planning, implant placement, and supportive procedures such as bone grafting when indicated.",
    price: "From $2,400",
    duration: "3–6 months",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop&auto=format",
    benefits: ["Implant placement", "Mini-implant options", "Bone support planning", "Long-term tooth replacement"],
    intro: "Implantology is part of the clinic’s surgical services. Treatment planning focuses on bone volume, implant position, soft tissues, and the future prosthetic restoration.",
    h2Title: "What implant treatment may involve",
    h2Description: "Successful implant treatment depends on diagnostics, surgical planning, healing conditions, and the quality of the final restoration.",
    processTitle: "Typical treatment stages",
    process: [
      "Clinical evaluation and imaging to assess bone and implant feasibility.",
      "Placement of a dental implant or mini-implant when indicated.",
      "Restorative phase after healing, with additional support procedures if needed.",
    ],
    candidatesTitle: "Often considered for",
    candidates: [
      "Patients missing one or more teeth.",
      "Patients seeking a fixed alternative to removable prosthetics.",
      "Cases that may also require bone augmentation before restoration.",
    ],
    metaTitle: "Dental Implants | Matikyan Dental Clinic",
    metaDescription: "Restore missing teeth with dental implants at Matikyan Dental Clinic using precise planning and long-term restorative treatment.",
  },
  {
    slug: "/same-day-crowns",
    category: "Orthopedics",
    title: "Prosthetics & Crowns",
    tagline: "Fixed, removable, and digitally planned restorations",
    desc: "Orthopedic treatment includes crowns, removable prosthetics, and digitally planned restorative options for rebuilding chewing function and smile aesthetics.",
    price: "From $1,100",
    duration: "2 hours",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=400&fit=crop&auto=format",
    benefits: ["Removable prosthetics", "Metal-ceramic crowns", "Zirconia and E.max options", "Digital scanning and CAD/CAM"],
    intro: "Orthopedic care covers both removable and fixed prosthetic solutions, from partial dentures to ceramic crowns and digitally planned restorations.",
    h2Title: "What orthopedic treatment includes",
    h2Description: "The choice of restoration depends on the number of missing teeth, the condition of supporting teeth, bite requirements, and the desired material.",
    processTitle: "Available treatment directions",
    process: [
      "Removable prosthetics including rigid, soft, partial, non-acrylic, or clasp-based options.",
      "Fixed restorations such as metal-ceramic, zirconia, zirconia-ceramic, and E.max crowns.",
      "Digital orthopedics with 3Shape scanning and CAD/CAM-based planning.",
    ],
    candidatesTitle: "Often recommended for",
    candidates: [
      "Patients who need crowns, prosthetic rehabilitation, or material replacement.",
      "Cases requiring removable or fixed restorative planning.",
      "Patients who benefit from digital scanning and prosthetic design.",
    ],
    metaTitle: "Prosthetics & Crowns | Matikyan Dental Clinic",
    metaDescription: "Restore chewing function and smile aesthetics with crowns, removable prosthetics, and digitally planned orthopedic treatment at Matikyan Dental Clinic.",
  },
  {
    slug: "/root-canal-treatment",
    category: "Therapy",
    title: "Endodontic Treatment",
    tagline: "Root canal treatment under magnification",
    desc: "Endodontic treatment is used to manage pulpitis, infected canals, and internal tooth damage with cleaning, shaping, filling, and microscope-assisted precision when indicated.",
    price: "From $700",
    duration: "60–90 min",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=400&fit=crop&auto=format",
    benefits: ["Pulpitis management", "Canal filling", "Microscope-assisted treatment", "Tooth preservation"],
    intro: "This service covers endodontic diagnosis and treatment of root canal systems when inflammation or infection has reached the inner tissues of the tooth.",
    h2Title: "What endodontic treatment covers",
    h2Description: "The aim is to disinfect and fill the canals thoroughly while preserving the tooth whenever a predictable restorative result is possible.",
    processTitle: "Treatment may include",
    process: [
      "Diagnosis of pulpitis or canal infection with imaging and clinical testing.",
      "Mechanical and chemical cleaning of the root canal system.",
      "Filling and sealing of the canals, including treatment under a microscope when indicated.",
    ],
    candidatesTitle: "Common indications",
    candidates: [
      "Deep caries, pulpitis, or previously treated canals needing retreatment.",
      "Pain, lingering sensitivity, or infection around the tooth root.",
      "Teeth that need canal treatment before restoration or prosthetics.",
    ],
    metaTitle: "Endodontic Treatment | Matikyan Dental Clinic",
    metaDescription: "Manage pulpitis, infected canals, and internal tooth damage with endodontic treatment at Matikyan Dental Clinic.",
  },
  {
    slug: "/invisalign",
    category: "Orthodontics",
    title: "Clear Aligners",
    tagline: "Transparent orthodontic correction",
    desc: "Aligners provide removable orthodontic correction for crowding, spacing, and selected bite issues using digital planning and staged movement.",
    price: "From $3,200",
    duration: "6–24 months",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop&auto=format",
    benefits: ["Discreet correction", "Removable design", "Digital planning", "Step-by-step tooth movement"],
    intro: "Aligner therapy is used for patients who prefer a removable and more discreet orthodontic option. Planning is based on digital records and controlled staged movement.",
    h2Title: "How aligner treatment is planned",
    h2Description: "The treatment plan is designed around the type of crowding, spacing, and bite correction needed, with attention to consistent wear and periodic review.",
    processTitle: "Typical aligner workflow",
    process: [
      "Digital scanning and orthodontic assessment of alignment goals.",
      "A staged aligner sequence designed around the desired tooth movement.",
      "Progress reviews and refinements during treatment when needed.",
    ],
    candidatesTitle: "Often suitable for",
    candidates: [
      "Adults and teens wanting a low-visibility orthodontic solution.",
      "Mild to moderate crowding or spacing cases.",
      "Patients able to wear aligners consistently each day.",
    ],
    metaTitle: "Clear Aligners | Matikyan Dental Clinic",
    metaDescription: "Straighten teeth with clear aligners at Matikyan Dental Clinic using digital planning and staged orthodontic correction.",
  },
  {
    slug: "/ceramic-braces",
    category: "Orthodontics",
    title: "Braces Systems",
    tagline: "Reliable correction for more complex cases",
    desc: "Bracket systems help correct crowding, tooth position, and bite discrepancies when fixed orthodontic control is needed.",
    price: "From $2,800",
    duration: "12–24 months",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&auto=format",
    benefits: ["Fixed orthodontic control", "Effective bite correction", "Suitable for teens and adults", "Detailed tooth movement"],
    intro: "Bracket systems remain important for cases that require strong, continuous control of tooth movement and more comprehensive orthodontic correction.",
    h2Title: "When braces are recommended",
    h2Description: "Braces are often chosen when the case is more complex or when fixed mechanics can provide more predictable control than removable appliances.",
    processTitle: "Treatment usually includes",
    process: [
      "Orthodontic assessment and treatment planning for alignment and bite goals.",
      "Placement of ceramic brackets and regular adjustment visits.",
      "Monitoring through active movement until the final result is reached.",
    ],
    candidatesTitle: "Commonly recommended for",
    candidates: [
      "Adults and teens needing fixed orthodontic treatment.",
      "Patients with moderate to complex bite or alignment issues.",
      "Cases where aligners may not offer enough control.",
    ],
    metaTitle: "Braces Systems | Matikyan Dental Clinic",
    metaDescription: "Correct bite and alignment issues with braces systems at Matikyan Dental Clinic for reliable fixed orthodontic treatment.",
  },
  {
    slug: "/periodontal-treatment",
    category: "Periodontology",
    title: "Periodontal Treatment",
    tagline: "Gingivitis and periodontitis management",
    desc: "Periodontal care focuses on diagnosing and treating gum inflammation and supporting structures, from non-surgical therapy to periodontal surgery when required.",
    price: "From $450",
    duration: "Varies by stage",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&auto=format",
    benefits: ["Gingivitis treatment", "Closed and open curettage", "Splinting and surgical care", "Supportive follow-up"],
    intro: "This department treats gingivitis, periodontitis, and the consequences of periodontal inflammation using both conservative and surgical approaches based on the case.",
    h2Title: "What periodontal treatment may include",
    h2Description: "Management depends on the stage of inflammation, pocket depth, tooth mobility, and the response of surrounding tissues to treatment.",
    processTitle: "Care options may include",
    process: [
      "Assessment of gum inflammation, periodontal pockets, and tooth stability.",
      "Closed or open curettage, splinting, and supportive periodontal therapy.",
      "Periodontal surgical procedures and adjunctive care such as plasma therapy when indicated.",
    ],
    candidatesTitle: "Often indicated for",
    candidates: [
      "Bleeding gums, swelling, bad breath, or gum recession.",
      "Diagnosed gingivitis or periodontitis.",
      "Teeth with mobility or supporting tissue loss that require specialist care.",
    ],
    metaTitle: "Periodontal Treatment | Matikyan Dental Clinic",
    metaDescription: "Manage gum disease with periodontal treatment at Matikyan Dental Clinic including deep cleaning, specialist care, and ongoing maintenance.",
  },
  {
    slug: "/wisdom-tooth-extraction",
    category: "Surgery",
    title: "Oral Surgery",
    tagline: "Extractions, apicoectomy, sinus lift, and bone grafting",
    desc: "Oral surgical care includes tooth extractions, root-end surgery, sinus lift procedures, and bone grafting based on the patient’s clinical needs.",
    price: "From $300/tooth",
    duration: "45–90 min",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?w=600&h=400&fit=crop&auto=format",
    benefits: ["Tooth extractions", "Apicoectomy", "Sinus lift", "Bone grafting"],
    intro: "Surgical treatment is planned according to the tooth position, bone condition, infection status, and the future restorative goal, including implant preparation when needed.",
    h2Title: "What oral surgery may include",
    h2Description: "The surgical plan depends on whether the case involves extraction, apical surgery, sinus augmentation, or reconstruction of bone volume before restoration.",
    processTitle: "Common surgical directions",
    process: [
      "Simple or complex tooth extraction based on tooth position and anatomy.",
      "Apicoectomy for selected endodontic cases involving the root apex.",
      "Sinus lift and bone grafting when additional bone support is needed.",
    ],
    candidatesTitle: "Common indications",
    candidates: [
      "Teeth that cannot be predictably preserved.",
      "Surgical endodontic cases or chronic apical pathology.",
      "Implant cases requiring sinus augmentation or bone reconstruction.",
    ],
    metaTitle: "Oral Surgery | Matikyan Dental Clinic",
    metaDescription: "Explore oral surgery at Matikyan Dental Clinic including extractions, apicoectomy, sinus lift, and bone grafting.",
  },
  {
    slug: "/pediatric-dentistry",
    category: "Diagnostics",
    title: "Diagnostics & Consultation",
    tagline: "RVG, panoramic imaging, CT, and treatment planning",
    desc: "Dental diagnostics support treatment planning with targeted imaging and consultation, including RVG, panoramic imaging, and 3D CT when indicated.",
    price: "From $60",
    duration: "30–60 min",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&auto=format",
    benefits: ["Free consultation", "RVG imaging", "Panoramic imaging", "3D CT diagnostics"],
    intro: "Diagnostics help define the condition of teeth, roots, bone, and surrounding structures before therapy, surgery, orthodontics, implants, or prosthetic work begins.",
    h2Title: "How diagnostic planning works",
    h2Description: "The choice of imaging depends on the clinical question. The goal is to gather the information needed for a precise and safer treatment plan.",
    processTitle: "Diagnostic services may include",
    process: [
      "Clinical consultation and review of complaints, history, and treatment goals.",
      "RVG imaging or panoramic radiography depending on the indication.",
      "3D CT imaging for complex endodontic, surgical, implant, or orthopedic planning.",
    ],
    candidatesTitle: "Often useful for",
    candidates: [
      "Patients starting new treatment or comparing treatment options.",
      "Cases that need image-based evaluation before surgery or implants.",
      "Situations where detailed tooth, root, or bone assessment is important.",
    ],
    metaTitle: "Diagnostics & Consultation | Matikyan Dental Clinic",
    metaDescription: "Book diagnostics and consultation at Matikyan Dental Clinic with RVG, panoramic imaging, 3D CT, and treatment planning.",
  },
];

export const fallbackServices: SanityService[] = serviceDetails.map(({ slug, intro, h2Title, h2Description, processTitle, process, candidatesTitle, candidates, metaTitle, metaDescription, ...service }) => service);

const serviceByTitle = new Map(serviceDetails.map((service) => [service.title, service]));
const serviceIdBySlug = new Map<string, string>([
  ["/dental-cleaning-check-up", "dentalCleaningCheckup"],
  ["/teeth-whitening", "teethWhitening"],
  ["/veneers", "veneers"],
  ["/composite-bonding", "compositeBonding"],
  ["/dental-implants", "dentalImplants"],
  ["/same-day-crowns", "sameDayCrowns"],
  ["/root-canal-treatment", "rootCanalTreatment"],
  ["/invisalign", "invisalign"],
  ["/ceramic-braces", "ceramicBraces"],
  ["/periodontal-treatment", "periodontalTreatment"],
  ["/wisdom-tooth-extraction", "wisdomToothExtraction"],
  ["/pediatric-dentistry", "pediatricDentistry"],
]);
const serviceCategoryBySlug = new Map<string, string>([
  ["/dental-cleaning-check-up", "therapy"],
  ["/teeth-whitening", "therapy"],
  ["/veneers", "orthopedics"],
  ["/composite-bonding", "therapy"],
  ["/dental-implants", "surgery"],
  ["/same-day-crowns", "orthopedics"],
  ["/root-canal-treatment", "therapy"],
  ["/invisalign", "orthodontics"],
  ["/ceramic-braces", "orthodontics"],
  ["/periodontal-treatment", "periodontology"],
  ["/wisdom-tooth-extraction", "surgery"],
  ["/pediatric-dentistry", "diagnostics"],
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

export function getLocalizedFallbackServices() {
  return fallbackServices.map(localizeServiceListItem);
}

export function getServiceSlugByTitle(title: string) {
  const directMatch = serviceByTitle.get(title);

  if (directMatch) {
    return directMatch.slug;
  }

  const localizedMatch = serviceDetails.find((service) => {
    const localizedService = localizeServiceDetail(service);
    return localizedService.title === title;
  });

  return localizedMatch?.slug ?? "/services";
}
