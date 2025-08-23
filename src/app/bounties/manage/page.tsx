import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Award, Clock, Users, TrendingUp, User, CheckCircle, Plus } from "lucide-react"
import Link from "next/link"

// Mock data for user's bounties
const myBounties = [
  {
    id: "1",
    title: "How to implement cross-chain token transfers using LayerZero?",
    amount: 50,
    status: "active",
    timeLeft: "5 days",
    answers: 5,
    views: 1247,
    createdAt: "2 hours ago",
    tags: ["solidity", "cross-chain", "layerzero"],
    topAnswers: [
      {
        id: "1",
        author: "Sarah Kim",
        avatar: "/placeholder.svg?key=sarah",
        votes: 8,
        excerpt: "Great question! I've implemented LayerZero cross-chain transfers...",
        canAward: true,
      },
      {
        id: "2",
        author: "Mike Rodriguez",
        avatar: "/placeholder.svg?key=mike",
        votes: 3,
        excerpt: "I'd add to Sarah's excellent answer that you should also consider...",
        canAward: true,
      },
    ],
  },
  {
    id: "2",
    title: "Gas optimization techniques for NFT minting contracts",
    amount: 75,
    status: "awarded",
    timeLeft: "Completed",
    answers: 12,
    views: 2341,
    createdAt: "1 week ago",
    tags: ["nft", "gas-optimization", "ethereum"],
    winner: "Sarah Kim",
    winnerAvatar: "/placeholder.svg?key=sarah",
  },
]

const wonBounties = [
  {
    id: "3",
    title: "Best practices for DeFi protocol security audits",
    amount: 100,
    questionAuthor: "David Kim",
    awardedAt: "2 days ago",
    tags: ["defi", "security", "audit"],
  },
  {
    id: "4",
    title: "Integrating Chainlink oracles with custom price feeds",
    amount: 25,
    questionAuthor: "Tom Johnson",
    awardedAt: "1 week ago",
    tags: ["chainlink", "oracles", "price-feeds"],
  },
]

export default function ManageBountiesPage() {
  const totalCreated = myBounties.length
  const totalSpent = myBounties.reduce((sum, b) => sum + b.amount, 0)
  const totalEarned = wonBounties.reduce((sum, b) => sum + b.amount, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/bounties">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Bounties
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">C</span>
                </div>
                <h1 className="text-xl font-bold text-foreground">BaseQuery</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Manage Bounties</h2>
          <p className="text-muted-foreground">Track your bounties, award winners, and manage your rewards.</p>
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
                  <div className="text-2xl font-bold text-foreground">{totalCreated}</div>
                  <div className="text-sm text-muted-foreground">Bounties Created</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">${totalSpent}</div>
                  <div className="text-sm text-muted-foreground">Total Spent</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">${totalEarned}</div>
                  <div className="text-sm text-muted-foreground">Total Earned</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="created" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="created">My Bounties</TabsTrigger>
            <TabsTrigger value="won">Bounties Won</TabsTrigger>
          </TabsList>

          {/* My Bounties Tab */}
          <TabsContent value="created" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-foreground">Your Active Bounties</h3>
              <Link href="/ask">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Bounty
                </Button>
              </Link>
            </div>

            <div className="space-y-6">
              {myBounties.map((bounty) => (
                <Card key={bounty.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={bounty.status === "active" ? "bg-green-600" : "bg-blue-600"}>
                            {bounty.status === "active" ? "Active" : "Awarded"}
                          </Badge>
                          {bounty.status === "active" && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{bounty.timeLeft} left</span>
                            </div>
                          )}
                        </div>

                        <CardTitle className="text-lg mb-2">{bounty.title}</CardTitle>

                        <div className="flex gap-2 mb-4">
                          {bounty.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {bounty.answers} answers
                          </span>
                          <span>{bounty.views} views</span>
                          <span>Created {bounty.createdAt}</span>
                        </div>
                      </div>

                      <div className="ml-6 text-right">
                        <div className="text-2xl font-bold text-primary mb-1">${bounty.amount}</div>
                        {bounty.status === "awarded" && bounty.winner && (
                          <Badge variant="default" className="bg-green-600">
                            Awarded to {bounty.winner}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {bounty.status === "active" && bounty.topAnswers && (
                    <CardContent>
                      <h4 className="font-medium mb-4">Top Answers - Choose Winner</h4>
                      <div className="space-y-4">
                        {bounty.topAnswers.map((answer) => (
                          <div key={answer.id} className="border border-border rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage src={answer.avatar || "/placeholder.svg"} />
                                    <AvatarFallback>
                                      <User className="w-3 h-3" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">{answer.author}</span>
                                  <Badge variant="outline">{answer.votes} votes</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{answer.excerpt}</p>
                              </div>
                              <div className="ml-4">
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  Award Bounty
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}

                  {bounty.status === "awarded" && (
                    <CardContent>
                      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-medium text-green-800">Bounty Awarded</div>
                          <div className="text-sm text-green-600">
                            ${bounty.amount} awarded to {bounty.winner}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bounties Won Tab */}
          <TabsContent value="won" className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Bounties You've Won</h3>

            <div className="space-y-4">
              {wonBounties.map((bounty) => (
                <Card key={bounty.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{bounty.title}</CardTitle>

                        <div className="flex gap-2 mb-3">
                          {bounty.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Question by {bounty.questionAuthor} • Awarded {bounty.awardedAt}
                        </div>
                      </div>

                      <div className="ml-6 text-right">
                        <div className="text-2xl font-bold text-green-600 mb-1">+${bounty.amount}</div>
                        <Badge variant="default" className="bg-green-600">
                          ✓ Won
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
