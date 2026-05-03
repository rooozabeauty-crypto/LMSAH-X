import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Layout from "@/components/Layout";

export default function Register() {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    storeName: "",
    email: "",
    phone: "",
    serviceType: "seo",
    startDate: "",
    subscriptionType: "basic"
  });
  const [submitted, setSubmitted] = useState(false);

  if (isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-blue-700">أنت مسجل بالفعل</h1>
            <p className="text-gray-600">شكراً لك! بيانات حسابك مسجلة بالفعل في النظام.</p>
          </Card>
        </div>
      </Layout>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        fullName: "",
        storeName: "",
        email: "",
        phone: "",
        serviceType: "seo",
        startDate: "",
        subscriptionType: "basic"
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4" style={{ direction: "rtl" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              انضم إلى لمسة رموز
            </h1>
            <p className="text-gray-600 text-lg">
              سجل بيانات متجرك معنا واستمتع بـ 14 يوم تجريبي مجاني
            </p>
          </div>

          {submitted ? (
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200 p-8 text-center shadow-lg">
              <div className="text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold mb-2 text-green-700">تم التسجيل بنجاح!</h2>
              <p className="text-gray-700 mb-4">
                شكراً لتسجيلك معنا. سيتم إرسال رسالة تأكيد إلى بريدك الإلكتروني قريباً.
              </p>
              <p className="text-sm text-gray-600">
                يمكنك الآن الاستمتاع بـ 14 يوم تجريبي مجاني لجميع الخدمات
              </p>
            </Card>
          ) : (
            <Card className="bg-white border-gray-200 p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* البيانات الشخصية */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">البيانات الشخصية</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        اسمك الكامل
                      </label>
                      <Input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="أحمد محمد"
                        className="bg-gray-50 border-gray-300 text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        رقم الهاتف
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0501234567"
                        className="bg-gray-50 border-gray-300 text-gray-900"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* بيانات المتجر */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">بيانات متجرك</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        اسم متجرك
                      </label>
                      <Input
                        type="text"
                        name="storeName"
                        value={formData.storeName}
                        onChange={handleChange}
                        placeholder="متجري الرائع"
                        className="bg-gray-50 border-gray-300 text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        البريد الإلكتروني
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="bg-gray-50 border-gray-300 text-gray-900"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* الخدمات والبداية */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">الخدمات والبداية</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        نوع الخدمة
                      </label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-3"
                      >
                        <option value="seo">تحسين محركات البحث (SEO)</option>
                        <option value="ads">الحملات الإعلانية</option>
                        <option value="social">إدارة السوشل ميديا</option>
                        <option value="content">إنشاء المحتوى</option>
                        <option value="store">المتجر الإلكتروني</option>
                        <option value="analytics">التقارير والبيانات</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        تاريخ البداية
                      </label>
                      <Input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="bg-gray-50 border-gray-300 text-gray-900"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* نوع الاشتراك */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">اختر باقتك</h3>
                  <select
                    name="subscriptionType"
                    value={formData.subscriptionType}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-3"
                  >
                    <option value="basic">الأساسي (299 ريال/شهر)</option>
                    <option value="professional">الاحترافي (1,499 ريال/شهر)</option>
                    <option value="premium">الفخم (8,900 ريال/شهر)</option>
                  </select>
                </div>

                {/* المميزات */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 font-semibold mb-3">ما تحصل عليه:</p>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700">✓ 14 يوم تجريبي مجاني لجميع الخدمات</li>
                    <li className="text-sm text-gray-700">✓ لا حاجة لإدخال بيانات الدفع الآن</li>
                    <li className="text-sm text-gray-700">✓ يمكنك الترقية أو الانتقال بين الخطط في أي وقت</li>
                    <li className="text-sm text-gray-700">✓ دعم فني متخصص 24/7</li>
                  </ul>
                </div>

                {/* زر التسجيل */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-6 text-lg hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                >
                  تسجيل الآن - 14 يوم مجاني
                </Button>
                <p className="text-center text-xs text-gray-500">
                  بالتسجيل، أنت توافق على شروط الخدمة وسياسة الخصوصية
                </p>
              </form>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
