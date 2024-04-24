import { Layout } from '../layout';
import Link from 'next/link';

export const HomePage = () => {
  return (
    <Layout>
      <h1>Hello YaPX</h1>
      <Link href={'/post/2'}>
        <p>Very interestin POST</p>
      </Link>
      <Link href={'/post/4'}>
        <p>Very interestin POST</p>
      </Link>
    </Layout>
  );
};
