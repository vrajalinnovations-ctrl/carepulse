/**
 * CarePulse Hospital Operations — Documentation Interactive Controller
 */
document.addEventListener('DOMContentLoaded', () => {
  // Enforce Pure Light Mode Only
  document.documentElement.removeAttribute('data-theme');
  try {
    localStorage.removeItem('carepulse_docs_theme');
  } catch (e) {
    // Ignore storage restriction
  }

  // 1. Mobile Menu Drawer Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');

  if (mobileMenuToggle && mobileNavDrawer) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNavDrawer.classList.toggle('open');
    });

    // Close mobile drawer when clicking a link
    mobileNavDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileNavDrawer.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileNavDrawer.classList.remove('open');
      }
    });
  }

  // 3. Active Nav Link on Scroll
  const navLinks = document.querySelectorAll('.nav-menu-link');
  const scrollSections = [
    { id: 'screens', el: document.getElementById('screens') },
    { id: 'prebuilt-apps', el: document.getElementById('prebuilt-apps') },
    { id: 'core-features', el: document.getElementById('core-features') }
  ];

  const updateActiveNavLink = () => {
    const scrollPos = window.scrollY + 160;

    for (let i = scrollSections.length - 1; i >= 0; i--) {
      const section = scrollSections[i];
      if (section.el && section.el.offsetTop <= scrollPos) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          }
        });
        break;
      }
    }
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // 4. Copy Code to Clipboard
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeId = btn.getAttribute('data-target');
      const codeEl = document.getElementById(codeId);
      if (!codeEl) return;

      const textToCopy = codeEl.innerText.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
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

  // 5. FAQ Accordion Toggle
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      const isOpen = parent.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));
      if (!isOpen) {
        parent.classList.add('open');
      }
    });
  });

  // 6. Specialized Dashboard Cards Redirection
  document.querySelectorAll('.concept-item[data-route]').forEach(card => {
    card.addEventListener('click', (e) => {
      const route = card.getAttribute('data-route') || '/';
      // If opened via local file protocol (file://), open the live Vercel deployment URL
      if (window.location.protocol === 'file:') {
        e.preventDefault();
        window.open('https://carepulse-gamma-murex.vercel.app' + (route === '/' ? '' : route), '_blank');
      }
    });
  });
});
