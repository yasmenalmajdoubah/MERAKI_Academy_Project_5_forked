import React from 'react'
import { Post } from '../../components/posts/Post'

const HomeMain = () => {
  return (
    <div className='flex-row'>
      <div>
        <textarea placeholder='Puplish here'/>
        <button></button>
      </div>
      <div>
        Posts
      </div>
      <Post/>
    </div>
  )
}

export default HomeMain