import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
  rest.get('getLangFile.do', (req, res, ctx) => {
    return res(ctx.json(`window.__messageResource = {}`));
  }),
];
// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);

export const getEmailTemplatesHandler = (resData, requestText) => {
  server.use(
    rest.get(
      `/email/getEmailTemplates.do?category=${requestText}`,
      (req, res, ctx) => {
        return res(ctx.json(resData || {}));
      },
    ),
  );
};

export const uploadDocumentTempHandler = (resData) => {
  server.use(
    rest.post(`/document/uploadDocumentTemp.do`, (req, res, ctx) => {
      return res(ctx.json({ result: resData } || {}));
    }),
  );
};
