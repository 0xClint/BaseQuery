"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Search,
  Filter,
  Plus,
  Award,
  Users,
  Clock,
  TrendingUp,
  User,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { useWallet } from "@/context/WalletContext";
import { formatUnits } from "viem";
import { formatTimestamp } from "@/lib/utils";
import Header from "@/components/Header";
import Loader from "@/components/Loader";

// Mock data - in real app this would come from database
const questions = [
  {
    id: "1",
    title: "How to implement cross-chain token transfers using LayerZero?",
    excerpt:
      "Looking for best practices and security considerations when implementing cross-chain functionality...",
    author: {
      name: "Alex Chen",
      avatar: "/developer-working.png",
      reputation: 1250,
    },
    bounty: 50,
    answers: 5,
    views: 1247,
    createdAt: "2 hours ago",
    tags: ["solidity", "cross-chain", "layerzero", "defi"],
    hasAcceptedAnswer: true,
  },
  {
    id: "2",
    title:
      "What are the gas optimization techniques for NFT minting contracts?",
    excerpt:
      "Need help reducing gas costs for a large-scale NFT collection launch...",
    author: {
      name: "Maria Santos",
      avatar: "/nft-developer.png",
      reputation: 890,
    },
    bounty: 75,
    answers: 12,
    views: 2341,
    createdAt: "4 hours ago",
    tags: ["nft", "gas-optimization", "ethereum", "solidity"],
    hasAcceptedAnswer: false,
  },
  {
    id: "3",
    title: "Best practices for DeFi protocol security audits?",
    excerpt:
      "What should I look for when reviewing smart contracts before deployment...",
    author: {
      name: "David Kim",
      avatar: "/security-expert.png",
      reputation: 2100,
    },
    bounty: 100,
    answers: 8,
    views: 1876,
    createdAt: "6 hours ago",
    tags: ["defi", "security", "audit", "smart-contracts"],
    hasAcceptedAnswer: false,
  },
  {
    id: "4",
    title: "How to handle MEV protection in AMM pools?",
    excerpt:
      "Looking for strategies to protect users from MEV attacks in my DEX implementation...",
    author: {
      name: "Lisa Wang",
      avatar: "/defi-developer.png",
      reputation: 1650,
    },
    bounty: 0,
    answers: 3,
    views: 567,
    createdAt: "8 hours ago",
    tags: ["mev", "amm", "defi", "ethereum"],
    hasAcceptedAnswer: false,
  },
  {
    id: "5",
    title: "Integrating Chainlink oracles with custom price feeds?",
    excerpt:
      "Need guidance on implementing custom oracle solutions for exotic asset pairs...",
    author: {
      name: "Tom Johnson",
      avatar: "/oracle-developer.png",
      reputation: 1420,
    },
    bounty: 25,
    answers: 6,
    views: 934,
    createdAt: "12 hours ago",
    tags: ["chainlink", "oracles", "price-feeds", "defi"],
    hasAcceptedAnswer: true,
  },
];

export default function QuestionsPage() {
  const { questionList } = useWallet();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Page Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                All Questions
              </h2>
              <p className="text-muted-foreground">
                Browse questions from the Web3 community. Find answers or
                contribute your expertise.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Search questions..." className="pl-10" />
                </div>
                <Button>
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="flex gap-4">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="most-votes">Most Votes</SelectItem>
                    <SelectItem value="most-answers">Most Answers</SelectItem>
                    <SelectItem value="highest-bounty">
                      Highest Bounty
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Questions</SelectItem>
                    <SelectItem value="unanswered">Unanswered</SelectItem>
                    <SelectItem value="bounty">With Bounty</SelectItem>
                    <SelectItem value="no-accepted">
                      No Accepted Answer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {questionList.length == 0 ? (
              <Loader />
            ) : (
              <>
                {/* Questions List */}
                <div className="space-y-4">
                  {questionList.map(
                    ({
                      id,
                      title,
                      ownerAddress,
                      owner,
                      createdAt,
                      tags,
                      amount,
                      isActive,
                    }) => (
                      <Card
                        key={id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <Link href={`/questions/${id}`}>
                                <CardTitle className="text-lg mb-2 hover:text-primary transition-colors cursor-pointer">
                                  {title}
                                </CardTitle>
                              </Link>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-5 h-5">
                                    <AvatarImage></AvatarImage>
                                    <AvatarFallback>
                                      <User className="w-3 h-3" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{owner}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{formatTimestamp(createdAt)}</span>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                {tags.map((tag) => (
                                  <Badge key={tag} variant="secondary">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="ml-4 flex flex-col items-end gap-2">
                              {amount > 0 && (
                                <Badge>
                                  <Award className="w-3 h-3 mr-1" />
                                  {formatUnits(BigInt(amount), 6)}USDC
                                </Badge>
                              )}
                              {isActive ? (
                                <Badge variant="active">✓ Active</Badge>
                              ) : (
                                <Badge variant="green">✓ Solved</Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                answers
                              </span>
                              <span> views</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  )}
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
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Questions
                    </span>
                    <span className="font-medium">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Answered</span>
                    <span className="font-medium">2,341</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Active Bounties
                    </span>
                    <span className="font-medium text-primary">$1,250</span>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "solidity",
                      "ethereum",
                      "defi",
                      "nft",
                      "web3",
                      "smart-contracts",
                      "polygon",
                      "arbitrum",
                      "chainlink",
                      "security",
                    ].map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Contributors */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Sarah Kim", reputation: 3420, answers: 127 },
                    { name: "Mike Rodriguez", reputation: 2890, answers: 98 },
                    { name: "David Kim", reputation: 2100, answers: 76 },
                  ].map((contributor, index) => (
                    <div
                      key={contributor.name}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                        // src={`/abstract-geometric-shapes.png?height=32&width=32&query=${contributor.name}`}
                        />
                        <AvatarFallback>
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {contributor.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {contributor.reputation} rep • {contributor.answers}{" "}
                          answers
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
