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
