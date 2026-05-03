import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const SERVICE_ICONS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515036966/BCaYsJL3EqPnjYm7sbhATD/service_icons_pack-DT2rzk5fFzKfHQXLd6Jxui.webp";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  benefits: string[];
  pricing: string;
  link?: string;
}

const services: Service[] = [
  {
    id: "seo",
    title: "تحسين محرك البحث (SEO)",
    description: "ظهور أول في جوجل وزيادة الزيارات العضوية",
    icon: "🔍",
    link: "/service-seo",
    details: [
      "تحليل الكلمات المفتاحية المناسبة",
      "تحسين محتوى المتجر",
      "بناء روابط خارجية موثوقة",
      "تحسين سرعة التحميل",
      "تحسين تجربة المستخدم"
    ],
    benefits: [
      "زيادة الزيارات العضوية بنسبة 300%",
      "تحسين ترتيب الموقع في جوجل",
      "زيادة المبيعات والتحويلات",
      "بناء سلطة المجال"
    ],
    pricing: "يبدأ من 499 ريال/شهر"
  },
  {
    id: "ads",
    title: "الحملات الإعلانية",
    description: "إنشاء وإدارة حملات إعلانية احترافية",
    icon: "🎯",
    link: "/service-advertising",
    details: [
      "إعلانات جوجل (Google Ads)",
      "إعلانات فيسبوك وإنستغرام",
      "إعلانات يوتيوب",
      "استهداف دقيق للجمهور",
      "تحسين معدل التحويل"
    ],
    benefits: [
      "وصول سريع للعملاء المستهدفين",
      "تحكم كامل في الميزانية",
      "قياس دقيق للنتائج",
      "ROI عالي ومضمون"
    ],
    pricing: "يبدأ من 799 ريال/شهر"
  },
  {
    id: "social",
    title: "إدارة السوشل ميديا",
    description: "إدارة شاملة لجميع منصات التواصل الاجتماعي",
    icon: "📱",
    link: "/service-social-media",
    details: [
      "إنشاء محتوى جذاب يومي",
      "إدارة التفاعلات والتعليقات",
      "جدولة المنشورات",
      "تحليل الأداء والإحصائيات",
      "بناء مجتمع قوي"
    ],
    benefits: [
      "زيادة متابعيك بشكل طبيعي",
      "بناء علاقات قوية مع العملاء",
      "زيادة الوعي بالعلامة التجارية",
      "تحسين سمعة المتجر"
    ],
    pricing: "يبدأ من 599 ريال/شهر"
  },
  {
    id: "content",
    title: "إنشاء المحتوى",
    description: "محتوى احترافي وجذاب لعلامتك التجارية",
    icon: "✨",
    link: "/service-content",
    details: [
      "كتابة محتوى SEO متوافق",
      "إنتاج فيديوهات احترافية",
      "تصميم صور جذابة",
      "إنشاء رسوم بيانية",
      "محتوى تعليمي مفيد"
    ],
    benefits: [
      "محتوى عالي الجودة يجذب العملاء",
      "تحسين الترتيب في محركات البحث",
      "زيادة التفاعل والمشاركة",
      "بناء سلطة المحتوى"
    ],
    pricing: "يبدأ من 699 ريال/شهر"
  },
  {
    id: "store",
    title: "المتجر الإلكتروني",
    description: "بناء متجر احترافي من الصفر مع هوية بصرية",
    icon: "🛍️",
    link: "/service-store",
    details: [
      "تصميم هوية بصرية فريدة",
      "تطوير متجر احترافي",
      "تنظيم المنتجات والفئات",
      "نظام دفع آمن",
      "تحسين تجربة المستخدم"
    ],
    benefits: [
      "متجر احترافي يعكس علامتك التجارية",
      "سهولة إدارة المنتجات",
      "أمان عالي للعملاء",
      "زيادة المبيعات"
    ],
    pricing: "يبدأ من 1,499 ريال (مرة واحدة)"
  },
  {
    id: "analytics",
    title: "ربط الأدوات والتكامل",
    description: "ربط متجرك مع أدوات التسويق الرائدة",
    icon: "🔗",
    link: "/service-integration",
    details: [
      "تقارير شاملة عن الأداء",
      "تحليل سلوك العملاء",
      "قياس ROI",
      "تقارير مخصصة",
      "نصائح للتحسين"
    ],
    benefits: [
      "فهم عميق لأداء متجرك",
      "اتخاذ قرارات مبنية على البيانات",
      "تحديد فرص النمو",
      "تحسين مستمر"
    ],
    pricing: "يبدأ من 299 ريال/شهر"
  }
];

export default function Services() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-yellow-400">يجب تسجيل الدخول</h1>
          <p className="text-gray-400 mb-6">يرجى تسجيل الدخول للوصول إلى الخدمات</p>
        </Card>
      </div>
    );
  }

  if (selectedService) {
    return (
      <div className="min-h-screen bg-black text-white p-6" style={{ direction: "rtl" }}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedService(null)}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            العودة
          </button>

          <div className="space-y-8">
            <div>
              <div className="text-6xl mb-4">{selectedService.icon}</div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
                {selectedService.title}
              </h1>
              <p className="text-xl text-gray-400">{selectedService.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6">
                <h2 className="text-2xl font-bold mb-4 text-yellow-400">ماذا نقدم</h2>
                <ul className="space-y-3">
                  {selectedService.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">الفوائد</h2>
                <ul className="space-y-3">
                  {selectedService.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-blue-500 mt-1">★</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-yellow-600/30 to-blue-600/30 border-yellow-500/50 p-8 text-center">
              <p className="text-2xl font-bold mb-4">{selectedService.pricing}</p>
              <Button className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold px-8 py-6 text-lg">
                اشترك الآن
                <ChevronRight className="w-5 h-5 mr-2" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6" style={{ direction: "rtl" }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
          خدماتنا المتكاملة
        </h1>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          مجموعة شاملة من الخدمات التسويقية الرقمية المتخصصة لتجار منصة سلة
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <Card
              key={service.id}
              className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 hover:border-yellow-500/60 transition p-6 cursor-pointer group"
              onClick={() => service.link ? setLocation(service.link) : setSelectedService(service)}
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <div className="flex items-center gap-2 text-yellow-500 group-hover:gap-3 transition">
                <span>تفاصيل أكثر</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
