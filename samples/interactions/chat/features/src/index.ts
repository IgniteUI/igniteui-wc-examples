import { defineComponents, IgcChatComponent, IgcChatMessage, IgcChatOptions } from 'igniteui-webcomponents';
import { createMarkdownRenderer } from 'igniteui-webcomponents/extras';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'
import { html, nothing } from 'lit-html';

defineComponents(IgcChatComponent);

export class ChatOverview {
  private chat: IgcChatComponent;
  private markdownRenderer: any;

  private messages = [
    {
      id: '1',
      text: `Hello. How can we assist you today?`,
      sender: 'support',
      timestamp: (Date.now() - 3500000).toString()
    },
    {
      id: '2',
      text: `Hello. I have problem with styling IgcAvatarComponent. Can you take a look at the attached file and help me?`,
      sender: 'user',
      timestamp: (Date.now() - 3400000).toString(),
      attachments: [
        {
          id: 'AvatarStyles.css',
          name: 'AvatarStyles.css',
          url: './styles/AvatarStyles.css',
          type: 'text/css'
        },
      ],
    },
    {
      id: '3',
      text: `Sure, give me a moment to check the file.`,
      sender: 'support',
      timestamp: (Date.now() - 3300000).toString()
    },
    {
      id: '4',
      text: 
      `
Thank you for your patience. It seems that the issue is the name of the CSS part. Here is the fixed code:
\`\`\`css
igc-avatar::part(base) {
  --size: 60px;
  color: var(--ig-success-500-contrast);
  background: var(--ig-success-500);
  border-radius: 20px;
}
\`\`\`
      `,
      sender: 'support',
      timestamp: (Date.now() - 3200000).toString()
    }
  ];

  private options: IgcChatOptions = {
    disableAutoScroll: false,
    disableInputAttachments: false,
    inputPlaceholder: 'Type your message here...',
    headerText: 'Developer Support',
    suggestionsPosition: "below-input",
    renderers: {
      messageHeader: (ctx) => this.messageHeaderTemplate(ctx.message),
      messageContent: async (ctx) => this.markdownRenderer(ctx.message),
      suggestionPrefix: () => this.suggestionPrefixTemplate()
    },
    suggestions: [ 'Send me an e-mail when support is available.' ]
  };
  

  private messageHeaderTemplate = (msg: IgcChatMessage) => {
    return msg.sender !== 'user'
      ? html`
          <div>
            <span
              style="color: #c00000; font-weight: bold;"
              >Developer Support</span
            >
          </div>
        `
      : nothing;
  };

  private suggestionPrefixTemplate = () => {
    return html`<span style="font-weight: bold;">💡</span>&nbsp;`;
  }

  constructor() {
    this.chat = document.querySelector('igc-chat') as IgcChatComponent;
    this.init();
  }

  private async init() {
    this.markdownRenderer = await createMarkdownRenderer();
    this.chat.messages = this.messages;
    this.chat.options = this.options;
    this.chat.addEventListener('igcMessageCreated', this.onMessageCreated);
  }

  public onMessageCreated = (e: CustomEvent) => {
    e.preventDefault();

    this.chat.options = { ...this.chat.options, isTyping: true, suggestions: [] };
    const newMessage = e.detail;
    this.messages.push(newMessage);

    const responseMessage = {
      id: Date.now().toString(),
      text: 'Our support team is currently unavailable. We\'ll get back to you as soon as possible.',
      sender: 'support',
      timestamp: Date.now().toString(),
    };
    this.messages.push(responseMessage);
    this.chat.draftMessage = { text: '', attachments: [] };
    this.chat.options = { ...this.chat.options, isTyping: false};
  }
}

new ChatOverview();
