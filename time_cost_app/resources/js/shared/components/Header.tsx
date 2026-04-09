import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { AppearanceNavControl } from "@/components/appearance-nav-control";
import { logout } from "@/routes";
import MenuIcon from "../../assets/Menu-16.svg";
import StarIcon from "../../assets/Star.svg";
import XIcon from "../../assets/X-16.svg";
import XSmall from "../../assets/X.svg";
import NavigationPillList from "./NavigationPillList";
import type { NavItem } from "./NavigationPillList";

interface HeaderProps {
  className?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoLinkTo?: string;
  navItems?: NavItem[];
  showAuth?: boolean;
}

export default function Header({
  className = "",
  logoSrc,
  logoAlt = "",
  logoLinkTo = "/",
  navItems,
  showAuth = true,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const page = usePage();
  const auth = (page.props as { auth?: { user?: { id?: unknown } } }).auth;
  const isAuthenticated = Boolean(auth?.user?.id);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background-default-default border-solid border-b border-border-default-default border-b-[1px] box-border h-16 overflow-hidden flex items-center flex-wrap content-center px-space-800 gap-x-space-600 gap-y-0 text-left text-body-size-medium text-text-default-default font-body-font-family ${className}`}
    >
      <div className="flex items-center gap-6 shrink-0 md:hidden">
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="cursor-pointer border-border-default-default border-solid border-stroke-border p-space-300 bg-background-default-secondary w-11 h-11 rounded-scale-06 box-border overflow-hidden shrink-0 flex items-center justify-center"
        >
          <img
            className="h-5 w-5 cursor-pointer border-none bg-transparent p-0 dark:invert"
            alt=""
            src={mobileOpen ? XIcon : MenuIcon}
          />
        </button>
        {logoSrc && (
          <Link href={logoLinkTo} className="flex items-center shrink-0">
            <img
              className="h-[50px] w-[50px] object-cover dark:[filter:brightness(0)_invert(1)]"
              loading="lazy"
              alt={logoAlt}
              src={logoSrc}
            />
          </Link>
        )}
      </div>

      {logoSrc && (
        <Link
          href={logoLinkTo}
          className="hidden md:flex items-center shrink-0 h-[50px] w-[50px]"
        >
          <img
            className="h-[50px] w-[50px] object-cover dark:[filter:brightness(0)_invert(1)]"
            loading="lazy"
            alt={logoAlt}
            src={logoSrc}
          />
        </Link>
      )}

      <div className="hidden md:flex min-w-0 flex-1 items-center gap-3">
        <div className="min-w-0 flex-1">
          <NavigationPillList items={navItems} onNavigate={() => setMobileOpen(false)} />
        </div>
        <AppearanceNavControl />
      </div>

      {showAuth && (
        <div className="hidden md:flex w-[178px] items-center gap-space-300 shrink-0">
          {isAuthenticated ? (
            <Link
              href={logout()}
              as="button"
              onClick={() => router.flushAll()}
              className="flex-1 bg-transparent border-0 overflow-hidden flex items-center justify-center p-space-200 gap-space-200 no-underline text-text-default-default hover:opacity-90 hover:underline decoration-neutral-500/60 underline-offset-4 dark:decoration-neutral-400/60"
              data-test="logout-button"
            >
              <span className="relative leading-[100%] shrink-0">Sign out</span>
            </Link>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="flex-1 rounded-radius-200 bg-background-neutral-tertiary border-border-neutral-secondary border-solid border-stroke-border overflow-hidden flex items-center justify-center p-space-200 gap-space-200 no-underline text-text-default-default hover:opacity-90"
              >
                <img className="h-4 w-4 relative hidden shrink-0" alt="" src={StarIcon} />
                <span className="relative leading-[100%] shrink-0">Sign in</span>
                <img className="h-4 w-4 relative hidden shrink-0" alt="" src={XSmall} />
              </Link>
              <Link
                href="/register"
                className="flex-1 rounded-radius-200 bg-background-brand-default border-border-brand-default border-solid border-stroke-border overflow-hidden flex items-center justify-center p-space-200 gap-space-200 text-text-brand-on-brand no-underline hover:opacity-90"
              >
                <img className="h-4 w-4 relative hidden shrink-0" alt="" src={StarIcon} />
                <span className="relative leading-[100%] shrink-0">Register</span>
                <img className="h-4 w-4 relative hidden shrink-0" alt="" src={XSmall} />
              </Link>
            </>
          )}
        </div>
      )}

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background-utilities-scrim md:hidden"
          aria-hidden
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div
        className={`fixed top-16 left-0 right-0 z-40 bg-background-default-default border-b border-border-default-default shadow-md md:hidden transition-transform duration-200 ${mobileOpen ? "block" : "hidden"}`}
      >
        <div className="flex flex-col py-4 px-space-800 gap-2">
          <div className="flex justify-center border-b border-border-default-default pb-3 mb-1">
            <AppearanceNavControl />
          </div>
          <NavigationPillList
            items={navItems}
            direction="Column"
            onNavigate={() => setMobileOpen(false)}
          />
          {showAuth && (
            <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border-default-default">
              {isAuthenticated ? (
                <Link
                  href={logout()}
                  as="button"
                  onClick={() => {
                    setMobileOpen(false);
                    router.flushAll();
                  }}
                  className="bg-transparent border-0 p-space-200 text-center no-underline text-text-default-default hover:opacity-90 hover:underline decoration-neutral-500/60 underline-offset-4 dark:decoration-neutral-400/60"
                  data-test="logout-button"
                >
                  Sign out
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-radius-200 bg-background-neutral-tertiary border border-border-neutral-secondary p-space-200 text-center no-underline text-text-default-default"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-radius-200 bg-background-brand-default border border-border-brand-default p-space-200 text-center no-underline text-text-brand-on-brand"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
