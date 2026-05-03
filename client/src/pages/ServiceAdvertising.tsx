import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Zap, Plus, Edit2, Trash2, Eye, Target } from "lucide-react";
import Layout from "@/components/Layout";

interface Campaign {
  id: string;
  name: string;
  budget: number;
  spent: number;
  clicks: number;
  impressions: number;
  ctr: number;
  status: "active" | "paused" | "completed";
}

export default function ServiceAdvertising() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "حملة الصيف",
      budget: 5000,
      spent: 3200,
      clicks: 450,
      impressions: 12000,
      ctr: 3.75,
      status: "active"
    },
    {
      id: "2",
      name: "حملة العودة للمدارس",
      budget: 3000,
      spent: 2100,
      clicks: 320,
      impressions: 8500,
      ctr: 3.76,
      status: "active"
    }
  ]);

  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [campaignBudget, setCampaignBudget] = useState("");

  const handleCreateCampaign = () => {
    if (!campaignName.trim() || !campaignBudget) return;

    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: campaignName,
      budget: parseFloat(campaignBudget),
      spent: 0,
      clicks: 0,
      impressions: 0,
      ctr: 0,
      status: "active"
    };

    setCampaigns([newCampaign, ...campaigns]);
    setCampaignName("");
    setCampaignBudget("");
    setShowNewCampaign(false);
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            الحملات الإعلانية
          </h1>
          <p className="text-gray-400 text-lg">
            إنشاء وإدارة حملات إعلانية احترافية لزيادة المبيعات
          </p>
        </div>

        {/* إحصائيات عامة */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">إجمالي الميزانية</p>
            <p className="text-3xl font-bold text-yellow-400">{totalBudget.toLocaleString()} ر.س</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">المصروف</p>
            <p className="text-3xl font-bold text-blue-400">{totalSpent.toLocaleString()} ر.س</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-green-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">إجمالي النقرات</p>
            <p className="text-3xl font-bold text-green-400">{totalClicks.toLocaleString()}</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-yellow-900/20 border-purple-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">الحملات النشطة</p>
            <p className="text-3xl font-bold text-purple-400">{campaigns.filter(c => c.status === "active").length}</p>
          </Card>
        </div>

        {/* زر إنشاء حملة جديدة */}
        <div className="mb-8">
          {!showNewCampaign ? (
            <Button
              onClick={() => setShowNewCampaign(true)}
              className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold px-8 py-3"
            >
              <Plus className="w-5 h-5 ml-2" />
              إنشاء حملة جديدة
            </Button>
          ) : (
            <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">إنشاء حملة جديدة</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">اسم الحملة</label>
                  <Input
                    type="text"
                    placeholder="مثال: حملة الربيع"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="bg-black/50 border-yellow-600/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">الميزانية (ريال)</label>
                  <Input
                    type="number"
                    placeholder="5000"
                    value={campaignBudget}
                    onChange={(e) => setCampaignBudget(e.target.value)}
                    className="bg-black/50 border-yellow-600/30 text-white"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={handleCreateCampaign}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    إنشاء
                  </Button>
                  <Button
                    onClick={() => setShowNewCampaign(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* قائمة الحملات */}
        <div className="space-y-4">
          {campaigns.map(campaign => (
            <Card
              key={campaign.id}
              className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6"
            >
              <div className="grid md:grid-cols-8 gap-4 items-center mb-4">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-bold text-yellow-400">{campaign.name}</h3>
                  <p className={`text-sm ${campaign.status === "active" ? "text-green-400" : "text-gray-400"}`}>
                    {campaign.status === "active" ? "🟢 نشطة" : "⚫ متوقفة"}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-gray-400 text-xs mb-1">الميزانية</p>
                  <p className="text-lg font-bold text-blue-400">{campaign.budget.toLocaleString()} ر.س</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-400 text-xs mb-1">المصروف</p>
                  <p className="text-lg font-bold text-yellow-400">{campaign.spent.toLocaleString()} ر.س</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-400 text-xs mb-1">النقرات</p>
                  <p className="text-lg font-bold text-green-400">{campaign.clicks.toLocaleString()}</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-400 text-xs mb-1">الانطباعات</p>
                  <p className="text-lg font-bold text-purple-400">{campaign.impressions.toLocaleString()}</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-400 text-xs mb-1">CTR</p>
                  <p className="text-lg font-bold text-pink-400">{campaign.ctr.toFixed(2)}%</p>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* شريط التقدم */}
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-blue-500"
                  style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {Math.round((campaign.spent / campaign.budget) * 100)}% من الميزانية مستخدمة
              </p>
            </Card>
          ))}
        </div>

        {/* نصائح */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-8 mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">نصائح لحملات إعلانية ناجحة</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Target className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-yellow-400 mb-2">استهداف دقيق</h3>
                <p className="text-gray-300 text-sm">استخدم الكلمات المفتاحية المناسبة والجمهور المستهدف بدقة</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Zap className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-yellow-400 mb-2">محتوى جذاب</h3>
                <p className="text-gray-300 text-sm">استخدم صور وفيديوهات عالية الجودة وعناوين جذابة</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
