"use client"

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  Info, 
  Award, 
  Image, 
  HelpCircle, 
  ClipboardList 
} from 'lucide-react';

interface EventNavigationProps {
  className?: string;
}

const EventNavigation = ({ className }: EventNavigationProps) => {
  const [activeSection, setActiveSection] = useState<string>('about');
  
  const navItems = [
    { id: 'about', label: 'About', icon: Info },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'prizes', label: 'Prizes', icon: Award },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'registration', label: 'Register', icon: ClipboardList },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Get all sections and determine which one is currently in view
      const sections = navItems.map(item => {
        const element = document.getElementById(item.id);
        if (!element) return { id: item.id, position: 0 };
        return { 
          id: item.id, 
          position: element.offsetTop 
        };
      });
      
      // Find the current active section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section?.position && scrollPosition >= section.position) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      // Manually set active section to improve UX
      setActiveSection(id);
    }
  };

  return (
    <nav className={cn("sticky top-4 z-10", className)}>
      <div className="bg-white shadow-md rounded-lg p-1.5 flex items-center justify-between overflow-x-auto hide-scrollbar">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap text-sm transition-all",
              activeSection === item.id 
                ? "bg-black text-white" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <item.icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default EventNavigation;
