export function Logo({ light = true }: { light?: boolean }) {
  const text = light ? "text-white" : "text-[#131921]";
  return (
    <div className="flex flex-col items-center leading-none select-none">
      <span className={`text-[26px] font-extrabold tracking-tight ${text}`}>now</span>
      <svg width="52" height="10" viewBox="0 0 52 10" className="-mt-1">
        <path
          d="M2 6 L14 4 L20 7 L30 2 L38 6 L50 3"
          fill="none"
          stroke="#FF9900"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M44 1 L48 3 L46 5" fill="none" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
