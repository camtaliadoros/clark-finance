export const convertWysywyg = (rawContent: string) => {
  const convertedContent = rawContent.replace(/(?:\r\n|\r|\n)/g, '<br />');

  return convertedContent;
};
