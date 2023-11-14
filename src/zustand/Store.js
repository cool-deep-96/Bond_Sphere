import { create } from 'zustand';

export const alerts= create ((set) =>(
    {
        message: "",
        setMessage: (message) => {
            set(() => ({ message : message }))
        }
    }
))

export const allUsers = create((set) => (
    {

    }
))

export const user = create((set) => (
    {
        profileData : {},
        storeProfile : (profile) => {
            set ((state) => (
                {
                    profile: profile
                }
            ))
        }

    }
))

export const allPosts = create((set) => (
    {
        post : [],
        storePosts : (post) =>{
            set((state) => ({post : post}))
        },

        updatePosts: (postUpdate) =>{
            set((state) => (
                {
                    post: state.post.filter((post) => {
                        post._id != postUpdate._id;
                    }),
                    post: [...state.post, postUpdate]
                }
            ))
        }
        
    }
))