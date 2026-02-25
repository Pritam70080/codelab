import { AnimatePresence, motion } from 'motion/react'
import React from 'react';
import { useForm } from "react-hook-form";
import { NotepadText, X } from "lucide-react";

const CreatePlaylistModal = ({ isOpen = false, onSubmit, onClose }) => {

    const { handleSubmit, register, formState: { errors }, reset } = useForm();

    const handleFormSubmit = async (data) => {
        await onSubmit(data);
        reset();
        onClose();
    }

    return (
        <AnimatePresence>
            {isOpen &&
                <motion.div
                    initial={{ scale: 0, opacity: 0, blur: 1 }}
                    animate={{ scale: 1, opacity: 1, blur: 0}}
                    exit={{ scale: 0, opacity: 0, blur: 1 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-100 backdrop-blur-sm origin-bottom md:origin-center"
                    onClick={onClose}
                >
                    <div className="card bg-base-100 w-full max-w-md p-4 mb-2" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center text-base-content">
                            <h3 className="font-semibold"><NotepadText className="size-5"/>Create Playlist</h3>
                            <button className="btn btn-ghost btn-sm" onClick={onClose}>
                                <X className="size-4" />
                            </button>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit(handleFormSubmit)} className="px-2">
                                <div className="form-control">
                                    <label htmlFor="playlist-name" className="label mb-1">
                                        <span className="label-text font-medium">Name</span>
                                    </label>
                                    <input type="text" {...register("name", { required: "Playlist name is required!" })} id="playlist-name" className={`input input-sm input-bordered w-full ${errors.name ? "input-error" : ""}`} placeholder="Enter playlist name"/>
                                    {errors.name && <label className="label">
                                        <span className="text-error label-text-alt text-[12px]">{errors.name.message}</span>
                                    </label>}
                                </div>
                                <div className="form-control mt-2.5">
                                    <label htmlFor="playlist-description" className="label mb-1 font-medium">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea {...register("description")} id="playlist-description" className="textarea textarea-sm textarea-bordered w-full" placeholder="Enter playlist description"></textarea>
                                </div>
                                <div className="flex justify-end mt-4 gap-4">
                                    <button onClick={onClose} className="btn rounded-xl btn-sm btn-ghost " type="button">Cancel</button>
                                    <button className="btn btn-primary btn-sm rounded-xl" type="submit">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>}
        </AnimatePresence>
    )
}

export default CreatePlaylistModal