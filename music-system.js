// ==================================================
// GLOBAL MUSIC SYSTEM LOGIC
// ==================================================

(function() {
    // Prevent duplicate initialization
    if (window.GlobalMusicSystem) return;
    window.GlobalMusicSystem = true;

    const MUSIC_SRC = 'music.mp3';
    const FADE_DURATION = 800; // ms

    let audio;
    let isPlaying = localStorage.getItem('gmp_isPlaying') === 'true';
    let savedTime = parseFloat(localStorage.getItem('gmp_currentTime')) || 0;
    
    // UI Elements
    let playerEl, playBtn, playIcon, discEl, popupEl;
    let bars = [];

    // Initialize the system
    function init() {
        createAudioElement();
        injectPlayerUI();
        injectPopupUI();
        bindEvents();

        // If we were playing before navigation, resume seamlessly
        if (isPlaying) {
            audio.currentTime = savedTime;
            audio.volume = 0;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    fadeIn();
                    updateUIState(true);
                }).catch(err => {
                    console.log("Autoplay blocked on navigation:", err);
                    isPlaying = false;
                    updateUIState(false);
                    showPopup();
                });
            }
        } else if (savedTime === 0) {
            // First time ever visiting
            showPopup();
        } else {
            audio.currentTime = savedTime;
        }
    }

    function createAudioElement() {
        audio = new Audio(MUSIC_SRC);
        audio.loop = true;
        audio.volume = 0.5; // Default volume
    }

    function injectPlayerUI() {
        playerEl = document.createElement('div');
        playerEl.id = 'global-music-player';
        playerEl.innerHTML = `
            <div class="gmp-disc"></div>
            <div class="gmp-info">
                <p class="gmp-title">Our Song ❤️</p>
                <p class="gmp-subtitle">The soundtrack of us</p>
            </div>
            <div class="gmp-visualizer">
                <div class="gmp-bar" style="animation-duration: 0.8s"></div>
                <div class="gmp-bar" style="animation-duration: 1.1s"></div>
                <div class="gmp-bar" style="animation-duration: 0.9s"></div>
                <div class="gmp-bar" style="animation-duration: 1.2s"></div>
            </div>
            <button class="gmp-btn" id="gmp-play-btn">
                <svg id="gmp-play-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </button>
        `;
        document.body.appendChild(playerEl);

        playBtn = document.getElementById('gmp-play-btn');
        playIcon = document.getElementById('gmp-play-icon');
        discEl = playerEl.querySelector('.gmp-disc');
        bars = playerEl.querySelectorAll('.gmp-bar');
    }

    function injectPopupUI() {
        popupEl = document.createElement('div');
        popupEl.id = 'gmp-autoplay-popup';
        popupEl.className = 'hidden';
        popupEl.innerHTML = `
            <div class="gmp-popup-content">
                <p class="gmp-popup-text">Tap anywhere to start our song ❤️</p>
            </div>
        `;
        document.body.appendChild(popupEl);
    }

    function bindEvents() {
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlay();
        });

        // Global click to dismiss popup and start music
        document.addEventListener('click', () => {
            if (!popupEl.classList.contains('hidden')) {
                hidePopup();
                if (!isPlaying) togglePlay();
            }
        });

        // Save state before leaving page
        window.addEventListener('beforeunload', () => {
            if (audio) {
                localStorage.setItem('gmp_currentTime', audio.currentTime);
                localStorage.setItem('gmp_isPlaying', isPlaying);
            }
        });

        // Listen for external play commands (e.g., from the surprise page card)
        window.addEventListener('gmp-toggle', () => {
            togglePlay();
        });
    }

    function togglePlay() {
        if (isPlaying) {
            fadeOut(() => {
                audio.pause();
                isPlaying = false;
                updateUIState(false);
                localStorage.setItem('gmp_isPlaying', 'false');
            });
        } else {
            audio.volume = 0;
            audio.play().then(() => {
                isPlaying = true;
                fadeIn();
                updateUIState(true);
                localStorage.setItem('gmp_isPlaying', 'true');
            }).catch(e => {
                console.log("Play failed", e);
            });
        }
    }

    function updateUIState(playing) {
        if (playing) {
            playIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
            discEl.classList.add('playing');
            bars.forEach(b => b.classList.add('playing'));
        } else {
            playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
            discEl.classList.remove('playing');
            bars.forEach(b => b.classList.remove('playing'));
        }
        
        // Dispatch event so other components (like surprise page card) can sync
        window.dispatchEvent(new CustomEvent('gmp-state-changed', { detail: { isPlaying: playing } }));

        // Manage floating particles if playing
        if (playing) {
            startParticles();
        } else {
            stopParticles();
        }
    }

    let particleInterval;
    function startParticles() {
        if (particleInterval) return;
        particleInterval = setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'gmp-particle';
            // Random properties
            const size = Math.random() * 4 + 2;
            const left = Math.random() * 100;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = left + '%';
            particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            playerEl.appendChild(particle);
            setTimeout(() => {
                if (particle.parentNode) particle.parentNode.removeChild(particle);
            }, 4000);
        }, 300);
    }

    function stopParticles() {
        clearInterval(particleInterval);
        particleInterval = null;
    }

    function showPopup() {
        popupEl.classList.remove('hidden');
    }

    function hidePopup() {
        popupEl.classList.add('hidden');
    }

    // Smooth fade in
    function fadeIn() {
        let vol = 0;
        const targetVol = 0.5;
        const step = targetVol / (FADE_DURATION / 50);
        audio.volume = vol;
        
        const fadeInterval = setInterval(() => {
            if (vol < targetVol) {
                vol += step;
                audio.volume = Math.min(vol, targetVol);
            } else {
                clearInterval(fadeInterval);
            }
        }, 50);
    }

    // Smooth fade out
    function fadeOut(callback) {
        let vol = audio.volume;
        const step = vol / (FADE_DURATION / 50);
        
        const fadeInterval = setInterval(() => {
            if (vol > 0) {
                vol -= step;
                audio.volume = Math.max(vol, 0);
            } else {
                clearInterval(fadeInterval);
                if (callback) callback();
            }
        }, 50);
    }

    // Expose a global API for other scripts
    window.GMP = {
        toggle: togglePlay,
        getState: () => isPlaying
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
