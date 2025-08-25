
'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import { useState } from 'react';

interface CommunityPost {
  id: number;
  title: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: '독후감' | '토론' | '질문' | '추천';
  book?: string;
  titles?: {
    한국어: string;
    English: string;
    日本語: string;
    Español: string;
  };
  contents?: {
    한국어: string;
    English: string;
    日本語: string;
    Español: string;
  };
}

interface Discussion {
  id: number;
  title: string;
  book: string;
  participants: number;
  messages: number;
  lastActivity: string;
  isHot: boolean;
  titles?: {
    한국어: string;
    English: string;
    日本語: string;
    Español: string;
  };
  books?: {
    한국어: string;
    English: string;
    日본語: string;
    Español: string;
  };
}

export default function CommunityPage() {
  const [currentLanguage, setCurrentLanguage] = useState('한국어');

  const recentPosts: CommunityPost[] = [
    {
      id: 1,
      title: '춘향전을 읽고 느낀 사랑의 의미',
      author: '고전애호가',
      content: '춘향과 몽룡의 사랑 이야기를 통해 진정한 사랑이 무엇인지 생각해보게 되었습니다. 신분의 차이를 넘어선 순수한 마음...',
      timestamp: '2시간 전',
      likes: 12,
      comments: 5,
      category: '독후감',
      book: '춘향전',
      titles: {
        한국어: '춘향전을 읽고 느낀 사랑의 의미',
        English: 'The Meaning of Love Felt After Reading Chunhyang',
        日本語: '春香伝を読んで感じた愛の意味',
        Español: 'El Significado del Amor Sentido Después de Leer Chunhyang'
      },
      contents: {
        한국어: '춘향과 몽룡의 사랑 이야기를 통해 진정한 사랑이 무엇인지 생각해보게 되었습니다. 신분의 차이를 넘어선 순수한 마음...',
        English: 'Through the love story of Chunhyang and Mongryong, I came to think about what true love is. A pure heart that transcends class differences...',
        日本語: '春香と夢龍の愛の物語を通じて、真の愛とは何かを考えるようになりました。身分の違いを越えた純粋な心...',
        Español: 'A través de la historia de amor de Chunhyang y Mongryong, llegué a pensar en qué es el amor verdadero. Un corazón puro que trasciende las diferencias de clase...'
      }
    },
    {
      id: 2,
      title: '심청전의 효 사상, 현대에도 유효할까요?',
      author: '문학연구생',
      content: '심청의 효심은 감동적이지만, 현대 사회에서는 어떻게 해석해야 할지 궁금합니다. 여러분의 의견을 들어보고 싶어요.',
      timestamp: '4시간 전',
      likes: 8,
      comments: 12,
      category: '토론',
      book: '심청전',
      titles: {
        한국어: '심청전의 효 사상, 현대에도 유효할까요?',
        English: 'The Filial Piety in Sim Cheong, Is It Still Valid Today?',
        日本語: '沈清伝の孝行思想、現代でも有効でしょうか？',
        Español: 'La Piedad Filial en Sim Cheong, ¿Sigue Siendo Válida Hoy?'
      },
      contents: {
        한국어: '심청의 효심은 감동적이지만, 현대 사회에서는 어떻게 해석해야 할지 궁금합니다. 여러분의 의견을 들어보고 싶어요.',
        English: 'Sim Cheong\'s filial piety is touching, but I wonder how it should be interpreted in modern society. I would like to hear your opinions.',
        日本語: '沈清の孝行心は感動的ですが、現代社会ではどのように解釈すべきか気になります。皆さんの意見を聞いてみたいです。',
        Español: 'La piedad filial de Sim Cheong es conmovedora, pero me pregunto cómo debería interpretarse en la sociedad moderna. Me gustaría escuchar sus opiniones.'
      }
    },
    {
      id: 3,
      title: '흥부전의 권선징악, 너무 단순한 건 아닐까요?',
      author: '비평가123',
      content: '착한 흥부는 복을 받고 욕심 많은 놀부는 벌을 받는다는 구조가 현실적으로는 어떨까 싶습니다.',
      timestamp: '6시간 전',
      likes: 15,
      comments: 18,
      category: '토론',
      book: '흥부전',
      titles: {
        한국어: '흥부전의 권선징악, 너무 단순한 건 아닐까요?',
        English: 'The Moral Lesson in Heungbu, Isn\'t It Too Simple?',
        日本語: '興夫伝の勧善懲悪、あまりにも単純ではないでしょうか？',
        Español: 'La Lección Moral en Heungbu, ¿No Es Demasiado Simple?'
      },
      contents: {
        한국어: '착한 흥부는 복을 받고 욕심 많은 놀부는 벌을 받는다는 구조가 현실적으로는 어떨까 싶습니다.',
        English: 'I wonder if the structure where good Heungbu is rewarded and greedy Nolbu is punished is realistic.',
        日本語: '善良な興夫は福を受け、欲深い놀부は罰を受けるという構造が現実的にはどうなのかと思います。',
        Español: 'Me pregunto si la estructura donde el bueno Heungbu es recompensado y el codicioso Nolbu es castigado es realista.'
      }
    },
    {
      id: 4,
      title: '고전문학 입문자에게 추천하는 작품',
      author: '선생님',
      content: '처음 고전문학을 접하시는 분들께 가장 읽기 쉽고 재미있는 작품들을 추천해드립니다.',
      timestamp: '1일 전',
      likes: 24,
      comments: 9,
      category: '추천',
      titles: {
        한국어: '고전문학 입문자에게 추천하는 작품',
        English: 'Recommended Works for Classical Literature Beginners',
        日本語: '古典文学入門者におすすめの作品',
        Español: 'Obras Recomendadas para Principiantes de Literatura Clásica'
      },
      contents: {
        한국어: '처음 고전문학을 접하시는 분들께 가장 읽기 쉽고 재미있는 작품들을 추천해드립니다.',
        English: 'I recommend the easiest and most interesting works for those who are first encountering classical literature.',
        日本語: '初めて古典文学に触れる方々に最も読みやすくて面白い作品をおすすめします。',
        Español: 'Recomiendo las obras más fáciles e interesantes para aquellos que se encuentran por primera vez con la literatura clásica.'
      }
    }
  ];

  const discussions: Discussion[] = [
    {
      id: 1,
      title: '춘향전 다국어 번역의 차이점',
      book: '춘향전',
      participants: 15,
      messages: 47,
      lastActivity: '30분 전',
      isHot: true,
      titles: {
        한국어: '춘향전 다국어 번역의 차이점',
        English: 'Differences in Multilingual Translation of Chunhyang',
        日本語: '春香伝多言語翻訳の違い',
        Español: 'Diferencias en la Traducción Multilingüe de Chunhyang'
      },
      books: {
        한국어: '춘향전',
        English: 'The Tale of Chunhyang',
        日本語: '春香伝',
        Español: 'La Historia de Chunhyang'
      }
    },
    {
      id: 2,
      title: '심청전의 현대적 해석',
      book: '심청전',
      participants: 8,
      messages: 23,
      lastActivity: '2시간 전',
      isHot: false,
      titles: {
        한국어: '심청전의 현대적 해석',
        English: 'Modern Interpretation of Sim Cheong',
        日本語: '沈清伝の現代的解釈',
        Español: 'Interpretación Moderna de Sim Cheong'
      },
      books: {
        한국어: '심청전',
        English: 'The Tale of Sim Cheong',
        日本語: '沈清伝',
        Español: 'La Historia de Sim Cheong'
      }
    },
    {
      id: 3,
      title: '흥부전이 주는 교훈',
      book: '흥부전',
      participants: 12,
      messages: 35,
      lastActivity: '5시간 전',
      isHot: true,
      titles: {
        한국어: '흥부전이 주는 교훈',
        English: 'Lessons from Heungbu',
        日本語: '興夫伝が与える教訓',
        Español: 'Lecciones de Heungbu'
      },
      books: {
        한국어: '흥부전',
        English: 'The Tale of Heungbu',
        日本語: '興夫伝',
        Español: 'La Historia de Heungbu'
      }
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '독후감': return 'bg-blue-100 text-blue-700';
      case '토론': return 'bg-red-100 text-red-700';
      case '질문': return 'bg-yellow-100 text-yellow-700';
      case '추천': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPageTexts = (lang: string) => {
    const texts = {
      한국어: {
        title: '커뮤니티',
        subtitle: '고전문학을 사랑하는 사람들과 함께 이야기를 나누어보세요',
        recentPosts: '최근 게시글',
        writePost: '글쓰기',
        popularDiscussions: '인기 토론',
        communityStats: '커뮤니티 현황',
        weeklyPopular: '이주의 인기 도서',
        totalMembers: '총 회원수',
        activeToday: '오늘 활성 사용자',
        totalPosts: '총 게시글',
        totalComments: '총 댓글',
        participants: '명 참여',
        messages: '개 메시지',
        readCount: '회 읽음',
        hoursAgo: '시간 전',
        dayAgo: '일 전',
        minutesAgo: '분 전',
        categories: {
          독후감: '독후감',
          토론: '토론',
          질문: '질문',
          추천: '추천'
        }
      },
      English: {
        title: 'Community',
        subtitle: 'Share stories with people who love classical literature',
        recentPosts: 'Recent Posts',
        writePost: 'Write Post',
        popularDiscussions: 'Popular Discussions',
        communityStats: 'Community Status',
        weeklyPopular: 'This Week\'s Popular Books',
        totalMembers: 'Total Members',
        activeToday: 'Active Users Today',
        totalPosts: 'Total Posts',
        totalComments: 'Total Comments',
        participants: ' participants',
        messages: ' messages',
        readCount: ' reads',
        hoursAgo: ' hours ago',
        dayAgo: ' day ago',
        minutesAgo: ' minutes ago',
        categories: {
          독후감: 'Review',
          토론: 'Discussion',
          질문: 'Question',
          추천: 'Recommendation'
        }
      },
      日本語: {
        title: 'コミュニティ',
        subtitle: '古典文学を愛する人々と一緒に話を分かち合ってみてください',
        recentPosts: '最近の投稿',
        writePost: '投稿する',
        popularDiscussions: '人気の議論',
        communityStats: 'コミュニティ現況',
        weeklyPopular: '今週の人気図書',
        totalMembers: '総会員数',
        activeToday: '今日のアクティブユーザー',
        totalPosts: '総投稿数',
        totalComments: '総コメント数',
        participants: '名参加',
        messages: '個メッセージ',
        readCount: '回読了',
        hoursAgo: '時間前',
        dayAgo: '日前',
        minutesAgo: '分前',
        categories: {
          독후감: '読書感想文',
          토론: '議論',
          질문: '質問',
          추천: '推薦'
        }
      },
      Español: {
        title: 'Comunidad',
        subtitle: 'Comparte historias con personas que aman la literatura clásica',
        recentPosts: 'Publicaciones Recientes',
        writePost: 'Escribir Publicación',
        popularDiscussions: 'Discusiones Populares',
        communityStats: 'Estado de la Comunidad',
        weeklyPopular: 'Libros Populares de Esta Semana',
        totalMembers: 'Total de Miembros',
        activeToday: 'Usuarios Activos Hoy',
        totalPosts: 'Total de Publicaciones',
        totalComments: 'Total de Comentarios',
        participants: ' participantes',
        messages: ' mensajes',
        readCount: ' lecturas',
        hoursAgo: ' horas atrás',
        dayAgo: ' día atrás',
        minutesAgo: ' minutos atrás',
        categories: {
          독후감: 'Reseña',
          토론: 'Discusión',
          질문: 'Pregunta',
          추천: 'Recomendación'
        }
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{pageTexts.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {pageTexts.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 최근 게시글 */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{pageTexts.recentPosts}</h2>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors !rounded-button">
                  {pageTexts.writePost}
                </button>
              </div>

              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                          {pageTexts.categories[post.category]}
                        </span>
                        {post.book && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            {post.book}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {post.timestamp.includes('시간') ? post.timestamp.replace('시간 전', pageTexts.hoursAgo) :
                         post.timestamp.includes('일') ? post.timestamp.replace('일 전', pageTexts.dayAgo) :
                         post.timestamp.includes('분') ? post.timestamp.replace('분 전', pageTexts.minutesAgo) :
                         post.timestamp}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                      {post.titles?.[currentLanguage] || post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.contents?.[currentLanguage] || post.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <i className="ri-user-line"></i>
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-heart-line"></i>
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-chat-3-line"></i>
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 사이드바 */}
          <div className="space-y-8">
            {/* 인기 토론 */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{pageTexts.popularDiscussions}</h3>
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm hover:text-blue-600 cursor-pointer">
                        {discussion.titles?.[currentLanguage] || discussion.title}
                      </h4>
                      {discussion.isHot && (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">HOT</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      {discussion.books?.[currentLanguage] || discussion.book}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>
                        {discussion.participants}{pageTexts.participants} · {discussion.messages}{pageTexts.messages}
                      </span>
                      <span>
                        {discussion.lastActivity.includes('시간') ? discussion.lastActivity.replace('시간 전', pageTexts.hoursAgo) :
                         discussion.lastActivity.includes('분') ? discussion.lastActivity.replace('분 전', pageTexts.minutesAgo) :
                         discussion.lastActivity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 통계 */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{pageTexts.communityStats}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{pageTexts.totalMembers}</span>
                  <span className="font-bold text-gray-900">1,247명</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{pageTexts.activeToday}</span>
                  <span className="font-bold text-gray-900">156명</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{pageTexts.totalPosts}</span>
                  <span className="font-bold text-gray-900">3,482개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{pageTexts.totalComments}</span>
                  <span className="font-bold text-gray-900">8,756개</span>
                </div>
              </div>
            </section>

            {/* 인기 도서 */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{pageTexts.weeklyPopular}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">1. {currentLanguage === '한국어' ? '춘향전' : 
                    currentLanguage === 'English' ? 'The Tale of Chunhyang' :
                    currentLanguage === '日本語' ? '春香伝' : 'La Historia de Chunhyang'}</span>
                  <span className="text-sm text-gray-500">847{pageTexts.readCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">2. {currentLanguage === '한국어' ? '심청전' : 
                    currentLanguage === 'English' ? 'The Tale of Sim Cheong' :
                    currentLanguage === '日本語' ? '沈清伝' : 'La Historia de Sim Cheong'}</span>
                  <span className="text-sm text-gray-500">623{pageTexts.readCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">3. {currentLanguage === '한국어' ? '흥부전' : 
                    currentLanguage === 'English' ? 'The Tale of Heungbu' :
                    currentLanguage === '日本語' ? '興夫伝' : 'La Historia de Heungbu'}</span>
                  <span className="text-sm text-gray-500">456{pageTexts.readCount}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
