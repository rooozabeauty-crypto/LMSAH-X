import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Send, Heart, MessageCircle, Share2, Plus, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";

interface Post {
  id: string;
  content: string;
  platform: string;
  scheduledTime: string;
  likes: number;
  comments: number;
  shares: number;
  status: "scheduled" | "published" | "draft";
}

export default function ServiceSocialMedia() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      content: "عرض خاص: احصل على خصم 30% على جميع المنتجات اليوم فقط! 🎉",
      platform: "Instagram",
      scheduledTime: "2026-04-27 10:00",
      likes: 245,
      comments: 32,
      shares: 18,
      status: "published"
    },
    {
      id: "2",
      content: "منتج جديد: تعرف على أحدث مجموعتنا الصيفية 🌞",
      platform: "Facebook",
      scheduledTime: "2026-04-28 14:00",
      likes: 0,
      comments: 0,
      shares: 0,
      status: "scheduled"
    }
  ]);

  const [showNewPost, setShowNewPost] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram");
  const [scheduledTime, setScheduledTime] = useState("");

  const handleCreatePost = () => {
    if (!postContent.trim() || !scheduledTime) return;

    const newPost: Post = {
      id: Date.now().toString(),
      content: postContent,
      platform: selectedPlatform,
      scheduledTime: scheduledTime,
      likes: 0,
      comments: 0,
      shares: 0,
      status: "scheduled"
    };

    setPosts([newPost, ...posts]);
    setPostContent("");
    setScheduledTime("");
    setShowNewPost(false);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const handlePublishNow = (id: string) => {
    setPosts(posts.map(p => 
      p.id === id ? { ...p, status: "published" as const } : p
    ));
  };

  const platforms = ["Instagram", "Facebook", "Twitter", "TikTok", "LinkedIn"];
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(p => p.status === "published").length;
  const scheduledPosts = posts.filter(p => p.status === "scheduled").length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            إدارة السوشل ميديا
          </h1>
          <p className="text-gray-400 text-lg">
            جدول ونشر المنشورات على جميع منصات التواصل الاجتماعي
          </p>
        </div>

        {/* إحصائيات */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">إجمالي المنشورات</p>
            <p className="text-3xl font-bold text-yellow-400">{totalPosts}</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">منشورات مُنشرة</p>
            <p className="text-3xl font-bold text-blue-400">{publishedPosts}</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-green-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">منشورات مجدولة</p>
            <p className="text-3xl font-bold text-green-400">{scheduledPosts}</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-yellow-900/20 border-purple-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">إجمالي التفاعلات</p>
            <p className="text-3xl font-bold text-purple-400">
              {posts.reduce((sum, p) => sum + p.likes + p.comments + p.shares, 0)}
            </p>
          </Card>
        </div>

        {/* زر إنشاء منشور جديد */}
        <div className="mb-8">
          {!showNewPost ? (
            <Button
              onClick={() => setShowNewPost(true)}
              className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold px-8 py-3"
            >
              <Plus className="w-5 h-5 ml-2" />
              إنشاء منشور جديد
            </Button>
          ) : (
            <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">إنشاء منشور جديد</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">محتوى المنشور</label>
                  <textarea
                    placeholder="اكتب محتوى المنشور هنا..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="w-full bg-black/50 border border-yellow-600/30 text-white rounded-lg p-3 min-h-24"
                  />
                  <p className="text-xs text-gray-400 mt-2">{postContent.length}/280 حرف</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">المنصة</label>
                    <select
                      value={selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value)}
                      className="w-full bg-black/50 border border-yellow-600/30 text-white rounded-lg p-2"
                    >
                      {platforms.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">وقت النشر</label>
                    <Input
                      type="datetime-local"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="bg-black/50 border-yellow-600/30 text-white"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleCreatePost}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    جدول المنشور
                  </Button>
                  <Button
                    onClick={() => setShowNewPost(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* قائمة المنشورات */}
        <div className="space-y-4">
          {posts.map(post => (
            <Card
              key={post.id}
              className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600/30 text-blue-400">
                      {post.platform}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      post.status === "published"
                        ? "bg-green-600/30 text-green-400"
                        : "bg-yellow-600/30 text-yellow-400"
                    }`}>
                      {post.status === "published" ? "منشور" : "مجدول"}
                    </span>
                  </div>
                  <p className="text-white mb-3">{post.content}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.scheduledTime).toLocaleDateString("ar-SA")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(post.scheduledTime).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>

                  {post.status === "published" && (
                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-2 text-pink-400">
                        <Heart className="w-4 h-4" />
                        {post.likes} إعجاب
                      </div>
                      <div className="flex items-center gap-2 text-blue-400">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments} تعليق
                      </div>
                      <div className="flex items-center gap-2 text-green-400">
                        <Share2 className="w-4 h-4" />
                        {post.shares} مشاركة
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  {post.status === "scheduled" && (
                    <Button
                      onClick={() => handlePublishNow(post.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDeletePost(post.id)}
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
    </Layout>
  );
}
