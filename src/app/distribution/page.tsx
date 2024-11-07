// src/app/distribution/page.tsx
'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function DistributionPage() {
  useEffect(() => {
    // Kakao 맵 스크립트 동적 로드
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=a28390427e0155dad961314bff4808a1`;

    mapScript.addEventListener('load', onLoadKakaoMap);
    document.head.appendChild(mapScript);

    return () => {
      mapScript.removeEventListener('load', onLoadKakaoMap);
    };
  }, []);

  function onLoadKakaoMap() {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(36.3504119, 127.3845475), // 대한민국 중심부 좌표
        level: 13
      };
      const map = new window.kakao.maps.Map(container, options);
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">유통 경로</h1>
      <div 
        id="map" 
        className="w-full h-[600px] rounded-lg shadow-lg"
      />
    </div>
  );
}
