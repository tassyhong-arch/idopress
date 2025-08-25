
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useBooksStore } from '../../lib/booksStore';

export default function AdminPage() {
  const { books, addBook, updateBook, deleteBooks } = useBooksStore();
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'books' | 'stats' | 'users'>('books');

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    period: '',
    category: '고전소설',
    pages: 100,
    languages: ['한국어'],
    status: 'published' as 'published' | 'draft' | 'archived',
    description: '',
    titles: {
      한국어: '',
      English: '',
      日本語: '',
      Español: ''
    },
    authors: {
      한국어: '',
      English: '',
      日本語: '',
      Español: ''
    },
    descriptions: {
      한국어: '',
      English: '',
      日本語: '',
      Español: ''
    },
    ebookContent: {
      한국어: ['', '', '', ''],
      English: ['', '', '', ''],
      日本語: ['', '', '', ''],
      Español: ['', '', '', '']
    }
  });

  const handleSelectBook = (bookId: number) => {
    setSelectedBooks(prev =>
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleSelectAll = () => {
    setSelectedBooks(selectedBooks.length === books.length ? [] : books.map(b => b.id));
  };

  const handleDeleteSelected = () => {
    if (selectedBooks.length > 0 && confirm(`${selectedBooks.length}개의 도서를 삭제하시겠습니까?`)) {
      deleteBooks(selectedBooks);
      setSelectedBooks([]);
    }
  };

  const handleAddBook = () => {
    if (newBook.title && newBook.author) {
      const finalTitles = {
        한국어: newBook.titles.한국어 || newBook.title,
        English: newBook.titles.English || newBook.title,
        日本語: newBook.titles.日本語 || newBook.title,
        Español: newBook.titles.Español || newBook.title
      };

      const finalAuthors = {
        한국어: newBook.authors.한국어 || newBook.author,
        English: newBook.authors.English || newBook.author,
        日本語: newBook.authors.日本語 || newBook.author,
        Español: newBook.authors.Español || newBook.author
      };

      const finalDescriptions = {
        한국어: newBook.descriptions.한국어 || newBook.description,
        English: newBook.descriptions.English || newBook.description,
        日本語: newBook.descriptions.日本語 || newBook.description,
        Español: newBook.descriptions.Español || newBook.description
      };

      addBook({
        ...newBook,
        titles: finalTitles,
        authors: finalAuthors,
        descriptions: finalDescriptions,
        ebookContent: newBook.ebookContent,
        rating: 0,
        reviews: 0,
        views: 0,
        createdAt: new Date().toISOString().split('T')[0].replace(/-/g, '.')
      });

      setNewBook({
        title: '',
        author: '',
        period: '',
        category: '고전소설',
        pages: 100,
        languages: ['한국어'],
        status: 'published',
        description: '',
        titles: {
          한국어: '',
          English: '',
          日本語: '',
          Español: ''
        },
        authors: {
          한국어: '',
          English: '',
          日本語: '',
          Español: ''
        },
        descriptions: {
          한국어: '',
          English: '',
          日本語: '',
          Español: ''
        },
        ebookContent: {
          한국어: ['', '', '', ''],
          English: ['', '', '', ''],
          日本語: ['', '', '', ''],
          Español: ['', '', '', '']
        }
      });
      setIsAddingBook(false);
    }
  };

  const handleStatusChange = (bookId: number, status: 'published' | 'draft' | 'archived') => {
    updateBook(bookId, { status });
  };

  const handleEditBook = (book: any) => {
    const safeEbookContent = {
      한국어: (book.ebookContent?.한국어 || []).length > 0 ? book.ebookContent.한국어 : ['', '', '', ''],
      English: (book.ebookContent?.English || []).length > 0 ? book.ebookContent.English : ['', '', '', ''],
      日本語: (book.ebookContent?.日本語 || []).length > 0 ? book.ebookContent.日本語 : ['', '', '', ''],
      Español: (book.ebookContent?.Español || []).length > 0 ? book.ebookContent.Español : ['', '', '', '']
    };

    setEditingBook({
      ...book,
      titles: book.titles || {
        한국어: book.title || '',
        English: '',
        日本語: '',
        Español: ''
      },
      authors: book.authors || {
        한국어: book.author || '',
        English: '',
        日本語: '',
        Español: ''
      },
      descriptions: book.descriptions || {
        한국어: book.description || '',
        English: '',
        日本語: '',
        Español: ''
      },
      ebookContent: safeEbookContent
    });
  };

  const handleUpdateBook = () => {
    if (editingBook && editingBook.title && editingBook.author) {
      const finalTitles = {
        한국어: editingBook.titles.한국어 || editingBook.title,
        English: editingBook.titles.English || editingBook.title,
        日本語: editingBook.titles.日本語 || editingBook.title,
        Español: editingBook.titles.Español || editingBook.title
      };

      const finalAuthors = {
        한국어: editingBook.authors.한국어 || editingBook.author,
        English: editingBook.authors.English || editingBook.author,
        日本語: editingBook.authors.日本語 || editingBook.author,
        Español: editingBook.authors.Español || editingBook.author
      };

      const finalDescriptions = {
        한국어: editingBook.descriptions.한국어 || editingBook.description,
        English: editingBook.descriptions.English || editingBook.description,
        日本語: editingBook.descriptions.日本語 || editingBook.description,
        Español: editingBook.descriptions.Español || editingBook.description
      };

      updateBook(editingBook.id, {
        ...editingBook,
        titles: finalTitles,
        authors: finalAuthors,
        descriptions: finalDescriptions,
        ebookContent: editingBook.ebookContent
      });

      setEditingBook(null);
    }
  };

  const stats = {
    totalBooks: books.length,
    publishedBooks: books.filter(b => b.status === 'published').length,
    draftBooks: books.filter(b => b.status === 'draft').length,
    archivedBooks: books.filter(b => b.status === 'archived').length,
    totalViews: books.reduce((sum, book) => sum + book.views, 0),
    avgRating: books.length > 0 ? (books.reduce((sum, book) => sum + book.rating, 0) / books.length).toFixed(1) : '0'
  };

  const handleDeleteBook = (bookId: number) => {
    if (confirm('이 도서를 삭제하시겠습니까?')) {
      deleteBooks([bookId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="font-[\\\'Pacifico\\\'] text-2xl text-gray-900">
                이도
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-bold text-gray-900">관리자 대시보드</h1>
            </div>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <i className="ri-home-line"></i>
              홈으로
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('books')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'books'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                도서 관리
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'stats'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                통계
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                사용자
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'books' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {selectedBooks.length === books.length ? '전체 해제' : '전체 선택'}
                </button>
                {selectedBooks.length > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 !rounded-button"
                  >
                    선택 삭제 ({selectedBooks.length})
                  </button>
                )}
              </div>
              <button
                onClick={() => setIsAddingBook(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 !rounded-button"
              >
                <i className="ri-add-line"></i>
                도서 추가
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="w-12 px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedBooks.length === books.length && books.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        도서 정보
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        상태
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        통계
                      </th>
                      <th className="w-48 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {books.map((book) => (
                      <tr key={book.id} className={`hover:bg-gray-50 ${selectedBooks.includes(book.id) ? 'bg-blue-50' : ''}`}>
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={selectedBooks.includes(book.id)}
                            onChange={() => handleSelectBook(book.id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 h-16 w-12">
                              <img
                                className="h-16 w-12 object-cover rounded shadow-sm"
                                src={book.imageUrl || `https://readdy.ai/api/search-image?query=Korean%20classical%20literature%20book%20cover%20${book.title}%20traditional%20elegant%20design%20isolated%20on%20white%20background&width=300&height=400&seq=${book.id}&orientation=portrait`}
                                alt={book.title}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjUgMTUwSDE3NVYyNTBIMTI1VjE1MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                                }}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {book.title}
                              </div>
                              <div className="text-sm text-gray-500 truncate">
                                {book.author} · {book.period}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                {book.category} · {book.pages}페이지
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <select
                            value={book.status}
                            onChange={(e) => updateBook(book.id, { status: e.target.value as any })}
                            className={`text-xs font-medium px-2 py-1 rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${book.status === 'published' ? 'bg-green-100 text-green-800' : book.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
                          >
                            <option value="draft">초안</option>
                            <option value="published">출간</option>
                            <option value="archived">보관</option>
                          </select>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">
                            조회 {book.views.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            ⭐ {book.rating} ({book.reviews}개)
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleEditBook(book)}
                              className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 !rounded-button"
                              title="도서 편집"
                            >
                              <i className="ri-edit-line mr-1"></i>
                             編集
                            </button>
                            <button
                              onClick={() => handleDeleteBook(book.id)}
                              className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 !rounded-button"
                              title="도서 삭제"
                            >
                              <i className="ri-delete-bin-line mr-1"></i>
                              삭제
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {books.length === 0 && (
                <div className="text-center py-12">
                  <i className="ri-book-line text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">등록된 도서가 없습니다</h3>
                  <p className="text-gray-500 mb-4">첫 번째 도서를 추가해보세요.</p>
                  <button
                    onClick={() => setIsAddingBook(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 !rounded-button"
                  >
                    도서 추가
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <i className="ri-book-line text-2xl text-blue-600"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">총 도서</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalBooks}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <i className="ri-eye-line text-2xl text-green-600"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">총 조회수</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <i className="ri-star-line text-2xl text-yellow-600"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">평균 평점</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.avgRating}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <i className="ri-check-line text-2xl text-purple-600"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">출간 도서</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.publishedBooks}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">도서 상태별 분포</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">출간됨</span>
                    <span className="font-medium">{stats.publishedBooks}권</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">초안</span>
                    <span className="font-medium">{stats.draftBooks}권</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">보관됨</span>
                    <span className="font-medium">{stats.archivedBooks}권</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">인기 도서 Top 5</h3>
                <div className="space-y-3">
                  {books
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((book, index) => (
                      <div key={book.id} className="flex justify-between">
                        <span className="text-gray-600">
                          {index + 1}. {book.title}
                        </span>
                        <span className="font-medium">{book.views.toLocaleString()}회</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">사용자 관리</h3>
            <p className="text-gray-600">사용자 관리 기능은 향후 업데이트 예정입니다.</p>
          </div>
        )}
      </div>

      {isAddingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">새 도서 추가</h3>
              <button
                onClick={() => setIsAddingBook(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <i className="ri-close-line text-xl text-gray-500"></i>
              </button>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">기본 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">제목 (기본)</label>
                    <input
                      type="text"
                      value={newBook.title}
                      onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="도서 제목을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">작가 (기본)</label>
                    <input
                      type="text"
                      value={newBook.author}
                      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="작가명을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">시대</label>
                    <input
                      type="text"
                      value={newBook.period}
                      onChange={(e) => setNewBook({ ...newBook, period: e.target.value })}
                      placeholder="예: 조선후기"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">페이지 수</label>
                    <input
                      type="number"
                      value={newBook.pages}
                      onChange={(e) => setNewBook({ ...newBook, pages: Number(e.target.value) })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">설명 (기본)</label>
                    <textarea
                      value={newBook.description}
                      onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="도서 설명을 입력하세요"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">다국어 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700 flex items-center gap-2">
                      한국어
                    </h5>
                    <input
                      type="text"
                      value={newBook.titles.한국어 || ''}
                      onChange={(e) =>
                        setNewBook({
                          ...newBook,
                          titles: { ...newBook.titles, 한국어: e.target.value }
                        })
                      }
                      placeholder="한국어 제목"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={newBook.authors.한국어 || ''}
                      onChange={(e) =>
                        setNewBook({
                          ...newBook,
                          authors: { ...newBook.authors, 한국어: e.target.value }
                        })
                      }
                      placeholder="한국어 작가명"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <textarea
                      value={newBook.descriptions.한국어 || ''}
                      onChange={(e) =>
                        setNewBook({
                          ...newBook,
                          descriptions: { ...newBook.descriptions, 한국어: e.target.value }
                        })
                      }
                      placeholder="한국어 설명"
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700 flex items-center gap-2">
                      영어
                    </h5>
                    <input
                      type="text"
                      value={newBook.titles.English || ''}
                      onChange={(e) =>
                        setNewBook({
                          ...newBook,
                          titles: { ...newBook.titles, English: e.target.value }
                        })
                      }
                      placeholder="영어 제목"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={newBook.authors.English || ''}
                      onChange={(e) =>
                        setNewBook({
                          ...newBook,
                          authors: { ...newBook.authors, English: e.target.value }
                        })
                      }
                      placeholder="영어 작가명"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <textarea
                      value={newBook.descriptions.English || ''}
                      onChange={(e) =>
                        setNewBook({
                          ...newBook,
                          descriptions: { ...newBook.descriptions, English: e.target.value }
                        })
                      }
                      placeholder="영어 설명"
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700 flex items-center gap-2">
                      일본어
                    </h5>
                    <input
                      type="text"
                      value={newBook.titles.日本語 || ''}
                      onChange={(e) =>
                        setNewBook({
                          ...newBook,
                          titles: { ...newBook.titles, 日本語: e.target.value }
                        })
                      }
                      placeholder="일본어 제목"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={newBook.authors.日本語 || ''}
                      onChange={(e) =>
                        setNewBook({
                          ...newBook,
                          authors: { ...newBook.authors, 日本語: e.target.value }
                        })
                      }
                      placeholder="일본어 작가명"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <textarea
                      value={newBook.descriptions.日本語 || ''}
                      onChange={(e) =>
                        setNewBook({
                          ...newBook,
                          descriptions: { ...newBook.descriptions, 日本語: e.target.value }
                        })
                      }
                      placeholder="일본어 설명"
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700 flex items-center gap-2">
                      스페인어
                    </h5>
                    <input
                      type="text"
                      value={newBook.titles.Español || ''}
                      onChange={(e) =>
                        setNewBook({
                          ...newBook,
                          titles: { ...newBook.titles, Español: e.target.value }
                        })
                      }
                      placeholder="스페인어 제목"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={newBook.authors.Español || ''}
                      onChange={(e) =>
                        setNewBook({
                          ...newBook,
                          authors: { ...newBook.authors, Español: e.target.value }
                        })
                      }
                      placeholder="스페인어 작가명"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <textarea
                      value={newBook.descriptions.Español || ''}
                      onChange={(e) =>
                        setNewBook({
                          ...newBook,
                          descriptions: { ...newBook.descriptions, Español: e.target.value }
                        })
                      }
                      placeholder="스페인어 설명"
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">이북 콘텐츠 (각 언어별 4개 챕터)</h4>

                <div className="mb-6">
                  <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    한국어 콘텐츠
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          챕터 {index + 1}
                        </label>
                        <textarea
                          value={newBook.ebookContent.한국어[index] || ''}
                          onChange={(e) => {
                            const newContent = [...newBook.ebookContent.한국어];
                            newContent[index] = e.target.value;
                            setNewBook({
                              ...newBook,
                              ebookContent: { ...newBook.ebookContent, 한국어: newContent }
                            });
                          }}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder={`챕터 ${index + 1} 내용을 입력하세요...`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    영어 콘텐츠
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          챕터 {index + 1}
                        </label>
                        <textarea
                          value={newBook.ebookContent.English[index] || ''}
                          onChange={(e) => {
                            const newContent = [...newBook.ebookContent.English];
                            newContent[index] = e.target.value;
                            setNewBook({
                              ...newBook,
                              ebookContent: { ...newBook.ebookContent, English: newContent }
                            });
                          }}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder={`챕터 ${index + 1} 내용을 입력하세요...`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    일본어 콘텐츠
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          챕터 {index + 1}
                        </label>
                        <textarea
                          value={newBook.ebookContent.日本語?.[index] || ''}
                          onChange={(e) => {
                            const newContent = [...(newBook.ebookContent.日本語 || ['', '', '', ''])];
                            newContent[index] = e.target.value;
                            setNewBook({
                              ...newBook,
                              ebookContent: { ...newBook.ebookContent, 日本語: newContent }
                            });
                          }}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder={`챕터 ${index + 1} 내용을 입력하세요...`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    스페인어 콘텐츠
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          챕터 {index + 1}
                        </label>
                        <textarea
                          value={newBook.ebookContent.Español[index] || ''}
                          onChange={(e) => {
                            const newContent = [...newBook.ebookContent.Español];
                            newContent[index] = e.target.value;
                            setNewBook({
                              ...newBook,
                              ebookContent: { ...newBook.ebookContent, Español: newContent }
                            });
                          }}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder={`챕터 ${index + 1} 내용을 입력하세요...`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setIsAddingBook(false)}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 !rounded-button"
              >
                취소
              </button>
              <button
                onClick={handleAddBook}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 !rounded-button"
                disabled={!newBook.title || !newBook.author}
              >
                도서 추가
              </button>
            </div>
          </div>
        </div>
      )}

      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">도서 수정</h3>
              <button
                onClick={() => setEditingBook(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <i className="ri-close-line text-xl text-gray-500"></i>
              </button>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">기본 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">제목 (기본)</label>
                    <input
                      type="text"
                      value={editingBook.title}
                      onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="도서 제목을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">작가 (기본)</label>
                    <input
                      type="text"
                      value={editingBook.author}
                      onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="작가명을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">시대</label>
                    <input
                      type="text"
                      value={editingBook.period}
                      onChange={(e) => setEditingBook({ ...editingBook, period: e.target.value })}
                      placeholder="예: 조선후기"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">페이지 수</label>
                    <input
                      type="number"
                      value={editingBook.pages}
                      onChange={(e) => setEditingBook({ ...editingBook, pages: Number(e.target.value) })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">설명 (기본)</label>
                    <textarea
                      value={editingBook.description}
                      onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="도서 설명을 입력하세요"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">다국어 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700 flex items-center gap-2">
                      한국어
                    </h5>
                    <input
                      type="text"
                      value={editingBook.titles.한국어 || ''}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          titles: { ...editingBook.titles, 한국어: e.target.value }
                        })
                      }
                      placeholder="한국어 제목"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={editingBook.authors.한국어 || ''}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          authors: { ...editingBook.authors, 한국어: e.target.value }
                        })
                      }
                      placeholder="한국어 작가명"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <textarea
                      value={editingBook.descriptions.한국어 || ''}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          descriptions: { ...editingBook.descriptions, 한국어: e.target.value }
                        })
                      }
                      placeholder="한국어 설명"
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700 flex items-center gap-2">
                      영어
                    </h5>
                    <input
                      type="text"
                      value={editingBook.titles.English || ''}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          titles: { ...editingBook.titles, English: e.target.value }
                        })
                      }
                      placeholder="영어 제목"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={editingBook.authors.English || ''}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          authors: { ...editingBook.authors, English: e.target.value }
                        })
                      }
                      placeholder="영어 작가명"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <textarea
                      value={editingBook.descriptions.English || ''}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          descriptions: { ...editingBook.descriptions, English: e.target.value }
                        })
                      }
                      placeholder="영어 설명"
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700 flex items-center gap-2">
                      일본어
                    </h5>
                    <input
                      type="text"
                      value={editingBook.titles.日本語 || ''}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          titles: { ...editingBook.titles, 日本語: e.target.value }
                        })
                      }
                      placeholder="일본어 제목"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={editingBook.authors.日本語 || ''}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          authors: { ...editingBook.authors, 日本語: e.target.value }
                        })
                      }
                      placeholder="일본어 작가명"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <textarea
                      value={editingBook.descriptions.日本語 || ''}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          descriptions: { ...editingBook.descriptions, 日本語: e.target.value }
                        })
                      }
                      placeholder="일본어 설명"
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700 flex items-center gap-2">
                      스페인어
                    </h5>
                    <input
                      type="text"
                      value={editingBook.titles.Español || ''}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          titles: { ...editingBook.titles, Español: e.target.value }
                        })
                      }
                      placeholder="스페인어 제목"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={editingBook.authors.Español || ''}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          authors: { ...editingBook.authors, Español: e.target.value }
                        })
                      }
                      placeholder="스페인어 작가명"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <textarea
                      value={editingBook.descriptions.Español || ''}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          descriptions: { ...editingBook.descriptions, Español: e.target.value }
                        })
                      }
                      placeholder="스페인어 설명"
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">이북 콘텐츠 (각 언어별 4개 챕터)</h4>

                <div className="mb-6">
                  <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    한국어 콘텐츠
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          챕터 {index + 1}
                        </label>
                        <textarea
                          value={editingBook.ebookContent.한국어?.[index] || ''}
                          onChange={(e) => {
                            const newContent = [...(editingBook.ebookContent.한국어 || ['', '', '', ''])];
                            newContent[index] = e.target.value;
                            setEditingBook({
                              ...editingBook,
                              ebookContent: { ...editingBook.ebookContent, 한국어: newContent }
                            });
                          }}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder={`챕터 ${index + 1} 내용을 입력하세요...`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    영어 콘텐츠
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          챕터 {index + 1}
                        </label>
                        <textarea
                          value={editingBook.ebookContent.English?.[index] || ''}
                          onChange={(e) => {
                            const newContent = [...(editingBook.ebookContent.English || ['', '', '', ''])];
                            newContent[index] = e.target.value;
                            setEditingBook({
                              ...editingBook,
                              ebookContent: { ...editingBook.ebookContent, English: newContent }
                            });
                          }}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder={`챕터 ${index + 1} 내용을 입력하세요...`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    일본어 콘텐츠
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          챕터 {index + 1}
                        </label>
                        <textarea
                          value={editingBook.ebookContent.日本語?.[index] || ''}
                          onChange={(e) => {
                            const newContent = [...(editingBook.ebookContent.日本語 || ['', '', '', ''])];
                            newContent[index] = e.target.value;
                            setEditingBook({
                              ...editingBook,
                              ebookContent: { ...editingBook.ebookContent, 日本語: newContent }
                            });
                          }}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder={`챕터 ${index + 1} 내용을 입력하세요...`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    스페인어 콘텐츠
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          챕터 {index + 1}
                        </label>
                        <textarea
                          value={editingBook.ebookContent.Español?.[index] || ''}
                          onChange={(e) => {
                            const newContent = [...(editingBook.ebookContent.Español || ['', '', '', ''])];
                            newContent[index] = e.target.value;
                            setEditingBook({
                              ...editingBook,
                              ebookContent: { ...editingBook.ebookContent, Español: newContent }
                            });
                          }}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder={`챕터 ${index + 1} 내용을 입력하세요...`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setEditingBook(null)}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 !rounded-button"
              >
                취소
              </button>
              <button
                onClick={handleUpdateBook}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 !rounded-button"
                disabled={!editingBook.title || !editingBook.author}
              >
                수정 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
