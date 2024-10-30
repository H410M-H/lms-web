import MainMenu from "~/app/_components/shared/mainmenu/mainmenu";
import { AlumniCards } from "~/app/_components/shared/cards/AlumniCard";
import { Separator } from "~/components/ui/separator";

export default function Aumni() {
    return (
        <main className="min-h-screen sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 bg-yellow-100/50">
            <div className="container mx-auto p-4">
            <Separator className="bg-green-900"/>
            <div className="relative overflow-hidden">
              <h1 className="text-center text-5xl font-serif font-bold tracking-tight p-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-600 hover:from-orange-400 hover:to-green-600 transition-all duration-300">
                  MSNS Alumni
                </span>
              </h1>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-600 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </div>
          <Separator className="bg-green-900"/>
          <MainMenu />
          <AlumniCards />
          <Separator className="bg-green-900"/>
    </main>
    )
}