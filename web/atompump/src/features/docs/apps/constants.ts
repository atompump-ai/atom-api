/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import {
  Bot,
  Braces,
  Boxes,
  Code2,
  Compass,
  GitBranch,
  Laptop,
  MessageCircle,
  MessagesSquare,
  MonitorCog,
  PlugZap,
  PanelsTopLeft,
  TerminalSquare,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

export type AppGuide = {
  name: string
  description: string
  icon: LucideIcon
  bestFor: string
  setupPath: string
  steps: string[]
  tip: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type ProtocolItem = {
  label: string
  path: string
  description: string
}

export type CliGuide = {
  name: string
  description: string
  icon: LucideIcon
  protocol: string
  config: string
  steps: string[]
  note: string
}

export const DOCS_ANCHORS = [
  { id: 'quick-start', label: 'Quick start' },
  { id: 'connection-fields', label: 'Connection fields' },
  { id: 'protocols', label: 'Protocol paths' },
  { id: 'clients', label: 'Client guides' },
  { id: 'cli-agents', label: 'CLI and agent tools' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
] as const

export const CONNECTION_FIELDS = [
  {
    label: 'API Base URL',
    value: 'https://your-domain.example.com/v1',
    description:
      'Use your deployed AtomPump domain and keep the /v1 suffix for OpenAI-compatible clients.',
  },
  {
    label: 'API Key',
    value: 'sk-...',
    description:
      'Create a token in the console, then paste the token as the client API key.',
  },
  {
    label: 'Model ID',
    value: 'gpt-4o, claude-3-5-sonnet, gemini-1.5-pro',
    description:
      'Use a model name enabled in AtomPump. Model aliases and mappings follow your console configuration.',
  },
] as const

export const QUICK_STEPS = [
  'Create an API key in the AtomPump console.',
  'Copy your API Base URL and keep the /v1 suffix.',
  'Choose an enabled model from Model API or Pricing.',
  'Select OpenAI Compatible or Custom OpenAI in your AI Agent client.',
  'Paste the Base URL, API key, and model ID, then send a test message.',
] as const

export const PROTOCOL_PATHS: ProtocolItem[] = [
  {
    label: 'OpenAI Chat Completions',
    path: '/v1/chat/completions',
    description:
      'Use this for most chat clients, desktop apps, and OpenAI-compatible SDKs.',
  },
  {
    label: 'OpenAI Responses',
    path: '/v1/responses',
    description:
      'Use this for clients that explicitly support the Responses API or Codex-style agent flows.',
  },
  {
    label: 'Claude Messages',
    path: '/v1/messages',
    description:
      'Use this only when the client asks for an Anthropic or Claude-compatible endpoint.',
  },
  {
    label: 'Embeddings',
    path: '/v1/embeddings',
    description:
      'Use this for RAG indexes, vector search, and workflow builders that need embedding models.',
  },
] as const

export const APP_GUIDES: AppGuide[] = [
  {
    name: 'Cherry Studio',
    description:
      'A desktop AI assistant that supports custom OpenAI-compatible providers.',
    icon: MessagesSquare,
    bestFor: 'Daily chat, multimodal model switching, and personal workflows.',
    setupPath:
      'Settings -> Model Provider -> Add Provider -> OpenAI Compatible',
    steps: [
      'Create a custom OpenAI-compatible provider.',
      'Set API Host to your AtomPump Base URL.',
      'Paste your AtomPump API key.',
      'Add the model IDs you want to expose in the client.',
    ],
    tip: 'If the client asks for host without /v1, follow the client hint; otherwise keep /v1.',
  },
  {
    name: 'LobeChat',
    description:
      'A web chat workspace with provider presets and custom OpenAI-compatible configuration.',
    icon: PanelsTopLeft,
    bestFor: 'Team chat workspaces and prompt-heavy assistant flows.',
    setupPath: 'Settings -> Language Model -> OpenAI -> Custom endpoint',
    steps: [
      'Enable OpenAI provider settings.',
      'Fill Base URL with your AtomPump /v1 endpoint.',
      'Use your AtomPump token as the OpenAI API key.',
      'Enter model IDs manually when automatic model discovery is unavailable.',
    ],
    tip: 'For private deployments, confirm the browser can reach your AtomPump domain over HTTPS.',
  },
  {
    name: 'Chatbox',
    description:
      'A lightweight desktop client for OpenAI-compatible API conversations.',
    icon: Laptop,
    bestFor: 'Simple desktop chat and quick model testing.',
    setupPath: 'Settings -> Model Provider -> OpenAI API Compatible',
    steps: [
      'Choose OpenAI API Compatible as the provider.',
      'Paste your AtomPump API key.',
      'Set API Host to your AtomPump Base URL.',
      'Select or type an enabled model ID.',
    ],
    tip: 'Use the Pricing page to verify exact model IDs before adding them.',
  },
  {
    name: 'Open WebUI',
    description:
      'A self-hosted chat UI that can route requests through a custom OpenAI-compatible API.',
    icon: MonitorCog,
    bestFor: 'Internal team chat portals and self-hosted deployments.',
    setupPath: 'Admin Panel -> Settings -> Connections -> OpenAI API',
    steps: [
      'Add a new OpenAI API connection.',
      'Set API Base URL to your AtomPump /v1 endpoint.',
      'Store the AtomPump API key in the connection.',
      'Refresh or manually add available models.',
    ],
    tip: 'When Open WebUI runs in Docker, make sure its container can resolve your AtomPump host.',
  },
  {
    name: 'NextChat',
    description:
      'A browser-first chat app that supports custom endpoint and model settings.',
    icon: Compass,
    bestFor: 'Fast hosted chat pages and lightweight public-facing assistants.',
    setupPath: 'Settings -> Access -> Custom Endpoint',
    steps: [
      'Open settings and switch to custom endpoint mode.',
      'Enter your AtomPump API key.',
      'Set endpoint to your AtomPump Base URL.',
      'Configure model names used by your deployment.',
    ],
    tip: 'If requests fail in the browser, check CORS and whether the app is calling the correct /v1 path.',
  },
  {
    name: 'Continue',
    description:
      'An IDE assistant extension that can use OpenAI-compatible models for code workflows.',
    icon: Code2,
    bestFor: 'Code completion, chat, and repository-aware developer agents.',
    setupPath: 'config.json -> models -> provider: openai',
    steps: [
      'Add a model entry with provider set to openai.',
      'Set apiBase to your AtomPump Base URL.',
      'Set apiKey to your AtomPump token.',
      'Use an enabled chat model ID for model.',
    ],
    tip: 'Keep coding models in a separate AtomPump key or group if you need spending controls.',
  },
  {
    name: 'Cursor or custom IDE agents',
    description:
      'IDE agents that expose an OpenAI-compatible override can connect through AtomPump.',
    icon: Bot,
    bestFor: 'Agentic coding tools and custom OpenAI provider overrides.',
    setupPath: 'Settings -> Models -> OpenAI compatible or custom provider',
    steps: [
      'Choose custom OpenAI-compatible provider when available.',
      'Use the AtomPump /v1 Base URL.',
      'Paste the AtomPump API key.',
      'Map the model field to a model enabled in AtomPump.',
    ],
    tip: 'Some IDEs restrict provider overrides by plan or version; update the client if the option is missing.',
  },
  {
    name: 'Dify and workflow builders',
    description:
      'Agent workflow platforms can use AtomPump as a shared model gateway.',
    icon: Workflow,
    bestFor: 'Production workflows, RAG apps, and multi-step agent systems.',
    setupPath: 'Settings -> Model Provider -> OpenAI-API-compatible',
    steps: [
      'Add an OpenAI-compatible model provider.',
      'Configure endpoint URL with your AtomPump Base URL.',
      'Paste an API key scoped for the workflow.',
      'Register chat, embedding, or rerank model IDs as needed.',
    ],
    tip: 'Use separate API keys per workflow so usage logs and quota controls stay readable.',
  },
]

export const CLI_AGENT_GUIDES: CliGuide[] = [
  {
    name: 'Codex CLI',
    description:
      'A terminal coding agent that can route Responses API traffic through AtomPump when custom OpenAI-compatible settings are available.',
    icon: TerminalSquare,
    protocol: 'OpenAI Responses',
    config: `export OPENAI_API_KEY="sk-your-atom-pump-key"
export OPENAI_BASE_URL="https://your-domain.example.com/v1"

codex --model gpt-4o`,
    steps: [
      'Use an AtomPump key with access to a Responses-capable model.',
      'Set the OpenAI Base URL to your AtomPump /v1 endpoint.',
      'Select a model that is enabled for the token group.',
    ],
    note: 'If your Codex build only supports OAuth account login, keep using the built-in login flow and manage upstream Codex channels in AtomPump instead.',
  },
  {
    name: 'Claude Code or Claude CLI',
    description:
      'Claude-native coding agents can connect when the client exposes Anthropic-compatible base URL and API key settings.',
    icon: Bot,
    protocol: 'Claude Messages',
    config: `export ANTHROPIC_API_KEY="sk-your-atom-pump-key"
export ANTHROPIC_BASE_URL="https://your-domain.example.com"

claude --model claude-3-5-sonnet`,
    steps: [
      'Use an AtomPump key allowed to call Claude models.',
      'Point the client to the AtomPump domain when it appends /v1/messages itself.',
      'Use the /v1/messages route when the client asks for the full Messages endpoint.',
    ],
    note: 'Claude clients vary by version. If a client does not expose a custom base URL, use an OpenAI-compatible client instead.',
  },
  {
    name: 'Factory Droid CLI',
    description:
      'Agentic CLI tools with OpenAI-compatible provider settings can use AtomPump as their shared model gateway.',
    icon: GitBranch,
    protocol: 'OpenAI compatible',
    config: `provider: openai
base_url: https://your-domain.example.com/v1
api_key: sk-your-atom-pump-key
model: gpt-4o`,
    steps: [
      'Create a dedicated API key for the agent or project.',
      'Choose the OpenAI-compatible provider in the CLI config.',
      'Set base_url, api_key, and model to AtomPump values.',
    ],
    note: 'Keep automated coding agents on separate keys so quota limits and usage logs remain auditable.',
  },
  {
    name: 'OpenClaw',
    description:
      'Browser and coding agents can use AtomPump when their model provider is configured as OpenAI-compatible.',
    icon: PlugZap,
    protocol: 'OpenAI compatible',
    config: `{
  "provider": "openai",
  "baseUrl": "https://your-domain.example.com/v1",
  "apiKey": "sk-your-atom-pump-key",
  "model": "gpt-4o"
}`,
    steps: [
      'Open the agent provider settings.',
      'Select OpenAI-compatible or custom OpenAI.',
      'Paste the AtomPump Base URL, API key, and model ID.',
    ],
    note: 'For browser agents, confirm the runtime environment can reach your AtomPump HTTPS domain.',
  },
  {
    name: 'LangBot and AstrBot',
    description:
      'Bot frameworks usually expose OpenAI-compatible provider fields for chat, group, and automation bots.',
    icon: MessageCircle,
    protocol: 'OpenAI compatible',
    config: `OPENAI_API_BASE=https://your-domain.example.com/v1
OPENAI_API_KEY=sk-your-atom-pump-key
OPENAI_MODEL=gpt-4o`,
    steps: [
      'Add or edit the OpenAI-compatible provider.',
      'Use an AtomPump key scoped to the bot workspace.',
      'Set the chat model ID and run a simple message test.',
    ],
    note: 'For public bots, use separate keys per bot and set conservative quota limits before launch.',
  },
]

export const TROUBLESHOOTING: FaqItem[] = [
  {
    question: 'The client returns 401 or unauthorized.',
    answer:
      'Check that the API key was copied completely, is enabled, has remaining quota, and belongs to a group allowed to use the selected model.',
  },
  {
    question: 'The client says the model does not exist.',
    answer:
      'Use the exact model ID configured in AtomPump. If you rely on model mapping, test the mapped name from the console first.',
  },
  {
    question: 'Requests work in curl but fail in a browser client.',
    answer:
      'Confirm the client is calling the HTTPS domain users can access, and check CORS or reverse proxy rules for browser-based apps.',
  },
  {
    question: 'Streaming responses stop or show garbled output.',
    answer:
      'Enable streaming in the client, avoid proxy buffering, and make sure your reverse proxy supports Server-Sent Events.',
  },
  {
    question: 'Costs look higher than expected.',
    answer:
      'Review model pricing, group ratio, cache billing, and whether the client is sending long conversation history on every turn.',
  },
]

export const OPENAI_COMPATIBLE_EXAMPLE = `curl https://your-domain.example.com/v1/chat/completions \\
  -H "Authorization: Bearer sk-your-atom-pump-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": "Hello from my AI Agent client"
      }
    ],
    "stream": true
  }'`

export const CONFIG_SNIPPET = `{
  "provider": "openai",
  "apiBase": "https://your-domain.example.com/v1",
  "apiKey": "sk-your-atom-pump-key",
  "model": "gpt-4o"
}`

export const DOCS_STATS = [
  {
    label: 'Client types',
    value: '8+',
    icon: Boxes,
  },
  {
    label: 'Protocol',
    value: 'OpenAI Compatible',
    icon: Braces,
  },
  {
    label: 'Setup time',
    value: '5 min',
    icon: Workflow,
  },
] as const

export const DOCS_APPS_I18N_KEYS = [
  'AI Agent client integration',
  'Connect AI Agent clients to AtomPump',
  'Use one OpenAI-compatible endpoint to connect chat clients, IDE agents, workflow builders, and self-hosted AI apps to the models managed by AtomPump.',
  'View model IDs',
  'Check pricing',
  'Client types',
  'Protocol',
  'Setup time',
  'On this page',
  'Start here',
  'Five-minute setup',
  'Most AI Agent clients can connect through the same OpenAI-compatible fields. Configure the client once, then switch models from AtomPump.',
  'Test request',
  'Required fields',
  'The three values every client needs',
  'Different clients use different labels, but the values are the same: endpoint, key, and model.',
  'Generic client config',
  'Supported protocol paths',
  'Pick the route that matches the client protocol. Most apps use Chat Completions; coding agents may use Responses or Claude Messages.',
  'Popular AI Agent clients',
  'Use these recipes when a client asks for OpenAI Compatible, Custom OpenAI, API Host, or Base URL settings.',
  'CLI and coding agents',
  'Use these patterns when a terminal agent, IDE agent, or bot framework asks for provider environment variables or a config file.',
  'Best for',
  'Where to configure',
  'Protocol',
  'Example config',
  'Important note',
  'Common connection issues',
  'Most failures come from endpoint formatting, model names, key scope, or browser network access.',
  ...DOCS_ANCHORS.map((item) => item.label),
  ...CONNECTION_FIELDS.flatMap((field) => [
    field.label,
    field.description,
  ]),
  ...QUICK_STEPS,
  ...PROTOCOL_PATHS.flatMap((item) => [
    item.label,
    item.description,
  ]),
  ...APP_GUIDES.flatMap((app) => [
    app.description,
    app.bestFor,
    ...app.steps,
    app.tip,
  ]),
  ...CLI_AGENT_GUIDES.flatMap((app) => [
    app.description,
    app.protocol,
    ...app.steps,
    app.note,
  ]),
  ...TROUBLESHOOTING.flatMap((item) => [item.question, item.answer]),
] as const
