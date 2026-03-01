import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  BookOpen,
  Star,
  Trash2,
  Search,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Quote,
} from "lucide-react";
// --- بيانات المنتجات (50 رواية وكتاب) ---
const NOVELS = [
  {
    id: 1,
    title: "Shadow Slave - المجلد الأول",
    author: "Guiltythree",
    price: 85,
    category: "فانتازيا / أكشن",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=400&h=600&fit=crop",
    description:
      "رواية خيال مظلم تحكي قصة صني، شاب يكافح للنجاة في عالم مليء بالكوابيس. ينضم إلى أكاديمية للمستيقظين ليواجه مصيره كعبد للظلال.",
    excerpt:
      "كانت السماء سوداء، ليس كظلام الليل الهادئ، بل كفراغ جائع يبتلع كل شيء. وقف صني على حافة الهاوية، يدرك تماماً أن ظله قد أصبح كياناً مستقلاً... يراقبه.",
    reviews: [
      {
        user: "أسامة",
        text: "رواية مجنونة! البطل ذكي جداً وبناء العالم أسطوري.",
        rating: 5,
      },
      { user: "سارة", text: "أفضل رواية فانتازيا قرأتها هالسنة 🔥", rating: 5 },
    ],
  },
  {
    id: 2,
    title: "Re:Zero - بداية الحياة في عالم آخر",
    author: "Tappei Nagatsuki",
    price: 60,
    category: "إيسيكاي / إثارة",
    rating: 4.8,
    image: "https://covers.openlibrary.org/b/isbn/9780316315302-L.jpg",
    description:
      "سوبارو ناتسوكي ينتقل فجأة إلى عالم خيالي ويكتشف قدرته على العودة بالزمن بعد الموت، محاولاً إنقاذ من يحب.",
    excerpt:
      "الألم... هذا كل ما شعر به قبل أن يفتح عينيه ليجد نفسه يقف أمام نفس بائع التفاح مرة أخرى. هل مات للتو؟ نعم، وهذه لم تكن المرة الأولى.",
    reviews: [
      {
        user: "خالد",
        text: "تعذيب نفسي للبطل بس القصة تشدك ما تقدر توقف.",
        rating: 5,
      },
      { user: "نورة", text: "إيميليا أفضل شخصية 🤍", rating: 4 },
    ],
  },
  {
    id: 3,
    title: "الجريمة والعقاب",
    author: "فيودور دوستويفسكي",
    price: 70,
    category: "أدب كلاسيكي",
    rating: 4.9,
    image: "https://covers.openlibrary.org/b/isbn/9780140449136-L.jpg",
    description:
      "تحفة الأدب الروسي التي تغوص في أعماق النفس البشرية وصراعها مع الشعور بالذنب بعد ارتكاب جريمة قتل مبررة فلسفياً.",
    excerpt:
      "لم يكن الفقر هو ما يدفعه للجنون، بل تلك الفكرة... الفكرة التي استوطنت عقله كطفيلي: هل يحق للرجل الاستثنائي أن يتجاوز القانون الأخلاقي من أجل غاية عظمى؟",
    reviews: [
      {
        user: "عبدالله",
        text: "كتاب ثقيل ويحتاج تركيز، بس يغير نظرتك للحياة.",
        rating: 5,
      },
      { user: "ريم", text: "دوستويفسكي طبيب نفسي مو كاتب!", rating: 5 },
    ],
  },
  {
    id: 4,
    title: "Lord of the Mysteries",
    author: "Cuttlefish",
    price: 90,
    category: "غموض / سحر",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop",
    description:
      "كلاين موريتي يستيقظ في عالم ستيمبانك مليء بالسحر والغموض، حيث يسعى لكشف أسرار العالم وتجنب الجنون.",
    excerpt:
      "فتح عينيه ليجد ثقباً دائرياً في جدار الغرفة، ورائحة البارود تزكم أنفه. نظر إلى المرآة... كان هناك ثقب رصاصة في صدغه، لكنه لا يزال يتنفس.",
    reviews: [
      {
        user: "تركي",
        text: "أعظم نظام سحر انكتب في تاريخ الروايات.",
        rating: 5,
      },
    ],
  },
  {
    id: 5,
    title: "ألف شمس ساطعة",
    author: "خالد حسيني",
    price: 55,
    category: "دراما اجتماعية",
    rating: 4.7,
    image: "https://covers.openlibrary.org/b/isbn/9781594489501-L.jpg",
    description:
      "قصة مؤثرة عن الصداقة والتضحية بين مريم وليلى، امرأتان أفغانيتان تجمع بينهما الأقدار.",
    excerpt:
      "مثل إبرة البوصلة التي تشير دائماً إلى الشمال، فإن إصبع الرجل المتهم يجد دائماً امرأة ليوجّه إليها اللوم.",
    reviews: [{ user: "لمى", text: "بكيت حرفياً وأنا أقرأها 💔", rating: 5 }],
  },
  {
    id: 6,
    title: "1984",
    author: "جورج أورويل",
    price: 45,
    category: "ديستوبيا",
    rating: 4.8,
    image: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    description:
      "الرواية الكلاسيكية التي تصور عالماً شمولياً تراقبه 'الأخ الكبير'.",
    excerpt:
      "كان يوماً بارداً ومشرقاً من أيام أبريل، وكانت الساعات تدق معلنة الثالثة عشرة.",
    reviews: [
      {
        user: "ياسر",
        text: "مرعبة لأنها قريبة جداً من الواقع اللي ممكن نعيشه.",
        rating: 5,
      },
    ],
  },
  {
    id: 7,
    title: "الخيميائي",
    author: "باولو كويلو",
    price: 40,
    category: "فانتازيا / فلسفة",
    rating: 4.6,
    image: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
    description:
      "قصة الراعي الأندلسي سانتياغو في رحلته للبحث عن كنز مدفون عند أهرامات مصر.",
    excerpt:
      "عندما ترغب في شيء ما حقاً، فإن الكون بأسره يطاوعك على تحقيق رغبتك.",
    reviews: [
      { user: "أحمد", text: "رواية خفيفة وتلهمك تتبع أحلامك.", rating: 5 },
    ],
  },
  {
    id: 8,
    title: "فن اللامبالاة",
    author: "مارك مانسون",
    price: 65,
    category: "تطوير الذات",
    rating: 4.5,
    image: "https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg",
    description: "دليل يخالف المألوف للعيش حياة جيدة.",
    excerpt:
      "لا تحاول. إن سر العيش حياة جيدة ليس في الاهتمام بأشياء أكثر، بل الاهتمام بأشياء أقل.",
    reviews: [
      {
        user: "فيصل",
        text: "كتاب يعطيك كف على وجهك ويصحيك للواقع 😂",
        rating: 5,
      },
    ],
  },
  {
    id: 9,
    title: "ثم لم يبق أحد",
    author: "أجاثا كريستي",
    price: 50,
    category: "غموض / جريمة",
    rating: 4.9,
    image: "https://covers.openlibrary.org/b/isbn/9780312330873-L.jpg",
    description:
      "عشرة أشخاص غرباء يُدعون إلى جزيرة معزولة، لتبدأ سلسلة من جرائم القتل الغامضة.",
    excerpt: "عشرة هنود صغار ذهبوا لتناول العشاء؛ اختنق واحد وبقي تسعة...",
    reviews: [
      { user: "حنان", text: "ما قدرت أنام لين خلصتها، توتر ألف!", rating: 5 },
    ],
  },
  {
    id: 10,
    title: "الكثيب (Dune)",
    author: "فرانك هربرت",
    price: 80,
    category: "خيال علمي",
    rating: 4.8,
    image: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
    description:
      "ملحمة خيال علمي تقع أحداثها في كوكب صحراوي قاحل يُدعى أراكيس.",
    excerpt: "يجب ألا أخاف. الخوف هو قاتل العقل.",
    reviews: [
      {
        user: "طارق",
        text: "بناء العالم هنا يدرس! أفضل خيال علمي انكتب.",
        rating: 5,
      },
    ],
  },
  {
    id: 11,
    title: "هاري بوتر وحجر الفيلسوف",
    author: "ج. ك. رولينج",
    price: 75,
    category: "فانتازيا / سحر",
    rating: 4.9,
    image: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
    description: "بداية رحلة الصبي اليتيم هاري بوتر الذي يكتشف أنه ساحر.",
    excerpt:
      "السيد والسيدة دورسلي، من رقم أربعة، شارع بريفيت، كانا فخورين بالقول إنهما طبيعيان تماماً.",
    reviews: [
      { user: "وليد", text: "كتاب الطفولة اللي مستحيل أمل منه ✨", rating: 5 },
    ],
  },
  {
    id: 12,
    title: "دراكولا",
    author: "برام ستوكر",
    price: 60,
    category: "رعب",
    rating: 4.7,
    image: "https://covers.openlibrary.org/b/isbn/9780486411095-L.jpg",
    description: "الرواية الكلاسيكية التي أسست لأسطورة مصاصي الدماء.",
    excerpt: "مرحباً بك في بيتي! ادخل بحرية وبمحض إرادتك.",
    reviews: [{ user: "لجين", text: "الكلاسيكية اللي ما تموت.", rating: 5 }],
  },
  {
    id: 13,
    title: "Attack on Titan - Vol. 1",
    author: "هاجيمي إيساياما",
    price: 45,
    category: "مانجا / كوميكس",
    rating: 4.9,
    image: "https://covers.openlibrary.org/b/isbn/9781612620244-L.jpg",
    description: "في عالم تتسيده عمالقة آكلة للبشر، يعيش البشر خلف أسوار ضخمة.",
    excerpt: "في ذلك اليوم، تذكرت البشرية... الرعب الذي كان يحكمها.",
    reviews: [
      {
        user: "فهد",
        text: "الرسم بالبداية غريب بس القصة تغطي على كل شيء.",
        rating: 5,
      },
    ],
  },
  {
    id: 14,
    title: "Solo Leveling - Vol. 1",
    author: "تشوجونج",
    price: 55,
    category: "مانهوا / أكشن",
    rating: 4.8,
    image: "https://covers.openlibrary.org/b/isbn/9781975319274-L.jpg",
    description:
      "جينوو سونغ، أضعف صياد في العالم، يجد نفسه في زنزانة مزدوجة سرية.",
    excerpt: "الضعف ليس خطيئة، لكن البقاء ضعيفاً هو الخطيئة الأكبر.",
    reviews: [
      {
        user: "نواف",
        text: "البطل تطوره رهيب، ما تقدر توقف قراءة.",
        rating: 5,
      },
    ],
  },
  {
    id: 15,
    title: "البؤساء",
    author: "فيكتور هوجو",
    price: 95,
    category: "أدب كلاسيكي",
    rating: 5,
    image: "https://covers.openlibrary.org/b/isbn/9780451419439-L.jpg",
    description:
      "ملحمة إنسانية تدور حول حياة السجين السابق جان فالجان ومساعيه للخلاص.",
    excerpt: "ليس هناك سوى شيء واحد يستحق أن يُعاش من أجله: أن نُحب وأن نُحب.",
    reviews: [
      { user: "زينب", text: "أعظم رواية كلاسيكية بدون منازع.", rating: 5 },
    ],
  },
  {
    id: 16,
    title: "قواعد العشق الأربعون",
    author: "إليف شافاق",
    price: 55,
    category: "تاريخ / صوفية",
    rating: 4.8,
    image: "https://covers.openlibrary.org/b/isbn/9780143117161-L.jpg",
    description: "رواية تتناول قصة لقاء جلال الدين الرومي بشمس التبريزي.",
    excerpt: "الطريق إلى الحقيقة يمر من القلب، لا من الرأس.",
    reviews: [
      { user: "أمل", text: "رواية تأخذك لعالم روحاني عجيب.", rating: 5 },
    ],
  },
  {
    id: 17,
    title: "العادات الذرية",
    author: "جيمس كلير",
    price: 65,
    category: "تطوير الذات",
    rating: 4.9,
    image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    description: "كتاب عملي يعلمك كيف تبني عادات جيدة وتتخلص من السيئة.",
    excerpt:
      "النجاح هو نتاج العادات اليومية، وليس التحولات التي تحدث مرة واحدة في العمر.",
    reviews: [
      { user: "سالم", text: "الكتاب هذا غير حياتي حرفياً.", rating: 5 },
    ],
  },
  {
    id: 18,
    title: "شيفرة دا فينشي",
    author: "دان براون",
    price: 70,
    category: "غموض / إثارة",
    rating: 4.7,
    image: "https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg",
    description: "جريمة قتل في متحف اللوفر تقود روبرت لانغدون لكشف سر تاريخي.",
    excerpt: "العقول المظلمة هي التي تملك أكبر الأسرار.",
    reviews: [{ user: "فارس", text: "إيقاع الرواية سريع جداً.", rating: 5 }],
  },
  {
    id: 19,
    title: "يوتوبيا",
    author: "أحمد خالد توفيق",
    price: 45,
    category: "ديستوبيا",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&h=600&fit=crop",
    description:
      "رواية سوداوية تتحدث عن انقسام المجتمع إلى طبقة فاحشة الثراء وطبقة معدمة.",
    excerpt: "الفقر لا يصنع أخلاقاً.. إنما يصنع لصوصاً وقتلة.",
    reviews: [
      { user: "مريم", text: "مرعبة لأنك تحس إنها ممكن تصير حقيقة.", rating: 4 },
    ],
  },
  {
    id: 20,
    title: "البداية والنهاية",
    author: "نجيب محفوظ",
    price: 50,
    category: "أدب عربي",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    description:
      "قصة عائلة مصرية من الطبقة المتوسطة تكافح للعيش بعد وفاة الأب.",
    excerpt: "الفقر قميص من نار، من يرتديه يحترق بصمت.",
    reviews: [
      { user: "سعد", text: "نجيب محفوظ يصور الواقع بطريقة عبقرية.", rating: 5 },
    ],
  },
  {
    id: 21,
    title: "مائة عام من العزلة",
    author: "غابرييل ماركيث",
    price: 85,
    category: "واقعية سحرية",
    rating: 4.9,
    image: "https://covers.openlibrary.org/b/isbn/9780060883287-L.jpg",
    description:
      "ملحمة عائلة بوينديا على مدار مائة عام في قرية ماكوندو الخيالية.",
    excerpt:
      "إن الأشياء لها حياتها الخاصة، المسألة كلها تكمن في إيقاظ أرواحها.",
    reviews: [{ user: "هيفاء", text: "القصة ساحرة بمعنى الكلمة.", rating: 4 }],
  },
  {
    id: 22,
    title: "ثلاثية غرناطة",
    author: "رضوى عاشور",
    price: 75,
    category: "رواية تاريخية",
    rating: 5,
    image: "https://covers.openlibrary.org/b/isbn/9780815609335-L.jpg",
    description:
      "رواية تسرد قصة سقوط الأندلس من خلال أجيال مختلفة لعائلة عربية.",
    excerpt: "لا يوجد ما هو أقسى من أن تعيش غريباً في وطنك.",
    reviews: [{ user: "ماجد", text: "قلم رضوى عاشور لا يعوض.", rating: 5 }],
  },
  {
    id: 23,
    title: "ظل الريح",
    author: "كارلوس زافون",
    price: 80,
    category: "غموض / سحر",
    rating: 4.8,
    image: "https://covers.openlibrary.org/b/isbn/9780143034902-L.jpg",
    description: "شاب يكتشف كتاباً غامضاً في 'مقبرة الكتب المنسية'.",
    excerpt: "كل كتاب له روح، روح من كتبه، وروح من قرأه.",
    reviews: [{ user: "عبير", text: "جو الرواية يخليك تعيش معهم.", rating: 5 }],
  },
  {
    id: 24,
    title: "أنت قوة مذهلة",
    author: "جين سينسيرو",
    price: 55,
    category: "تطوير الذات",
    rating: 4.4,
    image: "https://covers.openlibrary.org/b/isbn/9780762447695-L.jpg",
    description: "كتاب مرح ومحفز يساعدك على التخلص من الشكوك الذاتية.",
    excerpt: "أنت الشخص الوحيد القادر على تغيير مسار حياتك.",
    reviews: [{ user: "ياسمين", text: "لغتها قوية وتحمسك.", rating: 4 }],
  },
  {
    id: 25,
    title: "أبي الغني وأبي الفقير",
    author: "روبرت كيوساكي",
    price: 60,
    category: "مال وأعمال",
    rating: 4.8,
    image: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",
    description:
      "كتاب يعلمك الثقافة المالية والفرق بين عقلية الأغنياء والفقراء.",
    excerpt: "الأغنياء لا يعملون من أجل المال، بل يجعلون المال يعمل من أجلهم.",
    reviews: [
      { user: "أسامة", text: "كتاب أساسي لكل طالب يبني مستقبله.", rating: 5 },
    ],
  },
  {
    id: 26,
    title: "فئران أمي حصة",
    author: "سعود السنعوسي",
    price: 50,
    category: "دراما اجتماعية",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?w=400&h=600&fit=crop",
    description: "رواية تحذر من الفتنة الطائفية من خلال قصة أصدقاء طفولة.",
    excerpt: "الطاعون لا يفرق بين أحد، والفتنة هي طاعون العصر.",
    reviews: [{ user: "بشاير", text: "إبداع من السنعوسي.", rating: 5 }],
  },
  {
    id: 27,
    title: "عداء الطائرة الورقية",
    author: "خالد حسيني",
    price: 55,
    category: "دراما إنسانية",
    rating: 4.9,
    image: "https://covers.openlibrary.org/b/isbn/9781594631931-L.jpg",
    description: "قصة صداقة وخيانة تدور أحداثها في أفغانستان.",
    excerpt: "من أجلك، ألف مرة ومرة.",
    reviews: [{ user: "سلطان", text: "هالرواية كسرت قلبي.", rating: 5 }],
  },
  {
    id: 28,
    title: "الأمير الصغير",
    author: "أنطوان إكزوبيري",
    price: 35,
    category: "فلسفة / أطفال",
    rating: 5,
    image: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
    description: "حكاية رمزية عن طيار يلتقي بأمير صغير قادم من كوكب آخر.",
    excerpt: "لا يُرى الشيء جيداً إلا بالقلب، فالأشياء الأساسية خفية.",
    reviews: [{ user: "لانا", text: "كتاب تفهمه أكثر وأنت كبير.", rating: 5 }],
  },
  {
    id: 29,
    title: "عزاءات الفلسفة",
    author: "آلان دو بوتون",
    price: 60,
    category: "فلسفة",
    rating: 4.6,
    image: "https://covers.openlibrary.org/b/isbn/9780679779179-L.jpg",
    description: "كيف يمكن للفلسفة أن تساعدنا في التعامل مع مشاكل الحياة.",
    excerpt: "الفلسفة ليست مجرد نظريات، بل هي دواء لأمراض الروح.",
    reviews: [
      { user: "هشام", text: "يبسط الفلسفة ويخليها قابلة للتطبيق.", rating: 4 },
    ],
  },
  {
    id: 30,
    title: "حوجن",
    author: "إبراهيم عباس",
    price: 45,
    category: "فانتازيا عربية",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop",
    description: "رواية عن جني طيب يعيش في مدينة جدة يقع في حب فتاة بشرية.",
    excerpt: "نحن نعيش بينكم، نراكم ولا تروننا.",
    reviews: [{ user: "روان", text: "فكرة مجنونة وجديدة.", rating: 5 }],
  },
  {
    id: 31,
    title: "أرواح كليمنجارو",
    author: "إبراهيم نصر الله",
    price: 55,
    category: "أدب عربي",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=400&h=600&fit=crop",
    description: "مجموعة من الأشخاص ذوي الإعاقة يقررون تسلق قمة كليمنجارو.",
    excerpt: "القمة ليست في الجبل، القمة في داخلك.",
    reviews: [{ user: "عزام", text: "رواية ملهمة جداً.", rating: 5 }],
  },
  {
    id: 32,
    title: "مقتل روجر أكرويد",
    author: "أجاثا كريستي",
    price: 50,
    category: "غموض / جريمة",
    rating: 4.9,
    image: "https://covers.openlibrary.org/b/isbn/9780062073563-L.jpg",
    description: "واحدة من أذكى قضايا المحقق بوارو، مع نهاية ستصدمك.",
    excerpt: "الجميع يخفي سراً، مهمتي هي إخراج الأسرار إلى النور.",
    reviews: [{ user: "شهد", text: "أعظم نهاية رواية بوليسية.", rating: 5 }],
  },
  {
    id: 33,
    title: "عالم صوفي",
    author: "جوستاين غاردر",
    price: 75,
    category: "فلسفة / رواية",
    rating: 4.8,
    image: "https://covers.openlibrary.org/b/isbn/9780374530716-L.jpg",
    description: "تتلقى فتاة رسائل غامضة تحتوي على دروس في الفلسفة.",
    excerpt: "من نحن؟ ولماذا نحن هنا؟ هذان هما السؤالان اللذان أرقا البشرية.",
    reviews: [
      { user: "منيرة", text: "مدخل رائع جداً لعالم الفلسفة.", rating: 5 },
    ],
  },
  {
    id: 34,
    title: "الغريب",
    author: "ألبير كامو",
    price: 45,
    category: "أدب فرنسي",
    rating: 4.6,
    image: "https://covers.openlibrary.org/b/isbn/9780679720201-L.jpg",
    description: "قصة رجل يتسم باللامبالاة الشديدة تجاه كل شيء.",
    excerpt: "اليوم ماتت أمي. أو ربما البارحة، لست أدري.",
    reviews: [
      {
        user: "عبدالرحمن",
        text: "شخصية البطل مستفزة بس الرواية عميقة.",
        rating: 4,
      },
    ],
  },
  {
    id: 35,
    title: "المسخ",
    author: "فرانز كافكا",
    price: 40,
    category: "أدب كلاسيكي",
    rating: 4.7,
    image: "https://covers.openlibrary.org/b/isbn/9780553213690-L.jpg",
    description: "يستيقظ غريغور ذات صباح ليجد نفسه قد تحول إلى حشرة.",
    excerpt: "عندما استيقظ غريغور وجد نفسه قد تحول إلى حشرة هائلة.",
    reviews: [{ user: "وجدان", text: "رواية تصف اغتراب الإنسان.", rating: 5 }],
  },
  {
    id: 36,
    title: "البطل بألف وجه",
    author: "جوزيف كامبل",
    price: 70,
    category: "فلسفة",
    rating: 4.5,
    image: "https://covers.openlibrary.org/b/isbn/9781577315933-L.jpg",
    description: "دراسة في الأساطير العالمية وهيكل 'رحلة البطل'.",
    excerpt: "الكهف الذي تخشى دخوله، يحتوي على الكنز.",
    reviews: [
      { user: "زياد", text: "كتاب ضروري لأي شخص مهتم بالكتابة.", rating: 4 },
    ],
  },
  {
    id: 37,
    title: "الجحيم",
    author: "دان براون",
    price: 75,
    category: "غموض / إثارة",
    rating: 4.7,
    image: "https://covers.openlibrary.org/b/isbn/9781400079155-L.jpg",
    description: "مغامرة لانغدون في إيطاليا محاولاً فك شفرات دانتي.",
    excerpt: "أحلك الأماكن في الجحيم محجوزة لأولئك الذين يقفون على الحياد.",
    reviews: [{ user: "لميس", text: "دان براون دائماً يبهرني.", rating: 5 }],
  },
  {
    id: 38,
    title: "رجل يدعى أوف",
    author: "فريدريك باكمان",
    price: 60,
    category: "دراما كوميدية",
    rating: 4.8,
    image: "https://covers.openlibrary.org/b/isbn/9781476738024-L.jpg",
    description: "قصة رجل عجوز غاضب تتغير حياته بسبب جيران جدد.",
    excerpt: "الموت أمر غريب. الناس يعيشون وكأنه غير موجود.",
    reviews: [{ user: "هند", text: "تضحك وتبكي في نفس الوقت.", rating: 5 }],
  },
  {
    id: 39,
    title: "الأسود يليق بك",
    author: "أحلام مستغانمي",
    price: 50,
    category: "رومانسية",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?w=400&h=600&fit=crop",
    description: "قصة حب معقدة بين مليونير ومطربة شابة.",
    excerpt: "الحداد ليس في ما نرتديه، بل في ما نراه.",
    reviews: [
      { user: "رغد", text: "لغة أحلام الشعرية بطلة الرواية.", rating: 4 },
    ],
  },
  {
    id: 40,
    title: "لا تقصص رؤياك",
    author: "عبد الوهاب الحمادي",
    price: 55,
    category: "دراما اجتماعية",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
    description: "رواية كويتية تسرد تشابكات المجتمع من خلال مجموعة أصدقاء.",
    excerpt: "الأحلام أحياناً تكون رسائل، وأحياناً فخاخ.",
    reviews: [{ user: "ناصر", text: "تعكس واقعنا بشفافية.", rating: 4 }],
  },
  {
    id: 41,
    title: "العطر",
    author: "باتريك زوسكيند",
    price: 65,
    category: "رعب / إثارة",
    rating: 4.8,
    image: "https://covers.openlibrary.org/b/isbn/9780375725845-L.jpg",
    description: "قصة قاتل متسلسل يمتلك حاسة شم خارقة.",
    excerpt: "من يسيطر على الروائح، يسيطر على قلوب الناس.",
    reviews: [
      { user: "ريهام", text: "وصف الروائح يخليك تشمها فعلاً.", rating: 5 },
    ],
  },
  {
    id: 42,
    title: "فيرونيكا تقرر أن تموت",
    author: "باولو كويلو",
    price: 50,
    category: "دراما / فلسفة",
    rating: 4.5,
    image: "https://covers.openlibrary.org/b/isbn/9780060955776-L.jpg",
    description:
      "شابة تقرر الانتهاء من حياتها لتكتشف المعنى الحقيقي للحياة في مصحة.",
    excerpt: "الجنون هو عدم القدرة على إيصال أفكارك للآخرين.",
    reviews: [
      { user: "أفنان", text: "تخليك تعيد التفكير في النعم.", rating: 4 },
    ],
  },
  {
    id: 43,
    title: "الأشياء تتداعى",
    author: "تشينوا أتشيبي",
    price: 55,
    category: "أدب كلاسيكي",
    rating: 4.7,
    image: "https://covers.openlibrary.org/b/isbn/9780385474542-L.jpg",
    description: "تصوير لحياة القبائل الأفريقية قبل وبعد الاستعمار.",
    excerpt: "الرجل الذي يدعو أقاربه لوليمة لا يفعل ذلك لإنقاذهم من الجوع.",
    reviews: [
      { user: "صالح", text: "أهم رواية أفريقية ممكن تقرأها.", rating: 5 },
    ],
  },
  {
    id: 44,
    title: "سيد الخواتم",
    author: "ج. ر. ر. تولكين",
    price: 90,
    category: "فانتازيا",
    rating: 5,
    image: "https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg",
    description: "رحلة فرودو باغينز لتدمير خاتم القوة المطلقة.",
    excerpt: "ليس كل من يتجول تائهاً، وليس كل ما يلمع ذهباً.",
    reviews: [{ user: "عمار", text: "الأب الروحي للفانتازيا.", rating: 5 }],
  },
  {
    id: 45,
    title: "أغنية الجليد والنار",
    author: "جورج مارتن",
    price: 95,
    category: "فانتازيا",
    rating: 4.9,
    image: "https://covers.openlibrary.org/b/isbn/9780553593716-L.jpg",
    description: "صراع دموي وسياسي للسيطرة على العرش الحديدي.",
    excerpt: "في لعبة العروش، إما أن تنتصر أو تموت.",
    reviews: [{ user: "نواف", text: "التفاصيل تتفوق على المسلسل.", rating: 5 }],
  },
  {
    id: 46,
    title: "نادي القتال",
    author: "تشاك بولانيك",
    price: 60,
    category: "إثارة نفسية",
    rating: 4.8,
    image: "https://covers.openlibrary.org/b/isbn/9780393327342-L.jpg",
    description: "تأسيس نادي سري للتمرد على الحياة الاستهلاكية.",
    excerpt: "الأشياء التي تملكها، تنتهي بامتلاكك.",
    reviews: [
      {
        user: "أسامة",
        text: "القاعدة الأولى: لا تتحدث عن نادي القتال.",
        rating: 5,
      },
    ],
  },
  {
    id: 47,
    title: "ملائكة وشياطين",
    author: "دان براون",
    price: 70,
    category: "غموض / إثارة",
    rating: 4.7,
    image: "https://covers.openlibrary.org/b/isbn/9780671027360-L.jpg",
    description: "لانغدون يحاول إحباط مؤامرة لتدمير الفاتيكان.",
    excerpt: "العلم والدين ليسا متعارضين.",
    reviews: [{ user: "ليلى", text: "أفضل من شيفرة دافنشي بكثير.", rating: 5 }],
  },
  {
    id: 48,
    title: "طوق الحمامة",
    author: "ابن حزم الأندلسي",
    price: 45,
    category: "أدب عربي",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    description: "كتاب يبحث في علامات الحب وتفاصيله بأسلوب أدبي.",
    excerpt: "الحب أعزك الله أوله هزل وآخره جد.",
    reviews: [
      { user: "غادة", text: "يعلمك كيف كان العرب يفهمون الحب.", rating: 4 },
    ],
  },
  {
    id: 49,
    title: "سيكولوجية الجماهير",
    author: "غوستاف لوبون",
    price: 65,
    category: "علم نفس",
    rating: 4.8,
    image: "https://covers.openlibrary.org/b/isbn/9780486419565-L.jpg",
    description: "دراسة تشرح كيف يفكر القطيع البشري وكيف يمكن توجيهه.",
    excerpt: "الجماهير لا تعقل، بل تندفع بعواطفها.",
    reviews: [{ user: "طلال", text: "يعطيك وعي مخيف عن الشعوب.", rating: 5 }],
  },
  {
    id: 50,
    title: "رسائل من تحت الأرض",
    author: "فيودور دوستويفسكي",
    price: 55,
    category: "أدب كلاسيكي",
    rating: 4.7,
    image: "https://covers.openlibrary.org/b/isbn/9780679734529-L.jpg",
    description: "مذكرات رجل منعزل يعبر فيها عن أفكاره الفلسفية.",
    excerpt: "أنا رجل مريض... أنا رجل شرير.",
    reviews: [{ user: "فاطمة", text: "أعمق تحليل للنفس البشرية.", rating: 5 }],
  },
];

const CATEGORIES = ["الكل", ...new Set(NOVELS.map((novel) => novel.category))];

export default function App() {
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedNovel, setSelectedNovel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const [toast, setToast] = useState({ show: false, message: "" });
  const [isCartPop, setIsCartPop] = useState(false);
  const [isInkSplashing, setIsInkSplashing] = useState(false); // حالة أنيميشن انسكاب الحبر 🌊🖋️

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const showToastMessage = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const addToCart = (novel) => {
    const existingItem = cart.find((item) => item.id === novel.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === novel.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...novel, quantity: 1 }]);
    }
    showToastMessage(`تم إضافة "${novel.title}" للسلة بنجاح! 🛒`);
    setIsCartPop(true);
    setTimeout(() => setIsCartPop(false), 300);
  };

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // دالة انسكاب الحبر الفخمة 🌊🖋️
  const handleCategoryChange = (category) => {
    if (category === selectedCategory || isInkSplashing) return;
    setIsInkSplashing(true);
    setTimeout(() => setSelectedCategory(category), 450);
    setTimeout(() => setIsInkSplashing(false), 900);
  };

  const filteredNovels = NOVELS.filter((novel) => {
    const matchesSearch =
      novel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      novel.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "الكل" || novel.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const goToHome = () => setCurrentPage("home");
  const goToDetails = (novel) => {
    setSelectedNovel(novel);
    setCurrentPage("details");
  };
  const goToCart = () => setCurrentPage("cart");

  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-200">
      <div className="container mx-auto px-4 py-3 md:py-4 flex flex-wrap items-center justify-between gap-y-3">
        {/* اللوجو */}
        <button
          onClick={goToHome}
          className="flex items-center gap-2 text-indigo-900 hover:opacity-80 transition-opacity"
        >
          <BookOpen className="text-indigo-600 w-7 h-7 md:w-8 md:h-8" />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            مكتبة <span className="text-indigo-600">حِبر</span>
          </h1>
        </button>

        {/* أيقونة السلة (بالجوال بتصير جنب اللوجو) */}
        <button
          onClick={goToCart}
          className={`relative p-2 rounded-full transition-colors order-2 md:order-3 ${
            currentPage === "cart"
              ? "bg-indigo-100 text-indigo-600"
              : "hover:bg-stone-100 text-stone-700"
          } ${isCartPop ? "animate-cart-pop text-indigo-600" : ""}`}
        >
          <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] md:text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm animate-pulse">
              {cartCount}
            </span>
          )}
        </button>

        {/* شريط البحث (يطلع بالجوال تحت اللوجو، وباللابتوب بالنص) */}
        {currentPage === "home" && (
          <div className="w-full md:w-1/3 order-3 md:order-2 relative">
            <input
              type="text"
              placeholder="ابحث عن رواية أو كاتب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-100/80 border border-stone-200 rounded-full py-2.5 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm md:text-base"
            />
            <Search
              className="absolute right-3 top-3 text-stone-400"
              size={18}
            />
          </div>
        )}
      </div>
    </header>
  );

  const renderHome = () => (
    <div className="animate-fade-in">
      <section className="bg-indigo-900 text-white py-12 md:py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div
            className="ink-droplet left-[15%]"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="ink-droplet left-[35%]"
            style={{ animationDelay: "2.5s", width: "8px", height: "16px" }}
          ></div>
          <div
            className="ink-droplet left-[75%]"
            style={{ animationDelay: "1s", width: "14px", height: "28px" }}
          ></div>
          <div
            className="ink-droplet left-[85%]"
            style={{ animationDelay: "3.5s" }}
          ></div>
        </div>
        <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
          <span className="bg-amber-500/20 text-amber-400 px-4 py-1 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6 border border-amber-500/30">
            المشروع المدرسي الأضخم
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            عش آلاف الحيوات <br className="hidden md:block" /> مع كل صفحة تقرأها
          </h2>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 relative z-20">
        <div className="flex overflow-x-auto pb-4 mb-6 md:mb-8 gap-2 md:gap-3 hide-scrollbar relative z-30">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`whitespace-nowrap px-4 py-1.5 md:px-5 md:py-2 text-sm md:text-base rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-stone-600 border border-stone-200 hover:border-indigo-300 hover:bg-indigo-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {searchQuery && (
          <div className="mb-6 text-stone-600 text-sm md:text-base font-medium bg-indigo-50/50 p-3 md:p-4 rounded-2xl border border-indigo-100 animate-fade-in-up">
            نتائج البحث عن:{" "}
            <span className="text-indigo-700 font-bold text-base md:text-lg">
              "{searchQuery}"
            </span>
            <span className="mx-2 text-stone-300">|</span> تم العثور على{" "}
            <span className="font-bold text-indigo-600">
              {filteredNovels.length}
            </span>{" "}
            كتاب
          </div>
        )}

        {filteredNovels.length === 0 ? (
          <div className="text-center py-16 md:py-20 text-stone-500 bg-white rounded-3xl border border-stone-100 animate-scale-in mx-2">
            <BookOpen
              size={40}
              className="mx-auto mb-4 opacity-30 text-indigo-900"
            />
            <p className="text-lg md:text-xl font-medium">
              لم نجد أي رواية تطابق بحثك يا فندم!
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("الكل");
              }}
              className="mt-4 text-indigo-600 underline text-sm md:text-base"
            >
              عرض كل الروايات
            </button>
          </div>
        ) : (
          <div
            key={selectedCategory + searchQuery}
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 animate-scale-in"
          >
            {filteredNovels.map((novel, index) => (
              <div
                key={novel.id}
                onClick={() => goToDetails(novel)}
                className="bg-white rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 overflow-hidden group cursor-pointer flex flex-col transform hover:-translate-y-1 md:hover:-translate-y-2 relative animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {novel.rating >= 4.9 && (
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 bg-amber-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 rounded-full shadow-md flex items-center gap-1">
                    <Star size={10} className="fill-white hidden md:block" />{" "}
                    متميز
                  </div>
                )}
                <div className="relative h-48 md:h-72 overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center p-4 md:p-6">
                  <img
                    src={novel.image}
                    alt={novel.title}
                    className="h-full object-contain group-hover:scale-105 transition-transform duration-500 shadow-md md:shadow-xl"
                  />
                </div>
                <div className="p-3 md:p-5 flex flex-col flex-grow">
                  <p className="text-[10px] md:text-xs font-bold text-indigo-600 mb-1 md:mb-2">
                    {novel.category}
                  </p>
                  <h4 className="text-sm md:text-lg font-bold text-stone-900 line-clamp-1 mb-1">
                    {novel.title}
                  </h4>
                  <p className="text-xs md:text-sm text-stone-500 mb-2 md:mb-3">
                    {novel.author}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3 md:pt-4 border-t border-stone-100">
                    <span className="text-base md:text-xl font-black text-stone-900">
                      {novel.price}{" "}
                      <span className="text-[10px] md:text-xs font-normal text-stone-500">
                        ر.س
                      </span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(novel);
                      }}
                      className="bg-stone-100 hover:bg-indigo-600 hover:text-white text-stone-700 p-2 md:p-2.5 rounded-lg md:rounded-xl transition-colors shadow-sm"
                    >
                      <ShoppingCart size={16} className="md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );

  const renderDetails = () => (
    <main className="container mx-auto px-4 py-6 md:py-12 animate-slide-in-right">
      <button
        onClick={goToHome}
        className="flex items-center gap-2 text-stone-500 hover:text-indigo-600 mb-4 md:mb-6 transition-colors font-bold bg-white w-fit px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-stone-200 shadow-sm text-sm md:text-base"
      >
        <ArrowRight size={16} className="md:w-5 md:h-5" /> العودة للمتجر
      </button>

      <div className="bg-white rounded-3xl shadow-md border border-stone-100 overflow-hidden mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 lg:w-1/3 bg-stone-50 p-6 md:p-8 flex justify-center items-center">
            <img
              src={selectedNovel.image}
              alt={selectedNovel.title}
              className="w-48 md:w-full max-w-[250px] rounded-md shadow-2xl"
            />
          </div>
          <div className="md:w-3/5 lg:w-2/3 p-6 md:p-10 flex flex-col justify-center text-center md:text-right">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-bold mb-3 md:mb-4 w-fit mx-auto md:mx-0 border border-indigo-200">
              {selectedNovel.category}
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-stone-900 mb-2">
              {selectedNovel.title}
            </h2>
            <p className="text-lg md:text-xl text-stone-500 mb-4 md:mb-6 font-medium">
              بقلم: {selectedNovel.author}
            </p>
            <p className="text-stone-600 leading-relaxed text-sm md:text-lg mb-6 md:mb-8">
              {selectedNovel.description}
            </p>
            <div className="mt-auto flex flex-col sm:flex-row items-center gap-4 bg-stone-50 p-4 md:p-6 rounded-2xl border border-stone-100">
              <div className="text-3xl md:text-4xl font-black text-stone-900 min-w-max">
                {selectedNovel.price}{" "}
                <span className="text-sm md:text-base font-normal text-stone-500">
                  ر.س
                </span>
              </div>
              <button
                onClick={() => addToCart(selectedNovel)}
                className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg"
              >
                <ShoppingCart size={20} className="md:w-6 md:h-6" /> إضافة إلى
                السلة
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-gradient-to-br from-indigo-900 to-stone-900 rounded-3xl p-6 md:p-10 text-white shadow-lg relative overflow-hidden">
          <Quote
            size={80}
            className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-white/10 rotate-180"
          />
          <h3 className="text-lg md:text-xl font-bold text-indigo-300 mb-4 md:mb-6 flex items-center gap-2 relative z-10">
            <BookOpen size={20} className="md:w-6 md:h-6" /> نظرة من الداخل
            (اقتباس)
          </h3>
          <p className="text-base md:text-xl leading-relaxed md:leading-loose font-serif text-stone-200 relative z-10 italic">
            "{selectedNovel.excerpt}"
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-stone-100 shadow-sm">
          <h3 className="text-lg md:text-xl font-bold text-stone-900 mb-4 md:mb-6 flex items-center gap-2">
            <MessageCircle size={20} className="md:w-6 md:h-6 text-amber-500" />{" "}
            مراجعات القراء
          </h3>
          <div className="space-y-4 md:space-y-6">
            {selectedNovel.reviews.map((review, idx) => (
              <div
                key={idx}
                className="border-b border-stone-100 last:border-0 pb-4 md:pb-6 last:pb-0"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm md:text-base text-stone-800">
                    {review.user}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`md:w-3.5 md:h-3.5 ${
                          i < review.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-stone-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-stone-600 text-xs md:text-sm bg-stone-50 p-3 rounded-xl">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );

  const renderCart = () => (
    <main className="container mx-auto px-4 py-6 md:py-12 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-black text-stone-900 flex items-center gap-2 md:gap-3">
          <ShoppingCart size={28} className="text-indigo-600 md:w-8 md:h-8" />{" "}
          سلة المشتريات
        </h2>
        <button
          onClick={goToHome}
          className="text-stone-500 hover:text-indigo-600 transition-colors font-bold bg-white px-5 py-2 md:px-6 md:py-2 rounded-full border border-stone-200 shadow-sm text-sm md:text-base w-full md:w-auto text-center"
        >
          متابعة التسوق
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-10 md:p-16 flex flex-col items-center justify-center text-stone-400">
          <div className="bg-stone-50 p-6 md:p-8 rounded-full mb-4 md:mb-6">
            <ShoppingCart
              size={48}
              className="text-stone-300 md:w-16 md:h-16"
            />
          </div>
          <p className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-stone-800">
            السلة تصفر الريح!
          </p>
          <button
            onClick={goToHome}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 md:px-8 rounded-xl transition-colors mt-2 md:mt-4 text-sm md:text-base"
          >
            تصفح المتجر
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          <div className="lg:w-2/3 space-y-3 md:space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 md:gap-6 bg-white p-3 md:p-5 rounded-2xl border border-stone-100 shadow-sm relative pr-10 md:pr-12"
              >
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 text-stone-400 hover:text-rose-500 transition-colors p-2"
                >
                  <Trash2 size={20} className="md:w-6 md:h-6" />
                </button>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-24 md:w-24 md:h-32 object-contain rounded-lg bg-stone-50"
                />
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="text-sm md:text-lg font-bold text-stone-900 line-clamp-1 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[10px] md:text-sm text-stone-500 mb-2 md:mb-4">
                    {item.category}
                  </p>
                  <div className="flex justify-between items-end mt-auto">
                    <span className="text-[10px] md:text-sm bg-indigo-50 text-indigo-700 px-2 py-1 md:px-3 md:py-1 rounded-md md:rounded-lg font-bold">
                      الكمية: {item.quantity}
                    </span>
                    <span className="text-sm md:text-xl font-black text-stone-900">
                      {item.price * item.quantity} ر.س
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-stone-100 sticky top-24">
              <h3 className="text-lg md:text-xl font-bold text-stone-900 mb-4 md:mb-6 border-b border-stone-100 pb-3 md:pb-4">
                ملخص الطلب
              </h3>
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 text-sm md:text-base">
                <div className="flex justify-between text-stone-600">
                  <span>المنتجات ({cartCount}):</span>
                  <span className="font-bold text-stone-900">
                    {cartTotal} ر.س
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>التوصيل:</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 rounded">
                    مجاني للطلاب 🎓
                  </span>
                </div>
              </div>
              <div className="border-t border-stone-100 pt-4 md:pt-6 mb-6 md:mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg md:text-xl font-bold text-stone-800">
                    الإجمالي:
                  </span>
                  <span className="text-2xl md:text-3xl font-black text-indigo-700">
                    {cartTotal}{" "}
                    <span className="text-sm md:text-lg font-normal text-stone-500">
                      ر.س
                    </span>
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  alert(
                    "كفو عليك! تمت العملية بنجاح. الحين روح عز أختك بالمونتيرو يستاهلون!"
                  );
                  setCart([]);
                  goToHome();
                }}
                className="w-full bg-stone-900 hover:bg-indigo-600 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 text-sm md:text-lg"
              >
                تأكيد الطلب
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-stone-50/50 font-sans text-stone-800 flex flex-col relative overflow-hidden"
    >
      {/* تأثير انتقال طرطشة الحبر (دواية منسكبة من الزاوية) 🌊🖋️ */}
      <div className={`ink-spill-wrapper ${isInkSplashing ? "active" : ""}`}>
        <div className="splatter-drop d1"></div>
        <div className="splatter-drop d2"></div>
        <div className="splatter-drop d3"></div>
        <div className="splatter-drop d4"></div>
        <div className="splatter-drop d5"></div>
        <div className="main-spill"></div>
      </div>

      {/* تأثيرات بقع الحبر الخلفية (Blobs) 🖋️✨ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="ink-blob w-72 h-72 md:w-96 md:h-96 top-[-5%] right-[-10%] bg-indigo-900"></div>
        <div
          className="ink-blob w-[25rem] h-[25rem] md:w-[40rem] md:h-[40rem] bottom-[-10%] left-[-15%] bg-indigo-800"
          style={{ animationDelay: "-4s", animationDuration: "15s" }}
        ></div>
        <div
          className="ink-blob w-56 h-56 md:w-72 md:h-72 top-[30%] left-[10%] bg-stone-400 opacity-5"
          style={{ animationDelay: "-2s", animationDuration: "12s" }}
        ></div>
      </div>

      <div className="relative z-10 flex-grow flex flex-col min-h-screen">
        {renderHeader()}
        <div className="flex-grow">
          {currentPage === "home" && renderHome()}
          {currentPage === "details" && selectedNovel && renderDetails()}
          {currentPage === "cart" && renderCart()}
        </div>

        {/* الفوتر الرسمي والمعدل بناءً على طلبك 😎 */}
        <footer className="bg-white/90 backdrop-blur-md border-t border-stone-200 py-8 md:py-10 mt-auto text-center relative z-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center gap-2 text-stone-900 mb-4">
              <BookOpen className="text-indigo-600 w-6 h-6 md:w-8 md:h-8" />
              <h2 className="text-lg md:text-xl font-black">
                مكتبة <span className="text-indigo-600">حِبر</span>
              </h2>
            </div>

            {/* هنا مكان اسم البنت اللي نسيته يا فاهي! حطيت لك قوسين، اكتب اسمها داخلها */}
            <p className="text-stone-600 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed md:leading-loose">
              تم إعداد وتطوير هذا المشروع التقني بواسطة الطالبتين:
              <br />
              <span className="font-bold text-indigo-700 text-sm md:text-base">
                ألين عويدان
              </span>{" "}
              و{" "}
              <span className="font-bold text-indigo-700 text-sm md:text-base">
                بيلسان آل طاهر
              </span>{" "}
              ✨<br />
              مشروع علمي مقدم للمعلمة الفاضلة. جميع الحقوق محفوظة{" "}
              {new Date().getFullYear()} ©
            </p>
          </div>
        </footer>
      </div>

      {toast.show && (
        <div className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-[60] animate-bounce-short w-[90%] md:w-auto">
          <div className="bg-stone-900 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-2xl shadow-indigo-900/20 flex items-center gap-3 text-sm md:text-base">
            <CheckCircle className="text-emerald-400 w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes bounce-short { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-short { animation: bounce-short 0.5s ease-out; }
        
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; }

        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }

        @keyframes slide-in-right { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        .animate-slide-in-right { animation: slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes slide-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes cart-pop { 0% { transform: scale(1); } 50% { transform: scale(1.3) rotate(-10deg); color: #4f46e5; } 100% { transform: scale(1); } }
        .animate-cart-pop { animation: cart-pop 0.3s ease-out; }

        /* تأثيرات الحبر الخلفية (Ink Effects) 🖋️💧 */
        @keyframes ink-drop { 0% { transform: translateY(-50px) scale(1); opacity: 0; } 10% { opacity: 1; } 80% { transform: translateY(80vh) scale(1.1); opacity: 1; } 100% { transform: translateY(85vh) scale(3); opacity: 0; } }
        .ink-droplet { position: absolute; width: 6px; height: 12px; background: #4f46e5; border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; animation: ink-drop 5s infinite cubic-bezier(0.4, 0, 1, 1); box-shadow: 0 4px 6px rgba(79, 70, 229, 0.4); }
        @media (min-width: 768px) { .ink-droplet { width: 10px; height: 20px; } }

        @keyframes morph { 0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; } 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } }
        .ink-blob { position: absolute; background: linear-gradient(135deg, rgba(49, 46, 129, 0.08) 0%, rgba(79, 70, 229, 0.05) 100%); animation: morph 8s ease-in-out infinite; pointer-events: none; filter: blur(10px); }

        /* أنيميشن طرطشة الحبر للانتقالات (دواية انكبّت) 🌊 */
        .ink-spill-wrapper { position: fixed; inset: 0; pointer-events: none; z-index: 55; overflow: hidden; }
        .main-spill { position: absolute; bottom: -15vh; right: -10vw; width: 40vw; height: 40vw; min-width: 250px; min-height: 250px; background: #0f172a; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: scale(0); opacity: 0; transition: transform 0.6s cubic-bezier(0.7, 0, 0.2, 1), opacity 0.5s ease; }
        .ink-spill-wrapper.active .main-spill { transform: scale(20); opacity: 1; border-radius: 50%; }
        .splatter-drop { position: absolute; bottom: 5vh; right: 5vw; background: #0f172a; opacity: 0; transform: scale(0) translate(0, 0); transition: transform 0.5s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s ease; }
        .ink-spill-wrapper.active .splatter-drop.d1 { opacity: 1; transform: translate(-30vw, -40vh) scale(1.5) rotate(45deg); width: 15px; height: 40px; border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; }
        .ink-spill-wrapper.active .splatter-drop.d2 { opacity: 1; transform: translate(-50vw, -20vh) scale(2) rotate(70deg); width: 12px; height: 35px; border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transition-delay: 0.05s; }
        .ink-spill-wrapper.active .splatter-drop.d3 { opacity: 1; transform: translate(-20vw, -60vh) scale(1.2) rotate(20deg); width: 25px; height: 25px; border-radius: 50%; transition-delay: 0.1s; }
        .ink-spill-wrapper.active .splatter-drop.d4 { opacity: 1; transform: translate(-70vw, -50vh) scale(1.8) rotate(55deg); width: 10px; height: 30px; border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transition-delay: 0.15s; }
        .ink-spill-wrapper.active .splatter-drop.d5 { opacity: 1; transform: translate(-80vw, -15vh) scale(1) rotate(85deg); width: 20px; height: 20px; border-radius: 50%; transition-delay: 0.08s; }
      `,
        }}
      />
    </div>
  );
}
