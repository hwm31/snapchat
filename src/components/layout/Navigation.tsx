'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  console.log('Current pathname:', pathname);

  // 네비게이션 항목 업데이트 (로그인/회원가입 추가)
  const navigation = [
    { name: '홈', href: '/home' },
    { name: '채팅', href: '/chat' },
    { name: '스토리', href: '/story' },
    { name: '프로필', href: '/profile' },
    { name: '로그인', href: '/login' }, // 로그인 추가
    { name: '회원가입', href: '/register' }, // 회원가입 추가
  ];

  const isCurrentPath = (path: string) => pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
      <div className="grid grid-cols-4 h-16">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center space-y-1 ${
              isCurrentPath(item.href)
                ? 'text-yellow-400'
                : 'text-gray-400 hover:text-yellow-300'
            }`}
          >
            <div className={`${
              isCurrentPath(item.href) 
                ? 'text-yellow-400' 
                : 'text-gray-400'
            }`}>
              {item.name}
            </div>
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
