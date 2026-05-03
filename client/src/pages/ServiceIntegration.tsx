import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, CheckCircle, AlertCircle, Plus, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";

interface Integration {
  id: string;
  name: string;
  platform: string;
  status: "connected" | "disconnected" | "error";
  apiKey?: string;
  lastSync?: string;
}

export default function ServiceIntegration() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "1",
      name: "Google Ads",
      platform: "Google",
      status: "connected",
      apiKey: "****-****-****-1234",
      lastSync: "2026-04-26 10:30"
    },
    {
      id: "2",
      name: "YouTube",
      platform: "Google",
      status: "connected",
      apiKey: "****-****-****-5678",
      lastSync: "2026-04-26 09:15"
    },
    {
      id: "3",
      name: "Facebook Ads",
      platform: "Meta",
      status: "disconnected"
    }
  ]);

  const [showNewIntegration, setShowNewIntegration] = useState(false);
  const [integrationName, setIntegrationName] = useState("");
  const [integrationPlatform, setIntegrationPlatform] = useState("Google");
  const [integrationKey, setIntegrationKey] = useState("");

  const handleAddIntegration = () => {
    if (!integrationName.trim() || !integrationKey.trim()) return;

    const newIntegration: Integration = {
      id: Date.now().toString(),
      name: integrationName,
      platform: integrationPlatform,
      status: "connected",
      apiKey: `****-****-****-${integrationKey.slice(-4)}`,
      lastSync: new Date().toLocaleString("ar-SA")
    };

    setIntegrations([newIntegration, ...integrations]);
    setIntegrationName("");
    setIntegrationKey("");
    setShowNewIntegration(false);
  };

  const handleDeleteIntegration = (id: string) => {
    setIntegrations(integrations.filter(i => i.id !== id));
  };

  const handleReconnect = (id: string) => {
    setIntegrations(integrations.map(i =>
      i.id === id ? { ...i, status: "connected" as const, lastSync: new Date().toLocaleString("ar-SA") } : i
    ));
  };

  const connectedCount = integrations.filter(i => i.status === "connected").length;
  const disconnectedCount = integrations.filter(i => i.status === "disconnected").length;

  const availableIntegrations = [
    { name: "Google Ads", platform: "Google", icon: "📊", desc: "إدارة الحملات الإعلانية" },
    { name: "YouTube", platform: "Google", icon: "📹", desc: "تحميل الفيديوهات والإحصائيات" },
    { name: "Facebook Ads", platform: "Meta", icon: "📱", desc: "إعلانات فيسبوك وإنستغرام" },
    { name: "TikTok Ads", platform: "TikTok", icon: "🎵", desc: "حملات إعلانية على TikTok" },
    { name: "Instagram", platform: "Meta", icon: "📸", desc: "إدارة متجر Instagram" },
    { name: "Shopify", platform: "Shopify", icon: "🛍️", desc: "ربط متجر Shopify" }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            ربط الأدوات والتكامل
          </h1>
          <p className="text-gray-400 text-lg">
            ربط متجرك مع أدوات التسويق والإعلان الرائدة
          </p>
        </div>

        {/* إحصائيات الاتصالات */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">إجمالي الاتصالات</p>
            <p className="text-3xl font-bold text-yellow-400">{integrations.length}</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-green-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">متصلة</p>
            <p className="text-3xl font-bold text-green-400">{connectedCount}</p>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/20 to-yellow-900/20 border-red-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">منقطعة</p>
            <p className="text-3xl font-bold text-red-400">{disconnectedCount}</p>
          </Card>
        </div>

        {/* قائمة الاتصالات الحالية */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">الاتصالات الحالية</h2>
          <div className="space-y-4">
            {integrations.map(integration => (
              <Card
                key={integration.id}
                className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-yellow-400">{integration.name}</h3>
                      {integration.status === "connected" ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">المنصة</p>
                        <p className="text-white font-semibold">{integration.platform}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">المفتاح</p>
                        <p className="text-white font-semibold">{integration.apiKey || "غير متصل"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">آخر مزامنة</p>
                        <p className="text-white font-semibold">{integration.lastSync || "لم تتم"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    {integration.status === "disconnected" && (
                      <Button
                        onClick={() => handleReconnect(integration.id)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        إعادة الاتصال
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDeleteIntegration(integration.id)}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* إضافة اتصال جديد */}
        <div className="mb-8">
          {!showNewIntegration ? (
            <Button
              onClick={() => setShowNewIntegration(true)}
              className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold px-8 py-3"
            >
              <Plus className="w-5 h-5 ml-2" />
              إضافة اتصال جديد
            </Button>
          ) : (
            <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">إضافة اتصال جديد</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">اسم الأداة</label>
                  <Input
                    type="text"
                    placeholder="مثال: Google Ads"
                    value={integrationName}
                    onChange={(e) => setIntegrationName(e.target.value)}
                    className="bg-black/50 border-yellow-600/30 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">المنصة</label>
                  <select
                    value={integrationPlatform}
                    onChange={(e) => setIntegrationPlatform(e.target.value)}
                    className="w-full bg-black/50 border border-yellow-600/30 text-white rounded-lg p-2"
                  >
                    <option value="Google">Google</option>
                    <option value="Meta">Meta</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Shopify">Shopify</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">مفتاح API</label>
                  <Input
                    type="password"
                    placeholder="أدخل مفتاح API الخاص بك"
                    value={integrationKey}
                    onChange={(e) => setIntegrationKey(e.target.value)}
                    className="bg-black/50 border-yellow-600/30 text-white"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleAddIntegration}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    إضافة
                  </Button>
                  <Button
                    onClick={() => setShowNewIntegration(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* الأدوات المتاحة */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-400">الأدوات المتاحة للربط</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableIntegrations.map((tool, idx) => (
              <Card
                key={idx}
                className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-6 hover:border-blue-500/60 transition cursor-pointer group"
              >
                <div className="text-4xl mb-3">{tool.icon}</div>
                <h3 className="text-lg font-bold text-blue-400 mb-2 group-hover:text-yellow-400 transition">
                  {tool.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{tool.desc}</p>
                <div className="flex items-center gap-2 text-yellow-500 group-hover:gap-3 transition">
                  <span className="text-sm">ربط الآن</span>
                  <Link className="w-4 h-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* نصائح */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-8 mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">نصائح للتكامل الفعال</h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">🔐</span>
              <div>
                <h3 className="font-bold text-yellow-400 mb-1">أمان البيانات</h3>
                <p className="text-gray-300 text-sm">استخدم مفاتيح API آمنة ولا تشاركها مع أحد</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">🔄</span>
              <div>
                <h3 className="font-bold text-yellow-400 mb-1">المزامنة المنتظمة</h3>
                <p className="text-gray-300 text-sm">تأكد من مزامنة البيانات بشكل منتظم بين الأدوات</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">📊</span>
              <div>
                <h3 className="font-bold text-yellow-400 mb-1">المراقبة المستمرة</h3>
                <p className="text-gray-300 text-sm">راقب حالة الاتصالات وتأكد من عدم وجود أخطاء</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
