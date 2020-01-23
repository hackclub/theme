import React from 'react'
import { Image, Link } from '@theme-ui/components'

const Flag = props => (
  <Link
    href="https://hackclub.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Hack Club homepage"
    {...props}
  >
    <Image
      src="https://hackclub.com/orpheus_flag.svg"
      alt="Hack Club flag"
      sx={{ width: [96, 128] }}
    />
  </Link>
)

export default Flag
