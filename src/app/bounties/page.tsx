import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  Award,
  Clock,
  Users,
  TrendingUp,
  User,
  Calendar,
} from "lucide-react";
import Link from "next/link";

// Mock data for bounties
const bounties = [
  {
    id: "1",
    title: "How to implement cross-chain token transfers using LayerZero?",
    amount: 50,
    currency: "USD",
    status: "active",
    timeLeft: "5 days",
    answers: 5,
    views: 1247,
    author: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?key=kjuw1",
      reputation: 1250,
    },
    tags: ["solidity", "cross-chain", "layerzero"],
    createdAt: "2 hours ago",
    expiresAt: "2025-01-26",
    progress: 60,
  },
  {
    id: "2",
    title: "Gas optimization techniques for NFT minting contracts",
    amount: 75,
    currency: "USD",
    status: "active",
    timeLeft: "3 days",
    answers: 12,
    views: 2341,
    author: {
      name: "Maria Santos",
      avatar: "/placeholder.svg?key=kkmsd",
      reputation: 890,
    },
    tags: ["nft", "gas-optimization", "ethereum"],
    createdAt: "4 hours ago",
    expiresAt: "2025-01-24",
    progress: 85,
  },
  {
    id: "3",
    title: "Best practices for DeFi protocol security audits",
    amount: 100,
    currency: "USD",
    status: "awarded",
    timeLeft: "Completed",
    answers: 8,
    views: 1876,
    author: {
      name: "David Kim",
      avatar: "/placeholder.svg?key=2jiw9",
      reputation: 2100,
    },
    tags: ["defi", "security", "audit"],
    createdAt: "1 day ago",
    expiresAt: "2025-01-20",
    progress: 100,
    winner: "Sarah Kim",
  },
  {
    id: "4",
    title: "Integrating Chainlink oracles with custom price feeds",
    amount: 25,
    currency: "USD",
    status: "awarded",
    timeLeft: "6 hours",
    answers: 6,
    views: 934,
    author: {
      name: "Tom Johnson",
      avatar: "/placeholder.svg?key=3ewmw",
      reputation: 1420,
    },
    tags: ["chainlink", "oracles", "price-feeds"],
    createdAt: "6 days ago",
    expiresAt: "2025-01-22",
    progress: 90,
  },
  {
    id: "5",
    title: "MEV protection strategies for AMM implementations",
    amount: 150,
    currency: "USD",
    status: "active",
    timeLeft: "12 days",
    answers: 3,
    views: 567,
    author: {
      name: "Lisa Wang",
      avatar: "/placeholder.svg?key=af7iu",
      reputation: 1650,
    },
    tags: ["mev", "amm", "defi"],
    createdAt: "1 hour ago",
    expiresAt: "2025-02-02",
    progress: 25,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-sky-400";
    case "awarded":
      return "bg-green-400";
    case "expired":
      return "bg-gray-600";
    default:
      return "bg-gray-600";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Active";
    case "expiring":
      return "Expiring Soon";
    case "awarded":
      return "Awarded";
    case "expired":
      return "Expired";
    default:
      return "Unknown";
  }
};

export default function BountiesPage() {
  const totalBounties = bounties.length;
  const activeBounties = bounties.filter(
    (b) => b.status === "active" || b.status === "expiring"
  ).length;
  const totalValue = bounties.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    C
                  </span>
                </div>
              </Link>
              <h1 className="text-xl font-bold text-foreground">BaseQuery</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/questions"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Questions
              </Link>
              <Link href="/bounties" className="text-foreground font-medium">
                Bounties
              </Link>
              <Link href="/ask">
                <Button>
                  <Award className="w-4 h-4 mr-2" />
                  Create Bounty
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Page Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Active Bounties
              </h2>
              <p className="text-muted-foreground">
                Discover questions with bounty rewards. Answer well and earn
                from the community.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {activeBounties}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Active Bounties
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        ${totalValue}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Value
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {totalBounties}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Bounties
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Search bounties..." className="pl-10" />
                </div>
                <Button>
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="flex gap-4">
                <Select defaultValue="highest">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="highest">Highest Value</SelectItem>
                    <SelectItem value="lowest">Lowest Value</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="expiring">Expiring Soon</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Bounties</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="expiring">Expiring Soon</SelectItem>
                    <SelectItem value="awarded">Recently Awarded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bounties List */}
            <div className="space-y-6">
              {bounties.map((bounty) => (
                <Card
                  key={bounty.id}
                  className="hover:shadow-md transition-shadow gap-1"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={getStatusColor(bounty.status)}>
                            {getStatusText(bounty.status)}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{bounty.timeLeft}</span>
                          </div>
                        </div>

                        <Link href={`/questions/${bounty.id}`}>
                          <CardTitle className="text-lg mb-2 hover:text-primary transition-colors cursor-pointer">
                            {bounty.title}
                          </CardTitle>
                        </Link>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                              <AvatarImage
                                src={bounty.author.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                <User className="w-3 h-3" />
                              </AvatarFallback>
                            </Avatar>
                            <span>{bounty.author.name}</span>
                            <span>•</span>
                            <span>{bounty.author.reputation} rep</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Expires {bounty.expiresAt}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mb-4">
                          {bounty.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Progress Bar */}
                        {/* <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">
                              Community Interest
                            </span>
                            <span className="text-muted-foreground">
                              {bounty.progress}%
                            </span>
                          </div>
                          <Progress value={bounty.progress} className="h-2" />
                        </div> */}
                      </div>

                      <div className="ml-6 text-right">
                        <div className="text-3xl font-bold text-primary mb-1">
                          ${bounty.amount}
                        </div>
                        <div className="text-sm text-muted-foreground mb-3">
                          USDC Bounty
                        </div>
                        {/* {bounty.status === "awarded" && bounty.winner && (
                          <Badge variant="default" className="bg-green-600">
                            Won by {bounty.winner}
                          </Badge>
                        )} */}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {bounty.answers} answers
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/questions/${bounty.id}`}>
                          <Button variant="neutral" size="sm">
                            View Question
                          </Button>
                        </Link>
                        {bounty.status === "active" && (
                          <Button size="sm">Answer & Earn</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                <Button disabled>Previous</Button>
                <Button className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button>2</Button>
                <Button>3</Button>
                <Button>Next</Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* How Bounties Work */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How Bounties Work</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">1. Browse & Answer</h4>
                    <p className="text-muted-foreground">
                      Find questions with bounties and provide detailed answers.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">2. Community Votes</h4>
                    <p className="text-muted-foreground">
                      The community votes on the best answers.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">3. Earn Rewards</h4>
                    <p className="text-muted-foreground">
                      Question authors award bounties to the best answers.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Top Bounty Winners */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Bounty Winners</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Sarah Kim", earned: 450, bounties: 12 },
                    { name: "Mike Rodriguez", earned: 380, bounties: 9 },
                    { name: "David Kim", earned: 320, bounties: 8 },
                  ].map((winner, index) => (
                    <div key={winner.name} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={`/winner_placeholder.png?key=winner${index}&height=32&width=32&query=${winner.name}`}
                        />
                        <AvatarFallback>
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{winner.name}</div>
                        <div className="text-xs text-muted-foreground">
                          ${winner.earned} earned • {winner.bounties} bounties
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Bounty Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { category: "DeFi", count: 23, value: 1250 },
                      { category: "Smart Contracts", count: 18, value: 890 },
                      { category: "Security", count: 15, value: 750 },
                      { category: "NFTs", count: 12, value: 600 },
                    ].map((cat) => (
                      <div
                        key={cat.category}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <div className="text-sm font-medium">
                            {cat.category}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {cat.count} bounties
                          </div>
                        </div>
                        <div className="text-sm font-medium text-primary">
                          ${cat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
