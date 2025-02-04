import { useQuery } from "@tanstack/react-query";
import { kubernetesApi } from "@/services/kubernetes";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ResourceList } from "./ResourceList";
import { HelmReleases } from "./HelmReleases";

export function Dashboard() {
  const { data: clusters } = useQuery({
    queryKey: ['clusters'],
    queryFn: kubernetesApi.getClusters
  });

  const { data: metrics } = useQuery({
    queryKey: ['metrics', clusters?.[0]?.id],
    queryFn: () => clusters?.[0]?.id ? kubernetesApi.getClusterMetrics(clusters[0].id) : null,
    enabled: !!clusters?.[0]?.id,
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  const currentClusterId = clusters?.[0]?.id;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.cpu_usage}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.memory_usage}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.pod_count}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.node_count}</div>
          </CardContent>
        </Card>
      </div>

      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle>Resource Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  {
                    name: 'CPU',
                    value: metrics.cpu_usage
                  },
                  {
                    name: 'Memory',
                    value: metrics.memory_usage
                  }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {currentClusterId && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Kubernetes Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ResourceList clusterId={currentClusterId} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Helm Releases</CardTitle>
            </CardHeader>
            <CardContent>
              <HelmReleases clusterId={currentClusterId} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}