(() => {
  "use strict";
  const W = 1280,
    H = 720,
    GROUND = 622,
    SLING = { x: 175, y: 500 },
    GRAVITY = 520;
  const canvas = document.querySelector("#game"),
    ctx = canvas.getContext("2d");
  const $ = (id) => document.getElementById(id);
  const ui = {
    home: $("home"),
    levels: $("levels"),
    intro: $("intro"),
    result: $("result"),
    score: $("score"),
    level: $("levelLabel"),
    world: $("worldLabel"),
    toast: $("toast"),
    hint: $("abilityHint"),
  };
  const copy = {
    "pt-PT": {
      tag: "Lança, derruba e salva os ovos!",
      play: "Jogar",
      levels: "Escolher nível",
      choose: "Escolhe um nível",
      mission: "Missão",
      missionTitle: "Salvar os ovos",
      missionText: "Derruba todos os robôs sem desperdiçar lançamentos.",
      tip: "Puxa o dinossauro para trás e larga.",
      start: "Começar",
      points: "Pontos",
      complete: "Nível concluído",
      great: "Excelente!",
      score: "Pontuação",
      next: "Próximo nível",
      retry: "Jogar novamente",
      ability: "Toca no ecrã durante o voo para usar o poder!",
      locked: "Completa o nível anterior",
      lost: "Tenta outra vez!",
      launch: "LANÇAR",
      worlds: ["Vale Verde", "Deserto Dourado", "Montanha Gelada"],
      powers: {
        dash: "Toque: Super impulso",
        heavy: "Toque: Impacto pesado",
        split: "Toque: Trio veloz",
      },
    },
    "pt-BR": {
      tag: "Lance, derrube e salve os ovos!",
      play: "Jogar",
      levels: "Escolher fase",
      choose: "Escolha uma fase",
      mission: "Missão",
      missionTitle: "Salvar os ovos",
      missionText: "Derrube todos os robôs sem desperdiçar lançamentos.",
      tip: "Puxe o dinossauro para trás e solte.",
      start: "Começar",
      points: "Pontos",
      complete: "Fase concluída",
      great: "Excelente!",
      score: "Pontuação",
      next: "Próxima fase",
      retry: "Jogar novamente",
      ability: "Toque na tela durante o voo para usar o poder!",
      locked: "Complete a fase anterior",
      lost: "Tente novamente!",
      launch: "LANÇAR",
      worlds: ["Vale Verde", "Deserto Dourado", "Montanha Gelada"],
      powers: {
        dash: "Toque: Super impulso",
        heavy: "Toque: Impacto pesado",
        split: "Toque: Trio veloz",
      },
    },
    en: {
      tag: "Launch, tumble and save the eggs!",
      play: "Play",
      levels: "Choose level",
      choose: "Choose a level",
      mission: "Mission",
      missionTitle: "Save the eggs",
      missionText: "Knock down every robot with as few launches as possible.",
      tip: "Pull the dinosaur back and release.",
      start: "Start",
      points: "Points",
      complete: "Level complete",
      great: "Brilliant!",
      score: "Score",
      next: "Next level",
      retry: "Play again",
      ability: "Tap the screen in flight to use the power!",
      locked: "Complete the previous level",
      lost: "Try again!",
      launch: "LAUNCH",
      worlds: ["Green Valley", "Golden Desert", "Frozen Mountain"],
      powers: {
        dash: "Tap: Super dash",
        heavy: "Tap: Heavy impact",
        split: "Tap: Speedy trio",
      },
    },
    fr: {
      tag: "Lance, renverse et sauve les œufs !",
      play: "Jouer",
      levels: "Choisir un niveau",
      choose: "Choisis un niveau",
      mission: "Mission",
      missionTitle: "Sauver les œufs",
      missionText: "Renverse tous les robots avec peu de lancers.",
      tip: "Tire le dinosaure vers l’arrière et relâche.",
      start: "Commencer",
      points: "Points",
      complete: "Niveau terminé",
      great: "Excellent !",
      score: "Score",
      next: "Niveau suivant",
      retry: "Rejouer",
      ability: "Touche l’écran en vol pour utiliser le pouvoir !",
      locked: "Termine le niveau précédent",
      lost: "Réessaie !",
      launch: "LANCER",
      worlds: ["Vallée Verte", "Désert Doré", "Montagne Gelée"],
      powers: {
        dash: "Toucher : Super élan",
        heavy: "Toucher : Impact lourd",
        split: "Toucher : Trio rapide",
      },
    },
    de: {
      tag: "Schleudern, umwerfen und Eier retten!",
      play: "Spielen",
      levels: "Level wählen",
      choose: "Wähle ein Level",
      mission: "Mission",
      missionTitle: "Rette die Eier",
      missionText: "Wirf alle Roboter mit wenigen Würfen um.",
      tip: "Ziehe den Dino zurück und lass los.",
      start: "Start",
      points: "Punkte",
      complete: "Level geschafft",
      great: "Großartig!",
      score: "Punktzahl",
      next: "Nächstes Level",
      retry: "Noch einmal",
      ability: "Tippe im Flug für die Spezialkraft!",
      locked: "Schließe das vorige Level ab",
      lost: "Versuch es noch einmal!",
      launch: "START",
      worlds: ["Grünes Tal", "Goldene Wüste", "Eisberg"],
      powers: {
        dash: "Tippen: Superschub",
        heavy: "Tippen: Schwerer Aufprall",
        split: "Tippen: Flinkes Trio",
      },
    },
    es: {
      tag: "¡Lanza, derriba y salva los huevos!",
      play: "Jugar",
      levels: "Elegir nivel",
      choose: "Elige un nivel",
      mission: "Misión",
      missionTitle: "Salvar los huevos",
      missionText: "Derriba todos los robots con pocos lanzamientos.",
      tip: "Tira del dinosaurio hacia atrás y suelta.",
      start: "Empezar",
      points: "Puntos",
      complete: "Nivel completado",
      great: "¡Excelente!",
      score: "Puntuación",
      next: "Siguiente nivel",
      retry: "Jugar de nuevo",
      ability: "¡Toca la pantalla durante el vuelo para usar el poder!",
      locked: "Completa el nivel anterior",
      lost: "¡Inténtalo otra vez!",
      launch: "LANZAR",
      worlds: ["Valle Verde", "Desierto Dorado", "Montaña Helada"],
      powers: {
        dash: "Toque: Superimpulso",
        heavy: "Toque: Impacto pesado",
        split: "Toque: Trío veloz",
      },
    },
    pl: {
      tag: "Wystrzel, przewróć i uratuj jaja!",
      play: "Graj",
      levels: "Wybierz poziom",
      choose: "Wybierz poziom",
      mission: "Misja",
      missionTitle: "Uratuj jaja",
      missionText: "Przewróć wszystkie roboty jak najmniejszą liczbą strzałów.",
      tip: "Odciągnij dinozaura i puść.",
      start: "Start",
      points: "Punkty",
      complete: "Poziom ukończony",
      great: "Wspaniale!",
      score: "Wynik",
      next: "Następny poziom",
      retry: "Zagraj ponownie",
      ability: "Dotknij ekranu w locie, aby użyć mocy!",
      locked: "Ukończ poprzedni poziom",
      lost: "Spróbuj ponownie!",
      launch: "WYSTRZEL",
      worlds: ["Zielona Dolina", "Złota Pustynia", "Lodowa Góra"],
      powers: {
        dash: "Dotknij: Super pęd",
        heavy: "Dotknij: Mocne uderzenie",
        split: "Dotknij: Szybkie trio",
      },
    },
  };
  let text = copy.en,
    language = "en",
    soundOn = true,
    audio = null,
    levelIndex = 0,
    unlocked = 1,
    best = {},
    score = 0,
    shots = 0,
    maxShots = 4,
    objects = [],
    projectiles = [],
    current = null,
    dragging = false,
    running = false,
    settle = 0,
    last = 0,
    particles = [],
    shake = 0,
    shotTransition = false;
  const dinos = [
    {
      id: "dash",
      name: "Rico",
      color: "#63d34c",
      belly: "#d9f49b",
      power: 1.5,
      emoji: "🦖",
      sprite: "characters/rico-trex.png",
      spriteScale: 5.2,
    },
    {
      id: "heavy",
      name: "Tuca",
      color: "#f09b43",
      belly: "#ffe09a",
      power: 1.2,
      emoji: "🦕",
      sprite: "characters/tuca-triceratops.png",
      spriteScale: 5,
    },
    {
      id: "split",
      name: "Pipa",
      color: "#45bde4",
      belly: "#c8f2ff",
      power: 1.35,
      emoji: "🦎",
      sprite: "characters/pipa-pteranodon.png",
      spriteScale: 6.2,
    },
  ];
  const spriteImages = Object.fromEntries(
    dinos.map((dino) => {
      const image = new Image();
      image.decoding = "async";
      image.src = dino.sprite;
      return [dino.id, image];
    }),
  );
  const scenes = [
    {
      top: "#50c9ff",
      bottom: "#dff9ff",
      ground: "#63ca45",
      far: "#3fa65a",
      accent: "#ffe46b",
      kind: "meadow",
    },
    {
      top: "#7b72ef",
      bottom: "#ffc8a8",
      ground: "#5fc94b",
      far: "#486aa8",
      accent: "#ffd36c",
      kind: "sunrise",
    },
    {
      top: "#1ea4d8",
      bottom: "#bbf3ed",
      ground: "#3abf65",
      far: "#187b68",
      accent: "#a9f0ff",
      kind: "waterfall",
    },
    {
      top: "#4db9f4",
      bottom: "#eefcff",
      ground: "#54bd3e",
      far: "#27894a",
      accent: "#ff8d79",
      kind: "jungle",
    },
    {
      top: "#f28f68",
      bottom: "#ffe5a5",
      ground: "#559d3b",
      far: "#765c6b",
      accent: "#fff0a0",
      kind: "sunset",
    },
    {
      top: "#55b8e8",
      bottom: "#fff0b9",
      ground: "#dcb550",
      far: "#c77c3b",
      accent: "#fff4a3",
      kind: "dunes",
    },
    {
      top: "#2cb7c9",
      bottom: "#d8ffcf",
      ground: "#d5aa49",
      far: "#a65b35",
      accent: "#55d7b0",
      kind: "oasis",
    },
    {
      top: "#e46d52",
      bottom: "#ffd0a0",
      ground: "#c99045",
      far: "#8e4539",
      accent: "#ffd072",
      kind: "canyon",
    },
    {
      top: "#7bcfe8",
      bottom: "#fff1c8",
      ground: "#d7b25e",
      far: "#a47751",
      accent: "#aee9ec",
      kind: "ruins",
    },
    {
      top: "#162c63",
      bottom: "#8b4d80",
      ground: "#9a713e",
      far: "#342d59",
      accent: "#fff3ba",
      kind: "desert-night",
    },
    {
      top: "#7cdcff",
      bottom: "#eefcff",
      ground: "#d8f7ff",
      far: "#79bad3",
      accent: "#ffffff",
      kind: "glacier",
    },
    {
      top: "#172b63",
      bottom: "#4879a8",
      ground: "#cdeeff",
      far: "#315d7a",
      accent: "#6fffd8",
      kind: "aurora",
    },
    {
      top: "#b9ebff",
      bottom: "#ffffff",
      ground: "#dff8ff",
      far: "#8bc7dc",
      accent: "#82d9ff",
      kind: "frozen-lake",
    },
    {
      top: "#6baad8",
      bottom: "#e8f8ff",
      ground: "#d4f3fb",
      far: "#4d809d",
      accent: "#dff8ff",
      kind: "snow-pines",
    },
    {
      top: "#384b7a",
      bottom: "#f29c7d",
      ground: "#cfeaf1",
      far: "#5a6275",
      accent: "#ffb35f",
      kind: "ice-volcano",
    },
  ];
  const materials = {
    wood: { color: "#d69a54", edge: "#8b572d", hp: 85 },
    stone: { color: "#8da6b1", edge: "#526976", hp: 150 },
    ice: { color: "#91e7fb", edge: "#3ba9d0", hp: 62 },
  };
  const patterns = [
    [
      { x: 850, y: 530, w: 36, h: 180, m: "wood" },
      { x: 1035, y: 530, w: 36, h: 180, m: "wood" },
      { x: 820, y: 425, w: 250, h: 32, m: "wood" },
      { x: 945, y: 385, t: 1 },
    ],
    [
      { x: 760, y: 555, w: 36, h: 130, m: "wood" },
      { x: 900, y: 555, w: 36, h: 130, m: "wood" },
      { x: 1040, y: 555, w: 36, h: 130, m: "wood" },
      { x: 730, y: 475, w: 346, h: 30, m: "wood" },
      { x: 830, y: 437, t: 1 },
      { x: 980, y: 437, t: 1 },
    ],
    [
      { x: 830, y: 540, w: 44, h: 160, m: "stone" },
      { x: 1030, y: 540, w: 44, h: 160, m: "stone" },
      { x: 800, y: 445, w: 275, h: 35, m: "wood" },
      { x: 935, y: 405, t: 1 },
    ],
    [
      { x: 760, y: 570, w: 230, h: 28, m: "wood" },
      { x: 790, y: 500, w: 30, h: 115, m: "wood" },
      { x: 940, y: 500, w: 30, h: 115, m: "wood" },
      { x: 770, y: 430, w: 220, h: 28, m: "ice" },
      { x: 875, y: 392, t: 1 },
      { x: 1080, y: 575, t: 1 },
    ],
    [
      { x: 720, y: 575, w: 42, h: 95, m: "stone" },
      { x: 840, y: 575, w: 42, h: 95, m: "stone" },
      { x: 960, y: 575, w: 42, h: 95, m: "stone" },
      { x: 690, y: 510, w: 310, h: 28, m: "wood" },
      { x: 780, y: 472, t: 1 },
      { x: 920, y: 472, t: 1 },
      { x: 1100, y: 575, t: 1 },
    ],
  ];
  function makeLevels() {
    return Array.from({ length: 15 }, (_, i) => {
      const world = Math.floor(i / 5),
        base = patterns[i % 5];
      return {
        world,
        dino: dinos[i % 3].id,
        shots: 3 + Math.min(2, Math.floor(i / 4)),
        wind: ((i % 4) - 1.5) * 8,
        items: base.map((o, j) => {
          const c = { ...o };
          c.x += world * 18 + (i % 2) * 25;
          if (c.m)
            c.m =
              world === 1
                ? j % 3 === 0
                  ? "stone"
                  : "wood"
                : world === 2
                  ? j % 2
                    ? "ice"
                    : "stone"
                  : c.m;
          return c;
        }),
      };
    });
  }
  const levels = makeLevels();
  function resize() {
    const d = Math.min(2, devicePixelRatio || 1),
      r = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(r.width * d));
    canvas.height = Math.max(1, Math.round(r.height * d));
  }
  addEventListener("resize", resize);
  resize();
  function view() {
    const sx = canvas.width / W,
      sy = canvas.height / H;
    ctx.setTransform(sx, 0, 0, sy, 0, 0);
  }
  function screenPoint(e) {
    const r = canvas.getBoundingClientRect();
    if (document.body.classList.contains("rotate-game")) {
      return {
        x: ((e.clientY - r.top) * W) / r.height,
        y: ((r.right - e.clientX) * H) / r.width,
      };
    }
    return {
      x: ((e.clientX - r.left) * W) / r.width,
      y: ((e.clientY - r.top) * H) / r.height,
    };
  }
  function show(id) {
    document
      .querySelectorAll(".screen")
      .forEach((s) => s.classList.remove("open"));
    if (id) $(id).classList.add("open");
  }
  function tone(freq, duration = 0.08, type = "sine", volume = 0.05) {
    if (!soundOn) return;
    try {
      audio = audio || new AudioContext();
      const o = audio.createOscillator(),
        g = audio.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(volume, audio.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);
      o.connect(g).connect(audio.destination);
      o.start();
      o.stop(audio.currentTime + duration);
    } catch {}
  }
  function toast(msg) {
    ui.toast.textContent = msg;
    ui.toast.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => ui.toast.classList.remove("show"), 1500);
  }
  function translate() {
    $("tagline").textContent = text.tag;
    $("play").textContent = text.play;
    $("levelsButton").textContent = text.levels;
    $("chooseLevel").textContent = text.choose;
    $("missionLabel").textContent = text.mission;
    $("missionTitle").textContent = text.missionTitle;
    $("missionText").textContent = text.missionText;
    $("tipText").textContent = text.tip;
    $("startLevel").textContent = text.start;
    $("scoreLabel").textContent = text.points;
    $("resultEyebrow").textContent = text.complete;
    $("resultTitle").textContent = text.great;
    $("finalScoreLabel").textContent = text.score;
    $("next").textContent = text.next;
    $("retry").textContent = text.retry;
    $("resultLevels").textContent = text.levels;
    $("launchButton").textContent = `🚀 ${text.launch}`;
  }
  function buildLevelGrid() {
    const grid = $("levelGrid");
    grid.innerHTML = "";
    levels.forEach((l, i) => {
      const b = document.createElement("button");
      const stars = best[i]?.stars || 0;
      b.className = `level-tile ${i < unlocked ? "done" : "locked"} ${i === levelIndex ? "current" : ""}`;
      b.innerHTML = `${i + 1}<small>${"★".repeat(stars)}${"☆".repeat(3 - stars)}</small>`;
      b.onclick = () => {
        if (i >= unlocked) {
          toast(text.locked);
          tone(160, 0.12, "square");
          return;
        }
        levelIndex = i;
        prepareIntro();
      };
      grid.appendChild(b);
    });
  }
  function prepareIntro() {
    const l = levels[levelIndex],
      d = dinos.find((x) => x.id === l.dino);
    $("dinoBadge").innerHTML = `<img src="${d.sprite}" alt="${d.name}">`;
    ui.level.textContent = levelIndex + 1;
    ui.world.textContent = text.worlds[l.world];
    show("intro");
  }
  function loadLevel() {
    const l = levels[levelIndex];
    objects = [];
    projectiles = [];
    particles = [];
    score = 0;
    shots = 0;
    maxShots = l.shots;
    settle = 0;
    shake = 0;
    shotTransition = false;
    for (const item of l.items) {
      if (item.t)
        objects.push({
          type: "bot",
          x: item.x,
          y: item.y,
          r: 27,
          vx: 0,
          vy: 0,
          alive: true,
          hp: 45,
          grounded: false,
        });
      else {
        const mat = materials[item.m];
        objects.push({
          type: "block",
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          vx: 0,
          vy: 0,
          material: item.m,
          hp: mat.hp,
          maxHp: mat.hp,
          grounded: false,
        });
      }
    }
    spawnDino();
    ui.score.textContent = "0";
    ui.level.textContent = levelIndex + 1;
    ui.world.textContent = text.worlds[l.world];
    running = true;
    document.body.classList.add("playing");
    show(null);
    textHint();
    tone(420, 0.08);
  }
  function spawnDino() {
    if (shots >= maxShots) {
      current = null;
      return;
    }
    const d = dinos.find((x) => x.id === levels[levelIndex].dino);
    current = {
      type: "dino",
      dino: d.id,
      color: d.color,
      belly: d.belly,
      x: SLING.x,
      y: SLING.y,
      vx: 0,
      vy: 0,
      r: d.id === "heavy" ? 34 : 29,
      launched: false,
      ability: false,
      rest: 0,
      alive: true,
      trail: [],
    };
    projectiles.push(current);
  }
  function endCurrentShot() {
    if (shotTransition || !running) return;
    shotTransition = true;
    if (current) current.alive = false;
    current = null;
    setTimeout(() => {
      shotTransition = false;
      if (!running) return;
      spawnDino();
      if (!current) finish(false);
      else textHint();
    }, 420);
  }
  function textHint() {
    const d = dinos.find((x) => x.id === levels[levelIndex].dino);
    ui.hint.textContent = `${d.emoji} ${text.powers[d.id]}`;
    ui.hint.classList.add("show");
    setTimeout(() => ui.hint.classList.remove("show"), 3200);
  }
  function circleRect(c, r) {
    const nx = Math.max(r.x - r.w / 2, Math.min(c.x, r.x + r.w / 2)),
      ny = Math.max(r.y - r.h / 2, Math.min(c.y, r.y + r.h / 2)),
      dx = c.x - nx,
      dy = c.y - ny;
    return dx * dx + dy * dy < c.r * c.r ? { dx, dy, nx, ny } : null;
  }
  function impact(obj, power, x, y) {
    obj.hp -= power;
    if (power > 18) {
      shake = Math.min(15, shake + power * 0.08);
      burst(
        x,
        y,
        obj.type === "bot"
          ? "#ffd64d"
          : materials[obj.material]?.color || "#fff",
        Math.min(16, 4 + power / 8),
      );
      tone(Math.max(90, 340 - power * 2), 0.06, "square", 0.025);
    }
    if (obj.hp <= 0 && obj.alive !== false) {
      obj.alive = false;
      score += obj.type === "bot" ? 2500 : 350;
      ui.score.textContent = score;
      burst(obj.x, obj.y, obj.type === "bot" ? "#ffde59" : "#fff", 24);
      if (obj.type === "bot") tone(640, 0.12, "sine", 0.07);
    }
  }
  function burst(x, y, color, count) {
    for (let i = 0; i < count; i++)
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 330,
        vy: (Math.random() - 0.8) * 300,
        life: 0.5 + Math.random() * 0.5,
        color,
        size: 3 + Math.random() * 7,
      });
  }
  function useAbility() {
    if (!current?.launched || current.ability || !current.alive) return;
    current.ability = true;
    const speed = Math.hypot(current.vx, current.vy) || 1;
    if (current.dino === "dash") {
      current.vx = (current.vx / speed) * 1000;
      current.vy = (current.vy / speed) * 1000;
      tone(780, 0.14, "sawtooth");
      burst(current.x, current.y, "#b7ff70", 18);
    } else if (current.dino === "heavy") {
      current.r = 46;
      current.vy += 420;
      current.vx *= 0.78;
      tone(110, 0.18, "square");
      burst(current.x, current.y, "#ffb34f", 20);
    } else {
      for (const k of [-1, 1]) {
        const p = {
          ...current,
          ability: true,
          r: 22,
          vx: current.vx + k * 100,
          vy: current.vy + k * 160,
          x: current.x,
          y: current.y + k * 8,
          trail: [],
        };
        projectiles.push(p);
      }
      tone(620, 0.16, "triangle");
      burst(current.x, current.y, "#79e4ff", 20);
    }
    ui.hint.classList.remove("show");
  }
  function launch() {
    const dx = SLING.x - current.x,
      dy = SLING.y - current.y,
      dist = Math.hypot(dx, dy);
    if (dist < 18) {
      current.x = SLING.x;
      current.y = SLING.y;
      return;
    }
    const d = dinos.find((x) => x.id === current.dino),
      pull = Math.min(1, dist / 185),
      speed = (720 + pull * 520) * d.power;
    current.vx = (dx / dist) * speed;
    current.vy = (dy / dist) * speed - 115 * pull;
    current.launched = true;
    shots++;
    score = Math.max(0, score - 50);
    ui.score.textContent = score;
    tone(260, 0.1, "triangle", 0.07);
    setTimeout(textHint, 350);
  }
  function adjustAim(dx, dy) {
    if (!running || !current || current.launched) return;
    let pullX = SLING.x - current.x,
      pullY = SLING.y - current.y;
    if (Math.hypot(pullX, pullY) < 20) {
      pullX = 110;
      pullY = -65;
    }
    pullX += dx * 18;
    pullY += dy * 18;
    const length = Math.hypot(pullX, pullY) || 1,
      scale = Math.min(1, 185 / length);
    current.x = SLING.x - pullX * scale;
    current.y = SLING.y - pullY * scale;
    dragging = true;
  }
  function launchFromControls() {
    if (!running || !current) return;
    if (current.launched) {
      useAbility();
      return;
    }
    if (Math.hypot(SLING.x - current.x, SLING.y - current.y) < 20)
      adjustAim(0, 0);
    dragging = false;
    launch();
  }
  canvas.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    const p = screenPoint(e);
    if (
      current &&
      !current.launched &&
      Math.hypot(p.x - current.x, p.y - current.y) < 75
    ) {
      dragging = true;
      canvas.setPointerCapture(e.pointerId);
    } else if (current?.launched) useAbility();
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!dragging || !current) return;
    const p = screenPoint(e),
      dx = p.x - SLING.x,
      dy = p.y - SLING.y,
      dist = Math.hypot(dx, dy),
      max = 185,
      s = Math.min(1, max / (dist || 1));
    current.x = SLING.x + dx * s;
    current.y = SLING.y + dy * s;
  });
  canvas.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    dragging = false;
    canvas.releasePointerCapture?.(e.pointerId);
    launch();
  });
  canvas.addEventListener("pointercancel", () => {
    dragging = false;
  });
  function physics(dt) {
    const wind = levels[levelIndex].wind;
    for (const p of projectiles) {
      if (!p.alive || !p.launched) continue;
      p.vy += GRAVITY * dt;
      p.vx += wind * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.9995;
      p.vy *= 0.9995;
      p.trail ||= [];
      p.trail.push({ x: p.x, y: p.y, life: 1 });
      if (p.trail.length > 28) p.trail.shift();
      for (const point of p.trail) point.life -= dt * 1.7;
      if (p.y + p.r > GROUND) {
        p.y = GROUND - p.r;
        p.vy *= -0.34;
        p.vx *= 0.72;
        if (Math.abs(p.vy) < 25) p.vy = 0;
      }
      if (p.x < -70 || p.x > W + 70 || p.y > H + 70 || p.y < -260) {
        p.alive = false;
        if (p === current) endCurrentShot();
        continue;
      }
      for (const o of objects) {
        if (o.alive === false) continue;
        if (o.type === "block") {
          const hit = circleRect(p, o);
          if (hit) {
            const speed = Math.hypot(p.vx - o.vx, p.vy - o.vy),
              horizontal = Math.abs(hit.dx) > Math.abs(hit.dy);
            if (horizontal) {
              p.vx *= -0.38;
              o.vx += p.vx * -0.11;
            } else {
              p.vy *= -0.38;
              o.vy += p.vy * -0.1;
            }
            impact(
              o,
              speed * (p.dino === "heavy" ? 0.12 : 0.075),
              hit.nx,
              hit.ny,
            );
          }
        } else {
          const dx = p.x - o.x,
            dy = p.y - o.y,
            dist = Math.hypot(dx, dy);
          if (dist < p.r + o.r) {
            const speed = Math.hypot(p.vx - o.vx, p.vy - o.vy);
            o.vx += p.vx * 0.18;
            o.vy += p.vy * 0.18;
            p.vx *= -0.28;
            p.vy *= -0.28;
            impact(o, 25 + speed * 0.11, o.x, o.y);
          }
        }
      }
      if (Math.hypot(p.vx, p.vy) < 18 && p.y > GROUND - p.r - 3) p.rest += dt;
      else p.rest = 0;
    }
    for (const o of objects) {
      if (o.alive === false) continue;
      o.vy += GRAVITY * dt;
      o.x += o.vx * dt;
      o.y += o.vy * dt;
      o.vx *= 0.985;
      o.vy *= 0.995;
      const bottom = o.type === "bot" ? o.y + o.r : o.y + o.h / 2;
      if (bottom > GROUND) {
        o.y = GROUND - (o.type === "bot" ? o.r : o.h / 2);
        if (Math.abs(o.vy) > 100)
          impact(o, Math.abs(o.vy) * 0.035, o.x, GROUND);
        o.vy *= -0.14;
        o.vx *= 0.72;
        if (Math.abs(o.vy) < 20) o.vy = 0;
      }
      if (o.type === "block") {
        for (const b of objects) {
          if (b === o || b.alive === false || b.type !== "block") continue;
          const overlapX = (o.w + b.w) / 2 - Math.abs(o.x - b.x),
            overlapY = (o.h + b.h) / 2 - Math.abs(o.y - b.y);
          if (overlapX > 0 && overlapY > 0 && o.y < b.y && overlapY < 35) {
            o.y -= overlapY;
            o.vy = Math.min(0, o.vy) * -0.08;
            o.vx += (o.x - b.x) * 0.001;
          }
        }
      }
    }
    for (const p of particles) {
      p.vy += 500 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
    }
    particles = particles.filter((p) => p.life > 0);
    objects = objects.filter((o) => o.alive !== false);
    projectiles = projectiles.filter((p) => p.alive !== false);
    const bots = objects.filter((o) => o.type === "bot").length;
    if (!bots) {
      settle += dt;
      if (settle > 0.9) finish(true);
    } else if (current?.launched && current.rest > 1.1) endCurrentShot();
  }
  function finish(win) {
    if (!running) return;
    running = false;
    ui.hint.classList.remove("show");
    if (!win) {
      $("resultEyebrow").textContent = text.lost;
      $("resultTitle").textContent = "🦕";
      $("resultStars").textContent = "☆ ☆ ☆";
      $("finalScore").textContent = score;
      $("next").style.display = "none";
      setTimeout(() => show("result"), 350);
      tone(150, 0.3, "sawtooth");
      return;
    }
    const left = maxShots - shots,
      stars = left >= 2 ? 3 : left >= 1 ? 2 : 1;
    score += stars * 1500;
    ui.score.textContent = score;
    const previous = best[levelIndex];
    if (!previous || score > previous.score)
      best[levelIndex] = {
        score,
        stars: Math.max(stars, previous?.stars || 0),
      };
    unlocked = Math.max(unlocked, Math.min(levels.length, levelIndex + 2));
    saveProgress();
    $("resultEyebrow").textContent = text.complete;
    $("resultTitle").textContent = text.great;
    $("resultStars").textContent = "★ ".repeat(stars) + "☆ ".repeat(3 - stars);
    $("finalScore").textContent = score;
    $("next").style.display = levelIndex < levels.length - 1 ? "block" : "none";
    setTimeout(() => show("result"), 550);
    tone(523, 0.12);
    setTimeout(() => tone(659, 0.12), 130);
    setTimeout(() => tone(784, 0.2), 260);
  }
  async function saveProgress() {
    try {
      await DinoPlay.storage.set("dinolaunch-progress", { unlocked, best });
    } catch {
      localStorage.setItem(
        "dinolaunch-progress",
        JSON.stringify({ unlocked, best }),
      );
    }
  }
  function drawDino(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    const a = Math.atan2(p.vy, p.vx);
    if (p.launched) ctx.rotate(a);
    const definition = dinos.find((dino) => dino.id === p.dino),
      sprite = spriteImages[p.dino];
    if (sprite?.complete && sprite.naturalWidth) {
      const width = p.r * definition.spriteScale,
        height = width * (sprite.naturalHeight / sprite.naturalWidth),
        pulse = p.launched
          ? 1
          : 1 + Math.sin(performance.now() * 0.004) * 0.025;
      ctx.scale(pulse, pulse);
      ctx.shadowColor = "rgba(8,44,76,.28)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 6;
      ctx.drawImage(sprite, -width / 2, -height / 2, width, height);
      ctx.restore();
      return;
    }
    ctx.fillStyle = p.color;
    ctx.strokeStyle = "#174e39";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.r * 1.08, p.r * 0.9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = p.belly;
    ctx.beginPath();
    ctx.ellipse(4, 8, p.r * 0.55, p.r * 0.43, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(9, -10, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#163a2c";
    ctx.beginPath();
    ctx.arc(12, -9, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(-p.r + 4, -6);
    ctx.lineTo(-p.r - 18, -15);
    ctx.lineTo(-p.r + 2, 10);
    ctx.fill();
    if (p.dino === "dash") {
      ctx.fillStyle = "#f3dc43";
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-10 + i * 12, -p.r * 0.75);
        ctx.lineTo(-3 + i * 12, -p.r - 13);
        ctx.lineTo(6 + i * 12, -p.r * 0.77);
        ctx.fill();
      }
    }
    ctx.restore();
  }
  function drawBot(o) {
    ctx.save();
    ctx.translate(o.x, o.y);

    // The target is drawn directly on the canvas so it remains sharp at every
    // resolution and participates naturally in the level physics.
    ctx.shadowColor = "rgba(48, 35, 20, .3)";
    ctx.shadowBlur = 9;
    ctx.shadowOffsetY = 7;
    const shell = ctx.createRadialGradient(-8, -12, 3, 2, 4, o.r * 1.25);
    shell.addColorStop(0, "#fffef0");
    shell.addColorStop(0.48, "#f7e7bd");
    shell.addColorStop(1, "#c99c62");
    ctx.fillStyle = shell;
    ctx.strokeStyle = "#8b6238";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -o.r * 1.18);
    ctx.bezierCurveTo(
      o.r * 0.56,
      -o.r * 1.05,
      o.r * 0.9,
      -o.r * 0.22,
      o.r * 0.82,
      o.r * 0.45,
    );
    ctx.bezierCurveTo(
      o.r * 0.74,
      o.r * 1.05,
      o.r * 0.35,
      o.r * 1.25,
      0,
      o.r * 1.25,
    );
    ctx.bezierCurveTo(
      -o.r * 0.35,
      o.r * 1.25,
      -o.r * 0.74,
      o.r * 1.05,
      -o.r * 0.82,
      o.r * 0.45,
    );
    ctx.bezierCurveTo(
      -o.r * 0.9,
      -o.r * 0.22,
      -o.r * 0.56,
      -o.r * 1.05,
      0,
      -o.r * 1.18,
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.shadowColor = "transparent";
    ctx.fillStyle = "rgba(118, 76, 40, .38)";
    for (const spot of [
      [-10, -2, 5],
      [11, 12, 4],
      [5, -20, 3.5],
      [-7, 22, 3],
    ]) {
      ctx.beginPath();
      ctx.ellipse(
        spot[0],
        spot[1],
        spot[2],
        spot[2] * 0.75,
        -0.3,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    ctx.fillStyle = "rgba(255,255,255,.68)";
    ctx.beginPath();
    ctx.ellipse(-9, -17, 5, 10, 0.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  }
  function drawBlock(o) {
    const m = materials[o.material],
      x = o.x - o.w / 2,
      y = o.y - o.h / 2;
    ctx.fillStyle = m.color;
    ctx.strokeStyle = m.edge;
    ctx.lineWidth = 4;
    roundRect(x, y, o.w, o.h, Math.min(8, o.w / 5));
    ctx.fill();
    ctx.stroke();
    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + 7, y + 8);
    ctx.lineTo(x + o.w - 7, y + 8);
    ctx.stroke();
    ctx.globalAlpha = 1;
    if (o.hp < o.maxHp * 0.65) {
      ctx.strokeStyle = m.edge;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(o.x - 5, o.y - o.h * 0.32);
      ctx.lineTo(o.x + 7, o.y - 5);
      ctx.lineTo(o.x - 8, o.y + o.h * 0.3);
      ctx.stroke();
    }
  }
  function background() {
    const scene = scenes[levelIndex] || scenes[0],
      sky = ctx.createLinearGradient(0, 0, 0, GROUND);
    sky.addColorStop(0, scene.top);
    sky.addColorStop(1, scene.bottom);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);
    const circle = (x, y, r, color) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      },
      mountain = (x, y, w, h, color, snow = false) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + w / 2, y - h);
        ctx.lineTo(x + w, y);
        ctx.closePath();
        ctx.fill();
        if (snow) {
          ctx.fillStyle = "rgba(255,255,255,.86)";
          ctx.beginPath();
          ctx.moveTo(x + w * 0.31, y - h * 0.62);
          ctx.lineTo(x + w / 2, y - h);
          ctx.lineTo(x + w * 0.69, y - h * 0.62);
          ctx.lineTo(x + w * 0.57, y - h * 0.7);
          ctx.lineTo(x + w * 0.49, y - h * 0.61);
          ctx.lineTo(x + w * 0.42, y - h * 0.69);
          ctx.closePath();
          ctx.fill();
        }
      },
      pine = (x, base, height, color, snowy = false) => {
        ctx.fillStyle = color;
        for (let i = 0; i < 3; i++) {
          const y = base - height + i * height * 0.23,
            half = height * (0.23 + i * 0.065);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - half, y + height * 0.46);
          ctx.lineTo(x + half, y + height * 0.46);
          ctx.closePath();
          ctx.fill();
          if (snowy) {
            ctx.strokeStyle = "rgba(255,255,255,.9)";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(x - half * 0.72, y + height * 0.36);
            ctx.lineTo(x, y);
            ctx.lineTo(x + half * 0.72, y + height * 0.36);
            ctx.stroke();
          }
        }
      },
      palm = (x, base, height) => {
        ctx.strokeStyle = "#70452c";
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(x, base);
        ctx.quadraticCurveTo(
          x - 12,
          base - height * 0.55,
          x + 8,
          base - height,
        );
        ctx.stroke();
        ctx.strokeStyle = "#197b4d";
        ctx.lineWidth = 12;
        for (let a = -2.7; a < 0.1; a += 0.55) {
          ctx.beginPath();
          ctx.moveTo(x + 8, base - height);
          ctx.quadraticCurveTo(
            x + Math.cos(a) * 40,
            base - height + Math.sin(a) * 25,
            x + Math.cos(a) * 76,
            base - height + Math.sin(a) * 60,
          );
          ctx.stroke();
        }
      };

    // Every level has its own recognizable world silhouette and landmarks.
    switch (scene.kind) {
      case "meadow":
        circle(190, 110, 55, "#ffe266");
        for (let x = 40; x < W; x += 150) {
          circle(x, 465 + (x % 3) * 14, 54, "#45a954");
          ctx.fillStyle = "#86552d";
          ctx.fillRect(x - 8, 480, 16, 92);
        }
        ctx.fillStyle = "#ffffff";
        for (let x = 110; x < W; x += 235) circle(x, 545, 6, "#fff6d0");
        break;
      case "sunrise":
        circle(690, 410, 115, "#ffcf69");
        mountain(-80, 565, 520, 275, "#555996");
        mountain(270, 565, 620, 340, "#6c69a0");
        mountain(760, 565, 580, 250, "#4d5e8a");
        ctx.strokeStyle = "rgba(255,234,174,.7)";
        ctx.lineWidth = 7;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.moveTo(540 - i * 28, 410);
          ctx.lineTo(840 + i * 28, 410);
          ctx.stroke();
        }
        break;
      case "waterfall":
        mountain(-50, 570, 500, 330, "#126f66");
        mountain(350, 570, 600, 410, "#167c70");
        mountain(840, 570, 500, 315, "#0f655e");
        ctx.fillStyle = "#8ce9f4";
        ctx.fillRect(610, 238, 105, 350);
        ctx.fillStyle = "rgba(255,255,255,.7)";
        ctx.fillRect(628, 250, 17, 320);
        ctx.fillRect(675, 245, 10, 330);
        circle(665, 575, 145, "rgba(75,202,220,.82)");
        break;
      case "jungle":
        ctx.strokeStyle = "#145d3d";
        ctx.lineWidth = 18;
        ctx.beginPath();
        ctx.moveTo(0, 80);
        ctx.bezierCurveTo(320, 260, 470, 40, 720, 180);
        ctx.bezierCurveTo(930, 300, 1080, 80, W, 150);
        ctx.stroke();
        for (let x = 20; x < W; x += 95) {
          circle(x, 420 + (x % 4) * 25, 70, x % 2 ? "#19794b" : "#249b55");
          circle(x + 35, 455, 48, "#146c43");
        }
        for (let x = 150; x < W; x += 270) palm(x, 580, 190);
        break;
      case "sunset":
        circle(1000, 250, 92, "#ffcf70");
        mountain(-70, 570, 560, 240, "#68526c");
        mountain(370, 570, 610, 305, "#725569");
        mountain(860, 570, 500, 215, "#5a506c");
        ctx.fillStyle = "rgba(255,198,119,.52)";
        for (let i = 0; i < 5; i++)
          ctx.fillRect(835 + i * 22, 355 + i * 18, 330 - i * 44, 8);
        break;
      case "dunes":
        circle(200, 105, 62, "#fff0a0");
        ctx.fillStyle = "#efc96c";
        ctx.beginPath();
        ctx.moveTo(0, 470);
        ctx.quadraticCurveTo(250, 310, 570, 490);
        ctx.quadraticCurveTo(900, 280, W, 480);
        ctx.lineTo(W, GROUND);
        ctx.lineTo(0, GROUND);
        ctx.fill();
        ctx.fillStyle = "#c98d47";
        for (const x of [360, 990]) {
          ctx.fillRect(x, 430, 18, 125);
          ctx.fillRect(x - 28, 458, 30, 15);
          ctx.fillRect(x + 15, 475, 32, 15);
        }
        break;
      case "oasis":
        ctx.fillStyle = "#d7b35c";
        ctx.beginPath();
        ctx.moveTo(0, 480);
        ctx.quadraticCurveTo(360, 330, 720, 500);
        ctx.quadraticCurveTo(1040, 380, W, 500);
        ctx.lineTo(W, GROUND);
        ctx.lineTo(0, GROUND);
        ctx.fill();
        ctx.fillStyle = "#29bfc1";
        ctx.beginPath();
        ctx.ellipse(700, 535, 260, 55, -0.05, 0, Math.PI * 2);
        ctx.fill();
        palm(420, 545, 230);
        palm(995, 550, 205);
        break;
      case "canyon":
        circle(1080, 100, 53, "#ffd073");
        ctx.fillStyle = "#8e4539";
        ctx.fillRect(0, 320, 235, 270);
        ctx.fillRect(1080, 270, 260, 320);
        ctx.fillStyle = "#b65d43";
        ctx.fillRect(80, 255, 120, 80);
        ctx.fillRect(1130, 205, 115, 80);
        mountain(220, 580, 370, 180, "#9d4b3c");
        mountain(710, 580, 380, 235, "#7f4039");
        break;
      case "ruins":
        mountain(-50, 570, 500, 220, "#9c7c5e");
        mountain(720, 570, 620, 260, "#8f7157");
        ctx.fillStyle = "#b99a70";
        for (const x of [160, 360, 830, 1030]) {
          ctx.fillRect(x, 325, 42, 235);
          ctx.fillRect(x - 16, 315, 74, 22);
        }
        ctx.fillRect(150, 300, 250, 24);
        ctx.strokeStyle = "#806648";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(700, 505, 95, Math.PI, 0);
        ctx.stroke();
        break;
      case "desert-night":
        circle(1080, 120, 62, "#fff3ba");
        circle(1105, 100, 62, scene.top);
        ctx.fillStyle = "#fff8cf";
        for (let i = 0; i < 45; i++)
          circle(
            (i * 173) % W,
            35 + ((i * 67) % 310),
            i % 7 === 0 ? 3 : 1.5,
            "#fff8cf",
          );
        ctx.fillStyle = "#4d385b";
        ctx.beginPath();
        ctx.moveTo(0, 510);
        ctx.quadraticCurveTo(310, 365, 650, 520);
        ctx.quadraticCurveTo(970, 380, W, 505);
        ctx.lineTo(W, GROUND);
        ctx.lineTo(0, GROUND);
        ctx.fill();
        break;
      case "glacier":
        mountain(-100, 570, 530, 380, "#6db3d0", true);
        mountain(280, 570, 600, 470, "#78bfd8", true);
        mountain(760, 570, 630, 410, "#5ca6c6", true);
        ctx.fillStyle = "rgba(194,246,255,.82)";
        for (const x of [160, 560, 1080]) {
          ctx.beginPath();
          ctx.moveTo(x, 565);
          ctx.lineTo(x + 50, 400);
          ctx.lineTo(x + 105, 565);
          ctx.fill();
        }
        break;
      case "aurora":
        ctx.fillStyle = "#eefcff";
        for (let i = 0; i < 38; i++)
          circle((i * 151) % W, 30 + ((i * 83) % 280), 1.7, "#eefcff");
        for (const [color, width, offset] of [
          ["rgba(82,255,191,.55)", 42, 0],
          ["rgba(93,170,255,.44)", 30, 45],
          ["rgba(205,103,255,.32)", 22, 82],
        ]) {
          ctx.strokeStyle = color;
          ctx.lineWidth = width;
          ctx.beginPath();
          ctx.moveTo(40, 120 + offset);
          ctx.bezierCurveTo(
            320,
            -20 + offset,
            530,
            270 + offset,
            790,
            80 + offset,
          );
          ctx.bezierCurveTo(
            980,
            -30 + offset,
            1140,
            150 + offset,
            W,
            45 + offset,
          );
          ctx.stroke();
        }
        mountain(-50, 575, 610, 250, "#274c6b", true);
        mountain(690, 575, 700, 285, "#294f6b", true);
        break;
      case "frozen-lake":
        mountain(-80, 500, 530, 285, "#83bfd5", true);
        mountain(750, 505, 640, 320, "#75b1ca", true);
        ctx.fillStyle = "#9ee4f5";
        ctx.fillRect(0, 465, W, 125);
        ctx.strokeStyle = "rgba(255,255,255,.78)";
        ctx.lineWidth = 4;
        for (let x = 80; x < W; x += 210) {
          ctx.beginPath();
          ctx.moveTo(x, 520);
          ctx.lineTo(x + 75, 495);
          ctx.lineTo(x + 145, 540);
          ctx.stroke();
        }
        break;
      case "snow-pines":
        mountain(-100, 560, 650, 330, "#6092ad", true);
        mountain(620, 560, 760, 390, "#527e99", true);
        for (let x = 50; x < W; x += 125)
          pine(x, 575, 170 + (x % 3) * 20, "#285f63", true);
        break;
      case "ice-volcano":
        mountain(280, 570, 760, 500, "#4d5368", true);
        ctx.fillStyle = "#ff7959";
        ctx.beginPath();
        ctx.moveTo(615, 165);
        ctx.quadraticCurveTo(660, 230, 700, 315);
        ctx.quadraticCurveTo(735, 235, 760, 165);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgba(255,183,89,.65)";
        for (const [x, y, r] of [
          [625, 130, 12],
          [700, 95, 18],
          [755, 130, 10],
        ])
          circle(x, y, r, "rgba(255,183,89,.72)");
        ctx.fillStyle = "rgba(55,48,65,.55)";
        for (let i = 0; i < 4; i++)
          circle(
            640 + i * 45,
            70 - (i % 2) * 25,
            32 + i * 4,
            "rgba(55,48,65,.45)",
          );
        break;
    }
    ctx.fillStyle = scene.ground;
    ctx.fillRect(0, GROUND, W, H - GROUND);
    ctx.fillStyle = "rgba(24,84,71,.24)";
    ctx.fillRect(0, GROUND, W, 8);
  }
  function drawSling() {
    ctx.strokeStyle = "#70421f";
    ctx.lineWidth = 24;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(145, GROUND);
    ctx.lineTo(158, 492);
    ctx.moveTo(210, GROUND);
    ctx.lineTo(194, 492);
    ctx.stroke();
    if (current && !current.launched) {
      ctx.strokeStyle = "#4d2d19";
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.moveTo(158, 493);
      ctx.lineTo(current.x, current.y);
      ctx.lineTo(194, 493);
      ctx.stroke();
      if (dragging) {
        const dx = SLING.x - current.x,
          dy = SLING.y - current.y,
          dist = Math.hypot(dx, dy) || 1,
          dino = dinos.find((item) => item.id === current.dino),
          pull = Math.min(1, dist / 185),
          speed = (720 + pull * 520) * dino.power,
          vx = (dx / dist) * speed,
          vy = (dy / dist) * speed - 115 * pull;
        ctx.fillStyle = "rgba(255,255,255,.7)";
        for (let i = 1; i < 11; i++) {
          const t = i * 0.115,
            x = current.x + vx * t,
            y = current.y + vy * t + 0.5 * GRAVITY * t * t;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(2, 5 - i * 0.25), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }
  function render() {
    view();
    ctx.save();
    if (shake) {
      ctx.translate(
        (Math.random() - 0.5) * shake,
        (Math.random() - 0.5) * shake,
      );
      shake *= 0.88;
    }
    background();
    drawSling();
    for (const o of objects) {
      if (o.type === "block") drawBlock(o);
      else drawBot(o);
    }
    for (const p of projectiles) {
      if (!p.alive) continue;
      if (p.trail?.length) {
        for (let i = 0; i < p.trail.length; i++) {
          const point = p.trail[i];
          ctx.globalAlpha =
            Math.max(0, point.life) * (i / p.trail.length) * 0.42;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(
            point.x,
            point.y,
            3 + (i / p.trail.length) * 5,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      drawDino(p);
    }
    for (const p of particles) {
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }
  function loop(t) {
    const dt = Math.min(0.025, (t - last) / 1000 || 0);
    last = t;
    if (running) physics(dt);
    render();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
  function openLevels() {
    buildLevelGrid();
    show("levels");
  }
  function rotateGame() {
    document.body.classList.toggle("rotate-game");
    dragging = false;
    requestAnimationFrame(() => {
      resize();
      render();
    });
  }
  $("play").onclick = () => {
    levelIndex = Math.min(unlocked - 1, levels.length - 1);
    prepareIntro();
  };
  $("levelsButton").onclick = openLevels;
  $("levelsClose").onclick = () => show("home");
  $("startLevel").onclick = loadLevel;
  $("restart").onclick = () => {
    if (running) loadLevel();
  };
  $("back").onclick = () => {
    running = false;
    document.body.classList.remove("playing");
    show("home");
  };
  $("sound").onclick = () => {
    soundOn = !soundOn;
    $("sound").textContent = soundOn ? "🔊" : "🔇";
    tone(440);
  };
  $("rotateScreen").onclick = rotateGame;
  let aimRepeat = null;
  document.querySelectorAll("[data-aim]").forEach((button) => {
    const directions = {
      up: [0, -1],
      down: [0, 1],
      left: [-1, 0],
      right: [1, 0],
    };
    const move = () => adjustAim(...directions[button.dataset.aim]);
    button.onclick = move;
    button.onpointerdown = (event) => {
      event.preventDefault();
      clearInterval(aimRepeat);
      move();
      aimRepeat = setInterval(move, 85);
    };
    const stop = () => {
      clearInterval(aimRepeat);
      aimRepeat = null;
    };
    button.onpointerup = stop;
    button.onpointercancel = stop;
    button.onpointerleave = stop;
  });
  $("launchButton").onclick = launchFromControls;
  // Some Android WebViews draw transformed controls correctly but keep their
  // original hit areas. In rotated mode, resolve the visible button manually.
  document.addEventListener(
    "pointerup",
    (event) => {
      if (!document.body.classList.contains("rotate-game")) return;
      const candidates = [...document.querySelectorAll("button")]
        .filter((button) => {
          const style = getComputedStyle(button);
          if (
            style.display === "none" ||
            style.visibility === "hidden" ||
            style.pointerEvents === "none" ||
            button.disabled
          )
            return false;
          const rect = button.getBoundingClientRect();
          return (
            rect.width > 0 &&
            rect.height > 0 &&
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom
          );
        })
        .sort((a, b) => {
          const ar = a.getBoundingClientRect(),
            br = b.getBoundingClientRect();
          return ar.width * ar.height - br.width * br.height;
        });
      const button = candidates[0];
      if (!button) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      button.click();
    },
    true,
  );
  $("next").onclick = () => {
    levelIndex = Math.min(levels.length - 1, levelIndex + 1);
    prepareIntro();
  };
  $("retry").onclick = loadLevel;
  $("resultLevels").onclick = openLevels;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      last = 0;
      dragging = false;
    }
  });
  async function start() {
    try {
      const c = await DinoPlay.ready();
      language = c.language || "en";
      const saved = await DinoPlay.storage.get("dinolaunch-progress");
      if (saved) {
        unlocked = Math.max(1, Number(saved.unlocked) || 1);
        best = saved.best || {};
      }
    } catch {
      try {
        const saved = JSON.parse(localStorage.getItem("dinolaunch-progress"));
        if (saved) {
          unlocked = saved.unlocked || 1;
          best = saved.best || {};
        }
      } catch {}
    }
    text = copy[language] || copy.en;
    translate();
    buildLevelGrid();
    render();
  }
  start();
})();
