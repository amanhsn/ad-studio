import Image from "next/image";

export function HeroBlock() {
  return (
    <div className="flex flex-col items-center text-center max-w-[640px] mx-auto">
      <Image
        src="/brand/logo-color.png"
        alt="Imagine"
        width={28}
        height={28}
        priority
      />
      <div className="h-3" aria-hidden />
      <span
        className="text-label-sm font-medium uppercase text-content-secondary"
        style={{ letterSpacing: "0.18em" }}
      >
        Ads Studio
      </span>
      <div className="h-2" aria-hidden />
      <h1 className="text-display-sm font-medium text-content-primary">
        Turn anything into a campaign
      </h1>
      <div className="h-4" aria-hidden />
      <p className="text-body-md font-normal text-content-secondary">
        Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </p>
    </div>
  );
}
