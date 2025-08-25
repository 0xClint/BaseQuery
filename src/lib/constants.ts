export const USDC_TOKEN_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
export const USDC_TOKEN_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "amount", type: "uint256" }],
  },
];

export const INDEXER_ENDPOINT =
  "https://api.studio.thegraph.com/query/119413/basequery/version/latest";
export const INDEXER_HEADERS = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPH_API_KEY}`,
};

export const BASEQUERY_CONTRACT_ADDRESS =
  "0x77D06640C8D434ed8baA55f19da244292277509e";

export const BASEQUERY_CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_reputationSystem",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_usdc",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "AlreadyAnswered",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "AnswerNotFound",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "BestAnswerAlreadySelected",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "BountyAlreadyDistributed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "CannotAnswer",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "CannotWithdrawBountyWithAnswers",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "CannotWithdrawWithGoodAnswers",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InsufficientBounty",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidPoolDuration",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NoAnswers",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotQuestionOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PoolExpired",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PoolNotExpired",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "QuestionNotFound",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferFailed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "USDCTransferFailed",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "answerId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "provider",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "AnswerSubmitted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "answerId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bountyAmount",
				"type": "uint256"
			}
		],
		"name": "BestAnswerSelected",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "additionalAmount",
				"type": "uint256"
			}
		],
		"name": "BountyIncreased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "withdrawalAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "platformFee",
				"type": "uint256"
			}
		],
		"name": "BountyWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "winners",
				"type": "address[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			}
		],
		"name": "PoolDistributed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "withdrawalAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "platformFee",
				"type": "uint256"
			}
		],
		"name": "PoolWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bountyAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "poolAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "poolEndTime",
				"type": "uint256"
			}
		],
		"name": "QuestionCreated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "MAX_POOL_DURATION",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MIN_POOL_DURATION",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "PLATFORM_FEE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "USDC",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "answerCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "answers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "provider",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "bountyAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "poolDuration",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "useAsPool",
				"type": "bool"
			}
		],
		"name": "createQuestion",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			}
		],
		"name": "distributePool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllQuestions",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "questionIds",
				"type": "uint256[]"
			},
			{
				"internalType": "string[]",
				"name": "ipfsHashes",
				"type": "string[]"
			},
			{
				"internalType": "address[]",
				"name": "creators",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "bool[]",
				"name": "isPoolQuestions",
				"type": "bool[]"
			},
			{
				"internalType": "bool[]",
				"name": "isActiveQuestions",
				"type": "bool[]"
			},
			{
				"internalType": "uint256[]",
				"name": "timestamps",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "answerId",
				"type": "uint256"
			}
		],
		"name": "getAnswer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "provider",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "upvotes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "downvotes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "prizeAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			}
		],
		"name": "getQuestion",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "bountyAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "poolAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "poolEndTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "selectedAnswerId",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "answerIds",
				"type": "uint256[]"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isPoolQuestion",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			}
		],
		"name": "getQuestionAnswers",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUSDCBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "answerId",
				"type": "uint256"
			},
			{
				"internalType": "enum IReputationSystem.ContentType",
				"name": "contentType",
				"type": "uint8"
			}
		],
		"name": "getVoteCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "upvotes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "downvotes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasAnswered",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "additionalAmount",
				"type": "uint256"
			}
		],
		"name": "increaseBounty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			}
		],
		"name": "isPoolExpired",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformUSDCBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "questionCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "questions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "bountyAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "poolAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "poolEndTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "selectedAnswerId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "poolDistributed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reputationSystem",
		"outputs": [
			{
				"internalType": "contract IReputationSystem",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "answerId",
				"type": "uint256"
			}
		],
		"name": "selectBestAnswer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "submitAnswer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "answerId",
				"type": "uint256"
			},
			{
				"internalType": "enum IReputationSystem.ContentType",
				"name": "contentType",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "isUpvote",
				"type": "bool"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			}
		],
		"name": "withdrawBounty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawPlatformFees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			}
		],
		"name": "withdrawPool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
