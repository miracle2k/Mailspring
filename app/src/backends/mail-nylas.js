/**
 * Sync mail from Nylas.
 */

import Label from '../flux/models/label';


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
      task.status == task.constructor.Status.Complete;
    }
  }
}