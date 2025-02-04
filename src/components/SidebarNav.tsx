import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Server, 
  Box, 
  Database,
  Settings,
  Package
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Server, label: "Clusters", href: "/clusters" },
  { icon: Box, label: "Workloads", href: "/workloads" },
  { icon: Database, label: "Storage", href: "/storage" },
  { icon: Package, label: "Helm Apps", href: "/helm" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function SidebarNav() {
  const location = useLocation();

  return (
    <nav className="w-64 min-h-[calc(100vh-4rem)] border-r px-3 py-4">
      <div className="space-y-2">
        {sidebarItems.map((item) => (
          <Link key={item.href} to={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                location.pathname === item.href && "bg-accent"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
}