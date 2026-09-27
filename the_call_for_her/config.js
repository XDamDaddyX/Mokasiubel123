/**
 * THE CALL — CHỈ SỬA FILE NÀY ĐỂ CÁ NHÂN HÓA WEBSITE.
 * Lưu file ở UTF-8. Đường dẫn ảnh/nhạc tính từ index.html.
 * Giữ dấu phẩy giữa các mục, và dùng dấu nháy "..." cho nội dung.
 */
const THE_CALL_CONFIG = {
  // 1. TÊN & CÂU CHỮ TRÊN MÀN HÌNH CUỘC GỌI
  pageTitle: "The Call — Một cuộc gọi dành cho em",
  senderName: "Cuc cứcc",
  receiverName: "Cục dàngggg",
  callerSubtitle: "Có vài điều anh muốn kể cho em...",
  callType: "Cốc cốc mở cửa cho anh đê",
  openingEyebrow: "Cuộc gọi đến",
  openingHint: "Nhấc máy đi, anh có chuyện muốn nói ♡",
  avatarImage: "assets/images/avatar.jpg", // VD: "assets/images/anh.jpg". Bỏ trống => hiện chữ A.
  avatarFallback: "A",

  // 2. NHẠC NỀN: TỰ THỬ PHÁT KHI MỞ, TỰ PHÁT SAU KHI BẤM TRẢ LỜI NẾU BỊ CHẶN
  music: {
    src: "assets/music/love.mp3", // Đổi thành "assets/music/nhac-cua-hai-dua.mp3"
    autoplay: true,
    loop: true,
    volume: 0.32 // Từ 0 (im lặng) đến 1 (lớn nhất)
  },

  // 3. CÂU NÓI KHI EM BẤM TỪ CHỐI
  declineLines: [
    "Ê... em bấm nhầm phải hem dặ?",
    "Anh gọi lại nhá .",
    "Có điều này anh muốn tự mình kể cho em.",
    "Bắt máy đi mò, một chút thuii"
  ],

  // 4. TỐC ĐỘ HIỆN TIN NHẮN (đơn vị: mili giây)
  pacing: {
    messageDelay: 5000, // Nghỉ trước mỗi tin nhắn
    typingDelay: 3000,  // Hiện dấu ... trước khi gửi
    initialDelay: 720
  },

  // 5. CÂU CHUYỆN: TẤT CẢ ĐỀU LÀ LỜI CỦA ANH GỬI ĐẾN EM
  // type: "date" => nhãn thời gian; "text" => tin nhắn; "image" => ảnh kỷ niệm.
  // Bạn có thể thêm/xóa/đảo vị trí các dòng trong danh sách.
  // Ảnh: điền src: "assets/images/ten-anh.jpg"; bỏ trống => ảnh placeholder.
  story: [
    { type: "date", text: "JUL 27 AT 12:00" },
    { type: "text", text: "Em uii, anh nì chằm em nề", delay: 500 },
    { type: "text", text: "Anh nhớ iem, siêu nhớ lun ó, hjc hjc", delay: 5000 },
    { type: "text", text: "Em cóa iu anh hăm :<<", delay : 5000 },
    { type: "text", text: "Điêuuu", delay : 600 },
    { type: "text", text: "Cái web nì anh ngâm đựt 2 ngày gòi giờ mới dám gửi cho iem", delay : 5000 },
    { type: "image", src: "assets/images/memory3.jpg", caption: "Nhớ lần chụp chung này hong bòa", alt: "Ảnh kỷ niệm của hai đứa", delay: 8000},
    { type: "text", text: "Sao lúc đóa đáng iuuuu z mà lên mạng dỗi anh nhìn thấy sợ dữ z mắ :))", delay : 6000 },
    { type: "text", text: "Mí hôm em dận anh, em như biến thành một con ngừi khác lun ó", delay : 4000},
    { type: "text", text: "Nhưng mò em thí anh cóa bỏ gơi iem hong!?, tại vì tuôi hong nỡ lòng nào để em một mìn, tuôi thì em chửi, em mắng như nèo cũm được miễn là em nguôi dận là anh zui òi ToT", delay : 10000},
    { type: "text", text: "Em cóa mún nói với anh đìu gì hăm, tại anh thí em tòn xin lũi anh thui chứ chẻ bẻo tại seo cạ :(", delay: 5000 },
    { type: "image", src: "assets/images/memory2.jpg", caption: "Nhưng mò mỗi lú em dận thì anh sẽ lục tin nhắn cũ với tấm nì ra coai", alt: "Một kỷ niệm khác" },
    { type: "text", text: "Đừng gời xa hay bỏ anh nha bé iu, anh vẫn yêu em gấc nhiều ó T^T" },
    { type: "text", text: "Nếu bòa có thương, iu tui thì nhắn ngay sau khi xong cí trò nì nhaaaaaa, nêu cảm xúc hoi là được òi", delay: 5000 }
  ],

  // 6. MÀN KẾT
  ending: {
    eyebrow: "CUỘC GỌI ĐÃ KẾT THÚC",
    title: "Nhưng tình yêu của chúng mình thì chưa.",
    note: "Cảm ơn em đã đọc hết những gì anh muốn nói, anh vẫn sẽ dõi theo em tốt hơn từng ngày, và một điều nữa là nhắn tin thì kesooo daifii ra huhuhuhuhu nhắn có 1 chữ nhìn thí sợ lắm á mắ :))), hôm nay em dỏi lắm!!! Anh yeeuuuuu emmm raascccc nhieefuuuuu moa moa moa, hiu hiu tui khot khi lèm cái nì ó T^T nhớ em quó",
    replayLabel: "Lại từ đầu",
    continueLabel: "Lời tui muốn nói với em",
  }
};
