require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

const CLIENT_ID = process.env.SALLA_CLIENT_ID;
const CLIENT_SECRET = process.env.SALLA_CLIENT_SECRET;
const REDIRECT_URI = process.env.SALLA_REDIRECT_URI;
const BASE_URL = process.env.BASE_URL;

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.send('<h2>🚀 تطبيقك شغال</h2><a href="/install">ربط مع سلة</a>');
});

// 1️⃣ بداية التثبيت
app.get('/install', (req, res) => {
  const authUrl = `https://accounts.salla.sa/oauth2/auth?response_type=code&client_id=${CLIENT_ID}&scope=offline_access&redirect_uri=${REDIRECT_URI}`;
  res.redirect(authUrl);
});

// 2️⃣ Callback من سلة
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.send('❌ مافي code راجع من سلة');
  }

  try {
    // 3️⃣ طلب access token
    const tokenResponse = await axios.post(
      'https://accounts.salla.sa/oauth2/token',
      {
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,7e42b932-6690-477d-aba0-a9fca78047e5
        client_secret: CLIENT_SECRET,310900ec8eeeb78ef7c712cfc3704967de31af9ad7b64d670b2253897d87855c
        redirect_uri: REDIRECT_URI,https://lmsah-rmuz-bcaysjl3.manus.space
        code: code
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // 4️⃣ جلب بيانات المتجر
    const storeResponse = await axios.get(
      'https://api.salla.dev/admin/v2/store',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const store = storeResponse.data.data;

    // هنا تقدر تخزن البيانات في DB
    console.log('Store:', store);

    // 5️⃣ تحويل المستخدم للداشبورد
    res.redirect(`/dashboard?store=${store.id}`);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.send('❌ صار خطأ في الربط');
  }
});

// 6️⃣ صفحة بعد التثبيت
app.get('/dashboard', (req, res) => {
  const storeId = req.query.store;

  res.send(`
    <h2>✅ تم ربط متجرك بنجاح</h2>
    <p>Store ID: ${storeId}</p>
    <p>هنا تبدأ تعرض خدماتك</p>
  `);
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${BASE_URL}`);
});
