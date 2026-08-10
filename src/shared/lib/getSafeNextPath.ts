/** 오픈 리다이렉트 방지: 동일 오리진 상대 경로만 허용 */
export function getSafeNextPath(
  nextPath: string | null | undefined,
  fallback = '/',
): string {
  if (!nextPath) return fallback
  if (!nextPath.startsWith('/') || nextPath.startsWith('//')) return fallback
  return nextPath
}
