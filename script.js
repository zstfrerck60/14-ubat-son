function goTo(id) {
    // goTo fonksiyonunun içinde en başa ekle
const allVideos = document.querySelectorAll('video');
allVideos.forEach(v => v.pause()); // Sayfa değişince oynayan vlog varsa dursun
    // Müzik kontrolü (Giriş yapıldığında başlar)
    const audio = document.getElementById("myAudio");
    if (audio && audio.paused) {
        audio.play().catch(e => console.log("Müzik için dokunma bekleniyor."));
    }

    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(id === 'foto-page') generatePhotos();
    if(id === 'mesaj-page') typeMessage();
}

function generatePhotos() {
    const desk = document.getElementById('desk');
    desk.innerHTML = '';
    for(let i=1; i<=10; i++) {
        const div = document.createElement('div');
        div.className = 'polaroid';
        div.style.transform = `rotate(${Math.random() * 14 - 7}deg)`;
        div.innerHTML = `<img src="${i}.jpg">`;
        desk.appendChild(div);
    }
}

function nextStep(s) {
    document.querySelectorAll('.story-step').forEach(step => step.classList.remove('active-step'));
    document.getElementById('step' + s).classList.add('active-step');
}

// Yazı Yazma
let idx = 0;
const letter = "sevgili sema bir tanem askim canım bu yıl 3.yılımızda sevgililer gününü kutluyoruz artık sevgiliden çok daha fazlasıyız 3 yıldır beraber ve 3 yıldır mutluyuz artık sevgiliden fazlası birer yoldaşız iyi günümüzde kötü günümüzde hep birbirimizin yanındayız dile kolay 3 yıl ne badireler atlattık neler yaşadık ama hala ayaktayız bunu sevgimize ve sadakatımıza borçluyuz böyle özel bir günü senden başkasıyla kutlamayı asla hayat bile edemem demek istediğim benim için sevvgiliden fazlasısın çok değerlisin ve seni çok seviyorum sevgiler serkan.."; 
function typeMessage() {
    const el = document.getElementById("typing-text");
    if (idx < letter.length) {
        el.innerHTML += letter.charAt(idx);
        idx++;
        setTimeout(typeMessage, 40);
    }
}

// Sayaç (Mobil uyumlu yazı boyutuyla)
setInterval(() => {
    const start = new Date("2023-01-07T00:00:00").getTime();
    const d = new Date().getTime() - start;
    const days = Math.floor(d / (1000 * 60 * 60 * 24));
    const hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((d % (1000 * 60)) / 1000);
    const target = document.getElementById('timer-display');
    if(target) {
        target.innerHTML = `<div style="font-size:2rem; color: #fff;">${days} GÜN</div>
                            <div style="font-size:1rem;">${hours} Saat ${mins} Dakika ${secs} Saniye</div>`;
    }
}, 1000);
// Sayfa yüklendiğinde butonun çalışması için bu dinleyiciyi ekliyoruz
document.addEventListener('click', function(e) {
    // Eğer tıklanan elemanın ID'si 'big-love-btn' ise
    if (e.target && e.target.id === 'big-love-btn') {
        
        // 1. Ekranı titret
        document.body.style.animation = "shake 0.1s infinite";
        setTimeout(() => document.body.style.animation = "", 500);

        // 2. Butonun konumunu al
        const rect = e.target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 3. 20 tane kalp fırlat
        for (let i = 0; i < 25; i++) {
            createExplodingHeart(centerX, centerY);
        }
    }
});

// Kalp fırlatma fonksiyonu (Eğer daha önce eklemediysen bunu da ekle)
function createExplodingHeart(x, y) {
    const heart = document.createElement("div");
    heart.classList.add("exploding-heart");
    heart.innerHTML = "❤️";
    document.body.appendChild(heart);

    const destinationX = (Math.random() - 0.5) * 500; 
    const destinationY = (Math.random() - 0.5) * 500; 
    const rotation = Math.random() * 360; 

    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.position = 'fixed';
    heart.style.zIndex = '9999';
    heart.style.pointerEvents = 'none';
    
    const animation = heart.animate([
        { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
        { transform: `translate(${destinationX}px, ${destinationY}px) scale(0) rotate(${rotation}deg)`, opacity: 0 }
    ], {
        duration: 1000 + Math.random() * 1000,
        easing: 'ease-out'
    });

    animation.onfinish = () => heart.remove();
}function toggleMusic() {
    const audio = document.getElementById("myAudio");
    const btn = document.getElementById("music-control");

    if (audio.paused) {
        audio.play();
        btn.innerHTML = "🔊"; // Müzik çalarken hoparlör açık
        btn.style.background = "rgba(255,255,255,0.2)";
    } else {
        audio.pause();
        btn.innerHTML = "🔇"; // Müzik durunca hoparlör kapalı
        btn.style.background = "rgba(255,0,0,0.3)"; // Hafif kırmızımsı yapalım ki kapalı olduğu anlaşılsın
    }
}
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'bg-heart';
    heart.innerHTML = '❤️'; // İstersen buraya farklı emojiler de ekleyebilirsin
    
    // Rastgele yatay konum (ekranın her yerinden çıksın)
    heart.style.left = Math.random() * 100 + "vw";
    
    // Rastgele hız (6 ile 12 saniye arası)
    const duration = Math.random() * 6 + 6;
    heart.style.animationDuration = duration + "s";
    
    // Rastgele boyut
    heart.style.fontSize = Math.random() * 15 + 10 + "px";
    
    document.body.appendChild(heart);
    
    // Hafıza dolmasın diye, uçup giden kalbi 12 saniye sonra sil
    setTimeout(() => {
        heart.remove();
    }, 12000);
}

// Kalp üretimini başlat: Her 500 milisaniyede bir (Yarım saniye)
setInterval(createHeart, 500);