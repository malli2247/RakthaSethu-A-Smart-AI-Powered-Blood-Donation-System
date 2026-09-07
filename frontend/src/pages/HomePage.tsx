import { SectionCard } from '../components/common/SectionCard';

export function HomePage() {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Smart Blood Donation Network"
        description="Phase 1 foundation with role-based architecture for donors, patients, hospitals, blood banks, and admins."
      >
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Secure authentication and role-based modules.</li>
          <li>Scalable request and donor matching architecture.</li>
          <li>Dedicated AI service boundary for modular matching intelligence.</li>
        </ul>
      </SectionCard>
    </div>
  );
}
