import { defineComponents, IgcAvatarComponent, IgcChatComponent, IgcChatOptions } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './layout.css'
import { html, nothing } from 'lit-html';
import './ChatStyle.css';

defineComponents(IgcAvatarComponent, IgcChatComponent);

export class ChatOverview {
  private chat: IgcChatComponent;

  private messages = [
    {
      id: '1',
      text: `Hi, I have a question about my recent order, #7890.`,
      sender: 'user',
      timestamp: (Date.now() - 3500000).toString()
    },
    {
      id: '2',
      text: `Hello! I can help with that. What is your question regarding order #7890?`,
      sender: 'support',
      timestamp: (Date.now() - 3400000).toString()
    },
    {
      id: '3',
      text: `The tracking status shows 'delivered', but I haven't received it yet. Can you confirm the delivery location?`,
      sender: 'user',
      timestamp: (Date.now() - 3300000).toString()
    },
    {
      id: '4',
      text: `I've reviewed the delivery details. It seems the package was left in a different spot. Here's a photo from our delivery driver showing where it was placed. Please check your porch and side door.`,
      sender: 'support',
      timestamp: (Date.now() - 3200000).toString(),
      attachments: [
        {
          id: 'delivery-location-image',
          name: 'Delivery location',
          url: 'https://media.istockphoto.com/id/1207972183/photo/merchandise-delivery-from-online-ordering.jpg?s=612x612&w=0&k=20&c=cGcMqd_8FALv4Tueh7sllYZuDXurkfkqoJf6IAIWhJk=',
          type: 'image'
        },
      ],
    },
  ];

  private options: IgcChatOptions = {
    disableAutoScroll: false,
    disableInputAttachments: false,
    suggestions: [`It's there. Thanks.`, `It's not there.`],
    inputPlaceholder: 'Type your message here...',
    headerText: 'Customer Support',
    renderers: {
      messageHeader: (ctx) => this.messageHeaderTemplate(ctx.message),
    }
  };

  private messageHeaderTemplate = (msg: any) => {
    return msg.sender !== 'user'
      ? html`
          <div>
            <igc-avatar
              shape="circle"
              src="https://www.infragistics.com/angular-demos/assets/images/men/1.jpg"
              style="position: relative;"
            >
            </igc-avatar>
            <span
              style="color: #c00000; font-weight: bold; position: absolute; margin: 8px"
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
    this.messages.push(newMessage);
    this.chat.options = { ...this.chat.options, suggestions: [] };

    const responseMessage = {
      id: Date.now().toString(),
      text: `Our support team is currently unavailable. We'll get back to you as soon as possible.`,
      sender: 'support',
      timestamp: Date.now().toString(),
    };
    this.messages.push(responseMessage);
  }
}

new ChatOverview();
