
'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import { useState } from 'react';

interface Author {
  id: string;
  name: string;
  period: string;
  description: string;
  books: string[];
  bio: string;
  names?: {
    한국어: string;
    English: string;
    日本語: string;
    Español: string;
  };
  descriptions?: {
    한국어: string;
    English: string;
    日本語: string;
    Español: string;
  };
  bios?: {
    한국어: string;
    English: string;
    日본語: string;
    Español: string;
  };
  bookTitles?: {
    한국어: string[];
    English: string[];
    日본語: string[];
    Español: string[];
  };
}

export default function AuthorsPage() {
  const [currentLanguage, setCurrentLanguage] = useState('한국어');

  const authors: Author[] = [
    {
      id: 'anonymous',
      name: '작자 미상',
      period: '조선후기',
      description: '전해 내려오는 민간 설화와 고전 문학의 집대성',
      books: ['춘향전', '심청전', '흥부전'],
      bio: '조선후기 민간에서 전해 내려온 구전 문학을 문자로 정착시킨 여러 작가들의 집합체입니다. 판소리계 소설의 대부분이 이 시기에 완성되었으며, 서민들의 삶과 정서를 생생하게 담아냈습니다.',
      names: {
        한국어: '작자 미상',
        English: 'Anonymous',
        日本語: '作者未詳',
        Español: 'Anónimo'
      },
      descriptions: {
        한국어: '전해 내려오는 민간 설화와 고전 문학의 집대성',
        English: 'Compilation of folk tales and classical literature passed down through generations',
        日本語: '代々受け継がれてきた民間説話と古典文学の集大成',
        Español: 'Compilación de cuentos populares y literatura clásica transmitida a través de generaciones'
      },
      bios: {
        한국어: '조선후기 민간에서 전해 내려온 구전 문학을 문자로 정착시킨 여러 작가들의 집합체입니다. 판소리계 소설의 대부분이 이 시기에 완성되었으며, 서민들의 삶과 정서를 생생하게 담아냈습니다.',
        English: 'A collective of various writers who established oral literature passed down from the common people of the late Joseon Dynasty into written form. Most pansori-based novels were completed during this period, vividly capturing the lives and emotions of common people.',
        日本語: '朝鮮後期の民間から伝わった口承文学を文字で定着させた複数の作家たちの集合体です。判ソリ系小説の大部分がこの時期に完成され、庶民の生活と情緒を生き生きと描き出しました。',
        Español: 'Un colectivo de varios escritores que establecieron la literatura oral transmitida por el pueblo común de finales de la dinastía Joseon en forma escrita. La mayoría de las novelas basadas en pansori se completaron durante este período, capturando vívidamente las vidas y emociones de la gente común.'
      },
      bookTitles: {
        한국어: ['춘향전', '심청전', '흥부전'],
        English: ['The Tale of Chunhyang', 'The Tale of Sim Cheong', 'The Tale of Heungbu'],
        日本語: ['春香伝', '沈清伝', '興夫伝'],
        Español: ['La Historia de Chunhyang', 'La Historia de Sim Cheong', 'La Historia de Heungbu']
      }
    },
    {
      id: 'heo-gyun',
      name: '허균',
      period: '1569-1618',
      description: '조선 최초의 한글소설 「홍길동전」의 작가',
      books: ['홍길동전'],
      bio: '조선 중기의 문신이자 소설가로, 「홍길동전」을 통해 당시 사회의 모순을 날카롭게 비판했습니다. 진보적 사상가로서 신분제 사회에 대한 개혁 의지를 문학으로 표현했습니다.',
      names: {
        한국어: '허균',
        English: 'Heo Gyun',
        日本語: '許筠',
        Español: 'Heo Gyun'
      },
      descriptions: {
        한국어: '조선 최초의 한글소설 「홍길동전」의 작가',
        English: 'Author of "The Tale of Hong Gil-dong", the first Korean novel written in Hangul',
        日本語: '朝鮮初のハングル小説「洪吉童伝」の作家',
        Español: 'Autor de "La Historia de Hong Gil-dong", la primera novela coreana escrita en Hangul'
      },
      bios: {
        한국어: '조선 중기의 문신이자 소설가로, 「홍길동전」을 통해 당시 사회의 모순을 날카롭게 비판했습니다. 진보적 사상가로서 신분제 사회에 대한 개혁 의지를 문학으로 표현했습니다.',
        English: 'A government official and novelist of the mid-Joseon period who sharply criticized the contradictions of society through "The Tale of Hong Gil-dong". As a progressive thinker, he expressed his reform will for the status-based society through literature.',
        日本語: '朝鮮中期の文臣であり小説家で、「洪吉童伝」を通じて当時の社会の矛盾を鋭く批判しました。進歩的思想家として身分制社会に対する改革意志を文学で表現しました。',
        Español: 'Un funcionario gubernamental y novelista del período medio de Joseon que criticó agudamente las contradicciones de la sociedad a través de "La Historia de Hong Gil-dong". Como pensador progresista, expresó su voluntad de reforma para la sociedad basada en el estatus a través de la literatura.'
      },
      bookTitles: {
        한국어: ['홍길동전'],
        English: ['The Tale of Hong Gil-dong'],
        日本語: ['洪吉童伝'],
        Español: ['La Historia de Hong Gil-dong']
      }
    },
    {
      id: 'kim-man-jung',
      name: '김만중',
      period: '1637-1692',
      description: '「구운몽」과 「사씨남정기」의 대가',
      books: ['구운몽', '사씨남정기'],
      bio: '조선후기의 대표적인 소설가로, 「구운몽」에서는 불교적 세계관을, 「사씨남정기」에서는 유교적 가족윤리를 다뤘습니다. 한글 소설의 문학적 완성도를 한 단계 끌어올린 작가입니다.',
      names: {
        한국어: '김만중',
        English: 'Kim Man-jung',
        日本語: '金万重',
        Español: 'Kim Man-jung'
      },
      descriptions: {
        한국어: '「구운몽」과 「사씨남정기」의 대가',
        English: 'Master of "The Cloud Dream of Nine" and "The History of Lady Sa"',
        日本語: '「九雲夢」と「謝氏南征記」の大家',
        Español: 'Maestro de "El Sueño de las Nueve Nubes" y "La Historia de la Señora Sa"'
      },
      bios: {
        한국어: '조선후기의 대표적인 소설가로, 「구운몽」에서는 불교적 세계관을, 「사씨남정기」에서는 유교적 가족윤리를 다뤘습니다. 한글 소설의 문학적 완성도를 한 단계 끌어올린 작가입니다.',
        English: 'A representative novelist of the late Joseon period who dealt with Buddhist worldviews in "The Cloud Dream of Nine" and Confucian family ethics in "The History of Lady Sa". He is an author who elevated the literary completeness of Hangul novels to the next level.',
        日本語: '朝鮮後期の代表的な小説家で、「九雲夢」では仏教的世界観を、「謝氏南征記」では儒教的家族倫理を扱いました。ハングル小説の文学的完成度を一段階引き上げた作家です。',
        Español: 'Un novelista representativo del período tardío de Joseon que trató las cosmovisiones budistas en "El Sueño de las Nueve Nubes" y la ética familiar confuciana en "La Historia de la Señora Sa". Es un autor que elevó la completitud literaria de las novelas en Hangul al siguiente nivel.'
      },
      bookTitles: {
        한국어: ['구운몽', '사씨남정기'],
        English: ['The Cloud Dream of Nine', 'The History of Lady Sa'],
        日本語: ['九雲夢', '謝氏南征記'],
        Español: ['El Sueño de las Nueve Nubes', 'La Historia de la Señora Sa']
      }
    }
  ];

  const getPageTexts = (lang: string) => {
    const texts = {
      한국어: {
        title: '작가 소개',
        subtitle: '한국 고전문학을 빛낸 위대한 작가들의 삶과 작품 세계를 만나보세요',
        works: '대표 작품',
        ctaTitle: '작품을 직접 읽어보세요',
        ctaSubtitle: '이 위대한 작가들의 작품을 4개 언어로 만나보실 수 있습니다',
        ctaButton: '도서 목록 보기'
      },
      English: {
        title: 'Authors Introduction',
        subtitle: 'Meet the lives and literary worlds of great authors who illuminated Korean classical literature',
        works: 'Representative Works',
        ctaTitle: 'Read the works directly',
        ctaSubtitle: 'You can experience the works of these great authors in 4 languages',
        ctaButton: 'View Book List'
      },
      日本語: {
        title: '作家紹介',
        subtitle: '韓国古典文学を輝かせた偉大な作家たちの生涯と作品世界をご覧ください',
        works: '代表作品',
        ctaTitle: '作品を直接お読みください',
        ctaSubtitle: 'これらの偉大な作家の作品を4つの言語でお楽しみいただけます',
        ctaButton: '図書一覧を見る'
      },
      Español: {
        title: 'Introducción de Autores',
        subtitle: 'Conozca las vidas y mundos literarios de los grandes autores que iluminaron la literatura clásica coreana',
        works: 'Obras Representativas',
        ctaTitle: 'Lea las obras directamente',
        ctaSubtitle: 'Puede experimentar las obras de estos grandes autores en 4 idiomas',
        ctaButton: 'Ver Lista de Libros'
      }
    };
    return texts[lang] || texts['한국어'];
  };

  const pageTexts = getPageTexts(currentLanguage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* 헤더 섹션 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{pageTexts.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {pageTexts.subtitle}
          </p>
        </div>

        {/* 작가 목록 */}
        <div className="space-y-12">
          {authors.map((author) => (
            <div key={author.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {author.names?.[currentLanguage] || author.name}
                  </h2>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {author.period}
                  </span>
                </div>
                <p className="text-lg text-gray-600 mb-4">
                  {author.descriptions?.[currentLanguage] || author.description}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {author.bios?.[currentLanguage] || author.bio}
                </p>
              </div>

              {/* 대표 작품 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{pageTexts.works}</h3>
                <div className="flex flex-wrap gap-2">
                  {(author.bookTitles?.[currentLanguage] || author.books).map((book) => (
                    <span
                      key={book}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {book}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA 섹션 */}
        <div className="text-center mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {pageTexts.ctaTitle}
          </h2>
          <p className="text-gray-600 mb-8">
            {pageTexts.ctaSubtitle}
          </p>
          <Link
            href="/books"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors !rounded-button"
          >
            {pageTexts.ctaButton}
          </Link>
        </div>
      </main>
    </div>
  );
}
