import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Banknote,
  ChevronsUpDown,
  Cloud,
  Copy,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import { shortenAddress } from "@/lib/utils";
import { useWallet } from "@/context/WalletContext";

type userInfo = {
  name: string;
  email: string;
  image: string;
};

export default function WalletBtn() {
  const [user, setUser] = useState<userInfo | null>(null);
  const { data: session } = useSession();

  const { evmAddress, balances, requestFaucet } = useWallet();

  useEffect(() => {
    setUser({
      name: session?.user?.name ?? "Anonymous",
      email: session?.user?.email ?? "no-email@example.com",
      image: session?.user?.image ?? "",
    });
  }, [session]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"noShadow"} className="h-12 cursor-pointer">
          <Avatar className="rounded-xl h-8 w-8">
            <AvatarImage src={user?.image} alt={user?.name} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-left">
            <div className="font-semibold">{user?.name}</div>
            <div className="font-light">{shortenAddress(evmAddress, 6, 4)}</div>
          </span>
          <ChevronsUpDown className="ml-auto size-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Wallet />
          {shortenAddress(evmAddress, 8, 8)}
          <Button
            variant="noShadow"
            className="w-4 h-6 cursor-pointer bg-white"
            onClick={async () =>
              await navigator.clipboard.writeText(evmAddress)
            }
          >
            <Copy className="h-[14px]" />
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="font-bold">
          <Banknote />
          {balances[0]} USDC
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />{" "}
        <DropdownMenuItem onClick={() => requestFaucet()}>
          <span>Faucet USDC</span>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud />
          <span>API</span>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
