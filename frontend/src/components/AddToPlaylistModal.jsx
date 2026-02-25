import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "motion/react";
import { Loader2, X , Plus} from 'lucide-react';

import {usePlaylistStore} from "../store/usePlaylistStore.js";

const AddToPlaylistModal = ({ isOpen, onClose, problemId }) => {
  const {playlists, addProblemToPlaylist, getAllPlaylists, isLoading} = usePlaylistStore();
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  useEffect(() => {
    if(isOpen) getAllPlaylists();
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!selectedPlaylist) return 
    await addProblemToPlaylist(selectedPlaylist, [problemId]);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen &&
        <motion.div
          initial={{ scale: 0, opacity: 0, blur: 1 }}
          animate={{ scale: 1, opacity: 1, blur: 0 }}
          exit={{ scale: 0, opacity: 0, blur: 1 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-100 backdrop-blur-sm origin-bottom md:origin-center"
          onClick={onClose}
        >
          <div className="card bg-base-100 w-full max-w-md p-4 mb-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center text-base-content">
              <h3 className="font-semibold">Add to playlist</h3>
              <button onClick={onClose} className="btn btn-sm btn-ghost">
                <X className="size-4"/>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-2">
              <div className="form-control">
                <label htmlFor="select-playlist" className="label mb-1"><span className="label-text font-medium">Select a Playlist</span></label>
                <select id="select-playlist" className="select select-sm select-bordered w-full" value={selectedPlaylist} onChange={(e) => setSelectedPlaylist(e.target.value)} disabled={isLoading}>
                  <option value="">Select a playlist</option>
                  {playlists.map((playlist) => {
                    return <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                  })}
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button className="btn btn-sm btn-ghost rounded-xl" type="button" onClick={onClose}>Cancel</button>
                <button className="btn btn-sm btn-primary rounded-xl" type="submit" disabled={!selectedPlaylist || isLoading}>{isLoading ? <Loader2 className='animate-spin size-4'/>: <><Plus className="size-4"/><span>Add</span></>}</button>
              </div>
            </form>
          </div>
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default AddToPlaylistModal