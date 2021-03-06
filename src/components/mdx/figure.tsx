/** @jsx jsx */
import { jsx } from 'theme-ui'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Figure(props: any) {
  return <figure {...props} sx={{ img: { variant: 'cards.image' } }} />
}
