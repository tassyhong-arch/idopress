
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import EbookReader from '../../../components/EbookReader';
import { useBooksStore } from '../../../lib/booksStore';

interface BookDetailProps {
  bookId: string;
}

export default function BookDetail({ bookId }: BookDetailProps) {
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [readerLanguage, setReaderLanguage] = useState('한국어');
  const { books } = useBooksStore();

  console.log('BookDetail 컴포넌트 렌더링 - bookId:', bookId);

  // 도서 정보 가져오기
  const getBookInfo = () => {
    const numericId = parseInt(bookId);

    if (!isNaN(numericId)) {
      // 숫자 ID인 경우 store에서 찾기
      const storeBook = books.find(book => book.id === numericId);
      if (storeBook) {
        return {
          id: bookId,
          title: storeBook.title,
          author: storeBook.author,
          description: storeBook.description || `${storeBook.author}이 지은 ${storeBook.period} 시대의 대표적인 ${storeBook.category}입니다.`,
          imageUrl: storeBook.imageUrl,
          languages: storeBook.languages
        };
      }
    }

    // 기본 고전 도서들
    const defaultBooks = {
      '1': {
        id: bookId,
        title: "춘향전",
        author: "작자 미상",
        description: "조선시대 최고의 사랑 이야기",
        languages: ['한국어', 'English', '日本語', 'Español']
      },
      '2': {
        id: bookId,
        title: "홍길동전",
        author: "허균",
        description: "조선 최초의 한글 소설",
        languages: ['한국어', 'English', '日本語', 'Español']
      },
      '3': {
        id: bookId,
        title: "구운몽",
        author: "김만중",
        description: "꿈과 현실을 다룬 철학적 소설",
        languages: ['한국어', 'English', '日本語']
      }
    };

    return defaultBooks[bookId] || null;
  };

  const book = getBookInfo();

  // 동적으로 도서의 이북 콘텐츠 가져오기
  const getEbookContent = () => {
    const numericId = parseInt(bookId);

    if (!isNaN(numericId)) {
      const storeBook = books.find(book => book.id === numericId);
      if (storeBook && storeBook.ebookContent) {
        return storeBook.ebookContent;
      }
    }

    // 기본 고전 도서들의 콘텐츠
    const multilingualContent = {
      '한국어': [
        "제1장 - 춘향과 몽룡의 만남\n\n조선 후기 남원 땅에 춘향이라는 기생의 딸이 있었다. 춘향은 용모가 아름답고 마음씨도 착했다. 어느 봄날, 춘향이 그네를 타고 있을 때 한양에서 내려온 이몽룡이 그 모습을 보고 한눈에 반하게 되었다.\n\n이몽룡은 남원 부사의 아들로, 풍채가 좋고 학문이 뛰어난 청년이었다. 두 사람은 첫 만남부터 서로에게 깊은 인상을 받았고, 자주 만나게 되면서 사랑에 빠지게 되었다.",
        "제2장 - 사랑의 맹세\n\n춘향과 몽룡은 비밀리에 혼례를 올렸다. 비록 정식 혼례는 아니었지만, 두 사람의 마음만큼은 진실했다. 그들은 서로를 향한 변치 않는 사랑을 맹세했다.\n\n'춘향아, 비록 지금은 신분이 다르지만 언젠가는 당당하게 너를 아내로 맞이하겠다.'\n'도련님, 저는 어떤 시련이 와도 도련님만을 기다리겠습니다.'",
        "제3장 - 이별과 시련\n\n몽룡의 아버지가 한양으로 전임되면서 몽룡도 함께 떠나야 했다. 이별의 아픔 속에서도 두 사람은 재회를 약속했다. 하지만 새로 부임한 변학도는 춘향의 미모에 반해 첩으로 삼으려 했고, 춘향은 이를 거절하며 옥에 갇히게 되었다."
      ],
      'English': [
        "Chapter 1 - The Meeting of Chunhyang and Mongryong\n\nIn the late Joseon period, in the land of Namwon, there lived Chunhyang, the daughter of a gisaeng. Chunhyang was very beautiful and kind-hearted. One spring day, when Chunhyang was swinging, Lee Mongryong, who had come down from Hanyang, saw her and fell in love at first sight.\n\nMongryong was the son of the Namwon magistrate, a handsome young man with excellent scholarship. From their first meeting, the two were deeply impressed with each other and gradually fell in love.",
        "Chapter 2 - The Vow of Love\n\nChunhyang and Mongryong held a secret wedding ceremony. Although it was not an official wedding, their hearts were sincere. They vowed unchanging love for each other.\n\n'Chunhyang, although we have different social standings now, someday I will proudly make you my wife.'\n'Young master, no matter what trials come, I will wait only for you.'",
        "Chapter 3 - Separation and Trials\n\nWhen Mongryong's father was transferred to Hanyang, Mongryong had to leave with him. Despite the pain of separation, the two promised to meet again. However, the newly appointed Byeon Hakdo fell for Chunhyang's beauty and tried to make her his concubine, but Chunhyang refused and was imprisoned."
      ],
      '日本語': [
        "第1章 - 春香と夢龍の出会い\n\n朝鮮後期、南原の地に春香という妓生の娘がいた。春香は容貌が非常に美しく、心根も優しかった。ある春の日、春香がブランコに乗っているとき、漢陽から下ってきた李夢龍がその姿を見て一目で恋に落ちた。\n\n夢龍は南原府使の息子で、風采が良く学問に優れた青年だった。二人は初対面から互いに深い印象を受け、頻繁に会うようになって愛に落ちた。",
        "第2章 - 愛の誓い\n\n春香と夢龍は密かに婚礼を挙げた。正式な婚礼ではなかったが、二人の心だけは真実だった。彼らは互いへの変わらぬ愛を誓った。\n\n'春香よ、今は身分が違うが、いつかは堂々と君を妻に迎えよう。'\n'若様、私はどんな試練が来ても若様だけをお待ちします。'",
        "第3章 - 別れと試練\n\n夢龍の父が漢陽に転任することになり、夢龍も一緒に去らなければならなかった。別れの痛みの中でも、二人は再会を約束した。しかし新しく赴任した卞学道は春香の美貌に心を奪われ、側室にしようとしたが、春香はこれを拒否して牢獄に入れられた。"
      ],
      '스페인어': [
        "Capítulo 1 - El Encuentro de Chunhyang y Mongryong\n\nEn el período tardío de Joseon, en la tierra de Namwon, vivía Chunhyang, la hija de una gisaeng. Chunhyang era muy hermosa y de buen corazón. Un día de primavera, cuando Chunhyang se columpiaba, Lee Mongryong, que había venido de Hanyang, la vio y se enamoró a primera vista.\n\nMongryong era el hijo del magistrado de Namwon, un joven apuesto con excelente erudición. Desde su primer encuentro, los dos se impresionaron profundamente el uno al otro y gradualmente se enamoraron.",
        "Capítulo 2 - El Voto de Amor\n\nChunhyang y Mongryong celebraron una ceremonia de boda secreta. Aunque no era una boda oficial, sus corazones eran sinceros. Se prometieron amor inmutable el uno al otro.\n\n'Chunhyang, aunque ahora tenemos diferentes posiciones sociales, algún día te haré orgullosamente mi esposa.'\n'Joven maestro, sin importar qué pruebas vengan, esperaré solo por ti.'",
        "Capítulo 3 - Separación y Pruebas\n\nCuando el padre de Mongryong fue transferido a Hanyang, Mongryong tuvo que irse con él. A pesar del dolor de la separación, los dos prometieron encontrarse de nuevo. Sin embargo, el recién nombrado Byeon Hakdo se enamoró de la belleza de Chunhyang y trató de hacerla su concubina, pero Chunhyang se negó y fue encarcelada."
      ]
    };
    return multilingualContent;
  };

  const ebookContent = getEbookContent();

  // 자동 이북 열기 처리 - 컴포넌트 마운트 후 즉시 실행
  useEffect(() => {
    console.log('BookDetail useEffect 실행 시작');

    // 브라우저 환경에서만 실행
    if (typeof window === 'undefined') {
      console.log('서버 환경이므로 URL 파라미터 읽기 건너뜀');
      return;
    }

    // URL 파라미터 직접 읽기
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const autoOpenParam = urlParams.get('autoOpen');

    console.log('URL에서 읽은 파라미터:', { 
      langParam, 
      autoOpenParam,
      fullURL: window.location.href 
    });

    // autoOpen=true이고 언어가 지정된 경우 자동 열기
    if (autoOpenParam === 'true' && langParam) {
      console.log('자동 이북 열기 조건 만족!');

      // 지원하는 언어인지 확인
      let targetLanguage = langParam;
      if (!ebookContent[langParam]) {
        console.log('지원하지 않는 언어, 한국어로 대체:', langParam);
        targetLanguage = '한국어';
      }

      console.log('설정할 언어:', targetLanguage);
      setReaderLanguage(targetLanguage);

      // 즉시 이북 리더 열기
      console.log('이북 리더 열기 실행!');
      setIsReaderOpen(true);
    } else {
      console.log('자동 열기 조건 불만족:', { autoOpenParam, langParam });
    }
  }, []); // 빈 의존성 배열로 한 번만 실행

  // 이북 읽기 버튼 클릭 핸들러
  const handleReadBook = (language) => {
    console.log('이북 읽기 버튼 클릭:', language);
    const targetLanguage = ebookContent[language] ? language : '한국어';
    setReaderLanguage(targetLanguage);
    setIsReaderOpen(true);
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">도서를 찾을 수 없습니다</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  // 이북 리더가 열려있으면 리더만 표시
  if (isReaderOpen) {
    console.log('이북 리더 렌더링 - 언어:', readerLanguage);
    return (
      <EbookReader
        bookId={bookId}
        bookTitle={book.title}
        bookContent={ebookContent[readerLanguage] || ebookContent['한국어']}
        multilingualContent={ebookContent}
        initialLanguage={readerLanguage}
        onClose={() => setIsReaderOpen(false)}
      />
    );
  }

  console.log('BookDetail 일반 페이지 렌더링');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="fixed top-0 w-full bg-[#1a365d] text-white z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="font-[\'Pacifico\'] text-xl text-white">이도출판</div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/books" className="text-[#d69e2e]">도서목록</Link>
            <Link href="/authors" className="hover:text-[#d69e2e] transition-colors">작가소개</Link>
            <Link href="/community" className="hover:text-[#d69e2e] transition-colors">커뮤니티</Link>
            <Link href="/about" className="hover:text-[#d69e2e] transition-colors">회사소개</Link>
          </nav>
        </div>
      </header>

      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* 도서 정보 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="aspect-[3/4] bg-gradient-to-br from-[#1a365d] to-[#2d5282] rounded-lg flex items-center justify-center">
                  <img
                    src={book.imageUrl || `https://readdy.ai/api/search-image?query=Korean%20classical%20literature%20book%20cover%20${book.title}%20traditional%20elegant%20design%20isolated%20on%20white%20background&width=300&height=400&seq=${bookId}&orientation=portrait`}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <h1 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-2">{book.title}</h1>
                <p className="text-xl text-gray-600 mb-4">{book.author}</p>
                <p className="text-gray-700 leading-relaxed mb-6">{book.description}</p>

                {/* 언어별 읽기 버튼 */}
                <div className="mb-6">
                  <h3 className="font-bold text-[#1a365d] mb-3">이북으로 읽기</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {book.languages && book.languages.includes('한국어') && (
                      <button
                        onClick={() => handleReadBook('한국어')}
                        className="bg-[#d69e2e] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#b7791f] transition-colors flex items-center justify-center gap-2 !rounded-button"
                      >
                        <i className="ri-book-open-line"></i>
                        한국어로 읽기
                      </button>
                    )}
                    {book.languages && book.languages.includes('English') && (
                      <button
                        onClick={() => handleReadBook('English')}
                        className="bg-[#d69e2e] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#b7791f] transition-colors flex items-center justify-center gap-2 !rounded-button"
                      >
                        <i className="ri-book-open-line"></i>
                        Read in English
                      </button>
                    )}
                    {book.languages && book.languages.includes('일본어') && (
                      <button
                        onClick={() => handleReadBook('일본어')}
                        className="bg-[#d69e2e] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#b7791f] transition-colors flex items-center justify-center gap-2 !rounded-button"
                      >
                        <i className="ri-book-open-line"></i>
                        日本語で読む
                      </button>
                    )}
                    {book.languages && book.languages.includes('스페인어') && (
                      <button
                        onClick={() => handleReadBook('스페인어')}
                        className="bg-[#d69e2e] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#b7791f] transition-colors flex items-center justify-center gap-2 !rounded-button"
                      >
                        <i className="ri-book-open-line"></i>
                        Leer en Español
                      </button>
                    )}
                  </div>
                </div>

                {/* 직접 이북 리더로 이동하는 링크도 추가 */}
                <div className="mt-4">
                  <Link
                    href={`/read/${bookId}`}
                    className="inline-flex items-center gap-2 text-[#1a365d] hover:text-[#d69e2e] transition-colors"
                  >
                    <i className="ri-external-link-line"></i>
                    전체화면으로 읽기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
