import type { Metadata } from "next";
import BlogDonjakEditor from "@/components/blog-admin/BlogDonjakEditor";

export const metadata: Metadata = {
  title: "Editor do blog | União Andrade",
  robots: { index: false, follow: false },
};

export default function BlogAdminPage() {
  return <BlogDonjakEditor />;
}
