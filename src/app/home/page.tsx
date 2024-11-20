// Home.js
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-yellow-50 text-black">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-yellow-400 shadow-md">
        <h1 className="text-2xl font-bold text-white">Snapchat</h1>
        <div className="flex items-center space-x-4">
          <Link href="/profile">
            <Image
              src="/images/profile-icon.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full cursor-pointer hover:opacity-80"
            />
          </Link>
        </div>
      </header>

      {/* Main Banner */}
      <section
        className="flex flex-col items-center justify-center bg-cover bg-center py-20 text-center"
        style={{ backgroundImage: 'url(/images/farm-banner.jpg)' }}
      >
        <h2 className="text-4xl font-extrabold text-black mb-4 drop-shadow-md">농산물과의 새로운 연결</h2>
        <p className="text-black text-lg mb-6">지역 농가에서 신선함을 직접 경험하세요</p>
        <Link
          href="/farms"
          className="bg-black text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all"
        >
          농가 탐색
        </Link>
      </section>

      {/* Categories */}
      <section className="py-12 px-6">
        <h3 className="text-2xl font-bold text-center mb-8 text-black">카테고리 탐색</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href="/products/vegetable"
            className="p-6 bg-white border-2 border-black rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition-all"
          >
            <Image
              src="/images/vegetables.jpg"
              alt="Vegetables"
              width={100}
              height={100}
              className="rounded-full mb-4"
            />
            <h4 className="text-xl font-semibold">채소류</h4>
          </Link>
          <Link
            href="/products/fruit"
            className="p-6 bg-white border-2 border-black rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition-all"
          >
            <Image
              src="/images/fruits.jpg"
              alt="Fruits"
              width={100}
              height={100}
              className="rounded-full mb-4"
            />
            <h4 className="text-xl font-semibold">과일류</h4>
          </Link>
          <Link
            href="/products/grain"
            className="p-6 bg-white border-2 border-black rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition-all"
          >
            <Image
              src="/images/grains.jpg"
              alt="Grains"
              width={100}
              height={100}
              className="rounded-full mb-4"
            />
            <h4 className="text-xl font-semibold">곡물류</h4>
          </Link>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-yellow-400 flex justify-around py-3 text-white shadow-lg">
        <Link href="/" className="flex flex-col items-center text-sm hover:opacity-90">
          <Image src="/images/home-icon.png" alt="Home" width={24} height={24} />
          홈
        </Link>
        <Link href="/chat" className="flex flex-col items-center text-sm hover:opacity-90">
          <Image src="/images/chat-icon.png" alt="Chats" width={24} height={24} />
          채팅
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-sm hover:opacity-90">
          <Image src="/images/profile-icon.png" alt="Profile" width={24} height={24} />
          프로필
        </Link>
      </nav>
    </div>
  );
}