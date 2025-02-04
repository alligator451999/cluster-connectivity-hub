export interface Cluster {
  id: string;
  name: string;
  kubeconfig: string;
  created_at: string;
}

export interface KubernetesResource {
  id: string;
  cluster_id: string;
  kind: string;
  name: string;
  namespace: string;
  spec: any;
  status: string;
  created_at: string;
}

export interface HelmRelease {
  id: string;
  cluster_id: string;
  name: string;
  namespace: string;
  chart: string;
  version: string;
  values: any;
  status: string;
  created_at: string;
}

export interface ClusterMetrics {
  id: string;
  cluster_id: string;
  cpu_usage: number;
  memory_usage: number;
  pod_count: number;
  node_count: number;
  timestamp: string;
}