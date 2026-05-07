import { useState } from 'react'
import { Layout }             from '../components/Layout'
import { OverviewPage }       from './OverviewPage'
import { ColorsPage }         from './ColorsPage'
import { TypographyPage }     from './TypographyPage'
import { SpacingPage }        from './SpacingPage'
import { CornerRadiusPage }   from './CornerRadiusPage'
import { GridPage }           from './GridPage'
import { ElevationPage }      from './ElevationPage'
import { IconsPage }          from './IconsPage'
// Components
import { ButtonPage }         from './ButtonPage'
import { LinkPage }           from './LinkPage'
import { TextInputPage }      from './TextInputPage'
import { PasswordPage }       from './PasswordPage'
import { MobileNumberPage }   from './MobileNumberPage'
import { TextareaPage }       from './TextareaPage'
import { DropdownPage }       from './DropdownPage'
import { SearchPage }         from './SearchPage'
import { CheckboxPage }       from './CheckboxPage'
import { RadioButtonPage }    from './RadioButtonPage'
import { ToggleSwitchPage }   from './ToggleSwitchPage'
import { BadgePage }          from './BadgePage'
import { LoaderPage }         from './LoaderPage'
import { PlaceholderLogoPage } from './PlaceholderLogoPage'

const docPages = {
  // Foundation
  overview:        OverviewPage,
  typography:      TypographyPage,
  colors:          ColorsPage,
  spacing:         SpacingPage,
  'corner-radius': CornerRadiusPage,
  grid:            GridPage,
  elevation:       ElevationPage,
  icons:           IconsPage,
  // Components
  'comp-button':           ButtonPage,
  'comp-link':             LinkPage,
  'comp-text-input':       TextInputPage,
  'comp-password':         PasswordPage,
  'comp-mobile-number':    MobileNumberPage,
  'comp-textarea':         TextareaPage,
  'comp-dropdown':         DropdownPage,
  'comp-search':           SearchPage,
  'comp-checkbox':         CheckboxPage,
  'comp-radio-button':     RadioButtonPage,
  'comp-toggle-switch':    ToggleSwitchPage,
  'comp-badge':            BadgePage,
  'comp-loader':           LoaderPage,
  'comp-placeholder-logo': PlaceholderLogoPage,
}

export function DocsApp() {
  const [activePage, setActivePage] = useState('overview')

  function handleNavigate(page) {
    setActivePage(page)
    window.scrollTo(0, 0)
  }

  const Page = docPages[activePage] || OverviewPage

  return (
    <Layout activePage={activePage} onNavigate={handleNavigate}>
      <Page onNavigate={handleNavigate} />
    </Layout>
  )
}
