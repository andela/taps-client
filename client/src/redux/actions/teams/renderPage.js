import { RENDER_CONTENT, RENDER_SUB_CONTENT } from '../types';

export const renderContent = title => ({
  type: RENDER_CONTENT,
  title
});

export const renderSubContent = title => ({
  type: RENDER_SUB_CONTENT,
  title
});

