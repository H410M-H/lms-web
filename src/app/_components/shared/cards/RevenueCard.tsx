import {
    BarChartIcon,
    FileTextIcon,
    GearIcon,
  } from "@radix-ui/react-icons";
  import { DollarSignIcon, HandCoinsIcon, HandshakeIcon } from "lucide-react";
  import Link from "next/link";
  
  export const RevenueCards = () => {
    const services = [
      {
        title: "Investment Projects",
        description:
          "Easily enroll new students and manage their financial records.",
        icon: <HandCoinsIcon className="mb-4 h-12 w-12 text-blue-500" />,
        href: "/admin/analytics",
      },
      {
        title: "Salary Management",
        description: "Create and manage new classes or courses for the school.",
        icon: <HandshakeIcon className="mb-4 h-12 w-12 text-indigo-500" />,
        href: "/revenue/salary",
      },
      {
        title: "Fee Collection",
        description: "Streamline tuition and fee collection processes.",
        icon: <DollarSignIcon className="mb-4 h-12 w-12 text-green-500" />,
        href: "/revenue/fee",
      },
      {
        title: "Financial Reporting",
        description: "Generate comprehensive financial reports and analytics.",
        icon: <BarChartIcon className="mb-4 h-12 w-12 text-purple-500" />,
        href: "/revenue/finance",
      },
      {
        title: "Invoice Management",
        description: "Create, send, and track invoices for various school fees.",
        icon: <FileTextIcon className="mb-4 h-12 w-12 text-yellow-500" />,
        href: "/revenue/invoice",
      },
      {
        title: "Payment Settings",
        description: "Customize payment plans and automate recurring payments.",
        icon: <GearIcon className="mb-4 h-12 w-12 text-red-500" />,
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
  