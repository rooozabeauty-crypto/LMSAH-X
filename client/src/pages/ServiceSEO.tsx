import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, CheckCircle, AlertCircle, BarChart3, Zap } from "lucide-react";
import Layout from "@/components/Layout";

interface SEOAnalysis {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  opportunity: number;
  status: "analyzing" | "completed" | "idle";
}

export default function ServiceSEO() {
  const [keyword, setKeyword] = useState("");
  const [analyses, setAnalyses] = useState<SEOAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeKeyword = () => {
    if (!keyword.trim()) return;

    setIsAnalyzing(true);
    
    // محاكاة تحليل الكلمة المفتاحية
    setTimeout(() => {
      const newAnalysis: SEOAnalysis = {
        keyword: keyword,
        searchVolume: Math.floor(Math.random() * 10000) + 100,
        difficulty: Math.floor(Math.random() * 100),
        opportunity: Math.floor(Math.random() * 100),
        status: "completed"
      };
      
      setAnalyses([newAnalysis, ...analyses]);
      setKeyword("");
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleOptimizeContent = (index: number) => {
    alert(`جاري تحسين المحتوى للكلمة: ${analyses[index].keyword}`);
  };

  const handleGenerateReport = () => {
    alert("جاري تحميل التقرير الشامل...");
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            تحسين محرك البحث (SEO)
          </h1>
          <p className="text-gray-400 text-lg">
            احصل على ترتيب أول في جوجل مع أدوات SEO المتقدمة
          </p>
        </div>

        {/* أداة تحليل الكلمات المفتاحية */}
        <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">
            <Search className="inline w-6 h-6 ml-2" />
            تحليل الكلمات المفتاحية
          </h2>
          
          <div className="flex gap-4 mb-6">
            <Input
              type="text"
              placeholder="أدخل الكلمة المفتاحية..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAnalyzeKeyword()}
              className="bg-black/50 border-yellow-600/30 text-white placeholder-gray-500"
              disabled={isAnalyzing}
            />
            <Button
              onClick={handleAnalyzeKeyword}
              disabled={isAnalyzing || !keyword.trim()}
              className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold px-8"
            >
              {isAnalyzing ? "جاري التحليل..." : "تحليل"}
            </Button>
          </div>

          {/* نتائج التحليل */}
          {analyses.length > 0 && (
            <div className="space-y-4">
              {analyses.map((analysis, idx) => (
                <Card
                  key={idx}
                  className="bg-black/50 border-blue-600/30 p-6"
                >
                  <div className="grid md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">الكلمة المفتاحية</p>
                      <p className="text-xl font-bold text-yellow-400">{analysis.keyword}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">حجم البحث</p>
                      <p className="text-xl font-bold text-blue-400">{analysis.searchVolume.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">درجة الصعوبة</p>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                            style={{ width: `${analysis.difficulty}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-300">{analysis.difficulty}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">الفرصة</p>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                            style={{ width: `${analysis.opportunity}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-300">{analysis.opportunity}%</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleOptimizeContent(idx)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        تحسين
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>

        {/* أدوات SEO الإضافية */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6">
            <TrendingUp className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-yellow-400">تحليل المنافسين</h3>
            <p className="text-gray-400 text-sm mb-4">
              تحليل استراتيجيات المنافسين وكلماتهم المفتاحية
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              ابدأ التحليل
            </Button>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6">
            <BarChart3 className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-yellow-400">تقرير الأداء</h3>
            <p className="text-gray-400 text-sm mb-4">
              متابعة ترتيبك في محرك البحث والزيارات
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              عرض التقرير
            </Button>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6">
            <Zap className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-yellow-400">تحسينات سريعة</h3>
            <p className="text-gray-400 text-sm mb-4">
              اقتراحات فورية لتحسين SEO موقعك
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              الحصول على الاقتراحات
            </Button>
          </Card>
        </div>

        {/* قائمة التحسينات الموصى بها */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">التحسينات الموصى بها</h2>
          <div className="space-y-4">
            {[
              { title: "تحسين سرعة الموقع", status: "pending", priority: "عالي" },
              { title: "إضافة وسوم Meta", status: "completed", priority: "عالي" },
              { title: "تحسين الروابط الداخلية", status: "pending", priority: "متوسط" },
              { title: "إضافة صور بجودة عالية", status: "pending", priority: "متوسط" },
              { title: "تحسين المحتوى للجوال", status: "completed", priority: "عالي" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-blue-600/20">
                <div className="flex items-center gap-4">
                  {item.status === "completed" ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-yellow-500" />
                  )}
                  <div>
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="text-sm text-gray-400">الأولوية: {item.priority}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className={item.status === "completed" ? "bg-green-600/30 text-green-400" : "bg-yellow-600/30 text-yellow-400"}
                >
                  {item.status === "completed" ? "مكتمل" : "قيد المراجعة"}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* زر تحميل التقرير الشامل */}
        <div className="text-center">
          <Button
            onClick={handleGenerateReport}
            className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold px-12 py-3 text-lg"
          >
            تحميل التقرير الشامل
          </Button>
        </div>
      </div>
    </Layout>
  );
}
