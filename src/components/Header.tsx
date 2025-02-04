import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { AddClusterForm } from "./AddClusterForm";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex-1">
          <h1 className="text-xl font-semibold">Cluster Connectivity Hub</h1>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Cluster
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Cluster</DialogTitle>
              </DialogHeader>
              <AddClusterForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}