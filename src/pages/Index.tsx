import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Welcome to Cluster Connectivity Hub</h2>
          <p className="text-muted-foreground">
            Manage your Kubernetes clusters, deployments, and resources from a single dashboard.
          </p>
        </div>
        <Dashboard />
      </div>
    </Layout>
  );
};

export default Index;