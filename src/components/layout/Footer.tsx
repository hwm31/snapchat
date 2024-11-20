import Link from 'next/link';

export default function Footer() {
  const footerLinks = {
    team: [
      { name: '김범수', href: '/team/kim-beomsoo' },
      { name: '손인화', href: '/team/son-inhwa' },
      { name: '신채운', href: 'https://snapchat.com/t/TsIjwQ4x' },
      { name: '이희승', href: '/team/lee-heeseung' },
    ],
    community: [
      { name: '커뮤니티', href: '/community' },
      { name: '고객지원', href: '/support' },
      { name: '커뮤니티 가이드라인', href: '/guidelines' },
      { name: '보안 센터', href: '/security-center' },
    ],
  };

  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Team Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">팀원 정보</h3>
            <ul className="space-y-2">
              {footerLinks.team.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">커뮤니티</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} 팀원 정보 플랫폼. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
