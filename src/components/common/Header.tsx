'use client';

import Link from 'next/link';
import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Story Viewer', href: '/story-viewer', icon: 'PlayIcon' },
    { label: 'Viewers List', href: '/story-viewers-list', icon: 'UsersIcon' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Logo */}
        <Link href="/story-viewer" className="flex items-center gap-2 haptic-feedback">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg">
            <Icon name="CameraIcon" size={20} className="text-white" variant="solid" />
          </div>
          <span className="text-lg font-semibold text-foreground hidden sm:block">
            Stories
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150 haptic-feedback"
            >
              <Icon name={item.icon as any} size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors haptic-feedback"
          aria-label="Toggle menu"
        >
          <Icon 
            name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} 
            size={24} 
            className="text-foreground"
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background animate-slideDown">
          <div className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150 haptic-feedback"
              >
                <Icon name={item.icon as any} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;