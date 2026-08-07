import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";

const canvas = document.getElementById("world");
const chapterEl = document.getElementById("chapter");
const statusEl = document.getElementById("status");
const endingHintEl = document.getElementById("endingHint");
const chaosBar = document.getElementById("chaosBar");
const chaosText = document.getElementById("chaosText");
const logEl = document.getElementById("storyLog");
const teamTag = document.getElementById("teamTag");
const courageTag = document.getElementById("courageTag");
const kindnessTag = document.getElementById("kindnessTag");
const choicePanel = document.getElementById("choicePanel");
const choiceTitle = document.getElementById("choiceTitle");
const choicePrompt = document.getElementById("choicePrompt");
const choiceAButton = document.getElementById("choiceA");
const choiceBButton = document.getElementById("choiceB");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe4f0eb);
scene.fog = new THREE.Fog(0xe4f0eb, 36, 180);

const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 320);
camera.position.set(0, 10, 18);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

scene.add(new THREE.HemisphereLight(0xfff2d8, 0x4d6f7a, 1.06));
const sun = new THREE.DirectionalLight(0xffebbd, 1.22);
sun.position.set(17, 28, 8);
sun.castShadow = true;
scene.add(sun);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(300, 180),
  new THREE.MeshStandardMaterial({ color: 0x90be7f })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const path = new THREE.Mesh(
  new THREE.PlaneGeometry(116, 8),
  new THREE.MeshStandardMaterial({ color: 0xcbb394 })
);
path.rotation.x = -Math.PI / 2;
path.position.x = 5;
path.position.y = 0.02;
scene.add(path);

const river = new THREE.Mesh(
  new THREE.PlaneGeometry(36, 16),
  new THREE.MeshStandardMaterial({ color: 0x64b8de, transparent: true, opacity: 0.9 })
);
river.rotation.x = -Math.PI / 2;
river.position.set(-33, 0.03, 0);
scene.add(river);

const sea = new THREE.Mesh(
  new THREE.PlaneGeometry(90, 90),
  new THREE.MeshStandardMaterial({ color: 0x4a9fd4, transparent: true, opacity: 0.92 })
);
sea.rotation.x = -Math.PI / 2;
sea.position.set(44, 0.025, 0);
river.position.y = 0.03;
scene.add(sea);

const beach = new THREE.Mesh(
  new THREE.PlaneGeometry(16, 36),
  new THREE.MeshStandardMaterial({ color: 0xe5cf98 })
);
beach.rotation.x = -Math.PI / 2;
beach.position.set(26, 0.021, 0);
scene.add(beach);

const island = new THREE.Mesh(
  new THREE.CylinderGeometry(24, 28, 2.8, 40),
  new THREE.MeshStandardMaterial({ color: 0x688337 })
);
island.position.set(58, 1.4, 0);
scene.add(island);

const castle = new THREE.Mesh(
  new THREE.BoxGeometry(7, 9, 7),
  new THREE.MeshStandardMaterial({ color: 0x4d4d58 })
);
castle.position.set(58, 6.2, 0);
castle.castShadow = true;
scene.add(castle);

const peach = new THREE.Group();
const peachBase = new THREE.Mesh(
  new THREE.SphereGeometry(1.2, 24, 24),
  new THREE.MeshStandardMaterial({ color: 0xf8b7b0 })
);
const peachTop = new THREE.Mesh(
  new THREE.SphereGeometry(1.02, 24, 24),
  new THREE.MeshStandardMaterial({ color: 0xffd6cb })
);
peachTop.position.y = 0.16;
const peachLeaf = new THREE.Mesh(
  new THREE.ConeGeometry(0.22, 0.6, 10),
  new THREE.MeshStandardMaterial({ color: 0x4f8f3d })
);
peachLeaf.position.set(0.22, 1.15, 0);
peachLeaf.rotation.z = 0.6;
peach.add(peachBase, peachTop, peachLeaf);
peach.position.set(-33, 1.2, 0);
scene.add(peach);

const oldHouse = new THREE.Group();
const houseBody = new THREE.Mesh(
  new THREE.BoxGeometry(5.8, 3.4, 4.6),
  new THREE.MeshStandardMaterial({ color: 0xd9c4a1 })
);
houseBody.position.y = 1.8;
const houseRoof = new THREE.Mesh(
  new THREE.ConeGeometry(4.3, 2.2, 4),
  new THREE.MeshStandardMaterial({ color: 0x5e4433 })
);
houseRoof.position.y = 4.2;
houseRoof.rotation.y = Math.PI * 0.25;
oldHouse.add(houseBody, houseRoof);
oldHouse.position.set(-19, 0, -9);
scene.add(oldHouse);

const mountain = new THREE.Mesh(
  new THREE.ConeGeometry(11, 15, 6),
  new THREE.MeshStandardMaterial({ color: 0x597042 })
);
mountain.position.set(12, 7.5, -25);
scene.add(mountain);

const boat = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.9, 3.4, 8, 14),
  new THREE.MeshStandardMaterial({ color: 0x8f6a45 })
);
boat.rotation.z = Math.PI / 2;
boat.position.set(31, 0.85, 5);
scene.add(boat);

function createTorii(x, z) {
  const torii = new THREE.Group();
  const postMaterial = new THREE.MeshStandardMaterial({ color: 0xbc3a2a });
  const beamMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });

  const leftPost = new THREE.Mesh(new THREE.BoxGeometry(0.5, 4.5, 0.5), postMaterial);
  const rightPost = new THREE.Mesh(new THREE.BoxGeometry(0.5, 4.5, 0.5), postMaterial);
  const topBeam = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.45, 0.6), postMaterial);
  const capBeam = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.26, 0.68), beamMaterial);

  leftPost.position.set(-2.2, 2.25, 0);
  rightPost.position.set(2.2, 2.25, 0);
  topBeam.position.set(0, 4.1, 0);
  capBeam.position.set(0, 4.45, 0);
  torii.add(leftPost, rightPost, topBeam, capBeam);
  torii.position.set(x, 0, z);
  scene.add(torii);
}

createTorii(-16, 0);
createTorii(24, 0);

const momotaro = new THREE.Group();
const momotaroGroundY = 1.55;
const momotaroRadius = 0.8;

const obstacles = [
  { position: mountain.position, radius: 11 },
  { position: castle.position, radius: 5.4 },
  { position: oldHouse.position, radius: 3.6 },
];

function resolveObstacleCollisions(position) {
  obstacles.forEach((obstacle) => {
    const dx = position.x - obstacle.position.x;
    const dz = position.z - obstacle.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    const minDistance = obstacle.radius + momotaroRadius;
    if (distance > 0 && distance < minDistance) {
      const push = (minDistance - distance) / distance;
      position.x += dx * push;
      position.z += dz * push;
    } else if (distance === 0) {
      position.x += minDistance;
    }
  });
}

const torso = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.8, 1.5, 4, 8),
  new THREE.MeshStandardMaterial({ color: 0xf5f1e4 })
);
torso.castShadow = true;

const hakama = new THREE.Mesh(
  new THREE.CylinderGeometry(0.95, 1.1, 0.9, 20),
  new THREE.MeshStandardMaterial({ color: 0x2f3d8f })
);
hakama.position.y = -0.95;
hakama.castShadow = true;

const belt = new THREE.Mesh(
  new THREE.TorusGeometry(0.88, 0.11, 12, 40),
  new THREE.MeshStandardMaterial({ color: 0xc23a2c })
);
belt.rotation.x = Math.PI / 2;
belt.position.y = 0.36;

const head = new THREE.Mesh(
  new THREE.SphereGeometry(0.62, 24, 24),
  new THREE.MeshStandardMaterial({ color: 0xffdbbe })
);
head.position.y = 1.6;
head.castShadow = true;

const hachimaki = new THREE.Mesh(
  new THREE.TorusGeometry(0.62, 0.08, 12, 32),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
hachimaki.rotation.x = Math.PI / 2;
hachimaki.position.y = 1.65;

const flagPole = new THREE.Mesh(
  new THREE.CylinderGeometry(0.04, 0.04, 1.8, 8),
  new THREE.MeshStandardMaterial({ color: 0x9a7c54 })
);
flagPole.position.set(-0.56, 1, -0.5);

const flag = new THREE.Mesh(
  new THREE.PlaneGeometry(0.8, 0.5),
  new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide })
);
flag.position.set(-0.98, 1.4, -0.5);
flag.rotation.y = -0.4;

momotaro.add(torso, hakama, belt, head, hachimaki, flagPole, flag);
momotaro.position.set(-33, momotaroGroundY, 0);
scene.add(momotaro);

function createDog() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 18, 18),
    new THREE.MeshStandardMaterial({ color: 0xe7d6ba })
  );
  const snout = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.2, 0.4, 4, 8),
    new THREE.MeshStandardMaterial({ color: 0xf4e4cb })
  );
  snout.rotation.z = Math.PI / 2;
  snout.position.set(0.58, -0.04, 0);
  const earL = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.36, 10), body.material);
  const earR = earL.clone();
  earL.position.set(-0.22, 0.62, 0.2);
  earR.position.set(-0.22, 0.62, -0.2);
  earL.rotation.z = 0.5;
  earR.rotation.z = -0.5;
  g.add(body, snout, earL, earR);
  return g;
}

function createMonkey() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.68, 18, 18),
    new THREE.MeshStandardMaterial({ color: 0xad875f })
  );
  const face = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xe8c7a1 })
  );
  face.position.set(0.46, -0.06, 0);
  const tail = new THREE.Mesh(
    new THREE.TorusGeometry(0.33, 0.06, 10, 24, Math.PI * 1.4),
    body.material
  );
  tail.rotation.y = Math.PI / 2;
  tail.position.set(-0.62, -0.08, 0);
  g.add(body, face, tail);
  return g;
}

function createPheasant() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.64, 18, 18),
    new THREE.MeshStandardMaterial({ color: 0x6a8ebf })
  );
  const wingL = new THREE.Mesh(
    new THREE.BoxGeometry(0.48, 0.12, 0.86),
    new THREE.MeshStandardMaterial({ color: 0x5679a5 })
  );
  const wingR = wingL.clone();
  wingL.position.set(0, 0, 0.5);
  wingR.position.set(0, 0, -0.5);
  const beak = new THREE.Mesh(
    new THREE.ConeGeometry(0.14, 0.42, 10),
    new THREE.MeshStandardMaterial({ color: 0xc98332 })
  );
  beak.position.set(0.62, 0, 0);
  beak.rotation.z = -Math.PI / 2;
  g.add(body, wingL, wingR, beak);
  return g;
}

const companionDefs = [
  { name: "イヌ", pos: new THREE.Vector3(-12, 0.8, -2), joined: false, factory: createDog },
  { name: "サル", pos: new THREE.Vector3(4, 0.8, -2), joined: false, factory: createMonkey },
  { name: "キジ", pos: new THREE.Vector3(20, 0.8, 2), joined: false, factory: createPheasant }
];

const companions = companionDefs.map((c) => {
  const mesh = c.factory();
  mesh.position.copy(c.pos);
  mesh.traverse((part) => {
    if (part.isMesh) part.castShadow = true;
  });
  scene.add(mesh);
  return { ...c, mesh };
});

const keys = {};
const storyChoices = { kibi: null, river: null, oni: null };
let velocityY = 0;
let chaos = 0;
let courage = 0;
let kindness = 0;
let endingFixed = false;
let spinMode = false;
let latestChapter = 1;
let activeChoice = null;
let pendingRecruit = null;
let inPeach = true;

function pushLog(text) {
  const p = document.createElement("p");
  p.textContent = text;
  logEl.prepend(p);
}

function updateHud() {
  const cappedChaos = Math.min(100, Math.max(0, chaos));
  chaosBar.style.width = `${cappedChaos}%`;
  chaosText.textContent = `${Math.round(cappedChaos)}%`;

  const joined = companions.filter((c) => c.joined).length;
  teamTag.textContent = `仲間: ${joined}/3`;
  courageTag.textContent = `勇気: ${Math.floor(courage)}`;
  kindnessTag.textContent = `やさしさ: ${Math.floor(kindness)}`;

  let title = "序章: 川を流れる桃";
  if (!inPeach) title = "第一章: 桃から生まれた桃太郎";
  if (latestChapter >= 2) title = "第二章: きびだんごで仲間集め";
  if (latestChapter >= 3) title = "第三章: 海を渡って鬼ヶ島";
  if (latestChapter >= 4) title = "終章: 鬼退治の結末";
  chapterEl.textContent = title;
}

function emergeFromPeach() {
  if (!inPeach) return;

  inPeach = false;
  momotaro.visible = true;
  momotaro.position.set(-31, momotaroGroundY, 0);
  latestChapter = 1;
  chaos += 2;
  statusEl.textContent = "WASD: 移動 / Space: ジャンプ / Shift: ダッシュ / E: 仲間にする / 1,2: 選択";
  endingHintEl.textContent = "村から道を進み、仲間を集めて鬼ヶ島へ向かおう。";
  pushLog("川岸で桃が割れ、桃太郎が現れた。ここから正規ルートと分岐ルートが始まる。");
  updateHud();
}

function setChoice(data) {
  activeChoice = data;
  choiceTitle.textContent = data.title;
  choicePrompt.textContent = data.prompt;
  choiceAButton.textContent = `1: ${data.optionA}`;
  choiceBButton.textContent = `2: ${data.optionB}`;
  choicePanel.classList.remove("hidden");
}

function clearChoice() {
  activeChoice = null;
  choicePanel.classList.add("hidden");
}

function resolveChoice(choiceIndex) {
  if (!activeChoice) return;

  if (choiceIndex === 0) {
    activeChoice.onA();
  } else {
    activeChoice.onB();
  }
  clearChoice();
  updateHud();
}

choiceAButton.addEventListener("click", () => resolveChoice(0));
choiceBButton.addEventListener("click", () => resolveChoice(1));

function commitEnding() {
  if (endingFixed || !storyChoices.oni) return;

  latestChapter = 4;
  endingFixed = true;
  const joined = companions.filter((c) => c.joined).length;

  let ending = "";
  const canonicalRoute = storyChoices.kibi === "A"
    && storyChoices.river === "A"
    && storyChoices.oni === "A"
    && joined === 3
    && chaos < 45;

  if (canonicalRoute) {
    ending = "正規結末: 桃太郎は犬・猿・雉子と鬼をこらしめ、宝を村へ持ち帰って平和を取り戻した。";
  } else if (chaos >= 70) {
    ending = "超ゆがみ結末: 鬼ヶ島が観光テーマパーク化し、桃太郎は初代プロデューサーになった。";
  } else if (storyChoices.oni === "B") {
    ending = "分岐結末: 鬼と和解して祭りを共催。宝は共同基金になり、物語は新しい伝承になった。";
  } else if (joined <= 1) {
    ending = "孤戦結末: 桃太郎は勝利したが、帰路で『仲間の意味』を語る旅を続けた。";
  } else {
    ending = "混合結末: 鬼退治は達成したが、旅の選択が語り継がれ、地方ごとに違う桃太郎譚が生まれた。";
  }

  statusEl.textContent = ending;
  endingHintEl.textContent = "Rキーで物語をリセットできます。";
  pushLog(`【結末】${ending}`);
}

function resetStory() {
  chaos = 0;
  courage = 0;
  kindness = 0;
  endingFixed = false;
  spinMode = false;
  latestChapter = 1;
  velocityY = 0;
  pendingRecruit = null;
  inPeach = true;
  clearChoice();

  storyChoices.kibi = null;
  storyChoices.river = null;
  storyChoices.oni = null;

  momotaro.position.set(-33, momotaroGroundY, 0);
  momotaro.rotation.set(0, 0, 0);
  momotaro.visible = false;

  companions.forEach((c, i) => {
    c.joined = false;
    c.mesh.position.copy(companionDefs[i].pos);
  });

  statusEl.textContent = "E: 桃から出る / 出た後は WASD: 移動 / E: 仲間にする / 1,2: 選択";
  endingHintEl.textContent = "まずは桃から出て、村の道を進もう。";
  logEl.innerHTML = "";

  pushLog("序章: 川上から大きな桃が流れてきた。桃太郎はまだ桃の中にいる。");
  pushLog("Eキーで桃から生まれると、正規の物語を基準にした旅が始まる。");
  updateHud();
}

function promptKibiChoice(companion) {
  pendingRecruit = companion;
  setChoice({
    title: "きびだんごの場面",
    prompt: `${companion.name}が仲間になりたそうに見ている。どうする?`,
    optionA: "きびだんごを分けて仲間にする",
    optionB: "腕試しで従わせる",
    onA: () => {
      storyChoices.kibi = "A";
      companion.joined = true;
      kindness += 18;
      chaos += 2;
      latestChapter = Math.max(2, latestChapter);
      pushLog(`正規選択: ${companion.name}へきびだんごを渡し、家来になってもらった。`);
    },
    onB: () => {
      storyChoices.kibi = "B";
      companion.joined = true;
      courage += 7;
      chaos += 14;
      latestChapter = Math.max(2, latestChapter);
      pushLog(`分岐選択: ${companion.name}と勝負して仲間にした。語り口がだいぶ荒くなる。`);
    }
  });
}

function tryRecruit() {
  if (endingFixed || activeChoice || inPeach) return;

  for (const c of companions) {
    if (c.joined) continue;
    if (c.mesh.position.distanceTo(momotaro.position) < 2.4) {
      if (!storyChoices.kibi) {
        promptKibiChoice(c);
      } else {
        c.joined = true;
        kindness += storyChoices.kibi === "A" ? 12 : 5;
        chaos += storyChoices.kibi === "A" ? 2 : 9;
        latestChapter = Math.max(2, latestChapter);
        pushLog(`${c.name}が隊列に合流した。`);
      }
      pendingRecruit = null;
      updateHud();
      return;
    }
  }
}

function promptRiverChoice() {
  if (storyChoices.river || activeChoice) return;

  setChoice({
    title: "海渡りの場面",
    prompt: "鬼ヶ島へ向かう。昔話らしく舟で渡る? それとも別の方法を試す?",
    optionA: "舟をこぎ、隊列で慎重に渡る",
    optionB: "桃ジェットを起動して一気に飛ぶ",
    onA: () => {
      storyChoices.river = "A";
      kindness += 6;
      chaos += 3;
      latestChapter = Math.max(3, latestChapter);
      momotaro.position.x = 39;
      momotaro.position.z = 0;
      pushLog("正規選択: 海を舟で渡り、隊列を整えて鬼ヶ島へ近づいた。");
    },
    onB: () => {
      storyChoices.river = "B";
      courage += 10;
      chaos += 18;
      latestChapter = Math.max(3, latestChapter);
      momotaro.position.x = 43;
      momotaro.position.z += 3;
      pushLog("分岐選択: 桃ジェットで急加速。海は渡れたが、物語のゆがみ度が上がった。");
    }
  });
}

function promptOniChoice() {
  if (storyChoices.oni || activeChoice) return;

  setChoice({
    title: "鬼ヶ島決戦の場面",
    prompt: "鬼の頭領が降参を申し出た。昔話に寄せる? それとも新しい結末へ向かう?",
    optionA: "鬼をこらしめ、宝を村へ持ち帰る",
    optionB: "鬼と和解し、宝で祭りを開く",
    onA: () => {
      storyChoices.oni = "A";
      chaos += 4;
      kindness += 6;
      pushLog("正規選択: 鬼をこらしめ、宝を持ち帰る筋へ進んだ。");
      commitEnding();
    },
    onB: () => {
      storyChoices.oni = "B";
      chaos += 25;
      kindness += 12;
      pushLog("分岐選択: 鬼と和解し、物語は新しい地域伝承ルートへ入った。");
      commitEnding();
    }
  });
}

function keyDownHandler(e) {
  const key = e.key.toLowerCase();

  if (inPeach && key === "e") {
    emergeFromPeach();
    return;
  }

  if (activeChoice && (key === "1" || key === "2")) {
    resolveChoice(key === "1" ? 0 : 1);
    return;
  }

  keys[key] = true;
  if (key === "q") spinMode = true;
  if (key === "r") resetStory();
  if (key === "e") tryRecruit();
}

function keyUpHandler(e) {
  const key = e.key.toLowerCase();
  keys[key] = false;
  if (key === "q") spinMode = false;
}

window.addEventListener("keydown", keyDownHandler);
window.addEventListener("keyup", keyUpHandler);

for (const btn of document.querySelectorAll(".mobilePad button")) {
  const k = btn.getAttribute("data-key");
  const down = () => {
    if (!activeChoice) {
      keys[k] = true;
      if (k === "e") tryRecruit();
    }
  };
  const up = () => {
    keys[k] = false;
  };

  btn.addEventListener("touchstart", (ev) => {
    ev.preventDefault();
    down();
  }, { passive: false });
  btn.addEventListener("touchend", up);
  btn.addEventListener("mousedown", down);
  btn.addEventListener("mouseup", up);
  btn.addEventListener("mouseleave", up);
}

function animate() {
  requestAnimationFrame(animate);

  const speed = keys.shift ? 0.26 : 0.14;
  const canMove = !activeChoice && !endingFixed && !inPeach;

  const move = new THREE.Vector3();
  if (canMove) {
    if (keys.w) move.z -= speed;
    if (keys.s) move.z += speed;
    if (keys.a) move.x -= speed;
    if (keys.d) move.x += speed;
  }

  if (move.lengthSq() > 0) {
    courage += 0.04;
    chaos += keys.shift ? 0.04 : 0.012;
    momotaro.position.add(move);
    resolveObstacleCollisions(momotaro.position);
    const angle = Math.atan2(move.x, move.z);
    momotaro.rotation.y = angle;
  }

  if (canMove && keys[" "] && momotaro.position.y <= momotaroGroundY + 0.01) {
    velocityY = 0.22;
    chaos += 0.9;
  }

  if (canMove && spinMode) {
    momotaro.rotation.y += 0.18;
    chaos += 0.12;
  }

  velocityY -= 0.012;
  momotaro.position.y += velocityY;
  if (momotaro.position.y < momotaroGroundY) {
    momotaro.position.y = momotaroGroundY;
    velocityY = 0;
  }

  const joined = companions.filter((c) => c.joined);
  joined.forEach((c, i) => {
    const target = momotaro.position.clone();
    target.x -= Math.cos(i * 1.9) * (2 + i * 0.5);
    target.z += Math.sin(i * 1.9) * (2 + i * 0.5);
    c.mesh.position.lerp(target.setY(0.8), 0.06);
  });

  if (!inPeach && momotaro.position.x > 26 && latestChapter < 3) {
    promptRiverChoice();
  }

  if (!inPeach && momotaro.position.distanceTo(castle.position) < 9) {
    promptOniChoice();
  }

  if (!inPeach && momotaro.position.distanceTo(peach.position) < 2.5 && chaos < 12) {
    chaos += 0.02;
  }

  chaos = Math.max(0, Math.min(100, chaos));

  const focus = inPeach ? peach.position : momotaro.position;
  const lift = inPeach ? 1.2 : 1.6;
  camera.position.x += (focus.x - camera.position.x) * 0.07;
  camera.position.z += (focus.z + 16 - camera.position.z) * 0.07;
  camera.lookAt(focus.x, focus.y + lift, focus.z);

  updateHud();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

resetStory();
animate();
