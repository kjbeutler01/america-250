import { useState } from 'react'
import { TopNav, TopNavHeading, TopNavItem } from '@astryxdesign/core/TopNav'
import { MobileNav } from '@astryxdesign/core/MobileNav'
import { SideNavItem } from '@astryxdesign/core/SideNav'
import { IconButton } from '@astryxdesign/core/IconButton'
import { ToggleButton } from '@astryxdesign/core/ToggleButton'
import { eras } from '../data/eras'
import { BrandStar } from './EraArt'

interface NavProps {
  activeId: string
  year: number
  musicOn: boolean
  onToggleMusic: () => void
}

const MenuIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
)

const NoteIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path
      d="M9 18V6l10-2v11.5M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm10-2.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Nav({ activeId, year, musicOn, onToggleMusic }: NavProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const links = [
    ...eras.map((e) => ({ id: e.id, label: e.navLabel })),
    { id: 'why', label: 'Why America' },
  ]

  return (
    <div className="site-nav">
      <TopNav
        label="Journey through 250 years"
        heading={
          <TopNavHeading
            logo={<BrandStar />}
            heading="America 250"
            headingHref="#top"
          />
        }
        startContent={
          <>
            {links.map((l) => (
              <TopNavItem
                key={l.id}
                label={l.label}
                href={`#${l.id}`}
                isSelected={activeId === l.id}
                data-nav-item="true"
              />
            ))}
          </>
        }
        endContent={
          <>
            <span className="nav-year" aria-label={`Currently reading about the year ${year}`}>
              {year}
            </span>
            <ToggleButton
              label={musicOn ? 'Mute the ambient score' : 'Play the ambient score'}
              icon={NoteIcon}
              isIconOnly
              isPressed={musicOn}
              onPressedChange={onToggleMusic}
            />
            <span className="nav-menu-button">
              <IconButton
                label="Open era navigation"
                icon={MenuIcon}
                variant="ghost"
                onClick={() => setDrawerOpen(true)}
              />
            </span>
          </>
        }
      />
      <MobileNav isOpen={drawerOpen} onOpenChange={setDrawerOpen} header="1776 → 2026">
        {links.map((l) => (
          <SideNavItem
            key={l.id}
            label={l.label}
            href={`#${l.id}`}
            isSelected={activeId === l.id}
            onClick={() => setDrawerOpen(false)}
          />
        ))}
      </MobileNav>
    </div>
  )
}
