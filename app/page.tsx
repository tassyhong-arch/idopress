
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useBooksStore } from '../lib/booksStore';

export default function HomePage() {
  const [currentLanguage, setCurrentLanguage] = useState('한국어');
  const [isMounted, setIsMounted] = useState(false);

  // booksStore에서 출간된 도서 가져오기
  const { getPublishedBooks } = useBooksStore();
  
  // Always get books to prevent hydration mismatch, but only use after mounting
  const publishedBooks = getPublishedBooks();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getContent = (lang: string) => {
    const content = {
      '한국어': {
        heroTitle: '한국문학의 향기,\\n디지털로 피어나다',
        heroSubtitle: '천년의 문학 전통이 당신의 손끝에서 새롭게 살아납니다',
        readBooks: '도서 읽기',
        learnMore: '더 알아보기',
        whyTitle: '왜 이도인가요?',
        whySubtitle: '현대 기술로 만나는 전통의 아름다움',
        features: [
          { title: '4개 언어 지원', description: '한국어, 영어, 일본어, 스페인어로 읽을 수 있어요' },
          { title: '모바일 최적화', description: '언제 어디서나 편리하게 읽으세요' },
          { title: '무료 이용', description: '회원가입 없이 모든 도서를 무료로' },
          { title: '사용자 친화적', description: '직관적이고 아름다운 인터페이스' }
        ],
        booksTitle: '마음을 울리는 한국문학 여행',
        booksSubtitle: '고전부터 현대까지, 엄선된 한국문학의 깊이를 경험하세요',
        books: [
          { title: '춘향전', subtitle: '사랑과 의리의 이야기', description: '춘향과 몽룡의 애절한 사랑 이야기' },
          { title: '심청전', subtitle: '효심과 감동의 이야기', description: '효녀 심청의 감동적인 이야기' },
          { title: '흥부전', subtitle: '선악의 교훈 이야기', description: '흥부와 놀부의 권선징악 이야기' }
        ],
        statsTitle: '전 세계가 사랑하는 한국 고전문학',
        statsSubtitle: '이미 많은 사람들이 이도와 함께하고 있습니다',
        stats: [
          { number: '50,000+', label: '총 독자 수' },
          { number: '4', label: '지원 언어' },
          { number: '3', label: '고전 작품' },
          { number: '98%', label: '만족도' }
        ],
        ctaTitle: '지금 바로 시작하세요',
        ctaSubtitle: '회원가입 없이 바로 이용 가능합니다.\\n아름다운 우리 문학의 세계로 떠나보세요.',
        startReading: '무료로읽기시작',
        joinCommunity: '커뮤니티 참여',
        footerDescription: '한국 고전문학을세계에 전하는 디지털 도서관.\\n천년의 문학 전통이 당신의 손끝에서 새롭게 살아납니다',
        footerService: '서비스',
        footerCompany: '회사',
        footerLinks: {
          books: '도서 목록',
          authors: '작가소개',
          community: '커뮤니티',
          admin: '관리자',
          about: '회사소개',
          contact: '문의하기',
          privacy: '개인정보처리방침',
          terms: '이용약관'
        },
        footerCopyright: '2024 이도. 한국 고전문학을 세계에. All rights reserved.'
      },
      'English': {
        heroTitle: 'Korean Literature Blooms\\nDigitally',
        heroSubtitle: 'A thousand years of literary tradition comes alive at your fingertips',
        readBooks: 'Read Books',
        learnMore: 'Learn More',
        whyTitle: 'Why Ido?',
        whySubtitle: 'Traditional beauty meets modern technology',
        features: [
          { title: '4 Language Support', description: 'Available in Korean, English, Japanese, and Spanish' },
          { title: 'Mobile Optimized', description: 'Read conveniently anytime, anywhere' },
          { title: 'Free Access', description: 'All books free without registration' },
          { title: 'User Friendly', description: 'Intuitive and beautiful interface' }
        ],
        booksTitle: 'A Journey Through Korean Literature',
        booksSubtitle: 'Experience the depth of carefully selected Korean literature from classics to modern works',
        books: [
          { title: 'The Tale of Chunhyang', subtitle: 'A story of love and loyalty', description: 'The touching love story of Chunhyang and Mongryong' },
          { title: 'The Tale of Sim Cheong', subtitle: 'A story of filial piety and emotion', description: 'The moving story of the devoted daughter Sim Cheong' },
          { title: 'The Tale of Heungbu', subtitle: 'A moral lesson story', description: 'The tale of good and evil with Heungbu and Nolbu' }
        ],
        statsTitle: 'Korean Classical Literature Loved Worldwide',
        statsSubtitle: 'Many people are already with Ido',
        stats: [
          { number: '50,000+', label: 'Total Readers' },
          { number: '4', label: 'Languages' },
          { number: '3', label: 'Classic Works' },
          { number: '98%', label: 'Satisfaction' }
        ],
        ctaTitle: 'Start Right Now',
        ctaSubtitle: 'Available immediately without registration.\\nEmbark on a journey into the world of our beautiful literature.',
        startReading: 'Start Reading Free',
        joinCommunity: 'Join Community',
        footerDescription: 'A digital library bringing Korean classical literature to the world.\\nA thousand years of literary tradition comes alive at your fingertips',
        footerService: 'Service',
        footerCompany: 'Company',
        footerLinks: {
          books: 'Book List',
          authors: 'Authors',
          community: 'Community',
          admin: 'Admin',
          about: 'About Us',
          contact: 'Contact',
          privacy: 'Privacy Policy',
          terms: 'Terms of Service'
        },
        footerCopyright: '2024 Ido. Korean classical literature to the world. All rights reserved.'
      },
      '日本語': {
        heroTitle: '韓国文学の香り,\\nデジタルで咲く',
        heroSubtitle: '千年の文学伝統があなたの指先で新たに生まれ変わります',
        readBooks: '図書を読む',
        learnMore: 'もっと知る',
        whyTitle: 'なぜイドなのか？',
        whySubtitle: '現代技術で出会う伝統の美しさ',
        features: [
          { title: '4言語対応', description: '韓国語、英語、日本語、スペイン語で読めます' },
          { title: 'モバイル最適化', description: 'いつでもどこでも便利に読めます' },
          { title: '無料利用', description: '会員登録なしですべての図書を無料で' },
          { title: 'ユーザーフレンドリー', description: '直感的で美しいインターフェース' }
        ],
        booksTitle: '心を打つ韓国文学の旅',
        booksSubtitle: '古典から現代まで、厳選された韓国文学の深さを体験してください',
        books: [
          { title: '春香伝', subtitle: '愛と義りの物語', description: '春香と夢龍の切ない愛の物語' },
          { title: '沈清伝', subtitle: '孝行と感動の物語', description: '孝女沈清の感動的な物語' },
          { title: '興夫伝', subtitle: '善悪の教訓物語', description: '興夫と놀布の勧善懲悪物語' }
        ],
        statsTitle: '世界中で愛される韓国古典文学',
        statsSubtitle: 'すでに多くの人々がイドと一緒にいます',
        stats: [
          { number: '50,000+', label: '総読者数' },
          { number: '4', label: '対応言語' },
          { number: '3', label: '古典作品' },
          { number: '98%', label: '満足度' }
        ],
        ctaTitle: '今すぐ始めてください',
        ctaSubtitle: '会員登録なしですぐに利用可能です.\\n美しい我々の文学の世界へ旅立ってみてください.',
        startReading: '無料で読み始める',
        joinCommunity: 'コミュニティに参加',
        footerDescription: '韓国古典文学を世界に伝えるデジタル図書館.\\n千年の文学伝統があなたの指先で新たに生まれ変わります',
        footerService: 'サービス',
        footerCompany: '会社',
        footerLinks: {
          books: '図書リスト',
          authors: '作家紹介',
          community: 'コミュニティ',
          admin: '管理者',
          about: '会社紹介',
          contact: 'お問い合わせ',
          privacy: 'プライバシーポリシー',
          terms: '利用規約'
        },
        footerCopyright: '2024 イド. 韓国古典文学を世界に. All rights reserved.'
      },
      'Español': {
        heroTitle: 'La Fragancia de la Literatura Coreana,\\nFloreciendo Digitalmente',
        heroSubtitle: 'Mil años de tradición literaria cobran vida en tus manos',
        readBooks: 'Leer Libros',
        learnMore: 'Saber Más',
        whyTitle: '¿Por qué Ido?',
        whySubtitle: 'La belleza tradicional se encuentra con la tecnología moderna',
        features: [
          { title: 'Soporte 4 Idiomas', description: 'Disponible en coreano, inglés, japonés y español' },
          { title: 'Optimizado Móvil', description: 'Lee cómodamente en cualquier momento y lugar' },
          { title: 'Acceso Gratuito', description: 'Todos los libros gratis sin registro' },
          { title: 'Amigable al Usuario', description: 'Interfaz intuitiva y hermosa' }
        ],
        booksTitle: 'Un Viaje por la Literatura Coreana Conmovedora',
        booksSubtitle: 'Experimenta la profundidad de la literatura coreana cuidadosamente seleccionada, desde clásicos hasta obras modernas',
        books: [
          { title: 'La Historia de Chunhyang', subtitle: 'Una historia de amor y lealtad', description: 'La conmovedora historia de amor de Chunhyang y Mongryong' },
          { title: 'La Historia de Sim Cheong', subtitle: 'Una historia de piedad filial y emoción', description: 'La emotiva historia de la hija devota Sim Cheong' },
          { title: 'La Historia de Heungbu', subtitle: 'Una historia de lección moral', description: 'El cuento del bien y el mal con Heungbu y Nolbu' }
        ],
        statsTitle: 'Literatura Clásica Coreana Amada en Todo el Mundo',
        statsSubtitle: 'Muchas personas ya están con Ido',
        stats: [
          { number: '50,000+', label: 'Lectores Totales' },
          { number: '4', label: 'Idiomas' },
          { number: '3', label: 'Obras Clásicas' },
          { number: '98%', label: 'Satisfacción' }
        ],
        ctaTitle: 'Comienza Ahora Mismo',
        ctaSubtitle: 'Disponible inmediatamente sin registro.\\nEmbárcate en un viaje al mundo de nuestra hermosa literatura.',
        startReading: 'Comenzar a Leer Gratis',
        joinCommunity: 'Unirse a la Comunidad',
        footerDescription: 'Una biblioteca digital que lleva la literatura clásica coreana al mundo.\\nMil años de tradición literaria cobran vida en tus manos',
        footerService: 'Servicio',
        footerCompany: 'Empresa',
        footerLinks: {
          books: 'Lista de Libros',
          authors: 'Autores',
          community: 'Comunidad',
          admin: 'Admin',
          about: 'Acerca de Nosotros',
          contact: 'Contacto',
          privacy: 'Política de Privacidad',
          terms: 'Términos de Servicio'
        },
        footerCopyright: '2024 Ido. Literatura clásica coreana al mundo. Todos los derechos reservados.'
      }
    };
    return content[lang] || content['한국어'];
  };

  const getBookEmoji = (title: string) => {
    const emojiMap: { [key: string]: string } = {
      '춘향전': '🌸',
      '심청전': '🌊',
      '흥부전': '🏠',
      '홍길동전': '⚔️',
      '구운몽': '☁️',
      '사씨남정기': '💝',
      '테트로': '🎮'
    };
    return emojiMap[title] || '📚';
  };

  const getBookColor = (index: number) => {
    const colors = [
      'bg-rose-50 border-rose-200',
      'bg-blue-50 border-blue-200',
      'bg-amber-50 border-amber-200',
      'bg-purple-50 border-purple-200',
      'bg-green-50 border-green-200',
      'bg-indigo-50 border-indigo-200'
    ];
    return colors[index % colors.length];
  };

  const getBookReadUrl = (book: any) => {
    // 기존 특별 도서들의 URL 매핑
    const urlMap: { [key: string]: string } = {
      '춘향전': 'chunhyang',
      '심청전': 'simcheong',
      '흥부전': 'heungbu'
    };

    return urlMap[book.title] || book.id;
  };

  const content = getContent(currentLanguage);

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />

      {/* 히어로 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight whitespace-pre-line">
            {content.heroTitle}
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            {content.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/books"
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors !rounded-button"
            >
              {content.readBooks}
            </Link>
          </div>

          {/* 언어 지원 */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-2xl">🇰🇷</span>
              <span className="text-sm font-medium">한국어</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-2xl">🇺🇸</span>
              <span className="text-sm font-medium">English</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-2xl">🇯🇵</span>
              <span className="text-sm font-medium">日本語</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-2xl">🇪🇸</span>
              <span className="text-sm font-medium">Español</span>
            </div>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'ri-global-line' },
              { icon: 'ri-smartphone-line' },
              { icon: 'ri-book-open-line' },
              { icon: 'ri-heart-line' }
            ].map((feature, index) => (
              <div key={`feature-${index}`} className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${feature.icon} text-xl text-gray-700`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{content.features[index].title}</h3>
                <p className="text-gray-600 text-sm">{content.features[index].description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 도서 소개 섹션 - 동적으로 표시 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {content.booksTitle}
            </h2>
            <p className="text-xl text-gray-600">{content.booksSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {isMounted && publishedBooks.length > 0 ? (
              publishedBooks.slice(0, 6).map((book, index) => {
                // 현재 언어에 맞는 정보 가져오기
                const title = book.titles?.[currentLanguage as keyof typeof book.titles] || book.title;
                const description = book.descriptions?.[currentLanguage as keyof typeof book.descriptions] || book.description;

                return (
                  <div key={`book-section-${book.id}`} className={`border rounded-2xl p-8 hover:shadow-lg transition-shadow ${getBookColor(index)}`}>
                    <div className="text-center">
                      <span className="text-5xl mb-4 block">{getBookEmoji(book.title)}</span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
                      <p className="text-gray-600 mb-4">{book.author}</p>
                      <p className="text-gray-700 text-sm mb-6">{description}</p>

                      <div className="grid grid-cols-2 gap-2">
                        {book.languages.slice(0, 4).map((language, langIndex) => {
                          const langMap: { [key: string]: { flag: string; name: string } } = {
                            '한국어': { flag: '🇰🇷', name: '한국어' },
                            'English': { flag: '🇺🇸', name: 'English' },
                            '日本語': { flag: '🇯🇵', name: '日本語' },
                            'Español': { flag: '🇪🇸', name: 'Español' }
                          };
                          const langInfo = langMap[language] || { flag: '🌐', name: language };

                          return (
                            <Link
                              key={`book-${book.id}-lang-${langIndex}`}
                              href={`/read/${getBookReadUrl(book)}?lang=${encodeURIComponent(language)}`}
                              className="bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:border-gray-300 transition-colors !rounded-button flex items-center justify-center gap-1"
                            >
                              <span className="text-base">{langInfo.flag}</span>
                              <span>{langInfo.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              // Fallback content - static books to prevent hydration mismatch
              content.books.map((book, index) => (
                <div key={`fallback-book-${index}`} className={`border rounded-2xl p-8 hover:shadow-lg transition-shadow ${getBookColor(index)}`}>
                  <div className="text-center">
                    <span className="text-5xl mb-4 block">{index === 0 ? '🌸' : index === 1 ? '🌊' : '🏠'}</span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{book.title}</h3>
                    <p className="text-gray-600 mb-4">작자 미상</p>
                    <p className="text-gray-700 text-sm mb-6">{book.description}</p>

                    <div className="grid grid-cols-2 gap-2">
                      {['한국어', 'English', '日本語', 'Español'].slice(0, 4).map((language, langIndex) => {
                        const langMap: { [key: string]: { flag: string; name: string } } = {
                          '한국어': { flag: '🇰🇷', name: '한국어' },
                          'English': { flag: '🇺🇸', name: 'English' },
                          '日本語': { flag: '🇯🇵', name: '日本語' },
                          'Español': { flag: '🇪🇸', name: 'Español' }
                        };
                        const langInfo = langMap[language];
                        const bookUrl = index === 0 ? 'chunhyang' : index === 1 ? 'simcheong' : 'heungbu';

                        return (
                          <Link
                            key={`fallback-book-${index}-lang-${langIndex}`}
                            href={`/read/${bookUrl}?lang=${encodeURIComponent(language)}`}
                            className="bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:border-gray-300 transition-colors !rounded-button flex items-center justify-center gap-1"
                          >
                            <span className="text-base">{langInfo.flag}</span>
                            <span>{langInfo.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 더 많은 도서가 있을 경우 전체보기 버튼 */}
          {isMounted && publishedBooks.length > 6 && (
            <div className="text-center mt-12">
              <Link
                href="/books"
                className="bg-gray-100 text-gray-800 px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors !rounded-button"
              >
                전체 도서 보기 ({publishedBooks.length}권)
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 통계 섹션 - 동적 데이터로 업데이트 */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {content.statsTitle}
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            {content.statsSubtitle}
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50,000+</div>
              <div className="text-gray-400">총 독자 수</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">4</div>
              <div className="text-gray-400">지원 언어</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2" suppressHydrationWarning={true}>
                {isMounted ? publishedBooks.length : 6}
              </div>
              <div className="text-gray-400">출간 작품</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-400">만족도</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {content.ctaTitle}
          </h2>
          <p className="text-xl text-gray-600 mb-8 whitespace-pre-line">
            {content.ctaSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/books"
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors !rounded-button"
            >
              {content.startReading}
            </Link>
            <Link
              href="/community"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:border-gray-400 transition-colors !rounded-button"
            >
              {content.joinCommunity}
            </Link>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="font-[\'Pacifico\'] text-2xl text-gray-900 mb-4">이도</div>
              <p className="text-gray-600 mb-6 max-w-md whitespace-pre-line">
                {content.footerDescription}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">{content.footerService}</h4>
              <div className="space-y-2">
                <Link href="/books" className="block text-gray-600 hover:text-gray-900 transition-colors">{content.footerLinks.books}</Link>
                <Link href="/authors" className="block text-gray-600 hover:text-gray-900 transition-colors">{content.footerLinks.authors}</Link>
                <Link href="/community" className="block text-gray-600 hover:text-gray-900 transition-colors">{content.footerLinks.community}</Link>
                <Link href="/admin" className="block text-gray-600 hover:text-gray-900 transition-colors">{content.footerLinks.admin}</Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">{content.footerCompany}</h4>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-600 hover:text-gray-900 transition-colors">{content.footerLinks.about}</Link>
                <button className="block text-gray-600 hover:text-gray-900 transition-colors text-left">{content.footerLinks.contact}</button>
                <Link href="/privacy" className="block text-gray-600 hover:text-gray-900 transition-colors text-left">{content.footerLinks.privacy}</Link>
                <Link href="/terms" className="block text-gray-600 hover:text-gray-900 transition-colors text-left">{content.footerLinks.terms}</Link>
              </div>
            </div>

          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-500">
              {content.footerCopyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
