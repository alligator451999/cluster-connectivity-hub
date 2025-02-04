import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { kubernetesApi } from "@/services/kubernetes";
import { useQueryClient } from "@tanstack/react-query";

export function AddClusterForm() {
  const [file, setFile] = useState<File | null>(null);
  const [clusterName, setClusterName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

    try {
      setIsLoading(true);
      const kubeconfig = await file.text();
      await kubernetesApi.addCluster(clusterName, kubeconfig);
      
      toast({
        title: "Success",
        description: "Cluster added successfully",
      });
      
      queryClient.invalidateQueries({ queryKey: ['clusters'] });
      setClusterName("");
      setFile(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add cluster",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="kubeconfig">Kubeconfig File</Label>
        <Input
          id="kubeconfig"
          type="file"
          accept=".yaml,.yml"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Adding Cluster..." : "Add Cluster"}
      </Button>
    </form>
  );
}