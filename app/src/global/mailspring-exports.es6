/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */
import DatabaseObjectRegistry from '../registries/database-object-registry';

// This module exports an empty object, with a ton of defined properties that
// `require` files the first time they're called.
module.exports = exports = window.$m = {};


const resolveExport = requireValue => {
  return requireValue.default || requireValue;
};

const lazyLoadWithGetter = (prop, getter) => {
  const key = `${prop}`;

  if (exports[key]) {
    throw new Error(`Fatal error: Duplicate entry in mailspringexports: ${key}`);
  }
  Object.defineProperty(exports, prop, {
    configurable: true,
    enumerable: true,
    get: () => {
      let value = getter();
      if (value.default) {
        value = value.default;
      }
      Object.defineProperty(exports, prop, { enumerable: true, value });
      return value;
    },
  });
};

const lazyLoad = (prop, path) => {
  //lazyLoadWithGetter(prop, () => resolveExport(require(`../${path}`)));
  lazyLoadWithGetter(prop, path);
};

const _resolveNow = [];
const load = (klassName, path) => {
  lazyLoad(klassName, path);
  _resolveNow.push(klassName);
};

const lazyLoadAndRegisterModel = (klassName, path) => {
  //lazyLoad(klassName, `flux/models/${path}`);
  lazyLoad(klassName, path);
  DatabaseObjectRegistry.register(klassName, () => exports[klassName]);
};

const lazyLoadAndRegisterTask = (klassName, path) => {
  lazyLoad(klassName, path);
  DatabaseObjectRegistry.register(klassName, () => exports[klassName]);
};

lazyLoadWithGetter(`localized`, () => require('../intl').localized);
lazyLoadWithGetter(`localizedReactFragment`, () => require('../intl').localizedReactFragment);
lazyLoadWithGetter(`isRTL`, () => require('../intl').isRTL);

// Actions
lazyLoad(`Actions`, () => require('../flux/actions'));

// API Endpoints
lazyLoad(`MailspringAPIRequest`, () => require('../flux/mailspring-api-request'));
lazyLoad(`MailsyncProcess`, () => require('../mailsync-process'));


// The Database
lazyLoad(`Matcher`, () => require('../flux/attributes/matcher'));
lazyLoad(`DatabaseStore`, () => require('../flux/stores/database-store'));
lazyLoad(`QueryResultSet`, () => require('../flux/models/query-result-set'));
lazyLoad(`QuerySubscription`, () => require('../flux/models/query-subscription'));
lazyLoad(`MutableQueryResultSet`, () => require('../flux/models/mutable-query-result-set'));
lazyLoad(`QuerySubscriptionPool`, () => require('../flux/models/query-subscription-pool'));
lazyLoad(`ObservableListDataSource`, () => require('../flux/stores/observable-list-data-source'));
lazyLoad(`MutableQuerySubscription`, () => require('../flux/models/mutable-query-subscription'));

// Database Objects
exports.DatabaseObjectRegistry = DatabaseObjectRegistry;
lazyLoad(`Model`, () => require('../flux/models/model'));
lazyLoad(`Attributes`, () => require('../flux/attributes'));
lazyLoadAndRegisterModel(`File`, () => require('../flux/models/file'));
lazyLoadAndRegisterModel(`Event`, () => require('../flux/models/event'));
lazyLoadAndRegisterModel(`Label`, () => require('../flux/models/label'));
lazyLoadAndRegisterModel(`Folder`, () => require('../flux/models/folder'));
lazyLoadAndRegisterModel(`Thread`, () => require('../flux/models/thread'));
lazyLoadAndRegisterModel(`Account`, () => require('../flux/models/account'));
lazyLoadAndRegisterModel(`Message`, () => require('../flux/models/message'));
lazyLoadAndRegisterModel(`Contact`, () => require('../flux/models/contact'));
lazyLoadAndRegisterModel(`Category`, () => require('../flux/models/category'));
lazyLoadAndRegisterModel(`Calendar`, () => require('../flux/models/calendar'));
lazyLoadAndRegisterModel(`ProviderSyncbackRequest`, () => require('../flux/models/provider-syncback-request'));

// Search Query Interfaces
// lazyLoad(`SearchQueryAST`, 'services/search/search-query-ast');
// lazyLoad(`SearchQueryParser`, 'services/search/search-query-parser');
// lazyLoad(`IMAPSearchQueryBackend`, 'services/search/search-query-backend-imap');

// Tasks
lazyLoad(`TaskFactory`, () => require('../flux/tasks/task-factory'));
lazyLoadAndRegisterTask(`Task`, () => require('../flux/tasks/task'));
lazyLoadAndRegisterTask(`EventRSVPTask`, () => require('../flux/tasks/event-rsvp-task'));
lazyLoadAndRegisterTask(`SendDraftTask`, () => require('../flux/tasks/send-draft-task'));
lazyLoadAndRegisterTask(`ChangeMailTask`, () => require('../flux/tasks/change-mail-task'));
lazyLoadAndRegisterTask(`DestroyDraftTask`, () => require('../flux/tasks/destroy-draft-task'));
lazyLoadAndRegisterTask(`ChangeLabelsTask`, () => require('../flux/tasks/change-labels-task'));
lazyLoadAndRegisterTask(`ChangeFolderTask`, () => require('../flux/tasks/change-folder-task'));
lazyLoadAndRegisterTask(`ChangeUnreadTask`, () => require('../flux/tasks/change-unread-task'));
lazyLoadAndRegisterTask(`DestroyModelTask`, () => require('../flux/tasks/destroy-model-task'));
lazyLoadAndRegisterTask(`SyncbackDraftTask`, () => require('../flux/tasks/syncback-draft-task'));
lazyLoadAndRegisterTask(`ChangeStarredTask`, () => require('../flux/tasks/change-starred-task'));
lazyLoadAndRegisterTask(`SyncbackEventTask`, () => require('../flux/tasks/syncback-event-task'));
lazyLoadAndRegisterTask(`DestroyCategoryTask`, () => require('../flux/tasks/destroy-category-task'));
lazyLoadAndRegisterTask(`SyncbackCategoryTask`,  () => require('../flux/tasks/syncback-category-task'));
lazyLoadAndRegisterTask(`SyncbackMetadataTask`, () => require('../flux/tasks/syncback-metadata-task'));
lazyLoadAndRegisterTask(`GetMessageRFC2822Task`, () => require('../flux/tasks/get-message-rfc2822-task'));
lazyLoadAndRegisterTask(`ExpungeAllInFolderTask`, () => require('../flux/tasks/expunge-all-in-folder-task'));
lazyLoadAndRegisterTask(`ChangeRoleMappingTask`, () => require('../flux/tasks/change-role-mapping-task'));
lazyLoadAndRegisterTask(`SendFeatureUsageEventTask`, () => require('../flux/tasks/send-feature-usage-event-task'));

// Stores
// These need to be required immediately since some Stores are
// listen-only and not explicitly required from anywhere. Stores
// currently set themselves up on require.
load(`TaskQueue`, () => require('../flux/stores/task-queue'));
load(`BadgeStore`, () => require('../flux/stores/badge-store'));
load(`DraftStore`, () => require('../flux/stores/draft-store'));
load(`DraftFactory`, () => require('../flux/stores/draft-factory'));
load(`ModalStore`, () => require('../flux/stores/modal-store'));
load(`OutboxStore`, () => require('../flux/stores/outbox-store'));
load(`PopoverStore`, () => require('../flux/stores/popover-store'));
load(`AccountStore`, () => require('../flux/stores/account-store'));
load(`SignatureStore`, () => require('../flux/stores/signature-store'));
load(`MessageStore`, () => require('../flux/stores/message-store'));
load(`ContactStore`, () => require('../flux/stores/contact-store'));
load(`IdentityStore`, () => require('../flux/stores/identity-store'));
load(`CategoryStore`, () => require('../flux/stores/category-store'));
load(`UndoRedoStore`, () => require('../flux/stores/undo-redo-store'));
load(`WorkspaceStore`, () => require('../flux/stores/workspace-store'));
load(`MailRulesStore`, () => require('../flux/stores/mail-rules-store'));
load(`SendActionsStore`, () => require('../flux/stores/send-actions-store'));
load(`FeatureUsageStore`, () => require('../flux/stores/feature-usage-store'));
load(`ThreadCountsStore`, () => require('../flux/stores/thread-counts-store'));
load(`AttachmentStore`, () => require('../flux/stores/attachment-store'));
load(`OnlineStatusStore`, () => require('../flux/stores/online-status-store'));
load(`UpdateChannelStore`, () => require('../flux/stores/update-channel-store'));
load(`PreferencesUIStore`, () => require('../flux/stores/preferences-ui-store'));
load(`FocusedContentStore`, () => require('../flux/stores/focused-content-store'));
load(`MessageBodyProcessor`, () => require('../flux/stores/message-body-processor'));
load(`FocusedContactsStore`, () => require('../flux/stores/focused-contacts-store'));
load(`FolderSyncProgressStore`, () => require('../flux/stores/folder-sync-progress-store'));
load(`FocusedPerspectiveStore`, () => require('../flux/stores/focused-perspective-store'));
load(`SearchableComponentStore`, () => require('../flux/stores/searchable-component-store'));

lazyLoad(`ServiceRegistry`, () => require(`../registries/service-registry`));

// Decorators
lazyLoad(`InflatesDraftClientId`, () => require('../decorators/inflates-draft-client-id'));

// Extensions
lazyLoad(`ExtensionRegistry`, () => require(`../registries/extension-registry`));
lazyLoad(`MessageViewExtension`, () => require('../extensions/message-view-extension'));
lazyLoad(`ComposerExtension`, () => require('../extensions/composer-extension'));

// 3rd party libraries
lazyLoadWithGetter(`Rx`, () => require('rx-lite'));
lazyLoadWithGetter(`React`, () => require('react'));
lazyLoadWithGetter(`ReactDOM`, () => require('react-dom'));
lazyLoadWithGetter(`ReactTestUtils`, () => require('react-dom/test-utils'));
lazyLoadWithGetter(`PropTypes`, () => require('prop-types'));

// React Components
lazyLoad(`ComponentRegistry`, () => require('../registries/component-registry').default);

// Utils
lazyLoad(`Utils`, () => require('../flux/models/utils'));
lazyLoad(`DOMUtils`, () => require('../dom-utils'));
lazyLoad(`DateUtils`, () => require('../date-utils'));
lazyLoad(`FsUtils`, () => require('../fs-utils'));
lazyLoad(`CanvasUtils`, () => require('../canvas-utils'));
lazyLoad(`RegExpUtils`, () => require('../regexp-utils'));
lazyLoad(`MenuHelpers`, () => require('../menu-helpers'));
lazyLoad(`VirtualDOMUtils`, () => require('../virtual-dom-utils'));
//lazyLoad(`Spellchecker`, () => require('../spellchecker'));
lazyLoad(`MessageUtils`, () => require('../flux/models/message-utils'));

// Services
// lazyLoad(`KeyManager`, 'key-manager');
lazyLoad(`SoundRegistry`, () => require('../registries/sound-registry'));
// lazyLoad(`MailRulesTemplates`, 'mail-rules-templates');
// lazyLoad(`MailRulesProcessor`, 'mail-rules-processor');
lazyLoad(`MailboxPerspective`, () => require('../mailbox-perspective'));
// lazyLoad(`NativeNotifications`, 'native-notifications');
// lazyLoad(`SanitizeTransformer`, 'services/sanitize-transformer');
lazyLoad(`QuotedHTMLTransformer`, () => require('../services/quoted-html-transformer'));
// lazyLoad(`InlineStyleTransformer`, 'services/inline-style-transformer');
lazyLoad(`SearchableComponentMaker`, () => require('../searchable-components/searchable-component-maker'));


// Process Internals
lazyLoad(`DefaultClientHelper`, () => require('../default-client-helper'));
//lazyLoad(`SystemStartService`, 'system-start-service');

// Testing
//lazyLoadWithGetter(`MailspringTestUtils`, () => require('../../spec/mailspring-test-utils'));

// Errors
lazyLoadWithGetter(`APIError`, () => require('../flux/errors').APIError);