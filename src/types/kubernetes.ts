export interface Cluster {
  id: string;
  name: string;
  kubeconfig: string;
  created_at: string;
}

export interface KubernetesResource {
  name: string;
  namespace: string;
  kind: string;
  status: string;
  created_at: string;
  cluster_id: string;
}

export interface HelmRelease {
  name: string;
  namespace: string;
  chart: string;
  version: string;
  status: string;
  cluster_id: string;
}

export interface ClusterMetrics {
  cpu_usage: number;
  memory_usage: number;
  pod_count: number;
  node_count: number;
  cluster_id: string;
}