/**
 * Facebook collection unsaver.
 *
 * Copy and paste script to unsave items from collection one by one.
 */
class FacebookUnsaver {
  total = 0;
  // match these strings in menu items
  removeTexts = [
    'Unsave'.toLowerCase(),
    'Remove from collection'.toLowerCase()
  ];

  delay(ms = 1100) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  clearRead() {
    /** @type {HTMLElement[]} */
    const elements = Array.from(
      document.querySelectorAll('[data-unsave="true"]')
    );
    for (const element of elements) {
      delete element.dataset.unsave;
    }
  }

  /** @param {HTMLElement[]} elements */
  filterRead(elements) {
    return elements.filter(element => !element.dataset.unsave);
  }

  /** @param {HTMLElement[]} elements */
  markRead(elements) {
    // attach extra attribute to determine that the element was read
    for (const element of elements) {
      element.dataset.unsave = 'true';
    }
  }

  // get button elements to click for opening context menu
  getButtons() {
    /** @type {HTMLElement[]} */
    const buttons = Array.from(
      document
        .querySelector('[role=main]')
        .querySelectorAll('[aria-label="More"]')
    ).slice(1);
    return this.filterRead(buttons);
  }

  getRemoveMenuItems() {
    /** @type {HTMLElement[]} */
    const menuItems = Array.from(
      document.querySelectorAll('[role=menuitem]')
    ).filter(menuItem => {
      const text = (menuItem.textContent || '').trim().toLowerCase();
      return this.removeTexts.includes(text);
    });
    return this.filterRead(menuItems);
  }

  async runOpenAndRemove() {
    const elements = this.getButtons();
    this.markRead(elements);
    for (const element of elements) {
      element.click();
      await this.delay();
      // take this opportunity to remove as well
      this.runRemove();
    }
    if (elements.length > 0) {
      await this.delay();
    }
    return elements.length;
  }

  async runRemove() {
    const elements = this.getRemoveMenuItems();
    this.markRead(elements);
    for (const element of elements) {
      element.click();
      console.log('[fb-unsaver] Removed item: %o', ++this.total);
      await this.delay();
    }
    if (elements.length > 0) {
      await this.delay();
    }
  }

  async run() {
    console.log('[fb-unsaver] Running fb-unsaver. Close tab to stop.');
    while (true) {
      // start fresh by clearing read elements
      this.clearRead();
      // remove already open menu items
      await this.runRemove();
      // open menus and unsave items
      await this.runOpenAndRemove();
      // catch any unclicked menu items
      await this.runRemove();
      console.log('[fb-unsaver] Total removed: %o', this.total);

      const elements = {
        more: this.getButtons().length,
        remove: this.getRemoveMenuItems().length
      };
      if (elements.more + elements.remove === 0) {
        const message = '[fb-unsaver] Stopping. No more items to remove.';
        console.log(message);
        alert(message);
        break;
      }
      console.log(
        '[fb-unsaver] Found (%o, %o) to remove. Continuing fb-unsaver.',
        elements.more,
        elements.remove
      );
    }
  }
}

// declare with var to allow multiple copy and paste
var unsaver = new FacebookUnsaver();
function unsave() {
  unsaver.run();
}

unsave();
