'use client';
import Link from 'next/link';
import { selectAtlasLocation } from '../lib/hooks/useAtlasLocation';
export default function ProvinceContextLink({ provinceId, children }) {
  return <Link href="/atlas" onClick={() => selectAtlasLocation(provinceId)}>{children}</Link>;
}
