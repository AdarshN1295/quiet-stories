import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/notes', label: 'Notes' },
  { to: '/stories', label: 'Stories' },
]

function Navbar() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <NavLink to="/" end className="font-bold text-neutral-900 no-underline">
          quietstories
        </NavLink>
        <nav>
          <ul className="flex list-none gap-6 p-0">
            {links.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `no-underline text-neutral-600 hover:text-neutral-900 ${
                      isActive ? 'font-bold text-neutral-900 underline' : ''
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
