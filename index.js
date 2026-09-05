// 1. Quantum Loader (with auto-clear)
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('quantum-loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 800);
        }
    }, 1200);
});

// 2. Sci-Fi Audio Engine
let sfxEnabled = true;
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playSciFiSound(type) {
    if(!sfxEnabled) return;
    if(!audioCtx) audioCtx = new AudioCtx();
    const now = audioCtx.currentTime;

    if(type === 'click') {
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc1.type = 'sine'; osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(523.25, now);
        osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.12);
        osc2.frequency.setValueAtTime(659.25, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc1.connect(gain); osc2.connect(gain); gain.connect(audioCtx.destination);
        osc1.start(now); osc2.start(now); osc1.stop(now + 0.15); osc2.stop(now + 0.15);
    } else if(type === 'switch') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(330, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(now); osc.stop(now + 0.08);
    }
}

function toggleSFX() {
    sfxEnabled = !sfxEnabled;
    const btn = document.getElementById('sfx-toggle');
    if(btn) {
        btn.classList.toggle('active', sfxEnabled);
        btn.innerHTML = sfxEnabled ? '🔊 SFX' : '🔇 MUTE';
        playSciFiSound('click');
    }
}

// 3. YouTube "Coming Soon" Button Logic
function showComingSoon() {
    playSciFiSound('click');
    const btn = document.getElementById('yt-btn');
    if(btn) {
        const originalText = "▶ OUR YOUTUBE CHANNELS";
        btn.innerHTML = "⏳ COMING SOON...";
        btn.style.borderColor = "var(--gold)";
        btn.style.color = "var(--gold)";
        btn.style.boxShadow = "0 0 15px var(--gold-glow)";
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.borderColor = "#ff2a2a";
            btn.style.color = "#ff2a2a";
            btn.style.boxShadow = "0 0 15px rgba(255,42,42,0.3)";
        }, 2500);
    }
}

// 4. Filtering System for Archives & Farms
function filterGallery(gridId, author, btnElement) {
    playSciFiSound('click');
    const grid = document.getElementById(gridId);
    if(!grid) return;
    
    const units = grid.querySelectorAll('.card-unit');

    btnElement.parentNode.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');

    units.forEach(unit => {
        const dataAuthor = unit.getAttribute('data-author') || '';
        if(author === 'all' || dataAuthor.includes(author)) {
            unit.style.display = '';
            setTimeout(() => unit.style.opacity = '1', 10);
        } else {
            unit.style.opacity = '0';
            setTimeout(() => unit.style.display = 'none', 300);
        }
    });
}

// 5. Server Day Counter Engine
function updateTimeEngine() {
    const startDate = new Date('2026-07-19T00:00:00+06:00');
    const now = new Date();
    
    const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const dayElement = document.getElementById('smp-day-count');
    if(dayElement) dayElement.innerText = diffDays > 0 ? diffDays : 0;

    const tomorrow = new Date(now);
    tomorrow.setHours(24, 0, 0, 0);
    const timeDiff = tomorrow - now;

    const h = Math.floor((timeDiff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
    const m = Math.floor((timeDiff / 1000 / 60) % 60).toString().padStart(2, '0');
    const s = Math.floor((timeDiff / 1000) % 60).toString().padStart(2, '0');

    const timerElement = document.getElementById('countdown-timer');
    if(timerElement) timerElement.innerText = `${h}:${m}:${s}`;
}
updateTimeEngine();
setInterval(updateTimeEngine, 1000);

// 6. Navigation System
function switchView(viewId, btnElement) {
    playSciFiSound('switch');
    if(btnElement) {
        document.querySelectorAll('.q-btn').forEach(b => b.classList.remove('active'));
        btnElement.classList.add('active');
    }
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(viewId);
    if(target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 7. Dynamic Dossier Modals
function openBuildDossier(imgSrc, title, builder, time, res, desc, e) {
    if(e) e.stopPropagation();
    playSciFiSound('click');
    
    document.getElementById('dossier-left-panel').style.display = 'flex';
    document.getElementById('main-dossier-box').classList.remove('player-mode');

    document.getElementById('dossier-img').src = imgSrc;
    document.getElementById('dossier-title').innerText = title;
    document.getElementById('dossier-tag-text').innerText = "ARCHIVAL DOSSIER // HIGH CLEARANCE";

    document.getElementById('lbl-1').innerText = "ARCHITECT / BUILDER";
    document.getElementById('val-1').innerText = builder;
    
    document.getElementById('lbl-2').innerText = "TIME TAKEN";
    document.getElementById('val-2').innerText = time;
    document.getElementById('val-2').className = "red-txt";
    
    document.getElementById('lbl-3').innerText = "RESOURCES COLLECTOR";
    document.getElementById('val-3').innerText = res;
    document.getElementById('stat-row-3').style.display = 'flex';
    
    document.getElementById('stat-row-4').style.display = 'none';
    document.getElementById('stat-row-5').style.display = 'none';

    document.getElementById('dossier-desc').innerText = desc;

    document.getElementById('dossier-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openPlayerDossier(name, title, kills, deaths, playtime, kdr, bio) {
    playSciFiSound('click');
    
    document.getElementById('dossier-left-panel').style.display = 'none';
    document.getElementById('main-dossier-box').classList.add('player-mode');

    document.getElementById('dossier-title').innerText = name + " [" + title + "]";
    document.getElementById('dossier-tag-text').innerText = "PLAYER PROFILE // " + title + " CLEARANCE";

    document.getElementById('lbl-1').innerText = "PLAYER ALIAS";
    document.getElementById('val-1').innerText = name;
    
    document.getElementById('lbl-2').innerText = "TOTAL PLAYTIME";
    document.getElementById('val-2').innerText = playtime;
    document.getElementById('val-2').className = ""; 
    
    document.getElementById('lbl-3').innerText = "K/D RATIO";
    document.getElementById('val-3').innerText = kdr;
    document.getElementById('stat-row-3').style.display = 'flex';

    document.getElementById('stat-row-4').style.display = 'flex';
    document.getElementById('val-4').innerText = kills;
    
    document.getElementById('stat-row-5').style.display = 'flex';
    document.getElementById('val-5').innerText = deaths;

    document.getElementById('dossier-desc').innerText = bio;

    document.getElementById('dossier-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDossier() {
    playSciFiSound('click');
    document.getElementById('dossier-overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}
