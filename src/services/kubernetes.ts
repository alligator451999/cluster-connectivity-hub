import { supabase } from '@/lib/supabase';
import { Cluster, KubernetesResource, HelmRelease, ClusterMetrics } from '@/types/kubernetes';

export const kubernetesApi = {
  // Cluster Management
  async addCluster(name: string, kubeconfig: string): Promise<Cluster> {
    const { data, error } = await supabase
      .from('clusters')
      .insert([{ name, kubeconfig }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getClusters(): Promise<Cluster[]> {
    const { data, error } = await supabase
      .from('clusters')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  // Resource Management
  async getResources(clusterId: string): Promise<KubernetesResource[]> {
    const { data, error } = await supabase
      .from('kubernetes_resources')
      .select('*')
      .eq('cluster_id', clusterId);
    
    if (error) throw error;
    return data;
  },

  async updateResource(
    clusterId: string,
    kind: string,
    name: string,
    namespace: string,
    spec: any
  ): Promise<void> {
    const { error } = await supabase
      .from('kubernetes_resources')
      .update({ spec })
      .match({ cluster_id: clusterId, kind, name, namespace });
    
    if (error) throw error;
  },

  // Helm Management
  async installHelmChart(
    clusterId: string,
    name: string,
    chart: string,
    version: string,
    values: any
  ): Promise<void> {
    const { error } = await supabase
      .from('helm_releases')
      .insert([{
        cluster_id: clusterId,
        name,
        chart,
        version,
        values,
        status: 'pending'
      }]);
    
    if (error) throw error;
  },

  async getHelmReleases(clusterId: string): Promise<HelmRelease[]> {
    const { data, error } = await supabase
      .from('helm_releases')
      .select('*')
      .eq('cluster_id', clusterId);
    
    if (error) throw error;
    return data;
  },

  // Metrics
  async getClusterMetrics(clusterId: string): Promise<ClusterMetrics> {
    const { data, error } = await supabase
      .from('cluster_metrics')
      .select('*')
      .eq('cluster_id', clusterId)
      .single();
    
    if (error) throw error;
    return data;
  }
};