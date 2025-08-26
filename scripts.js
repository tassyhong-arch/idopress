// Mobile menu functionality
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 10px rgba(0, 0, 0, 0.05)';
        }
    });
});

// Show coming soon alert
function showComingSoon() {
    alert('🚧 서비스 준비 중입니다!\n\n곧 만나볼 수 있는 새로운 기능들:\n• 다국어 번역 서비스\n• 오디오북 기능\n• 상세 해설 및 주석\n• 개인화된 읽기 경험\n\n기대해 주세요! 🌟');
}

// Navigate to book reader
function readBook(bookName) {
    const bookUrls = {
        'chunhyang': 'read-chunhyang.html',
        'simcheong': 'read-simcheong.html', 
        'heungbu': 'read-heungbu.html',
        'jusaeng': 'read-jusaeng.html'
    };
    
    if (bookUrls[bookName]) {
        window.location.href = bookUrls[bookName];
    } else {
        showComingSoon();
    }
}

// Admin functionality
if (window.location.pathname.includes('admin.html')) {
    function showTab(tabName) {
        // Hide all tab contents
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Remove active class from all tabs
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Show selected tab content
        const selectedContent = document.getElementById(tabName + '-tab');
        if (selectedContent) {
            selectedContent.classList.add('active');
        }
        
        // Add active class to clicked tab
        const selectedTab = document.querySelector(`[onclick="showTab('${tabName}')"]`);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
    }

    function addBook() {
        const form = document.getElementById('addBookForm');
        const formData = new FormData(form);
        
        // Basic validation
        const title = formData.get('title');
        const author = formData.get('author');
        const content = formData.get('content');
        
        if (!title || !author || !content) {
            alert('모든 필수 필드를 입력해주세요.');
            return;
        }
        
        // Simulate adding book (in real implementation, this would send to server)
        alert('📚 새로운 도서가 성공적으로 추가되었습니다!\n\n제목: ' + title + '\n저자: ' + author + '\n\n관리자 승인 후 사이트에 반영됩니다.');
        
        // Reset form
        form.reset();
    }

    function previewBook() {
        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const description = document.getElementById('bookDescription').value;
        const content = document.getElementById('bookContent').value;
        
        if (!title || !author || !content) {
            alert('제목, 저자, 내용을 모두 입력해주세요.');
            return;
        }
        
        // Create preview content
        const previewContent = `
=== 도서 미리보기 ===

📖 제목: ${title}
✍️ 저자: ${author}
📝 설명: ${description || '설명 없음'}

📄 내용 미리보기:
${content.substring(0, 500)}${content.length > 500 ? '...' : ''}

=== 미리보기 끝 ===
        `;
        
        alert(previewContent);
    }

    function deleteBook(bookId) {
        if (confirm('정말로 이 도서를 삭제하시겠습니까?')) {
            // Simulate deletion (in real implementation, this would send to server)
            alert('📚 도서가 성공적으로 삭제되었습니다.');
            // In real implementation, refresh the book list
        }
    }

    function editBook(bookId) {
        alert('📝 도서 편집 기능은 곧 구현될 예정입니다.');
    }

    // Animate stats on page load
    document.addEventListener('DOMContentLoaded', function() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach((stat, index) => {
            const finalValue = parseInt(stat.textContent);
            let currentValue = 0;
            const increment = Math.ceil(finalValue / 50);
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    stat.textContent = finalValue.toLocaleString();
                    clearInterval(timer);
                } else {
                    stat.textContent = currentValue.toLocaleString();
                }
            }, 30);
        });
    });
}