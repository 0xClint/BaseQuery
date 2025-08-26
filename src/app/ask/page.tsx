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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Plus, X, HelpCircle, Award, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useWallet } from "@/context/WalletContext";
import { QuestionItem } from "@/types/Question.type";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import Header from "@/components/Header";

const questionFormSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(200, "Title must be less than 200 characters"),
  content: z
    .string()
    .min(1, "Question details must be at least 1 characters")
    .max(5000, "Question details must be less than 5000 characters"),
  bountyAmount: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true; // Allow empty
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Bounty amount must be a positive number"),
  bountyDeadline: z.string().optional(),
  bountyType: z.enum(["single", "pool"]).optional(),
});

type QuestionFormData = z.infer<typeof questionFormSchema>;

export default function AskQuestionPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { createQuestion } = useWallet();
  const [tagInput, setTagInput] = useState("");

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: "",
      content: "",
      bountyAmount: "",
      bountyDeadline: "",
      bountyType: "single",
    },
  });

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

  const onSubmit = async (data: QuestionFormData) => {
    console.log("Form submission started", data);

    if (tags.length === 0) {
      alert("Please add at least one tag");
      return;
    }

    // Validate pool bounty requires deadline
    if (
      data.bountyType === "pool" &&
      (!data.bountyDeadline || data.bountyDeadline.trim() === "")
    ) {
      alert("Pool bounties require a deadline. Please select a deadline.");
      return;
    }

    try {
      setLoading(true);
      const questionData: QuestionItem = {
        title: data.title,
        content: data.content,
        tags,
      };
      const bountyAmount =
        data.bountyAmount && data.bountyAmount.trim() !== ""
          ? parseFloat(data.bountyAmount)
          : 0;

      const poolDuration =
        data.bountyType === "pool"
          ? data.bountyDeadline
            ? Math.floor(
                (new Date(data.bountyDeadline).getTime() - Date.now()) / 1000
              )
            : 0
          : 0;
      await createQuestion(questionData, bountyAmount.toString(), poolDuration);
      setSuccess(true);
      console.log("Form submitted successfully:", data);
      toast.success("Question submitted successfully!");

      // await new Promise((res) => setTimeout(res, 1000));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Dialog open={success} onOpenChange={setSuccess}>
        <form>
          <DialogContent
            className="sm:max-w-[425px]"
            showCloseButton={false}
            preventOutsideClose={true}
          >
            <DialogHeader>
              <DialogTitle>Question creation Success</DialogTitle>
              <DialogDescription>
                Question has been created successfully
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Link href={"/questions"}>
                <Button type="submit">Home</Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          {loading ? (
            <Loader className="lg:col-span-2" />
          ) : (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Question Details</CardTitle>
                  <CardDescription>
                    Provide clear, specific details to help the community
                    understand your question.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Question Title *</Label>
                    <Input
                      id="title"
                      required
                      placeholder="e.g., How to implement cross-chain token transfers using LayerZero?"
                      className=""
                      {...form.register("title")}
                    />
                    {form.formState.errors.title && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.title.message}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {`Be specific and imagine you're asking a question to another
                      person.`}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Question Details *</Label>
                    <Textarea
                      id="content"
                      required
                      placeholder="Describe your question in detail. Include what you've tried, what you expect to happen, and what actually happens. Code examples are helpful! You can use Markdown formatting."
                      className="min-h-[300px] bg-white"
                      {...form.register("content")}
                    />
                    {form.formState.errors.content && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.content.message}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {`Include relevant code, error messages, and what you've
                    already tried.`}
                    </p>
                  </div>

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
                              type="button"
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

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bounty">Bounty Amount (Optional)</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">$</span>
                        <Input
                          id="bounty"
                          type="number"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className="max-w-32"
                          {...form.register("bountyAmount")}
                        />
                        <Award className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Offer a bounty to incentivize high-quality answers. You
                        can add or increase the bounty later.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bountyType">Bounty Type</Label>
                      <Select
                        value={form.watch("bountyType")}
                        onValueChange={(value) =>
                          form.setValue(
                            "bountyType",
                            value as "single" | "pool"
                          )
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select bounty type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single Bounty</SelectItem>
                          <SelectItem value="pool">Pool Bounty</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        Single bounty goes to the best answer. Pool bounty can
                        be split among multiple contributors.
                      </p>
                    </div>
                    {form.watch("bountyType") === "pool" && (
                      <div className="space-y-2">
                        <Label htmlFor="bountyDeadline">
                          Bounty Deadline *
                        </Label>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <Input
                            id="bountyDeadline"
                            type="datetime-local"
                            min={
                              new Date(Date.now() + 24 * 60 * 60 * 1000)
                                .toISOString()
                                .split("T")[0]
                            }
                            className="flex-1"
                            required
                            {...form.register("bountyDeadline")}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Pool bounties require a deadline. Must be at least 24
                          hours in the future.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" size="lg" className="flex-1">
                      Post Question
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          )}
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
