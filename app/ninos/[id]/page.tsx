import { ninos } from "@/lib/ninos-data";
import { notFound } from "next/navigation";
import { NinoProfileContent } from "@/components/nino-profile-content";

export default async function NinoProfilePage({
  params,
}: PageProps<"/ninos/[id]">) {
  const { id } = await params;
  const nino = ninos.find((n) => n.id === id);

  if (!nino) {
    notFound();
  }

  return <NinoProfileContent nino={nino} />;
}