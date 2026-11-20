const Footer = () => {
  return (
    <footer
      role="contentinfo"
      className="w-full py-4 px-6 text-center text-xs text-slate-500 dark:text-white/40 border-t border-black/5 dark:border-white/5 mt-auto transition-colors"
    >
      © {new Date().getFullYear()} CarePulse · Clinical Operations & Hospital Management System
    </footer>
  );
};

export default Footer;
