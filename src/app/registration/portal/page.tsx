import { RegistrationCards } from "~/app/_components/shared/cards/RegistrationCard";
import { LogoCloud } from "~/app/_components/shared/elements/LogoCloud";
import { Separator } from "~/components/ui/separator";


export default function RegistrationPage() {
    return (
      <main className="min-h-screen sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4 bg-yellow-100/50">
      <div className="relative overflow-hidden pt-20">
        <Separator className="bg-green-900" />
        <h1 className="text-center text-5xl font-serif font-bold tracking-tight p-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-500 hover:from-orange-400 hover:to-green-500 transition-all duration-300">
            Online Registration Portal
          </span>
        </h1>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-600 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    <Separator className="bg-green-900"/>
  <RegistrationCards />
  <Separator className="bg-green-900"/>
  <LogoCloud />
  </main>
    );
  }