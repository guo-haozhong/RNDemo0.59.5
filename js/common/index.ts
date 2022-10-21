import { useState, useEffect, useRef, useMemo } from 'react'
import useInterval from './useInterval'

interface ITime {
  /** 当前时间 */
  currentTime?: number
  /** 结束时间 */
  endTime?: number
  /** 不传当前时间和结束时间，直接传时间差 */
  differTime?: number
}

interface ICbTime {
  d: number
  h: number
  m: number
  s: number
}

/**
 * 倒计时hooks
 * @param options 时间对象
 * @param cb 倒计时完成时执行的回调函数
 * @param noImmediate 时间传进来满足执行回调条件时，是否立即执行回调，默认false执行
 */
function useCountDown(options: ITime, cb?: () => void, noImmediate?: boolean): ICbTime {
  const { currentTime = 0, endTime = 0, differTime = 0 } = options
  const [diffTime, setDiffTime] = useState(0)
  /** 组件接收到参数时的时间 */
  const entryTime = useRef<number>(0)
  /** 当前倒计时要求的时间差 */
  const maxTime = useRef<number>(0)
  /** 是否可以执行回调 */
  const isImplementCb = useRef(false)

  useEffect(() => {
    if (!isImplementCb.current) {
      isImplementCb.current = true
    }
    if ((currentTime > 0 && endTime > 0) || differTime > 0) {
      entryTime.current = new Date().getTime()
      maxTime.current = differTime > 0 ? differTime : endTime - currentTime
      if (maxTime.current <= 0 && noImmediate) {
        isImplementCb.current = false
      }
      setDiffTime(maxTime.current)
    }
  }, [currentTime, endTime, differTime])

  useInterval(
    () => {
      const curtTimes = new Date().getTime()
      const TimeDifference = curtTimes - entryTime.current
      setDiffTime(maxTime.current - TimeDifference)
    },
    diffTime <= 0 ? null : 1000
  )

  const timeObj = useMemo(() => {
    const time = diffTime > 0 ? diffTime / 1000 : 0
    const d = Math.floor(time / (24 * 60 * 60))
    const h = Math.floor((time / (60 * 60)) % 24)
    const m = Math.floor((time / 60) % 60)
    let s = Math.ceil(time % 60)

    if (diffTime <= 0 && isImplementCb.current) {
      /**
       * setTimeout用于解决react报错问题：
       * annot update during an existing state transition (such as within `render`).
       * Render methods should be a pure function of props and state.
       */
      setTimeout(() => {
        cb?.()
      }, 0)
    }
    return { d, h, m, s }
  }, [diffTime])

  return timeObj || ({} as ICbTime)
}

export default useCountDown
