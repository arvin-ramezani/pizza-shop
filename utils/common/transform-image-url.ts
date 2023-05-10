export default function transformImageUrl(url: string | undefined) {
  return url?.slice(7, url.length);
}
