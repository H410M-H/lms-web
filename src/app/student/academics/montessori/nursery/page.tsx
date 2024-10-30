import { StudentTable } from "~/app/_components/shared/tables/StudentTable";

export default function NurseryTable(){

    return (
        <section className="grid mx-10">
            <h1 className="text-center text-5xl p-4 font-serif font-semibold text-green-800">Nursery Students Credentials Detail</h1>
            <StudentTable/>
        </section>
    )
}