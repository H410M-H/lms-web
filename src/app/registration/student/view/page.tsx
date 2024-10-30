import { StudentTable } from "~/app/_components/shared/tables/StudentTable";
import { Separator } from "~/components/ui/separator";

export default function StudentsTable() {

    return (
        <section className="grid mx-10 pt-20">
            <Separator className="bg-green-900" />
            <h1 className="text-center text-5xl p-4 font-serif font-semibold text-green-800">Student Credentials Detail</h1>
            <Separator className="bg-green-900" />
            <StudentTable />
            <Separator className="bg-green-900" />
        </section>
    )
}