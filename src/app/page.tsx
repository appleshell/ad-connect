"use client";
import { redirect } from "next/navigation";

export default function Home() {
  if (typeof window !== "undefined") {
    const userCode = window.localStorage.getItem("AUTH_USER");
    if (userCode) {
      redirect("main/");
    } else {
      redirect("/login");
    }
  }
}
