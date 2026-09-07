import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-2 text-sm text-slate-600">The requested page does not exist.</p>
      <Link className="mt-4 inline-block text-sm font-medium text-rose-600 hover:text-rose-500" to="/">
        Go to home
      </Link>
    </div>
  );
}
