
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useBooksStore } from '../../../lib/booksStore';

interface EbookReaderProps {
  bookId: string;
}

export default function EbookReader({ bookId }: EbookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('한국어');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { books } = useBooksStore();

  // Refs for cleanup and mounting check
  const mountedRef = useRef(false);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchStartTime = useRef<number>(0);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  // Mount status management with proper cleanup
  useEffect(() => {
    mountedRef.current = true;
    setIsMounted(true);

    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Safe state update function
  const safeSetState = (updateFn: () => void) => {
    if (mountedRef.current) {
      updateFn();
    }
  };

  // 기본 다국어 콘텐츠 (기존 고전 도서들)
  const defaultBookContent = {
    chunhyang: {
      title: {
        '한국어': '춘향전',
        'English': 'The Tale of Chunhyang',
        '日本語': '春香伝',
        'Español': 'La Historia de Chunhyang'
      },
      content: {
        '한국어': [
          "제1장 - 춘향과 몽룡의 만남\n\n조선 후기 남원 땅에 춘향이라는 기생의 딸이 있었다. 춘향은 용모가 아름답고 마음씨도 착했다. 어느 봄날, 춘향이 그네를 타고 있을 때 한양에서 내려온 이몽룡이 그 모습을 보고 한눈에 반하게 되었다.\n\n이몽룡은 남원 부사의 아들로, 풍채가 좋고 학문이 뛰어난 청년이었다. 두 사람은 첫 만남부터 서로에게 깊은 인상을 받았고, 자주 만나게 되면서 사랑에 빠지게 되었다.",
          "제2장 - 사랑의 맹세\n\n춘향과 몽룡은 비밀리에 혼례를 올렸다. 비록 정식 혼례는 아니었지만, 두 사람의 마음만큼은 진심이었다. 그들은 서로를 향한 변치 않는 사랑을 맹세했다.\n\n'춘향아, 비록 지금은 신분이 다르지만 언젠가는 당당하게 너를 아내로 맞이하겠다.'\n'도련님, 저는 어떤 시련이 와도 도련님만을 기다리겠습니다.'",
          "제3장 - 이별과 시련\n\n몽룡의 아버지가 한양으로 전임되면서 몽룡도 함께 떠나야 했다. 이별의 아픔 속에서도 두 사람은 재회를 약속했다. 하지만 새로 부임한 변학도는 춘향의 미모에 반해 첩으로 삼으려 했고, 춘향은 이를 거절하며 옥에 갇히게 되었다.",
          "제4장 - 재회와 해피엔딩\n\n과거에 급제한 몽룡은 암행어사가 되어 남원으로 돌아왔다. 춘향이 옥에 갇혀 있다는 소식을 듣고 분노한 몽룡은 변학도를 처벌하고 춘향을 구해냈다. 두 사람은 마침내 정식으로 혼례를 올리고 행복하게 살았다는 이야기가 전해진다."
        ],
        'English': [
          "Chapter 1 - The Meeting of Chunhyang and Mongryong\n\nIn the late Joseon period, in the land of Namwon, there lived Chunhyang, the daughter of a gisaeng. Chunhyang was very beautiful and kind-hearted. One spring day, when Chunhyang was swinging, Lee Mongryong, who had come down from Hanyang, saw her and fell in love at first sight.\n\nMongryong was the son of the Namwon magistrate, a handsome young man with excellent scholarship. From their first meeting, the two were deeply impressed with each other and gradually fell in love.",
          "Chapter 2 - The Vow of Love\n\nChunhyang and Mongryong held a secret wedding ceremony. Although it was not an official wedding, their hearts were sincere. They vowed unchanging love for each other.\n\n'Chunhyang, although we have different social standings now, someday I will proudly make you my wife.'\n'Young master, no matter what trials come, I will wait only for you.'",
          "Chapter 3 - Separation and Trials\n\nWhen Mongryong's father was transferred to Hanyang, Mongryong had to leave with him. Despite the pain of separation, the two promised to meet again. However, the newly appointed Byeon Hakdo fell for Chunhyang's beauty and tried to make her his concubine, but Chunhyang refused and was imprisoned.",
          "Chapter 4 - Reunion and Happy Ending\n\nMongryong, who passed the state examination, became a secret royal inspector and returned to Namwon. When he heard that Chunhyang was imprisoned, the angry Mongryong punished Byeon Hakdo and rescued Chunhyang. The two finally held an official wedding ceremony and lived happily ever after."
        ],
        '日本語': [
          "第1章 - 春香と夢龍の出会い\n\n朝鮮後期、南原の地に春香という妓生の娘がいた。春香は容貌が非常に美しく、心根も優しかった。ある春の日、春香がブランコに乗っているとき、漢陽から下ってきた李夢龍がその姿を見て一目で恋に落ちた。\n\n夢龍は南原府使の息子で、風采が良く学問に優れた青年だった。二人は初対面から互いに深い印象を受け、頻繁に会うようになって愛に落ちた.",
          "第2章 - 愛の誓い\n\n春香と夢龍は密かに婚礼を挙げた。正式な婚礼ではなかったが、二人の心だけは真実だった。彼らは互いへの変わらぬ愛を誓った。\n\n'春香よ、今は身分が違うが、いつかは堂々と君を妻に迎えよう。'\n'若様、私はどんな試練が来ても若様だけをお待ちします。'",
          "第3章 - 別れと試練\n\n夢龍の父が漢陽に転任することになり、夢龍も一緒に去らなければならなかった。別れの痛みの中でも、二人は再会を約束した。しかし 新しく赴任した卞学道は春香の美貌に心を奪われ、側室にしようとしたが、春香はこれを拒否して牢獄に入れられた。",
          "第4章 - 再会とハッピーエンド\n\n科挙に及第した夢龍は暗行御史となって南原に戻ってきた。春香が牢に入れられているという知らせを聞いて怒った夢龍は卞学道を処罰し、春香を救い出した。二人はついに正式に婚礼を挙げ、幸せに暮らしたという話が伝えられている。"
        ],
        'Español': [
          "Capítulo 1 - El Encuentro de Chunhyang y Mongryong\n\nEn el período tardío de Joseon, en la tierra de Namwon, vivía Chunhyang, la hija de una gisaeng. Chunhyang era muy hermosa y de buen corazón. Un día de primavera, cuando Chunhyang se columpiaba, Lee Mongryong, que había venido de Hanyang, la vio y se enamoró a primera vista.\n\nMongryong era el hijo del magistrado de Namwon, un joven apuesto con excelente erudición. Desde su primer encuentro, los dos se impresionaron profundamente el uno al otro y gradualmente se enamoraron.",
          "Capítulo 2 - El Voto de Amor\n\nChunhyang y Mongryong celebraron una ceremonia de boda secreta. Aunque no era una boda oficial, sus corazones eran sinceros. Se prometieron amor inmutable el uno al otro.\n\n'Chunhyang, aunque ahora tenemos diferentes posiciones sociales, algún día te haré orgullosamente mi esposa.'\n'Joven maestro, sin importar qué pruebas vengan, esperaré solo por ti.'",
          "Capítulo 3 - Separación y Pruebas\n\nCuando el padre de Mongryong fue transferido a Hanyang, Mongryong tuvo que irse con él. A pesar del dolor de la separación, los dos prometieron encontrarse de nuevo. Sin embargo, el recién nombrado Byeon Hakdo se enamoró de la belleza de Chunhyang y trató de hacerla su concubina, pero Chunhyang se negó y fue encarcelada.",
          "Capítulo 4 - Reencuentro y Final Feliz\n\nMongryong, quien aprobó el examen estatal, se convirtió en inspector real secreto y regresó a Namwon. Cuando se enteró de que Chunhyang estaba encarcelada, el enojado Mongryong castigó a Byeon Hakdo y rescató a Chunhyang. Los dos finalmente celebraron una ceremonia de boda oficial y vivieron felices para siempre."
        ]
      }
    },
    simcheong: {
      title: {
        '한국어': '심청전',
        'English': 'The Tale of Sim Cheong',
        '日本語': '沈清伝',
        'Español': 'La Historia de Sim Cheong'
      },
      content: {
        '한국어': [
          "제1장 - 심청의 탄생\n\n옛날 황해도 황주에 심학규라는 맹인이 살고 있었다. 그의 아내 곽씨 부인이 아이를 낳다가 세상을 떠나게 되었다. 태어난 아이가 바로 심청이었다. 아버지는 앞을 보지 못하고, 어머니는 없으니 심청은 어려서부터 온갖 고생을 다했다.\n\n그러나 심청은 아버지를 지극정성으로 모셨다. 남의 집 일이 도와가며 품삯을 받아 아버지를 봉양했고, 항상 밝고 착한 마음을 잃지 않았다.",
          "제2장 - 공양미 삼백 석\n\n어느 날 심학규가 길을 가다가 개천에 빠졌는데, 지나가던 스님이 구해주었다. 스님은 '부처님께 공양미 삼백 석을 바치면 눈을뜰 수 있을 것'이라고 했다.\n\n심청은 아버지의 눈을 뜨게 하기 위해 인당수에 제물로 바쳐질 사람을 구한다는 뱃사람들에게 자신을 팔았다. 공양미 삼백 석을 받고 심청은 바다에 몸을 던질 각오를 했다.",
          "제3장 - 인당수에 몸을 던지다\n\n심청은 아버지에게 작별인사를 하고 배를 타고 인당수로 향했다. 바다 한가운데서 심청은 아버지의 눈이 밝아지기를 빌며 깊은 바다 속으로 몸을 던졌다.\n\n그런데 놀랍게도 심청은 용궁에 도착했다. 용왕이 심청의 효심에 감동하여 그녀를 다시 세상으로 보내기로 했다.",
          "제4장 - 환생과 해피엔딩\n\n심청은 연꽃 속에서 다시 태어나 왕후가 되었다. 그리고 맹인잔치를 열어 아버지를 찾았다. 아버지는 딸의 목소리를 듣고 너무 기뻐서 눈을뜨게 되었다. 부녀가 재회하며 행복하게 살았다는 아름다운 이야기이다."
        ],
        'English': [
          "Chapter 1 - The Birth of Sim Cheong\n\nLong ago, in Hwangju, Hwanghae Province, lived a blind man named Sim Hak-gyu. His wife, Lady Gwak, died while giving birth to a child. The child born was Sim Cheong. With a blind father and no mother, Sim Cheong endured all kinds of hardships from a young age.\n\nHowever, Sim Cheong served her father with utmost devotion. She helped with work at other people's houses to earn wages to support her father, and always maintained a bright and kind heart.",
          "Chapter 2 - Three Hundred Sacks of Rice Offering\n\nOne day, while Sim Hak-gyu was walking, he fell into a stream, and a passing monk rescued him. The monk said, 'If you offer three hundred sacks of rice to Buddha, you will be able to see.'\n\nTo restore her father's sight, Sim Cheong sold herself to sailors who were looking for someone to offer as a sacrifice at Indangsu. Receiving three hundred sacks of rice as offering, Sim Cheong prepared to throw herself into the sea.",
          "Chapter 3 - Throwing Herself into Indangsu\n\nSim Cheong bid farewell to her father and boarded a ship bound for Indangsu. In the middle of the sea, Sim Cheong prayed for her father's sight to be restored and threw herself into the deep sea.\n\nSurprisingly, Sim Cheong arrived at the Dragon Palace. The Dragon King was moved by Sim Cheong's filial piety and decided to send her back to the world.",
          "Chapter 4 - Reincarnation and Happy Ending\n\nSim Cheong was reborn from a lotus flower and became a queen. She held a feast for blind people to find her father. Her father was so overjoyed to hear his daughter's voice that his sight was restored. It is a beautiful story of a father and daughter reuniting and living happily together."
        ],
        '日本語': [
          "第1章 - 沈清の誕生\n\n昔、黄海道黄州に沈学規という盲人が住んでいた。那の妻郭氏夫人が子供を産んで世を去ることになった。生まれた子供がまさに沈清だった。父は目が見えず、母はいないので、沈清は幼い頃からあらゆる苦労をした。\n\nしかし沈清は父を心を込めて仕えた。他人の家の仕事を手伝って賃金をもらい父を養い、いつも明るく善良な心を失わなかった。",
          "第2章 - 供養米三百石\n\nある日、沈学規が道を歩いていて小川に落ちたが、通りかかった僧侶が救ってくれた。僧侶は「仏様に供養米三百石を捧げれば目を開くことができるだろう」と言った。\n\n沈清は父の目を開かせるために、仁堂水に供物として捧げる人を探している船员たちに自分を売った。供養米三百石を受け取って沈清は海に身を投げる覚悟をした。",
          "第3章 - 仁堂水に身を投げる\n\n沈清は父に別れの挨拶をして船に乗って仁堂水に向かった。海の真ん中で沈清は父の目が明るくなることを願って深い海の中に身を投げた。\n\nところが驚くことに沈清は龍宮に到着した。龍王が沈清の孝行心に感動してもう一度世の中に送ることにした。",
          "第4章 - 転生とハッピーエンド\n\n沈清は蓮の花の中で再び生まれて王妃になった。そして盲人の宴会を開いて父を探した。父は娘の声を聞いてとても喜んで目を開くことになった。父娘が再会して幸せに暮らしたという美しい話である。"
        ],
        'Español': [
          "Capítulo 1 - El Nacimiento de Sim Cheong\n\nHace mucho tiempo, en Hwangju, provincia de Hwanghae, vivía un hombre ciego llamado Sim Hak-gyu. Su esposa, la señora Gwak, murió al dar a luz a un niño. El niño que nació fue Sim Cheong. Con un padre ciego y sin madre, Sim Cheong soportó todo tipo de dificultades desde una edad temprana.\n\nSin embargo, Sim Cheong sirvió a su padre con la máxima devoción. Ayudaba con el trabajo en las casas de otras personas para ganar salarios para mantener a su padre, y siempre mantuvo un corazón brillante y bondadoso.",
          "Capítulo 2 - Trescientos Sacos de Arroz como Ofrenda\n\nUn día, mientras Sim Hak-gyu caminaba, se cayó en un arroyo, y un monje que pasaba lo rescató. El monje dijo: 'Si ofreces trescientos sacos de arroz a Buda, podrás ver.'\n\nPara restaurar la vista de su padre, Sim Cheong se vendió a marineros que buscaban a alguien para ofrecer como sacrificio en Indangsu. Recibiendo trescientos sacos de arroz como ofrenda, Sim Cheong se preparó para arrojarse al mar.",
          "Capítulo 3 - Arrojándose a Indangsu\n\nSim Cheong se despidió de su padre y abordó un barco con destino a Indangsu. En medio del mar, Sim Cheong oró para que la vista de su padre fuera restaurada y se arrojó al mar profundo.\n\nSorprendentemente, Sim Cheong llegó al Palacio del Dragón. El Rey Dragón se conmovió por la piedad filial de Sim Cheong y decidió enviarla de vuelta al mundo.",
          "Capítulo 4 - Reencarnación y Final Feliz\n\nSim Cheong renació de una flor de loto y se convirtió en reina. Organizó una fiesta para personas ciegas para encontrar a su padre. Su padre se alegró tanto de escuchar la voz de su hija que su vista fue restaurada. Es una hermosa historia de un padre e hija que se reencuentran y viven felices juntos."
        ]
      }
    },
    heungbu: {
      title: {
        '한국어': '흥부전',
        'English': 'The Tale of Heungbu',
        '日本語': '興夫伝',
        'Español': 'La Historia de Heungbu'
      },
      content: {
        '한국어': [
          "제1장 - 형제의 성격\n\n옛날에 흥부와 놀부라는 형제가 살았다. 형인 놀부는 매우 욕심이 많고 인색했으며, 동생인 흥부는 마음씨가 착하고 베풀기를 좋아했다.\n\n부모가 돌아가신 후, 놀부는 재산을 모두 차지하고 흥부에게는 아무것도 주지 않았다. 흥부는 가난하지만 아내와 자식들과 함께 열심히 살아갔다.",
          "제2장 - 제비를 구하다\n\n어느 봄날, 흥부는 다리가 부러진 제비 한 마리를 발견했다. 흥부는 정성껏 제비를 치료해주고 보살펴 주었다. 제비는 다리가 나은 후 감사하며 남쪽으로 날아갔다.\n\n가을이 되자 그 제비가 박씨 하나를 물고 돌아왔다. 흥부는 그 박씨를 정성껏 심어 키웠다.",
          "제3장 - 박에서 나온 보물\n\n박이 크게 자란 후, 흥부는 박을 톱으로 잘랐다. 그런데 박 속에서 금은보화와 쌀, 비단 등 온갖 보물이 쏟아져 나왔다. 흥부 가족은 하루아침에 부자가 되었다.\n\n이 소식을 들은 놀부는 질투심에 불타서 자신도 제비를 구해 박씨를 얻으려고 했다.",
          "제4장 - 놀부의 욕심과 벌\n\n놀부는 일부러 제비의 다리를 부러뜨렸다가 치료해주었다. 제비는 놀부에게도 박씨를 가져다주었다. 놀부는 기뻐하며 박을 잘랐지만, 박에서는 도깨بي들이 나와 놀부를 혼내주고 재산을 모두 가져갔다.\n\n결국 착한 흥부는 부자가 되고, 욕심 많은 놀부는 가난해져서 형제의 운명이 바뀌었다는 권선징악의 이야기이다."
        ],
        'English': [
          "Chapter 1 - The Brothers' Characters\n\nLong ago, there lived two brothers named Heungbu and Nolbu. The older brother Nolbu was very greedy and stingy, while the younger brother Heungbu was kind-hearted and liked to give.\n\nAfter their parents passed away, Nolbu took all the property and gave nothing to Heungbu. Though poor, Heungbu lived diligently with his wife and children.",
          "Chapter 2 - Saving a Swallow\n\nOne spring day, Heungbu found a swallow with a broken leg. Heungbu carefully treated and cared for the swallow. After its leg healed, the swallow flew south with gratitude.\n\nWhen autumn came, that swallow returned carrying a gourd seed. Heungbu planted and carefully grew that gourd seed.",
          "Chapter 3 - Treasures from the Gourd\n\nAfter the gourd grew large, Heungbu cut it with a saw. But from inside the gourd poured out gold, silver, jewels, rice, silk, and all kinds of treasures. The Heungbu family became rich overnight.\n\nHearing this news, Nolbu burned with jealousy and also tried to save a swallow to get gourd seeds.",
          "Chapter 4 - Nolbu's Greed and Punishment\n\nNolbu deliberately broke a swallow's leg and then treated it. The swallow also brought gourd seeds to Nolbu. Nolbu joyfully cut the gourd, but goblins came out of the gourd, punished Nolbu, and took away all his property.\n\nIn the end, kind Heungbu became rich while greedy Nolbu became poor, showing how the brothers' fates were reversed in this tale of good rewarded and evil punished."
        ],
        '日本語': [
          "第1章 - 兄弟の性格\n\n昔、興夫と놀부という兄弟が住んでいた。兄の놀부は非常に欲張りでけちで、弟の興夫は心優しく人に与えることを好んだ。\n\n両親が亡くなった後、놀부は財産をすべて独り占めし、興夫には何も与えなかった。興夫は貧しかったが妻と子供たちと一緒に一生懸命生きていった。",
          "第2章 - ツバメを救う\n\nある春の日、興夫は足の折れたツバメ一羽を発見した。興夫は心を込めてツバメを治療し世話をした。ツバメは足が治った後、感謝して南に飛んで行った。\n\n秋になるとそのツバメがひょうたんの種一つを咥えて戻ってきた。興夫はそのひょうたんの種を心を込めて植えて育てた。",
          "第3章 - ひょうたんから出た宝物\n\nひょうたんが大きく育った後、興夫はひょうたんをのこぎりで切った。するとひょうたんの中から金銀財宝と米、絹などあらゆる宝物が溢れ出てきた。興夫一家は一夜にして金持ちになった。\n\nこの知らせを聞いた놀부は嫉妬に燃えて自分もツバメを救ってひょうたんの種を得ようとした。",
          "第4章 - 놀부の欲と罰\n\n놀부はわざとツバメの足を折ってから治療してやった。ツバメは놀부にもひょうたんの種を持ってきてくれた。놀부は喜んでひょうたんを切ったが、ひょうたんからは鬼たちが出てきて놀부を懲らしめ、財産をすべて持って行った。\n\n結局善良な興夫は金持ちになり、欲張りな놀부は貧しくなって兄弟の運命が変わったという勧善懲悪の物語である。"
        ],
        'Español': [
          "Capítulo 1 - Los Caracteres de los Hermanos\n\nHace mucho tiempo, vivían dos hermanos llamados Heungbu y Nolbu. El hermano mayor Nolbu era muy codicioso y tacaño, mientras que el hermano menor Heungbu era bondadoso y le gustaba dar.\n\nDespués de que sus padres fallecieron, Nolbu tomó toda la propiedad y no le dio nada a Heungbu. Aunque pobre, Heungbu vivía diligentemente con su esposa e hijos.",
          "Capítulo 2 - Salvando una Golondrina\n\nUn día de primavera, Heungbu encontró una golondrina con una pata rota. Heungbu cuidadosamente trató y cuidó a la golondrina. Después de que su pata sanó, la golondrina voló al sur con gratitud.\n\nCuando llegó el otoño, esa golondrina regresó llevando una semilla de calabaza. Heungbu plantó y cuidadosamente cultivó esa semilla de calabaza.",
          "Capítulo 3 - Tesoros de la Calabaza\n\nDespués de que la calabaza creció grande, Heungbu la cortó con una sierra. Pero del interior de la calabaza se derramaron oro, plata, joyas, arroz, seda y todo tipo de tesoros. La familia Heungbu se hizo rica de la noche a la mañana.\n\nAl escuchar esta noticia, Nolbu se quemó de celos y también trató de salvar una golondrina para obtener semillas de calabaza.",
          "Capítulo 4 - La Codicia y el Castigo de Nolbu\n\nNolbu deliberadamente rompió la pata de una golondrina y luego la trató. La golondrina también trajo semillas de calabaza a Nolbu. Nolbu cortó alegremente la calabaza, pero salieron duendes de la calabaza, castigaron a Nolbu y se llevaron toda su propiedad.\n\nAl final, el bondadoso Heungbu se hizo rico mientras que el codicioso Nolbu se hizo pobre, mostrando cómo los destinos de los hermanos se invirtieron en esta historia de bien recompensado y mal castigado."
        ]
      }
    }
  };

  // 동적으로 도서 찾기 - 먼저 store에서, 없으면 기본 콘텐츠에서
  const getCurrentBook = () => {
    // 숫자 ID인 경우 store에서 찾기
    const numericId = parseInt(bookId);
    if (!isNaN(numericId)) {
      const storeBook = books.find(book => book.id === numericId);
      if (storeBook) {
        // store의 도서를 이북 형태로 변환
        return {
          title: {
            '한국어': storeBook.title,
            'English': storeBook.titles?.English || storeBook.title,
            '日本語': storeBook.titles?.日本語 || storeBook.title,
            'Español': storeBook.titles?.Español || storeBook.title
          },
          content: storeBook.ebookContent || {
            '한국어': [
              `${storeBook.title}의 첫 번째 장입니다.\n\n${storeBook.author}이 지은 이 작품은 ${storeBook.period} 시대의 대표적인 ${storeBook.category}입니다. 총 ${storeBook.pages}페이지로 구성되어 있으며, 현재 ${storeBook.languages.join(', ')} 언어로 제공됩니다.`,
              `${storeBook.title}의 두 번째 장입니다.\n\n이 작품은 ${storeBook.rating}점의 높은 평점을 받았으며, ${storeBook.reviews}개의 리뷰가 등록되어 있습니다. 많은 독자들이 사랑하는 작품입니다.`,
              `${storeBook.title}의 세 번째 장입니다.\n\n${storeBook.author}의 뛰어난 필력으로 그려낸 이야기는 독자들에게 깊은 감동을 선사합니다. 고전문학의 아름다움을 느낄 수 있는 작품입니다.`,
              `${storeBook.title}의 마지막 장입니다.\n\n이 작품을 통해 우리는 선조들의 지혜와 문학적 감성을 배울 수 있습니다. 앞으로도 많은 독자들에게 사랑받을 훌륭한 작품입니다.`
            ],
            'English': [
              `Chapter 1 of ${storeBook.titles?.English || storeBook.title}.\n\nThis work by ${storeBook.authors?.English || storeBook.author} is a representative ${storeBook.category} of the ${storeBook.period} period. It consists of ${storeBook.pages} pages and is available in ${storeBook.languages.join(', ')} languages.`,
              `Chapter 2 of ${storeBook.titles?.English || storeBook.title}.\n\nThis work received a high rating of ${storeBook.rating} points and has ${storeBook.reviews} registered reviews. It is a work loved by many readers.`,
              `Chapter 3 of ${storeBook.titles?.English || storeBook.title}.\n\nThe story depicted with the excellent writing skills of ${storeBook.authors?.English || storeBook.author} gives readers deep emotions. It is a work where you can feel the beauty of classical literature.`,
              `Final chapter of ${storeBook.titles?.English || storeBook.title}.\n\nThrough this work, we can learn the wisdom and literary sensibility of our ancestors. It is an excellent work that will continue to be loved by many readers.`
            ],
            '日本語': [
              `${storeBook.titles?.日本語 || storeBook.title}の第1章です。\n\n${storeBook.authors?.日本語 || storeBook.author}によるこの作品は、${storeBook.period}時代の代表的な${storeBook.category}です。全${storeBook.pages}ページで構成され、現在${storeBook.languages.join('、')}言語で提供されています。`,
              `${storeBook.titles?.日本語 || storeBook.title}の第2章です。\n\nこの作品は${storeBook.rating}点の高い評価を受け、${storeBook.reviews}件のレビューが登録されています。多くの読者に愛される作品です。`,
              `${storeBook.titles?.日本語 || storeBook.title}の第3章です。\n\n${storeBook.authors?.日本語 || storeBook.author}の優れた筆力で描かれた物語は、読者に深い感動を与えます。古典文学の美しさを感じることができる作品です。`,
              `${storeBook.titles?.日本語 || storeBook.title}の最終章です。\n\nこの作品を通じて、私たちは先祖の知恵と文学的感性を学ぶことができます。これからも多くの読者に愛され続ける素晴らしい作品です。`
            ],
            'Español': [
              `Capítulo 1 de ${storeBook.titles?.Español || storeBook.title}.\n\nEsta obra de ${storeBook.authors?.Español || storeBook.author} es un ${storeBook.category} representativo del período ${storeBook.period}. Consta de ${storeBook.pages} páginas y está disponible en ${storeBook.languages.join(', ')} idiomas.`,
              `Capítulo 2 de ${storeBook.titles?.Español || storeBook.title}.\n\nEsta obra recibió una alta calificación de ${storeBook.rating} puntos y tiene ${storeBook.reviews} reseñas registradas. Es una obra amada por muchos lectores.`,
              `Capítulo 3 de ${storeBook.titles?.Español || storeBook.title}.\n\nLa historia descrita con las excelentes habilidades de escritura de ${storeBook.authors?.Español || storeBook.author} da a los lectores emociones profundas. Es una obra donde puedes sentir la belleza de la literatura clásica.`,
              `Capítulo final de ${storeBook.titles?.Español || storeBook.title}.\n\nA través de esta obra, podemos aprender la sabiduría y la sensibilidad literaria de nuestros antepasados. Es una obra excelente que continuará siendo amada por muchos lectores.`
            ]
          }
        };
      }
    }

    // 기본 콘텐츠에서 찾기
    return defaultBookContent[bookId as keyof typeof defaultBookContent] || null;
  };

  const book = getCurrentBook();

  // URL에서 언어 파라미터 읽기 - 마운트 후에만 실행
  useEffect(() => {
    if (!isMounted || !book) return;

    // URL 파라미터 처리를 안전하게 실행
    let urlParams: URLSearchParams | null = null;

    try {
      if (typeof window !== 'undefined') {
        urlParams = new URLSearchParams(window.location.search);
      }
    } catch (error) {
      console.warn('URL parsing error:', error);
    }

    const langParam = urlParams?.get('lang');

    console.log('EbookReader - 초기화 중...');
    console.log('EbookReader - URL 언어 파라미터:', langParam);
    console.log('EbookReader - 사용 가능한 언어:', Object.keys(book.content));

    if (langParam && book.content[langParam]) {
      console.log('EbookReader - URL 언어로 설정:', langParam);
      safeSetState(() => setCurrentLanguage(langParam));
    } else {
      console.log('EbookReader - 기본 언어(한국어)로 설정');
      safeSetState(() => setCurrentLanguage('한국어'));
    }

    // 3초 후 메뉴 자동 숨김
    const timer = setTimeout(() => {
      safeSetState(() => setIsMenuOpen(false));
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [isMounted, book]);

  // Loading state for unmounted component
  if (!isMounted) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">도서를 찾을 수 없습니다</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const currentContent = book.content[currentLanguage] || book.content['한국어'];
  const currentTitle = book.title[currentLanguage] || book.title['한국어'];

  // 사용 가능한 언어 목록
  const availableLanguages = Object.keys(book.content);

  const nextPage = () => {
    if (currentPage < currentContent.length - 1) {
      safeSetState(() => {
        setCurrentPage(currentPage + 1);
        scrollToTop();
      });
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      safeSetState(() => {
        setCurrentPage(currentPage - 1);
        scrollToTop();
      });
    }
  };

  // 맨 위로 스크롤하는 함수 추가
  const scrollToTop = () => {
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // 언어 변경 핸들러 - 완전히 새로 작성하여 확실하게 작동하도록 수정
  const handleLanguageChange = (targetLanguage: string) => {
    console.log(`[언어 변경 시작] ${currentLanguage} → ${targetLanguage}`);

    // 마운트 상태 확인
    if (!mountedRef.current) {
      console.error('컴포넌트가 마운트되지 않음');
      return;
    }

    // 도서 및 콘텐츠 유효성 확인
    if (!book || !book.content) {
      console.error('도서 데이터 없음');
      return;
    }

    // 동일한 언어 체크
    if (currentLanguage === targetLanguage) {
      console.log('이미 같은 언어입니다');
      return;
    }

    // 지원 언어 확인
    if (!book.content[targetLanguage]) {
      console.error(`지원하지 않는 언어: ${targetLanguage}`);
      return;
    }

    console.log('언어 변경 진행...');

    // 새 언어의 콘텐츠 길이 확인
    const newContent = book.content[targetLanguage];
    const maxPage = newContent.length - 1;

    // 현재 페이지가 새 언어 콘텐츠 범위를 벗어나면 조정
    let newPage = currentPage;
    if (currentPage > maxPage) {
      newPage = maxPage;
      console.log(`페이지 조정: ${currentPage} → ${newPage}`);
    }

    // 상태 업데이트
    setCurrentLanguage(targetLanguage);
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }

    // 스크롤 맨 위로 이동
    setTimeout(() => {
      if (contentContainerRef.current) {
        contentContainerRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 50);

    console.log(`[언어 변경 완료] ${targetLanguage}`);
  };

  // 터치 시작 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    touchStartTime.current = Date.now();
  };

  // 터치 끝 핸들러
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return;

    const touch = e.changedTouches[0];
    const touchEndX = touch.clientX;
    const touchEndY = touch.clientY;
    const touchEndTime = Date.now();

    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;
    const timeDiff = touchEndTime - touchStartTime.current;

    // 터치 시간이 너무 길면 무시 (300ms 이상은 스크롤로 간주)
    if (timeDiff > 300) return;

    // 세로 스와이프가 더 크면 무시 (스크롤)
    if (Math.abs(diffY) > Math.abs(diffX)) return;

    // 최소 스와이프 거리를 줄임 (30px)
    if (Math.abs(diffX) < 30) return;

    // 왼쪽으로 스와이프하면 다음 페이지 (음수 diffX)
    if (diffX < 0) {
      nextPage();
    }
    // 오른쪽으로 스와이프하면 이전 页面 (양수 diffX)
    else {
      prevPage();
    }

    // 값 초기화
    touchStartX.current = 0;
    touchStartY.current = 0;
    touchStartTime.current = 0;
  };

  // 터치 취소 핸들러 추가
  const handleTouchCancel = () => {
    touchStartX.current = 0;
    touchStartY.current = 0;
    touchStartTime.current = 0;
  };

  const progress = ((currentPage + 1) / currentContent.length) * 100;

  return (
    <div className="fixed inset-0 bg-white">
      {/* 상단 메뉴바 */}
      <div className="fixed top-0 w-full h-16 bg-white/95 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between px-4 z-50">
        <Link href="/" className="p-2 rounded-lg hover:bg-gray-100 flex-shrink-0">
          <i className="ri-arrow-left-line text-xl text-gray-700"></i>
        </Link>

        <div className="flex-1 text-center mx-4">
          <h1 className="font-medium text-gray-800 truncate">{currentTitle}</h1>
          <div className="text-xs text-gray-500">{currentPage + 1} / {currentContent.length} · {currentLanguage}</div>
        </div>

        {/* 언어 변경 버튼들 - 완전히 새로운 구조 */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {availableLanguages.map((lang) => {
            const languageMap: Record<string, { flag: string; code: string }> = {
              '한국어': { flag: '🇰🇷', code: 'KR' },
              'English': { flag: '🇺🇸', code: 'US' },
              '日本語': { flag: '🇯🇵', code: 'JP' },
              'Español': { flag: '🇪🇸', code: 'ES' }
            };

            const langInfo = languageMap[lang];
            if (!langInfo) return null;

            const isSelected = currentLanguage === lang;

            return (
              <div
                key={`lang-${lang}`}
                onClick={() => {
                  console.log(`언어 버튼 클릭: ${lang}`);
                  handleLanguageChange(lang);
                }}
                className={`min-w-[44px] min-h-[36px] rounded-lg cursor-pointer select-none transition-all duration-200 flex flex-col items-center justify-center px-2 py-1 active:scale-95
                  ${isSelected
                    ? 'bg-blue-600 text-white shadow-lg scale-105 ring-2 ring-blue-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                  }
                  !rounded-button
                `}
                style={{
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none'
                }}
                role="button"
                tabIndex={0}
                aria-label={`${langInfo.code} 언어로 변경`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleLanguageChange(lang);
                  }
                }}
              >
                <span className="text-base leading-none mb-0.5" style={{ fontSize: '14px' }}>
                  {langInfo.flag}
                </span>
                <span className="text-xs font-semibold leading-none" style={{ fontSize: '8px' }}>
                  {langInfo.code}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 진행률 바 */}
      <div className="fixed top-16 w-full h-1 bg-gray-200 z-40">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-0 w-full h-20 bg-white/95 backdrop-blur-sm border-t border-gray-200 flex items-center justify-between px-6 z-40">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`p-3 rounded-full !rounded-button ${currentPage === 0 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          <i className="ri-arrow-left-s-line text-2xl"></i>
        </button>

        <div className="text-center">
          <div className="text-sm font-medium text-gray-800">{currentPage + 1} / {currentContent.length}</div>
          <div className="text-xs text-gray-500">{Math.round(progress)}% 완료</div>
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === currentContent.length - 1}
          className={`p-3 rounded-full !rounded-button ${currentPage === currentContent.length - 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          <i className="ri-arrow-right-s-line text-2xl"></i>
        </button>
      </div>

      {/* 메인 콘텐츠 */}
      <div
        className="h-full overflow-hidden select-none"
        onClick={() => safeSetState(() => setIsMenuOpen(!isMenuOpen))}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        style={{ touchAction: 'pan-y' }}
      >
        <div ref={contentContainerRef} className="h-full px-6 py-8 pt-20 pb-24 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div
              className="text-gray-800 leading-relaxed whitespace-pre-line text-lg"
              style={{
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none',
                spellCheck: 'false'
              }}
              spellCheck="false"
            >
              {currentContent[currentPage]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
