"use client";
import { usePathname, useRouter } from "next/navigation";
import { MENU_LIST } from "./constants";

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // const activePage = window.location.pathname;

  const handleChangePage = (path) => {
    router.push(path);
  };

  return (
    <main className="layout">
      <aside className="sidebar">
        <nav className="sidebar__nav">
          <ul className="flex items-center justify-center flex-col h-full py-5 pr-3">
            {MENU_LIST.map((menu, index) => {
              return (
                <li key={index} className={pathname === menu.path ? "active" : ""} onClick={() => handleChangePage(menu.path)}>
                  {menu.name}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <section className="content">{children}</section>
    </main>
  );
}
