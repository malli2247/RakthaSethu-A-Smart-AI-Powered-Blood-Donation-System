import { SectionCard } from '../components/common/SectionCard';

const roleCards = ['Donor', 'Patient', 'Hospital', 'Blood Bank', 'Admin'];

export function DashboardPage() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {roleCards.map((role) => (
        <SectionCard
          key={role}
          title={`${role} Dashboard`}
          description="Dedicated dashboard widgets and role actions will be connected in later phases."
        >
          <p className="text-sm text-slate-600">Prepared route and component boundaries for {role.toLowerCase()} workflows.</p>
        </SectionCard>
      ))}
    </div>
  );
}
