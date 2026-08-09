import heroSlide01 from "../../images/hero/hero-clinic-exterior-01.webp";
import heroSlide01Mobile from "../../images/hero/hero-clinic-exterior-01-mobile.webp";
import heroSlide02 from "../../images/hero/hero-clinic-interior-01.webp";
import heroSlide02Mobile from "../../images/hero/hero-clinic-interior-01-mobile.webp";
import heroSlide03 from "../../images/hero/hero-treatment-room-01.webp";
import heroSlide03Mobile from "../../images/hero/hero-treatment-room-01-mobile.webp";
import heroSlide04 from "../../images/hero/hero-patient-care-01.webp";
import heroSlide04Mobile from "../../images/hero/hero-patient-care-01-mobile.webp";
import aboutClinicPhoto from "../../images/sections/section-about-clinic-01.webp";
import aboutClinicPhotoMobile from "../../images/sections/section-about-clinic-01-mobile.webp";
import aboutInteriorPhoto from "../../images/sections/section-about-interior-01.webp";
import aboutInteriorPhotoMobile from "../../images/sections/section-about-interior-01-mobile.webp";
import whyUsImage from "../../images/sections/section-why-us-patient.webp";
import whyUsImageMobile from "../../images/sections/section-why-us-patient-mobile.webp";
import aboutConsultationPhoto from "../../images/sections/section-about-consultation-01.webp";
import aboutConsultationPhotoMobile from "../../images/sections/section-about-consultation-01-mobile.webp";

export const siteImages = {
  clinicFacade: { full: whyUsImage, mobile: whyUsImageMobile, fullWidth: 1200 },
  aboutImages: {
    main: { full: whyUsImage, mobile: whyUsImageMobile, fullWidth: 1200 },
    consultation: { full: aboutConsultationPhoto, mobile: aboutConsultationPhotoMobile, fullWidth: 1200 },
    equipment: { full: aboutClinicPhoto, mobile: aboutClinicPhotoMobile, fullWidth: 1400 },
    interior: { full: aboutInteriorPhoto, mobile: aboutInteriorPhotoMobile, fullWidth: 1200 },
  },
  heroSlides: [
    { full: heroSlide01, mobile: heroSlide01Mobile, fullWidth: 1672 },
    { full: heroSlide02, mobile: heroSlide02Mobile, fullWidth: 1672 },
    { full: heroSlide03, mobile: heroSlide03Mobile, fullWidth: 2200 },
    { full: heroSlide04, mobile: heroSlide04Mobile, fullWidth: 1672 },
  ],
} as const;
