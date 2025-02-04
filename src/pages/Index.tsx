import { Layout } from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Welcome to Cluster Connectivity Hub</h2>
        <p className="text-muted-foreground">
          Manage your Kubernetes clusters, deployments, and resources from a single dashboard.
        </p>
      </div>
    </Layout>
  );
};

export default Index;