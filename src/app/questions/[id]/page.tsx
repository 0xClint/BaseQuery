"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Award,
  ThumbsUp,
  ThumbsDown,
  Clock,
  User,
} from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "next/navigation";
import { useWallet } from "@/context/WalletContext";
import { useEffect, useState } from "react";
import { QuestionFetchedItems } from "@/types/Question.type";
import Loader from "@/components/Loader";
import { formatUnits } from "viem";

// Mock data - in real app this would come from database
const questionData = {
  id: "1",
  title: "How to implement cross-chain token transfers using LayerZero?",
  content: `I'm working on a DeFi project that needs to support token transfers across multiple chains (Ethereum, Polygon, Arbitrum). I've heard LayerZero is a good solution for this, but I'm not sure about the best practices and security considerations.

Specifically, I need help with:
1. Setting up the LayerZero endpoint configuration
2. Implementing the OFT (Omnichain Fungible Token) standard
3. Handling gas estimation for cross-chain transactions
4. Security best practices to prevent common vulnerabilities

Any code examples or detailed explanations would be greatly appreciated!`,
  author: {
    name: "Alex Chen",

    reputation: 1250,
  },
  bounty: 50,
  createdAt: "2 hours ago",
  tags: ["solidity", "cross-chain", "layerzero", "defi"],
  answers: [
    {
      id: "1",
      content: `Great question! I've implemented LayerZero cross-chain transfers in several projects. Here's a comprehensive approach:

## 1. LayerZero Endpoint Setup

First, you'll need to configure the LayerZero endpoints for each chain:

\`\`\`solidity
// LayerZero endpoint addresses (mainnet)
mapping(uint16 => address) public endpoints;

constructor() {
    endpoints[101] = 0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675; // Ethereum
    endpoints[109] = 0x3c2269811836af69497E5F486A85D7316753cf62; // Polygon
    endpoints[110] = 0x3c2269811836af69497E5F486A85D7316753cf62; // Arbitrum
}
\`\`\`

## 2. OFT Implementation

Here's a basic OFT contract structure:

\`\`\`solidity
import "@layerzerolabs/solidity-examples/contracts/token/oft/OFT.sol";

contract MyToken is OFT {
    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint
    ) OFT(_name, _symbol, _lzEndpoint) {}
    
    // Custom logic here
}
\`\`\`

## 3. Gas Estimation

Always estimate gas before sending:

\`\`\`solidity
function estimateSendFee(
    uint16 _dstChainId,
    bytes memory _toAddress,
    uint _amount,
    bool _useZro,
    bytes memory _adapterParams
) public view returns (uint nativeFee, uint zroFee) {
    return lzEndpoint.estimateFees(
        _dstChainId,
        address(this),
        _payload,
        _useZro,
        _adapterParams
    );
}
\`\`\`

## Security Best Practices

1. **Always validate chain IDs** - Ensure you're sending to supported chains
2. **Implement proper access controls** - Use OpenZeppelin's AccessControl
3. **Add reentrancy guards** - Protect against reentrancy attacks
4. **Validate payload data** - Never trust cross-chain data without validation

Hope this helps! Let me know if you need clarification on any part.`,
      author: {
        name: "Sarah Kim",

        reputation: 3420,
      },
      votes: 8,
      createdAt: "1 hour ago",
      isAccepted: true,
    },
    {
      id: "2",
      content: ``,
      author: {
        name: "Mike Rodriguez",

        reputation: 2100,
      },
      votes: 3,
      createdAt: "30 minutes ago",
      isAccepted: false,
    },
  ],
};

export default function QuestionDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<QuestionFetchedItems | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchQuestionById } = useWallet();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        try {
          setData(await fetchQuestionById(Number(id)));
        } catch (error) {
          console.error(error);
          setData(null);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [id]);

  const rewriteGithubBlobToRaw = (url: string) => {
    try {
      const parsed = new URL(url);
      if (
        parsed.hostname === "github.com" &&
        parsed.pathname.includes("/blob/")
      ) {
        // https://github.com/user/repo/blob/sha/path -> https://raw.githubusercontent.com/user/repo/sha/path
        const parts = parsed.pathname.split("/").filter(Boolean);
        const user = parts[0];
        const repo = parts[1];
        const blobIndex = parts.indexOf("blob");
        const ref = parts[blobIndex + 1];
        const path = parts.slice(blobIndex + 2).join("/");
        return `https://raw.githubusercontent.com/${user}/${repo}/${ref}/${path}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const markdownComponents = {
    a: (props: any) => (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2"
      />
    ),
    img: ({ src = "", alt, ...rest }: any) => (
      // Ensure GitHub blob URLs render and images are responsive
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={rewriteGithubBlobToRaw(src)}
        alt={alt || ""}
        className="my-4 rounded-md max-w-full h-auto"
        {...rest}
      />
    ),
    code: ({ inline, className, children, ...props }: any) => (
      <code
        className={"rounded px-1.5 py-0.5 text-white " + (className || "")}
        {...props}
      >
        {children}
      </code>
    ),
  } as const;
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="neutral" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Questions
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
      {loading ? (
        <div className="w-full h-screen flex-center">
          <Loader />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Question */}
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-4">
                        {data?.question?.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={"/placeholder.svg"} />
                            <AvatarFallback>
                              <User className="w-3 h-3" />
                            </AvatarFallback>
                          </Avatar>
                          <span>{questionData.author.name}</span>
                          <span>•</span>
                          <span>{questionData.author.reputation} rep</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{data?.timestamp}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-4">
                        {data &&
                          data.question &&
                          data?.question.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </div>
                    <Badge className="ml-4 text-2xl font-semibold">
                      $
                      {formatUnits(
                        BigInt(
                          data?.isPoolQuestion
                            ? data.poolAmount ?? 0
                            : data?.bountyAmount ?? 0
                        ),
                        6
                      )}
                      USDC
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-foreground prose-li:marker:text-black prose-hr:border-black">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {data?.question?.content}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>

              {/* Answers Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {questionData.answers.length} Answers
                </h3>

                <div className="space-y-6">
                  {questionData.answers.map((answer) => (
                    <Card
                      key={answer.id}
                      className={answer.isAccepted ? "border-primary" : ""}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center gap-2">
                              <Button size="icon" className="p-1">
                                <ThumbsUp className="w-4 h-4" />
                              </Button>
                              <div className="text-sm h-7 min-w-7 px-2 bg-white font-medium border-2 rounded-[3px] mt-1 flex-center">
                                {answer.votes}
                              </div>
                              <Button size="icon" className="p-1">
                                <ThumbsDown className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {/* <Avatar className="w-6 h-6">
                                <AvatarImage
                                  src={
                                    answer.author.avatar || "/placeholder.svg"
                                  }
                                />
                                <AvatarFallback>
                                  <User className="w-3 h-3" />
                                </AvatarFallback>
                              </Avatar> */}
                                <span className="text-sm font-medium">
                                  {answer.author.name}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {answer.author.reputation} rep
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  •
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {answer.createdAt}
                                </span>
                              </div>
                            </div>
                          </div>
                          {answer.isAccepted && (
                            <Badge variant="green">✓ Accepted</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-sm max-w-none text-foreground prose-li:marker:text-black prose-hr:border-black">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={markdownComponents}
                          >
                            {answer.content}
                          </ReactMarkdown>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Answer Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Answer</CardTitle>
                  <CardDescription>
                    Share your knowledge and help the community. Quality answers
                    may earn bounty rewards.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Write your answer here... You can use Markdown formatting."
                      className="min-h-[200px] bg-white"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        By posting your answer, you agree to our community
                        guidelines.
                      </p>
                      <Button>Post Answer</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Question Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Question Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Answers</span>
                      <span className="font-medium">
                        {data?.answerIds.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bounty</span>
                      <span className="font-medium text-primary">
                        $
                        {formatUnits(
                          BigInt(
                            data?.isPoolQuestion
                              ? data.poolAmount ?? 0
                              : data?.bountyAmount ?? 0
                          ),
                          6
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge variant="active" className="">
                        Active
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Questions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Related Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-3">
                      <a
                        href="#"
                        className="block text-sm hover:text-primary transition-colors"
                      >
                        Best practices for DeFi protocol security audits?
                      </a>
                      <Separator />
                      <a
                        href="#"
                        className="block text-sm hover:text-primary transition-colors"
                      >
                        Gas optimization techniques for NFT contracts?
                      </a>
                      <Separator />
                      <a
                        href="#"
                        className="block text-sm hover:text-primary transition-colors"
                      >
                        How to handle MEV protection in AMM pools?
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
