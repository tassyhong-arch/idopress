# FTP 업로드 가이드 - 이도 웹사이트

## 📁 업로드할 파일들

현재 `out` 디렉토리에 완성된 정적 파일들이 준비되어 있습니다:

```
out/
├── index.html          # 메인 페이지 (이도 웹사이트)
├── about.html          # 소개 페이지
├── books.html          # 도서 목록
├── _next/              # Next.js 빌드 파일들 (CSS, JS)
├── books/              # 개별 도서 페이지들
├── read/               # 독서 페이지들
└── ... (기타 필요한 파일들)
```

## 🔧 일반적인 FTP 업로드 오류 해결법

### 1. 연결 오류 (Connection Failed)
```bash
# 문제: FTP 서버에 연결할 수 없음
# 해결법:
- FTP 서버 주소 확인 (예: ftp.yourdomain.com)
- 포트 번호 확인 (일반적으로 21, SFTP는 22)
- 방화벽 설정 확인
- 패시브 모드(Passive Mode) 활성화
```

### 2. 인증 오류 (Authentication Failed)
```bash
# 문제: 사용자명/비밀번호 오류
# 해결법:
- FTP 계정 정보 재확인
- cPanel/웹호스팅 관리 패널에서 FTP 계정 상태 확인
- 비밀번호 재설정
```

### 3. 권한 오류 (Permission Denied)
```bash
# 문제: 파일 업로드 권한 없음
# 해결법:
- public_html 또는 www 디렉토리에 업로드하는지 확인
- 디렉토리 권한 설정 (755)
- 파일 권한 설정 (644)
```

### 4. 파일 경로 문제
```bash
# 문제: 상대 경로 오류로 CSS/JS 파일 로드 실패
# 해결법:
- 전체 out 디렉토리 내용을 웹루트에 업로드
- /_next/ 디렉토리도 함께 업로드 필수
```

## 📋 단계별 FTP 업로드 절차

### 방법 1: FTP 클라이언트 사용 (권장)
1. **FileZilla 사용**:
   ```
   Host: ftp.yourdomain.com
   Username: your_ftp_username
   Password: your_ftp_password
   Port: 21
   ```

2. **업로드 순서**:
   - 먼저 index.html 파일 업로드
   - 그 다음 _next 디렉토리 전체 업로드
   - 나머지 HTML 파일들 업로드
   - books, read 디렉토리 업로드

### 방법 2: 명령줄 FTP 사용
```bash
# FTP 연결
ftp your-server.com

# 로그인 후
cd public_html
put index.html
mkdir _next
cd _next
# _next 디렉토리의 모든 파일 업로드
mput *
cd ..
# 나머지 파일들 업로드
```

## 🚨 주의사항

1. **필수 업로드 파일들**:
   - `index.html` (메인 페이지)
   - `_next/` 디렉토리 전체 (CSS, JavaScript 포함)
   - 모든 `.html` 파일들

2. **업로드 위치**:
   - 웹서버의 document root (보통 public_html, www, htdocs)

3. **파일 인코딩**:
   - UTF-8 인코딩 유지
   - 바이너리 모드로 업로드

## 🔄 대안 배포 방법

FTP 업로드가 계속 문제가 된다면:

1. **GitHub Pages** (무료)
2. **Netlify** (무료)
3. **Vercel** (무료)
4. **Cloudflare Pages** (무료)

## 📞 문제 해결이 안 될 때

만약 FTP 업로드가 계속 실패한다면, 다음 정보를 확인해 주세요:

1. 정확한 FTP 에러 메시지
2. 사용 중인 FTP 클라이언트 프로그램
3. 웹호스팅 서비스 제공업체
4. 서버 설정 정보

이 정보가 있으면 더 구체적인 해결책을 제공할 수 있습니다.