import { EmployeeTable } from "~/app/_components/shared/tables/EmployeeTable";
import { Separator } from "~/components/ui/separator";

export default function EmployeesTable() {

    return (
        <section className="grid mx-10 pt-20">
            <Separator className="bg-green-900" />
            <h1 className="text-center text-5xl p-4 font-serif font-semibold text-green-800">Employees Credentials Detail</h1>
            <Separator className="bg-green-900" />
            <EmployeeTable />
            <Separator className="bg-green-900" />
        </section>
    )
}