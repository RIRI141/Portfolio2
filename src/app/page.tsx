import AboutMe from "@/components/AboutMe";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Work from "@/components/Work";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Layout>
    <Header />
    <AboutMe />
    <Work />
    </Layout>
    </>
  );
}
