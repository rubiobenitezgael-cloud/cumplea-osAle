document.addEventListener('DOMContentLoaded', () => {
    const landingScreen = document.getElementById('landing-screen');
    const landingTitle = document.getElementById('landing-title');
    const landingSubtitle = document.getElementById('landing-subtitle');
    const countdownBadge = document.querySelector('.countdown-badge');
    const countdownBox = document.getElementById('countdown-box');
    const balloonsWrapper = document.getElementById('balloons-wrapper');
    const countdownBgParticles = document.getElementById('countdown-bg-particles');
    const btnGuestEntry = document.getElementById('btn-guest-entry');
    const btnStartBirthday = document.getElementById('btn-start-birthday');
    
    // Contraseña
    const passwordScreen = document.getElementById('password-screen');
    const passwordForm = document.getElementById('password-form');
    const birthdayPasswordInput = document.getElementById('birthday-password');
    const passwordError = document.getElementById('password-error');
    const btnBackToLanding = document.getElementById('btn-back-to-landing');

    // Navegación Invitados
    const guestInstructionsScreen = document.getElementById('guest-instructions-screen');
    const btnBackFromInstructions = document.getElementById('btn-back-from-instructions');
    const btnProceedToForm = document.getElementById('btn-proceed-to-form');
    const guestFormScreen = document.getElementById('guest-form-screen');
    const guestMemoryForm = document.getElementById('guest-memory-form');
    const guestSuccessMsg = document.getElementById('guest-success-msg');
    const btnBackToInstructions = document.getElementById('btn-back-to-instructions');
    const btnBackHome = document.getElementById('btn-back-home');
    const btnAddAnother = document.getElementById('btn-add-another');

    // Elementos dinámicos del formulario
    const detailCategorySelect = document.getElementById('detail-category');
    const categoryDescription = document.getElementById('category-description');
    const labelMessage = document.getElementById('label-message');
    const guestMessageInput = document.getElementById('guest-message');
    
    const sectionMemoryOptions = document.getElementById('section-memory-options');
    const sectionLetterOptions = document.getElementById('section-letter-options');
    const sectionSongOptions = document.getElementById('section-song-options');
    const sectionChallengeOptions = document.getElementById('section-challenge-options');
    
    const photoEffectRadios = document.querySelectorAll('input[name="photo-effect"]');
    const emojiInputContainer = document.getElementById('emoji-input-container');

    // Menú Principal
    const menuContainer = document.getElementById('surprise-menu');
    const mysteryCards = document.querySelectorAll('.mystery-card');
    const surpriseContainer = document.getElementById('surprise-content-container');
    const suspenseScreen = document.getElementById('suspense-screen');
    const btnNextSurprise = document.getElementById('btn-next-surprise');

    const SECRET_PASSWORD = "25"; // Clave secreta
    
    // MODO DE PRUEBAS ACTIVO
    const BIRTHDAY_DATE = new Date(2025, 0, 1); 

    const categoryDescriptions = {
        memory: "Comparte una historia o chiste interno inolvidable, añade una foto con efecto y opcionalmente una canción que te recuerde al momento.",
        letter: "Escribe una carta tradicional con un sobre elegante, elige su estampilla postal favorita y adjunta una imagen especial.",
        song: "Dedica un tema musical de Spotify o YouTube que consideres que define su vibra o representa un gran momento juntos.",
        challenge: "Crea un reto o desafío divertido para la ruleta con un premio o condición especial al cumplirlo en persona."
    };

    // Dentro del event listener de detailCategorySelect:
    const previewDemoContent = document.getElementById('preview-demo-content');

function updateVisualPreview() {
    if (!previewDemoContent || !detailCategorySelect) return;
    const val = detailCategorySelect.value;

    if (val === 'memory') {
        const effect = document.querySelector('input[name="photo-effect"]:checked')?.value || 'normal';
        if (effect === 'puzzle') {
            previewDemoContent.innerHTML = `
                <div style="font-size: 0.8rem; color: #ec4899; font-weight: 600; margin-bottom: 4px;">🧩 Efecto Puzle Misterioso Activo</div>
                <div style="background: rgba(0,0,0,0.7); border-radius: 8px; padding: 8px; color: #fff; font-size: 0.75rem; display:inline-block;">
                    📷 [Foto oculta con filtro borroso y botón para resolver]
                </div>
            `;
        } else if (effect === 'emojis') {
            previewDemoContent.innerHTML = `
                <div style="font-size: 0.8rem; color: #ec4899; font-weight: 600; margin-bottom: 4px;">✨ Efecto Emojis Flotantes Activo</div>
                <div style="font-size: 1.1rem; background: rgba(236, 72, 153, 0.1); border-radius: 8px; padding: 6px;">
                    💖 ✨ 💖 📸 💖 ✨
                </div>
            `;
        } else {
            previewDemoContent.innerHTML = `
                <div style="font-size: 0.8rem; color: #334155; font-weight: 600; margin-bottom: 4px;">📸 Recuerdo Fotográfico Normal</div>
                <div style="font-size: 0.75rem; color: #64748b; background: rgba(0,0,0,0.05); padding: 6px; border-radius: 6px;">
                    [Se mostrará la foto del invitado junto a su mensaje emotivo]
                </div>
            `;
        }
    } else if (val === 'letter') {
        const stamp = document.querySelector('input[name="postal-stamp"]:checked')?.value || '✈️';
        previewDemoContent.innerHTML = `
            <div style="font-size: 0.8rem; color: #d97706; font-weight: 600; margin-bottom: 4px;">💌 Carta Postal con Minijuego</div>
            <div style="background: #fef3c7; border: 1px dashed #d97706; border-radius: 8px; padding: 8px; font-size: 0.8rem; color: #78350f;">
                ✉️ Sobre Postal [ Estampilla: ${stamp} ] + Adivinanza de Autor
            </div>
        `;
    } else if (val === 'song') {
        previewDemoContent.innerHTML = `
            <div style="font-size: 0.8rem; color: #0284c7; font-weight: 600; margin-bottom: 4px;">🎵 Reproductor Musical Dedicado</div>
            <div style="background: rgba(2, 132, 199, 0.1); border: 1px solid #38bdf8; border-radius: 8px; padding: 6px; font-size: 0.75rem; color: #0369a1;">
                🎧 Widget integrado de Spotify / YouTube con dedicatoria
            </div>
        `;
    } else if (val === 'challenge') {
        previewDemoContent.innerHTML = `
            <div style="font-size: 0.8rem; color: #059669; font-weight: 600; margin-bottom: 4px;">🎯 Reto / Dinámica para la Ruleta</div>
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #34d399; border-radius: 8px; padding: 6px; font-size: 0.75rem; color: #047857;">
                🎲 Sorpresa interactiva con premio opcional al cumplirlo
            </div>
        `;
    }
}

    if (detailCategorySelect) {
        detailCategorySelect.addEventListener('change', (e) => {
            const val = e.target.value;
            categoryDescription.innerText = categoryDescriptions[val] || "";
            
            updateVisualPreview();

            // Actualizar vista previa visual (Demo)
            if (previewDemoContent) {
                if (val === 'memory') {
                    previewDemoContent.innerHTML = `📸 <strong>Efecto Foto:</strong> Podrá elegir si la foto se descubre como Puzle borroso 🧩 o con Lluvia de Emojis flotantes ✨.`;
                } else if (val === 'letter') {
                    previewDemoContent.innerHTML = `💌 <strong>Carta Postal:</strong> Llegará dentro de un sobre con estampilla postal ✈️ y un minijuego para adivinar quién la escribió.`;
                } else if (val === 'song') {
                    previewDemoContent.innerHTML = `🎵 <strong>Reproductor Musical:</strong> Se integrará un widget flotante de Spotify o YouTube para escuchar la dedicatoria en alta calidad.`;
                } else if (val === 'challenge') {
                    previewDemoContent.innerHTML = `🎯 <strong>Reto / Dinámica:</strong> Aparecerá en la ruleta con un diseño especial interactivo y un premio opcional a cumplir en persona.`;
                }
            }
            
            // Ocultar/Mostrar secciones del formulario...
            sectionMemoryOptions.classList.add('hidden');
            sectionLetterOptions.classList.add('hidden');
            sectionSongOptions.classList.add('hidden');
            sectionChallengeOptions.classList.add('hidden');

            if (val === 'memory') {
                labelMessage.innerText = "Tu anécdota o recuerdo:";
                guestMessageInput.placeholder = "Escribe un recuerdo inolvidable o chusco...";
                sectionMemoryOptions.classList.remove('hidden');
            } else if (val === 'letter') {
                labelMessage.innerText = "Cuerpo de la carta:";
                guestMessageInput.placeholder = "Querida cumpleañera, hoy quiero decirte que...";
                sectionLetterOptions.classList.remove('hidden');
            } else if (val === 'song') {
                labelMessage.innerText = "¿Por qué esta canción le queda perfecta?:";
                guestMessageInput.placeholder = "Escribe una dedicatoria o por qué elegiste este tema...";
                sectionSongOptions.classList.add('hidden'); // O visible según requieras
            } else if (val === 'challenge') {
                labelMessage.innerText = "Redacta el reto o desafío:";
                guestMessageInput.placeholder = "Ej. Manda un audio cantando tu parte favorita...";
                sectionChallengeOptions.classList.remove('hidden');
            }
        });
    }

    photoEffectRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {

            updateVisualPreview();

            if (e.target.value === 'emojis') {
                emojiInputContainer.classList.remove('hidden');
            } else {
                emojiInputContainer.classList.add('hidden');
            }
        });
    });

    function createCountdownParticles() {
        if (!countdownBgParticles) return;
        countdownBgParticles.innerHTML = '';
        for (let i = 0; i < 40; i++) {
            const star = document.createElement('div');
            star.className = 'star-particle';
            const size = Math.random() * 3 + 1;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.animationDuration = (Math.random() * 4 + 2) + 's';
            star.style.animationDelay = (Math.random() * 2) + 's';
            countdownBgParticles.appendChild(star);
        }
    }
    createCountdownParticles();

    function checkBirthdayStatus() {
        const now = new Date();
        const difference = BIRTHDAY_DATE - now;

        if (difference <= 0) {
            landingScreen.classList.add('birthday-celebration-theme');
            landingTitle.innerText = "¡Alguien cumple años hoy! 🎉";
            landingSubtitle.innerText = "Preparamos algo especial para ti...";
            
            if (countdownBadge) countdownBadge.classList.add('hidden');
            countdownBox.classList.add('hidden');
            if (countdownBgParticles) countdownBgParticles.classList.add('hidden');
            balloonsWrapper.classList.remove('hidden');
            btnGuestEntry.classList.add('hidden');
            btnStartBirthday.classList.remove('hidden');

            createConfetti();
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
    }

    setInterval(checkBirthdayStatus, 1000);
    checkBirthdayStatus();

    function createConfetti() {
        const colors = ['#ff4d6d', '#3a86ff', '#ffbe0b', '#06d6a0', '#ff006e', '#8338ec'];
        for (let i = 0; i < 35; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = (Math.random() * 2) + 's';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            landingScreen.appendChild(confetti);
        }
    }

    if (btnGuestEntry) {
        btnGuestEntry.addEventListener('click', () => {
            landingScreen.classList.add('hidden');
            guestInstructionsScreen.classList.remove('hidden');
        });
    }

    if (btnBackFromInstructions) {
        btnBackFromInstructions.addEventListener('click', () => {
            guestInstructionsScreen.classList.add('hidden');
            landingScreen.classList.remove('hidden');
        });
    }

    if (btnProceedToForm) {
        btnProceedToForm.addEventListener('click', () => {
            guestInstructionsScreen.classList.add('hidden');
            guestFormScreen.classList.remove('hidden');
        });
    }

    if (btnBackToInstructions) {
        btnBackToInstructions.addEventListener('click', () => {
            guestFormScreen.classList.add('hidden');
            guestInstructionsScreen.classList.remove('hidden');
        });
    }

    // PEGA TU ENLACE DE SHEETDB AQUÍ:
const SHEETDB_API_URL = "https://sheetdb.io/api/v1/uc3klpbugkedz"; 

if (guestMemoryForm) {
    guestMemoryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('guest-name');
        const messageInput = document.getElementById('guest-message');
        
        const name = nameInput ? nameInput.value : "Anónimo";
        const category = detailCategorySelect ? detailCategorySelect.value : "memory";
        let message = messageInput ? messageInput.value : "";
        
        let imageBase64 = "";
        let photoEffect = 'normal';
        let customEmoji = '💖';
        let postalStamp = '✈️';
        let songUrl = '';
        let songDisplay = 'player';

        // Función auxiliar segura para convertir imagen a Base64 sin bloquear el navegador
        const convertFileToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        };

        try {
            if (category === 'memory') {
                const imageFileEl = document.getElementById('guest-image');
                const photoEffectEl = document.querySelector('input[name="photo-effect"]:checked');
                const customEmojiEl = document.getElementById('guest-custom-emoji');
                const songUrlEl = document.getElementById('memory-song-url');

                if (photoEffectEl) photoEffect = photoEffectEl.value;
                if (customEmojiEl) customEmoji = customEmojiEl.value;
                if (songUrlEl) songUrl = songUrlEl.value;

                if (imageFileEl && imageFileEl.files && imageFileEl.files[0]) {
    imageBase64 = await uploadImageToCloud(imageFileEl.files[0]);
}
            } else if (category === 'letter') {
                const letterImgEl = document.getElementById('letter-image');
                const postalStampEl = document.querySelector('input[name="postal-stamp"]:checked');
                
                if (postalStampEl) postalStamp = postalStampEl.value;
                if (letterImgEl && letterImgEl.files && letterImgEl.files[0]) {
    imageBase64 = await uploadImageToCloud(letterImgEl.files[0]);
}
            } else if (category === 'song') {
                const songUrlEl = document.getElementById('guest-song-url');
                const songDisplayEl = document.querySelector('input[name="song-display"]:checked');
                
                if (songUrlEl) songUrl = songUrlEl.value;
                if (songDisplayEl) songDisplay = songDisplayEl.value;
            } else if (category === 'challenge') {
                const rewardEl = document.getElementById('challenge-reward');
                if (rewardEl && rewardEl.value) {
                    message += `\n🎁 Premio: ${rewardEl.value}`;
                }
            }

            // Estructura de datos exacta para SheetDB
            const newMemory = {
                id: String(Date.now()),
                category: category,
                author: name,
                title: category === 'song' ? `🎵 Dedicatoria de: ${name}` : category === 'letter' ? `💌 Carta de: ${name}` : category === 'challenge' ? `🎯 Reto de: ${name}` : `✨ Recuerdo de: ${name}`,
                text: message,
                image: imageBase64,
                photoEffect: photoEffect,
                customEmoji: customEmoji,
                postalStamp: postalStamp,
                songUrl: songUrl,
                songDisplay: songDisplay
            };

            // Enviar a Google Sheets vía SheetDB
            const response = await fetch(SHEETDB_API_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: [newMemory] })
            });

            if (response.ok) {
                guestMemoryForm.classList.add('hidden');
                if (guestSuccessMsg) guestSuccessMsg.classList.remove('hidden');
            } else {
                alert("Hubo un problema al guardar en la nube. Revisa los campos.");
            }

        } catch (error) {
            console.error("Error al procesar la imagen o enviar los datos:", error);
            alert("La imagen pesa demasiado o hubo un fallo de red. Prueba con una imagen más ligera.");
        }
    });
}

    // PEGA TU API KEY DE IMGBB AQUÍ:
const IMGBB_API_KEY = "c8608dc14bdbc1103e4f41eb510ca285";

const uploadImageToCloud = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    if (data.success) {
        return data.data.url; // Devuelve el enlace corto de la imagen (ej. https://i.ibb.co/...)
    } else {
        throw new Error("No se pudo subir la imagen al servidor");
    }
};

    if (btnAddAnother) {
        btnAddAnother.addEventListener('click', () => {
            guestMemoryForm.reset();
            guestMemoryForm.classList.remove('hidden');
            guestSuccessMsg.classList.add('hidden');
            
            sectionMemoryOptions.classList.remove('hidden');
            sectionLetterOptions.classList.add('hidden');
            sectionSongOptions.classList.add('hidden');
            sectionChallengeOptions.classList.add('hidden');
            emojiInputContainer.classList.add('hidden');
            
            detailCategorySelect.value = "memory";
            categoryDescription.innerText = categoryDescriptions['memory'];
        });
    }

    if (btnBackHome) {
        btnBackHome.addEventListener('click', () => {
            guestFormScreen.classList.add('hidden');
            landingScreen.classList.remove('hidden');
            guestMemoryForm.reset();
            guestMemoryForm.classList.remove('hidden');
            guestSuccessMsg.classList.add('hidden');
            sectionMemoryOptions.classList.remove('hidden');
            sectionLetterOptions.classList.add('hidden');
            sectionSongOptions.classList.add('hidden');
            sectionChallengeOptions.classList.add('hidden');
            emojiInputContainer.classList.add('hidden');
            detailCategorySelect.value = "memory";
            categoryDescription.innerText = categoryDescriptions['memory'];
        });
    }

    if (btnStartBirthday) {
        btnStartBirthday.addEventListener('click', () => {
            landingScreen.classList.add('hidden');
            passwordScreen.classList.remove('hidden');
            birthdayPasswordInput.focus();
        });
    }

    if (btnBackToLanding) {
        btnBackToLanding.addEventListener('click', () => {
            passwordScreen.classList.add('hidden');
            landingScreen.classList.remove('hidden');
        });
    }

    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (birthdayPasswordInput.value.trim() === SECRET_PASSWORD) {
                passwordScreen.classList.add('hidden');
                menuContainer.classList.remove('hidden');
            } else {
                passwordError.classList.remove('hidden');
                birthdayPasswordInput.value = '';
            }
        });
    }

    // LISTA DE SORPRESAS
    const surprises = [
        {
            title: "¡Carta de Felicitación! 💌",
            themeClass: "message-page-theme",
            bgType: "hearts",
            content: `
                <div id="envelope-3d-scene" class="envelope-3d-scene">
                    <div class="envelope-3d-flap"></div>
                    <div class="envelope-3d-body">
                        <div class="envelope-seal-badge">💌</div>
                        <div class="letter-paper-3d">
                            <h2 style="font-family: 'Dancing Script', cursive; font-size: 1.6rem; color: #be123c; margin-bottom: 5px;">¡Feliz Cumpleaños! 🎉</h2>
                            <p style="font-size: 0.75rem; color: #4c0519; text-align: left; line-height: 1.3;">
                                Hoy es un día increíblemente especial...
                            </p>
                        </div>
                    </div>
                </div>
                <p id="envelope-hint" style="color: #9f1239; font-weight: 600; margin-bottom: 15px; font-size: 0.95rem;">👆 Haz clic en el sobre para abrir la carta en grande</p>

                <div id="letter-full-modal" class="letter-paper-card hidden">
                    <h2 class="letter-title">¡Feliz Cumpleaños! 🎉✨</h2>
                    <div class="letter-body">
<p>Hoy es un día increíblemente especial. Quiero que sepas lo afortunado/a que se siente la gente de compartir momentos contigo y de poder celebrar un año más de tu vida.</p>

<p>Gracias por cada sonrisa, por tu presencia única y por llenar de energía bonita a todos los que te rodean. Deseo que este nuevo año esté lleno de proyectos cumplidos, risas inolvidables y momentos mágicos.</p>
<p>Quiero que sepas que puedes seguir contando conmigo en cualquier momento, siempre estaré aquí pase lo que pase, estemos en la situación en la que estemos. Hay miles de cosas que quisiera decirte pero no me salen, quisiera todas esas palabras podertela demostrar con mi cariño frente a frente porque esa es mi manera de amas pero por ahora solo agradecerte por todo el tiempo que me has brindado, los cariños, el amor, el apoyo incondicional que me das cada día de tu vida aprecio muchisimo tus buenos días, tus buenas noches, tus regaños y sobretodo tus "te amo". Cada te amo es muy especial, cada te amo me hace sentir el hombre más amado del mundo y agradezco cada palabra por más sencilla que salga de ti.</p>

<p>Eres la personita más especial para mi en este año, enserio con todo mi corazón te amo, eres una linda niña y siempre serás mi princesita quisiera decirte muchisimas cosas, darte miles de detalles y hacerte sentir la más amada pero esperemos a que llegue el momento, hoy es un día especial, el más especial para ti y eso hace que para mi sea  igual de los más especiales. Feliz cumpleaños mi niñita linda y disfruta corazón.</p>

                    </div>
                    <div class="letter-signature">Con todo mi cariño ❤️</div>
                    <button id="btn-trigger-suspense" class="btn-action-next" style="background: linear-gradient(135deg, #e11d48, #f43f5e); color: white; border: none; padding: 12px 28px; border-radius: 30px; cursor: pointer; font-weight: 600; box-shadow: 0 5px 15px rgba(225,29,72,0.3);">Continuar a la siguiente sorpresa ➔</button>
                </div>
            `
        },
        {
            title: "¡La Ruleta de los Recuerdos! 🎡",
            themeClass: "roulette-page-theme",
            bgType: "stars",
            content: `
                <div id="star-burst" class="star-burst-overlay"></div>

                <div class="roulette-container-box">
                    <h2>🎡 La Ruleta de la Fortuna</h2>
                    <p>Gira la rueda y descubre los recuerdos tuyos y de tus seres queridos.</p>
                    
                    <div class="wheel-wrapper">
                        <div class="wheel-pointer"></div>
                        <div id="wheel" class="wheel"></div>
                    </div>

                    <button id="btn-spin" class="btn-roulette">¡Girar Ruleta! 🎲</button>

                    <div id="roulette-result-box" class="roulette-result hidden">
                        <h3 id="result-title">¡Desbloqueaste un recuerdo!</h3>
                        <p id="result-text">...</p>
                        <div id="result-media-container"></div>
                        <button id="btn-save-memory" style="background: linear-gradient(135deg, #ec4899, #f43f5e); color:white; border:none; padding:8px 20px; border-radius:20px; cursor:pointer; font-weight:600; margin-top: 10px;">Guardar en la Caja 🎁</button>
                    </div>

                    <div id="memory-box-wrapper" class="memory-box-container">
                        <div id="memory-box-inner" class="memory-box-closed">
                            <div class="box-icon-visual" id="box-icon">📦</div>
                            <p id="box-status-text">Caja de recuerdos</p>
                        </div>
                        <div id="memories-list" class="memories-list" style="display: none;"></div>
                    </div>

                    <br>
                    <button id="btn-trigger-suspense" class="btn-action-next" style="background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 8px 22px; border-radius: 30px; cursor: pointer; font-weight: 600;">Continuar ➔</button>
                </div>
            `
        },
        {
            title: "¡Canción Especial! 🎶",
            themeClass: "music-page-theme",
            bgType: "notes",
            content: `
                <div class="content-card-box" style="background: #18181b; color: white; border: 1px solid #27272a; max-width: 520px;">
                    <h2 style="color: #f43f5e; margin-bottom: 10px; font-size: 1.6rem;">Esta canción me recuerda a ti... 🎧</h2>
                    <p id="song-dedication-author" style="font-size: 0.95rem; color: #f472b6; margin-bottom: 15px; font-weight: 600;">Cargando música...</p>
                    
                    <div id="dynamic-song-player-container" style="margin-bottom: 20px;"></div>

                    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                        <button id="btn-shuffle-song" style="background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; border: none; padding: 10px 20px; border-radius: 30px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">🔀 Siguiente canción</button>
                        <button id="btn-trigger-suspense" class="btn-action-next" style="background: #f43f5e; color: white; border: none; padding: 10px 24px; border-radius: 30px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">Siguiente sorpresa ➔</button>
                    </div>
                </div>
            `
        }
    ];

    let remainingSurprises = [];
    let currentSurpriseIndex = 0;

    function shuffleArray(array) {
        return [...array].sort(() => Math.random() - 0.5);
    }

    mysteryCards.forEach(card => {
        card.addEventListener('click', () => {
            remainingSurprises = shuffleArray(surprises);
            menuContainer.classList.add('hidden');
            showCurrentSurprise();
        });
    });

    function generateBackgroundElements(bgType) {
        const bgContainer = document.createElement('div');
        bgContainer.className = 'bg-particles-container';

        if (bgType === 'stars') {
            for (let i = 0; i < 60; i++) {
                const star = document.createElement('div');
                star.className = 'star-particle';
                const size = Math.random() * 3 + 1;
                star.style.width = size + 'px';
                star.style.height = size + 'px';
                star.style.left = Math.random() * 100 + 'vw';
                star.style.top = Math.random() * 100 + 'vh';
                star.style.animationDuration = (Math.random() * 3 + 2) + 's';
                star.style.animationDelay = (Math.random() * 2) + 's';
                bgContainer.appendChild(star);
            }
        } else if (bgType === 'hearts') {
            const heartIcons = ['💖', '✨', '💕', '🌸'];
            for (let i = 0; i < 20; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart-particle';
                heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
                heart.style.left = Math.random() * 95 + 'vw';
                heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
                heart.style.animationDelay = (Math.random() * 3) + 's';
                bgContainer.appendChild(heart);
            }
        } else if (bgType === 'notes') {
            const noteIcons = ['🎵', '🎶', '🎼', '✨'];
            for (let i = 0; i < 22; i++) {
                const note = document.createElement('div');
                note.className = 'note-particle';
                note.innerText = noteIcons[Math.floor(Math.random() * noteIcons.length)];
                note.style.left = Math.random() * 95 + 'vw';
                note.style.animationDuration = (Math.random() * 5 + 4) + 's';
                note.style.animationDelay = (Math.random() * 3) + 's';
                bgContainer.appendChild(note);
            }
        }
        return bgContainer;
    }

    function showCurrentSurprise() {
        const current = remainingSurprises[currentSurpriseIndex];
        
        surpriseContainer.className = "full-screen-section hidden-surprise " + current.themeClass;
        surpriseContainer.innerHTML = current.content;

        const bgElements = generateBackgroundElements(current.bgType);
        surpriseContainer.appendChild(bgElements);

        setTimeout(() => {
            surpriseContainer.classList.add('active');
        }, 50);

        // Animación sobre 3D Opción 1
        const envelopeScene = document.getElementById('envelope-3d-scene');
        const letterFullModal = document.getElementById('letter-full-modal');
        const envelopeHint = document.getElementById('envelope-hint');

        if (envelopeScene && letterFullModal) {
            envelopeScene.addEventListener('click', () => {
                envelopeScene.classList.add('opened');
                if (envelopeHint) envelopeHint.style.display = 'none';
                setTimeout(() => {
                    envelopeScene.style.display = 'none';
                    letterFullModal.classList.remove('hidden');
                }, 800);
            });
        }

        if (current.title.includes("Ruleta")) {
            initRouletteLogic();
        }

        if (current.title.includes("Canción")) {
            renderMusicSong();
        }
    }

    if (btnNextSurprise) {
        btnNextSurprise.addEventListener('click', () => {
            suspenseScreen.classList.add('hidden');
            showCurrentSurprise();
        });
    }

    // LISTA DE CANCIONES EXCLUSIVAS DE MÚSICA
    let dedicatedSongs = [
        { title: "🎵 Dedicatoria Especial 1", text: "Una canción que describe perfectamente tu vibra y alegría.", url: "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT" },
        { title: "🎵 Dedicatoria Especial 2", text: "Para escuchar mientras recuerdas los mejores momentos del año.", url: "https://open.spotify.com/track/3ZftkvIE7kyPt6Nu3PEa7V" },
        { title: "🎵 Himno de Cumpleaños", text: "Porque te mereces celebrar en grande hoy y siempre.", url: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b" }
    ];
    let currentMusicIndex = 0;

    function renderMusicSong() {
        const songPlayerContainer = document.getElementById('dynamic-song-player-container');
        const songAuthorEl = document.getElementById('song-dedication-author');
        if (!songPlayerContainer || !songAuthorEl) return;

        const currentSong = dedicatedSongs[currentMusicIndex];
        songAuthorEl.innerText = `${currentSong.title}: "${currentSong.text}"`;
        songPlayerContainer.innerHTML = generateSongEmbedHTML(currentSong.url, 'player');
    }

    function generateSongEmbedHTML(url, displayType) {
        if (!url) return '';
        let embedHTML = '';
        if (url.includes('spotify.com')) {
            const spotifyTrackId = url.split('/track/')[1]?.split('?')[0];
            if (spotifyTrackId) {
                const height = displayType === 'cover' ? '152' : '80';
                embedHTML = `<iframe class="music-embed-box" src="https://open.spotify.com/embed/track/${spotifyTrackId}" height="${height}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            }
        } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
            let videoId = '';
            if (url.includes('youtu.be')) {
                videoId = url.split('youtu.be/')[1]?.split('?')[0];
            } else {
                videoId = url.split('v=')[1]?.split('&')[0];
            }
            if (videoId) {
                embedHTML = `<iframe class="music-embed-box" height="180" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            }
        } else {
            embedHTML = `<p style="font-size:0.85rem; color:#f472b6; margin-top:8px;">🎵 Canción: <a href="${url}" target="_blank" style="color:white;">Enlace externo</a></p>`;
        }
        return embedHTML;
    }

    // DELEGACIÓN DE EVENTOS GLOBAL PARA LOS BOTONES DE MÚSICA Y AVANCE
    document.addEventListener('click', (e) => {
        // Botón Siguiente Canción
        if (e.target && (e.target.id === 'btn-shuffle-song' || e.target.closest('#btn-shuffle-song'))) {
            currentMusicIndex = (currentMusicIndex + 1) % dedicatedSongs.length;
            renderMusicSong();
        }

        // Botón Siguiente Sorpresa en la sección de música
        if (e.target && (e.target.id === 'btn-trigger-suspense' || e.target.classList.contains('btn-action-next') || e.target.closest('.btn-action-next'))) {
            // Verificar si estamos en la sección de música u otra pantalla activa
            if (surpriseContainer.classList.contains('active')) {
                surpriseContainer.classList.remove('active');

                currentSurpriseIndex++;
                if (currentSurpriseIndex < remainingSurprises.length) {
                    setTimeout(() => {
                        suspenseScreen.classList.remove('hidden');
                    }, 400);
                } else {
                    setTimeout(() => {
                        surpriseContainer.className = "full-screen-section message-page-theme active";
                        surpriseContainer.innerHTML = `
                            <div class="content-card-box">
                                <h2 style="color: #e11d48; margin-bottom: 15px;">🎉 ¡Fin de las sorpresas! 🎉</h2>
                                <p style="font-size: 1.2rem; color: #4c0519;">Esperamos que hayas disfrutado mucho este detalle hecho con todo el corazón.</p>
                            </div>
                        `;
                        surpriseContainer.appendChild(generateBackgroundElements('hearts'));
                    }, 400);
                }
            }
        }
    });

    async function initRouletteLogic() {
    const wheel = document.getElementById('wheel');
    const btnSpin = document.getElementById('btn-spin');
    const resultBox = document.getElementById('roulette-result-box');
    const resultTitle = document.getElementById('result-title');
    const resultText = document.getElementById('result-text');
    const resultMediaContainer = document.getElementById('result-media-container');
    const btnSaveMemory = document.getElementById('btn-save-memory');
    
    const memoryBoxWrapper = document.getElementById('memory-box-wrapper');
    const boxStatusText = document.getElementById('box-status-text');
    const boxIcon = document.getElementById('box-icon');
    const memoriesList = document.getElementById('memories-list');
    const starBurst = document.getElementById('star-burst');

    let defaultOptions = [];

    let availableOptions = [...defaultOptions];

    // CARGAR DESDE GOOGLE SHEETS EN LA NUBE
    try {
        const response = await fetch(SHEETDB_API_URL);
        const cloudMemories = await response.json();
        if (Array.isArray(cloudMemories)) {
            availableOptions = [...defaultOptions, ...cloudMemories];
        }
    } catch (error) {
        console.error("No se pudieron cargar los datos de la nube, usando respaldos locales.", error);
    }

    let savedMemories = [];
    let currentRotation = 0;
    let lastSelectedPrize = null;
    let isBoxOpened = false;

    if (btnSpin) {
        btnSpin.addEventListener('click', () => {
            if (availableOptions.length === 0) {
                alert("¡Ya desbloqueaste todos los recuerdos! 🥳");
                return;
            }

            btnSpin.disabled = true;
            resultBox.classList.add('hidden');
            resultMediaContainer.innerHTML = '';

            const randomSpins = Math.floor(Math.random() * 4) + 5;
            const randomDegree = Math.floor(Math.random() * 360);
            const totalDegrees = (randomSpins * 360) + randomDegree;

            currentRotation += totalDegrees;
            wheel.style.transform = `rotate(${currentRotation}deg)`;

            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * availableOptions.length);
                lastSelectedPrize = availableOptions[randomIndex];

                if (starBurst) {
                    starBurst.classList.remove('burst-anim');
                    void starBurst.offsetWidth;
                    starBurst.classList.add('burst-anim');
                }

                setTimeout(() => {
                    resultTitle.innerText = lastSelectedPrize.title;
                    resultText.innerText = lastSelectedPrize.text;
                    resultMediaContainer.innerHTML = '';
                    
                    if (lastSelectedPrize.category === 'letter') {
                        resultMediaContainer.innerHTML += generateLetterEnvelopeHTML(lastSelectedPrize, false);
                    } else {
                        if (lastSelectedPrize.image) {
                            resultMediaContainer.innerHTML += generatePhotoEffectHTML(lastSelectedPrize);
                        }
                        if (lastSelectedPrize.songUrl) {
                            resultMediaContainer.innerHTML += generateSongEmbedHTML(lastSelectedPrize.songUrl, lastSelectedPrize.songDisplay || 'player');
                        }
                    }

                    resultBox.classList.remove('hidden');
                }, 350);

            }, 4000);
        });
    }

    // (El resto de tus funciones auxiliares como generateLetterEnvelopeHTML, revealPuzzle, etc., se quedan igual abajo)

        window.activeGuessAttempts = {};
        window.generateLetterEnvelopeHTML = function(memory, showAuthorDirectly) {
            const stamp = memory.postalStamp || '✈️';
            const memId = memory.id;
            if (window.activeGuessAttempts[memId] === undefined) {
                window.activeGuessAttempts[memId] = 3;
            }
            const attemptsLeft = window.activeGuessAttempts[memId];

            let authorSectionHTML = '';
            if (showAuthorDirectly) {
                authorSectionHTML = `<p style="margin-top: 10px; font-weight: bold; color: #d97706; font-size: 0.9rem;">✍️ Escrito por: ${memory.author || 'Anónimo'}</p>`;
            } else {
                authorSectionHTML = `
                    <div id="guess-section-${memId}" style="margin-top: 15px; border-top: 1px dashed #d97706; padding-top: 10px;">
                        <p style="font-size: 0.85rem; color: #78350f; margin-bottom: 6px;">¿Adivinas quién escribió esta carta?</p>
                        <div style="display: flex; gap: 6px;">
                            <input type="text" id="guess-input-${memId}" placeholder="Escribe el nombre..." style="padding: 6px 10px; border-radius: 8px; border: 1px solid #d97706; font-size: 0.85rem; flex: 1; outline: none;">
                            <button onclick="window.checkAuthorGuess('${memId}', '${memory.author || 'Anónimo'}')" style="background: #d97706; color: white; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.85rem;">Adivinar</button>
                        </div>
                        <small id="guess-msg-${memId}" style="display: block; margin-top: 4px; color: #b45309; font-style: italic; font-size: 0.75rem;">Te quedan ${attemptsLeft} intentos</small>
                    </div>
                `;
            }

            return `
                <div class="postal-letter-envelope" id="envelope-box-${memId}" onclick="window.openLetterBox('${memId}')">
                    <span class="postal-stamp-badge">${stamp}</span>
                    <div style="font-size: 3rem; margin-bottom: 5px;">✉️</div>
                    <h4 style="color: #b45309; margin-bottom: 4px;">Carta Postal Recibida</h4>
                    <p style="color: #78350f; font-size: 0.85rem; margin: 0;">Haz clic para abrir el sobre y leer la carta...</p>
                </div>
                <div class="postal-letter-unfolded hidden" id="unfolded-letter-${memId}">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                        <strong style="color: #b45309;">${memory.title}</strong>
                        <span style="font-size: 1.5rem;">${stamp}</span>
                    </div>
                    <p style="color: #78350f; font-size: 0.95rem; white-space: pre-line; margin-bottom: 10px;">${memory.text}</p>
                    ${memory.image ? `<img src="${memory.image}" class="guest-photo-preview" alt="Foto adjunta en carta">` : ''}
                    ${authorSectionHTML}
                </div>
            `;
        };

        window.openLetterBox = function(memoryId) {
            const envelopeBox = document.getElementById(`envelope-box-${memoryId}`);
            const unfoldedLetter = document.getElementById(`unfolded-letter-${memoryId}`);
            if (envelopeBox && unfoldedLetter) {
                envelopeBox.style.display = 'none';
                unfoldedLetter.classList.remove('hidden');
            }
        };

        window.checkAuthorGuess = function(memoryId, realAuthor) {
            const input = document.getElementById(`guess-input-${memoryId}`);
            const msg = document.getElementById(`guess-msg-${memoryId}`);
            const guessSection = document.getElementById(`guess-section-${memoryId}`);
            if (!input || !msg || !guessSection) return;

            const val = input.value.trim().toLowerCase();
            const correct = realAuthor.toLowerCase();

            if (val === correct) {
                guessSection.innerHTML = `<p style="margin-top: 8px; font-weight: bold; color: #059669; font-size: 0.9rem;">🎉 ¡Correcto! Lo adivinaste: ${realAuthor}</p>`;
            } else {
                window.activeGuessAttempts[memoryId]--;
                const left = window.activeGuessAttempts[memoryId];
                if (left > 0) {
                    msg.innerText = `❌ Incorrecto. Te quedan ${left} intentos.`;
                    input.value = '';
                } else {
                    guessSection.innerHTML = `<p style="margin-top: 8px; font-weight: bold; color: #b91c1c; font-size: 0.85rem;">❌ Se acabaron los intentos. Era escrita por: <strong>${realAuthor}</strong></p>`;
                }
            }
        };

        function generatePhotoEffectHTML(memory) {
            if (memory.photoEffect === 'puzzle') {
                return `
                    <div class="puzzle-container" id="puzzle-box-${memory.id}">
                        <button class="puzzle-overlay-btn" id="btn-reveal-${memory.id}" onclick="window.revealPuzzle('${memory.id}')">🧩 Resolver Puzle</button>
                        <img src="${memory.image}" class="puzzle-image blurred" id="puzzle-img-${memory.id}" alt="Foto oculta">
                    </div>
                `;
            } else if (memory.photoEffect === 'emojis') {
                const emoji = memory.customEmoji || '💖';
                let emojisHTML = '';
                for (let i = 0; i < 6; i++) {
                    const leftPos = Math.random() * 85;
                    const animDelay = Math.random() * 2;
                    emojisHTML += `<span class="floating-custom-emoji" style="left: ${leftPos}%; animation-delay: ${animDelay}s;">${emoji}</span>`;
                }
                return `
                    <div class="emoji-floating-wrapper">
                        ${emojisHTML}
                        <img src="${memory.image}" class="guest-photo-preview" alt="Foto del recuerdo">
                    </div>
                `;
            } else {
                return `<img src="${memory.image}" class="guest-photo-preview" alt="Foto del recuerdo">`;
            }
        }

        window.revealPuzzle = function(memoryId) {
            const btnReveal = document.getElementById(`btn-reveal-${memoryId}`);
            const puzzleImg = document.getElementById(`puzzle-img-${memoryId}`);
            const puzzleBox = document.getElementById(`puzzle-box-${memoryId}`);

            if (btnReveal && puzzleImg) {
                puzzleImg.classList.remove('blurred');
                btnReveal.remove();
                if (puzzleBox) puzzleBox.style.background = 'transparent';
            }
        };

        if (btnSaveMemory) {
            btnSaveMemory.addEventListener('click', () => {
                if (!lastSelectedPrize) return;

                resultMediaContainer.innerHTML = '';

                savedMemories.push(lastSelectedPrize);
                availableOptions = availableOptions.filter(opt => opt.id !== lastSelectedPrize.id);
                renderMemories();

                if (savedMemories.length === 1) {
                    memoryBoxWrapper.classList.add('pulsing');
                    boxIcon.innerText = "📥";
                }

                resultBox.classList.add('hidden');
                resultBox.classList.remove('pop-in');
                btnSpin.disabled = false;

                if (availableOptions.length === 0) {
                    btnSpin.innerText = "¡Todo desbloqueado! 🎉";
                    btnSpin.disabled = true;
                }
            });
        }

        if (memoryBoxWrapper) {
            memoryBoxWrapper.addEventListener('click', () => {
                if (savedMemories.length === 0) return;

                isBoxOpened = !isBoxOpened;
                if (isBoxOpened) {
                    memoryBoxWrapper.classList.remove('pulsing');
                    boxIcon.innerText = "📂";
                    boxStatusText.innerText = "Tus recuerdos guardados (Haz clic en uno para verlo):";
                    boxStatusText.style.fontWeight = "bold";
                    boxStatusText.style.color = "#f472b6";
                    memoriesList.style.display = "flex";
                } else {
                    boxIcon.innerText = "📥";
                    boxStatusText.innerText = "Caja de recuerdos";
                    boxStatusText.style.fontWeight = "normal";
                    boxStatusText.style.color = "#cbd5e1";
                    memoriesList.style.display = "none";
                }
            });
        }

        function renderMemories() {
            memoriesList.innerHTML = savedMemories.map((item, index) => `
                <div class="memory-item" data-index="${index}">
                    <strong>${item.title}</strong>
                    <p style="margin:4px 0 0; font-size:0.85rem; color:#f1f5f9; white-space: pre-line;">${item.text}</p>
                </div>
            `).join('');

            document.querySelectorAll('.memory-item').forEach(el => {
                el.addEventListener('click', (e) => {

                    updateVisualPreview();

                    e.stopPropagation();
                    const idx = el.getAttribute('data-index');
                    showMemoryModal(savedMemories[idx]);
                });
            });
        }

        function showMemoryModal(memory) {
            const existingModal = document.getElementById('custom-memory-modal');
            if (existingModal) existingModal.remove();

            const modal = document.createElement('div');
            modal.id = 'custom-memory-modal';
            modal.className = 'memory-modal-overlay';
            
            let innerContentHTML = '';
            if (memory.category === 'letter') {
                innerContentHTML = generateLetterEnvelopeHTML(memory, true);
            } else {
                innerContentHTML = `
                    <h3 style="color: #facc15; margin-bottom: 8px;">${memory.title}</h3>
                    <p style="font-size: 0.95rem; margin-bottom: 12px; color: #f8fafc; background: rgba(255,255,255,0.08); padding: 12px; border-radius: 10px; text-align: left; white-space: pre-line; border-left: 3px solid #f472b6;">${memory.text}</p>
                `;
                if (memory.image) {
                    innerContentHTML += generatePhotoEffectHTML(memory);
                }
                if (memory.songUrl) {
                    innerContentHTML += generateSongEmbedHTML(memory.songUrl, memory.songDisplay || 'player');
                }
            }

            modal.innerHTML = `
                <div class="memory-modal-card">
                    <div style="max-height: 320px; overflow-y: auto;" id="modal-media-wrapper">${innerContentHTML}</div>
                    <button id="close-memory-modal" style="background: #ec4899; color: white; border: none; padding: 6px 18px; border-radius: 20px; cursor: pointer; font-weight: 600; margin-top: 15px;">Cerrar ✖</button>
                </div>
            `;

            document.body.appendChild(modal);

            document.getElementById('close-memory-modal').addEventListener('click', () => {
                modal.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if(e.target === modal) {
                    modal.remove();
                }
            });
        }
    }
});