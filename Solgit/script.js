// ---------- 더미 데이터 ----------
const commits = [
  {
    hash: "a1b2c3d",
    msg: "feat: 초기 SOLGIT 레이아웃 추가",
    author: "jito",
    time: "2분 전",
  },
  {
    hash: "d4e5f6a",
    msg: "chore: README 정리 및 문구 수정",
    author: "jito",
    time: "32분 전",
  },
  {
    hash: "aa77bb1",
    msg: "style: 버튼 호버 상태 개선",
    author: "jito",
    time: "어제",
  },
  {
    hash: "99cc00d",
    msg: "refactor: 섹션 구조 리팩토링",
    author: "jito",
    time: "2일 전",
  },
];

const activities = [
  {
    type: "commit",
    title: '커밋: "feat: hero 섹션 추가"',
    who: "jito",
    time: "방금 전",
    branch: "feature/ui-upgrade",
  },
  {
    type: "branch",
    title: "브랜치 생성: feature/ui-upgrade",
    who: "jito",
    time: "10분 전",
    branch: "feature/ui-upgrade",
  },
  {
    type: "commit",
    title: '커밋: "style: 다크 모드 색상 조정"',
    who: "jito",
    time: "54분 전",
    branch: "feature/theme",
  },
  {
    type: "commit",
    title: '커밋: "docs: GitHub Pages 설정 메모 추가"',
    who: "jito",
    time: "어제",
    branch: "main",
  },
];

// ---------- 유틸 ----------
function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

function qsa(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

// 메시지 바 (토스트)
let toastTimeout;
function showMessage(text) {
  const bar = qs("#messageBar");
  if (!bar) return;
  bar.textContent = text;
  bar.classList.remove("hidden");
  bar.classList.add("visible");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    bar.classList.remove("visible");
    bar.classList.add("hidden");
  }, 2200);
}

// ---------- Git log 패널 채우기 ----------
function renderCommits() {
  const listEl = qs("#commitList");
  if (!listEl) return;

  listEl.innerHTML = commits
    .map(
      (c) => `
    <div class="commit-item">
      <div>
        <span class="commit-hash">${c.hash}</span>
        <span> ${c.msg}</span>
      </div>
      <div class="commit-meta">
        <span>${c.author}</span>
        <span>${c.time}</span>
      </div>
    </div>
  `
    )
    .join("");
}

// ---------- Activity 리스트 채우기 ----------
function renderActivities(filter = "all") {
  const listEl = qs("#activityList");
  if (!listEl) return;

  const filtered =
    filter === "all"
      ? activities
      : activities.filter((a) => a.type === filter);

  if (!filtered.length) {
    listEl.innerHTML = `<li class="activity-item">
      <span class="activity-type">none</span>
      <div>
        <div class="activity-title">해당 타입의 활동이 없습니다.</div>
        <div class="activity-meta">필터를 바꾸어 다시 확인해보세요.</div>
      </div>
    </li>`;
    return;
  }

  listEl.innerHTML = filtered
    .map(
      (a) => `
    <li class="activity-item">
      <span class="activity-type ${a.type}">${a.type}</span>
      <div>
        <div class="activity-title">${a.title}</div>
        <div class="activity-meta">
          by ${a.who} · ${a.time} · ${a.branch}
        </div>
      </div>
    </li>
  `
    )
    .join("");
}

// ---------- 테마 토글 ----------
function initThemeToggle() {
  const btn = qs("#themeToggle");
  if (!btn) return;

  // 저장된 테마 불러오기
  const saved = window.localStorage.getItem("solgit-theme");
  if (saved === "dark") {
    document.body.classList.add("dark-theme");
    btn.textContent = "🌙 Dark";
  }

  btn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    btn.textContent = isDark ? "🌙 Dark" : "🌞 Light";
    window.localStorage.setItem("solgit-theme", isDark ? "dark" : "light");
  });
}

// ---------- 액션 버튼들 ----------
function initActionButtons() {
  // hero, mission 버튼 공통
  qsa("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-action");
      switch (action) {
        case "start":
          showMessage("새 브랜치 생성: feature/ui-upgrade (가상의 액션입니다) 🙌");
          qs("#currentBranch").textContent = "feature/ui-upgrade";
          qs("#lastCommit").textContent = '"feat: hero 섹션 추가"';
          break;
        case "docs":
          showMessage("아직 진짜 문서는 없어요. 대신 README를 채워보면 어떨까요? 📚");
          break;
        case "mission":
          showMessage("오늘의 연습 미션 완료! 깃 로그에 하나 적어두는 것도 좋겠네요 ✅");
          break;
        default:
          showMessage("클릭 액션이 연결되지 않았어요.");
      }
    });
  });
}

// ---------- Activity 필터 ----------
function initActivityFilter() {
  const chips = qsa(".activity-header .chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.getAttribute("data-filter");
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      renderActivities(filter);
    });
  });
}

// ---------- 초기화 ----------
document.addEventListener("DOMContentLoaded", () => {
  renderCommits();
  renderActivities("all");
  initThemeToggle();
  initActionButtons();
  initActivityFilter();
});

