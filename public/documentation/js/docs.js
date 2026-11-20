/**
 * CarePulse Technical Documentation Controller
 * Handles active scroll-spy, search filtering, mobile drawer toggling, and code copy.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Sidebar Drawer Toggle
  const mobileToggle = document.getElementById('docsMobileToggle');
  const sidebar = document.getElementById('docsSidebar');
  const backdrop = document.getElementById('docsBackdrop');

  const closeSidebar = () => {
    sidebar.classList.remove('open');
    backdrop.classList.remove('active');
  };

  if (mobileToggle && sidebar && backdrop) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      backdrop.classList.toggle('active');
    });

    backdrop.addEventListener('click', closeSidebar);
  }

  // 2. Active Sidebar Link on Scroll (Scroll-Spy)
  const navLinks = document.querySelectorAll('.docs-sidebar-link');
  const sections = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href').replace('#', '');
    return { id, el: document.getElementById(id), link };
  }).filter(item => item.el !== null);

  const updateActiveSidebarLink = () => {
    const scrollPos = window.scrollY + 140;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section.el.offsetTop <= scrollPos) {
        navLinks.forEach(l => l.classList.remove('active'));
        section.link.classList.add('active');
        break;
      }
    }
  };

  window.addEventListener('scroll', updateActiveSidebarLink, { passive: true });
  updateActiveSidebarLink();

  // Close sidebar on link click (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024 && sidebar && backdrop) {
        closeSidebar();
      }
    });
  });

  // 3. Search Filter across Documentation Sidebar & Content
  const searchInput = document.getElementById('docsSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const groups = document.querySelectorAll('.docs-nav-group');

      groups.forEach(group => {
        let hasMatch = false;
        const links = group.querySelectorAll('.docs-sidebar-link');

        links.forEach(link => {
          const text = link.textContent.toLowerCase();
          if (query === '' || text.includes(query)) {
            link.style.display = 'flex';
            hasMatch = true;
          } else {
            link.style.display = 'none';
          }
        });

        group.style.display = hasMatch ? 'block' : 'none';
      });
    });

    // Keyboard shortcut (Ctrl + K or Cmd + K)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    });
  }

  // 4. Code Snippet Copy to Clipboard
  document.querySelectorAll('.doc-copy-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeId = btn.getAttribute('data-target');
      const codeEl = document.getElementById(codeId);
      if (!codeEl) return;

      const text = codeEl.innerText.trim();
      navigator.clipboard.writeText(text).then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check2 text-success"></i> Copied!';
        btn.style.borderColor = '#10b981';
        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.style.borderColor = '';
        }, 2000);
      });
    });
  });
});
