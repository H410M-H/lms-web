import StudentCreationDialog from "~/app/_components/shared/forms/student/StudentCreation";

export default function StudentRegistration(){

    return (
        <section className="w-screen gap-2">
        <div className="min-h-screen pt-20 sm:px-6 bg-yellow-100/50">
        <h1 className="text-4xl font-serif font-bold text-green-800 text-center p-6">Student Registration Portal</h1>
        <StudentCreationDialog />
    </div>
        </section>
    )
}