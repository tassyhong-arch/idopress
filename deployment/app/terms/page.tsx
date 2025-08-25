'use client';

import { useState } from 'react';
import Header from '../../components/Header';

export default function TermsPage() {
  const [currentLanguage, setCurrentLanguage] = useState('한국어');

  const getContent = (lang: string) => {
    const content = {
      '한국어': {
        title: '서비스 이용약관',
        lastUpdated: '최종 업데이트: 2024년 1월 1일',
        sections: [
          {
            title: '제1조 (목적)',
            content: `이 약관은 이도출판(이하 "회사")이 제공하는 한국 고전문학 디지털 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.`
          },
          {
            title: '제2조 (정의)',
            content: `이 약관에서 사용하는 용어의 정의는 다음과 같습니다:

1. "서비스"란 회사가 제공하는 한국 고전문학 디지털 도서 서비스를 말합니다.
2. "이용자"란 회사의 서비스에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
3. "회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
4. "비회원"이란 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.
5. "콘텐츠"란 회사가 서비스에서 제공하는 한국 고전문학 도서, 텍스트, 이미지, 오디오 등 일체의 정보를 말합니다.`
          },
          {
            title: '제3조 (약관의 효력 및 변경)',
            content: `① 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력을 발생합니다.

② 회사는 합리적인 사유가 발생할 경우에는 관련 법령에 위배되지 않는 범위에서 이 약관을 변경할 수 있습니다.

③ 약관이 변경되는 경우에는 변경된 약관의 내용과 시행일을 정하여, 그 시행일로부터 최소 7일 이전에 공지합니다.

④ 이용자가 변경된 약관에 동의하지 않는 경우, 이용자는 서비스 이용을 중단하고 회원탈퇴를 할 수 있습니다.`
          },
          {
            title: '제4조 (회원가입)',
            content: `① 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.

② 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다:
1. 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우
2. 실명이 아니거나 타인의 명의를 이용한 경우
3. 허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우
4. 14세 미만 아동이 법정대리인의 동의를 얻지 아니한 경우
5. 기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우

③ 회원가입계약의 성립 시기는 회사의 승낙이 회원에게 도달한 시점으로 합니다.`
          },
          {
            title: '제5조 (서비스의 제공)',
            content: `① 회사는 회원에게 아래와 같은 서비스를 제공합니다:
1. 한국 고전문학 디지털 도서 열람 서비스
2. 개인 맞춤형 도서 추천 서비스
3. 독서 기록 및 관리 서비스
4. 커뮤니티 및 독서 토론 서비스
5. 기타 회사가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해 회원에게 제공하는 일체의 서비스

② 회사는 서비스를 일정범위로 분할하여 각 범위별로 이용가능시간을 별도로 지정할 수 있습니다. 다만, 이러한 경우에는 그 내용을 사전에 공지합니다.

③ 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. Just, 회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 서비스의 제공을 일시적으로 중단할 수 있습니다.`
          },
          {
            title: '제6조 (서비스의 중단)',
            content: `① 회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.

② 제1항의 사유로 서비스의 제공이 일시적으로 중단되는 경우에는 회사는 이를 사전에 공지합니다. 다만, 회사가 통제할 수 없는 사유로 인한 서비스의 중단(운영자의 고의, 과실이 없는 디스크 장애, 시스템 다운 등)으로 인하여 사전 공지가 불가능한 경우에는 그러하지 아니합니다.`
          },
          {
            title: '제7조 (회원의 의무)',
            content: `① 이용자는 다음 행위를 하여서는 안 됩니다:
1. 신청 또는 변경시 허위 내용의 등록
2. 타인의 정보 도용
3. 회사가 게시한 정보의 변경
4. 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시
5. 회사 기타 제3자의 저작권 등 지적재산권에 대한 침해
6. 회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
7. 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 회사에 공개 또는 게시하는 행위

② 회원은 관계법령, 이 약관의 규정, 이용안내 및 서비스상에 공지한 주의사항, 회사가 통지하는 사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안됩니다.`
          },
          {
            title: '제8조 (저작권의 보호)',
            content: `① 회사가 제공하는 서비스, 그에 필요한 소프트웨어, 이미지, 마크, 로고, 디자인, 서비스명칭, 정보 및 상표 등과 관련된 지적재산권 및 기타 권리는 회사에 소유권이 있습니다.

② 이용자는 회사가 명시적으로 승인한 경우를 제외하고는 전항의 소정의 각 재산에 대한 전부 또는 일부의 수정, 대여, 대출, 판매, 배포, 제작, 양도, 재라이센스, 담보권 설정행위, 상업적 이용행위를 할 수 없으며, 제3자로 하여금 이와 같은 행위를 하도록 허락할 수 없습니다.

③ 회사는 서비스와 관련하여 이용자에게 회사가 정한 이용조건에 따라 계정, ID, 콘텐츠 등을 이용할 수 있는 이용권한만을 부여하며, 이용자는 이를 소유하거나 처분할 수 있는 권리는 갖지 않습니다.`
          },
          {
            title: '제9조 (계약해지 및 이용제한)',
            content: `① 회원은 언제든지 서비스 내 회원탈퇴 메뉴를 이용해 이용계약 해지 신청을 할 수 있으며, 회사는 관련법 등이 정하는 바에 따라 이를 즉시 처리하여야 합니다.

② 회사는 회원이 다음 각호의 사유에 해당하는 경우, 사전통지 없이 이용계약을 해지하거나 또는 기간을 정하여 서비스 이용을 제한할 수 있습니다:
1. 가입 신청 시에 허위 내용을 등록한 경우
2. 다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우
3. 서비스를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우`
          },
          {
            title: '제10조 (손해배상)',
            content: `① 회사는 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도 동 손해가 회사의 고의 또는 중대한 과실에 의한 경우를 제외하고 이에 대하여 책임을 부담하지 아니합니다.

② 회사가 회원에게 개별적으로 별도의 손해배상을 규정한 경우 그에 따릅니다.

③ 회원이 본 약관의 규정을 위반함으로 인하여 회사에 손해가 발생하게 되는 경우, 본 약관을 위반한 회원은 회사에 발생하는 모든 손해를 배상하여야 합니다.`
          },
          {
            title: '제11조 (면책조항)',
            content: `① 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.

② 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.

③ 회사는 회원이 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.

④ 회사는 회원 간 또는 회원과 제3자 상호간에 서비스를 매개로 하여 거래 등을 한 경우에는 책임을 지지 않습니다.`
          },
          {
            title: '제12조 (분쟁의 해결)',
            content: `① 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.

② 회사와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 서울중앙지방법원을 관할 법원으로 합니다.

③ 회사와 이용자간에 제기된 전자상거래 소송에는 한국법을 적용합니다.`
          }
        ],
        contact: '서비스 이용과 관련하여 문의사항이 있으시면 언제든지 연락해 주세요.',
        email: 'support@ido-publishing.com',
        phone: '02-1234-5678'
      },
      'English': {
        title: 'Terms of Service',
        lastUpdated: 'Last Updated: January 1, 2024',
        sections: [
          {
            title: 'Article 1 (Purpose)',
            content: `These terms aim to stipulate the rights, obligations, and responsibilities between the company and users regarding the use of Korean classical literature digital services (hereinafter "Service") provided by Ido Publishing (hereinafter "Company").`
          },
          {
            title: 'Article 2 (Definitions)',
            content: `The definitions of terms used in these terms are as follows:

1. "Service" refers to the Korean classical literature digital book service provided by the Company.
2. "User" refers to members and non-members who access the Company's service and receive services provided by the Company according to these terms.
3. "Member" refers to a person who has registered by providing personal information to the Company and can continuously receive information from the Company and use services provided by the Company.
4. "Non-member" refers to a person who uses services provided by the Company without joining as a member.
5. "Content" refers to all information including Korean classical literature books, texts, images, audio, etc. provided by the Company in the service.`
          },
          {
            title: 'Article 3 (Effectiveness and Changes of Terms)',
            content: `① These terms become effective by posting on the service screen or notifying members by other methods.

② The Company may change these terms within the scope that does not violate related laws when reasonable reasons arise.

③ When terms are changed, the content of the changed terms and the effective date shall be determined and announced at least 7 days before the effective date.

④ If users do not agree to the changed terms, users may discontinue service use and withdraw membership.`
          },
          {
            title: 'Article 4 (Membership Registration)',
            content: `① Users apply for membership registration by filling in member information according to the registration form set by the Company and expressing their intention to agree to these terms.

② The Company registers users who apply for membership as described in paragraph 1 as members unless they fall under any of the following:
1. When the applicant has previously lost membership qualification under these terms
2. When using a false name or another person's name
3. When registering false information or not filling in the content presented by the Company
4. When a minor under 14 years old has not obtained consent from a legal representative
5. When registration as a member is deemed to cause significant technical difficulties for the Company

③ The time of establishment of the membership registration contract is when the Company's approval reaches the member.`
          },
          {
            title: 'Article 5 (Service Provision)',
            content: `① The Company provides members with the following services:
1. Korean classical literature digital book reading service
2. Personalized book recommendation service
3. Reading record and management service
4. Community and reading discussion service
5. All other services that the Company additionally develops or provides to members through partnership agreements with other companies

② The Company may divide services into certain ranges and designate available times for each range separately. However, in such cases, the content shall be announced in advance.

③ Services are provided 24 hours a day, 365 days a year in principle. However, the Company may temporarily suspend service provision when there are significant operational reasons such as maintenance, replacement, and failure of information and communication facilities like computers, or communication interruption.`
          },
          {
            title: 'Article 6 (Service Interruption)',
            content: `① The Company may temporarily suspend service provision when reasons such as maintenance, replacement, and failure of information and communication facilities like computers, or communication interruption occur.

② When service provision is temporarily suspended for reasons in paragraph 1, the Company shall announce this in advance. However, this does not apply when advance notice is impossible due to service interruption caused by reasons beyond the Company's control (disk failure, system down, etc. without operator's intention or negligence).`
          },
          {
            title: 'Article 7 (Member Obligations)',
            content: `① Users shall not engage in the following acts:
1. Registering false content when applying or making changes
2. Stealing others' information
3. Changing information posted by the Company
4. Transmitting or posting information other than information designated by the Company (such as computer programs)
5. Infringing on intellectual property rights such as copyrights of the Company and other third parties
6. Acts that damage the reputation or interfere with the business of the Company and other third parties
7. Acts of disclosing or posting obscene or violent messages, images, voices, and other information contrary to public order and morals to the Company

② Members must comply with related laws, provisions of these terms, usage guides and precautions announced on the service, matters notified by the Company, etc., and shall not engage in other acts that interfere with the Company's business.`
          },
          {
            title: 'Article 8 (Copyright Protection)',
            content: `① The Company owns intellectual property rights and other rights related to services provided by the Company, necessary software, images, marks, logos, designs, service names, information, and trademarks.

② Users cannot modify, rent, lend, sell, distribute, produce, transfer, re-license, set security interests, or commercially use all or part of the aforementioned properties, except when the Company explicitly approves, and cannot allow third parties to engage in such acts.

③ The Company only grants users the right to use accounts, IDs, content, etc. according to usage conditions set by the Company in relation to the service, and users do not have the right to own or dispose of them.`
          },
          {
            title: 'Article 9 (Contract Termination and Usage Restrictions)',
            content: `① Members may apply for contract termination at any time using the membership withdrawal menu in the service, and the Company must process this immediately according to related laws.

② The Company may terminate the usage contract without prior notice or restrict service use for a certain period when members fall under any of the following reasons:
1. When false content is registered during membership application
2. When interfering with others' service use or stealing their information, threatening electronic commerce order
3. When using the service to engage in acts prohibited by laws or these terms or contrary to public order and morals`
          },
          {
            title: 'Article 10 (Damage Compensation)',
            content: `① The Company shall not be liable for any damages that occur to members in relation to services provided free of charge, except when such damages are caused by the Company's intention or gross negligence.

② When the Company separately stipulates individual damage compensation for members, it shall be followed.

③ When damages occur to the Company due to members violating the provisions of these terms, members who violated these terms must compensate for all damages incurred by the Company.`
          },
          {
            title: 'Article 11 (Disclaimer)',
            content: `① The Company is exempt from liability for service provision when services cannot be provided due to natural disasters or equivalent force majeure.

② The Company is not liable for service usage obstacles caused by members' attributable reasons.

③ The Company is not liable for the reliability, accuracy, etc. of information, materials, and facts posted by members on the service.

④ The Company is not liable when transactions are conducted between members or between members and third parties through the service as a medium.`
          },
          {
            title: 'Article 12 (Dispute Resolution)',
            content: `① The Company establishes and operates a damage compensation processing organization to reflect legitimate opinions or complaints raised by users and compensate for damages.

② Lawsuits regarding electronic commerce disputes between the Company and users shall have Seoul Central District Court as the competent court.

③ Korean law applies to electronic commerce lawsuits filed between the Company and users.`
          }
        ],
        contact: 'If you have any questions regarding service use, please contact us anytime.',
        email: 'support@ido-publishing.com',
        phone: '02-1234-5678'
      },
      '日本語': {
        title: 'サービス利用規約',
        lastUpdated: '最終更新：2024年1月1日',
        sections: [
          {
            title: '第1条（目的）',
            content: `この規約は、イド出版（以下「会社」）が提供する韓国古典文学デジタルサービス（以下「サービス」）の利用に関して、会社と利用者の権利、義務及び責任事項を規定することを目的とします。`
          },
          {
            title: '第2条（定義）',
            content: `この規約で使用する用語の定義は以下の通りです：

1. 「サービス」とは、会社が提供する韓国古典文学デジタル図書サービスを指します。
2. 「利用者」とは、会社のサービスにアクセスし、この規約に従って会社が提供するサービスを受ける会員及び非会員を指します。
3. 「会員」とは、会社に個人情報を提供して会員登録をした者で、会社の情報を継続的に提供され、会社が提供するサービスを継続的に利用できる者を指します。
4. 「非会員」とは、会員に加入せずに会社が提供するサービスを利用する者を指します。
5. 「コンテンツ」とは、会社がサービスで提供する韓国古典文学図書、テキスト、画像、オーディオなど一切の情報を指します。`
          },
          {
            title: '第3条（規約の効力及び変更）',
            content: `① この規約は、サービス画面に掲示するか、その他の方法で会員に公知することにより効力を発生します。

② 会社は、合理的な事由が発生した場合には、関連法令に違背しない範囲でこの規約を変更することができます。

③ 規約が変更される場合には、変更された規約の内容と施行日を定めて、その施行日から最低7日前に公知します。

④ 利用者が変更された規約に同意しない場合、利用者はサービス利用を中止し、会員退会をすることができます。`
          },
          {
            title: '第4条（会員加入）',
            content: `① 利用者は、会社が定めた加入様式に従って会員情報を記入した後、この規約に同意するという意思表示をすることにより会員加入を申請します。

② 会社は、第1項のように会員として加入することを申請した利用者のうち、次の各号に該当しない限り会員として登録します：
1. 加入申請者がこの規約により以前に会員資格を喪失したことがある場合
2. 実名でないか他人の名義を利用した場合
3. 虚偽の情報を記載するか、会社が提示する内容を記載しなかった場合
4. 14歳未満の児童が法定代理人の同意を得ていない場合
5. その他会員として登録することが会社の技術上著しく支障があると判断される場合

③ 会員加入契約の成立時期は、会社の承諾が会員に到達した時点とします。`
          },
          {
            title: '第5条（サービスの提供）',
            content: `① 会社は会員に以下のようなサービスを提供します：
1. 韓国古典文学デジタル図書閲覧サービス
2. 個人カスタマイズ図書推薦サービス
3. 読書記録及び管理サービス
4. コミュニティ及び読書討論サービス
5. その他会社が追加開発するか、他の会社との提携契約等を通じて会員に提供する一切のサービス

② 会社は、サービスを一定範囲に分割して各範囲別に利用可能時間を別途指定することができます。ただし、このような場合にはその内容を事前に公知します。

③ サービスは年中無休、1日24時間提供することを原則とします。ただし、会社はコンピューター等情報通信設備の保守点検・交換及び故障、通信途絶または運営上相当な理由がある場合、サービスの提供を一時的に中断することができます。`
          },
          {
            title: '第6条（サービスの中断）',
            content: `① 会社は、コンピューター等情報通信設備の保守点検・交換及び故障、通信の途絶等の事由が発生した場合には、サービスの提供を一時的に中断することができます。

② 第1項の事由によりサービスの提供が一時的に中断される場合には、会社はこれを事前に公知します。ただし、会社が統制できない事由によるサービスの中断（運営者の故意、過失がないディスク障害、システムダウン等）により事前公知が不可能な場合にはその限りではありません。`
          },
          {
            title: '第7条（会員の義務）',
            content: `① 利用者は次の行為をしてはなりません：
1. 申請または変更時の虚偽内容の登録
2. 他人の情報盗用
3. 会社が掲示した情報の変更
4. 会社が定めた情報以外の情報（コンピュータープログラム等）等の送信または掲示
5. 会社その他第三者の著作権等知的財産権に対する侵害
6. 会社その他第三者の名誉を損傷させるか業務を妨害する行為
7. わいせつまたは暴力的なメッセージ、画像、音声、その他公序良俗に反する情報を会社に公開または掲示する行為

② 会員は関係法令、この規約の規定、利用案内及びサービス上に公知した注意事項、会社が通知する事項等を遵守しなければならず、その他会社の業務に妨害となる行為をしてはなりません。`
          },
          {
            title: '第8条（著作権の保護）',
            content: `① 会社が提供するサービス、それに必要なソフトウェア、画像、マーク、ロゴ、デザイン、サービス名称、情報及び商標等と関連した知的財産権及びその他の権利は会社に所有権があります。

② 利用者は、会社が明示的に承認した場合を除いては、前項の所定の各財産に対する全部または一部の修正、賃貸、貸出、販売、配布、製作、譲渡、再ライセンス、担保権設定行為、商業的利用行為をすることができず、第三者にこのような行為をするよう許可することができません。

③ 会社は、サービスと関連して利用者に会社が定めた利用条件に従ってアカウント、ID、コンテンツ等を利用できる利用権限のみを付与し、利用者はこれを所有するか処分できる権利は持ちません。`
          },
          {
            title: '第9条（契約解除及び利用制限）',
            content: `① 会員はいつでもサービス内の会員退会メニューを利用して利用契約解除申請をすることができ、会社は関連法等が定めるところに従ってこれを即座に処理しなければなりません。

② 会社は、会員が次の各号の事由に該当する場合、事前通知なしに利用契約を解除するかまたは期間を定めてサービス利用を制限することができます：
1. 加入申請時に虚偽内容を登録した場合
2. 他人のサービス利用を妨害するかその情報を盗用するなど電子商取引秩序を脅威する場合
3. サービスを利用して法令またはこの規約が禁止するか公序良俗に反する行為をする場合`
          },
          {
            title: '第10条（損害賠償）',
            content: `① 会社は無料で提供されるサービスと関連して会員にいかなる損害が発生しても、同損害が会社の故意または重大な過失による場合を除いてこれに対して責任を負いません。

② 会社が会員に個別的に別途の損害賠償を規定した場合、それに従います。

③ 会員が本規約の規定に違反することにより会社に損害が発生するようになる場合、本規約に違反した会員は会社に発生するすべての損害を賠償しなければなりません。`
          },
          {
            title: '第11条（免責条項）',
            content: `① 会社は天災地変またはこれに準ずる不可抗力によりサービスを提供できない場合には、サービス提供に関する責任が免除されます。

② 会社は会員の帰責事由による、サービス利用の障害に対しては責任を負いません。

③ 会社は会員がサービスに掲載した情報、資料、事実の信頼度、正確性等の内容に関しては責任を負いません。

④ 会社は会員間または会員と第三者相互間にサービスを媒介として取引等をした場合には責任を負いません。`
          },
          {
            title: '第12条（紛争の解決）',
            content: `① 会社は利用者が提起する正当な意見や不満を反映し、その被害を補償処理するため被害補償処理機構を設置・運営します。

② 会社と利用者間に発生した電子商取引紛争に関する訴訟は、ソウル中央地方法院を管轄法院とします。

③ 会社と利用者間に提起された電子商取引訴訟には韓国法を適用します。`
          }
        ],
        contact: 'サービス利用に関してご質問がございましたら、いつでもご連絡ください。',
        email: 'support@ido-publishing.com',
        phone: '02-1234-5678'
      },
      'Español': {
        title: 'Términos de Servicio',
        lastUpdated: 'Última actualización: 1 de enero de 2024',
        sections: [
          {
            title: 'Artículo 1 (Propósito)',
            content: `Estos términos tienen como objetivo estipular los derechos, obligaciones y responsabilidades entre la empresa y los usuarios con respecto al uso de los servicios digitales de literatura clásica coreana (en adelante "Servicio") proporcionados por Ido Publishing (en adelante "Empresa").`
          },
          {
            title: 'Artículo 2 (Definiciones)',
            content: `Las definiciones de los términos utilizados en estos términos son las siguientes:

1. "Servicio" se refiere al servicio de libros digitales de literatura clásica coreana proporcionado por la Empresa.
2. "Usuario" se refiere a miembros y no miembros que acceden al servicio de la Empresa y reciben servicios proporcionados por la Empresa según estos términos.
3. "Miembro" se refiere a una persona que se ha registrado proporcionando información personal a la Empresa y puede recibir continuamente información de la Empresa y usar servicios proporcionados por la Empresa.
4. "No miembro" se refiere a una persona que usa servicios proporcionados por la Empresa sin unirse como miembro.
5. "Contenido" se refiere a toda la información incluyendo libros de literatura clásica coreana, textos, imágenes, audio, etc. proporcionados por la Empresa en el servicio.`
          },
          {
            title: 'Artículo 3 (Vigencia y Cambios de Términos)',
            content: `① Estos términos entran en vigencia al publicarse en la pantalla del servicio o notificar a los miembros por otros métodos.

② La Empresa puede cambiar estos términos dentro del alcance que no viole las leyes relacionadas cuando surjan razones razonables.

③ Cuando se cambien los términos, el contenido de los términos cambiados y la fecha efectiva se determinarán y anunciarán al menos 7 días antes de la fecha efectiva.

④ Si los usuarios no están de acuerdo con los términos cambiados, los usuarios pueden discontinuar el uso del servicio y retirar la membresía.`
          },
          {
            title: 'Artículo 4 (Registro de Membresía)',
            content: `① Los usuarios solicitan el registro de membresía llenando la información del miembro según el formulario de registro establecido por la Empresa y expresando su intención de estar de acuerdo con estos términos.

② La Empresa registra a los usuarios que solicitan membresía como se describe en el párrafo 1 como miembros a menos que caigan bajo cualquiera de los siguientes:
1. Cuando el solicitante haya perdido previamente la calificación de membresía bajo estos términos
2. Cuando use un nombre falso o el nombre de otra persona
3. Cuando registre información falsa o no llene el contenido presentado por la Empresa
4. Cuando un menor de 14 años no haya obtenido el consentimiento de un representante legal
5. Cuando el registro como miembro se considere que causa dificultades técnicas significativas para la Empresa

③ El momento de establecimiento del contrato de registro de membresía es cuando la aprobación de la Empresa llega al miembro.`
          },
          {
            title: 'Artículo 5 (Provisión del Servicio)',
            content: `① La Empresa proporciona a los miembros los siguientes servicios:
1. Servicio de lectura de libros digitales de literatura clásica coreana
2. Servicio de recomendación de libros personalizado
3. Servicio de registro y gestión de lectura
4. Servicio de comunidad y discusión de lectura
5. Todos los demás servicios que la Empresa desarrolle adicionalmente o proporcione a los miembros a través de acuerdos de asociación con otras empresas

② La Empresa puede dividir los servicios en ciertos rangos y designar tiempos disponibles para cada rango por separado. Sin embargo, en tales casos, el contenido se anunciará con anticipación.

③ Los servicios se proporcionan las 24 horas del día, los 365 días del año en principio. Sin embargo, la Empresa puede suspender temporalmente la provisión del servicio cuando haya razones operativas significativas como mantenimiento, reemplazo y falla de instalaciones de información y comunicación como computadoras, o interrupción de comunicación.`
          },
          {
            title: 'Artículo 6 (Interrupción del Servicio)',
            content: `① La Empresa puede suspender temporalmente la provisión del servicio cuando ocurran razones como mantenimiento, reemplazo y falla de instalaciones de información y comunicación como computadoras, o interrupción de comunicación.

② Cuando la provisión del servicio se suspenda temporalmente por las razones del párrafo 1, la Empresa anunciará esto con anticipación. Sin embargo, esto no se aplica cuando el aviso anticipado es imposible debido a la interrupción del servicio causada por razones fuera del control de la Empresa (falla del disco, caída del sistema, etc. sin intención o negligencia del operador).`
          },
          {
            title: 'Artículo 7 (Obligaciones del Miembro)',
            content: `① Los usuarios no deben participar en los siguientes actos:
1. Registrar contenido falso al solicitar o hacer cambios
2. Robar información de otros
3. Cambiar información publicada por la Empresa
4. Transmitir o publicar información distinta a la información designada por la Empresa (como programas de computadora)
5. Infringir derechos de propiedad intelectual como derechos de autor de la Empresa y otros terceros
6. Actos que dañen la reputación o interfieran con el negocio de la Empresa y otros terceros
7. Actos de divulgar o publicar mensajes obscenos o violentos, imágenes, voces y otra información contraria al orden público y la moral a la Empresa

② Los miembros deben cumplir con las leyes relacionadas, disposiciones de estos términos, guías de uso y precauciones anunciadas en el servicio, asuntos notificados por la Empresa, etc., y no deben participar en otros actos que interfieran con el negocio de la Empresa.`
          },
          {
            title: 'Artículo 8 (Protección de Derechos de Autor)',
            content: `① La Empresa posee derechos de propiedad intelectual y otros derechos relacionados con los servicios proporcionados por la Empresa, software necesario, imágenes, marcas, logotipos, diseños, nombres de servicios, información y marcas comerciales.

② Los usuarios no pueden modificar, alquilar, prestar, vender, distribuir, producir, transferir, re-licenciar, establecer intereses de seguridad o usar comercialmente toda o parte de las propiedades antes mencionadas, excepto cuando la Empresa apruebe explícitamente, y no pueden permitir que terceros participen en tales actos.

③ La Empresa solo otorga a los usuarios el derecho de usar cuentas, IDs, contenido, etc. según las condiciones de uso establecidas por la Empresa en relación con el servicio, y los usuarios no tienen el derecho de poseer o disponer de ellos.`
          },
          {
            title: 'Artículo 9 (Terminación del Contrato y Restricciones de Uso)',
            content: `① Los miembros pueden solicitar la terminación del contrato en cualquier momento usando el menú de retiro de membresía en el servicio, y la Empresa debe procesar esto inmediatamente según las leyes relacionadas.

② La Empresa puede terminar el contrato de uso sin aviso previo o restringir el uso del servicio por un período determinado cuando los miembros caigan bajo cualquiera de las siguientes razones:
1. Cuando se registre contenido falso durante la solicitud de membresía
2. Cuando interfiera con el uso del servicio de otros o robe su información, amenazando el orden del comercio electrónico
3. Cuando use el servicio para participar en actos prohibidos por las leyes o estos términos o contrarios al orden público y la moral`
          },
          {
            title: 'Artículo 10 (Compensación por Daños)',
            content: `① La Empresa no será responsable de ningún daño que ocurra a los miembros en relación con los servicios proporcionados gratuitamente, excepto cuando tales daños sean causados por la intención o negligencia grave de la Empresa.

② Cuando la Empresa estipule por separado compensación individual por daños para los miembros, se seguirá.

③ Cuando ocurran daños a la Empresa debido a que los miembros violen las disposiciones de estos términos, los miembros que violaron estos términos deben compensar todos los daños incurridos por la Empresa.`
          },
          {
            title: 'Artículo 11 (Exención de Responsabilidad)',
            content: `① La Empresa está exenta de la responsabilidad por la provisión del servicio cuando los servicios no puedan proporcionarse debido a desastres naturales o fuerza mayor equivalente.

② La Empresa no es responsable de los obstáculos de uso del servicio causados por razones atribuibles a los miembros.

③ La Empresa no es responsable de la confiabilidad, precisión, etc. de la información, materiales y hechos publicados por los miembros en el servicio.

④ La Empresa no es responsable cuando se realizan transacciones entre miembros o entre miembros y terceros a través del servicio como medio.`
          },
          {
            title: 'Artículo 12 (Resolución de Disputas)',
            content: `① La Empresa establece y opera una organización de procesamiento de compensación por daños para reflejar opiniones legítimas o quejas planteadas por los usuarios y compensar por daños.

② Las demandas sobre disputas de comercio electrónico entre la Empresa y los usuarios tendrán el Tribunal del Distrito Central de Seúl como tribunal competente.

③ La ley coreana se aplica a las demandas de comercio electrónico presentadas entre la Empresa y los usuarios.`
          }
        ],
        contact: 'Si tiene alguna pregunta sobre el uso del servicio, contáctenos en cualquier momento.',
        email: 'support@ido-publishing.com',
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
            <i className="ri-file-text-line text-blue-600 text-xl mt-1"></i>
            <div>
              <h3 className="font-medium text-blue-900 mb-2">이도출판 서비스 이용약관</h3>
              <p className="text-blue-800 text-sm">
                한국 고전문학을 디지털로 전하는 이도출판의 서비스 이용에 관한 약관입니다. 
                회원가입 및 서비스 이용 전 반드시 확인해 주세요.
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