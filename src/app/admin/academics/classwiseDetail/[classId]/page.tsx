import { ClassAlotmentTable } from "~/app/_components/shared/tables/ClassAlotment";
import { Separator } from "~/components/ui/separator";

export default function ClassStudentPage({
  params,
}: {
  params: { classId: string };
}) {
  return (
    <main className="min-h-screen bg-yellow-100/50 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="container mx-auto pt-20">
        <Separator className="bg-green-900" />
        <div className="relative overflow-hidden">
          <h1 className="p-2 text-center font-serif text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent transition-all duration-300 hover:from-orange-400 hover:to-green-500">
              Student Allotment
            </span>
          </h1>
          <div className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-gradient-to-r from-green-600 to-yellow-500 transition-transform duration-300 group-hover:scale-x-100"></div>
        </div>
      </div>
      <Separator className="bg-green-900" />
      <ClassAlotmentTable classId={params.classId} />
      <Separator className="bg-green-900" />
    </main>
  );
}
