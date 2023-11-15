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
        otherProfile: {},
        storeProfile : (profile) => {
            set ((state) => (
                {
                    profileData: profile
                }
            ))
        },
        storeOther :(profile) => {
            set ((state) => (
                {
                    profileData: profile
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
                    post: state.post.map((post) => {
                        if(post._id === postUpdate._id){
                           return  post = postUpdate
                        }
                        return  post;
                    })
                }
            ))
        }
        
    }
))