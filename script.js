/* ============ BALAJIOS — core OS logic ============ */

/* ---------- Boot sequence ---------- */
window.addEventListener('load', () => {
  const flash = document.querySelector('#bootFlash');
  const login = document.querySelector('#loginScreen');
  const loginBtn = document.querySelector('#loginBtn');

  setTimeout(() => flash.classList.add('done'), 600);

  loginBtn.addEventListener('click', () => {
    login.classList.add('hidden');
    setTimeout(() => login.remove(), 700);
    openWindow(welcomeScreen);
  });
});

/* ---------- Live clock ---------- */
function updateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  document.querySelector('#timeElement').innerHTML = `${date} · ${time}`;
}
updateTime();
setInterval(updateTime, 1000);

/* ---------- Window management ---------- */
let biggestIndex = 1;
const topBar = document.querySelector('#top');

function closeWindow(element) {
  element.style.display = 'none';
}

function openWindow(element) {
  element.style.display = 'flex';
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function addWindowTapHandling(element) {
  element.addEventListener('mousedown', () => handleWindowTap(element));
}

/* ---------- Draggable windows (W3 pattern) ---------- */
function dragElement(element) {
  let initialX = 0, initialY = 0, currentX = 0, currentY = 0;

  const header = document.getElementById(element.id + 'header');
  if (header) {
    header.onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + 'px';
    element.style.left = (element.offsetLeft - currentX) + 'px';
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/* ---------- Icon selection ---------- */
let selectedIcon = undefined;

function selectIcon(element) {
  element.classList.add('selected');
  selectedIcon = element;
}

function deselectIcon(element) {
  if (element) element.classList.remove('selected');
  selectedIcon = undefined;
}

function handleIconTap(icon, screen) {
  if (icon.classList.contains('selected')) {
    deselectIcon(icon);
    openWindow(screen);
  } else {
    deselectIcon(selectedIcon);
    selectIcon(icon);
    openWindow(screen);
  }
}

/* ---------- Initialize windows & icons ---------- */
function makeClosable(elementName) {
  const screen = document.querySelector('#' + elementName);
  const close = document.querySelector('#' + elementName + 'close');
  if (close) close.addEventListener('click', () => closeWindow(screen));
}

function initializeIcon(name) {
  const icon = document.querySelector('#' + name + 'Icon');
  const screen = document.querySelector('#' + name);
  if (icon && screen) icon.addEventListener('click', () => handleIconTap(icon, screen));
}

function initializeWindow(elementName) {
  const screen = document.querySelector('#' + elementName);
  if (!screen) return;
  addWindowTapHandling(screen);
  makeClosable(elementName);
  dragElement(screen);
  if (elementName !== 'welcome') initializeIcon(elementName);
}

const welcomeScreen = document.querySelector('#welcome');
initializeWindow('welcome');
initializeWindow('notes');
initializeWindow('projects');
initializeWindow('terminal');
initializeWindow('contact');
initializeWindow('weather');
initializeWindow('calc');
initializeWindow('paint');
initializeWindow('about');

/* Welcome reopens from the top-bar name */
document.querySelector('#welcomeopen').addEventListener('click', () => {
  openWindow(welcomeScreen);
});

/* ---------- NOTES APP ---------- */
const notesContent = [
  {
    title: 'The Origin Story',
    date: 'Aug 2026',
    content: `
      <h3>Why I built this OS</h3>
      <p class="note-date">sribalajid — Aug 2026</p>
      <p>Most people have a website. I wanted a <strong>world</strong>. A tiny planet where the desktop
      wallpaper is a nebula and every icon opens a room of my life.</p>
      <blockquote>"The desktop is a canvas. The windows are the stories."</blockquote>
      <p>This OS is built from scratch with plain HTML, CSS and JavaScript — no frameworks, no
      libraries. Drag the windows around. Open the terminal. Stay a while. </p>
    `
  },
  {
    title: 'Why ECE?',
    date: '2024 — now',
    content: `
      <h3>Electronics & Communication Engineering</h3>
      <p class="note-date">St. Martin's Engineering College, Secunderabad</p>
      <p>I chose <abbr title="Electronics and Communication Engineering">ECE</abbr> because I wanted to
      understand the <em>physical layer</em> of computing — the transistors, signals, and systems
      underneath every AI model and every robot I build.</p>
      <p>Between classes, I'm constantly wiring microcontrollers, tuning PID loops on a Raspberry Pi
      car, and grinding through signal-processing math until the Fourier transform finally makes sense.</p>
      <blockquote>Hardware taught me patience. Software taught me speed. AI is teaching me both.</blockquote>
    `
  },
  {
    title: 'The Robot Car',
    date: '2025',
    content: `
      <h3>4WD Person-Following Car</h3>
      <p class="note-date">Raspberry Pi 5 · OpenCV · PID</p>
      <p>My proudest hardware build: a four-wheel-drive rover that locks onto a person and follows them
      around. The vision pipeline detects the target, computes a steering error, and a PID controller
      smooths the throttle — so it follows like a loyal dog instead of a drunkard.</p>
      <blockquote>It's basically a tiny self-driving car. With the safety budget of a toy. </blockquote>
      <p>Next on the bench: a drone with similar autonomy. The sky is the overclock limit.</p>
    `
  },
  {
    title: 'AI, My Second Brain',
    date: '2026',
    content: `
      <h3>An AI agent that runs my life</h3>
      <p class="note-date">Freebuff · CrewAI · NotebookLM</p>
      <p>I run a personal AI orchestration stack: a 6-persona agent team that plans my projects, a
      lead-generation pipeline that researches companies, and a notebook-based second brain that
      remembers everything for me.</p>
      <p>Sometimes I even let an AI write my homework notes. The irony is not lost on me: I study
      electronics so I can build machines that think, then I use those machines to study. </p>
    `
  }
];

let activeNote = 0;

function setNotesContent(index) {
  activeNote = index;
  const note = notesContent[index];
  document.querySelector('#notesContent').innerHTML = note.content;
  document.querySelectorAll('.sidebar-item').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });
}

function addToSideBar(index) {
  const sidebar = document.querySelector('#sidebar');
  const note = notesContent[index];
  const newDiv = document.createElement('div');
  newDiv.className = 'sidebar-item' + (index === 0 ? ' active' : '');
  newDiv.innerHTML = `
    <p class="item-title">${note.title}</p>
    <p class="item-date">${note.date}</p>
  `;
  newDiv.addEventListener('click', () => setNotesContent(index));
  sidebar.appendChild(newDiv);
}

for (let i = 0; i < notesContent.length; i++) {
  addToSideBar(i);
}
setNotesContent(0);

/* ---------- PROJECTS APP ---------- */
function openExternal(url) {
  window.open(url, '_blank', 'noopener');
}

/* ---------- TERMINAL APP ---------- */
const termOutput = document.querySelector('#termOutput');
const termInput = document.querySelector('#termInput');

function printLine(html, cls = '') {
  const line = document.createElement('p');
  line.className = 'term-line' + (cls ? ' ' + cls : '');
  line.innerHTML = html;
  termOutput.appendChild(line);
  termOutput.scrollTop = termOutput.scrollHeight;
}

function runCommand(raw) {
  const cmd = raw.trim();
  printLine(`<span class="term-prompt">balaji@os:~$</span> ${cmd.replace(/</g, '&lt;')}`);

  const [name, ...args] = cmd.split(/\s+/);
  const arg = args.join(' ');

  switch (name.toLowerCase()) {
    case '':
      break;

    case 'help':
      printLine(`<span class="term-ok">Available commands:</span>`, 'term-muted');
      printLine(`<span class="term-table">  help        show this help
  about       who is Sri Balaji
  projects    list my projects
  skills      my tech stack
  contact     how to reach me
  date        current date & time
  echo &lt;text&gt;  repeat text back
  sudo        do absolutely nothing
  clear       clear the screen
  exit        close this window</span>`);
      break;

    case 'about':
      printLine(`<span class="term-accent">Sri Balaji Dangeti</span> — ECE sophomore, hardware tinkerer, AI orchestration nerd.
I build robots that follow people, watch apps for my wrist, and agent teams that work while I sleep.
Currently studying <span class="term-ok">JNTUH R25</span> signals, systems & circuits — while shipping projects on the side.`);
      break;

    case 'projects':
      printLine(`<span class="term-ok">My projects:</span>`);
      printLine(`<span class="term-table">  • AI agent team        — 6 personas on NVIDIA NIM
  • Lead-gen pipeline    — CrewAI, life-sciences outreach
  • Person-following car — Raspberry Pi 5 + OpenCV + PID
  • Zepp OS watch app    — voice note-taker for Amazfit
  • This OS              — BalajiOS, built from scratch</span>`);
      break;

    case 'skills':
      printLine(`<span class="term-ok">Skills:</span> <span class="term-table">C · Python · JavaScript · Embedded C · Arduino · Raspberry Pi
OpenCV · TensorFlow (learning) · CrewAI · n8n · Figma basics · PCB (learning)</span>`);
      break;

    case 'contact':
      printLine(`<span class="term-table">  GitHub:  github.com/dsribalaji
  LinkedIn: linkedin.com/in/sribalaji-dangeti</span>`);
      break;

    case 'date':
      printLine(new Date().toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'long' }));
      break;

    case 'echo':
      printLine(arg.replace(/</g, '&lt;'));
      break;

    case 'sudo':
      if (arg.toLowerCase().includes('make me a coffee')) {
        printLine(`<span class="term-ok">Access granted. Brewing... (this OS has no coffee. Sorry.)</span>`);
      } else {
        printLine(`<span class="term-err">sudo: ${arg || 'nothing'} : command executed with great authority. Nothing happened.</span>`);
      }
      break;

    case 'clear':
      termOutput.innerHTML = '';
      break;

    case 'exit':
      closeWindow(document.querySelector('#terminal'));
      break;

    case 'whoami':
      printLine(`sribalajid — the human behind BalajiOS`);
      break;

    default:
      printLine(`<span class="term-err">command not found: ${name.replace(/</g, '&lt;')}</span> — type <span class="term-cmd">help</span> to see what I can do.`);
  }
}

termInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    runCommand(termInput.value);
    termInput.value = '';
  }
});

/* Focus the terminal when its window is opened */
document.querySelector('#terminal').addEventListener('mousedown', () => {
  setTimeout(() => termInput.focus(), 50);
});


/* ---------- WEATHER APP ---------- */
const WEATHER_CITY = { name: 'Hyderabad', lat: 17.385, lon: 78.4867 };

const WMO_CODES = {
  0: ['Clear sky'],
  1: ['Mainly clear'],
  2: ['Partly cloudy'],
  3: ['Overcast'],
  45: ['Fog'],
  48: ['Rime fog'],
  51: ['Light drizzle'],
  53: ['Drizzle'],
  55: ['Heavy drizzle'],
  61: ['Light rain'],
  63: ['Rain'],
  65: ['Heavy rain'],
  71: ['Light snow'],
  73: ['Snow'],
  75: ['Heavy snow'],
  80: ['Light showers'],
  81: ['Showers'],
  82: ['Heavy showers'],
  95: ['Thunderstorm'],
  96: ['Thunderstorm + hail'],
  99: ['Severe thunderstorm']
};

function weatherDesc(code) {
  return WMO_CODES[code] ? WMO_CODES[code][0] : 'Unknown';
}

function loadWeather() {
  const now = document.querySelector('#weatherNow');
  const fc = document.querySelector('#weatherForecast');
  if (!now) return;

  now.innerHTML = '<p class="weather-loading">Loading weather...</p>';
  fc.innerHTML = '';

  const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + WEATHER_CITY.lat +
    '&longitude=' + WEATHER_CITY.lon +
    '&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5';

  fetch(url)
    .then(r => r.json())
    .then(data => {
      const cur = data.current;
      const desc = weatherDesc(cur.weather_code);
      now.innerHTML = `
        <p class="weather-city">${WEATHER_CITY.name}</p>
        <p class="weather-temp">${Math.round(cur.temperature_2m)}&deg;C</p>
        <p class="weather-desc">${desc}</p>
        <p class="weather-meta">Humidity ${cur.relative_humidity_2m}% &middot; Wind ${Math.round(cur.wind_speed_10m)} km/h</p>
      `;

      const days = data.daily;
      let html = '';
      for (let i = 0; i < days.time.length; i++) {
        const ddesc = weatherDesc(days.weather_code[i]);
        const date = new Date(days.time[i]);
        const label = i === 0 ? 'Today' : date.toLocaleDateString('en-IN', { weekday: 'short' });
        html += `
          <div class="weather-day">
            <span class="wd-label">${label}</span>
            <span class="wd-desc">${ddesc}</span>
            <span class="wd-temp">${Math.round(days.temperature_2m_max[i])}&deg; / ${Math.round(days.temperature_2m_min[i])}&deg;</span>
          </div>`;
      }
      fc.innerHTML = html;
    })
    .catch(err => {
      now.innerHTML = '<p class="weather-loading">Could not load weather. Check your connection.</p>';
    });
}

loadWeather();


/* ---------- CALCULATOR APP ---------- */
(function initCalc() {
  const display = document.querySelector('#calcDisplay');
  if (!display) return;

  let current = '';
  let previous = '';
  let operator = null;
  let resetOnNext = false;

  function update() {
    display.textContent = current === '' ? '0' : current;
  }

  function appendNum(n) {
    if (resetOnNext) {
      current = '';
      resetOnNext = false;
    }
    if (n === '0' && current === '0') return;
    current += n;
    update();
  }

  function setOperator(op) {
    if (operator !== null && current !== '' && !resetOnNext) {
      compute();
    }
    if (current === '') return;
    previous = current;
    operator = op;
    resetOnNext = true;
  }

  function compute() {
    if (operator === null || current === '') return;
    const a = parseFloat(previous);
    const b = parseFloat(current);
    let result;
    switch (operator) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = b === 0 ? 'Error' : a / b; break;
      default: return;
    }
    current = result === 'Error' ? 'Error' : String(Math.round(result * 1e10) / 1e10);
    operator = null;
    previous = '';
    resetOnNext = true;
    update();
  }

  function dot() {
    if (resetOnNext) {
      current = '0';
      resetOnNext = false;
    }
    if (!current.includes('.')) current += '.';
    update();
  }

  function neg() {
    if (current !== '' && current !== '0') {
      current = String(-parseFloat(current));
      update();
    }
  }

  function pct() {
    if (current !== '') {
      current = String(parseFloat(current) / 100);
      update();
    }
  }

  document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const act = btn.dataset.act;
      if (act === 'num') appendNum(btn.dataset.val);
      else if (act === 'op') setOperator(btn.dataset.val);
      else if (act === 'eq') compute();
      else if (act === 'dot') dot();
      else if (act === 'clear') { current = ''; previous = ''; operator = null; update(); }
      else if (act === 'neg') neg();
      else if (act === 'pct') pct();
    });
  });
})();


/* ---------- PAINT APP ---------- */
(function initPaint() {
  const canvas = document.querySelector('#paintCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let drawing = false;
  let color = '#16131f';
  let size = 18;

  function pos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + 0.1, p.y + 0.1);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  });

  window.addEventListener('mouseup', () => { drawing = false; });
  canvas.addEventListener('mouseleave', () => { drawing = false; });

  document.querySelectorAll('.paint-color').forEach(btn => {
    btn.addEventListener('click', () => {
      color = btn.dataset.color;
      document.querySelectorAll('.paint-color').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.querySelectorAll('.paint-size').forEach(btn => {
    btn.addEventListener('click', () => {
      size = parseInt(btn.dataset.size, 10);
      document.querySelectorAll('.paint-size').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.querySelector('#paintClear').addEventListener('click', () => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
})();
