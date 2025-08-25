
'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface EbookReaderProps {
  bookId: string;
  bookTitle: string;
  bookContent: string[];
  multilingualContent: Record<string, string[]>;
  initialLanguage: string;
  onClose: () => void;
}

interface ReadingSettings {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  theme: 'light' | 'dark' | 'sepia';
  pageLayout: 'single' | 'double';
}

interface Bookmark {
  page: number;
  timestamp: Date;
  note?: string;
}

interface Highlight {
  page: number;
  text: string;
  startIndex: number;
  endIndex: number;
  color: string;
  note?: string;
}

export default function EbookReader({
  bookId,
  bookTitle,
  bookContent,
  multilingualContent,
  initialLanguage,
  onClose
}: EbookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isHighlightsOpen, setIsHighlightsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ page: number; text: string }[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [settings, setSettings] = useState<ReadingSettings>({
    fontSize: 16,
    fontFamily: 'serif',
    lineHeight: 1.6,
    theme: 'light',
    pageLayout: 'single'
  });

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [readingStats, setReadingStats] = useState({ totalTime: 0, pagesRead: 0, startTime: Date.now() });

  // Refs for mounting check and cleanup
  const mountedRef = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Safe state update function
  const safeSetState = useCallback((updateFn: () => void) => {
    if (mountedRef.current) {
      updateFn();
    }
  }, []);

  const currentContent = useMemo(() => {
    console.log('EbookReader - Computing content for language:', currentLanguage);

    if (multilingualContent[currentLanguage] && multilingualContent[currentLanguage].length > 0) {
      console.log('EbookReader - Using content for:', currentLanguage);
      return multilingualContent[currentLanguage];
    }

    if (multilingualContent['한국어'] && multilingualContent['한국어'].length > 0) {
      console.log('EbookReader - Using Korean fallback content');
      return multilingualContent['한국어'];
    }

    if (bookContent && bookContent.length > 0) {
      console.log('EbookReader - Using bookContent fallback');
      return bookContent;
    }

    console.log('EbookReader - Using default fallback content');
    return ['이북 콘텐츠를 불러오는 중입니다... 잠시만 기다려주세요.'];
  }, [currentLanguage, multilingualContent, bookContent]);

  // Mount management with proper cleanup
  useEffect(() => {
    mountedRef.current = true;
    setIsMounted(true);
    
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    console.log('EbookReader - Initializing with:', {
      initialLanguage,
      availableLanguages: Object.keys(multilingualContent),
      contentLength: currentContent.length
    });

    safeSetState(() => {
      if (multilingualContent[initialLanguage]) {
        setCurrentLanguage(initialLanguage);
      } else if (multilingualContent['한국어']) {
        setCurrentLanguage('한국어');
      }

      setIsMenuOpen(true);
    });
    
    const timer = setTimeout(() => {
      safeSetState(() => setIsMenuOpen(false));
    }, 3000);

    return () => clearTimeout(timer);
  }, [initialLanguage, multilingualContent, isMounted, safeSetState]);

  const tableOfContents = [
    { title: '제1장 - 춘향과 몽룡의 만남', page: 0 },
    { title: '제2장 - 사랑의 맹세', page: Math.min(1, currentContent.length - 1) },
    { title: '제3장 - 이별의 아픔', page: Math.min(2, currentContent.length - 1) },
  ];

  const availableLanguages = Object.keys(multilingualContent);

  const updateProgress = useCallback(() => {
    if (!mountedRef.current) return;
    
    const progress = ((currentPage + 1) / currentContent.length) * 100;
    
    safeSetState(() => {
      setReadingProgress(progress);

      const currentTime = Date.now();
      const timeSpent = currentTime - readingStats.startTime;

      setReadingStats(prev => ({ 
        totalTime: prev.totalTime + timeSpent, 
        pagesRead: Math.max(prev.pagesRead, currentPage + 1), 
        startTime: currentTime 
      }));
    });
  }, [currentPage, currentContent.length, readingStats.startTime, safeSetState]);

  useEffect(() => {
    if (isMounted) {
      updateProgress();
    }
  }, [currentPage, updateProgress, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    if (multilingualContent[currentLanguage]) {
      const newContentLength = multilingualContent[currentLanguage]?.length || 0;
      if (currentPage >= newContentLength && newContentLength > 0) {
        safeSetState(() => setCurrentPage(Math.max(0, newContentLength - 1)));
      }
    }
  }, [currentLanguage, currentPage, multilingualContent, isMounted, safeSetState]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    if (Math.abs(diffY) > Math.abs(diffX)) return;

    if (Math.abs(diffX) < 50) return;

    if (diffX > 0) {
      nextPage();
    } else {
      prevPage();
    }
  };

  const nextPage = () => {
    if (currentPage < currentContent.length - 1) {
      safeSetState(() => setCurrentPage(currentPage + 1));
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      safeSetState(() => setCurrentPage(currentPage - 1));
    }
  };

  const toggleBookmark = () => {
    const existingBookmark = bookmarks.find(b => b.page === currentPage);
    safeSetState(() => {
      if (existingBookmark) {
        setBookmarks(bookmarks.filter(b => b.page !== currentPage));
      } else {
        setBookmarks([...bookmarks, { page: currentPage, timestamp: new Date() }]);
      }
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results: { page: number; text: string }[] = [];
    currentContent.forEach((content, index) => {
      const lowerContent = content.toLowerCase();
      const lowerQuery = query.toLowerCase();
      if (lowerContent.includes(lowerQuery)) {
        const startIndex = lowerContent.indexOf(lowerQuery);
        const contextStart = Math.max(0, startIndex - 50);
        const contextEnd = Math.min(content.length, startIndex + query.length + 50);
        const context = content.substring(contextStart, contextEnd);
        results.push({ page: index, text: context });
      }
    });
    setSearchResults(results);
  };

  const changeLanguage = (language: string) => {
    if (!mountedRef.current) return;
    
    console.log('EbookReader - Changing language to:', language);

    if (multilingualContent[language]) {
      safeSetState(() => {
        setCurrentLanguage(language);
        setIsLanguageOpen(false);

        const newContentLength = multilingualContent[language].length;
        if (currentPage >= newContentLength) {
          const newPage = Math.max(0, newContentLength - 1);
          setCurrentPage(newPage);
        }
      });

      console.log('EbookReader - Language changed successfully');
    } else {
      console.error('EbookReader - Language not available:', language);
    }
  };

  const getThemeStyles = () => {
    switch (settings.theme) {
      case 'dark':
        return {
          background: '#1a1a1a',
          color: '#e5e5e5',
          menuBg: '#2d2d2d'
        };
      case 'sepia':
        return {
          background: '#f7f3e9',
          color: '#5c4b37',
          menuBg: '#f0ead6'
        };
      default:
        return {
          background: '#ffffff',
          color: '#333333',
          menuBg: '#f8f9fa'
        };
    }
  };

  const themeStyles = getThemeStyles();

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}시간 ${minutes % 60}분`;
    }
    return `${minutes}분`;
  };

  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50" style={{ backgroundColor: themeStyles.background }}>
      {/* 상단 메뉴바 */}
      <div
        className={`fixed top-0 w-full h-16 flex items-center justify-between px-4 z-50 transition-transform duration-300 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ backgroundColor: themeStyles.menuBg, color: themeStyles.color }}
      >
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-black/10">
          <i className="ri-arrow-left-line text-xl"></i>
        </button>

        <div className="flex-1 text-center">
          <h1 className="font-medium text-sm truncate">{bookTitle}</h1>
          <div className="text-xs opacity-70">{currentPage + 1} / {currentContent.length} · {currentLanguage}</div>
        </div>

        <button
          onClick={toggleBookmark}
          className={`p-2 rounded-lg hover:bg-black/10 ${
            bookmarks.some(b => b.page === currentPage) ? 'text-[#d69e2e]' : ''
          }`}
        >
          <i className="ri-bookmark-line text-xl"></i>
        </button>
      </div>

      {/* 진행률 바 */}
      <div
        className={`fixed top-16 w-full h-1 bg-black/10 transition-transform duration-300 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div
          className="h-full bg-[#d69e2e] transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div
        className="h-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => safeSetState(() => setIsMenuOpen(!isMenuOpen))}
      >
        <div
          ref={contentRef}
          className="h-full px-6 py-8 pt-24 pb-24 overflow-y-auto"
          style={{
            color: themeStyles.color,
            fontSize: `${settings.fontSize}px`,
            fontFamily:
              settings.fontFamily === 'serif'
                ? 'Georgia, serif'
                : settings.fontFamily === 'sans'
                ? 'system-ui, sans-serif'
                : 'ui-monospace, monospace',
            lineHeight: settings.lineHeight
          }}
        >
          <div className="max-w-2xl mx-auto">
            {currentContent[currentPage] && (
              <div className="leading-relaxed whitespace-pre-line">{currentContent[currentPage]}</div>
            )}
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div
        className={`fixed bottom-0 w-full h-20 flex items-center justify-between px-6 transition-transform duration-300 ${
          isMenuOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ backgroundColor: themeStyles.menuBg, color: themeStyles.color }}
      >
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`p-3 rounded-full ${currentPage === 0 ? 'opacity-30' : 'hover:bg-black/10'}`}
        >
          <i className="ri-arrow-left-s-line text-2xl"></i>
        </button>

        <div className="flex items-center gap-4">
          <button onClick={() => safeSetState(() => setIsTocOpen(true))} className="p-3 rounded-full hover:bg-black/10">
            <i className="ri-list-check text-xl"></i>
          </button>

          <button onClick={() => safeSetState(() => setIsLanguageOpen(true))} className="p-3 rounded-full hover:bg-black/10">
            <i className="ri-global-line text-xl"></i>
          </button>

          <button onClick={() => safeSetState(() => setIsSearchOpen(true))} className="p-3 rounded-full hover:bg-black/10">
            <i className="ri-search-line text-xl"></i>
          </button>

          <button onClick={() => safeSetState(() => setIsBookmarksOpen(true))} className="p-3 rounded-full hover:bg-black/10">
            <i className="ri-bookmark-line text-xl"></i>
          </button>

          <button onClick={() => safeSetState(() => setIsSettingsOpen(true))} className="p-3 rounded-full hover:bg-black/10">
            <i className="ri-settings-3-line text-xl"></i>
          </button>
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === currentContent.length - 1}
          className={`p-3 rounded-full ${currentPage === currentContent.length - 1 ? 'opacity-30' : 'hover:bg-black/10'}`}
        >
          <i className="ri-arrow-right-s-line text-2xl"></i>
        </button>
      </div>

      {/* 언어 선택 모달 */}
      {isLanguageOpen && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{ backgroundColor: themeStyles.menuBg }}>
            <div className="p-4 border-b border-black/10 flex items-center justify-between">
              <h3 className="font-bold text-lg" style={{ color: themeStyles.color }}>
                언어 선택
              </h3>
              <button onClick={() => safeSetState(() => setIsLanguageOpen(false))} className="p-2 rounded-lg hover:bg-black/10">
                <i className="ri-close-line text-xl" style={{ color: themeStyles.color }}></i>
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {availableLanguages.map((language) => (
                  <button
                    key={language}
                    onClick={() => changeLanguage(language)}
                    className={`w-full p-4 text-left rounded-lg transition-colors ${
                      currentLanguage === language
                        ? 'bg-[#d69e2e]/10 border-2 border-[#d69e2e]'
                        : 'hover:bg-black/5 border-2 border-transparent'
                    }`}
                    style={{ color: themeStyles.color }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{language}</span>
                      {currentLanguage === language && (
                        <i className="ri-check-line text-[#d69e2e] text-xl"></i>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 목차 모달 */}
      {isTocOpen && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="w-full max-w-md max-h-96 rounded-2xl overflow-hidden" style={{ backgroundColor: themeStyles.menuBg }}>
            <div className="p-4 border-b border-black/10 flex items-center justify-between">
              <h3 className="font-bold text-lg" style={{ color: themeStyles.color }}>
                목차
              </h3>
              <button onClick={() => safeSetState(() => setIsTocOpen(false))} className="p-2 rounded-lg hover:bg-black/10">
                <i className="ri-close-line text-xl" style={{ color: themeStyles.color }}></i>
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {tableOfContents.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    safeSetState(() => {
                      setCurrentPage(item.page);
                      setIsTocOpen(false);
                    });
                  }}
                  className="w-full p-4 text-left hover:bg-black/5 border-b border-black/5 last:border-0"
                  style={{ color: themeStyles.color }}
                >
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm opacity-70">페이지 {item.page + 1}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 검색 모달 */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="w-full max-w-md max-h-96 rounded-2xl overflow-hidden" style={{ backgroundColor: themeStyles.menuBg }}>
            <div className="p-4 border-b border-black/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg" style={{ color: themeStyles.color }}>
                  검색
                </h3>
                <button onClick={() => safeSetState(() => setIsSearchOpen(false))} className="p-2 rounded-lg hover:bg-black/10">
                  <i className="ri-close-line text-xl" style={{ color: themeStyles.color }}></i>
                </button>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="텍스트를 검색하세요..."
                className="w-full p-3 rounded-lg border border-black/20 focus:ring-2 focus:ring-[#d69e2e] focus:border-transparent"
                style={{ backgroundColor: themeStyles.background, color: themeStyles.color }}
                autoFocus
              />
            </div>
            <div className="max-h-80 overflow-y-auto">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => {
                    safeSetState(() => {
                      setCurrentPage(result.page);
                      setIsSearchOpen(false);
                    });
                  }}
                  className="w-full p-4 text-left hover:bg-black/5 border-b border-black/5 last:border-0"
                  style={{ color: themeStyles.color }}
                >
                  <div className="text-sm opacity-70 mb-1">페이지 {result.page + 1}</div>
                  <div className="text-sm">{result.text}</div>
                </button>
              ))}
              {searchQuery && searchResults.length === 0 && (
                <div className="p-4 text-center opacity-70" style={{ color: themeStyles.color }}>
                  검색 결과가 없습니다
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 북마크 모달 */}
      {isBookmarksOpen && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="w-full max-w-md max-h-96 rounded-2xl overflow-hidden" style={{ backgroundColor: themeStyles.menuBg }}>
            <div className="p-4 border-b border-black/10 flex items-center justify-between">
              <h3 className="font-bold text-lg" style={{ color: themeStyles.color }}>
                북마크
              </h3>
              <button onClick={() => safeSetState(() => setIsBookmarksOpen(false))} className="p-2 rounded-lg hover:bg-black/10">
                <i className="ri-close-line text-xl" style={{ color: themeStyles.color }}></i>
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {bookmarks.map((bookmark, index) => (
                <button
                  key={index}
                  onClick={() => {
                    safeSetState(() => {
                      setCurrentPage(bookmark.page);
                      setIsBookmarksOpen(false);
                    });
                  }}
                  className="w-full p-4 text-left hover:bg-black/5 border-b border-black/5 last:border-0 flex items-center justify-between"
                  style={{ color: themeStyles.color }}
                >
                  <div>
                    <div className="font-medium">페이지 {bookmark.page + 1}</div>
                    <div className="text-sm opacity-70" suppressHydrationWarning={true}>
                      {bookmark.timestamp.toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      safeSetState(() => setBookmarks(bookmarks.filter((_, i) => i !== index)));
                    }}
                    className="p-1 rounded hover:bg-red-100 text-red-500"
                  >
                    <i className="ri-delete-bin-7-line text-sm"></i>
                  </button>
                </button>
              ))}
              {bookmarks.length === 0 && (
                <div className="p-4 text-center opacity-70" style={{ color: themeStyles.color }}>
                  저장된 북마크가 없습니다
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 설정 모달 */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="w-full max-w-md max-h-[80vh] rounded-2xl overflow-hidden" style={{ backgroundColor: themeStyles.menuBg }}>
            <div className="p-4 border-b border-black/10 flex items-center justify-between">
              <h3 className="font-bold text-lg" style={{ color: themeStyles.color }}>
                읽기 설정
              </h3>
              <button onClick={() => safeSetState(() => setIsSettingsOpen(false))} className="p-2 rounded-lg hover:bg-black/10">
                <i className="ri-close-line text-xl" style={{ color: themeStyles.color }}></i>
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 space-y-6">
              {/* 폰트 크기 */}
              <div>
                <label className="block font-medium mb-2" style={{ color: themeStyles.color }}>
                  폰트 크기: {settings.fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={settings.fontSize}
                  onChange={(e) => safeSetState(() => setSettings({ ...settings, fontSize: Number(e.target.value) }))}
                  className="w-full accent-[#d69e2e]"
                />
                <div className="flex justify-between text-xs opacity-70" style={{ color: themeStyles.color }}>
                  <span>작게</span>
                  <span>크게</span>
                </div>
              </div>

              {/* 줄 간격 */}
              <div>
                <label className="block font-medium mb-2" style={{ color: themeStyles.color }}>
                  줄 간격: {settings.lineHeight}
                </label>
                <input
                  type="range"
                  min="1.2"
                  max="2.0"
                  step="0.1"
                  value={settings.lineHeight}
                  onChange={(e) => safeSetState(() => setSettings({ ...settings, lineHeight: Number(e.target.value) }))}
                  className="w-full accent-[#d69e2e]"
                />
                <div className="flex justify-between text-xs opacity-70" style={{ color: themeStyles.color }}>
                  <span>좁게</span>
                  <span>넓게</span>
                </div>
              </div>

              {/* 폰트 패밀리 */}
              <div>
                <label className="block font-medium mb-2" style={{ color: themeStyles.color }}>
                  폰트
                </label>
                <div className="flex gap-2">
                  {[
                    { key: 'serif', label: '세리프', style: 'Georgia' },
                    { key: 'sans', label: '산스', style: 'system-ui' },
                    { key: 'mono', label: '모노', style: 'ui-monospace' }
                  ].map((font) => (
                    <button
                      key={font.key}
                      onClick={() => safeSetState(() => setSettings({ ...settings, fontFamily: font.key }))}
                      className={`flex-1 p-2 rounded-lg border text-sm ${
                        settings.fontFamily === font.key ? 'border-[#d69e2e] bg-[#d69e2e]/10' : 'border-black/20 hover:bg-black/5'
                      }`}
                      style={{
                        color: themeStyles.color,
                        fontFamily: font.style
                      }}
                    >
                      {font.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 테마 */}
              <div>
                <label className="block font-medium mb-2" style={{ color: themeStyles.color }}>
                  테마
                </label>
                <div className="flex gap-2">
                  {[
                    { key: 'light', label: '밝게', bg: '#ffffff', color: '#333333' },
                    { key: 'dark', label: '어둡게', bg: '#1a1a1a', color: '#e5e5e5' },
                    { key: 'sepia', label: '세피아', bg: '#f7f3e9', color: '#5c4b37' }
                  ].map((theme) => (
                    <button
                      key={theme.key}
                      onClick={() => safeSetState(() => setSettings({ ...settings, theme: theme.key as 'light' | 'dark' | 'sepia' }))}
                      className={`flex-1 p-3 rounded-lg text-sm font-medium border-2 ${
                        settings.theme === theme.key ? 'border-[#d69e2e]' : 'border-transparent'
                      }`}
                      style={{
                        backgroundColor: theme.bg,
                        color: theme.color
                      }}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 읽기 통계 */}
              <div className="border-t border-black/10 pt-4">
                <h4 className="font-medium mb-3" style={{ color: themeStyles.color }}>
                  읽기 통계
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 rounded-lg bg-black/5">
                    <div className="font-bold text-lg text-[#d69e2e]">{Math.round(readingProgress)}%</div>
                    <div className="opacity-70" style={{ color: themeStyles.color }}>
                      진행률
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-black/5">
                    <div className="font-bold text-lg text-[#d69e2e]">{readingStats.pagesRead}</div>
                    <div className="opacity-70" style={{ color: themeStyles.color }}>
                      읽은 페이지
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-black/5">
                    <div className="font-bold text-lg text-[#d69e2e]">{formatTime(readingStats.totalTime)}</div>
                    <div className="opacity-70" style={{ color: themeStyles.color }}>
                      총 읽기 시간
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-black/5">
                    <div className="font-bold text-lg text-[#d69e2e]">{bookmarks.length}</div>
                    <div className="opacity-70" style={{ color: themeStyles.color }}>
                      북마크
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
