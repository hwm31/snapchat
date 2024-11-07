// src/components/layout/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  const footerLinks = {
    service: [
      { name: '농가 등록', href: '/farms/register' },
      { name: '상품 등록', href: '/products/register' },
      { name: '배송 조회', href: '/delivery' },
    ],
    support: [
      { name: '고객센터', href: '/support' },
      { name: 'FAQ', href: '/faq' },
      { name: '공지사항', href: '/notice' },
    ],
  };

  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">지역 농산물 유통 플랫폼</h3>
            <p className="text-gray-600 text-sm">
              신선한 지역 농산물을 최적의 경로로 배송해드립니다.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">서비스 안내</h3>
            <ul className="space-y-2">
              {footerLinks.service.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">고객 지원</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
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
            © {new Date().getFullYear()} 농산물 유통 플랫폼. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}