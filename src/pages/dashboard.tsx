import DashboardEventList from "@/components/DashboardEventList";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <main className="flex flex-col lg:flex-row gap-8">
        <DashboardEventList />
        <Card className="w-1/3">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Messages</CardTitle>
              <CardDescription>Recently sent messages</CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link to="#">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
        </Card>
      </main>
    </DashboardLayout>
  );
}
