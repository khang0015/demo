import { Star, TrendingUp, Users, BarChart3 } from "lucide-react";
import { SiTiktok, SiGoogle, SiStripe, SiPaypal } from "react-icons/si";
import { Building2 } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export default function HeroSection() {
  const { t } = useTranslations();

  return (
    <section className="pt-24 pb-16 min-h-screen flex items-center bg-dark-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-brand-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-brand-red font-semibold text-sm uppercase tracking-wider">
                {t("hero.tagline")}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span>{t("hero.title_1")}</span><br />
                <span>{t("hero.title_2")}</span><br />
                <span className="text-brand-red">{t("hero.title_highlight")}</span><br />
                <span>{t("hero.title_3")}</span>
              </h1>
            </div>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
              {t("hero.description")}
            </p>

            {/* Trust Indicators */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex text-green-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">{t("hero.trustpilot")}</span>
              </div>
              
              <p className="text-sm font-semibold text-gray-300">{t("hero.trusted_by")}</p>
              
              {/* Partner Logos */}
              <div className="flex items-center space-x-8 opacity-70">
                <SiTiktok className="text-2xl" />
                <SiGoogle className="text-2xl" />
                <Building2 className="text-2xl" />
                <SiStripe className="text-2xl" />
                <SiPaypal className="text-2xl" />
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="relative">
            {/* Modern Dashboard Visual */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl">
              {/* Revenue Card */}
              <div className="bg-white rounded-xl p-4 mb-4 text-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">REVENUE</span>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600">$512,847</div>
                <div className="text-xs text-gray-500">↗ +23% from last month</div>
              </div>

              {/* Engagement Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-dark-secondary rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-gray-400">FOLLOWERS</div>
                    <Users className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-lg font-bold">152,927</div>
                </div>
                <div className="bg-dark-secondary rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-gray-400">ENGAGEMENT</div>
                    <BarChart3 className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-lg font-bold text-green-400">92.3%</div>
                </div>
              </div>

              {/* Platform Analytics */}
              <div className="bg-dark-secondary rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">PLATFORM PERFORMANCE</span>
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="h-8 bg-black rounded"></div>
                  <div className="h-6 bg-blue-500 rounded"></div>
                  <div className="h-10 bg-brand-red rounded"></div>
                  <div className="h-7 bg-blue-600 rounded"></div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-brand-red rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
              <TrendingUp className="text-white text-xl" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
              <BarChart3 className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
