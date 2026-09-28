import type { SVGProps } from 'react';

export default function BrandMark({ className = '', size = 30, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg width={size * 1.15} height={size} viewBox="0 0 36 30" className={className} aria-hidden="true" {...props}>
      <rect width="36" height="30" fill="currentColor" opacity="0" />
      <path d="M3 4h13M3 15h10M3 26h13M3 4v22" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
      <circle cx="22" cy="15" r="8.8" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <path d="M18.5 11.5 30.5 25" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
      <path d="M26 4h7M29.5 4v22" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
    </svg>
  );
}
