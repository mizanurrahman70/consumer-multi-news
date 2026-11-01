import Link from "next/link";

import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-4 py-20">
      <span className="text-kicker-label">404</span>
      <h1 className="text-hero font-bold">This page could not be found.</h1>
      <p className="text-meta-muted">The link may be broken or the page may have been removed.</p>
      <Link href="/" className={buttonClasses("red")}>
        Back to home
      </Link>
    </Container>
  );
}
