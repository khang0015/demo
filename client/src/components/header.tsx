import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { useTranslations } from "@/hooks/use-translations";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentLang, switchLanguage } = useLanguage();
  const { t } = useTranslations();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-primary/95 backdrop-blur-sm border-b border-gray-800">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">m</span>
            </div>
            <span className="text-xl font-bold">{t("brand.name")}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("about")} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t("nav.about")}
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t("nav.services")}
            </button>
            <button 
              onClick={() => scrollToSection("work")} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t("nav.work")}
            </button>
            <button 
              onClick={() => scrollToSection("testimonials")} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t("nav.testimonials")}
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t("nav.contact")}
            </button>
          </div>

          {/* Language Switcher & CTA */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button
                variant={currentLang === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => switchLanguage("en")}
                className={currentLang === "en" ? "bg-brand-red hover:bg-red-600" : "text-gray-400 hover:text-white"}
              >
                EN
              </Button>
              <Button
                variant={currentLang === "vi" ? "default" : "ghost"}
                size="sm"
                onClick={() => switchLanguage("vi")}
                className={currentLang === "vi" ? "bg-brand-red hover:bg-red-600" : "text-gray-400 hover:text-white"}
              >
                VI
              </Button>
            </div>
            
            <Button 
              onClick={() => scrollToSection("contact")}
              className="bg-brand-red hover:bg-red-600 text-white font-medium"
            >
              {t("cta.get_in_touch")}
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection("about")}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                {t("nav.about")}
              </button>
              <button 
                onClick={() => scrollToSection("services")}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                {t("nav.services")}
              </button>
              <button 
                onClick={() => scrollToSection("work")}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                {t("nav.work")}
              </button>
              <button 
                onClick={() => scrollToSection("testimonials")}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                {t("nav.testimonials")}
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                {t("nav.contact")}
              </button>
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-2 pt-4 border-t border-gray-800">
                <Button
                  variant={currentLang === "en" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => switchLanguage("en")}
                  className={currentLang === "en" ? "bg-brand-red hover:bg-red-600" : "text-gray-400 hover:text-white"}
                >
                  EN
                </Button>
                <Button
                  variant={currentLang === "vi" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => switchLanguage("vi")}
                  className={currentLang === "vi" ? "bg-brand-red hover:bg-red-600" : "text-gray-400 hover:text-white"}
                >
                  VI
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
