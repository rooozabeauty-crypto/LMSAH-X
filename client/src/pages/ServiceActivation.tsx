import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Zap, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  plans: {
    name: string;
    price: number;
    features: string[];
  }[];
}

const services: ServiceOption[] = [
  {
    id: "seo",
    name: "تحسين محرك البحث (SEO)",
    description: "ظهور متجرك في الصفحة الأولى من نتائج البحث",
    icon: "🔍",
    plans: [
      {
        name: "أساسي",
        price: 299,
        features: ["تحليل الكلمات المفتاحية", "تحسين 10 صفحات", "تقرير شهري"]
      },
      {
        name: "احترافي",
        price: 1499,
        features: ["تحليل متقدم", "تحسين 50 صفحة", "دعم فني 24/7", "تقارير أسبوعية"]
      },
      {
        name: "متقدم",
        price: 8900,
        features: ["تحسين شامل", "تحسين غير محدود", "استراتيجية مخصصة", "فريق متخصص"]
      }
    ]
  },
  {
    id: "advertising",
    name: "الحملات الإعلانية",
    description: "حملات إعلانية موجهة على Google و Facebook",
    icon: "📢",
    plans: [
      {
        name: "أساسي",
        price: 299,
        features: ["حملة واحدة", "ميزانية 1000 ريال", "إدارة يومية"]
      },
      {
        name: "احترافي",
        price: 1499,
        features: ["3 حملات", "ميزانية 5000 ريال", "تحسين مستمر", "تقارير يومية"]
      },
      {
        name: "متقدم",
        price: 8900,
        features: ["حملات غير محدودة", "ميزانية مخصصة", "استراتيجية متقدمة", "فريق إدارة"]
      }
    ]
  },
  {
    id: "social_media",
    name: "إدارة السوشل ميديا",
    description: "إدارة حسابات التواصل الاجتماعي والمحتوى",
    icon: "📱",
    plans: [
      {
        name: "أساسي",
        price: 299,
        features: ["منصة واحدة", "4 منشورات شهرياً", "تقرير شهري"]
      },
      {
        name: "احترافي",
        price: 1499,
        features: ["3 منصات", "12 منشور شهرياً", "تفاعل مع التعليقات", "تقارير أسبوعية"]
      },
      {
        name: "متقدم",
        price: 8900,
        features: ["جميع المنصات", "محتوى يومي", "إدارة كاملة", "استراتيجية محتوى"]
      }
    ]
  },
  {
    id: "content",
    name: "إنشاء المحتوى",
    description: "محتوى احترافي للمنتجات والخدمات",
    icon: "✍️",
    plans: [
      {
        name: "أساسي",
        price: 299,
        features: ["4 نصوص شهرياً", "صور احترافية", "تحسين SEO"]
      },
      {
        name: "احترافي",
        price: 1499,
        features: ["12 نص شهرياً", "فيديوهات قصيرة", "تصاميم احترافية", "مراجعة شاملة"]
      },
      {
        name: "متقدم",
        price: 8900,
        features: ["محتوى غير محدود", "فيديوهات احترافية", "تصاميم مخصصة", "فريق إبداعي"]
      }
    ]
  },
  {
    id: "email_marketing",
    name: "التسويق عبر البريد الإلكتروني",
    description: "حملات بريد إلكتروني موجهة وفعالة",
    icon: "📧",
    plans: [
      {
        name: "أساسي",
        price: 299,
        features: ["حملة واحدة شهرياً", "500 مشترك", "قوالب جاهزة"]
      },
      {
        name: "احترافي",
        price: 1499,
        features: ["4 حملات شهرياً", "5000 مشترك", "تحليل النتائج", "تصاميم مخصصة"]
      },
      {
        name: "متقدم",
        price: 8900,
        features: ["حملات غير محدودة", "مشتركين غير محدودين", "أتمتة متقدمة", "استراتيجية شاملة"]
      }
    ]
  },
  {
    id: "sms_marketing",
    name: "التسويق عبر الرسائل النصية",
    description: "رسائل نصية موجهة للعملاء",
    icon: "💬",
    plans: [
      {
        name: "أساسي",
        price: 299,
        features: ["100 رسالة شهرياً", "قالب واحد", "إحصائيات أساسية"]
      },
      {
        name: "احترافي",
        price: 1499,
        features: ["500 رسالة شهرياً", "5 قوالب", "تحليل مفصل", "جدولة الرسائل"]
      },
      {
        name: "متقدم",
        price: 8900,
        features: ["رسائل غير محدودة", "قوالب غير محدودة", "أتمتة ذكية", "دعم فني 24/7"]
      }
    ]
  }
];

export default function ServiceActivation() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activatingService, setActivatingService] = useState<string | null>(null);

  const activateServiceMutation = trpc.salla.activateService.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        setActivatingService(null);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error("حدث خطأ في تفعيل الخدمة");
    }
  });

  const handleActivateService = (serviceId: string, plan: string, price: number) => {
    setActivatingService(`${serviceId}-${plan}`);
    activateServiceMutation.mutate({
      storeId: "store-123",
      serviceType: serviceId as any,
      plan: plan as any
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-900 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            تفعيل الخدمات الاحترافية
          </h1>
          <p className="text-xl text-gray-300">
            اختر الخدمة والخطة المناسبة لنمو متجرك
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Badge className="bg-yellow-600 text-white">
              <Clock className="w-4 h-4 mr-2" />
              فترة تجريبية 14 يوم مجانية
            </Badge>
            <Badge className="bg-blue-600 text-white">
              <Zap className="w-4 h-4 mr-2" />
              بدون التزام
            </Badge>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`cursor-pointer transition-all border-2 ${
                selectedService === service.id
                  ? "border-yellow-500 bg-blue-950"
                  : "border-gray-700 hover:border-yellow-500"
              }`}
              onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
            >
              <CardHeader>
                <div className="text-4xl mb-2">{service.icon}</div>
                <CardTitle className="text-white">{service.name}</CardTitle>
                <CardDescription className="text-gray-300">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                  onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                >
                  <ArrowRight className="w-4 h-4 ml-2" />
                  عرض الخطط
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Plans for Selected Service */}
        {selectedService && (
          <div className="bg-gradient-to-r from-blue-950 to-black border-2 border-yellow-600 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-8">
              خطط {services.find(s => s.id === selectedService)?.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.find(s => s.id === selectedService)?.plans.map((plan, index) => (
                <Card key={index} className="bg-black border-2 border-gray-700 hover:border-yellow-500 transition-all">
                  <CardHeader>
                    <CardTitle className="text-yellow-500 text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 mr-2">ريال/شهر</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white mt-6"
                        onClick={() => handleActivateService(selectedService, plan.name.toLowerCase(), plan.price)}
                        disabled={activatingService === `${selectedService}-${plan.name.toLowerCase()}`}
                      >
                        {activatingService === `${selectedService}-${plan.name.toLowerCase()}` ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            جاري التفعيل...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 ml-2" />
                            تفعيل الآن
                          </>
                        )}
                      </Button>

                      <p className="text-center text-sm text-gray-400 mt-3">
                        ✓ فترة تجريبية 14 يوم مجانية
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-900 to-black border-yellow-600">
            <CardHeader>
              <CardTitle className="text-yellow-500">🎯 ضمان النتائج</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              نضمن لك نتائج قابلة للقياس أو استرجاع كامل الأموال
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900 to-black border-yellow-600">
            <CardHeader>
              <CardTitle className="text-yellow-500">👥 فريق متخصص</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              فريق من الخبراء جاهز لدعمك 24/7
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900 to-black border-yellow-600">
            <CardHeader>
              <CardTitle className="text-yellow-500">📊 تقارير شاملة</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              تقارير مفصلة تظهر كل نتيجة وتحسن
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
