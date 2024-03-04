import { FlashCardType, PlaylistType } from "../Utils/types";

const flashCards1: FlashCardType[] = [
    {
      "term": "나무",
      "romanization": "(namu)",
      "definition": "tree"
    },
    {
      "term": "사과",
      "romanization": "(sagwa)",
      "definition": "apple"
    },
    {
      "term": "바다",
      "romanization": "(bada)",
      "definition": "sea"
    },
    {
      "term": "햇볕",
      "romanization": "(haetbyeot)",
      "definition": "sunlight"
    },
    {
      "term": "비",
      "romanization": "(bi)",
      "definition": "rain"
    },
    {
      "term": "바람",
      "romanization": "(baram)",
      "definition": "wind"
    },
    {
      "term": "하늘",
      "romanization": "(haneul)",
      "definition": "sky"
    },
    {
      "term": "별",
      "romanization": "(byeol)",
      "definition": "star"
    },
    {
      "term": "눈",
      "romanization": "(nun)",
      "definition": "snow"
    },
    {
      "term": "구름",
      "romanization": "(gureum)",
      "definition": "cloud"
    },
    {
      "term": "빗물",
      "romanization": "(bitmul)",
      "definition": "rainwater"
    },
    {
      "term": "번개",
      "romanization": "(baen   gae)",
      "definition": "lightning"
    },
    {
      "term": "무지개",
      "romanization": "(mujigae)",
      "definition": "rainbow"
    },
    {
      "term": "바람막이",
      "romanization": "(barammaki)",
      "definition": "windbreaker"
    },
    {
      "term": "태양",
      "romanization": "(taeyang)",
      "definition": "sun"
    },
    {
        "term": "강",
        "romanization": "(gang)",
        "definition": "river"
      },
      {
        "term": "산",
        "romanization": "(san)",
        "definition": "mountain"
      },
      {
        "term": "달",
        "romanization": "(dal)",
        "definition": "moon"
      },
      {
        "term": "꽃",
        "romanization": "(kkot)",
        "definition": "flower"
      },
      {
        "term": "나비",
        "romanization": "(nabi)",
        "definition": "butterfly"
      },
      {
        "term": "잔디",
        "romanization": "(jandi)",
        "definition": "grass"
      },
      {
        "term": "해변",
        "romanization": "(haebyeon)",
        "definition": "beach"
      },
      {
        "term": "단풍",
        "romanization": "(danpung)",
        "definition": "autumn leaves"
      },
      {
        "term": "온도",
        "romanization": "(ondo)",
        "definition": "temperature"
      },
      {
        "term": "습도",
        "romanization": "(seupdo)",
        "definition": "humidity"
      },
      {
        "term": "안개",
        "romanization": "(angae)",
        "definition": "fog"
      },
      {
        "term": "천둥",
        "romanization": "(cheondung)",
        "definition": "thunder"
      },
      {
        "term": "계절",
        "romanization": "(gyejeol)",
        "definition": "season"
      },
      {
        "term": "연못",
        "romanization": "(yeonmot)",
        "definition": "pond"
      },
      {
        "term": "별똥별",
        "romanization": "(byeoldongbyeol)",
        "definition": "shooting star"
      }
  ]


  const greetingCards: FlashCardType[] = [
    {
        term: "좋은 하루 되세요",
        romanization: "(joeun haru doeseyo)",
        definition: "Have a nice day"
      },
      {
        "term": "안녕히 주무세요",
        "romanization": "(annyeonghi jumuseyo)",
        "definition": "Good night (when someone is going to bed)"
      },
      {
        "term": "반가워요",
        "romanization": "(bangawoyo)",
        "definition": "Pleased to meet you"
      },
      {
        "term": "어서 오세요",
        "romanization": "(eoseo oseyo)",
        "definition": "Welcome (when someone arrives)"
      },
      {
        "term": "수고하셨습니다",
        "romanization": "(sugohasyeossseubnida)",
        "definition": "Thank you for your hard work"
      },
      {
        "term": "잘 부탁드립니다",
        "romanization": "(jal butakdeurimnida)",
        "definition": "Please take care of me (when starting something new)"
      },
      {
        "term": "오랜만입니다",
        "romanization": "(oraenmanimnida)",
        "definition": "It's been a long time"
      },
      {
        "term": "즐거운 주말 되세요",
        "romanization": "(jeulgeoun jumal doeseyo)",
        "definition": "Have a nice weekend"
      },
      {
        "term": "행복한 하루 보내세요",
        "romanization": "(haengbokhan haru bonaeseyo)",
        "definition": "Have a happy day"
      },
      {
        "term": "안녕히 계세요",
        "romanization": "(annyeonghi gyeseyo)",
        "definition": "Goodbye (when you are leaving)"
      },
    {
      "term": "안녕하세요",
      "romanization": "(annyeonghaseyo)",
      "definition": "Hello (formal)"
    },
    {
      "term": "안녕",
      "romanization": "(annyeong)",
      "definition": "Hi/Bye (informal)"
    },
    {
      "term": "잘 지내세요?",
      "romanization": "(jal jinaeseyo?)",
      "definition": "How are you? (formal)"
    },
    {
      "term": "잘 지내?",
      "romanization": "(jal jinae?)",
      "definition": "How are you? (informal)"
    },
    {
      "term": "만나서 반가워요",
      "romanization": "(mannaseo bangawoyo)",
      "definition": "Nice to meet you (formal)"
    },
    {
      "term": "만나서 반가워",
      "romanization": "(mannaseo bangawo)",
      "definition": "Nice to meet you (informal)"
    },
    {
      "term": "감사합니다",
      "romanization": "(gamsahamnida)",
      "definition": "Thank you (formal)"
    },
    {
      "term": "고마워",
      "romanization": "(gomawo)",
      "definition": "Thanks (informal)"
    },
    {
      "term": "잘 가",
      "romanization": "(jal ga)",
      "definition": "Goodbye (informal)"
    },
    {
      "term": "안녕히 가세요",
      "romanization": "(annyeonghi gaseyo)",
      "definition": "Goodbye (when someone is leaving, formal)"
    },
    {
      "term": "안녕히 계세요",
      "romanization": "(annyeonghi gyeseyo)",
      "definition": "Goodbye (when you are leaving, formal)"
    },
    {
      "term": "좋은 아침이에요",
      "romanization": "(joeun achimieyo)",
      "definition": "Good morning (formal)"
    },
    {
      "term": "좋은 저녁이에요",
      "romanization": "(joeun jeonyogieyo)",
      "definition": "Good evening (formal)"
    },
    {
      "term": "반갑습니다",
      "romanization": "(bangapseumnida)",
      "definition": "Pleased to meet you (very formal)"
    },
    {
      "term": "오랜만이에요",
      "romanization": "(oraenmanieyo)",
      "definition": "Long time no see (formal)"
    }
  ];

  const natureCards: FlashCardType[] = [
    {
      "term": "자연",
      "romanization": "(jayeon)",
      "definition": "nature"
    },
    {
      "term": "숲",
      "romanization": "(sup)",
      "definition": "forest"
    },
    {
      "term": "강",
      "romanization": "(gang)",
      "definition": "river"
    },
    {
      "term": "산",
      "romanization": "(san)",
      "definition": "mountain"
    },
    {
      "term": "호수",
      "romanization": "(hosu)",
      "definition": "lake"
    },
    {
      "term": "바다",
      "romanization": "(bada)",
      "definition": "sea"
    },
    {
      "term": "꽃",
      "romanization": "(kkot)",
      "definition": "flower"
    },
    {
      "term": "나무",
      "romanization": "(namu)",
      "definition": "tree"
    },
    {
      "term": "풀",
      "romanization": "(pul)",
      "definition": "grass"
    },
    {
      "term": "계곡",
      "romanization": "(gyegok)",
      "definition": "valley"
    },
    {
      "term": "사막",
      "romanization": "(samak)",
      "definition": "desert"
    },
    {
      "term": "동굴",
      "romanization": "(donggul)",
      "definition": "cave"
    },
    {
      "term": "물",
      "romanization": "(mul)",
      "definition": "water"
    },
    {
      "term": "해변",
      "romanization": "(haebyeon)",
      "definition": "beach"
    },
    {
      "term": "섬",
      "romanization": "(seom)",
      "definition": "island"
    }
  ];

  const cookingCards: FlashCardType[] = [
    {
      "term": "요리",
      "romanization": "(yori)",
      "definition": "cooking"
    },
    {
      "term": "굽다",
      "romanization": "(gupda)",
      "definition": "to bake/to roast"
    },
    {
      "term": "끓이다",
      "romanization": "(kkeulida)",
      "definition": "to boil"
    },
    {
      "term": "자르다",
      "romanization": "(jareuda)",
      "definition": "to cut"
    },
    {
      "term": "볶다",
      "romanization": "(bokda)",
      "definition": "to stir-fry"
    },
    {
      "term": "찌다",
      "romanization": "(jjida)",
      "definition": "to steam"
    },
    {
      "term": "믹스",
      "romanization": "(mikseu)",
      "definition": "to mix"
    },
    {
      "term": "갈다",
      "romanization": "(gada)",
      "definition": "to grind"
    },
    {
      "term": "양념",
      "romanization": "(yangnyeom)",
      "definition": "seasoning/spice"
    },
    {
      "term": "반죽",
      "romanization": "(banjug)",
      "definition": "dough"
    },
    {
      "term": "국물",
      "romanization": "(gukmul)",
      "definition": "broth"
    },
    {
      "term": "맛",
      "romanization": "(mat)",
      "definition": "taste/flavor"
    },
    {
      "term": "재료",
      "romanization": "(jaeryo)",
      "definition": "ingredient"
    },
    {
      "term": "손질하다",
      "romanization": "(sonjilhada)",
      "definition": "to prepare (food)"
    },
    {
      "term": "껍질",
      "romanization": "(kkeopjil)",
      "definition": "peel/skin"
    }
  ];
  
  const workTravelCards: FlashCardType[] = [
    {
        "term": "업무 분담",
        "romanization": "(eopmu bundam)",
        "definition": "task delegation"
      },
      {
        "term": "출장",
        "romanization": "(chuljang)",
        "definition": "business trip"
      },
      {
        "term": "회사 정책",
        "romanization": "(hoesa jeongchaek)",
        "definition": "company policy"
      },
    {
      "term": "출근",
      "romanization": "(chulgeun)",
      "definition": "going to work"
    },
    {
      "term": "퇴근",
      "romanization": "(toegeun)",
      "definition": "leaving work"
    },
    {
      "term": "대중교통",
      "romanization": "(daejunggyotong)",
      "definition": "public transportation"
    },
    {
      "term": "지하철",
      "romanization": "(jihacheol)",
      "definition": "subway"
    },
    {
      "term": "버스",
      "romanization": "(beoseu)",
      "definition": "bus"
    },
    {
      "term": "자동차",
      "romanization": "(jadongcha)",
      "definition": "car"
    },
    {
      "term": "오피스",
      "romanization": "(opiseu)",
      "definition": "office"
    },
    {
      "term": "회의",
      "romanization": "(hoeui)",
      "definition": "meeting"
    },
    {
      "term": "보고서",
      "romanization": "(bogoseo)",
      "definition": "report"
    },
    {
      "term": "프로젝트",
      "romanization": "(peurojekteu)",
      "definition": "project"
    },
    {
      "term": "업무",
      "romanization": "(eopmu)",
      "definition": "work, task"
    },
    {
      "term": "사무실",
      "romanization": "(samusil)",
      "definition": "office (room)"
    },
    {
      "term": "컴퓨터",
      "romanization": "(keompyuteo)",
      "definition": "computer"
    },
    {
      "term": "이메일",
      "romanization": "(imeil)",
      "definition": "email"
    },
    {
      "term": "동료",
      "romanization": "(donglyo)",
      "definition": "colleague"
    }
  ];
  
  
  
  const playlistData: PlaylistType[] = [
    {
        title: "Nature Words 🌱",
        playlist: flashCards1
    },
    {
        title: "Common Greetings",
        playlist: greetingCards
    },
    {
        title: "Cooking Set 👩‍🍳",
        playlist: cookingCards
    },
    {
        title: "Office Vocab 💼",
        playlist: workTravelCards
    }
];

export default playlistData;