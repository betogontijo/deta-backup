import DetaClass from './deta';
import DriveClass from './drive';
import { KeyType } from './types/key';

/**
 * Deta returns instance of Deta class
 *
 * @param {string} [projectKey]
 * @param {string} [authToken]
 * @returns {DetaClass}
 */
export function Deta(projectKey?: string, authToken?: string): DetaClass {
  const token = authToken?.trim();
  const key = projectKey?.trim();
  if (token && key) {
    return new DetaClass(token, KeyType.AuthToken, key);
  }

  const apiKey = key || process.env.DETA_PROJECT_KEY?.trim();
  if (!apiKey) {
    throw new Error('Project key is not defined');
  }

  return new DetaClass(apiKey, KeyType.ProjectKey, apiKey.split('_')[0]);
}
