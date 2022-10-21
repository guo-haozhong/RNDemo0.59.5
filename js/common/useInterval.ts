import { useEffect, useRef } from 'react'

/**
 * interTerval hooks组件
 * @param fn 执行函数
 * @param delay 时间
 * @param options immediate为true时，先立即执行一次fn函数后再执行定时器
 */
function useInterval(
  fn: () => void,
  delay: number | null | undefined,
  options?: {
    immediate?: boolean
  }
): void {
  const immediate = options?.immediate
  const timerRef = useRef<() => void>()

  timerRef.current = fn

  useEffect(() => {
    if (delay === undefined || delay === null) {
      return
    }
    if (immediate) {
      timerRef.current?.()
    }
    const timer = setInterval(() => {
      timerRef.current?.()
    }, delay)
    return () => {
      clearInterval(timer)
    }
  }, [delay])
}

export default useInterval
