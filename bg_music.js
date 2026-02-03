document.addEventListener("DOMContentLoaded", function() {
    const music = document.getElementById('bgMusic');
    const soundBtn = document.getElementById('soundBtn'); 
    const musicIcon = document.getElementById('musicIcon'); 

    // 1. ดึงความจำเดิม (ถ้าเคยเปิดไว้หน้าก่อน หน้านี้ต้องเปิดด้วย)
    const isPlaying = localStorage.getItem('bgMusicPlaying') === 'true';
    const savedTime = localStorage.getItem('bgMusicTime');

    music.volume = 0.5; // ความดัง

    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    }

    // ฟังก์ชันเปลี่ยนรูปไอคอน
    function updateIcon(playing) {
        if (!musicIcon) return;
        if (playing) {
            // รูปเปิดเสียง
            musicIcon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>`;
        } else {
            // รูปปิดเสียง
            musicIcon.innerHTML = `<line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v6a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>`;
        }
    }

    // 2. สั่งเล่นอัตโนมัติ (ถ้าสถานะคือเปิด)
    if (isPlaying) {
        updateIcon(true);
        let playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay blocked - รอคนกดปุ่มหรือแตะจอ");
                // ถ้าโดนบล็อก ยังไม่ต้องเปลี่ยนไอคอน แต่รอจังหวะคนแตะจอ
                const unlock = () => {
                    music.play();
                    document.removeEventListener('click', unlock);
                    document.removeEventListener('touchstart', unlock);
                };
                document.addEventListener('click', unlock);
                document.addEventListener('touchstart', unlock);
            });
        }
    } else {
        updateIcon(false);
    }

    // 3. จำเวลาเพลงตลอดเวลา
    music.addEventListener('timeupdate', function() {
        localStorage.setItem('bgMusicTime', music.currentTime);
    });

    // 4. สั่งงานปุ่มกด
    if (soundBtn) {
        soundBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // สำคัญ! กันไม่ให้ไปกวนจุดอื่น
            
            if (music.paused) {
                music.play();
                localStorage.setItem('bgMusicPlaying', 'true');
                updateIcon(true);
            } else {
                music.pause();
                localStorage.setItem('bgMusicPlaying', 'false');
                updateIcon(false);
            }
        });
    }
});