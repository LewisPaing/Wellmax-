(function () {
  'use strict';

  var storageKey = 'wellmax-language';
  var supported = ['en', 'zh', 'th', 'my'];
  var dictionaries = {
    zh: {
      'Skip to content': '跳至主要内容', 'Menu': '菜单', 'Home': '首页', 'About': '关于我们', 'Services': '服务', 'Work': '作品', 'Insights': '洞察', 'Client portal': '客户门户', 'Start a project': '开始项目', 'Language': '语言', 'Display and language preferences': '显示与语言偏好', 'Switch to light mode': '切换到浅色模式', 'Switch to dark mode': '切换到深色模式',
      'Creative advertising & digital marketing agency across Southeast Asia': '服务东南亚的创意广告与数字营销机构', 'We make brands': '我们让品牌', 'impossible to ignore.': '令人无法忽视。',
      'Based in Yangon, we create brand strategy, visual identity, campaigns, social media, content and websites for ambitious businesses in Myanmar and beyond.': '我们立足仰光，为缅甸及海外有抱负的企业打造品牌战略、视觉识别、营销活动、社交媒体、内容与网站。',
      'Explore our work': '浏览我们的作品', 'What we do': '我们的服务', 'Selected services': '精选服务', 'Brand identity': '品牌识别', 'Campaigns': '营销活动', 'Digital': '数字营销', 'Content': '内容创作',
      'Brand strategy': '品牌战略', 'Creative design': '创意设计', 'Digital experiences': '数字体验', 'WellMax in motion': 'WellMax 正在前进', 'Growing together': '共同成长', 'Clients & users': '客户与用户', 'Creative staff': '创意团队', 'Projects delivered': '已交付项目', 'Selected collaborations': '精选合作品牌',
      '01 · Who we are': '01 · 关于我们', 'Creative thinking.': '创意思维。', 'Commercial impact.': '商业影响力。', 'WellMax brings strategy, storytelling and design together to help brands find their voice, earn attention and build meaningful connections.': 'WellMax 融合战略、叙事与设计，帮助品牌找到独特声音、赢得关注并建立有意义的连接。', 'We work as an extension of your team—from the first idea to the final launch.': '从最初创意到最终发布，我们都像您团队的一部分一样协作。', 'Meet WellMax': '认识 WellMax', 'Creative support': '创意支持', 'Core services': '核心服务', 'Dedicated team': '专属团队',
      '02 · Capabilities': '02 · 专业能力', 'Everything your brand': '品牌所需的一切', 'needs to': '助力品牌', 'take flight.': '腾飞。', 'From first impression to lasting relationship, we build connected brand experiences that perform.': '从第一印象到长期关系，我们打造连贯且高效的品牌体验。',
      'Brand Strategy & Identity': '品牌战略与识别', 'Graphic & Packaging Design': '平面与包装设计', 'Digital & Social Marketing': '数字与社交营销', 'Web Design & Content': '网站设计与内容', 'View all services': '查看全部服务',
      '03 · Selected work': '03 · 精选作品', 'Designed to make a difference.': '为产生影响而设计。', 'A selection of visual stories, campaigns and brand moments created by WellMax.': '精选 WellMax 打造的视觉故事、营销活动与品牌时刻。', 'All work': '全部作品', 'Social media': '社交媒体', 'View': '查看',
      '04 · How we work': '04 · 工作方式', 'Simple process.': '简单流程。', 'Serious momentum.': '强劲动力。', 'Discover': '探索', 'Define': '定义', 'Create': '创造', 'Launch': '发布', 'We listen, research and define what success looks like.': '我们倾听、研究并定义成功。', 'We turn insight into a focused creative direction.': '我们把洞察转化为清晰的创意方向。', 'We design, refine and build every brand touchpoint.': '我们设计、完善并打造每一个品牌触点。', 'We deliver, activate and help your idea take flight.': '我们交付、激活，让您的创意腾飞。',
      '05 · Ideas & insights': '05 · 创意与洞察', 'Good thinking, shared.': '分享好想法。', 'All insights': '全部洞察', 'Have a project in mind?': '有项目想法吗？', 'Let’s make': '让我们一起', 'something fly.': '让创意腾飞。', 'Start a conversation': '开始沟通', 'Direct contact': '直接联系', 'Email us': '联系我们',
      'About WellMax': '关于 WellMax', 'Small team.': '精干团队。', 'Big brand energy.': '强大品牌能量。', 'Our point of view': '我们的观点', 'Brands grow when ideas connect.': '当创意相连，品牌便会成长。', 'What drives us': '我们的动力', 'How we show up.': '我们的工作态度。', 'Curious': '好奇', 'Clear': '清晰', 'Brave': '勇敢', 'Together': '同行', 'Ready to move?': '准备好前进了吗？', 'Let’s build what’s next.': '让我们共创下一步。', 'Talk to us': '联系我们',
      'Built to make': '为品牌表现', 'brands perform.': '而生。', 'Capabilities': '专业能力', 'Social Media Marketing': '社交媒体营销', 'Paid Media & Email': '付费媒体与电子邮件', 'Website Design': '网站设计', 'Copy & Content': '文案与内容', 'Flexible collaboration': '灵活合作', 'One project or ongoing partnership.': '单次项目或长期合作。', 'Sprint': '冲刺项目', 'Project': '项目合作', 'Partner': '长期伙伴', 'Campaign': '整合活动', 'Have a challenge?': '有挑战吗？', 'Let’s solve it creatively.': '让我们用创意解决。',
      'Research, positioning, naming, identity design and practical brand systems.': '研究、定位、命名、识别设计及实用的品牌系统。', 'Campaigns, publications, packaging and every visual touchpoint in between.': '营销活动、出版物、包装及所有视觉触点。', 'Channel strategy, content creation, community management and reporting.': '渠道战略、内容创作、社群管理与报告。', 'Targeted campaigns that turn reach into meaningful and measurable action.': '通过精准营销，将触达转化为有意义且可衡量的行动。', 'Responsive, user-friendly digital experiences built around clear goals.': '围绕清晰目标打造响应式、易用的数字体验。', 'Brand voice, web copy and content systems that make your message land.': '打造品牌语调、网站文案和内容系统，让信息有效传达。',
      'Start a conversation': '开启对话', 'Bring us your': '把您的', 'big ambition.': '宏大愿景交给我们。', 'Email WellMax': '发送邮件给 WellMax', 'Project enquiry': '项目咨询', 'Start with a clear brief.': '从清晰的需求开始。', 'Your name': '您的姓名', 'Company or brand': '公司或品牌', 'Email address': '电子邮箱', 'Service needed': '所需服务', 'Choose a service': '选择服务', 'Approximate budget': '大致预算', 'Prefer not to say': '暂不说明', 'Tell us about the project': '请介绍您的项目', 'Prepare enquiry': '准备咨询邮件', 'Follow WellMax': '关注 WellMax',
      'WellMax insights': 'WellMax 洞察', 'Ideas for brands': '为品牌提供灵感', 'ready to move.': '助力前进。', 'Read article': '阅读文章', 'Need a creative partner?': '需要创意伙伴吗？', 'Turn insight into impact.': '让洞察转化为影响力。', 'Back to top': '返回顶部'
    },
    th: {
      'Skip to content': 'ข้ามไปยังเนื้อหา', 'Menu': 'เมนู', 'Home': 'หน้าแรก', 'About': 'เกี่ยวกับเรา', 'Services': 'บริการ', 'Work': 'ผลงาน', 'Insights': 'บทความ', 'Client portal': 'พอร์ทัลลูกค้า', 'Start a project': 'เริ่มโปรเจกต์', 'Language': 'ภาษา', 'Display and language preferences': 'การแสดงผลและภาษา', 'Switch to light mode': 'เปลี่ยนเป็นโหมดสว่าง', 'Switch to dark mode': 'เปลี่ยนเป็นโหมดมืด',
      'Creative advertising & digital marketing agency across Southeast Asia': 'เอเจนซีโฆษณาสร้างสรรค์และการตลาดดิจิทัลทั่วเอเชียตะวันออกเฉียงใต้', 'We make brands': 'เราสร้างแบรนด์ให้', 'impossible to ignore.': 'โดดเด่นจนมองข้ามไม่ได้',
      'Based in Yangon, we create brand strategy, visual identity, campaigns, social media, content and websites for ambitious businesses in Myanmar and beyond.': 'จากย่างกุ้ง เราสร้างกลยุทธ์แบรนด์ อัตลักษณ์ แคมเปญ โซเชียลมีเดีย คอนเทนต์ และเว็บไซต์ให้ธุรกิจที่มุ่งเติบโตในเมียนมาและต่างประเทศ',
      'Explore our work': 'ชมผลงานของเรา', 'What we do': 'บริการของเรา', 'Selected services': 'บริการเด่น', 'Brand identity': 'อัตลักษณ์แบรนด์', 'Campaigns': 'แคมเปญ', 'Digital': 'ดิจิทัล', 'Content': 'คอนเทนต์',
      'Brand strategy': 'กลยุทธ์แบรนด์', 'Creative design': 'งานออกแบบสร้างสรรค์', 'Digital experiences': 'ประสบการณ์ดิจิทัล', 'WellMax in motion': 'WellMax กำลังก้าวไป', 'Growing together': 'เติบโตไปด้วยกัน', 'Clients & users': 'ลูกค้าและผู้ใช้', 'Creative staff': 'ทีมครีเอทีฟ', 'Projects delivered': 'โปรเจกต์ที่ส่งมอบ', 'Selected collaborations': 'แบรนด์ที่ร่วมงาน',
      '01 · Who we are': '01 · เราคือใคร', 'Creative thinking.': 'คิดอย่างสร้างสรรค์', 'Commercial impact.': 'สร้างผลลัพธ์ทางธุรกิจ', 'WellMax brings strategy, storytelling and design together to help brands find their voice, earn attention and build meaningful connections.': 'WellMax ผสานกลยุทธ์ การเล่าเรื่อง และงานออกแบบ เพื่อช่วยให้แบรนด์ค้นพบเสียงของตน ดึงดูดความสนใจ และสร้างความสัมพันธ์ที่มีความหมาย', 'We work as an extension of your team—from the first idea to the final launch.': 'เราทำงานเสมือนเป็นส่วนหนึ่งของทีมคุณ ตั้งแต่แนวคิดแรกจนถึงวันเปิดตัว', 'Meet WellMax': 'รู้จัก WellMax', 'Creative support': 'การสนับสนุนด้านครีเอทีฟ', 'Core services': 'บริการหลัก', 'Dedicated team': 'ทีมเฉพาะของคุณ',
      '02 · Capabilities': '02 · ความเชี่ยวชาญ', 'Everything your brand': 'ทุกสิ่งที่แบรนด์ต้องการ', 'needs to': 'เพื่อพร้อม', 'take flight.': 'ทะยานไปข้างหน้า', 'From first impression to lasting relationship, we build connected brand experiences that perform.': 'ตั้งแต่ความประทับใจแรกจนถึงความสัมพันธ์ระยะยาว เราสร้างประสบการณ์แบรนด์ที่เชื่อมโยงและสร้างผลลัพธ์',
      'Brand Strategy & Identity': 'กลยุทธ์และอัตลักษณ์แบรนด์', 'Graphic & Packaging Design': 'กราฟิกและบรรจุภัณฑ์', 'Digital & Social Marketing': 'การตลาดดิจิทัลและโซเชียล', 'Web Design & Content': 'ออกแบบเว็บไซต์และคอนเทนต์', 'View all services': 'ดูบริการทั้งหมด',
      '03 · Selected work': '03 · ผลงานที่คัดสรร', 'Designed to make a difference.': 'ออกแบบเพื่อสร้างความแตกต่าง', 'A selection of visual stories, campaigns and brand moments created by WellMax.': 'เรื่องราวภาพ แคมเปญ และช่วงเวลาของแบรนด์ที่สร้างสรรค์โดย WellMax', 'All work': 'ผลงานทั้งหมด', 'Social media': 'โซเชียลมีเดีย', 'View': 'ดู',
      '04 · How we work': '04 · วิธีทำงาน', 'Simple process.': 'ขั้นตอนเรียบง่าย', 'Serious momentum.': 'ขับเคลื่อนอย่างจริงจัง', 'Discover': 'ค้นหา', 'Define': 'กำหนด', 'Create': 'สร้างสรรค์', 'Launch': 'เปิดตัว', 'We listen, research and define what success looks like.': 'เรารับฟัง วิจัย และกำหนดความสำเร็จร่วมกัน', 'We turn insight into a focused creative direction.': 'เราเปลี่ยนอินไซต์เป็นทิศทางสร้างสรรค์ที่ชัดเจน', 'We design, refine and build every brand touchpoint.': 'เราออกแบบ พัฒนา และสร้างทุกจุดสัมผัสของแบรนด์', 'We deliver, activate and help your idea take flight.': 'เราส่งมอบ เปิดใช้งาน และช่วยให้ไอเดียของคุณทะยานขึ้น',
      '05 · Ideas & insights': '05 · ไอเดียและบทความ', 'Good thinking, shared.': 'แบ่งปันความคิดที่ดี', 'All insights': 'บทความทั้งหมด', 'Have a project in mind?': 'มีโปรเจกต์ในใจไหม?', 'Let’s make': 'มาร่วมกันทำให้', 'something fly.': 'ไอเดียทะยานขึ้น', 'Start a conversation': 'เริ่มพูดคุย', 'Direct contact': 'ติดต่อโดยตรง', 'Email us': 'อีเมลหาเรา',
      'About WellMax': 'เกี่ยวกับ WellMax', 'Small team.': 'ทีมเล็ก', 'Big brand energy.': 'พลังแบรนด์ยิ่งใหญ่', 'Our point of view': 'มุมมองของเรา', 'Brands grow when ideas connect.': 'แบรนด์เติบโตเมื่อไอเดียเชื่อมโยงกัน', 'What drives us': 'สิ่งที่ขับเคลื่อนเรา', 'How we show up.': 'แนวทางการทำงานของเรา', 'Curious': 'ใฝ่รู้', 'Clear': 'ชัดเจน', 'Brave': 'กล้าแตกต่าง', 'Together': 'ร่วมมือกัน', 'Ready to move?': 'พร้อมก้าวต่อไหม?', 'Let’s build what’s next.': 'มาสร้างก้าวต่อไปด้วยกัน', 'Talk to us': 'คุยกับเรา',
      'Built to make': 'สร้างมาเพื่อให้', 'brands perform.': 'แบรนด์ทำผลงาน', 'Capabilities': 'ความเชี่ยวชาญ', 'Social Media Marketing': 'การตลาดโซเชียลมีเดีย', 'Paid Media & Email': 'สื่อแบบชำระเงินและอีเมล', 'Website Design': 'ออกแบบเว็บไซต์', 'Copy & Content': 'ข้อความและคอนเทนต์', 'Flexible collaboration': 'รูปแบบการร่วมงานที่ยืดหยุ่น', 'One project or ongoing partnership.': 'ทั้งโปรเจกต์เดียวหรือพาร์ตเนอร์ระยะยาว', 'Sprint': 'สปรินต์', 'Project': 'โปรเจกต์', 'Partner': 'พาร์ตเนอร์', 'Campaign': 'แคมเปญ', 'Have a challenge?': 'มีโจทย์ท้าทายไหม?', 'Let’s solve it creatively.': 'มาคิดทางออกอย่างสร้างสรรค์',
      'Research, positioning, naming, identity design and practical brand systems.': 'การวิจัย การวางตำแหน่ง การตั้งชื่อ การออกแบบอัตลักษณ์ และระบบแบรนด์ที่ใช้งานได้จริง', 'Campaigns, publications, packaging and every visual touchpoint in between.': 'แคมเปญ สิ่งพิมพ์ บรรจุภัณฑ์ และทุกจุดสัมผัสทางภาพ', 'Channel strategy, content creation, community management and reporting.': 'กลยุทธ์ช่องทาง การสร้างคอนเทนต์ การดูแลชุมชน และรายงานผล', 'Targeted campaigns that turn reach into meaningful and measurable action.': 'แคมเปญตรงกลุ่มที่เปลี่ยนการเข้าถึงเป็นผลลัพธ์ที่มีความหมายและวัดได้', 'Responsive, user-friendly digital experiences built around clear goals.': 'ประสบการณ์ดิจิทัลที่ตอบสนอง ใช้งานง่าย และสร้างตามเป้าหมายที่ชัดเจน', 'Brand voice, web copy and content systems that make your message land.': 'น้ำเสียงแบรนด์ ข้อความเว็บไซต์ และระบบคอนเทนต์ที่ทำให้สารของคุณเข้าถึงผู้คน',
      'Start a conversation': 'เริ่มพูดคุย', 'Bring us your': 'นำเป้าหมายใหญ่', 'big ambition.': 'ของคุณมาให้เรา', 'Email WellMax': 'อีเมลหา WellMax', 'Project enquiry': 'สอบถามโปรเจกต์', 'Start with a clear brief.': 'เริ่มด้วยบรีฟที่ชัดเจน', 'Your name': 'ชื่อของคุณ', 'Company or brand': 'บริษัทหรือแบรนด์', 'Email address': 'อีเมล', 'Service needed': 'บริการที่ต้องการ', 'Choose a service': 'เลือกบริการ', 'Approximate budget': 'งบประมาณโดยประมาณ', 'Prefer not to say': 'ยังไม่ต้องการระบุ', 'Tell us about the project': 'เล่าเกี่ยวกับโปรเจกต์', 'Prepare enquiry': 'เตรียมข้อความสอบถาม', 'Follow WellMax': 'ติดตาม WellMax',
      'WellMax insights': 'บทความจาก WellMax', 'Ideas for brands': 'ไอเดียสำหรับแบรนด์', 'ready to move.': 'ที่พร้อมก้าวต่อ', 'Read article': 'อ่านบทความ', 'Need a creative partner?': 'กำลังมองหาพาร์ตเนอร์ครีเอทีฟ?', 'Turn insight into impact.': 'เปลี่ยนอินไซต์ให้เป็นผลลัพธ์', 'Back to top': 'กลับขึ้นด้านบน'
    },
    my: {
      'Skip to content': 'အဓိကအကြောင်းအရာသို့ သွားရန်', 'Menu': 'မီနူး', 'Home': 'ပင်မစာမျက်နှာ', 'About': 'ကျွန်ုပ်တို့အကြောင်း', 'Services': 'ဝန်ဆောင်မှုများ', 'Work': 'လက်ရာများ', 'Insights': 'အတွေးအမြင်များ', 'Client portal': 'ဖောက်သည်ပေါ်တယ်', 'Start a project': 'ပရောဂျက်စတင်ရန်', 'Language': 'ဘာသာစကား', 'Display and language preferences': 'မြင်ကွင်းနှင့် ဘာသာစကားရွေးချယ်မှု', 'Switch to light mode': 'အလင်းမုဒ်သို့ ပြောင်းရန်', 'Switch to dark mode': 'အမှောင်မုဒ်သို့ ပြောင်းရန်',
      'Creative advertising & digital marketing agency across Southeast Asia': 'အရှေ့တောင်အာရှတစ်ဝှမ်း ဝန်ဆောင်မှုပေးသော ဖန်တီးမှုကြော်ငြာနှင့် ဒစ်ဂျစ်တယ်မားကတ်တင်း အေဂျင်စီ', 'We make brands': 'အမှတ်တံဆိပ်များကို', 'impossible to ignore.': 'လျစ်လျူရှုမရအောင် ဖန်တီးပေးပါသည်။',
      'Based in Yangon, we create brand strategy, visual identity, campaigns, social media, content and websites for ambitious businesses in Myanmar and beyond.': 'ရန်ကုန်အခြေစိုက် WellMax သည် မြန်မာနိုင်ငံနှင့် နိုင်ငံတကာရှိ တိုးတက်လိုသော လုပ်ငန်းများအတွက် အမှတ်တံဆိပ်မဟာဗျူဟာ၊ ပုံရိပ်၊ ကမ်ပိန်း၊ ဆိုရှယ်မီဒီယာ၊ အကြောင်းအရာနှင့် ဝဘ်ဆိုဒ်များကို ဖန်တီးပေးပါသည်။',
      'Explore our work': 'ကျွန်ုပ်တို့၏လက်ရာများ ကြည့်ရန်', 'What we do': 'ကျွန်ုပ်တို့၏ဝန်ဆောင်မှု', 'Selected services': 'ရွေးချယ်ထားသော ဝန်ဆောင်မှုများ', 'Brand identity': 'အမှတ်တံဆိပ်ပုံရိပ်', 'Campaigns': 'ကမ်ပိန်းများ', 'Digital': 'ဒစ်ဂျစ်တယ်', 'Content': 'အကြောင်းအရာ',
      'Brand strategy': 'အမှတ်တံဆိပ်မဟာဗျူဟာ', 'Creative design': 'ဖန်တီးမှုဒီဇိုင်း', 'Digital experiences': 'ဒစ်ဂျစ်တယ်အတွေ့အကြုံ', 'WellMax in motion': 'WellMax ရှေ့ဆက်နေသည်', 'Growing together': 'အတူတကွ တိုးတက်မည်', 'Clients & users': 'ဖောက်သည်နှင့် အသုံးပြုသူများ', 'Creative staff': 'ဖန်တီးမှုအဖွဲ့', 'Projects delivered': 'ပြီးစီးပရောဂျက်များ', 'Selected collaborations': 'ရွေးချယ်ထားသော ပူးပေါင်းမှုများ',
      '01 · Who we are': '01 · ကျွန်ုပ်တို့အကြောင်း', 'Creative thinking.': 'ဖန်တီးမှုအတွေး။', 'Commercial impact.': 'စီးပွားရေးအကျိုးသက်ရောက်မှု။', 'WellMax brings strategy, storytelling and design together to help brands find their voice, earn attention and build meaningful connections.': 'WellMax သည် မဟာဗျူဟာ၊ ဇာတ်လမ်းပြောခြင်းနှင့် ဒီဇိုင်းတို့ကို ပေါင်းစပ်ကာ အမှတ်တံဆိပ်များ၏ ကိုယ်ပိုင်အသံကို ရှာဖွေပြီး အာရုံစိုက်မှုနှင့် အဓိပ္ပာယ်ရှိသော ဆက်သွယ်မှုများ ရရှိစေပါသည်။', 'We work as an extension of your team—from the first idea to the final launch.': 'ပထမဆုံးအကြံအစည်မှ စတင်ဖြန့်ချိသည့်အထိ သင့်အဖွဲ့၏ အစိတ်အပိုင်းတစ်ခုကဲ့သို့ ပူးပေါင်းလုပ်ကိုင်ပါသည်။', 'Meet WellMax': 'WellMax ကို သိရှိရန်', 'Creative support': 'ဖန်တီးမှုအကူအညီ', 'Core services': 'အဓိကဝန်ဆောင်မှုများ', 'Dedicated team': 'သီးသန့်အဖွဲ့',
      '02 · Capabilities': '02 · ကျွမ်းကျင်မှုများ', 'Everything your brand': 'သင့်အမှတ်တံဆိပ်အတွက်', 'needs to': 'လိုအပ်သမျှဖြင့်', 'take flight.': 'ပျံသန်းစေမည်။', 'From first impression to lasting relationship, we build connected brand experiences that perform.': 'ပထမဆုံးအထင်အမြင်မှ ရေရှည်ဆက်ဆံရေးအထိ ထိရောက်သော အမှတ်တံဆိပ်အတွေ့အကြုံကို ဖန်တီးပေးပါသည်။',
      'Brand Strategy & Identity': 'အမှတ်တံဆိပ်မဟာဗျူဟာနှင့် ပုံရိပ်', 'Graphic & Packaging Design': 'ဂရပ်ဖစ်နှင့် ထုပ်ပိုးမှုဒီဇိုင်း', 'Digital & Social Marketing': 'ဒစ်ဂျစ်တယ်နှင့် ဆိုရှယ်မားကတ်တင်း', 'Web Design & Content': 'ဝဘ်ဒီဇိုင်းနှင့် အကြောင်းအရာ', 'View all services': 'ဝန်ဆောင်မှုအားလုံး ကြည့်ရန်',
      '03 · Selected work': '03 · ရွေးချယ်ထားသော လက်ရာများ', 'Designed to make a difference.': 'ကွဲပြားမှုဖြစ်စေရန် ဒီဇိုင်းပြုလုပ်ထားသည်။', 'A selection of visual stories, campaigns and brand moments created by WellMax.': 'WellMax ဖန်တီးထားသော အမြင်ဇာတ်လမ်းများ၊ ကမ်ပိန်းများနှင့် အမှတ်တံဆိပ်အခိုက်အတန့်များ။', 'All work': 'လက်ရာအားလုံး', 'Social media': 'ဆိုရှယ်မီဒီယာ', 'View': 'ကြည့်ရန်',
      '04 · How we work': '04 · လုပ်ကိုင်ပုံ', 'Simple process.': 'ရိုးရှင်းသော လုပ်ငန်းစဉ်။', 'Serious momentum.': 'ခိုင်မာသော အရှိန်အဟုန်။', 'Discover': 'လေ့လာရန်', 'Define': 'သတ်မှတ်ရန်', 'Create': 'ဖန်တီးရန်', 'Launch': 'စတင်ဖြန့်ချိရန်', 'We listen, research and define what success looks like.': 'ကျွန်ုပ်တို့ နားထောင်၊ လေ့လာပြီး အောင်မြင်မှုကို အတူတကွ သတ်မှတ်ပါသည်။', 'We turn insight into a focused creative direction.': 'သိမြင်မှုကို ရှင်းလင်းသော ဖန်တီးမှုလမ်းကြောင်းသို့ ပြောင်းလဲပါသည်။', 'We design, refine and build every brand touchpoint.': 'အမှတ်တံဆိပ်ထိတွေ့မှုတိုင်းကို ဒီဇိုင်းဆွဲ၊ မွမ်းမံပြီး တည်ဆောက်ပါသည်။', 'We deliver, activate and help your idea take flight.': 'အကြံအစည်ကို အကောင်အထည်ဖော်ပြီး ရှေ့သို့ပျံသန်းနိုင်အောင် ကူညီပါသည်။',
      '05 · Ideas & insights': '05 · အကြံအစည်နှင့် အတွေးအမြင်များ', 'Good thinking, shared.': 'ကောင်းမွန်သောအတွေးများကို မျှဝေခြင်း။', 'All insights': 'အတွေးအမြင်အားလုံး', 'Have a project in mind?': 'စိတ်ကူးထားသော ပရောဂျက်ရှိပါသလား။', 'Let’s make': 'အတူတကွ', 'something fly.': 'အကြံအစည်ကို ပျံသန်းစို့။', 'Start a conversation': 'စကားစတင်ပြောရန်', 'Direct contact': 'တိုက်ရိုက်ဆက်သွယ်ရန်', 'Email us': 'အီးမေးလ်ပို့ရန်',
      'About WellMax': 'WellMax အကြောင်း', 'Small team.': 'အဖွဲ့ငယ်။', 'Big brand energy.': 'ကြီးမားသော အမှတ်တံဆိပ်စွမ်းအား။', 'Our point of view': 'ကျွန်ုပ်တို့၏အမြင်', 'Brands grow when ideas connect.': 'အကြံအစည်များ ချိတ်ဆက်သောအခါ အမှတ်တံဆိပ်များ တိုးတက်သည်။', 'What drives us': 'ကျွန်ုပ်တို့ကို ရှေ့ဆက်စေသောအရာ', 'How we show up.': 'ကျွန်ုပ်တို့၏ လုပ်ဆောင်ပုံ။', 'Curious': 'စူးစမ်းလိုစိတ်', 'Clear': 'ရှင်းလင်းမှု', 'Brave': 'ရဲရင့်မှု', 'Together': 'အတူတကွ', 'Ready to move?': 'ရှေ့ဆက်ရန် အသင့်ဖြစ်ပြီလား။', 'Let’s build what’s next.': 'နောက်တစ်ဆင့်ကို အတူတည်ဆောက်စို့။', 'Talk to us': 'ဆက်သွယ်ရန်',
      'Built to make': 'အမှတ်တံဆိပ်များ', 'brands perform.': 'ထိရောက်စေရန် ဖန်တီးထားသည်။', 'Capabilities': 'ကျွမ်းကျင်မှုများ', 'Social Media Marketing': 'ဆိုရှယ်မီဒီယာမားကတ်တင်း', 'Paid Media & Email': 'အခကြေးငွေမီဒီယာနှင့် အီးမေးလ်', 'Website Design': 'ဝဘ်ဆိုဒ်ဒီဇိုင်း', 'Copy & Content': 'စာသားနှင့် အကြောင်းအရာ', 'Flexible collaboration': 'လိုက်လျောညီထွေ ပူးပေါင်းမှု', 'One project or ongoing partnership.': 'ပရောဂျက်တစ်ခု သို့မဟုတ် ရေရှည်ပူးပေါင်းမှု။', 'Sprint': 'အမြန်ပရောဂျက်', 'Project': 'ပရောဂျက်', 'Partner': 'မိတ်ဖက်', 'Campaign': 'ကမ်ပိန်း', 'Have a challenge?': 'စိန်ခေါ်မှုရှိပါသလား။', 'Let’s solve it creatively.': 'ဖန်တီးမှုဖြင့် ဖြေရှင်းကြစို့။',
      'Research, positioning, naming, identity design and practical brand systems.': 'သုတေသန၊ နေရာချထားမှု၊ အမည်ပေးခြင်း၊ ပုံရိပ်ဒီဇိုင်းနှင့် လက်တွေ့အသုံးချနိုင်သော အမှတ်တံဆိပ်စနစ်များ။', 'Campaigns, publications, packaging and every visual touchpoint in between.': 'ကမ်ပိန်း၊ ပုံနှိပ်ထုတ်ဝေမှု၊ ထုပ်ပိုးမှုနှင့် မြင်ကွင်းထိတွေ့မှုအားလုံး။', 'Channel strategy, content creation, community management and reporting.': 'ချန်နယ်မဟာဗျူဟာ၊ အကြောင်းအရာဖန်တီးမှု၊ အသိုင်းအဝိုင်းစီမံခန့်ခွဲမှုနှင့် အစီရင်ခံမှု။', 'Targeted campaigns that turn reach into meaningful and measurable action.': 'ရောက်ရှိမှုကို အဓိပ္ပာယ်ရှိပြီး တိုင်းတာနိုင်သော လုပ်ဆောင်ချက်အဖြစ် ပြောင်းလဲပေးသည့် ပစ်မှတ်ထားကမ်ပိန်းများ။', 'Responsive, user-friendly digital experiences built around clear goals.': 'ရှင်းလင်းသော ရည်မှန်းချက်အပေါ် အခြေခံသည့် တုံ့ပြန်မှုမြန်ပြီး အသုံးပြုရလွယ်ကူသော ဒစ်ဂျစ်တယ်အတွေ့အကြုံ။', 'Brand voice, web copy and content systems that make your message land.': 'သင့်မက်ဆေ့ချ် ထိရောက်စေရန် အမှတ်တံဆိပ်အသံ၊ ဝဘ်စာသားနှင့် အကြောင်းအရာစနစ်များ။',
      'Bring us your': 'သင့်၏ကြီးမားသော', 'big ambition.': 'ရည်မှန်းချက်ကို ပြောပြပါ။', 'Email WellMax': 'WellMax သို့ အီးမေးလ်ပို့ရန်', 'Project enquiry': 'ပရောဂျက်စုံစမ်းရန်', 'Start with a clear brief.': 'ရှင်းလင်းသော အကျဉ်းချုပ်ဖြင့် စတင်ပါ။', 'Your name': 'သင့်အမည်', 'Company or brand': 'ကုမ္ပဏီ သို့မဟုတ် အမှတ်တံဆိပ်', 'Email address': 'အီးမေးလ်လိပ်စာ', 'Service needed': 'လိုအပ်သောဝန်ဆောင်မှု', 'Choose a service': 'ဝန်ဆောင်မှုရွေးရန်', 'Approximate budget': 'ခန့်မှန်းဘတ်ဂျက်', 'Prefer not to say': 'မဖော်ပြလိုသေးပါ', 'Tell us about the project': 'ပရောဂျက်အကြောင်း ပြောပြပါ', 'Prepare enquiry': 'စုံစမ်းစာ ပြင်ဆင်ရန်', 'Follow WellMax': 'WellMax ကို လိုက်ရန်',
      'WellMax insights': 'WellMax အတွေးအမြင်များ', 'Ideas for brands': 'အမှတ်တံဆိပ်များအတွက် အကြံအစည်များ', 'ready to move.': 'ရှေ့ဆက်ရန် အသင့်။', 'Read article': 'ဆောင်းပါးဖတ်ရန်', 'Need a creative partner?': 'ဖန်တီးမှုမိတ်ဖက် လိုအပ်ပါသလား။', 'Turn insight into impact.': 'အတွေးအမြင်မှ အကျိုးသက်ရောက်မှုသို့။', 'Back to top': 'အပေါ်သို့ ပြန်ရန်'
    }
  };

  var originalText = new WeakMap();
  var originalAttributes = new WeakMap();

  function normalized(value) {
    return value.replace(/\s+/g, ' ').trim().replace(/\s*[↗↓↑]$/, '').trim();
  }

  function translated(value, language) {
    if (language === 'en') return value;
    var clean = normalized(value);
    var suffixMatch = value.match(/\s*([↗↓↑])\s*$/);
    var result = dictionaries[language][clean];
    return result ? result + (suffixMatch ? ' ' + suffixMatch[1] : '') : value;
  }

  function translateNode(node, language) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    var source = originalText.get(node);
    if (!source || !source.trim()) return;
    var leading = source.match(/^\s*/)[0];
    var trailing = source.match(/\s*$/)[0];
    node.nodeValue = leading + translated(source.trim(), language) + trailing;
  }

  function translateElement(element, language) {
    ['placeholder', 'aria-label', 'title'].forEach(function (attribute) {
      if (!element.hasAttribute(attribute)) return;
      var saved = originalAttributes.get(element) || {};
      var dynamicLabel = element.dataset.i18nLabel;
      if (dynamicLabel && (attribute === 'aria-label' || attribute === 'title')) saved[attribute] = dynamicLabel;
      else if (!saved[attribute]) saved[attribute] = element.getAttribute(attribute);
      originalAttributes.set(element, saved);
      element.setAttribute(attribute, translated(saved[attribute], language));
    });
  }

  function applyLanguage(language) {
    if (supported.indexOf(language) === -1) language = 'en';
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : language;
    document.documentElement.dataset.language = language;

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent || /^(SCRIPT|STYLE|NOSCRIPT|CODE|PRE)$/.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if (parent.closest('.language-select-wrap')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) { translateNode(node, language); });
    document.querySelectorAll('[placeholder],[aria-label],[title]').forEach(function (element) { translateElement(element, language); });

    var select = document.querySelector('.language-select');
    if (select) select.value = language;
    try { window.localStorage.setItem(storageKey, language); } catch (error) {}
  }

  function savedLanguage() {
    try {
      var saved = window.localStorage.getItem(storageKey);
      return supported.indexOf(saved) > -1 ? saved : 'en';
    } catch (error) {
      return 'en';
    }
  }

  function mountLanguageSwitch() {
    var dock = document.querySelector('.preference-dock');
    if (!dock) {
      dock = document.createElement('div');
      dock.className = 'preference-dock';
      dock.setAttribute('aria-label', 'Display and language preferences');
      document.body.appendChild(dock);
    }

    var wrap = document.createElement('label');
    wrap.className = 'language-select-wrap';
    wrap.innerHTML = '<span class="sr-only">Language</span><select class="language-select" aria-label="Language"><option value="en">English</option><option value="zh">中文</option><option value="th">ไทย</option><option value="my">မြန်မာ</option></select>';
    dock.insertBefore(wrap, dock.firstChild);

    var select = wrap.querySelector('select');
    select.addEventListener('change', function () { applyLanguage(select.value); });
    document.addEventListener('wellmax:themechange', function () {
      applyLanguage(document.documentElement.dataset.language || 'en');
    });
    applyLanguage(savedLanguage());

    var observer = new MutationObserver(function (records) {
      var hasNewContent = records.some(function (record) { return record.addedNodes.length; });
      if (hasNewContent) applyLanguage(document.documentElement.dataset.language || 'en');
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountLanguageSwitch, { once: true });
  else mountLanguageSwitch();
})();
