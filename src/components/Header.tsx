"use client";
import React from "react";
import { Button } from "./ui/button";
import { Bot, Plus } from "lucide-react";

import WalletBtn from "./wallet-btn";

import { toast } from "sonner";
import Link from "next/link";
import { LogoName, LogoSymbol } from "@/assets";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link href={"/"}>
              <img src={LogoName.src} alt="BaseQuery" className="h-10" />
            </Link>{" "}
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Button size="sm">
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
            {pathname == "/ask" ? (
              <Link href={"/questions"}>
                <Button size="sm">All Questions</Button>
              </Link>
            ) : (
              <Link href={"/ask"}>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Ask Question
                </Button>
              </Link>
            )}
            {pathname !== "/" && <WalletBtn />}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
