import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-yellow-400 text-black">
      <div className="container mx-auto px-4">
        {/* 로고 */}
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">Snapchat</span>
          </Link>

          {/* 네비게이션 아이콘 */}
          <nav className="flex space-x-6">
            <Link href="/" className="flex flex-col items-center hover:text-gray-700">
              <img src="/icons/home.png" alt="Home" className="w-6 h-6" />
              <span className="text-xs mt-1">홈</span>
            </Link>
            <Link href="/chat" className="flex flex-col items-center hover:text-gray-700">
              <img src="/icons/chat.png" alt="Chat" className="w-6 h-6" />
              <span className="text-xs mt-1">채팅</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center hover:text-gray-700">
              <img src="/icons/profile.png" alt="Profile" className="w-6 h-6" />
              <span className="text-xs mt-1">프로필</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}