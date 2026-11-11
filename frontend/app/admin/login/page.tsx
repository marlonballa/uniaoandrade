import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { hasValidAdminSession } from "@/lib/open-andrade/admin-session";

export const metadata: Metadata = {
  title: "Acesso da equipe | União Andrade",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const request = new Request("http://localhost/admin/login", {
    headers: { cookie: cookieStore.toString() },
  });
  if (hasValidAdminSession(request)) redirect("/admin");
  return <AdminLoginForm />;
}
