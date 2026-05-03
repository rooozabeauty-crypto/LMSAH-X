import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Settings, Palette, Package, Plus, Trash2, Eye } from "lucide-react";
import Layout from "@/components/Layout";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  status: "active" | "inactive";
}

interface Store {
  id: string;
  name: string;
  theme: string;
  domain: string;
  products: number;
  sales: number;
}

export default function ServiceStore() {
  const [stores, setStores] = useState<Store[]>([
    {
      id: "1",
      name: "متجري الأول",
      theme: "أزرق وأبيض",
      domain: "store1.salah.com",
      products: 45,
      sales: 1250
    }
  ]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "منتج فاخر",
      price: 299,
      category: "ملابس",
      image: "👔",
      stock: 50,
      status: "active"
    },
    {
      id: "2",
      name: "حقيبة يد",
      price: 450,
      category: "إكسسوارات",
      image: "👜",
      stock: 30,
      status: "active"
    }
  ]);

  const [showNewProduct, setShowNewProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("ملابس");
  const [productStock, setProductStock] = useState("");

  const handleCreateProduct = () => {
    if (!productName.trim() || !productPrice || !productStock) return;

    const newProduct: Product = {
      id: Date.now().toString(),
      name: productName,
      price: parseFloat(productPrice),
      category: productCategory,
      image: "📦",
      stock: parseInt(productStock),
      status: "active"
    };

    setProducts([newProduct, ...products]);
    setProductName("");
    setProductPrice("");
    setProductStock("");
    setShowNewProduct(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const totalRevenue = products.reduce((sum, p) => sum + (p.price * (50 - p.stock)), 0);
  const activeProducts = products.filter(p => p.status === "active").length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            المتجر الإلكتروني
          </h1>
          <p className="text-gray-400 text-lg">
            بناء متجر احترافي من الصفر مع هوية بصرية فريدة
          </p>
        </div>

        {/* معلومات المتجر */}
        {stores.length > 0 && (
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">اسم المتجر</p>
                <p className="text-2xl font-bold text-yellow-400">{stores[0].name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">النطاق</p>
                <p className="text-lg font-bold text-blue-400">{stores[0].domain}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">المبيعات الإجمالية</p>
                <p className="text-2xl font-bold text-green-400">{stores[0].sales.toLocaleString()} ر.س</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Settings className="w-4 h-4 ml-2" />
                إعدادات المتجر
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Palette className="w-4 h-4 ml-2" />
                تخصيص التصميم
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Eye className="w-4 h-4 ml-2" />
                معاينة المتجر
              </Button>
            </div>
          </Card>
        )}

        {/* إحصائيات المنتجات */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">إجمالي المنتجات</p>
            <p className="text-3xl font-bold text-yellow-400">{products.length}</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">منتجات نشطة</p>
            <p className="text-3xl font-bold text-blue-400">{activeProducts}</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-green-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">إجمالي المخزون</p>
            <p className="text-3xl font-bold text-green-400">{products.reduce((sum, p) => sum + p.stock, 0)}</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-yellow-900/20 border-purple-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">الإيرادات المتوقعة</p>
            <p className="text-3xl font-bold text-purple-400">{totalRevenue.toLocaleString()} ر.س</p>
          </Card>
        </div>

        {/* زر إضافة منتج */}
        <div className="mb-8">
          {!showNewProduct ? (
            <Button
              onClick={() => setShowNewProduct(true)}
              className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold px-8 py-3"
            >
              <Plus className="w-5 h-5 ml-2" />
              إضافة منتج جديد
            </Button>
          ) : (
            <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">إضافة منتج جديد</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">اسم المنتج</label>
                  <Input
                    type="text"
                    placeholder="مثال: حقيبة يد فاخرة"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="bg-black/50 border-yellow-600/30 text-white"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">السعر (ريال)</label>
                    <Input
                      type="number"
                      placeholder="299"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      className="bg-black/50 border-yellow-600/30 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">الفئة</label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full bg-black/50 border border-yellow-600/30 text-white rounded-lg p-2"
                    >
                      <option value="ملابس">ملابس</option>
                      <option value="إكسسوارات">إكسسوارات</option>
                      <option value="أحذية">أحذية</option>
                      <option value="إلكترونيات">إلكترونيات</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">المخزون</label>
                    <Input
                      type="number"
                      placeholder="50"
                      value={productStock}
                      onChange={(e) => setProductStock(e.target.value)}
                      className="bg-black/50 border-yellow-600/30 text-white"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleCreateProduct}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    إضافة
                  </Button>
                  <Button
                    onClick={() => setShowNewProduct(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* قائمة المنتجات */}
        <div className="space-y-4 mb-8">
          {products.map(product => (
            <Card
              key={product.id}
              className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4 flex-1">
                  <div className="text-4xl">{product.image}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">{product.name}</h3>
                    <div className="grid md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-400">الفئة</p>
                        <p className="text-white font-semibold">{product.category}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">السعر</p>
                        <p className="text-green-400 font-semibold">{product.price} ر.س</p>
                      </div>
                      <div>
                        <p className="text-gray-400">المخزون</p>
                        <p className={`font-semibold ${product.stock > 20 ? "text-blue-400" : "text-orange-400"}`}>
                          {product.stock} وحدة
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">الحالة</p>
                        <p className="text-green-400 font-semibold">
                          {product.status === "active" ? "🟢 نشط" : "⚫ معطل"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    تعديل
                  </Button>
                  <Button
                    onClick={() => handleDeleteProduct(product.id)}
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

        {/* خطوات إنشاء متجر */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">خطوات إنشاء متجر احترافي</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: "اختر اسم وتصميم", desc: "اختر اسم فريد وتصميم يعكس علامتك التجارية" },
              { step: 2, title: "أضف المنتجات", desc: "أضف منتجاتك مع الصور والأسعار والوصف" },
              { step: 3, title: "اختر طريقة الدفع", desc: "فعّل طرق دفع آمنة وموثوقة" },
              { step: 4, title: "أطلق متجرك", desc: "انشر متجرك وابدأ البيع على الفور" }
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-4 bg-black/30 rounded-lg border border-blue-600/20">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-blue-500 flex items-center justify-center font-bold text-black">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-yellow-400 mb-1">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
