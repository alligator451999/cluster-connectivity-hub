import { useQuery } from "@tanstack/react-query";
import { kubernetesApi } from "@/services/kubernetes";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Dashboard() {
  const { data: clusters } = useQuery({
    queryKey: ['clusters'],
    queryFn: kubernetesApi.getClusters
  });

  const { data: metrics } = useQuery({
    queryKey: ['metrics', clusters?.[0]?.id],
    queryFn: () => clusters?.[0]?.id ? kubernetesApi.getClusterMetrics(clusters[0].id) : null,
    enabled: !!clusters?.[0]?.id
  });

  return (
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

      {metrics && (
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Resource Usage Over Time</CardTitle>
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
    </div>
  );
}