import { Skeleton } from '@mantine/core'
import React from 'react'

export default function loading() {
  return (
    <div>
        <Skeleton height={30}  mb="xs" />
        <Skeleton height={30}  mb="xs" />
        <Skeleton height={30}  mb="xs" />
    </div>
  )
}
