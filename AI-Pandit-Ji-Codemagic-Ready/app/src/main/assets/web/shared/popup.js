const STORAGE_KEY = "aiPanditJiFormState";
const OCR_SPACE_URL = "https://api.ocr.space/parse/image";
const OCR_SPACE_DEMO_KEY = "helloworld";
const DEFAULT_REPORT_LANGUAGE = "en";
const DEFAULT_PAIR_ORDER = "a-groom";
const REPORT_CARD_FONT_STACK = '"Avenir Next","Trebuchet MS",Verdana,sans-serif';
const REPORT_CARD_EXPORT_SCALE = 6;
const REPORT_CARD_MAX_PIXELS = 32000000;
const VIMSHOTTARI_ORDER = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
const VIMSHOTTARI_YEARS = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17
};
let lastResult = null;
let currentLanguage = DEFAULT_REPORT_LANGUAGE;

const MATCH_CHECK_DETAILS = {
  "Mind Number": {
    about: "Mind Number checks how both people process feelings, thoughts, and reactions.",
    impact: "This can affect emotional understanding, thinking style, and how quickly the pair settles disagreements."
  },
  "Home Number": {
    about: "Home Number checks comfort in routine, family rhythm, and day-to-day living patterns.",
    impact: "This can affect household peace, family adjustment, routine comfort, and how stable daily life feels together."
  },
  "Purpose Number": {
    about: "Purpose Number checks whether both people naturally move toward a similar long-term direction.",
    impact: "This can affect shared goals, growth direction, long-term planning, and whether both people want the same kind of future."
  },
  Varna: {
    about: "Varna checks whether both charts carry similar values, life approach, and respect style.",
    impact: "This can affect shared values, mutual respect, and how both families see roles and duties."
  },
  Vashya: {
    about: "Vashya checks mutual influence, response, and how easily one person adjusts to the other.",
    impact: "This can affect cooperation, emotional reach, and who leads or bends during daily life."
  },
  Tara: {
    about: "Tara checks star-to-star support and the smoothness of timing between both people.",
    impact: "This can affect daily rhythm, mood flow, health steadiness, and how smoothly routine life moves."
  },
  Yoni: {
    about: "Yoni checks instinctive attraction, private comfort, and natural closeness.",
    impact: "This can affect intimacy, physical comfort, emotional warmth, and how safe the bond feels in private."
  },
  "Graha Maitri": {
    about: "Graha Maitri checks the friendship between moon-sign lords.",
    impact: "This can affect understanding, conversation style, emotional support, and day-to-day decisions."
  },
  Gana: {
    about: "Gana checks natural temperament and reaction style.",
    impact: "This can affect conflict handling, patience, emotional reactions, and overall household peace."
  },
  Bhakoot: {
    about: "Bhakoot checks the moon-sign relationship and long-term movement of the pair.",
    impact: "This can affect money planning, family direction, health-related stress, and child-planning discussions."
  },
  Nadi: {
    about: "Nadi checks whether both charts carry a similar life-force rhythm.",
    impact: "This can affect health rhythm, emotional energy, intimacy comfort, family harmony, and child-planning decisions."
  },
  Dina: {
    about: "Dina checks day-to-day star harmony and practical smoothness.",
    impact: "This can affect routine comfort, timing, daily understanding, and general steadiness in life together."
  },
  Mahendra: {
    about: "Mahendra checks support for growth, continuity, and expansion in the match.",
    impact: "This can affect long-term progress, family growth, encouragement, and the sense of moving forward together."
  },
  Deergha: {
    about: "Deergha checks whether the pairing has room to settle and stay steady over time.",
    impact: "This can affect long-term stability, staying power in the relationship, and how the bond matures after marriage."
  },
  Rasi: {
    about: "Rasi checks the practical moon-sign relationship between the two charts.",
    impact: "This can affect family coordination, emotional comfort, money habits, and everyday compatibility."
  },
  "Rasi Adhipathi": {
    about: "Rasi Adhipathi checks the relationship between the lords of the two moon signs.",
    impact: "This can affect mental agreement, decision-making style, emotional support, and how naturally the pair backs each other."
  },
  Rajju: {
    about: "Rajju checks long-term safety, steadiness, and traditional protection in the bond.",
    impact: "This can affect marriage stability, family security, and how safely the relationship carries through difficult phases."
  },
  Vedha: {
    about: "Vedha checks whether the star pair carries a traditional obstruction.",
    impact: "This can affect smooth progress, repeated delays, and how often life plans get blocked or disturbed."
  },
  Vasya: {
    about: "Vasya checks mutual responsiveness and how naturally the two people adjust to each other.",
    impact: "This can affect responsiveness, cooperation, and the ease of living together in daily routines."
  },
  "Daily Rhythm": {
    about: "This combined check looks at routine, timing, and everyday flow.",
    impact: "This can affect daily comfort, household rhythm, health timing, and how responsibilities are managed together."
  },
  Communication: {
    about: "This combined check looks at mental understanding and how both people speak, listen, and decide.",
    impact: "This can affect conversations, problem-solving, planning, emotional reassurance, and decision making."
  },
  Chemistry: {
    about: "This combined check looks at attraction, comfort, and emotional closeness.",
    impact: "This can affect intimacy, warmth, trust, private bonding, and how naturally affection grows."
  },
  Temperament: {
    about: "This combined check looks at natural behavior, reactions, and flexibility.",
    impact: "This can affect arguments, patience, ego balance, emotional reactions, and the atmosphere at home."
  },
  "Family Direction": {
    about: "This combined check looks at long-term goals and family-building direction.",
    impact: "This can affect money planning, home decisions, extended family expectations, and child-planning direction."
  },
  "Long-Term Stability": {
    about: "This combined check looks at steadiness, safety, and whether the match can hold well over time.",
    impact: "This can affect health stability, family support, consistency, and the durability of married life."
  },
  "Regional Agreement": {
    about: "This compares how close the two reference style readings are.",
    impact: "This can affect confidence in the final decision and whether you should rely on one tradition or review both."
  },
  Kuja: {
    about: "Kuja checks Mars placement risk and whether both charts carry a similar Manglik / Kuja-dosha load.",
    impact: "This can affect conflict heat, domestic pressure, emotional volatility, and how strongly traditional Kuja cautions apply to marriage timing."
  }
};

const MATCH_CHECK_DETAIL_TRANSLATIONS = {
  or: {
    Varna: {
      about: "ବର୍ଣ୍ଣ ଦେଖେ ଯେ ଦୁଇଟି କୁଣ୍ଡଳୀରେ ମୂଲ୍ୟବୋଧ, ଜୀବନ ଦୃଷ୍ଟିକୋଣ ଓ ସମ୍ମାନର ଶୈଳୀ କେତେ ମିଳୁଛି।",
      impact: "ଏହା ସାଧାରଣ ମୂଲ୍ୟବୋଧ, ପରସ୍ପର ସମ୍ମାନ, ଏବଂ ଦୁଇ ପରିବାର ଭୂମିକା ଓ ଦାୟିତ୍ୱକୁ କିପରି ଦେଖନ୍ତି ତାହାରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Vashya: {
      about: "ବଶ୍ୟ ଦେଖେ ଯେ ଦୁହେଁ କେତେ ସହଜରେ ପରସ୍ପରକୁ ପ୍ରଭାବିତ, ବୁଝିବା ଓ ଖାପ ଖୁଆଇପାରୁଛନ୍ତି।",
      impact: "ଏହା ସହଯୋଗ, ଭାବନାରେ ପହଞ୍ଚ, ଏବଂ ଦିନସରିଆ ଜୀବନରେ କିଏ ଆଗୁଆ କିମ୍ବା କିଏ ଖାପ ଖୁଆଏ ତାହାରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Tara: {
      about: "ତାରା ଦେଖେ ଯେ ଦୁହେଁର ନକ୍ଷତ୍ର ମଧ୍ୟରେ ସମର୍ଥନ ଓ ସମୟର ମେଳ କେତେ ଭଲ ଅଛି।",
      impact: "ଏହା ଦିନଚର୍ଯ୍ୟା, ମନୋଭାବର ଧାରା, ସ୍ୱାସ୍ଥ୍ୟର ସ୍ଥିରତା ଓ ଦିନସରିଆ କାମ କେତେ ସହଜରେ ଚାଲେ ତାହାରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Yoni: {
      about: "ଯୋନି ଦେଖେ ଯେ ସ୍ୱାଭାବିକ ଆକର୍ଷଣ, ନିଜସ୍ୱ ସୁବିଧା ଓ ନିକଟତା କେତେ ସହଜରେ ଗଢ଼ିଉଠେ।",
      impact: "ଏହା ନିକଟତା, ଶାରୀରିକ ସୁବିଧା, ଭାବନାତ୍ମକ ଉଷ୍ମତା ଓ ଗୋପନୀୟ ସମ୍ପର୍କର ସୁରକ୍ଷିତ ଅନୁଭବରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    "Graha Maitri": {
      about: "ଗ୍ରହ ମୈତ୍ରୀ ଦେଖେ ଯେ ଦୁହେଁର ରାଶି ଅଧିପତି ଗ୍ରହମାନଙ୍କର ସମ୍ପର୍କ କେତେ ମିଳୁଛି।",
      impact: "ଏହା ବୁଝାପଡ଼ା, କଥାବାର୍ତ୍ତାର ଶୈଳୀ, ଭାବନାତ୍ମକ ସହଯୋଗ ଓ ଦିନସରିଆ ନିଷ୍ପତ୍ତିରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Gana: {
      about: "ଗଣ ଦେଖେ ଯେ ଦୁହେଁର ସ୍ୱଭାବ ଓ ପ୍ରତିକ୍ରିୟା ଶୈଳୀ କେତେ ମେଳ ଖାଉଛି।",
      impact: "ଏହା ବାଦବିବାଦ ସମ୍ଭାଳିବା, ଧୈର୍ୟ, ଭାବନାତ୍ମକ ପ୍ରତିକ୍ରିୟା ଓ ଘରୋଇ ଶାନ୍ତିରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Bhakoot: {
      about: "ଭକୂଟ ଦେଖେ ଯେ ଦୁଇ ରାଶିର ସମ୍ପର୍କ ଦୀର୍ଘକାଳରେ କିପରି କାମ କରେ।",
      impact: "ଏହା ଧନ ଯୋଜନା, ପରିବାରର ଦିଗ, ସ୍ୱାସ୍ଥ୍ୟ ସମ୍ବନ୍ଧୀୟ ଚାପ ଓ ସନ୍ତାନ ଯୋଜନା ଆଲୋଚନାରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Nadi: {
      about: "ନାଡ଼ି ଦେଖେ ଯେ ଦୁହେଁର କୁଣ୍ଡଳୀର ଜୀବନ ଶକ୍ତି ଓ ଶରୀର-ମନର ରିଦମ୍ କେତେ ସଦୃଶ।",
      impact: "ଏହା ସ୍ୱାସ୍ଥ୍ୟର ରିଦମ୍, ଭାବନାତ୍ମକ ଶକ୍ତି, ନିକଟତାର ସୁବିଧା, ପରିବାରୀକ ସମନ୍ୱୟ ଓ ସନ୍ତାନ ଯୋଜନା ନିଷ୍ପତ୍ତିରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Dina: {
      about: "ଦିନ ଦେଖେ ଯେ ଦିନସରିଆ ତାରା-ମେଳ ଓ ପ୍ରାୟୋଗିକ ଚଳନ କେତେ ସହଜ।",
      impact: "ଏହା ଦିନଚର୍ଯ୍ୟାର ସୁବିଧା, ସମୟର ମେଳ, ଦିନସରିଆ ବୁଝାପଡ଼ା ଓ ଜୀବନର ସ୍ଥିରତାରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Mahendra: {
      about: "ମହେନ୍ଦ୍ର ଦେଖେ ଯେ ଏହି ମିଳାନ ବିକାଶ, ନିରନ୍ତରତା ଓ ପରିବାର ବୃଦ୍ଧିକୁ କେତେ ସମର୍ଥନ କରେ।",
      impact: "ଏହା ଦୀର୍ଘକାଳୀନ ଅଗ୍ରଗତି, ପରିବାର ବିକାଶ, ପରସ୍ପର ଉତ୍ସାହ ଓ ଏକସାଥିରେ ଆଗକୁ ବଢ଼ିବାର ଅନୁଭବରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Deergha: {
      about: "ଦୀର୍ଘ ଦେଖେ ଯେ ଏହି ସମ୍ପର୍କ ସମୟ ସହିତ କେତେ ଭଲରେ ବସିଯାଇ ଷ୍ଠିର ହୋଇପାରେ।",
      impact: "ଏହା ଦୀର୍ଘକାଳୀନ ସ୍ଥିରତା, ସମ୍ପର୍କର ଦୀର୍ଘାୟୁ ଓ ବିବାହ ପରେ ବନ୍ଧନ କେତେ ପକ୍କା ହୁଏ ତାହାରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Rasi: {
      about: "ରାଶି ଦେଖେ ଯେ ଦୁହେଁର ଚନ୍ଦ୍ର ରାଶି ପ୍ରାୟୋଗିକ ଭାବରେ କେତେ ସୁଯୋଗ୍ୟ।",
      impact: "ଏହା ପରିବାରୀକ ସମନ୍ୱୟ, ଭାବନାତ୍ମକ ସୁବିଧା, ଧନ ଅଭ୍ୟାସ ଓ ଦିନସରିଆ ମେଳରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    "Rasi Adhipathi": {
      about: "ରାଶି ଅଧିପତି ଦେଖେ ଯେ ଦୁହେଁର ଚନ୍ଦ୍ର ରାଶିର ଲୋର୍ଡମାନଙ୍କ ମଧ୍ୟରେ ସମ୍ପର୍କ କେମିତି ଅଛି।",
      impact: "ଏହା ମାନସିକ ସମ୍ମତି, ନିଷ୍ପତ୍ତି ନେବା ଶୈଳୀ, ଭାବନାତ୍ମକ ସମର୍ଥନ ଓ ଦୁହେଁ କେତେ ସ୍ୱାଭାବିକ ଭାବରେ ପରସ୍ପରକୁ ସହଯୋଗ କରନ୍ତି ତାହାରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Rajju: {
      about: "ରଜ୍ଜୁ ଦେଖେ ଯେ ବନ୍ଧନରେ ଦୀର୍ଘକାଳୀନ ସୁରକ୍ଷା, ସ୍ଥିରତା ଓ ପାରମ୍ପରିକ ରକ୍ଷା କେତେ ଅଛି।",
      impact: "ଏହା ବିବାହର ସ୍ଥିରତା, ପରିବାରୀକ ସୁରକ୍ଷା ଓ କଠିନ ସମୟରେ ସମ୍ପର୍କ କେତେ ଭଲରେ ଟିକେ ତାହାରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Vedha: {
      about: "ବେଧ ଦେଖେ ଯେ ତାରା ଯୁଗଳରେ କୌଣସି ପାରମ୍ପରିକ ବାଧା ଅଛି କି ନାହିଁ।",
      impact: "ଏହା କାମର ସ୍ମୂଥ୍ ପ୍ରଗତି, ପୁନଃପୁନି ବିଳମ୍ବ ଓ ଜୀବନ ଯୋଜନା କେତେଥର ଅଟକିଯାଏ ତାହାରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Vasya: {
      about: "ବଶ୍ୟ ଦେଖେ ଯେ ଦୁହେଁ ପରସ୍ପରକୁ କେତେ ସ୍ୱାଭାବିକ ଭାବରେ ସ୍ୱୀକାର କରି ଖାପ ଖୁଆଇପାରନ୍ତି।",
      impact: "ଏହା ପ୍ରତିକ୍ରିୟା, ସହଯୋଗ ଓ ଦିନସରିଆ ଜୀବନରେ ଏକସାଥିରେ ଚାଲିବାର ସହଜତାରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    "Daily Rhythm": {
      about: "ଏହି ଯୁକ୍ତ ଯାଞ୍ଚ ଦିନଚର୍ଯ୍ୟା, ସମୟର ମେଳ ଓ ଦିନସରିଆ ଧାରାକୁ ଦେଖେ।",
      impact: "ଏହା ଦିନସରିଆ ସୁବିଧା, ଘରୋଇ ରିଦମ୍, ସ୍ୱାସ୍ଥ୍ୟର ସମୟ ଓ ଦାୟିତ୍ୱକୁ ଏକସାଥିରେ କିପରି ସମ୍ଭାଳାଯାଏ ତାହାରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Communication: {
      about: "ଏହି ଯୁକ୍ତ ଯାଞ୍ଚ ମାନସିକ ବୁଝାପଡ଼ା ଓ ଦୁହେଁ କିପରି କଥାହୁଅନ୍ତି, ଶୁଣନ୍ତି ଓ ନିଷ୍ପତ୍ତି ନେଉନ୍ତି ତାହାକୁ ଦେଖେ।",
      impact: "ଏହା କଥାବାର୍ତ୍ତା, ସମସ୍ୟା ସମାଧାନ, ଯୋଜନା, ଭାବନାତ୍ମକ ଆଶ୍ୱାସନ ଓ ନିଷ୍ପତ୍ତି ନେବାରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Chemistry: {
      about: "ଏହି ଯୁକ୍ତ ଯାଞ୍ଚ ଆକର୍ଷଣ, ସୁବିଧା ଓ ଭାବନାତ୍ମକ ନିକଟତାକୁ ଦେଖେ।",
      impact: "ଏହା ନିକଟତା, ଉଷ୍ମତା, ଭରସା, ଗୋପନୀୟ ବନ୍ଧନ ଓ ସ୍ନେହ କେତେ ସ୍ୱାଭାବିକ ଭାବରେ ବଢ଼େ ତାହାରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Temperament: {
      about: "ଏହି ଯୁକ୍ତ ଯାଞ୍ଚ ସ୍ୱାଭାବିକ ଆଚରଣ, ପ୍ରତିକ୍ରିୟା ଓ ଲଚିଳାପଣକୁ ଦେଖେ।",
      impact: "ଏହା ବାଦବିବାଦ, ଧୈର୍ୟ, ଅହମ୍ ସମତୁଳନ, ଭାବନାତ୍ମକ ପ୍ରତିକ୍ରିୟା ଓ ଘରର ପରିବେଶରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    "Family Direction": {
      about: "ଏହି ଯୁକ୍ତ ଯାଞ୍ଚ ଦୀର୍ଘକାଳୀନ ଲକ୍ଷ୍ୟ ଓ ପରିବାର ଗଠନର ଦିଗକୁ ଦେଖେ।",
      impact: "ଏହା ଧନ ଯୋଜନା, ଘର ସମ୍ପର୍କିତ ନିଷ୍ପତ୍ତି, ବଡ଼ ପରିବାରର ଆଶା ଓ ସନ୍ତାନ ଯୋଜନାର ଦିଗରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    "Long-Term Stability": {
      about: "ଏହି ଯୁକ୍ତ ଯାଞ୍ଚ ସ୍ଥିରତା, ସୁରକ୍ଷା ଓ ଏହି ମିଳାନ ସମୟ ସହିତ କେତେ ଭଲରେ ଟିକିପାରେ ତାହାକୁ ଦେଖେ।",
      impact: "ଏହା ସ୍ୱାସ୍ଥ୍ୟର ସ୍ଥିରତା, ପରିବାରର ସମର୍ଥନ, ସମ୍ପର୍କର ନିୟମିତତା ଓ ବିବାହୀତ ଜୀବନର ଟିକାଉପଣରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    "Regional Agreement": {
      about: "ଏହା ଦୁଇଟି ରେଫରେନ୍ସ ଶୈଳୀର ପଢ଼ା କେତେ ନିକଟ ଅଛି ତାହାକୁ ତୁଳନା କରେ।",
      impact: "ଏହା ଶେଷ ନିଷ୍ପତ୍ତିରେ ଭରସା କେତେ ରହିବ ଏବଂ ଏକ ଶୈଳୀକୁ ଧରିବେ କି ଦୁହୋଟିକୁ ଆଉ ଭଲ ଦେଖିବେ ତାହାରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    },
    Kuja: {
      about: "କୁଜ ଦେଖେ ଯେ ମଙ୍ଗଳର ସ୍ଥିତି ବିବାହରେ ପାରମ୍ପରିକ ମଙ୍ଗଳିକ / କୁଜ ଦୋଷ ଚିନ୍ତା ଉଠାଉଛି କି ନାହିଁ।",
      impact: "ଏହା ବାଦବିବାଦର ତୀବ୍ରତା, ଘରୋଇ ଚାପ, ଭାବନାର ତାପ ଏବଂ ବିବାହ ସମୟ ବିଷୟରେ ପାରମ୍ପରିକ ସାବଧାନତାରେ ପ୍ରଭାବ ପକାଇପାରେ।"
    }
  }
};

const MATCH_CHECK_META_LABELS = {
  en: {
    about: "What it checks",
    impact: "Life impact"
  },
  or: {
    about: "ଏହା କ’ଣ ଦେଖେ",
    impact: "ଜୀବନରେ ପ୍ରଭାବ"
  }
};

const REPORT_UI_TEXT = {
  en: {
    resultKicker: "Easy Match Report",
    reportLanguage: "Report Language",
    downloadPdf: "Download",
    readingStyle: "Reading Style",
    matchLevel: "Match Level",
    regionalGap: "Regional Gap",
    sectionReadTitle: "Match Details",
    sectionReadDesc: "A quick and simple reading of this match.",
    sectionPriorityTitle: "Main Things To Check",
    sectionPriorityDesc: "Look at these first before deciding.",
    sectionBasisTitle: "Groom and Bride Details",
    sectionBasisDesc: "Entered details used for this match.",
    sectionKundaliTitle: "Chart Snapshot",
    sectionKundaliDesc: "Chart data used in this match.",
    sectionTrustTitle: "Important Notes",
    sectionTrustDesc: "Read these notes before trusting the result fully.",
    sectionMiddleTitle: "Kundli Numbers",
    sectionMiddleDesc: "These support numbers are also used in the match.",
    sectionRegionalTitle: "Regional Reading",
    sectionRegionalDesc: "See how East and South styles read this match.",
    sectionGoodTitle: "Good Signs",
    sectionGoodDesc: "Positive points in simple words.",
    sectionCareTitle: "Care Points",
    sectionCareDesc: "Areas that may need more attention.",
    sectionChecksTitle: "Score Details",
    sectionChecksDesc: "These checks build the final score.",
    mainResultLabel: "Main Result",
    guideBandLabel: "Guide Band",
    nextStepLabel: "Next Step",
    shortSummary: "Short Summary",
    styleLabel: "Style",
    sourceLabel: "Source",
    personALabel: "Groom",
    personBLabel: "Bride",
    matchDetailsTitle: "Match Details",
    matchScoreLabel: "Match Score",
    regionalAgreement: "Regional Agreement",
    pdfTitle: "Easy Match Report",
    lensCompare: "Compare both",
    lensEast: "East India focus",
    lensSouth: "South India focus"
  },
  hi: {
    resultKicker: "सरल मिलान रिपोर्ट",
    reportLanguage: "रिपोर्ट भाषा",
    downloadPdf: "डाउनलोड",
    readingStyle: "पढ़ने का तरीका",
    matchLevel: "मिलान स्तर",
    regionalGap: "क्षेत्रीय अंतर",
    sectionReadTitle: "मिलान विवरण",
    sectionReadDesc: "इस मिलान की छोटी और सरल पढ़ाई।",
    sectionPriorityTitle: "पहले क्या देखें",
    sectionPriorityDesc: "फैसला लेने से पहले इन्हें देखें।",
    sectionBasisTitle: "मिलान में क्या लिया गया",
    sectionBasisDesc: "यही मुख्य कुंडली बातें ली गई हैं।",
    sectionKundaliTitle: "चार्ट झलक",
    sectionKundaliDesc: "इस मिलान में उपयोग किया गया चार्ट डेटा।",
    sectionTrustTitle: "ज़रूरी बातें",
    sectionTrustDesc: "पूरा भरोसा करने से पहले ये बातें पढ़ें।",
    sectionMiddleTitle: "कुंडली अंक",
    sectionMiddleDesc: "ये सहायक अंक भी मिलान में लिए गए हैं।",
    sectionRegionalTitle: "क्षेत्रीय पढ़ाई",
    sectionRegionalDesc: "पूर्व और दक्षिण शैली क्या कहती हैं।",
    sectionGoodTitle: "अच्छे संकेत",
    sectionGoodDesc: "अच्छी बातें सरल शब्दों में।",
    sectionCareTitle: "ध्यान देने की बातें",
    sectionCareDesc: "जिन बातों पर ध्यान देना चाहिए।",
    sectionChecksTitle: "अंक का विवरण",
    sectionChecksDesc: "इन्हीं से अंतिम अंक बनता है।",
    mainResultLabel: "मुख्य परिणाम",
    guideBandLabel: "गाइड श्रेणी",
    nextStepLabel: "अगला कदम",
    shortSummary: "छोटी बात",
    styleLabel: "शैली",
    sourceLabel: "स्रोत",
    personALabel: "व्यक्ति A",
    personBLabel: "व्यक्ति B",
    matchDetailsTitle: "मिलान विवरण",
    matchScoreLabel: "मिलान अंक",
    regionalAgreement: "क्षेत्रीय सहमति",
    pdfTitle: "सरल मिलान रिपोर्ट",
    lensCompare: "दोनों शैली साथ में",
    lensEast: "पूर्व भारत शैली",
    lensSouth: "दक्षिण भारत शैली"
  },
  bn: {
    resultKicker: "সহজ মিল রিপোর্ট",
    reportLanguage: "রিপোর্টের ভাষা",
    downloadPdf: "ডাউনলোড",
    readingStyle: "পড়ার ধরন",
    matchLevel: "মিলের স্তর",
    regionalGap: "আঞ্চলিক পার্থক্য",
    sectionReadTitle: "মিলের বিবরণ",
    sectionReadDesc: "এই মিলের সহজ এবং ছোট পড়া।",
    sectionPriorityTitle: "আগে কী দেখবেন",
    sectionPriorityDesc: "সিদ্ধান্তের আগে এগুলো দেখুন।",
    sectionBasisTitle: "মিলে যা ধরা হয়েছে",
    sectionBasisDesc: "এগুলোই মূল কুণ্ডলী তথ্য।",
    sectionKundaliTitle: "চার্ট ঝলক",
    sectionKundaliDesc: "এই মিলে ব্যবহার করা চার্ট তথ্য।",
    sectionTrustTitle: "গুরুত্বপূর্ণ কথা",
    sectionTrustDesc: "পুরো ভরসার আগে এগুলো পড়ুন।",
    sectionMiddleTitle: "কুন্ডলী সংখ্যা",
    sectionMiddleDesc: "এই সহায়ক সংখ্যাগুলোও মিলের অংশ।",
    sectionRegionalTitle: "আঞ্চলিক পড়া",
    sectionRegionalDesc: "পূর্ব আর দক্ষিণ ধারা কী বলছে দেখুন।",
    sectionGoodTitle: "ভাল দিক",
    sectionGoodDesc: "ভাল দিক সহজ ভাষায়।",
    sectionCareTitle: "সতর্কতার দিক",
    sectionCareDesc: "যেগুলোতে নজর দরকার।",
    sectionChecksTitle: "স্কোরের বিবরণ",
    sectionChecksDesc: "এই অংশগুলো মিলে স্কোর বানায়।",
    mainResultLabel: "মূল ফল",
    guideBandLabel: "গাইড স্তর",
    nextStepLabel: "পরের ধাপ",
    shortSummary: "ছোট সারাংশ",
    styleLabel: "ধরণ",
    sourceLabel: "উৎস",
    personALabel: "ব্যক্তি A",
    personBLabel: "ব্যক্তি B",
    matchDetailsTitle: "মিলের বিবরণ",
    matchScoreLabel: "মিলের স্কোর",
    regionalAgreement: "আঞ্চলিক মিল",
    pdfTitle: "সহজ মিল রিপোর্ট",
    lensCompare: "দুই ধরন একসাথে",
    lensEast: "পূর্ব ভারত ধরণ",
    lensSouth: "দক্ষিণ ভারত ধরণ"
  },
  te: {
    resultKicker: "సులభ జోడీ రిపోర్ట్",
    reportLanguage: "రిపోర్ట్ భాష",
    downloadPdf: "డౌన్లోడ్",
    readingStyle: "చదివే విధానం",
    matchLevel: "జోడీ స్థాయి",
    regionalGap: "ప్రాంతీయ తేడా",
    sectionReadTitle: "మ్యాచ్ వివరాలు",
    sectionReadDesc: "ఈ జోడీకి చిన్న మరియు సులభ చదువు.",
    sectionPriorityTitle: "ముందు చూడవలసినవి",
    sectionPriorityDesc: "నిర్ణయం ముందు ఇవి చూడండి.",
    sectionBasisTitle: "మ్యాచ్‌కు తీసుకున్నవి",
    sectionBasisDesc: "ఇవి ప్రధాన కుండలి అంశాలు.",
    sectionKundaliTitle: "చార్ట్ స్నాప్‌షాట్",
    sectionKundaliDesc: "ఈ మ్యాచ్‌లో ఉపయోగించిన చార్ట్ డేటా.",
    sectionTrustTitle: "ముఖ్య గమనికలు",
    sectionTrustDesc: "పూర్తిగా నమ్మే ముందు ఇవి చదవండి.",
    sectionMiddleTitle: "కుండలి సంఖ్యలు",
    sectionMiddleDesc: "ఈ సహాయక సంఖ్యలు కూడా మ్యాచ్‌లో ఉన్నాయి.",
    sectionRegionalTitle: "ప్రాంతీయ చదువు",
    sectionRegionalDesc: "తూర్పు, దక్షిణ శైలులు ఏమంటున్నాయో చూడండి.",
    sectionGoodTitle: "మంచి సూచనలు",
    sectionGoodDesc: "మంచి విషయాలు సులభంగా.",
    sectionCareTitle: "జాగ్రత్త విషయాలు",
    sectionCareDesc: "జాగ్రత్తగా చూడాల్సినవి.",
    sectionChecksTitle: "స్కోర్ వివరాలు",
    sectionChecksDesc: "ఇవి చివరి స్కోర్‌ను తయారు చేస్తాయి.",
    mainResultLabel: "ముఖ్య ఫలితం",
    guideBandLabel: "గైడ్ స్థాయి",
    nextStepLabel: "తర్వాతి అడుగు",
    shortSummary: "చిన్న సారాంశం",
    styleLabel: "శైలి",
    sourceLabel: "మూలం",
    personALabel: "వ్యక్తి A",
    personBLabel: "వ్యక్తి B",
    matchDetailsTitle: "మ్యాచ్ వివరాలు",
    matchScoreLabel: "మ్యాచ్ స్కోర్",
    regionalAgreement: "ప్రాంతీయ ఒప్పుదల",
    pdfTitle: "సులభ జోడీ రిపోర్ట్",
    lensCompare: "రెండు శైలులు కలిసి",
    lensEast: "తూర్పు భారత శైలి",
    lensSouth: "దక్షిణ భారత శైలి"
  },
  mr: {
    resultKicker: "सोपी जुळणी अहवाल",
    reportLanguage: "अहवाल भाषा",
    downloadPdf: "डाउनलोड",
    readingStyle: "वाचन पद्धत",
    matchLevel: "जुळणी स्तर",
    regionalGap: "प्रादेशिक फरक",
    sectionReadTitle: "जुळणी तपशील",
    sectionReadDesc: "या जुळणीचे छोटे आणि सोपे वाचन.",
    sectionPriorityTitle: "आधी काय पाहावे",
    sectionPriorityDesc: "निर्णयापूर्वी हे पहा.",
    sectionBasisTitle: "जुळणीत काय वापरले",
    sectionBasisDesc: "ही मुख्य कुंडली माहिती आहे.",
    sectionKundaliTitle: "चार्ट झलक",
    sectionKundaliDesc: "या जुळणीत वापरलेला चार्ट डेटा.",
    sectionTrustTitle: "महत्त्वाच्या नोंदी",
    sectionTrustDesc: "पूर्ण विश्वासापूर्वी हे वाचा.",
    sectionMiddleTitle: "कुंडली अंक",
    sectionMiddleDesc: "हे मदतीचे अंकही जुळणीत घेतले आहेत.",
    sectionRegionalTitle: "प्रादेशिक वाचन",
    sectionRegionalDesc: "पूर्व आणि दक्षिण शैली काय सांगतात ते पहा.",
    sectionGoodTitle: "चांगली चिन्हे",
    sectionGoodDesc: "चांगले मुद्दे सोप्या शब्दांत.",
    sectionCareTitle: "काळजीचे मुद्दे",
    sectionCareDesc: "ज्या गोष्टींकडे लक्ष द्यावे.",
    sectionChecksTitle: "गुणांचे तपशील",
    sectionChecksDesc: "यातून अंतिम गुण तयार होतात.",
    mainResultLabel: "मुख्य निकाल",
    guideBandLabel: "मार्गदर्शक पट्टा",
    nextStepLabel: "पुढील पाऊल",
    shortSummary: "थोडक्यात",
    styleLabel: "शैली",
    sourceLabel: "स्रोत",
    personALabel: "व्यक्ती A",
    personBLabel: "व्यक्ती B",
    matchDetailsTitle: "जुळणी तपशील",
    matchScoreLabel: "जुळणी गुण",
    regionalAgreement: "प्रादेशिक जुळव",
    pdfTitle: "सोपी जुळणी अहवाल",
    lensCompare: "दोन्ही शैली एकत्र",
    lensEast: "पूर्व भारत शैली",
    lensSouth: "दक्षिण भारत शैली"
  },
  ta: {
    resultKicker: "எளிய பொருத்த அறிக்கை",
    reportLanguage: "அறிக்கை மொழி",
    downloadPdf: "பதிவிறக்கு",
    readingStyle: "பார்க்கும் முறை",
    matchLevel: "பொருத்த நிலை",
    regionalGap: "பிராந்திய வித்தியாசம்",
    sectionReadTitle: "பொருத்த விவரம்",
    sectionReadDesc: "இந்த பொருத்தத்தின் சுலபமான சிறிய வாசிப்பு.",
    sectionPriorityTitle: "முதலில் பார்க்க வேண்டியது",
    sectionPriorityDesc: "முடிவு செய்வதற்கு முன் இதைப் பாருங்கள்.",
    sectionBasisTitle: "பொருத்தத்தில் எடுத்தவை",
    sectionBasisDesc: "இவை முக்கிய குண்டலி தகவல்கள்.",
    sectionKundaliTitle: "ஜாதகத் தோற்றம்",
    sectionKundaliDesc: "இந்த பொருத்தத்தில் பயன்படுத்திய ஜாதகத் தகவல்.",
    sectionTrustTitle: "முக்கிய குறிப்புகள்",
    sectionTrustDesc: "முழு நம்பிக்கைக்கு முன் இதைப் படிக்கவும்.",
    sectionMiddleTitle: "குண்டலி எண்கள்",
    sectionMiddleDesc: "இந்த உதவி எண்களும் பொருத்தத்தில் உள்ளன.",
    sectionRegionalTitle: "பிராந்திய வாசிப்பு",
    sectionRegionalDesc: "கிழக்கு, தெற்கு முறை என்ன சொல்கிறது பாருங்கள்.",
    sectionGoodTitle: "நல்ல அறிகுறிகள்",
    sectionGoodDesc: "நல்ல புள்ளிகள் எளிய சொற்களில்.",
    sectionCareTitle: "கவனிக்க வேண்டியவை",
    sectionCareDesc: "கவனம் தேவைப்படும் பகுதிகள்.",
    sectionChecksTitle: "மதிப்பெண் விவரம்",
    sectionChecksDesc: "இவையே இறுதி மதிப்பெண்ணை தருகின்றன.",
    mainResultLabel: "முக்கிய முடிவு",
    guideBandLabel: "வழிகாட்டி நிலை",
    nextStepLabel: "அடுத்த படி",
    shortSummary: "சிறு சுருக்கம்",
    styleLabel: "முறை",
    sourceLabel: "மூலம்",
    personALabel: "நபர் A",
    personBLabel: "நபர் B",
    matchDetailsTitle: "பொருத்த விவரம்",
    matchScoreLabel: "பொருத்த மதிப்பெண்",
    regionalAgreement: "பிராந்திய ஒத்துப்பாடு",
    pdfTitle: "எளிய பொருத்த அறிக்கை",
    lensCompare: "இரண்டு முறைகளும்",
    lensEast: "கிழக்கு இந்திய முறை",
    lensSouth: "தென் இந்திய முறை"
  },
  gu: {
    resultKicker: "સરળ મેળાપ રિપોર્ટ",
    reportLanguage: "રિપોર્ટ ભાષા",
    downloadPdf: "ડાઉનલોડ",
    readingStyle: "વાંચનની રીત",
    matchLevel: "મેળાપ સ્તર",
    regionalGap: "પ્રાદેશિક ફરક",
    sectionReadTitle: "મેળાપ વિગતો",
    sectionReadDesc: "આ મેળાપનું નાનું અને સરળ વાંચન.",
    sectionPriorityTitle: "પહેલા શું જોવું",
    sectionPriorityDesc: "નિર્ણય પહેલા આ જુઓ.",
    sectionBasisTitle: "મેળાપમાં શું લેવાયું",
    sectionBasisDesc: "આ મુખ્ય કુંડળી બાબતો છે.",
    sectionKundaliTitle: "ચાર્ટ ઝલક",
    sectionKundaliDesc: "આ મેળાપમાં વપરાયેલ ચાર્ટ માહિતી.",
    sectionTrustTitle: "મહત્વની નોંધો",
    sectionTrustDesc: "પૂર્ણ વિશ્વાસ પહેલા આ વાંચો.",
    sectionMiddleTitle: "કુંડળી અંક",
    sectionMiddleDesc: "આ સહાયક અંકો પણ મેળાપમાં લેવાયા છે.",
    sectionRegionalTitle: "પ્રાદેશિક વાંચન",
    sectionRegionalDesc: "પૂર્વ અને દક્ષિણ રીત શું કહે છે જુઓ.",
    sectionGoodTitle: "સારા સંકેત",
    sectionGoodDesc: "સારાં મુદ્દા સરળ ભાષામાં.",
    sectionCareTitle: "ધ્યાનના મુદ્દા",
    sectionCareDesc: "જ્યાં વધુ ધ્યાન જોઈએ.",
    sectionChecksTitle: "સ્કોરની વિગત",
    sectionChecksDesc: "આમાંથી અંતિમ સ્કોર બને છે.",
    mainResultLabel: "મુખ્ય પરિણામ",
    guideBandLabel: "ગાઇડ સ્તર",
    nextStepLabel: "આગળનું પગલું",
    shortSummary: "ટૂંકું સાર",
    styleLabel: "રીત",
    sourceLabel: "સ્ત્રોત",
    personALabel: "વ્યક્તિ A",
    personBLabel: "વ્યક્તિ B",
    matchDetailsTitle: "મેળાપ વિગતો",
    matchScoreLabel: "મેળાપ સ્કોર",
    regionalAgreement: "પ્રાદેશિક મેળ",
    pdfTitle: "સરળ મેળાપ રિપોર્ટ",
    lensCompare: "બંને રીત સાથે",
    lensEast: "પૂર્વ ભારત રીત",
    lensSouth: "દક્ષિણ ભારત રીત"
  },
  kn: {
    resultKicker: "ಸರಳ ಹೊಂದಾಣಿಕೆ ವರದಿ",
    reportLanguage: "ವರದಿ ಭಾಷೆ",
    downloadPdf: "ಡೌನ್‌ಲೋಡ್",
    readingStyle: "ಓದುವ ವಿಧಾನ",
    matchLevel: "ಹೊಂದಾಣಿಕೆ ಹಂತ",
    regionalGap: "ಪ್ರಾದೇಶಿಕ ವ್ಯತ್ಯಾಸ",
    sectionReadTitle: "ಹೊಂದಾಣಿಕೆ ವಿವರ",
    sectionReadDesc: "ಈ ಹೊಂದಾಣಿಕೆಯ ಸಣ್ಣ ಮತ್ತು ಸರಳ ಓದು.",
    sectionPriorityTitle: "ಮೊದಲು ನೋಡುವುದು",
    sectionPriorityDesc: "ತೀರ್ಮಾನಕ್ಕಿಂತ ಮೊದಲು ಇವನ್ನು ನೋಡಿ.",
    sectionBasisTitle: "ಹೊಂದಾಣಿಕೆಗೆ ಬಳಸಿದ್ದು",
    sectionBasisDesc: "ಇವು ಮುಖ್ಯ ಕುಂಡಲಿ ಅಂಶಗಳು.",
    sectionKundaliTitle: "ಚಾರ್ಟ್ ಚಿತ್ರಣ",
    sectionKundaliDesc: "ಈ ಹೊಂದಾಣಿಕೆಯಲ್ಲಿ ಬಳಸಿದ ಚಾರ್ಟ್ ಮಾಹಿತಿ.",
    sectionTrustTitle: "ಮುಖ್ಯ ಟಿಪ್ಪಣಿ",
    sectionTrustDesc: "ಪೂರ್ಣ ನಂಬಿಕೆಗೆ ಮೊದಲು ಇವನ್ನು ಓದಿ.",
    sectionMiddleTitle: "ಕುಂಡಲಿ ಅಂಕಗಳು",
    sectionMiddleDesc: "ಈ ಸಹಾಯಕ ಅಂಕಗಳೂ ಹೊಂದಾಣಿಕೆಯಲ್ಲಿ ఉన్నాయి.",
    sectionRegionalTitle: "ಪ್ರಾದೇಶಿಕ ಓದು",
    sectionRegionalDesc: "ಪೂರ್ವ ಮತ್ತು ದಕ್ಷಿಣ ಶೈಲಿ ಏನು ಹೇಳುತ್ತವೆ ನೋಡಿ.",
    sectionGoodTitle: "ಒಳ್ಳೆಯ ಸೂಚನೆಗಳು",
    sectionGoodDesc: "ಒಳ್ಳೆಯ ವಿಷಯಗಳು ಸರಳವಾಗಿ.",
    sectionCareTitle: "ಗಮನದ ವಿಷಯಗಳು",
    sectionCareDesc: "ಹೆಚ್ಚು ಗಮನ ಬೇಕಾದವು.",
    sectionChecksTitle: "ಅಂಕಗಳ ವಿವರ",
    sectionChecksDesc: "ಇವು ಅಂತಿಮ ಅಂಕ ತರುತ್ತವೆ.",
    mainResultLabel: "ಮುಖ್ಯ ಫಲ",
    guideBandLabel: "ಮಾರ್ಗದರ್ಶಿ ಹಂತ",
    nextStepLabel: "ಮುಂದಿನ ಹೆಜ್ಜೆ",
    shortSummary: "ಸಣ್ಣ ಸಾರಾಂಶ",
    styleLabel: "ಶೈಲಿ",
    sourceLabel: "ಮೂಲ",
    personALabel: "ವ್ಯಕ್ತಿ A",
    personBLabel: "ವ್ಯಕ್ತಿ B",
    matchDetailsTitle: "ಹೊಂದಾಣಿಕೆ ವಿವರ",
    matchScoreLabel: "ಹೊಂದಾಣಿಕೆ ಅಂಕ",
    regionalAgreement: "ಪ್ರಾದೇಶಿಕ ಒಪ್ಪಂದ",
    pdfTitle: "ಸರಳ ಹೊಂದಾಣಿಕೆ ವರದಿ",
    lensCompare: "ಎರಡು ಶೈಲಿ ಸೇರಿಸಿ",
    lensEast: "ಪೂರ್ವ ಭಾರತದ ಶೈಲಿ",
    lensSouth: "ದಕ್ಷಿಣ ಭಾರತದ ಶೈಲಿ"
  },
  ml: {
    resultKicker: "ലളിത പൊരുത്ത റിപ്പോർട്ട്",
    reportLanguage: "റിപ്പോർട്ട് ഭാഷ",
    downloadPdf: "ഡൗൺലോഡ്",
    readingStyle: "വായന രീതി",
    matchLevel: "പൊരുത്ത നില",
    regionalGap: "പ്രാദേശിക വ്യത്യാസം",
    sectionReadTitle: "പൊരുത്ത വിശദാംശം",
    sectionReadDesc: "ഈ പൊരുത്തത്തിന്റെ ചെറിയ ലളിത വായനം.",
    sectionPriorityTitle: "ആദ്യം നോക്കേണ്ടത്",
    sectionPriorityDesc: "തീരുമാനത്തിന് മുമ്പ് ഇവ നോക്കുക.",
    sectionBasisTitle: "പൊരുത്തത്തിൽ എടുത്തത്",
    sectionBasisDesc: "ഇവയാണ് പ്രധാന കുണ്ടലി കാര്യങ്ങൾ.",
    sectionKundaliTitle: "ചാർട്ട് ദൃശ്യം",
    sectionKundaliDesc: "ഈ പൊരുത്തത്തിൽ ഉപയോഗിച്ച ചാർട്ട് വിവരങ്ങൾ.",
    sectionTrustTitle: "പ്രധാന കുറിപ്പുകൾ",
    sectionTrustDesc: "പൂർണ്ണമായി വിശ്വസിക്കുന്നതിന് മുമ്പ് ഇവ വായിക്കുക.",
    sectionMiddleTitle: "കുണ്ടലി സംഖ്യകൾ",
    sectionMiddleDesc: "ഈ സഹായ സംഖ്യകളും പൊരുത്തത്തിൽ ഉണ്ട്.",
    sectionRegionalTitle: "പ്രാദേശിക വായനം",
    sectionRegionalDesc: "കിഴക്കും തെക്കും എന്ത് പറയുന്നു എന്ന് നോക്കൂ.",
    sectionGoodTitle: "നല്ല സൂചനകൾ",
    sectionGoodDesc: "നല്ല കാര്യങ്ങൾ ലളിതമായി.",
    sectionCareTitle: "ശ്രദ്ധിക്കേണ്ട കാര്യങ്ങൾ",
    sectionCareDesc: "കൂടുതൽ ശ്രദ്ധ വേണമെന്ന കാര്യങ്ങൾ.",
    sectionChecksTitle: "സ്കോർ വിശദാംശങ്ങൾ",
    sectionChecksDesc: "ഇവയാണ് അവസാന സ്കോർ ഉണ്ടാക്കുന്നത്.",
    mainResultLabel: "പ്രധാന ഫലം",
    guideBandLabel: "ഗൈഡ് നില",
    nextStepLabel: "അടുത്ത പടി",
    shortSummary: "ചെറിയ സാരം",
    styleLabel: "ശൈലി",
    sourceLabel: "ഉറവിടം",
    personALabel: "ആൾ A",
    personBLabel: "ആൾ B",
    matchDetailsTitle: "പൊരുത്ത വിശദാംശം",
    matchScoreLabel: "പൊരുത്ത സ്കോർ",
    regionalAgreement: "പ്രാദേശിക ഒത്തുപോക്ക്",
    pdfTitle: "ലളിത പൊരുത്ത റിപ്പോർട്ട്",
    lensCompare: "രണ്ട് ശൈലിയും",
    lensEast: "കിഴക്കൻ ഇന്ത്യ ശൈലി",
    lensSouth: "തെക്കൻ ഇന്ത്യ ശൈലി"
  },
  pa: {
    resultKicker: "ਸੌਖੀ ਮਿਲਾਪ ਰਿਪੋਰਟ",
    reportLanguage: "ਰਿਪੋਰਟ ਭਾਸ਼ਾ",
    downloadPdf: "ਡਾਊਨਲੋਡ",
    readingStyle: "ਪੜ੍ਹਨ ਦਾ ਢੰਗ",
    matchLevel: "ਮਿਲਾਪ ਪੱਧਰ",
    regionalGap: "ਖੇਤਰੀ ਫਰਕ",
    sectionReadTitle: "ਮਿਲਾਪ ਵੇਰਵਾ",
    sectionReadDesc: "ਇਸ ਮਿਲਾਪ ਦੀ ਛੋਟੀ ਤੇ ਸੌਖੀ ਪੜ੍ਹਾਈ।",
    sectionPriorityTitle: "ਪਹਿਲਾਂ ਕੀ ਵੇਖਣਾ",
    sectionPriorityDesc: "ਫੈਸਲੇ ਤੋਂ ਪਹਿਲਾਂ ਇਹ ਵੇਖੋ।",
    sectionBasisTitle: "ਮਿਲਾਪ ਵਿੱਚ ਕੀ ਲਿਆ",
    sectionBasisDesc: "ਇਹ ਮੁੱਖ ਕੁੰਡਲੀ ਗੱਲਾਂ ਹਨ।",
    sectionKundaliTitle: "ਚਾਰਟ ਝਲਕ",
    sectionKundaliDesc: "ਇਸ ਮਿਲਾਪ ਵਿੱਚ ਵਰਤੀ ਗਈ ਚਾਰਟ ਜਾਣਕਾਰੀ।",
    sectionTrustTitle: "ਜ਼ਰੂਰੀ ਨੋਟ",
    sectionTrustDesc: "ਪੂਰਾ ਭਰੋਸਾ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਇਹ ਪੜ੍ਹੋ।",
    sectionMiddleTitle: "ਕੁੰਡਲੀ ਅੰਕ",
    sectionMiddleDesc: "ਇਹ ਸਹਾਇਕ ਅੰਕ ਵੀ ਮਿਲਾਪ ਵਿੱਚ ਹਨ।",
    sectionRegionalTitle: "ਖੇਤਰੀ ਪੜ੍ਹਾਈ",
    sectionRegionalDesc: "ਪੂਰਬ ਅਤੇ ਦੱਖਣ ਅੰਦਾਜ਼ ਕੀ ਕਹਿੰਦੇ ਹਨ ਵੇਖੋ।",
    sectionGoodTitle: "ਚੰਗੇ ਸੰਕੇਤ",
    sectionGoodDesc: "ਚੰਗੀਆਂ ਗੱਲਾਂ ਸੌਖੇ ਸ਼ਬਦਾਂ ਵਿੱਚ।",
    sectionCareTitle: "ਧਿਆਨ ਵਾਲੀਆਂ ਗੱਲਾਂ",
    sectionCareDesc: "ਜਿੱਥੇ ਹੋਰ ਧਿਆਨ ਚਾਹੀਦਾ ਹੈ।",
    sectionChecksTitle: "ਅੰਕਾਂ ਦਾ ਵੇਰਵਾ",
    sectionChecksDesc: "ਇਨ੍ਹਾਂ ਨਾਲ ਆਖਰੀ ਅੰਕ ਬਣਦੇ ਹਨ।",
    mainResultLabel: "ਮੁੱਖ ਨਤੀਜਾ",
    guideBandLabel: "ਗਾਈਡ ਪੱਧਰ",
    nextStepLabel: "ਅਗਲਾ ਕਦਮ",
    shortSummary: "ਛੋਟਾ ਸਾਰ",
    styleLabel: "ਅੰਦਾਜ਼",
    sourceLabel: "ਸਰੋਤ",
    personALabel: "ਵਿਅਕਤੀ A",
    personBLabel: "ਵਿਅਕਤੀ B",
    matchDetailsTitle: "ਮਿਲਾਪ ਵੇਰਵਾ",
    matchScoreLabel: "ਮਿਲਾਪ ਅੰਕ",
    regionalAgreement: "ਖੇਤਰੀ ਮਿਲਾਪ",
    pdfTitle: "ਸੌਖੀ ਮਿਲਾਪ ਰਿਪੋਰਟ",
    lensCompare: "ਦੋਵੇਂ ਢੰਗ ਨਾਲ",
    lensEast: "ਪੂਰਬੀ ਭਾਰਤ ਢੰਗ",
    lensSouth: "ਦੱਖਣੀ ਭਾਰਤ ਢੰਗ"
  },
  or: {
    resultKicker: "ସହଜ ମିଳାନ ରିପୋର୍ଟ",
    reportLanguage: "ରିପୋର୍ଟ ଭାଷା",
    downloadPdf: "ଡାଉନଲୋଡ୍",
    readingStyle: "ପଢ଼ିବା ଶୈଳୀ",
    matchLevel: "ମିଳାନ ମାପ",
    regionalGap: "ଅଞ୍ଚଳ ତଫାତ",
    sectionReadTitle: "ମିଳାନ ବିବରଣୀ",
    sectionReadDesc: "ଏହି ମିଳାନର ଛୋଟ ଏବଂ ସହଜ ପଢ଼ା।",
    sectionPriorityTitle: "ପ୍ରଥମେ ଦେଖନ୍ତୁ",
    sectionPriorityDesc: "ନିଷ୍ପତ୍ତି ପୂର୍ବରୁ ଏଗୁଡ଼ିକୁ ଦେଖନ୍ତୁ।",
    sectionBasisTitle: "ମିଳାନରେ ନିଆଯାଇଥିବା",
    sectionBasisDesc: "ଏଗୁଡ଼ିକ ମୁଖ୍ୟ କୁଣ୍ଡଳୀ ତଥ୍ୟ।",
    sectionKundaliTitle: "ଚାର୍ଟ ସ୍ନାପଶଟ୍",
    sectionKundaliDesc: "ଏହି ମିଳାନରେ ବ୍ୟବହୃତ ଚାର୍ଟ ତଥ୍ୟ।",
    sectionTrustTitle: "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଟିପ୍ପଣୀ",
    sectionTrustDesc: "ପୂରା ଭରସା ପୂର୍ବରୁ ଏଗୁଡ଼ିକ ପଢ଼ନ୍ତୁ।",
    sectionMiddleTitle: "କୁଣ୍ଡଳୀ ସଂଖ୍ୟା",
    sectionMiddleDesc: "ଏହି ସହାୟକ ସଂଖ୍ୟାଗୁଡ଼ିକୁ ମଧ୍ୟ ମିଳାନରେ ନିଆଯାଇଛି।",
    sectionRegionalTitle: "ଅଞ୍ଚଳୀୟ ପଢ଼ା",
    sectionRegionalDesc: "ପୂର୍ବ ଏବଂ ଦକ୍ଷିଣ ଶୈଳୀ କ’ଣ କୁହୁଛି ଦେଖନ୍ତୁ।",
    sectionGoodTitle: "ଭଲ ସଙ୍କେତ",
    sectionGoodDesc: "ଭଲ ପକ୍ଷ ସହଜ ଭାଷାରେ।",
    sectionCareTitle: "ସାବଧାନୀ ବିଷୟ",
    sectionCareDesc: "ଯେଉଁଥିରେ ଅଧିକ ଧ୍ୟାନ ଦରକାର।",
    sectionChecksTitle: "ସ୍କୋର ବିବରଣୀ",
    sectionChecksDesc: "ଏଗୁଡ଼ିକ ମିଶି ଶେଷ ସ୍କୋର ତିଆରି କରେ।",
    mainResultLabel: "ମୁଖ୍ୟ ଫଳ",
    guideBandLabel: "ଗାଇଡ୍ ସ୍ତର",
    nextStepLabel: "ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ",
    shortSummary: "ଛୋଟ ସାର",
    styleLabel: "ଶୈଳୀ",
    sourceLabel: "ଉତ୍ସ",
    personALabel: "ବ୍ୟକ୍ତି A",
    personBLabel: "ବ୍ୟକ୍ତି B",
    matchDetailsTitle: "ମିଳାନ ବିବରଣୀ",
    matchScoreLabel: "ମିଳାନ ସ୍କୋର",
    regionalAgreement: "ଅଞ୍ଚଳୀୟ ସମନ୍ୱୟ",
    pdfTitle: "ସହଜ ମିଳାନ ରିପୋର୍ଟ",
    lensCompare: "ଦୁଇଟି ଶୈଳୀ ସହିତ",
    lensEast: "ପୂର୍ବ ଭାରତ ଶୈଳୀ",
    lensSouth: "ଦକ୍ଷିଣ ଭାରତ ଶୈଳୀ"
  }
};

const RESULT_TEXT_TRANSLATIONS = {
  hi: {
    "Needs more checking": "अधिक जाँच की ज़रूरत है",
    "Can work, but check weak points": "चल सकता है, पर कमजोर बातें देखें",
    "Good match for marriage talks": "विवाह के लिए अच्छा मिलान",
    "Very good match": "बहुत अच्छा मिलान",
    "Weak match": "कमज़ोर मिलान",
    "Average match": "सामान्य मिलान",
    "Good match": "अच्छा मिलान",
    "Very strong match": "बहुत मज़बूत मिलान",
    "This score is below the usual safe line.": "यह अंक सामान्य सुरक्षित रेखा से नीचे है।",
    "Please check this match more deeply before deciding.": "निर्णय से पहले इस मिलान को और गहराई से देखें।",
    "Pause and check": "रुकें और जाँच करें",
    "See the weak points first and take a fuller horoscope review.": "पहले कमजोर बातें देखें और पूरी कुंडली जाँच लें।",
    "This match can work, but some points need care.": "यह मिलान चल सकता है, पर कुछ बातों में सावधानी चाहिए।",
    "Daily life may go well if the weak areas are handled properly.": "कमज़ोर बातों को संभाल लिया जाए तो रोज़मर्रा जीवन ठीक चल सकता है।",
    "Go ahead carefully": "सावधानी से आगे बढ़ें",
    "Read the care points first and talk clearly about family and routine.": "पहले सावधानी वाले बिंदु पढ़ें और परिवार व दिनचर्या पर साफ बात करें।",
    "This score is in the good range.": "यह अंक अच्छे दायरे में है।",
    "The match has good support overall.": "कुल मिलाकर यह मिलान अच्छा सहारा दिखाता है।",
    "Go ahead with confidence": "विश्वास से आगे बढ़ें",
    "Use the main checks to align expectations.": "मुख्य बिंदुओं से अपेक्षाएँ मिलाएँ।",
    "This score is in the highest range.": "यह अंक सबसे ऊँचे दायरे में है।",
    "The match looks strong across the main checks.": "मुख्य जाँचों में यह मिलान मज़बूत दिखता है।",
    "Use as confirmation": "पुष्टि के रूप में लें",
    "Read the main checks once and use this mostly as confirmation.": "मुख्य बिंदु एक बार पढ़ें और इसे पुष्टि की तरह लें।",
    "Strong": "मज़बूत",
    "Good": "अच्छा",
    "Average": "सामान्य",
    "Careful": "सावधानी",
    "Very Good Match": "बहुत अच्छा मिलान",
    "Good Match": "अच्छा मिलान",
    "Okay Match": "ठीक-ठाक मिलान",
    "Needs Care": "सावधानी चाहिए",
    "Consistent": "एक जैसा",
    "Noticeable gap": "ध्यान देने लायक अंतर",
    "Traditions differ": "परंपराएँ अलग पढ़ रही हैं",
    "This point looks strong.": "यह बिंदु मज़बूत दिख रहा है।",
    "This point needs some care.": "इस बिंदु पर कुछ सावधानी चाहिए।",
    "This point needs closer review.": "इस बिंदु को और ध्यान से देखें।",
    "This point looks moderate.": "यह बिंदु मध्यम दिख रहा है।",
    "Both regional readings are close.": "दोनों क्षेत्रीय पढ़ाइयाँ काफ़ी करीब हैं।",
    "The two regional readings differ a little.": "दोनों क्षेत्रीय पढ़ाइयों में थोड़ा अंतर है।",
    "The two regional readings are clearly different.": "दोनों क्षेत्रीय पढ़ाइयाँ साफ़ तौर पर अलग हैं।"
  },
  bn: {
    "Needs more checking": "আরও দেখে নেওয়া দরকার",
    "Can work, but check weak points": "চলতে পারে, তবে দুর্বল দিক দেখুন",
    "Good match for marriage talks": "বিয়ের কথার জন্য ভাল মিল",
    "Very good match": "খুব ভাল মিল",
    "Weak match": "দুর্বল মিল",
    "Average match": "মাঝারি মিল",
    "Good match": "ভাল মিল",
    "Very strong match": "খুব শক্তিশালী মিল",
    "This score is below the usual safe line.": "এই স্কোর সাধারণ নিরাপদ সীমার নিচে।",
    "Please check this match more deeply before deciding.": "সিদ্ধান্তের আগে এই মিল আরও ভাল করে দেখুন।",
    "Pause and check": "থামুন এবং দেখুন",
    "See the weak points first and take a fuller horoscope review.": "আগে দুর্বল দিক দেখুন এবং পূর্ণ কুণ্ডলী বিচার করুন।",
    "This match can work, but some points need care.": "এই মিল চলতে পারে, তবে কিছু দিক খেয়াল চাই।",
    "Daily life may go well if the weak areas are handled properly.": "দুর্বল দিক ঠিক সামলাতে পারলে দৈনন্দিন জীবন ভাল চলতে পারে।",
    "Go ahead carefully": "সাবধানে এগোন",
    "Read the care points first and talk clearly about family and routine.": "আগে সতর্কতার দিক পড়ুন এবং পরিবার ও দৈনন্দিন চলন নিয়ে খোলাখুলি কথা বলুন।",
    "This score is in the good range.": "এই স্কোর ভাল সীমার মধ্যে।",
    "The match has good support overall.": "মোটের উপর মিল ভাল সমর্থন দেখায়।",
    "Go ahead with confidence": "আত্মবিশ্বাস নিয়ে এগোন",
    "Use the main checks to align expectations.": "মূল বিষয়গুলো মিলিয়ে প্রত্যাশা ঠিক করুন।",
    "This score is in the highest range.": "এই স্কোর সর্বোচ্চ সীমার মধ্যে।",
    "The match looks strong across the main checks.": "মূল বিচারগুলিতে এই মিল শক্তিশালী দেখাচ্ছে।",
    "Use as confirmation": "নিশ্চিতকরণ হিসেবে নিন",
    "Read the main checks once and use this mostly as confirmation.": "মূল বিষয়গুলো একবার পড়ে এটাকে নিশ্চিতকরণ হিসেবে নিন।",
    "Strong": "শক্তিশালী",
    "Good": "ভাল",
    "Average": "মাঝারি",
    "Careful": "সতর্ক",
    "Very Good Match": "খুব ভাল মিল",
    "Good Match": "ভাল মিল",
    "Okay Match": "মোটামুটি মিল",
    "Needs Care": "সতর্কতা দরকার",
    "Consistent": "প্রায় একরকম",
    "Noticeable gap": "চোখে পড়ার মতো ফারাক",
    "Traditions differ": "দুই ধারা আলাদা বলছে",
    "This point looks strong.": "এই দিকটি ভাল দেখাচ্ছে।",
    "This point needs some care.": "এই দিকটিতে কিছু খেয়াল দরকার।",
    "This point needs closer review.": "এই দিকটি আরও দেখে নেওয়া দরকার।",
    "This point looks moderate.": "এই দিকটি মাঝারি দেখাচ্ছে।",
    "Both regional readings are close.": "দুই আঞ্চলিক পড়াই কাছাকাছি।",
    "The two regional readings differ a little.": "দুই আঞ্চলিক পড়ায় একটু ফারাক আছে।",
    "The two regional readings are clearly different.": "দুই আঞ্চলিক পড়া স্পষ্টই আলাদা।"
  },
  te: {
    "Needs more checking": "ఇంకా పరిశీలన అవసరం",
    "Can work, but check weak points": "పనిచేయొచ్చు, కానీ బలహీన అంశాలు చూడాలి",
    "Good match for marriage talks": "వివాహానికి మంచి జోడీ",
    "Very good match": "చాలా మంచి జోడీ",
    "Weak match": "బలహీన జోడీ",
    "Average match": "సరాసరి జోడీ",
    "Good match": "మంచి జోడీ",
    "Very strong match": "చాలా బలమైన జోడీ",
    "This score is below the usual safe line.": "ఈ స్కోర్ సాధారణ సురక్షిత రేఖ కంటే తక్కువ.",
    "Please check this match more deeply before deciding.": "నిర్ణయం ముందు ఈ జోడీని ఇంకా బాగా చూడండి.",
    "Pause and check": "ఆగి పరిశీలించండి",
    "See the weak points first and take a fuller horoscope review.": "ముందు బలహీన విషయాలు చూసి పూర్తి జాతక పరిశీలన చేయండి.",
    "This match can work, but some points need care.": "ఈ జోడీ పనిచేయొచ్చు, కానీ కొన్ని విషయాల్లో జాగ్రత్త అవసరం.",
    "Daily life may go well if the weak areas are handled properly.": "బలహీన అంశాలు సరిగా చూసుకుంటే రోజువారి జీవితం బాగుండొచ్చు.",
    "Go ahead carefully": "జాగ్రత్తగా ముందుకు వెళ్లండి",
    "Read the care points first and talk clearly about family and routine.": "ముందుగా జాగ్రత్త అంశాలు చదివి కుటుంబం, రోజువారీ జీవితం గురించి స్పష్టంగా మాట్లాడండి.",
    "This score is in the good range.": "ఈ స్కోర్ మంచి పరిధిలో ఉంది.",
    "The match has good support overall.": "మొత్తంగా ఈ జోడీకి మంచి మద్దతు ఉంది.",
    "Go ahead with confidence": "నమ్మకంతో ముందుకు వెళ్లండి",
    "Use the main checks to align expectations.": "ప్రధాన అంశాలతో ఆశలు సరిపోల్చుకోండి.",
    "This score is in the highest range.": "ఈ స్కోర్ అత్యున్నత పరిధిలో ఉంది.",
    "The match looks strong across the main checks.": "ప్రధాన పరిశీలనల్లో ఈ జోడీ బలంగా కనిపిస్తోంది.",
    "Use as confirmation": "నిర్ధారణగా తీసుకోండి",
    "Read the main checks once and use this mostly as confirmation.": "ప్రధాన అంశాలు ఒకసారి చూసి దీనిని నిర్ధారణగా తీసుకోండి.",
    "Strong": "బలమైనది",
    "Good": "మంచిది",
    "Average": "సరాసరి",
    "Careful": "జాగ్రత్త",
    "Very Good Match": "చాలా మంచి జోడీ",
    "Good Match": "మంచి జోడీ",
    "Okay Match": "సరే అనిపించే జోడీ",
    "Needs Care": "జాగ్రత్త అవసరం",
    "Consistent": "సరిపడేలా ఉంది",
    "Noticeable gap": "గమనించాల్సిన తేడా",
    "Traditions differ": "సంప్రదాయాల చదువు వేరు",
    "This point looks strong.": "ఈ అంశం బలంగా ఉంది.",
    "This point needs some care.": "ఈ అంశంపై కొంత జాగ్రత్త అవసరం.",
    "This point needs closer review.": "ఈ అంశాన్ని ఇంకా దగ్గరగా చూడాలి.",
    "This point looks moderate.": "ఈ అంశం సరాసరిగా ఉంది.",
    "Both regional readings are close.": "రెండు ప్రాంతీయ చదువులు దగ్గరగా ఉన్నాయి.",
    "The two regional readings differ a little.": "రెండు ప్రాంతీయ చదువుల్లో కొంత తేడా ఉంది.",
    "The two regional readings are clearly different.": "రెండు ప్రాంతీయ చదువులు స్పష్టంగా వేర్వేరు."
  },
  mr: {
    "Needs more checking": "आणखी तपासणी हवी",
    "Can work, but check weak points": "जुळू शकते, पण कमकुवत मुद्दे पाहा",
    "Good match for marriage talks": "लग्नासाठी चांगली जुळणी",
    "Very good match": "खूप चांगली जुळणी",
    "Weak match": "कमकुवत जुळणी",
    "Average match": "सरासरी जुळणी",
    "Good match": "चांगली जुळणी",
    "Very strong match": "खूप मजबूत जुळणी",
    "This score is below the usual safe line.": "हा गुण सामान्य सुरक्षित रेषेखाली आहे.",
    "Please check this match more deeply before deciding.": "निर्णयापूर्वी ही जुळणी अधिक नीट पाहा.",
    "Pause and check": "थांबा आणि तपासा",
    "See the weak points first and take a fuller horoscope review.": "आधी कमकुवत मुद्दे पाहा आणि पूर्ण पत्रिका तपासा.",
    "This match can work, but some points need care.": "ही जुळणी चालू शकते, पण काही मुद्द्यांत काळजी हवी.",
    "Daily life may go well if the weak areas are handled properly.": "कमकुवत मुद्दे नीट सांभाळले तर दैनंदिन जीवन चांगले जाऊ शकते.",
    "Go ahead carefully": "जपून पुढे जा",
    "Read the care points first and talk clearly about family and routine.": "आधी काळजीचे मुद्दे वाचा आणि कुटुंब व दिनक्रमावर स्पष्ट बोला.",
    "This score is in the good range.": "हा गुण चांगल्या पट्ट्यात आहे.",
    "The match has good support overall.": "एकूण ही जुळणी चांगला आधार दाखवते.",
    "Go ahead with confidence": "आत्मविश्वासाने पुढे जा",
    "Use the main checks to align expectations.": "मुख्य मुद्द्यांनी अपेक्षा जुळवा.",
    "This score is in the highest range.": "हा गुण सर्वात वरच्या पट्ट्यात आहे.",
    "The match looks strong across the main checks.": "मुख्य तपासण्यात ही जुळणी मजबूत दिसते.",
    "Use as confirmation": "पुष्टी म्हणून घ्या",
    "Read the main checks once and use this mostly as confirmation.": "मुख्य मुद्दे एकदा वाचा आणि हे पुष्टी म्हणून घ्या.",
    "Strong": "मजबूत",
    "Good": "चांगले",
    "Average": "सरासरी",
    "Careful": "काळजीपूर्वक",
    "Very Good Match": "खूप चांगली जुळणी",
    "Good Match": "चांगली जुळणी",
    "Okay Match": "ठीक जुळणी",
    "Needs Care": "काळजी हवी",
    "Consistent": "जवळजवळ सारखे",
    "Noticeable gap": "लक्षात येण्याजोगा फरक",
    "Traditions differ": "परंपरा वेगळे सांगतात",
    "This point looks strong.": "हा मुद्दा मजबूत दिसतो.",
    "This point needs some care.": "या मुद्द्यात थोडी काळजी हवी.",
    "This point needs closer review.": "हा मुद्दा अजून नीट तपासावा.",
    "This point looks moderate.": "हा मुद्दा मध्यम दिसतो.",
    "Both regional readings are close.": "दोन्ही प्रादेशिक वाचन जवळजवळ सारखी आहेत.",
    "The two regional readings differ a little.": "दोन्ही प्रादेशिक वाचनात थोडा फरक आहे.",
    "The two regional readings are clearly different.": "दोन्ही प्रादेशिक वाचन स्पष्ट वेगळी आहेत."
  },
  ta: {
    "Needs more checking": "இன்னும் பார்க்க வேண்டும்",
    "Can work, but check weak points": "நடக்கலாம், ஆனால் பலவீன பக்கங்கள் பார்க்க வேண்டும்",
    "Good match for marriage talks": "திருமணத்திற்கு நல்ல பொருத்தம்",
    "Very good match": "மிக நல்ல பொருத்தம்",
    "Weak match": "பலவீனமான பொருத்தம்",
    "Average match": "சராசரி பொருத்தம்",
    "Good match": "நல்ல பொருத்தம்",
    "Very strong match": "மிக வலுவான பொருத்தம்",
    "This score is below the usual safe line.": "இந்த மதிப்பெண் வழக்கமான பாதுகாப்பு கோட்டுக்கு கீழே உள்ளது.",
    "Please check this match more deeply before deciding.": "முடிவு செய்வதற்கு முன் இந்த பொருத்தத்தை இன்னும் நன்றாக பார்க்கவும்.",
    "Pause and check": "நிறுத்தி பாருங்கள்",
    "See the weak points first and take a fuller horoscope review.": "முதலில் பலவீன பக்கங்களை பார்த்து முழு ஜாதகப் பார்வை எடுக்கவும்.",
    "This match can work, but some points need care.": "இந்த பொருத்தம் நடக்கலாம், ஆனால் சில பக்கங்களில் கவனம் வேண்டும்.",
    "Daily life may go well if the weak areas are handled properly.": "பலவீன பக்கங்கள் சரியாக கவனித்தால் நாளந்தோறும் வாழ்க்கை நன்றாக இருக்கலாம்.",
    "Go ahead carefully": "கவனமாக முன்னேறுங்கள்",
    "Read the care points first and talk clearly about family and routine.": "முதலில் கவனிக்க வேண்டியதைப் படித்து குடும்பம் மற்றும் பழக்கம் பற்றி தெளிவாக பேசுங்கள்.",
    "This score is in the good range.": "இந்த மதிப்பெண் நல்ல வரம்பில் உள்ளது.",
    "The match has good support overall.": "மொத்தத்தில் இந்த பொருத்தம் நல்ல ஆதரவு காட்டுகிறது.",
    "Go ahead with confidence": "நம்பிக்கையுடன் செல்லுங்கள்",
    "Use the main checks to align expectations.": "முக்கிய புள்ளிகளால் எதிர்பார்ப்பை ஒத்துப்பார்க்கவும்.",
    "This score is in the highest range.": "இந்த மதிப்பெண் மிக உயர்ந்த வரம்பில் உள்ளது.",
    "The match looks strong across the main checks.": "முக்கிய பார்வைகளில் இந்த பொருத்தம் வலுவாக தெரிகிறது.",
    "Use as confirmation": "உறுதிப்படுத்தலாக எடுத்துக்கொள்ளுங்கள்",
    "Read the main checks once and use this mostly as confirmation.": "முக்கிய புள்ளிகளை ஒருமுறை பார்த்து இதை உறுதிப்படுத்தலாக பயன்படுத்துங்கள்.",
    "Strong": "வலு",
    "Good": "நல்லது",
    "Average": "சராசரி",
    "Careful": "கவனம்",
    "Very Good Match": "மிக நல்ல பொருத்தம்",
    "Good Match": "நல்ல பொருத்தம்",
    "Okay Match": "ஓரளவு பொருத்தம்",
    "Needs Care": "கவனம் தேவை",
    "Consistent": "ஒத்திருக்கிறது",
    "Noticeable gap": "கவனிக்க வேண்டிய வித்தியாசம்",
    "Traditions differ": "முறைகள் வேறுபடுகின்றன",
    "This point looks strong.": "இந்த பக்கம் வலுவாக உள்ளது.",
    "This point needs some care.": "இந்த பக்கத்தில் சிறிது கவனம் தேவை.",
    "This point needs closer review.": "இந்த பக்கத்தை இன்னும் நெருக்கமாக பார்க்க வேண்டும்.",
    "This point looks moderate.": "இந்த பக்கம் மிதமாக உள்ளது.",
    "Both regional readings are close.": "இரண்டு பிராந்திய வாசிப்புகளும் நெருக்கமாக உள்ளன.",
    "The two regional readings differ a little.": "இரண்டு பிராந்திய வாசிப்புகளில் சிறிது வித்தியாசம் உள்ளது.",
    "The two regional readings are clearly different.": "இரண்டு பிராந்திய வாசிப்புகளும் தெளிவாக வேறுபடுகின்றன."
  },
  gu: {
    "Needs more checking": "હજુ વધુ તપાસ જોઈએ",
    "Can work, but check weak points": "ચાલી શકે, પણ નબળા મુદ્દા જુઓ",
    "Good match for marriage talks": "લગ્ન માટે સારો મેળાપ",
    "Very good match": "ખૂબ સારો મેળાપ",
    "Weak match": "નબળો મેળાપ",
    "Average match": "સરેરાશ મેળાપ",
    "Good match": "સારો મેળાપ",
    "Very strong match": "ખૂબ મજબૂત મેળાપ",
    "This score is below the usual safe line.": "આ સ્કોર સામાન્ય સુરક્ષિત રેખા કરતાં નીચે છે.",
    "Please check this match more deeply before deciding.": "નિર્ણય પહેલાં આ મેળાપને વધુ સારી રીતે જુઓ.",
    "Pause and check": "રોકો અને તપાસો",
    "See the weak points first and take a fuller horoscope review.": "પહેલા નબળા મુદ્દા જુઓ અને સંપૂર્ણ કુંડળી તપાસ કરો.",
    "This match can work, but some points need care.": "આ મેળાપ ચાલી શકે, પણ કેટલાક મુદ્દામાં કાળજી જોઈએ.",
    "Daily life may go well if the weak areas are handled properly.": "નબળા મુદ્દા યોગ્ય રીતે સંભાળવામાં આવે તો દૈનિક જીવન સારું રહી શકે.",
    "Go ahead carefully": "સાવધાનીથી આગળ વધો",
    "Read the care points first and talk clearly about family and routine.": "પહેલા કાળજીના મુદ્દા વાંચો અને પરિવાર તથા રોજિંદગી વિશે ખુલ્લી વાત કરો.",
    "This score is in the good range.": "આ સ્કોર સારા વિસ્તારમાં છે.",
    "The match has good support overall.": "કુલ મળીને આ મેળાપને સારો આધાર છે.",
    "Go ahead with confidence": "વિશ્વાસથી આગળ વધો",
    "Use the main checks to align expectations.": "મુખ્ય મુદ્દાથી અપેક્ષાઓ મેળવો.",
    "This score is in the highest range.": "આ સ્કોર સૌથી ઊંચા વિસ્તારમાં છે.",
    "The match looks strong across the main checks.": "મુખ્ય તપાસોમાં આ મેળાપ મજબૂત લાગે છે.",
    "Use as confirmation": "પુષ્ટિ તરીકે લો",
    "Read the main checks once and use this mostly as confirmation.": "મુખ્ય મુદ્દા એકવાર વાંચીને તેને પુષ્ટિ તરીકે લો.",
    "Strong": "મજબૂત",
    "Good": "સારું",
    "Average": "સરેરાશ",
    "Careful": "સાવધાની",
    "Very Good Match": "ખૂબ સારો મેળાપ",
    "Good Match": "સારો મેળાપ",
    "Okay Match": "બરાબર મેળાપ",
    "Needs Care": "કાળજી જોઈએ",
    "Consistent": "એકસરખું",
    "Noticeable gap": "જોઇ શકાય તેવો ફરક",
    "Traditions differ": "પરંપરાઓ અલગ કહે છે",
    "This point looks strong.": "આ મુદ્દો મજબૂત લાગે છે.",
    "This point needs some care.": "આ મુદ્દામાં થોડું ધ્યાન જોઈએ.",
    "This point needs closer review.": "આ મુદ્દો વધુ નજીકથી જોવો જોઈએ.",
    "This point looks moderate.": "આ મુદ્દો મધ્યમ લાગે છે.",
    "Both regional readings are close.": "બે પ્રાદેશિક વાંચનો નજીક છે.",
    "The two regional readings differ a little.": "બે પ્રાદેશિક વાંચનમાં થોડો ફરક છે.",
    "The two regional readings are clearly different.": "બે પ્રાદેશિક વાંચન સ્પષ્ટ રીતે અલગ છે."
  },
  kn: {
    "Needs more checking": "ಇನ್ನೂ ಪರೀಕ್ಷೆ ಬೇಕು",
    "Can work, but check weak points": "ಸಾಗಬಹುದು, ಆದರೆ ದುರ್ಬಲ ಅಂಶಗಳನ್ನು ನೋಡಿ",
    "Good match for marriage talks": "ಮದುವೆಗೆ ಒಳ್ಳೆಯ ಹೊಂದಾಣಿಕೆ",
    "Very good match": "ತುಂಬಾ ಒಳ್ಳೆಯ ಹೊಂದಾಣಿಕೆ",
    "Weak match": "ದುರ್ಬಲ ಹೊಂದಾಣಿಕೆ",
    "Average match": "ಸರಾಸರಿ ಹೊಂದಾಣಿಕೆ",
    "Good match": "ಒಳ್ಳೆಯ ಹೊಂದಾಣಿಕೆ",
    "Very strong match": "ತುಂಬಾ ಬಲವಾದ ಹೊಂದಾಣಿಕೆ",
    "This score is below the usual safe line.": "ಈ ಅಂಕ ಸಾಮಾನ್ಯ ಸುರಕ್ಷಿತ ರೇಖೆಗಿಂತ ಕೆಳಗಿದೆ.",
    "Please check this match more deeply before deciding.": "ನಿರ್ಧಾರಕ್ಕಿಂತ ಮೊದಲು ಈ ಹೊಂದಾಣಿಕೆಯನ್ನು ಇನ್ನಷ್ಟು ನೋಡಿ.",
    "Pause and check": "ನಿಲ್ಲಿಸಿ ನೋಡಿ",
    "See the weak points first and take a fuller horoscope review.": "ಮೊದಲು ದುರ್ಬಲ ಅಂಶಗಳನ್ನು ನೋಡಿ ಸಂಪೂರ್ಣ ಜಾತಕ ಪರಿಶೀಲನೆ ಮಾಡಿ.",
    "This match can work, but some points need care.": "ಈ ಹೊಂದಾಣಿಕೆ ಸಾಗಬಹುದು, ಆದರೆ ಕೆಲವು ಅಂಶಗಳಲ್ಲಿ ಜಾಗ್ರತೆ ಬೇಕು.",
    "Daily life may go well if the weak areas are handled properly.": "ದುರ್ಬಲ ಅಂಶಗಳನ್ನು ಸರಿಯಾಗಿ ನೋಡಿಕೊಂಡರೆ ದೈನಂದಿನ ಜೀವನ ಚೆನ್ನಾಗಿರಬಹುದು.",
    "Go ahead carefully": "ಜಾಗ್ರತೆಯಿಂದ ಮುಂದೆ ಹೋಗಿ",
    "Read the care points first and talk clearly about family and routine.": "ಮೊದಲು ಜಾಗ್ರತೆ ಅಂಶಗಳನ್ನು ಓದಿ, ಕುಟುಂಬ ಮತ್ತು ದಿನಚರಿ ಬಗ್ಗೆ ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ.",
    "This score is in the good range.": "ಈ ಅಂಕ ಒಳ್ಳೆಯ ಮಟ್ಟದಲ್ಲಿದೆ.",
    "The match has good support overall.": "ಒಟ್ಟಾರೆ ಈ ಹೊಂದಾಣಿಕೆಗೆ ಒಳ್ಳೆಯ ಬೆಂಬಲ ಇದೆ.",
    "Go ahead with confidence": "ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಮುಂದುವರಿಯಿರಿ",
    "Use the main checks to align expectations.": "ಮುಖ್ಯ ಅಂಶಗಳಿಂದ ನಿರೀಕ್ಷೆಗಳನ್ನು ಹೊಂದಿಸಿ.",
    "This score is in the highest range.": "ಈ ಅಂಕ ಅತ್ಯುನ್ನತ ಮಟ್ಟದಲ್ಲಿದೆ.",
    "The match looks strong across the main checks.": "ಮುಖ್ಯ ಪರಿಶೀಲನೆಗಳಲ್ಲಿ ಈ ಹೊಂದಾಣಿಕೆ ಬಲವಾಗಿ ಕಾಣುತ್ತದೆ.",
    "Use as confirmation": "ದೃಢೀಕರಣವಾಗಿ ಬಳಸಿ",
    "Read the main checks once and use this mostly as confirmation.": "ಮುಖ್ಯ ಅಂಶಗಳನ್ನು ಒಮ್ಮೆ ಓದಿ ಇದನ್ನು ದೃಢೀಕರಣವಾಗಿ ಬಳಸಿ.",
    "Strong": "ಬಲವಾದ",
    "Good": "ಒಳ್ಳೆಯದು",
    "Average": "ಸರಾಸರಿ",
    "Careful": "ಜಾಗ್ರತೆ",
    "Very Good Match": "ತುಂಬಾ ಒಳ್ಳೆಯ ಹೊಂದಾಣಿಕೆ",
    "Good Match": "ಒಳ್ಳೆಯ ಹೊಂದಾಣಿಕೆ",
    "Okay Match": "ಸರಿಹೊಂದುತ್ತಿರುವ ಹೊಂದಾಣಿಕೆ",
    "Needs Care": "ಜಾಗ್ರತೆ ಬೇಕು",
    "Consistent": "ಒಗ್ಗಟ್ಟಾಗಿದೆ",
    "Noticeable gap": "ಗಮನಿಸಬಹುದಾದ ಅಂತರ",
    "Traditions differ": "ಪರಂಪರೆಗಳು ಬೇರೆ ಹೇಳುತ್ತಿವೆ",
    "This point looks strong.": "ಈ ಅಂಶ ಬಲವಾಗಿ ಕಾಣುತ್ತದೆ.",
    "This point needs some care.": "ಈ ಅಂಶದಲ್ಲಿ ಸ್ವಲ್ಪ ಜಾಗ್ರತೆ ಬೇಕು.",
    "This point needs closer review.": "ಈ ಅಂಶವನ್ನು ಇನ್ನಷ್ಟು ನಿಖರವಾಗಿ ನೋಡಬೇಕು.",
    "This point looks moderate.": "ಈ ಅಂಶ ಮಧ್ಯಮವಾಗಿ ಕಾಣುತ್ತದೆ.",
    "Both regional readings are close.": "ಎರಡು ಪ್ರಾದೇಶಿಕ ಓದುಗಳು ಹತ್ತಿರವಾಗಿವೆ.",
    "The two regional readings differ a little.": "ಎರಡು ಪ್ರಾದೇಶಿಕ ಓದುಗಳಲ್ಲಿ ಸ್ವಲ್ಪ ವ್ಯತ್ಯಾಸ ಇದೆ.",
    "The two regional readings are clearly different.": "ಎರಡು ಪ್ರಾದೇಶಿಕ ಓದುಗಳು ಸ್ಪಷ್ಟವಾಗಿ ಬೇರೆಬೇರೆ."
  },
  ml: {
    "Needs more checking": "ഇനി കൂടുതൽ നോക്കണം",
    "Can work, but check weak points": "നടക്കാം, പക്ഷേ ദുർബല ഭാഗങ്ങൾ നോക്കണം",
    "Good match for marriage talks": "വിവാഹത്തിനായി നല്ല പൊരുത്തം",
    "Very good match": "വളരെ നല്ല പൊരുത്തം",
    "Weak match": "ദുർബല പൊരുത്തം",
    "Average match": "ശരാശരി പൊരുത്തം",
    "Good match": "നല്ല പൊരുത്തം",
    "Very strong match": "വളരെ ശക്തമായ പൊരുത്തം",
    "This score is below the usual safe line.": "ഈ സ്കോർ സാധാരണ സുരക്ഷാ രേഖയ്ക്ക് താഴെയാണ്.",
    "Please check this match more deeply before deciding.": "തീരുമാനത്തിനു മുൻപ് ഈ പൊരുത്തം കൂടുതൽ നോക്കുക.",
    "Pause and check": "നിർത്തി നോക്കൂ",
    "See the weak points first and take a fuller horoscope review.": "ആദ്യം ദുർബല ഭാഗങ്ങൾ നോക്കി പൂർണ്ണ ജാതകപരിശോധന ചെയ്യൂ.",
    "This match can work, but some points need care.": "ഈ പൊരുത്തം നടക്കാം, പക്ഷേ ചില ഭാഗങ്ങളിൽ ശ്രദ്ധ വേണം.",
    "Daily life may go well if the weak areas are handled properly.": "ദുർബല ഭാഗങ്ങൾ ശരിയായി കൈകാര്യം ചെയ്താൽ ദൈനംദിന ജീവിതം നന്നാകാം.",
    "Go ahead carefully": "ശ്രദ്ധയോടെ മുന്നോട്ട് പോവുക",
    "Read the care points first and talk clearly about family and routine.": "ആദ്യം ശ്രദ്ധയുടെ ഭാഗങ്ങൾ വായിച്ച് കുടുംബത്തെയും ദിനചര്യയെയും കുറിച്ച് വ്യക്തമായി സംസാരിക്കുക.",
    "This score is in the good range.": "ഈ സ്കോർ നല്ല പരിധിയിലാണ്.",
    "The match has good support overall.": "മൊത്തത്തിൽ ഈ പൊരുത്തത്തിന് നല്ല പിന്തുണ കാണുന്നു.",
    "Go ahead with confidence": "വിശ്വാസത്തോടെ മുന്നോട്ട് പോവുക",
    "Use the main checks to align expectations.": "പ്രധാന ഭാഗങ്ങൾ കൊണ്ട് പ്രതീക്ഷകൾ ഒത്തു നോക്കൂ.",
    "This score is in the highest range.": "ഈ സ്കോർ ഏറ്റവും ഉയർന്ന പരിധിയിലാണ്.",
    "The match looks strong across the main checks.": "പ്രധാന പരിശോധനകളിൽ ഈ പൊരുത്തം ശക്തമായി കാണുന്നു.",
    "Use as confirmation": "ഉറപ്പായി ഉപയോഗിക്കുക",
    "Read the main checks once and use this mostly as confirmation.": "പ്രധാന ഭാഗങ്ങൾ ഒരിക്കൽ വായിച്ച് ഇതിനെ ഉറപ്പായി എടുക്കൂ.",
    "Strong": "ശക്തം",
    "Good": "നല്ലത്",
    "Average": "ശരാശരി",
    "Careful": "ശ്രദ്ധ",
    "Very Good Match": "വളരെ നല്ല പൊരുത്തം",
    "Good Match": "നല്ല പൊരുത്തം",
    "Okay Match": "ശരി തോന്നുന്ന പൊരുത്തം",
    "Needs Care": "ശ്രദ്ധ വേണം",
    "Consistent": "ഒത്തു നിൽക്കുന്നു",
    "Noticeable gap": "കാണാവുന്ന വ്യത്യാസം",
    "Traditions differ": "രീതികൾ വ്യത്യസ്തമാണ്",
    "This point looks strong.": "ഈ ഭാഗം ശക്തമായി കാണുന്നു.",
    "This point needs some care.": "ഈ ഭാഗത്തിൽ കുറച്ചു ശ്രദ്ധ വേണം.",
    "This point needs closer review.": "ഈ ഭാഗം കൂടുതൽ ശ്രദ്ധയോടെ നോക്കണം.",
    "This point looks moderate.": "ഈ ഭാഗം മിതമായാണ് കാണുന്നത്.",
    "Both regional readings are close.": "രണ്ട് പ്രദേശീയ വായനകളും അടുത്തതാണ്.",
    "The two regional readings differ a little.": "രണ്ട് പ്രദേശീയ വായനകളിൽ ചെറിയ വ്യത്യാസമുണ്ട്.",
    "The two regional readings are clearly different.": "രണ്ട് പ്രദേശീയ വായനകളും വ്യക്തമായി വ്യത്യസ്തമാണ്."
  },
  pa: {
    "Needs more checking": "ਹੋਰ ਧਿਆਨ ਨਾਲ ਦੇਖਣਾ ਚਾਹੀਦਾ ਹੈ",
    "Can work, but check weak points": "ਚੱਲ ਸਕਦਾ ਹੈ, ਪਰ ਕਮਜ਼ੋਰ ਪਾਸੇ ਵੇਖੋ",
    "Good match for marriage talks": "ਵਿਆਹ ਲਈ ਚੰਗਾ ਮਿਲਾਪ",
    "Very good match": "ਬਹੁਤ ਚੰਗਾ ਮਿਲਾਪ",
    "Weak match": "ਕਮਜ਼ੋਰ ਮਿਲਾਪ",
    "Average match": "ਔਸਤ ਮਿਲਾਪ",
    "Good match": "ਚੰਗਾ ਮਿਲਾਪ",
    "Very strong match": "ਬਹੁਤ ਮਜ਼ਬੂਤ ਮਿਲਾਪ",
    "This score is below the usual safe line.": "ਇਹ ਅੰਕ ਆਮ ਸੁਰੱਖਿਅਤ ਰੇਖਾ ਤੋਂ ਹੇਠਾਂ ਹੈ।",
    "Please check this match more deeply before deciding.": "ਫੈਸਲੇ ਤੋਂ ਪਹਿਲਾਂ ਇਸ ਮਿਲਾਪ ਨੂੰ ਹੋਰ ਧਿਆਨ ਨਾਲ ਵੇਖੋ।",
    "Pause and check": "ਰੁੱਕੋ ਅਤੇ ਵੇਖੋ",
    "See the weak points first and take a fuller horoscope review.": "ਪਹਿਲਾਂ ਕਮਜ਼ੋਰ ਪੱਖ ਵੇਖੋ ਅਤੇ ਪੂਰੀ ਕੁੰਡਲੀ ਜਾਂਚ ਕਰੋ।",
    "This match can work, but some points need care.": "ਇਹ ਮਿਲਾਪ ਚੱਲ ਸਕਦਾ ਹੈ, ਪਰ ਕੁਝ ਗੱਲਾਂ ਵਿੱਚ ਸਾਵਧਾਨੀ ਚਾਹੀਦੀ ਹੈ।",
    "Daily life may go well if the weak areas are handled properly.": "ਜੇ ਕਮਜ਼ੋਰ ਗੱਲਾਂ ਠੀਕ ਤਰ੍ਹਾਂ ਸੰਭਾਲੀਆਂ ਜਾਣ ਤਾਂ ਦਿਨਚਰੀ ਜੀਵਨ ਚੰਗਾ ਰਹਿ ਸਕਦਾ ਹੈ।",
    "Go ahead carefully": "ਸਾਵਧਾਨੀ ਨਾਲ ਅੱਗੇ ਵਧੋ",
    "Read the care points first and talk clearly about family and routine.": "ਪਹਿਲਾਂ ਸਾਵਧਾਨੀ ਵਾਲੀਆਂ ਗੱਲਾਂ ਪੜ੍ਹੋ ਅਤੇ ਪਰਿਵਾਰ ਤੇ ਰੁਟੀਨ ਬਾਰੇ ਖੁੱਲ੍ਹ ਕੇ ਗੱਲ ਕਰੋ।",
    "This score is in the good range.": "ਇਹ ਅੰਕ ਚੰਗੀ ਹੱਦ ਵਿੱਚ ਹੈ।",
    "The match has good support overall.": "ਕੁੱਲ ਮਿਲਾ ਕੇ ਇਹ ਮਿਲਾਪ ਚੰਗਾ ਸਹਾਰਾ ਦਿਖਾਉਂਦਾ ਹੈ।",
    "Go ahead with confidence": "ਵਿਸ਼ਵਾਸ ਨਾਲ ਅੱਗੇ ਵਧੋ",
    "Use the main checks to align expectations.": "ਮੁੱਖ ਬਿੰਦੂਆਂ ਨਾਲ ਉਮੀਦਾਂ ਮਿਲਾਓ।",
    "This score is in the highest range.": "ਇਹ ਅੰਕ ਸਭ ਤੋਂ ਉੱਚੀ ਹੱਦ ਵਿੱਚ ਹੈ।",
    "The match looks strong across the main checks.": "ਮੁੱਖ ਜਾਂਚਾਂ ਵਿੱਚ ਇਹ ਮਿਲਾਪ ਮਜ਼ਬੂਤ ਦਿਖਦਾ ਹੈ।",
    "Use as confirmation": "ਪੁਸ਼ਟੀ ਵਜੋਂ ਲਓ",
    "Read the main checks once and use this mostly as confirmation.": "ਮੁੱਖ ਬਿੰਦੂ ਇਕ ਵਾਰ ਪੜ੍ਹੋ ਅਤੇ ਇਸਨੂੰ ਪੁਸ਼ਟੀ ਵਜੋਂ ਵਰਤੋਂ।",
    "Strong": "ਮਜ਼ਬੂਤ",
    "Good": "ਚੰਗਾ",
    "Average": "ਔਸਤ",
    "Careful": "ਸਾਵਧਾਨ",
    "Very Good Match": "ਬਹੁਤ ਚੰਗਾ ਮਿਲਾਪ",
    "Good Match": "ਚੰਗਾ ਮਿਲਾਪ",
    "Okay Match": "ਠੀਕ ਮਿਲਾਪ",
    "Needs Care": "ਸਾਵਧਾਨੀ ਚਾਹੀਦੀ ਹੈ",
    "Consistent": "ਲਗਭਗ ਇਕੋ ਵਰਗਾ",
    "Noticeable gap": "ਗੌਰ ਕਰਨ ਯੋਗ ਫਰਕ",
    "Traditions differ": "ਰਿਵਾਜ ਵੱਖ ਵੱਖ ਕਹਿੰਦੇ ਹਨ",
    "This point looks strong.": "ਇਹ ਬਿੰਦੂ ਮਜ਼ਬੂਤ ਦਿਖਦਾ ਹੈ।",
    "This point needs some care.": "ਇਸ ਬਿੰਦੂ ਵਿੱਚ ਕੁਝ ਸਾਵਧਾਨੀ ਚਾਹੀਦੀ ਹੈ।",
    "This point needs closer review.": "ਇਸ ਬਿੰਦੂ ਨੂੰ ਹੋਰ ਧਿਆਨ ਨਾਲ ਵੇਖੋ।",
    "This point looks moderate.": "ਇਹ ਬਿੰਦੂ ਮੱਧਮ ਦਿਖਦਾ ਹੈ।",
    "Both regional readings are close.": "ਦੋਵੇਂ ਖੇਤਰੀ ਪੜ੍ਹਤਾਂ ਕਾਫੀ ਨੇੜੇ ਹਨ।",
    "The two regional readings differ a little.": "ਦੋਵੇਂ ਖੇਤਰੀ ਪੜ੍ਹਤਾਂ ਵਿੱਚ ਥੋੜ੍ਹਾ ਫਰਕ ਹੈ।",
    "The two regional readings are clearly different.": "ਦੋਵੇਂ ਖੇਤਰੀ ਪੜ੍ਹਤਾਂ ਸਾਫ਼ ਵੱਖ ਹਨ।"
  },
  or: {
    "Needs more checking": "ଆଉ ଭଲଭାବେ ଦେଖିବା ଦରକାର",
    "Can work, but check weak points": "ଚାଲିପାରେ, କିନ୍ତୁ ଦୁର୍ବଳ ପକ୍ଷ ଦେଖନ୍ତୁ",
    "Good match for marriage talks": "ବିବାହ ପାଇଁ ଭଲ ମିଳାନ",
    "Very good match": "ବହୁତ ଭଲ ମିଳାନ",
    "Weak match": "ଦୁର୍ବଳ ମିଳାନ",
    "Average match": "ମଧ୍ୟମ ମିଳାନ",
    "Good match": "ଭଲ ମିଳାନ",
    "Very strong match": "ବହୁତ ଶକ୍ତିଶାଳୀ ମିଳାନ",
    "This score is below the usual safe line.": "ଏହି ସ୍କୋର ସାଧାରଣ ସୁରକ୍ଷିତ ରେଖାରୁ ନିମ୍ନରେ ଅଛି।",
    "Please check this match more deeply before deciding.": "ନିଷ୍ପତ୍ତି ପୂର୍ବରୁ ଏହି ମିଳାନକୁ ଆଉ ଭଲଭାବେ ଦେଖନ୍ତୁ।",
    "Pause and check": "ଅପେକ୍ଷା କରି ଦେଖନ୍ତୁ",
    "See the weak points first and take a fuller horoscope review.": "ପ୍ରଥମେ ଦୁର୍ବଳ ପକ୍ଷ ଦେଖନ୍ତୁ ଏବଂ ପୁରା କୁଣ୍ଡଳୀ ଯାଞ୍ଚ କରନ୍ତୁ।",
    "This match can work, but some points need care.": "ଏହି ମିଳାନ ଚାଲିପାରେ, କିନ୍ତୁ କିଛି ପକ୍ଷରେ ସାବଧାନତା ଦରକାର।",
    "Daily life may go well if the weak areas are handled properly.": "ଦୁର୍ବଳ ପକ୍ଷ ଭଲରେ ସମ୍ଭାଳିଲେ ଦିନସରିଆ ଜୀବନ ଭଲ ହୋଇପାରେ।",
    "Go ahead carefully": "ସାବଧାନରେ ଆଗକୁ ବଢ଼ନ୍ତୁ",
    "Read the care points first and talk clearly about family and routine.": "ପ୍ରଥମେ ସାବଧାନୀ ବିଷୟ ପଢ଼ନ୍ତୁ ଏବଂ ପରିବାର ଓ ଦିନଚର୍ଯ୍ୟା ବିଷୟରେ ସ୍ପଷ୍ଟ କଥାହେବା।",
    "This score is in the good range.": "ଏହି ସ୍କୋର ଭଲ ସୀମାରେ ଅଛି।",
    "The match has good support overall.": "ମୋଟରୁ ଏହି ମିଳାନ ଭଲ ସମର୍ଥନ ଦେଖାଉଛି।",
    "Go ahead with confidence": "ଭରସା ସହ ଆଗକୁ ବଢ଼ନ୍ତୁ",
    "Use the main checks to align expectations.": "ମୁଖ୍ୟ ବିଷୟ ଦେଖି ଆଶା ମିଳାନ୍ତୁ।",
    "This score is in the highest range.": "ଏହି ସ୍କୋର ସର୍ବୋଚ୍ଚ ସୀମାରେ ଅଛି।",
    "The match looks strong across the main checks.": "ମୁଖ୍ୟ ଯାଞ୍ଚଗୁଡ଼ିକରେ ଏହି ମିଳାନ ଶକ୍ତିଶାଳୀ ଦେଖାଯାଉଛି।",
    "Use as confirmation": "ନିଶ୍ଚୟତା ଭାବେ ନିଅନ୍ତୁ",
    "Read the main checks once and use this mostly as confirmation.": "ମୁଖ୍ୟ ବିଷୟ ଏକଥର ପଢ଼ି ଏହାକୁ ନିଶ୍ଚୟତା ଭାବେ ନିଅନ୍ତୁ।",
    "Strong": "ଶକ୍ତିଶାଳୀ",
    "Good": "ଭଲ",
    "Average": "ମଧ୍ୟମ",
    "Careful": "ସାବଧାନ",
    "Very Good Match": "ବହୁତ ଭଲ ମିଳାନ",
    "Good Match": "ଭଲ ମିଳାନ",
    "Okay Match": "ଠିକ୍ ମିଳାନ",
    "Needs Care": "ସାବଧାନତା ଦରକାର",
    "Average": "ମଧ୍ୟମ",
    "Strong": "ମଜବୁତ",
    "Steady": "ସ୍ଥିର",
    "Review": "ପୁଣି ଦେଖନ୍ତୁ",
    "Sensitive": "ସାବଧାନ",
    "Very close": "ଅତ୍ୟନ୍ତ ନିକଟ",
    "Needs care": "ଧ୍ୟାନ ଦରକାର",
    "Pair Harmony": "ଯୁଗଳ ସମନ୍ୱୟ",
    "Weekday": "ବାର",
    "Tithi": "ତିଥି",
    "Yoga": "ଯୋଗ",
    "Karana": "କରଣ",
    "Match basis": "ମିଳାନ ଆଧାର",
    "Match Rashi": "ମିଳାନ ରାଶି",
    "Match Nakshatra": "ମିଳାନ ନକ୍ଷତ୍ର",
    "Match Details": "ମିଳାନ ବିବରଣୀ",
    "Source": "ସ୍ରୋତ",
    "Style": "ଶୈଳୀ",
    "Lagna": "ଲଗ୍ନ",
    "Moon": "ଚନ୍ଦ୍ର",
    "Nakshatra": "ନକ୍ଷତ୍ର",
    "Rashi": "ରାଶି",
    "Created Kundali": "ତିଆରି କୁଣ୍ଡଳୀ",
    "Generated from birth details": "ଜନ୍ମ ବିବରଣୀରୁ ତିଆରି",
    "Chart values supplied": "ଦିଆଯାଇଥିବା ଚାର୍ଟ ମୂଲ୍ୟ",
    "Chart values used directly": "ଚାର୍ଟ ମୂଲ୍ୟ ସିଧାସଳଖ ନିଆଯାଇଛି",
    "Houses derived from Lagna": "ଲଗ୍ନରୁ ଭାବ ଗଠନ କରାଯାଇଛି",
    "Mars house derived from Mars placement": "ମଙ୍ଗଳ ସ୍ଥିତିରୁ ମଙ୍ଗଳ ଭାବ ନିଆଯାଇଛି",
    "Limited OCR chart structure": "ସୀମିତ OCR ଚାର୍ଟ ଗଠନ",
    "Mars House": "ମଙ୍ଗଳ ଭାବ",
    "Sign Lord": "ରାଶି ଅଧିପତି",
    "Manglik": "ମଙ୍ଗଳିକ",
    "Kuja watch": "କୁଜ ଧ୍ୟାନ",
    "No strong Kuja": "କୁଜ ଜୋର ନାହିଁ",
    "Not checked": "ଯାଞ୍ଚ ହୋଇନି",
    "Lagna Navamsa": "ଲଗ୍ନ ନବାଂଶ",
    "Moon Navamsa": "ଚନ୍ଦ୍ର ନବାଂଶ",
    "Mahadasha": "ମହାଦଶା",
    "Antardasha": "ଅନ୍ତର୍ଦଶା",
    "Approx dasha from birth moon": "ଜନ୍ମ ଚନ୍ଦ୍ରରୁ ଅନୁମାନିତ ଦଶା",
    "calculated Rashi": "ଗଣନା କରାଯାଇଥିବା ରାଶି",
    "Moon basis inferred from birth details": "ଜନ୍ମ ବିବରଣୀରୁ ମିଳାନ ଆଧାର ନିଆଯାଇଛି",
    "Traditional matching uses": "ପାରମ୍ପରିକ ମିଳାନରେ ବ୍ୟବହୃତ",
    "User-supplied Rashi": "ଆପଣ ଦେଇଥିବା ରାଶି",
    "User-supplied Nakshatra": "ଆପଣ ଦେଇଥିବା ନକ୍ଷତ୍ର",
    "Ephemeris-backed planetary engine": "ନିଖୁତ ଗ୍ରହ ଗଣନା ଇଞ୍ଜିନ",
    "Fallback planetary approximation": "ସହଜ ଗ୍ରହ ଅନୁମାନ",
    "Chart engine unavailable": "ଚାର୍ଟ ଇଞ୍ଜିନ ମିଳିଲା ନାହିଁ",
    "Timezone not resolved": "ସମୟ ମଣ୍ଡଳ ମିଳିଲା ନାହିଁ",
    "Planets": "ଗ୍ରହ",
    "Houses": "ଭାବ",
    "Sun": "ସୂର୍ଯ୍ୟ",
    "Mars": "ମଙ୍ଗଳ",
    "Mercury": "ବୁଧ",
    "Jupiter": "ଗୁରୁ",
    "Venus": "ଶୁକ୍ର",
    "Saturn": "ଶନି",
    "Rahu": "ରାହୁ",
    "Ketu": "କେତୁ",
    "Mind": "ମନ",
    "Home": "ଗୃହ",
    "Purpose": "ଲକ୍ଷ୍ୟ",
    "planets parsed": "ଗ୍ରହ ପଢ଼ାଗଲା",
    "Chart file input": "କୁଣ୍ଡଳୀ ଫାଇଲ୍ ଇନପୁଟ୍",
    "Birth details input": "ଜନ୍ମ ବିବରଣୀ ଇନପୁଟ୍",
    "Match Score": "ମିଳାନ ସ୍କୋର",
    "Quick summary": "ଛୋଟ ସାର",
    "This is a simplified compatibility report generated by AI Pandit Ji.": "AI Pandit Ji ଦ୍ୱାରା ତିଆରି ସରଳ ମିଳାନ ରିପୋର୍ଟ।",
    "Consistent": "ଅନେକଟା ଏକରକମ",
    "Noticeable gap": "ଧ୍ୟାନ ଯୋଗ୍ୟ ତଫାତ",
    "Traditions differ": "ପରମ୍ପରା ଭିନ୍ନ ପଢ଼ୁଛି",
    "Naturally supportive": "ସ୍ୱାଭାବିକ ଭାବେ ଭଲ",
    "Mostly steady": "ଅଧିକାଂଶ ଠିକ୍",
    "Needs attention": "ଧ୍ୟାନ ଦରକାର",
    "Handle gently": "ସାବଧାନରେ ନିଆନ୍ତୁ",
    "This point looks strong.": "ଏହି ପକ୍ଷ ଶକ୍ତିଶାଳୀ ଦେଖାଯାଉଛି।",
    "This point needs some care.": "ଏହି ପକ୍ଷରେ କିଛି ସାବଧାନତା ଦରକାର।",
    "This point needs closer review.": "ଏହି ପକ୍ଷକୁ ଆଉ ଭଲ ଭାବେ ଦେଖିବା ଦରକାର।",
    "This point looks moderate.": "ଏହି ପକ୍ଷ ମଧ୍ୟମ ଦେଖାଯାଉଛି।",
    "Traditional values and social expectations are easy to align.": "ପାରମ୍ପରିକ ମୂଲ୍ୟବୋଧ ଓ ଆଶାଗୁଡ଼ିକୁ ସହଜରେ ମିଳାଇ ପାରିବେ।",
    "Value expectations may not move in the same direction without deliberate adjustment.": "ଜଣାଶୁଣା ଚେଷ୍ଟା ନ କଲେ ମୂଲ୍ୟବୋଧ ଓ ଆଶା ଏକ ଦିଗକୁ ଯାଇନପାରେ।",
    "The relationship shows cooperative give-and-take.": "ଏହି ସମ୍ପର୍କରେ ଦୁହେଁ ପକ୍ଷର ସହଯୋଗ ଦେଖାଯାଉଛି।",
    "One person may feel harder to influence or emotionally reach.": "ଏକ ପକ୍ଷକୁ ବୁଝାଇବା କିମ୍ବା ଭାବନାରେ ପହଞ୍ଚିବା କଷ୍ଟକର ହୋଇପାରେ।",
    "The nakshatra rhythm supports day-to-day steadiness.": "ନକ୍ଷତ୍ର ରିଦମ୍ ଦିନସରିଆ ସ୍ଥିରତାକୁ ସମର୍ଥନ କରୁଛି।",
    "Timing, health rhythm, or mood flow may need extra care.": "ସମୟ, ସ୍ୱାସ୍ଥ୍ୟ ରିଦମ୍ କିମ୍ବା ମନୋଭାବରେ ଅଧିକ ସାବଧାନତା ଦରକାର ହୋଇପାରେ।",
    "Warmth and private comfort have a workable base.": "ନିକଟତା ଓ ବ୍ୟକ୍ତିଗତ ସୁବିଧା ପାଇଁ ଭଲ ଆଧାର ଅଛି।",
    "Chemistry may need patience and better emotional pacing.": "ମନମେଳ ପାଇଁ ଧୈର୍ୟ ଓ ଭଲ ଭାବନାତ୍ମକ ସମନ୍ୱୟ ଦରକାର ହୋଇପାରେ।",
    "Moon-sign lords show good mental compatibility.": "ରାଶି ଅଧିପତିମାନେ ଭଲ ମାନସିକ ସମନ୍ୱୟ ଦେଖାଉଛନ୍ତି।",
    "Temperament and decision styles may clash more easily.": "ସ୍ୱଭାବ ଓ ନିଷ୍ପତ୍ତି ନେବା ଶୈଳୀ ସହଜରେ ଠୋକାଠୁକି କରିପାରେ।",
    "Basic temperament balance looks manageable.": "ମୂଳ ସ୍ୱଭାବର ସମତୁଳନ ସମ୍ଭାଳିହେବା ଯୋଗ୍ୟ ଦେଖାଯାଉଛି।",
    "Natural reaction styles may feel quite different.": "ସ୍ୱାଭାବିକ ପ୍ରତିକ୍ରିୟା ଶୈଳୀ ଦୁହେଁର ଅଲଗା ଲାଗିପାରେ।",
    "Long-term family direction looks mostly supportive.": "ଦୀର୍ଘକାଳୀନ ପରିବାରୀକ ଦିଗ ଅଧିକାଂଶରେ ସହାୟକ ଲାଗୁଛି।",
    "The moon-sign relationship can create pressure around finances, health, or family planning.": "ରାଶି ସମ୍ପର୍କ ଧନ, ସ୍ୱାସ୍ଥ୍ୟ କିମ୍ବା ପରିବାର ଯୋଜନାରେ ଚାପ ତିଆରି କରିପାରେ।",
    "Energy flow and family rhythm do not strongly repeat each other.": "ଶକ୍ତି ଧାରା ଓ ପରିବାରୀକ ରିଦମ୍ ଏକାପରେକୀ ଗୋଲାପକା ହେଉନାହିଁ।",
    "Classic Nadi concern is present, so this should not be ignored.": "ପାରମ୍ପରିକ ନାଡ଼ି ଚିନ୍ତା ଅଛି, ତେଣୁ ଏହାକୁ ଅନଦେଖା କରିବା ଉଚିତ୍ ନୁହେଁ।",
    "Daily rhythm and star harmony look supportive.": "ଦିନସରିଆ ରିଦମ୍ ଓ ତାରା ସମନ୍ୱୟ ସହାୟକ ଲାଗୁଛି।",
    "Daily rhythm and timing may need more conscious effort.": "ଦିନସରିଆ ରିଦମ୍ ଓ ସମୟ ମେଳ ପାଇଁ ଅଧିକ ଚେଷ୍ଟା ଦରକାର ହୋଇପାରେ।",
    "Temperament balance looks workable.": "ସ୍ୱଭାବର ସମତୁଳନ ଚାଲିଯିବା ଯୋଗ୍ୟ ଲାଗୁଛି।",
    "Reaction styles can create friction if both sides are inflexible.": "ଦୁହେଁ ପକ୍ଷ ଜିଦ୍ଧୀ ହେଲେ ପ୍ରତିକ୍ରିୟା ଶୈଳୀରୁ ଘର୍ଷଣ ହୋଇପାରେ।",
    "Growth and continuity signs look positive.": "ବିକାଶ ଓ ନିରନ୍ତରତାର ସଙ୍କେତ ଭଲ ଲାଗୁଛି।",
    "The combination is not especially strong for steady growth.": "ସ୍ଥିର ବିକାଶ ପାଇଁ ଏହି ଯୋଗ ଖାସ୍ ଶକ୍ତିଶାଳୀ ନୁହେଁ।",
    "The pairing has room for long-term settling.": "ଦୀର୍ଘକାଳୀନ ଭାବେ ସ୍ଥିର ହେବା ପାଇଁ ଏହି ଯୁଗଳରେ ସୁଯୋଗ ଅଛି।",
    "Long-term steadiness may take more time to build.": "ଦୀର୍ଘକାଳୀନ ସ୍ଥିରତା ଗଢ଼ିଉଠିବାକୁ ଅଧିକ ସମୟ ଲାଗିପାରେ।",
    "Comfort and closeness show practical support.": "ସୁବିଧା ଓ ନିକଟତା ପ୍ରାୟୋଗିକ ସମର୍ଥନ ଦେଖାଉଛି।",
    "Private comfort may grow slowly or feel uneven.": "ବ୍ୟକ୍ତିଗତ ସୁବିଧା ଧୀରେ ବଢ଼ିପାରେ କିମ୍ବା ଅସମ ଲାଗିପାରେ।",
    "Moon-sign relationship is broadly workable.": "ରାଶି ସମ୍ପର୍କ ମୋଟାମୋଟି ଭାବେ ଚାଲିପାରିବା ଯୋଗ୍ୟ।",
    "Moon-sign distance raises practical caution in this pairing.": "ରାଶି ଦୂରତା ଏହି ଯୁଗଳରେ ପ୍ରାୟୋଗିକ ସାବଧାନତା ବଢ଼ାଏ।",
    "Rajju does not show a major block here.": "ରଜ୍ଜୁ ଏଠାରେ କୌଣସି ବଡ଼ ବାଧା ଦେଖାଉନାହିଁ।",
    "Rajju caution is visible and deserves a serious look.": "ରଜ୍ଜୁ ସାବଧାନତା ଦେଖାଯାଉଛି ଏବଂ ଏହାକୁ ଗଭୀରତାରେ ଦେଖିବା ଦରକାର।",
    "There are fewer traditional obstructions in the star pair.": "ତାରା ଯୁଗଳରେ ପାରମ୍ପରିକ ବାଧା କମ୍ ଦେଖାଯାଉଛି।",
    "The star pair carries a classic Vedha-type caution.": "ତାରା ଯୁଗଳରେ ପାରମ୍ପରିକ ବେଧ ପ୍ରକାରର ସାବଧାନତା ଅଛି।",
    "Mutual responsiveness feels manageable.": "ପରସ୍ପର ପ୍ରତିସାଦ ସମ୍ଭାଳିହେବା ଯୋଗ୍ୟ ଲାଗୁଛି।",
    "The relationship may feel less naturally responsive.": "ଏହି ସମ୍ପର୍କ ସ୍ୱାଭାବିକ ଭାବେ କମ୍ ପ୍ରତିସାଦଶୀଳ ଲାଗିପାରେ।",
    "Nadi does not add much extra friction here.": "ନାଡ଼ି ଏଠାରେ ଅଧିକ ଘର୍ଷଣ ବଢ଼ାଉନାହିଁ।",
    "Nadi remains a caution point in this pairing.": "ଏହି ଯୁଗଳରେ ନାଡ଼ି ଏଯାଏ ସାବଧାନତାର ବିଷୟ ରହିଛି।",
    "East and South readings are close, so the match looks fairly stable across traditions.": "ପୂର୍ବ ଓ ଦକ୍ଷିଣ ପଢ଼ା ପାଖାପାଖି ଅଛି, ତେଣୁ ମିଳାନ ମୋଟାମୋଟି ସ୍ଥିର ଦେଖାଯାଉଛି।",
    "The two regional styles are not identical here, so review the tradition cards before locking your conclusion.": "ଦୁଇ ଅଞ୍ଚଳୀୟ ଶୈଳୀ ଏଠାରେ ଏକ ନୁହେଁ, ତେଣୁ ନିଷ୍ପତ୍ତି ପୂର୍ବରୁ କାର୍ଡଗୁଡ଼ିକୁ ଦେଖନ୍ତୁ।",
    "East and South styles are reading this pair differently, so the final decision should lean on the detailed checks rather than the headline score alone.": "ପୂର୍ବ ଓ ଦକ୍ଷିଣ ଶୈଳୀ ଏହି ଯୁଗଳକୁ ଭିନ୍ନ ଭାବେ ପଢ଼ୁଛି, ତେଣୁ ଶେଷ ନିଷ୍ପତ୍ତି କେବଳ ମୁଖ୍ୟ ସ୍କୋର ଉପରେ ନୁହେଁ, ବିସ୍ତୃତ ଯାଞ୍ଚ ଉପରେ ହେଉ।",
    "Both regional readings are close.": "ଦୁଇଟି ଅଞ୍ଚଳୀୟ ପଢ଼ା କାଛାକାଛି ଅଛି।",
    "The two regional readings differ a little.": "ଦୁଇଟି ଅଞ୍ଚଳୀୟ ପଢ଼ାରେ ଥୋଡ଼ା ତଫାତ ଅଛି।",
    "The two regional readings are clearly different.": "ଦୁଇଟି ଅଞ୍ଚଳୀୟ ପଢ଼ା ସ୍ପଷ୍ଟ ଭିନ୍ନ।",
    "Values and respect style are easier to align in this pair.": "ଏହି ଯୁଗଳରେ ମୂଲ୍ୟବୋଧ ଓ ସମ୍ମାନର ଶୈଳୀ ମିଳାଇବା ସହଜ ଲାଗୁଛି।",
    "Value expectations may not align smoothly without conscious adjustment.": "ସଚେତନ ଚେଷ୍ଟା ନ କଲେ ମୂଲ୍ୟବୋଧ ଓ ଆଶା ସହଜରେ ମିଳିନପାରେ।",
    "The charts show workable mutual influence and adjustment.": "କୁଣ୍ଡଳୀ ଦୁହେଁରେ ପରସ୍ପର ପ୍ରଭାବ ଓ ଖାପଖୁଆଇବାର ସମ୍ଭାବନା ଦେଖାଉଛି।",
    "Mutual responsiveness may feel uneven in daily life.": "ଦିନସରିଆ ଜୀବନରେ ପରସ୍ପର ପ୍ରତିସାଦ କେବେକେବେ ଅସମ ଲାଗିପାରେ।",
    "Star rhythm shows support for timing and day-to-day steadiness.": "ତାରାର ରିଦମ୍ ସମୟ ମେଳ ଓ ଦିନସରିଆ ସ୍ଥିରତାକୁ ସମର୍ଥନ କରୁଛି।",
    "Private comfort and instinctive attraction have a useful base.": "ନିଜସ୍ୱ ସୁବିଧା ଓ ସ୍ୱାଭାବିକ ଆକର୍ଷଣର ଭଲ ଆଧାର ଅଛି।",
    "Rashi lords show helpful mental support and easier understanding.": "ରାଶି ଅଧିପତିମାନେ ମାନସିକ ସମର୍ଥନ ଓ ସହଜ ବୁଝାପଡ଼ା ଦେଖାଉଛନ୍ତି।",
    "Mental agreement may take more patience because the ruling planets are not strongly aligned.": "ଶାସକ ଗ୍ରହମାନେ ଜୋରଦାର ଭାବେ ମିଳୁନଥିବାରୁ ମାନସିକ ସମ୍ମତି ପାଇଁ ଅଧିକ ଧୈର୍ଯ୍ୟ ଲାଗିପାରେ।",
    "Moon-sign relationship gives practical support to family direction and household life.": "ରାଶି ସମ୍ପର୍କ ପରିବାରର ଦିଗ ଓ ଘରୋଇ ଜୀବନକୁ ପ୍ରାୟୋଗିକ ସମର୍ଥନ ଦେଉଛି।",
    "Moon-sign relationship raises traditional caution around family direction and long-term comfort.": "ରାଶି ସମ୍ପର୍କ ପରିବାରୀକ ଦିଗ ଓ ଦୀର୍ଘକାଳୀନ ସୁବିଧା ବିଷୟରେ ପାରମ୍ପରିକ ସାବଧାନତା ଉଠାଏ।",
    "Nadi does not add a major traditional block here.": "ଏଠାରେ ନାଡ଼ି କୌଣସି ବଡ଼ ପାରମ୍ପରିକ ବାଧା ଯୋଗ କରୁନାହିଁ।",
    "Nadi remains a serious traditional caution in this pairing.": "ଏହି ଯୁଗଳରେ ନାଡ଼ି ଏବେମଧ୍ୟ ଗୁରୁତର ପାରମ୍ପରିକ ସାବଧାନତା ଅଟେ।",
    "Rajju does not show a major block in this match.": "ଏହି ମିଳାନରେ ରଜ୍ଜୁ ବଡ଼ ବାଧା ଦେଖାଉନାହିଁ।",
    "Rajju shows a traditional stability caution and deserves a serious review.": "ରଜ୍ଜୁ ପାରମ୍ପରିକ ସ୍ଥିରତା ସାବଧାନତା ଦେଖାଉଛି ଏବଂ ଏହାକୁ ଗଭୀରତାରେ ଦେଖିବା ଦରକାର।",
    "Mars placement balance looks manageable for marriage timing.": "ମଙ୍ଗଳ ସ୍ଥିତିର ସମତୁଳନ ବିବାହ ସମୟ ପାଇଁ ସମ୍ଭାଳିହେବା ଯୋଗ୍ୟ ଲାଗୁଛି।",
    "Kuja / Manglik balance is uneven here, so marriage timing and conflict heat need more care.": "ଏଠାରେ କୁଜ / ମଙ୍ଗଳିକ ସମତୁଳନ ଅସମ ଅଛି, ତେଣୁ ବିବାହ ସମୟ ଓ ବାଦବିବାଦର ତୀବ୍ରତାରେ ଅଧିକ ସାବଧାନତା ଦରକାର।",
    "Odia Dashamelaka": "ଓଡ଼ିଆ ଦଶମେଳକ",
    "Odisha mode is using a Dashamelaka-style reading from the current chart engine, including moon-sign factors, Rajju, and Kuja checks.": "ଓଡ଼ିଶା ମୋଡ୍ ବର୍ତ୍ତମାନ ଚାର୍ଟ ଇଞ୍ଜିନରୁ ଦଶମେଳକ ଶୈଳୀର ପଢ଼ା ବ୍ୟବହାର କରୁଛି, ଯେଉଁଥିରେ ରାଶି ଆଧାରିତ ତଥ୍ୟ, ରଜ୍ଜୁ ଓ କୁଜ ଯାଞ୍ଚ ଅଛି।"
  }
};

const INPUT_HINTS = {
  birth:
    "Enter name, date, time, and place. If you already know the person's Rashi or Nakshatra, add them here too. Traditional matching will use those directly while date, time, and place still shape the rest of the chart.",
  chart:
    "Upload each kundli image or PDF, then review the chart values that OCR fills for you before matching. Add Mars house if you want Kuja dosha to be checked."
};

function createStateTraditionPreset(label, family, hint, narrative, emphasis = {}) {
  return { label, family, hint, narrative, emphasis };
}

const ASHTAKOOTA_STATE_LABELS = {
  "arunachal-pradesh": "Arunachal Pradesh",
  assam: "Assam",
  bihar: "Bihar",
  chhattisgarh: "Chhattisgarh",
  goa: "Goa",
  gujarat: "Gujarat",
  haryana: "Haryana",
  "himachal-pradesh": "Himachal Pradesh",
  jharkhand: "Jharkhand",
  "madhya-pradesh": "Madhya Pradesh",
  maharashtra: "Maharashtra",
  manipur: "Manipur",
  meghalaya: "Meghalaya",
  mizoram: "Mizoram",
  nagaland: "Nagaland",
  odisha: "Odisha",
  punjab: "Punjab",
  rajasthan: "Rajasthan",
  sikkim: "Sikkim",
  tripura: "Tripura",
  "uttar-pradesh": "Uttar Pradesh",
  uttarakhand: "Uttarakhand",
  "west-bengal": "West Bengal"
};

const SOUTH_PORUTHAM_STATE_LABELS = {
  "andhra-pradesh": "Andhra Pradesh",
  karnataka: "Karnataka",
  telangana: "Telangana"
};

const STATE_TRADITION_PRESETS = {
  ...Object.fromEntries(
    Object.entries(ASHTAKOOTA_STATE_LABELS).map(([key, label]) => [
      key,
      createStateTraditionPreset(
        label,
        key === "odisha" ? "odia" : "east",
        key === "odisha"
          ? "Odisha uses a Dashamelaka-style view built on moon-sign matching, Rajju, and Kuja checks."
          : `${label} uses the Ashtakoota / Guna Milan family.`,
        key === "odisha"
          ? "The Odisha view uses a Dashamelaka-style layer built from the current chart engine and traditional moon-sign checks."
          : `The ${label} view uses the Ashtakoota / Guna Milan family for the main match.`
      )
    ])
  ),
  ...Object.fromEntries(
    Object.entries(SOUTH_PORUTHAM_STATE_LABELS).map(([key, label]) => [
      key,
      createStateTraditionPreset(
        label,
        "south",
        `${label} uses the South Porutham family.`,
        `The ${label} view uses the South Porutham family for the main match.`
      )
    ])
  ),
  kerala: createStateTraditionPreset(
    "Kerala",
    "kerala",
    "Kerala uses the Kerala Porutham variant, with stronger space for Rajju, Deergha, and Mahendra.",
    "The Kerala view uses the Kerala Porutham variant with stronger space for Rajju, Deergha, and Mahendra."
  ),
  "tamil-nadu": createStateTraditionPreset(
    "Tamil Nadu",
    "tamil",
    "Tamil Nadu uses the Tamil Porutham variant, with stronger space for Dina, Rajju, Rasi, and Rasi Adhipathi.",
    "The Tamil Nadu view uses the Tamil Porutham variant with stronger space for Dina, Rajju, Rasi, and Rasi Adhipathi."
  )
};

const TRADITION_HINTS = {
  compare:
    "Compare keeps Ashtakoota and South Porutham side by side, while each state uses the closest source-backed family available here.",
  ...Object.fromEntries(
    Object.entries(STATE_TRADITION_PRESETS).map(([key, value]) => [key, value.hint])
  ),
  odia:
    "Odisha here uses a Dashamelaka-style view built from moon-sign matching, Rajju, and Kuja checks on top of the current chart engine.",
  east:
    "Ashtakoota / Guna Milan is the main 36-point moon-sign and nakshatra matching family used for most states here.",
  north:
    "North India here follows the Ashtakoota / Guna Milan family in this project.",
  west:
    "West India here follows the Ashtakoota / Guna Milan family in this project.",
  central:
    "Central India here follows the Ashtakoota / Guna Milan family in this project.",
  northeast:
    "North-East India here follows the Ashtakoota / Guna Milan family in this project.",
  south:
    "South Porutham here uses the source-backed porutham family with Dina, Gana, Mahendra, Deergha, Rasi, Rasi Adhipathi, Rajju, Vedha, and Vasya.",
  tamil:
    "Tamil Nadu here uses a Tamil Porutham variant with stronger space for Dina, Rajju, Rasi, and Rasi Adhipathi.",
  kerala:
    "Kerala here uses a Kerala Porutham variant with stronger space for Rajju, Deergha, and Mahendra."
};

const TRADITION_MODE_CONFIG = {
  compare: {
    label: "Compare",
    family: "compare",
    hint:
      "Compare keeps Ashtakoota and South Porutham side by side instead of picking one state-style preference.",
    narrative:
      "Both major matching styles are kept side by side so you can see where the match feels consistently strong and where the tradition changes the reading."
  },
  ...Object.fromEntries(
    Object.entries(STATE_TRADITION_PRESETS).map(([key, value]) => [
      key,
      {
        label: value.label,
        family: value.family,
        emphasis: value.emphasis,
        hint: value.hint,
        narrative: value.narrative
      }
    ])
  ),
  east: {
    label: "Ashtakoota",
    family: "east",
    hint:
      "Ashtakoota / Guna Milan is the main 36-point moon-sign and nakshatra matching family used for most states here.",
    narrative:
      "The Ashtakoota lens shows how Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi shape the match."
  },
  odia: {
    label: "Odia Dashamelaka",
    family: "odia",
    hint:
      "Odisha here uses a Dashamelaka-style view built from moon-sign matching, Rajju, and Kuja checks on top of the current chart engine.",
    narrative:
      "The Odisha lens reads a Dashamelaka-style combination of moon-sign factors, Rajju, and Kuja before giving the final match picture."
  },
  north: {
    label: "North India",
    family: "east",
    hint:
      "North India here follows the Ashtakoota / Guna Milan family in this project.",
    narrative:
      "The North India view uses the Ashtakoota / Guna Milan family for the main match."
  },
  west: {
    label: "West India",
    family: "east",
    hint:
      "West India here follows the Ashtakoota / Guna Milan family in this project.",
    narrative:
      "The West India view uses the Ashtakoota / Guna Milan family for the main match."
  },
  central: {
    label: "Central India",
    family: "east",
    hint:
      "Central India here follows the Ashtakoota / Guna Milan family in this project.",
    narrative:
      "The Central India view uses the Ashtakoota / Guna Milan family for the main match."
  },
  northeast: {
    label: "North-East India",
    family: "east",
    hint:
      "North-East India here follows the Ashtakoota / Guna Milan family in this project.",
    narrative:
      "The North-East India view uses the Ashtakoota / Guna Milan family for the main match."
  },
  south: {
    label: "South Porutham",
    family: "south",
    hint:
      "South Porutham here uses the source-backed porutham family with Dina, Gana, Mahendra, Deergha, Rasi, Rasi Adhipathi, Rajju, Vedha, and Vasya.",
    narrative:
      "The South Porutham lens shows how porutham-style steadiness, long-term safety, and practical harmony may shape the match."
  },
  tamil: {
    label: "Tamil Porutham",
    family: "tamil",
    hint:
      "Tamil Nadu here uses a Tamil Porutham variant with stronger space for Dina, Rajju, Rasi, and Rasi Adhipathi.",
    narrative:
      "The Tamil Porutham lens gives stronger space to Dina, Rajju, Rasi, and Rasi Adhipathi while still reading the full porutham set."
  },
  kerala: {
    label: "Kerala Porutham",
    family: "kerala",
    hint:
      "Kerala here uses a Kerala Porutham variant with stronger space for Rajju, Deergha, and Mahendra.",
    narrative:
      "The Kerala Porutham lens gives stronger space to Rajju, Deergha, and Mahendra while still reading the full porutham set."
  }
};

const OCR_LANGUAGE_CODES = {
  auto: "auto",
  english: "eng",
  hindi: "auto",
  bengali: "auto",
  odia: "auto",
  tamil: "auto",
  telugu: "auto",
  kannada: "auto",
  malayalam: "auto",
  gujarati: "auto",
  punjabi: "auto"
};

const OCR_NORMALIZATION_MAP = [
  ["लग्न", " lagna "],
  ["લગ્ન", " lagna "],
  ["లగ్న", " lagna "],
  ["லக்ன", " lagna "],
  ["ಲಗ್ನ", " lagna "],
  ["ലഗ്ന", " lagna "],
  ["ଲଗ୍ନ", " lagna "],
  ["লগ্ন", " lagna "],
  ["ਲਗਨ", " lagna "],
  ["राशि", " rashi "],
  ["रासी", " rashi "],
  ["રાશિ", " rashi "],
  ["రాశి", " rashi "],
  ["ராசி", " rashi "],
  ["ರಾಶಿ", " rashi "],
  ["രാശി", " rashi "],
  ["ରାଶି", " rashi "],
  ["রাশি", " rashi "],
  ["ਰਾਸ਼ੀ", " rashi "],
  ["चंद्र", " chandra "],
  ["ચંદ્ર", " chandra "],
  ["చంద్ర", " chandra "],
  ["சந்திர", " chandra "],
  ["ಚಂದ್ರ", " chandra "],
  ["ചന്ദ്ര", " chandra "],
  ["ଚନ୍ଦ୍ର", " chandra "],
  ["চন্দ্র", " chandra "],
  ["ਚੰਦਰ", " chandra "],
  ["नक्षत्र", " nakshatra "],
  ["નક્ષત્ર", " nakshatra "],
  ["నక్షత్ర", " nakshatra "],
  ["நட்சத்திர", " nakshatra "],
  ["ನಕ್ಷತ್ರ", " nakshatra "],
  ["നക്ഷത്ര", " nakshatra "],
  ["ନକ୍ଷତ୍ର", " nakshatra "],
  ["নক্ষত্র", " nakshatra "],
  ["ਨਕਸ਼ਤਰ", " nakshatra "],
  ["मेष", " mesha "],
  ["वृषभ", " vrishabha "],
  ["मिथुन", " mithuna "],
  ["कर्क", " karka "],
  ["कर्कट", " karka "],
  ["सिंह", " simha "],
  ["कन्या", " kanya "],
  ["तुला", " tula "],
  ["वृश्चिक", " vrischika "],
  ["धनु", " dhanu "],
  ["मकर", " makara "],
  ["कुंभ", " kumbha "],
  ["मीन", " meena "],
  ["મેષ", " mesha "],
  ["વૃષભ", " vrishabha "],
  ["મિથુન", " mithuna "],
  ["કર્ક", " karka "],
  ["સિંહ", " simha "],
  ["કન્યા", " kanya "],
  ["તુલા", " tula "],
  ["વૃશ્ચિક", " vrischika "],
  ["ધનુ", " dhanu "],
  ["મકર", " makara "],
  ["કુંભ", " kumbha "],
  ["મીન", " meena "],
  ["మేష", " mesha "],
  ["వృషభ", " vrishabha "],
  ["మిథున", " mithuna "],
  ["కర్కాటక", " karka "],
  ["కర్క", " karka "],
  ["సింహ", " simha "],
  ["కన్య", " kanya "],
  ["తుల", " tula "],
  ["వృశ్చిక", " vrischika "],
  ["ధనుస్సు", " dhanu "],
  ["మకర", " makara "],
  ["కుంభ", " kumbha "],
  ["మీన", " meena "],
  ["மேஷ", " mesha "],
  ["ரிஷப", " vrishabha "],
  ["மிதுன", " mithuna "],
  ["கடக", " karka "],
  ["சிம்ம", " simha "],
  ["கன்னி", " kanya "],
  ["துலாம்", " tula "],
  ["விருச்சிக", " vrischika "],
  ["தனுசு", " dhanu "],
  ["மகர", " makara "],
  ["கும்ப", " kumbha "],
  ["மீன", " meena "],
  ["ಮೇಷ", " mesha "],
  ["ವೃಷಭ", " vrishabha "],
  ["ಮಿಥುನ", " mithuna "],
  ["ಕಟಕ", " karka "],
  ["ಸಿಂಹ", " simha "],
  ["ಕನ್ಯಾ", " kanya "],
  ["ತುಲಾ", " tula "],
  ["ವೃಶ್ಚಿಕ", " vrischika "],
  ["ಧನು", " dhanu "],
  ["ಮಕರ", " makara "],
  ["ಕುಂಭ", " kumbha "],
  ["ಮೀನ", " meena "],
  ["മേടം", " mesha "],
  ["ഇടവം", " vrishabha "],
  ["മിഥുനം", " mithuna "],
  ["കർക്കടകം", " karka "],
  ["ചിങ്ങം", " simha "],
  ["കന്നി", " kanya "],
  ["തുലാം", " tula "],
  ["വൃശ്ചികം", " vrischika "],
  ["ധനു", " dhanu "],
  ["മകരം", " makara "],
  ["കുംഭം", " kumbha "],
  ["മീനം", " meena "],
  ["ମେଷ", " mesha "],
  ["ବୃଷ", " vrishabha "],
  ["ମିଥୁନ", " mithuna "],
  ["କର୍କଟ", " karka "],
  ["ସିଂହ", " simha "],
  ["କନ୍ୟା", " kanya "],
  ["ତୁଳା", " tula "],
  ["ବିଛା", " vrischika "],
  ["ଧନୁ", " dhanu "],
  ["ମକର", " makara "],
  ["କୁମ୍ଭ", " kumbha "],
  ["ମୀନ", " meena "],
  ["মেষ", " mesha "],
  ["বৃষ", " vrishabha "],
  ["মিথুন", " mithuna "],
  ["কর্কট", " karka "],
  ["সিংহ", " simha "],
  ["কন্যা", " kanya "],
  ["তুলা", " tula "],
  ["বৃশ্চিক", " vrischika "],
  ["ধনু", " dhanu "],
  ["মকর", " makara "],
  ["কুম্ভ", " kumbha "],
  ["মীন", " meena "],
  ["ਮੇਖ", " mesha "],
  ["ਵ੍ਰਿਸ਼ਭ", " vrishabha "],
  ["ਮਿਥੁਨ", " mithuna "],
  ["ਕਰਕ", " karka "],
  ["ਸਿੰਘ", " simha "],
  ["ਕੰਨਿਆ", " kanya "],
  ["ਤੁਲਾ", " tula "],
  ["ਵ੍ਰਿਸ਼ਚਿਕ", " vrischika "],
  ["ਧਨੁ", " dhanu "],
  ["ਮਕਰ", " makara "],
  ["ਕੁੰਭ", " kumbha "],
  ["ਮੀਨ", " meena "],
  ["अश्विनी", " ashwini "],
  ["भरणी", " bharani "],
  ["कृत्तिका", " krittika "],
  ["रोहिणी", " rohini "],
  ["मृगशीर्ष", " mrigashira "],
  ["आर्द्रा", " ardra "],
  ["पुनर्वसु", " punarvasu "],
  ["पुष्य", " pushya "],
  ["आश्लेषा", " ashlesha "],
  ["मघा", " magha "],
  ["रेवती", " revati "],
  ["અશ્વિની", " ashwini "],
  ["રોહિણી", " rohini "],
  ["પુષ્ય", " pushya "],
  ["મઘા", " magha "],
  ["రేవతి", " revati "],
  ["రోహిణి", " rohini "],
  ["పుష్యమి", " pushya "],
  ["మఖ", " magha "],
  ["ரேவதி", " revati "],
  ["ரோகிணி", " rohini "],
  ["பூசம்", " pushya "],
  ["மகம்", " magha "],
  ["ರೇವತಿ", " revati "],
  ["ರೋಹಿಣಿ", " rohini "],
  ["ಪುಷ್ಯ", " pushya "],
  ["ಮಘಾ", " magha "]
];

const INDIC_DIGIT_SETS = [
  ["०१२३४५६७८९", "0123456789"],
  ["০১২৩৪৫৬৭৮৯", "0123456789"],
  ["૦૧૨૩૪૫૬૭૮૯", "0123456789"],
  ["੦੧੨੩੪੫੬੭੮੯", "0123456789"],
  ["୦୧୨୩୪୫୬୭୮୯", "0123456789"],
  ["௦௧௨௩௪௫௬௭௮௯", "0123456789"],
  ["౦౧౨౩౪౫౬౭౮౯", "0123456789"],
  ["೦೧೨೩೪೫೬೭೮೯", "0123456789"],
  ["൦൧൨൩൪൫൬൭൮൯", "0123456789"]
];

const NAMES = {
  zodiac: [
    "Mesha",
    "Vrishabha",
    "Mithuna",
    "Karka",
    "Simha",
    "Kanya",
    "Tula",
    "Vrischika",
    "Dhanu",
    "Makara",
    "Kumbha",
    "Meena"
  ],
  nakshatra: [
    "Ashwini",
    "Bharani",
    "Krittika",
    "Rohini",
    "Mrigashira",
    "Ardra",
    "Punarvasu",
    "Pushya",
    "Ashlesha",
    "Magha",
    "Purva Phalguni",
    "Uttara Phalguni",
    "Hasta",
    "Chitra",
    "Swati",
    "Vishakha",
    "Anuradha",
    "Jyeshtha",
    "Mula",
    "Purva Ashadha",
    "Uttara Ashadha",
    "Shravana",
    "Dhanishta",
    "Shatabhisha",
    "Purva Bhadrapada",
    "Uttara Bhadrapada",
    "Revati"
  ],
  gana: ["Deva", "Manushya", "Rakshasa"],
  nadi: ["Adi", "Madhya", "Antya"],
  yoni: [
    "Ashwa",
    "Gaja",
    "Mesh",
    "Sarpa",
    "Shwan",
    "Marjara",
    "Mushaka",
    "Gau",
    "Mahisha",
    "Vyaghra",
    "Mriga",
    "Vanara",
    "Nakula",
    "Simha"
  ],
  middle: [
    { key: "mind", label: "Mind" },
    { key: "home", label: "Home" },
    { key: "purpose", label: "Purpose" }
  ]
};

const ZODIAC_ALIASES = {
  Mesha: ["mesha", "aries", "mesh"],
  Vrishabha: ["vrishabha", "vrushabha", "taurus", "brishabha", "rishabha"],
  Mithuna: ["mithuna", "mithun", "gemini"],
  Karka: ["karka", "kark", "cancer", "karkata"],
  Simha: ["simha", "simh", "leo"],
  Kanya: ["kanya", "virgo"],
  Tula: ["tula", "libra"],
  Vrischika: ["vrischika", "vrishchika", "vrischik", "scorpio"],
  Dhanu: ["dhanu", "dhanu", "sagittarius"],
  Makara: ["makara", "makar", "capricorn"],
  Kumbha: ["kumbha", "kumbh", "aquarius"],
  Meena: ["meena", "meen", "pisces"]
};

const NAKSHATRA_ALIASES = {
  Ashwini: ["ashwini", "aswini", "asvini"],
  Bharani: ["bharani", "barani"],
  Krittika: ["krittika", "kritika", "krttika"],
  Rohini: ["rohini"],
  Mrigashira: ["mrigashira", "mrigasira", "mrigasirsha"],
  Ardra: ["ardra", "arudra"],
  Punarvasu: ["punarvasu", "punarvasu"],
  Pushya: ["pushya", "pushya", "poosam"],
  Ashlesha: ["ashlesha", "aslesha", "ayilyam"],
  Magha: ["magha", "makha"],
  "Purva Phalguni": ["purva phalguni", "poorva phalguni", "pubba"],
  "Uttara Phalguni": ["uttara phalguni", "uttaraphalguni", "uttara"],
  Hasta: ["hasta"],
  Chitra: ["chitra", "chitira"],
  Swati: ["swati", "svati"],
  Vishakha: ["vishakha", "visakha"],
  Anuradha: ["anuradha", "anusham"],
  Jyeshtha: ["jyeshtha", "jyestha", "kettai"],
  Mula: ["mula", "moola"],
  "Purva Ashadha": ["purva ashadha", "poorva ashadha"],
  "Uttara Ashadha": ["uttara ashadha", "uttarashada"],
  Shravana: ["shravana", "sravana", "thiruvonam"],
  Dhanishta: ["dhanishta", "dhanista", "avittam"],
  Shatabhisha: ["shatabhisha", "satabhisha", "sadayam"],
  "Purva Bhadrapada": ["purva bhadrapada", "poorva bhadrapada"],
  "Uttara Bhadrapada": ["uttara bhadrapada", "uttarabhadra"],
  Revati: ["revati", "revathy"]
};

const PLACE_GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const PLACE_TIMEZONE_URL = "https://api.open-meteo.com/v1/forecast";
const NOMINATIM_GEOCODE_URL = "https://nominatim.openstreetmap.org/search";
const placeResolutionCache = new Map();
const placeSuggestionCache = new Map();
const PLACE_ALIAS_VARIANTS = {
  "berhampur, odisha": ["brahmapur, odisha", "brahmapur, ganjam, odisha"],
  berhampur: ["brahmapur", "brahmapur, odisha"]
};

const VARNA_ORDER = ["Shudra", "Vaishya", "Kshatriya", "Brahmin"];
const SIGN_VARNA = [
  "Kshatriya",
  "Vaishya",
  "Shudra",
  "Brahmin",
  "Kshatriya",
  "Vaishya",
  "Shudra",
  "Brahmin",
  "Kshatriya",
  "Vaishya",
  "Shudra",
  "Brahmin"
];
const SIGN_VASHYA = [
  "Chatushpada",
  "Chatushpada",
  "Manava",
  "Jalachara",
  "Vanachara",
  "Manava",
  "Manava",
  "Keeta",
  "Chatushpada",
  "Chatushpada",
  "Manava",
  "Jalachara"
];
const SIGN_LORDS = [
  "Mars",
  "Venus",
  "Mercury",
  "Moon",
  "Sun",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Saturn",
  "Jupiter"
];
const LORD_RELATIONS = {
  Sun: { friends: ["Moon", "Mars", "Jupiter"], neutral: ["Mercury"], enemies: ["Venus", "Saturn"] },
  Moon: { friends: ["Sun", "Mercury"], neutral: ["Mars", "Jupiter", "Venus", "Saturn"], enemies: [] },
  Mars: { friends: ["Sun", "Moon", "Jupiter"], neutral: ["Venus", "Saturn"], enemies: ["Mercury"] },
  Mercury: { friends: ["Sun", "Venus"], neutral: ["Mars", "Jupiter", "Saturn"], enemies: ["Moon"] },
  Jupiter: { friends: ["Sun", "Moon", "Mars"], neutral: ["Saturn"], enemies: ["Mercury", "Venus"] },
  Venus: { friends: ["Mercury", "Saturn"], neutral: ["Mars", "Jupiter"], enemies: ["Sun", "Moon"] },
  Saturn: { friends: ["Mercury", "Venus"], neutral: ["Jupiter"], enemies: ["Sun", "Moon", "Mars"] }
};
const NAKSHATRA_GANA = [
  "Deva", "Manushya", "Rakshasa", "Manushya", "Deva", "Manushya", "Deva", "Deva", "Rakshasa",
  "Rakshasa", "Manushya", "Manushya", "Deva", "Rakshasa", "Deva", "Rakshasa", "Deva", "Rakshasa",
  "Rakshasa", "Manushya", "Manushya", "Deva", "Rakshasa", "Rakshasa", "Manushya", "Manushya", "Deva"
];
const NAKSHATRA_YONI = [
  "Ashwa", "Gaja", "Mesh", "Sarpa", "Sarpa", "Shwan", "Marjara", "Mesh", "Marjara",
  "Mushaka", "Mushaka", "Gau", "Mahisha", "Vyaghra", "Mahisha", "Vyaghra", "Mriga", "Mriga",
  "Shwan", "Vanara", "Nakula", "Vanara", "Simha", "Ashwa", "Simha", "Gau", "Gaja"
];
const YONI_ENEMIES = new Set([
  buildPairKey("Ashwa", "Mahisha"),
  buildPairKey("Gaja", "Simha"),
  buildPairKey("Mesh", "Vanara"),
  buildPairKey("Sarpa", "Nakula"),
  buildPairKey("Shwan", "Mriga"),
  buildPairKey("Marjara", "Mushaka"),
  buildPairKey("Gau", "Vyaghra")
]);
const YONI_FRIENDS = new Set([
  buildPairKey("Ashwa", "Gaja"),
  buildPairKey("Mesh", "Gau"),
  buildPairKey("Sarpa", "Mriga"),
  buildPairKey("Shwan", "Vanara"),
  buildPairKey("Marjara", "Mahisha"),
  buildPairKey("Mushaka", "Nakula"),
  buildPairKey("Simha", "Vyaghra")
]);
const KUJA_HOUSES = new Set([1, 2, 4, 7, 8, 12]);
const PLANET_KEYS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
const PLANET_SHORT_LABELS = {
  Sun: "Su",
  Moon: "Mo",
  Mars: "Ma",
  Mercury: "Me",
  Jupiter: "Ju",
  Venus: "Ve",
  Saturn: "Sa",
  Rahu: "Ra",
  Ketu: "Ke"
};
const KUNDALI_BOARD_POSITIONS = {
  1: { column: 2, row: 1 },
  2: { column: 3, row: 1 },
  3: { column: 4, row: 1 },
  4: { column: 4, row: 2 },
  5: { column: 4, row: 3 },
  6: { column: 4, row: 4 },
  7: { column: 3, row: 4 },
  8: { column: 2, row: 4 },
  9: { column: 1, row: 4 },
  10: { column: 1, row: 3 },
  11: { column: 1, row: 2 },
  12: { column: 1, row: 1 }
};
const PLANET_ALIASES = {
  Sun: ["sun", "surya", "ravi"],
  Moon: ["moon", "chandra", "soma"],
  Mars: ["mars", "mangal", "kuja", "angaraka"],
  Mercury: ["mercury", "budha"],
  Jupiter: ["jupiter", "guru", "brihaspati"],
  Venus: ["venus", "shukra"],
  Saturn: ["saturn", "shani"],
  Rahu: ["rahu"],
  Ketu: ["ketu"]
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("matchForm");
  const traditionMode = document.getElementById("traditionMode");
  const pairOrder = document.getElementById("pairOrder");
  const traditionField = document.getElementById("traditionField");
  const traditionHint = document.getElementById("traditionHint");
  const inputMode = document.getElementById("inputMode");
  const inputHint = document.getElementById("inputHint");
  const imageLanguage = document.getElementById("imageLanguage");
  const openSettingsButton = document.getElementById("openSettingsButton");
  const closeSettingsButton = document.getElementById("closeSettingsButton");
  const settingsPanel = document.getElementById("settingsPanel");
  const settingsBackdrop = document.getElementById("settingsBackdrop");
  const downloadReportButton = document.getElementById("downloadReportButton");
  const reportLanguage = document.getElementById("reportLanguage");

  populateChartSelects();
  restoreState(form, traditionMode, inputMode, imageLanguage, pairOrder, reportLanguage);
  currentLanguage = reportLanguage.value || DEFAULT_REPORT_LANGUAGE;
  syncModePanels(form, inputMode.value);
  updateTraditionHint(traditionHint, traditionMode.value);
  updateInputHint(inputHint, inputMode.value);
  updateModeSpecificVisibility(traditionField, traditionHint, inputMode.value);
  applyReportLanguage(reportLanguage.value);
  setupSettingsPanel(openSettingsButton, closeSettingsButton, settingsPanel, settingsBackdrop);
  setupReportDownload(downloadReportButton);
  setupPlaceAutocomplete("A", form);
  setupPlaceAutocomplete("B", form);

  setupChartFileFlow("A", form, inputMode, traditionMode, imageLanguage, pairOrder, reportLanguage);
  setupChartFileFlow("B", form, inputMode, traditionMode, imageLanguage, pairOrder, reportLanguage);

  traditionMode.addEventListener("change", () => {
    updateTraditionHint(traditionHint, traditionMode.value);
    persistState(form, traditionMode, inputMode, imageLanguage, pairOrder, reportLanguage);
  });

  inputMode.addEventListener("change", () => {
    syncModePanels(form, inputMode.value);
    updateInputHint(inputHint, inputMode.value);
    updateModeSpecificVisibility(traditionField, traditionHint, inputMode.value);
    persistState(form, traditionMode, inputMode, imageLanguage, pairOrder, reportLanguage);
  });

  imageLanguage.addEventListener("change", () => {
    persistState(form, traditionMode, inputMode, imageLanguage, pairOrder, reportLanguage);
  });

  if (pairOrder) {
    pairOrder.addEventListener("change", () => {
      persistState(form, traditionMode, inputMode, imageLanguage, pairOrder, reportLanguage);
    });
  }

  reportLanguage.addEventListener("change", () => {
    currentLanguage = reportLanguage.value || DEFAULT_REPORT_LANGUAGE;
    applyReportLanguage(currentLanguage);
    if (lastResult) {
      renderResults(lastResult);
    }
    persistState(form, traditionMode, inputMode, imageLanguage, pairOrder, reportLanguage);
  });

  form.addEventListener("input", (event) => {
    if (event.target.type !== "file") {
      persistState(form, traditionMode, inputMode, imageLanguage, pairOrder, reportLanguage);
    }
  });

  form.addEventListener("change", (event) => {
    if (event.target.type !== "file") {
      persistState(form, traditionMode, inputMode, imageLanguage, pairOrder, reportLanguage);
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    syncModePanels(form, inputMode.value);

    if (!form.reportValidity()) {
      return;
    }

    const resolvedPlaces = await resolveBirthInputsIfNeeded(form, inputMode.value);
    const input = collectInput(form, traditionMode.value, inputMode.value, getPairOrderValue(pairOrder), resolvedPlaces);
    const result = calculateMatch(input);
    renderResults(result);
    lastResult = result;
    downloadReportButton.disabled = false;
    persistState(form, traditionMode, inputMode, imageLanguage, pairOrder, reportLanguage);
  });
});

function getPairOrderValue(pairOrderNode) {
  return pairOrderNode && ["a-groom", "a-bride"].includes(pairOrderNode.value)
    ? pairOrderNode.value
    : DEFAULT_PAIR_ORDER;
}

function setupReportDownload(button) {
  button.addEventListener("click", async () => {
    if (!lastResult) {
      return;
    }

    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = `${getReportText("downloadPdf")}...`;

    try {
      await downloadCompatibilityReportCard(lastResult);
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
}

function setupPlaceAutocomplete(suffix, form) {
  const input = form.elements.namedItem(`person${suffix}Place`);
  const datalist = document.getElementById(`person${suffix}PlaceSuggestions`);
  let debounceId = null;
  let activeRequest = 0;

  if (!input || !datalist) {
    return;
  }

  const loadSuggestions = async () => {
    const query = input.value.trim();
    if (query.length < 2) {
      renderPlaceSuggestions(datalist, []);
      return;
    }

    const requestId = activeRequest + 1;
    activeRequest = requestId;

    try {
      const suggestions = await fetchPlaceSuggestions(query);
      if (activeRequest !== requestId || input.value.trim() !== query) {
        return;
      }
      renderPlaceSuggestions(datalist, suggestions);
    } catch (error) {
      if (activeRequest === requestId) {
        renderPlaceSuggestions(datalist, []);
      }
    }
  };

  input.addEventListener("input", () => {
    clearTimeout(debounceId);
    debounceId = setTimeout(loadSuggestions, 220);
  });

  input.addEventListener("focus", () => {
    if (input.value.trim().length >= 2 && !datalist.options.length) {
      loadSuggestions();
    }
  });
}

function setupSettingsPanel(openButton, closeButton, panel, backdrop) {
  const openPanel = () => {
    panel.classList.remove("hidden-settings");
    backdrop.classList.remove("hidden-settings");
    panel.setAttribute("aria-hidden", "false");
  };

  const closePanel = () => {
    panel.classList.add("hidden-settings");
    backdrop.classList.add("hidden-settings");
    panel.setAttribute("aria-hidden", "true");
  };

  openButton.addEventListener("click", openPanel);
  closeButton.addEventListener("click", closePanel);
  backdrop.addEventListener("click", closePanel);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.classList.contains("hidden-settings")) {
      closePanel();
    }
  });
}

function populateChartSelects() {
  const selectGroups = {
    zodiac: NAMES.zodiac,
    nakshatra: NAMES.nakshatra
  };

  document.querySelectorAll(".chart-select").forEach((select) => {
    const options = selectGroups[select.dataset.options] || [];
    const placeholder =
      select.dataset.placeholder ||
      (select.dataset.options === "nakshatra" ? "Choose nakshatra" : "Choose sign");

    select.innerHTML = [
      `<option value="">${placeholder}</option>`,
      ...options.map((label, index) => `<option value="${index}">${escapeHtml(label)}</option>`)
    ].join("");
  });
}

function restoreState(form, traditionMode, inputMode, imageLanguage, pairOrder, reportLanguage) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    const saved = JSON.parse(raw);

    const normalizedTraditionMode = normalizeTraditionMode(saved.traditionMode);
    if (normalizedTraditionMode && TRADITION_HINTS[normalizedTraditionMode]) {
      traditionMode.value = normalizedTraditionMode;
    }

    if (saved.inputMode && INPUT_HINTS[saved.inputMode]) {
      inputMode.value = saved.inputMode;
    }

    if (saved.imageLanguage && OCR_LANGUAGE_CODES[saved.imageLanguage]) {
      imageLanguage.value = saved.imageLanguage;
    }

    if (pairOrder && saved.pairOrder && ["a-groom", "a-bride"].includes(saved.pairOrder)) {
      pairOrder.value = saved.pairOrder;
    }

    if (saved.reportLanguage && REPORT_UI_TEXT[saved.reportLanguage]) {
      reportLanguage.value = saved.reportLanguage;
    }

    Object.entries(saved.fields || {}).forEach(([name, value]) => {
      const field = form.elements.namedItem(name);
      if (field && typeof value === "string" && field.type !== "file") {
        field.value = value;
      }
    });
  } catch (error) {
    console.warn("Unable to restore saved popup state", error);
  }
}

function persistState(form, traditionMode, inputMode, imageLanguage, pairOrder, reportLanguage) {
  const fields = {};

  Array.from(form.elements).forEach((element) => {
    if (!element.name || element.type === "file") {
      return;
    }

    fields[element.name] = element.value;
  });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      traditionMode: normalizeTraditionMode(traditionMode.value),
      inputMode: inputMode.value,
      imageLanguage: imageLanguage.value,
      pairOrder: getPairOrderValue(pairOrder),
      reportLanguage: reportLanguage.value,
      fields
    })
  );
}

function updateTraditionHint(node, mode) {
  node.textContent = TRADITION_HINTS[normalizeTraditionMode(mode)] || TRADITION_HINTS.compare;
}

function updateInputHint(node, mode) {
  node.textContent = INPUT_HINTS[mode] || INPUT_HINTS.birth;
}

function updateModeSpecificVisibility(traditionField, traditionHint, mode) {
  if (traditionField) {
    traditionField.style.display = "";
  }

  if (traditionHint) {
    traditionHint.style.display = "";
  }
}

function getReportText(key) {
  const pack = REPORT_UI_TEXT[currentLanguage] || REPORT_UI_TEXT[DEFAULT_REPORT_LANGUAGE];
  return pack[key] || REPORT_UI_TEXT[DEFAULT_REPORT_LANGUAGE][key] || "";
}

function translateResultText(text) {
  if (!text || currentLanguage === DEFAULT_REPORT_LANGUAGE) {
    return text;
  }

  const localized = RESULT_TEXT_TRANSLATIONS[currentLanguage];
  return localized && localized[text] ? localized[text] : text;
}

function getMatchCheckMetaLabel(key) {
  const pack = MATCH_CHECK_META_LABELS[currentLanguage] || MATCH_CHECK_META_LABELS[DEFAULT_REPORT_LANGUAGE];
  return pack[key] || MATCH_CHECK_META_LABELS[DEFAULT_REPORT_LANGUAGE][key] || "";
}

function getMatchCheckDetail(label, field) {
  const localized = MATCH_CHECK_DETAIL_TRANSLATIONS[currentLanguage];
  if (localized && localized[label] && localized[label][field]) {
    return localized[label][field];
  }

  return (MATCH_CHECK_DETAILS[label] && MATCH_CHECK_DETAILS[label][field]) || "";
}

function getLocalizedDecision(decision) {
  return {
    ...decision,
    headline: translateResultText(decision.headline),
    guideLabel: translateResultText(decision.guideLabel),
    thresholdText: translateResultText(decision.thresholdText),
    note: translateResultText(decision.note),
    actionLabel: translateResultText(decision.actionLabel),
    nextStep: translateResultText(decision.nextStep),
    guideRange: translateResultText(decision.guideRange)
  };
}

function applyReportLanguage(language) {
  currentLanguage = REPORT_UI_TEXT[language] ? language : DEFAULT_REPORT_LANGUAGE;

  const mappings = {
    resultKicker: "resultKicker",
    reportLanguage: "reportLanguageLabel",
    readingStyle: "recommendedStyleLabel",
    matchLevel: "matchLevelLabel",
    regionalGap: "regionalGapLabel",
    sectionReadTitle: "sectionReadTitle",
    sectionReadDesc: "sectionReadDesc",
    sectionPriorityTitle: "sectionPriorityTitle",
    sectionPriorityDesc: "sectionPriorityDesc",
    sectionBasisTitle: "sectionBasisTitle",
    sectionBasisDesc: "sectionBasisDesc",
    sectionKundaliTitle: "sectionKundaliTitle",
    sectionKundaliDesc: "sectionKundaliDesc",
    sectionTrustTitle: "sectionTrustTitle",
    sectionTrustDesc: "sectionTrustDesc",
    sectionMiddleTitle: "sectionMiddleTitle",
    sectionMiddleDesc: "sectionMiddleDesc",
    sectionRegionalTitle: "sectionRegionalTitle",
    sectionRegionalDesc: "sectionRegionalDesc",
    sectionGoodTitle: "sectionGoodTitle",
    sectionGoodDesc: "sectionGoodDesc",
    sectionCareTitle: "sectionCareTitle",
    sectionCareDesc: "sectionCareDesc",
    sectionChecksTitle: "sectionChecksTitle"
    ,
    sectionChecksDesc: "sectionChecksDesc"
  };

  Object.entries(mappings).forEach(([key, id]) => {
    const node = document.getElementById(id);
    if (node) {
      node.textContent = getReportText(key);
    }
  });

  const downloadButton = document.getElementById("downloadReportButton");
  if (downloadButton) {
    downloadButton.textContent = getReportText("downloadPdf");
  }
}

function getLocalizedTraditionLabel(mode) {
  const normalizedMode = normalizeTraditionMode(mode);
  const config = TRADITION_MODE_CONFIG[normalizedMode] || TRADITION_MODE_CONFIG.compare;

  if (normalizedMode === "compare") {
    return config.label || getReportText("lensCompare");
  }

  return config.label || getReportText("lensCompare");
}

function normalizeTraditionMode(mode) {
  return TRADITION_MODE_CONFIG[mode] ? mode : "compare";
}

function getTraditionFamily(mode) {
  const normalizedMode = normalizeTraditionMode(mode);
  return (TRADITION_MODE_CONFIG[normalizedMode] || TRADITION_MODE_CONFIG.compare).family;
}

function getTraditionConfig(mode) {
  const normalizedMode = normalizeTraditionMode(mode);
  return TRADITION_MODE_CONFIG[normalizedMode] || TRADITION_MODE_CONFIG.compare;
}

async function fetchPlaceSuggestions(query) {
  const cacheKey = query.trim().toLowerCase();
  if (placeSuggestionCache.has(cacheKey)) {
    return placeSuggestionCache.get(cacheKey);
  }

  const variants = buildPlaceQueryVariants(query).slice(0, 3);
  let suggestions = [];

  for (const variant of variants) {
    suggestions = await geocodeSuggestionsWithOpenMeteo(variant);
    if (suggestions.length) {
      break;
    }
  }

  if (!suggestions.length) {
    for (const variant of variants) {
      suggestions = await geocodeSuggestionsWithNominatim(variant);
      if (suggestions.length) {
        break;
      }
    }
  }

  const uniqueSuggestions = [...new Set(suggestions)].slice(0, 8);
  placeSuggestionCache.set(cacheKey, uniqueSuggestions);
  return uniqueSuggestions;
}

function renderPlaceSuggestions(datalist, suggestions) {
  datalist.innerHTML = suggestions
    .map((item) => `<option value="${escapeHtml(item)}"></option>`)
    .join("");
}

function syncModePanels(form, mode) {
  form.querySelectorAll(".mode-panel").forEach((panel) => {
    const isActive = panel.dataset.inputMode === mode;
    panel.classList.toggle("hidden-mode", !isActive);

    panel.querySelectorAll("input, select, textarea").forEach((field) => {
      field.disabled = !isActive;
    });
  });
}

async function resolveBirthInputsIfNeeded(form, inputMode) {
  if (inputMode !== "birth") {
    return null;
  }

  const tasks = ["A", "B"].map((suffix) => resolveBirthPlaceForPerson(form, suffix));
  const [personA, personB] = await Promise.all(tasks);
  return { A: personA, B: personB };
}

async function resolveBirthPlaceForPerson(form, suffix) {
  const place = getFieldValue(form, `person${suffix}Place`);
  const statusNode = document.getElementById(`person${suffix}PlaceStatus`);

  if (!place) {
    setStatus(statusNode, "Birthplace is required for chart-grade matching.", "warning");
    return null;
  }

  setStatus(statusNode, "");

  try {
    const resolved = await resolvePlace(place);
    setStatus(statusNode, "");
    return resolved;
  } catch (error) {
    setStatus(
      statusNode,
      "Could not resolve this place precisely. Matching will continue with lower confidence unless you use chart mode.",
      "warning"
    );
    return null;
  }
}

async function resolvePlace(place) {
  const cacheKey = place.trim().toLowerCase();
  if (placeResolutionCache.has(cacheKey)) {
    return placeResolutionCache.get(cacheKey);
  }

  const variants = buildPlaceQueryVariants(place);
  let match = null;

  for (const query of variants) {
    match = await geocodeWithOpenMeteo(query);
    if (match) {
      break;
    }
  }

  if (!match) {
    for (const query of variants) {
      match = await geocodeWithNominatim(query);
      if (match) {
        break;
      }
    }
  }

  if (!match) {
    throw new Error("Place lookup failed");
  }

  const timezoneData = await resolveTimezone(match.latitude, match.longitude);
  const resolved = {
    query: place,
    displayName: [match.name, match.admin1, match.country].filter(Boolean).join(", "),
    latitude: Number(match.latitude),
    longitude: Number(match.longitude),
    country: match.country || "",
    timezone: timezoneData.timezone || match.timezone || "UTC"
  };

  placeResolutionCache.set(cacheKey, resolved);
  return resolved;
}

function buildPlaceQueryVariants(place) {
  const normalized = place.trim().toLowerCase();
  const variants = [place.trim()];
  const aliasVariants = PLACE_ALIAS_VARIANTS[normalized] || [];
  aliasVariants.forEach((variant) => variants.push(variant));

  if (normalized.includes("odisha")) {
    variants.push(place.replace(/odisha/i, "orissa"));
  }

  return [...new Set(variants.filter(Boolean))];
}

async function geocodeWithOpenMeteo(query) {
  const geocodeUrl = new URL(PLACE_GEOCODE_URL);
  geocodeUrl.searchParams.set("name", query);
  geocodeUrl.searchParams.set("count", "5");
  geocodeUrl.searchParams.set("language", "en");
  geocodeUrl.searchParams.set("format", "json");

  const geocodeResponse = await fetch(geocodeUrl.toString());
  const geocodeData = await geocodeResponse.json();
  const results = geocodeData.results || [];
  if (!geocodeResponse.ok || !results.length) {
    return null;
  }

  return pickBestPlaceMatch(query, results.map((item) => ({
    name: item.name,
    admin1: item.admin1,
    country: item.country,
    latitude: Number(item.latitude),
    longitude: Number(item.longitude),
    timezone: item.timezone || ""
  })));
}

async function geocodeSuggestionsWithOpenMeteo(query) {
  const geocodeUrl = new URL(PLACE_GEOCODE_URL);
  geocodeUrl.searchParams.set("name", query);
  geocodeUrl.searchParams.set("count", "8");
  geocodeUrl.searchParams.set("language", "en");
  geocodeUrl.searchParams.set("format", "json");

  const response = await fetch(geocodeUrl.toString());
  const data = await response.json();
  const results = data.results || [];
  if (!response.ok || !results.length) {
    return [];
  }

  return results.map((item) =>
    [item.name, item.admin1, item.country].filter(Boolean).join(", ")
  );
}

async function geocodeWithNominatim(query) {
  const nominatimUrl = new URL(NOMINATIM_GEOCODE_URL);
  nominatimUrl.searchParams.set("q", query);
  nominatimUrl.searchParams.set("format", "jsonv2");
  nominatimUrl.searchParams.set("limit", "5");

  const response = await fetch(nominatimUrl.toString());
  const data = await response.json();
  if (!response.ok || !Array.isArray(data) || !data.length) {
    return null;
  }

  const candidates = data.map((item) => ({
    name: item.name || item.display_name?.split(",")[0] || query,
    admin1: item.display_name?.split(",")[1]?.trim() || "",
    country: item.display_name?.split(",").at(-1)?.trim() || "",
    latitude: Number(item.lat),
    longitude: Number(item.lon),
    timezone: "",
    type: item.type || "",
    rank: Number(item.place_rank || 0)
  }));

  return pickBestPlaceMatch(query, candidates);
}

async function geocodeSuggestionsWithNominatim(query) {
  const nominatimUrl = new URL(NOMINATIM_GEOCODE_URL);
  nominatimUrl.searchParams.set("q", query);
  nominatimUrl.searchParams.set("format", "jsonv2");
  nominatimUrl.searchParams.set("limit", "8");

  const response = await fetch(nominatimUrl.toString());
  const data = await response.json();
  if (!response.ok || !Array.isArray(data) || !data.length) {
    return [];
  }

  return data
    .map((item) => simplifyNominatimDisplayName(item.display_name))
    .filter(Boolean);
}

function simplifyNominatimDisplayName(displayName) {
  const parts = String(displayName)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return parts.slice(0, 3).join(", ");
}

function pickBestPlaceMatch(query, candidates) {
  const queryTokens = tokenizePlace(query);

  return [...candidates]
    .sort((left, right) => scorePlaceCandidate(right, queryTokens) - scorePlaceCandidate(left, queryTokens))[0] || null;
}

function scorePlaceCandidate(candidate, queryTokens) {
  const haystack = tokenizePlace([candidate.name, candidate.admin1, candidate.country, candidate.type].filter(Boolean).join(" "));
  const overlap = queryTokens.filter((token) => haystack.includes(token)).length;
  let score = overlap * 10;

  if (["city", "town", "municipality"].includes(candidate.type)) {
    score += 8;
  }
  if (candidate.rank && candidate.rank >= 14) {
    score += 4;
  }
  if (candidate.admin1 && queryTokens.includes(candidate.admin1.toLowerCase())) {
    score += 4;
  }

  return score;
}

function tokenizePlace(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

async function resolveTimezone(latitude, longitude) {
  const timezoneUrl = new URL(PLACE_TIMEZONE_URL);
  timezoneUrl.searchParams.set("latitude", latitude);
  timezoneUrl.searchParams.set("longitude", longitude);
  timezoneUrl.searchParams.set("timezone", "auto");
  timezoneUrl.searchParams.set("current", "temperature_2m");

  const timezoneResponse = await fetch(timezoneUrl.toString());
  const timezoneData = await timezoneResponse.json();
  return timezoneData || {};
}

function setupChartFileFlow(suffix, form, inputMode, traditionMode, imageLanguage, pairOrder, reportLanguage) {
  const fileInput = form.elements.namedItem(`person${suffix}ChartImage`);
  const preview = document.getElementById(`person${suffix}ChartPreview`);
  const button = document.querySelector(`.auto-fill-button[data-person="${suffix}"]`);
  const status = document.getElementById(`person${suffix}ChartStatus`);

  renderEmptyPreview(preview);
  setStatus(
    status,
    "Upload a kundli image or PDF to auto-fill the chart values."
  );

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];

    if (!file || !isSupportedChartFile(file)) {
      renderEmptyPreview(preview);
      setStatus(status, "Upload a kundli image or PDF to auto-fill the chart values.");
      return;
    }

    renderFilePreview(preview, file);

    if (inputMode.value !== "chart") {
      setStatus(status, "Switch Input Source to chart mode to use auto-fill.", "warning");
      return;
    }

    await autoFillFromFile({
      suffix,
      form,
      inputMode,
      traditionMode,
      imageLanguage,
      pairOrder,
      reportLanguage,
      button,
      status
    });
  });

  button.addEventListener("click", async () => {
    await autoFillFromFile({
      suffix,
      form,
      inputMode,
      traditionMode,
      imageLanguage,
      pairOrder,
      reportLanguage,
      button,
      status
    });
  });
}

async function autoFillFromFile({
  suffix,
  form,
  inputMode,
  traditionMode,
  imageLanguage,
  pairOrder,
  reportLanguage,
  button,
  status
}) {
  if (inputMode.value !== "chart") {
    setStatus(status, "Switch Input Source to chart mode first.", "warning");
    return;
  }

  const fileInput = form.elements.namedItem(`person${suffix}ChartImage`);
  const file = fileInput && fileInput.files && fileInput.files[0];

  if (!file) {
    setStatus(status, "Please upload a kundli image or PDF first.", "warning");
    return;
  }

  button.disabled = true;
  setStatus(
    status,
    `Reading the full kundli ${getFileKind(file)} with free OCR and scanning all detected pages and lines. Please review the filled values before matching.`,
    "loading"
  );

  try {
    let statusUpdated = false;
    const ocrText = await extractTextWithFallbacks({
      file,
      imageLanguage: imageLanguage.value,
      onFallbackStart: () => {
        statusUpdated = true;
        setStatus(
          status,
          "Primary OCR was weak, trying a handwriting-friendly fallback pass...",
          "loading"
        );
      }
    });

    const extracted = extractKundliFromOcrText(ocrText);
    const filledCount = applyExtractedChartValues(form, suffix, extracted);

    if (filledCount >= 3) {
      setStatus(
        status,
        `Auto-filled ${filledCount} fields from the file.${statusUpdated ? " A second reading pass was used." : ""} Please review all values before matching.`,
        "success"
      );
    } else {
      setStatus(
        status,
        "Free OCR found limited chart text. The notes field was filled with OCR output, but you may need to complete the chart values manually.",
        "warning"
      );
    }

    persistState(form, traditionMode, inputMode, imageLanguage, pairOrder, reportLanguage);
  } catch (error) {
    setStatus(status, error.message || "Unable to auto-fill from the file right now.", "error");
  } finally {
    button.disabled = false;
  }
}

async function extractTextWithFallbacks({ file, imageLanguage, onFallbackStart }) {
  const primaryText = await requestFreeOcrBestEffort({
    file,
    imageLanguage
  });

  const primaryExtraction = extractKundliFromOcrText(primaryText);
  if (!isWeakExtraction(primaryExtraction)) {
    return primaryText;
  }

  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (isPdf) {
    return primaryText;
  }

  if (typeof onFallbackStart === "function") {
    onFallbackStart();
  }

  try {
    const enhancedImage = await createEnhancedImageDataUrl(file);
    const fallbackText = await requestFreeOcrBestEffort({
      file,
      imageLanguage,
      base64Image: enhancedImage
    });
    const fallbackExtraction = extractKundliFromOcrText(fallbackText);

    return scoreExtraction(fallbackExtraction) >= scoreExtraction(primaryExtraction)
      ? fallbackText
      : primaryText;
  } catch (error) {
    return primaryText;
  }
}

async function requestFreeOcrBestEffort({ file, imageLanguage, base64Image }) {
  const attempted = new Set();
  const languagePlan = buildOcrLanguagePlan(imageLanguage);
  let lastError = null;

  for (const languageCode of languagePlan) {
    if (attempted.has(languageCode)) {
      continue;
    }

    attempted.add(languageCode);

    try {
      return await requestFreeOcr({
        file,
        ocrLanguageCode: languageCode,
        base64Image
      });
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("The free OCR service could not read this file.");
}

function buildOcrLanguagePlan(language) {
  const preferred = mapImageLanguageToOcrLanguage(language);
  return [preferred, OCR_LANGUAGE_CODES.auto, OCR_LANGUAGE_CODES.english];
}

async function requestFreeOcr({ file, ocrLanguageCode, base64Image }) {
  const formData = new FormData();

  if (base64Image) {
    formData.append("base64Image", base64Image);
  } else {
    formData.append("file", file, file.name);
  }

  formData.append("language", ocrLanguageCode);
  formData.append("OCREngine", "2");
  formData.append("isOverlayRequired", "false");
  formData.append("detectOrientation", "true");
  formData.append("scale", "true");

  if (!base64Image && (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"))) {
    formData.append("filetype", "PDF");
  }

  const response = await fetch(OCR_SPACE_URL, {
    method: "POST",
    headers: {
      apikey: OCR_SPACE_DEMO_KEY
    },
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("The free OCR service is not available right now.");
  }

  if (data.IsErroredOnProcessing) {
    throw new Error(data.ErrorMessage?.join(" ") || "The free OCR service could not process this file.");
  }

  const combinedText = (data.ParsedResults || [])
    .map((result) => result.ParsedText || "")
    .join("\n")
    .trim();

  if (!combinedText) {
    throw new Error("No readable text was found in this file.");
  }

  return combinedText;
}

function extractKundliFromOcrText(ocrText) {
  const normalized = normalizeOcrText(ocrText);
  const lines = buildNormalizedOcrLines(ocrText);
  const lagnaLabels = ["lagna", "ascendant", "asc"];
  const moonLabels = [
    ["moon sign", "moon", "rashi", "raashi", "chandra", "janma rashi"],
  ].flat();
  const nakshatraLabels = ["nakshatra", "nakshtra", "star", "birth star"];
  const lagna = findValueInDocument(lines, normalized, lagnaLabels, ZODIAC_ALIASES);
  const moon = findValueInDocument(lines, normalized, moonLabels, ZODIAC_ALIASES);
  const nakshatra = findValueInDocument(lines, normalized, nakshatraLabels, NAKSHATRA_ALIASES);
  const numbers = extractStandaloneNumbers(normalized);
  const mindNumber = extractNumberFromDocument(lines, normalized, ["mind", "mana", "mental"], numbers[0]);
  const homeNumber = extractNumberFromDocument(lines, normalized, ["home", "griha", "house"], numbers[1]);
  const purposeNumber = extractNumberFromDocument(lines, normalized, ["purpose", "karma", "goal"], numbers[2]);
  const marsHouse = extractNumberFromDocument(lines, normalized, ["mars house", "mars", "mangal", "kuja"], null);
  const chartStructure = extractChartStructure(lines, lagna, moon, nakshatra);

  return {
    full_name_hint: null,
    lagna_sign: lagna,
    moon_sign: moon,
    nakshatra,
    mind_number: mindNumber,
    home_number: homeNumber,
    purpose_number: purposeNumber,
    mars_house: marsHouse && marsHouse <= 12 ? marsHouse : null,
    chart_structure: chartStructure,
    visible_notes: buildOcrNotes(ocrText),
    confidence: estimateExtractionConfidence(lagna, moon, nakshatra, mindNumber, homeNumber, purposeNumber, chartStructure)
  };
}

function isWeakExtraction(extracted) {
  return scoreExtraction(extracted) < 3;
}

function scoreExtraction(extracted) {
  const values = [
    extracted.lagna_sign,
    extracted.moon_sign,
    extracted.nakshatra,
    extracted.mind_number,
    extracted.home_number,
    extracted.purpose_number
  ];

  return values.filter(Boolean).length + Math.min(4, Object.keys(extracted.chart_structure?.planets || {}).length);
}

function normalizeOcrText(text) {
  let normalized = text
    .toLowerCase()
    .replace(/[\r\t]+/g, " ")
    .replace(/[|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  INDIC_DIGIT_SETS.forEach(([sourceDigits, targetDigits]) => {
    sourceDigits.split("").forEach((digit, index) => {
      normalized = normalized.replaceAll(digit, targetDigits[index]);
    });
  });

  OCR_NORMALIZATION_MAP.forEach(([source, replacement]) => {
    normalized = normalized.replaceAll(source, replacement);
  });

  return normalized
    .replace(/\s+/g, " ")
    .trim();
}

function buildNormalizedOcrLines(text) {
  return String(text)
    .split(/\n+/)
    .map((line) => normalizeOcrText(line))
    .filter(Boolean);
}

function findValueNearLabels(text, labels, aliasesMap) {
  for (const label of labels) {
    const match = text.match(new RegExp(`${escapeRegExp(label)}[^a-z0-9]{0,8}([a-z\\s]{2,40})`, "i"));
    if (!match) {
      continue;
    }

    const slice = match[1];
    const value = findAliasInText(slice, aliasesMap);
    if (value) {
      return value;
    }
  }

  return findAliasInText(text, aliasesMap);
}

function findValueInDocument(lines, fullText, labels, aliasesMap) {
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!lineIncludesAnyLabel(line, labels)) {
      continue;
    }

    const localCandidates = buildDocumentWindow(lines, index);

    for (const candidate of localCandidates) {
      const value = findAliasInText(candidate, aliasesMap);
      if (value) {
        return value;
      }

      const stripped = extractValuePortion(candidate);
      const strippedValue = findAliasInText(stripped, aliasesMap);
      if (strippedValue) {
        return strippedValue;
      }
    }
  }

  return findValueNearLabels(fullText, labels, aliasesMap);
}

function buildDocumentWindow(lines, index) {
  const snippets = [];
  const current = lines[index] || "";
  const next = lines[index + 1] || "";
  const nextTwo = lines[index + 2] || "";
  const previous = lines[index - 1] || "";

  if (current) {
    snippets.push(current);
    snippets.push(extractValuePortion(current));
  }

  if (next) {
    snippets.push(next);
    snippets.push(`${current} ${next}`.trim());
  }

  if (nextTwo) {
    snippets.push(`${current} ${next} ${nextTwo}`.trim());
  }

  if (previous) {
    snippets.push(`${previous} ${current}`.trim());
  }

  return [...new Set(snippets.filter(Boolean))];
}

function lineIncludesAnyLabel(line, labels) {
  return labels.some((label) => line.includes(label));
}

function extractValuePortion(line) {
  const parts = line.split(/[:\-]/);
  return parts.length > 1 ? parts.slice(1).join(" ").trim() : line;
}

function findAliasInText(text, aliasesMap) {
  for (const [canonical, aliases] of Object.entries(aliasesMap)) {
    if (aliases.some((alias) => text.includes(alias))) {
      return canonical;
    }
  }

  return null;
}

function extractStandaloneNumbers(text) {
  return [...text.matchAll(/\b([1-9])\b/g)].map((match) => Number(match[1]));
}

function extractNumberNearLabels(text, labels, fallback) {
  for (const label of labels) {
    const match = text.match(new RegExp(`${escapeRegExp(label)}[^0-9]{0,10}([1-9])`, "i"));
    if (match) {
      return Number(match[1]);
    }
  }

  return Number.isFinite(fallback) ? fallback : null;
}

function extractNumberFromDocument(lines, fullText, labels, fallback) {
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!lineIncludesAnyLabel(line, labels)) {
      continue;
    }

    const localCandidates = buildDocumentWindow(lines, index);

    for (const candidate of localCandidates) {
      const direct = extractNumberNearLabels(candidate, labels, null);
      if (Number.isFinite(direct)) {
        return direct;
      }

      const stripped = extractValuePortion(candidate);
      const match = stripped.match(/\b([1-9])\b/);
      if (match) {
        return Number(match[1]);
      }
    }
  }

  return extractNumberNearLabels(fullText, labels, fallback);
}

function buildOcrNotes(text) {
  return text.trim().slice(0, 5000);
}

function extractChartStructure(lines, lagnaSign, moonSign, nakshatraName) {
  const planets = {};

  PLANET_KEYS.forEach((planet) => {
    const match = extractPlanetPlacement(lines, planet, lagnaSign);
    if (match) {
      planets[planet] = match;
    }
  });

  if (moonSign && !planets.Moon) {
    planets.Moon = { sign: moonSign, degree: null, house: lagnaSign ? deriveHouseFromSigns(lagnaSign, moonSign) : null };
  }

  const houses = extractHouseStructure(lines);
  const finalHouses = houses.length ? houses : buildHouseSignMap(lagnaSign);

  return {
    lagnaSign: lagnaSign || null,
    moonSign: moonSign || null,
    nakshatra: nakshatraName || null,
    houses: finalHouses,
    planets
  };
}

function extractPlanetPlacement(lines, planet, lagnaSign) {
  const aliases = PLANET_ALIASES[planet] || [planet.toLowerCase()];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!aliases.some((alias) => line.includes(alias))) {
      continue;
    }

    const candidate = buildDocumentWindow(lines, index).join(" ");
    const sign = findAliasInText(candidate, ZODIAC_ALIASES);
    const degreeMatch = candidate.match(/\b([0-2]?\d(?:\.\d+)?)\s*(?:deg|degree|°)?\b/);
    const houseMatch =
      candidate.match(/\b(?:house|bhava|bhav|in)\s*([1-9]|1[0-2])\b/) ||
      candidate.match(/\b([1-9]|1[0-2])\s*(?:house|bhava|bhav)\b/);

    if (sign || degreeMatch || houseMatch) {
      const derivedHouse = sign && lagnaSign ? deriveHouseFromSigns(lagnaSign, sign) : null;
      return {
        sign: sign || null,
        degree: degreeMatch ? Number(degreeMatch[1]) : null,
        house: houseMatch ? Number(houseMatch[1]) : derivedHouse
      };
    }
  }

  return null;
}

function buildHouseSignMap(lagnaSign) {
  if (!lagnaSign || !NAMES.zodiac.includes(lagnaSign)) {
    return [];
  }

  const lagnaIndex = NAMES.zodiac.indexOf(lagnaSign);
  return Array.from({ length: 12 }, (_, index) => ({
    house: index + 1,
    sign: NAMES.zodiac[positiveMod(lagnaIndex + index, 12)]
  }));
}

function extractHouseStructure(lines) {
  const houses = [];
  for (let house = 1; house <= 12; house += 1) {
    const match = findHouseSign(lines, house);
    if (match) {
      houses.push({ house, sign: match });
    }
  }
  return houses;
}

function findHouseSign(lines, houseNumber) {
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.match(new RegExp(`\\b(?:house|bhava|bhav)\\s*${houseNumber}\\b|\\b${houseNumber}\\s*(?:house|bhava|bhav)\\b`, "i"))) {
      continue;
    }

    const candidate = buildDocumentWindow(lines, index).join(" ");
    const sign = findAliasInText(candidate, ZODIAC_ALIASES);
    if (sign) {
      return sign;
    }
  }

  return null;
}

function deriveHouseFromSigns(lagnaSign, sign) {
  const lagnaIndex = NAMES.zodiac.indexOf(lagnaSign);
  const signIndex = NAMES.zodiac.indexOf(sign);
  if (lagnaIndex < 0 || signIndex < 0) {
    return null;
  }
  return positiveMod(signIndex - lagnaIndex, 12) + 1;
}

function estimateExtractionConfidence(lagna, moon, nakshatra, mind, home, purpose, chartStructure = null) {
  const values = [lagna, moon, nakshatra, mind, home, purpose];
  const found = values.filter(Boolean).length;
  const planetCount = chartStructure ? Object.keys(chartStructure.planets || {}).length : 0;
  return roundThree(Math.min(1, found / values.length + planetCount * 0.04));
}

function mapImageLanguageToOcrLanguage(language) {
  return OCR_LANGUAGE_CODES[language] || OCR_LANGUAGE_CODES.auto;
}

function applyExtractedChartValues(form, suffix, extracted) {
  let filledCount = 0;

  filledCount += assignSelectValue(
    form,
    `person${suffix}ChartLagna`,
    mapLabelToIndex(NAMES.zodiac, extracted.lagna_sign)
  );
  filledCount += assignSelectValue(
    form,
    `person${suffix}ChartMoon`,
    mapLabelToIndex(NAMES.zodiac, extracted.moon_sign)
  );
  filledCount += assignSelectValue(
    form,
    `person${suffix}ChartNakshatra`,
    mapLabelToIndex(NAMES.nakshatra, extracted.nakshatra)
  );
  filledCount += assignInputValue(form, `person${suffix}ChartMind`, extracted.mind_number);
  filledCount += assignInputValue(form, `person${suffix}ChartHome`, extracted.home_number);
  filledCount += assignInputValue(form, `person${suffix}ChartPurpose`, extracted.purpose_number);
  filledCount += assignInputValue(form, `person${suffix}ChartMarsHouse`, extracted.mars_house);
  assignInputValue(form, `person${suffix}ChartStructure`, JSON.stringify(extracted.chart_structure || {}));
  assignInputValue(form, `person${suffix}ChartConfidence`, extracted.confidence);
  filledCount += assignInputValue(form, `person${suffix}ChartNotes`, extracted.visible_notes);

  return filledCount;
}

function assignInputValue(form, name, value) {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  const field = form.elements.namedItem(name);
  if (!field) {
    return 0;
  }

  field.value = String(value);
  return 1;
}

function assignSelectValue(form, name, value) {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  const field = form.elements.namedItem(name);
  if (!field) {
    return 0;
  }

  field.value = String(value);
  return 1;
}

function mapLabelToIndex(list, label) {
  if (!label) {
    return null;
  }

  const index = list.indexOf(label);
  return index >= 0 ? index : null;
}

function setStatus(node, text, tone = "") {
  node.textContent = text;
  node.classList.remove("is-success", "is-error", "is-loading", "is-warning");

  if (tone) {
    node.classList.add(`is-${tone}`);
  }
}

function renderFilePreview(preview, file) {
  if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
    preview.classList.remove("is-empty");
    preview.innerHTML = `
      <div class="pdf-preview">
        <strong>PDF Ready</strong>
        <span>${escapeHtml(file.name)}</span>
        <span>The PDF will be sent through the free OCR flow when you auto-fill.</span>
      </div>
    `;
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    preview.classList.remove("is-empty");
    preview.innerHTML = "";

    const image = document.createElement("img");
    image.src = reader.result;
    image.alt = `${file.name} preview`;
    preview.appendChild(image);
  };
  reader.readAsDataURL(file);
}

function renderEmptyPreview(preview) {
  preview.classList.add("is-empty");
  preview.innerHTML = "<span>Upload a kundli image, screenshot, or PDF</span>";
}

function createEnhancedImageDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.max(2, Math.min(3, 1800 / Math.max(image.width, 1)));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));

        const context = canvas.getContext("2d", { willReadFrequently: true });
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const { data } = imageData;

        for (let index = 0; index < data.length; index += 4) {
          const red = data[index];
          const green = data[index + 1];
          const blue = data[index + 2];
          const luminance = 0.299 * red + 0.587 * green + 0.114 * blue;
          const boosted = luminance > 170 ? 255 : luminance < 115 ? 0 : 255;

          data[index] = boosted;
          data[index + 1] = boosted;
          data[index + 2] = boosted;
        }

        context.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      image.onerror = () => reject(new Error("Could not prepare the fallback image."));
      image.src = reader.result;
    };
    reader.onerror = () => reject(new Error("Could not read the uploaded image."));
    reader.readAsDataURL(file);
  });
}

function isSupportedChartFile(file) {
  return Boolean(
    file &&
      (file.type.startsWith("image/") ||
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf"))
  );
}

function getFileKind(file) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
    ? "PDF"
    : "image";
}

function collectInput(form, traditionMode, inputMode, pairOrder, resolvedPlaces) {
  const normalizedTraditionMode = normalizeTraditionMode(traditionMode);

  if (inputMode === "chart") {
    return {
      inputMode,
      traditionMode: normalizedTraditionMode,
      pairOrder,
      personA: collectChartPerson(form, "A"),
      personB: collectChartPerson(form, "B")
    };
  }

  return {
    inputMode,
    traditionMode: normalizedTraditionMode,
    pairOrder,
    personA: {
      name: getFieldValue(form, "personAName"),
      date: getFieldValue(form, "personADate"),
      time: getFieldValue(form, "personATime"),
      place: getFieldValue(form, "personAPlace"),
      rashi: getFieldValue(form, "personARashi"),
      nakshatraOverride: getFieldValue(form, "personANakshatra"),
      resolvedPlace: resolvedPlaces && resolvedPlaces.A
    },
    personB: {
      name: getFieldValue(form, "personBName"),
      date: getFieldValue(form, "personBDate"),
      time: getFieldValue(form, "personBTime"),
      place: getFieldValue(form, "personBPlace"),
      rashi: getFieldValue(form, "personBRashi"),
      nakshatraOverride: getFieldValue(form, "personBNakshatra"),
      resolvedPlace: resolvedPlaces && resolvedPlaces.B
    }
  };
}

function collectChartPerson(form, suffix) {
  return {
    name: getFieldValue(form, `person${suffix}ChartName`),
    lagna: getFieldValue(form, `person${suffix}ChartLagna`),
    moon: getFieldValue(form, `person${suffix}ChartMoon`),
    nakshatra: getFieldValue(form, `person${suffix}ChartNakshatra`),
    mind: getFieldValue(form, `person${suffix}ChartMind`),
    home: getFieldValue(form, `person${suffix}ChartHome`),
    purpose: getFieldValue(form, `person${suffix}ChartPurpose`),
    marsHouse: getFieldValue(form, `person${suffix}ChartMarsHouse`),
    chartStructure: getFieldValue(form, `person${suffix}ChartStructure`),
    chartConfidence: getFieldValue(form, `person${suffix}ChartConfidence`),
    notes: getFieldValue(form, `person${suffix}ChartNotes`)
  };
}

function getFieldValue(form, name) {
  const field = form.elements.namedItem(name);
  return field ? field.value.toString().trim() : "";
}

function calculateMatch(input) {
  const profileA =
    input.inputMode === "chart" ? buildChartProfile(input.personA) : buildBirthProfile(input.personA);
  const profileB =
    input.inputMode === "chart" ? buildChartProfile(input.personB) : buildBirthProfile(input.personB);
  const east = buildEastMatch(profileA, profileB, input.pairOrder);
  const odia = buildOdiaMatch(profileA, profileB, input.pairOrder);
  const south = buildSouthMatch(profileA, profileB, input.pairOrder);
  const tamil = buildTamilMatch(profileA, profileB, input.pairOrder);
  const kerala = buildKeralaMatch(profileA, profileB, input.pairOrder);
  const regionalEngines = {
    odia,
    east,
    south,
    tamil,
    kerala
  };
  const selected = pickSelectedTradition(input.traditionMode, regionalEngines);
  const comparisonTraditions = buildComparisonTraditions(input.traditionMode, regionalEngines);
  const middleHarmony = calculateMiddleHarmony(profileA.middleNumbers, profileB.middleNumbers);
  const riskAssessment = assessMatchRisks(input, profileA, profileB, selected, east);
  const positiveInsights = buildInsights(selected.breakdown, "positive");
  const cautionInsights = buildInsights(selected.breakdown, "caution");
  const regionalGap = roundOne(Math.abs(comparisonTraditions[0].total - comparisonTraditions[1].total));
  const finalScore = applyRiskPenalties(selected.total, riskAssessment.flags);
  const decision = buildDecisionSummary(finalScore);
  const priorityChecks = buildPriorityChecks(
    input.traditionMode,
    selected.breakdown,
    regionalGap,
    comparisonTraditions
  );
  const trustNotes = buildTrustNotes(input, profileA, profileB).concat(riskAssessment.notes);

  return {
    input,
    profileA,
    profileB,
    regionalEngines,
    east,
    south,
    selected,
    comparisonTraditions,
    rawScore: selected.total,
    finalScore,
    riskFlags: riskAssessment.flags,
    middleHarmony,
    regionalGap,
    decision,
    priorityChecks,
    trustNotes,
    positiveInsights,
    cautionInsights
  };
}

function buildBirthProfile(person) {
  const nameSum = sumChars(person.name);
  const placeSum = sumChars(person.place);
  const [year, month, day] = person.date.split("-").map(Number);
  const [hour, minute] = person.time.split(":").map(Number);
  const chart = calculateApproxBirthChart(person);
  const explicitRashiIndex = person.rashi !== "" ? Number(person.rashi) : null;
  const explicitNakshatraIndex =
    person.nakshatraOverride !== "" ? Number(person.nakshatraOverride) : null;
  const usesExplicitRashi = Number.isInteger(explicitRashiIndex);
  const usesExplicitNakshatra = Number.isInteger(explicitNakshatraIndex);
  const computedZodiacIndex = chart ? chart.moonSignIndex : positiveMod(day + month + (year % 100), 12);
  const computedNakshatraIndex = chart ? chart.nakshatraIndex : positiveMod(day * month + hour + minute, 27);
  const zodiacIndex = usesExplicitRashi ? explicitRashiIndex : computedZodiacIndex;
  const nakshatraIndex = usesExplicitNakshatra ? explicitNakshatraIndex : computedNakshatraIndex;
  const derivedMeta = deriveNakshatraMeta(nakshatraIndex, zodiacIndex);
  const computedMoonName = NAMES.zodiac[computedZodiacIndex];
  const computedNakshatraName = NAMES.nakshatra[computedNakshatraIndex];
  const matchingMoonName = NAMES.zodiac[zodiacIndex];
  const matchingNakshatraName = NAMES.nakshatra[nakshatraIndex];
  const middleNumbers = {
    mind: digitalRoot(day + hour + (nameSum % 9)),
    home: digitalRoot(month + minute + (placeSum % 9)),
    purpose: digitalRoot((year % 100) + day + ((nameSum + placeSum) % 9))
  };
  const lagnaName = chart ? NAMES.zodiac[chart.ascendantSignIndex] : null;
  const basisParts = [
    joinPresentParts([
      formatTranslatedValue("Lagna", lagnaName),
      formatTranslatedValue("Match Rashi", matchingMoonName),
      formatTranslatedValue("Match Nakshatra", matchingNakshatraName)
    ], " | ") || translateResultText("Moon basis inferred from birth details"),
    chart
      ? translateResultText(
        chart.engine === "astronomy-engine" ? "Ephemeris-backed planetary engine" : "Fallback planetary approximation"
      )
      : translateResultText("Chart engine unavailable"),
    usesExplicitRashi || usesExplicitNakshatra
      ? `${translateResultText("Traditional matching uses")} ${buildUserMoonBasisText(usesExplicitRashi ? matchingMoonName : null, usesExplicitNakshatra ? matchingNakshatraName : null)}`
      : `${translateResultText("Traditional matching uses")} ${joinPresentParts([
        formatTranslatedValue("calculated Rashi", computedMoonName),
        formatTranslatedValue("Nakshatra", computedNakshatraName)
      ], " | ")}`,
    usesExplicitRashi ? formatTranslatedValue("User-supplied Rashi", matchingMoonName) : null,
    usesExplicitNakshatra ? formatTranslatedValue("User-supplied Nakshatra", matchingNakshatraName) : null,
    chart && (usesExplicitRashi || usesExplicitNakshatra)
      ? `Calculated birth chart still uses ${person.date} ${person.time}, ${person.resolvedPlace ? person.resolvedPlace.displayName : person.place}`
      : null
  ].filter(Boolean);
  const marsHouse = chart && chart.planets.Mars ? chart.planets.Mars.house : null;
  const manglikStatus = getManglikStatus(marsHouse);
  const navamsa = chart ? buildNavamsaSnapshotFromChart(chart) : null;
  const dasha = chart && chart.planets.Moon && person.date
    ? buildApproxVimshottariSnapshot(chart.planets.Moon.longitude, person.date, person.time || "00:00", person.resolvedPlace ? person.resolvedPlace.timezone : null)
    : null;

  return {
    ...person,
    sourceMode: "birth",
    confidenceMode: chart && person.resolvedPlace ? "chart-grade" : "inferred",
    confidenceScore:
      chart && person.resolvedPlace
        ? chart.engine === "astronomy-engine"
          ? 0.93
          : 0.84
        : 0.45,
    nameSum,
    placeSum,
    lagnaIndex: chart ? chart.ascendantSignIndex : null,
    zodiacIndex,
    nakshatraIndex,
    ganaIndex: derivedMeta.ganaIndex,
    nadiIndex: derivedMeta.nadiIndex,
    yoniIndex: derivedMeta.yoniIndex,
    varnaIndex: derivedMeta.varnaIndex,
    vashyaIndex: derivedMeta.vashyaIndex,
    grahaIndex: derivedMeta.grahaIndex,
    lagnaName,
    zodiacName: NAMES.zodiac[zodiacIndex],
    nakshatraName: NAMES.nakshatra[nakshatraIndex],
    ganaName: derivedMeta.ganaName,
    nadiName: derivedMeta.nadiName,
    yoniName: derivedMeta.yoniName,
    varnaName: derivedMeta.varnaName,
    vashyaName: derivedMeta.vashyaName,
    signLord: derivedMeta.signLord,
    planets: chart ? chart.planets : {},
    houses: chart ? chart.houses : buildHouseSignMap(null),
    chartEngine: chart ? chart.engine : null,
    ascendantLongitude: chart ? chart.ascendantLongitude : null,
    moonLongitude: chart && chart.planets.Moon ? chart.planets.Moon.longitude : null,
    computedZodiacIndex,
    computedNakshatraIndex,
    computedZodiacName: computedMoonName,
    computedNakshatraName,
    usesUserMoonBasis: usesExplicitRashi || usesExplicitNakshatra,
    usesUserRashi: usesExplicitRashi,
    usesUserNakshatra: usesExplicitNakshatra,
    marsHouse,
    manglikStatus,
    navamsa,
    dasha,
    displayMeta: buildBirthDisplayMeta({
      lagnaName,
      zodiacName: matchingMoonName,
      nakshatraName: matchingNakshatraName,
      usesExplicitRashi,
      usesExplicitNakshatra,
      computedMoonName,
      computedNakshatraName,
      manglikStatus
    }),
    chartBasis: basisParts,
    middleNumbers
  };
}

function buildChartProfile(person) {
  const lagnaIndex = Number(person.lagna);
  const zodiacIndex = Number(person.moon);
  const nakshatraIndex = Number(person.nakshatra);
  const derivedMeta = deriveNakshatraMeta(nakshatraIndex, zodiacIndex);
  const parsedStructure = parseChartStructure(person.chartStructure);
  const houses = parsedStructure.houses && parsedStructure.houses.length
    ? parsedStructure.houses
    : buildHouseSignMap(NAMES.zodiac[lagnaIndex] || null);
  const planets = normalizeChartPlanets(parsedStructure.planets, NAMES.zodiac[lagnaIndex] || null);
  const marsHouse = normalizeHouseNumber(person.marsHouse) || (planets.Mars ? planets.Mars.house : null);
  const manglikStatus = getManglikStatus(marsHouse);
  const lagnaName = NAMES.zodiac[lagnaIndex] || null;
  const zodiacName = NAMES.zodiac[zodiacIndex] || null;
  const nakshatraName = NAMES.nakshatra[nakshatraIndex] || null;
  const displayMeta = joinPresentParts([
    formatTranslatedValue("Lagna", lagnaName),
    formatTranslatedValue("Moon", zodiacName),
    translateResultText(manglikStatus)
  ], " | ");
  const chartBasis = [
    formatTranslatedValue("Lagna", lagnaName),
    formatTranslatedValue("Moon", zodiacName),
    formatTranslatedValue("Nakshatra", nakshatraName),
    translateResultText("Chart values used directly"),
    parsedStructure.houses && parsedStructure.houses.length
      ? `${parsedStructure.houses.length} ${translateResultText("Houses")}`
      : translateResultText("Houses derived from Lagna"),
    Object.keys(planets).length ? `${Object.keys(planets).length} ${translateResultText("planets parsed")}` : null,
    !normalizeHouseNumber(person.marsHouse) && planets.Mars ? translateResultText("Mars house derived from Mars placement") : null,
    translateResultText(manglikStatus)
  ].filter(Boolean);
  const navamsa = buildNavamsaSnapshotFromChart({
    ascendantLongitude: parsedStructure.ascendantLongitude || null,
    planets
  });
  const ocrStructureLevel =
    parsedStructure.houses && parsedStructure.houses.length
      ? "parsed-structure"
      : Object.keys(planets).length
        ? "partial-structure"
        : "minimal-structure";

  return {
    ...person,
    sourceMode: "chart",
    confidenceMode: "chart-grade",
    confidenceScore: clamp(Number(person.chartConfidence) || 0.76, 0.3, 0.98),
    nameSum: sumChars(person.name),
    placeSum: sumChars(person.notes || ""),
    lagnaIndex,
    zodiacIndex,
    nakshatraIndex,
    ganaIndex: derivedMeta.ganaIndex,
    nadiIndex: derivedMeta.nadiIndex,
    yoniIndex: derivedMeta.yoniIndex,
    varnaIndex: derivedMeta.varnaIndex,
    vashyaIndex: derivedMeta.vashyaIndex,
    grahaIndex: derivedMeta.grahaIndex,
    lagnaName,
    zodiacName,
    nakshatraName,
    ganaName: derivedMeta.ganaName,
    nadiName: derivedMeta.nadiName,
    yoniName: derivedMeta.yoniName,
    varnaName: derivedMeta.varnaName,
    vashyaName: derivedMeta.vashyaName,
    signLord: derivedMeta.signLord,
    planets,
    houses,
    marsHouse,
    manglikStatus,
    navamsa,
    dasha: null,
    structureLevel: ocrStructureLevel,
    displayMeta,
    chartBasis,
    middleNumbers: {
      mind: normalizeMiddleNumber(person.mind),
      home: normalizeMiddleNumber(person.home),
      purpose: normalizeMiddleNumber(person.purpose)
    }
  };
}

function formatLabeledValue(label, value) {
  if (!value) {
    return "";
  }

  return `${label} ${value}`;
}

function formatTranslatedValue(label, value) {
  return formatLabeledValue(translateResultText(label), value);
}

function joinPresentParts(parts, separator = " | ") {
  return (parts || []).filter((part) => typeof part === "string" && part.trim()).join(separator);
}

function buildBirthDisplayMeta({
  lagnaName,
  zodiacName,
  nakshatraName,
  usesExplicitRashi,
  usesExplicitNakshatra,
  computedMoonName,
  computedNakshatraName,
  manglikStatus
}) {
  const suppliedParts = [];

  if (usesExplicitRashi) {
    suppliedParts.push(formatTranslatedValue("Rashi", zodiacName));
  }
  if (usesExplicitNakshatra) {
    suppliedParts.push(formatTranslatedValue("Nakshatra", nakshatraName));
  }

  const basisLine = suppliedParts.length
    ? `${translateResultText("Match basis")}: ${suppliedParts.join(" | ")}`
    : `${translateResultText("Match basis")}: ${joinPresentParts([
      formatTranslatedValue("calculated Rashi", computedMoonName),
      formatTranslatedValue("Nakshatra", computedNakshatraName)
    ], " | ")}`;

  return joinPresentParts([formatTranslatedValue("Lagna", lagnaName), basisLine, translateResultText(manglikStatus)], " | ");
}

function buildUserMoonBasisText(rashiName, nakshatraName) {
  return [
    rashiName ? formatTranslatedValue("Rashi", rashiName) : null,
    nakshatraName ? formatTranslatedValue("Nakshatra", nakshatraName) : null
  ]
    .filter(Boolean)
    .join(" | ");
}

function buildEastMatch(profileA, profileB, pairOrder) {
  const middleHarmony = calculateMiddleHarmony(profileA.middleNumbers, profileB.middleNumbers);
  const roles = pickTraditionalRoles(profileA, profileB, pairOrder);
  const ashta = calculateAshtakoota(roles.groom, roles.bride);

  const breakdown = [
    createLineItem("Varna", 1, ashta.varna / 1, "Traditional values and social expectations are easy to align.", "Value expectations may not move in the same direction without deliberate adjustment."),
    createLineItem("Vashya", 2, ashta.vashya / 2, "The relationship shows cooperative give-and-take.", "One person may feel harder to influence or emotionally reach."),
    createLineItem("Tara", 3, ashta.tara / 3, "The nakshatra rhythm supports day-to-day steadiness.", "Timing, health rhythm, or mood flow may need extra care."),
    createLineItem("Yoni", 4, ashta.yoni / 4, "Warmth and private comfort have a workable base.", "Chemistry may need patience and better emotional pacing."),
    createLineItem("Graha Maitri", 5, ashta.grahaMaitri / 5, "Moon-sign lords show good mental compatibility.", "Temperament and decision styles may clash more easily."),
    createLineItem("Gana", 6, ashta.gana / 6, "Basic temperament balance looks manageable.", "Natural reaction styles may feel quite different."),
    createLineItem("Bhakoot", 7, ashta.bhakoot / 7, "Long-term family direction looks mostly supportive.", "The moon-sign relationship can create pressure around finances, health, or family planning."),
    createLineItem("Nadi", 8, ashta.nadi / 8, "Energy flow and family rhythm do not strongly repeat each other.", "Classic Nadi concern is present, so this should not be ignored.")
  ];

  return {
    mode: "east",
    label: "Ashtakoota",
    total: sumScore(breakdown),
    note: "This Ashtakoota / Guna Milan view uses Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi.",
    highlight: ashta.total >= 27 && middleHarmony >= 0.68,
    breakdown
  };
}

function buildOdiaMatch(profileA, profileB, pairOrder) {
  const roles = pickTraditionalRoles(profileA, profileB, pairOrder);
  const ashta = calculateAshtakoota(roles.groom, roles.bride);
  const rajju = calculateRajjuScore(profileA, profileB);
  const kuja = calculateKujaMatchScore(profileA, profileB);
  const rashi = calculateOdiaRashiScore(profileA, profileB);

  const breakdown = [
    createLineItem("Varna", 1, ashta.varna / 1, "Values and respect style are easier to align in this pair.", "Value expectations may not align smoothly without conscious adjustment."),
    createLineItem("Vashya", 2, ashta.vashya / 2, "The charts show workable mutual influence and adjustment.", "Mutual responsiveness may feel uneven in daily life."),
    createLineItem("Tara", 3, ashta.tara / 3, "Star rhythm shows support for timing and day-to-day steadiness.", "Timing, mood rhythm, or day-to-day flow may need more care."),
    createLineItem("Yoni", 4, ashta.yoni / 4, "Private comfort and instinctive attraction have a useful base.", "Closeness may need patience, trust, and better emotional pacing."),
    createLineItem("Graha Maitri", 4, ashta.grahaMaitri / 5, "Rashi lords show helpful mental support and easier understanding.", "Mental agreement may take more patience because the ruling planets are not strongly aligned."),
    createLineItem("Gana", 4, ashta.gana / 6, "Temperament balance looks workable for daily married life.", "Reaction style and temperament may create friction if both sides stay rigid."),
    createLineItem("Rashi", 6, rashi / 6, "Moon-sign relationship gives practical support to family direction and household life.", "Moon-sign relationship raises traditional caution around family direction and long-term comfort."),
    createLineItem("Nadi", 6, ashta.nadi / 8, "Nadi does not add a major traditional block here.", "Nadi remains a serious traditional caution in this pairing."),
    createLineItem("Rajju", 3, rajju / 5, "Rajju does not show a major block in this match.", "Rajju shows a traditional stability caution and deserves a serious review."),
    createLineItem("Kuja", 3, kuja / 3, "Mars placement balance looks manageable for marriage timing.", "Kuja / Manglik balance is uneven here, so marriage timing and conflict heat need more care.")
  ];

  return {
    mode: "odia",
    label: "Odia Dashamelaka",
    total: sumScore(breakdown),
    note: "This Odisha view uses a Dashamelaka-style reading built from moon-sign matching, Rajju, and Kuja checks.",
    highlight: ashta.nadi > 0 && rajju > 0 && kuja >= 2 && sumScore(breakdown) >= 24,
    breakdown
  };
}

function buildSouthMatch(profileA, profileB, pairOrder) {
  const roles = pickTraditionalRoles(profileA, profileB, pairOrder);
  const porutham = calculatePorutham(profileA, profileB, roles);
  const rasiAdhipathi = calculateRasiAdhipathiScore(profileA, profileB, 4);

  const breakdown = [
    createLineItem("Dina", 4, porutham.dina / 4, "Daily rhythm and star harmony look supportive.", "Daily rhythm and timing may need more conscious effort."),
    createLineItem("Gana", 4, porutham.gana / 4, "Temperament balance looks workable.", "Reaction styles can create friction if both sides are inflexible."),
    createLineItem("Mahendra", 3, porutham.mahendra / 3, "Growth and continuity signs look positive.", "The combination is not especially strong for steady growth."),
    createLineItem("Deergha", 4, porutham.deergha / 4, "The pairing has room for long-term settling.", "Long-term steadiness may take more time to build."),
    createLineItem("Yoni", 4, porutham.yoni / 4, "Comfort and closeness show practical support.", "Private comfort may grow slowly or feel uneven."),
    createLineItem("Rasi", 4, porutham.rasi / 4, "Moon-sign relationship is broadly workable.", "Moon-sign distance raises practical caution in this pairing."),
    createLineItem("Rasi Adhipathi", 4, rasiAdhipathi / 4, "Moon-sign lords relate well, so mental agreement looks easier.", "Moon-sign lords are not strongly aligned, so decisions may need more patience."),
    createLineItem("Rajju", 5, porutham.rajju / 5, "Rajju does not show a major block here.", "Rajju caution is visible and deserves a serious look."),
    createLineItem("Vedha", 2, porutham.vedha / 3, "There are fewer traditional obstructions in the star pair.", "The star pair carries a classic Vedha-type caution."),
    createLineItem("Vasya", 2, porutham.vasya / 3, "Mutual responsiveness feels manageable.", "The relationship may feel less naturally responsive.")
  ];

  return {
    mode: "south",
    label: "South Porutham",
    total: sumScore(breakdown),
    note: "This South Porutham view uses Dina, Gana, Mahendra, Deergha, Yoni, Rasi, Rasi Adhipathi, Rajju, Vedha, and Vasya.",
    highlight: porutham.rajju >= 5 && porutham.dina >= 4 && sumScore(breakdown) >= 24,
    breakdown
  };
}

function buildTamilMatch(profileA, profileB, pairOrder) {
  const roles = pickTraditionalRoles(profileA, profileB, pairOrder);
  const porutham = calculatePorutham(profileA, profileB, roles);
  const rasiAdhipathi = calculateRasiAdhipathiScore(profileA, profileB, 5);
  const breakdown = [
    createLineItem("Dina", 5, porutham.dina / 4, "Daily rhythm and star harmony look strongly supportive.", "Daily rhythm and timing may need more conscious effort."),
    createLineItem("Gana", 3, porutham.gana / 4, "Temperament balance looks workable.", "Reaction styles can create friction if both sides are inflexible."),
    createLineItem("Mahendra", 3, porutham.mahendra / 3, "Growth and continuity signs look positive.", "The combination is not especially strong for steady growth."),
    createLineItem("Deergha", 3, porutham.deergha / 4, "The pairing has room for long-term settling.", "Long-term steadiness may take more time to build."),
    createLineItem("Yoni", 3, porutham.yoni / 4, "Comfort and closeness show practical support.", "Private comfort may grow slowly or feel uneven."),
    createLineItem("Rasi", 4, porutham.rasi / 4, "Moon-sign relationship is broadly workable.", "Moon-sign distance raises practical caution in this pairing."),
    createLineItem("Rasi Adhipathi", 5, rasiAdhipathi / 5, "Moon-sign lords relate well, so mental agreement looks easier.", "Moon-sign lords are not strongly aligned, so decisions may need more patience."),
    createLineItem("Rajju", 6, porutham.rajju / 5, "Rajju does not show a major block here.", "Rajju caution is visible and deserves a serious look."),
    createLineItem("Vedha", 2, porutham.vedha / 3, "There are fewer traditional obstructions in the star pair.", "The star pair carries a classic Vedha-type caution."),
    createLineItem("Vasya", 2, porutham.vasya / 3, "Mutual responsiveness feels manageable.", "The relationship may feel less naturally responsive.")
  ];

  return {
    mode: "tamil",
    label: "Tamil Porutham",
    total: sumScore(breakdown),
    note: "This Tamil Porutham view gives stronger space to Dina, Rajju, Rasi, and Rasi Adhipathi while still reading the full porutham set.",
    highlight: porutham.rajju >= 5 && porutham.dina >= 4 && sumScore(breakdown) >= 24,
    breakdown
  };
}

function buildKeralaMatch(profileA, profileB, pairOrder) {
  const roles = pickTraditionalRoles(profileA, profileB, pairOrder);
  const porutham = calculatePorutham(profileA, profileB, roles);
  const rasiAdhipathi = calculateRasiAdhipathiScore(profileA, profileB, 4);
  const breakdown = [
    createLineItem("Dina", 3, porutham.dina / 4, "Daily rhythm and star harmony look supportive.", "Daily rhythm and timing may need more conscious effort."),
    createLineItem("Gana", 3, porutham.gana / 4, "Temperament balance looks workable.", "Reaction styles can create friction if both sides are inflexible."),
    createLineItem("Mahendra", 4, porutham.mahendra / 3, "Growth and continuity signs look positive.", "The combination is not especially strong for steady growth."),
    createLineItem("Deergha", 5, porutham.deergha / 4, "The pairing has room for long-term settling.", "Long-term steadiness may take more time to build."),
    createLineItem("Yoni", 3, porutham.yoni / 4, "Comfort and closeness show practical support.", "Private comfort may grow slowly or feel uneven."),
    createLineItem("Rasi", 4, porutham.rasi / 4, "Moon-sign relationship is broadly workable.", "Moon-sign distance raises practical caution in this pairing."),
    createLineItem("Rasi Adhipathi", 4, rasiAdhipathi / 4, "Moon-sign lords relate well, so mental agreement looks easier.", "Moon-sign lords are not strongly aligned, so decisions may need more patience."),
    createLineItem("Rajju", 6, porutham.rajju / 5, "Rajju does not show a major block here.", "Rajju caution is visible and deserves a serious look."),
    createLineItem("Vedha", 2, porutham.vedha / 3, "There are fewer traditional obstructions in the star pair.", "The star pair carries a classic Vedha-type caution."),
    createLineItem("Vasya", 2, porutham.vasya / 3, "Mutual responsiveness feels manageable.", "The relationship may feel less naturally responsive.")
  ];

  return {
    mode: "kerala",
    label: "Kerala Porutham",
    total: sumScore(breakdown),
    note: "This Kerala Porutham view gives stronger space to Rajju, Deergha, and Mahendra while still reading the full porutham set.",
    highlight: porutham.rajju >= 5 && porutham.deergha >= 4 && sumScore(breakdown) >= 24,
    breakdown
  };
}

function calculateAshtakoota(groom, bride) {
  const varna = calculateVarnaScore(groom, bride);
  const vashya = calculateVashyaScore(groom, bride);
  const tara = calculateTaraScore(groom, bride);
  const yoni = calculateYoniScore(groom, bride);
  const grahaMaitri = calculateGrahaMaitriScore(groom, bride);
  const gana = calculateGanaScore(groom, bride);
  const bhakoot = calculateBhakootScore(groom, bride);
  const nadi = calculateNadiScore(groom, bride);

  return {
    varna,
    vashya,
    tara,
    yoni,
    grahaMaitri,
    gana,
    bhakoot,
    nadi,
    total: roundOne(varna + vashya + tara + yoni + grahaMaitri + gana + bhakoot + nadi)
  };
}

function calculatePorutham(profileA, profileB, roles) {
  const zodiacGap = zodiacRelation(profileA.zodiacIndex, profileB.zodiacIndex);
  const nakshatraGap = positiveMod(profileB.nakshatraIndex - profileA.nakshatraIndex, 27);
  const dina = taraGroupScore(profileA.nakshatraIndex, profileB.nakshatraIndex) ? 4 : 0;
  const gana = Math.round((calculateGanaScore(roles.groom, roles.bride) / 6) * 4 * 10) / 10;
  const mahendra = [3, 6, 9, 12, 15, 18, 21, 24].includes(nakshatraGap) ? 3 : 0;
  const deergha = nakshatraGap >= 13 ? 4 : nakshatraGap >= 7 ? 2 : 0;
  const yoni = Math.round((calculateYoniScore(roles.groom, roles.bride) / 4) * 4 * 10) / 10;
  const rasi = isBhakootGood(zodiacGap) ? 4 : 0;
  const rajju = calculateRajjuScore(profileA, profileB);
  const vedha = hasVedha(profileA.nakshatraIndex, profileB.nakshatraIndex) ? 0 : 3;
  const vasya = Math.round((calculateVashyaScore(roles.groom, roles.bride) / 2) * 3 * 10) / 10;
  const nadi = calculateNadiScore(roles.groom, roles.bride) > 0 ? 2 : 0;

  return {
    dina,
    gana,
    mahendra,
    deergha,
    yoni,
    rasi,
    rajju,
    vedha,
    vasya,
    nadi,
    total: roundOne(dina + gana + mahendra + deergha + yoni + rasi + rajju + vedha + vasya + nadi)
  };
}

function calculateOdiaRashiScore(profileA, profileB) {
  const relation = zodiacRelation(profileA.zodiacIndex, profileB.zodiacIndex);

  if (isBhakootGood(relation)) {
    return 6;
  }

  if ([3, 4, 7, 10, 11].includes(relation)) {
    return 3;
  }

  return 0;
}

function calculateKujaMatchScore(profileA, profileB) {
  const marsHouseA = normalizeHouseNumber(profileA.marsHouse);
  const marsHouseB = normalizeHouseNumber(profileB.marsHouse);

  if (!marsHouseA || !marsHouseB) {
    return 1.5;
  }

  const hasKujaA = KUJA_HOUSES.has(marsHouseA);
  const hasKujaB = KUJA_HOUSES.has(marsHouseB);

  if (hasKujaA === hasKujaB) {
    return 3;
  }

  return 0.8;
}

function pickTraditionalRoles(profileA, profileB, pairOrder) {
  return pairOrder === "a-bride"
    ? { groom: profileB, bride: profileA }
    : { groom: profileA, bride: profileB };
}

function calculateVarnaScore(groom, bride) {
  return getVarnaRank(groom.varnaName) >= getVarnaRank(bride.varnaName) ? 1 : 0;
}

function calculateVashyaScore(groom, bride) {
  const first = groom.vashyaName;
  const second = bride.vashyaName;
  if (first === second) {
    return 2;
  }

  const pair = buildPairKey(first, second);
  if ([buildPairKey("Chatushpada", "Vanachara"), buildPairKey("Jalachara", "Keeta")].includes(pair)) {
    return 1.5;
  }
  if ([buildPairKey("Chatushpada", "Manava"), buildPairKey("Manava", "Jalachara")].includes(pair)) {
    return 1;
  }
  return 0;
}

function calculateTaraScore(groom, bride) {
  const forward = taraGroupScore(bride.nakshatraIndex, groom.nakshatraIndex) ? 1.5 : 0;
  const backward = taraGroupScore(groom.nakshatraIndex, bride.nakshatraIndex) ? 1.5 : 0;
  return forward + backward;
}

function taraGroupScore(fromIndex, toIndex) {
  const distance = positiveMod(toIndex - fromIndex, 27) + 1;
  const tara = positiveMod(distance, 9);
  return [0, 2, 4, 6, 8].includes(tara);
}

function calculateYoniScore(groom, bride) {
  const pair = buildPairKey(groom.yoniName, bride.yoniName);
  if (groom.yoniName === bride.yoniName) {
    return 4;
  }
  if (YONI_ENEMIES.has(pair)) {
    return 0;
  }
  if (YONI_FRIENDS.has(pair)) {
    return 3;
  }
  return 1;
}

function calculateGrahaMaitriScore(groom, bride) {
  const relationA = getLordRelationship(groom.signLord, bride.signLord);
  const relationB = getLordRelationship(bride.signLord, groom.signLord);
  const normalized = (relationA + relationB) / 2;
  return roundOne(normalized * 5);
}

function calculateGanaScore(groom, bride) {
  const matrix = {
    Deva: { Deva: 6, Manushya: 5, Rakshasa: 1 },
    Manushya: { Deva: 5, Manushya: 6, Rakshasa: 0.5 },
    Rakshasa: { Deva: 1, Manushya: 0.5, Rakshasa: 6 }
  };
  return matrix[groom.ganaName][bride.ganaName];
}

function calculateBhakootScore(groom, bride) {
  const relation = zodiacRelation(groom.zodiacIndex, bride.zodiacIndex);
  if (isBhakootGood(relation)) {
    return 7;
  }

  return 0;
}

function calculateNadiScore(groom, bride) {
  return groom.nadiName === bride.nadiName ? 0 : 8;
}

function calculateRajjuScore(profileA, profileB) {
  return getRajjuGroup(profileA.nakshatraIndex) === getRajjuGroup(profileB.nakshatraIndex) ? 0 : 5;
}

function hasVedha(firstNakshatra, secondNakshatra) {
  const pair = buildPairKey(String(firstNakshatra), String(secondNakshatra));
  const vedhaPairs = new Set([
    buildPairKey("0", "17"),
    buildPairKey("1", "16"),
    buildPairKey("2", "15"),
    buildPairKey("3", "14"),
    buildPairKey("4", "13"),
    buildPairKey("5", "12"),
    buildPairKey("6", "11"),
    buildPairKey("7", "10"),
    buildPairKey("8", "24"),
    buildPairKey("9", "23"),
    buildPairKey("18", "26"),
    buildPairKey("19", "25"),
    buildPairKey("20", "22")
  ]);
  return vedhaPairs.has(pair);
}

function zodiacRelation(firstIndex, secondIndex) {
  return positiveMod(secondIndex - firstIndex, 12) + 1;
}

function isBhakootGood(relation) {
  return ![2, 6, 8, 12, 5, 9].includes(relation);
}

function getVarnaRank(name) {
  return VARNA_ORDER.indexOf(name);
}

function getLordRelationship(lord, otherLord) {
  if (lord === otherLord) {
    return 1;
  }

  const relation = LORD_RELATIONS[lord];
  if (relation.friends.includes(otherLord)) {
    return 1;
  }
  if (relation.neutral.includes(otherLord)) {
    return 0.5;
  }
  return 0;
}

function areSignLordsFriendly(firstLord, secondLord) {
  return getLordRelationship(firstLord, secondLord) >= 0.65 && getLordRelationship(secondLord, firstLord) >= 0.65;
}

function calculateRasiAdhipathiScore(profileA, profileB, maxScore) {
  const forward = getLordRelationship(profileA.signLord, profileB.signLord);
  const backward = getLordRelationship(profileB.signLord, profileA.signLord);
  const average = (forward + backward) / 2;

  if (average >= 0.95) {
    return maxScore;
  }
  if (average >= 0.8) {
    return roundOne(maxScore * 0.85);
  }
  if (average >= 0.65) {
    return roundOne(maxScore * 0.65);
  }
  if (average >= 0.4) {
    return roundOne(maxScore * 0.35);
  }
  return 0;
}

function deriveNakshatraMeta(nakshatraIndex, zodiacIndex) {
  const ganaName = NAKSHATRA_GANA[nakshatraIndex] || "Manushya";
  const nadiName = NAMES.nadi[positiveMod(nakshatraIndex, 3)];
  const yoniName = NAKSHATRA_YONI[nakshatraIndex] || "Gau";
  const varnaName = SIGN_VARNA[zodiacIndex] || "Shudra";
  const vashyaName = SIGN_VASHYA[zodiacIndex] || "Manava";
  const signLord = SIGN_LORDS[zodiacIndex] || "Moon";

  return {
    ganaIndex: NAMES.gana.indexOf(ganaName),
    nadiIndex: NAMES.nadi.indexOf(nadiName),
    yoniIndex: NAMES.yoni.indexOf(yoniName),
    varnaIndex: getVarnaRank(varnaName),
    vashyaIndex: ["Chatushpada", "Manava", "Jalachara", "Vanachara", "Keeta"].indexOf(vashyaName),
    grahaIndex: ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"].indexOf(signLord),
    ganaName,
    nadiName,
    yoniName,
    varnaName,
    vashyaName,
    signLord
  };
}

function getRajjuGroup(nakshatraIndex) {
  const groups = ["Pada", "Kati", "Nabhi", "Kantha", "Siro"];
  return groups[positiveMod(nakshatraIndex, 5)];
}

function normalizeHouseNumber(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 1 || numeric > 12) {
    return null;
  }
  return Math.round(numeric);
}

function getManglikStatus(marsHouse) {
  if (!marsHouse) {
    return "Kuja dosha not checked";
  }
  return KUJA_HOUSES.has(marsHouse)
    ? `Kuja dosha watch from house ${marsHouse}`
    : `No strong Kuja dosha signal from house ${marsHouse}`;
}

function buildTrustNotes(input, profileA, profileB) {
  const notes = [];
  const roleLabels = getRoleDetailLabels(input);
  const traditionConfig = getTraditionConfig(input.traditionMode);
  const selectedStateLabel = traditionConfig.label || getLocalizedTraditionLabel(input.traditionMode);

  [profileA, profileB].forEach((profile, index) => {
    const label = index === 0 ? roleLabels.personA : roleLabels.personB;
    if (profile.sourceMode === "birth" && profile.confidenceMode !== "chart-grade") {
      notes.push(`${label}: birthplace or timezone could not be resolved exactly, so the moon sign and nakshatra are lower-confidence.`);
    }
    if (profile.sourceMode === "birth" && profile.usesUserMoonBasis) {
      notes.push(
        `${label}: traditional matching is using ${buildUserMoonBasisText(
          profile.usesUserRashi ? profile.zodiacName : null,
          profile.usesUserNakshatra ? profile.nakshatraName : null
        )}, while Lagna, planets, houses, and Kuja review still come from date, time, and place.`
      );
    }
    if (profile.sourceMode === "chart" && !profile.marsHouse) {
      notes.push(`${label}: Mars house was not provided, so Kuja dosha could not be checked properly.`);
    }
    if (profile.sourceMode === "chart" && profile.structureLevel === "minimal-structure") {
      notes.push(`${label}: chart mode is using the entered Lagna, Moon, and Nakshatra directly, but houses and planet-level readings are still limited because OCR structure was weak.`);
    } else if (profile.sourceMode === "chart" && profile.structureLevel === "partial-structure") {
      notes.push(`${label}: chart mode is using the entered Lagna, Moon, and Nakshatra directly, and some houses or planets were derived from OCR structure.`);
    }
    if (profile.sourceMode === "chart" && Object.keys(profile.planets || {}).length < 3) {
      notes.push(`${label}: OCR could not read much of the chart structure, so planet-level interpretation is limited.`);
    }
    if (profile.sourceMode === "chart" && profile.confidenceScore < 0.55) {
      notes.push(`${label}: OCR confidence is weak, so review the chart values manually before trusting the match score.`);
    }
  });

  if (input.inputMode === "chart") {
    notes.push("Chart mode uses the entered or OCR-filled Lagna, Moon sign, and Nakshatra directly for matching, while houses, planets, and Kuja review use parsed chart structure where available.");
  } else {
    const usesEphemeris = [profileA, profileB].some((profile) =>
      (profile.chartBasis || []).some((part) => part.includes("Ephemeris-backed"))
    );
    notes.push(
      usesEphemeris
        ? "Birth mode uses date, time, and place to build the chart, and any entered Rashi or Nakshatra is applied directly to the traditional moon-based matching checks."
        : "Birth mode uses date, time, and place with a fallback sidereal chart approximation, and any entered Rashi or Nakshatra is still applied directly to the traditional moon-based matching checks."
    );
  }

  if (normalizeTraditionMode(input.traditionMode) !== "compare") {
    if (traditionConfig.hint) {
      notes.push(`${selectedStateLabel}: ${traditionConfig.hint}`);
    }
  }

  if (getTraditionFamily(input.traditionMode) === "odia") {
    notes.push("Odisha mode is using a Dashamelaka-style reading from the current chart engine, including moon-sign factors, Rajju, and Kuja checks.");
  }

  return notes;
}

function assessMatchRisks(input, profileA, profileB, selected, east) {
  const flags = [];
  const notes = [];
  const family = getTraditionFamily(input.traditionMode);
  const selectedBreakdown = selected.breakdown || [];
  const eastBreakdown = east.breakdown || [];

  const eastNadi = findItem(eastBreakdown, "Nadi");
  const eastBhakoot = findItem(eastBreakdown, "Bhakoot");
  const selectedRashi = findItem(selectedBreakdown, "Rashi");
  const selectedRajju = findItem(selectedBreakdown, "Rajju");
  const selectedKuja = findItem(selectedBreakdown, "Kuja");
  const lowConfidenceProfiles = [profileA, profileB].filter((profile) => profile.confidenceScore < 0.6);

  if (eastNadi && eastNadi.score === 0) {
    flags.push({ key: "nadi", penalty: family === "east" || family === "odia" ? 5 : 3 });
    notes.push("Nadi is failing in the moon-sign matching layer, so the final score has been reduced for this red-flag condition.");
  }

  if ((family === "east" && eastBhakoot && eastBhakoot.score === 0) || (family === "odia" && selectedRashi && selectedRashi.score === 0)) {
    flags.push({ key: "bhakoot", penalty: 3 });
    notes.push(family === "odia"
      ? "Rashi matching is failing in the Odisha Dashamelaka layer, so the final score has been reduced for long-term compatibility risk."
      : "Bhakoot is failing in the Ashtakoota layer, so the final score has been reduced for long-term compatibility risk.");
  }

  if (selectedRajju && selectedRajju.score === 0) {
    flags.push({ key: "rajju", penalty: 4 });
    notes.push("Rajju is failing in the selected matching layer, so the final score has been reduced for a traditional marriage-stability warning.");
  }

  if (selectedKuja && selectedKuja.normalized < 0.35) {
    flags.push({ key: "kuja", penalty: 2 });
    notes.push("Kuja / Manglik balance is weak in the selected matching layer, so the final score has been reduced for traditional Mars-placement caution.");
  }

  if (lowConfidenceProfiles.length) {
    flags.push({ key: "confidence", penalty: 2 });
    notes.push("One or more inputs are low-confidence, so the final score has been reduced slightly until the chart data is verified.");
  }

  return { flags, notes };
}

function applyRiskPenalties(score, flags = []) {
  const totalPenalty = flags.reduce((sum, flag) => sum + (flag.penalty || 0), 0);
  return roundOne(clamp(score - totalPenalty, 0, 36));
}

function calculateApproxBirthChart(person) {
  const ephemerisChart = calculateBirthChartWithEphemeris(person);
  if (ephemerisChart) {
    return ephemerisChart;
  }

  const astronomy = calculateApproxBirthAstronomy(person);
  if (!astronomy) {
    return null;
  }

  const ascendantLongitude = calculateAscendantLongitude(
    astronomy.julianDay,
    person.resolvedPlace.latitude,
    person.resolvedPlace.longitude
  );
  const ascendantSignIndex = Math.floor(ascendantLongitude / 30);
  const houses = Array.from({ length: 12 }, (_, index) => ({
    house: index + 1,
    sign: NAMES.zodiac[Math.floor(normalizeDegrees(ascendantLongitude + index * 30) / 30)],
    cusp: roundOne(normalizeDegrees(ascendantLongitude + index * 30))
  }));

  const planets = buildApproxPlanetSet(astronomy.julianDay, ascendantLongitude, astronomy.siderealMoonLongitude);

  return {
    astronomy,
    engine: "fallback-approximation",
    ascendantLongitude,
    ascendantSignIndex,
    moonSignIndex: astronomy.moonSignIndex,
    nakshatraIndex: astronomy.nakshatraIndex,
    houses,
    planets
  };
}

function calculateBirthChartWithEphemeris(person) {
  if (!hasAstronomyEngine() || !person.resolvedPlace || !person.date || !person.time) {
    return null;
  }

  try {
    const utcDate = zonedLocalToUtc(person.date, person.time, person.resolvedPlace.timezone);
    const julianDay = utcToJulianDay(utcDate);
    const time = new Astronomy.AstroTime(utcDate);
    const observer = new Astronomy.Observer(
      person.resolvedPlace.latitude,
      person.resolvedPlace.longitude,
      0
    );
    const ayanamsha = calculateApproxLahiriAyanamsha(utcDate);
    const ascendantLongitude = calculateAscendantLongitude(
      julianDay,
      person.resolvedPlace.latitude,
      person.resolvedPlace.longitude
    );
    const planets = buildEphemerisPlanetSet(time, observer, ascendantLongitude, ayanamsha);
    const moonLongitude = planets.Moon ? planets.Moon.longitude : null;

    if (!Number.isFinite(moonLongitude)) {
      return null;
    }

    return {
      astronomy: {
        julianDay,
        siderealMoonLongitude: moonLongitude,
        moonSignIndex: Math.floor(moonLongitude / 30),
        nakshatraIndex: Math.floor(moonLongitude / (360 / 27))
      },
      engine: "astronomy-engine",
      ascendantLongitude,
      ascendantSignIndex: Math.floor(ascendantLongitude / 30),
      moonSignIndex: Math.floor(moonLongitude / 30),
      nakshatraIndex: Math.floor(moonLongitude / (360 / 27)),
      houses: Array.from({ length: 12 }, (_, index) => ({
        house: index + 1,
        sign: NAMES.zodiac[Math.floor(normalizeDegrees(ascendantLongitude + index * 30) / 30)],
        cusp: roundOne(normalizeDegrees(ascendantLongitude + index * 30))
      })),
      planets
    };
  } catch (error) {
    return null;
  }
}

function calculateApproxBirthAstronomy(person) {
  if (!person.resolvedPlace || !person.date || !person.time) {
    return null;
  }

  try {
    const utcDate = zonedLocalToUtc(person.date, person.time, person.resolvedPlace.timezone);
    const julianDay = utcToJulianDay(utcDate);
    const moonLongitude = normalizeDegrees(calculateApproxMoonLongitude(julianDay));
    const siderealMoonLongitude = normalizeDegrees(moonLongitude - calculateApproxLahiriAyanamsha(utcDate));

    return {
      julianDay,
      moonLongitude,
      siderealMoonLongitude,
      moonSignIndex: Math.floor(siderealMoonLongitude / 30),
      nakshatraIndex: Math.floor(siderealMoonLongitude / (360 / 27))
    };
  } catch (error) {
    return null;
  }
}

function buildApproxPlanetSet(julianDay, ascendantLongitude, siderealMoonLongitude) {
  const d = julianDay - 2451543.5;
  const ayanamsha = calculateApproxLahiriAyanamsha(new Date((julianDay - 2440587.5) * 86400000));
  const earth = calculateHeliocentricPlanet(d, {
    N: 0,
    i: 0,
    w: 282.9404 + 4.70935e-5 * d,
    a: 1,
    e: 0.016709 - 1.151e-9 * d,
    M: 356.047 + 0.9856002585 * d
  });

  const planetDefs = {
    Sun: null,
    Moon: { longitude: siderealMoonLongitude },
    Mercury: { N: 48.3313 + 3.24587e-5 * d, i: 7.0047 + 5e-8 * d, w: 29.1241 + 1.01444e-5 * d, a: 0.387098, e: 0.205635 + 5.59e-10 * d, M: 168.6562 + 4.0923344368 * d },
    Venus: { N: 76.6799 + 2.4659e-5 * d, i: 3.3946 + 2.75e-8 * d, w: 54.891 + 1.38374e-5 * d, a: 0.72333, e: 0.006773 - 1.302e-9 * d, M: 48.0052 + 1.6021302244 * d },
    Mars: { N: 49.5574 + 2.11081e-5 * d, i: 1.8497 - 1.78e-8 * d, w: 286.5016 + 2.92961e-5 * d, a: 1.523688, e: 0.093405 + 2.516e-9 * d, M: 18.6021 + 0.5240207766 * d },
    Jupiter: { N: 100.4542 + 2.76854e-5 * d, i: 1.303 - 1.557e-7 * d, w: 273.8777 + 1.64505e-5 * d, a: 5.20256, e: 0.048498 + 4.469e-9 * d, M: 19.895 + 0.0830853001 * d },
    Saturn: { N: 113.6634 + 2.3898e-5 * d, i: 2.4886 - 1.081e-7 * d, w: 339.3939 + 2.97661e-5 * d, a: 9.55475, e: 0.055546 - 9.499e-9 * d, M: 316.967 + 0.0334442282 * d }
  };

  const planets = {};
  planets.Sun = buildPlanetEntry("Sun", normalizeDegrees(earth.longitude + 180 - ayanamsha), ascendantLongitude);
  planets.Moon = buildPlanetEntry("Moon", siderealMoonLongitude, ascendantLongitude);

  ["Mercury", "Venus", "Mars", "Jupiter", "Saturn"].forEach((planet) => {
    const heliocentric = calculateHeliocentricPlanet(d, planetDefs[planet]);
    const geocentricLongitude = heliocentricToGeocentricLongitude(heliocentric, earth);
    planets[planet] = buildPlanetEntry(planet, normalizeDegrees(geocentricLongitude - ayanamsha), ascendantLongitude);
  });

  const rahuLongitude = normalizeDegrees((125.1228 - 0.0529538083 * d) - ayanamsha);
  planets.Rahu = buildPlanetEntry("Rahu", rahuLongitude, ascendantLongitude);
  planets.Ketu = buildPlanetEntry("Ketu", normalizeDegrees(rahuLongitude + 180), ascendantLongitude);

  return planets;
}

function buildEphemerisPlanetSet(time, observer, ascendantLongitude, ayanamsha) {
  const planets = {};
  const bodies = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];

  bodies.forEach((bodyName) => {
    const eq = Astronomy.Equator(Astronomy.Body[bodyName], time, observer, true, true);
    const ec = Astronomy.Ecliptic(eq.vec);
    const siderealLongitude = normalizeDegrees(ec.elon - ayanamsha);
    planets[bodyName] = buildPlanetEntry(bodyName, siderealLongitude, ascendantLongitude);
  });

  const d = utcToJulianDay(time.date) - 2451543.5;
  const rahuLongitude = normalizeDegrees((125.1228 - 0.0529538083 * d) - ayanamsha);
  planets.Rahu = buildPlanetEntry("Rahu", rahuLongitude, ascendantLongitude);
  planets.Ketu = buildPlanetEntry("Ketu", normalizeDegrees(rahuLongitude + 180), ascendantLongitude);

  return planets;
}

function calculateHeliocentricPlanet(d, elements) {
  const M = normalizeDegrees(elements.M);
  const E = solveKepler(M, elements.e);
  const xv = elements.a * (cosDeg(E) - elements.e);
  const yv = elements.a * (Math.sqrt(1 - elements.e * elements.e) * sinDeg(E));
  const v = atan2Deg(yv, xv);
  const r = Math.sqrt(xv * xv + yv * yv);

  const xh =
    r *
    (cosDeg(elements.N) * cosDeg(v + elements.w) -
      sinDeg(elements.N) * sinDeg(v + elements.w) * cosDeg(elements.i));
  const yh =
    r *
    (sinDeg(elements.N) * cosDeg(v + elements.w) +
      cosDeg(elements.N) * sinDeg(v + elements.w) * cosDeg(elements.i));
  const zh = r * (sinDeg(v + elements.w) * sinDeg(elements.i));

  return {
    x: xh,
    y: yh,
    z: zh,
    longitude: normalizeDegrees(atan2Deg(yh, xh))
  };
}

function heliocentricToGeocentricLongitude(planet, earth) {
  const xg = planet.x - earth.x;
  const yg = planet.y - earth.y;
  return normalizeDegrees(atan2Deg(yg, xg));
}

function buildPlanetEntry(name, longitude, ascendantLongitude) {
  const signIndex = Math.floor(longitude / 30);
  const degreeInSign = roundOne(normalizeDegrees(longitude % 30));
  return {
    name,
    longitude: roundOne(longitude),
    sign: NAMES.zodiac[signIndex],
    degree: degreeInSign,
    house: deriveHouseFromLongitude(ascendantLongitude, longitude)
  };
}

function calculateAscendantLongitude(julianDay, latitude, longitude) {
  const T = (julianDay - 2451545.0) / 36525;
  const gmst = normalizeDegrees(
    280.46061837 +
      360.98564736629 * (julianDay - 2451545) +
      0.000387933 * T * T -
      (T * T * T) / 38710000
  );
  const lst = normalizeDegrees(gmst + longitude);
  const epsilon = 23.439291 - 0.0130042 * T;
  const lambda = atan2Deg(
    -cosDeg(lst),
    sinDeg(lst) * cosDeg(epsilon) + tanDeg(latitude) * sinDeg(epsilon)
  );
  return normalizeDegrees(lambda);
}

function deriveHouseFromLongitude(ascendantLongitude, longitude) {
  return positiveMod(Math.floor(normalizeDegrees(longitude - ascendantLongitude) / 30), 12) + 1;
}

function parseChartStructure(raw) {
  if (!raw) {
    return { planets: {}, houses: [] };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      planets: parsed.planets || {},
      houses: parsed.houses || []
    };
  } catch (error) {
    return { planets: {}, houses: [] };
  }
}

function normalizeChartPlanets(planets, lagnaSign) {
  const normalized = {};
  Object.entries(planets || {}).forEach(([planet, value]) => {
    if (!value) {
      return;
    }
    normalized[planet] = {
      sign: value.sign || null,
      degree: Number.isFinite(Number(value.degree)) ? Number(value.degree) : null,
      house:
        normalizeHouseNumber(value.house) ||
        (value.sign && lagnaSign ? deriveHouseFromSigns(lagnaSign, value.sign) : null)
    };
  });
  return normalized;
}

function getSignIndexByName(signName) {
  return NAMES.zodiac.indexOf(signName);
}

function calculateNavamsaSignIndex(signIndex, degreeInSign) {
  if (!Number.isFinite(signIndex) || signIndex < 0 || signIndex > 11 || !Number.isFinite(degreeInSign)) {
    return null;
  }

  const navamsaPart = clamp(Math.floor(degreeInSign / (30 / 9)), 0, 8);
  const modality = signIndex % 3;
  const startIndex =
    modality === 0
      ? signIndex
      : modality === 1
        ? positiveMod(signIndex + 8, 12)
        : positiveMod(signIndex + 4, 12);

  return positiveMod(startIndex + navamsaPart, 12);
}

function buildNavamsaSnapshotFromChart(chart) {
  if (!chart) {
    return null;
  }

  const lagnaNavamsa = Number.isFinite(chart.ascendantLongitude)
    ? NAMES.zodiac[calculateNavamsaSignIndex(Math.floor(chart.ascendantLongitude / 30), normalizeDegrees(chart.ascendantLongitude % 30))]
    : null;
  const moon = chart.planets && chart.planets.Moon;
  const moonNavamsa = moon && moon.sign && Number.isFinite(Number(moon.degree))
    ? NAMES.zodiac[calculateNavamsaSignIndex(getSignIndexByName(moon.sign), Number(moon.degree))]
    : null;
  const planetLines = PLANET_KEYS
    .filter((planet) => chart.planets && chart.planets[planet] && chart.planets[planet].sign && Number.isFinite(Number(chart.planets[planet].degree)))
    .slice(0, 4)
    .map((planet) => {
      const data = chart.planets[planet];
      const navamsaIndex = calculateNavamsaSignIndex(getSignIndexByName(data.sign), Number(data.degree));
      return navamsaIndex === null ? null : `${PLANET_SHORT_LABELS[planet] || planet.slice(0, 2)} ${NAMES.zodiac[navamsaIndex]}`;
    })
    .filter(Boolean);

  if (!lagnaNavamsa && !moonNavamsa && !planetLines.length) {
    return null;
  }

  return {
    lagna: lagnaNavamsa,
    moon: moonNavamsa,
    planets: planetLines
  };
}

function buildApproxVimshottariSnapshot(moonLongitude, birthDate, birthTime, timezone) {
  if (!Number.isFinite(moonLongitude) || !birthDate) {
    return null;
  }

  try {
    const birthMoment = timezone
      ? zonedLocalToUtc(birthDate, birthTime || "00:00", timezone)
      : new Date(`${birthDate}T${birthTime || "00:00"}:00`);
    const now = new Date();
    const elapsedYears = Math.max(0, (now.getTime() - birthMoment.getTime()) / (365.2425 * 24 * 60 * 60 * 1000));
    const nakshatraSpan = 360 / 27;
    const currentNakshatraIndex = Math.floor(moonLongitude / nakshatraSpan);
    const currentLord = VIMSHOTTARI_ORDER[currentNakshatraIndex % VIMSHOTTARI_ORDER.length];
    const progressInNakshatra = (moonLongitude % nakshatraSpan) / nakshatraSpan;
    const firstRemainingYears = VIMSHOTTARI_YEARS[currentLord] * (1 - progressInNakshatra);
    const currentMaha = resolveCurrentDashaLord(currentLord, firstRemainingYears, elapsedYears);
    const elapsedWithinMaha = currentMaha.elapsedWithin;
    const antar = resolveAntardashaLord(currentMaha.lord, elapsedWithinMaha);

    return {
      maha: currentMaha.lord,
      antar,
      source: "Approx dasha from birth moon"
    };
  } catch (_error) {
    return null;
  }
}

function resolveCurrentDashaLord(startLord, firstRemainingYears, elapsedYears) {
  const startIndex = VIMSHOTTARI_ORDER.indexOf(startLord);
  let remaining = elapsedYears;

  if (remaining <= firstRemainingYears) {
    return { lord: startLord, elapsedWithin: remaining };
  }

  remaining -= firstRemainingYears;

  for (let offset = 1; offset <= VIMSHOTTARI_ORDER.length * 3; offset += 1) {
    const lord = VIMSHOTTARI_ORDER[(startIndex + offset) % VIMSHOTTARI_ORDER.length];
    const years = VIMSHOTTARI_YEARS[lord];
    if (remaining <= years) {
      return { lord, elapsedWithin: remaining };
    }
    remaining -= years;
  }

  return { lord: startLord, elapsedWithin: 0 };
}

function resolveAntardashaLord(mahaLord, elapsedWithinMaha) {
  const startIndex = VIMSHOTTARI_ORDER.indexOf(mahaLord);
  let remaining = Math.max(0, elapsedWithinMaha);
  const mahaYears = VIMSHOTTARI_YEARS[mahaLord];

  for (let offset = 0; offset < VIMSHOTTARI_ORDER.length; offset += 1) {
    const lord = VIMSHOTTARI_ORDER[(startIndex + offset) % VIMSHOTTARI_ORDER.length];
    const antarYears = (mahaYears * VIMSHOTTARI_YEARS[lord]) / 120;
    if (remaining <= antarYears) {
      return lord;
    }
    remaining -= antarYears;
  }

  return mahaLord;
}

function zonedLocalToUtc(dateString, timeString, timeZone) {
  const [year, month, day] = dateString.split("-").map(Number);
  const [hour, minute] = timeString.split(":").map(Number);
  const baseUtc = Date.UTC(year, month - 1, day, hour, minute, 0);
  let timestamp = baseUtc;

  for (let index = 0; index < 2; index += 1) {
    const offsetMinutes = getTimezoneOffsetMinutes(new Date(timestamp), timeZone);
    timestamp = baseUtc - offsetMinutes * 60000;
  }

  return new Date(timestamp);
}

function getTimezoneOffsetMinutes(date, timeZone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  });

  const parts = formatter.formatToParts(date).reduce((acc, part) => {
    if (part.type !== "literal") {
      acc[part.type] = Number(part.value);
    }
    return acc;
  }, {});

  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return (asUtc - date.getTime()) / 60000;
}

function utcToJulianDay(date) {
  return date.getTime() / 86400000 + 2440587.5;
}

function calculateApproxMoonLongitude(julianDay) {
  const days = julianDay - 2451545.0;
  const l0 = normalizeDegrees(218.316 + 13.176396 * days);
  const mMoon = normalizeDegrees(134.963 + 13.064993 * days);
  const mSun = normalizeDegrees(357.529 + 0.98560028 * days);
  const elongation = normalizeDegrees(297.85 + 12.190749 * days);
  const latitudeArg = normalizeDegrees(93.272 + 13.22935 * days);

  return l0
    + 6.289 * sinDeg(mMoon)
    + 1.274 * sinDeg(2 * elongation - mMoon)
    + 0.658 * sinDeg(2 * elongation)
    + 0.214 * sinDeg(2 * mMoon)
    - 0.186 * sinDeg(mSun)
    - 0.059 * sinDeg(2 * elongation - 2 * mMoon)
    - 0.057 * sinDeg(2 * elongation - mSun - mMoon)
    + 0.053 * sinDeg(2 * elongation + mMoon)
    + 0.046 * sinDeg(2 * elongation - mSun)
    + 0.041 * sinDeg(mSun - mMoon)
    - 0.035 * sinDeg(elongation)
    - 0.031 * sinDeg(mSun + mMoon)
    - 0.015 * sinDeg(2 * latitudeArg - 2 * elongation)
    + 0.011 * sinDeg(2 * latitudeArg - mMoon - 2 * elongation);
}

function calculateApproxLahiriAyanamsha(date) {
  const year = date.getUTCFullYear() + (date.getUTCMonth() + 1) / 12;
  return ((year - 285) * 50.29) / 3600;
}

function tuneTraditionBreakdown(breakdown, emphasis = {}) {
  return breakdown.map((item) => {
    const multiplier = emphasis[item.label] || 1;
    const tunedNormalized = clamp(item.normalized * multiplier, 0, 1);
    const tunedScore = roundOne(tunedNormalized * item.weight);

    return {
      ...item,
      normalized: roundThree(tunedNormalized),
      score: tunedScore
    };
  });
}

function buildStateTraditionSelection(mode, base) {
  const normalizedMode = normalizeTraditionMode(mode);
  const config = TRADITION_MODE_CONFIG[normalizedMode] || TRADITION_MODE_CONFIG.compare;
  const breakdown = tuneTraditionBreakdown(base.breakdown, config.emphasis);

  return {
    ...base,
    mode: normalizedMode,
    family: config.family,
    label: config.label,
    total: Math.min(36, roundOne(sumScore(breakdown))),
    breakdown,
    narrative: config.narrative || base.note || ""
  };
}

function buildComparisonTraditions(mode, regionalEngines) {
  const family = getTraditionFamily(mode);

  if (family === "odia") {
    return [regionalEngines.odia, regionalEngines.east];
  }

  if (family === "tamil") {
    return [regionalEngines.east, regionalEngines.tamil];
  }

  if (family === "kerala") {
    return [regionalEngines.east, regionalEngines.kerala];
  }

  return [regionalEngines.east, regionalEngines.south];
}

function pickSelectedTradition(mode, regionalEngines) {
  const normalizedMode = normalizeTraditionMode(mode);
  const family = getTraditionFamily(normalizedMode);
  const odia = regionalEngines.odia;
  const east = regionalEngines.east;
  const south = regionalEngines.south;
  const tamil = regionalEngines.tamil;
  const kerala = regionalEngines.kerala;

  if (family === "odia") {
    return buildStateTraditionSelection(normalizedMode, odia);
  }

  if (family === "east") {
    return buildStateTraditionSelection(normalizedMode, {
      ...east,
      mode: "east",
      label: "Ashtakoota",
      narrative: "The Ashtakoota lens shows how Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi shape the match."
    });
  }

  if (family === "south") {
    return buildStateTraditionSelection(normalizedMode, {
      ...south,
      mode: "south",
      label: "South Porutham",
      narrative: "The South Porutham lens shows how porutham-style steadiness, long-term safety, and practical harmony may shape the match."
    });
  }

  if (family === "tamil") {
    return buildStateTraditionSelection(normalizedMode, tamil);
  }

  if (family === "kerala") {
    return buildStateTraditionSelection(normalizedMode, kerala);
  }

  const mergedBreakdown = [
    createMergedItem("Daily Rhythm", 4, [findItem(east.breakdown, "Tara"), findItem(south.breakdown, "Dina"), findItem(south.breakdown, "Vasya")], "Daily habits and emotional timing feel easier to manage together.", "Regular routines may need more patience and adjustment."),
    createMergedItem("Communication", 5, [findItem(east.breakdown, "Graha Maitri"), findItem(east.breakdown, "Varna")], "Talking through plans and feelings should feel more natural.", "Misunderstandings can grow if expectations stay unspoken."),
    createMergedItem("Chemistry", 4, [findItem(east.breakdown, "Yoni"), findItem(south.breakdown, "Yoni")], "Warmth, comfort, and closeness have a good base here.", "Closeness may need more trust, time, and gentle effort."),
    createMergedItem("Temperament", 6, [findItem(east.breakdown, "Gana"), findItem(south.breakdown, "Gana"), findItem(east.breakdown, "Vashya")], "Your natural styles can settle into a workable partnership.", "Strong personalities may need better timing during conflict."),
    createMergedItem("Family Direction", 8, [findItem(east.breakdown, "Bhakoot"), findItem(south.breakdown, "Rasi"), findItem(south.breakdown, "Mahendra")], "Long-term plans and family growth look more aligned than strained.", "Major life decisions may need slower planning and clearer agreement."),
    createMergedItem("Long-Term Stability", 9, [findItem(east.breakdown, "Nadi"), findItem(south.breakdown, "Rajju"), findItem(south.breakdown, "Nadi"), findItem(south.breakdown, "Vedha")], "The match shows encouraging signs for steadiness over time.", "Consistency, family support, and health routines may need extra care.")
  ];

  return {
    mode: normalizedMode,
    family: "compare",
    label: "Compare",
    total: roundOne((east.total + south.total) / 2),
    breakdown: mergedBreakdown,
    narrative: TRADITION_MODE_CONFIG.compare.narrative
  };
}

function renderResults(result) {
  const results = document.getElementById("results");
  const localizedDecision = getLocalizedDecision(result.decision);
  document.getElementById("overallScore").textContent = result.finalScore.toFixed(1);
  document.getElementById("overallTitle").textContent = translateResultText(getVerdict(result.finalScore));
  document.getElementById("overallNarrative").textContent = buildOverallNarrative(result);
  const matchLevelNode = document.getElementById("matchLevel");
  if (matchLevelNode) {
    matchLevelNode.textContent = translateResultText(getMatchBand(result.finalScore));
  }

  results.classList.remove("hidden");
  applyCompactResultLayout(result);
  renderDecisionCards(result, localizedDecision);
  renderChartBasis(result);
  renderKundaliCreation(result);
  renderPriorityChecks(result);
  renderInsightsList("positivesList", result.positiveInsights);
  renderInsightsList("cautionsList", result.cautionInsights);
}

async function downloadCompatibilityReportCard(result) {
  if (!result) {
    return;
  }

  const blob = await buildResultsCardImageBlob(document.getElementById("results"));
  const fileName = buildReportCardFileName(result);

  if (window.AIPanditAndroid && typeof window.AIPanditAndroid.saveFile === "function") {
    window.AIPanditAndroid.saveFile(await blobToBase64(blob), fileName, blob.type);
    return;
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function bytesToBase64(bytes) {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";

  for (let index = 0; index < view.length; index += 0x8000) {
    const slice = view.subarray(index, Math.min(index + 0x8000, view.length));
    binary += String.fromCharCode(...slice);
  }

  return btoa(binary);
}

async function buildResultsCardImageBlob(element) {
  const resultsPanel =
    element instanceof Element ? element : document.getElementById("results");

  if (!resultsPanel) {
    throw new Error("Could not find the results panel.");
  }

  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (_error) {
      // Ignore font readiness issues and continue with capture.
    }
  }

  const rect = resultsPanel.getBoundingClientRect();
  const exportScale = getReportCardExportScale(rect.width || 1, rect.height || 1);

  if (typeof window.html2canvas === "function") {
    const canvas = await window.html2canvas(resultsPanel, {
      backgroundColor: null,
      scale: exportScale,
      useCORS: true,
      logging: false,
      ignoreElements: (node) => {
        if (!(node instanceof Element)) {
          return false;
        }

        return node.classList.contains("result-actions")
          || node.classList.contains("report-language-picker")
          || node.id === "downloadReportButton"
          || node.id === "reportLanguage"
          || node.id === "reportLanguageLabel";
      },
      onclone: (clonedDocument) => {
        const clonedResults = clonedDocument.getElementById("results");
        if (!clonedResults) {
          return;
        }

        clonedResults.classList.remove("hidden");
        clonedResults.style.display = "block";
        const actions = clonedResults.querySelector(".result-actions");
        if (actions) {
          actions.style.display = "none";
        }
      }
    });

    return canvasToImageBlob(canvas, "image/png");
  }

  const view = buildReportCardViewModel(element);
  const metricsCanvas = document.createElement("canvas");
  const metricsContext = metricsCanvas.getContext("2d");

  if (!metricsContext) {
    throw new Error("Could not prepare report card image.");
  }

  const layout = measureReportCardLayout(metricsContext, view);
  const scale = getReportCardExportScale(layout.width, layout.height);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not prepare report card image.");
  }

  canvas.width = layout.width * scale;
  canvas.height = layout.height * scale;
  context.setTransform(scale, 0, 0, scale, 0, 0);
  drawReportCardCanvas(context, view, layout);

  return canvasToImageBlob(canvas, "image/png");
}

function getReportCardExportScale(width, height) {
  const safeWidth = Math.max(Number(width) || 1, 1);
  const safeHeight = Math.max(Number(height) || 1, 1);
  const desiredScale = Math.max(window.devicePixelRatio || 1, REPORT_CARD_EXPORT_SCALE);
  const maxScaleByPixels = Math.sqrt(REPORT_CARD_MAX_PIXELS / (safeWidth * safeHeight));
  return Math.max(2, Math.min(desiredScale, maxScaleByPixels));
}

function canvasToImageBlob(canvas, type) {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Could not create report card image."));
        }
      }, type);
    } catch (error) {
      reject(error);
    }
  });
}

function collectDocumentStyleText() {
  return [...document.styleSheets]
    .map((sheet) => {
      try {
        return [...sheet.cssRules].map((rule) => rule.cssText).join("\n");
      } catch (_error) {
        return "";
      }
    })
    .filter(Boolean)
    .join("\n");
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = typeof reader.result === "string" ? reader.result.split(",")[1] : "";
      if (result) {
        resolve(result);
      } else {
        reject(new Error("Unable to encode report card image."));
      }
    };
    reader.onerror = () => reject(new Error("Unable to encode report card image."));
    reader.readAsDataURL(blob);
  });
}

function buildReportCardFileName(result) {
  const maleName = result.input.pairOrder === "a-bride"
    ? cleanFileNameText(result.input.personB.name || "Male")
    : cleanFileNameText(result.input.personA.name || "Male");
  const femaleName = result.input.pairOrder === "a-bride"
    ? cleanFileNameText(result.input.personA.name || "Female")
    : cleanFileNameText(result.input.personB.name || "Female");

  return `Kundali Match of ${maleName} and ${femaleName}.png`;
}

function getRoleDetailLabels(input) {
  const personAIsBride = input && input.pairOrder === "a-bride";
  return {
    personA: personAIsBride ? "Detail of Bride" : "Detail of Groom",
    personB: personAIsBride ? "Detail of Groom" : "Detail of Bride"
  };
}

function buildReportCardViewModel(result) {
  const localizedDecision = getLocalizedDecision(result.decision);
  const highlights = getMainResultHighlights(result);

  return {
    subtitle: getReportText("resultKicker") || "Easy Match Report",
    title: "AI Pandit Ji",
    names: `${result.input.personA.name || "Person A"} & ${result.input.personB.name || "Person B"}`,
    score: `${result.finalScore.toFixed(1)} / 36`,
    verdict: translateResultText(getVerdict(result.finalScore)),
    mode: getLocalizedTraditionLabel(result.selected.mode),
    matchLevelLabel: getReportText("matchLevel") || "Match Level",
    matchLevelValue: localizedDecision.guideLabel,
    nextStepLabel: getReportText("nextStepLabel") || "Next Step",
    nextStepValue: localizedDecision.actionLabel,
    careLabel: getReportText("sectionCareTitle") || "Care Points",
    careValue: highlights.caution ? translateResultText(highlights.caution.label) : "-",
    narrativeTitle: getReportText("mainResultLabel") || "Main Result",
    narrativeBody: localizedDecision.thresholdText,
    goodTitle: getReportText("sectionGoodTitle") || "Good Signs",
    goodItems: result.positiveInsights.slice(0, 2).map((item) => translateResultText(item)),
    careItemsTitle: getReportText("sectionCareTitle") || "Care Points",
    careItems: result.cautionInsights.slice(0, 2).map((item) => translateResultText(item)),
    checksTitle: getReportText("sectionPriorityTitle") || "Main Things To Check",
    checks: result.priorityChecks.slice(0, 2).map((item) => ({
      label: item.label,
      value: item.value,
      detail: translateResultText(item.detail),
      tag: translateResultText(item.tag)
    }))
  };
}

function measureReportCardLayout(context, view) {
  const layout = {
    width: 1120,
    outerPadding: 34,
    innerPadding: 28,
    sectionGap: 22,
    cardGap: 18,
    cardRadius: 26,
    contentWidth: 0,
    summaryCardWidth: 0,
    summaryHeights: [],
    narrativeHeight: 0,
    goodHeight: 0,
    careHeight: 0,
    checksHeights: [],
    height: 0
  };

  layout.contentWidth = layout.width - layout.outerPadding * 2;
  layout.summaryCardWidth = (layout.contentWidth - layout.cardGap * 2) / 3;
  layout.summaryHeights = [
    measureSummaryCardHeight(context, view.matchLevelLabel, view.matchLevelValue, layout.summaryCardWidth, 42),
    measureSummaryCardHeight(context, view.nextStepLabel, view.nextStepValue, layout.summaryCardWidth, 42),
    measureSummaryCardHeight(context, view.careLabel, view.careValue, layout.summaryCardWidth, 42)
  ];
  layout.narrativeHeight = measureTextCardHeight(context, view.narrativeTitle, view.narrativeBody, layout.contentWidth);
  layout.goodHeight = measureBulletCardHeight(context, view.goodTitle, view.goodItems, layout.contentWidth);
  layout.careHeight = measureBulletCardHeight(context, view.careItemsTitle, view.careItems, layout.contentWidth);
  layout.checksHeights = view.checks.map((item) => measureCheckCardHeight(context, item, layout.contentWidth));

  const headerHeight = 134;
  const scoreHeight = 156;
  const summaryHeight = Math.max(...layout.summaryHeights, 164);
  const checksSectionHeight = layout.checksHeights.reduce((sum, height) => sum + height, 0) + Math.max(0, layout.checksHeights.length - 1) * 14;

  layout.height =
    layout.outerPadding * 2 +
    headerHeight +
    layout.sectionGap +
    scoreHeight +
    layout.sectionGap +
    summaryHeight +
    layout.sectionGap +
    layout.narrativeHeight +
    layout.sectionGap +
    layout.goodHeight +
    layout.sectionGap +
    layout.careHeight +
    (checksSectionHeight ? layout.sectionGap + checksSectionHeight : 0);

  layout.height = Math.max(layout.height, 1200);
  return layout;
}

function measureSummaryCardHeight(context, label, value, width, minHeight) {
  const innerWidth = width - 40;
  const labelLines = measureCanvasLines(context, label, innerWidth, 400, 20, REPORT_CARD_FONT_STACK);
  const valueLines = measureCanvasLines(context, value, innerWidth, 700, 32, REPORT_CARD_FONT_STACK);
  return Math.max(minHeight, 28 + labelLines * 28 + valueLines * 38 + 24);
}

function measureTextCardHeight(context, title, body, width) {
  const innerWidth = width - 56;
  const titleLines = measureCanvasLines(context, title, innerWidth, 700, 22, REPORT_CARD_FONT_STACK);
  const bodyLines = measureCanvasLines(context, body, innerWidth, 400, 22, REPORT_CARD_FONT_STACK);
  return 28 + titleLines * 28 + bodyLines * 30 + 30;
}

function measureBulletCardHeight(context, title, items, width) {
  const innerWidth = width - 72;
  const titleLines = measureCanvasLines(context, title, innerWidth, 700, 22, REPORT_CARD_FONT_STACK);
  const itemsHeight = items.reduce((sum, item) => sum + measureCanvasLines(context, item, innerWidth, 400, 20, REPORT_CARD_FONT_STACK) * 28, 0);
  return 28 + titleLines * 28 + itemsHeight + 26;
}

function measureCheckCardHeight(context, item, width) {
  const innerWidth = width - 56;
  const labelLines = measureCanvasLines(context, item.label, innerWidth * 0.62, 700, 22, REPORT_CARD_FONT_STACK);
  const valueLines = measureCanvasLines(context, `${item.value} | ${item.tag}`, innerWidth * 0.35, 700, 20, REPORT_CARD_FONT_STACK);
  const detailLines = measureCanvasLines(context, item.detail, innerWidth, 400, 20, REPORT_CARD_FONT_STACK);
  return 30 + Math.max(labelLines * 28, valueLines * 26) + detailLines * 28 + 24;
}

function measureCanvasLines(context, text, maxWidth, weight, size, family) {
  setCanvasFont(context, weight, size, family);
  return wrapCanvasText(context, text || "", maxWidth).length || 1;
}

function drawReportCardCanvas(context, view, layout) {
  const colors = {
    page: "#f6efdf",
    card: "#fffaf1",
    border: "#efd1a7",
    heading: "#173847",
    body: "#516f7f",
    accent: "#8a3612",
    soft: "#efe3c0",
    good: "#1f5d49",
    care: "#9a5100"
  };
  const width = layout.width;
  let y = layout.outerPadding;

  context.save();
  context.clearRect(0, 0, width, layout.height);
  context.fillStyle = colors.page;
  context.fillRect(0, 0, width, layout.height);
  strokeRoundRect(context, 16, 16, width - 32, layout.height - 32, 28, "#d7b173", 2);
  strokeRoundRect(context, 28, 28, width - 56, layout.height - 56, 24, "#ead7b4", 1);

  y = drawCenteredHeader(context, view, y, width, colors);
  y += layout.sectionGap;
  y = drawScoreHero(context, view, layout, y, colors);
  y += layout.sectionGap;
  y = drawSummaryRow(context, view, layout, y, colors);
  y += layout.sectionGap;
  y = drawTextCard(context, view.narrativeTitle, view.narrativeBody, layout.outerPadding, y, layout.contentWidth, layout.narrativeHeight, colors);
  y += layout.sectionGap;
  y = drawBulletCard(context, view.goodTitle, view.goodItems, layout.outerPadding, y, layout.contentWidth, layout.goodHeight, colors, colors.good);
  y += layout.sectionGap;
  y = drawBulletCard(context, view.careItemsTitle, view.careItems, layout.outerPadding, y, layout.contentWidth, layout.careHeight, colors, colors.care);

  if (view.checks.length) {
    y += layout.sectionGap;
    view.checks.forEach((item, index) => {
      y = drawCheckCard(context, item, layout.outerPadding, y, layout.contentWidth, layout.checksHeights[index], colors);
      y += 14;
    });
  }

  context.restore();
}

function drawCenteredHeader(context, view, y, width, colors) {
  drawCenteredTopText(context, view.subtitle, width / 2, y + 28, 22, REPORT_CARD_FONT_STACK, colors.body, 500);
  drawCenteredTopText(context, view.title, width / 2, y + 72, 50, REPORT_CARD_FONT_STACK, colors.heading, 700);
  drawCenteredTopText(context, view.names, width / 2, y + 108, 22, REPORT_CARD_FONT_STACK, colors.accent, 500);
  return y + 134;
}

function drawScoreHero(context, view, layout, y, colors) {
  const left = layout.outerPadding;
  const top = y;
  const width = layout.contentWidth;
  const height = 156;
  const scoreWidth = 270;

  fillRoundRect(context, left, top, width, height, layout.cardRadius, colors.card);
  strokeRoundRect(context, left, top, width, height, layout.cardRadius, colors.border, 2);
  fillRoundRect(context, left, top, scoreWidth, height, layout.cardRadius, colors.soft);
  context.fillStyle = colors.soft;
  context.fillRect(left + scoreWidth - layout.cardRadius, top, layout.cardRadius, height);

  drawTopText(context, getReportText("matchScoreLabel") || "Match Score", left + 28, top + 34, 18, REPORT_CARD_FONT_STACK, colors.accent, 600);
  drawTopText(context, view.score, left + 28, top + 96, 58, REPORT_CARD_FONT_STACK, colors.heading, 700);
  drawTopText(context, view.verdict, left + scoreWidth + 34, top + 58, 30, REPORT_CARD_FONT_STACK, colors.heading, 700);
  drawTopText(context, view.mode, left + scoreWidth + 34, top + 102, 24, REPORT_CARD_FONT_STACK, colors.body, 500);

  return top + height;
}

function drawSummaryRow(context, view, layout, y, colors) {
  const left = layout.outerPadding;
  const labels = [view.matchLevelLabel, view.nextStepLabel, view.careLabel];
  const values = [view.matchLevelValue, view.nextStepValue, view.careValue];
  const maxHeight = Math.max(...layout.summaryHeights, 164);

  labels.forEach((label, index) => {
    const x = left + index * (layout.summaryCardWidth + layout.cardGap);
    fillRoundRect(context, x, y, layout.summaryCardWidth, maxHeight, layout.cardRadius, colors.card);
    strokeRoundRect(context, x, y, layout.summaryCardWidth, maxHeight, layout.cardRadius, colors.border, 2);
    drawWrappedTopText(context, label, x + 22, y + 28, layout.summaryCardWidth - 44, 20, 28, REPORT_CARD_FONT_STACK, colors.body, 400);
    drawWrappedTopText(context, values[index], x + 22, y + 74, layout.summaryCardWidth - 44, 32, 38, REPORT_CARD_FONT_STACK, colors.heading, 700);
  });

  return y + maxHeight;
}

function drawTextCard(context, title, body, x, y, width, height, colors) {
  fillRoundRect(context, x, y, width, height, 24, colors.card);
  strokeRoundRect(context, x, y, width, height, 24, colors.border, 2);
  drawWrappedTopText(context, title, x + 28, y + 28, width - 56, 22, 28, REPORT_CARD_FONT_STACK, colors.heading, 700);
  drawWrappedTopText(context, body, x + 28, y + 66, width - 56, 22, 30, REPORT_CARD_FONT_STACK, colors.body, 400);
  return y + height;
}

function drawBulletCard(context, title, items, x, y, width, height, colors, bulletColor) {
  fillRoundRect(context, x, y, width, height, 24, colors.card);
  strokeRoundRect(context, x, y, width, height, 24, colors.border, 2);
  let currentY = y + 28;

  currentY += drawWrappedTopText(context, title, x + 28, currentY, width - 56, 22, 28, REPORT_CARD_FONT_STACK, colors.heading, 700) + 8;
  items.forEach((item) => {
    context.fillStyle = bulletColor;
    context.beginPath();
    context.arc(x + 44, currentY + 11, 4.5, 0, Math.PI * 2);
    context.fill();
    currentY += drawWrappedTopText(context, item, x + 62, currentY, width - 90, 20, 28, REPORT_CARD_FONT_STACK, colors.body, 400) + 8;
  });

  return y + height;
}

function drawCheckCard(context, item, x, y, width, height, colors) {
  fillRoundRect(context, x, y, width, height, 24, colors.card);
  strokeRoundRect(context, x, y, width, height, 24, colors.border, 2);
  drawWrappedTopText(context, item.label, x + 28, y + 28, width * 0.55, 22, 28, REPORT_CARD_FONT_STACK, colors.heading, 700);
  drawWrappedTopText(context, `${item.value} | ${item.tag}`, x + width - 360, y + 30, 300, 20, 26, REPORT_CARD_FONT_STACK, colors.accent, 600, "right");
  drawWrappedTopText(context, item.detail, x + 28, y + 76, width - 56, 20, 28, REPORT_CARD_FONT_STACK, colors.body, 400);
  return y + height;
}

function drawWrappedTopText(context, text, x, y, maxWidth, fontSize, lineHeight, fontFamily, color, weight = 400, align = "left") {
  setCanvasFont(context, weight, fontSize, fontFamily);
  context.fillStyle = color;
  context.textAlign = align;
  const lines = wrapCanvasText(context, text || "", maxWidth);

  lines.forEach((line, index) => {
    const drawX = align === "right" ? x + maxWidth : x;
    context.fillText(line, drawX, y + index * lineHeight);
  });

  context.textAlign = "left";
  return lines.length * lineHeight;
}

function drawTopText(context, text, x, y, fontSize, fontFamily, color, weight = 400) {
  setCanvasFont(context, weight, fontSize, fontFamily);
  context.fillStyle = color;
  context.fillText(String(text), x, y);
}

function drawCenteredTopText(context, text, x, y, fontSize, fontFamily, color, weight = 400) {
  setCanvasFont(context, weight, fontSize, fontFamily);
  context.fillStyle = color;
  context.textAlign = "center";
  context.fillText(String(text), x, y);
  context.textAlign = "left";
}

function fillRoundRect(context, x, y, width, height, radius, color) {
  context.fillStyle = color;
  roundRectPath(context, x, y, width, height, radius);
  context.fill();
}

function strokeRoundRect(context, x, y, width, height, radius, color, lineWidth = 1) {
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  roundRectPath(context, x, y, width, height, radius);
  context.stroke();
}

function roundRectPath(context, x, y, width, height, radius) {
  const safeRadius = Math.max(0, Math.min(radius, width / 2, height / 2));
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.arcTo(x + width, y, x + width, y + height, safeRadius);
  context.arcTo(x + width, y + height, x, y + height, safeRadius);
  context.arcTo(x, y + height, x, y, safeRadius);
  context.arcTo(x, y, x + width, y, safeRadius);
  context.closePath();
}

function buildReportBlocks(result) {
  const blocks = [];
  const localizedDecision = getLocalizedDecision(result.decision);
  const roleLabels = getRoleDetailLabels(result.input);
  const inputTypeLabel = translateResultText(
    result.input.inputMode === "chart" ? "Chart file input" : "Birth details input"
  );
  const regionalGap = result.regionalGap.toFixed(1);
  const keyChecks = getTopBreakdownItems(result.selected.breakdown, 6);
  const positiveItems = result.positiveInsights.slice(0, 2);
  const cautionItems = result.cautionInsights.slice(0, 2);
  const priorityItems = result.priorityChecks.slice(0, 3);
  const personAProfileLine = buildCompactProfileLine(result.profileA);
  const personBProfileLine = buildCompactProfileLine(result.profileB);
  const personAPlanets = summarizePlanets(result.profileA.planets).slice(0, 5).join(", ");
  const personBPlanets = summarizePlanets(result.profileB.planets).slice(0, 5).join(", ");
  const personAHouses = summarizeHouses(result.profileA.houses);
  const personBHouses = summarizeHouses(result.profileB.houses);

  blocks.push({
    role: "grand-score",
    label: getReportText("matchScoreLabel") || translateResultText("Match Score"),
    value: `${result.finalScore.toFixed(1)} / 36`,
    note: `${translateResultText(getVerdict(result.finalScore))}  |  ${getLocalizedTraditionLabel(result.selected.mode)}`
  });
  blocks.push({ role: "spacer", size: 6 });
  blocks.push({ role: "section", text: getReportText("matchDetailsTitle") || translateResultText("Match Details") });
  blocks.push({ role: "key-value", label: roleLabels.personA, value: result.input.personA.name });
  blocks.push({ role: "key-value", label: roleLabels.personB, value: result.input.personB.name });
  blocks.push({ role: "key-value", label: getReportText("sourceLabel") || translateResultText("Source"), value: inputTypeLabel });
  blocks.push({ role: "key-value", label: getReportText("styleLabel") || translateResultText("Style"), value: getLocalizedTraditionLabel(result.selected.mode) });
  blocks.push({ role: "key-value", label: getReportText("regionalGap") || "Regional Gap", value: regionalGap });
  blocks.push({ role: "spacer", size: 6 });
  blocks.push({ role: "section", text: getReportText("sectionReadTitle") || "Simple Match Reading" });
  blocks.push({ role: "key-value", label: getReportText("mainResultLabel") || "Main Result", value: localizedDecision.headline });
  blocks.push({ role: "key-value", label: getReportText("guideBandLabel") || "Guide Band", value: localizedDecision.guideLabel });
  blocks.push({ role: "body", text: `${localizedDecision.thresholdText} ${localizedDecision.nextStep}` });
  blocks.push({ role: "spacer", size: 6 });
  blocks.push({ role: "section", text: getReportText("sectionPriorityTitle") || "Main Things To Check" });
  priorityItems.forEach((item) => {
    blocks.push({ role: "key-value", label: item.label, value: `${item.value} | ${translateResultText(item.tag)}` });
    blocks.push({ role: "body", text: translateResultText(item.detail) });
    if (item.about) {
      blocks.push({ role: "body", text: `${getMatchCheckMetaLabel("about")}: ${item.about}` });
    }
    if (item.impact) {
      blocks.push({ role: "body", text: `${getMatchCheckMetaLabel("impact")}: ${item.impact}` });
    }
  });
  blocks.push({ role: "spacer", size: 6 });
  blocks.push({ role: "section", text: getReportText("shortSummary") || "Short Summary" });
  blocks.push({ role: "body", text: buildCompactNarrative(result) });
  blocks.push({ role: "spacer", size: 6 });
  blocks.push({ role: "section", text: getReportText("sectionBasisTitle") || "Used For Matching" });
  if (personAProfileLine) {
    blocks.push({ role: "key-value", label: roleLabels.personA, value: personAProfileLine });
  }
  if (personBProfileLine) {
    blocks.push({ role: "key-value", label: roleLabels.personB, value: personBProfileLine });
  }
  blocks.push({ role: "spacer", size: 6 });
  blocks.push({ role: "section", text: getReportText("sectionKundaliTitle") || "Chart Snapshot" });
  const personAKundali = buildCompactKundaliSummary(result.profileA);
  const personBKundali = buildCompactKundaliSummary(result.profileB);
  if (personAKundali) {
    blocks.push({ role: "key-value", label: roleLabels.personA, value: personAKundali });
  }
  if (personBKundali) {
    blocks.push({ role: "key-value", label: roleLabels.personB, value: personBKundali });
  }
  if (personAPlanets) {
    blocks.push({ role: "key-value", label: `${roleLabels.personA} ${translateResultText("Planets")}`, value: personAPlanets });
  }
  if (personBPlanets) {
    blocks.push({ role: "key-value", label: `${roleLabels.personB} ${translateResultText("Planets")}`, value: personBPlanets });
  }
  if (personAHouses) {
    blocks.push({ role: "key-value", label: `${roleLabels.personA} ${translateResultText("Houses")}`, value: personAHouses });
  }
  if (personBHouses) {
    blocks.push({ role: "key-value", label: `${roleLabels.personB} ${translateResultText("Houses")}`, value: personBHouses });
  }
  blocks.push({ role: "key-value", label: translateResultText("Pair Harmony"), value: `${Math.round(result.middleHarmony * 100)}%` });
  blocks.push({ role: "spacer", size: 6 });
  blocks.push({ role: "section", text: getReportText("sectionRegionalTitle") || "Regional Reading" });
  const comparisonTraditions = result.comparisonTraditions || [result.east, result.south];
  comparisonTraditions.forEach((tradition) => {
    blocks.push({
      role: "key-value",
      label: tradition.label || getLocalizedTraditionLabel(tradition.mode),
      value: `${tradition.total.toFixed(1)} / 36`
    });
  });
  blocks.push({ role: "body", text: buildCompactRegionalSummary(result) });
  blocks.push({ role: "spacer", size: 6 });
  blocks.push({ role: "section", text: getReportText("sectionGoodTitle") || "Good Signs" });
  positiveItems.forEach((item) => {
    blocks.push(...toBulletBlocks(translateResultText(item)));
  });
  blocks.push({ role: "spacer", size: 6 });
  blocks.push({ role: "section", text: getReportText("sectionCareTitle") || "Care Points" });
  cautionItems.forEach((item) => {
    blocks.push(...toBulletBlocks(translateResultText(item)));
  });
  blocks.push({ role: "spacer", size: 6 });
  blocks.push({ role: "section", text: getReportText("sectionTrustTitle") || "Important Notes" });
  result.trustNotes.slice(0, 2).forEach((item) => {
    blocks.push(...toBulletBlocks(translateResultText(item)));
  });
  blocks.push({ role: "spacer", size: 6 });
  blocks.push({ role: "section", text: getReportText("sectionChecksTitle") || "Score Details" });
  keyChecks.forEach((item) => {
    blocks.push({
      role: "key-value",
      label: item.label,
      value: `${item.score.toFixed(1)} / ${item.weight} (${Math.round(item.normalized * 100)}%)`
    });
  });
  blocks.push({ role: "spacer", size: 8 });
  blocks.push({ role: "footer-note", text: translateResultText("This is a simplified compatibility report generated by AI Pandit Ji.") });

  return blocks;
}

function getTopBreakdownItems(breakdown, count) {
  return [...breakdown]
    .sort((left, right) => right.weight - left.weight || right.normalized - left.normalized)
    .slice(0, count);
}

function buildCompactNarrative(result) {
  return `${getReportText("styleLabel") || "Style"}: ${getLocalizedTraditionLabel(result.selected.mode)}. ${getReportText("matchLevel") || "Match Level"}: ${translateResultText(getMatchBand(result.finalScore))}.`;
}

function buildCompactProfileLine(profile) {
  const planetSummary = summarizePlanets(profile.planets).slice(0, 3).join(", ");

  if (profile.sourceMode === "chart") {
    return joinPresentParts([
      formatTranslatedValue("Lagna", profile.lagnaName),
      formatTranslatedValue("Moon", profile.zodiacName),
      formatTranslatedValue("Nakshatra", profile.nakshatraName),
      translateResultText(profile.manglikStatus),
      planetSummary
    ], ", ");
  }

  const matchBasis = profile.usesUserMoonBasis
    ? `${translateResultText("Match basis")}: ${buildUserMoonBasisText(profile.usesUserRashi ? profile.zodiacName : null, profile.usesUserNakshatra ? profile.nakshatraName : null)}`
    : `${translateResultText("Match basis")}: ${joinPresentParts([
      formatTranslatedValue("calculated Rashi", profile.zodiacName),
      formatTranslatedValue("Nakshatra", profile.nakshatraName)
    ], ", ")}`;

  return joinPresentParts([
    formatTranslatedValue("Lagna", profile.lagnaName || (profile.lagnaIndex !== null ? NAMES.zodiac[profile.lagnaIndex] : null)),
    matchBasis,
    translateResultText(profile.manglikStatus),
    planetSummary
  ], ", ");
}

function buildCompactKundaliSummary(profile) {
  return joinPresentParts([
    formatTranslatedValue("Lagna", profile.lagnaName),
    formatTranslatedValue("Rashi", profile.zodiacName),
    formatTranslatedValue("Nakshatra", profile.nakshatraName),
    profile.navamsa && profile.navamsa.moon ? formatTranslatedValue("Moon Navamsa", profile.navamsa.moon) : null,
    profile.dasha && profile.dasha.maha ? formatTranslatedValue("Mahadasha", profile.dasha.maha) : null,
    profile.marsHouse ? formatTranslatedValue("Mars House", `H${profile.marsHouse}`) : null,
    profile.signLord ? formatTranslatedValue("Sign Lord", profile.signLord) : null,
    translateResultText(profile.manglikStatus)
  ], ", ");
}

function buildCompactRegionalSummary(result) {
  const summaryLead = result && result.selected && result.selected.narrative
    ? translateResultText(result.selected.narrative)
    : "";

  let gapText = "";
  if (result.regionalGap <= 2) {
    gapText = translateResultText("Both regional readings are close.");
  } else if (result.regionalGap <= 5) {
    gapText = translateResultText("The two regional readings differ a little.");
  } else {
    gapText = translateResultText("The two regional readings are clearly different.");
  }

  if (summaryLead && gapText) {
    return `${summaryLead} ${gapText}`;
  }

  return summaryLead || gapText;
}

function applyCompactResultLayout(result) {
  const visibleSections = new Set([
    "resultBasisSection",
    "resultKundaliSection",
    "resultReadSection",
    "resultPrioritySection",
    "resultGoodSection",
    "resultCareSection"
  ]);

  document.querySelectorAll("#results .results-section").forEach((section) => {
    const shouldShow = visibleSections.has(section.id);
    section.classList.toggle("hidden", !shouldShow);
    section.style.display = shouldShow ? "" : "none";
  });

  const footnote = document.getElementById("resultsFootnote");
  if (footnote) {
    footnote.classList.add("hidden");
    footnote.style.display = "none";
  }
}

function getMainResultHighlights(result) {
  const sorted = [...result.selected.breakdown].sort((left, right) => right.normalized - left.normalized);
  return {
    support: sorted[0] || null,
    caution: [...sorted].reverse()[0] || null
  };
}

function buildInsightFact(item, type) {
  if (!item) {
    return "";
  }

  const scorePart = `${item.label}: ${item.score.toFixed(1)} / ${item.weight}`;
  const detailText = type === "positive" ? item.positiveText : item.cautionText;
  const detailParts = [
    `${scorePart}. ${translateResultText(type === "positive" ? getBreakdownTone(item.normalized) : getPriorityTag(item.normalized))}.`,
    translateResultText(detailText)
  ];
  const aboutText = getMatchCheckDetail(item.label, "about");
  const impactText = getMatchCheckDetail(item.label, "impact");

  if (aboutText) {
    detailParts.push(`${getMatchCheckMetaLabel("about")}: ${aboutText}`);
  }

  if (impactText) {
    detailParts.push(`${getMatchCheckMetaLabel("impact")}: ${impactText}`);
  }

  return detailParts.join(" ");
}

function wrapText(text, maxLength) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxLength) {
      if (current) {
        lines.push(current);
      }
      current = word;
    } else {
      current = candidate;
    }
  });

  if (current) {
    lines.push(current);
  }

  return lines.length ? lines : [""];
}

function toBodyBlocks(text) {
  return wrapText(text, 76).map((line) => ({ role: "body", text: line }));
}

function toBulletBlocks(text) {
  const lines = wrapText(text, 72);
  return lines.map((line, index) => ({
    role: "bullet",
    bullet: index === 0 ? ">" : "",
    text: line
  }));
}

async function buildSimplePdf(blocks) {
  const pageWidth = 612;
  const pageHeight = 792;
  const layout = {
    pageWidth,
    pageHeight,
    marginLeft: 58,
    marginRight: 58,
    contentTop: 156,
    contentBottom: 66
  };
  const renderedPages = await renderReportPagesAsImages(blocks, layout);
  return buildImagePdf(renderedPages, pageWidth, pageHeight);
}

const PDF_CANVAS_SCALE = 2;
const PDF_UI_FONT_STACK = '"Nirmala UI","Noto Sans Oriya","Noto Sans Bengali","Noto Sans Telugu","Noto Sans Tamil","Noto Sans Malayalam","Noto Sans Kannada","Noto Sans Gujarati","Noto Sans Gurmukhi","Noto Sans Devanagari","Arial Unicode MS",sans-serif';
const PDF_SERIF_FONT_STACK = '"Nirmala UI","Noto Serif Oriya","Noto Serif Bengali","Noto Serif Devanagari",Georgia,"Times New Roman",serif';

async function renderReportPagesAsImages(blocks, layout) {
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (_error) {
      // Keep going with fallback fonts if the browser cannot await font readiness.
    }
  }

  const pages = paginateCanvasReportBlocks(blocks, layout);
  return pages.map((page, pageIndex) => renderReportPageImage(page, layout, pageIndex, pages.length));
}

function paginateCanvasReportBlocks(blocks, layout) {
  const canvas = document.createElement("canvas");
  canvas.width = layout.pageWidth;
  canvas.height = layout.pageHeight;
  const context = canvas.getContext("2d");
  const pages = [];
  let currentPage = [];
  let currentHeight = 0;
  const usableHeight = layout.pageHeight - layout.contentTop - layout.contentBottom;

  blocks.forEach((block) => {
    const blockHeight = getCanvasBlockHeight(context, block, layout);

    if (currentPage.length && currentHeight + blockHeight > usableHeight) {
      pages.push(currentPage);
      currentPage = [];
      currentHeight = 0;
    }

    currentPage.push(block);
    currentHeight += blockHeight;
  });

  if (currentPage.length) {
    pages.push(currentPage);
  }

  return pages.length ? pages : [[]];
}

function getCanvasBlockHeight(context, block, layout) {
  switch (block.role) {
    case "grand-score": {
      setCanvasFont(context, 400, 10.4, PDF_UI_FONT_STACK);
      const lines = wrapCanvasText(context, block.note, layout.pageWidth - layout.marginLeft - layout.marginRight - 188);
      return Math.max(92, 54 + lines.length * 12);
    }
    case "section":
      return 28;
    case "key-value": {
      setCanvasFont(context, 400, 10.8, PDF_UI_FONT_STACK);
      const lines = wrapCanvasText(context, block.value, layout.pageWidth - layout.marginLeft - layout.marginRight - 160);
      return Math.max(20, lines.length * 14 + 4);
    }
    case "body": {
      setCanvasFont(context, 400, 11.1, PDF_UI_FONT_STACK);
      return Math.max(17, wrapCanvasText(context, block.text, layout.pageWidth - layout.marginLeft - layout.marginRight).length * 15);
    }
    case "body-strong": {
      setCanvasFont(context, 700, 12.2, PDF_SERIF_FONT_STACK);
      return Math.max(20, wrapCanvasText(context, block.text, layout.pageWidth - layout.marginLeft - layout.marginRight).length * 16);
    }
    case "bullet": {
      setCanvasFont(context, 400, 11.1, PDF_UI_FONT_STACK);
      return Math.max(17, wrapCanvasText(context, block.text, layout.pageWidth - layout.marginLeft - layout.marginRight - 14).length * 15);
    }
    case "footer-note": {
      setCanvasFont(context, 400, 10, PDF_UI_FONT_STACK);
      return Math.max(18, wrapCanvasText(context, block.text, layout.pageWidth - layout.marginLeft - layout.marginRight).length * 13);
    }
    case "spacer":
      return block.size || 8;
    default:
      return 16;
  }
}

function renderReportPageImage(blocks, layout, pageIndex, totalPages) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(layout.pageWidth * PDF_CANVAS_SCALE);
  canvas.height = Math.round(layout.pageHeight * PDF_CANVAS_SCALE);
  const context = canvas.getContext("2d");
  let y = layout.pageHeight - layout.contentTop;

  context.scale(PDF_CANVAS_SCALE, PDF_CANVAS_SCALE);
  context.__pageHeight = layout.pageHeight;
  context.textBaseline = "alphabetic";
  context.textAlign = "left";

  drawCanvasPageBackground(context, layout);
  drawCanvasHeader(context, layout, pageIndex === 0);

  blocks.forEach((block) => {
    switch (block.role) {
      case "grand-score":
        drawCanvasGrandScore(context, block, layout, y);
        y -= getCanvasBlockHeight(context, block, layout);
        break;
      case "section":
        drawCanvasSectionHeading(context, block.text, layout, y);
        y -= getCanvasBlockHeight(context, block, layout);
        break;
      case "key-value":
        drawCanvasKeyValueLine(context, block, layout, y);
        y -= getCanvasBlockHeight(context, block, layout);
        break;
      case "body":
        drawCanvasWrappedText(context, block.text, layout.marginLeft, y, layout.pageWidth - layout.marginLeft - layout.marginRight, 15, 11.1, PDF_UI_FONT_STACK, "#1f1f1f");
        y -= getCanvasBlockHeight(context, block, layout);
        break;
      case "body-strong":
        drawCanvasWrappedText(context, block.text, layout.marginLeft, y, layout.pageWidth - layout.marginLeft - layout.marginRight, 16, 12.2, PDF_SERIF_FONT_STACK, "#8f0c5d", 700);
        y -= getCanvasBlockHeight(context, block, layout);
        break;
      case "bullet":
        if (block.bullet) {
          drawCanvasText(context, block.bullet, layout.marginLeft, y, 12, PDF_UI_FONT_STACK, "#d5631d", 700);
        }
        drawCanvasWrappedText(context, block.text, layout.marginLeft + 14, y, layout.pageWidth - layout.marginLeft - layout.marginRight - 14, 15, 11.1, PDF_UI_FONT_STACK, "#1f1f1f");
        y -= getCanvasBlockHeight(context, block, layout);
        break;
      case "footer-note":
        drawCanvasWrappedText(context, block.text, layout.marginLeft, y, layout.pageWidth - layout.marginLeft - layout.marginRight, 13, 10, PDF_UI_FONT_STACK, "#383838");
        y -= getCanvasBlockHeight(context, block, layout);
        break;
      case "spacer":
        y -= getCanvasBlockHeight(context, block, layout);
        break;
      default:
        y -= getCanvasBlockHeight(context, block, layout);
        break;
    }
  });

  drawCanvasFooter(context, layout, pageIndex, totalPages);
  return {
    width: canvas.width,
    height: canvas.height,
    bytes: dataUrlToBytes(canvas.toDataURL("image/jpeg", 0.96))
  };
}

function drawCanvasPageBackground(context, layout) {
  context.fillStyle = "#fefbf4";
  context.fillRect(0, 0, layout.pageWidth, layout.pageHeight);
  strokeCanvasRect(context, 24, 22, layout.pageWidth - 48, layout.pageHeight - 44, "#ca8b38", 1);
  strokeCanvasRect(context, 32, 30, layout.pageWidth - 64, layout.pageHeight - 60, "#e1c79d", 0.5);
}

function drawCanvasHeader(context, layout, isFirstPage) {
  if (isFirstPage) {
    drawCanvasCenteredText(context, "Shri Ganeshaya Namah", layout, layout.pageHeight - 68, 11, PDF_SERIF_FONT_STACK, "#8f400f", 700);
    drawCanvasCenteredText(context, "AI Pandit Ji", layout, layout.pageHeight - 103, 20, PDF_SERIF_FONT_STACK, "#2e4050", 700);
    drawCanvasCenteredText(context, getReportText("pdfTitle") || "Easy Match Report", layout, layout.pageHeight - 125, 11.4, PDF_UI_FONT_STACK, "#67747a");
    drawCanvasHeaderDivider(context, layout, layout.pageHeight - 157);
    return;
  }

  drawCanvasText(context, `AI Pandit Ji ${getReportText("pdfTitle") || "Easy Match Report"}`, layout.marginLeft, layout.pageHeight - 72, 13.4, PDF_SERIF_FONT_STACK, "#2e4050", 700);
  drawCanvasHeaderDivider(context, layout, layout.pageHeight - 84);
}

function drawCanvasGrandScore(context, block, layout, y) {
  const width = layout.pageWidth - layout.marginLeft - layout.marginRight;
  const height = Math.max(72, getCanvasBlockHeight(context, block, layout) - 20);
  const left = layout.marginLeft;
  const bottom = y - (height - 4);

  fillCanvasRect(context, left, bottom, width, height, "#ffffff");
  strokeCanvasRect(context, left, bottom, width, height, "#ca8b38", 1);
  fillCanvasRect(context, left, bottom + height - 22, width, 22, "#eee7cf");

  drawCanvasText(context, block.label, left + 14, bottom + 56, 10.2, PDF_UI_FONT_STACK, "#8f400f", 700);
  drawCanvasText(context, block.value, left + 14, bottom + 29, 24, PDF_SERIF_FONT_STACK, "#2e4050", 700);
  drawCanvasWrappedText(context, block.note, left + 170, bottom + 43, width - 188, 12, 10.4, PDF_UI_FONT_STACK, "#485056");
  drawCanvasText(context, getReportText("shortSummary") || translateResultText("Quick summary"), left + width - 102, bottom + 56, 9.2, PDF_UI_FONT_STACK, "#8f400f", 700, "right");
}

function drawCanvasSectionHeading(context, text, layout, y) {
  drawCanvasText(context, text, layout.marginLeft, y, 12.3, PDF_UI_FONT_STACK, "#2e4050", 700);
  context.strokeStyle = "#ca8b38";
  context.lineWidth = 0.8;
  context.beginPath();
  context.moveTo(layout.marginLeft, canvasPdfY(context, y - 7));
  context.lineTo(layout.pageWidth - layout.marginRight, canvasPdfY(context, y - 7));
  context.stroke();
}

function drawCanvasKeyValueLine(context, block, layout, y) {
  const dividerX = layout.marginLeft + 140;
  const valueX = dividerX + 10;
  const maxWidth = layout.pageWidth - layout.marginRight - valueX;

  drawCanvasText(context, String(block.label), layout.marginLeft, y, 10.5, PDF_UI_FONT_STACK, "#8f400f", 700);
  drawCanvasText(context, ":", dividerX, y, 10.5, PDF_UI_FONT_STACK, "#8f400f", 700);
  drawCanvasWrappedText(context, String(block.value), valueX, y, maxWidth, 14, 10.8, PDF_UI_FONT_STACK, "#1f1f1f");
}

function drawCanvasFooter(context, layout, pageIndex, totalPages) {
  drawCanvasCenteredText(context, `AI Pandit Ji  |  Page ${pageIndex + 1} of ${totalPages}`, layout, 34, 9.2, PDF_UI_FONT_STACK, "#6b7378");
}

function drawCanvasHeaderDivider(context, layout, y) {
  context.strokeStyle = "#ca8b38";
  context.lineWidth = 0.9;
  context.beginPath();
  context.moveTo(layout.marginLeft, canvasPdfY(context, y));
  context.lineTo(layout.pageWidth - layout.marginRight, canvasPdfY(context, y));
  context.stroke();
}

function drawCanvasWrappedText(context, text, x, baselineY, maxWidth, lineHeight, fontSize, fontFamily, color, weight = 400) {
  setCanvasFont(context, weight, fontSize, fontFamily);
  context.fillStyle = color;
  wrapCanvasText(context, text, maxWidth).forEach((line, index) => {
    context.fillText(line, x, canvasPdfY(context, baselineY - index * lineHeight));
  });
}

function drawCanvasCenteredText(context, text, layout, y, fontSize, fontFamily, color, weight = 400) {
  setCanvasFont(context, weight, fontSize, fontFamily);
  context.fillStyle = color;
  context.textAlign = "center";
  context.fillText(String(text), layout.pageWidth / 2, canvasPdfY(context, y));
  context.textAlign = "left";
}

function drawCanvasText(context, text, x, y, fontSize, fontFamily, color, weight = 400, align = "left") {
  setCanvasFont(context, weight, fontSize, fontFamily);
  context.fillStyle = color;
  context.textAlign = align;
  context.fillText(String(text), x, canvasPdfY(context, y));
  context.textAlign = "left";
}

function setCanvasFont(context, weight, size, family) {
  context.font = `${weight} ${size}px ${family}`;
}

function wrapCanvasText(context, text, maxWidth) {
  const lines = [];
  const paragraphs = String(text || "").split(/\n/);

  paragraphs.forEach((paragraph) => {
    const words = paragraph.split(/\s+/).filter(Boolean);

    if (!words.length) {
      lines.push("");
      return;
    }

    let current = "";

    words.forEach((word) => {
      const candidate = current ? `${current} ${word}` : word;

      if (context.measureText(candidate).width <= maxWidth) {
        current = candidate;
        return;
      }

      if (current) {
        lines.push(current);
      }

      if (context.measureText(word).width <= maxWidth) {
        current = word;
        return;
      }

      let fragment = "";
      Array.from(word).forEach((character) => {
        const fragmentCandidate = `${fragment}${character}`;
        if (fragment && context.measureText(fragmentCandidate).width > maxWidth) {
          lines.push(fragment);
          fragment = character;
        } else {
          fragment = fragmentCandidate;
        }
      });
      current = fragment;
    });

    if (current) {
      lines.push(current);
    }
  });

  return lines.length ? lines : [""];
}

function canvasPdfY(context, y) {
  return context.__pageHeight - y;
}

function fillCanvasRect(context, left, bottom, width, height, color) {
  context.fillStyle = color;
  context.fillRect(left, canvasPdfY(context, bottom) - height, width, height);
}

function strokeCanvasRect(context, left, bottom, width, height, color, lineWidth = 1) {
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.strokeRect(left, canvasPdfY(context, bottom) - height, width, height);
}

function buildImagePdf(images, pageWidth, pageHeight) {
  const objects = [];
  const kidsRefs = [];
  const pageBaseObjectNumber = 3;

  objects[0] = "<< /Type /Catalog /Pages 2 0 R >>";

  images.forEach((image, index) => {
    const pageObjectNumber = pageBaseObjectNumber + index * 3;
    const contentObjectNumber = pageObjectNumber + 1;
    const imageObjectNumber = pageObjectNumber + 2;
    const imageName = `/Im${index + 1}`;
    const imageHex = `${bytesToHex(image.bytes)}>`;
    const contentStream = `q ${pageWidth} 0 0 ${pageHeight} 0 0 cm ${imageName} Do Q`;

    kidsRefs.push(`${pageObjectNumber} 0 R`);
    objects[pageObjectNumber - 1] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << ${imageName} ${imageObjectNumber} 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`;
    objects[contentObjectNumber - 1] =
      `<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream`;
    objects[imageObjectNumber - 1] =
      `<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter [/ASCIIHexDecode /DCTDecode] /Length ${imageHex.length} >>\nstream\n${imageHex}\nendstream`;
  });

  objects[1] = `<< /Type /Pages /Kids [${kidsRefs.join(" ")}] /Count ${images.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (let index = 0; index < objects.length; index += 1) {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
  }

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new TextEncoder().encode(pdf);
}

function dataUrlToBytes(dataUrl) {
  const base64 = String(dataUrl).split(",")[1] || "";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function bytesToHex(bytes) {
  let hex = "";

  bytes.forEach((byte) => {
    hex += byte.toString(16).padStart(2, "0");
  });

  return hex;
}

function paginateReportBlocks(blocks, layout) {
  const pages = [];
  let currentPage = [];
  let currentHeight = 0;
  const usableHeight = layout.pageHeight - layout.contentTop - layout.contentBottom;

  blocks.forEach((block) => {
    const blockHeight = getBlockHeight(block);

    if (currentPage.length && currentHeight + blockHeight > usableHeight) {
      pages.push(currentPage);
      currentPage = [];
      currentHeight = 0;
    }

    currentPage.push(block);
    currentHeight += blockHeight;
  });

  if (currentPage.length) {
    pages.push(currentPage);
  }

  return pages.length ? pages : [[]];
}

function getBlockHeight(block) {
  switch (block.role) {
    case "grand-score":
      return 92;
    case "section":
      return 28;
    case "key-value":
      return Math.max(20, wrapText(block.value, 52).length * 14 + 4);
    case "body":
      return Math.max(17, wrapText(block.text, 76).length * 15);
    case "body-strong":
      return Math.max(20, wrapText(block.text, 72).length * 16);
    case "bullet":
      return Math.max(17, wrapText(block.text, 70).length * 15);
    case "footer-note":
      return Math.max(18, wrapText(block.text, 82).length * 13);
    case "spacer":
      return block.size || 8;
    default:
      return 16;
  }
}

function buildPdfContentStream(blocks, layout, pageIndex, totalPages) {
  const segments = [];
  let y = layout.pageHeight - layout.contentTop;

  segments.push(...drawPageBackground(layout));
  segments.push(...drawHeader(layout, pageIndex === 0));

  blocks.forEach((block) => {
    switch (block.role) {
      case "grand-score":
        segments.push(...drawGrandScore(block, layout, y));
        y -= getBlockHeight(block);
        break;
      case "section":
        segments.push(...drawSectionHeading(block.text, layout, y));
        y -= getBlockHeight(block);
        break;
      case "key-value":
        segments.push(...drawKeyValueLine(block, layout, y));
        y -= getBlockHeight(block);
        break;
      case "body":
        segments.push(
          ...drawWrappedTextLines(
            wrapText(block.text, 76),
            layout.marginLeft,
            y,
            15,
            "F4",
            11.1,
            [0.12, 0.12, 0.12]
          )
        );
        y -= getBlockHeight(block);
        break;
      case "body-strong":
        segments.push(
          ...drawWrappedTextLines(
            wrapText(block.text, 72),
            layout.marginLeft,
            y,
            16,
            "F3",
            12.2,
            [0.563, 0.047, 0.365]
          )
        );
        y -= getBlockHeight(block);
        break;
      case "bullet":
        if (block.bullet) {
          segments.push(...drawTextBlock(block.bullet, layout.marginLeft, y, "F2", 12, [0.835, 0.392, 0.114]));
        }
        segments.push(
          ...drawWrappedTextLines(
            wrapText(block.text, 70),
            layout.marginLeft + 14,
            y,
            15,
            "F4",
            11.1,
            [0.12, 0.12, 0.12]
          )
        );
        y -= getBlockHeight(block);
        break;
      case "footer-note":
        segments.push(
          ...drawWrappedTextLines(
            wrapText(block.text, 82),
            layout.marginLeft,
            y,
            13,
            "F4",
            10,
            [0.22, 0.22, 0.22]
          )
        );
        y -= getBlockHeight(block);
        break;
      case "spacer":
        y -= getBlockHeight(block);
        break;
      default:
        y -= getBlockHeight(block);
        break;
    }
  });

  segments.push(...drawFooter(layout, pageIndex, totalPages));
  return segments.join("\n");
}

function drawPageBackground(layout) {
  return [
    "q",
    "0.996 0.984 0.955 rg",
    `0 0 ${layout.pageWidth} ${layout.pageHeight} re f`,
    ...drawSimpleReportFrame(layout),
    "Q"
  ];
}

function drawHeader(layout, isFirstPage) {
  if (isFirstPage) {
    return [
      ...drawCenteredText("Shri Ganeshaya Namah", layout, layout.pageHeight - 68, "F3", 11, [0.56, 0.25, 0.06]),
      ...drawCenteredText("AI Pandit Ji", layout, layout.pageHeight - 103, "F3", 20, [0.18, 0.25, 0.31]),
      ...drawCenteredText(getReportText("pdfTitle") || "Easy Match Report", layout, layout.pageHeight - 125, "F4", 11.4, [0.42, 0.45, 0.48]),
      ...drawHeaderDivider(layout, layout.pageHeight - 157)
    ];
  }

  return [
    ...drawTextBlock(`AI Pandit Ji ${getReportText("pdfTitle") || "Easy Match Report"}`, layout.marginLeft, layout.pageHeight - 72, "F3", 13.4, [0.18, 0.25, 0.31]),
    ...drawHeaderDivider(layout, layout.pageHeight - 84)
  ];
}

function drawGrandScore(block, layout, y) {
  const width = layout.pageWidth - layout.marginLeft - layout.marginRight;
  const height = 72;
  const left = layout.marginLeft;
  const bottom = y - 68;

  return [
    "q",
    "1 1 1 rg",
    `${left} ${bottom} ${width} ${height} re f`,
    "0.79 0.55 0.22 RG",
    "1 w",
    `${left} ${bottom} ${width} ${height} re S`,
    "0.93 0.89 0.8 rg",
    `${left} ${bottom + height - 22} ${width} 22 re f`,
    "Q",
    ...drawTextBlock(block.label, left + 14, bottom + 56, "F2", 10.2, [0.56, 0.25, 0.06]),
    ...drawTextBlock(block.value, left + 14, bottom + 29, "F3", 24, [0.18, 0.25, 0.31]),
    ...drawWrappedTextLines(
      wrapText(block.note, 42),
      left + 170,
      bottom + 43,
      12,
      "F4",
      10.4,
      [0.28, 0.31, 0.34]
    ),
    ...drawTextBlock(getReportText("shortSummary") || translateResultText("Quick summary"), left + width - 100, bottom + 56, "F2", 9.2, [0.56, 0.25, 0.06])
  ];
}

function drawSectionHeading(text, layout, y) {
  return [
    ...drawTextBlock(text, layout.marginLeft, y, "F2", 12.3, [0.18, 0.25, 0.31]),
    "q",
    "0.79 0.55 0.22 RG",
    "0.8 w",
    `${layout.marginLeft} ${y - 7} m ${layout.pageWidth - layout.marginRight} ${y - 7} l S`,
    "Q"
  ];
}

function drawKeyValueLine(block, layout, y) {
  const dividerX = layout.marginLeft + 140;
  const valueX = dividerX + 10;
  const valueLines = wrapText(block.value, 52);
  const segments = [
    ...drawTextBlock(`${block.label}`, layout.marginLeft, y, "F2", 10.5, [0.56, 0.25, 0.06]),
    ...drawTextBlock(":", dividerX, y, "F2", 10.5, [0.56, 0.25, 0.06])
  ];

  valueLines.forEach((line, index) => {
    segments.push(...drawTextBlock(line, valueX, y - index * 14, "F4", 10.8, [0.12, 0.12, 0.12]));
  });

  return segments;
}

function drawFooter(layout, pageIndex, totalPages) {
  const y = 34;
  return [
    ...drawCenteredText(`AI Pandit Ji  |  Page ${pageIndex + 1} of ${totalPages}`, layout, y, "F4", 9.2, [0.42, 0.45, 0.48])
  ];
}

function drawSimpleReportFrame(layout) {
  const left = 24;
  const bottom = 22;
  const width = layout.pageWidth - 48;
  const height = layout.pageHeight - 44;
  return [
    "0.79 0.55 0.22 RG",
    "1 w",
    `${left} ${bottom} ${width} ${height} re S`,
    "0.88 0.78 0.61 RG",
    "0.5 w",
    `${left + 8} ${bottom + 8} ${width - 16} ${height - 16} re S`
  ];
}

function drawHeaderDivider(layout, y) {
  return [
    "q",
    "0.79 0.55 0.22 RG",
    "0.9 w",
    `${layout.marginLeft} ${y} m ${layout.pageWidth - layout.marginRight} ${y} l S`,
    "Q"
  ];
}

function drawWrappedTextLines(lines, x, startY, lineHeight, fontName, fontSize, rgb) {
  return lines.flatMap((line, index) =>
    drawTextBlock(line, x, startY - index * lineHeight, fontName, fontSize, rgb)
  );
}

function drawCenteredText(text, layout, y, fontName, fontSize, rgb) {
  const safeText = asciiSafe(text);
  const approxWidth = safeText.length * fontSize * 0.28;
  const x = (layout.pageWidth - approxWidth) / 2;
  return drawTextBlock(safeText, roundOne(x), y, fontName, fontSize, rgb);
}

function drawTextBlock(text, x, y, fontName, fontSize, rgb) {
  const safeLine = pdfEscape(asciiSafe(text));
  return [
    "BT",
    `/${fontName} ${fontSize} Tf`,
    `${rgb[0]} ${rgb[1]} ${rgb[2]} rg`,
    `1 0 0 1 ${x} ${y} Tm`,
    `(${safeLine}) Tj`,
    "ET"
  ];
}

function asciiSafe(text) {
  return String(text).replace(/[^\x20-\x7E]/g, "?");
}

function pdfEscape(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function slugifyFilePart(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24) || "report";
}

function cleanFileNameText(value) {
  return String(value)
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "")
    .replace(/\s+/g, " ")
    .trim() || "Name";
}

function buildOverallNarrative(result) {
  return `${getReportText("styleLabel") || "Style"}: ${getLocalizedTraditionLabel(result.selected.mode)}.`;
}

function usesEphemerisBirthMode(result) {
  return [result.profileA, result.profileB].some((profile) =>
    (profile.chartBasis || []).some((part) => part.includes("Ephemeris-backed"))
  );
}

function renderMiddleNumbers(result) {
  const middleNumbers = document.getElementById("middleNumbers");
  const harmony = buildHarmonyBadges(result.profileA.middleNumbers, result.profileB.middleNumbers);

  middleNumbers.innerHTML = `
    ${buildMiddleCard(result.input.personA.name, result.profileA)}
    ${buildMiddleCard(result.input.personB.name, result.profileB)}
    <article class="middle-card">
      <p>${escapeHtml(translateResultText("Pair Harmony"))}</p>
      <strong>${Math.round(result.middleHarmony * 100)}%</strong>
      <div class="middle-badges">${harmony}</div>
    </article>
  `;
}

function renderDecisionCards(result, localizedDecision = getLocalizedDecision(result.decision)) {
  const decisionCards = document.getElementById("decisionCards");
  const highlights = getMainResultHighlights(result);
  decisionCards.innerHTML = `
    <article class="decision-card wide">
      <p>${escapeHtml(getReportText("mainResultLabel") || "Main Result")}</p>
      <span class="decision-tag tone-${escapeHtml(result.decision.tone)}">${escapeHtml(localizedDecision.guideRange)}</span>
      <strong>${escapeHtml(localizedDecision.headline)}</strong>
      <div class="decision-points">
        <div class="decision-point">
          <span>${escapeHtml(getReportText("matchLevel") || "Match Level")}</span>
          <strong>${escapeHtml(localizedDecision.guideLabel)}</strong>
        </div>
        <div class="decision-point">
          <span>${escapeHtml(getReportText("nextStepLabel") || "Next Step")}</span>
          <strong>${escapeHtml(localizedDecision.actionLabel)}</strong>
        </div>
        <div class="decision-point">
          <span>${escapeHtml(getReportText("sectionCareTitle") || "Care Points")}</span>
          <strong>${escapeHtml(highlights.caution ? highlights.caution.label : "-")}</strong>
        </div>
      </div>
      <p class="decision-note">${escapeHtml(localizedDecision.thresholdText)}</p>
      ${highlights.support ? `<p class="decision-meta">${escapeHtml(getReportText("sectionGoodTitle") || "Good Signs")}: ${escapeHtml(highlights.support.label)}</p>` : ""}
    </article>
  `;
}

function buildMiddleCard(name, profile) {
  const badges = NAMES.middle
    .map(({ key, label }) => `<span class="middle-badge">${translateResultText(label)}: ${profile.middleNumbers[key]}</span>`)
    .join("");
  const primaryLabel = profile.sourceMode === "chart"
    ? formatTranslatedValue("Lagna", profile.lagnaName)
    : formatTranslatedValue("Match Rashi", profile.zodiacName);
  const uiMeta = profile.sourceMode === "birth"
    ? buildBirthUiMeta(profile)
    : (profile.displayMeta || profile.nakshatraName);

  return `
    <article class="middle-card">
      <p>${escapeHtml(name)}</p>
      ${primaryLabel ? `<strong>${escapeHtml(primaryLabel)}</strong>` : ""}
      ${uiMeta ? `<p class="middle-meta">${escapeHtml(uiMeta)}</p>` : ""}
      <div class="middle-badges">${badges}</div>
    </article>
  `;
}

function renderChartBasis(result) {
  const basisGrid = document.getElementById("chartBasisGrid");
  const roleLabels = getRoleDetailLabels(result.input);
  basisGrid.innerHTML = [result.profileA, result.profileB]
    .map(
      (profile, index) => {
        const person = index === 0 ? result.input.personA : result.input.personB;
        const detailLines = buildPersonDetailLines(person, profile);

        return `
        <article class="basis-card">
          <p>${index === 0 ? roleLabels.personA : roleLabels.personB}</p>
          <strong>${escapeHtml(person.name || (index === 0 ? roleLabels.personA : roleLabels.personB))}</strong>
          ${detailLines.map((line) => `<p class="basis-meta">${escapeHtml(line)}</p>`).join("")}
        </article>
      `;
      }
    )
    .join("");
}

function buildPersonDetailLines(person, profile) {
  if (!person || !profile) {
    return [];
  }

  if (profile.sourceMode === "chart") {
    return [
      formatDetailLine("Lagna Sign", getIndexedName(NAMES.zodiac, person.lagna) || profile.lagnaName),
      formatDetailLine("Moon Sign", getIndexedName(NAMES.zodiac, person.moon) || profile.zodiacName),
      formatDetailLine("Nakshatra", getIndexedName(NAMES.nakshatra, person.nakshatra) || profile.nakshatraName),
      formatDetailLine("Mind Number", person.mind),
      formatDetailLine("Home Number", person.home),
      formatDetailLine("Purpose Number", person.purpose),
      formatDetailLine("Mars House", person.marsHouse)
    ].filter(Boolean);
  }

  const inputRashi = getIndexedName(NAMES.zodiac, person.rashi);
  const inputNakshatra = getIndexedName(NAMES.nakshatra, person.nakshatraOverride);

  return [
    formatDetailLine("Date of Birth", person.date),
    formatDetailLine("Time of Birth", person.time),
    formatDetailLine("Birth Place", person.place),
    formatDetailLine(inputRashi ? "Rashi / Moon Sign" : "Used Match Rashi", inputRashi || profile.zodiacName),
    formatDetailLine(inputNakshatra ? "Nakshatra" : "Used Match Nakshatra", inputNakshatra || profile.nakshatraName)
  ].filter(Boolean);
}

function renderKundaliCreation(result) {
  const section = document.getElementById("resultKundaliSection");
  const grid = document.getElementById("kundaliCreationGrid");

  if (!section || !grid) {
    return;
  }

  const roleLabels = getRoleDetailLabels(result.input);
  const cards = [
    buildKundaliCreationCard(roleLabels.personA, result.input.personA, result.profileA),
    buildKundaliCreationCard(roleLabels.personB, result.input.personB, result.profileB)
  ].filter(Boolean);

  if (!cards.length) {
    section.classList.add("hidden");
    section.style.display = "none";
    grid.innerHTML = "";
    return;
  }

  section.classList.remove("hidden");
  section.style.display = "";
  grid.innerHTML = cards.join("");
}

function buildKundaliCreationCard(roleLabel, person, profile) {
  if (!person || !profile) {
    return "";
  }

  const name = person.name || roleLabel;
  const sourceLabel = getKundaliSourceLabel(profile);
  const coreItems = buildKundaliCoreItems(profile);
  const metaChips = buildKundaliMetaChips(profile);
  const planetChips = buildKundaliPlanetChips(profile.planets);
  const hasBoard = Array.isArray(profile.houses) && profile.houses.length > 0;
  const bodyHtml = hasBoard
    ? buildKundaliBoard(profile, coreItems)
    : `<div class="kundali-core kundali-core-solo">${buildKundaliCoreMarkup(coreItems)}</div>`;

  return `
    <article class="kundali-card">
      <div class="kundali-card-head">
        <div>
          <p>${escapeHtml(roleLabel)}</p>
          <strong>${escapeHtml(name)}</strong>
        </div>
        <span class="kundali-source-tag">${escapeHtml(sourceLabel)}</span>
      </div>
      ${bodyHtml}
      ${metaChips.length ? `<div class="kundali-meta-chips">${metaChips.map((chip) => `<span class="kundali-chip">${chip}</span>`).join("")}</div>` : ""}
      ${planetChips.length ? `<div class="kundali-planet-chips">${planetChips.map((chip) => `<span class="kundali-chip">${chip}</span>`).join("")}</div>` : ""}
    </article>
  `;
}

function getKundaliSourceLabel(profile) {
  if (!profile) {
    return "";
  }

  return profile.sourceMode === "chart"
    ? translateResultText("Chart values supplied")
    : translateResultText("Generated from birth details");
}

function buildKundaliCoreItems(profile) {
  return [
    { label: translateResultText("Lagna"), value: profile.lagnaName },
    { label: translateResultText("Rashi"), value: profile.zodiacName },
    { label: translateResultText("Nakshatra"), value: profile.nakshatraName },
    {
      label: translateResultText("Mars House"),
      value: profile.marsHouse ? `H${profile.marsHouse}` : null
    }
  ].filter((item) => item.value);
}

function buildKundaliCoreMarkup(coreItems) {
  return coreItems
    .map(
      (item) => `
        <div class="kundali-core-item">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
        </div>
      `
    )
    .join("");
}

function buildKundaliBoard(profile, coreItems) {
  const houseMap = new Map(
    (profile.houses || [])
      .filter((house) => house && Number.isFinite(Number(house.house)))
      .map((house) => [Number(house.house), house])
  );
  const planetsByHouse = groupPlanetsByHouse(profile.planets);
  const houseCells = Array.from({ length: 12 }, (_, index) => index + 1)
    .map((houseNumber) => {
      const position = KUNDALI_BOARD_POSITIONS[houseNumber];
      const house = houseMap.get(houseNumber);
      const sign = house && house.sign ? house.sign : "";
      const signIndex = sign ? getSignIndexByName(sign) : -1;
      const signNumber = signIndex >= 0 ? signIndex + 1 : null;
      const planets = planetsByHouse.get(houseNumber) || [];
      const houseClass = getOdiaKundaliHouseClass(houseNumber);

      return `
        <div class="kundali-house ${houseClass}" style="grid-column:${position.column};grid-row:${position.row};">
          <div class="kundali-house-top">
            <small>H${houseNumber}</small>
            ${signNumber ? `<em class="kundali-sign-number">${signNumber}</em>` : ""}
          </div>
          ${sign ? `<strong>${escapeHtml(sign)}</strong>` : ""}
          ${planets.length ? `<div class="kundali-house-planets">${escapeHtml(planets.join(" "))}</div>` : ""}
        </div>
      `;
    })
    .join("");

  return `
    <div class="kundali-board odia-kundali-board">
      ${houseCells}
      <div class="kundali-center odia-kundali-center">
        <span>${escapeHtml(translateResultText("Created Kundali"))}</span>
        <div class="kundali-core">
          ${buildKundaliCoreMarkup(coreItems)}
        </div>
      </div>
    </div>
  `;
}

function getOdiaKundaliHouseClass(houseNumber) {
  switch (houseNumber) {
    case 12:
      return "odia-house-diag-tl";
    case 3:
      return "odia-house-diag-tr";
    case 9:
      return "odia-house-diag-bl";
    case 6:
      return "odia-house-diag-br";
    default:
      return "";
  }
}

function groupPlanetsByHouse(planets) {
  const map = new Map();

  PLANET_KEYS.forEach((planet) => {
    const data = planets && planets[planet];
    const house = data && Number.isFinite(Number(data.house)) ? Number(data.house) : null;

    if (!house) {
      return;
    }

    if (!map.has(house)) {
      map.set(house, []);
    }

    map.get(house).push(PLANET_SHORT_LABELS[planet] || planet.slice(0, 2));
  });

  return map;
}

function buildKundaliMetaChips(profile) {
  const chips = [
    formatKundaliChip(translateResultText("Gana"), profile.ganaName),
    formatKundaliChip(translateResultText("Nadi"), profile.nadiName),
    formatKundaliChip(translateResultText("Yoni"), profile.yoniName),
    formatKundaliChip(translateResultText("Sign Lord"), profile.signLord),
    formatKundaliChip(translateResultText("Manglik"), simplifyManglikStatus(profile.manglikStatus))
  ].filter(Boolean);

  if (profile.navamsa && profile.navamsa.lagna) {
    chips.push(formatKundaliChip(translateResultText("Lagna Navamsa"), profile.navamsa.lagna));
  }
  if (profile.navamsa && profile.navamsa.moon) {
    chips.push(formatKundaliChip(translateResultText("Moon Navamsa"), profile.navamsa.moon));
  }
  if (profile.dasha && profile.dasha.maha) {
    chips.push(formatKundaliChip(translateResultText("Mahadasha"), profile.dasha.maha));
  }
  if (profile.dasha && profile.dasha.antar) {
    chips.push(formatKundaliChip(translateResultText("Antardasha"), profile.dasha.antar));
  }

  return chips;
}

function buildKundaliPlanetChips(planets) {
  return PLANET_KEYS
    .map((planet) => {
      const data = planets && planets[planet];
      if (!data || !data.sign) {
        return "";
      }

      const pieces = [
        PLANET_SHORT_LABELS[planet] || planet.slice(0, 2),
        data.sign,
        Number.isFinite(Number(data.degree)) ? `${Number(data.degree).toFixed(1)}deg` : "",
        data.house ? `H${data.house}` : ""
      ].filter(Boolean);

      return `<strong>${escapeHtml(pieces.join(" "))}</strong>`;
    })
    .filter(Boolean);
}

function formatKundaliChip(label, value) {
  if (!value) {
    return "";
  }

  return `${escapeHtml(label)}: <strong>${escapeHtml(value)}</strong>`;
}

function simplifyManglikStatus(status) {
  if (!status) {
    return "";
  }

  if (status.startsWith("Kuja dosha watch")) {
    return translateResultText("Kuja watch");
  }

  if (status.startsWith("No strong Kuja")) {
    return translateResultText("No strong Kuja");
  }

  return translateResultText("Not checked");
}

function getIndexedName(list, rawValue) {
  const index = Number(rawValue);
  return Number.isInteger(index) && index >= 0 && index < list.length ? list[index] : "";
}

function formatDetailLine(label, value) {
  return value ? `${label}: ${value}` : "";
}

function buildBirthUiMeta(profile) {
  return joinPresentParts([
    profile.usesUserMoonBasis
      ? `${translateResultText("Match basis")}: ${buildUserMoonBasisText(profile.usesUserRashi ? profile.zodiacName : null, profile.usesUserNakshatra ? profile.nakshatraName : null)}`
      : joinPresentParts([
        formatLabeledValue(translateResultText("Match Rashi"), profile.zodiacName),
        formatLabeledValue(translateResultText("Match Nakshatra"), profile.nakshatraName)
      ], " | "),
    translateResultText(profile.manglikStatus)
  ], " | ");
}

function summarizePlanets(planets) {
  return PLANET_KEYS
    .filter((planet) => planets && planets[planet])
    .map((planet) => {
      const data = planets[planet];
      const signPart = data.sign || "";
      const degreePart = Number.isFinite(Number(data.degree)) ? `${Number(data.degree).toFixed(1)}deg` : "";
      const housePart = data.house ? `H${data.house}` : "";
      return joinPresentParts([translateResultText(planet), signPart, degreePart, housePart], " ");
    });
}

function summarizeHouses(houses) {
  if (!houses || !houses.length) {
    return "";
  }

  return houses
    .slice(0, 6)
    .map((house) => joinPresentParts([house.house ? `${translateResultText("Houses")} ${house.house}` : "", house.sign], " "))
    .filter(Boolean)
    .join(" | ");
}

function buildHarmonyBadges(aMiddle, bMiddle) {
  return NAMES.middle
    .map(({ key, label }) => {
      const gap = Math.abs(aMiddle[key] - bMiddle[key]);
      const text = gap <= 1 ? "Very close" : gap <= 3 ? "Steady" : "Needs care";
      return `<span class="middle-badge">${translateResultText(label)}: ${translateResultText(text)}</span>`;
    })
    .join("");
}

function renderRegionalCards(result) {
  const regionalCards = document.getElementById("regionalCards");
  regionalCards.innerHTML = (result.comparisonTraditions || [result.east, result.south])
    .map(
      (tradition) => `
        <article class="regional-card ${tradition.highlight ? "highlight" : ""}">
          <p>${escapeHtml(tradition.label || getLocalizedTraditionLabel(tradition.mode))}</p>
          <strong class="regional-score">${tradition.total.toFixed(1)} / 36</strong>
          <p class="regional-note">${escapeHtml(translateResultText(tradition.note))}</p>
        </article>
      `
    )
    .join("");
}

function renderInsightsList(targetId, items) {
  document.getElementById(targetId).innerHTML = items.map((item) => `<li>${escapeHtml(translateResultText(item))}</li>`).join("");
}

function renderPriorityChecks(result) {
  document.getElementById("priorityChecks").innerHTML = result.priorityChecks
    .slice(0, 3)
    .map(
      (item) => `
        <article class="priority-card">
          <div class="priority-head">
            <p>${escapeHtml(item.label)}</p>
            <span class="priority-tag tone-${escapeHtml(item.tone)}">${escapeHtml(translateResultText(item.tag))}</span>
          </div>
          <strong>${escapeHtml(item.value)}</strong>
          <p class="priority-note">${escapeHtml(translateResultText(item.detail))}</p>
          ${item.about ? `<p class="priority-meta">${escapeHtml(getMatchCheckMetaLabel("about"))}: ${escapeHtml(item.about)}</p>` : ""}
          ${item.impact ? `<p class="priority-meta">${escapeHtml(getMatchCheckMetaLabel("impact"))}: ${escapeHtml(item.impact)}</p>` : ""}
        </article>
      `
    )
    .join("");
}

function renderBreakdown(breakdown) {
  document.getElementById("breakdownGrid").innerHTML = breakdown
    .map(
      (item) => `
        <article class="breakdown-card">
          <p>${escapeHtml(item.label)}</p>
          <strong>${item.score.toFixed(1)} / ${item.weight}</strong>
          <div class="breakdown-meta">
            <span class="weight">${escapeHtml(translateResultText(getBreakdownTone(item.normalized)))}</span>
            <span class="score">${Math.round(item.normalized * 100)}%</span>
          </div>
        </article>
      `
    )
    .join("");
}

function buildInsights(breakdown, type) {
  const sorted = [...breakdown].sort((left, right) =>
    type === "positive" ? right.normalized - left.normalized : left.normalized - right.normalized
  );
  return sorted.slice(0, 2).map((item) => buildInsightFact(item, type));
}

function buildDecisionSummary(score) {
  if (score < 21) {
    return {
      headline: "Needs more checking",
      guideRange: "Less than 21",
      guideLabel: "Weak match",
      thresholdText: "This score is below the usual safe line.",
      note: "Please check this match more deeply before deciding.",
      actionLabel: "Pause and check",
      nextStep: "See the weak points first and take a fuller horoscope review.",
      tone: "care"
    };
  }

  if (score < 27) {
    return {
      headline: "Can work, but check weak points",
      guideRange: "21 to 27",
      guideLabel: "Average match",
      thresholdText: "This match can work, but some points need care.",
      note: "Daily life may go well if the weak areas are handled properly.",
      actionLabel: "Go ahead carefully",
      nextStep: "Read the care points first and talk clearly about family and routine.",
      tone: "review"
    };
  }

  if (score < 32) {
    return {
      headline: "Good match for marriage talks",
      guideRange: "27 to 32",
      guideLabel: "Good match",
      thresholdText: "This score is in the good range.",
      note: "The match has good support overall.",
      actionLabel: "Go ahead with confidence",
      nextStep: "Use the main checks to align expectations.",
      tone: "good"
    };
  }

  return {
    headline: "Very good match",
    guideRange: "32 and above",
    guideLabel: "Very strong match",
    thresholdText: "This score is in the highest range.",
    note: "The match looks strong across the main checks.",
    actionLabel: "Use as confirmation",
    nextStep: "Read the main checks once and use this mostly as confirmation.",
    tone: "strong"
  };
}

function buildPriorityChecks(mode, breakdown, regionalGap, comparisonTraditions = []) {
  const priorityMode = getTraditionFamily(mode);
  const labelGroups = {
    east: ["Nadi", "Bhakoot", "Graha Maitri"],
    odia: ["Nadi", "Rajju", "Kuja"],
    south: ["Rajju", "Rasi Adhipathi", "Dina"],
    tamil: ["Rajju", "Rasi", "Rasi Adhipathi"],
    kerala: ["Rajju", "Deergha", "Mahendra"],
    compare: ["Long-Term Stability", "Family Direction", "Communication"]
  };
  const selectedLabels = labelGroups[priorityMode] || labelGroups.compare;
  const checks = selectedLabels
    .map((label) => findItem(breakdown, label))
    .filter(Boolean)
    .map((item) => ({
      label: item.label,
      value: `${item.score.toFixed(1)} / ${item.weight}`,
      tag: getPriorityTag(item.normalized),
      tone: getPriorityTone(item.normalized),
      detail: item.normalized >= 0.62 ? item.positiveText : item.cautionText,
      about: getMatchCheckDetail(item.label, "about"),
      impact: getMatchCheckDetail(item.label, "impact")
    }));

  const gapNormalized = regionalGap <= 2 ? 0.9 : regionalGap <= 5 ? 0.62 : 0.38;
  const [leftTradition, rightTradition] = comparisonTraditions.length
    ? comparisonTraditions
    : [{ label: "Ashtakoota" }, { label: "South Porutham" }];
  const leftLabel = leftTradition.label || "Ashtakoota";
  const rightLabel = rightTradition.label || "South Porutham";
  checks.push({
    label: "Regional Agreement",
    value: `${regionalGap.toFixed(1)} point gap`,
    tag: regionalGap <= 2 ? "Consistent" : regionalGap <= 5 ? "Noticeable gap" : "Traditions differ",
    tone: getPriorityTone(gapNormalized),
    detail:
      regionalGap <= 2
        ? `${leftLabel} and ${rightLabel} are close here, so the match looks fairly stable across the two reference styles.`
        : regionalGap <= 5
          ? `${leftLabel} and ${rightLabel} are not identical here, so review both cards before locking your conclusion.`
          : `${leftLabel} and ${rightLabel} are reading this pair differently, so the final decision should lean on the detailed checks rather than the headline score alone.`,
    about: getMatchCheckDetail("Regional Agreement", "about"),
    impact: getMatchCheckDetail("Regional Agreement", "impact")
  });

  return checks;
}

function createLineItem(label, weight, normalized, positiveText, cautionText) {
  return {
    label,
    weight,
    normalized: roundThree(clamp(normalized, 0, 1)),
    score: roundOne(clamp(normalized, 0, 1) * weight),
    positiveText,
    cautionText
  };
}

function createMergedItem(label, weight, items, positiveText, cautionText) {
  const validItems = items.filter(Boolean);
  const average = validItems.reduce((sum, item) => sum + item.normalized, 0) / Math.max(validItems.length, 1);
  return createLineItem(label, weight, average, positiveText, cautionText);
}

function findItem(items, label) {
  return items.find((item) => item.label === label);
}

function sumScore(items) {
  return roundOne(items.reduce((sum, item) => sum + item.score, 0));
}

function calculateMiddleHarmony(aMiddle, bMiddle) {
  const values = Object.keys(aMiddle).map((key) => 1 - Math.abs(aMiddle[key] - bMiddle[key]) / 8);
  return roundThree(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function ganaCompatibility(aGana, bGana) {
  const matrix = [
    [1, 0.84, 0.62],
    [0.84, 1, 0.7],
    [0.62, 0.7, 0.94]
  ];
  return matrix[aGana][bGana];
}

function scoreByDistance(first, second, maxDistance) {
  const gap = Math.abs(first - second);
  return clamp(1 - gap / Math.max(maxDistance, 1), 0.2, 1);
}

function circularDistance(first, second, size) {
  const direct = Math.abs(first - second);
  return Math.min(direct, size - direct);
}

function normalizeDegrees(value) {
  return ((value % 360) + 360) % 360;
}

function sinDeg(value) {
  return Math.sin((value * Math.PI) / 180);
}

function cosDeg(value) {
  return Math.cos((value * Math.PI) / 180);
}

function tanDeg(value) {
  return Math.tan((value * Math.PI) / 180);
}

function atan2Deg(y, x) {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

function solveKepler(meanAnomaly, eccentricity) {
  let E = meanAnomaly + (180 / Math.PI) * eccentricity * sinDeg(meanAnomaly) * (1 + eccentricity * cosDeg(meanAnomaly));
  for (let index = 0; index < 5; index += 1) {
    E = E - (E - (180 / Math.PI) * eccentricity * sinDeg(E) - meanAnomaly) / (1 - eccentricity * cosDeg(E));
  }
  return E;
}

function buildPairKey(first, second) {
  return [String(first), String(second)].sort().join("|");
}

function normalizeMiddleNumber(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return 1;
  }
  return clamp(Math.round(numeric), 1, 9);
}

function sumChars(value) {
  const cleaned = String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) || 1;
}

function digitalRoot(value) {
  let current = Math.abs(value);
  while (current > 9) {
    current = current
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return current === 0 ? 9 : current;
}

function positiveMod(value, modulo) {
  return ((value % modulo) + modulo) % modulo;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function roundOne(value) {
  return Math.round(value * 10) / 10;
}

function roundThree(value) {
  return Math.round(value * 1000) / 1000;
}

function hasAstronomyEngine() {
  return typeof Astronomy !== "undefined" && Astronomy && typeof Astronomy.Equator === "function";
}

function getVerdict(score) {
  if (score >= 32) {
    return "Very Good Match";
  }
  if (score >= 27) {
    return "Good Match";
  }
  if (score >= 21) {
    return "Okay Match";
  }
  return "Needs Care";
}

function getMatchBand(score) {
  if (score >= 32) {
    return "Strong";
  }
  if (score >= 27) {
    return "Good";
  }
  if (score >= 21) {
    return "Average";
  }
  return "Careful";
}

function getBreakdownTone(normalized) {
  if (normalized >= 0.8) {
    return "Naturally supportive";
  }
  if (normalized >= 0.6) {
    return "Mostly steady";
  }
  if (normalized >= 0.45) {
    return "Needs attention";
  }
  return "Handle gently";
}

function getPriorityTag(normalized) {
  if (normalized >= 0.8) {
    return "Strong";
  }
  if (normalized >= 0.6) {
    return "Steady";
  }
  if (normalized >= 0.45) {
    return "Review";
  }
  return "Sensitive";
}

function getPriorityTone(normalized) {
  if (normalized >= 0.8) {
    return "strong";
  }
  if (normalized >= 0.6) {
    return "good";
  }
  if (normalized >= 0.45) {
    return "review";
  }
  return "care";
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
