export const USDC_TOKEN_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
export const USDC_TOKEN_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "implementationContract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  { stateMutability: "payable", type: "fallback" },
  {
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newAdmin", type: "address" }],
    name: "changeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export const STORAGE_CONTRACT_ADDRESS =
  "0x52e596276e450b1c3938E19559eDEE9eF438851d";
export const STORAGE_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_favoriteNumber",
        type: "uint256",
      },
    ],
    name: "addPerson",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_favoriteNumber",
        type: "uint256",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "nameToFavoriteNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "people",
    outputs: [
      {
        internalType: "uint256",
        name: "favoriteNumber",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "retrieve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const QUERY_PRICE = 0.1;

export const paymentRequirements = {
  scheme: "exact",
  network: "base-sepolia",
  maxAmountRequired: "10000",
  resource: "https://example.com",
  description: "Payment for a service",
  mimeType: "text/html",
  payTo: "0xf1E507654e8E8b35bf467fd255c1c5787527aC2D",
  maxTimeoutSeconds: 60,
  asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  outputSchema: undefined,
  extra: {
    name: "USDC",
    version: "2",
  },
};

export const BASEQUERY_CONTRACT_ADDRESS =
  "0x6FDeDa9f256c1c9cba1e9497Ce44F2e1C5435244";

export const BASEQUERY_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_reputationSystem",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdc",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AlreadyAnswered",
    type: "error",
  },
  {
    inputs: [],
    name: "AnswerNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "BestAnswerAlreadySelected",
    type: "error",
  },
  {
    inputs: [],
    name: "BountyAlreadyDistributed",
    type: "error",
  },
  {
    inputs: [],
    name: "CannotAnswer",
    type: "error",
  },
  {
    inputs: [],
    name: "CannotWithdrawBountyWithAnswers",
    type: "error",
  },
  {
    inputs: [],
    name: "CannotWithdrawWithGoodAnswers",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientBounty",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPoolDuration",
    type: "error",
  },
  {
    inputs: [],
    name: "NoAnswers",
    type: "error",
  },
  {
    inputs: [],
    name: "NotQuestionOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "PoolExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "PoolNotExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "QuestionNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "USDCTransferFailed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "answerId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "provider",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
    ],
    name: "AnswerSubmitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "answerId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountyAmount",
        type: "uint256",
      },
    ],
    name: "BestAnswerSelected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "additionalAmount",
        type: "uint256",
      },
    ],
    name: "BountyIncreased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawalAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformFee",
        type: "uint256",
      },
    ],
    name: "BountyWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "winners",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "PoolDistributed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawalAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformFee",
        type: "uint256",
      },
    ],
    name: "PoolWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountyAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "poolAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "poolEndTime",
        type: "uint256",
      },
    ],
    name: "QuestionCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_POOL_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_POOL_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PLATFORM_FEE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USDC",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "answerCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "answers",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "provider",
        type: "address",
      },
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "bountyAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "poolDuration",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "useAsPool",
        type: "bool",
      },
    ],
    name: "createQuestion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
    ],
    name: "distributePool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "answerId",
        type: "uint256",
      },
    ],
    name: "getAnswer",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "questionId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "provider",
            type: "address",
          },
          {
            internalType: "string",
            name: "ipfsHash",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct StackExchange.Answer",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
    ],
    name: "getQuestion",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "ipfsHash",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "bountyAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "poolAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "poolEndTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "selectedAnswerId",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "answerIds",
            type: "uint256[]",
          },
          {
            internalType: "bool",
            name: "poolDistributed",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
        ],
        internalType: "struct StackExchange.Question",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
    ],
    name: "getQuestionAnswers",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
    ],
    name: "getQuestionDetails",
    outputs: [
      {
        internalType: "address",
        name: "questionOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "bountyAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "poolAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "poolEndTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "answerCount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "poolDistributed",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isPoolQuestion",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "poolExpired",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUSDCBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "answerId",
        type: "uint256",
      },
      {
        internalType: "enum IReputationSystem.ContentType",
        name: "contentType",
        type: "uint8",
      },
    ],
    name: "getVoteCount",
    outputs: [
      {
        internalType: "uint256",
        name: "upvotes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "downvotes",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hasAnswered",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "additionalAmount",
        type: "uint256",
      },
    ],
    name: "increaseBounty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
    ],
    name: "isPoolExpired",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "platformUSDCBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "questionCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "questions",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "bountyAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "poolAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "poolEndTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "selectedAnswerId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "poolDistributed",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reputationSystem",
    outputs: [
      {
        internalType: "contract IReputationSystem",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "answerId",
        type: "uint256",
      },
    ],
    name: "selectBestAnswer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
    ],
    name: "submitAnswer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "answerId",
        type: "uint256",
      },
      {
        internalType: "enum IReputationSystem.ContentType",
        name: "contentType",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "isUpvote",
        type: "bool",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
    ],
    name: "withdrawBounty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawPlatformFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
    ],
    name: "withdrawPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
