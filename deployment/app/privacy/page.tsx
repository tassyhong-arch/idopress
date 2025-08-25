'use client';

import { useState } from 'react';
import Header from '../../components/Header';

export default function PrivacyPage() {
  const [currentLanguage, setCurrentLanguage] = useState('한국어');

  const getContent = (lang: string) => {
    const content = {
      '한국어': {
        title: '개인정보처리방침',
        lastUpdated: '최종 업데이트: 2024년 1월 1일',
        sections: [
          {
            title: '1. 개인정보 수집 및 이용목적',
            content: `이도출판(이하 "회사")은 다음과 같은 목적으로 개인정보를 수집하고 이용합니다:
            
• 회원가입 및 회원관리
• 도서 서비스 제공 및 맞춤형 콘텐츠 추천
• 고객 문의 및 민원 처리
• 서비스 개선을 위한 통계 분석
• 법령상 의무 이행`
          },
          {
            title: '2. 수집하는 개인정보 항목',
            content: `회사는 다음과 같은 개인정보를 수집합니다:

▶ 회원가입 시
• 필수항목: 이메일 주소, 비밀번호, 이름
• 선택항목: 휴대폰 번호, 생년월일

▶ 서비스 이용 과정에서 자동 수집
• 접속 로그, IP주소, 쿠키, 기기정보
• 서비스 이용기록, 독서 기록`
          },
          {
            title: '3. 개인정보의 보유 및 이용기간',
            content: `회사는 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다.

• 회원탈퇴 시: 즉시 파기 (단, 관련 법령에 의해 보관이 필요한 경우 예외)
• 서비스 미이용 시: 3년 후 자동 파기
• 관련 법령에 의한 보관
  - 계약 또는 청약철회에 관한 기록: 5년
  - 소비자 불만 또는 분쟁처리에 관한 기록: 3년`
          },
          {
            title: '4. 개인정보 제3자 제공',
            content: `회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
다만, 다음의 경우에는 예외로 합니다:

• 이용자가 사전에 동의한 경우
• 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우`
          },
          {
            title: '5. 개인정보 처리 위탁',
            content: `회사는 서비스 향상을 위해 아래와 같이 개인정보 처리업무를 위탁하고 있습니다:

• 클라우드 서비스 제공: Supabase (미국)
• 웹사이트 호스팅: Vercel (미국)

위탁업체와는 개인정보보호 관련 법규의 준수, 개인정보에 관한 비밀유지, 제3자 제공 금지 및 사고시 책임부담, 위탁기간 종료시 개인정보의 반납/파기 등을 명확히 규정한 계약을 체결하고 있습니다.`
          },
          {
            title: '6. 이용자 권리와 행사방법',
            content: `이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:

• 개인정보 열람 요구
• 오류 등이 있을 경우 정정·삭제 요구
• 처리정지 요구
• 회원탈퇴 및 개인정보 삭제 요구

권리 행사는 개인정보보호법 시행령 제41조에 따라 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있습니다.`
          },
          {
            title: '7. 개인정보 보호책임자',
            content: `개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

▶ 개인정보 보호책임자
• 성명: 김이도
• 직책: 대표이사
• 연락처: privacy@ido-publishing.com
• 전화: 02-1234-5678`
          },
          {
            title: '8. 개인정보의 안전성 확보조치',
            content: `회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:

• 관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등
• 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 개인정보의 암호화, 보안프로그램 설치
• 물리적 조치: 전산실, 자료보관실 등의 접근통제`
          },
          {
            title: '9. 쿠키 운영 및 거부방법',
            content: `회사는 이용자에게 맞춤형 서비스를 제공하기 위해 쿠키를 사용합니다.

▶ 쿠키란?
웹사이트를 운영하는데 이용되는 서버(HTTP)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.

▶ 쿠키 거부 방법
브라우저 설정을 통해 쿠키 설치를 거부할 수 있으나, 거부 시 서비스 이용에 제한이 있을 수 있습니다.`
          },
          {
            title: '10. 개인정보처리방침 변경',
            content: `이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.`
          }
        ],
        contact: '개인정보 처리에 관한 문의사항이 있으시면 언제든지 연락해 주세요.',
        email: 'privacy@ido-publishing.com',
        phone: '02-1234-5678'
      },
      'English': {
        title: 'Privacy Policy',
        lastUpdated: 'Last Updated: January 1, 2024',
        sections: [
          {
            title: '1. Purpose of Personal Information Collection and Use',
            content: `Ido Publishing (hereinafter "Company") collects and uses personal information for the following purposes:
            
• Membership registration and management
• Providing book services and personalized content recommendations
• Handling customer inquiries and complaints
• Statistical analysis for service improvement
• Legal compliance`
          },
          {
            title: '2. Personal Information Items Collected',
            content: `The Company collects the following personal information:

▶ Upon membership registration
• Required: Email address, password, name
• Optional: Mobile phone number, date of birth

▶ Automatically collected during service use
• Access logs, IP address, cookies, device information
• Service usage records, reading records`
          },
          {
            title: '3. Retention and Use Period of Personal Information',
            content: `The Company destroys personal information without delay after the purpose of collection and use is achieved.

• Upon membership withdrawal: Immediate destruction (except when retention is required by law)
• Non-use of service: Automatic destruction after 3 years
• Retention by related laws
  - Records of contracts or withdrawal: 5 years
  - Records of consumer complaints or dispute resolution: 3 years`
          },
          {
            title: '4. Provision of Personal Information to Third Parties',
            content: `The Company, in principle, does not provide users' personal information to third parties.
However, exceptions are made in the following cases:

• When users have given prior consent
• When required by law or requested by investigative agencies according to legal procedures`
          },
          {
            title: '5. Personal Information Processing Consignment',
            content: `The Company outsources personal information processing as follows for service improvement:

• Cloud service provision: Supabase (USA)
• Website hosting: Vercel (USA)

We have clear contracts with outsourcing companies regarding compliance with personal information protection laws, confidentiality, prohibition of third-party provision, liability in case of accidents, and return/destruction of personal information upon contract termination.`
          },
          {
            title: '6. User Rights and Exercise Methods',
            content: `Users can exercise the following rights at any time:

• Request access to personal information
• Request correction or deletion in case of errors
• Request suspension of processing
• Request membership withdrawal and personal information deletion

Rights can be exercised through written documents, telephone, email, fax, etc., according to Article 41 of the Personal Information Protection Act Enforcement Decree.`
          },
          {
            title: '7. Personal Information Protection Officer',
            content: `We have designated a Personal Information Protection Officer as follows to take overall responsibility for personal information processing and handle complaints and damage relief related to personal information processing.

▶ Personal Information Protection Officer
• Name: Kim Ido
• Position: CEO
• Contact: privacy@ido-publishing.com
• Phone: 02-1234-5678`
          },
          {
            title: '8. Security Measures for Personal Information',
            content: `The Company takes the following measures to ensure the security of personal information:

• Administrative measures: Establishment and implementation of internal management plans, regular employee training, etc.
• Technical measures: Access control to personal information processing systems, installation of access control systems, encryption of personal information, installation of security programs
• Physical measures: Access control to computer rooms and data storage rooms`
          },
          {
            title: '9. Cookie Operation and Rejection Methods',
            content: `The Company uses cookies to provide customized services to users.

▶ What are cookies?
Small pieces of information sent by the server (HTTP) used to operate websites to the user's computer browser and sometimes stored on the user's PC hard disk.

▶ Cookie rejection method
You can refuse cookie installation through browser settings, but service use may be limited if rejected.`
          },
          {
            title: '10. Changes to Privacy Policy',
            content: `This privacy policy applies from the effective date, and when there are additions, deletions, and corrections to changes according to laws and policies, they will be announced through notices 7 days before the implementation of changes.`
          }
        ],
        contact: 'If you have any questions about personal information processing, please contact us anytime.',
        email: 'privacy@ido-publishing.com',
        phone: '02-1234-5678'
      },
      '日本語': {
        title: 'プライバシーポリシー',
        lastUpdated: '最終更新：2024年1月1日',
        sections: [
          {
            title: '1. 個人情報の収集・利用目的',
            content: `イド出版（以下「会社」）は、以下の目的で個人情報を収集・利用いたします：
            
• 会員登録及び会員管理
• 図書サービスの提供及びカスタマイズされたコンテンツ推薦
• お客様のお問い合わせ及び苦情処理
• サービス改善のための統計分析
• 法令上の義務履行`
          },
          {
            title: '2. 収集する個人情報項目',
            content: `会社は以下の個人情報を収集いたします：

▶ 会員登録時
• 必須項目：メールアドレス、パスワード、氏名
• 選択項目：携帯電話番号、生年月日

▶ サービス利用過程で自動収集
• アクセスログ、IPアドレス、クッキー、機器情報
• サービス利用記録、読書記録`
          },
          {
            title: '3. 個人情報の保有及び利用期間',
            content: `会社は個人情報の収集及び利用目的が達成された後は、該当情報を遅滞なく廃棄いたします。

• 会員退会時：即時廃棄（ただし、関連法令により保管が必要な場合は除く）
• サービス未利用時：3年後自動廃棄
• 関連法令による保管
  - 契約または申込撤回に関する記録：5年
  - 消費者の苦情または紛争処理に関する記録：3年`
          },
          {
            title: '4. 個人情報の第三者提供',
            content: `会社は原則として利用者の個人情報を第三者に提供いたしません。
ただし、以下の場合は例外とします：

• 利用者が事前に同意した場合
• 法令の規定により、または捜査目的で法令に定められた手続きと方法に従って捜査機関の要求がある場合`
          },
          {
            title: '5. 個人情報処理の委託',
            content: `会社はサービス向上のため、以下のように個人情報処理業務を委託しております：

• クラウドサービス提供：Supabase（米国）
• ウェブサイトホスティング：Vercel（米国）

委託業者とは個人情報保護関連法規の遵守、個人情報に関する秘密保持、第三者提供禁止及び事故時の責任負担、委託期間終了時の個人情報の返却・廃棄等を明確に規定した契約を締結しております。`
          },
          {
            title: '6. 利用者の権利と行使方法',
            content: `利用者はいつでも以下の権利を行使することができます：

• 個人情報閲覧要求
• 誤り等がある場合の訂正・削除要求
• 処理停止要求
• 会員退会及び個人情報削除要求

権利行使は個人情報保護法施行令第41条に従い、書面、電話、電子メール、ファックス等を通じて行うことができます。`
          },
          {
            title: '7. 個人情報保護責任者',
            content: `個人情報処理に関する業務を総括して責任を負い、個人情報処理に関連する情報主体の苦情処理及び被害救済のため、以下のように個人情報保護責任者を指定しております。

▶ 個人情報保護責任者
• 氏名：金イド
• 職責：代表取締役
• 連絡先：privacy@ido-publishing.com
• 電話：02-1234-5678`
          },
          {
            title: '8. 個人情報の安全性確保措置',
            content: `会社は個人情報の安全性確保のため、以下の措置を講じております：

• 管理的措置：内部管理計画の策定・施行、定期的な職員教育等
• 技術的措置：個人情報処理システム等のアクセス権限管理、アクセス制御システム設置、個人情報の暗号化、セキュリティプログラム設置
• 物理的措置：電算室、資料保管室等のアクセス制御`
          },
          {
            title: '9. クッキーの運用及び拒否方法',
            content: `会社は利用者にカスタマイズされたサービスを提供するためクッキーを使用いたします。

▶ クッキーとは？
ウェブサイトを運営するのに利用されるサーバー（HTTP）が利用者のコンピューターブラウザに送る少量の情報で、利用者のPCコンピューター内のハードディスクに保存されることもあります。

▶ クッキー拒否方法
ブラウザ設定を通じてクッキー設置を拒否できますが、拒否時はサービス利用に制限がある場合があります。`
          },
          {
            title: '10. プライバシーポリシーの変更',
            content: `このプライバシーポリシーは施行日から適用され、法令及び方針による変更内容の追加、削除及び訂正がある場合には、変更事項の施行7日前からお知らせを通じてお知らせいたします。`
          }
        ],
        contact: '個人情報処理に関するお問い合わせがございましたら、いつでもご連絡ください。',
        email: 'privacy@ido-publishing.com',
        phone: '02-1234-5678'
      },
      'Español': {
        title: 'Política de Privacidad',
        lastUpdated: 'Última actualización: 1 de enero de 2024',
        sections: [
          {
            title: '1. Propósito de Recopilación y Uso de Información Personal',
            content: `Ido Publishing (en adelante "Empresa") recopila y utiliza información personal para los siguientes propósitos:
            
• Registro de membresía y gestión de miembros
• Provisión de servicios de libros y recomendaciones de contenido personalizado
• Manejo de consultas y quejas de clientes
• Análisis estadístico para mejora del servicio
• Cumplimiento de obligaciones legales`
          },
          {
            title: '2. Elementos de Información Personal Recopilados',
            content: `La Empresa recopila la siguiente información personal:

▶ Al registrarse como miembro
• Obligatorio: Dirección de correo electrónico, contraseña, nombre
• Opcional: Número de teléfono móvil, fecha de nacimiento

▶ Recopilado automáticamente durante el uso del servicio
• Registros de acceso, dirección IP, cookies, información del dispositivo
• Registros de uso del servicio, registros de lectura`
          },
          {
            title: '3. Período de Retención y Uso de Información Personal',
            content: `La Empresa destruye la información personal sin demora después de que se logre el propósito de recopilación y uso.

• Al retirarse de la membresía: Destrucción inmediata (excepto cuando la retención es requerida por ley)
• No uso del servicio: Destrucción automática después de 3 años
• Retención por leyes relacionadas
  - Registros de contratos o retiro: 5 años
  - Registros de quejas de consumidores o resolución de disputas: 3 años`
          },
          {
            title: '4. Provisión de Información Personal a Terceros',
            content: `La Empresa, en principio, no proporciona información personal de usuarios a terceros.
Sin embargo, se hacen excepciones en los siguientes casos:

• Cuando los usuarios han dado consentimiento previo
• Cuando es requerido por ley o solicitado por agencias investigativas según procedimientos legales`
          },
          {
            title: '5. Consignación de Procesamiento de Información Personal',
            content: `La Empresa subcontrata el procesamiento de información personal como sigue para la mejora del servicio:

• Provisión de servicio en la nube: Supabase (EE.UU.)
• Alojamiento de sitio web: Vercel (EE.UU.)

Tenemos contratos claros con empresas subcontratistas sobre el cumplimiento de las leyes de protección de información personal, confidencialidad, prohibición de provisión a terceros, responsabilidad en caso de accidentes, y devolución/destrucción de información personal al terminar el contrato.`
          },
          {
            title: '6. Derechos del Usuario y Métodos de Ejercicio',
            content: `Los usuarios pueden ejercer los siguientes derechos en cualquier momento:

• Solicitar acceso a información personal
• Solicitar corrección o eliminación en caso de errores
• Solicitar suspensión del procesamiento
• Solicitar retiro de membresía y eliminación de información personal

Los derechos pueden ejercerse a través de documentos escritos, teléfono, correo electrónico, fax, etc., según el Artículo 41 del Decreto de Aplicación de la Ley de Protección de Información Personal.`
          },
          {
            title: '7. Oficial de Protección de Información Personal',
            content: `Hemos designado un Oficial de Protección de Información Personal como sigue para asumir la responsabilidad general del procesamiento de información personal y manejar quejas y alivio de daños relacionados con el procesamiento de información personal.

▶ Oficial de Protección de Información Personal
• Nombre: Kim Ido
• Posición: CEO
• Contacto: privacy@ido-publishing.com
• Teléfono: 02-1234-5678`
          },
          {
            title: '8. Medidas de Seguridad para Información Personal',
            content: `La Empresa toma las siguientes medidas para asegurar la seguridad de la información personal:

• Medidas administrativas: Establecimiento e implementación de planes de gestión interna, capacitación regular de empleados, etc.
• Medidas técnicas: Control de acceso a sistemas de procesamiento de información personal, instalación de sistemas de control de acceso, encriptación de información personal, instalación de programas de seguridad
• Medidas físicas: Control de acceso a salas de computadoras y salas de almacenamiento de datos`
          },
          {
            title: '9. Operación de Cookies y Métodos de Rechazo',
            content: `La Empresa utiliza cookies para proporcionar servicios personalizados a los usuarios.

▶ ¿Qué son las cookies?
Pequeñas piezas de información enviadas por el servidor (HTTP) utilizado para operar sitios web al navegador de la computadora del usuario y a veces almacenadas en el disco duro de la PC del usuario.

▶ Método de rechazo de cookies
Puede rechazar la instalación de cookies a través de la configuración del navegador, pero el uso del servicio puede estar limitado si se rechaza.`
          },
          {
            title: '10. Cambios en la Política de Privacidad',
            content: `Esta política de privacidad se aplica desde la fecha efectiva, y cuando hay adiciones, eliminaciones y correcciones a los cambios según las leyes y políticas, se anunciarán a través de avisos 7 días antes de la implementación de los cambios.`
          }
        ],
        contact: 'Si tiene alguna pregunta sobre el procesamiento de información personal, contáctenos en cualquier momento.',
        email: 'privacy@ido-publishing.com',
        phone: '02-1234-5678'
      }
    };
    return content[lang] || content['한국어'];
  };

  const content = getContent(currentLanguage);

  return (
    <div className="min-h-screen bg-white">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h1>
          <p className="text-gray-600">{content.lastUpdated}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <i className="ri-information-line text-blue-600 text-xl mt-1"></i>
            <div>
              <h3 className="font-medium text-blue-900 mb-2">이도출판 개인정보처리방침</h3>
              <p className="text-blue-800 text-sm">
                한국 고전문학을 디지털로 전하는 이도출판은 고객의 개인정보를 소중히 보호합니다. 
                본 방침을 통해 개인정보 처리 현황을 투명하게 공개합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {content.sections.map((section, index) => (
            <div key={index} className="border-b border-gray-100 pb-8 last:border-b-0">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            <i className="ri-customer-service-2-line mr-2"></i>
            문의하기
          </h3>
          <p className="text-gray-700 mb-4">{content.contact}</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <i className="ri-mail-line text-gray-500"></i>
              <span className="text-gray-700">이메일: </span>
              <a href={`mailto:${content.email}`} className="text-blue-600 hover:text-blue-800">
                {content.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-phone-line text-gray-500"></i>
              <span className="text-gray-700">전화: </span>
              <a href={`tel:${content.phone}`} className="text-blue-600 hover:text-blue-800">
                {content.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.close()}
            className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors !rounded-button"
          >
            창 닫기
          </button>
        </div>
      </div>
    </div>
  );
}