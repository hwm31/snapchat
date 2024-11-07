// src/app/distribution/layout.tsx
export const metadata = {
    title: '유통 경로 | 농산물 유통 시스템',
    description: '농산물 유통 경로를 확인할 수 있는 페이지입니다.',
  };
  
  export default function DistributionLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <>{children}</>;
  }