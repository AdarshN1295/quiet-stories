import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12 text-center">
      <h1 className="text-3xl font-bold text-neutral-900">Page not found</h1>
      <p className="mt-4">
        <Link to="/" className="text-neutral-900 underline hover:text-neutral-600">
          Go back home
        </Link>
      </p>
    </section>
  )
}

export default NotFoundPage
