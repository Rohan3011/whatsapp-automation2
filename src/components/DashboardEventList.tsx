import { ArrowUpRight, MoreHorizontal } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { pb } from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/date";
import { type Relation } from "@/types";

export default function DashboardEventList() {
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () => {
      return pb.collection("events").getFullList({
        expand: "person, person.relation",
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("DATA: ", events);

  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Events</CardTitle>
          <CardDescription>All the today's events.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link to="#">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Event</TableHead>
              <TableHead className="hidden md:table-cell">Relation</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events?.map((ev: any) => (
              <TableRow key={ev.id}>
                <TableCell className="font-medium">
                  {ev.expand?.person?.name}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {ev.name}
                </TableCell>
                <TableCell>
                  {ev.expand?.person?.expand?.relation?.map(
                    (relation: Relation) => (
                      <Badge key={relation.id} variant="outline">
                        {relation.label}
                      </Badge>
                    )
                  )}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {formatDate(ev.date)}
                </TableCell>
                <TableCell>
                  {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
                  <Button variant="secondary">Generate</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
