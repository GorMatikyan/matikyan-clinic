import heroSlide01 from "../../images/hero/hero-clinic-exterior-01.webp";
import heroSlide01Mobile from "../../images/hero/hero-clinic-exterior-01-mobile.webp";
import heroSlide02 from "../../images/hero/hero-clinic-interior-01.webp";
import heroSlide02Mobile from "../../images/hero/hero-clinic-interior-01-mobile.webp";
import heroSlide03 from "../../images/hero/hero-treatment-room-01.webp";
import heroSlide03Mobile from "../../images/hero/hero-treatment-room-01-mobile.webp";
import heroSlide04 from "../../images/hero/hero-patient-care-01.webp";
import heroSlide04Mobile from "../../images/hero/hero-patient-care-01-mobile.webp";
import aboutClinicPhoto from "../../images/sections/section-about-clinic-01.webp";
import aboutInteriorPhoto from "../../images/sections/section-about-interior-01.webp";
import whyUsImage from "../../images/sections/section-why-us-patient.webp";
import aboutConsultationPhoto from "../../images/sections/section-about-consultation-01.webp";

export const siteImages = {
  clinicFacade: whyUsImage,
  aboutImages: {
    main: whyUsImage,
    consultation: aboutConsultationPhoto,
    equipment: aboutClinicPhoto,
    interior: aboutInteriorPhoto,
  },
  heroSlides: [
    { full: heroSlide01, mobile: heroSlide01Mobile, fullWidth: 1672 },
    { full: heroSlide02, mobile: heroSlide02Mobile, fullWidth: 1672 },
    { full: heroSlide03, mobile: heroSlide03Mobile, fullWidth: 2200 },
    { full: heroSlide04, mobile: heroSlide04Mobile, fullWidth: 1672 },
  ],
} as const;
