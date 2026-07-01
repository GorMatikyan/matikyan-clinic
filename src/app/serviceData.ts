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
    category: "Preventive",
    title: "Dental Cleaning & Check-up",
    tagline: "Foundation of a healthy smile",
    desc: "Professional teeth cleaning removes tartar and plaque that regular brushing can't reach. Combined with a full oral examination, digital X-rays, and gum health assessment.",
    price: "From $80",
    duration: "60 min",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1588776814546-1ffbb172601e?w=600&h=400&fit=crop&auto=format",
    benefits: ["Removes tartar and staining", "Early cavity detection", "Gum disease screening", "Personalized oral hygiene advice"],
    intro: "Routine preventive visits help keep small issues from becoming expensive treatment plans. At Matikyan Dental Clinic, a cleaning and check-up combines professional hygiene, a full exam, and practical guidance for daily care.",
    h2Title: "What To Expect During Your Visit",
    h2Description: "Your appointment is designed to assess oral health, clean hard-to-reach buildup, and identify concerns early so treatment can stay conservative.",
    processTitle: "What the appointment includes",
    process: [
      "A review of your current symptoms, oral hygiene habits, and dental history.",
      "Professional cleaning to remove tartar, plaque, and superficial staining.",
      "Clinical examination of teeth, gums, bite, and existing dental work.",
    ],
    candidatesTitle: "Who this service is for",
    candidates: [
      "Patients due for routine preventive care.",
      "Adults and teens who want a baseline oral health review.",
      "Anyone noticing bleeding gums, staining, or sensitivity.",
    ],
    metaTitle: "Dental Cleaning & Check-up | Matikyan Dental Clinic",
    metaDescription: "Book a professional dental cleaning and check-up at Matikyan Dental Clinic for preventive care, oral exams, and early detection of dental concerns.",
  },
  {
    slug: "/teeth-whitening",
    category: "Cosmetic",
    title: "Professional Teeth Whitening",
    tagline: "Up to 8 shades brighter in one visit",
    desc: "In-office laser whitening using a professional-grade hydrogen peroxide gel activated by a specialized light. Safe, effective, and long-lasting results in under 90 minutes.",
    price: "From $350",
    duration: "90 min",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&h=400&fit=crop&auto=format",
    benefits: ["8+ shades lighter", "Single visit treatment", "Minimal sensitivity formula", "Take-home maintenance kit included"],
    intro: "Professional whitening is one of the fastest ways to refresh a smile. Our in-clinic treatment is planned around your enamel condition, shade goals, and sensitivity history.",
    h2Title: "How Whitening Is Planned",
    h2Description: "We evaluate the cause of discoloration first, then use a controlled in-office process to brighten teeth safely and evenly.",
    processTitle: "Typical whitening process",
    process: [
      "Shade assessment and suitability check before treatment starts.",
      "Gum protection and controlled application of professional whitening gel.",
      "Post-treatment review with maintenance advice for longer-lasting results.",
    ],
    candidatesTitle: "Best suited for",
    candidates: [
      "Patients with staining from coffee, tea, wine, or smoking.",
      "Adults seeking a non-invasive cosmetic refresh.",
      "Patients who want brighter teeth before weddings or events.",
    ],
    metaTitle: "Professional Teeth Whitening | Matikyan Dental Clinic",
    metaDescription: "Brighten your smile with professional teeth whitening at Matikyan Dental Clinic using a safe, in-office treatment planned around your goals.",
  },
  {
    slug: "/veneers",
    category: "Cosmetic",
    title: "Porcelain Veneers",
    tagline: "The Hollywood smile, perfected",
    desc: "Ultra-thin porcelain shells custom-crafted to cover the front surface of teeth. Correct chips, stains, gaps, and irregular shapes with results that look and feel completely natural.",
    price: "From $900/tooth",
    duration: "2 appointments",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=400&fit=crop&auto=format",
    benefits: ["Natural-looking results", "Stain-resistant porcelain", "15–20 year lifespan", "Custom color matching"],
    intro: "Porcelain veneers can reshape the visible smile line with a highly controlled cosmetic result. Treatment is planned around facial balance, tooth proportion, and a natural finish rather than a generic white smile.",
    h2Title: "Why Patients Choose Veneers",
    h2Description: "Veneers are commonly used to improve chipped edges, uneven spacing, stubborn discoloration, and shape irregularities in the front teeth.",
    processTitle: "How veneer treatment works",
    process: [
      "Cosmetic consultation and smile planning to define the final look.",
      "Preparation and impressions or digital records for laboratory fabrication.",
      "Final fitting and bonding of custom porcelain veneers.",
    ],
    candidatesTitle: "Often recommended for",
    candidates: [
      "Patients with front teeth affected by chips, spacing, or uneven form.",
      "Adults seeking a longer-term cosmetic solution than whitening alone.",
      "Patients willing to invest in custom cosmetic treatment planning.",
    ],
    metaTitle: "Porcelain Veneers | Matikyan Dental Clinic",
    metaDescription: "Explore porcelain veneers at Matikyan Dental Clinic for smile design, shape correction, and natural-looking cosmetic improvement.",
  },
  {
    slug: "/composite-bonding",
    category: "Cosmetic",
    title: "Composite Bonding",
    tagline: "Single-visit smile enhancement",
    desc: "Tooth-colored resin applied and sculpted directly onto teeth to repair chips, close gaps, and reshape irregular surfaces. A cost-effective alternative to veneers with zero enamel removal.",
    price: "From $250/tooth",
    duration: "60–90 min",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop&auto=format",
    benefits: ["No enamel removal", "Same-day results", "Reversible treatment", "Seamlessly color-matched"],
    intro: "Composite bonding is a conservative cosmetic option for patients who want visible improvement without a laboratory-made restoration. It is especially useful for small defects and same-day smile refinement.",
    h2Title: "When Bonding Works Well",
    h2Description: "Bonding is often selected for modest cosmetic corrections where preserving natural tooth structure is a priority.",
    processTitle: "What happens during treatment",
    process: [
      "Shade selection and planning of the desired contour changes.",
      "Layering and sculpting of tooth-colored composite resin.",
      "Finishing and polishing to blend the restoration with surrounding teeth.",
    ],
    candidatesTitle: "Common reasons to choose bonding",
    candidates: [
      "Minor chips, uneven edges, and narrow gaps.",
      "Patients who want a more affordable cosmetic option than veneers.",
      "Patients looking for same-day cosmetic enhancement.",
    ],
    metaTitle: "Composite Bonding | Matikyan Dental Clinic",
    metaDescription: "Improve chips, gaps, and tooth shape with composite bonding at Matikyan Dental Clinic using a conservative same-day cosmetic treatment.",
  },
  {
    slug: "/dental-implants",
    category: "Restorative",
    title: "Dental Implants",
    tagline: "Permanent tooth replacement",
    desc: "Titanium posts surgically placed in the jawbone to support a natural-looking crown. The gold standard for missing teeth, preserving bone density and providing a lifetime of function.",
    price: "From $2,400",
    duration: "3–6 months",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop&auto=format",
    benefits: ["Permanent solution", "Preserves jawbone", "No impact on adjacent teeth", "Lifetime durability with care"],
    intro: "Dental implants replace missing teeth with a stable, long-term solution that supports both appearance and function. Planning focuses on bone support, bite stability, and the final prosthetic result.",
    h2Title: "Why Implant Planning Matters",
    h2Description: "Successful implant treatment depends on precise diagnostics, surgical planning, and restoration design, not just placement of the implant fixture itself.",
    processTitle: "Typical implant treatment stages",
    process: [
      "Consultation with imaging to evaluate bone levels and restoration goals.",
      "Implant placement with healing time based on the clinical case.",
      "Final crown or prosthetic restoration after integration is complete.",
    ],
    candidatesTitle: "Often suitable for",
    candidates: [
      "Patients missing one or more teeth.",
      "Patients wanting a fixed alternative to removable solutions.",
      "Cases where preserving adjacent healthy teeth is important.",
    ],
    metaTitle: "Dental Implants | Matikyan Dental Clinic",
    metaDescription: "Restore missing teeth with dental implants at Matikyan Dental Clinic using precise planning and long-term restorative treatment.",
  },
  {
    slug: "/same-day-crowns",
    category: "Restorative",
    title: "Same-Day Crowns (CEREC)",
    tagline: "Crown in a single appointment",
    desc: "Using CAD/CAM technology, we design and mill a precision ceramic crown on-site while you wait. No temporaries, no second visit — just a perfect crown, same day.",
    price: "From $1,100",
    duration: "2 hours",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=400&fit=crop&auto=format",
    benefits: ["Single-visit treatment", "Digital precision fit", "Metal-free ceramic", "No temporary crowns"],
    intro: "Same-day crowns are designed for patients who need strength, fit, and efficiency without multiple restoration appointments. Digital design helps reduce delays while maintaining restorative precision.",
    h2Title: "Single-Visit Crown Restoration",
    h2Description: "Digital scanning and in-house fabrication make it possible to prepare, design, and place a ceramic crown in one clinical session for selected cases.",
    processTitle: "How the appointment is structured",
    process: [
      "Preparation of the tooth and digital scanning instead of traditional impressions.",
      "In-house design and milling of the crown based on the digital model.",
      "Try-in, adjustment, and final placement during the same visit.",
    ],
    candidatesTitle: "Best for patients who need",
    candidates: [
      "A crown after fracture, decay, or root canal treatment.",
      "A faster restorative timeline with fewer appointments.",
      "A metal-free ceramic restoration with digital precision.",
    ],
    metaTitle: "Same-Day Crowns | Matikyan Dental Clinic",
    metaDescription: "Get a same-day ceramic crown at Matikyan Dental Clinic with digital scanning and in-house restorative design.",
  },
  {
    slug: "/root-canal-treatment",
    category: "Restorative",
    title: "Root Canal Treatment",
    tagline: "Save your natural tooth, pain-free",
    desc: "Modern endodontic therapy to remove infected pulp and seal the tooth canal. With advanced anesthesia and rotary instruments, most patients report feeling little to no discomfort.",
    price: "From $700",
    duration: "60–90 min",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=400&fit=crop&auto=format",
    benefits: ["Saves natural tooth", "Pain-free procedure", "Laser-assisted option", "High success rate"],
    intro: "Root canal treatment is used to save a tooth affected by deep infection or inflammation. The goal is to remove the diseased pulp, seal the canals, and keep the natural tooth functional.",
    h2Title: "When a Root Canal Is Recommended",
    h2Description: "Treatment is commonly advised when pain, deep decay, trauma, or infection has affected the inner nerve space of the tooth.",
    processTitle: "How treatment is performed",
    process: [
      "Diagnosis and imaging to confirm the affected tooth and canal anatomy.",
      "Cleaning and shaping of the root canals under local anesthesia.",
      "Sealing of the canals and planning for final restoration if needed.",
    ],
    candidatesTitle: "Common signs and situations",
    candidates: [
      "Persistent toothache, pressure pain, or prolonged sensitivity.",
      "Deep decay or infection close to the tooth nerve.",
      "Teeth that can be preserved instead of extracted.",
    ],
    metaTitle: "Root Canal Treatment | Matikyan Dental Clinic",
    metaDescription: "Save an infected or painful tooth with root canal treatment at Matikyan Dental Clinic using modern endodontic care.",
  },
  {
    slug: "/invisalign",
    category: "Orthodontics",
    title: "Invisalign Clear Aligners",
    tagline: "Straighten teeth discreetly",
    desc: "Removable clear aligners that gradually shift teeth into alignment. 3D scanning allows you to visualize your final result before starting. Suitable for mild to moderate cases.",
    price: "From $3,200",
    duration: "6–24 months",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop&auto=format",
    benefits: ["Virtually invisible", "Removable for eating", "3D result preview", "No dietary restrictions"],
    intro: "Invisalign offers a discreet orthodontic option for patients who want straighter teeth without fixed brackets. Treatment planning is guided by digital records and staged aligner movement.",
    h2Title: "What Invisalign Treatment Focuses On",
    h2Description: "Clear aligner therapy is designed to correct crowding, spacing, and selected bite concerns while fitting more easily into daily routines.",
    processTitle: "What the treatment plan includes",
    process: [
      "Digital scanning and orthodontic assessment of alignment goals.",
      "A staged aligner sequence designed around the desired tooth movement.",
      "Progress reviews and refinements during treatment when needed.",
    ],
    candidatesTitle: "Often a fit for",
    candidates: [
      "Adults and teens wanting a low-visibility orthodontic solution.",
      "Mild to moderate crowding or spacing cases.",
      "Patients able to wear aligners consistently each day.",
    ],
    metaTitle: "Invisalign Clear Aligners | Matikyan Dental Clinic",
    metaDescription: "Straighten teeth with Invisalign clear aligners at Matikyan Dental Clinic using digital planning and discreet orthodontic treatment.",
  },
  {
    slug: "/ceramic-braces",
    category: "Orthodontics",
    title: "Ceramic Braces",
    tagline: "Effective and discreet correction",
    desc: "Tooth-colored ceramic brackets blending with natural tooth color for a less visible appearance than metal braces. Ideal for complex alignment and bite corrections in all ages.",
    price: "From $2,800",
    duration: "12–24 months",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&auto=format",
    benefits: ["Tooth-colored brackets", "Handles complex cases", "Adults and teens", "Precise bite correction"],
    intro: "Ceramic braces combine the control of fixed orthodontics with a more discreet appearance than traditional metal brackets. They are often chosen when a case needs detailed tooth movement.",
    h2Title: "Why Ceramic Braces Are Used",
    h2Description: "Ceramic braces are useful for patients who need comprehensive orthodontic correction but prefer a more subtle appearance during treatment.",
    processTitle: "How treatment usually progresses",
    process: [
      "Orthodontic assessment and treatment planning for alignment and bite goals.",
      "Placement of ceramic brackets and regular adjustment visits.",
      "Monitoring through active movement until the final result is reached.",
    ],
    candidatesTitle: "Frequently chosen by",
    candidates: [
      "Adults and teens needing fixed orthodontic treatment.",
      "Patients with moderate to complex bite or alignment issues.",
      "Cases where aligners may not offer enough control.",
    ],
    metaTitle: "Ceramic Braces | Matikyan Dental Clinic",
    metaDescription: "Correct bite and alignment issues with ceramic braces at Matikyan Dental Clinic for effective orthodontic treatment with a discreet look.",
  },
  {
    slug: "/periodontal-treatment",
    category: "Surgery",
    title: "Periodontal Treatment",
    tagline: "Advanced gum disease therapy",
    desc: "Comprehensive treatment for all stages of gum disease — from deep cleaning and scaling to laser-assisted periodontal therapy and regenerative procedures.",
    price: "From $450",
    duration: "Varies by stage",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&auto=format",
    benefits: ["All gum disease stages", "Laser-assisted option", "Bone regeneration available", "Maintenance program included"],
    intro: "Periodontal treatment addresses inflammation, gum recession, and bone loss caused by gum disease. Early intervention helps preserve both teeth and supporting structures.",
    h2Title: "How Gum Disease Is Managed",
    h2Description: "Treatment depends on disease stage, pocket depth, and tissue response, with the goal of controlling infection and stabilizing long-term oral health.",
    processTitle: "Treatment may include",
    process: [
      "Clinical periodontal assessment and charting of gum health.",
      "Deep cleaning, scaling, or targeted periodontal therapy.",
      "Maintenance planning to reduce recurrence and monitor healing.",
    ],
    candidatesTitle: "Consider treatment if you have",
    candidates: [
      "Bleeding gums, persistent bad breath, or gum tenderness.",
      "Diagnosed gum disease or deep periodontal pockets.",
      "Recession or bone loss that needs specialist attention.",
    ],
    metaTitle: "Periodontal Treatment | Matikyan Dental Clinic",
    metaDescription: "Manage gum disease with periodontal treatment at Matikyan Dental Clinic including deep cleaning, specialist care, and ongoing maintenance.",
  },
  {
    slug: "/wisdom-tooth-extraction",
    category: "Surgery",
    title: "Wisdom Tooth Extraction",
    tagline: "Safe, comfortable removal",
    desc: "Surgical and non-surgical removal of impacted and problematic wisdom teeth. Performed under local anesthesia with sedation options available for anxious patients.",
    price: "From $300/tooth",
    duration: "45–90 min",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?w=600&h=400&fit=crop&auto=format",
    benefits: ["Sedation available", "Same-day procedure", "Minimal recovery time", "Detailed aftercare support"],
    intro: "Wisdom tooth extraction is recommended when third molars cause pain, crowding, inflammation, or repeated infection. Planning focuses on comfort, safety, and predictable healing.",
    h2Title: "When Removal Is Recommended",
    h2Description: "Impacted, partially erupted, or poorly positioned wisdom teeth can affect adjacent teeth and gum health, making timely removal the better long-term option.",
    processTitle: "What the procedure involves",
    process: [
      "Examination and imaging to assess tooth position and complexity.",
      "Removal under local anesthesia with sedation options if appropriate.",
      "Aftercare instructions and recovery monitoring after the procedure.",
    ],
    candidatesTitle: "Common reasons for extraction",
    candidates: [
      "Pain, swelling, repeated infection, or food trapping around wisdom teeth.",
      "Impacted teeth affecting neighboring molars.",
      "Orthodontic or preventive reasons based on clinical assessment.",
    ],
    metaTitle: "Wisdom Tooth Extraction | Matikyan Dental Clinic",
    metaDescription: "Schedule wisdom tooth extraction at Matikyan Dental Clinic for impacted or painful third molars with careful planning and aftercare support.",
  },
  {
    slug: "/pediatric-dentistry",
    category: "Pediatric",
    title: "Pediatric Dentistry",
    tagline: "Gentle care for little smiles",
    desc: "Specialized dental care designed for children from age 1 through teenage years. Child-friendly environment, preventive treatments, and early orthodontic monitoring.",
    price: "From $60",
    duration: "30–60 min",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&auto=format",
    benefits: ["Age 1+ welcome", "Fear-free approach", "Sealants and fluoride", "Early ortho assessment"],
    intro: "Pediatric dentistry focuses on prevention, healthy habits, and positive early dental experiences. Visits are structured to help children feel comfortable while giving parents clear guidance.",
    h2Title: "Why Early Dental Visits Matter",
    h2Description: "Regular pediatric dental care supports healthy development, early cavity prevention, and timely monitoring of bite and tooth eruption patterns.",
    processTitle: "What families can expect",
    process: [
      "A child-friendly exam adapted to age and comfort level.",
      "Preventive care such as cleaning, fluoride, and sealant recommendations.",
      "Guidance for parents on hygiene, diet, habits, and early orthodontic concerns.",
    ],
    candidatesTitle: "Designed for",
    candidates: [
      "Children from first visits through adolescence.",
      "Families who want preventive monitoring and education.",
      "Children who benefit from a gentler, confidence-building dental approach.",
    ],
    metaTitle: "Pediatric Dentistry | Matikyan Dental Clinic",
    metaDescription: "Discover pediatric dentistry at Matikyan Dental Clinic with child-friendly preventive care, cleanings, fluoride, and early smile monitoring.",
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
  ["/dental-cleaning-check-up", "preventive"],
  ["/teeth-whitening", "cosmetic"],
  ["/veneers", "cosmetic"],
  ["/composite-bonding", "cosmetic"],
  ["/dental-implants", "restorative"],
  ["/same-day-crowns", "restorative"],
  ["/root-canal-treatment", "restorative"],
  ["/invisalign", "orthodontics"],
  ["/ceramic-braces", "orthodontics"],
  ["/periodontal-treatment", "surgery"],
  ["/wisdom-tooth-extraction", "surgery"],
  ["/pediatric-dentistry", "pediatric"],
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
