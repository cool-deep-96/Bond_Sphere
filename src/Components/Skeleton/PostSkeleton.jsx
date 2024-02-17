import React from 'react';
import Rectangle from './Rectangle';
const PostSkeleton = () => {
  return (
    <div className="min-w-screen  lg:flex lg:justify-center mb-5 mx-4 ">
            <div className=" lg:w-2/6 lg:self-place-center">
                <div className='h-96 p-4'>
                  <div className='flex items-center'>
                      <Rectangle h='h-10' w='w-10' rounded='rounded-full'/>
                      <Rectangle h='h-5' w='w-44' rounded='rounded-lg' m='mx-4'/>
                  </div>
                  <Rectangle w='w-full' h='h-64' m='my-4'/>
                  <Rectangle w='w-44' h='h-5' m='mx-2' rounded='rounded-lg'/>
                    
                <div className='flex'>
                  <Rectangle w='w-14' rounded='rounded-lg' h='h-5' m='m-2'/>
                  <Rectangle w='w-14' rounded='rounded-lg' h='h-5' m='m-2'/>
                </div>
                </div>

            </div>
    </div>
  )
}

export default PostSkeleton;