import { StudentTable } from "~/app/_components/shared/tables/StudentTable";

export default function ClassOneTable(){

    return (
        <section className="grid mx-10">
            <h1 className="text-center text-5xl p-4 font-serif font-semibold text-green-800">Student Credentials Detail</h1>
            <StudentTable/>
        </section>
    )
}