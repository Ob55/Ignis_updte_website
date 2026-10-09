import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { Hero } from '@/components/home/Hero';
import { Gap } from '@/components/home/Gap';
import { Journey } from '@/components/home/Journey';
import { KitchenChanges } from '@/components/home/KitchenChanges';
import { SolutionsBlock } from '@/components/home/SolutionsBlock';
import { Savings } from '@/components/home/Savings';
import { WhySteam } from '@/components/home/WhySteam';
import { CleanCookIQ } from '@/components/home/CleanCookIQ';
import { ProofStrip } from '@/components/home/ProofStrip';
import { ProgrammeExample } from '@/components/home/ProgrammeExample';
import { WhoWeWorkWith } from '@/components/home/WhoWeWorkWith';
import { BuiltInKenya } from '@/components/home/BuiltInKenya';
import { OurWork } from '@/components/home/OurWork';
import { FieldNotes } from '@/components/home/FieldNotes';
import { ClosingCta } from '@/components/home/ClosingCta';

// Homepage, 15 blocks in the order set by the Website Review and Content
// Specification (30 Sept 2026): lead with the institution's problem, explain the
// transition, show the economics, prove the work, then open the next conversation.
// Blocks 9 and 10 are gated by flags in content/flags.js and render nothing until
// their data and approvals exist.
export default function Home() {
  useSeo(seoFor('/'));
  return (
    <>
      <Hero />{/* 1 */}
      <Gap />{/* 2 */}
      <Journey />{/* 3 */}
      <KitchenChanges />{/* 4 */}
      <SolutionsBlock />{/* 5 */}
      <Savings />{/* 6 */}
      <WhySteam />{/* 7 */}
      <CleanCookIQ />{/* 8 */}
      <ProofStrip />{/* 9 — SHOW_PROOF_STRIP */}
      <ProgrammeExample />{/* 10 — SHOW_TAITA_TAVETA */}
      <WhoWeWorkWith />{/* 11 */}
      <BuiltInKenya />{/* 12 */}
      <OurWork />{/* 13 */}
      <FieldNotes />{/* 14 */}
      <ClosingCta />{/* 15 */}
    </>
  );
}
