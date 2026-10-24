/**
 * ========================================================
 * APP SHALOM CHOFERES - MOTOR DE SIMULACIÓN Y CAPACITACIÓN
 * ========================================================
 */

// Sonidos sintéticos con Web Audio API (0 dependencias externas)
const soundFx = {
  ctx: null,
  enabled: true,

  init() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch (e) {
      console.warn('AudioContext no soportado:', e);
    }
  },

  playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.1) {
    if (!this.enabled) return;
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (err) {
      console.error(err);
    }
  },

  tap() {
    this.playTone(600, 'sine', 0.05, 0.08);
  },

  success() {
    if (!this.enabled) return;
    setTimeout(() => this.playTone(523.25, 'triangle', 0.1, 0.15), 0); // C5
    setTimeout(() => this.playTone(659.25, 'triangle', 0.1, 0.15), 100); // E5
    setTimeout(() => this.playTone(783.99, 'triangle', 0.25, 0.2), 200); // G5
  },

  shutter() {
    if (!this.enabled) return;
    this.playTone(1200, 'square', 0.04, 0.25);
    setTimeout(() => this.playTone(800, 'sawtooth', 0.08, 0.2), 50);
  },

  alert() {
    if (!this.enabled) return;
    this.playTone(300, 'sawtooth', 0.15, 0.2);
    setTimeout(() => this.playTone(250, 'sawtooth', 0.15, 0.2), 150);
  }
};

const app = {
  state: {
    activeRouteKey: 'IDA',
    selectedEscalaIdx: 0,
    swipeTriggered: false,
    driverDni: '48290476',
    driverName: 'MICHAEL JESUS REVILLA ALIAGA',
    fotoTomada: false,
    fotoDataUrl: null,
    modoGuiado: true,
    currentStepIdx: 1,
    cameraStream: null,
    routes: {
      IDA: {
        title: 'IDA - HUACHIPA CO - LA MARINA - MAGDALENA AYACUCHO 2',
        progNumber: '948836',
        status: 'PENDIENTE',
        kmInicio: 29726,
        kmFin: 29764,
        candados: 2,
        evidenciaAdjuntada: false,
        escalas: [
          { name: 'HUACHIPA CO', isOrigin: true, isDest: false, status: 'PENDIENTE', km: 29726, llegada: null, salida: null, embarcados: 97, grt: 95, llegadaPrev: '--:--', salidaPrev: '12:50' },
          { name: 'MAGDALENA DEL MAR', isOrigin: false, isDest: false, status: 'PENDIENTE', km: 29762, llegada: null, salida: null, embarcados: 0, grt: 0, llegadaPrev: '13:00', salidaPrev: '13:10' },
          { name: 'AV. LA MARINA', isOrigin: false, isDest: true, status: 'PENDIENTE', km: 29764, llegada: null, salida: null, embarcados: 0, grt: 0, llegadaPrev: '13:30', salidaPrev: '--:--' }
        ]
      },
      RET: {
        title: 'RET- LA MARINA - HUACHIPA 1',
        progNumber: '948836',
        status: 'BLOQUEADO',
        kmInicio: 29764,
        kmFin: 29800,
        candados: 2,
        evidenciaAdjuntada: false,
        escalas: [
          { name: 'AV. LA MARINA', isOrigin: true, isDest: false, status: 'PENDIENTE', km: 29764, llegada: null, salida: null, embarcados: 370, grt: 368, llegadaPrev: '--:--', salidaPrev: '15:00' },
          { name: 'HUACHIPA CO', isOrigin: false, isDest: true, status: 'PENDIENTE', km: 29800, llegada: null, salida: null, embarcados: 0, grt: 0, llegadaPrev: '15:30', salidaPrev: '--:--' }
        ]
      }
    }
  },

  init() {
    this.bindEvents();
    this.renderEscalasView();
    this.startClock();
    this.updateGuiaPaso();

    // Registrar Service Worker para PWA (offline)
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.log('SW no registrado:', err);
      });
    }
  },

  startClock() {
    const updateTime = () => {
      const d = new Date();
      const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const clockEl = document.getElementById('top-clock');
      if (clockEl) clockEl.innerText = timeStr;
    };
    updateTime();
    setInterval(updateTime, 1000);
  },

  showScreen(screenId) {
    soundFx.tap();
    ['login', 'p01', 'p02', 'p04', 'p05', 'p07'].forEach(s => {
      const el = document.getElementById(`view-${s}`);
      if (el) el.classList.add('hidden');
    });
    const target = document.getElementById(`view-${screenId.toLowerCase()}`);
    if (target) {
      target.classList.remove('hidden');
      target.classList.remove('slide-in-right');
      void target.offsetWidth; // re-trigger animation
      target.classList.add('slide-in-right');
    }
    this.closeDropdown();
    this.updateGuiaPaso();
  },

  togglePassVisibility() {
    const passInput = document.getElementById('login-input-pass');
    const eye = document.getElementById('login-eye-icon');
    if (passInput.type === 'password') {
      passInput.type = 'text';
      eye.className = 'fa-solid fa-eye-slash text-xs';
    } else {
      passInput.type = 'password';
      eye.className = 'fa-solid fa-eye text-xs';
    }
  },

  loginSubmit() {
    const user = document.getElementById('login-input-user').value.trim() || '48290476';
    this.state.driverDni = user;
    const subTitle = document.getElementById('p02-driver-subtitle');
    if (subTitle) subTitle.innerText = `${user} - MICHAEL JESUS REVILLA ALIAGA - Q${user}`;
    const p04Dni = document.getElementById('p04-driver-dni');
    if (p04Dni) p04Dni.innerText = user;

    soundFx.success();
    this.showScreen('P01');
  },

  showVideoModal() {
    soundFx.tap();
    document.getElementById('modal-videos').classList.remove('hidden');
  },

  openEvaluacionModal() {
    soundFx.tap();
    document.getElementById('modal-evaluacion').classList.remove('hidden');
  },

  toggleMute() {
    soundFx.enabled = !soundFx.enabled;
    const icon = document.getElementById('btn-sound-icon');
    if (icon) {
      icon.className = soundFx.enabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark text-red-400';
    }
  },

  toggleFullscreen() {
    const box = document.getElementById('main-phone-box');
    if (box) {
      box.classList.toggle('fullscreen-mode');
    }
  },

  toggleModoGuiado() {
    this.state.modoGuiado = !this.state.modoGuiado;
    const banner = document.getElementById('training-guide-banner');
    if (banner) {
      banner.style.display = this.state.modoGuiado ? 'flex' : 'none';
    }
    this.updateGuiaPaso();
  },

  updateGuiaPaso() {
    const textEl = document.getElementById('guia-step-text');
    if (!textEl) return;

    // Quitar resaltados previos
    document.querySelectorAll('.highlight-step').forEach(el => el.classList.remove('highlight-step'));

    const r = this.state.routes[this.state.activeRouteKey];
    let msg = '';

    const isVisible = id => {
      const el = document.getElementById(id);
      return el && !el.classList.contains('hidden');
    };

    if (isVisible('view-login')) {
      msg = 'Presiona INGRESAR con tus credenciales.';
      document.getElementById('btn-login-submit')?.classList.add('highlight-step');
    } else if (isVisible('view-p01')) {
      msg = 'Selecciona el módulo "PROGRAMACIÓN" para ver tu ruta.';
      document.getElementById('btn-to-programacion')?.classList.add('highlight-step');
    } else if (isVisible('view-p02')) {
      if (r.status === 'PENDIENTE') {
        msg = 'Toca la tarjeta de RUTA IDA o deslízala a la izquierda y pulsa INGRESAR.';
      } else if (r.status === 'PROCESO') {
        msg = 'Continúa en la RUTA IDA en proceso.';
      } else {
        msg = '¡Ruta IDA completada! Ahora ingresa al RETORNO desbloqueado.';
      }
    } else if (isVisible('view-p04')) {
      if (r.status === 'PENDIENTE') {
        msg = 'Verifica kilometraje inicial y pulsa "GRABAR INICIO DE RUTA".';
        document.getElementById('btn-p04-grabar-inicio')?.classList.add('highlight-step');
      } else {
        const allEscalasDone = r.escalas.every(e => e.status === 'COMPLETADO');
        if (allEscalasDone && r.status !== 'COMPLETADO') {
          msg = 'Todas las escalas están completadas. Pulsa "GRABAR FINAL DE RUTA".';
          document.getElementById('btn-p04-grabar-fin')?.classList.add('highlight-step');
        } else if (r.status === 'COMPLETADO') {
          msg = 'Ruta finalizada. Regresa a programación con la flecha izquierda.';
        } else {
          msg = 'Pulsa el menú de 3 puntos (arriba derecha) y elige "Hoja de ruta".';
          document.getElementById('btn-p04-menu')?.classList.add('highlight-step');
        }
      }
    } else if (isVisible('view-p05')) {
      const pendingEsc = r.escalas.find(e => e.status !== 'COMPLETADO');
      if (pendingEsc) {
        msg = `Toca la escala "${pendingEsc.name}" para registrarla.`;
      } else {
        msg = 'Todas las escalas listas. Regresa con la flecha a Inicio/Fin.';
      }
    } else if (isVisible('view-p07')) {
      const esc = r.escalas[this.state.selectedEscalaIdx];
      if (esc.isOrigin && !r.evidenciaAdjuntada) {
        msg = 'Lámina 59: Adjunta la evidencia fotográfica antes de marcar SALIDA.';
        document.getElementById('btn-p07-adjuntar-evidencia')?.classList.add('highlight-step');
      } else if (esc.isOrigin && r.evidenciaAdjuntada && !esc.salida) {
        msg = 'Evidencia lista: Pulsa el botón fucsia de "SALIDA".';
        document.getElementById('p07-btn-box-salida')?.classList.add('highlight-step');
      } else if (!esc.isOrigin && !esc.isDest && !esc.llegada) {
        msg = 'Marca la "LLEGADA" a la agencia.';
        document.getElementById('p07-btn-box-llegada')?.classList.add('highlight-step');
      } else if (!esc.isOrigin && !esc.isDest && esc.llegada && !esc.salida) {
        msg = 'Marca la "SALIDA" de la agencia.';
        document.getElementById('p07-btn-box-salida')?.classList.add('highlight-step');
      } else if (esc.isDest && !esc.llegada) {
        msg = 'Marca la "LLEGADA" al destino final.';
        document.getElementById('p07-btn-box-llegada')?.classList.add('highlight-step');
      } else if (esc.isDest && esc.llegada && esc.status !== 'COMPLETADO') {
        msg = 'Primer Cierre (Lámina 60): Pulsa "CONFIRMAR CIERRE DE ESCALA".';
        document.getElementById('btn-p07-cierre-escala')?.classList.add('highlight-step');
      } else {
        msg = 'Escala finalizada. Regresa con la flecha superior.';
      }
    }

    textEl.innerText = msg;
  },

  bindEvents() {
    document.getElementById('btn-to-programacion')?.addEventListener('click', () => this.showScreen('P02'));
    document.getElementById('btn-back-to-p01')?.addEventListener('click', () => this.showScreen('P01'));

    document.getElementById('btn-p04-menu')?.addEventListener('click', (e) => {
      e.stopPropagation();
      soundFx.tap();
      document.getElementById('dropdown-p04-menu')?.classList.toggle('hidden');
    });
    window.addEventListener('click', () => this.closeDropdown());

    this.initSwipeHandlers();
  },

  closeDropdown() {
    const dd = document.getElementById('dropdown-p04-menu');
    if (dd) dd.classList.add('hidden');
  },

  goToHojaRuta() {
    this.closeDropdown();
    this.renderEscalasView();
    this.showScreen('P05');
  },

  initSwipeHandlers() {
    document.querySelectorAll('.swipe-row').forEach(row => {
      if (row.dataset.swipeBound === 'true') return;
      row.dataset.swipeBound = 'true';

      let startX = 0;
      let startY = 0;

      row.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }, { passive: true });

      row.addEventListener('touchmove', e => {
        const diffX = startX - e.touches[0].clientX;
        const diffY = Math.abs(startY - e.touches[0].clientY);
        if (diffY > Math.abs(diffX)) return;

        if (diffX > 40) {
          row.classList.add(row.classList.contains('escala-row') ? 'open-escalas' : 'open-programacion');
          this.state.swipeTriggered = true;
        } else if (diffX < -30) {
          row.classList.remove('open-escalas', 'open-programacion');
        }
      }, { passive: true });

      row.addEventListener('touchend', () => {
        setTimeout(() => { this.state.swipeTriggered = false; }, 80);
      });

      let isDown = false;
      row.addEventListener('mousedown', e => {
        isDown = true;
        startX = e.clientX;
      });

      window.addEventListener('mousemove', e => {
        if (!isDown) return;
        if (startX - e.clientX > 40) {
          row.classList.add(row.classList.contains('escala-row') ? 'open-escalas' : 'open-programacion');
          isDown = false;
          this.state.swipeTriggered = true;
          setTimeout(() => { this.state.swipeTriggered = false; }, 120);
        }
      });

      window.addEventListener('mouseup', () => {
        isDown = false;
      });
    });
  },

  handleCardClick(event, routeKey) {
    if (this.state.swipeTriggered) return;
    this.actionProgramacionIngresar(routeKey);
  },

  handleEscalaCardClick(event, idx) {
    if (this.state.swipeTriggered) return;
    this.actionEscalaClick(idx);
  },

  actionProgramacionIngresar(routeKey) {
    const r = this.state.routes[routeKey];
    if (r.status === 'BLOQUEADO') {
      soundFx.alert();
      alert('Debe completar la RUTA IDA para acceder al retorno (Lámina 62 de capacitación).');
      return;
    }
    soundFx.tap();
    this.state.activeRouteKey = routeKey;

    if (r.status === 'PENDIENTE') {
      const p03Txt = document.getElementById('modal-p03-text');
      if (p03Txt) p03Txt.innerText = `Está seguro iniciar la ruta: ${r.title} se registrará la fecha y hora.`;
      document.getElementById('modal-p03')?.classList.remove('hidden');
    } else {
      this.setupP04();
      this.showScreen('P04');
    }
  },

  confirmModalP03() {
    soundFx.tap();
    document.getElementById('modal-p03')?.classList.add('hidden');
    this.setupP04();
    this.showScreen('P04');
  },

  setupP04() {
    const r = this.state.routes[this.state.activeRouteKey];
    const hTitle = document.getElementById('p04-header-title');
    if (hTitle) {
      hTitle.innerText = this.state.activeRouteKey === 'IDA' ? 'IDA - HUACHIPA CO - LA MA...' : 'RET - LA MARINA - HUACHIPA 1';
    }
    const kmIn = document.getElementById('input-p04-km-inicio');
    if (kmIn) kmIn.value = r.kmInicio;
    const canIn = document.getElementById('input-p04-candados-inicio');
    if (canIn) canIn.value = r.candados;

    const btnGrabarInicio = document.getElementById('btn-p04-grabar-inicio');
    const pencilInicio = document.getElementById('p04-pencil-inicio');

    if (r.status === 'PROCESO' || r.status === 'COMPLETADO') {
      pencilInicio?.classList.remove('hidden');
      btnGrabarInicio?.classList.add('bg-slate-400', 'cursor-not-allowed');
      if (btnGrabarInicio) btnGrabarInicio.disabled = true;
    } else {
      pencilInicio?.classList.add('hidden');
      btnGrabarInicio?.classList.remove('bg-slate-400', 'cursor-not-allowed');
      if (btnGrabarInicio) btnGrabarInicio.disabled = false;
    }

    const boxFin = document.getElementById('box-p04-fin-ruta');
    const btnFin = document.getElementById('btn-p04-grabar-fin');
    const kmFinInput = document.getElementById('input-p04-km-fin');
    const candadosFinInput = document.getElementById('input-p04-candados-fin');
    const pencilFin = document.getElementById('p04-pencil-fin');

    const allEscalasDone = r.escalas.every(e => e.status === 'COMPLETADO');
    if (allEscalasDone && r.status !== 'COMPLETADO') {
      boxFin?.classList.remove('opacity-50');
      if (kmFinInput) {
        kmFinInput.disabled = false;
        kmFinInput.value = r.kmFin;
      }
      if (candadosFinInput) candadosFinInput.disabled = false;
      if (btnFin) {
        btnFin.disabled = false;
        btnFin.classList.remove('bg-slate-400', 'cursor-not-allowed');
        btnFin.classList.add('bg-app-header', 'hover:bg-blue-900');
      }
      pencilFin?.classList.add('hidden');
    } else if (r.status === 'COMPLETADO') {
      boxFin?.classList.remove('opacity-50');
      pencilFin?.classList.remove('hidden');
      if (btnFin) {
        btnFin.classList.add('bg-slate-400', 'cursor-not-allowed');
        btnFin.disabled = true;
      }
    } else {
      boxFin?.classList.add('opacity-50');
      if (kmFinInput) kmFinInput.disabled = true;
      if (candadosFinInput) candadosFinInput.disabled = true;
      if (btnFin) {
        btnFin.disabled = true;
        btnFin.classList.add('bg-slate-400');
      }
      pencilFin?.classList.add('hidden');
    }

    this.updateGuiaPaso();
  },

  submitP04Inicio() {
    soundFx.tap();
    const r = this.state.routes[this.state.activeRouteKey];
    const txt = document.getElementById('modal-confirm-inicio-txt');
    if (txt) txt.innerText = `Está seguro iniciar el proceso de INICIO DE RUTA ${r.title}`;
    document.getElementById('modal-confirm-inicio')?.classList.remove('hidden');
  },

  confirmarInicioDefinitivo() {
    document.getElementById('modal-confirm-inicio')?.classList.add('hidden');
    const r = this.state.routes[this.state.activeRouteKey];
    r.status = 'PROCESO';

    if (this.state.activeRouteKey === 'IDA') {
      const badge = document.getElementById('badge-p02-ida');
      if (badge) {
        badge.innerText = 'PROCESO';
        badge.className = 'px-2 py-0.5 rounded text-[10px] font-black bg-app-ambar text-white';
      }
      const difKm = document.getElementById('lbl-p02-ida-difkm');
      if (difKm) difKm.innerText = `${r.kmInicio}`;
    } else {
      const badge = document.getElementById('badge-p02-ret');
      if (badge) {
        badge.innerText = 'PROCESO';
        badge.className = 'px-2 py-0.5 rounded text-[10px] font-black bg-app-ambar text-white';
      }
      const difKm = document.getElementById('lbl-p02-ret-difkm');
      if (difKm) difKm.innerText = `${r.kmInicio}`;
    }

    this.setupP04();
    this.openExitoModal('Inicio de ruta registrado con éxito.', () => {});
  },

  renderEscalasView() {
    const r = this.state.routes[this.state.activeRouteKey];
    const container = document.getElementById('p05-escalas-list');
    if (!container) return;
    container.innerHTML = '';
    const sub = document.getElementById('p05-subtitle');
    if (sub) sub.innerText = `- ${r.title}`;

    const totalEmb = r.escalas.reduce((acc, cur) => acc + cur.embarcados, 0);
    const totalGrt = r.escalas.reduce((acc, cur) => acc + cur.grt, 0);
    const embEl = document.getElementById('p05-total-embarcados');
    if (embEl) embEl.innerText = totalEmb || 413;
    const grtEl = document.getElementById('p05-total-grt');
    if (grtEl) grtEl.innerText = totalGrt || 395;

    r.escalas.forEach((esc, idx) => {
      const card = document.createElement('div');
      card.className = 'swipe-row escala-row rounded-xl shadow-sm border border-slate-300';

      let badgeBg = 'bg-app-fucsia text-white';
      if (esc.status === 'PROCESO') badgeBg = 'bg-app-ambar text-white';
      if (esc.status === 'COMPLETADO') badgeBg = 'bg-app-verde text-white';

      const thirdBtnTxt = esc.status === 'PROCESO' ? 'CANCELAR' : 'OMITIR';
      const thirdBtnIcon = esc.status === 'PROCESO' ? 'fa-xmark' : 'fa-ban';

      card.innerHTML = `
        <div class="swipe-btns">
          <button onclick="app.actionEscalaClick(${idx})" class="bg-app-btnMenu hover:bg-blue-600 text-white px-3 font-bold text-[10px] flex flex-col items-center justify-center space-y-1">
            <i class="fa-solid fa-arrow-right text-sm"></i>
            <span>INGRESAR</span>
          </button>
          <button onclick="soundFx.alert(); alert('Incidencia en ${esc.name}');" class="bg-indigo-800 text-white px-2.5 font-bold text-[10px] flex flex-col items-center justify-center space-y-1">
            <i class="fa-solid fa-triangle-exclamation text-sm"></i>
            <span>INCIDENCIA</span>
          </button>
          <button onclick="soundFx.alert(); alert('${thirdBtnTxt} en ${esc.name}');" class="bg-red-600 text-white px-2.5 font-bold text-[10px] flex flex-col items-center justify-center space-y-1">
            <i class="fa-solid ${thirdBtnIcon} text-sm"></i>
            <span>${thirdBtnTxt}</span>
          </button>
        </div>

        <div onclick="app.handleEscalaCardClick(event, ${idx})" class="swipe-body p-3 space-y-2 hover:bg-slate-50 active:bg-slate-100 transition">
          <div class="flex justify-between items-start">
            <span class="px-2 py-0.5 rounded bg-app-slateTag text-white text-[10px] font-bold">
              ${esc.name}
            </span>
            <span class="px-2 py-0.5 rounded text-[10px] font-black ${badgeBg}">
              ${esc.status}
            </span>
          </div>

          <div class="text-[11px] font-mono font-bold text-slate-700 flex items-center space-x-1">
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-blue-600"></i>
            <span>${esc.km} Km</span>
          </div>

          <div class="bg-slate-100 rounded-lg p-2 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-700">
            <div>
              <span class="text-blue-600 font-bold block text-[9px]">&rsaquo; LLEGADA ESTABLECIDA</span>
              <span>${esc.llegadaPrev}</span>
            </div>
            <div>
              <span class="text-blue-600 font-bold block text-[9px]">&rsaquo; LLEGADA REAL</span>
              <span>${esc.llegada ? esc.llegada.time : '--:--'}</span>
            </div>
            <div>
              <span class="text-blue-600 font-bold block text-[9px]">&rsaquo; SALIDA ESTABLECIDA</span>
              <span>${esc.salidaPrev}</span>
            </div>
            <div>
              <span class="text-blue-600 font-bold block text-[9px]">&rsaquo; SALIDA REAL</span>
              <span>${esc.salida ? esc.salida.time : '--:--'}</span>
            </div>
          </div>

          <div class="flex justify-between text-[9px] text-slate-500 font-mono">
            <span>T. ATENCIÓN ESTABLECIDA: 01:00 H</span>
            <span>REAL: -</span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-center pt-0.5 font-mono">
            <div>
              <span class="text-[9px] text-amber-600 font-bold block uppercase">CANT. EMBARCADOS:</span>
              <div class="mt-0.5 py-0.5 px-3 bg-cyan-100/70 border border-cyan-200 rounded text-cyan-800 font-bold text-xs inline-block min-w-[32px]">
                ${esc.embarcados}
              </div>
            </div>
            <div>
              <span class="text-[9px] text-amber-600 font-bold block uppercase">CANT. GRT EMITIDAS:</span>
              <div class="mt-0.5 py-0.5 px-3 bg-cyan-100/70 border border-cyan-200 rounded text-cyan-800 font-bold text-xs inline-block min-w-[32px]">
                ${esc.grt}
              </div>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    this.initSwipeHandlers();
    this.updateGuiaPaso();
  },

  actionEscalaClick(idx) {
    this.state.selectedEscalaIdx = idx;
    const r = this.state.routes[this.state.activeRouteKey];
    const esc = r.escalas[idx];
    soundFx.tap();

    if (esc.status === 'PENDIENTE') {
      const p06Txt = document.getElementById('modal-p06-text');
      if (p06Txt) p06Txt.innerText = `Está seguro iniciar la escala: ${esc.name} se dará inicio a la escala esta acción es irreversible.`;
      document.getElementById('modal-p06')?.classList.remove('hidden');
    } else {
      this.setupP07();
      this.showScreen('P07');
    }
  },

  confirmarInicioEscala() {
    soundFx.tap();
    document.getElementById('modal-p06')?.classList.add('hidden');
    const r = this.state.routes[this.state.activeRouteKey];
    const esc = r.escalas[this.state.selectedEscalaIdx];
    esc.status = 'PROCESO';
    this.setupP07();
    this.showScreen('P07');
  },

  setupP07() {
    const r = this.state.routes[this.state.activeRouteKey];
    const esc = r.escalas[this.state.selectedEscalaIdx];

    const titleEl = document.getElementById('p07-title');
    if (titleEl) titleEl.innerText = `ESCALA: ${esc.name}`;
    const subEl = document.getElementById('p07-sub');
    if (subEl) subEl.innerText = `- ${r.title}`;
    const bultosEl = document.getElementById('p07-bultos-text');
    if (bultosEl) bultosEl.innerText = `${esc.embarcados} Paquetes ${esc.grt} Guias`;

    const boxLlegada = document.getElementById('p07-btn-box-llegada');
    const boxSalida = document.getElementById('p07-btn-box-salida');
    const btnCierre = document.getElementById('btn-p07-cierre-escala');
    const btnEvidencia = document.getElementById('btn-p07-adjuntar-evidencia');
    const boxEvidenciaStatus = document.getElementById('box-evidencia-status');

    // Estado del botón y badge de Evidencia (Sólo origen requiere evidencia según Canva 59)
    if (esc.isOrigin) {
      btnEvidencia?.classList.remove('hidden');
      if (r.evidenciaAdjuntada) {
        boxEvidenciaStatus?.classList.remove('hidden');
      } else {
        boxEvidenciaStatus?.classList.add('hidden');
      }
    } else {
      btnEvidencia?.classList.add('hidden');
      boxEvidenciaStatus?.classList.add('hidden');
    }

    // LLEGADA
    if (esc.isOrigin) {
      if (boxLlegada) {
        boxLlegada.className = 'p-2.5 rounded-xl bg-slate-300 text-slate-500 cursor-not-allowed text-left flex flex-col justify-between h-20';
        boxLlegada.disabled = true;
      }
      document.getElementById('p07-txt-llegada-fecha').innerText = '2026-06-19';
      document.getElementById('p07-txt-llegada-hora').innerText = '--:--';
      document.getElementById('p07-txt-llegada-km').innerText = 'N/A';
    } else if (esc.llegada) {
      if (boxLlegada) {
        boxLlegada.className = 'p-2.5 rounded-xl bg-slate-300 text-slate-600 cursor-not-allowed text-left flex flex-col justify-between h-20 shadow-none';
        boxLlegada.disabled = true;
      }
      document.getElementById('p07-txt-llegada-fecha').innerText = '2026-06-19';
      document.getElementById('p07-txt-llegada-hora').innerText = esc.llegada.time;
      document.getElementById('p07-txt-llegada-km').innerText = `${esc.km}Km`;
    } else {
      if (boxLlegada) {
        boxLlegada.className = 'p-2.5 rounded-xl bg-app-llegada text-white text-left shadow flex flex-col justify-between h-20 active:scale-95';
        boxLlegada.disabled = false;
      }
      document.getElementById('p07-txt-llegada-fecha').innerText = '2026-06-19';
      document.getElementById('p07-txt-llegada-hora').innerText = '12:01';
      document.getElementById('p07-txt-llegada-km').innerText = `${esc.km}Km`;
    }

    // SALIDA Y BOTÓN DE CIERRE
    if (esc.isDest) {
      if (boxSalida) {
        boxSalida.className = 'p-2.5 rounded-xl bg-slate-300 text-slate-500 cursor-not-allowed text-left flex flex-col justify-between h-20';
        boxSalida.disabled = true;
      }
      document.getElementById('p07-txt-salida-fecha').innerText = '2026-06-19';
      document.getElementById('p07-txt-salida-hora').innerText = '--:--';
      document.getElementById('p07-txt-salida-km').innerText = 'N/A';
      if (esc.llegada && esc.status !== 'COMPLETADO') {
        btnCierre?.classList.remove('hidden');
      } else {
        btnCierre?.classList.add('hidden');
      }
    } else if (esc.salida) {
      if (boxSalida) {
        boxSalida.className = 'p-2.5 rounded-xl bg-slate-300 text-slate-600 cursor-not-allowed text-left flex flex-col justify-between h-20 shadow-none';
        boxSalida.disabled = true;
      }
      btnCierre?.classList.add('hidden');
      document.getElementById('p07-txt-salida-fecha').innerText = '2026-06-19';
      document.getElementById('p07-txt-salida-hora').innerText = esc.salida.time;
      document.getElementById('p07-txt-salida-km').innerText = `${esc.km}Km`;
    } else {
      if (boxSalida) {
        boxSalida.className = 'p-2.5 rounded-xl bg-app-fucsia text-white text-left shadow flex flex-col justify-between h-20 active:scale-95';
        boxSalida.disabled = false;
      }
      btnCierre?.classList.add('hidden');
      document.getElementById('p07-txt-salida-fecha').innerText = '2026-06-19';
      document.getElementById('p07-txt-salida-hora').innerText = '12:01';
      document.getElementById('p07-txt-salida-km').innerText = `${esc.km}Km`;
    }

    this.updateGuiaPaso();
  },

  handleLlegadaClick() {
    const r = this.state.routes[this.state.activeRouteKey];
    const esc = r.escalas[this.state.selectedEscalaIdx];
    if (esc.isOrigin || esc.llegada) return;

    soundFx.tap();
    document.getElementById('modal-p08-title').innerText = `LLEGADA: ${esc.name}`;
    document.getElementById('modal-p08-sub').innerText = `Registre el proceso de LLEGADA: para - ${r.title}`;
    document.getElementById('input-p08-km').value = esc.km;
    document.getElementById('modal-p08-clock').innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('modal-p08')?.classList.remove('hidden');
  },

  handleSalidaClick() {
    const r = this.state.routes[this.state.activeRouteKey];
    const esc = r.escalas[this.state.selectedEscalaIdx];
    if (esc.isDest || esc.salida) return;

    // ALERTA DE EVIDENCIA EN PRIMERA SALIDA (CANVA PÁG 59)
    if (esc.isOrigin && !r.evidenciaAdjuntada) {
      soundFx.alert();
      document.getElementById('modal-alerta-evidencia')?.classList.remove('hidden');
      return;
    }

    soundFx.tap();
    document.getElementById('modal-p09-title').innerText = `SALIDA: ${esc.name}`;
    document.getElementById('modal-p09-sub').innerText = r.title;
    document.getElementById('input-p09-km').value = esc.km;
    document.getElementById('modal-p09-clock').innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('modal-p09')?.classList.remove('hidden');
  },

  irDirectoAdjuntarEvidencia() {
    soundFx.tap();
    document.getElementById('modal-alerta-evidencia')?.classList.add('hidden');
    this.openModalFoto();
  },

  openModalFoto() {
    soundFx.tap();
    this.state.fotoTomada = false;
    document.getElementById('foto-preview-box')?.classList.remove('hidden');
    document.getElementById('foto-capturada-box')?.classList.add('hidden');
    document.getElementById('foto-video-container')?.classList.add('hidden');

    const btnConf = document.getElementById('btn-confirmar-foto');
    if (btnConf) {
      btnConf.disabled = true;
      btnConf.className = 'flex-1 py-2.5 bg-slate-300 text-slate-500 font-bold rounded-lg text-xs transition flex items-center justify-center space-x-1';
    }
    document.getElementById('modal-foto')?.classList.remove('hidden');
  },

  closeModalFoto() {
    soundFx.tap();
    this.stopCamera();
    document.getElementById('modal-foto')?.classList.add('hidden');
  },

  // Activar cámara real si el navegador y dispositivo la soportan
  async activarCamaraReal() {
    try {
      const constraints = {
        video: { facingMode: { ideal: 'environment' } },
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.state.cameraStream = stream;
      const video = document.getElementById('camera-feed');
      if (video) {
        video.srcObject = stream;
        video.play();
        document.getElementById('foto-preview-box')?.classList.add('hidden');
        document.getElementById('foto-capturada-box')?.classList.add('hidden');
        document.getElementById('foto-video-container')?.classList.remove('hidden');
      }
    } catch (err) {
      console.warn('No se pudo acceder a la cámara:', err);
      alert('No se pudo acceder a la cámara en este dispositivo. Usando foto simulada.');
      this.simularTomaFoto();
    }
  },

  stopCamera() {
    if (this.state.cameraStream) {
      this.state.cameraStream.getTracks().forEach(track => track.stop());
      this.state.cameraStream = null;
    }
    const video = document.getElementById('camera-feed');
    if (video) video.srcObject = null;
  },

  capturarFotoCamaraReal() {
    const video = document.getElementById('camera-feed');
    const canvas = document.getElementById('camera-canvas');
    if (!video || !canvas) {
      this.simularTomaFoto();
      return;
    }

    soundFx.shutter();
    this.dispararFlash();

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');

    this.stopCamera();
    this.state.fotoTomada = true;
    this.state.fotoDataUrl = dataUrl;

    const capturadaBox = document.getElementById('foto-capturada-box');
    if (capturadaBox) {
      capturadaBox.style.backgroundImage = `url('${dataUrl}')`;
      capturadaBox.classList.remove('hidden');
    }
    document.getElementById('foto-video-container')?.classList.add('hidden');

    const btnConf = document.getElementById('btn-confirmar-foto');
    if (btnConf) {
      btnConf.disabled = false;
      btnConf.className = 'flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow transition flex items-center justify-center space-x-1 active:scale-95';
    }
  },

  simularTomaFoto() {
    soundFx.shutter();
    this.dispararFlash();

    this.stopCamera();
    this.state.fotoTomada = true;
    document.getElementById('foto-preview-box')?.classList.add('hidden');
    document.getElementById('foto-video-container')?.classList.add('hidden');

    const capturadaBox = document.getElementById('foto-capturada-box');
    if (capturadaBox) {
      capturadaBox.style.backgroundImage = `url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80')`;
      capturadaBox.classList.remove('hidden');
    }

    const btnConf = document.getElementById('btn-confirmar-foto');
    if (btnConf) {
      btnConf.disabled = false;
      btnConf.className = 'flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow transition flex items-center justify-center space-x-1 active:scale-95';
    }
  },

  dispararFlash() {
    const flash = document.getElementById('camera-flash-overlay');
    if (flash) {
      flash.classList.remove('flash-active');
      void flash.offsetWidth;
      flash.classList.add('flash-active');
    }
  },

  confirmarFotoEvidencia() {
    if (!this.state.fotoTomada) return;
    this.stopCamera();
    const r = this.state.routes[this.state.activeRouteKey];
    r.evidenciaAdjuntada = true;
    document.getElementById('modal-foto')?.classList.add('hidden');

    this.openExitoModal('Evidencia fotográfica adjuntada con éxito. Ahora puede marcar su SALIDA.', () => {
      this.setupP07();
    });
  },

  submitModalLlegada() {
    document.getElementById('modal-p08')?.classList.add('hidden');
    const r = this.state.routes[this.state.activeRouteKey];
    const esc = r.escalas[this.state.selectedEscalaIdx];
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    esc.llegada = { time: nowTime };

    this.openExitoModal('Llegada registrada con exito!', () => {
      this.setupP07();
    });
  },

  submitModalSalida() {
    document.getElementById('modal-p09')?.classList.add('hidden');
    const r = this.state.routes[this.state.activeRouteKey];
    const esc = r.escalas[this.state.selectedEscalaIdx];
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    esc.salida = { time: nowTime };
    esc.status = 'COMPLETADO';

    this.openExitoModal('Salida registrada con exito!', () => {
      this.setupP07();
    });
  },

  // PRIMER CIERRE: CIERRE DE ESCALA (CANVA PÁG 60)
  submitCierreEscala() {
    const r = this.state.routes[this.state.activeRouteKey];
    const esc = r.escalas[this.state.selectedEscalaIdx];
    esc.status = 'COMPLETADO';

    this.openExitoModal('Primer Cierre: Escala finalizada con éxito.', () => {
      this.setupP07();
    });
  },

  backFromP07() {
    soundFx.tap();
    this.renderEscalasView();
    this.showScreen('P05');
  },

  backFromP05() {
    soundFx.tap();
    this.setupP04();
    this.showScreen('P04');
  },

  backFromP04() {
    soundFx.tap();
    this.showScreen('P02');
  },

  submitP04Fin() {
    soundFx.tap();
    const r = this.state.routes[this.state.activeRouteKey];
    const txt = document.getElementById('modal-confirm-fin-txt');
    if (txt) txt.innerText = `Está seguro iniciar el proceso de FIN DE RUTA ${r.title}`;
    document.getElementById('modal-confirm-fin')?.classList.remove('hidden');
  },

  procesarCargandoFin() {
    soundFx.tap();
    document.getElementById('modal-confirm-fin')?.classList.add('hidden');
    document.getElementById('modal-cargando')?.classList.remove('hidden');
  },

  mostrarExitoFin() {
    document.getElementById('modal-cargando')?.classList.add('hidden');
    this.openExitoModal('Segundo Cierre: Final de ruta registrado con éxito.', () => {
      this.completarRutaActual();
    });
  },

  // SEGUNDO CIERRE Y DESBLOQUEO DE RETORNO (CANVA PÁG 61-62)
  completarRutaActual() {
    const key = this.state.activeRouteKey;
    const r = this.state.routes[key];
    r.status = 'COMPLETADO';

    document.getElementById('p04-pencil-fin')?.classList.remove('hidden');
    const btnFin = document.getElementById('btn-p04-grabar-fin');
    if (btnFin) {
      btnFin.classList.remove('bg-app-header', 'hover:bg-blue-900');
      btnFin.classList.add('bg-slate-400', 'cursor-not-allowed');
      btnFin.disabled = true;
    }

    if (key === 'IDA') {
      // Desbloquear RETORNO (Lámina 62)
      const rRet = this.state.routes.RET;
      rRet.status = 'PENDIENTE';
      const cardRet = document.getElementById('card-p02-ret');
      if (cardRet) cardRet.classList.remove('opacity-60');

      const badgeRet = document.getElementById('badge-p02-ret');
      if (badgeRet) {
        badgeRet.innerText = 'PENDIENTE';
        badgeRet.className = 'px-2 py-0.5 rounded text-[10px] font-black bg-app-fucsia text-white';
      }

      const badgeIda = document.getElementById('badge-p02-ida');
      if (badgeIda) {
        badgeIda.innerText = 'COMPLETADO';
        badgeIda.className = 'px-2 py-0.5 rounded text-[10px] font-black bg-app-verde text-white';
      }
      document.getElementById('p02-ida-details-closed')?.classList.remove('hidden');
    } else {
      const badgeRet = document.getElementById('badge-p02-ret');
      if (badgeRet) {
        badgeRet.innerText = 'COMPLETADO';
        badgeRet.className = 'px-2 py-0.5 rounded text-[10px] font-black bg-app-verde text-white';
      }
      document.getElementById('p02-ret-details-closed')?.classList.remove('hidden');
    }

    this.updateGuiaPaso();
  },

  openExitoModal(msg, callback) {
    soundFx.success();
    const msgEl = document.getElementById('modal-exito-mensaje');
    if (msgEl) msgEl.innerText = msg;
    document.getElementById('modal-exito')?.classList.remove('hidden');
    this._callback = callback;
  },

  cerrarModalExito() {
    soundFx.tap();
    document.getElementById('modal-exito')?.classList.add('hidden');
    if (this._callback) {
      this._callback();
      this._callback = null;
    }
    this.updateGuiaPaso();
  },

  reset() {
    soundFx.alert();
    if (confirm('¿Desea reiniciar la práctica de capacitación?')) {
      window.location.reload();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => app.init());
