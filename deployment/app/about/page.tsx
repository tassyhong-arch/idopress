
'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '../../components/Header';

export default function AboutPage() {
  const [currentLanguage, setCurrentLanguage] = useState('한국어');

  const getContent = (lang: string) => {
    const content = {
      '한국어': {
        title: '이도 소개',
        subtitle: '한국의 아름다운 고전문학을 전 세계 사람들이 쉽게 접할 수 있도록 다국어로 제공하는 디지털 도서관입니다.',
        missionTitle: '우리의 미션',
        missionDesc: '한국 고전문학의 가치를 현대적으로 재해석하여, 전 세계 사람들이 한국의 정서와 지혜를 경험할 수 있도록 합니다.',
        serviceTitle: '서비스 소개',
        ctaTitle: '지금 바로 시작해보세요',
        ctaDesc: '한국 고전문학의 아름다움을 경험해보세요',
        startReading: '도서 읽기 시작하기',
        features: [
          {
            title: '다국어 지원',
            description: '한국어, 영어, 일본어, 스페인어로 고전문학을 읽을 수 있습니다.'
          },
          {
            title: '무료 이용',
            description: '회원가입 없이 모든 도서를 완전 무료로 읽을 수 있습니다.'
          },
          {
            title: '모바일 최적화',
            description: '스마트폰과 태블릿에서 편리하게 읽을 수 있도록 최적화되었습니다.'
          },
          {
            title: '사용자 친화적',
            description: '직관적인 인터페이스로 누구나 쉽게 이용할 수 있습니다.'
          }
        ],
        services: [
          {
            title: '고전문학 디지털화',
            description: '춘향전, 심청전, 흥부전 등 한국의 대표적인 고전문학 작품들을 디지털로 제공합니다.'
          },
          {
            title: '다국어 번역',
            description: '전문 번역가들이 번역한 한국어, 영어, 일본어, 스페인어 버전을 제공합니다.'
          },
          {
            title: '모바일 최적화',
            description: '언제 어디서나 편리하게 읽을 수 있도록 모바일과 태블릿에 최적화된 환경을 제공합니다.'
          }
        ],
        footerDesc: '한국 고전문학을 세계에 전하는 디지털 도서관',
        footerLinks: {
          books: '도서 목록',
          authors: '작가 소개',
          community: '커뮤니티'
        },
        footerCopyright: '2024 이도. 한국 고전문학을 세계에.'
      },
      'English': {
        title: 'About Ido',
        subtitle: 'A digital library providing Korean classical literature in multiple languages for people around the world to easily access.',
        missionTitle: 'Our Mission',
        missionDesc: 'To reinterpret the value of Korean classical literature in a modern way, allowing people around the world to experience Korean emotions and wisdom.',
        serviceTitle: 'Service Introduction',
        ctaTitle: 'Start Right Now',
        ctaDesc: 'Experience the beauty of Korean classical literature',
        startReading: 'Start Reading Books',
        features: [
          {
            title: 'Multilingual Support',
            description: 'Read classical literature in Korean, English, Japanese, and Spanish.'
          },
          {
            title: 'Free Access',
            description: 'Read all books completely free without registration.'
          },
          {
            title: 'Mobile Optimized',
            description: 'Optimized for convenient reading on smartphones and tablets.'
          },
          {
            title: 'User Friendly',
            description: 'Anyone can easily use it with an intuitive interface.'
          }
        ],
        services: [
          {
            title: 'Classical Literature Digitization',
            description: 'We provide representative Korean classical literature works such as Chunhyangjeon, Simcheongjeon, and Heungbujeon in digital format.'
          },
          {
            title: 'Multilingual Translation',
            description: 'We provide Korean, English, Japanese, and Spanish versions translated by professional translators.'
          },
          {
            title: 'Mobile Optimization',
            description: 'We provide an environment optimized for mobile and tablet so you can read conveniently anytime, anywhere.'
          }
        ],
        footerDesc: 'A digital library bringing Korean classical literature to the world',
        footerLinks: {
          books: 'Book List',
          authors: 'Authors',
          community: 'Community'
        },
        footerCopyright: '2024 Ido. Korean classical literature to the world.'
      },
      '日本語': {
        title: 'イドについて',
        subtitle: '韓国の美しい古典文学を世界中の人々が簡単に接することができるよう多言語で提供するデジタル図書館です。',
        missionTitle: '私たちのミッション',
        missionDesc: '韓国古典文学の価値を現代的に再解釈し、世界中の人々が韓国の情緒と知恵を体験できるようにします。',
        serviceTitle: 'サービス紹介',
        ctaTitle: '今すぐ始めてみてください',
        ctaDesc: '韓国古典文学の美しさを体験してみてください',
        startReading: '図書読書を始める',
        features: [
          {
            title: '多言語対応',
            description: '韓国語、英語、日本語、スペイン語で古典文学を読むことができます。'
          },
          {
            title: '無料利用',
            description: '会員登録なしですべての図書を完全無料で読むことができます。'
          },
          {
            title: 'モバイル最適化',
            description: 'スマートフォンとタブレットで便利に読めるよう最適化されています。'
          },
          {
            title: 'ユーザーフレンドリー',
            description: '直感的なインターフェースで誰でも簡単に利用できます。'
          }
        ],
        services: [
          {
            title: '古典文学デジタル化',
            description: '春香伝、沈清伝、興夫伝など韓国の代表的な古典文学作品をデジタルで提供します。'
          },
          {
            title: '多言語翻訳',
            description: '専門翻訳者が翻訳した韓国語、英語、日本語、スペイン語版を提供します。'
          },
          {
            title: 'モバイル最適化',
            description: 'いつでもどこでも便利に読めるようモバイルとタブレットに最適化された環境を提供します。'
          }
        ],
        footerDesc: '韓国古典文学を世界に伝えるデジタル図書館',
        footerLinks: {
          books: '図書リスト',
          authors: '作家紹介',
          community: 'コミュニティ'
        },
        footerCopyright: '2024 イド。韓国古典文学を世界に。'
      },
      'Español': {
        title: 'Acerca de Ido',
        subtitle: 'Una biblioteca digital que proporciona literatura clásica coreana en múltiples idiomas para que las personas de todo el mundo puedan acceder fácilmente.',
        missionTitle: 'Nuestra Misión',
        missionDesc: 'Reinterpretar el valor de la literatura clásica coreana de manera moderna, permitiendo que las personas de todo el mundo experimenten las emociones y la sabiduría coreanas.',
        serviceTitle: 'Introducción del Servicio',
        ctaTitle: 'Comienza Ahora Mismo',
        ctaDesc: 'Experimenta la belleza de la literatura clásica coreana',
        startReading: 'Comenzar a Leer Libros',
        features: [
          {
            title: 'Soporte Multilingüe',
            description: 'Lee literatura clásica en coreano, inglés, japonés y español.'
          },
          {
            title: 'Acceso Gratuito',
            description: 'Lee todos los libros completamente gratis sin registrarte.'
          },
          {
            title: 'Optimizado para Móviles',
            description: 'Optimizado para una lectura conveniente en teléfonos inteligentes y tabletas.'
          },
          {
            title: 'Amigable para el Usuario',
            description: 'Cualquiera puede usarlo fácilmente con una interfaz intuitiva.'
          }
        ],
        services: [
          {
            title: 'Digitalización de Literatura Clásica',
            description: 'Proporcionamos obras representativas de la literatura clásica coreana como Chunhyangjeon, Simcheongjeon y Heungbujeon en formato digital.'
          },
          {
            title: 'Traducción Multilingüe',
            description: 'Proporcionamos versiones en coreano, inglés, japonés y español traducidas por traductores profesionales.'
          },
          {
            title: 'Optimización Móvil',
            description: 'Proporcionamos un entorno optimizado para móviles y tabletas para que puedas leer cómodamente en cualquier momento y lugar.'
          }
        ],
        footerDesc: 'Una biblioteca digital que lleva la literatura clásica coreana al mundo',
        footerLinks: {
          books: 'Lista de Libros',
          authors: 'Autores',
          community: 'Comunidad'
        },
        footerCopyright: '2024 Ido. Literatura clásica coreana al mundo.'
      }
    };
    return content[lang] || content['한국어'];
  };

  const content = getContent(currentLanguage);

  const features = [
    'ri-global-line',
    'ri-book-open-line',
    'ri-smartphone-line',
    'ri-heart-line'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />

      {/* 히어로 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {content.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {content.subtitle}
          </p>
        </div>
      </section>

      {/* 미션 섹션 */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.missionTitle}</h2>
            <p className="text-lg text-gray-600">
              {content.missionDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${features[index]} text-xl text-blue-600`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 소개 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">{content.serviceTitle}</h2>

          <div className="space-y-8">
            {content.services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {content.ctaTitle}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {content.ctaDesc}
          </p>
          <Link
            href="/books"
            className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors !rounded-button"
          >
            {content.startReading}
          </Link>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="font-['Pacifico'] text-2xl text-white mb-4">이도</div>
            <p className="text-gray-400 mb-6">
              {content.footerDesc}
            </p>

            <div className="flex justify-center gap-8 mb-6">
              <Link href="/books" className="text-gray-400 hover:text-white transition-colors">{content.footerLinks.books}</Link>
              <Link href="/authors" className="text-gray-400 hover:text-white transition-colors">{content.footerLinks.authors}</Link>
              <Link href="/community" className="text-gray-400 hover:text-white transition-colors">{content.footerLinks.community}</Link>
            </div>

            <p className="text-gray-400 text-sm">{content.footerCopyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
