"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, X, HelpCircle, Award } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AskQuestionPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [bountyAmount, setBountyAmount] = useState("");

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim().toLowerCase()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    C
                  </span>
                </div>
                <h1 className="text-xl font-bold text-foreground">BaseQuery</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Ask a Question
          </h2>
          <p className="text-muted-foreground">
            Get help from the Web3 community. Clear, detailed questions get
            better answers and higher bounties.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Question Details</CardTitle>
                <CardDescription>
                  Provide clear, specific details to help the community
                  understand your question.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Question Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., How to implement cross-chain token transfers using LayerZero?"
                    className=""
                  />
                  <p className="text-sm text-muted-foreground">
                   { `Be specific and imagine you're asking a question to another
                    person.`}
                  </p>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Question Details *</Label>
                  <Textarea
                    id="content"
                    placeholder="Describe your question in detail. Include what you've tried, what you expect to happen, and what actually happens. Code examples are helpful!"
                    className="min-h-[300px] bg-white"
                  />
                  <p className="text-sm text-muted-foreground">
                    {`Include relevant code, error messages, and what you've
                    already tried.`}
                  </p>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags *</Label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id="tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleTagKeyPress}
                        placeholder="Add tags (e.g., solidity, defi, ethereum)"
                        disabled={tags.length >= 5}
                      />
                      <Button
                        type="button"
                        size={"icon"} // variant="outline"
                        onClick={addTag}
                        disabled={!tagInput.trim() || tags.length >= 5}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add up to 5 tags to help categorize your question. Press
                    Enter or comma to add.
                  </p>
                </div>

                {/* Bounty */}
                <div className="space-y-2">
                  <Label htmlFor="bounty">Bounty Amount (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">$</span>
                    <Input
                      id="bounty"
                      type="number"
                      value={bountyAmount}
                      onChange={(e) => setBountyAmount(e.target.value)}
                      placeholder="0"
                      min="0"
                      step="1"
                      className="max-w-32"
                    />
                    <Award className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Offer a bounty to incentivize high-quality answers. You can
                    add or increase the bounty later.
                  </p>
                </div>

                {/* Submit */}
                <div className="flex gap-4 pt-4">
                  <Button size="lg" className="flex-1">
                    Post Question
                  </Button>
                  <Button variant="neutral" size="lg">
                    Save Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Writing Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">Be Specific</h4>
                    <p className="text-muted-foreground">
                      Include exact error messages, code snippets, and expected
                      vs actual behavior.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Show Research</h4>
                    <p className="text-muted-foreground">
                      {`Mention what you've already tried and what resources
                      you've consulted.`}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Use Tags Wisely</h4>
                    <p className="text-muted-foreground">
                      Choose relevant tags that experts in those areas would
                      follow.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Bounty Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    About Bounties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">
                    Bounties incentivize detailed, high-quality answers from
                    experts in the community.
                  </p>
                  <div>
                    <h4 className="font-medium mb-1">How it works:</h4>
                    <ul className="text-muted-foreground space-y-1 ml-4">
                      <li>• Set a bounty amount</li>
                      <li>• Community votes on answers</li>
                      <li>• You can award the bounty to the best answer</li>
                      <li>• Unused bounties return after 30 days</li>
                    </ul>
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
                    ].map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => {
                          if (!tags.includes(tag) && tags.length < 5) {
                            setTags([...tags, tag]);
                          }
                        }}
                      >
                        {tag}
                      </Badge>
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
