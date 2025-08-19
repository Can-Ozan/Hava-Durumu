# 🌦️ Hava Durumu Uygulaması

**Modern ve interaktif bir hava durumu uygulaması!** Gerçek zamanlı hava durumu bilgilerini gösteren, kullanıcı dostu ve tamamen responsive bir web uygulaması.


## ✨ Özellikler

- 🌍 **Gerçek zamanlı hava durumu bilgisi** (OpenWeatherMap API kullanılarak)
- 📱 **Tamamen responsive tasarım** - tüm cihazlarda mükemmel görüntüleme
- 🌈 **Dinamik temalar** - hava durumuna göre otomatik tema değişimi
- ⚡ **Saatlik ve 5 günlük tahminler**
- ✨ **Particles.js ile interaktif arkaplan efektleri**
- 🌡️ Detaylı hava bilgileri (sıcaklık, nem, rüzgar, basınç vb.)
- 🔍 Şehir arama özelliği
- 📅 Otomatik tarih güncellemesi
- 🎨 Modern UI/UX tasarım

## 🛠️ Teknolojiler

- **HTML5** - Yapısal temel
- **CSS3** - Stil ve animasyonlar
- **JavaScript** - Dinamik işlevsellik
- **OpenWeatherMap API** - Hava durumu verileri
- **Particles.js** - Arkaplan efektleri
- **Font Awesome** - İkonlar

## 🖼️ Project Screenshots

### Main Interface
![SwiftNote Studio Interface](/images/arayüz.png)

## 🚀 Kurulum

1. **Depoyu klonlayın:**
   ```bash
   git clone https://github.com/Can-Ozan/Hava-Durumu.git
   ```

2. **Proje dizinine gidin:**
   ```bash
   cd Hava-Durumu
   ```

3. **Tarayıcıda açın:**
   - `index.html` dosyasını herhangi bir modern tarayıcıda açın.

4. **API Anahtarı (Opsiyonel):**
   - Kendi OpenWeatherMap API anahtarınızı kullanmak isterseniz, `script.js` dosyasındaki `API_KEY` değişkenini güncelleyin.
   - 

## 🌟 Öne Çıkan Kod Parçaları

**Dinamik Tema Değişimi:**
```javascript
function setWeatherTheme(weatherType) {
    const body = document.body;
    body.className = '';
    
    if (weatherType.includes('clear')) {
        body.classList.add('weather-sunny');
    } else if (weatherType.includes('rain')) {
        body.classList.add('weather-rainy');
    }
    // ... diğer hava durumları
}
```

**Particles.js Konfigürasyonu:**
```javascript
function initParticles(weatherType) {
    let particlesConfig = {
        particles: {
            number: { value: 80 },
            // ... diğer ayarlar
        }
    };
    
    // Hava durumuna göre özelleştirme
    if (weatherType.includes('rain')) {
        particlesConfig.particles.number.value = 100;
        particlesConfig.particles.move.speed = 5;
    }
    // ... diğer hava durumları
}
```

## 📜 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

## 🙏 Teşekkürler

- OpenWeatherMap ekibine ücretsiz API sağladıkları için
- Vincent Garreau'ya Particles.js kütüphanesi için
- Font Awesome ekibine harika ikonlar için

---

**🌟 Beğendiyseniz yıldız vermeyi unutmayın!** Sorularınız veya önerileriniz için Issues kısmından iletişime geçebilirsiniz.
