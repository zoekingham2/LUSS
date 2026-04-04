import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogIn, Menu, X, ChevronDown } from "lucide-react";

const NAV_ITEMS = [
  {
    label: "LEEDS SVERIGE",
    children: [
      {
        heading: "MEDLEMSKAP",
        links: [
          { label: "Om Leeds Sverige", path: "/om-oss" },
          { label: "Bli Medlem", path: "/bli-medlem" },
        ],
      },
      {
        heading: "OM FÖRENINGEN",
        links: [
          { label: "Styrelsen", path: "/styrelsen" },
          { label: "Historia", path: "/historia" },
          { label: "FAQ", path: "/faq" },
          { label: "Kontakta Oss", path: "/kontakt" },
        ],
      },
      {
        heading: "MEDIA",
        links: [
          { label: "Bilder", path: "/bilder" },
          { label: "LUSS-Podd", path: "/podd" },
        ],
      },
      {
        heading: "MATCHTRÄFFAR",
        links: [
          { label: "Matchträffar", path: "/matchtraffar" },
        ],
      },
    ],
  },
  {
    label: "LEEDS FC",
    children: [
      {
        heading: "LAGET",
        links: [
          { label: "Spelschema", path: "/matchschema" },
          { label: "Spelartrupp", path: "/spelartrupp" },
        ],
      },
      {
        heading: "STATISTIK",
        links: [
          { label: "Tabellen", path: "/tabell" },
          { label: "Matchstatistik", path: "/statistik" },
        ],
      },
    ],
  },
  {
    label: "NYHETER",
    path: "/nyheter",
    children: [
      {
        heading: "NYHETER",
        links: [
          { label: "Artikelarkiv", path: "/nyheter" },
        ],
      },
      {
        heading: "DISKUSSION",
        links: [
          { label: "Forum", path: "/forum" },
          { label: "Forumregler", path: "/forum" },
        ],
      },
    ],
  },
];

function DropdownMenu({ item, onClose }) {
  return (
    <div className="absolute top-full left-0 z-50 bg-white border-t-2 border-leeds-gold shadow-xl min-w-[640px]">
      <div className="flex gap-8 px-6 py-5">
        {item.children.map((group) => (
          <div key={group.heading} className="min-w-[140px]">
            <div className="inline-block bg-leeds-navy px-3 py-1 mb-3">
              <span className="font-archivo text-leeds-gold text-[11px] tracking-[0.1em]">
                {group.heading}
              </span>
            </div>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className="font-inter text-[13px] font-semibold text-leeds-navy tracking-wide hover:text-leeds-gold uppercase block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header ref={navRef} className="bg-leeds-navy sticky top-1 z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mr-8 flex-shrink-0">
            <img
              src="https://media.base44.com/images/public/user_69d18244733d4a057f86fdd2/b6d5a3225_image.png"
              alt="LUSS"
              className="h-10 w-10 rounded-full"
            />
            <span className="font-archivo text-leeds-gold text-xl tracking-tight hidden sm:block">
              LEEDS SVERIGE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center flex-1">
            {NAV_ITEMS.map((item) => {
              const isOpen = activeMenu === item.label;
              return (
                <div key={item.label} className="relative">
                  <button
                    onMouseEnter={() => setActiveMenu(item.label)}
                    onMouseLeave={() => setActiveMenu(null)}
                    onClick={() => setActiveMenu(isOpen ? null : item.label)}
                    className={`flex items-center gap-1 px-4 h-16 font-inter text-[13px] font-bold tracking-widest transition-colors ${
                      isOpen ? "text-leeds-gold bg-white/5" : "text-white hover:text-leeds-gold"
                    }`}
                  >
                    {item.label}
                  </button>
                  {isOpen && (
                    <div
                      onMouseEnter={() => setActiveMenu(item.label)}
                      onMouseLeave={() => setActiveMenu(null)}
                    >
                      <DropdownMenu item={item} onClose={() => setActiveMenu(null)} />
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Login */}
          <div className="ml-auto flex items-center gap-4">
            <Link
              to="/profil"
              className="flex items-center gap-2 text-white hover:text-leeds-gold transition-colors"
            >
              <LogIn size={20} />
              <span className="hidden sm:block font-inter text-[13px] font-semibold tracking-wider">
                LOGGA IN
              </span>
            </Link>
            {/* Mobile toggle */}
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-leeds-navy border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            <Link to="/" className="block py-2 text-white font-inter text-sm font-semibold tracking-wider hover:text-leeds-gold">HEM</Link>
            <Link to="/nyheter" className="block py-2 text-white font-inter text-sm font-semibold tracking-wider hover:text-leeds-gold">NYHETER</Link>
            <Link to="/matchschema" className="block py-2 text-white font-inter text-sm font-semibold tracking-wider hover:text-leeds-gold">MATCHSCHEMA</Link>
            <Link to="/forum" className="block py-2 text-white font-inter text-sm font-semibold tracking-wider hover:text-leeds-gold">FORUM</Link>
            <Link to="/bli-medlem" className="block py-2 text-white font-inter text-sm font-semibold tracking-wider hover:text-leeds-gold">BLI MEDLEM</Link>
          </div>
        </div>
      )}
    </header>
  );
}
