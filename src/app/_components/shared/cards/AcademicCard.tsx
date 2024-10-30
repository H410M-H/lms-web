  import { CircleFadingPlusIcon, PlusCircleIcon } from "lucide-react";
  import Link from "next/link";
  
  export const AcademicCards = () => {
    const services = [
      {
        title: "User Management",
        description:
          "Easily enroll new students and manage their financial records.",
        icon: <PlusCircleIcon className="mb-4 h-12 w-12 text-blue-500" />,
        href: "/registration/portal",
      },
      {
        title: "Events & Activities",
        description: "Customize payment plans and automate recurring payments.",
        icon: <CircleFadingPlusIcon className="mb-4 h-12 w-12 text-red-500" />,
        href: "",
      },
    ];
  
    return (
      <section className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Link
            href={service.href}
            key={index}
            className="transform rounded-lg bg-yellow-100 p-6 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              {service.icon}
              <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </Link>
        ))}
      </section>
    );
  };
  