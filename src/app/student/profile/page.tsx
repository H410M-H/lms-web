import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "~/components/ui/card";

export default function Profile (){
    return(
        <main className="min-h-screen sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 bg-yellow-100/50">
            <div className="container mx-auto p-4">
            <div className="relative overflow-hidden">
              <h1 className="text-center text-5xl font-serif font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-500 hover:from-orange-400 hover:to-green-500 transition-all duration-300">
                  Greetings !
                </span>
              </h1>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-600 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </div>
         <Card
            className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Preferences</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Orders Dashboard for Seamless
                Management and Insightful Analysis.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>Profile Settings</Button>
            </CardFooter>
          </Card>
    </main>    )
}