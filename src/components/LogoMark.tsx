import Image from 'next/image';

export function LogoMark({ className = '', size = 420 }: { className?: string; size?: number }) {
  return (
    <div className={className}>
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Soft golden aura */}
        <div
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            background:
              'radial-gradient(circle, rgba(230,201,135,0.28) 0%, rgba(201,162,74,0.12) 40%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
        <Image
          src="/logo.png"
          alt=""
          width={size}
          height={size}
          className="relative drop-shadow-[0_0_36px_rgba(201,162,74,0.55)]"
        />
      </div>
    </div>
  );
}
