import { GraduationCap, UserPlusIcon } from "lucide-react";
import Link from "next/link";

export const RegistrationCards = () => {
  const services = [
    {
      title: "Student Registration",
      description:
        "Easily enroll new students and manage their financial records.",
      icon: <UserPlusIcon className="w-12 h-12 mb-4 text-green-500" />,
      href: "/registration/student/create",
    },
    {
      title: "Active Students",
      description:
        "Easily enroll new students and manage their financial records.",
      icon: <UserPlusIcon className="w-12 h-12 mb-4 text-green-500" />,
      href: "/registration/student/view",
    },
    {
    title: "Employee Registration",
    description:
      "Easily enroll new Employees and manage their financial records.",
    icon: <UserPlusIcon className="w-12 h-12 mb-4 text-green-500" />,
    href: "/registration/faculty/create",
  },
  {
    title: "Active Employees",
    description:
      "Easily enroll new Employees and manage their financial records.",
    icon: <GraduationCap className="w-12 h-12 mb-4 text-green-500" />,
    href: "/registration/faculty/view",
  },
  ];

  return (
<div className="bg-[url('/jpg/Schoolview.jpg')] bg-cover bg-center flex items-center justify-center animate-fade-in">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 p-8 sm:grid-cols-2 animate-slide-in-up">
        {services.map((service, index) => (
          <Link
            href={service.href}
            key={index}
            className="relative p-6 transition-transform duration-500 ease-in-out transform hover:scale-105 hover:rotate-1 hover:z-10"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 transition duration-700 ease-in-out transform -skew-y-6 shadow-lg bg-gradient-to-r from-green-400 to-green-700 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-80 hover:rotate-0 hover:skew-y-0 hover:scale-105"></div>
            <div className="relative px-6 py-8 shadow-2xl bg-white/90 backdrop-blur-md rounded-3xl">
              <div className="flex flex-col items-center text-center">
                {service.icon}
                <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-gray-700">{service.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};