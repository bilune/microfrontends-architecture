import React, { FC, ReactNode } from "react";
import styles from "./layout.module.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import Link from "next/link";
import useUser from "@/utils/useUser";

const prefetch = process.env.NODE_ENV === 'production';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const route = process.env.NEXT_PUBLIC_HOST || '';
  return (
    <div>
      <UserProvider>
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className={styles.button}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>
        <aside
          id="default-sidebar"
          className={styles.aside}
          aria-label="Sidebar"
        >
          <div className={styles.container}>
            <ul className={styles.list}>
              <li>
                <Link
                  href={`${route}/`}
                  className={styles.listItem}
                  prefetch={prefetch}
                >
                  <svg
                    aria-hidden="true"
                    className={styles.icon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                  <span className={styles.listItemContent}>Host</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`${route}/mf-1`}
                  className={styles.listItem}
                  prefetch={prefetch}
                >
                  <svg
                    aria-hidden="true"
                    className={styles.icon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span className={styles.listItemContent}>MF 1</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`${route}/mf-1/subpage`}
                  className={styles.listItem}
                  prefetch={prefetch}
                >
                  <svg
                    aria-hidden="true"
                    className={styles.icon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  </svg>
                  <span className={styles.listItemContent}>MF1 Subpage</span>
                </Link>
              </li>
              <li>
                <a href="#" className={styles.listItem}>
                  <svg
                    aria-hidden="true"
                    className={styles.icon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className={styles.listItemContent}>Users</span>
                </a>
              </li>
              <li>
                <a href="#" className={styles.listItem}>
                  <svg
                    aria-hidden="true"
                    className={styles.icon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className={styles.listItemContent}>Products</span>
                </a>
              </li>
            </ul>
            <hr style={{ margin: "1rem 0" }} />
            <li className={styles.listItem}>
              Soy {process.env.NEXT_PUBLIC_APP_NAME} desde{" "}
              {process.env.NODE_ENV === "development" ? "local" : "remoto"}
            </li>
            <BottomNav />
          </div>
        </aside>

        <div className={styles.mainContainer}>{children}</div>
      </UserProvider>
    </div>
  );
};

const BottomNav = () => {
  const { user } = useUser();
  const { asPath, basePath } = useRouter();
  return (
    <ul className="bottom-nav">
      <style jsx>{`
        .bottom-nav {
          margin-top: auto;
        }
      `}</style>
      {!user && (
        <li>
          <a
            className={styles.listItem}
            href={`/api/auth/login?returnTo=${basePath}${asPath}`}
          >
            <svg
              aria-hidden="true"
              className={styles.icon}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className={styles.listItemContent}>Sign In</span>
          </a>
        </li>
      )}
      {user && (
        <li>
          <a className={styles.listItem} href="/api/auth/logout">
            <svg
              aria-hidden="true"
              className={styles.icon}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                clipRule="evenodd"
              />
            </svg>
            <span className={styles.listItemContent}>Log out</span>
          </a>
        </li>
      )}
    </ul>
  );
};

export default Layout;
