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

interface HelmReleasesProps {
  clusterId: string;
}

export function HelmReleases({ clusterId }: HelmReleasesProps) {
  const { data: releases, isLoading } = useQuery({
    queryKey: ['helm-releases', clusterId],
    queryFn: () => kubernetesApi.getHelmReleases(clusterId),
    enabled: !!clusterId,
  });

  if (isLoading) {
    return <div>Loading Helm releases...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Namespace</TableHead>
          <TableHead>Chart</TableHead>
          <TableHead>Version</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Age</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {releases?.map((release) => (
          <TableRow key={release.id}>
            <TableCell>{release.name}</TableCell>
            <TableCell>{release.namespace}</TableCell>
            <TableCell>{release.chart}</TableCell>
            <TableCell>{release.version}</TableCell>
            <TableCell>
              <Badge variant={release.status === 'Deployed' ? 'default' : 'secondary'}>
                {release.status}
              </Badge>
            </TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(release.created_at), { addSuffix: true })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}