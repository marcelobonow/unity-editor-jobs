const { createBullBoard } = require('@bull-board/api')
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

import { ExpressAdapter } from '@bull-board/express';
import GenerateAssetBundleQueue from './Queue'
const serverAdapter = new ExpressAdapter();

createBullBoard({
  queues: [
    new BullMQAdapter(GenerateAssetBundleQueue),
  ],
  serverAdapter: serverAdapter
});

serverAdapter.setBasePath('/admin/queues')
export default serverAdapter.getRouter();