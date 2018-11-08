/**
 * Sync mail from Nylas.
 */

import {Message, Thread, Label, Contact, Folder} from 'mailspring-exports';


export class NylasEmailBackend {
  constructor(token) {
    this.token = token;
  }

  async getLabels() {
   const r = await fetch('https://api.nylas.com/labels', {
    headers: {
      'authorization': this.token
    }
   });

   const data = await r.json();
   const labels = data.map(item => {
      const label = new Label({
        id: item.id,
        accountId: 1,
        role: item.name,

        // Is: { uidnext = 1, busy = true, syncedMinUID, bodiesPresent, bodiesWanted }
        localStatus: null,

        // We use this both to render a display name, but also in tasks?
        path: item.display_name,
      });
      return label;
   });

   return labels;
  }

  async getFolders() {
    return [];
  }

  async getThreads() {
    const r = await fetch('https://api.nylas.com/threads?limit=20', {
      headers: {
        'authorization': this.token
      }
    });
    const data = await r.json();
    const threads = data.map(item => {
      const thread = new Thread({
        metadataForPluginId: {},
        id: item.id,
        accountId: 1,
        subject: item.subject,
        unread: item.unread,
        lastMessageSentTimestamp: item.last_message_sent_timestamp,
        lastMessageReceivedTimestamp: item.last_message_received_timestamp,
        folders: [],
        labels: [],
        participants: [
          new Contact({id: 1, name: 'Michael'})
        ]
      });
      return thread;
    });

    return threads;
  }

  async getMessages() {
    const r = await fetch('https://api.nylas.com/messages?limit=1', {
      headers: {
        'authorization': this.token
      }
    });
    const data = await r.json();
    const messages = data.map(item => {
      const messages = new Message({
        id: item.id,
        accountId: 1,
        to: [new Contact({id: 1, name: item.to[0][0] || "foo", email: "foo@foo.de"})],
        body: item.body,
        threadId: item.thread_id,
        subject: item.subject,
        unread: item.unread,
        folder: new Folder({
          id: 4,
          accountId: 1,
          role: null,
          localStatus: null,
          path: 'Folder 2',
        }),

      });
      return messages;
    });

    return messages;
  }

  // Process tasks
  async handleTask(task) {
    if (task.constructor.name === "SyncbackCategoryTask") {
      await fetch(`https://api.nylas.com/labels/${task.categoryId}`, {
        method: 'PUT',
        body: JSON.stringify({
          display_name: task.path
        }),
        headers: {
          'authorization': this.token,
          'content-type': 'application/json'
        }
      });
      task.status = task.constructor.Status.Complete;
    }
  }
}