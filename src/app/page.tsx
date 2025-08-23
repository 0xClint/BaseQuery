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
import { Search, Plus, TrendingUp, Award, Users, Bot } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <Header />
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Get Answers, Earn Rewards
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            The Web3 community-driven Q&A platform where knowledge meets bounty
            rewards
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search questions or ask something new..."
              className="pl-12 pr-4 py-6 text-lg h-12"
            />
            <Button
              className="absolute right-2 top-1/9"
              size="sm"
            >
              Search
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2,847</div>
              <div className="text-sm text-muted-foreground">
                Questions Asked
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">15,392</div>
              <div className="text-sm text-muted-foreground">Answers Given</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">$12,450</div>
              <div className="text-sm text-muted-foreground">Bounties Paid</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Questions */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-foreground">
              Trending Questions
            </h3>
            <Button>
              <TrendingUp className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>

          <div className="grid gap-6">
            {/* Sample Question Cards */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      How to implement cross-chain token transfers using
                      LayerZero?
                    </CardTitle>
                    <CardDescription>
                      Looking for best practices and security considerations
                      when implementing cross-chain functionality...
                    </CardDescription>
                  </div>
                  <Badge className="ml-4">
                    <Award className="w-3 h-3 mr-1" />
                    $50
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />5 answers
                    </span>
                    <span>Asked 2 hours ago</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">solidity</Badge>
                    <Badge variant="secondary">cross-chain</Badge>
                    <Badge variant="secondary">layerzero</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      What are the gas optimization techniques for NFT minting
                      contracts?
                    </CardTitle>
                    <CardDescription>
                      Need help reducing gas costs for a large-scale NFT
                      collection launch...
                    </CardDescription>
                  </div>
                  <Badge variant="default" className="ml-4">
                    <Award className="w-3 h-3 mr-1" />
                    $75
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      12 answers
                    </span>
                    <span>Asked 4 hours ago</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">nft</Badge>
                    <Badge variant="secondary">gas-optimization</Badge>
                    <Badge variant="secondary">ethereum</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      Best practices for DeFi protocol security audits?
                    </CardTitle>
                    <CardDescription>
                      What should I look for when reviewing smart contracts
                      before deployment...
                    </CardDescription>
                  </div>
                  <Badge className="ml-4">
                    <Award className="w-3 h-3 mr-1" />
                    $100
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />8 answers
                    </span>
                    <span>Asked 6 hours ago</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={"secondary"}>defi</Badge>
                    <Badge variant={"secondary"}>security</Badge>
                    <Badge variant={"secondary"}>audit</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
