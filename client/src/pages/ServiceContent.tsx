import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Image, Video, BarChart3, Plus, Trash2, Download } from "lucide-react";
import Layout from "@/components/Layout";

interface Content {
  id: string;
  title: string;
  type: "text" | "image" | "video";
  status: "draft" | "published" | "scheduled";
  createdAt: string;
  views: number;
  engagement: number;
}

export default function ServiceContent() {
  const [contents, setContents] = useState<Content[]>([
    {
      id: "1",
      title: "دليل شامل لاختيار المنتجات الصحيحة",
      type: "text",
      status: "published",
      createdAt: "2026-04-20",
      views: 1250,
      engagement: 89
    },
    {
      id: "2",
      title: "فيديو تعليمي: كيفية استخدام المنتج",
      type: "video",
      status: "published",
      createdAt: "2026-04-18",
      views: 3420,
      engagement: 156
    },
    {
      id: "3",
      title: "صور المنتجات الجديدة",
      type: "image",
      status: "draft",
      createdAt: "2026-04-26",
      views: 0,
      engagement: 0
    }
  ]);

  const [showNewContent, setShowNewContent] = useState(false);
  const [contentTitle, setContentTitle] = useState("");
  const [contentType, setContentType] = useState<"text" | "image" | "video">("text");
  const [contentText, setContentText] = useState("");

  const handleCreateContent = () => {
    if (!contentTitle.trim()) return;

    const newContent: Content = {
      id: Date.now().toString(),
      title: contentTitle,
      type: contentType,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
      views: 0,
      engagement: 0
    };

    setContents([newContent, ...contents]);
    setContentTitle("");
    setContentText("");
    setShowNewContent(false);
  };

  const handleDeleteContent = (id: string) => {
    setContents(contents.filter(c => c.id !== id));
  };

  const handlePublish = (id: string) => {
    setContents(contents.map(c =>
      c.id === id ? { ...c, status: "published" as const } : c
    ));
  };

  const totalContent = contents.length;
  const publishedContent = contents.filter(c => c.status === "published").length;
  const totalViews = contents.reduce((sum, c) => sum + c.views, 0);
  const totalEngagement = contents.reduce((sum, c) => sum + c.engagement, 0);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <FileText className="w-6 h-6 text-blue-400" />;
      case "image":
        return <Image className="w-6 h-6 text-green-400" />;
      case "video":
        return <Video className="w-6 h-6 text-red-400" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "text":
        return "مقالة";
      case "image":
        return "صور";
      case "video":
        return "فيديو";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            إنشاء المحتوى
          </h1>
          <p className="text-gray-400 text-lg">
            أنشئ محتوى احترافي وجذاب لعلامتك التجارية
          </p>
        </div>

        {/* إحصائيات */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">إجمالي المحتوى</p>
            <p className="text-3xl font-bold text-yellow-400">{totalContent}</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">منشور</p>
            <p className="text-3xl font-bold text-blue-400">{publishedContent}</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-green-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">إجمالي المشاهدات</p>
            <p className="text-3xl font-bold text-green-400">{totalViews.toLocaleString()}</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-yellow-900/20 border-purple-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">التفاعلات</p>
            <p className="text-3xl font-bold text-purple-400">{totalEngagement.toLocaleString()}</p>
          </Card>
        </div>

        {/* زر إنشاء محتوى جديد */}
        <div className="mb-8">
          {!showNewContent ? (
            <Button
              onClick={() => setShowNewContent(true)}
              className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold px-8 py-3"
            >
              <Plus className="w-5 h-5 ml-2" />
              إنشاء محتوى جديد
            </Button>
          ) : (
            <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">إنشاء محتوى جديد</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">عنوان المحتوى</label>
                  <Input
                    type="text"
                    placeholder="مثال: دليل استخدام المنتج"
                    value={contentTitle}
                    onChange={(e) => setContentTitle(e.target.value)}
                    className="bg-black/50 border-yellow-600/30 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">نوع المحتوى</label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value as any)}
                    className="w-full bg-black/50 border border-yellow-600/30 text-white rounded-lg p-2"
                  >
                    <option value="text">مقالة نصية</option>
                    <option value="image">صور</option>
                    <option value="video">فيديو</option>
                  </select>
                </div>

                {contentType === "text" && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">محتوى المقالة</label>
                    <textarea
                      placeholder="اكتب محتوى المقالة هنا..."
                      value={contentText}
                      onChange={(e) => setContentText(e.target.value)}
                      className="w-full bg-black/50 border border-yellow-600/30 text-white rounded-lg p-3 min-h-32"
                    />
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={handleCreateContent}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    إنشاء
                  </Button>
                  <Button
                    onClick={() => setShowNewContent(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* قائمة المحتوى */}
        <div className="space-y-4">
          {contents.map(content => (
            <Card
              key={content.id}
              className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    {getTypeIcon(content.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">{content.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span className="px-3 py-1 rounded-full bg-blue-600/30 text-blue-400">
                        {getTypeLabel(content.type)}
                      </span>
                      <span className={`px-3 py-1 rounded-full ${
                        content.status === "published"
                          ? "bg-green-600/30 text-green-400"
                          : "bg-yellow-600/30 text-yellow-400"
                      }`}>
                        {content.status === "published" ? "منشور" : "مسودة"}
                      </span>
                      <span>{content.createdAt}</span>
                    </div>

                    {content.status === "published" && (
                      <div className="flex gap-6 text-sm">
                        <div className="flex items-center gap-2 text-blue-400">
                          👁️ {content.views.toLocaleString()} مشاهدة
                        </div>
                        <div className="flex items-center gap-2 text-green-400">
                          💬 {content.engagement} تفاعل
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  {content.status === "draft" && (
                    <Button
                      onClick={() => handlePublish(content.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      نشر
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteContent(content.id)}
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

        {/* نصائح */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-8 mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">نصائح لإنشاء محتوى جذاب</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <span className="text-2xl">📝</span>
              <div>
                <h3 className="font-bold text-yellow-400 mb-2">محتوى قيم</h3>
                <p className="text-gray-300 text-sm">ركز على تقديم قيمة حقيقية للعملاء والمعلومات المفيدة</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">🎨</span>
              <div>
                <h3 className="font-bold text-yellow-400 mb-2">تصميم احترافي</h3>
                <p className="text-gray-300 text-sm">استخدم صور وفيديوهات عالية الجودة وتصاميم جذابة</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-bold text-yellow-400 mb-2">استهداف دقيق</h3>
                <p className="text-gray-300 text-sm">اعرف جمهورك وأنشئ محتوى يناسب احتياجاتهم</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="font-bold text-yellow-400 mb-2">قياس الأداء</h3>
                <p className="text-gray-300 text-sm">راقب إحصائيات المحتوى وحسّن بناءً على البيانات</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
