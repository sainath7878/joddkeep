import { Hero } from "components/index";
import { useDocument } from "customHooks/useDocument";

function LandingPage() {
  useDocument("JODDKeep");

  return <Hero className="flex-1" />;
}

export { LandingPage };
