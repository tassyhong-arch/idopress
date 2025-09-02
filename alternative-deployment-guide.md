# 🚀 Alternative Deployment Solutions for IDO Press

FTP 업로드에 문제가 있는 경우, 다음과 같은 대안 배포 방법들을 사용할 수 있습니다.

## 🆓 무료 배포 플랫폼 (추천)

### 1. 🌟 Vercel (가장 추천)
**장점**: Next.js 최적화, 자동 빌드, 무료 SSL, CDN
```bash
# 설치 및 배포
npm i -g vercel
vercel --prod
```
- 자동으로 `next.config.js`의 `output: "export"` 감지
- 도메인: `https://idopress.vercel.app`
- 커스텀 도메인 연결 가능

### 2. 🔥 Netlify
**장점**: 드래그앤드롭 배포, 양식 처리, 무료 SSL
```bash
# 빌드 후 배포
npm run build
# out 폴더를 https://app.netlify.com에서 드래그앤드롭
```
- 또는 GitHub 연동으로 자동 배포
- 도메인: `https://idopress.netlify.app`

### 3. 📄 GitHub Pages
**장점**: GitHub 저장소 직접 배포, 완전 무료
```bash
# package.json에 추가
"homepage": "https://tassyhong-arch.github.io/idopress"

# 배포 스크립트
npm install --save-dev gh-pages
npm run build
npx gh-pages -d out
```

### 4. ☁️ Cloudflare Pages
**장점**: 빠른 CDN, DDoS 보호, 무료 SSL
```bash
# Wrangler CLI 설치
npm install -g wrangler

# 프로젝트 배포
npm run build
wrangler pages deploy out --project-name=idopress
```

## 🏢 프리미엄 호스팅 (유료)

### 5. 🌐 AWS S3 + CloudFront
**장점**: 확장성, 전 세계 CDN, 세밀한 제어
```bash
# AWS CLI 설치 후
aws configure
npm run build
aws s3 sync out/ s3://your-bucket-name --delete
```

### 6. 🔵 DigitalOcean App Platform
**장점**: 간단한 설정, GitHub 연동, 관리형 서비스
- GitHub 저장소 연결
- 자동 빌드 및 배포
- 월 $5부터 시작

## 🔧 기존 웹호스팅에서 FTP 대안

### 7. 📋 cPanel 파일 매니저
FTP 대신 웹 인터페이스 사용:
1. cPanel 로그인
2. 파일 매니저 열기
3. `public_html` 이동
4. `out` 폴더 내용 업로드

### 8. 🗜️ ZIP 업로드 방법
```bash
# 배포 패키지 생성
npm run build
cd out && zip -r ../idopress-deployment.zip . && cd ..

# cPanel에서:
# 1. idopress-deployment.zip 업로드
# 2. public_html에서 압축 해제
# 3. 파일들이 올바른 위치에 있는지 확인
```

## 🚦 배포 전 체크리스트

### ✅ 필수 확인사항
- [ ] `npm run build`가 성공적으로 완료됨
- [ ] `out` 디렉토리에 `index.html` 존재
- [ ] `_next` 폴더가 `index.html`과 같은 레벨에 있음
- [ ] CSS/JS 파일이 올바르게 로드됨

### 🔍 테스트 방법
```bash
# 로컬 테스트 서버 실행
cd out
python3 -m http.server 3000
# 또는
npx serve .
```

## 🎯 추천 배포 순서

### 1단계: 빠른 테스트 (5분)
→ **Netlify 드래그앤드롭**: 가장 빠르고 간단

### 2단계: 프로덕션 배포
→ **Vercel**: Next.js에 최적화된 전문 플랫폼

### 3단계: 도메인 연결
→ 원하는 플랫폼에서 커스텀 도메인 설정

## 🆘 문제 해결

### CSS/JS 파일이 로드되지 않는 경우
```bash
# next.config.js 확인
module.exports = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,  // 이 줄 추가
  assetPrefix: "./",    // 상대 경로 사용
}
```

### 한국어 인코딩 문제
- UTF-8 인코딩 유지
- 서버에서 Content-Type: text/html; charset=utf-8 설정

## 🌟 최종 추천

**가장 빠른 해결책**: Netlify 드래그앤드롭 배포
**장기적 권장**: Vercel + GitHub 연동
**기존 호스팅 유지**: cPanel 파일 매니저 + ZIP 업로드

모든 방법이 FTP보다 안정적이고 빠릅니다! 🚀