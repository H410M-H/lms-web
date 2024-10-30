import { ScrollArea } from "@radix-ui/react-scroll-area";

export const metadata = {
  title: "MSNS-WEB",
  description: "Clerk Dashbaord",
  icons: [{ rel: "icon", url: "/logo/logo-white.png" }],
};

export default function RevenueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollArea className="rounded-lg shadow-md">
  {children}
</ScrollArea>
  );
}
