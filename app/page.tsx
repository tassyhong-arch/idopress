'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // JavaScript functions for the page
    const showComingSoon = () => {
      alert('🚀 곧 서비스 예정입니다!\n\n더 나은 서비스로 찾아뵙겠습니다.');
    };

    const showContact = () => {
      alert('📧 문의사항이 있으시면 언제든 연락주세요!\n\n이메일: contact@idopress.com\n전화: 02-1234-5678');
    };

    // Make functions globally available
    (window as any).showComingSoon = showComingSoon;
    (window as any).showContact = showContact;

    // Smooth scroll for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Header scroll effect
    const handleScroll = () => {
      const header = document.querySelector('.header') as HTMLElement;
      if (header) {
        if (window.scrollY > 100) {
          header.style.background = 'rgba(255, 255, 255, 0.95)';
          header.style.backdropFilter = 'blur(10px)';
        } else {
          header.style.background = '#fff';
          header.style.backdropFilter = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fafafa;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header */
        .header {
            background: #fff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
        }

        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: #2563eb;
            text-decoration: none;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
        }

        .nav-links a {
            text-decoration: none;
            color: #666;
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: #2563eb;
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 120px 0 80px;
            text-align: center;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 300;
            margin-bottom: 1rem;
            letter-spacing: -0.02em;
        }

        .hero p {
            font-size: 1.25rem;
            opacity: 0.9;
            margin-bottom: 2rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .cta-button {
            display: inline-block;
            background: #fff;
            color: #667eea;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        /* Languages */
        .languages {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-top: 3rem;
        }

        .language-tag {
            background: rgba(255,255,255,0.2);
            padding: 0.5rem 1rem;
            border-radius: 25px;
            font-size: 0.9rem;
            backdrop-filter: blur(10px);
        }

        /* Features */
        .features {
            padding: 80px 0;
            background: #fff;
        }

        .section-title {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 300;
            margin-bottom: 3rem;
            color: #333;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        .feature-card {
            text-align: center;
            padding: 2rem;
            border-radius: 10px;
            transition: transform 0.3s;
        }

        .feature-card:hover {
            transform: translateY(-5px);
        }

        .feature-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .feature-card h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #333;
        }

        .feature-card p {
            color: #666;
            line-height: 1.5;
        }

        /* Books Section */
        .books {
            padding: 80px 0;
            background: #f8fafc;
        }

        .books-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .book-card {
            background: #fff;
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            transition: all 0.3s;
        }

        .book-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.12);
        }

        .book-emoji {
            font-size: 4rem;
            margin-bottom: 1rem;
        }

        .book-card h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #333;
        }

        .book-author {
            color: #666;
            margin-bottom: 1rem;
        }

        .book-description {
            color: #777;
            margin-bottom: 2rem;
            line-height: 1.5;
        }

        .book-languages {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }

        .lang-button {
            background: #f1f5f9;
            color: #475569;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
        }

        .lang-button:hover {
            background: #2563eb;
            color: white;
        }

        /* Stats */
        .stats {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            padding: 80px 0;
            text-align: center;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .stat-item h4 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .stat-item p {
            color: #cbd5e1;
            font-size: 1.1rem;
        }

        /* Footer */
        .footer {
            background: #fff;
            padding: 60px 0 30px;
            border-top: 1px solid #e2e8f0;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .footer-section h4 {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #333;
        }

        .footer-section p, .footer-section a {
            color: #666;
            text-decoration: none;
            line-height: 1.8;
        }

        .footer-section a:hover {
            color: #2563eb;
        }

        .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid #e2e8f0;
            color: #666;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .hero p {
                font-size: 1.1rem;
            }

            .languages {
                flex-wrap: wrap;
                gap: 1rem;
            }

            .section-title {
                font-size: 2rem;
            }

            .books-grid {
                grid-template-columns: 1fr;
            }
        }

        /* Smooth scroll */
        html {
            scroll-behavior: smooth;
        }

        /* Utility classes */
        .text-center {
            text-align: center;
        }

        .mb-2 {
            margin-bottom: 1rem;
        }
      `}</style>
      
      <div>
        {/* Header */}
        <header className="header">
          <div className="container">
            <nav className="nav">
              <a href="#" className="logo">이도</a>
              <ul className="nav-links">
                <li><a href="#books">도서</a></li>
                <li><a href="#about">소개</a></li>
                <li><a href="#contact">문의</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <h1>한국문학의 디지털 여행</h1>
            <p>천년의 문학 전통을 현대적 감각으로 재해석한 디지털 도서관입니다</p>
            <a href="#books" className="cta-button">도서 둘러보기</a>
            
            <div className="languages">
              <span className="language-tag">🇰🇷 한국어</span>
              <span className="language-tag">🇺🇸 English</span>
              <span className="language-tag">🇯🇵 日本語</span>
              <span className="language-tag">🇪🇸 Español</span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <div className="container">
            <h2 className="section-title">왜 이도인가요?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🌍</div>
                <h3>다국어 지원</h3>
                <p>한국어, 영어, 일본어, 스페인어로 우리 문학을 전 세계에</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>모바일 최적화</h3>
                <p>언제 어디서나 편안하게 읽을 수 있는 반응형 디자인</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🆓</div>
                <h3>완전 무료</h3>
                <p>회원가입 없이 모든 콘텐츠를 자유롭게 이용하세요</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💡</div>
                <h3>직관적 인터페이스</h3>
                <p>깔끔하고 사용하기 쉬운 현대적 디자인</p>
              </div>
            </div>
          </div>
        </section>

        {/* Books Section */}
        <section className="books" id="books">
          <div className="container">
            <h2 className="section-title">대표 작품</h2>
            <div className="books-grid">
              <div className="book-card">
                <div className="book-emoji">🌸</div>
                <h3>춘향전</h3>
                <p className="book-author">작자 미상</p>
                <p className="book-description">사랑과 의리가 만나는 조선시대 최고의 로맨스</p>
                <div className="book-languages">
                  <button className="lang-button" onClick={() => (window as any).showComingSoon()}>🇰🇷 한국어</button>
                  <button className="lang-button" onClick={() => (window as any).showComingSoon()}>🇺🇸 English</button>
                  <button className="lang-button" onClick={() => (window as any).showComingSoon()}>🇯🇵 日本語</button>
                  <button className="lang-button" onClick={() => (window as any).showComingSoon()}>🇪🇸 Español</button>
                </div>
              </div>

              <div className="book-card">
                <div className="book-emoji">🌊</div>
                <h3>심청전</h3>
                <p className="book-author">작자 미상</p>
                <p className="book-description">효심으로 가득한 딸의 감동적인 희생과 사랑</p>
                <div className="book-languages">
                  <button className="lang-button" onClick={() => (window as any).showComingSoon()}>🇰🇷 한국어</button>
                  <button className="lang-button" onClick={() => (window as any).showComingSoon()}>🇺🇸 English</button>
                  <button className="lang-button" onClick={() => (window as any).showComingSoon()}>🇯🇵 日本語</button>
                  <button className="lang-button" onClick={() => (window as any).showComingSoon()}>🇪🇸 Español</button>
                </div>
              </div>

              <div className="book-card">
                <div className="book-emoji">🏠</div>
                <h3>흥부전</h3>
                <p className="book-author">작자 미상</p>
                <p className="book-description">착함과 욕심의 대비로 보는 인생의 교훈</p>
                <div className="book-languages">
                  <button className="lang-button" onClick={() => (window as any).showComingSoon()}>🇰🇷 한국어</button>
                  <button className="lang-button" onClick={() => (window as any).showComingSoon()}>🇺🇸 English</button>
                  <button className="lang-button" onClick={() => (window as any).showComingSoon()}>🇯🇵 日本語</button>
                  <button className="lang-button" onClick={() => (window as any).showComingSoon()}>🇪🇸 Español</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="stats">
          <div className="container">
            <h2 className="section-title" style={{color: 'white'}}>함께하는 사람들</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <h4>10,000+</h4>
                <p>독자</p>
              </div>
              <div className="stat-item">
                <h4>4</h4>
                <p>언어</p>
              </div>
              <div className="stat-item">
                <h4>6</h4>
                <p>작품</p>
              </div>
              <div className="stat-item">
                <h4>100%</h4>
                <p>무료</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer" id="about">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h4>이도</h4>
                <p>한국 고전문학을 세계와 공유하는<br/>디지털 문학 공간입니다.</p>
              </div>
              <div className="footer-section">
                <h4>서비스</h4>
                <p><a href="#books">전자책 서비스</a></p>
                <p><a href="#" onClick={() => (window as any).showComingSoon()}>작가 소개</a></p>
                <p><a href="#" onClick={() => (window as any).showComingSoon()}>문학 해설</a></p>
              </div>
              <div className="footer-section">
                <h4>정보</h4>
                <p><a href="#" onClick={() => (window as any).showComingSoon()}>이용약관</a></p>
                <p><a href="#" onClick={() => (window as any).showComingSoon()}>개인정보처리방침</a></p>
                <p><a href="#contact" onClick={() => (window as any).showContact()}>문의하기</a></p>
              </div>
              <div className="footer-section">
                <h4>언어</h4>
                <p>🇰🇷 한국어</p>
                <p>🇺🇸 English</p>
                <p>🇯🇵 日본語</p>
                <p>🇪🇸 Español</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 이도. 모든 권리 보유.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}