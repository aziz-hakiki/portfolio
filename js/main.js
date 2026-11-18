/**
 * JavaScript Utama Portofolio Muhamad Azis Hakiki
 * Full-Stack Web Developer (Laravel & Modern Web Stack)
 * 
 * Sesuai Pedoman Anti-Slop:
 * - Bebas karakter em dash
 * - Fungsionalitas nyata pada setiap tombol interaktif (R-26)
 * - Dukungan navigasi keyboard penuh & modal escape (R-32)
 * - State handling: empty state, active state, dan feedback form (R-27)
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectShowcase();
  initProjectModal();
  initMobileNav();
  initContactForm();
  initCopyEmail();
  initActiveNav();
});

// 1. PROJECT SHOWCASE & FILTER SYSTEM
function initProjectShowcase() {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectsContainer = document.getElementById('projects-container');
  const projectCounter = document.getElementById('project-counter');
  const emptyState = document.getElementById('projects-empty-state');

  if (!projectsContainer || !PROJECTS_DATA) return;

  // Render semua kartu proyek awal
  renderProjects(PROJECTS_DATA);

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedCategory = button.getAttribute('data-filter');

      // Update button active states
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-slate-900', 'text-white', 'border-slate-900');
        btn.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
        btn.setAttribute('aria-pressed', 'false');
      });

      button.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
      button.classList.add('bg-slate-900', 'text-white', 'border-slate-900');
      button.setAttribute('aria-pressed', 'true');

      // Filter data
      let filteredProjects = PROJECTS_DATA;
      if (selectedCategory !== 'all') {
        filteredProjects = PROJECTS_DATA.filter(p => p.category === selectedCategory);
      }

      // Update Counter
      if (projectCounter) {
        const count = filteredProjects.length;
        const categoryName = button.textContent.trim();
        projectCounter.textContent = `Menampilkan ${count} proyek (${categoryName})`;
      }

      // Render
      renderProjects(filteredProjects);
    });
  });

  function renderProjects(projects) {
    projectsContainer.innerHTML = '';

    if (projects.length === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    } else {
      if (emptyState) emptyState.classList.add('hidden');
    }

    projects.forEach((proj, idx) => {
      const card = document.createElement('article');
      card.className = 'swiss-panel group relative flex flex-col justify-between overflow-hidden border border-slate-200 bg-white transition-all duration-150 hover:border-slate-400';
      card.setAttribute('data-category', proj.category);

      // SVG wireframe schematic based on preview type
      const schematicSVG = getWireframeSchematic(proj.previewType, proj.title, proj.techStack);

      const stackBadges = proj.techStack
        .map(tech => `<span class="inline-flex items-center px-2 py-0.5 text-xs font-mono-tech bg-slate-100 text-slate-800 border border-slate-200">${tech}</span>`)
        .join(' ');

      card.innerHTML = `
        <div>
          <!-- Placeholder Screenshot Wireframe 16:10 -->
          <!-- GANTI DENGAN SCREENSHOT APLIKASI ASLI -->
          <div class="tech-wireframe-canvas w-full flex items-center justify-center p-3 sm:p-4 border-b border-slate-200 bg-slate-50 relative group-hover:bg-slate-100/70 transition-colors">
            ${schematicSVG}
            <div class="absolute top-2 left-2 bg-white/95 px-2 py-0.5 text-[11px] font-mono-tech text-slate-600 border border-slate-200 flex items-center gap-1.5 shadow-sm">
              <span class="w-1.5 h-1.5 rounded-full ${proj.accentColor === 'crimson' ? 'bg-red-600' : 'bg-sky-600'}"></span>
              REF: ${proj.index} / ${proj.category.toUpperCase()}
            </div>
            <div class="absolute bottom-2 right-2 hidden sm:block bg-slate-900/90 text-white px-2 py-0.5 text-[10px] font-mono-tech">
              RATIO 16:10
            </div>
          </div>

          <!-- Content Meta -->
          <div class="p-5 sm:p-6">
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="tech-index-tag font-semibold text-slate-500">[PROYEK ${proj.index}]</span>
              <span class="text-xs font-mono-tech text-slate-500 bg-slate-100 px-2 py-0.5 border border-slate-200">${proj.categoryLabel}</span>
            </div>

            <h3 class="font-heading text-lg sm:text-xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-red-700 transition-colors">
              ${proj.title}
            </h3>

            <p class="text-slate-600 text-sm leading-relaxed mb-4 font-body">
              ${proj.summary}
            </p>

            <!-- Tech Stack List -->
            <div class="flex flex-wrap gap-1.5 mb-5">
              ${stackBadges}
            </div>
          </div>
        </div>

        <!-- Action Trigger -->
        <div class="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between gap-3 bg-slate-50/50">
          <span class="text-xs font-mono-tech text-slate-500 truncate">
            ${proj.architectureBadge}
          </span>
          <button 
            type="button" 
            data-open-modal="${proj.id}" 
            class="inline-flex items-center justify-center px-3.5 py-2 text-xs font-medium font-mono-tech bg-slate-900 text-white hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-1 transition-colors"
            aria-label="Buka detail arsitektur untuk ${proj.title}">
            Detail Teknis
          </button>
        </div>
      `;

      projectsContainer.appendChild(card);
    });

    // Re-bind modal triggers
    bindModalButtons();
  }
}

// 2. TECHNICAL DETAIL MODAL / DRAWER
let lastFocusedElement = null;

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  function closeModal() {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    modal.setAttribute('aria-hidden', 'true');
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  // Keyboard accessibility: ESC key to close modal (R-32)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

function bindModalButtons() {
  const triggers = document.querySelectorAll('[data-open-modal]');
  const modal = document.getElementById('project-modal');

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-open-modal');
      const project = PROJECTS_DATA.find(p => p.id === projId);
      if (!project) return;

      lastFocusedElement = btn;
      populateModalContent(project);

      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      modal.setAttribute('aria-hidden', 'false');

      // Focus first actionable element inside modal
      const closeBtn = document.getElementById('modal-close-btn');
      if (closeBtn) closeBtn.focus();
    });
  });
}

function populateModalContent(project) {
  const titleEl = document.getElementById('modal-title');
  const indexEl = document.getElementById('modal-index');
  const categoryEl = document.getElementById('modal-category');
  const summaryEl = document.getElementById('modal-summary');
  const problemEl = document.getElementById('modal-problem');
  const solutionEl = document.getElementById('modal-solution');
  const featuresListEl = document.getElementById('modal-features-list');
  const stackBadgesEl = document.getElementById('modal-stack-badges');
  const demoBtn = document.getElementById('modal-demo-btn');
  const repoBtn = document.getElementById('modal-repo-btn');
  const previewBox = document.getElementById('modal-preview-box');

  if (titleEl) titleEl.textContent = project.title;
  if (indexEl) indexEl.textContent = `[PROYEK ${project.index}]`;
  if (categoryEl) categoryEl.textContent = project.categoryLabel;
  if (summaryEl) summaryEl.textContent = project.summary;
  if (problemEl) problemEl.textContent = project.problem;
  if (solutionEl) solutionEl.textContent = project.solution;

  // Features list
  if (featuresListEl) {
    featuresListEl.innerHTML = project.features
      .map(feat => `
        <li class="flex items-start gap-2 text-sm text-slate-700 leading-relaxed font-body">
          <span class="inline-block w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0"></span>
          <span>${feat}</span>
        </li>
      `)
      .join('');
  }

  // Stack badges
  if (stackBadgesEl) {
    stackBadgesEl.innerHTML = project.techStack
      .map(tech => `
        <span class="inline-flex items-center px-2.5 py-1 text-xs font-mono-tech bg-slate-100 text-slate-800 border border-slate-300 font-medium">
          ${tech}
        </span>
      `)
      .join('');
  }

  // Links with standardized placeholder
  if (demoBtn) {
    demoBtn.setAttribute('href', project.demoLink === '[ISI_LINK_DEMO]' ? '#demo-placeholder' : project.demoLink);
    demoBtn.setAttribute('data-placeholder', project.demoLink);
    demoBtn.onclick = (e) => {
      if (project.demoLink === '[ISI_LINK_DEMO]') {
        e.preventDefault();
        alert('Tautan Demo: Menunggu tautan publik aktif dari pemilik proyek. Nilai konfigurasi: [ISI_LINK_DEMO]');
      }
    };
  }

  if (repoBtn) {
    repoBtn.setAttribute('href', project.repoLink === '[ISI_REPO_GITHUB]' ? '#repo-placeholder' : project.repoLink);
    repoBtn.setAttribute('data-placeholder', project.repoLink);
    repoBtn.onclick = (e) => {
      if (project.repoLink === '[ISI_REPO_GITHUB]') {
        e.preventDefault();
        alert('Tautan Repositori: Repositori proyek berada pada repositori private/internal. Nilai konfigurasi: [ISI_REPO_GITHUB]');
      }
    };
  }

  // Modal wireframe preview
  if (previewBox) {
    previewBox.innerHTML = `
      <!-- GANTI DENGAN SCREENSHOT APLIKASI ASLI -->
      <div class="tech-wireframe-canvas w-full flex items-center justify-center p-4 border border-slate-200 bg-slate-50 relative">
        ${getWireframeSchematic(project.previewType, project.title, project.techStack)}
        <div class="absolute bottom-3 left-3 bg-white/95 px-3 py-1 text-xs font-mono-tech text-slate-700 border border-slate-200 shadow-sm flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>Placeholder Screenshot UI (Aspek Rasio 16:10)</span>
        </div>
      </div>
    `;
  }
}

// 3. TECHNICAL WIREFRAME SCHEMATIC GENERATOR (16:10 Ratio, Zero Generic AI Blobs)
function getWireframeSchematic(type, title, stack) {
  // If Face Recognition Attendance System
  if (type === 'attendance-facerec') {
    return `
      <svg class="w-full h-full max-h-56 text-slate-700" viewBox="0 0 640 400" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skema biometrik antarmuka presensi wajah untuk ${title}">
        <!-- Outer App Frame -->
        <rect x="2" y="2" width="636" height="396" rx="4" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
        
        <!-- App Header Bar -->
        <rect x="2" y="2" width="636" height="36" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1"/>
        <circle cx="20" cy="20" r="4" fill="#DC2626"/>
        <circle cx="36" cy="20" r="4" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
        <circle cx="52" cy="20" r="4" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
        <rect x="80" y="12" width="260" height="16" rx="2" fill="#FFFFFF" stroke="#E2E8F0"/>
        <text x="90" y="24" font-family="JetBrains Mono, monospace" font-size="10" fill="#64748B">https://presensi.internal/biometric-scan</text>
        
        <!-- Left Column: Biometric Video Feed Scanner -->
        <rect x="18" y="52" width="250" height="280" fill="#0F172A" rx="2"/>
        <!-- Camera Viewport Box -->
        <rect x="30" y="66" width="226" height="210" fill="#1E293B" stroke="#334155" stroke-width="1"/>
        <!-- Face Detection Bounding Box -->
        <rect x="75" y="95" width="136" height="150" rx="4" fill="none" stroke="#22C55E" stroke-width="2" stroke-dasharray="6 3"/>
        <!-- Crosshairs & Landmarks -->
        <circle cx="143" cy="140" r="3" fill="#22C55E"/>
        <circle cx="120" cy="150" r="2.5" fill="#22C55E"/>
        <circle cx="166" cy="150" r="2.5" fill="#22C55E"/>
        <line x1="130" y1="185" x2="156" y2="185" stroke="#22C55E" stroke-width="2"/>
        <!-- Scanner HUD Text -->
        <rect x="30" y="246" width="226" height="30" fill="rgba(15, 23, 42, 0.85)"/>
        <text x="40" y="265" font-family="JetBrains Mono, monospace" font-size="9" fill="#22C55E">FACE_MATCH: 98.6% | LIVENESS: OK</text>
        <!-- Geofence & Checkin Button -->
        <rect x="30" y="286" width="226" height="34" fill="#DC2626" rx="2"/>
        <text x="65" y="307" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" fill="#FFFFFF">CATAT PRESENSI MASUK</text>
        
        <!-- Right Column: Verification & Activity Log -->
        <rect x="282" y="52" width="342" height="280" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect x="283" y="53" width="340" height="30" fill="#F8FAFC" stroke="#E2E8F0"/>
        <text x="295" y="72" font-family="JetBrains Mono, monospace" font-size="10" font-weight="bold" fill="#0F172A">LOG VERIFIKASI BIOMETRIK HARI INI</text>
        
        <!-- Item 1 -->
        <rect x="295" y="94" width="316" height="50" fill="#F8FAFC" stroke="#E2E8F0"/>
        <text x="305" y="112" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#0F172A">Muhamad Azis Hakiki (DEV-001)</text>
        <text x="305" y="130" font-family="JetBrains Mono, monospace" font-size="8.5" fill="#16A34A">PRESENSI MASUK: 07:54 WIB [VALID]</text>
        <rect x="525" y="105" width="76" height="16" rx="2" fill="#DCFCE7"/>
        <text x="532" y="116" font-family="JetBrains Mono, monospace" font-size="8" fill="#166534">GEO: 12M OK</text>

        <!-- Item 2 -->
        <rect x="295" y="152" width="316" height="50" fill="#F8FAFC" stroke="#E2E8F0"/>
        <text x="305" y="170" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#0F172A">Rian Hidayat (STF-014)</text>
        <text x="305" y="188" font-family="JetBrains Mono, monospace" font-size="8.5" fill="#16A34A">PRESENSI MASUK: 07:58 WIB [VALID]</text>
        <rect x="525" y="163" width="76" height="16" rx="2" fill="#DCFCE7"/>
        <text x="532" y="174" font-family="JetBrains Mono, monospace" font-size="8" fill="#166534">GEO: 18M OK</text>

        <!-- Item 3 -->
        <rect x="295" y="210" width="316" height="50" fill="#F8FAFC" stroke="#E2E8F0"/>
        <text x="305" y="228" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#0F172A">Dewi Lestari (ADM-008)</text>
        <text x="305" y="246" font-family="JetBrains Mono, monospace" font-size="8.5" fill="#16A34A">PRESENSI MASUK: 08:02 WIB [VALID]</text>
        <rect x="525" y="221" width="76" height="16" rx="2" fill="#DCFCE7"/>
        <text x="532" y="232" font-family="JetBrains Mono, monospace" font-size="8" fill="#166534">GEO: 09M OK</text>

        <!-- Bottom Status Bar -->
        <rect x="2" y="342" width="636" height="42" fill="#F8FAFC" stroke="#E2E8F0"/>
        <text x="20" y="367" font-family="JetBrains Mono, monospace" font-size="9" fill="#475569">ENGINE: Laravel 11 + Face Descriptor API | LIVENESS: AKTIF | RADIUS: 50M BOGOR</text>
      </svg>
    `;
  }

  // Standard Technical App Layout for other items
  return `
    <svg class="w-full h-full max-h-56 text-slate-700" viewBox="0 0 640 400" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skema antarmuka teknis untuk ${title}">
      <!-- Outer App Frame -->
      <rect x="2" y="2" width="636" height="396" rx="4" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
      
      <!-- App Header Bar -->
      <rect x="2" y="2" width="636" height="36" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1"/>
      <circle cx="20" cy="20" r="4" fill="#DC2626"/>
      <circle cx="36" cy="20" r="4" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
      <circle cx="52" cy="20" r="4" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
      <rect x="80" y="12" width="220" height="16" rx="2" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="90" y="24" font-family="JetBrains Mono, monospace" font-size="10" fill="#64748B">https://app.internal/${type}</text>
      
      <!-- Sidebar Navigation -->
      <rect x="2" y="38" width="130" height="360" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1"/>
      <rect x="14" y="52" width="102" height="12" rx="2" fill="#0F172A"/>
      <rect x="14" y="76" width="102" height="8" rx="1" fill="#CBD5E1"/>
      <rect x="14" y="94" width="102" height="8" rx="1" fill="#CBD5E1"/>
      <rect x="14" y="112" width="102" height="8" rx="1" fill="#CBD5E1"/>
      <rect x="14" y="130" width="102" height="8" rx="1" fill="#CBD5E1"/>
      <rect x="14" y="160" width="80" height="6" rx="1" fill="#94A3B8"/>
      <rect x="14" y="174" width="102" height="8" rx="1" fill="#CBD5E1"/>
      <rect x="14" y="192" width="102" height="8" rx="1" fill="#CBD5E1"/>
      
      <!-- Main Content Area -->
      <!-- Top Metric / Filter Bar -->
      <rect x="146" y="52" width="478" height="42" fill="#FFFFFF" stroke="#E2E8F0"/>
      <rect x="160" y="64" width="140" height="18" rx="2" fill="#F8FAFC" stroke="#CBD5E1"/>
      <text x="170" y="77" font-family="JetBrains Mono, monospace" font-size="10" fill="#334155">${title}</text>
      <rect x="520" y="64" width="90" height="18" rx="2" fill="#DC2626"/>
      <text x="532" y="77" font-family="JetBrains Mono, monospace" font-size="9" fill="#FFFFFF">AKSI SISTEM</text>

      <!-- Data Table / Panel Structure -->
      <rect x="146" y="106" width="478" height="278" fill="#FFFFFF" stroke="#E2E8F0"/>
      <!-- Table Header -->
      <rect x="147" y="107" width="476" height="28" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="160" y="125" font-family="JetBrains Mono, monospace" font-size="9" font-weight="600" fill="#475569">ID / PARAMETER</text>
      <text x="280" y="125" font-family="JetBrains Mono, monospace" font-size="9" font-weight="600" fill="#475569">STATUS VALIDASI</text>
      <text x="410" y="125" font-family="JetBrains Mono, monospace" font-size="9" font-weight="600" fill="#475569">TIMESTAMP</text>
      <text x="540" y="125" font-family="JetBrains Mono, monospace" font-size="9" font-weight="600" fill="#475569">AKSI</text>

      <!-- Table Row 1 -->
      <line x1="147" y1="165" x2="623" y2="165" stroke="#F1F5F9" stroke-width="1"/>
      <text x="160" y="152" font-family="Inter, sans-serif" font-size="10" font-weight="500" fill="#0F172A">Data Entry #001</text>
      <rect x="280" y="142" width="60" height="15" rx="2" fill="#DCFCE7"/>
      <text x="288" y="153" font-family="JetBrains Mono, monospace" font-size="8" fill="#166534">TERVERIFIKASI</text>
      <text x="410" y="152" font-family="JetBrains Mono, monospace" font-size="9" fill="#64748B">2026-11-18 08:30:12</text>
      <rect x="540" y="142" width="64" height="16" fill="#F1F5F9" stroke="#CBD5E1"/>
      <text x="550" y="153" font-family="JetBrains Mono, monospace" font-size="8" fill="#334155">DETAIL</text>

      <!-- Table Row 2 -->
      <line x1="147" y1="195" x2="623" y2="195" stroke="#F1F5F9" stroke-width="1"/>
      <text x="160" y="182" font-family="Inter, sans-serif" font-size="10" font-weight="500" fill="#0F172A">Data Entry #002</text>
      <rect x="280" y="172" width="60" height="15" rx="2" fill="#E0F2FE"/>
      <text x="294" y="183" font-family="JetBrains Mono, monospace" font-size="8" fill="#0369A1">DIPROSES</text>
      <text x="410" y="182" font-family="JetBrains Mono, monospace" font-size="9" fill="#64748B">2026-11-18 08:32:45</text>
      <rect x="540" y="172" width="64" height="16" fill="#F1F5F9" stroke="#CBD5E1"/>
      <text x="550" y="183" font-family="JetBrains Mono, monospace" font-size="8" fill="#334155">DETAIL</text>

      <!-- Table Row 3 -->
      <line x1="147" y1="225" x2="623" y2="225" stroke="#F1F5F9" stroke-width="1"/>
      <text x="160" y="212" font-family="Inter, sans-serif" font-size="10" font-weight="500" fill="#0F172A">Data Entry #003</text>
      <rect x="280" y="202" width="60" height="15" rx="2" fill="#DCFCE7"/>
      <text x="288" y="213" font-family="JetBrains Mono, monospace" font-size="8" fill="#166534">TERVERIFIKASI</text>
      <text x="410" y="212" font-family="JetBrains Mono, monospace" font-size="9" fill="#64748B">2026-11-18 08:34:01</text>
      <rect x="540" y="202" width="64" height="16" fill="#F1F5F9" stroke="#CBD5E1"/>
      <text x="550" y="213" font-family="JetBrains Mono, monospace" font-size="8" fill="#334155">DETAIL</text>

      <!-- Table Row 4 -->
      <line x1="147" y1="255" x2="623" y2="255" stroke="#F1F5F9" stroke-width="1"/>
      <text x="160" y="242" font-family="Inter, sans-serif" font-size="10" font-weight="500" fill="#0F172A">Data Entry #004</text>
      <rect x="280" y="232" width="60" height="15" rx="2" fill="#FEF3C7"/>
      <text x="290" y="243" font-family="JetBrains Mono, monospace" font-size="8" fill="#92400E">MENUNGGU</text>
      <text x="410" y="242" font-family="JetBrains Mono, monospace" font-size="9" fill="#64748B">2026-11-18 08:41:19</text>
      <rect x="540" y="232" width="64" height="16" fill="#F1F5F9" stroke="#CBD5E1"/>
      <text x="550" y="243" font-family="JetBrains Mono, monospace" font-size="8" fill="#334155">DETAIL</text>

      <!-- Bottom Status Log -->
      <rect x="146" y="352" width="478" height="32" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="160" y="372" font-family="JetBrains Mono, monospace" font-size="9" fill="#64748B">SQL ENGINE: MySQL 8.0 | FRAMEWORK: ${stack[0]} | CONNECTION: POOL_ACTIVE</text>
    </svg>
  `;
}

// 4. MOBILE NAVIGATION
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  function toggleMenu() {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    if (!isExpanded) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

  function closeMenu() {
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  toggleBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// 5. ACTIVE NAV HIGHLIGHT ON SCROLL
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    desktopNavLinks.forEach(link => {
      link.classList.remove('text-red-600', 'font-semibold');
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('text-red-600', 'font-semibold');
      }
    });
  }, { passive: true });
}

// 6. COPY EMAIL HELPER
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyFeedback = document.getElementById('copy-email-feedback');
  const emailText = "mohazizhakiki@gmail.com";

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailText);
      } else {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = emailText;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      if (copyFeedback) {
        copyFeedback.classList.remove('hidden');
        setTimeout(() => {
          copyFeedback.classList.add('hidden');
        }, 3000);
      }
    } catch (err) {
      console.error('Gagal menyalin email:', err);
    }
  });
}

// 7. CONTACT FORM VALIDATION & ACTIONS
function initContactForm() {
  const form = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const waDirectBtn = document.getElementById('wa-direct-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const projectTypeInput = document.getElementById('contact-type');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const projectType = projectTypeInput ? projectTypeInput.value : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      showFormFeedback('Mohon lengkapi nama, email, dan rincian pesan proyek Anda.', 'error');
      return;
    }

    // Direct WhatsApp link formulation
    const encodedText = encodeURIComponent(
      `Halo Muhamad Azis Hakiki,\n\nNama: ${name}\nEmail: ${email}\nTipe Proyek: ${projectType}\nPesan:\n${message}`
    );
    const waUrl = `https://wa.me/6285694997960?text=${encodedText}`;

    showFormFeedback('Data pesan tervalidasi. Mengalihkan ke WhatsApp untuk pengiriman instan...', 'success');

    // Trigger open
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 700);
  });

  function showFormFeedback(msg, type) {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.classList.remove('hidden', 'bg-red-50', 'text-red-700', 'border-red-200', 'bg-emerald-50', 'text-emerald-800', 'border-emerald-200');

    if (type === 'error') {
      formFeedback.classList.add('bg-red-50', 'text-red-700', 'border-red-200');
    } else {
      formFeedback.classList.add('bg-emerald-50', 'text-emerald-800', 'border-emerald-200');
    }
  }
}
