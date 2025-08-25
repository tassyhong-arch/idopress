// 모바일 메뉴 토글
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// 모바일 메뉴 닫기
function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

// 서비스 준비 중 알림
function showComingSoon() {
    alert('🚀 곧 서비스 예정입니다!\n\n더 나은 서비스로 찾아뵙겠습니다.');
}

// 연락처 알림
function showContact() {
    alert('📧 문의사항이 있으시면 언제든 연락주세요!\n\n이메일: contact@idopress.com\n전화: 02-1234-5678');
}

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 앵커 링크 부드러운 스크롤
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 헤더 스크롤 효과
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#fff';
                header.style.backdropFilter = 'none';
            }
        }
    });

    // 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll('.feature-card, .book-card, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 외부 클릭 시 모바일 메뉴 닫기
    document.addEventListener('click', function(e) {
        const navLinks = document.getElementById('navLinks');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('.nav');
        
        if (nav && !nav.contains(e.target)) {
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
    });

    // 페이지 로드 시 애니메이션 지연
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero h1, .hero p, .cta-button');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 300);
});

// 초기 히어로 요소 스타일 설정
window.addEventListener('load', function() {
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .cta-button');
    heroElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
});