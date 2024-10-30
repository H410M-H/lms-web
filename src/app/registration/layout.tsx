import { ScrollArea } from "@radix-ui/react-scroll-area";
import StickyHeader from "../_components/shared/elements/StickyHeader";

export const metadata = {
  title: "MSNS-LMS | Online Registration",
  description: "Clerk Dashbaord",
  icons: [{ rel: "icon", url: "/logo/logo-white.png" }],
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollArea className="rounded-lg shadow-md">
    <StickyHeader />
  {children}
</ScrollArea>
);
}