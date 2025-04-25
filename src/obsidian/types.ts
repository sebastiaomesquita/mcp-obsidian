export interface ObsidianOptions {
  apiKey: string;
  protocol?: "http" | "https";
  host?: string;
  port?: number;
}

export interface StatusResponse {
  status: string;
  manifest: {
    id: string;
    name: string;
    version: string;
    minAppVersion: string;
    description: string;
    author: string;
    authorUrl: string;
    isDesktopOnly: boolean;
    dir: string;
  };
  versions: {
    obsidian: string;
    self: string;
  };
  service: string;
  authenticated: boolean;
  certificateInfo: {
    validityDays: number;
    regenerateRecommended: boolean;
  };
  apiExtensions: unknown;
}

export interface ErrorResponse {
  errorCode: number;
  message: string;
}

export interface PatchActiveOptions {
  operation: Operation;
  targetType: TargetType;
  target: string;
  content: string;
  trimTargetWhitespace?: boolean;
  targetDelimiter?: string;
  contentType?: string;
}

export interface ListFilesResponse {
  files: string[];
}

export interface NoteJson {
  content: string;
  frontmatter: unknown;
  path: string;
  stat: {
    ctime: number;
    mtime: number;
    size: number;
  };
  tags: string[];
}

export interface CommandItem {
  id: string;
  name: string;
}

export interface CommandsResponse {
  commands: CommandItem[];
}

export interface PatchPeriodOptions {
  period: Period;
  operation: Operation;
  targetType: TargetType;
  target: string;
  content: string;
  trimTargetWhitespace?: boolean;
  targetDelimiter?: string;
  contentType?: string;
}

export interface SearchResult {
  filename: string;
  result: string | number | unknown[] | Record<string, unknown> | boolean;
}

export interface SimpleSearchResponse {
  filename: string;
  matches: { match: { start: number; end: number }; context: string }[];
  score: number;
}

export interface PatchFileOptions {
  filename: string;
  operation: Operation;
  targetType: TargetType;
  target: string;
  content: string;
  trimTargetWhitespace?: boolean;
  targetDelimiter?: string;
  contentType?: string;
}

export type Operation = "append" | "prepend" | "replace";
export type TargetType = "heading" | "block" | "frontmatter";
export type Period = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
