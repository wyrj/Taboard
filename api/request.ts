import type { UserState } from '../features/user/slice';

export async function sendApiRequest<T extends keyof Api>(api: T, json: Api[T][0]): Promise<Api[T][1]> {
  const res = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json),
  });
  const result = await res.json();
  return result;
}

export interface Api {
  '/api/user/check': [{ uid: string }, UserState | null],
  '/api/user/register': [{ name: string }, UserState],
}