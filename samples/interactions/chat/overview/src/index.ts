import { defineComponents, IgcAvatarComponent, IgcChatComponent, IgcChatOptions } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'
import { html, nothing } from 'lit-html';

defineComponents(IgcAvatarComponent, IgcChatComponent);

export class ChatOverview {
  private chat: IgcChatComponent;
  private messages = [
    {
      id: '1',
      text: `Hi there! What would you like to do today — check your order status, request a return, or talk to one of our agents?`,
      sender: 'support',
      timestamp: (Date.now() - 3500000).toString()
    },
  ];

  // --- Order Tracking Flow ---
  private orderTrackingMessages = [
    {
      id: '2',
      text: `Order tracking`,
      sender: 'user',
      timestamp: (Date.now() - 3400000).toString()
    },
    {
      id: '3',
      text: `Sure! Please provide your order number and I’ll look it up.`,
      sender: 'support',
      timestamp: (Date.now() - 3300000).toString()
    },
    {
      id: '4',
      text: `It’s #7890.`,
      sender: 'user',
      timestamp: (Date.now() - 3200000).toString()
    },
    {
      id: '5',
      text: `Got it — order #7890 was delivered yesterday. Here’s the driver’s photo showing the delivery location.`,
      sender: 'support',
      timestamp: (Date.now() - 3100000).toString(),
      attachments: [
        {
          id: 'delivery-photo',
          name: 'Delivery location',
          url: 'https://media.istockphoto.com/id/1207972183/photo/merchandise-delivery-from-online-ordering.jpg?s=612x612&w=0&k=20&c=cGcMqd_8FALv4Tueh7sllYZuDXurkfkqoJf6IAIWhJk=',
          type: 'image'
        }
      ]
    },
  ];

  // --- Returns Flow ---
  private returnMessages = [
    {
      id: '6',
      text: `Returns`,
      sender: 'user',
      timestamp: (Date.now() - 3000000).toString()
    },
    {
      id: '7',
      text: `No problem. Which item would you like to return? You can paste the product name or order number.`,
      sender: 'support',
      timestamp: (Date.now() - 2900000).toString()
    },
    {
      id: '8',
      text: `I want to return the blue headphones from my last order.`,
      sender: 'user',
      timestamp: (Date.now() - 2800000).toString()
    },
    {
      id: '9',
      text: `Thanks. I’ve generated a prepaid return label for you — just print it and drop off the package.`,
      sender: 'support',
      timestamp: (Date.now() - 2700000).toString(),
      attachments: [
        {
          id: 'return-label',
          name: 'Return label (PDF).pdf',
          url: 'https://placehold.co/600x400?text=Return+Label',
          type: 'file'
        }
      ]
    },
  ];

  // --- Talk to Agent Flow ---
  private talkToAgentMessages = [
    {
      id: '10',
      text: `Talk to agent`,
      sender: 'user',
      timestamp: (Date.now() - 2600000).toString()
    },
    {
      id: '11',
      text: `Okay, I’ll connect you with a live support agent. Please hold for a moment...`,
      sender: 'support',
      timestamp: (Date.now() - 2500000).toString()
    },
  ];

  private options: IgcChatOptions = {
    disableAutoScroll: false,
    disableInputAttachments: false,
    suggestions: ['Order tracking', `Returns`, 'Talk to agent'],
    inputPlaceholder: 'Type your message here...',
    headerText: 'Customer Support',
    renderers: {
      messageHeader: (ctx) => this.messageHeaderTemplate(ctx.message),
      messageActions: () => nothing
    }
  };

  private messageHeaderTemplate = (msg: any) => {
    return msg.sender !== 'user'
      ? html`
          <div style="display: flex; align-items: center; gap: 8px;">
            <igc-avatar
              shape="circle"
              src="https://www.infragistics.com/angular-demos/assets/images/men/1.jpg"
              style="position: relative;"
            >
            </igc-avatar>
            <span
              style="color: #c00000; font-weight: bold; margin: 8px"
              >Customer Support</span
            >
          </div>
        `
      : nothing;
  };

  constructor() {
    this.chat = document.querySelector('igc-chat') as IgcChatComponent;
    this.chat.messages = this.messages;
    this.chat.options = this.options;
    this.chat.addEventListener('igcMessageCreated', this.onMessageCreated)
  }

  public onMessageCreated = (e: CustomEvent) => {
    e.preventDefault();
    const newMessage = e.detail;
    
    switch (newMessage.text) {
      case 'Order tracking':
        this.loadMessageFlow(this.orderTrackingMessages);
        break;  
      case 'Returns':
        this.loadMessageFlow(this.returnMessages);
        break;  
      case 'Talk to agent':
        this.loadMessageFlow(this.talkToAgentMessages);
        break;  
      default:
        this.simulateResponse();
    }

    // this.chat.options = { ...this.chat.options, isTyping: true, suggestions: this.options.suggestions};
    this.chat.draftMessage = { text: '', attachments: [] };
  }

  private loadMessageFlow(messages: any[]) {
    messages.forEach((m, i) => {
      setTimeout(() => {
        this.messages = [...this.messages, m];
        this.chat.messages = [...this.messages];
        const isTyping = i !== messages.length - 1;
        this.chat.options = { ...this.chat.options, isTyping, suggestions: isTyping ? [] : this.options.suggestions };
      }, 1500 * i)
    });
  }
  
  simulateResponse() {
    this.messages = [...this.messages, { 
      id: '1000',
      text: `Our support team is currently unavailable. We'll get back to you as soon as possible.`,
      sender: 'support',
      timestamp: Date.now().toString() 
    }];
  } 
}

new ChatOverview();
