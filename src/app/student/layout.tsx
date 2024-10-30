import { ScrollArea } from "@radix-ui/react-scroll-area";

export const metadata = {
  title: "MSNS-WEB | Registration",
  description: "Clerk Dashbaord",
  icons: [{ rel: "icon", url: "/logo/logo-white.png" }],
};

export default function StudentLayout({
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
