const modules = [
  'Authentication & role-based access',
  'Donor, patient, hospital, and blood-bank workflows',
  'Smart donor matching and emergency pipeline',
  'Inventory, notifications, and admin analytics'
]

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-700">RakthaSethu</p>
          <h1 className="mt-2 text-3xl font-bold">Smart AI-Powered Blood Donation System</h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Phase 1 foundation is active: frontend, backend API, PostgreSQL schema, and AI-service baseline are now scaffolded for incremental delivery.
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Current stack</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            <li>React + TypeScript + Tailwind CSS</li>
            <li>Node.js + Express + TypeScript REST API</li>
            <li>PostgreSQL with Prisma ORM schema</li>
            <li>Python AI service with transparent rule-based matcher</li>
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Planned modules</h2>
          <ul className="mt-4 space-y-2 text-slate-700">
            {modules.map((module) => (
              <li className="rounded-lg bg-slate-100 px-3 py-2" key={module}>
                {module}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
