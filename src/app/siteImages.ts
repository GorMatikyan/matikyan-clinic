import heroSlide01 from "../../images/hero/hero-clinic-exterior-01.jpg";
import heroSlide02 from "../../images/hero/hero-clinic-interior-01.jpg";
import heroSlide03 from "../../images/hero/hero-treatment-room-01.jpg";
import heroSlide04 from "../../images/hero/hero-patient-care-01.jpg";
import aboutClinicPhoto from "../../images/sections/section-about-clinic-01.jpg";
import aboutInteriorPhoto from "../../images/sections/section-about-interior-01.jpg";
import whyUsImage from "../../images/sections/section-why-us-patient.jpg";
import aboutConsultationPhoto from "../../images/sections/section-about-consultation-01.jpg";

export const siteImages = {
  clinicFacade: whyUsImage,
  aboutImages: {
    main: whyUsImage,
    consultation: aboutConsultationPhoto,
    equipment: aboutClinicPhoto,
    interior: aboutInteriorPhoto,
  },
  heroSlides: [heroSlide01, heroSlide02, heroSlide03, heroSlide04],
} as const;
