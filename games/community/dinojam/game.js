(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const colors = [
    { id: "yellow", hex: "#f3be24", dino: "🦕" },
    { id: "red", hex: "#ed514b", dino: "🦖" },
    { id: "blue", hex: "#3c8fe8", dino: "🦎" },
    { id: "green", hex: "#54b84a", dino: "🦕" },
    { id: "orange", hex: "#ee8736", dino: "🦖" },
    { id: "purple", hex: "#9564d8", dino: "🦎" },
  ];
  const translations = {
    "pt-PT": {
      tagline: "Organiza o trânsito e ajuda os dinos!",
      play: "JOGAR",
      levels: "ESCOLHER NÍVEL",
      choose: "Escolhe um nível",
      level: "NÍVEL",
      points: "PONTOS",
      queue: "PRÓXIMOS DINOS",
      exit: "SAÍDA",
      waiting: "ZONA DE ESPERA",
      complete: "NÍVEL CONCLUÍDO",
      win: "Trânsito resolvido!",
      score: "Pontuação",
      next: "PRÓXIMO NÍVEL",
      retry: "JOGAR NOVAMENTE",
      blocked: "Este veículo ainda está bloqueado",
      full: "A zona de espera está cheia",
      hint: "Procura o veículo da cor dos primeiros dinos",
      locked: "Completa o nível anterior",
    },
    "pt-BR": {
      tagline: "Organize o trânsito e ajude os dinos!",
      play: "JOGAR",
      levels: "ESCOLHER FASE",
      choose: "Escolha uma fase",
      level: "FASE",
      points: "PONTOS",
      queue: "PRÓXIMOS DINOS",
      exit: "SAÍDA",
      waiting: "ÁREA DE ESPERA",
      complete: "FASE CONCLUÍDA",
      win: "Trânsito resolvido!",
      score: "Pontuação",
      next: "PRÓXIMA FASE",
      retry: "JOGAR NOVAMENTE",
      blocked: "Este veículo ainda está bloqueado",
      full: "A área de espera está cheia",
      hint: "Procure o veículo da cor dos primeiros dinos",
      locked: "Complete a fase anterior",
    },
    en: {
      tagline: "Sort the traffic and help the dinos!",
      play: "PLAY",
      levels: "CHOOSE LEVEL",
      choose: "Choose a level",
      level: "LEVEL",
      points: "SCORE",
      queue: "NEXT DINOS",
      exit: "EXIT",
      waiting: "WAITING AREA",
      complete: "LEVEL COMPLETE",
      win: "Traffic solved!",
      score: "Score",
      next: "NEXT LEVEL",
      retry: "PLAY AGAIN",
      blocked: "This vehicle is still blocked",
      full: "The waiting area is full",
      hint: "Find the vehicle matching the first dinos",
      locked: "Complete the previous level",
    },
    fr: {
      tagline: "Range le trafic et aide les dinos !",
      play: "JOUER",
      levels: "CHOISIR UN NIVEAU",
      choose: "Choisis un niveau",
      level: "NIVEAU",
      points: "POINTS",
      queue: "PROCHAINS DINOS",
      exit: "SORTIE",
      waiting: "ZONE D’ATTENTE",
      complete: "NIVEAU TERMINÉ",
      win: "Trafic résolu !",
      score: "Score",
      next: "NIVEAU SUIVANT",
      retry: "REJOUER",
      blocked: "Ce véhicule est encore bloqué",
      full: "La zone d’attente est pleine",
      hint: "Trouve le véhicule de la couleur des premiers dinos",
      locked: "Termine le niveau précédent",
    },
    de: {
      tagline: "Ordne den Verkehr und hilf den Dinos!",
      play: "SPIELEN",
      levels: "LEVEL WÄHLEN",
      choose: "Wähle ein Level",
      level: "LEVEL",
      points: "PUNKTE",
      queue: "NÄCHSTE DINOS",
      exit: "AUSGANG",
      waiting: "WARTEBEREICH",
      complete: "LEVEL GESCHAFFT",
      win: "Verkehr gelöst!",
      score: "Punktzahl",
      next: "NÄCHSTES LEVEL",
      retry: "NOCH EINMAL",
      blocked: "Dieses Fahrzeug ist noch blockiert",
      full: "Der Wartebereich ist voll",
      hint: "Finde das Fahrzeug in der Farbe der ersten Dinos",
      locked: "Schließe das vorige Level ab",
    },
    es: {
      tagline: "¡Ordena el tráfico y ayuda a los dinos!",
      play: "JUGAR",
      levels: "ELEGIR NIVEL",
      choose: "Elige un nivel",
      level: "NIVEL",
      points: "PUNTOS",
      queue: "PRÓXIMOS DINOS",
      exit: "SALIDA",
      waiting: "ZONA DE ESPERA",
      complete: "NIVEL COMPLETADO",
      win: "¡Tráfico resuelto!",
      score: "Puntuación",
      next: "SIGUIENTE NIVEL",
      retry: "JUGAR DE NUEVO",
      blocked: "Este vehículo sigue bloqueado",
      full: "La zona de espera está llena",
      hint: "Busca el vehículo del color de los primeros dinos",
      locked: "Completa el nivel anterior",
    },
    pl: {
      tagline: "Uporządkuj ruch i pomóż dinozaurom!",
      play: "GRAJ",
      levels: "WYBIERZ POZIOM",
      choose: "Wybierz poziom",
      level: "POZIOM",
      points: "PUNKTY",
      queue: "NASTĘPNE DINOZAURY",
      exit: "WYJAZD",
      waiting: "STREFA OCZEKIWANIA",
      complete: "POZIOM UKOŃCZONY",
      win: "Ruch uporządkowany!",
      score: "Wynik",
      next: "NASTĘPNY POZIOM",
      retry: "ZAGRAJ PONOWNIE",
      blocked: "Ten pojazd jest jeszcze zablokowany",
      full: "Strefa oczekiwania jest pełna",
      hint: "Znajdź pojazd w kolorze pierwszych dinozaurów",
      locked: "Ukończ poprzedni poziom",
    },
  };
  let text = translations.en,
    levelIndex = 0,
    unlocked = 1,
    best = {},
    lanes = [],
    queue = [],
    waiting = [],
    score = 0,
    mistakes = 0,
    soundOn = true,
    audio = null,
    running = false;

  function seeded(seed) {
    let value = seed >>> 0;
    return () => (value = (value * 1664525 + 1013904223) >>> 0) / 4294967296;
  }
  function makeLevel(index) {
    const random = seeded(8103 + index * 977),
      colorCount = Math.min(6, 3 + Math.floor(index / 7)),
      groupCount = Math.min(13, 4 + Math.floor(index / 2)),
      laneCount = Math.min(5, 3 + Math.floor(index / 10)),
      available = colors.slice(0, colorCount),
      groups = [];
    let previous = -1;
    for (let i = 0; i < groupCount; i++) {
      let pick = Math.floor(random() * colorCount);
      if (pick === previous)
        pick = (pick + 1 + (i % (colorCount - 1))) % colorCount;
      previous = pick;
      groups.push(available[pick]);
    }
    const rows = Array.from({ length: laneCount }, () => []);
    groups.forEach((color, i) =>
      rows[i % laneCount].push({ color, type: i % 4 }),
    );
    return { groups, rows, bays: index < 8 ? 4 : index < 20 ? 5 : 6 };
  }
  const levels = Array.from({ length: 30 }, (_, i) => makeLevel(i));
  function tone(frequency, duration = 0.08) {
    if (!soundOn) return;
    try {
      audio ||= new AudioContext();
      const oscillator = audio.createOscillator(),
        gain = audio.createGain();
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.05, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + duration,
      );
      oscillator.connect(gain).connect(audio.destination);
      oscillator.start();
      oscillator.stop(audio.currentTime + duration);
    } catch {}
  }
  function show(id) {
    document
      .querySelectorAll(".screen")
      .forEach((screen) => screen.classList.remove("open"));
    if (id) $(id).classList.add("open");
  }
  function toast(message) {
    $("toast").textContent = message;
    $("toast").classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => $("toast").classList.remove("show"), 1500);
  }
  function translate() {
    $("tagline").textContent = text.tagline;
    $("play").textContent = text.play;
    $("levelsButton").textContent = text.levels;
    $("levelsTitle").textContent = text.choose;
    $("levelWord").textContent = text.level;
    $("scoreWord").textContent = text.points;
    $("queueLabel").textContent = text.queue;
    $("exitLabel").textContent = text.exit;
    $("waitingLabel").textContent = text.waiting;
    $("resultEyebrow").textContent = text.complete;
    $("resultTitle").textContent = text.win;
    $("finalScoreLabel").textContent = text.score;
    $("next").textContent = text.next;
    $("retry").textContent = text.retry;
    $("resultLevels").textContent = text.levels;
  }
  function buildLevelGrid() {
    const grid = $("levelGrid");
    grid.innerHTML = "";
    levels.forEach((_, index) => {
      const button = document.createElement("button"),
        stars = best[index]?.stars || 0;
      button.className = `level-tile ${index < unlocked ? "done" : "locked"}`;
      button.innerHTML = `${index + 1}<small>${"★".repeat(stars)}${"☆".repeat(3 - stars)}</small>`;
      button.onclick = () => {
        if (index >= unlocked) return toast(text.locked);
        levelIndex = index;
        loadLevel();
      };
      grid.appendChild(button);
    });
  }
  function loadLevel() {
    const level = levels[levelIndex];
    lanes = level.rows.map((row) => row.map((vehicle) => ({ ...vehicle })));
    queue = [...level.groups];
    waiting = [];
    score = 1000 + levelIndex * 100;
    mistakes = 0;
    running = true;
    document.body.classList.add("playing");
    $("levelNumber").textContent = levelIndex + 1;
    show(null);
    render();
    tone(440);
  }
  function vehicleName(type) {
    return ["CARRO", "BUS", "VAN", "TRUCK"][type] || "CARRO";
  }
  function render() {
    $("score").textContent = score;
    $("remaining").textContent = queue.length;
    const queueBox = $("passengerQueue");
    queueBox.innerHTML = "";
    queue.slice(0, 6).forEach((color, index) => {
      const group = document.createElement("div");
      group.className = `passenger-group ${index > 3 ? "hidden-group" : ""}`;
      group.style.setProperty("--group-color", color.hex);
      group.textContent = color.dino.repeat(3);
      queueBox.appendChild(group);
    });
    const parking = $("parking");
    parking.innerHTML = "";
    lanes.forEach((lane, laneIndex) => {
      const laneBox = document.createElement("div");
      laneBox.className = "lane";
      lane.forEach((vehicle, vehicleIndex) => {
        const button = document.createElement("button");
        button.className = `vehicle ${vehicleIndex ? "blocked" : ""}`;
        button.style.setProperty("--car", vehicle.color.hex);
        button.innerHTML = `<span>${vehicleName(vehicle.type)}</span>`;
        button.setAttribute(
          "aria-label",
          `${vehicleName(vehicle.type)} ${vehicle.color.id}`,
        );
        button.onclick = () => selectVehicle(laneIndex, vehicleIndex);
        laneBox.appendChild(button);
      });
      parking.appendChild(laneBox);
    });
    const waitingBox = $("waiting"),
      bays = levels[levelIndex].bays;
    waitingBox.innerHTML = "";
    for (let i = 0; i < bays; i++) {
      const bay = document.createElement("div"),
        vehicle = waiting[i];
      bay.className = `bay ${vehicle ? "filled" : ""}`;
      if (vehicle) {
        bay.style.setProperty("--car", vehicle.color.hex);
        bay.textContent = "🚐";
      } else bay.textContent = "+";
      waitingBox.appendChild(bay);
    }
  }
  function selectVehicle(laneIndex, vehicleIndex) {
    if (!running) return;
    if (vehicleIndex !== 0) {
      mistakes++;
      score = Math.max(0, score - 25);
      toast(text.blocked);
      tone(150, 0.12);
      return;
    }
    const vehicle = lanes[laneIndex][0],
      direct = queue[0]?.id === vehicle.color.id;
    if (!direct && waiting.length >= levels[levelIndex].bays) {
      mistakes++;
      score = Math.max(0, score - 50);
      toast(text.full);
      tone(130, 0.14);
      return;
    }
    lanes[laneIndex].shift();
    if (direct) {
      queue.shift();
      score += 250;
      tone(660);
      processWaiting();
    } else {
      waiting.push(vehicle);
      score = Math.max(0, score - 15);
      tone(310);
    }
    render();
    if (!queue.length) finish();
    else checkStuck();
  }
  function processWaiting() {
    let moved = true;
    while (moved && queue.length) {
      moved = false;
      const index = waiting.findIndex(
        (vehicle) => vehicle.color.id === queue[0].id,
      );
      if (index >= 0) {
        waiting.splice(index, 1);
        queue.shift();
        score += 200;
        moved = true;
      }
    }
  }
  function checkStuck() {
    if (waiting.length < levels[levelIndex].bays) return;
    const canMove = lanes.some((lane) => lane[0]?.color.id === queue[0]?.id);
    if (!canMove) setTimeout(() => toast(text.hint), 300);
  }
  async function finish() {
    running = false;
    const stars = mistakes === 0 ? 3 : mistakes < 3 ? 2 : 1;
    score += stars * 500;
    const previous = best[levelIndex];
    if (!previous || score > previous.score)
      best[levelIndex] = {
        score,
        stars: Math.max(stars, previous?.stars || 0),
      };
    unlocked = Math.max(unlocked, Math.min(levels.length, levelIndex + 2));
    await save();
    $("stars").textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
    $("finalScore").textContent = score;
    $("next").style.display = levelIndex < levels.length - 1 ? "block" : "none";
    setTimeout(() => show("result"), 450);
    tone(784, 0.18);
  }
  async function save() {
    const value = { unlocked, best };
    try {
      await DinoPlay.storage.set("dinojam-progress", value);
    } catch {
      localStorage.setItem("dinojam-progress", JSON.stringify(value));
    }
  }
  function openLevels() {
    buildLevelGrid();
    show("levels");
  }
  $("play").onclick = () => {
    levelIndex = Math.min(unlocked - 1, levels.length - 1);
    loadLevel();
  };
  $("levelsButton").onclick = openLevels;
  $("closeLevels").onclick = () => show("home");
  $("back").onclick = () => {
    running = false;
    document.body.classList.remove("playing");
    show("home");
  };
  $("restart").onclick = loadLevel;
  $("hint").onclick = () => {
    toast(text.hint);
    const wanted = queue[0]?.id;
    document
      .querySelectorAll(".vehicle:not(.blocked)")
      .forEach((vehicle, i) => {
        if (lanes[i]?.[0]?.color.id === wanted)
          vehicle.animate(
            [
              { transform: "scale(1)" },
              { transform: "scale(1.1)" },
              { transform: "scale(1)" },
            ],
            { duration: 650, iterations: 2 },
          );
      });
  };
  $("sound").onclick = () => {
    soundOn = !soundOn;
    $("sound").textContent = soundOn ? "🔊" : "🔇";
    tone(440);
  };
  $("next").onclick = () => {
    levelIndex = Math.min(levels.length - 1, levelIndex + 1);
    loadLevel();
  };
  $("retry").onclick = loadLevel;
  $("resultLevels").onclick = openLevels;

  async function start() {
    let language = "en";
    try {
      const context = await DinoPlay.ready();
      language = context.language || "en";
      const saved = await DinoPlay.storage.get("dinojam-progress");
      if (saved) {
        unlocked = Math.max(1, Number(saved.unlocked) || 1);
        best = saved.best || {};
      }
    } catch {
      try {
        const saved = JSON.parse(localStorage.getItem("dinojam-progress"));
        if (saved) {
          unlocked = Math.max(1, Number(saved.unlocked) || 1);
          best = saved.best || {};
        }
      } catch {}
    }
    text = translations[language] || translations.en;
    translate();
    buildLevelGrid();
  }
  start();
})();
