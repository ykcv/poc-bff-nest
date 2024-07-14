/* Extra */
import { Request } from 'express';

/* Project */
import { getEnv } from './env';

const blockedKeys = ['pass', 'password', 'card'];

const filterRequestParams = (req: Request) => {
  return Object.entries({
    ...req.params,
    ...req.body,
    ...req.query,
  })
    .map(([key, value]) =>
      blockedKeys.includes(key) ? { key, value: '******' } : { key, value },
    )
    .reduce((accumulator, current) => {
      return { ...accumulator, [current.key]: current.value };
    }, {});
};

const setQueryParams = (queryparams: object) => {
  let uri = '';
    for (const key in queryparams) {
      if (queryparams[key]) {
        uri = uri + `${key}=${queryparams[key]}&`
      }
    }
    return uri;
}
export { getEnv, filterRequestParams, setQueryParams };
