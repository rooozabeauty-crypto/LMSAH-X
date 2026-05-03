import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  trialDays: number;
  description: string;
  features: {
    name: string;
    included: boolean;
  }[];
  popular: boolean;
}

const plans: Plan[] = [
  {
    id: "1",
    name: "الأساسي",
    price: 299,
    period: "شهري",
    trialDays: 14,
    description: "مناسب للمتاجر الناشئة",
    features: [
      { name: "روبوت ذكي أساسي", included: true },
      { name: "تحسين محرك البحث (SEO)", included: true },
      { name: "إدارة السوشل ميديا", included: false },
      { name: "إنشاء محتوى", included: false },
      { name: "تتبع الإعلانات", included: false },
      { name: "دعم فني 24/7", included: false },
      { name: "تقارير شهرية", included: true }
    ],
    popular: false
  },
  {
    id: "2",
    name: "المتقدم",
    price: 1499,
    period: "شهري",
    trialDays: 14,
    description: "مناسب للمتاجر المتنامية",
    features: [
      { name: "روبوت ذكي متقدم", included: true },
      { name: "تحسين محرك البحث (SEO)", included: true },
      { name: "إدارة السوشل ميديا", included: true },
      { name: "إنشاء محتوى", included: true },
      { name: "تتبع الإعلانات", included: true },
      { name: "دعم فني 24/7", included: true },
      { name: "تقارير أسبوعية", included: true }
    ],
    popular: true
  },
  {
    id: "3",
    name: "الاحترافي",
    price: 8900,
    period: "شهري",
    trialDays: 14,
    description: "مناسب للمتاجر الكبيرة",
    features: [
      { name: "روبوت ذكي احترافي", included: true },
      { name: "تحسين محرك البحث (SEO)", included: true },
      { name: "إدارة السوشل ميديا", included: true },
      { name: "إنشاء محتوى", included: true },
      { name: "تتبع الإعلانات", included: true },
      { name: "دعم فني مخصص", included: true },
      { name: "تقارير يومية", included: true },
      { name: "استشارات تسويقية", included: true }
    ],
    popular: false
  }
];

export default function Plans() {
  const { isAuthenticated } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    if (isAuthenticated) {
      setSelectedPlan(planId);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            خطط الاشتراك
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            اختر الخطة المناسبة لمتجرك واستمتع بجميع المزايا
          </p>
          <p className="text-yellow-400 font-bold">
            جميع الخطط تشمل فترة تجريبية مجانية لمدة 14 يوم
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map(plan => (
            <Card
              key={plan.id}
              className={`bg-gradient-to-br border p-8 transition transform hover:scale-105 relative ${
                plan.popular
                  ? "from-yellow-900/30 to-blue-900/30 border-yellow-500/60 ring-2 ring-yellow-500/30 md:scale-105"
                  : "from-yellow-900/20 to-blue-900/20 border-yellow-600/30 hover:border-yellow-500/60"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                    الأكثر شهرة
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-yellow-400">{plan.name}</h2>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-yellow-400">{plan.price}</span>
                  <span className="text-gray-400">ريال/{plan.period}</span>
                </div>
                <p className="text-sm text-green-400">
                  + فترة تجريبية مجانية {plan.trialDays} يوم
                </p>
              </div>

              <Button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full mb-6 py-3 font-bold ${
                  plan.popular
                    ? "bg-gradient-to-r from-yellow-500 to-blue-500 text-black"
                    : "bg-blue-600/50 hover:bg-blue-600 text-white"
                }`}
              >
                {isAuthenticated ? "اختر هذه الخطة" : "سجل الدخول للاختيار"}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? "text-gray-300" : "text-gray-500 line-through"}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">مقارنة الخطط</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="border-b border-yellow-600/30">
                  <th className="pb-4 text-yellow-400 font-bold">الميزة</th>
                  {plans.map(plan => (
                    <th key={plan.id} className="pb-4 text-yellow-400 font-bold text-center">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  "روبوت ذكي",
                  "تحسين محرك البحث",
                  "إدارة السوشل ميديا",
                  "إنشاء محتوى",
                  "تتبع الإعلانات",
                  "دعم فني 24/7",
                  "تقارير متقدمة"
                ].map((feature, idx) => (
                  <tr key={idx} className="border-b border-yellow-600/20 hover:bg-yellow-900/10">
                    <td className="py-4">{feature}</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="py-4 text-center">
                        {plan.features.some(f => f.name.includes(feature) && f.included) ? (
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-500 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">أسئلة شائعة</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-2 text-yellow-400">هل يمكنني تغيير الخطة لاحقاً؟</h3>
              <p className="text-gray-300 text-sm">نعم، يمكنك تغيير خطتك في أي وقت. التغييرات ستسري من الشهر القادم.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-yellow-400">هل هناك التزام طويل الأجل؟</h3>
              <p className="text-gray-300 text-sm">لا، يمكنك الإلغاء في أي وقت بدون التزام. لكن ننصحك بتجربة الخطة لمدة شهر على الأقل.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-yellow-400">هل الفترة التجريبية مجانية تماماً؟</h3>
              <p className="text-gray-300 text-sm">نعم، الفترة التجريبية مجانية تماماً. لن يتم خصم أي مبلغ من حسابك إلا بعد انتهاء الفترة التجريبية.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-yellow-400">هل يوجد خصم للعقود السنوية؟</h3>
              <p className="text-gray-300 text-sm">نعم، نقدم خصم 20% على الاشتراكات السنوية. تواصل مع فريق الدعم للمزيد من التفاصيل.</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
