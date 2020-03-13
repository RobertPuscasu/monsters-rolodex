import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { useCallback, useEffect, useState } from 'react'

export function useDebounced<T>(
  dueTime: number,
  effect: (value: T) => void
): (value: T) => void {
  const [input$] = useState(new Subject<T>())
  const callbackEffect = useCallback(effect, [])
  useEffect(() => {
    input$
      .pipe(debounceTime(dueTime), distinctUntilChanged())
      .subscribe(callbackEffect)
  }, [dueTime, input$, callbackEffect])
  return (value: T): void => input$.next(value)
}
