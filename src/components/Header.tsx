"use client";
import React from "react";
import { Button } from "./ui/button";
import { Bot, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import WalletBtn from "./wallet-btn";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";

export default function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                C
              </span>
            </div>
            <h1 className="text-xl font-bold text-foreground"></h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/questions"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Questions
            </a>
            <a
              href="/bounties"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Bounties
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Leaderboard
            </a>
            <Button
              size="sm"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                })
              }
            >
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Ask Question
            </Button>
            <WalletBtn />
          </nav>
        </div>
      </div>
    </header>
  );
}
