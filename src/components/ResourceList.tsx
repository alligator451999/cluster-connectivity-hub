import { useQuery } from "@tanstack/react-query";
import { kubernetesApi } from "@/services/kubernetes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface ResourceListProps {
  clusterId: string;
}

export function ResourceList({ clusterId }: ResourceListProps) {
  const { data: resources, isLoading } = useQuery({
    queryKey: ['resources', clusterId],
    queryFn: () => kubernetesApi.getResources(clusterId),
    enabled: !!clusterId,
  });

  if (isLoading) {
    return <div>Loading resources...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Kind</TableHead>
          <TableHead>Namespace</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Age</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resources?.map((resource) => (
          <TableRow key={resource.id}>
            <TableCell>{resource.name}</TableCell>
            <TableCell>{resource.kind}</TableCell>
            <TableCell>{resource.namespace}</TableCell>
            <TableCell>
              <Badge variant={resource.status === 'Running' ? 'default' : 'secondary'}>
                {resource.status}
              </Badge>
            </TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(resource.created_at), { addSuffix: true })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}