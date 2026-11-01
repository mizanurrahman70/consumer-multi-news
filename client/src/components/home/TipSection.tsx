import { ButtonLink } from "@/components/ui/Button";
import { SECTION_IDS } from "@/config/navigation";

interface TipSectionProps {
  messengerUrl: string;
}

/** Yellow call-to-action asking readers to send consumer complaints. */
export function TipSection({ messengerUrl }: TipSectionProps) {
  return (
    <section
      id={SECTION_IDS.tip}
      className="mt-12 flex scroll-mt-40 flex-wrap items-center justify-between gap-4 rounded-card bg-accent p-6"
    >
      <div>
        <h2 className="mb-1 text-callout font-bold">Cheated on price, weight or quality?</h2>
        <p className="text-body">Send us your consumer complaint or news tip. Our team may follow up and cover it.</p>
      </div>
      <ButtonLink variant="dark" size="lg" href={messengerUrl}>
        Send a tip on Messenger
      </ButtonLink>
    </section>
  );
}
