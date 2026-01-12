
import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  CheckCircle, 
  Clock, 
  Award, 
  MessageSquare, 
  ArrowRight, 
  Star, 
  Utensils,
  Menu,
  X,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { getChefRecommendation } from './services/geminiService';

// Reusable Components
const SectionTitle: React.FC<{ title: string; subtitle?: string; light?: boolean }> = ({ title, subtitle, light }) => (
  <div className="text-center mb-12">
    <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${light ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    {subtitle && <p className={`max-w-2xl mx-auto text-lg ${light ? 'text-slate-200' : 'text-slate-600'}`}>{subtitle}</p>}
  </div>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chefInput, setChefInput] = useState('');
  const [chefResponse, setChefResponse] = useState<string | null>(null);
  const [isLoadingChef, setIsLoadingChef] = useState(false);

  const handleChefConsultation = async () => {
    if (!chefInput.trim()) return;
    setIsLoadingChef(true);
    const res = await getChefRecommendation(chefInput);
    setChefResponse(res);
    setIsLoadingChef(false);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-orange-600 p-2 rounded-lg">
                <Utensils className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">NASGOR <span className="text-orange-600">NUSANTARA</span></span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-slate-600 hover:text-orange-600 transition-colors font-medium">Home</a>
              <a href="#about" className="text-slate-600 hover:text-orange-600 transition-colors font-medium">Tentang</a>
              <a href="#menu" className="text-slate-600 hover:text-orange-600 transition-colors font-medium">Menu</a>
              <a href="#testimonial" className="text-slate-600 hover:text-orange-600 transition-colors font-medium">Testimoni</a>
              <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200">
                Pesan Sekarang
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4 animate-in slide-in-from-top duration-300">
            <a href="#home" className="block text-slate-600 font-medium py-2">Home</a>
            <a href="#about" className="block text-slate-600 font-medium py-2">Tentang</a>
            <a href="#menu" className="block text-slate-600 font-medium py-2">Menu</a>
            <button className="w-full bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold">Pesan Sekarang</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 bg-gradient-to-br from-orange-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold animate-bounce">
                <Award className="w-4 h-4" />
                <span>Nasi Goreng Terlezat di Kota Ini!</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-slate-900">
                Cita Rasa <span className="text-orange-600 italic">Autentik</span> Nusantara di Tiap Suapan
              </h1>
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                Dibuat dengan bumbu rahasia warisan leluhur dan bahan premium. Nikmati sensasi nasi goreng yang berbeda dari biasanya.
              </p>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="w-full sm:w-auto bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 flex items-center justify-center space-x-2 group">
                  <span>Mulai Memesan</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="#menu" className="w-full sm:w-auto text-center px-8 py-4 text-slate-600 font-bold hover:text-orange-600 transition-colors">
                  Lihat Menu Kami
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -z-10 w-full h-full bg-orange-400/20 blur-3xl rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800" 
                alt="Delicious Nasi Goreng" 
                className="rounded-3xl shadow-2xl animate-float"
              />
              <div className="absolute bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl hidden lg:block">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="text-green-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">100% Halal</p>
                    <p className="text-xs text-slate-500">Sertifikasi MUI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Partners */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-slate-400 text-sm font-semibold uppercase tracking-widest mb-8">Tersedia di Platform Kesayangan Anda</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            {['GoFood', 'GrabFood', 'ShopeeFood', 'Traveloka Eats'].map((partner) => (
              <span key={partner} className="text-2xl font-black text-slate-600">{partner}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=600" 
                alt="Problem" 
                className="rounded-3xl shadow-lg"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Capek Masak dan Mau Makan Enak Tanpa Ribet?</h2>
              <p className="text-lg text-slate-600">
                Banyak orang terjebak dengan makanan instan yang membosankan atau nasi goreng pinggir jalan yang terkadang kurang terjamin kebersihannya.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-lg mt-1">
                    <CheckCircle className="text-orange-600 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Solusi Premium</h4>
                    <p className="text-slate-600">Nasi Goreng Nusantara hadir dengan standar resto bintang lima namun harga tetap merakyat.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-lg mt-1">
                    <CheckCircle className="text-orange-600 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Bumbu Alami</h4>
                    <p className="text-slate-600">Kami tidak menggunakan MSG berlebih. Rasa gurih berasal dari racikan rempah murni.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brief Company Description */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="bg-orange-600 w-16 h-1 w-24 mx-auto mb-8 rounded-full"></div>
          <h2 className="text-4xl font-bold">Tentang Nasgor Nusantara</h2>
          <p className="text-xl text-slate-600 leading-relaxed italic">
            "Berawal dari resep keluarga di tahun 1995, kami berdedikasi untuk menjaga warisan kuliner Indonesia dengan menyajikan nasi goreng yang tidak hanya mengenyangkan, tapi juga membangkitkan memori masa kecil yang hangat."
          </p>
          <p className="text-slate-500">
            Kini hadir di 12 titik di seluruh Jabodetabek, melayani lebih dari 1000 porsi setiap harinya dengan penuh cinta.
          </p>
        </div>
      </section>

      {/* Product Benefits */}
      <section className="py-24 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Kenapa Memilih Kami?" subtitle="Kami memberikan yang terbaik di setiap butir nasi yang kami sajikan." light />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Clock />, title: "Cepat & Hangat", desc: "Dikirim dalam waktu 20 menit, tetap hangat sampai di meja Anda." },
              { icon: <ShieldCheck />, title: "Bahan Pilihan", desc: "Hanya menggunakan beras kualitas atas dan daging pilihan segar." },
              { icon: <Zap />, title: "Varian Beragam", desc: "Dari klasik hingga modern seperti Nasi Goreng Wagyu Cheese." }
            ].map((benefit, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all group">
                <div className="bg-white text-orange-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-orange-100">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Chef Assistant (Gemini) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-orange-100">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-orange-600 p-3 rounded-full">
                <MessageSquare className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Konsultasi Rasa dengan Chef Budi</h3>
                <p className="text-slate-500">Tanyakan rekomendasi berdasarkan mood-mu!</p>
              </div>
            </div>
            <div className="space-y-4">
              <textarea 
                value={chefInput}
                onChange={(e) => setChefInput(e.target.value)}
                placeholder="Contoh: Saya lagi ingin yang pedas dan pakai seafood..."
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all h-32"
              ></textarea>
              <button 
                onClick={handleChefConsultation}
                disabled={isLoadingChef}
                className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all disabled:opacity-50"
              >
                {isLoadingChef ? 'Chef sedang berpikir...' : 'Dapatkan Rekomendasi'}
              </button>
              {chefResponse && (
                <div className="mt-6 p-6 bg-orange-50 rounded-2xl border-l-4 border-orange-600 animate-in fade-in slide-in-from-bottom duration-500">
                  <p className="text-orange-800 leading-relaxed font-medium">
                    {chefResponse}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section id="menu" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Menu Favorit Kami" subtitle="Pilih varian favoritmu yang paling menggugah selera." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Nasgor Kambing", price: "Rp 35.000", img: "https://images.unsplash.com/photo-1626700051175-6818013e184f?auto=format&fit=crop&q=80&w=400" },
              { name: "Nasgor Seafood", price: "Rp 40.000", img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80&w=400" },
              { name: "Nasgor Gila", price: "Rp 38.000", img: "https://images.unsplash.com/photo-1512058560366-cd2429596000?auto=format&fit=crop&q=80&w=400" },
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl shadow-lg border border-slate-100">
                <img src={item.img} alt={item.name} className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                  <h4 className="text-xl font-bold text-white mb-1">{item.name}</h4>
                  <p className="text-orange-400 font-bold">{item.price}</p>
                  <button className="mt-4 bg-white text-slate-900 py-2 rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">Tambah ke Keranjang</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonial" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Kata Mereka" subtitle="Ribuan pelanggan puas dengan kualitas rasa kami." />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Andi Wijaya", role: "Food Blogger", text: "Nasi goreng terbaik yang pernah saya coba di Jakarta. Bumbunya meresap sampai ke dalam!" },
              { name: "Siti Sarah", role: "Karyawan Swasta", text: "Porsinya banyak, toppingnya gak pelit. Cocok banget buat makan siang di kantor." },
              { name: "Rendi Kurnia", role: "Mahasiswa", text: "Harganya pas di kantong mahasiswa tapi rasanya kayak makan di hotel bintang lima." }
            ].map((testi, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 leading-relaxed italic">"{testi.text}"</p>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                    {testi.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">{testi.name}</h5>
                    <p className="text-xs text-slate-500">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-600 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                  Penawaran Khusus <br/> <span className="text-orange-500 italic">Terbatas!</span>
                </h2>
                <div className="space-y-4">
                  <p className="text-slate-300 text-lg">Gunakan kode kupon untuk pembelian pertama Anda:</p>
                  <div className="bg-white/10 border border-white/20 p-4 rounded-2xl flex items-center justify-between">
                    <span className="text-2xl font-mono font-bold text-orange-500 tracking-wider">MANTAP25</span>
                    <button className="text-white text-sm font-bold bg-orange-600 px-4 py-2 rounded-xl">Copy</button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-green-400 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Garansi 100% Puas atau Uang Kembali</span>
                </div>
              </div>
              <div className="bg-orange-600 p-8 rounded-3xl text-center space-y-4 transform hover:scale-105 transition-transform">
                <p className="text-white font-bold uppercase tracking-widest">Diskon Hingga</p>
                <h3 className="text-7xl font-black text-white">25%</h3>
                <p className="text-orange-100">Hanya berlaku untuk pesanan via website hari ini!</p>
                <button className="w-full bg-white text-orange-600 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all">Pesan Sekarang</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Sudah Lapar? Ayo Pesan Nasi Goreng Favoritmu Sekarang Juga!
          </h2>
          <p className="text-xl text-slate-600">
            Kami siap mengantar kelezatan langsung ke depan pintu Anda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center justify-center space-x-3 hover:bg-orange-700 transition-all shadow-xl shadow-orange-200">
              <ShoppingBag className="w-6 h-6" />
              <span>Pesan Sekarang</span>
            </button>
            <button className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-600 px-10 py-5 rounded-2xl font-bold text-xl hover:border-orange-600 hover:text-orange-600 transition-all">
              Hubungi WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1 space-y-6">
              <div className="flex items-center space-x-2">
                <div className="bg-orange-600 p-2 rounded-lg">
                  <Utensils className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">NASGOR <span className="text-orange-600">NUSANTARA</span></span>
              </div>
              <p className="text-sm">Menyajikan nasi goreng berkualitas dengan cita rasa nusantara yang autentik sejak 1995.</p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6">Navigasi</h5>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-orange-600 transition-colors">Beranda</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Menu Favorit</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Syarat & Ketentuan</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6">Kontak</h5>
              <ul className="space-y-4 text-sm">
                <li>Jl. Rasa Enak No. 123, Jakarta Selatan</li>
                <li>+62 812 3456 7890</li>
                <li>hello@nasgornusantara.com</li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6">Newsletter</h5>
              <div className="flex space-x-2">
                <input type="email" placeholder="Email Anda" className="bg-slate-800 border-none rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-orange-600 outline-none text-white" />
                <button className="bg-orange-600 text-white p-2 rounded-xl"><ArrowRight className="w-5 h-5"/></button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            © 2024 Nasgor Nusantara. Hak Cipta Dilindungi Undang-Undang.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
