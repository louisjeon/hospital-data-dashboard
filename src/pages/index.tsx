import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { PatientsTable } from "../components/PatientsTable";
import Head from "next/head";

const Index = () => (
  <Container>
    <Head>
      <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
    </Head>
    <Hero />
    <PatientsTable />
  </Container>
);

export default Index;
