import { Logo } from "@/components/ui/logo";

export function Hero() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col items-center justify-center gap-4 p-12 relative overflow-hidden">
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full bg-white/10" />
      <div className="absolute bottom-[-90px] right-[-60px] w-96 h-96 rounded-full bg-white/10" />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-3">
          <Logo className="w-14 h-14 brightness-0 invert" />
          <span className="text-white text-5xl font-bold tracking-tight">
            Quadro
          </span>
        </div>

        <div className="w-16 h-1 rounded-full bg-white/40" />
        <p className="text-white/70 text-lg max-w-xs leading-relaxed">
          Gerencie sua equipe com simplicidade e eficiência.
        </p>
      </div>
    </div>
  );
}
