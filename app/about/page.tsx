import React from 'react'

export default async function page() {
  await new Promise(resolve => setTimeout(resolve, 3000))
  return <div>About Page</div>
}
