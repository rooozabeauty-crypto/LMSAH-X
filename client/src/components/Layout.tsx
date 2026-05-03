import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">جاري التحميل...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-blue-600">
            لمسة رموز
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center text-sm">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition font-medium">الرئيسية</a>
            <a href="/services" className="text-gray-700 hover:text-blue-600 transition font-medium">الخدمات</a>
            <a href="/chatbot" className="text-gray-700 hover:text-blue-600 transition font-medium">الروبوت</a>
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 transition font-medium">الأدوات</button>
              <div className="absolute hidden group-hover:block bg-white border border-gray-200 rounded-lg py-2 w-40 z-50 shadow-lg">
                <a href="/creative" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50">الإبداع</a>
                <a href="/abandoned-carts" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50">السلات المتروكة</a>
                <a href="/ad-tracking" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50">تتبع الإعلانات</a>
                <a href="/cashback" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50">الكاش باك</a>
                <a href="/loyalty" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50">الولاء</a>
              </div>
            </div>
            <a href="/influencers" className="text-gray-700 hover:text-blue-600 transition font-medium">المؤثرين</a>
            <a href="/suppliers" className="text-gray-700 hover:text-blue-600 transition font-medium">الموردين</a>
            <a href="/support" className="text-gray-700 hover:text-blue-600 transition font-medium">الدعم</a>
            <a href="/plans" className="text-gray-700 hover:text-blue-600 transition font-bold text-blue-600">خطط الاشتراك</a>
            <a href="/admin-dashboard" className="text-gray-700 hover:text-blue-600 transition font-medium">لوحة التحكم</a>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 font-medium">{user?.name}</span>
                <Button 
                  onClick={logout}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium"
                >
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => window.location.href = getLoginUrl()}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold"
              >
                تسجيل الدخول
              </Button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-50 border-t border-gray-200 p-4 space-y-4">
            <a href="/" className="block text-gray-700 hover:text-blue-600 font-medium">الرئيسية</a>
            <a href="/services" className="block text-gray-700 hover:text-blue-600 font-medium">الخدمات</a>
            <a href="/chatbot" className="block text-gray-700 hover:text-blue-600 font-medium">الروبوت</a>
            <a href="/creative" className="block text-gray-700 hover:text-blue-600 font-medium">الإبداع</a>
            <a href="/abandoned-carts" className="block text-gray-700 hover:text-blue-600 font-medium">السلات المتروكة</a>
            <a href="/ad-tracking" className="block text-gray-700 hover:text-blue-600 font-medium">تتبع الإعلانات</a>
            <a href="/cashback" className="block text-gray-700 hover:text-blue-600 font-medium">الكاش باك</a>
            <a href="/loyalty" className="block text-gray-700 hover:text-blue-600 font-medium">الولاء</a>
            <a href="/influencers" className="block text-gray-700 hover:text-blue-600 font-medium">المؤثرين</a>
            <a href="/suppliers" className="block text-gray-700 hover:text-blue-600 font-medium">الموردين</a>
            <a href="/support" className="block text-gray-700 hover:text-blue-600 font-medium">الدعم</a>
            <a href="/plans" className="block text-gray-700 hover:text-blue-600 font-bold text-blue-600">خطط الاشتراك</a>
            <a href="/admin-dashboard" className="block text-gray-700 hover:text-blue-600 font-medium">لوحة التحكم</a>
            {isAuthenticated ? (
              <Button 
                onClick={logout}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium"
              >
                تسجيل الخروج
              </Button>
            ) : (
              <Button 
                onClick={() => window.location.href = getLoginUrl()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold"
              >
                تسجيل الدخول
              </Button>
            )}
          </div>
        )}
      </nav>
      
      {/* Main Content */}
      <main className="pt-0">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">© 2026 لمسة رموز - جميع الحقوق محفوظة</p>
          <p className="mt-2 text-sm text-gray-400">متخصصون في خدمات التسويق الرقمي لتجار منصة سلة</p>
        </div>
      </footer>
    </div>
  );
}
