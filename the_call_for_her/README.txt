THE CALL — ANH NHẮN CHO EM ♡
==========================

1) XEM DEMO
   Giải nén ZIP. Mở index.html bằng Chrome/Edge/Safari.
   Bấm "Trả lời" => các tin nhắn lần lượt hiện, TẤT CẢ là lời của anh gửi cho em.
   Bấm "Hiện tất cả lời nhắn" để xem ngay, hoặc chờ đến cuối rồi mở lời nhắn cuối.

2) CÁ NHÂN HÓA MÀ KHÔNG ĐỤNG VÀO JS CHÍNH
   Mở config.js bằng VS Code hoặc Notepad.
   - senderName / receiverName: tên hai người
   - avatarImage: ảnh đại diện anh
   - story: nội dung chat / ảnh; type:"date" | "text" | "image"
   - ending: màn kết
   - declineLines: các câu khi từ chối cuộc gọi
   - pacing: tốc độ hiện tin nhắn

3) CHÈN NHẠC CỦA HAI ĐỨA
   Bản demo có một nhạc nền instrumental ngắn, tự tạo:
       assets/music/demo-ambient.wav
   Để thay bằng nhạc của bạn:
   - Đặt file, ví dụ "nhac-cua-hai-dua.mp3" vào assets/music/
   - Mở config.js, sửa:
       music: {
         src: "assets/music/nhac-cua-hai-dua.mp3",
         autoplay: true,
         loop: true,
         volume: 0.32
       }
   Nhạc đặt ở audio riêng, KHÔNG bị reset khi chuyển giữa các màn hình.

   LƯU Ý AUTOPLAY: Safari/Chrome/Android/iOS thường KHÔNG cho phép trang web
   phát âm thanh có tiếng trước khi người xem thao tác. Website có thử tự phát
   lúc tải và thử lại khi bấm vào trang/"Trả lời". Nếu bị chặn, bấm ♫ Bật nhạc.
   Không có code web thông thường nào đảm bảo vượt chính sách autoplay đó.

4) CHÈN ẢNH
   Đặt ảnh ở assets/images/, ví dụ ky-niem-01.jpg.
   Ở config.js, đổi dòng:
     { type:"image", src:"assets/images/ky-niem-01.jpg", caption:"Hôm ấy... ♡", alt:"Hai đứa" },
   Nếu để src:"", demo vẫn chạy, hiện placeholder hình trái tim.
   Bấm ảnh trong chat để phóng to. Hỗ trợ cả PC và mobile.

5) PUBLIC WEB
   Upload NGUYÊN THƯ MỤC bao gồm index.html, style.css, script.js,
   config.js và assets lên Netlify, GitHub Pages, Vercel hoặc host tĩnh.
   Đường dẫn trong config.js có phân biệt hoa/thường trên nhiều host.

CẤU TRÚC
  index.html
  style.css
  script.js          (logic, không cần chỉnh khi thay nội dung)
  config.js          (SỬA FILE NÀY)
  assets/music/demo-ambient.wav
  assets/images/     (thêm ảnh tại đây)

Ghi chú: Nhạc demo là instrumental tổng hợp riêng cho gói này, không phải bài
nhạc nổi tiếng. Bạn có thể xóa và thay bằng MP3 mình có quyền sử dụng.
