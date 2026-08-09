import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSiteSettings } from "../../hooks/useSiteSettings";

const DEFAULT_WHATSAPP_NUMBER = "+37494250122";

/**
 * Online-chat capability (spec item 24) via WhatsApp click-to-chat - a real, zero-backend way for
 * visitors to reach the clinic instantly. Uses its own whatsappNumber setting (independent of the
 * main displayed phone number) since a business's WhatsApp line commonly differs from its landline.
 * No third-party chat-widget account/ID exists for this project, so this avoids a fake integration.
 */
export function WhatsAppChat() {
  const { t } = useTranslation();
  const settings = useSiteSettings();
  const phone = (settings?.whatsappNumber ?? DEFAULT_WHATSAPP_NUMBER).replace(/[^\d+]/g, "");

  return (
    <a
      href={`https://wa.me/${phone.replace("+", "")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("chat.whatsapp", { defaultValue: "Chat with us on WhatsApp" })}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" fill="white" />
    </a>
  );
}
