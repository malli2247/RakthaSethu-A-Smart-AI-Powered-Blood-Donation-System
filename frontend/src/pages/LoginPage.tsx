import { SectionCard } from '../components/common/SectionCard';

export function LoginPage() {
  return (
    <SectionCard
      title="Login"
      description="Authentication forms and JWT-based login flow will be implemented in Phase 2."
    >
      <p className="text-sm text-slate-600">Use this route as the dedicated authentication entry point.</p>
    </SectionCard>
  );
}
