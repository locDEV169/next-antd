/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const __prod__ = process.env.NODE_ENV === 'production';
export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ultorex.org';
export const isServer = () => typeof window === 'undefined';
