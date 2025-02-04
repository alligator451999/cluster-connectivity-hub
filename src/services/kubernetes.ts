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
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async deleteCluster(id: string): Promise<void> {
    const { error } = await supabase
      .from('clusters')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Resource Management
  async getResources(clusterId: string): Promise<KubernetesResource[]> {
    const { data, error } = await supabase
      .from('kubernetes_resources')
      .select('*')
      .eq('cluster_id', clusterId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createResource(
    clusterId: string,
    kind: string,
    name: string,
    namespace: string,
    spec: any
  ): Promise<void> {
    const { error } = await supabase
      .from('kubernetes_resources')
      .insert([{
        cluster_id: clusterId,
        kind,
        name,
        namespace,
        spec,
        status: 'Pending'
      }]);
    
    if (error) throw error;
  },

  async updateResource(
    id: string,
    spec: any,
    status: string
  ): Promise<void> {
    const { error } = await supabase
      .from('kubernetes_resources')
      .update({ spec, status })
      .eq('id', id);
    
    if (error) throw error;
  },

  async deleteResource(id: string): Promise<void> {
    const { error } = await supabase
      .from('kubernetes_resources')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Helm Management
  async installHelmChart(
    clusterId: string,
    name: string,
    namespace: string,
    chart: string,
    version: string,
    values: any
  ): Promise<void> {
    const { error } = await supabase
      .from('helm_releases')
      .insert([{
        cluster_id: clusterId,
        name,
        namespace,
        chart,
        version,
        values,
        status: 'Pending'
      }]);
    
    if (error) throw error;
  },

  async getHelmReleases(clusterId: string): Promise<HelmRelease[]> {
    const { data, error } = await supabase
      .from('helm_releases')
      .select('*')
      .eq('cluster_id', clusterId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async updateHelmRelease(
    id: string,
    values: any,
    status: string
  ): Promise<void> {
    const { error } = await supabase
      .from('helm_releases')
      .update({ values, status })
      .eq('id', id);
    
    if (error) throw error;
  },

  async deleteHelmRelease(id: string): Promise<void> {
    const { error } = await supabase
      .from('helm_releases')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Metrics
  async getClusterMetrics(clusterId: string): Promise<ClusterMetrics> {
    const { data, error } = await supabase
      .from('cluster_metrics')
      .select('*')
      .eq('cluster_id', clusterId)
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateClusterMetrics(
    clusterId: string,
    metrics: Omit<ClusterMetrics, 'cluster_id' | 'timestamp'>
  ): Promise<void> {
    const { error } = await supabase
      .from('cluster_metrics')
      .insert([{
        cluster_id: clusterId,
        ...metrics
      }]);
    
    if (error) throw error;
  }
};