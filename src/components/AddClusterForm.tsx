import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";

export function AddClusterForm() {
  const [file, setFile] = useState<File | null>(null);
  const [clusterName, setClusterName] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !clusterName) {
      toast({
        title: "Error",
        description: "Please provide both cluster name and kubeconfig file",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement cluster addition logic with backend
    toast({
      title: "Success",
      description: "Cluster configuration uploaded successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="clusterName">Cluster Name</Label>
        <Input
          id="clusterName"
          value={clusterName}
          onChange={(e) => setClusterName(e.target.value)}
          placeholder="Production Cluster"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="kubeconfig">Kubeconfig File</Label>
        <Input
          id="kubeconfig"
          type="file"
          accept=".yaml,.yml"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <Button type="submit" className="w-full">
        Add Cluster
      </Button>
    </form>
  );
}