import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/components/language-provider";

export function useTranslations() {
  const { currentLang } = useLanguage();
  
  const { data: translations = {}, isLoading, error } = useQuery<Record<string, string>>({
    queryKey: ["/api/translations", currentLang],
    enabled: !!currentLang,
  });

  const t = (key: string): string => {
    return (translations as Record<string, string>)[key] || key;
  };

  return { t, isLoading, error, translations };
}
