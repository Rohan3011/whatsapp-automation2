import { AddPeople } from "@/components/AddPeople";
import DashboardLayout from "@/components/DashboardLayout";
import { PeopleList } from "@/components/PeopleList";

function PeoplePage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">People</h1>
        <AddPeople />
      </div>
      <PeopleList />
    </DashboardLayout>
  );
}

export default PeoplePage;
