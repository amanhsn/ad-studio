import Image from "next/image";

export function Hero() {
  return (
    <div className="flex flex-col items-center gap-3 pt-13 pb-11 w-[516px] max-w-full mx-auto">
      <div className="flex items-center gap-2 h-[22px]">
        <Image
          src="/brand/logo-color.png"
          alt="Imagine"
          width={20}
          height={20}
          priority
        />
        <span className="text-label-lg font-medium text-content-primary tracking-[0.32px]">
          ImagineArt
        </span>
      </div>
      <h1
        className="text-[48px] leading-none text-content-primary text-center whitespace-nowrap"
        style={{
          fontFamily: '"Monomaniac One", "Google Sans Flex", sans-serif',
          letterSpacing: "4.32px",
          fontWeight: 400,
        }}
      >
        ADS STUDIO
      </h1>
      <p className="text-heading-sm font-normal text-content-secondary text-center w-full pl-3">
        Built for brands that ship more than one ad.
      </p>
    </div>
  );
}
