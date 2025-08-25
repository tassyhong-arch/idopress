
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface HeaderProps {
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

export default function Header({ currentLanguage = '한국어', onLanguageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const languages = [
    { code: '한국어', flag: '🇰🇷', name: '한국어', shortCode: 'KR' },
    { code: 'English', flag: '🇺🇸', name: 'English', shortCode: 'US' },
    { code: '日本語', flag: '🇯🇵', name: '日本語', shortCode: 'JP' },
    { code: 'Español', flag: '🇪🇸', name: 'Español', shortCode: 'ES' }
  ];

  const handleLanguageChange = (langCode: string) => {
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
  };

  const getNavigationText = (lang: string) => {
    const texts = {
      '한국어': { books: '도서', authors: '작가', community: '커뮤니티', about: '회사소개', admin: '관리자' },
      'English': { books: 'Books', authors: 'Authors', community: 'Community', about: 'About', admin: 'Admin' },
      '日本語': { books: '図書', authors: '作家', community: 'コミュニティ', about: '紹介', admin: '管理者' },  
      'Español': { books: 'Libros', authors: 'Autores', community: 'Comunidad', about: 'Acerca de', admin: 'Admin' }
    };
    return texts[lang] || texts['한국어'];
  };

  // Always render the same initial content to prevent hydration mismatch
  const navText = getNavigationText(isMounted ? currentLanguage : '한국어');

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <img 
                src="https://static.readdy.ai/image/63ba1a01cd161ffba8fdd22870371af3/13d24f89cbd76d525f4c7672a0e1c159.png"
                alt="이도출판 로고"
                className="h-8 w-auto"
              />
            </Link>
            
            <div className="flex items-center gap-1">
              {languages.map((language) => (
                <button
                  key={language.shortCode}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors !rounded-button ${
                    currentLanguage === language.code 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  suppressHydrationWarning={true}
                >
                  {language.shortCode}
                </button>
              ))}
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/books" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              {navText.books}
            </Link>
            <Link href="/authors" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              {navText.authors}
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              {navText.community}
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              {navText.about}
            </Link>
            <Link href="/admin" className="bg-gray-900 text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors !rounded-button">
              {navText.admin}
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl text-gray-700`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col space-y-3">
              <Link href="/books" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                {navText.books}
              </Link>
              <Link href="/authors" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                {navText.authors}
              </Link>
              <Link href="/community" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                {navText.community}
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                {navText.about}
              </Link>
              <Link href="/admin" className="bg-gray-900 text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors !rounded-button inline-block text-center">
                {navText.admin}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
