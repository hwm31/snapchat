'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-4 bg-gray-900">
        <h1 className="text-xl font-bold">Snapchat Introduction</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-6">
      <Image
  src="/SnapchatLogo.png" // public 디렉토리 기준 경로
  alt="Snapchat Logo"
  width={200}
  height={200}
  className="rounded-full"
/>

        <h2 className="text-2xl font-bold">Welcome to Snapchat!</h2>
        <p className="text-gray-300">
        Snapchat is the best platform for sharing photos and stories with friends.
        </p>
        <p className="text-gray-300">
        Start now and share your special moments with others!
        </p>
      </main>

      {/* Call to Action Buttons */}
      <div className="flex justify-center space-x-4 py-4">
        <Link href="/register">
          <button className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300">
            Start
          </button>
        </Link>
        <Link href="/login">
          <button className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600">
            LogIn
          </button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
        <div className="grid grid-cols-4 h-16">
          {[
            {
              name: 'Home',
              href: '/home',
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              ),
            },
            {
              name: 'Chat',
              href: '/chat',
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              ),
            },
            {
              name: 'Story',
              href: '/story',
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              ),
            },
            {
              name: 'Profile',
              href: '/profile',
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              ),
            },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-yellow-300"
            >
              <div>{item.icon}</div>
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}