/**
 * ========================================================
 * APP SHALOM CHOFERES - MOTOR DE SIMULACIÓN Y CAPACITACIÓN
 * ========================================================
 */

// Motor de respuesta háptica real (vibración nativa en celular)
const haptics = {
  light() {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(12); } catch (e) {}
    }
  },
  medium() {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(25); } catch (e) {}
    }
  },
  success() {
    if ('vibrate' in navigator) {
      try { navigator.vibrate([15, 60, 25]); } catch (e) {}
    }
  },
  alert() {
    if ('vibrate' in navigator) {
      try { navigator.vibrate([35, 75, 35]); } catch (e) {}
    }
  }
};

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
    haptics.light();
    this.playTone(600, 'sine', 0.05, 0.08);
  },

  success() {
    haptics.success();
    if (!this.enabled) return;
    setTimeout(() => this.playTone(523.25, 'triangle', 0.1, 0.15), 0); // C5
    setTimeout(() => this.playTone(659.25, 'triangle', 0.1, 0.15), 100); // E5
    setTimeout(() => this.playTone(783.99, 'triangle', 0.25, 0.2), 200); // G5
  },

  shutter() {
    haptics.medium();
    if (!this.enabled) return;
    this.playTone(1200, 'square', 0.04, 0.25);
    setTimeout(() => this.playTone(800, 'sawtooth', 0.08, 0.2), 50);
  },

  alert() {
    haptics.alert();
    if (!this.enabled) return;
    this.playTone(300, 'sawtooth', 0.15, 0.2);
    setTimeout(() => this.playTone(250, 'sawtooth', 0.15, 0.2), 150);
  }
};

const KNOWN_DRIVERS = {
  "10106710": {
    "name": "MIGUEL GELACIO GONZALES CASTRO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "934912266"
  },
  "40333818": {
    "name": "JUAN CARLOS CURAY CHUMO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "904187580"
  },
  "40577547": {
    "name": "ROGER ROLANDO CAÑARI TORREJON",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "963004164"
  },
  "40740033": {
    "name": "HERNAN SANTANA ONOFRE",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "927169419"
  },
  "41422665": {
    "name": "EDWIN MELCHOR GALARZA AMARILLO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "953873549"
  },
  "41996764": {
    "name": "DANIEL MENA QUEREVALU",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "939747131"
  },
  "42302289": {
    "name": "MILTON ENRRIQUE MAGUIÑA HUERTA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "997856489"
  },
  "42303794": {
    "name": "MANUEL ANTONIO COLCA YALICO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "903505836"
  },
  "42360200": {
    "name": "HEBERT MARTIN JULCAPOMA VILCARANA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "989641254"
  },
  "42389591": {
    "name": "LUIGY GINO RETAMOZO REYNOSO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "930968219"
  },
  "42404170": {
    "name": "ANGELO HUMBERTO LOPEZ TINTA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "993763213"
  },
  "42701498": {
    "name": "JUAN PABLO PAUCAR MEJIA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "973713582"
  },
  "42965493": {
    "name": "HEBERT CHUQUILIN ESPINOZA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "951252786"
  },
  "43288288": {
    "name": "GILBERT VERA CAMPOS",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "922406301"
  },
  "43392311": {
    "name": "JORGE WASHIGTON VEGAS AGUIRRE",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "960 170 062"
  },
  "43513263": {
    "name": "LUIS ENRIQUE BUENO DUEÑAS",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "926483187"
  },
  "43764195": {
    "name": "MOISES AUQUI RAMOS",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "968185913"
  },
  "44326525": {
    "name": "JHON ALBERTO SANCHEZ FALCON",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "985754522"
  },
  "44423382": {
    "name": "CARLOS ABRAHN MUÑOZ ZEGOVIA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "961156344"
  },
  "44903968": {
    "name": "LUIS FERNANDO CORDOVA GUERRERO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "941868335"
  },
  "45057058": {
    "name": "LUIS ALBERTO ESCAJADILLO ALMESTAR",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "904376841"
  },
  "45089929": {
    "name": "PEDRO GUSTAVO PORRAS RAMOS",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "944114068"
  },
  "45507420": {
    "name": "DIEGO EDUARDO SAAVEDRA SILVA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "917248968"
  },
  "45690081": {
    "name": "EDINSON PUELLES OYIYA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "920900170"
  },
  "45932077": {
    "name": "REYNER CHOCCELAHUA LLACCTA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "992091500"
  },
  "46069954": {
    "name": "JOSE LUIS MOSQUERA ALDANA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "934845475"
  },
  "46211892": {
    "name": "LENIN STALIN LEON ROJAS",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "910106187"
  },
  "46479260": {
    "name": "WILSON RAMOS JANAMPA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "910601499"
  },
  "46492414": {
    "name": "FERNANDO CANCHURICRA SINCHE",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "902794114"
  },
  "46571842": {
    "name": "DANIEL VARGAS FERRO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "998182665"
  },
  "46587445": {
    "name": "HECTOR ALBERTO CCALLONCUNTO CONDE",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "993317555"
  },
  "46639246": {
    "name": "CESAR AUGUSTO DEL AGUILA FALCON",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "952958556"
  },
  "46793998": {
    "name": "BRUCE VENTURA PANDURO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "957383204"
  },
  "46944425": {
    "name": "JUAN CARLOS CORDOVA RAMOS",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "929073929"
  },
  "47000890": {
    "name": "ELDER RAUL CHUQUIMANGO GUEVARA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "915076085"
  },
  "47003571": {
    "name": "RAUL INGA SOLANO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "951126786"
  },
  "47118250": {
    "name": "PRIMITIVO AROSTEGUI ESTELA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "977740877"
  },
  "47329490": {
    "name": "NOLBERTO ARIRAMA LINARES",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "917008443"
  },
  "47366896": {
    "name": "EDUARDO NUÑEZ TRUJILLO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "960208512"
  },
  "47452936": {
    "name": "EZEQUIEL VARGAS FERRO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "918089685"
  },
  "47691101": {
    "name": "ALADINO MARTINEZ MONTALVO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "949365219"
  },
  "47766516": {
    "name": "JHON FELIX LLENQUE SILUPU",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "912200102"
  },
  "47767584": {
    "name": "JAIME YVAN CAMPOS MOLERO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "934060645"
  },
  "47894407": {
    "name": "JEEN MITCHEL NORIEGA MORI",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "991686702"
  },
  "48011571": {
    "name": "ERWIN RICHARD SIFUENTES AGREDA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "943742519"
  },
  "48145193": {
    "name": "RUBEN VILA HUAMAN",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "927558045"
  },
  "48173369": {
    "name": "LIMBER CRISTHIAN FIGUEREDO PUJAY",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "949669216"
  },
  "48220701": {
    "name": "CRISTHIAN JAVIER FLORES POMA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "993826089"
  },
  "48225143": {
    "name": "YERSON CARRASCO SAIRITUPAC",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "920327047"
  },
  "60296833": {
    "name": "OMAR IRVIN HUARACCALLO HUACCHO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "908020749"
  },
  "63726046": {
    "name": "JIMMY JONATHAN CUADROS PARRA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "981544189"
  },
  "70083118": {
    "name": "FREED WILLIAMS PHOWELL RAMOS",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "949924948"
  },
  "70088238": {
    "name": "CHRISTIAN RAUL MENDOZA QUINTO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "963 435 622"
  },
  "70332026": {
    "name": "JORGE PAUCAR ZUÑIGA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "986593503"
  },
  "70508996": {
    "name": "ELMER EDUARDO CHATE QUISPE",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "979807217"
  },
  "70679086": {
    "name": "ANDERSON PEREZ HUANCA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "927 931 876"
  },
  "70768168": {
    "name": "CHRISTOPHER JUNIOR REYES VERA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "916621099"
  },
  "70782447": {
    "name": "ANTHONY LEVI RIVERA CHOQUICAHUA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "906542795"
  },
  "70783477": {
    "name": "MELVIN CRIOLLO DIAZ",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "928456576"
  },
  "71194608": {
    "name": "VIDAL PARI ROJAS",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "988377153"
  },
  "71281515": {
    "name": "SEGUNDO MOISES RIOS MANIHUARI",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "989018310"
  },
  "71633954": {
    "name": "JEFERSON AQUINO FABIAN",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "992540945"
  },
  "71741520": {
    "name": "CRISTIAN GABRIEL MISARI CARHUANCHO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "980519489"
  },
  "71898153": {
    "name": "TEDDY TARAZONA COCA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "901075981"
  },
  "72128429": {
    "name": "RENZO MOISES CHAMAYA JIMENEZ",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "989334345"
  },
  "72248538": {
    "name": "DIONICIO GUERRERO RIMARACHIN",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "932176469"
  },
  "72779664": {
    "name": "JEFFERY MAYCK CALDERON PAULINO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "902131724"
  },
  "72837880": {
    "name": "CARLOS LEONARDO UGARTE VILCHEZ",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "902817275"
  },
  "73035802": {
    "name": "EDWARD HENRY PORRAS FLORES",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "924079741"
  },
  "73214755": {
    "name": "LUIS FERNANDO CULQUI CIRIACO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "929318929"
  },
  "73245756": {
    "name": "RONALDO JOE BERNAOLA VARGAS",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "908689331"
  },
  "73465477": {
    "name": "JORCH BRANDO REATEGUI OLORTEGUI",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "968754994"
  },
  "73537501": {
    "name": "CRHIS ALBERT CONDORI CCAPCHA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "942094186"
  },
  "73574925": {
    "name": "WILLIAM RONY RODRIGUEZ PRADA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "971267973"
  },
  "73595665": {
    "name": "EDUARDO KEVIN MALLQUI REYES",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "945953542"
  },
  "73936556": {
    "name": "DAVID FELIPE VILCHEZ MUÑOZ",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "902940288"
  },
  "74038328": {
    "name": "JAVIER MODEJA MERCADO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "964823370"
  },
  "74127697": {
    "name": "RONALDO SOLIS PACHECO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "982585663"
  },
  "74205363": {
    "name": "JORGE LUIS QUISPE HUAYHUAMEZA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "944 326 200"
  },
  "74393650": {
    "name": "JOSE MANUEL ISIDRO ROJAS",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "983141397"
  },
  "74501329": {
    "name": "EDUARDO DANIEL MONDRAGON CASTAÑEDA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "956736281"
  },
  "74604723": {
    "name": "RUBEN EVARISTO VENTURA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "924814720"
  },
  "74718709": {
    "name": "WILLIAM LUIS FERNANDEZ ROMAN",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "993556515"
  },
  "74729229": {
    "name": "LINDER BENANCIO LEANDRO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "977964583"
  },
  "74894346": {
    "name": "MOISES EDUARDO GUTIERREZ ALVA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "900886945"
  },
  "75050452": {
    "name": "JOSE LUIS MORENO MASHUCURI",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "930550688"
  },
  "75146634": {
    "name": "DARWIN ESMIT GUEVARA GONZALES",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "912068485"
  },
  "75206252": {
    "name": "JOSE FERNANDO QUISPE CUSIHUAMAN",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "938226459"
  },
  "75209436": {
    "name": "HAROLD MAEDSON RAMIREZ TOMAS",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "928443726"
  },
  "75246865": {
    "name": "JEAN CARLOS ARTEMIO TENORIO DIAZ",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "955096279"
  },
  "75388860": {
    "name": "DANILO ESPINOZA TRUJILLO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "987762129"
  },
  "75561465": {
    "name": "CHRISTIAN GABRIEL PARIONA YACE",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "901204075"
  },
  "75605509": {
    "name": "YILMER LORENZO EUSCATE GARCIA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "944154186"
  },
  "75776479": {
    "name": "RONALDIÑO DAMIAN SALAZAR TOLENTINO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "947781397"
  },
  "75904481": {
    "name": "JOHAN HUMBERTO CARHUAS ZUÑIGA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "948712293"
  },
  "75927527": {
    "name": "MARCO LEODAN LEYVA TASILLA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "948811002"
  },
  "76083716": {
    "name": "LEVI BENJAMIN MENDEZ PASTRANA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "926952186"
  },
  "76553171": {
    "name": "JHON ANTONY MIRAVAL GOMEZ",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "920418928"
  },
  "76742663": {
    "name": "JAYMY BRAYAN HERNANDEZ CALLE",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "945737019"
  },
  "76744865": {
    "name": "FERNANDO MIGUEL CCASANI SAEZ",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "904891899"
  },
  "76777678": {
    "name": "JOEL JOSEPH ANCELMO FLORES",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "925096353"
  },
  "76861996": {
    "name": "YERSON ROMERO GUTIERREZ",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "923397193"
  },
  "76958696": {
    "name": "IVAN ANCELMO FLORES",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "926571499"
  },
  "77129681": {
    "name": "CLINTON DANIEL FLORES ROJAS",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "981 930 905"
  },
  "77130356": {
    "name": "LUCHO RAUL POMA CONDOR",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "931993980"
  },
  "77131786": {
    "name": "NILTON GREGORIO MARCOS TRINIDAD",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "914667506"
  },
  "77333929": {
    "name": "JEFERSON ARTURO AQUINO URETA",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "902394691"
  },
  "77386840": {
    "name": "LUCIO VERDE CERVANTES",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "930278153"
  },
  "77416600": {
    "name": "JOSTIN ALONSO CAJAÑAUPA RIQUEZ",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "982241835"
  },
  "77499250": {
    "name": "LUIS LOPEZ CUADROS",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "988183351"
  },
  "77681316": {
    "name": "DAVID ADERIANO JUSTO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "946459405"
  },
  "77691498": {
    "name": "ANDY HUAMANI SARMIENTO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "902 277 381"
  },
  "77923353": {
    "name": "BORIS AUGUSTO SUAREZ ESPEJO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "906199450"
  },
  "79380918": {
    "name": "VLADIMIRO ANGEL QUISPE YGNACIO",
    "categoria": "A3C",
    "grupo": "HUACHIPA CO",
    "celular": "970133315"
  },
  "99999999": {
    "name": "pruebashalom",
    "categoria": "A3C",
    "grupo": "CAPACITACION-SHALOM",
    "placa": "CCY-904",
    "celular": "999888777"
  }
};

function getFreshRoutes(isDemo) {
  return {
    IDA: {
      title: 'IDA - HUACHIPA CO - LA MARINA - MAGDALENA AYACUCHO 2',
      progNumber: '948836',
      status: 'PENDIENTE',
      kmInicio: isDemo ? 29726 : '',
      kmFin: isDemo ? 29764 : '',
      candados: isDemo ? 2 : '',
      candadosFin: isDemo ? 2 : '',
      evidenciaAdjuntada: false,
      escalas: [
        { name: 'HUACHIPA CO', isOrigin: true, isDest: false, status: 'PENDIENTE', km: isDemo ? 29726 : '', llegada: null, salida: null, precinto: isDemo ? '0094821' : '', embarcados: 97, grt: 95, llegadaPrev: '--:--', salidaPrev: '12:50' },
        { name: 'MAGDALENA DEL MAR', isOrigin: false, isDest: false, status: 'PENDIENTE', km: isDemo ? 29762 : '', llegada: null, salida: null, precinto: isDemo ? '0094822' : '', embarcados: 0, grt: 0, llegadaPrev: '13:00', salidaPrev: '13:10' },
        { name: 'AV. LA MARINA', isOrigin: false, isDest: true, status: 'PENDIENTE', km: isDemo ? 29764 : '', llegada: null, salida: null, precinto: '', embarcados: 0, grt: 0, llegadaPrev: '13:30', salidaPrev: '--:--' }
      ]
    },
    RET: {
      title: 'RET- LA MARINA - HUACHIPA 1',
      progNumber: '948836',
      status: 'BLOQUEADO',
      kmInicio: isDemo ? 29764 : '',
      kmFin: isDemo ? 29800 : '',
      candados: isDemo ? 2 : '',
      candadosFin: isDemo ? 2 : '',
      evidenciaAdjuntada: false,
      escalas: [
        { name: 'AV. LA MARINA', isOrigin: true, isDest: false, status: 'PENDIENTE', km: isDemo ? 29764 : '', llegada: null, salida: null, precinto: isDemo ? '0094850' : '', embarcados: 370, grt: 368, llegadaPrev: '--:--', salidaPrev: '15:00' },
        { name: 'HUACHIPA CO', isOrigin: false, isDest: true, status: 'PENDIENTE', km: isDemo ? 29800 : '', llegada: null, salida: null, precinto: '', embarcados: 0, grt: 0, llegadaPrev: '15:30', salidaPrev: '--:--' }
      ]
    }
  };
}

const app = {
  state: {
    isDemoMode: true,
    activeRouteKey: 'IDA',
    selectedEscalaIdx: 0,
    swipeTriggered: false,
    driverDni: '99999999',
    driverName: 'pruebashalom',
    driverCategoria: 'A2B',
    driverGrupo: 'SUCURSALES-HUACHIPA',
    driverPlaca: 'BFS-863',
    driverCelular: '',
    fotoTomada: false,
    fotoDataUrl: null,
    modoGuiado: false,
    currentStepIdx: 1,
    cameraStream: null,
    profiles: {},
    routes: getFreshRoutes(true)
  },

  init() {
    this.loadProfilesFromStorage();
    this.bindEvents();
    this.initFontSize();
    this.renderEscalasView();
    this.startClock();
    this.updateGuiaPaso();
    this.flushPendingErrors();

    // Registrar Service Worker para PWA (offline)
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      navigator.serviceWorker.register('./sw.js').then(reg => {
        reg.update();
      }).catch(err => {
        console.log('SW no registrado:', err);
      });
    }
  },

  getNowDateStr() {
    if (this.state.isDemoMode) return '2026-06-19';
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  },

  getNowTimeStr(withSeconds = true) {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return withSeconds ? `${hh}:${min}:${ss}` : `${hh}:${min}`;
  },

  startClock() {
    const updateTime = () => {
      const d = new Date();
      const shortTime = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const clockEl = document.getElementById('top-clock');
      if (clockEl) clockEl.innerText = shortTime;

      const dateStr = this.getNowDateStr();
      const fullTimeStr = this.state.isDemoMode ? '10:20:12' : this.getNowTimeStr(true);

      document.querySelectorAll('.live-date-label').forEach(el => {
        el.innerText = dateStr;
      });
      if (!this.state.isDemoMode) {
        document.querySelectorAll('.live-time-label').forEach(el => {
          el.innerText = fullTimeStr;
        });
        const r = this.state.routes[this.state.activeRouteKey];
        if (r && r.status === 'PENDIENTE') {
          const p04InFecha = document.getElementById('p04-inicio-fecha');
          const p04InHora = document.getElementById('p04-inicio-hora');
          if (p04InFecha) p04InFecha.innerText = dateStr;
          if (p04InHora) p04InHora.innerText = fullTimeStr;
        }
        if (r && r.status !== 'COMPLETADO') {
          const p04FinFecha = document.getElementById('p04-fin-fecha');
          const p04FinHora = document.getElementById('p04-fin-hora');
          if (p04FinFecha) p04FinFecha.innerText = dateStr;
          if (p04FinHora) p04FinHora.innerText = fullTimeStr;
        }
      }
    };
    updateTime();
    setInterval(updateTime, 1000);
  },

  // ================== GESTIÓN DE PERFILES Y AUDITORÍA DE ERRORES ==================
  loadProfilesFromStorage() {
    try {
      const raw = localStorage.getItem('shalom_profiles_v1');
      this.state.profiles = raw ? JSON.parse(raw) : {};
    } catch (e) {
      this.state.profiles = {};
    }
  },

  saveProfilesToStorage() {
    try {
      localStorage.setItem('shalom_profiles_v1', JSON.stringify(this.state.profiles));
    } catch (e) {
      console.warn('No se pudo guardar en localStorage:', e);
    }
  },

  ensureProfile(dni, name) {
    const known = KNOWN_DRIVERS[dni] || {};
    const officialName = (name && !name.startsWith('CONDUCTOR DNI')) ? name : (known.name || name || `CONDUCTOR DNI ${dni}`);
    
    if (!this.state.profiles[dni]) {
      this.state.profiles[dni] = {
        dni,
        name: officialName,
        categoria: known.categoria || 'A3C',
        grupo: known.grupo || 'HUACHIPA CO',
        placa: known.placa || 'BFS-863',
        celular: known.celular || '',
        attempts: 1,
        errors: [],
        lastLogin: new Date().toISOString()
      };
    } else {
      if (officialName && !officialName.startsWith('CONDUCTOR DNI')) {
        this.state.profiles[dni].name = officialName;
      }
      if (known.celular && !this.state.profiles[dni].celular) {
        this.state.profiles[dni].celular = known.celular;
      }
      this.state.profiles[dni].lastLogin = new Date().toISOString();
    }
    this.saveProfilesToStorage();
    return this.state.profiles[dni];
  },

  recordError(code, title, detail, severity = 'GRAVE', screen = '') {
    const dni = this.state.driverDni || '99999999';
    const profile = this.ensureProfile(dni, this.state.driverName);
    const penalty = severity === 'CRÍTICO' ? -25 : (severity === 'GRAVE' ? -15 : (severity === 'MEDIO' ? -10 : -5));
    const errEntry = {
      id: Date.now() + Math.random().toString(36).slice(2, 6),
      timestamp: new Date().toISOString(),
      fecha: this.getNowDateStr(),
      hora: this.getNowTimeStr(true),
      dni: dni,
      nombre: this.state.driverName,
      placa: this.state.driverPlaca || 'BFS-863',
      ruta: this.state.activeRouteKey,
      pantalla: screen || this.state.activeRouteKey,
      codigo: code,
      gravedad: severity,
      descripcion: title,
      detalle: detail,
      penalizacion: penalty
    };
    profile.errors.unshift(errEntry);
    this.saveProfilesToStorage();
    this.updateTopErrorBadge();
    this.enqueuePendingError(errEntry);
    this.sendErrorToGoogleSheets(errEntry);
  },

  DEFAULT_WEBHOOK_URL: 'https://script.google.com/macros/s/AKfycbw3WvpKlowMz5voMLtnhX90D1VipStcnzlk1sqN19ifpG9TZxf2aLSspF6YYfvYUf5ddg/exec',

  enqueuePendingError(entry) {
    try {
      const q = JSON.parse(localStorage.getItem('shalom_pending_sheet_errors') || '[]');
      q.push(entry);
      localStorage.setItem('shalom_pending_sheet_errors', JSON.stringify(q));
    } catch (e) {}
  },

  flushPendingErrors() {
    const webhookUrl = localStorage.getItem('shalom_sheets_webhook_url') || this.DEFAULT_WEBHOOK_URL;
    if (!webhookUrl) return;
    try {
      const q = JSON.parse(localStorage.getItem('shalom_pending_sheet_errors') || '[]');
      if (!q.length) return;
      q.forEach(entry => this.sendErrorToGoogleSheets(entry, false));
      localStorage.setItem('shalom_pending_sheet_errors', '[]');
    } catch (e) {}
  },

  sendErrorToGoogleSheets(entry, canQueue = true) {
    const webhookUrl = localStorage.getItem('shalom_sheets_webhook_url') || this.DEFAULT_WEBHOOK_URL;
    if (!webhookUrl) return;
    try {
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      }).catch(err => {
        console.warn('Error enviando a Google Sheets Webhook:', err);
      });
    } catch (e) {
      console.warn('Excepción enviando a Google Sheets:', e);
    }
  },

  configureSheetsWebhook() {
    const current = localStorage.getItem('shalom_sheets_webhook_url') || this.DEFAULT_WEBHOOK_URL || '';
    const pendingCount = (JSON.parse(localStorage.getItem('shalom_pending_sheet_errors') || '[]')).length;
    const val = prompt(
      `CONFIGURACIÓN DE GOOGLE SHEETS WEBHOOK\n\nEstado actual: ${current ? 'CONECTADO ✅' : 'SIN CONECTAR ⚠️'}\nErrores en cola pendientes: ${pendingCount}\n\nPegue la URL de la aplicación web de Google Apps Script (termina en /exec):\n(O deje en blanco para limpiar)`,
      current
    );
    if (val !== null) {
      const clean = val.trim();
      localStorage.setItem('shalom_sheets_webhook_url', clean);
      if (clean) {
        alert('URL de Webhook conectada exitosamente.\nSe sincronizarán los errores con la hoja de cálculo.');
        this.flushPendingErrors();
      } else {
        alert('Webhook desactivado.');
      }
    }
  },

  showOperativeErrorModal(title, message) {
    soundFx.alert();
    const tEl = document.getElementById('modal-error-op-title');
    const mEl = document.getElementById('modal-error-op-msg');
    if (tEl) tEl.innerText = title;
    if (mEl) mEl.innerText = message;
    document.getElementById('modal-error-operacion')?.classList.remove('hidden');
  },

  updateTopErrorBadge() {
    const dni = this.state.driverDni;
    const profile = this.state.profiles[dni];
    const count = profile && Array.isArray(profile.errors) ? profile.errors.length : 0;
    const badge = document.getElementById('top-error-badge');
    const countEl = document.getElementById('top-error-count');
    if (countEl) countEl.innerText = count;
    if (badge) {
      badge.classList.add('hidden');
      badge.classList.remove('flex');
    }
  },

  onLoginDniInput(val) {
    const errEl = document.getElementById('login-error-msg');
    if (errEl) errEl.classList.add('hidden');
  },

  fillQuickLogin(dni) {
    soundFx.tap();
    const uEl = document.getElementById('login-input-user');
    const pEl = document.getElementById('login-input-pass');
    if (uEl) uEl.value = dni;
    if (pEl) pEl.value = dni;
    this.onLoginDniInput(dni);
  },

  SHALOM_FLEET_PLACAS: [
    'BFS-863', 'CCY-904', 'BTR-721', 'D4O-812', 'C7M-745', 
    'B9V-834', 'AYI-890', 'F3U-789', 'T8C-942', 'V2K-815', 
    'B8Q-910', 'C5D-723', 'F8M-719', 'C3L-841', 'W2P-860'
  ],

  getRandomPlaca() {
    const list = this.SHALOM_FLEET_PLACAS;
    return list[Math.floor(Math.random() * list.length)];
  },

  async loginSubmit() {
    const user = (document.getElementById('login-input-user')?.value || '').trim();
    const pass = (document.getElementById('login-input-pass')?.value || '').trim();
    const errEl = document.getElementById('login-error-msg');
    const submitBtn = document.getElementById('btn-login-submit');

    if (!user || user.length < 8) {
      soundFx.alert();
      if (errEl) {
        errEl.innerText = 'Ingrese un número de DNI válido (mínimo 8 dígitos).';
        errEl.classList.remove('hidden');
      }
      return;
    }

    if (user !== pass) {
      if (errEl) {
        errEl.innerText = 'Credenciales incorrectas: Su CONTRASEÑA debe ser exactamente igual a su DNI.';
        errEl.classList.remove('hidden');
      }
      this.state.driverDni = user;
      this.recordError(
        'ERR_LOGIN_FALLIDO',
        'Error de autenticación (DNI ≠ Contraseña)',
        `El usuario ingresó el DNI ${user} pero la clave no coincidió con su DNI.`,
        'LEVE',
        'LOGIN'
      );
      return;
    }

    if (errEl) errEl.classList.add('hidden');

    const isDemo = (user === '99999999');
    this.state.isDemoMode = isDemo;
    this.state.driverDni = user;

    // Asignar placa aleatoria de la flota Shalom en cada inicio de sesión (unidad no fija)
    const assignedPlaca = isDemo ? 'CCY-904' : this.getRandomPlaca();

    const known = KNOWN_DRIVERS[user];
    const cachedName = this.state.profiles[user]?.name;
    const isCachedFallback = !cachedName || cachedName.startsWith('CONDUCTOR DNI');
    let resolvedName = isDemo
      ? 'pruebashalom'
      : (!isCachedFallback ? cachedName : ((known && known.name) || `CONDUCTOR DNI ${user}`));
    let resolvedCel = (known && known.celular) || '';
    let resolvedCat = (known && known.categoria) || 'A3C';
    let resolvedGrupo = (known && known.grupo) || 'HUACHIPA CO';

    if (!isDemo && this.DEFAULT_WEBHOOK_URL) {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin mr-1"></i> VALIDANDO...';
      }
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const res = await fetch(`${this.DEFAULT_WEBHOOK_URL}?action=getDriver&dni=${encodeURIComponent(user)}`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (res.ok) {
          const info = await res.json();
          if (info && info.found && info.name) {
            resolvedName = info.name;
            if (info.celular) resolvedCel = info.celular;
            if (info.categoria) resolvedCat = info.categoria;
            if (info.branch) resolvedGrupo = info.branch;
          }
        }
      } catch (e) {
        console.log('Driver remote lookup skipped or timeout:', e);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'INGRESAR';
        }
      }
    }

    const profile = this.ensureProfile(user, resolvedName);
    profile.placa = assignedPlaca;
    if (resolvedCel) profile.celular = resolvedCel;
    profile.categoria = resolvedCat;
    if (resolvedGrupo) profile.grupo = resolvedGrupo;

    this.state.driverName = profile.name;
    this.state.driverCategoria = profile.categoria;
    this.state.driverGrupo = profile.grupo;
    this.state.driverPlaca = profile.placa;
    this.state.driverCelular = profile.celular || '';

    // Reiniciar estado de rutas según el modo (Demo = valores predeterminados; Evaluación = campos vacíos)
    this.state.activeRouteKey = 'IDA';
    this.state.selectedEscalaIdx = 0;
    this.state.routes = getFreshRoutes(isDemo);

    this.syncDriverUI();
    this.updateTopErrorBadge();

    soundFx.success();
    this.showScreen('P01');

    // Mostrar popup oficial "Hola \n [NOMBRE COMPLETO]" (Frame 4 del video)
    const holaNameEl = document.getElementById('modal-hola-name');
    if (holaNameEl) holaNameEl.innerText = this.state.driverName;
    document.getElementById('modal-hola')?.classList.remove('hidden');
  },

  closeModalHola() {
    soundFx.tap();
    document.getElementById('modal-hola')?.classList.add('hidden');
  },

  logout() {
    soundFx.tap();
    this.showScreen('LOGIN');
  },

  syncDriverUI() {
    const dni = this.state.driverDni;
    const name = this.state.driverName;
    const placa = this.state.driverPlaca || 'BFS-863';
    const isDemo = this.state.isDemoMode;
    const dateStr = this.getNowDateStr();
    const timeStr = isDemo ? '10:20:20' : this.getNowTimeStr(true);

    // Subtítulo en Programación y vistas secundarias
    const subTitle = document.getElementById('p02-driver-subtitle');
    if (subTitle) subTitle.innerText = `${dni} - ${name} - Q${dni}`;

    document.querySelectorAll('.driver-header-subtitle').forEach(el => {
      el.innerText = `${dni} - ${name}`;
    });

    const pdfCond = document.getElementById('pdf-conductor-cell');
    if (pdfCond) pdfCond.innerText = name;

    // Tarjetas en P02
    const p02IdaFecha = document.getElementById('p02-ida-fecha');
    const p02RetFecha = document.getElementById('p02-ret-fecha');
    const p02IdaPlaca = document.getElementById('p02-ida-placa');
    const p02RetPlaca = document.getElementById('p02-ret-placa');

    if (p02IdaFecha) p02IdaFecha.innerText = isDemo ? '2026-06-19 10:00:00' : `${dateStr} 10:00:00`;
    if (p02RetFecha) p02RetFecha.innerText = isDemo ? '2026-06-19 12:50:06' : `${dateStr} 12:50:06`;
    if (p02IdaPlaca) p02IdaPlaca.innerText = placa;
    if (p02RetPlaca) p02RetPlaca.innerText = placa;

    // Resetear badges de tarjetas en P02
    const badgeIda = document.getElementById('badge-p02-ida');
    if (badgeIda) {
      badgeIda.innerText = 'PENDIENTE';
      badgeIda.className = 'px-2 py-0.5 rounded text-[10px] font-black bg-app-fucsia text-white';
    }
    const badgeRet = document.getElementById('badge-p02-ret');
    if (badgeRet) {
      badgeRet.innerText = 'BLOQUEADO';
      badgeRet.className = 'px-2 py-0.5 rounded text-[10px] font-black bg-slate-300 text-slate-600';
    }
    document.getElementById('card-p02-ret')?.classList.add('opacity-60');
    document.getElementById('p02-ida-details-closed')?.classList.add('hidden');
    document.getElementById('p02-ret-details-closed')?.classList.add('hidden');
    const difIda = document.getElementById('lbl-p02-ida-difkm');
    if (difIda) difIda.innerText = '0';
    const difRet = document.getElementById('lbl-p02-ret-difkm');
    if (difRet) difRet.innerText = '0';

    // Datos de Chofer 1 en P04 (Inicio y Fin de Ruta)
    const p04Dni = document.getElementById('p04-driver-dni');
    const p04Name = document.getElementById('p04-driver-name');
    const p04FinDni = document.getElementById('p04-fin-driver-dni');
    const p04FinName = document.getElementById('p04-fin-driver-name');
    if (p04Dni) p04Dni.innerText = dni;
    if (p04Name) p04Name.innerText = name;
    if (p04FinDni) p04FinDni.innerText = dni;
    if (p04FinName) p04FinName.innerText = name;

    // Fechas y horas en P04
    const p04InFecha = document.getElementById('p04-inicio-fecha');
    const p04InHora = document.getElementById('p04-inicio-hora');
    const p04FinFecha = document.getElementById('p04-fin-fecha');
    const p04FinHora = document.getElementById('p04-fin-hora');
    if (p04InFecha) p04InFecha.innerText = dateStr;
    if (p04InHora) p04InHora.innerText = timeStr;
    if (p04FinFecha) p04FinFecha.innerText = dateStr;
    if (p04FinHora) p04FinHora.innerText = isDemo ? '12:34:45' : timeStr;

    const p04HeaderSub = document.getElementById('p04-header-sub');
    if (p04HeaderSub) p04HeaderSub.innerText = `- ${placa} - ${dateStr} 10:00:00`;
  },

  renderPerfilView() {
    const dni = this.state.driverDni;
    const profile = this.ensureProfile(dni, this.state.driverName);

    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.innerText = val;
    };
    setTxt('perfil-nombre', profile.name);
    setTxt('perfil-alias', profile.dni);
    setTxt('perfil-brevete', `Q${profile.dni}`);
    setTxt('perfil-categoria', profile.categoria || 'A2B');
    setTxt('perfil-grupo', profile.grupo || 'SUCURSALES-HUACHIPA');

    const celInput = document.getElementById('perfil-celular');
    if (celInput) celInput.value = profile.celular || '';
  },

  reiniciarIntentoConductor() {
    soundFx.tap();
    const dni = this.state.driverDni;
    const profile = this.ensureProfile(dni, this.state.driverName);
    profile.attempts = (profile.attempts || 1) + 1;
    this.saveProfilesToStorage();

    this.state.activeRouteKey = 'IDA';
    this.state.selectedEscalaIdx = 0;
    this.state.routes = getFreshRoutes(this.state.isDemoMode);
    this.syncDriverUI();
    this.renderPerfilView();
    this.openExitoModal('Se ha iniciado un nuevo intento con los campos en blanco para el conductor.', () => {
      this.showScreen('P02');
    });
  },

  limpiarErroresConductor() {
    soundFx.tap();
    const dni = this.state.driverDni;
    const profile = this.ensureProfile(dni, this.state.driverName);
    profile.errors = [];
    profile.attempts = 1;
    this.saveProfilesToStorage();
    this.updateTopErrorBadge();
    this.renderPerfilView();
  },

  showScreen(screenId) {
    this.closeAllSwipes();
    soundFx.tap();
    const allScreens = [
      'login', 'p01', 'p02', 'p04', 'p05', 'p07',
      'perfil', 'cargueros', 'pdf', 'cdtalleres', 'lavado', 'grifos', 'manifiesto', 'evaluaciones'
    ];
    allScreens.forEach(s => {
      const el = document.getElementById(`view-${s}`);
      if (el) el.classList.add('hidden');
    });
    const norm = screenId.toLowerCase();
    if (norm === 'perfil') {
      this.renderPerfilView();
    }
    const target = document.getElementById(`view-${norm}`);
    if (target) {
      target.classList.remove('hidden');
      target.classList.remove('slide-in-right');
      void target.offsetWidth;
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

  cycleFontSize() {
    const scales = ['1', '1.18', '1.35'];
    let cur = this.state.fontScale || '1';
    let idx = scales.indexOf(cur);
    let next = scales[(idx + 1) % scales.length];
    this.setFontSize(next);
  },

  setFontSize(val) {
    this.state.fontScale = val;
    document.documentElement.style.setProperty('--font-scale', val);
    const indicator = document.getElementById('font-size-indicator');
    const labels = { '1': 'A', '1.18': 'A+', '1.35': 'A++' };
    if (indicator) indicator.innerText = labels[val] || 'A';
    localStorage.setItem('shalom_font_scale', val);
    soundFx.tap();
  },

  initFontSize() {
    const saved = localStorage.getItem('shalom_font_scale') || '1';
    this.setFontSize(saved);
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
    const banner = document.getElementById('training-guide-banner');
    if (!this.state.modoGuiado) {
      document.querySelectorAll('.highlight-step').forEach(el => el.classList.remove('highlight-step'));
      if (banner) banner.style.display = 'none';
      return;
    }
    if (banner) banner.style.display = 'flex';

    const textEl = document.getElementById('guia-step-text');
    if (!textEl) return;

    document.querySelectorAll('.highlight-step').forEach(el => el.classList.remove('highlight-step'));

    const r = this.state.routes[this.state.activeRouteKey];
    let msg = '';

    const isVisible = id => {
      const el = document.getElementById(id);
      return el && !el.classList.contains('hidden');
    };

    if (isVisible('view-login')) {
      msg = 'Ingresa tu DNI en Usuario y tu mismo DNI en Contraseña, luego pulsa INGRESAR.';
      document.getElementById('btn-login-submit')?.classList.add('highlight-step');
    } else if (isVisible('view-p01')) {
      msg = 'Selecciona "Programación" para iniciar y operar tu ruta asignada.';
      document.getElementById('btn-to-programacion')?.classList.add('highlight-step');
    } else if (isVisible('view-p02')) {
      if (r.status === 'PENDIENTE') {
        msg = 'Desliza la tarjeta de RUTA IDA a la izquierda y pulsa INGRESAR.';
      } else if (r.status === 'PROCESO') {
        msg = 'Continúa en la RUTA IDA: desliza a la izquierda y pulsa INGRESAR.';
      } else {
        msg = '¡Ruta IDA completada! Ahora desliza el RETORNO y pulsa INGRESAR.';
      }
    } else if (isVisible('view-p04')) {
      if (r.status === 'PENDIENTE') {
        msg = this.state.isDemoMode
          ? 'Verifica kilometraje inicial y pulsa "GRABAR INICIO DE RUTA".'
          : 'Escribe el KILOMETRAJE inicial y N° CANDADOS, luego pulsa "GRABAR INICIO DE RUTA".';
        document.getElementById('btn-p04-grabar-inicio')?.classList.add('highlight-step');
      } else {
        const allEscalasDone = r.escalas.every(e => e.status === 'COMPLETADO');
        if (allEscalasDone && r.status !== 'COMPLETADO') {
          msg = 'Todas las escalas están completadas. Ingresa KM Final y pulsa "GRABAR FINAL DE RUTA".';
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
        msg = `Desliza la escala "${pendingEsc.name}" a la izquierda y pulsa INGRESAR.`;
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
    } else if (isVisible('view-perfil')) {
      msg = 'Aquí puedes consultar los datos del conductor y el vehículo asignado.';
    } else {
      msg = 'Módulo informativo oficial de Shalom Choferes.';
    }

    textEl.innerText = msg;
  },

  closeAllSwipes() {
    document.querySelectorAll('.swipe-row').forEach(row => {
      row.classList.remove('open-programacion', 'open-escalas');
    });
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

    document.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.swipe-btns')) return;
      const hasOpen = document.querySelector('.swipe-row.open-programacion, .swipe-row.open-escalas');
      if (hasOpen && !e.target.closest('.swipe-row.open-programacion, .swipe-row.open-escalas')) {
        this.closeAllSwipes();
        haptics.light();
      }
    });

    this.initSwipeHandlers();
  },

  closeDropdown() {
    const dd = document.getElementById('dropdown-p04-menu');
    if (dd) dd.classList.add('hidden');
  },

  goToHojaRuta() {
    this.closeDropdown();
    this.closeAllSwipes();
    const r = this.state.routes[this.state.activeRouteKey];
    if (r.status === 'PENDIENTE') {
      this.recordError(
        'ERR_HOJA_RUTA_SIN_INICIO',
        'Intentó abrir Hoja de Ruta sin grabar Inicio de Ruta',
        `El conductor intentó entrar a las escalas de ${this.state.activeRouteKey} antes de grabar el Inicio de Ruta (kilometraje y candados).`,
        'GRAVE',
        'P04_INICIO_RUTA'
      );
      this.showOperativeErrorModal(
        'Inicio de Ruta Pendiente',
        'Primero debe registrar el KILOMETRAJE, N° CANDADOS y presionar "GRABAR INICIO DE RUTA" antes de pasar a la Hoja de Ruta.'
      );
      return;
    }
    document.getElementById('modal-p03')?.classList.add('hidden');
    document.getElementById('modal-confirm-inicio')?.classList.add('hidden');
    this.renderEscalasView();
    this.showScreen('P05');
  },

  initSwipeHandlers() {
    document.querySelectorAll('.swipe-row').forEach(row => {
      if (row.dataset.swipeBound === 'true') return;
      row.dataset.swipeBound = 'true';

      let startX = 0;
      let startY = 0;
      let currentX = 0;
      let isMoving = false;

      row.addEventListener('touchstart', e => {
        if (e.target.closest('.swipe-btns')) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        currentX = startX;
        isMoving = false;
      }, { passive: true });

      row.addEventListener('touchmove', e => {
        if (e.target.closest('.swipe-btns')) return;
        currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        const diffY = Math.abs(startY - e.touches[0].clientY);
        if (diffY > Math.abs(diffX) && !isMoving) return;

        isMoving = true;
        const cls = row.classList.contains('escala-row') ? 'open-escalas' : 'open-programacion';
        const isOpen = row.classList.contains(cls);

        if (diffX > 30) {
          if (!isOpen) {
            this.closeAllSwipes();
            row.classList.add(cls);
            haptics.light();
          }
          this.state.swipeTriggered = true;
        } else if (diffX < -15) {
          if (isOpen) {
            row.classList.remove(cls);
            haptics.light();
          }
          this.state.swipeTriggered = true;
        }
      }, { passive: true });

      row.addEventListener('touchend', e => {
        if (e.target.closest('.swipe-btns')) return;
        const diffX = startX - currentX;
        const cls = row.classList.contains('escala-row') ? 'open-escalas' : 'open-programacion';
        if (diffX < -15 && row.classList.contains(cls)) {
          row.classList.remove(cls);
          haptics.light();
        }
        setTimeout(() => { this.state.swipeTriggered = false; }, 100);
      });

      let isDown = false;
      row.addEventListener('mousedown', e => {
        if (e.target.closest('.swipe-btns')) return;
        isDown = true;
        startX = e.clientX;
      });

      window.addEventListener('mousemove', e => {
        if (!isDown) return;
        const diffX = startX - e.clientX;
        const cls = row.classList.contains('escala-row') ? 'open-escalas' : 'open-programacion';

        if (diffX > 30) {
          this.closeAllSwipes();
          row.classList.add(cls);
          isDown = false;
          this.state.swipeTriggered = true;
          haptics.light();
          setTimeout(() => { this.state.swipeTriggered = false; }, 120);
        } else if (diffX < -15) {
          row.classList.remove(cls);
          isDown = false;
          this.state.swipeTriggered = true;
          haptics.light();
          setTimeout(() => { this.state.swipeTriggered = false; }, 120);
        }
      });

      window.addEventListener('mouseup', () => {
        isDown = false;
      });
    });
  },

  handleCardClick(event, routeKey) {
    if (event && event.target && event.target.closest('.swipe-btns')) return;
    const card = document.getElementById(routeKey === 'IDA' ? 'card-p02-ida' : 'card-p02-ret');
    if (!card) return;
    const isOpen = card.classList.contains('open-programacion');
    if (isOpen) {
      card.classList.remove('open-programacion');
      haptics.light();
      soundFx.tap();
      return;
    }
    if (this.state.swipeTriggered) return;
    this.closeAllSwipes();
    card.classList.add('open-programacion');
    haptics.light();
    soundFx.tap();
  },

  handleEscalaCardClick(event, idx) {
    if (event && event.target && event.target.closest('.swipe-btns')) return;
    const container = document.getElementById('p05-escalas-list');
    const cards = container ? container.querySelectorAll('.swipe-row') : [];
    if (!cards || !cards[idx]) return;
    const card = cards[idx];
    const isOpen = card.classList.contains('open-escalas');
    if (isOpen) {
      card.classList.remove('open-escalas');
      haptics.light();
      soundFx.tap();
      return;
    }
    if (this.state.swipeTriggered) return;
    this.closeAllSwipes();
    card.classList.add('open-escalas');
    haptics.light();
    soundFx.tap();
  },

  actionProgramacionIngresar(routeKey) {
    this.closeAllSwipes();
    const r = this.state.routes[routeKey];
    if (r.status === 'BLOQUEADO') {
      this.recordError(
        'ERR_RUTA_RETORNO_BLOQUEADA',
        'Intentó ingresar a RUTA RETORNO sin cerrar RUTA IDA',
        'El conductor intentó abrir la programación de RETORNO cuando la RUTA IDA aún no ha sido completada (Lámina 62).',
        'GRAVE',
        'P02_PROGRAMACION'
      );
      this.showOperativeErrorModal(
        'Ruta Retorno Bloqueada',
        'Debe completar y grabar el FINAL DE RUTA de la RUTA IDA para poder acceder al RETORNO (Lámina 62).'
      );
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

  enableEditKmInicio() {
    soundFx.tap();
    const kmIn = document.getElementById('input-p04-km-inicio');
    if (kmIn) {
      kmIn.disabled = false;
      kmIn.focus();
    }
  },

  enableEditKmFin() {
    soundFx.tap();
    const kmFin = document.getElementById('input-p04-km-fin');
    if (kmFin) {
      kmFin.disabled = false;
      kmFin.focus();
    }
  },

  setupP04() {
    const r = this.state.routes[this.state.activeRouteKey];
    const hTitle = document.getElementById('p04-header-title');
    if (hTitle) {
      hTitle.innerText = this.state.activeRouteKey === 'IDA' ? 'IDA - HUACHIPA CO - LA MA...' : 'RET - LA MARINA - HUACHIPA 1';
    }
    const hSub = document.getElementById('p04-header-sub');
    if (hSub) {
      hSub.innerText = `- ${this.state.driverPlaca || 'BFS-863'} - ${this.getNowDateStr()} 10:00:00`;
    }

    const kmIn = document.getElementById('input-p04-km-inicio');
    if (kmIn) kmIn.value = r.kmInicio !== undefined && r.kmInicio !== null ? r.kmInicio : '';
    const canIn = document.getElementById('input-p04-candados-inicio');
    if (canIn) canIn.value = r.candados !== undefined && r.candados !== null ? r.candados : '';

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
        kmFinInput.value = r.kmFin !== undefined && r.kmFin !== null ? r.kmFin : '';
      }
      if (candadosFinInput) {
        candadosFinInput.disabled = false;
        candadosFinInput.value = r.candadosFin !== undefined && r.candadosFin !== null ? r.candadosFin : '';
      }
      if (btnFin) {
        btnFin.classList.remove('bg-slate-400', 'cursor-not-allowed');
        btnFin.classList.add('bg-app-header', 'hover:bg-blue-900');
      }
      pencilFin?.classList.add('hidden');
    } else if (r.status === 'COMPLETADO') {
      boxFin?.classList.remove('opacity-50');
      pencilFin?.classList.remove('hidden');
      if (kmFinInput) kmFinInput.disabled = true;
      if (candadosFinInput) candadosFinInput.disabled = true;
      if (btnFin) {
        btnFin.classList.add('bg-slate-400', 'cursor-not-allowed');
      }
    } else {
      boxFin?.classList.add('opacity-50');
      if (kmFinInput) {
        kmFinInput.disabled = true;
        kmFinInput.value = r.kmFin !== undefined && r.kmFin !== null ? r.kmFin : '';
      }
      if (candadosFinInput) {
        candadosFinInput.disabled = true;
        candadosFinInput.value = r.candadosFin !== undefined && r.candadosFin !== null ? r.candadosFin : '';
      }
      if (btnFin) {
        btnFin.classList.remove('bg-app-header', 'hover:bg-blue-900');
        btnFin.classList.add('bg-slate-400');
      }
      pencilFin?.classList.add('hidden');
    }

    this.updateGuiaPaso();
  },

  submitP04Inicio() {
    const r = this.state.routes[this.state.activeRouteKey];
    if (r.status !== 'PENDIENTE') return;

    const kmVal = (document.getElementById('input-p04-km-inicio')?.value || '').trim();
    const canVal = (document.getElementById('input-p04-candados-inicio')?.value || '').trim();

    if (!kmVal || isNaN(Number(kmVal)) || Number(kmVal) <= 0) {
      this.recordError(
        'ERR_KM_INICIO_VACIO',
        'Intentó grabar Inicio de Ruta sin Kilometraje válido',
        `El conductor presionó GRABAR INICIO DE RUTA dejando el campo KILOMETRAJE vacío o en cero (${kmVal || 'vacío'}).`,
        'MEDIO',
        'P04_INICIO_RUTA'
      );
      this.showOperativeErrorModal(
        'Kilometraje Requerido',
        'Debe digitar el KILOMETRAJE inicial del odómetro antes de grabar el Inicio de Ruta.'
      );
      return;
    }

    if (canVal === '' || isNaN(Number(canVal)) || Number(canVal) < 0) {
      this.recordError(
        'ERR_CANDADOS_INICIO_VACIO',
        'Intentó grabar Inicio de Ruta sin N° de Candados',
        'El conductor presionó GRABAR INICIO DE RUTA sin registrar la cantidad de candados.',
        'MEDIO',
        'P04_INICIO_RUTA'
      );
      this.showOperativeErrorModal(
        'N° de Candados Requerido',
        'Debe indicar el N° DE CANDADOS colocados en la unidad antes de grabar el Inicio de Ruta.'
      );
      return;
    }

    // Si estamos en RETORNO, validar que el KM de inicio no sea menor al KM final de IDA
    if (this.state.activeRouteKey === 'RET') {
      const idaFinKm = Number(this.state.routes.IDA.kmFin) || 0;
      if (idaFinKm > 0 && Number(kmVal) < idaFinKm) {
        this.recordError(
          'ERR_KM_INICIO_RET_INCOHERENTE',
          'Kilometraje inicial de Retorno menor al final de Ida',
          `Ingresó ${kmVal} Km en inicio de Retorno, el cual es menor al Km final de Ida (${idaFinKm} Km).`,
          'GRAVE',
          'P04_INICIO_RUTA'
        );
        this.showOperativeErrorModal(
          'Kilometraje Incoherente',
          `El kilometraje inicial de Retorno (${kmVal} Km) no puede ser menor al kilometraje con el que cerró la Ruta Ida (${idaFinKm} Km).`
        );
        return;
      }
    }

    r.kmInicio = Number(kmVal);
    r.candados = Number(canVal);
    // En la primera escala (Origen), su KM base es el KM de inicio de ruta
    if (r.escalas && r.escalas[0]) {
      r.escalas[0].km = Number(kmVal);
    }

    soundFx.tap();
    const txt = document.getElementById('modal-confirm-inicio-txt');
    if (txt) txt.innerText = `Está seguro iniciar el proceso de INICIO DE RUTA ${r.title}`;
    document.getElementById('modal-confirm-inicio')?.classList.remove('hidden');
  },

  confirmarInicioDefinitivo() {
    document.getElementById('modal-confirm-inicio')?.classList.add('hidden');
    const r = this.state.routes[this.state.activeRouteKey];
    r.status = 'PROCESO';

    const p04InFecha = document.getElementById('p04-inicio-fecha');
    const p04InHora = document.getElementById('p04-inicio-hora');
    if (p04InFecha) p04InFecha.innerText = this.getNowDateStr();
    if (p04InHora) p04InHora.innerText = this.state.isDemoMode ? '10:20:20' : this.getNowTimeStr(true);

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
      const kmLabel = esc.km !== '' && esc.km !== null && esc.km !== undefined ? `${esc.km} Km` : '-- Km';

      card.innerHTML = `
        <div class="swipe-btns">
          <button onclick="app.actionEscalaClick(${idx})" class="bg-app-verde hover:bg-green-600 text-white px-2 font-bold text-[10px] flex flex-col items-center justify-center space-y-1">
            <i class="fa-solid fa-arrow-right text-sm"></i>
            <span>INGRESAR</span>
          </button>
          <button onclick="soundFx.alert(); app.closeAllSwipes(); alert('Incidencia en ${esc.name}');" class="bg-indigo-800 text-white px-1 font-bold text-[9.5px] flex flex-col items-center justify-center space-y-1">
            <i class="fa-solid fa-triangle-exclamation text-sm"></i>
            <span>INCIDENCIA</span>
          </button>
          <button onclick="soundFx.alert(); app.closeAllSwipes(); alert('${thirdBtnTxt} en ${esc.name}');" class="bg-red-600 text-white px-1 font-bold text-[10px] flex flex-col items-center justify-center space-y-1">
            <i class="fa-solid ${thirdBtnIcon} text-sm"></i>
            <span>${thirdBtnTxt}</span>
          </button>
        </div>

        <div onclick="app.handleEscalaCardClick(event, ${idx})" class="swipe-body p-3 space-y-2 hover:bg-slate-50 active:bg-slate-100">
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
            <span>${kmLabel}</span>
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
    this.closeAllSwipes();
    const r = this.state.routes[this.state.activeRouteKey];
    const esc = r.escalas[idx];

    // Validación extraída del APK oficial (libapp.so):
    // No puede iniciar o ingresar a una escala posterior si una escala previa sigue PENDIENTE o en PROCESO
    for (let i = 0; i < idx; i++) {
      if (r.escalas[i].status !== 'COMPLETADO') {
        this.recordError(
          'ERR_ORDEN_ESCALAS',
          `Intentó ingresar a "${esc.name}" sin completar "${r.escalas[i].name}"`,
          `Mensaje oficial de la app: "No puede ingresar porque aun tiene una ESCALA en PROCESO" (${r.escalas[i].name} está ${r.escalas[i].status}).`,
          'GRAVE',
          'P05_ESCALAS'
        );
        this.showOperativeErrorModal(
          'Alerta de Escala',
          `No puede ingresar porque aun tiene una ESCALA en PROCESO (${r.escalas[i].name}). Complete las escalas en orden secuencial.`
        );
        return;
      }
    }

    this.state.selectedEscalaIdx = idx;
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
    const dateStr = this.getNowDateStr();

    const titleEl = document.getElementById('p07-title');
    if (titleEl) titleEl.innerText = `ESCALA: ${esc.name}`;
    const subEl = document.getElementById('p07-sub');
    if (subEl) subEl.innerText = `- ${r.title}`;
    const bultosEl = document.getElementById('p07-bultos-text');
    if (bultosEl) bultosEl.innerText = `${esc.embarcados} Paquetes ${esc.grt} Guias`;

    const embFecha = document.getElementById('p07-embarque-fecha');
    const desFecha = document.getElementById('p07-desembarque-fecha');
    if (embFecha) embFecha.innerText = dateStr;
    if (desFecha) desFecha.innerText = dateStr;

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

    const kmDisplay = (esc.km !== '' && esc.km !== null && esc.km !== undefined) ? `${esc.km}Km` : '-- Km';

    // LLEGADA
    if (esc.isOrigin) {
      if (boxLlegada) {
        boxLlegada.className = 'p-2.5 rounded-xl bg-slate-300 text-slate-500 cursor-not-allowed text-left flex flex-col justify-between h-20';
        boxLlegada.disabled = true;
      }
      document.getElementById('p07-txt-llegada-fecha').innerText = dateStr;
      document.getElementById('p07-txt-llegada-hora').innerText = '--:--';
      document.getElementById('p07-txt-llegada-km').innerText = 'N/A';
    } else if (esc.llegada) {
      if (boxLlegada) {
        boxLlegada.className = 'p-2.5 rounded-xl bg-slate-300 text-slate-600 cursor-not-allowed text-left flex flex-col justify-between h-20 shadow-none';
        boxLlegada.disabled = true;
      }
      document.getElementById('p07-txt-llegada-fecha').innerText = dateStr;
      document.getElementById('p07-txt-llegada-hora').innerText = esc.llegada.time;
      document.getElementById('p07-txt-llegada-km').innerText = `${esc.llegada.km || esc.km}Km`;
    } else {
      if (boxLlegada) {
        boxLlegada.className = 'p-2.5 rounded-xl bg-app-llegada text-white text-left shadow flex flex-col justify-between h-20 active:scale-95';
        boxLlegada.disabled = false;
      }
      document.getElementById('p07-txt-llegada-fecha').innerText = dateStr;
      document.getElementById('p07-txt-llegada-hora').innerText = this.state.isDemoMode ? '12:01' : this.getNowTimeStr(false);
      document.getElementById('p07-txt-llegada-km').innerText = kmDisplay;
    }

    // SALIDA Y BOTÓN DE CIERRE
    if (esc.isDest) {
      if (boxSalida) {
        boxSalida.className = 'p-2.5 rounded-xl bg-slate-300 text-slate-500 cursor-not-allowed text-left flex flex-col justify-between h-20';
        boxSalida.disabled = true;
      }
      document.getElementById('p07-txt-salida-fecha').innerText = dateStr;
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
      document.getElementById('p07-txt-salida-fecha').innerText = dateStr;
      document.getElementById('p07-txt-salida-hora').innerText = esc.salida.time;
      document.getElementById('p07-txt-salida-km').innerText = `${esc.salida.km || esc.km}Km`;
    } else {
      if (boxSalida) {
        boxSalida.className = 'p-2.5 rounded-xl bg-app-fucsia text-white text-left shadow flex flex-col justify-between h-20 active:scale-95';
        boxSalida.disabled = false;
      }
      btnCierre?.classList.add('hidden');
      document.getElementById('p07-txt-salida-fecha').innerText = dateStr;
      document.getElementById('p07-txt-salida-hora').innerText = this.state.isDemoMode ? '12:01' : this.getNowTimeStr(false);
      document.getElementById('p07-txt-salida-km').innerText = kmDisplay;
    }

    this.updateGuiaPaso();
  },

  getMinAllowedKmForEscala(idx, isSalida = false) {
    const r = this.state.routes[this.state.activeRouteKey];
    const esc = r.escalas[idx];
    if (isSalida && esc.llegada && esc.llegada.km) {
      return Number(esc.llegada.km);
    }
    if (idx > 0) {
      const prev = r.escalas[idx - 1];
      if (prev.salida && prev.salida.km) return Number(prev.salida.km);
      if (prev.llegada && prev.llegada.km) return Number(prev.llegada.km);
      if (prev.km) return Number(prev.km);
    }
    return Number(r.kmInicio) || 0;
  },

  handleLlegadaClick() {
    const r = this.state.routes[this.state.activeRouteKey];
    const esc = r.escalas[this.state.selectedEscalaIdx];
    if (esc.isOrigin || esc.llegada) return;

    soundFx.tap();
    document.getElementById('modal-p08-title').innerText = `LLEGADA: ${esc.name}`;
    document.getElementById('modal-p08-sub').innerText = `Registre el proceso de LLEGADA: para - ${r.title}`;
    const kmInput = document.getElementById('input-p08-km');
    if (kmInput) {
      kmInput.value = this.state.isDemoMode ? esc.km : (esc.km || '');
    }
    document.getElementById('modal-p08-date').innerText = this.getNowDateStr();
    document.getElementById('modal-p08-clock').innerText = this.getNowTimeStr(true);
    document.getElementById('modal-p08')?.classList.remove('hidden');
  },

  handleSalidaClick() {
    const r = this.state.routes[this.state.activeRouteKey];
    const esc = r.escalas[this.state.selectedEscalaIdx];
    if (esc.isDest || esc.salida) return;

    // 1. ALERTA DE EVIDENCIA EN PRIMERA SALIDA (CANVA PÁG 59)
    if (esc.isOrigin && !r.evidenciaAdjuntada) {
      this.recordError(
        'ERR_FALTA_EVIDENCIA_ORIGEN',
        `Intentó marcar SALIDA en ${esc.name} sin adjuntar evidencia fotográfica`,
        'Lámina 59: En el punto de origen es obligatorio tomar y adjuntar la foto del precinto/candado antes de registrar la SALIDA.',
        'CRITICO',
        `P07_${esc.name}`
      );
      document.getElementById('modal-alerta-evidencia')?.classList.remove('hidden');
      return;
    }

    // 2. En escalas intermedias, no puede marcar SALIDA sin haber marcado LLEGADA primero
    if (!esc.isOrigin && !esc.llegada) {
      this.recordError(
        'ERR_SALIDA_SIN_LLEGADA',
        `Intentó marcar SALIDA en ${esc.name} sin registrar primero su LLEGADA`,
        `El conductor presionó el botón SALIDA en la escala intermedia ${esc.name} cuando aún no había registrado la LLEGADA.`,
        'GRAVE',
        `P07_${esc.name}`
      );
      this.showOperativeErrorModal(
        'Llegada Pendiente',
        `Primero debe registrar su LLEGADA a la escala ${esc.name} antes de poder registrar la SALIDA.`
      );
      return;
    }

    soundFx.tap();
    document.getElementById('modal-p09-title').innerText = `SALIDA: ${esc.name}`;
    document.getElementById('modal-p09-sub').innerText = r.title;
    const kmInput = document.getElementById('input-p09-km');
    if (kmInput) {
      kmInput.value = this.state.isDemoMode ? esc.km : (esc.llegada?.km || esc.km || '');
    }
    const precInput = document.getElementById('input-p09-precinto');
    if (precInput) {
      precInput.value = this.state.isDemoMode ? (esc.precinto || '0094821') : (esc.precinto || '');
    }
    document.getElementById('modal-p09-date').innerText = this.getNowDateStr();
    document.getElementById('modal-p09-clock').innerText = this.getNowTimeStr(true);
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
    const idx = this.state.selectedEscalaIdx;
    const r = this.state.routes[this.state.activeRouteKey];
    const esc = r.escalas[idx];
    const kmVal = (document.getElementById('input-p08-km')?.value || '').trim();
    const minKm = this.getMinAllowedKmForEscala(idx, false);

    if (!kmVal || isNaN(Number(kmVal)) || Number(kmVal) <= 0) {
      this.recordError(
        'ERR_KM_LLEGADA_VACIO',
        `Kilometraje de LLEGADA vacío en ${esc.name}`,
        `El conductor intentó registrar LLEGADA en ${esc.name} sin digitar el kilometraje.`,
        'MEDIO',
        `P07_${esc.name}`
      );
      this.showOperativeErrorModal('Kilometraje Requerido', 'Debe ingresar el kilometraje actual de llegada.');
      return;
    }

    if (Number(kmVal) <= minKm) {
      this.recordError(
        'ERR_KM_LLEGADA_MENOR_IGUAL',
        `Kilometraje de LLEGADA incoherente en ${esc.name}`,
        `Ingresó ${kmVal} Km en LLEGADA a ${esc.name}, igual o menor al kilometraje del punto previo (${minKm} Km). Debe existir avance en el odómetro entre agencias.`,
        'GRAVE',
        `P07_${esc.name}`
      );
      this.showOperativeErrorModal(
        'Kilometraje Incoherente',
        `El kilometraje de llegada (${kmVal} Km) no puede ser igual ni menor al punto anterior (${minKm} Km). Debe registrar el kilometraje real de avance.`
      );
      return;
    }

    document.getElementById('modal-p08')?.classList.add('hidden');
    const nowTime = this.getNowTimeStr(false);
    esc.km = Number(kmVal);
    esc.llegada = { time: nowTime, km: Number(kmVal) };

    this.openExitoModal('Llegada registrada con exito!', () => {
      this.setupP07();
    });
  },

  submitModalSalida() {
    const idx = this.state.selectedEscalaIdx;
    const r = this.state.routes[this.state.activeRouteKey];
    const esc = r.escalas[idx];
    const kmVal = (document.getElementById('input-p09-km')?.value || '').trim();
    const precVal = (document.getElementById('input-p09-precinto')?.value || '').trim();
    const minKm = this.getMinAllowedKmForEscala(idx, true);

    if (!kmVal || isNaN(Number(kmVal)) || Number(kmVal) <= 0) {
      this.recordError(
        'ERR_KM_SALIDA_VACIO',
        `Kilometraje de SALIDA vacío en ${esc.name}`,
        `El conductor intentó registrar SALIDA en ${esc.name} sin digitar el kilometraje.`,
        'MEDIO',
        `P07_${esc.name}`
      );
      this.showOperativeErrorModal('Kilometraje Requerido', 'Debe ingresar el kilometraje de salida.');
      return;
    }

    if (Number(kmVal) < minKm) {
      this.recordError(
        'ERR_KM_SALIDA_MENOR',
        `Kilometraje de SALIDA menor al previo en ${esc.name}`,
        `Ingresó ${kmVal} Km al salir de ${esc.name}, menor al kilometraje registrado previamente (${minKm} Km).`,
        'GRAVE',
        `P07_${esc.name}`
      );
      this.showOperativeErrorModal(
        'Kilometraje Incoherente',
        `El kilometraje de salida (${kmVal} Km) no puede ser menor al kilometraje de llegada/inicio (${minKm} Km).`
      );
      return;
    }

    // Requerimiento: Por el momento no deben registrar el precinto (no es obligatorio)
    document.getElementById('modal-p09')?.classList.add('hidden');
    const nowTime = this.getNowTimeStr(false);
    esc.km = Number(kmVal);
    esc.precinto = precVal || '';
    esc.salida = { time: nowTime, km: Number(kmVal) };
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
    const r = this.state.routes[this.state.activeRouteKey];
    if (r.status === 'COMPLETADO') return;

    const allEscalasDone = r.escalas.every(e => e.status === 'COMPLETADO');
    if (!allEscalasDone) {
      const pendingNames = r.escalas.filter(e => e.status !== 'COMPLETADO').map(e => e.name).join(', ');
      this.recordError(
        'ERR_CIERRE_PREMATURO',
        'Intentó grabar Final de Ruta con escalas sin completar',
        `Lámina 61: El conductor presionó GRABAR FINAL DE RUTA cuando aún faltaban completar las escalas: ${pendingNames}.`,
        'GRAVE',
        'P04_FIN_RUTA'
      );
      this.showOperativeErrorModal(
        'Escalas Pendientes',
        `No puede cerrar la ruta todavía. Primero debe completar todas las escalas en la Hoja de Ruta (${pendingNames}).`
      );
      return;
    }

    const kmFinVal = (document.getElementById('input-p04-km-fin')?.value || '').trim();
    const canFinVal = (document.getElementById('input-p04-candados-fin')?.value || '').trim();
    const lastEsc = r.escalas[r.escalas.length - 1];
    const minFinKm = Number(lastEsc?.llegada?.km || lastEsc?.km || r.kmInicio || 0);

    if (!kmFinVal || isNaN(Number(kmFinVal)) || Number(kmFinVal) <= 0) {
      this.recordError(
        'ERR_KM_FIN_VACIO',
        'Intentó grabar Final de Ruta sin Kilometraje Final',
        'El conductor presionó GRABAR FINAL DE RUTA dejando el campo KILOMETRAJE final en blanco.',
        'MEDIO',
        'P04_FIN_RUTA'
      );
      this.showOperativeErrorModal('Kilometraje Final Requerido', 'Debe ingresar el KILOMETRAJE final para cerrar la ruta.');
      return;
    }

    if (Number(kmFinVal) < minFinKm) {
      this.recordError(
        'ERR_KM_FIN_MENOR',
        'Kilometraje Final menor al kilometraje de las escalas',
        `El conductor ingresó ${kmFinVal} Km en Fin de Ruta, menor al último kilometraje registrado en la ruta (${minFinKm} Km).`,
        'GRAVE',
        'P04_FIN_RUTA'
      );
      this.showOperativeErrorModal(
        'Kilometraje Final Incoherente',
        `El kilometraje final (${kmFinVal} Km) no puede ser menor al kilometraje de la última escala (${minFinKm} Km).`
      );
      return;
    }

    if (canFinVal === '' || isNaN(Number(canFinVal)) || Number(canFinVal) < 0) {
      this.recordError(
        'ERR_CANDADOS_FIN_VACIO',
        'Intentó grabar Final de Ruta sin N° de Candados finales',
        'El conductor presionó GRABAR FINAL DE RUTA dejando vacío el campo N° CANDADOS.',
        'MEDIO',
        'P04_FIN_RUTA'
      );
      this.showOperativeErrorModal('N° de Candados Requerido', 'Debe ingresar el N° DE CANDADOS finales antes de cerrar la ruta.');
      return;
    }

    r.kmFin = Number(kmFinVal);
    r.candadosFin = Number(canFinVal);

    soundFx.tap();
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

    const p04FinFecha = document.getElementById('p04-fin-fecha');
    const p04FinHora = document.getElementById('p04-fin-hora');
    if (p04FinFecha) p04FinFecha.innerText = this.getNowDateStr();
    if (p04FinHora) p04FinHora.innerText = this.state.isDemoMode ? '12:34:45' : this.getNowTimeStr(true);

    document.getElementById('p04-pencil-fin')?.classList.remove('hidden');
    const btnFin = document.getElementById('btn-p04-grabar-fin');
    if (btnFin) {
      btnFin.classList.remove('bg-app-header', 'hover:bg-blue-900');
      btnFin.classList.add('bg-slate-400', 'cursor-not-allowed');
    }

    const diff = Math.max(0, Number(r.kmFin) - Number(r.kmInicio));

    if (key === 'IDA') {
      // Desbloquear RETORNO (Lámina 62)
      const rRet = this.state.routes.RET;
      rRet.status = 'PENDIENTE';
      if (this.state.isDemoMode) {
        rRet.kmInicio = r.kmFin;
      }
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
      const kminEl = document.getElementById('lbl-p02-ida-kmin');
      const kmfinEl = document.getElementById('lbl-p02-ida-kmfin');
      const difClosedEl = document.getElementById('lbl-p02-ida-difkm-closed');
      if (kminEl) kminEl.innerText = `${r.kmInicio} Km`;
      if (kmfinEl) kmfinEl.innerText = `${r.kmFin} Km`;
      if (difClosedEl) difClosedEl.innerText = `${diff}`;
      document.getElementById('p02-ida-details-closed')?.classList.remove('hidden');
    } else {
      const badgeRet = document.getElementById('badge-p02-ret');
      if (badgeRet) {
        badgeRet.innerText = 'COMPLETADO';
        badgeRet.className = 'px-2 py-0.5 rounded text-[10px] font-black bg-app-verde text-white';
      }
      const kminEl = document.getElementById('lbl-p02-ret-kmin');
      const kmfinEl = document.getElementById('lbl-p02-ret-kmfin');
      const difClosedEl = document.getElementById('lbl-p02-ret-difkm-closed');
      if (kminEl) kminEl.innerText = `${r.kmInicio} Km`;
      if (kmfinEl) kmfinEl.innerText = `${r.kmFin} Km`;
      if (difClosedEl) difClosedEl.innerText = `${diff}`;
      document.getElementById('p02-ret-details-closed')?.classList.remove('hidden');
    }

    this.setupP04();
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
    if (confirm('¿Desea reiniciar el intento actual de la ruta? (El historial de errores del DNI se conservará en Perfil)')) {
      this.reiniciarIntentoConductor();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => app.init());
