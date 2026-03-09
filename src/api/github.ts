const CACHE_KEY = 'githubReposCache';
const CACHE_TTL_MS = 60 * 60 * 1000;

export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

export interface GetGithubReposOptions {
  forceRefresh?: boolean;
}

interface CachedRepos {
  timestamp: number;
  data: GithubRepo[];
}

function readCachedRepos(): CachedRepos | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }

    const candidate = parsed as Partial<CachedRepos>;
    if (!Array.isArray(candidate.data) || typeof candidate.timestamp !== 'number') {
      return null;
    }

    return {
      timestamp: candidate.timestamp,
      data: candidate.data as GithubRepo[],
    };
  } catch {
    return null;
  }
}

function writeCachedRepos(data: GithubRepo[]): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      })
    );
  } catch {
    // Ignore storage quota/private mode failures and continue with in-memory response.
  }
}

/**
 * Reads cached GitHub repositories from static JSON served by GitHub Pages.
 *
 * This keeps the app fully static:
 * 1) GitHub Actions writes /public/data/repos.json every 6 hours
 * 2) The client fetches /data/repos.json
 * 3) localStorage caches the response for 1 hour to reduce repeated requests
 */
export async function getGithubRepos(options: GetGithubReposOptions = {}): Promise<GithubRepo[]> {
  const { forceRefresh = false } = options;
  const cached = readCachedRepos();
  const reposUrl = `${import.meta.env.BASE_URL}data/repos.json`;

  if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    const response = await fetch(reposUrl, {
      cache: forceRefresh ? 'no-store' : 'default',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub repos: ${response.status}`);
    }

    const data: unknown = await response.json();
    const repos = Array.isArray(data) ? (data as GithubRepo[]) : [];
    writeCachedRepos(repos);
    return repos;
  } catch {
    if (cached && Array.isArray(cached.data)) {
      return cached.data;
    }
    return [];
  }
}