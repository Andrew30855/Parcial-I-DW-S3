import React, { createContext, useContext, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShoppingBag, Sun, Moon, Languages, Plus, Minus, Trash2, X, Search, ArrowRight, PackageCheck, ShieldCheck, Truck } from 'lucide-react';
import './styles.css';

const products = [
  { id: 1, name: 'Auriculares Nova', category: 'Tecnología', price: 89.99, image: '🎧', color: '#dfe9ff' },
  { id: 2, name: 'Cámara Pixel Mini', category: 'Tecnología', price: 149.99, image: '📷', color: '#ffe9dc' },
  { id: 3, name: 'Mochila Horizonte', category: 'Accesorios', price: 54.5, image: '🎒', color: '#e5f7ec' },
  { id: 4, name: 'Vaso térmico Aura', category: 'Hogar', price: 24.99, image: '🥤', color: '#f3e7ff' },
  { id: 5, name: 'Lámpara Nube', category: 'Hogar', price: 39.99, image: '💡', color: '#fff4cc' },
  { id: 6, name: 'Reloj Pulse', category: 'Accesorios', price: 119.0, image: '⌚', color: '#ddf5f5' },
  { id: 7, name: 'Bocina Brisa', category: 'Tecnología', price: 64.99, image: '🔊', color: '#e8e4ff' },
  { id: 8, name: 'Planta Oliva', category: 'Hogar', price: 29.5, image: '🪴', color: '#e1f4dd' },
  { id: 9, name: 'Lentes Solara', category: 'Accesorios', price: 44.99, image: '🕶️', color: '#ffe9cb' },
  { id: 10, name: 'Teclado Menta', category: 'Tecnología', price: 79.99, image: '⌨️', color: '#dff1f0' },
  { id: 11, name: 'Vela Sereno', category: 'Hogar', price: 18.99, image: '🕯️', color: '#fff0da' },
  { id: 12, name: 'Libreta Lino', category: 'Accesorios', price: 16.5, image: '📓', color: '#f0e6d6' }
];

const translations = {
  es: { shop:'Tienda', discover:'Descubre productos que se adaptan a tu estilo.', explore:'Explorar colección', featured:'Productos destacados', add:'Agregar al carrito', cart:'Tu carrito', empty:'Tu carrito está vacío', total:'Total a pagar', checkout:'Finalizar compra', architecture:'Arquitectura', search:'Buscar productos...', items:'artículos', secure:'Pago seguro', delivery:'Envío rápido', quality:'Calidad garantizada' },
  en: { shop:'Shop', discover:'Discover products that fit your style.', explore:'Explore collection', featured:'Featured products', add:'Add to cart', cart:'Your cart', empty:'Your cart is empty', total:'Total to pay', checkout:'Checkout', architecture:'Architecture', search:'Search products...', items:'items', secure:'Secure payment', delivery:'Fast delivery', quality:'Guaranteed quality' },
  fr: { shop:'Boutique', discover:'Découvrez des produits adaptés à votre style.', explore:'Explorer la collection', featured:'Produits vedettes', add:'Ajouter au panier', cart:'Votre panier', empty:'Votre panier est vide', total:'Total à payer', checkout:'Commander', architecture:'Architecture', search:'Rechercher...', items:'articles', secure:'Paiement sécurisé', delivery:'Livraison rapide', quality:'Qualité garantie' },
  de: { shop:'Shop', discover:'Entdecke Produkte für deinen Stil.', explore:'Kollektion entdecken', featured:'Empfohlene Produkte', add:'In den Warenkorb', cart:'Dein Warenkorb', empty:'Dein Warenkorb ist leer', total:'Gesamtsumme', checkout:'Zur Kasse', architecture:'Architektur', search:'Produkte suchen...', items:'Artikel', secure:'Sichere Zahlung', delivery:'Schneller Versand', quality:'Garantierte Qualität' },
  it: { shop:'Negozio', discover:'Scopri prodotti adatti al tuo stile.', explore:'Esplora collezione', featured:'Prodotti in evidenza', add:'Aggiungi al carrello', cart:'Il tuo carrello', empty:'Il tuo carrello è vuoto', total:'Totale da pagare', checkout:'Acquista', architecture:'Architettura', search:'Cerca prodotti...', items:'articoli', secure:'Pagamento sicuro', delivery:'Consegna rapida', quality:'Qualità garantita' },
  pt: { shop:'Loja', discover:'Descubra produtos que combinam com seu estilo.', explore:'Explorar coleção', featured:'Produtos em destaque', add:'Adicionar ao carrinho', cart:'Seu carrinho', empty:'Seu carrinho está vazio', total:'Total a pagar', checkout:'Finalizar compra', architecture:'Arquitetura', search:'Buscar produtos...', items:'itens', secure:'Pagamento seguro', delivery:'Entrega rápida', quality:'Qualidade garantida' },
  ja: { shop:'ショップ', discover:'あなたのスタイルに合う商品を見つけよう。', explore:'コレクションを見る', featured:'おすすめ商品', add:'カートに追加', cart:'カート', empty:'カートは空です', total:'合計', checkout:'購入手続き', architecture:'アーキテクチャ', search:'商品を検索...', items:'点', secure:'安全な決済', delivery:'迅速な配送', quality:'品質保証' },
  ko: { shop:'상점', discover:'나의 스타일에 맞는 제품을 만나보세요.', explore:'컬렉션 보기', featured:'추천 상품', add:'장바구니 담기', cart:'장바구니', empty:'장바구니가 비어 있습니다', total:'결제 금액', checkout:'결제하기', architecture:'아키텍처', search:'상품 검색...', items:'개', secure:'안전 결제', delivery:'빠른 배송', quality:'품질 보장' },
  zh: { shop:'商店', discover:'发现适合您风格的产品。', explore:'探索系列', featured:'精选商品', add:'加入购物车', cart:'您的购物车', empty:'购物车为空', total:'应付总额', checkout:'去结账', architecture:'架构', search:'搜索产品...', items:'件商品', secure:'安全付款', delivery:'快速配送', quality:'品质保证' },
  ar: { shop:'المتجر', discover:'اكتشف منتجات تناسب أسلوبك.', explore:'استكشف المجموعة', featured:'منتجات مميزة', add:'أضف إلى السلة', cart:'سلتك', empty:'سلتك فارغة', total:'إجمالي الدفع', checkout:'إتمام الشراء', architecture:'البنية', search:'ابحث عن المنتجات...', items:'عناصر', secure:'دفع آمن', delivery:'توصيل سريع', quality:'جودة مضمونة' }
};

function App() {
  const [cart, setCart] = useState([]); const [drawer, setDrawer] = useState(false); const [dark, setDark] = useState(false); const [lang, setLang] = useState('es'); const [query, setQuery] = useState('');
  const t = translations[lang]; const total = useMemo(() => cart.reduce((s, p) => s + p.price * p.quantity, 0), [cart]); const count = cart.reduce((s, p) => s + p.quantity, 0);
  const add = product => setCart(old => { const found = old.find(x => x.id === product.id); return found ? old.map(x => x.id === product.id ? {...x, quantity:x.quantity + 1} : x) : [...old, {...product, quantity:1}]; });
  const change = (id, delta) => setCart(old => old.map(x => x.id === id ? {...x, quantity:x.quantity + delta} : x).filter(x => x.quantity > 0));
  const remove = id => setCart(old => old.filter(x => x.id !== id));
  const listed = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()));
  return <div className={dark ? 'app dark' : 'app'} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
    <header><a className="brand" href="#top"><span>m</span>mercado</a><nav><a href="#catalog">{t.shop}</a></nav><div className="controls"><label className="language"><Languages size={17}/><select value={lang} onChange={e=>setLang(e.target.value)} aria-label="Idioma">{Object.keys(translations).map(k=><option key={k} value={k}>{k.toUpperCase()}</option>)}</select></label><button className="icon" onClick={()=>setDark(!dark)} aria-label="Cambiar tema">{dark?<Sun/>:<Moon/>}</button><button className="cart-button" onClick={()=>setDrawer(true)}><ShoppingBag size={19}/><b>{count}</b></button></div></header>
    <main id="top"><section className="hero"><div><p className="eyebrow">NUEVA COLECCIÓN · 2026</p><h1>Pequeños detalles.<br/><em>Grandes momentos.</em></h1><p className="hero-copy">{t.discover}</p><a className="primary" href="#catalog">{t.explore} <ArrowRight size={18}/></a></div><div className="hero-art"><div className="circle one"></div><div className="circle two"></div><span>🛍️</span><small>ESTILO QUE<br/>INSPIRA</small></div></section>
    <section className="benefits"><div><ShieldCheck/><span><b>{t.secure}</b><small>Protegemos tus compras</small></span></div><div><Truck/><span><b>{t.delivery}</b><small>En 24 a 48 horas</small></span></div><div><PackageCheck/><span><b>{t.quality}</b><small>Productos seleccionados</small></span></div></section>
    <section className="catalog" id="catalog"><div className="section-title"><div><p className="eyebrow">SELECCIÓN ESPECIAL</p><h2>{t.featured}</h2></div><label className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.search}/></label></div><div className="grid">{listed.map(p=><article className="product" key={p.id}><div className="product-image" style={{background:p.color}}><span>{p.image}</span><i>{p.category}</i></div><div className="product-info"><div><h3>{p.name}</h3><p>${p.price.toFixed(2)}</p></div><button onClick={()=>add(p)} aria-label={t.add}><Plus size={20}/></button></div></article>)}</div></section></main>
    <footer><span>© André Herrera 2026. Todos los derechos reservados.</span></footer>
    {drawer && <><div className="overlay" onClick={()=>setDrawer(false)}></div><aside className="drawer"><div className="drawer-head"><div><p className="eyebrow">{count} {t.items}</p><h2>{t.cart}</h2></div><button className="icon" onClick={()=>setDrawer(false)}><X/></button></div>{cart.length===0?<div className="empty"><ShoppingBag/><p>{t.empty}</p></div>:<><div className="cart-list">{cart.map(p=><div className="cart-item" key={p.id}><div className="mini" style={{background:p.color}}>{p.image}</div><div className="cart-name"><b>{p.name}</b><span>${p.price.toFixed(2)}</span><div className="quantity"><button onClick={()=>change(p.id,-1)}><Minus size={14}/></button><b>{p.quantity}</b><button onClick={()=>change(p.id,1)}><Plus size={14}/></button></div></div><button className="delete" onClick={()=>remove(p.id)}><Trash2 size={18}/></button></div>)}</div><div className="summary"><div><span>{t.total}</span><strong>${total.toFixed(2)}</strong></div><button className="primary checkout">{t.checkout} <ArrowRight size={18}/></button></div></>}</aside></>}
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
