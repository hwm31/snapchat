import Link from 'next/link';

export default function Footer() {
  const footerLinks = {
    team: [
      { name: '김범수', href: 'https://snapchat.com/t/KqvQPQ1S' },
      { name: '손인화', href: 'https://snapchat.com/t/REoNNXQ9' },
      { name: '신채운', href: 'https://snapchat.com/t/TsIjwQ4x' },
      { name: '이희승', href: 'https://www.snapchat.com/add/heeseung1102?share_id=WfyPBWOOaMg&locale=ko-KR' },
    ],
    community: [
      { name: 'GITHUB(REACT)', href: 'https://github.com/hwm31/snapchat' },
      { name: 'GITHUB(API)', href: 'https://github.com/ILLUSE/snapchat_api' }
    ],
  };

  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Team Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Teammate Information</h3>
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
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Community</h3>
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
            © {new Date().getFullYear()} Teammate Information Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
