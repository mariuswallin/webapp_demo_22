import { useRef } from 'react'

function useIsFirstRender(): boolean {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}

// const titleRef = useRef(null)

// const handleSubmit = () => {
//   createPoll({title: titleRef.current})
// }

// <input
//             id="title"
//             type="text"
//             ref={titleRef}
//           />
