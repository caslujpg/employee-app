import logoSvg from "@/assets/logo.svg"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({ className, width = 32, height = 32 }: LogoProps) {
  return (
    <img
      src={logoSvg}
      alt="Quadro"
      width={width}
      height={height}
      className={className}
    />
  )
}