/**
 * Sync mail from Nylas.
 */

import Label from '../flux/models/label';
import Folder from '../flux/models/folder';
const DatabaseObjectRegistry = require('../registries/database-object-registry').default;


export class FakeEmailBackend {

  async getLabels() {
    return [
      new Label({
        id: "1",
        accountId: 1,
        role: null,
        localStatus: null,
        path: 'label1',
      }),

      new Label({
        id: "2",
        accountId: 1,
        role: null,
        localStatus: null,
        path: 'label2',
      })
    ];
  }

  async getFolders() {
    return [
      new Folder({
        id: "3",
        accountId: 1,
        role: null,
        localStatus: null,
        path: 'Folder 1',
      }),

      new Folder({
        id: "4",
        accountId: 1,
        role: null,
        localStatus: null,
        path: 'Folder 2',
      })
    ];
  }

  async getThreads() {
    const thread = DatabaseObjectRegistry.deserialize('Thread', {
      metadataForPluginId: {},
      id: 99,
      aid: 1,
      subject: "Test",
      lastMessageSentTimestamp: new Date().toISOString(),
      lastMessageReceivedTimestamp: new Date().toISOString(),
      folders: [],
      labels: [],
      participants: [
        {
          __cls: 'Contact',
          id: 1,
          name: "Michael",
        }
      ]
    });

    return [thread];
  }

  async getMessages() {
    const message = DatabaseObjectRegistry.deserialize('Message', {
      metadataForPluginId: {},
      id: 999,
      aid: 1,
      threadId: 99,
      subject: "Test",
      unread: true,
      folder: {
        __cls: 'Folder',
        id: 1,
        aid: 1,
        role: "something",
        path: "something",
        localStatus: null
      },
      date: new Date().toISOString(),
    });

    message.body = message.constructor.attributes["body"].deserialize(message, "email content")

    return [message];
  }

  // Process tasks
  async handleTask(task) {
    console.log('fake backend ignores task: ', task);
  }
}