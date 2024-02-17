import { create } from 'zustand';

export const alerts= create ((set) =>(
    {
        message: "",
        setMessage: (message) => {
            set(() => ({ message : message }));
        }
    }
))

export const allUsers = create((set) => (
    {

    }
))

export const useUserStore = create((set) => (
    {
        profile : {},
        storeProfile : (profile) => {
            set ((state) => (
                {
                    profile: profile
                }
            ))
        },
    }
))


export const allPosts = create((set) => (
    {
        post : [],
        storePosts : (post) =>{
            set(() => ({post : post}))
        },

        updatePosts: (postUpdate) =>{
            set((state) => (
                {
                    post : state.post.map((post) => (
                       post._id === postUpdate._id? postUpdate : post

                    ))
                }
            ))
        }
        
    }
))