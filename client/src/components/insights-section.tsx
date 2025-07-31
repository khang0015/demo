import { ArrowRight, Download, Store, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";

export default function InsightsSection() {
  const { t } = useTranslations();

  const articles = [
    {
      title: "How To Redownload TikTok After Ban - 2025 Full Guideline",
      date: "JULY 25, 2025",
      category: "How To",
      icon: Download,
      bgGradient: "from-black via-gray-800 to-red-600"
    },
    {
      title: "How To Become A TikTok Shop Affiliate: A Guide For Creators",
      date: "JULY 18, 2025", 
      category: "Guide",
      icon: Store,
      bgGradient: "from-green-600 via-teal-700 to-blue-800"
    },
    {
      title: "TikTok Campaign: The Complete Guide For Advertisers In 2025",
      date: "JULY 10, 2025",
      category: "Campaign",
      icon: TrendingUp,
      bgGradient: "from-purple-600 via-pink-600 to-red-600"
    }
  ];

  return (
    <section className="py-20 bg-dark-primary">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <div>
            <p className="text-brand-red font-semibold text-sm uppercase tracking-wider mb-4">
              {t("insights.tagline")}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              {t("insights.title")}
            </h2>
          </div>
          <Button 
            variant="outline"
            className="hidden md:inline-flex items-center space-x-2 border-white rounded-full px-6 py-3 hover:bg-white hover:text-dark-primary transition-colors group"
          >
            <span>{t("insights.read_all")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => {
            const IconComponent = article.icon;
            return (
              <article key={index} className="bg-dark-secondary rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 group cursor-pointer">
                <div className={`h-48 bg-gradient-to-br ${article.bgGradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <IconComponent className="text-white text-4xl mb-2 mx-auto" />
                      <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                        <IconComponent className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-brand-red text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-brand-red transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{article.date}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
