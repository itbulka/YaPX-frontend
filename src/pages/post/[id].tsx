import { Layout } from "@/components/layout";
import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  return (
    <Layout>
      <p>Post: {router.query.id} </p>
    </Layout>
  );
}