import { VideoProject, PersonalInfo } from './types';

export const PERSONAL_INFO: PersonalInfo = {
  name: "Trường Phạm",
  role: "Senior Video Editor & Colorist",
  bio: "Xuất phát điểm là một lập trình viên, tôi rèn luyện được tư duy logic, khả năng phân tích sâu sắc và sự tỉ mỉ cần thiết cho mọi công việc. Một Video Editor có nền tảng tư duy lập trình logic, chuyên về sản xuất nội dung số tối ưu bằng AI. Mục tiêu kết hợp khả năng phân tích dữ liệu (SEO YouTube) và kỹ thuật dựng hình ảnh để tạo ra sản phẩm có sức lan tỏa cao.",
  email: "truongpn1101@gmail.com",
  location: "Hà Nội, Việt Nam",
  avatar: "https://drive.google.com/thumbnail?id=1EIzlXS5R2B-e5wYan0gSzPcxRsU02N9c&sz=w1000",
  socials: {}
};

export const PROJECTS: VideoProject[] = [
  {
    id: "1",
    title: "Inside Mega Factory: How They Make Tons Of Christmas Chocolate Santas | 4K resolution",
    youtubeUrl: "https://youtu.be/owqHr9J_MZ0",
    views: "46.034",
    category: "Ai",
    description: "A deep dive into the industrial production of Christmas chocolate, edited for maximum visual impact and clarity."
  },
  {
    id: "2",
    title: "Inside Mega Factory: Inside a Billion-Dollar Quail Farm: Harvesting Millions of Eggs Daily | 4K resolution",
    youtubeUrl: "https://youtu.be/QUdVGUzSFIY",
    views: "8.210",
    category: "Ai",
    description: "Documenting the massive scale of quail egg production with cinematic pacing and detailed storytelling."
  },
  {
    id: "3",
    title: "Sourdough Bread",
    videoUrl: "https://drive.google.com/file/d/1kfaLla8J7kULc698K6yF5xUMb7_iITLE/view?usp=drive_link",
    category: "Cooking",
    description: "A professional cooking showcase edited with precision and vibrant color grading.",
    thumbnail: "https://drive.google.com/thumbnail?id=1ewwt0p1dnQVK8OvZ2LcMNtfUSZc3q6cV&sz=w1280"
  }
];
