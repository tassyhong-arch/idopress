#!/bin/bash

# FTP Upload Script for 이도 (IDO Press) Website
# 사용법: ./ftp-upload-script.sh [FTP_HOST] [FTP_USER] [FTP_PASSWORD]

echo "🌟 이도 웹사이트 FTP 업로드 스크립트"
echo "=================================="

# 매개변수 확인
if [ $# -ne 3 ]; then
    echo "❌ 사용법: $0 <FTP_HOST> <FTP_USER> <FTP_PASSWORD>"
    echo ""
    echo "예제: $0 ftp.yourdomain.com your_username your_password"
    echo ""
    echo "또는 매개변수 없이 실행하여 대화형 모드를 사용하세요:"
    read -p "FTP 호스트: " FTP_HOST
    read -p "FTP 사용자명: " FTP_USER
    read -s -p "FTP 비밀번호: " FTP_PASSWORD
    echo ""
else
    FTP_HOST=$1
    FTP_USER=$2
    FTP_PASSWORD=$3
fi

# 빌드 파일 존재 확인
if [ ! -d "out" ]; then
    echo "❌ 'out' 디렉토리가 없습니다. 먼저 'npm run build'를 실행하세요."
    exit 1
fi

echo ""
echo "📁 업로드할 파일 확인 중..."
echo "   - 메인 페이지: $(ls -1 out/index.html 2>/dev/null | wc -l) 개"
echo "   - CSS/JS 파일: $(find out/_next -type f | wc -l) 개"
echo "   - HTML 페이지: $(ls -1 out/*.html 2>/dev/null | wc -l) 개"

echo ""
echo "🚀 FTP 업로드 시작..."
echo "   호스트: $FTP_HOST"
echo "   사용자: $FTP_USER"

# FTP 명령어 생성
cat > ftp_commands.txt << EOF
user $FTP_USER $FTP_PASSWORD
binary
cd public_html
prompt off
mput out/*.html
mkdir _next 2>/dev/null
cd _next
lcd out/_next
mput -r *
cd ..
mkdir books 2>/dev/null
cd books
lcd ../out/books
mput *.html
cd ..
mkdir read 2>/dev/null
cd read
lcd ../out/read
mput *.html
cd ..
quit
EOF

# FTP 업로드 실행
echo "📤 파일 업로드 중..."
if ftp -v -n $FTP_HOST < ftp_commands.txt; then
    echo "✅ 업로드 완료!"
    echo ""
    echo "🌐 웹사이트 확인:"
    echo "   메인 페이지: http://$(echo $FTP_HOST | sed 's/ftp\./www\./')"
    echo ""
    echo "🎉 이도 웹사이트가 성공적으로 배포되었습니다!"
else
    echo "❌ 업로드 실패. 다음을 확인해주세요:"
    echo "   1. FTP 서버 주소가 올바른지 확인"
    echo "   2. 사용자명과 비밀번호가 올바른지 확인"
    echo "   3. public_html 디렉토리에 쓰기 권한이 있는지 확인"
    echo "   4. 방화벽이 FTP를 차단하지 않는지 확인"
    echo ""
    echo "대안: FileZilla 같은 FTP 클라이언트를 사용해보세요."
fi

# 임시 파일 정리
rm -f ftp_commands.txt

echo ""
echo "📋 수동 업로드가 필요한 경우:"
echo "   1. idopress-website-deployment.zip 파일을 다운로드"
echo "   2. 압축 해제 후 out 폴더 내용을 웹서버 루트에 업로드"
echo "   3. index.html과 _next 폴더가 같은 위치에 있어야 합니다"