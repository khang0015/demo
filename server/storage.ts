import { type User, type InsertUser, type Translation, type InsertTranslation, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getTranslationsByLang(lang: string): Promise<Translation[]>;
  createTranslation(translation: InsertTranslation): Promise<Translation>;
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private translations: Map<string, Translation>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.translations = new Map();
    this.contacts = new Map();
    this.initializeTranslations();
  }

  private initializeTranslations() {
    // English translations
    const enTranslations = [
      { lang: "en", key: "brand.name", value: "TikTok Ads Pro" },
      { lang: "en", key: "nav.about", value: "About Us" },
      { lang: "en", key: "nav.services", value: "Services" },
      { lang: "en", key: "nav.work", value: "Our Work" },
      { lang: "en", key: "nav.testimonials", value: "Testimonials" },
      { lang: "en", key: "nav.contact", value: "Contact" },
      { lang: "en", key: "cta.get_in_touch", value: "GET IN TOUCH" },
      { lang: "en", key: "hero.tagline", value: "TIKTOK ADS SPECIALISTS" },
      { lang: "en", key: "hero.title_1", value: "Driving brand" },
      { lang: "en", key: "hero.title_2", value: "growth on" },
      { lang: "en", key: "hero.title_highlight", value: "meaningful" },
      { lang: "en", key: "hero.title_3", value: "platforms" },
      { lang: "en", key: "hero.description", value: "We help you design effective sales channels on the world's most influential platforms and drive revenue through organic discovery and paid campaigns." },
      { lang: "en", key: "hero.trustpilot", value: "Review us on Trustpilot" },
      { lang: "en", key: "hero.trusted_by", value: "Trusted by industry leaders" },
      { lang: "en", key: "services.tagline", value: "OUR SOLUTIONS" },
      { lang: "en", key: "services.title", value: "Grow your presence & drive revenue from scalable campaigns." },
      { lang: "en", key: "platforms.tiktok.name", value: "TikTok" },
      { lang: "en", key: "platforms.tiktok.description", value: "TikTok is no longer simply an entertainment platform, but a solid commercial channel as well. Check out the campaign #TikTokmademebuyt to see for yourself." },
      { lang: "en", key: "platforms.tiktok.cta", value: "DISCOVER TIKTOK ADS" },
      { lang: "en", key: "platforms.google.name", value: "Google" },
      { lang: "en", key: "platforms.google.description", value: "The most used search engine on the planet is the most relevant & reliable platform to establish your presence and target audience who are actively looking to buy your products." },
      { lang: "en", key: "platforms.google.cta", value: "DISCOVER GOOGLE ADS" },
      { lang: "en", key: "platforms.microsoft.name", value: "Microsoft" },
      { lang: "en", key: "platforms.microsoft.description", value: "With the second-largest share in the search engine market and a powerful ecosystem, Microsoft advertising is a must-solution that businesses only advertise on Google cannot miss!" },
      { lang: "en", key: "platforms.microsoft.cta", value: "DISCOVER MICROSOFT ADS" },
      { lang: "en", key: "platforms.facebook.name", value: "Facebook" },
      { lang: "en", key: "platforms.facebook.description", value: "Rich communities, deep advertising capabilities and a large user base make Facebook an ideal channel to foster new customer relationships and grow your brand globally." },
      { lang: "en", key: "platforms.facebook.cta", value: "DISCOVER FACEBOOK ADS" },
      { lang: "en", key: "partners.tagline", value: "STRATEGIC PARTNERS" },
      { lang: "en", key: "partners.title", value: "The reason why brands choose us." },
      { lang: "en", key: "testimonials.tagline", value: "TESTIMONIALS" },
      { lang: "en", key: "testimonials.title", value: "Don't just take our words for it, take our customers'." },
      { lang: "en", key: "insights.tagline", value: "OUR THOUGHTS" },
      { lang: "en", key: "insights.title", value: "Latest news & industry insights" },
      { lang: "en", key: "insights.read_all", value: "READ ALL ARTICLES" },
      { lang: "en", key: "contact.title", value: "Ready to talk growth?" },
      { lang: "en", key: "contact.description", value: "Let's discuss how we can help scale your business with effective TikTok advertising campaigns." },
      { lang: "en", key: "form.name_label", value: "Full Name *" },
      { lang: "en", key: "form.name_placeholder", value: "Your full name" },
      { lang: "en", key: "form.email_label", value: "Email Address *" },
      { lang: "en", key: "form.email_placeholder", value: "your.email@company.com" },
      { lang: "en", key: "form.company_label", value: "Company" },
      { lang: "en", key: "form.company_placeholder", value: "Your company name" },
      { lang: "en", key: "form.service_label", value: "Interested Service" },
      { lang: "en", key: "form.service_placeholder", value: "Select a service" },
      { lang: "en", key: "form.tiktok_ads", value: "TikTok Advertising" },
      { lang: "en", key: "form.google_ads", value: "Google Ads Management" },
      { lang: "en", key: "form.microsoft_ads", value: "Microsoft Advertising" },
      { lang: "en", key: "form.facebook_ads", value: "Facebook Advertising" },
      { lang: "en", key: "form.consultation", value: "Strategy Consultation" },
      { lang: "en", key: "form.message_label", value: "Message *" },
      { lang: "en", key: "form.message_placeholder", value: "Tell us about your project and goals..." },
      { lang: "en", key: "form.submit_button", value: "Send Message" },
      { lang: "en", key: "form.privacy_notice", value: "By submitting this form, you agree to our privacy policy and terms of service." },
    ];

    // Vietnamese translations
    const viTranslations = [
      { lang: "vi", key: "brand.name", value: "TikTok Ads Pro" },
      { lang: "vi", key: "nav.about", value: "Về Chúng Tôi" },
      { lang: "vi", key: "nav.services", value: "Dịch Vụ" },
      { lang: "vi", key: "nav.work", value: "Công Việc" },
      { lang: "vi", key: "nav.testimonials", value: "Đánh Giá" },
      { lang: "vi", key: "nav.contact", value: "Liên Hệ" },
      { lang: "vi", key: "cta.get_in_touch", value: "LIÊN HỆ NGAY" },
      { lang: "vi", key: "hero.tagline", value: "CHUYÊN GIA QUẢNG CÁO TIKTOK" },
      { lang: "vi", key: "hero.title_1", value: "Thúc đẩy thương hiệu" },
      { lang: "vi", key: "hero.title_2", value: "phát triển trên các" },
      { lang: "vi", key: "hero.title_highlight", value: "nền tảng" },
      { lang: "vi", key: "hero.title_3", value: "có ý nghĩa" },
      { lang: "vi", key: "hero.description", value: "Chúng tôi giúp bạn thiết kế các kênh bán hàng hiệu quả trên những nền tảng có tầm ảnh hưởng nhất thế giới và tăng doanh thu thông qua khám phá tự nhiên và các chiến dịch trả phí." },
      { lang: "vi", key: "hero.trustpilot", value: "Đánh giá chúng tôi trên Trustpilot" },
      { lang: "vi", key: "hero.trusted_by", value: "Được tin tưởng bởi các nhà lãnh đạo ngành" },
      { lang: "vi", key: "services.tagline", value: "GIẢI PHÁP CỦA CHÚNG TÔI" },
      { lang: "vi", key: "services.title", value: "Phát triển sự hiện diện & tăng doanh thu từ các chiến dịch có thể mở rộng." },
      { lang: "vi", key: "platforms.tiktok.name", value: "TikTok" },
      { lang: "vi", key: "platforms.tiktok.description", value: "TikTok không còn chỉ đơn thuần là một nền tảng giải trí, mà còn là một kênh thương mại vững chắc. Hãy xem chiến dịch #TikTokmademebuyt để tự mình thấy." },
      { lang: "vi", key: "platforms.tiktok.cta", value: "KHÁM PHÁ QUẢNG CÁO TIKTOK" },
      { lang: "vi", key: "platforms.google.name", value: "Google" },
      { lang: "vi", key: "platforms.google.description", value: "Công cụ tìm kiếm được sử dụng nhiều nhất trên hành tinh là nền tảng liên quan và đáng tin cậy nhất để thiết lập sự hiện diện của bạn và nhắm mục tiêu đối tượng đang tích cực tìm mua sản phẩm của bạn." },
      { lang: "vi", key: "platforms.google.cta", value: "KHÁM PHÁ QUẢNG CÁO GOOGLE" },
      { lang: "vi", key: "platforms.microsoft.name", value: "Microsoft" },
      { lang: "vi", key: "platforms.microsoft.description", value: "Với thị phần lớn thứ hai trong thị trường công cụ tìm kiếm và một hệ sinh thái mạnh mẽ, quảng cáo Microsoft là giải pháp bắt buộc mà các doanh nghiệp chỉ quảng cáo trên Google không thể bỏ lỡ!" },
      { lang: "vi", key: "platforms.microsoft.cta", value: "KHÁM PHÁ QUẢNG CÁO MICROSOFT" },
      { lang: "vi", key: "platforms.facebook.name", value: "Facebook" },
      { lang: "vi", key: "platforms.facebook.description", value: "Các cộng đồng phong phú, khả năng quảng cáo sâu sắc và cơ sở người dùng lớn khiến Facebook trở thành kênh lý tưởng để nuôi dưỡng các mối quan hệ khách hàng mới và phát triển thương hiệu của bạn trên toàn cầu." },
      { lang: "vi", key: "platforms.facebook.cta", value: "KHÁM PHÁ QUẢNG CÁO FACEBOOK" },
      { lang: "vi", key: "partners.tagline", value: "ĐỐI TÁC CHIẾN LƯỢC" },
      { lang: "vi", key: "partners.title", value: "Lý do tại sao các thương hiệu chọn chúng tôi." },
      { lang: "vi", key: "testimonials.tagline", value: "ĐÁNH GIÁ" },
      { lang: "vi", key: "testimonials.title", value: "Đừng chỉ tin lời chúng tôi, hãy tin lời khách hàng của chúng tôi." },
      { lang: "vi", key: "insights.tagline", value: "SỨY NGHĨ CỦA CHÚNG TÔI" },
      { lang: "vi", key: "insights.title", value: "Tin tức mới nhất & thông tin chuyên sâu về ngành" },
      { lang: "vi", key: "insights.read_all", value: "ĐỌC TẤT CẢ BÀI VIẾT" },
      { lang: "vi", key: "contact.title", value: "Sẵn sàng thảo luận về sự phát triển?" },
      { lang: "vi", key: "contact.description", value: "Hãy thảo luận về cách chúng tôi có thể giúp mở rộng quy mô kinh doanh của bạn với các chiến dịch quảng cáo TikTok hiệu quả." },
      { lang: "vi", key: "form.name_label", value: "Họ và Tên *" },
      { lang: "vi", key: "form.name_placeholder", value: "Họ và tên của bạn" },
      { lang: "vi", key: "form.email_label", value: "Địa Chỉ Email *" },
      { lang: "vi", key: "form.email_placeholder", value: "email.cua.ban@congty.com" },
      { lang: "vi", key: "form.company_label", value: "Công Ty" },
      { lang: "vi", key: "form.company_placeholder", value: "Tên công ty của bạn" },
      { lang: "vi", key: "form.service_label", value: "Dịch Vụ Quan Tâm" },
      { lang: "vi", key: "form.service_placeholder", value: "Chọn một dịch vụ" },
      { lang: "vi", key: "form.tiktok_ads", value: "Quảng Cáo TikTok" },
      { lang: "vi", key: "form.google_ads", value: "Quản Lý Quảng Cáo Google" },
      { lang: "vi", key: "form.microsoft_ads", value: "Quảng Cáo Microsoft" },
      { lang: "vi", key: "form.facebook_ads", value: "Quảng Cáo Facebook" },
      { lang: "vi", key: "form.consultation", value: "Tư Vấn Chiến Lược" },
      { lang: "vi", key: "form.message_label", value: "Tin Nhắn *" },
      { lang: "vi", key: "form.message_placeholder", value: "Hãy cho chúng tôi biết về dự án và mục tiêu của bạn..." },
      { lang: "vi", key: "form.submit_button", value: "Gửi Tin Nhắn" },
      { lang: "vi", key: "form.privacy_notice", value: "Bằng cách gửi biểu mẫu này, bạn đồng ý với chính sách bảo mật và điều khoản dịch vụ của chúng tôi." },
    ];

    [...enTranslations, ...viTranslations].forEach(translation => {
      const id = randomUUID();
      this.translations.set(id, { ...translation, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTranslationsByLang(lang: string): Promise<Translation[]> {
    return Array.from(this.translations.values()).filter(
      (translation) => translation.lang === lang,
    );
  }

  async createTranslation(insertTranslation: InsertTranslation): Promise<Translation> {
    const id = randomUUID();
    const translation: Translation = { ...insertTranslation, id };
    this.translations.set(id, translation);
    return translation;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact,
      company: insertContact.company || null,
      service: insertContact.service || null,
      id, 
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
