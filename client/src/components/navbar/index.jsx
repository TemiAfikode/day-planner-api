import { useSession } from "next-auth/react";
import Link from "next/link";
import style from "./navbar.module.css";

export default function Navbar() {
  const { status } = useSession();

  return (
    <nav className={style["navbar-main"]}>
      <div className={"container " + style["nav-container"]}>
        <div className={style["nav-logo"]}>
          <img src="/imgs/logo.svg" alt="logo image" />
        </div>
        <ul className={style["nav-menu-list"]}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#service">Features</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          {status === "authenticated" && (
            <li className={style["dashboard-link"]}>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
