
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Book {
  id: number;
  title: string;
  author: string;
  period: string;
  category: string;
  rating: number;
  reviews: number;
  pages: number;
  languages: string[];
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  views: number;
  description?: string;
  imageUrl?: string;
  titles?: {
    한국어: string;
    English: string;
    日本語: string;
    Español: string;
  };
  authors?: {
    한국어: string;
    English: string;
    日本語: string;
    Español: string;
  };
  descriptions?: {
    한국어: string;
    English: string;
    일본語: string;
    Español: string;
  };
  ebookContent?: {
    한국어: string[];
    English: string[];
    日本語: string[];
    Español: string[];
  };
}

interface BooksStore {
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: number, updates: Partial<Book>) => void;
  deleteBooks: (ids: number[]) => void;
  getPublishedBooks: () => Book[];
}

const initialBooks: Book[] = [
  {
    id: 1,
    title: "춘향전",
    author: "작자 미상",
    period: "조선후기",
    category: "고전소설",
    rating: 4.8,
    reviews: 156,
    pages: 180,
    languages: ["한국어", "English", "일본어", "Español"],
    status: 'published',
    createdAt: "2024.01.15",
    views: 2847,
    description: "사랑과 의리를 그린 조선시대 대표 고전소설입니다. 춘향과 몽룡의 사랑 이야기를 통해 신분제 사회의 모순을 비판한 작품입니다.",
    imageUrl: "https://readdy.ai/api/search-image?query=Korean%20classical%20literature%20book%20cover%20Chunhyangjeon%20traditional%20elegant%20design%20isolated%20on%20white%20background&width=300&height=400&seq=1&orientation=portrait",
    titles: {
      한국어: "춘향전",
      English: "The Tale of Chunhyang",
      일본어: "春香伝",
      Español: "La Historia de Chunhyang"
    },
    authors: {
      한국어: "작자 미상",
      English: "Anonymous",
      일본어: "作者未詳",
      Español: "Anónimo"
    },
    descriptions: {
      한국어: "사랑과 의리를 그린 조선시대 대표 고전소설입니다. 춘향과 몽룡의 사랑 이야기를 통해 신분제 사회의 모순을 비판한 작품입니다.",
      English: "A representative classical novel of the Joseon Dynasty depicting love and loyalty. This work criticizes the contradictions of a status-based society through the love story of Chunhyang and Mongryong.",
      일본語: "愛と義理を描いた朝鮮時代の代表的な古典小説です。春香と夢龍の愛の物語を通じて身分制社会の矛盾を批判した作品です。",
      Español: "Una novela clásica representativa de la dinastía Joseon que retrata el amor y la lealtad. Esta obra critica las contradicciones de una sociedad basada en el estatus a través de la historia de amor de Chunhyang y Mongryong."
    },
    ebookContent: {
      한국어: [
        "제1장 - 춘향과 몽룡의 만남\n\n조선 후기 남원 땅에 춘향이라는 기생의 딸이 있었다. 춘향은 용모가 아름답고 마음씨도 착했다. 어느 봄날, 춘향이 그네를 타고 있을 때 한양에서 내려온 이몽룡이 그 모습을 보고 한눈에 반하게 되었다.\n\n이몽룡은 남원 부사의 아들로, 풍채가 좋고 학문이 뛰어난 청년이었다. 두 사람은 첫 만남부터 서로에게 깊은 인상을 받았고, 자주 만나게 되면서 사랑에 빠지게 되었다.",
        "제2장 - 사랑의 맹세\n\n춘향과 몽룡은 비밀리에 혼례를 올렸다. 비록 정식 혼례는 아니었지만, 두 사람의 마음만큼은 진실했다. 그들은 서로를 향한 변치 않는 사랑을 맹세했다.\n\n'춘향아, 비록 지금은 신분이 다르지만 언젠가는 당당하게 너를 아내로 맞이하겠다.'\n'도련님, 저는 어떤 시련이 와도 도련님만을 기다리겠습니다.'",
        "제3장 - 이별과 시련\n\n몽룡의 아버지가 한양으로 전임되면서 몽룡도 함께 떠나야 했다. 이별의 아픔 속에서도 두 사람은 재회를 약속했다. 하지만 새로 부임한 변학도는 춘향의 미모에 반해 첩으로 삼으려 했고, 춘향은 이를 거절하며 옥에 갇히게 되었다.",
        "제4장 - 재회와 해피엔딩\n\n과거에 급제한 몽룡은 암행어사가 되어 남원으로 돌아왔다. 춘향이 옥에 갇혀 있다는 소식을 듣고 분노한 몽룡은 변학도를 처벌하고 춘향을 구해냈다. 두 사람은 마침내 정식으로 혼례를 올리고 행복하게 살았다는 이야기가 전해진다."
      ],
      English: [
        "Chapter 1 - The Meeting of Chunhyang and Mongryong\n\nIn the late Joseon period, in the land of Namwon, there lived Chunhyang, the daughter of a gisaeng. Chunhyang was very beautiful and kind-hearted. One spring day, when Chunhyang was swinging, Lee Mongryong, who had come down from Hanyang, saw her and fell in love at first sight.\n\nMongryong was the son of the Namwon magistrate, a handsome young man with excellent scholarship. From their first meeting, the two were deeply impressed with each other and gradually fell in love.",
        "Chapter 2 - The Vow of Love\n\nChunhyang and Mongryong held a secret wedding ceremony. Although it was not an official wedding, their hearts were sincere. They vowed unchanging love for each other.\n\n'Chunhyang, although we have different social standings now, someday I will proudly make you my wife.'\n'Young master, no matter what trials come, I will wait only for you.'",
        "Chapter 3 - Separation and Trials\n\nWhen Mongryong's father was transferred to Hanyang, Mongryong had to leave with him. Despite the pain of separation, the two promised to meet again. However, the newly appointed Byeon Hakdo fell for Chunhyang's beauty and tried to make her his concubine, but Chunhyang refused and was imprisoned.",
        "Chapter 4 - Reunion and Happy Ending\n\nMongryong, who passed the state examination, became a secret royal inspector and returned to Namwon. When he heard that Chunhyang was imprisoned, the angry Mongryong punished Byeon Hakdo and rescued Chunhyang. The two finally held an official wedding ceremony and lived happily ever after."
      ],
      일본語: [
        "第1章 - 春香と夢龍の出会い\n\n朝鮮後期、南原の地に春香という妓生の娘がいた。春香は容貌が非常に美しく、心根も優しかった。ある春の日、春香がブランコに乗っているとき、漢陽から下ってきた李夢龍がその姿を見て一目で恋に落ちた。\n\n夢龍は南原府使の息子で、風采が良く学問に優れた青年だった。二人は初対面から互いに深い印象を受け、頻繁に会うようになって愛に落ちた。",
        "第2章 - 愛の誓い\n\n春香と夢龍は密かに婚礼を挙げた。正式な婚礼ではなかったが、二人の心だけは真実だった。彼らは互いへの変わらぬ愛を誓った。\n\n'春香よ、今は身分が違うが、いつかは堂々と君を妻に迎えよう。'\n'若様、私はどなた試練が来ても若様だけをお待ちします。'",
        "第3章 - 別れと試練\n\n夢龍の父が漢陽に転任することになり、夢龍も一緒に去らなければならなかった。別れの痛みの中でも、二人は再会を約束した。しかし新しく赴任した卞学道は春香の美貌に心を奪われ、側室にしようとしたが、春香はこれを拒否して牢獄に入れられた。",
        "第4章 - 再会とハッピーエンド\n\n科挙に及第した夢龍は暗行御史となって南原に戻ってきた。春香が牢に入れられているという知らせを聞いて怒った夢龍は卞学道を処罰し、春香を救い出した。二人はついに正式に婚礼を挙げ、幸せに暮らしたという話が伝えられている。"
      ],
      Español: [
        "Capítulo 1 - El Encuentro de Chunhyang y Mongryong\n\nEn el período tardío de Joseon, en la tierra de Namwon, vivía Chunhyang, la hija de una gisaeng. Chunhyang era muy hermosa y de buen corazón. Un día de primavera, cuando Chunhyang se columpiaba, Lee Mongryong, que había venido de Hanyang, la vio y se enamoró a primera vista.\n\nMongryong era el hijo del magistrado de Namwon, un joven apuesto con excelente erudición. Desde su primer encuentro, los dos se impresionaron profundamente el uno al otro y gradualmente se enamoraron.",
        "Capítulo 2 - El Voto de Amor\n\nChunhyang y Mongryong celebraron una ceremonia de boda secreta. Aunque no era una boda oficial, sus corazones eran sinceros. Se prometieron amor inmutable el uno al otro.\n\n'Chunhyang, aunque ahora tenemos diferentes posiciones sociales, algún día te haré orgullosamente mi esposa.'\n'Joven maestro, sin importar qué pruebas vengan, esperaré solo por ti.'",
        "Capítulo 3 - Separación y Pruebas\n\nCuando el padre de Mongryong fue transferido a Hanyang, Mongryong tuvo que irse con él. A pesar del dolor de la separación, los dos prometieron encontrarse de nuevo. Sin embargo, el recién nombrado Byeon Hakdo se enamoró de la belleza de Chunhyang y trató de hacerla su concubina, pero Chunhyang se negó y fue encarcelada.",
        "Capítulo 4 - Reencuentro y Final Feliz\n\nMongryong, quien aprobó el examen estatal, se convirtió en inspector real secreto y regresó a Namwon. Cuando se enteró de que Chunhyang estaba encarcelada, el enojado Mongryong castigó a Byeon Hakdo y rescató a Chunhyang. Los dos finalmente celebraron una ceremonia de boda oficial y vivieron felices para siempre."
      ]
    }
  },
  {
    id: 2,
    title: "홍길동전",
    author: "허균",
    period: "조선전기",
    category: "고전소설",
    rating: 4.7,
    reviews: 142,
    pages: 156,
    languages: ["한국어", "English", "일본어", "Español"],
    status: 'published',
    createdAt: "2024.01.12",
    views: 2134,
    description: "조선 최초의 한글 소설로, 사회 비판 정신이 담긴 작품입니다. 홍길동의 영웅적 활약을 통해 당시 사회의 모순을 날카롭게 지적합니다.",
    imageUrl: "https://readdy.ai/api/search-image?query=Korean%20classical%20literature%20book%20cover%20Hong%20Gildong%20Jeon%20traditional%20elegant%20design%20isolated%20on%20white%20background&width=300&height=400&seq=2&orientation=portrait",
    titles: {
      한국어: "홍길동전",
      English: "The Tale of Hong Gil-dong",
      일본어: "洪吉童伝",
      Español: "La Historia de Hong Gil-dong"
    },
    authors: {
      한국어: "허균",
      English: "Heo Gyun",
      일본어: "許筠",
      Español: "Heo Gyun"
    },
    descriptions: {
      한국어: "조선 최초의 한글 소설로, 사회 비판 정신이 담긴 작품입니다. 홍길동의 영웅적 활약을 통해 당시 사회의 모순을 날카롭게 지적합니다.",
      English: "The first Korean novel written in Hangul, containing a spirit of social criticism. It sharply points out the contradictions of society through Hong Gil-dong's heroic activities.",
      日本語: "朝鮮初のハングル小説で、社会批判精神が込められた作品です。洪吉童の英雄的活躍を通じて当時の社会の矛盾を鋭く指摘します。",
      Español: "La primera novela coreana escrita en Hangul, que contiene un espíritu de crítica social. Señala agudamente las contradicciones de la sociedad a través de las actividades heroicas de Hong Gil-dong."
    },
    ebookContent: {
      한국어: [
        "홍길동전 제1장 내용입니다.",
        "홍길동전 제2장 내용입니다.",
        "홍길동전 제3장 내용입니다.",
        "홍길동전 제4장 내용입니다."
      ],
      English: [
        "Hong Gil-dong Tale Chapter 1 content.",
        "Hong Gil-dong Tale Chapter 2 content.",
        "Hong Gil-dong Tale Chapter 3 content.",
        "Hong Gil-dong Tale Chapter 4 content."
      ],
      일본語: [
        "洪吉童伝第1章の内容です。",
        "洪吉童伝第2章の内容です。",
        "洪吉童伝第3章の内容です。",
        "洪吉童伝第4章の内容です。"
      ],
      Español: [
        "Contenido del Capítulo 1 de la Historia de Hong Gil-dong.",
        "Contenido del Capítulo 2 de la Historia de Hong Gil-dong.",
        "Contenido del Capítulo 3 de la Historia de Hong Gil-dong.",
        "Contenido del Capítulo 4 de la Historia de Hong Gil-dong."
      ]
    }
  },
  {
    id: 3,
    title: "구운몽",
    author: "김만중",
    period: "조선후기",
    category: "고전소설",
    rating: 4.6,
    reviews: 98,
    pages: 234,
    languages: ["한국어", "English", "일본어"],
    status: 'published',
    createdAt: "2024.01.10",
    views: 1567,
    description: "꿈과 현실, 인생무상을 다룬 철학적 소설입니다. 불교와 유교 사상이 조화롭게 어우러진 대표적인 몽유록계 소설입니다.",
    imageUrl: "https://readdy.ai/api/search-image?query=Korean%20classical%20literature%20book%20cover%20Guunmong%20traditional%20elegant%20design%20isolated%20on%20white%20background&width=300&height=400&seq=3&orientation=portrait",
    titles: {
      한국어: "구운몽",
      English: "The Cloud Dream of Nine",
      일본語: "九雲夢",
      Español: "El Sueño de las Nueve Nubes"
    },
    authors: {
      한국어: "김만중",
      English: "Kim Man-jung",
      일본어: "金万重",
      Español: "Kim Man-jung"
    },
    descriptions: {
      한국어: "꿈과 현실, 인생무상을 다룬 철학적 소설입니다. 불교와 유교 사상이 조화롭게 어우러진 대표적인 몽유록계 소설입니다.",
      English: "A philosophical novel dealing with dreams, reality, and the transience of life. It is a representative dream-record novel that harmoniously combines Buddhist and Confucian thoughts.",
      日本語: "夢と現実、人生無常を扱った哲学的小説です。仏教と儒教思想が調和よく融合した代表的な夢遊録系小説です。",
      Español: "Una novela filosófica que trata los sueños, la realidad y la transitoriedad de la vida. Es una novela representativa de registro de sueños que combina armoniosamente los pensamientos budistas y confucianos."
    }
  },
  {
    id: 4,
    title: "심청전",
    author: "작자 미상",
    period: "조선후기",
    category: "고전소설",
    rating: 4.5,
    reviews: 89,
    pages: 142,
    languages: ["한국어", "English", "Español"],
    status: 'published',
    createdAt: "2024.01.08",
    views: 1876,
    description: "효심 깊은 딸 심청의 이야기를 통해 효와 인간애를 그린 작품입니다. 판소리계 소설의 대표작 중 하나입니다.",
    imageUrl: "https://readdy.ai/api/search-image?query=Korean%20classical%20literature%20book%20cover%20Simcheong%20Jeon%20traditional%20elegant%20design%20isolated%20on%20white%20background&width=300&height=400&seq=4&orientation=portrait",
    titles: {
      한국어: "심청전",
      English: "The Tale of Sim Cheong",
      일본語: "沈清伝",
      Español: "La Historia de Sim Cheong"
    },
    authors: {
      한국어: "작자 미상",
      English: "Anonymous",
      일본어: "作者未詳",
      Español: "Anónimo"
    },
    descriptions: {
      한국어: "효심 깊은 딸 심청의 이야기를 통해 효와 인간애를 그린 작품입니다. 판소리계 소설의 대표작 중 하나입니다.",
      English: "A work that depicts filial piety and humanity through the story of Sim Cheong, a deeply filial daughter. It is one of the representative works of pansori-based novels.",
      日本語: "孝行深い娘沈清の物語を通じて孝行と人間愛を描いた作品です。判ソリ系小説の代表作の一つです。",
      Español: "Una obra que retrata la piedad filial y la humanidad a través de la historia de Sim Cheong, una hija profundamente filial. Es una de las obras representativas de las novelas basadas en pansori."
    }
  },
  {
    id: 5,
    title: "흥부전",
    author: "작자 미상",
    period: "조선후기",
    category: "고전소설",
    rating: 4.4,
    reviews: 76,
    pages: 118,
    languages: ["한국어", "English"],
    status: 'published',
    createdAt: "2024.01.05",
    views: 1432,
    description: "착한 흥부와 욕심 많은 놀부의 대조를 통해 권선징악의 교훈을 전하는 작품입니다. 해학과 풍자가 돋보이는 판소리계 소설입니다.",
    imageUrl: "https://readdy.ai/api/search-image?query=Korean%20classical%20literature%20book%20cover%20Heungbu%20Jeon%20traditional%20elegant%20design%20isolated%20on%20white%20background&width=300&height=400&seq=5&orientation=portrait",
    titles: {
      한국어: "흥부전",
      English: "The Tale of Heungbu",
      일본語: "興夫伝",
      Español: "La Historia de Heungbu"
    },
    authors: {
      한국어: "작자 미상",
      English: "Anonymous",
      일본어: "作者未詳",
      Español: "Anónimo"
    },
    descriptions: {
      한국어: "착한 흥부와 욕심 많은 놀부의 대조를 통해 권선징악의 교훈을 전하는 작품입니다. 해학과 풍자가 돋보이는 판소리계 소설입니다.",
      English: "A work that conveys the lesson of rewarding good and punishing evil through the contrast between kind Heungbu and greedy Nolbu. It is a pansori-based novel notable for its humor and satire.",
      日本語: "善良な興夫と欲深い놀부の対照を通じて勧善懲悪の教訓を伝える作品です。ユーモアと風刺が際立つ判ソリ系小説です。",
      Español: "Una obra que transmite la lección de recompensar el bien y castigar el mal a través del contraste entre el bondadoso Heungbu y el codicioso Nolbu. Es una novela basada en pansori notable por su humor y sátira."
    }
  },
  {
    id: 6,
    title: "사씨남정기",
    author: "김만중",
    period: "조선후기",
    category: "고전소설",
    rating: 4.3,
    reviews: 64,
    pages: 198,
    languages: ["한국어", "일본어"],
    status: 'published',
    createdAt: "2024.01.02",
    views: 1234,
    description: "조선시대 가정소설의 대표작으로, 사씨의 시련과 극복 과정을 통해 여성의 덕목과 가족 윤리를 강조한 작품입니다.",
    imageUrl: "https://readdy.ai/api/search-image?query=Korean%20classical%20literature%20book%20cover%20Sassi%20Namjeonggi%20traditional%20elegant%20design%20isolated%20on%20white%20background&width=300&height=400&seq=6&orientation=portrait",
    titles: {
      한국어: "사씨남정기",
      English: "The History of Lady Sa",
      일본語: "謝氏南征記",
      Español: "La Historia de la Señora Sa"
    },
    authors: {
      한국어: "김만중",
      English: "Kim Man-jung",
      일본어: "金万重",
      Español: "Kim Man-jung"
    },
    descriptions: {
      한국어: "조선시대 가정소설의 대표작으로, 사씨의 시련과 극복 과정을 통해 여성의 덕목과 가족 윤리를 강조한 작품입니다.",
      English: "A representative work of Joseon Dynasty domestic novels that emphasizes women's virtues and family ethics through Lady Sa's trials and overcoming process.",
      日本語: "朝鮮時代家庭小説の代表作で、謝氏の試練と克服過程を通じて女性の徳目と家族倫理を強調した作品です。",
      Español: "Una obra representativa de las novelas domésticas de la dinastía Joseon que enfatiza las virtudes de las mujeres y la ética familiar a través del proceso de pruebas y superación de la Señora Sa."
    }
  }
];

export const useBooksStore = create<BooksStore>(
  persist(
    (set, get) => ({
      books: initialBooks,
      addBook: (book) => {
        const newBook: Book = {
          ...book,
          id: Math.max(...get().books.map(b => b.id), 0) + 1,
          imageUrl: book.imageUrl || `https://readdy.ai/api/search-image?query=Korean%20classical%20literature%20book%20cover%20${book.title}%20traditional%20elegant%20design%20isolated%20on%20white%20background&width=300&height=400&seq=${Date.now()}&orientation=portrait`
        };
        set({ books: [...get().books, newBook] });
      },
      updateBook: (id, updates) => {
        set({
          books: get().books.map(book =>
            book.id === id ? { ...book, ...updates } : book
          )
        });
      },
      deleteBooks: (ids) => {
        set({
          books: get().books.filter(book => !ids.includes(book.id))
        });
      },
      getPublishedBooks: () => {
        return get().books.filter(book => book.status === 'published');
      }
    }),
    {
      name: 'books-storage',
    }
  )
);
