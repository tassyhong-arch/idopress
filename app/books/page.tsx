
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import { useBooksStore } from '../../lib/booksStore';

export default function BooksPage() {
  const { getPublishedBooks } = useBooksStore();
  const allBooks = getPublishedBooks();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('한국어');

  // 다국어 텍스트
  const getTexts = (language: string) => {
    const texts = {
      '한국어': {
        pageTitle: '도서 목록',
        pageSubtitle: '한국 고전문학의 보고를 탐험해보세요',
        searchPlaceholder: '도서명, 작가, 내용으로 검색...',
        filterByPeriod: '시대별',
        filterByAuthor: '작가별',
        allPeriods: '전체 시대',
        allAuthors: '전체 작가',
        resetFilters: '필터 초기화',
        totalBooks: '총',
        booksCount: '권의 도서',
        searchResults: '에 대한 검색 결과',
        languageReading: '언어별 읽기:',
        noResults: '검색 결과가 없습니다',
        noResultsDesc: '다른 검색어나 필터를 시도해보세요',
        viewAllBooks: '전체 도서 보기',
        footerText: '2024 이도. 한국 고전문학을 세계에 전하다.'
      },
      'English': {
        pageTitle: 'Book Collection',
        pageSubtitle: 'Explore the treasury of Korean classical literature',
        searchPlaceholder: 'Search by title, author, or content...',
        filterByPeriod: 'By Period',
        filterByAuthor: 'By Author',
        allPeriods: 'All Periods',
        allAuthors: 'All Authors',
        resetFilters: 'Reset Filters',
        totalBooks: 'Total',
        booksCount: 'books',
        searchResults: 'search results for',
        languageReading: 'Read in:',
        noResults: 'No search results found',
        noResultsDesc: 'Try different keywords or filters',
        viewAllBooks: 'View All Books',
        footerText: '2024 Ido. Bringing Korean classical literature to the world.'
      },
      '日本語': {
        pageTitle: '図書一覧',
        pageSubtitle: '韓国古典文学の宝庫を探検してみてください',
        searchPlaceholder: '書名、作家、内容で検索...',
        filterByPeriod: '時代別',
        filterByAuthor: '作家別',
        allPeriods: '全時代',
        allAuthors: '全作家',
        resetFilters: 'フィルターリセット',
        totalBooks: '合計',
        booksCount: '冊の図書',
        searchResults: 'の検索結果',
        languageReading: '言語別読書：',
        noResults: '検索結果がありません',
        noResultsDesc: '他のキーワードやフィルターをお試しください',
        viewAllBooks: '全図書を見る',
        footerText: '2024 イド。韓国古典文学を世界に伝える。'
      },
      'Español': {
        pageTitle: 'Colección de Libros',
        pageSubtitle: 'Explora el tesoro de la literatura clásica coreana',
        searchPlaceholder: 'Buscar por título, autor o contenido...',
        filterByPeriod: 'Por Período',
        filterByAuthor: 'Por Autor',
        allPeriods: 'Todos los Períodos',
        allAuthors: 'Todos los Autores',
        resetFilters: 'Restablecer Filtros',
        totalBooks: 'Total',
        booksCount: 'libros',
        searchResults: 'resultados de búsqueda para',
        languageReading: 'Leer en:',
        noResults: 'No se encontraron resultados',
        noResultsDesc: 'Prueba con diferentes palabras clave o filtros',
        viewAllBooks: 'Ver Todos los Libros',
        footerText: '2024 Ido. Llevando la literatura clásica coreana al mundo.'
      }
    };
    return texts[language] || texts['한국어'];
  };

  const texts = getTexts(currentLanguage);

  // 검색 필터링된 도서 목록
  const filteredBooks = useMemo(() => {
    return allBooks.filter(book => {
      // 현재 언어에 맞는 제목, 작가, 설명 가져오기
      const title = book.titles?.[currentLanguage] || book.title;
      const author = book.authors?.[currentLanguage] || book.author;
      const description = book.descriptions?.[currentLanguage] || book.description || '';

      const matchesSearch = !searchQuery || 
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPeriod = !selectedPeriod || book.period === selectedPeriod;
      const matchesAuthor = !selectedAuthor || book.author === selectedAuthor;

      return matchesSearch && matchesPeriod && matchesAuthor;
    });
  }, [allBooks, searchQuery, selectedPeriod, selectedAuthor, currentLanguage]);

  // 필터 옵션
  const periods = [...new Set(allBooks.map(book => book.period))];
  const authors = [...new Set(allBooks.map(book => book.author))];

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedPeriod('');
    setSelectedAuthor('');
  };

  const languages = [
    { code: '한국어', flag: '🇰🇷', name: '한국어' },
    { code: 'English', flag: '🇺🇸', name: 'English' },
    { code: '日本語', flag: '🇯🇵', name: '日本語' },
    { code: 'Español', flag: '🇪🇸', name: 'Español' }
  ];

  const getBookColor = (index) => {
    const colors = [
      'from-pink-400 to-rose-500',
      'from-blue-400 to-cyan-500', 
      'from-amber-400 to-orange-500',
      'from-purple-400 to-indigo-500',
      'from-green-400 to-emerald-500',
      'from-red-400 to-pink-500'
    ];
    return colors[index % colors.length];
  };

  const getBookEmoji = (title) => {
    const emojiMap = {
      '춘향전': '🌸',
      '심청전': '🌊', 
      '흥부전': '🏠',
      '홍길동전': '⚔️',
      '구운몽': '☁️',
      '사씨남정기': '💝'
    };
    return emojiMap[title] || '📚';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{texts.pageTitle}</h1>
          <p className="text-xl text-gray-600">{texts.pageSubtitle}</p>
        </div>

        {/* 검색 및 필터 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* 검색바 */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="ri-search-line text-gray-400 text-xl"></i>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={texts.searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <i className="ri-close-line text-gray-400 hover:text-gray-600 text-xl"></i>
              </button>
            )}
          </div>

          {/* 필터 옵션 */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{texts.filterByPeriod}</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{texts.allPeriods}</option>
                {periods.map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{texts.filterByAuthor}</label>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{texts.allAuthors}</option>
                {authors.map(author => (
                  <option key={author} value={author}>{author}</option>
                ))}
              </select>
            </div>

            {(searchQuery || selectedPeriod || selectedAuthor) && (
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors !rounded-button"
                >
                  <i className="ri-refresh-line mr-2"></i>
                  {texts.resetFilters}
                </button>
              </div>
            )}
          </div>

          {/* 검색 결과 요약 */}
          <div className="text-sm text-gray-500">
            {texts.totalBooks} {filteredBooks.length}{texts.booksCount}
            {searchQuery && (
              <span> • "{searchQuery}"{texts.searchResults}</span>
            )}
          </div>
        </div>

        {/* 도서 목록 */}
        {filteredBooks.length > 0 ? (
          <div className="space-y-8">
            {filteredBooks.map((book, index) => {
              // 현재 언어에 맞는 정보 가져오기
              const title = book.titles?.[currentLanguage] || book.title;
              const author = book.authors?.[currentLanguage] || book.author;
              const description = book.descriptions?.[currentLanguage] || book.description;

              return (
                <div key={book.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className={`bg-gradient-to-r ${getBookColor(index)} p-8 text-white`}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-6xl">{getBookEmoji(book.title)}</span>
                      <div>
                        <h2 className="text-3xl font-bold mb-2">{title}</h2>
                        <p className="text-xl opacity-90">{author}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm">
                            {book.period}
                          </span>
                          <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm">
                            {book.rating}
                          </span>
                          <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm">
                            {book.views.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-gray-600 text-lg mb-8">{description}</p>

                    {/* 언어별 읽기 버튼 */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4">{texts.languageReading}</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {languages.map((lang) => (
                          <Link
                            key={lang.code}
                            href={`/read/${book.title === '춘향전' ? 'chunhyang' : book.title === '심청전' ? 'simcheong' : book.title === '흥부전' ? 'heungbu' : book.id}?lang=${encodeURIComponent(lang.code)}`}
                            className={`group bg-gradient-to-r ${getBookColor(index)} text-white p-2 rounded-lg text-center hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg !rounded-button`}
                          >
                            <div className="text-lg mb-1 group-hover:scale-110 transition-transform">
                              {lang.flag}
                            </div>
                            <div className="font-medium text-xs">{lang.name}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">{texts.noResults}</h3>
            <p className="text-gray-500 mb-6">{texts.noResultsDesc}</p>
            <button
              onClick={resetFilters}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors !rounded-button"
            >
              {texts.viewAllBooks}
            </button>
          </div>
        )}

        {/* 푸터 정보 */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            {texts.footerText}
          </p>
        </div>
      </main>
    </div>
  );
}
